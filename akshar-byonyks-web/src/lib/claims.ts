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
//      USA holds it. The correct construction is "the X-1 cycler, cleared by
//      the US FDA under 510(k)", with the clearance attributed to Byonyks.
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

export const deviceName = "X-1 automated peritoneal dialysis cycler";
export const deviceShortName = "X-1";

export const fdaClearance = {
  route: "510(k)",
  holder: "Byonyks USA",
  granted: "May 2025",
} as const;

/** Rule 1. The only sentence on the site that states the US clearance. */
export const usRegulatoryStatement =
  "The X-1 is cleared by the US Food and Drug Administration under 510(k), granted May 2025. That clearance is held by Byonyks USA, not by Akshar Byonyks.";

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
  "A US clearance does not authorise sale in India. The X-1's Indian regulatory position is being established under the Medical Device Rules 2017, and Akshar Byonyks will state that position here precisely once it is confirmed.";

/** Rule 3, and the licensing relationship, at the gated wording only. */
export const licensingStatement =
  "Akshar Byonyks International LLC is licensed to bring the X-1 to India. Byonyks USA designs and manufactures the device.";

/** Rule 3. Spec F-1: attribute to Byonyks, never to a country. */
export const manufacturingStatement =
  "The X-1 is manufactured at a Byonyks ISO 13485 certified facility.";

/** The patient-facing line required by the Drugs and Magic Remedies Act 1954. */
export const notMedicalAdvice =
  "This is general information, not medical advice. Talk to your nephrologist about whether home peritoneal dialysis is right for you.";
