import { Resend } from "resend";

import { enquiryByValue, type ContactInput } from "@/lib/contact";
import { siteContact } from "@/lib/site-config";

// Delivery adapter. Spec §9.8 routes every enquiry to a single address held as
// configuration (F-3), and spec §10 fixes the Phase 1 DPDP posture: do not
// store submissions at rest beyond email. Nothing here writes to a database,
// and nothing should be added that does without a retention policy written
// first.
//
// No RESEND_API_KEY exists yet. Rather than pretend, the adapter is explicit
// about which of three states it is in, and the Route Handler tells the truth
// to the visitor in each:
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

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") return { status: "unconfigured" };
    console.info(`[contact] simulated delivery to ${siteContact.email}\n${subject}\n${body}`);
    return { status: "simulated" };
  }

  try {
    const resend = new Resend(apiKey);
    const from = process.env.CONTACT_FROM_ADDRESS;
    if (!from) return { status: "unconfigured" };

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
