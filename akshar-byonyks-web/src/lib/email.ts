import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Resend } from "resend";

import { enquiryByValue, type ContactInput } from "@/lib/contact";
import { siteContact } from "@/lib/site-config";

// Delivery adapter. Spec §9.8 routes every enquiry to a single address held as
// configuration (F-3), and spec §10 fixes the Phase 1 DPDP posture: do not
// store submissions at rest beyond email. Nothing here writes to a database,
// and nothing should be added that does without a retention policy written
// first.
//
// A RESEND_API_KEY NOW EXISTS (4 Sep 2026). This comment read "no
// RESEND_API_KEY exists yet" from the first build until that date; the key and
// the from-address are both on the Worker as encrypted secrets now, and
// `send.aksharbyonyks.com` is verified with Resend. The three states below are
// unchanged and still correct — what changed is that `unconfigured` in
// production is no longer the expected resting state, it is a fault, and
// `readSecret` below exists to say which one.
//
// Rather than pretend, the adapter is explicit about which of three states it
// is in, and the Route Handler tells the truth to the visitor in each:
//
//   sent          — really delivered
//   simulated     — development, no key: logged to the server console so the
//                   whole flow is testable end to end
//   unconfigured  — production, no key: NOT delivered, and the visitor is told
//                   to email directly rather than shown a false success
export type DeliveryResult =
  | { status: "sent" }
  | { status: "simulated" }
  | { status: "unconfigured" }
  | { status: "failed"; reason: string };

/**
 * Reads one deployment secret, from either place it can legitimately live.
 *
 * ADDED 4 SEP 2026, after both secrets were confirmed present and encrypted on
 * the Worker in the dashboard while this adapter went on reporting
 * `unconfigured` across two separate deploys. Everything that could be checked
 * from outside had been: the names, the type, the Worker, the deploy.
 *
 * THERE ARE TWO SOURCES AND THEY ARE NOT THE SAME THING. `process.env` is a
 * Node-compatibility shim — workerd populates it from the Worker's bindings
 * only when `nodejs_compat` is on and the compatibility date is recent enough,
 * and OpenNext layers its own handling on top of that. `getCloudflareContext()`
 * reads the binding object the runtime actually hands the Worker, which is the
 * authoritative source on this platform and cannot be out of step with what
 * the dashboard shows.
 *
 * Reading `process.env` first keeps every other environment working exactly as
 * it did — `next dev`, `next build`, and a local `.dev.vars` all populate it,
 * and none of them have a Cloudflare context to fall back to. The fallback only
 * ever fires where the first source came back empty, which is precisely the
 * state that has been failing in production.
 *
 * The context call is wrapped because it throws rather than returning undefined
 * when there is no request context — during the build, in a test, anywhere off
 * Cloudflare. A configuration read must not be able to take down the route it
 * is configuring.
 */
function readSecret(name: string): { value?: string; source: "process" | "worker" | "missing" } {
  const fromProcess = process.env[name];
  if (fromProcess) return { value: fromProcess, source: "process" };

  try {
    const env = getCloudflareContext().env as unknown as Record<string, unknown>;
    const fromWorker = env?.[name];
    if (typeof fromWorker === "string" && fromWorker) {
      return { value: fromWorker, source: "worker" };
    }
  } catch {
    // No Cloudflare context here. Not an error — see the note above.
  }

  return { source: "missing" };
}

export async function deliverEnquiry(input: ContactInput): Promise<DeliveryResult> {
  const type = enquiryByValue(input.enquiryType);
  const subject = `[${type.subject}] ${input.name}`;

  const body = [
    `Enquiry type: ${type.label}`,
    `Name: ${input.name}`,
    input.organisation ? `Organization: ${input.organisation}` : null,
    `Email: ${input.email}`,
    // Unconditional since 1 Sep 2026: both are required fields now, so the
    // guard would only ever hide a validation bug from the person reading
    // the email.
    `Phone: ${input.phone}`,
    `City: ${input.city}`,
    "",
    input.message,
  ]
    .filter(Boolean)
    .join("\n");

  // BOTH ARE READ UP FRONT, and that is a change of shape as well as of source.
  //
  // The key used to be read here and the from-address twenty lines further
  // down, inside the try block, so a deployment missing only the from-address
  // constructed a Resend client and then returned the same bare `unconfigured`
  // the missing-key path returns. Two distinct faults, one indistinguishable
  // symptom, and no log line from either — which is the entire reason the
  // production failure below took three attempts to characterise.
  //
  // ONE DEVELOPMENT BEHAVIOUR CHANGED WITH THE SHAPE, deliberately. A dev
  // environment holding a key but no from-address used to fall through to
  // `unconfigured`, because the from-address check sat past the production
  // branch. It now simulates, like every other incomplete configuration in
  // development does. That is the more consistent rule — development simulates
  // whenever delivery cannot be attempted — but it does mean `next dev` no
  // longer reproduces that particular production fault. Production is
  // unchanged: both missing values still return `unconfigured`, and now say so.
  const key = readSecret("RESEND_API_KEY");
  const fromAddress = readSecret("CONTACT_FROM_ADDRESS");
  const apiKey = key.value;
  const from = fromAddress.value;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") {
      // LOUD, AND NAMING THE SPECIFIC FAULT. Same reasoning as the
      // half-configured guard in `turnstile.ts`: this state is always a
      // deployment fault rather than a legitimate configuration, so it belongs
      // in the log at error level where `observability` will surface it.
      //
      // Presence and source only. A secret's VALUE must never reach a log line,
      // and the source is the fact that actually discriminates between the two
      // hypotheses left standing — "the secret was never set on this Worker"
      // and "the secret is set, and `process.env` is not being populated from
      // it." The dashboard can only answer the first.
      console.error(
        "[contact] delivery is unconfigured, so this enquiry was NOT sent. " +
          `RESEND_API_KEY: ${key.source}. ` +
          `CONTACT_FROM_ADDRESS: ${fromAddress.source}. ` +
          '("process" = read from process.env, "worker" = read from the ' +
          'Cloudflare binding because process.env was empty, "missing" = ' +
          "absent from both, i.e. genuinely not set on this Worker.)",
      );
      return { status: "unconfigured" };
    }
    console.info(`[contact] simulated delivery to ${siteContact.email}\n${subject}\n${body}`);
    return { status: "simulated" };
  }

  // A successful read from the fallback means `process.env` did not carry a
  // secret the Worker does have. Delivery works, so this is not an error — but
  // it is worth one line, because it is the signal that the shim is not doing
  // what this file assumed it did for its first two weeks in production.
  if (key.source === "worker" || fromAddress.source === "worker") {
    console.warn(
      "[contact] a secret was read from the Cloudflare binding because " +
        "process.env did not carry it. Delivery is working; the Node-compat " +
        "environment shim is not populating these values.",
    );
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: siteContact.email,
      replyTo: input.email,
      subject,
      text: body,
    });
    if (error) return { status: "failed", reason: error.message };
    return { status: "sent" };
  } catch (err) {
    return { status: "failed", reason: err instanceof Error ? err.message : "unknown" };
  }
}
