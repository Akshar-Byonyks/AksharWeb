import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact";
import { deliverEnquiry } from "@/lib/email";
import { verifyTurnstile } from "@/lib/turnstile";

// Spec §15: "Contact form: shadcn Form primitives, shared Zod schema,
// `/api/contact` Route Handler, Turnstile, Resend."
//
// The schema is re-parsed here against the same object the browser used. The
// client validation is a convenience; this is the one that counts.

export type ContactResponse =
  | { ok: true; simulated: boolean }
  | { ok: false; kind: "validation"; fieldErrors: Record<string, string[]> }
  | { ok: false; kind: "challenge" | "unconfigured" | "server"; message: string };

const json = (body: ContactResponse, status: number) =>
  NextResponse.json(body, { status });

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json(
      { ok: false, kind: "server", message: "We could not read that submission. Please try again." },
      400
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        kind: "validation",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
      400
    );
  }

  const turnstile = await verifyTurnstile(
    parsed.data.turnstileToken,
    request.headers.get("cf-connecting-ip") ?? undefined
  );
  if (turnstile.configured && !turnstile.success) {
    return json(
      {
        ok: false,
        kind: "challenge",
        message: "We could not confirm that submission came from a person. Please try again.",
      },
      403
    );
  }

  const delivery = await deliverEnquiry(parsed.data);

  switch (delivery.status) {
    case "sent":
      return json({ ok: true, simulated: false }, 200);
    case "simulated":
      // Development only — the adapter refuses to simulate in production.
      return json({ ok: true, simulated: true }, 200);
    case "unconfigured":
      // Truthful failure rather than a false success: nothing was delivered,
      // and the visitor is given the direct address instead.
      return json(
        {
          ok: false,
          kind: "unconfigured",
          message: "Our enquiry system is not accepting messages right now.",
        },
        503
      );
    case "failed":
      console.error("[contact] delivery failed:", delivery.reason);
      return json(
        {
          ok: false,
          kind: "server",
          message: "Something went wrong sending your message.",
        },
        502
      );
  }
}
