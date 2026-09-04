import { z } from "zod";

// Spec §9.8. The enquiry type is the hinge of this page: it is the one field
// that turns a single form into four audiences. It sets the subject prefix so
// the inbox at `vishnu@aksharbyonyks.com` stays sortable, and it is what
// `/contact?enquiry=clinician` — linked twice from the X-1 page — pre-selects.
//
// `subject` is the prefix, not the whole subject line. `acknowledgement` is
// what the page says back once a type is chosen, so a reader can tell the form
// understood which door they came in by.
export const enquiryTypes = [
  {
    value: "patient",
    label: "Patient or caregiver",
    subject: "Patient",
    acknowledgement:
      "We will reply with plain-language information about home peritoneal dialysis. We cannot give medical advice. Decisions about your treatment stay with your nephrologist.",
  },
  {
    value: "clinician",
    label: "Clinician",
    subject: "Clinician",
    acknowledgement:
      "We will route this to the clinical documentation request queue, including the Instructions for Use and the technical documentation behind the published specification.",
  },
  {
    value: "investor",
    label: "Investor",
    subject: "Investor",
    acknowledgement:
      "We will reply with the licensing scope, the regulatory position in both jurisdictions, and what is still open.",
  },
  {
    value: "partner",
    label: "Partner or distributor",
    subject: "Partner",
    acknowledgement:
      "We will reply with corporate credentials and the manufacturing and supply position as it currently stands.",
  },
  {
    value: "careers",
    label: "Careers",
    subject: "Careers",
    acknowledgement: "We will pass this to the team handling hiring.",
  },
  {
    value: "other",
    label: "Other",
    subject: "General",
    acknowledgement: "We will read it and route it to the right person.",
  },
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];

const enquiryValues = enquiryTypes.map((t) => t.value) as [
  EnquiryType,
  ...EnquiryType[],
];

/** Resolve the `?enquiry=` search parameter to a known type, or undefined. */
export function enquiryFromParam(raw: string | undefined): EnquiryType | undefined {
  return enquiryTypes.find((t) => t.value === raw)?.value;
}

export function enquiryByValue(value: EnquiryType) {
  return enquiryTypes.find((t) => t.value === value)!;
}

// One schema, imported by both the client form and the Route Handler, so a
// rule cannot be enforced in the browser and forgotten on the server. Spec
// §12: never trust client-side validation alone — this is parsed again in
// `/api/contact` against the same object.
//
// Message wording is the plain/patient register (PRODUCT.md's "one voice,
// three registers" resolves to the register of the audience least able to
// absorb friction). Each one names the problem and the recovery rather than
// saying "invalid".
export const contactSchema = z.object({
  enquiryType: z.enum(enquiryValues, {
    message: "Choose the option that best describes you.",
  }),
  name: z
    .string()
    .trim()
    .min(1, "Tell us your name so we know who we are replying to.")
    .max(100, "Please keep your name under 100 characters."),
  organisation: z
    .string()
    .trim()
    .max(120, "Please keep this under 120 characters.")
    .optional()
    .or(z.literal("")),
  email: z
    .email("Check the email address. We could not read that one.")
    .max(254),
  // REQUIRED SINCE 1 SEP 2026, on client instruction. Both were optional; the
  // people answering this inbox need a number to ring and a city to route by,
  // and an optional field on a contact form is a field most people skip.
  //
  // STILL DELIBERATELY PERMISSIVE ON FORMAT. This site serves India and the
  // diaspora, and a strict pattern rejects more real numbers than it catches
  // bad ones — +91 landlines with STD codes, ten-digit mobiles written with or
  // without the country code, and diaspora numbers from a dozen dialling
  // plans. So the rule is "there is something here that could be a phone
  // number", not "it matches a regex somebody wrote for one country".
  //
  // The floor is six characters because the shortest real number this form
  // will ever see is longer than that, and because a one-character phone field
  // passing validation is the failure that makes a required field pointless.
  //
  // THE `error` ARGUMENT COVERS THE ABSENT CASE. The browser form always sends
  // a string, so `min()` is what a visitor meets; a request that omits the key
  // entirely — the Route Handler parses the same schema against raw JSON —
  // otherwise fell through to Zod's own "expected string, received undefined",
  // which is not a sentence this site shows anybody.
  phone: z
    .string({ error: "We need a phone number we can reach you on." })
    .trim()
    .min(6, "We need a phone number we can reach you on.")
    .max(32, "Please keep the phone number under 32 characters."),
  city: z
    .string({ error: "Tell us which city you are writing from." })
    .trim()
    .min(1, "Tell us which city you are writing from.")
    .max(80, "Please keep the city under 80 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more, at least a sentence.")
    .max(5000, "Please keep the message under 5,000 characters."),
  consent: z.literal(true, {
    message: "We need your consent before we can use these details to reply.",
  }),
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const MESSAGE_MAX = 5000;
