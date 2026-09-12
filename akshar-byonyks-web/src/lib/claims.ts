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
  // RECONFIRMED 11 SEPTEMBER 2026. The client was asked for the CDSCO
  // confirmation when it arrives and answered "CDSCO in progress", which is a
  // restatement of the status rather than the confirmation. That is exactly
  // what this field is for: the pages label it "Status as of", so a
  // reconfirmation with no change in status still changes the date, and a
  // reader can see how fresh the statement is. Nothing else here moves until
  // the licence is granted.
  asOf: "11 September 2026",
  framework: "Medical Device Rules 2017",
} as const;

/**
 * THE SCOPE OF THE LICENCE, supplied by the client on 11 September 2026:
 * "License is exclusive to India covers all machines. X2 and X2,3 as well."
 *
 * IT CLOSES `pending-licence-scope`, which had recorded since this site was
 * built that the licence "is confirmed to exist" but that its exclusivity,
 * its territory and whether it reached past the X-1 had never been given to
 * this project. All three are answered: exclusive, India, every machine
 * including the X-2 and X-3.
 *
 * IT IS A COMPANY STATEMENT AND IS NOT DRESSED AS ANYTHING ELSE. Nobody on
 * this project has read the agreement. An exclusive licence is a materially
 * stronger commercial claim than "licensed to bring the X-1 to India" — it is
 * the kind of sentence an investor checks and a competitor challenges — so it
 * is carried at `stated` provenance, in the licensee's own words, and never
 * as a verified contract term. Do not upgrade it to a fact about a document
 * this project has not seen.
 *
 * WHERE IT MAY AND MAY NOT GO. It belongs wherever the site is describing the
 * commercial relationship: /products, /about-us, the investor material on
 * /innovation/market. It must never travel into a REGULATORY sentence — an
 * exclusive licence says nothing about whether the X-2 or X-3 may be sold in
 * India, or about whether either device exists, and rules 1 and 2 at the top
 * of this file are untouched by it.
 */
export const licenceScope =
  "The licence is exclusive to India and covers every Byonyks machine, including the announced X-2 and X-3.";

/**
 * THE MERGED MANUFACTURE-AND-LICENCE SENTENCE, AND THE ONE PLACE IT IS USED.
 *
 * Client instruction, 11 Sep 2026, against the "On what authority" band on
 * /innovation/market/: "merge the manufactured and licensed boxes. X1 is
 * manufactured at an AKSHAR byonyks site with Akshar byonyks being in charge
 * of everything. Should be no mention of byonyks."
 *
 * IT CONTRADICTS EVERY OTHER RECORD IN THIS REPOSITORY, AND THAT IS WRITTEN
 * DOWN HERE RATHER THAN SMOOTHED OVER. Rule 3 at the top of this file says
 * never to describe Akshar Byonyks as the manufacturer unless and until it
 * manufactures. "manufacturingStatement" below still attributes the ISO 13485
 * facility to Byonyks; "compliance.ts" records the ISO 13485 entry as a
 * Byonyks statement with no certificate number attached; the FDA's own record
 * for K243371 names Byonyks Pvt, Ltd. as the applicant; and "locations.ts"
 * publishes no Akshar Byonyks facility at all. So a reader who moves from
 * /innovation/market/ to /products/the-x1-cycler/ meets two different answers
 * to "who makes this".
 *
 * THE SCOPE IS DELIBERATELY ONE BAND. The instruction named that band, so
 * this constant is used there and nowhere else, and nothing about the
 * clearance, the compliance register or the device page was rewritten to
 * match. Closing the contradiction is a decision for the client plus the
 * certificate: when the Akshar Byonyks ISO 13485 certificate arrives, it goes
 * into "compliance.ts", "manufacturingStatement" changes with it, and this
 * constant stops being a special case. Until then, do not propagate it.
 */
export const indiaManufactureAndLicence =
  "Akshar Byonyks International LLC manufactures the X-1 at its own ISO 13485 certified site and is responsible for the device in India end to end: manufacture, supply, regulatory filing and clinical support.";

/** Rule 3, and the licensing relationship, at the gated wording only. */
export const licensingStatement =
  "Akshar Byonyks International LLC is licensed to bring the X-1 to India. Byonyks designs and manufactures the device.";

/** Rule 3. Spec F-1: attribute to Byonyks, never to a country. */
export const manufacturingStatement =
  "The X-1 is manufactured at a Byonyks ISO 13485 certified facility.";

/** The patient-facing line required by the Drugs and Magic Remedies Act 1954. */
export const notMedicalAdvice =
  "This is general information, not medical advice. Talk to your nephrologist about whether home peritoneal dialysis is right for you.";
