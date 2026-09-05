import { siteUrl } from "@/lib/site-config";

// Cloudflare Turnstile server-side validation. Endpoint, field names and
// response shape taken from Cloudflare's server-side-validation documentation
// rather than from memory (CLAUDE.md requires current docs for Turnstile).
//
// Inert until configured. With no secret set this returns `configured: false`
// and the Route Handler proceeds.
//
// THE CLIENT HALF NOW EXISTS (4 Sep 2026): `components/contact/turnstile-
// widget.tsx` renders the challenge and the form sends its token. Until that
// date this file was the only half that did, which made it a trap rather than
// a dormant feature — see the guard in `verifyTurnstile`.

const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * The action the widget stamps on its tokens, and the one this endpoint will
 * accept. It must stay in step with `action:` in `turnstile-widget.tsx` —
 * changing one without the other rejects every enquiry.
 *
 * It exists so that a token minted for some future second challenge on this
 * site cannot be replayed against the contact form.
 */
const EXPECTED_ACTION = "contact";

/**
 * The hostnames a token may legitimately have been solved on.
 *
 * DERIVED FROM `siteUrl` RATHER THAN CONFIGURED SEPARATELY. The canonical
 * origin is already written down once, in `site-config.ts`, and it is what
 * `metadataBase` and every canonical URL are built from. A second list of
 * hostnames in an environment variable would be a second source of truth for
 * the same fact, and the failure it produces — every enquiry rejected — is
 * silent from the visitor's side.
 *
 * `www` is included because `wrangler.jsonc` attaches both hostnames to this
 * Worker as custom domains and does not redirect between them, so a visitor
 * genuinely can solve the challenge on either.
 */
const siteHostname = new URL(siteUrl).hostname;
const expectedHostnames = new Set([siteHostname, `www.${siteHostname}`]);

/**
 * The public site key, read here as well as in the browser so the server can
 * tell a configured deployment from a half-configured one.
 *
 * `NEXT_PUBLIC_*` is substituted at build time, so this is the same literal
 * the client bundle carries: if it is undefined here, no widget was compiled
 * into the page, and therefore no submission can possibly carry a token.
 */
export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export type TurnstileResult =
  | { configured: false }
  | { configured: true; success: true }
  | { configured: true; success: false; errorCodes: string[] };

export async function verifyTurnstile(
  token: string | undefined,
  remoteip: string | undefined
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { configured: false };

  // THE HALF-CONFIGURED TRAP, closed.
  //
  // The two keys live in different places on Cloudflare — the site key is a
  // build variable, the secret is a Worker runtime secret — so setting one
  // and not the other is not a careless mistake, it is the likeliest single
  // outcome of following the dashboard.
  //
  // With only the secret set, no widget was ever compiled into the page, so
  // every genuine enquiry arrives tokenless and gets a 403 reading "we could
  // not confirm that submission came from a person." The form would appear to
  // work, reject everyone, and store nothing — a silent outage on this
  // company's only contact channel, discoverable only by someone testing the
  // form and reading the response.
  //
  // Failing open is the same call the catch block below already makes, for
  // the same stated reason: a verification problem must not swallow a real
  // enquiry. The error is loud in the log because this state is always a
  // deployment fault, never a legitimate configuration.
  if (!turnstileSiteKey) {
    console.error(
      "[contact] TURNSTILE_SECRET_KEY is set but NEXT_PUBLIC_TURNSTILE_SITE_KEY is not, " +
        "so no challenge is rendered and no submission can carry a token. " +
        "Turnstile is being skipped rather than rejecting every enquiry. " +
        "Set the site key as a BUILD variable and redeploy.",
    );
    return { configured: false };
  }

  if (!token) {
    return { configured: true, success: false, errorCodes: ["missing-input-response"] };
  }

  try {
    const res = await fetch(SITEVERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        ...(remoteip ? { remoteip } : {}),
        // A token is single-use and expires after 300s; an idempotency key
        // makes a retried verification safe rather than a duplicate failure.
        idempotency_key: crypto.randomUUID(),
      }),
    });
    const data = (await res.json()) as {
      success: boolean;
      action?: string;
      hostname?: string;
      ["error-codes"]?: string[];
    };

    if (!data.success) {
      return { configured: true, success: false, errorCodes: data["error-codes"] ?? [] };
    }

    // SUCCESS IS NOT THE WHOLE ANSWER, and until 5 Sep 2026 this function
    // treated it as though it were.
    //
    // A `success: true` from siteverify means only "this token is genuine and
    // has not been redeemed." It does not say the token was minted for this
    // form, or on this site. Both facts come back in the same response and
    // were being discarded.
    //
    // WHAT THAT ALLOWED. A sitekey is public — it ships in the JavaScript
    // every visitor downloads. Anyone could lift it, render the widget on a
    // host of their own, solve a challenge legitimately, and post the
    // resulting token here; the check above would pass it. Cloudflare
    // restricts token issuance to the widget's registered hostnames, so this
    // is not wide open — but it is exactly why `localhost` was deliberately
    // left off this widget when it was created, and validating the hostname
    // here is what makes registering a development origin safe later.
    //
    // FAILING CLOSED, unlike the network branch below. A mismatch is not an
    // outage: the token is real, and it came from somewhere it should not
    // have. There is no reading of that which should reach the inbox.
    if (data.action !== EXPECTED_ACTION) {
      return { configured: true, success: false, errorCodes: ["action-mismatch"] };
    }
    if (!data.hostname || !expectedHostnames.has(data.hostname)) {
      return { configured: true, success: false, errorCodes: ["hostname-mismatch"] };
    }

    return { configured: true, success: true };
  } catch {
    // A verification outage must not swallow a real enquiry from a patient on
    // a poor connection. Fail open, and say so in the log.
    console.warn("[contact] Turnstile verification unreachable; allowing submission.");
    return { configured: true, success: true };
  }
}
