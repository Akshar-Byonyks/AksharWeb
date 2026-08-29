// The compliance record behind the X-1, and the tier each entry sits in.
//
// Spec §9.4 asks `/manufacturing/` for "certifications with numbers and dates:
// ISO 13485, IEC via SGS and TUV SUD, biocompatibility via FiLab, FDA 510(k)
// number." Writing that as one flat list would have been the easy build and
// the dishonest one, because the entries are not the same kind of fact.
//
// Exactly one of them is a public record anybody can pull up in a minute. The
// rest are statements by Byonyks with no certificate number attached to them
// anywhere this project can reach. On a medical device site, in front of an
// investor doing diligence and a hospital procurement officer attaching this
// to a tender, the difference between "verifiable" and "asserted" is the most
// useful information on the page — so it is the page's structure rather than a
// footnote at the bottom of it.
//
// THE 510(k) NUMBER WAS FOUND, 29 AUG 2026. It had been a `PendingNote` on
// `/innovation/the-x1-cycler/` since that page was built, on the grounds that
// nobody had supplied it. Nobody had to: 510(k) decisions are published, and
// the FDA's own openFDA API returns exactly one record for this applicant.
// Every field in `fda510k` below is copied from that record — device name,
// dates, decision, product code, regulation — not from any marketing page.
//
// WHAT THE RECORD ALSO SAYS, AND WHY IT MATTERS SITEWIDE. The applicant of
// record on K243371 is "Byonyks Pvt, Ltd.", not Byonyks USA. Two Byonyks
// establishments are separately registered with the FDA and both list this
// device. `src/lib/claims.ts` used to say the clearance is "held by Byonyks
// USA"; the public record does not support that, so the wording there was
// narrowed to "held by Byonyks" — true under either entity, and already the
// formulation spec F-1 requires for manufacturing. See `deviations.md`.
//
// NEITHER APPLICANT ADDRESS IS REPRODUCED HERE, and that is not concealment.
// Spec F-1 (resolved 20 Aug 2026) attributes every proof point to Byonyks and
// never to a country; no marketing site prints its licensor's street address;
// and the link below goes straight to the FDA's own page, where a reader sees
// the complete record including everything this file leaves out. What the site
// may not do is *assert* a location, in either direction.

export type Verification =
  /** Anyone can check this, and the link says where. */
  | {
      readonly kind: "public-record";
      readonly register: string;
      readonly url: string;
      readonly checked: string;
    }
  /** Byonyks says so. Attributed to Byonyks, never restated as our own. */
  | { readonly kind: "company-stated"; readonly recordedIn: string };

export type Credential = {
  readonly title: string;
  /** The certificate, clearance or docket number. `null` when there isn't one. */
  readonly reference: string | null;
  readonly date: string | null;
  /**
   * Set on entries that ought to carry a certificate number and do not. It
   * renders as a pending chip on the row, so the gap is visible per-credential
   * rather than as one apology at the foot of the register. Absent on entries
   * where a number would be meaningless — a therapy count is not certified.
   */
  readonly referencePending?: string;
  readonly detail: string;
  readonly verification: Verification;
};

/**
 * The FDA clearance, field by field, as the register returns it.
 *
 * `decisionDate` is the FDA's decision date — 16 May 2025 — which is the
 * precise form of the "May 2025" the rest of the site has carried since the
 * first build. `receivedDate` is here because the six and a half months
 * between submission and clearance is itself the answer to "how long does this
 * take", and an investor asking about the India timeline is really asking that.
 */
export const fda510k = {
  kNumber: "K243371",
  deviceName: "Byonyks X-1 APD Cycler; Byonyks Automated PD Set DS-1",
  decision: "Substantially Equivalent",
  clearanceType: "Traditional 510(k)",
  receivedDate: "30 October 2024",
  decisionDate: "16 May 2025",
  productCode: "FKX",
  regulationNumber: "21 CFR 876.5630",
  deviceClass: "Class II",
  classificationName: "System, Peritoneal, Automatic Delivery",
  url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfPMN/pmn.cfm?ID=K243371",
  register: "FDA 510(k) Premarket Notification database",
  checked: "29 August 2026",
} as const;

/**
 * What a reader can verify without taking anybody's word for it.
 *
 * One entry, deliberately. Padding this register with things that merely look
 * official would destroy the only thing it is for.
 */
export const publicRecord: readonly Credential[] = [
  {
    title: "US FDA 510(k) clearance",
    reference: fda510k.kNumber,
    date: fda510k.decisionDate,
    detail:
      "Class II device under 21 CFR 876.5630, product code FKX, classified as an automatic peritoneal delivery system. Submitted 30 October 2024 and found substantially equivalent on 16 May 2025.",
    verification: {
      kind: "public-record",
      register: fda510k.register,
      url: fda510k.url,
      checked: fda510k.checked,
    },
  },
];

/**
 * What Byonyks states, attributed to Byonyks.
 *
 * Spec F-1's resolution in practice. Every entry here is true as an
 * attribution — Byonyks says it — and none of it is restated as an Akshar
 * Byonyks capability, because Akshar Byonyks has no facility and no
 * certification of its own to claim.
 *
 * Every one of them is missing its certificate number. Spec §9.4 asks for
 * "certifications with numbers and dates" and this project has the dates only,
 * so each entry says so in its own row rather than the page implying a
 * completeness it does not have. Getting the five certificates from Byonyks is
 * a short email, and it would upgrade this entire register.
 */
export const companyStated: readonly Credential[] = [
  {
    title: "ISO 13485 quality management system",
    reference: null,
    referencePending: "Certificate number, issuing body and expiry",
    date: null,
    detail:
      "Byonyks states that the X-1 is manufactured at an ISO 13485 certified facility. ISO 13485 is the international quality management standard for medical device manufacture.",
    verification: {
      kind: "company-stated",
      recordedIn: "Byonyks, byonyks.com",
    },
  },
  {
    title: "Biocompatibility testing",
    reference: null,
    referencePending: "Report number",
    date: "July 2023",
    detail: "Conducted by FiLab, France.",
    verification: {
      kind: "company-stated",
      recordedIn: "Byonyks milestone record, client audit 20 August 2026",
    },
  },
  {
    title: "Electrical safety testing",
    reference: null,
    referencePending: "Report number",
    date: "September 2023",
    detail: "Conducted by HTW, China.",
    verification: {
      kind: "company-stated",
      recordedIn: "Byonyks milestone record, client audit 20 August 2026",
    },
  },
  {
    title: "IEC certification",
    reference: null,
    referencePending: "Certificate number",
    date: "October 2023",
    detail: "Issued via SGS, Geneva.",
    verification: {
      kind: "company-stated",
      recordedIn: "Byonyks milestone record, client audit 20 August 2026",
    },
  },
  {
    title: "IEC testing and human factors",
    reference: null,
    referencePending: "Report number",
    date: "November 2023",
    detail:
      "Conducted via TÜV SÜD, Minnesota, alongside human factors work, in the month the FDA submission was prepared.",
    verification: {
      kind: "company-stated",
      recordedIn: "Byonyks milestone record, client audit 20 August 2026",
    },
  },
  {
    title: "Therapies delivered",
    reference: null,
    date: null,
    detail:
      "Over 10,000 therapies delivered using Byonyks cycler technology, as reported by Byonyks USA.",
    verification: { kind: "company-stated", recordedIn: "Byonyks USA" },
  },
];

/**
 * The two India hubs. PARKED — nothing renders these as of 29 Aug 2026.
 *
 * They were the one piece of `/manufacturing/` with nowhere else to go when
 * that page was retired (see `x1-compliance.tsx`). They do not belong on a
 * device page: a company's own footprint is About Us material, and
 * `/about-us/` is not built yet. Kept here rather than deleted because the
 * research behind them is real and the constraint below is the load-bearing
 * part — whoever builds that page must not quietly turn these into factories.
 *
 * Open Questions 2.3, still open as of this build: construction is underway on
 * both, there is no confirmed completion date, and **their function is not
 * confirmed as manufacturing.** Spec §9.4's note is explicit that they must not
 * be described as manufacturing facilities before that is settled, and the
 * reason is not editorial caution — it decides which CDSCO licence route
 * applies (Form MD-3/MD-5 via the State Licensing Authority, or MD-7/MD-9 via
 * the Central Licensing Authority, per spec §14.2). Calling them factories here
 * would be the site pre-announcing a regulatory position nobody has taken.
 *
 * The client's own note on this, recorded 20 Aug 2026: the resulting cards are
 * "known to look unpolished". They are built to look deliberate instead — the
 * city is real and named, the state of play is stated plainly, and the pending
 * note carries the specific thing that is missing rather than the word "soon".
 */
export type IndiaHub = {
  readonly city: string;
  readonly state: string;
  readonly status: string;
  readonly pending: string;
};

export const indiaHubs: readonly IndiaHub[] = [
  {
    city: "Hyderabad",
    state: "Telangana",
    status:
      "Under construction. Announced as one of two Akshar Byonyks hubs in India.",
    pending:
      "Function and completion date not confirmed. Not described here as a manufacturing facility.",
  },
  {
    city: "Ahmedabad",
    state: "Gujarat",
    status:
      "Under construction. Announced as one of two Akshar Byonyks hubs in India.",
    pending:
      "Function and completion date not confirmed. Not described here as a manufacturing facility.",
  },
];

// Structural enforcement, in the spirit of `market-data.ts`'s `getSource`: a
// figure that cannot cite a source must not be able to render. Here the
// invariant is narrower and just as load-bearing — an entry may only sit in
// the public-record register if it actually carries the reference number that
// makes it checkable. Throwing at module load means a mistake fails the build
// rather than shipping a verification badge over an unverifiable claim.
for (const credential of publicRecord) {
  if (
    credential.verification.kind !== "public-record" ||
    !credential.reference
  ) {
    throw new Error(
      `compliance: "${credential.title}" is in the public-record register without a reference number. ` +
        "Move it to companyStated, or add the reference that makes it checkable.",
    );
  }
}
