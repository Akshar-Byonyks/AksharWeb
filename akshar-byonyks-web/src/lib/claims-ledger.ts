import type { Provenance, ProvenanceStatus } from "@/components/common/provenance";
import { byotalksSessions } from "@/lib/byotalks";
import { indiaLicensing } from "@/lib/claims";
import { companyStated, publicRecord } from "@/lib/compliance";
import { locations } from "@/lib/locations";
import { benefits } from "@/lib/pd-benefits";
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
// CONTACT was retired from this list on 11 September 2026. It existed for one
// entry -- the India office address -- and that entry closed when the client
// supplied the address. /contact now carries no pending note of any kind,
// which is a first for this site. Put the constant back if a gap ever lands on
// that route again.
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
// Derived: the four therapy claims on /innovation/how-it-works.
//
// NEW 11 SEP 2026, AND THEY EXIST BECAUSE THE PAGE STOPPED SHOWING THEM.
// The client's instruction was "References should be placed in separate
// document with the rest of the sources". The references came off
// pd-benefits.tsx the same day, and if they had come off without landing
// anywhere this would have been a deletion dressed as a filing decision. This
// is where they land: three sourced claims and one declared gap, derived from
// the same four records the page renders, so /what-we-know and SOURCES.md
// carry the evidence the page no longer prints.
//
// THE NOTE IS THE POINT OF EACH ENTRY, not the link. On three of these four
// the source concludes something NARROWER than the claim it sits under -- one
// of them reverses what the claim used to say -- and pd-benefits.ts throws at
// module load for a source cited without a note, for exactly that reason. The
// detail below carries the claim and then that qualification, in that order.
//
// `asOf` IS THE REPORT'S YEAR. For a figure it is the period the number
// describes; for a conference conclusion the two are the same thing, because
// what is being cited is what a body concluded at a particular sitting.
// ---------------------------------------------------------------------------

const fromBenefits: readonly LedgerEntry[] = benefits.map(
  (benefit, index): LedgerEntry => {
    if (!benefit.source) {
      return {
        id: `pending-benefit-${index}`,
        claim: `A reference for "${benefit.title}"`,
        detail: benefit.pending!,
        provenance: {
          status: "pending",
          missing: "No published reference identified for this claim.",
        },
        appearsOn: [HOW],
      };
    }
    const source = getSource(benefit.source);
    return {
      id: `benefit-${benefit.source}-${index}`,
      claim: benefit.title,
      detail: `${benefit.body} ${benefit.note}`,
      provenance: {
        status: "published",
        source: { label: source.shortName, url: source.url },
        asOf: source.published,
      },
      appearsOn: [HOW],
    };
  },
);

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
  // `pending-licence-scope` was removed on 11 September 2026. It recorded
  // that the licence was confirmed to exist but that its exclusivity, its
  // territory and whether it reached past the X-1 had never been supplied.
  // The client answered all three that day — "License is exclusive to India
  // covers all machines. X2 and X2,3 as well." — so the gap is closed rather
  // than restated. The wording is `licenceScope` in `claims.ts` and it
  // renders on /products and in the /about-us milestone.
  //
  // IT IS CLOSED AS A GAP, NOT UPGRADED TO A VERIFIED FACT. Nobody on this
  // project has read the agreement, and an exclusive licence is the kind of
  // claim an investor checks. It is carried at `stated` provenance in the
  // licensee's own words. A ledger entry records what is MISSING; this is no
  // longer missing, and the provenance scale is where "unverified from here"
  // continues to be said.
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
  // `pending-address` was removed on 11 September 2026. The client supplied
  // the India office address, and it is published on /contact, /locations,
  // /privacy-policy and /terms-of-use. The oldest gap in this project — Open
  // Question 1.1, and a §14.4 launch gate — is closed.
  //
  // WHAT DID NOT CLOSE WITH IT, and why it is a separate entry rather than a
  // caveat on this one: the address is a care-of correspondence address, and
  // `pending-india-entity` below records that nobody has yet decided whether
  // an Indian entity will exist to hold a REGISTERED office. The governing-law
  // clause on /terms-of-use turns on the second fact, not the first. One entry
  // per missing fact, which is this file's rule.
  {
    id: "pending-india-entity",
    claim: "The Indian entity, and the registered office it would hold",
    detail:
      "The India office address published on this site is a correspondence address held care of a third party. Whether an Indian LLP or subsidiary will be formed as the operating entity has not been decided, so no registered office can be named — which is why the terms of use do not name the courts having jurisdiction, and why no machine-readable address is published on the locations page.",
    provenance: {
      status: "pending",
      missing: "Indian entity not yet decided.",
    },
    appearsOn: [
      LOCATIONS,
      { label: "Terms of use", href: "/terms-of-use" },
    ],
  },
  // `pending-phone` was removed on 1 Sep 2026. The number published in the
  // contact band was a placeholder for the life of this project; the client
  // supplied a real, staffed line that day, so the gap it recorded is closed
  // rather than restated. See `src/lib/site-config.ts`.
  // `pending-grievance-officer` was removed on 11 September 2026. The DPDP
  // Act 2023 requires a named officer with published contact details; the
  // client named Rashmin Gandhi, and /grievance-redressal and /privacy-policy
  // print the name, the postal address and two ways to reach him. This was a
  // launch-blocking gap and it is closed.
  //
  // THE EXACT WORDING IS IN `site-config.ts` AND MATTERS. The client wrote
  // "Grievance officer can be Rashmin Gandhi" — a designation rather than a
  // confirmation. It is published because the alternative was worse: leaving
  // a note saying nobody had been appointed after the client named somebody
  // would be the site contradicting its own client on a legal page. If the
  // appointment is not final, `grievanceOfficer` is the one place to change.
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
    // ADDED 11 SEP 2026 with the record it describes. Deviation 30 is the
    // reason it is added in the same commit rather than a week later: this
    // register goes stale the moment the roster is edited and nothing catches
    // it but a person reading both.
    //
    // WHY IT IS ONE ENTRY AND NOT TWO. The title and the biography are
    // missing from the same record, for the same reason -- they have not been
    // supplied -- and they will arrive together. Two entries would put two
    // rows on /what-we-know for one email that has not been sent.
    id: "pending-tank-record",
    claim: "Dr. Yogesh Tank's job title and biography",
    detail:
      "His record was supplied with a name, post-nominals and a photograph and nothing else. The roster card says \"Title to be confirmed\" and the profile says the biography is pending, rather than reading a title out of the post-nominals or writing a paragraph here about a real person. \"MD\" says he is a physician; it does not say what he does at this company.",
    provenance: {
      status: "pending",
      missing: "Title and biography not yet supplied.",
    },
    appearsOn: [LEADERSHIP],
  },
  {
    id: "pending-india-note",
    claim: "What the Byonyks executive on the roster does for India",
    // REWRITTEN 11 SEP 2026, AND THIS TIME BEFORE IT WENT STALE. Deviation 30
    // records how this entry's predecessor came to be publishing sentences
    // its own page contradicted: four client instructions landed on the
    // leadership records and nobody re-read the ledger beside them. The same
    // instruction set that removes the rendered "On India / Pending" block
    // from Senthil Kumar's profile therefore edits this entry in the same
    // commit.
    //
    // THE GAP DID NOT CLOSE; ITS MARKER DID. The note the client asked for on
    // 1 September has still not been supplied. What changed on 11 September
    // is that the client asked for the block that said so to come off the
    // profile — so the question is now unanswered AND unasked on the page,
    // which is exactly the kind of silent gap "/what-we-know" exists to keep
    // a record of. Do not close this entry until the note arrives.
    detail:
      "Senthil Kumar is the one Byonyks person on the leadership page; the other four are Akshar Byonyks', and every card says which company its subject works for. His biography is his own as published by Byonyks and describes a career in the United States, so on an India-market roster it leaves the obvious question unanswered. The client asked on 1 September 2026 for a note saying what he does for the India programme, and it has not been supplied. The profile carried a pending block saying so until 11 September 2026, when the client asked for that block to come off; the question is now neither answered nor visibly asked on the page, and this entry is the only place it is recorded.",
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
    // SPLIT IN TWO ON 11 SEP 2026, AND THE ID CHANGED WITH IT. This was
    // "pending-benefit-references", one entry carrying two different gaps:
    // that the four therapy claims had no citations, and that no nephrologist
    // had read them. The first of those is now three derived `published`
    // entries in `fromBenefits` above and one derived `pending` entry for
    // the peritoneal membrane claim, which is where a gap belongs once the
    // data can express it. What is left is the half a citation cannot
    // discharge, and it keeps an entry of its own under this file's rule of
    // one entry per missing fact.
    //
    // The id changed because the claim changed. Keeping
    // "pending-benefit-references" over a record that no longer says anything
    // about references would be the stale-label failure deviation 30 is
    // about, and nothing outside SOURCES.md -- which is regenerated -- reads
    // these ids.
    id: "pending-benefit-review",
    claim: "A nephrologist's review of the four therapy claims",
    detail:
      "The four reasons peritoneal dialysis is offered are written from published sources by people who are not clinicians. Three now rest on KDIGO Controversies Conference conclusions and are worded to say no more than those conclusions do; the fourth has no reference. None of the four has been read by a nephrologist, and a citation cannot stand in for that.",
    provenance: { status: "pending", missing: "No clinical review of the therapy claims." },
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
    // REFRAMED 11 SEPTEMBER 2026, and the id is deliberately unchanged. The
    // dates arrived — Summer 2027 for Hyderabad, Late 2027 for Ahmedabad —
    // so the claim this entry names moved from "when" to "under what
    // licence". Keeping the id means the /locations and /innovation/market
    // routes it is attached to do not silently lose their entry, and it keeps
    // one entry for what is still one gap: these are announced buildings with
    // no published authority to make anything in them.
    //
    // Deviation 30 is the reason this was rewritten in the same commit as the
    // data rather than a week later. A ledger of gaps goes stale the moment
    // the thing it describes is edited, and nothing enforces that but a
    // person reading both.
    id: "pending-india-hubs",
    claim: "What the India hubs will be licensed to do",
    detail:
      "Hyderabad and Ahmedabad are under construction, and the client has given expected completion dates of Summer 2027 and Late 2027. Those are expectations rather than commitments. No operating entity and no CDSCO manufacturing licence has been published for either site, which is why neither is described here as a manufacturing facility — that is a separate licence route under the Medical Device Rules 2017.",
    provenance: { status: "pending", missing: "No CDSCO manufacturing licence or operating entity published." },
    // /locations puts the same two sites in front of a reader as rows of their
    // own (31 Aug 2026). Extending this entry rather than writing a second one:
    // a ledger with two entries for one gap is a ledger that can disagree with
    // itself about what is missing.
    appearsOn: [MARKET, LOCATIONS],
  },
  // `pending-india-address-line` was removed on 1 Sep 2026. It recorded that
  // Byonyks published the Bengaluru office with a dropped line in the middle
  // of the street address. That row left /locations the same day, so the gap
  // it described stopped existing. It was replaced by the broader
  // `pending-address`, which covered the India office and the registered
  // office together — and THAT entry closed on 11 Sep 2026 when the client
  // supplied the address. What survives of the pair is
  // `pending-india-entity` above, which carries the half an address cannot
  // answer: whether an Indian entity will exist to hold a registered office.
  // One entry per missing fact, which is this file's rule.
];

// Derived from `locations.ts`. FOUR PREMISES SINCE 11 SEP 2026, not three:
// the Akshar Byonyks India office came back onto that page when the client
// supplied its address, after nine days in which every row was Byonyks'.
//
// ALL FOUR LAND ON `stated`, AND THE REASON IS NOW TWO REASONS RATHER THAN
// ONE. Three rows are Byonyks' published account of itself, unchecked against
// a corporate register. The fourth is this company's own account of its own
// office, supplied directly — which is a different kind of source and the same
// verification status, because nobody on this project has checked it against a
// register either. Each row's own `provenance` decides, not this comment.
//
// The gaps those rows carry are deliberately NOT mapped into entries here.
// Every one of them already exists above or in `fromCompliance` — the hubs'
// licence position as `pending-india-hubs`, the CDSCO route as
// `pending-cdsco-route`, the ISO 13485 certificate number as a compliance
// credential, and the India office's care-of status as
// `pending-india-entity`. Deriving them a second time would put two rows on
// `/what-we-know` for one missing fact.
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
  ...fromBenefits,
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
