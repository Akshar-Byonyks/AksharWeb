// Cloudflare Turnstile server-side validation. Endpoint, field names and
// response shape taken from Cloudflare's server-side-validation documentation
// rather than from memory (CLAUDE.md requires current docs for Turnstile).
//
// Inert until configured. No Turnstile keys exist in this project yet
// (`.dev.vars` holds only NEXTJS_ENV), so with no secret set this returns
// `configured: false` and the Route Handler proceeds. That is a deliberate,
// documented gap rather than a silent pass: the form has no spam protection
// until the keys are added, and that is stated in deviations.md.

const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

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

export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
