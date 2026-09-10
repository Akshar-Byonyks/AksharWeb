import type { Provenance, ProvenanceStatus } from "@/components/common/provenance";
import { byotalksSessions } from "@/lib/byotalks";
import { indiaLicensing } from "@/lib/claims";
import { companyStated, publicRecord } from "@/lib/compliance";
import { locations } from "@/lib/locations";
import {
  accessFigures,
  costFigures,
  getSource,
  GUATEMALA_PD_SHARE,
  LIVE_OVER_100KM,
  modalityFigures,
  PD_RECENT_ESTIMATE,
  scaleFigures,
  TRAVEL_OVER_50KM,
  type Figure,
} from "@/lib/market-data";

// THE LEDGER behind `/what-we-know/`.
//
// WHAT THIS IS FOR. PRODUCT.md says the site should "become a reference source
// on home PD in India." The sitewide critique found the thing that would
// actually make it one already existed, scattered: `compliance.ts` splits the
// X-1's credentials into what anyone can verify and what Byonyks asserts;
// `market-data.ts` carries six real sources and refuses to render a figure
// without one; and 58 places on the site mark a gap rather than filling it.
// Nobody could see all of that at once, because it was spread across nine
// routes.
//
// THIS FILE DERIVES; IT DOES NOT RESTATE. Every entry below is assembled from
// the data the pages themselves render. A ledger that retyped those facts
// would be a second copy free to drift from the first — which is the exact
// defect `market-data.ts` documents on its own opening lines, where
// byonyks.com carried Guatemala at 56% and the paper says 45%. The only things
// written out by hand here are the pending slots, because a gap has no data
// structure to be derived from; it is an absence.
//
// THE PROVENANCE SCALE IS NOT NEW. `compliance.ts` already distinguishes
// `public-record` from `company-stated` and has since the X-1 page was built.
// All this does is promote that distinction from one page to the whole site
// and add the two statuses the rest of the site needed: `published` for the
// market page's cited research, and `pending` for the gaps.

export type LedgerEntry = {
  readonly id: string;
  /** What the site actually says, in the words it says it. */
  readonly claim: string;
  /** Extra context a reader weighing the claim would want. Optional. */
  readonly detail?: string;
  readonly provenance: Provenance;
  /** Every page this claim is visible on. At least one. */
  readonly appearsOn: readonly { readonly label: string; readonly href: string }[];
};

// ---------------------------------------------------------------------------
// Derived: the X-1 compliance record.
// ---------------------------------------------------------------------------

const X1 = { label: "The X-1 cycler", href: "/products/the-x1-cycler" };
const HOME = { label: "Home", href: "/" };
const ABOUT = { label: "About us", href: "/about-us" };
const MARKET = { label: "The India market", href: "/innovation/market" };
const HOW = { label: "How it works", href: "/innovation/how-it-works" };
const TALKS = { label: "ByoTalks", href: "/byotalks" };
const CONTACT = { label: "Contact", href: "/contact" };
const CAREERS = { label: "Careers", href: "/about-us/careers" };
const LOCATIONS = { label: "Locations", href: "/locations" };
const LEADERSHIP = { label: "Leadership", href: "/about-us/leadership" };

const fromCompliance: readonly LedgerEntry[] = [
  ...publicRecord.map((credential, i): LedgerEntry => {
    // Narrowed by the register it came from: `publicRecord` cannot hold a
    // `company-stated` entry, and compliance.ts throws at module load if one
    // arrives without a reference number.
    const v = credential.verification;
    if (v.kind !== "public-record") {
      throw new Error(
        `claims-ledger: "${credential.title}" is in publicRecord with a ${v.kind} verification.`,
      );
    }
    return {
      id: `record-${i}`,
      claim: credential.title,
      detail: credential.detail,
      provenance: {
        status: "record",
        source: { label: v.register, url: v.url },
        retrieved: v.checked,
      },
      appearsOn: [X1, HOME, ABOUT],
    };
  }),
  ...companyStated.map((credential, i): LedgerEntry => {
    const v = credential.verification;
    if (v.kind !== "company-stated") {
      throw new Error(
        `claims-ledger: "${credential.title}" is in companyStated with a ${v.kind} verification.`,
      );
    }
    return {
      id: `stated-${i}`,
      claim: credential.title,
      detail: credential.detail,
      provenance: {
        status: "stated",
        ...(credential.date ? { asOf: credential.date } : {}),
      },
      appearsOn: credential.title === "Therapies delivered" ? [X1, HOME] : [X1],
    };
  }),
];

// ---------------------------------------------------------------------------
// Derived: every sourced figure on the market page.
// ---------------------------------------------------------------------------

const figureEntry = (
  figure: Figure,
  index: number,
  appearsOn: readonly { label: string; href: string }[],
): LedgerEntry => {
  const source = getSource(figure.source);
  return {
    id: `figure-${figure.source}-${index}`,
    claim: `${figure.value}: ${figure.label}`,
    detail: figure.detail,
    provenance: {
      status: "published",
      source: { label: source.shortName, url: source.url },
      asOf: figure.asOf,
    },
    appearsOn,
  };
};

const fromFigures: readonly LedgerEntry[] = [
  ...scaleFigures.map((f, i) => figureEntry(f, i, [MARKET])),
  ...accessFigures.map((f, i) => figureEntry(f, 100 + i, [MARKET])),
  ...costFigures.map((f, i) => figureEntry(f, 200 + i, [MARKET])),
  ...modalityFigures.map((f, i) => figureEntry(f, 300 + i, [MARKET])),
  figureEntry(TRAVEL_OVER_50KM, 400, [MARKET]),
  figureEntry(LIVE_OVER_100KM, 401, [MARKET]),
  figureEntry(PD_RECENT_ESTIMATE, 402, [MARKET]),
  figureEntry(GUATEMALA_PD_SHARE, 403, [MARKET]),
  // The one figure that leaves the market page. `origin-story.tsx` carries it
  // under the same citation rather than retyping the number, and it is listed
  // here against both routes so the ledger says where it is actually visible.
  {
    id: "figure-gkha-india-died-without",
    claim:
      "About two thirds of people with kidney failure in India died without ever receiving dialysis",
    detail:
      "2010 data, reported 2020. Carried on the About page under the same citation it has on the market page.",
    provenance: {
      status: "published",
      source: {
        label: getSource("gkha-india").shortName,
        url: getSource("gkha-india").url,
      },
      asOf: "2010 data, reported 2020",
    },
    appearsOn: [MARKET, ABOUT],
  },
];

// ---------------------------------------------------------------------------
// Hand-written: the gaps.
//
// These are the only entries not derived, because an absence has no record to
// derive from. Each one corresponds to a `PendingNote` or `PendingChip`
// rendered on the route named in `appearsOn`; adding one here without adding
// it to the page, or the reverse, is the drift this file otherwise prevents.
// The contract at the foot of this file will not catch that — only a person
// reading both will — so keep this list beside the pages, not ahead of them.
// ---------------------------------------------------------------------------

const gaps: readonly LedgerEntry[] = [
  {
    id: "pending-cdsco",
    claim: "The X-1's Indian regulatory position",
    detail:
      `A United States clearance is not an Indian authorisation. Licensing under the ${indiaLicensing.framework} is in progress as of ${indiaLicensing.asOf}, which is a statement about work under way and not about an outcome: which CDSCO licence route applies, who holds it, and the import licence position are all still unconfirmed. Until they are, nothing on this site should be read as saying the device is approved for sale in India.`,
    provenance: {
      status: "pending",
      missing: "CDSCO authorised-agent status and the licence route are unconfirmed.",
    },
    appearsOn: [X1, ABOUT, { label: "Terms of use", href: "/terms-of-use" }],
  },
  {
    id: "pending-licence-scope",
    claim: "The territory, exclusivity and product scope of the licence",
    detail:
      "The licence to bring the X-1 to India is confirmed to exist. Whether it is exclusive, what territory it covers, and whether it extends past the X-1 to the X2 and X3 roadmap have not been given to this project.",
    provenance: {
      status: "pending",
      missing: "Licence terms not yet supplied.",
    },
    appearsOn: [ABOUT, X1],
  },
  // `pending-trademark` was removed on 10 Sep 2026, on the client's decision:
  // "For Byonyks, verbal confirmation is all we need."
  //
  // IT IS CLOSED, NOT DOWNGRADED. This entry recorded that Byonyks USA's
  // approval for its name, its marks and its employees' photographs and
  // biographies was verbal, and asserted that written permission was required
  // before launch. That requirement was this project's own, not a regulator's —
  // so the client is the party entitled to retire it, and has. A ledger entry
  // that says a thing is missing when the only person who can want it has said
  // they do not is not a gap; it is the site contradicting its own client.
  //
  // The photograph half closed with it. `leadership.ts` recorded one remaining
  // portrait-rights question — Senthil Kumar's, the last of fourteen after the
  // 1 Sep removal — and it was gated on exactly this permission.
  //
  // WHAT THIS IS NOT. It is not permission to add Byonyks people to the site.
  // The client's second instruction the same day was that no Byonyks staff go
  // into it; Senthil Kumar stays as the standing 1 Sep exception and is the
  // last of them. That rule is in CLAUDE.md, because it governs future work
  // rather than describing a gap in this one.
  {
    id: "pending-address",
    claim: "The India office address",
    detail:
      "Required on the privacy policy and the terms of use, and required before this site goes live. No placeholder is published, and since 1 Sep 2026 there is no published office address of any kind: the Bengaluru row was removed from /locations on the client's instruction, its replacement stated the address as coming soon, and on 2 Sep that replacement was removed too. The office is now named only on the Contact page. Enquiries reach the same people by email and by phone in the meantime.",
    provenance: { status: "pending", missing: "No India office address published." },
    // LOCATIONS came off this list on 2 Sep 2026 with the India office row
    // itself. `appearsOn` is where a reader is sent to see the claim, and the
    // gap is no longer visible on that page — it is stated in prose there, but
    // the row that carried it is gone.
    appearsOn: [
      CONTACT,
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of use", href: "/terms-of-use" },
    ],
  },
  // `pending-phone` was removed on 1 Sep 2026. The number published in the
  // contact band was a placeholder for the life of this project; the client
  // supplied a real, staffed line that day, so the gap it recorded is closed
  // rather than restated. See `src/lib/site-config.ts`.
  {
    id: "pending-grievance-officer",
    claim: "The named Grievance Officer",
    detail:
      "India's DPDP Act 2023 requires a named Grievance Officer with published contact details. Nobody has been appointed. Complaints sent to the published address are read and answered by the team, and this site does not present that as the statutory appointment having been made.",
    provenance: { status: "pending", missing: "No officer appointed." },
    appearsOn: [
      { label: "Grievance redressal", href: "/grievance-redressal" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
  // `pending-retention` was removed on 10 Sep 2026. The client set the period:
  // two years from the day an enquiry is sent. `/privacy-policy` states it
  // outright now, so the gap is closed rather than restated.
  //
  // IT IS A COMPANY DECISION, NOT COUNSEL'S ADVICE, and the distinction is
  // worth keeping straight because this entry used to promise the opposite —
  // "being set with counsel". It was not; it was set by the client. Nothing on
  // the page claims a lawyer chose it, and nothing should be added later that
  // does unless one actually has.
  //
  // TWO YEARS COVERS ORDINARY ENQUIRIES, AND THAT IS ALL THE PAGE CLAIMS.
  // The open question raised at the time and not answered here is whether
  // correspondence touching device safety — a malfunction, a complaint, an
  // adverse event — carries a longer obligation under the Medical Device Rules
  // 2017 for an importer and licensee. No second period was invented for it:
  // a retention rule this site has not been given is not one it should print.
  // If counsel sets one, it goes in the same section rather than a new gap.
  //
  // THE PERIOD IS ALSO AN OPERATIONAL COMMITMENT. Enquiries live only in the
  // Google Workspace inbox behind the contact address — nothing writes them to
  // a database — so honouring this means somebody deleting mail on a schedule.
  // A published period nobody acts on is a worse position than the open-ended
  // wording it replaced, because it is a specific promise visibly broken.
  // REPLACED `pending-executives` ON 10 SEP 2026, BECAUSE IT HAD BECOME FALSE.
  //
  // It read: "Three Akshar Byonyks people are published on the leadership
  // page. Two of them, Dr. Ronak C. Shah and Sahil, arrived with a biography
  // but no job title and no photograph". Every clause of that is now wrong.
  // Four Akshar Byonyks people are published, not three; all four carry a job
  // title; all five records on the page carry a portrait; no record sets
  // `portraitPending`; and Sahil acquired a surname on 8 Sep with the client's
  // officer schedule. `/what-we-know` was publishing a statement about this
  // company's own leadership that its own leadership page contradicted.
  //
  // THE LEDGER IS THE THING THAT IS SUPPOSED TO CATCH DRIFT, so it drifting is
  // the worst case. The mechanism that failed is worth naming: entries are
  // written beside the pages they describe and then the pages move on. The
  // build contract pairs a rendered `PendingNote` with an entry, but it cannot
  // read prose, so an entry whose SENTENCES go stale while its id still
  // matches a real gap passes every check. Only a person reading both catches
  // it, which is what the note at the head of this file already says.
  //
  // THE GAP DID NOT VANISH, IT NARROWED, so this is a replacement rather than
  // a removal. One pending marker is still rendered on that route \u2014 the "On
  // India" chip on `/about-us/leadership/senthil-kumar` \u2014 and an entry is owed
  // to it. It is now described as what it actually is.
  {
    id: "pending-india-note",
    claim: "What the Byonyks executive on the roster does for India",
    detail:
      "Senthil Kumar is the one Byonyks person on the leadership page; the other four are Akshar Byonyks', and every card says which company its subject works for. His biography is his own as published by Byonyks and describes a career in the United States, so on an India-market roster it leaves the obvious question unanswered. The client asked on 1 September 2026 for a note saying what he does for the India programme. It has not been supplied, and the profile publishes that question unanswered rather than answering it with a sentence nobody wrote.",
    provenance: {
      status: "pending",
      missing: "India note not yet supplied.",
    },
    appearsOn: [LEADERSHIP],
  },
  {
    id: "pending-team-structure",
    claim: "The Akshar Byonyks team structure",
    detail:
      "Which functions are hired in India, which are shared with Byonyks, and in what order, is not settled. Byonyks' own engineering, software, clinical, regulatory and field teams are Byonyks' and this site does not borrow them.",
    provenance: { status: "pending", missing: "India org structure not yet settled." },
    appearsOn: [CAREERS],
  },
  {
    id: "pending-spec",
    claim: "Four rows of the X-1 specification",
    detail:
      "Battery runtime, dimensions and weight, and fill volume and cycle programming are not published by Byonyks. The specification table leaves those rows empty rather than estimating them; clinicians can request the IFU for the underlying detail.",
    provenance: { status: "pending", missing: "Not published by Byonyks." },
    appearsOn: [X1],
  },
  {
    id: "pending-benefit-references",
    claim: "Clinical references for the four benefits",
    detail:
      "The four reasons peritoneal dialysis is offered are stated on the how-it-works page without citations attached. Each is awaiting a reference and a nephrologist's review before launch.",
    provenance: { status: "pending", missing: "Citations and clinical review outstanding." },
    appearsOn: [HOW],
  },
  {
    id: "pending-captions",
    claim: "Human-verified captions on the ByoTalks recordings",
    detail: `All ${byotalksSessions.filter((s) => s.captions === "auto").length} sessions play with YouTube's automatic captions. WCAG 2.1 SC 1.2.2 asks for captions that are accurate, and automatic transcription is unreliable on clinical vocabulary and across accents. Each player says so above the video.`,
    provenance: { status: "pending", missing: "Checked caption tracks not yet prepared." },
    appearsOn: [TALKS, { label: "Accessibility", href: "/accessibility" }],
  },
  {
    id: "pending-a11y-audit",
    claim: "An independent accessibility audit",
    detail:
      "The accessibility statement is written from this project's own automated and structural testing across fourteen routes at two viewports. No testing with real assistive technology and no third-party audit have been commissioned, so the site does not claim conformance.",
    provenance: { status: "pending", missing: "No independent audit commissioned." },
    appearsOn: [{ label: "Accessibility", href: "/accessibility" }],
  },
  {
    id: "pending-hindi-review",
    claim: "Review of the Hindi translation",
    detail:
      "The Hindi pages are a translation of approved English copy and have not been checked by a qualified medical translator. Until they have been, the English is authoritative and each Hindi page says so at the top.",
    provenance: { status: "pending", missing: "Translation not yet reviewed by a person." },
    appearsOn: [{ label: "हिन्दी", href: "/hi" }],
  },
  {
    id: "pending-india-hubs",
    claim: "Completion dates for the India manufacturing hubs",
    detail:
      "Hyderabad and Ahmedabad are described as under construction with no confirmed completion date. Akshar Byonyks does not manufacture the X-1 and this site does not describe it as the manufacturer.",
    provenance: { status: "pending", missing: "No confirmed completion dates." },
    // /locations puts the same two sites in front of a reader as rows of their
    // own (31 Aug 2026). Extending this entry rather than writing a second one:
    // a ledger with two entries for one gap is a ledger that can disagree with
    // itself about what is missing.
    appearsOn: [MARKET, LOCATIONS],
  },
  // `pending-india-address-line` was removed on 1 Sep 2026. It recorded that
  // Byonyks published the Bengaluru office with a dropped line in the middle
  // of the street address. That row is no longer on /locations, so the gap it
  // described no longer exists — what replaces it is the broader
  // `pending-address` above, which now covers the India office as well as the
  // registered office. One entry per missing fact, which is this file's rule.
];

// Derived from `locations.ts`, per this file's own rule: three premises, all
// of them Byonyks' published account of itself and none checked against a
// corporate register, so all three land on `stated`. The fourth row — the
// Akshar Byonyks India office, which carried `pending` because nothing about
// its address had been published — was removed on 2 Sep 2026 on the client's
// instruction; the gap it recorded survives as `pending-address` above. Each
// row's own `provenance` decides, not this comment.
//
// The gaps those rows carry are deliberately NOT mapped into entries here.
// Three of the four already exist above or in `fromCompliance` — the hubs'
// dates as `pending-india-hubs`, the CDSCO licence route as
// `pending-cdsco-route`, the ISO 13485 certificate number as a compliance
// credential — and the fourth is `pending-india-address-line` directly above.
// Deriving them a second time would put two rows on `/what-we-know` for one
// missing fact.
const fromLocations: readonly LedgerEntry[] = locations.map((site): LedgerEntry => {
  // "India, India" is what the naive template produced once the Bengaluru row
  // was replaced by a site that names only its country. A ledger row that
  // reads like a bug is a ledger nobody trusts on the rows that matter.
  const where =
    site.place === site.country ? site.country : `${site.place}, ${site.country}`;

  return {
    id: `location-${site.id}`,
    claim:
      site.status === "planned"
        ? `${site.entity} has announced a facility at ${where}`
        : `${site.entity} operates from ${where}`,
    detail: site.detail,
    provenance: site.provenance,
    appearsOn: [LOCATIONS],
  };
});

export const ledger: readonly LedgerEntry[] = [
  ...fromCompliance,
  ...fromFigures,
  ...fromLocations,
  ...gaps,
];

export const ledgerCounts: Record<ProvenanceStatus, number> = {
  record: ledger.filter((e) => e.provenance.status === "record").length,
  published: ledger.filter((e) => e.provenance.status === "published").length,
  stated: ledger.filter((e) => e.provenance.status === "stated").length,
  pending: ledger.filter((e) => e.provenance.status === "pending").length,
};

export const ledgerOrder: readonly ProvenanceStatus[] = [
  "record",
  "published",
  "stated",
  "pending",
];

export function ledgerByStatus(status: ProvenanceStatus): readonly LedgerEntry[] {
  return ledger.filter((entry) => entry.provenance.status === status);
}

// ---------------------------------------------------------------------------
// Module-load contracts, in the manner of `leadership.ts` and `news-data.ts`.
// A ledger of provenance that is itself sloppy would be worse than no ledger.
// ---------------------------------------------------------------------------

const seenIds = new Set<string>();
for (const entry of ledger) {
  if (seenIds.has(entry.id)) {
    throw new Error(`claims-ledger: duplicate entry id "${entry.id}".`);
  }
  seenIds.add(entry.id);

  if (!entry.claim.trim()) {
    throw new Error(`claims-ledger: entry "${entry.id}" has an empty claim.`);
  }

  if (entry.appearsOn.length === 0) {
    throw new Error(
      `claims-ledger: entry "${entry.id}" names no page. A claim nobody can find on the site ` +
        "does not belong in a ledger of what the site says.",
    );
  }

  // The point of the whole file: a claim that says it is checkable must carry
  // the thing you check it against.
  const p = entry.provenance;
  if (p.status === "record" && !p.source.url) {
    throw new Error(
      `claims-ledger: "${entry.id}" claims the public record without a URL to open.`,
    );
  }
  if (p.status === "pending" && !p.missing.trim()) {
    throw new Error(
      `claims-ledger: "${entry.id}" is pending without saying what is missing. ` +
        '"Pending" on its own tells a reader nothing they can act on.',
    );
  }
}
