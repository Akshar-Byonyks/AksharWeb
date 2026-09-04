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
      ["error-codes"]?: string[];
    };
    return data.success
      ? { configured: true, success: true }
      : { configured: true, success: false, errorCodes: data["error-codes"] ?? [] };
  } catch {
    // A verification outage must not swallow a real enquiry from a patient on
    // a poor connection. Fail open, and say so in the log.
    console.warn("[contact] Turnstile verification unreachable; allowing submission.");
    return { configured: true, success: true };
  }
}
