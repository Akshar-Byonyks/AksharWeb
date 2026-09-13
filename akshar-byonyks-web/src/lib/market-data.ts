// The India market case, and the sources under it.
//
// This file exists because of one line in the spec's component table (§7.2):
// "Stat block — Number, label, **required source footnote slot**. Cannot
// render without a source." On every other page that rule is a habit. Here it
// is the page's entire subject, so it is a type instead: a `Figure` cannot be
// constructed without a `source`, and `sourceNumber()` throws on an id that is
// not in the register below. A figure with no citation is a build error, not a
// review finding.
//
// CUT IN HALF, 28 AUG 2026. The first build of this page carried about
// twenty-two figures across nine sections and was correctly called
// unreadable. Spec §4.1 asks for content "denser, more numeric and more sober
// than the rest of the site," and that was read as licence rather than as a
// description of a register a person still has to get through. What went, and
// why, is recorded at each deletion below rather than summarised here, because
// the reasoning is different in each case and a reader deciding whether to put
// something back needs the specific one.
//
// The rule that survived the cut: a figure earns its place by being load-
// bearing for the argument, not by being available. Every number that remains
// is one the case collapses without.
//
// WHAT THIS FILE IS NOT. It is not a resolution of Open Questions 1.8. That
// item asks for the client's own confirmed source pack, and this is a
// literature pass standing in front of it: every figure below is a real,
// published, currently retrievable number from a peer-reviewed journal or from
// the Government of India, quoted at the value its source states. None of it
// has had client or legal sign-off, and §14.4's launch gate still applies.
//
// THE DATING PROBLEM, STATED PLAINLY. Indian dialysis epidemiology is not
// continuously registered. The best available national figures are 2018–2019
// vintage and reach us through review articles rather than through a live
// registry. Reimbursement figures move faster than that, and the costing study
// below is 2015–16 fieldwork. Every figure therefore carries the year it
// *describes*, not the year it was published, and the two are shown separately
// wherever a reader could confuse them. A number whose age is visible is
// usable; a number whose age is hidden is not.
//
// ONE CORRECTION ON THE RECORD. byonyks.com's market page states Guatemala at
// 56% peritoneal dialysis. The published figure is 45% (Kidney360, 2020, for
// 2019). The spec called that comparison "a good rhetorical device and should
// be kept" — it is kept, at the number its source actually gives. This is the
// exact failure mode §5's P1 defect describes: one claim carried at two
// different values because nobody went back to the source.

export type Source = {
  /** Stable key. Used by figures; determines nothing about display order. */
  readonly id: string;
  /**
   * What a reader actually sees beside a figure, since the numbered register
   * was cut (28 Aug 2026). Journal or issuing body plus year — short enough to
   * sit on a date line, specific enough to be looked up without this site's
   * help. This is the whole visible citation now, so it may not be an
   * abbreviation only an academic would resolve.
   */
  readonly shortName: string;
  /**
   * WHAT KIND OF SOURCE THIS IS - added 3 Sep 2026, when the client asked
   * for the site's citations to come off the pages while the record was
   * kept.
   *
   * The two kinds were always different in nature and the site was treating
   * them alike. A register is an official body's own published document: a
   * reader following it is checking a fact about a regulated device against
   * the authority that holds it. A research source supports an estimate -
   * market size, cost, modality share - where the citation is scholarly
   * courtesy rather than the thing that makes the statement true.
   *
   * Only registers are rendered now. Cite reads this field and nothing
   * else, which is why the decision lives here beside the sources rather
   * than as a list of ids inside a component: adding a source forces the
   * author to say which kind it is, and the renderer cannot be wrong about
   * one it has not seen.
   *
   * NOTHING IS DELETED. Both kinds stay in this file in full, and both are
   * written into SOURCES.md by scripts/generate-sources.mjs on every build.
   */
  readonly kind: "register" | "research";
  /** The full citation. Retained for structured data and for review. */
  readonly citation: string;
  /** Who stands behind it — the half a sceptical reader checks first. */
  readonly publisher: string;
  /** Year of publication. */
  readonly published: string;
  /** The period the figures actually describe. Often not `published`. */
  readonly describes: string;
  readonly url: string;
};

/**
 * The sources.
 *
 * NOT ONLY THE MARKET PAGE'S, SINCE 11 SEP 2026. The file is still named for
 * the market because that is where every source in it originated and renaming
 * a module that fourteen files import is not worth the churn — but this is now
 * the site's one source register, and `/innovation/how-it-works` cites two
 * entries in it. Anything that needs a citation registers it here, so that
 * SOURCES.md has one list to walk and there is one place to look for whether a
 * source is already known.
 *
 * Order no longer carries meaning: the numbered register section
 * at the foot of the page was cut on 28 Aug 2026 for ending the page on a wall
 * of grey text, and citations are now inline — `shortName` beside the figure,
 * linked to the source itself.
 *
 * That change removed the apparatus, not the attribution. PRODUCT.md's third
 * principle ("no statistic ships without a source and a date") and spec §7.2
 * ("cannot render without a source") are non-negotiable, and a market page
 * quoting unattributed figures to investors is the specific risk they exist to
 * prevent. Inline attribution satisfies both and is *less* visually heavy than
 * a superscript pointing at a list, which was the actual complaint.
 */
// THE APPROX SIGN CARRIES A NO-BREAK SPACE (3 Sep 2026). Every "≈" in this
// file is followed by U+00A0, not by a plain space and not by nothing.
//
// Nothing: "≈175,000" set the sign hard against the 1 at 60px, which is where
// these values actually render — it read as one glyph rather than as a
// qualifier on a number.
//
// A plain space: correct width, wrong behaviour. It is a break opportunity, so
// a narrow column could leave the "≈" alone at the end of a line with its
// figure on the next one — a number that says "approximately" on one line and
// gives the value on another has lost the qualifier for anyone skimming.
//
// U+202F, the narrow no-break space, was measured and rejected: in Noto Sans
// at display size it renders at effectively zero width, so it is
// indistinguishable from no space at all.
//
// The word-valued figures ("≈ two thirds", "≈ a quarter") carry it too. They sit
// in the same registers as the numeric ones — one of them is the largest
// figure on the page — and spacing only the numerals would read as a defect in
// the ones left out.

export const marketSources = [
  {
    id: "pmndp",
    kind: "register",
    shortName: "Health Ministry, Government of India",
    citation:
      "Pradhan Mantri National Dialysis Programme: programme guidelines and national portal.",
    publisher: "Ministry of Health and Family Welfare, Government of India",
    published: "2016, portal current 2026",
    describes: "Annual national incidence and programme design",
    url: "https://pmndp.mohfw.gov.in/en/introduction-of-pradhan-mantri-national-dialysis-program-pmndp",
  },
  {
    id: "gkha-india",
    kind: "research",
    shortName: "Kidney360, 2020",
    citation:
      "Bharati J, Jha V. “Global Dialysis Perspective: India.” Kidney360 1(10):1143–1147.",
    publisher: "American Society of Nephrology",
    published: "2020",
    describes: "Chiefly 2018–2019 national estimates",
    url: "https://doi.org/10.34067/KID.0003982020",
  },
  {
    id: "hd-cost",
    kind: "research",
    shortName: "Clinical Kidney Journal, 2018",
    citation:
      "Kaur G, Prinja S, Ramachandran R, Malhotra P, Gupta KL, Jha V. “Cost of hemodialysis in a public sector tertiary hospital of India.” Clinical Kidney Journal 11(5):726–733.",
    publisher: "Oxford University Press for the ERA",
    published: "2018",
    describes: "Fieldwork April 2015 – March 2016",
    url: "https://doi.org/10.1093/ckj/sfx152",
  },
  {
    id: "pd-first",
    kind: "research",
    shortName: "Clinical Kidney Journal, 2022",
    citation:
      "Gupta D, Jyani G, Ramachandran R, et al. “Peritoneal dialysis–first initiative in India: a cost-effectiveness analysis.” Clinical Kidney Journal 15(1):128–135.",
    publisher: "Oxford University Press for the ERA",
    published: "2022",
    describes: "2019 costs; 2018 patient counts",
    url: "https://doi.org/10.1093/ckj/sfab126",
  },
  {
    id: "ijn-pd",
    kind: "research",
    shortName: "Indian Journal of Nephrology, 2024",
    citation:
      "Natarajan H. “Peritoneal Dialysis in the Comfort of Home — Regain Your Independence.” Indian Journal of Nephrology 34(2):103–104.",
    publisher: "Indian Society of Nephrology",
    published: "2024",
    describes: "Editorial estimates, 2024",
    url: "https://doi.org/10.25259/ijn_374_23",
  },
  // THE TWO KDIGO REPORTS (11 Sep 2026). They arrived on the how-it-works
  // page first, as a References block rendered beside the four benefit
  // claims, and they were moved in here the same week on the client's
  // instruction: "References should be placed in separate document with the
  // rest of the sources."
  //
  // This is that instruction read literally, and it is the same instruction
  // the 3 Sep pass acted on — visible sourcing comes off the pages, nothing
  // is deleted from the data, SOURCES.md is where the evidence lives. Putting
  // them in this array rather than in a second registry is what makes them
  // land there: scripts/generate-sources.mjs walks this array and writes
  // every entry, and `kind: "research"` is what keeps them off the page.
  //
  // `kind` IS "research" AND THAT IS A JUDGEMENT, NOT A DEFAULT. A register is
  // an official body's own document about a regulated thing, where the link is
  // what makes the statement checkable. KDIGO is a guideline developer, not a
  // regulator, and neither of these is even a guideline — see the comment on
  // `kdigo-home` below. So they are research, and they do not render.
  //
  // THE URLS GO TO KDIGO'S OWN PDFs rather than to the journal. Both were
  // fetched and read on 11 Sep 2026; kidney-international.org and PubMed both
  // refuse an automated fetch, and a citation a reader cannot open is not a
  // citation.
  {
    id: "kdigo-home",
    kind: "research",
    shortName: "KDIGO Controversies Conference on Home Dialysis, 2023",
    // NOT A GUIDELINE, AND THE CITATION SAYS SO IN ITS OWN WORDS. Searching
    // kdigo.org as instructed settled first what KDIGO does and does not
    // publish: it has no clinical practice guideline on dialysis modality, on
    // peritoneal dialysis or on the peritoneal membrane. Its guideline
    // programme covers anaemia, blood pressure, CKD evaluation, CKD-MBD,
    // diabetes, glomerular disease, heart failure, hepatitis C, lipids, AKI,
    // ADPKD and transplantation. Everything KDIGO says about peritoneal
    // dialysis is in its Controversies Conference reports. Citing a
    // conference conclusion as though it were a guideline recommendation
    // would overstate it by a whole tier of evidence, so the word
    // "Controversies Conference" is in the short name where it cannot be
    // dropped by a renderer that only prints the short form.
    citation:
      "Conclusions from a Kidney Disease: Improving Global Outcomes (KDIGO) Controversies Conference on home dialysis. Kidney International 103(5):842–858.",
    publisher: "KDIGO, published in Kidney International",
    published: "2023",
    describes: "Conference conclusions on home dialysis, including cost",
    url: "https://kdigo.org/wp-content/uploads/2023/04/Home-Dialysis-Conclusions-from-a-KDIGO-Controversies-Conference.pdf",
  },
  {
    id: "kdigo-initiation",
    kind: "research",
    shortName:
      "KDIGO Controversies Conference on Dialysis Initiation, Modality Choice, Access and Prescription, 2019",
    citation:
      "Conclusions from a Kidney Disease: Improving Global Outcomes (KDIGO) Controversies Conference on dialysis initiation, modality choice, access, and prescription. Kidney International 96(1):37–47.",
    publisher: "KDIGO, published in Kidney International",
    published: "2019",
    describes:
      "Conference conclusions on modality choice, residual kidney function and adequacy",
    url: "https://kdigo.org/wp-content/uploads/2017/02/KDIGO-Dialysis-Initiation-conf-report-FINAL.pdf",
  },
  {
    id: "gkha-guatemala",
    kind: "research",
    shortName: "Kidney360, 2020",
    citation:
      "García P, Sánchez-Polo V. “Global Dialysis Perspective: Guatemala.” Kidney360 1(11):1300–1305.",
    publisher: "American Society of Nephrology",
    published: "2020",
    describes: "2019 national figures",
    url: "https://doi.org/10.34067/KID.0004092020",
  },
] as const satisfies readonly Source[];

export type SourceId = (typeof marketSources)[number]["id"];

/**
 * Resolve a figure's source for display.
 *
 * Throws rather than returning a fallback. A figure that silently rendered
 * without its attribution is precisely the failure this page cannot have — and
 * with the register gone there is no longer a numbered list where a missing
 * entry would be obvious on sight, so the type system is the only thing left
 * catching it.
 */
export function getSource(id: SourceId): Source {
  const source = marketSources.find((entry) => entry.id === id);
  if (!source) {
    throw new Error(
      `market-data: no source registered for id "${id}". Every figure on /innovation/market/ and every referenced claim elsewhere must cite a source in marketSources.`
    );
  }
  return source;
}

/**
 * A figure that may be shown to a reader. `source` is required and there is no
 * variant of this type without it, which is the whole point of the file.
 *
 * `value` is the number as it should read on screen, already formatted for an
 * Indian audience — lakh where the source uses it, because that is how the
 * Government of India states its own figure and re-expressing it in millions
 * would be a silent edit of a quoted number.
 */
export type Figure = {
  readonly value: string;
  readonly label: string;
  readonly detail: string;
  readonly source: SourceId;
  /** The year or period this specific number describes. */
  readonly asOf: string;
};

// ---------------------------------------------------------------------------
// Leg 1: scale. Spec §3.3 — "India's CKD and ESKD burden, new dialysis starts
// per year, and the gap between patients who need dialysis and patients who
// get it."
//
// Three figures, in the order that makes the gap assemble itself: what arrives
// each year, what is actually being treated, and what happens to the
// difference. No sentence performs the arithmetic. §4.1's audience does not
// need it done for them and tends to distrust a page that does it.
//
// CUT: "3.4 crore additional dialysis sessions a year." It is the same
// incidence figure from the same sentence of the same source, restated as
// throughput — which meant a reader had to convert crore-of-sessions into
// people to see it was not new information. One unit per idea.
// ---------------------------------------------------------------------------
export const scaleFigures: readonly Figure[] = [
  {
    value: "2.2 lakh",
    label: "New end-stage renal disease patients each year",
    detail:
      "The Government of India’s own planning figure for the programme it built to treat them.",
    source: "pmndp",
    asOf: "Stated in the 2016 programme guidelines, carried on the current portal",
  },
  {
    value: "≈ 175,000",
    label: "People actually on chronic dialysis",
    detail:
      "Everyone on dialysis in the country, against the yearly arrivals above.",
    source: "gkha-india",
    asOf: "2018 estimate",
  },
  {
    value: "≈ two thirds",
    label: "Share of people with kidney failure who died without dialysis",
    detail:
      "The difference between those two numbers is not a waiting list. This is what it is.",
    source: "gkha-india",
    asOf: "2010 data, reported 2020",
  },
];

// ---------------------------------------------------------------------------
// Leg 2: access geometry. Spec §3.3 names this "the strongest single argument
// in the Indian market and byonyks.com barely makes it." It is the only leg
// whose numbers describe a road rather than a ledger, and after the cut it is
// the leg the page is built around rather than one of four equals.
//
// The distance figures are stated in Bharati and Jha 2020, which attributes
// them to its own reference 2 (Dare et al., Lancet Global Health 2017). That
// primary paper is a mortality study and its full text is paywalled to this
// build, so the attribution below is to the paper in which the sentence
// actually appears, not to the one it points at. If someone later reads the
// primary and confirms it, move the citation — do not add it on the strength
// of a footnote nobody has opened.
//
// CUT: the Aarogyasri retention figure ("53% still on hemodialysis after six
// months"). It made the same point as the dropout figure below it and made it
// backwards — a reader had to invert 53% to see the loss, having just read two
// figures that state their quantity directly.
// ---------------------------------------------------------------------------

/**
 * Named because `access-geometry.tsx` also states it in prose above the
 * register. A figure that appears twice on one page and is typed twice will
 * eventually disagree with itself — spec §5's P1 defect in miniature, and the
 * one failure this page cannot survive.
 */
export const TRAVEL_OVER_50KM: Figure = {
  value: "≈ 60%",
  label: "Travel more than 50 km to reach hemodialysis",
  detail:
    "Not once. Three times a week, indefinitely, usually with someone accompanying them.",
  source: "gkha-india",
  asOf: "Reported 2020",
};

/** Restated in prose. See the note on TRAVEL_OVER_50KM. */
export const LIVE_OVER_100KM: Figure = {
  value: "≈ a quarter",
  label: "Live more than 100 km from the facility",
  detail:
    "At this distance the journey, not the therapy, sets the shape of the week.",
  source: "gkha-india",
  asOf: "Reported 2020",
};

export const accessFigures: readonly Figure[] = [
  TRAVEL_OVER_50KM,
  LIVE_OVER_100KM,
  {
    value: "70–80%",
    label: "Estimated dropout after starting dialysis",
    detail:
      "Attributed to affordability, access to a centre, and whether a caregiver is available. Two of those three are the trip.",
    source: "ijn-pd",
    asOf: "2024 estimate",
  },
];

// ---------------------------------------------------------------------------
// Leg 3: cost and coverage. Spec §3.3 requires that "every number carries a
// date and a source since reimbursement policy changes." The costing study is
// 2015–16 fieldwork and is labelled as such everywhere it appears; it is used
// because it is the best public-sector costing available, not because it is
// current.
//
// CUT, and this is the largest cut on the page:
//
//   - The peritoneal-dialysis-first quality-adjusted life year figures ("3.3
//     vs 1.6"). QALY is a term of art that was never defined, it sat closest
//     to the Drugs and Magic Remedies Act 1954 line of anything on the site,
//     and the hedging required to state it safely was longer than the finding.
//     The study's conclusion survives as one sentence with a citation and no
//     number attached, which is the part an investor actually acts on.
//   - Both modelled lifetime savings (₹92,105 and ₹6,97,000). They are two
//     scenarios of one model and nothing on the page made that legible, so
//     they read as the same claim at two contradictory values.
//   - "How those households found the money" (borrowed / savings / sold
//     assets). Genuinely affecting, and it was illustrating a finding the
//     ladder below already proves. Illustration is what gets cut first.
//   - The health-system cost per session (₹4,148). It is what the state pays,
//     and this leg's argument is about what the household pays.
// ---------------------------------------------------------------------------
export const costFigures: readonly Figure[] = [
  {
    value: "₹2,838",
    label: "Out-of-pocket cost to the patient, per session",
    detail:
      "Paid by the household in a public hospital where the treatment itself is already subsidised.",
    source: "hd-cost",
    asOf: "2015–16 fieldwork",
  },
  {
    value: "35%",
    label: "Share of people on dialysis with any insurance cover",
    detail:
      "Which leaves the household as the largest single payer for dialysis in India.",
    source: "gkha-india",
    asOf: "2017–18",
  },
];

/**
 * The finding the whole cost leg exists to deliver, and the reason it is a
 * shape of its own rather than three more register rows.
 *
 * The point is not that dialysis is expensive. It is that the *schedule* is
 * what makes it ruinous: one session pushes about a ninth of households over
 * the line, and the same session at three times a week pushes more than half.
 * That is leg 2's argument arriving through the ledger instead of along the
 * road, and it is the strongest single item on the page.
 *
 * "Catastrophic health expenditure" is the source's term and it has a precise
 * meaning that the first build used without ever giving: out-of-pocket
 * spending at or above 40% of everything the household spends outside food.
 * `plainThreshold` is that definition in words a reader has, and the component
 * states it before any percentage appears.
 */
export const catastropheLadder = {
  source: "hd-cost" as SourceId,
  asOf: "2015–16 fieldwork",
  plainThreshold:
    "more than 40% of everything the household spends outside food",
  steps: [
    { frequency: "A single session", share: "11.1%", percent: 11.1 },
    { frequency: "Twice a week", share: "38.1%", percent: 38.1 },
    { frequency: "Three times a week", share: "51.9%", percent: 51.9 },
  ],
} as const;

// ---------------------------------------------------------------------------
// Leg 4: modality mix. The Guatemala comparison the spec asked to keep, at the
// value its source states rather than the one the US site carries.
//
// CUT from the register, then cut altogether on client instruction
// (12 Sep 2026): the 2024 estimate of ~6,500 people on peritoneal dialysis.
// It was first demoted from the figure register to a footnote under the
// Guatemala comparison, on the reasoning that deleting an inconvenient later
// figure outright is a different act from subordinating it. The client asked
// for the footnote to come off, so the figure no longer appears anywhere on
// the site and its ledger entry (402) was withdrawn with it. The source
// `ijn-pd` is untouched and still available should the number return.
// ---------------------------------------------------------------------------
export const modalityFigures: readonly Figure[] = [
  {
    value: "≈ 175,000",
    label: "On hemodialysis in India",
    detail: "",
    source: "pd-first",
    asOf: "2018",
  },
  {
    value: "≈ 8,500",
    label: "On peritoneal dialysis in India",
    detail: "Fewer than one in twenty people on dialysis.",
    source: "pd-first",
    asOf: "2018",
  },
];


/** The comparison the fourth leg exists to make. */
export const GUATEMALA_PD_SHARE: Figure = {
  value: "45%",
  label: "Share of dialysis patients on peritoneal dialysis in Guatemala",
  detail:
    "Among 9,245 people on dialysis, one of the highest shares in Latin America, in a country with a fraction of India’s health budget.",
  source: "gkha-guatemala",
  asOf: "2019",
};
