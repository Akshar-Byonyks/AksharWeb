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
type SecretSource = "process" | "worker" | "missing";

type ResolvedSecrets = {
  values: Record<string, string | undefined>;
  sources: Record<string, SecretSource>;
  /** Why the binding lookup could not run, if it could not. */
  contextError?: string;
  /** Names only, never values. See the note in `resolveSecrets`. */
  bindingKeys: string[];
  processKeyCount: number;
};

/**
 * Resolves the delivery secrets, and records enough about the attempt to tell
 * a genuine absence from a failed lookup.
 *
 * REWRITTEN 4 SEP 2026, HOURS AFTER THE FIRST VERSION, because the first
 * version could not answer the question it was written to answer. It reported
 * `missing` both when a secret was absent and when `getCloudflareContext()`
 * threw, and its `catch` was silent — so when production logged
 * "RESEND_API_KEY: missing. CONTACT_FROM_ADDRESS: missing." against a
 * dashboard that plainly showed both secrets present and encrypted, that line
 * ruled nothing out. A diagnostic that collapses two hypotheses into one word
 * is not a diagnostic.
 *
 * THREE THINGS CHANGED.
 *
 * `async: true`. The synchronous form reads the context off a global that
 * `init.js` installs per request through an AsyncLocalStorage store, and it
 * THROWS — with a message naming exactly this mistake — when called from a
 * static route or above the request scope. The async form is the one the
 * adapter documents for use inside a handler, and `deliverEnquiry` is already
 * async, so awaiting costs nothing.
 *
 * The catch now keeps the error. If the lookup failed, the log says so and
 * quotes the runtime's own message, instead of reporting a secret as absent on
 * the strength of never having looked.
 *
 * The binding's KEY NAMES are captured. This is the fact that settles it:
 * `populateProcessEnv` in the adapter's `init.js` copies every string-valued
 * binding into `process.env` on first request, so if `RESEND_API_KEY` is in
 * this list and not in `process.env`, the copy is the broken step — and if it
 * is in neither, the secret is genuinely not bound to this Worker, whatever
 * the Settings page renders.
 *
 * NAMES ONLY, NEVER VALUES, and that distinction is the whole reason this is
 * safe to log. A binding name is configuration; a binding value is a
 * credential. `Object.keys` cannot leak the second.
 */
async function resolveSecrets(names: readonly string[]): Promise<ResolvedSecrets> {
  const values: Record<string, string | undefined> = {};
  const sources: Record<string, SecretSource> = {};

  for (const name of names) {
    const fromProcess = process.env[name];
    if (fromProcess) {
      values[name] = fromProcess;
      sources[name] = "process";
    } else {
      sources[name] = "missing";
    }
  }

  let contextError: string | undefined;
  let bindingKeys: string[] = [];

  try {
    const { env } = await getCloudflareContext({ async: true });
    const bindings = (env ?? {}) as unknown as Record<string, unknown>;
    bindingKeys = Object.keys(bindings);

    for (const name of names) {
      if (values[name]) continue;
      const fromWorker = bindings[name];
      if (typeof fromWorker === "string" && fromWorker) {
        values[name] = fromWorker;
        sources[name] = "worker";
      }
    }
  } catch (err) {
    contextError = err instanceof Error ? err.message : String(err);
  }

  return {
    values,
    sources,
    contextError,
    bindingKeys,
    processKeyCount: Object.keys(process.env).length,
  };
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
  const config = await resolveSecrets(["RESEND_API_KEY", "CONTACT_FROM_ADDRESS"]);
  const apiKey = config.values.RESEND_API_KEY;
  const from = config.values.CONTACT_FROM_ADDRESS;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") {
      // LOUD, AND CARRYING THE EVIDENCE. Same reasoning as the half-configured
      // guard in `turnstile.ts`: this state is always a deployment fault rather
      // than a legitimate configuration, so it belongs in the log at error
      // level where `observability` will surface it.
      //
      // `bindings` is the line that ends the argument. If the two names appear
      // there, they ARE bound to this Worker and the fault is downstream of
      // Cloudflare. If they do not, the Settings page and the running Worker
      // disagree, and no amount of reading the dashboard would ever have shown
      // it. Either way the next step stops being a guess.
      console.error(
        "[contact] delivery is unconfigured, so this enquiry was NOT sent. " +
          `RESEND_API_KEY=${config.sources.RESEND_API_KEY} ` +
          `CONTACT_FROM_ADDRESS=${config.sources.CONTACT_FROM_ADDRESS} ` +
          `| process.env keys: ${config.processKeyCount} ` +
          `| binding names (${config.bindingKeys.length}): ${config.bindingKeys.join(", ") || "none"} ` +
          `| context error: ${config.contextError ?? "none"}`,
      );
      return { status: "unconfigured" };
    }
    console.info(`[contact] simulated delivery to ${siteContact.email}\n${subject}\n${body}`);
    return { status: "simulated" };
  }

  // A successful read from the fallback means `process.env` did not carry a
  // secret the Worker does have. Delivery works, so this is not an error — but
  // it is worth one line, because it is the signal that the adapter's
  // `populateProcessEnv` step is not doing what this file assumed it did.
  if (
    config.sources.RESEND_API_KEY === "worker" ||
    config.sources.CONTACT_FROM_ADDRESS === "worker"
  ) {
    console.warn(
      "[contact] a secret was read from the Cloudflare binding because " +
        "process.env did not carry it. Delivery is working; the adapter's " +
        "environment copy is not populating these values.",
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
