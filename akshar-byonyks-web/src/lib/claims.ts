// The regulatory and licensing sentences, written once and reused.
//
// PRODUCT.md, Capabilities and Constraints: "One consistent formulation of
// the licensing relationship, reused everywhere — not redrafted per page."
// That is the whole reason this file exists. These strings are the wording
// that goes in front of a reader; changing them is a regulatory edit, not a
// copy tweak, and it happens here rather than in a component.
//
// The three hard rules they encode (PRODUCT.md, non-negotiable):
//   1. Never state or imply Akshar Byonyks holds the FDA clearance. Byonyks
//      holds it. The correct construction is "the X-1 cycler, cleared by the
//      US FDA under 510(k)", with the clearance attributed to Byonyks.
//   2. Never imply FDA clearance authorises sale in India. The Indian
//      position is stated separately, as it actually is.
//   3. Never describe Akshar Byonyks as the manufacturer unless and until it
//      manufactures. Manufacturing attributes to Byonyks generically, never
//      to a country (spec F-1, resolved 20 Aug 2026).
//
// LAUNCH GATE — do not add the stronger claim. The phrase "Official
// licensing partner of Byonyks USA" needs Byonyks USA's *written* approval
// before it can go live (PRODUCT.md; spec F-6, Open Questions 1.3/1.5/1.6).
// Only verbal confirmation exists today, so the wording below says "licensed
// to bring the X-1 to India" and stops there. Do not upgrade it here — or
// anywhere — until that approval is on paper.
//
// NARROWED 29 AUGUST 2026, AGAINST THE PUBLIC RECORD. Two sentences here used
// to attribute the FDA clearance and the manufacture of the device to
// "Byonyks USA" specifically. The FDA's own 510(k) database does not support
// that: the applicant of record on K243371 is "Byonyks Pvt, Ltd.", and two
// separately registered Byonyks establishments both list this device. Nobody
// on this project supplied that detail — publishing the K-number for spec
// §9.4 meant looking the clearance up, and looking it up meant reading who
// holds it.
//
// Both sentences now say "Byonyks", which is true under either entity and is
// already the formulation spec F-1 requires. This is strictly a narrowing —
// nothing was added, an over-specific attribution was removed — and it does
// not touch the licensing relationship, where naming Byonyks USA as the
// licensor is spec F-2's own instruction and is a corporate fact the client
// asserts rather than a regulatory one the FDA publishes. Recorded in
// `deviations.md`. It still wants a lawyer's eye before launch.

export const deviceName = "X-1 automated peritoneal dialysis cycler";
export const deviceShortName = "X-1";

/**
 * The clearance, as the FDA's register states it. The full record — device
 * class, regulation, product code, submission date — lives in
 * `src/lib/compliance.ts`, which is also where the link to the register is.
 */
export const fdaClearance = {
  route: "510(k)",
  kNumber: "K243371",
  holder: "Byonyks",
  granted: "16 May 2025",
} as const;

/** Rule 1. The only sentence on the site that states the US clearance. */
export const usRegulatoryStatement =
  "The X-1 is cleared by the US Food and Drug Administration under 510(k) K243371, granted 16 May 2025. That clearance is held by Byonyks, not by Akshar Byonyks.";

/**
 * Rule 2. Open Questions 1.6 / spec §14.2: the CDSCO authorised-agent
 * question and the Medical Device Rules 2017 import route are genuinely
 * unsettled, so this states the position as it actually is and no further.
 *
 * BLOCKED — needs legal review before launch (spec §14.4). When the
 * authorised agent, device risk classification and licence route are
 * confirmed, the precise position replaces this sentence, here only.
 */
export const indiaRegulatoryStatement =
  "A US clearance does not authorise sale in India. The X-1's Indian licensing is in progress under the Medical Device Rules 2017, and Akshar Byonyks will state the confirmed position here precisely once it is granted.";

/**
 * THE INDIA LICENSING STATUS AS A STATUS, not only as a sentence.
 *
 * Client instruction, 1 Sep 2026: "X1 cycler licensing in India should show as
 * in progress along with the date". Before this the India panel carried a
 * paragraph and an amber "Confirmation pending" note, which reads as *stalled*
 * — a gap nobody is working on. "In progress, as of a date" is a different
 * claim and a truer one: work is under way, and the reader can see how fresh
 * that statement is.
 *
 * `asOf` IS THE DATE THIS STATUS WAS LAST CONFIRMED BY THE CLIENT, and the
 * page labels it in exactly those words. It is deliberately NOT presented as a
 * filing or submission date, because no such date has been supplied to this
 * project and a date printed next to "licensing" will be read as the day
 * something was lodged with CDSCO. If the client meant the application date,
 * it goes here and the label on `x1-regulatory.tsx` changes with it — one
 * edit, one place, and the two cannot drift.
 *
 * WHAT MUST NOT HAPPEN: this becoming "approved", "cleared" or "licensed" in
 * India without the licence number and the route beside it. Rule 2 above is
 * the whole reason this file exists, and "in progress" is the strongest thing
 * that can be said today.
 */
export const indiaLicensing = {
  status: "In progress",
  asOf: "1 September 2026",
  framework: "Medical Device Rules 2017",
} as const;

/** Rule 3, and the licensing relationship, at the gated wording only. */
export const licensingStatement =
  "Akshar Byonyks International LLC is licensed to bring the X-1 to India. Byonyks designs and manufactures the device.";

/** Rule 3. Spec F-1: attribute to Byonyks, never to a country. */
export const manufacturingStatement =
  "The X-1 is manufactured at a Byonyks ISO 13485 certified facility.";

/** The patient-facing line required by the Drugs and Magic Remedies Act 1954. */
export const notMedicalAdvice =
  "This is general information, not medical advice. Talk to your nephrologist about whether home peritoneal dialysis is right for you.";
