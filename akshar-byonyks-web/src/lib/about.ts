import { licenceScope } from "@/lib/claims";

// Who Akshar Byonyks is: the origin, the timeline, and what is still blocked.
//
// MEASURED BEFORE IT WAS BUILT (29 Aug 2026), which is the process change
// `/manufacturing/` paid for. Twelve facts this page might carry were checked
// against the rendered copy of the other seven pages first. **Four were new.**
// The founder narrative, the founder's name, the milestone arc and the company
// values appear nowhere else on the site; everything else — the licensing
// sentence, the clearance, the India regulatory position — is already stated,
// most of it on three pages.
//
// That result reshaped the page rather than decorating it. Spec §9.5 gives
// `/about-us/` "who Akshar Byonyks is, the licensing relationship per §3.1,
// links to the three children" and puts the founder narrative on a separate
// `/about-us/our-story/`. Followed literally, the hub would have been built
// almost entirely out of the eight facts that already exist, and the four that
// do not would have gone on a different page. So the story is here, and the
// child page is not built.
//
// THE FOUNDER STORY IS NOT AKSHAR BYONYKS'. This is the finding that governs
// the whole file. Spec §9.5 says to migrate the narrative from
// byonyks.com/the-vision/ — the aunt on dialysis, the mother's diabetes risk,
// the wish for a needleless treatment at home. That page is signed **Farrukh
// Usman, Founder and CEO** — of **Byonyks**. Akshar Byonyks is a separate
// Indian entity whose own founders are Open Question 1.4 and are not known to
// this project.
//
// Migrating "my aunt" into the first person on aksharbyonyks.com would invent
// an origin for a company that has not told us its own. It is the same error
// as re-badging a factory, arriving through a story instead of a certificate.
// So the narrative is **quoted and attributed by name**, and the page says
// plainly whose company it started.

/**
 * The origin, in the founder's own words.
 *
 * Quoted rather than paraphrased, and trimmed rather than rewritten: an origin
 * story restated in a marketing voice stops being evidence of anything. The US
 * sentence in the original ("Every clinic in America is using more than
 * 20-year-old dialysis technologies") is deliberately not carried over — spec
 * §3.2 lists the US-market arguments as claims that do not transfer to India,
 * and this is one.
 */
export const founderStory = {
  quote:
    "Byonyks was started because of my experience witnessing my aunt's life on dialysis. As a diabetic, she developed chronic renal disease that led to her start on hemodialysis treatments. Her treatments began at a clinic, with the painful insertion of needles into her fistula and enduring the treatments 3x/week. Looking into the future, I worried my mother (also diabetic) would also need dialysis care. I wanted to provide her with an option that would allow for a painless, needleless treatment in her home. I want the same not only for my mother but for every mother and father on earth.",
  attribution: "Farrukh Usman",
  role: "Founder and Chief Executive Officer, Byonyks",
  source: "byonyks.com/the-vision/",
  retrieved: "29 August 2026",
} as const;

/**
 * The milestone arc.
 *
 * Spec §9.6 folds the timeline into this page after the investor section was
 * cut. What it lists is nine entries, four of which are the test houses —
 * FiLab, HTW, SGS and TÜV SÜD — and **those four now live in the compliance
 * register** on `/products/the-x1-cycler/`. Restating them here would be the
 * duplication that retired `/manufacturing/`, reintroduced a day later on a
 * different page.
 *
 * So 2023 is one entry that points at the register instead of reprinting it.
 * A timeline is an arc; a register is a record; the arc should say that the
 * testing happened and let the record hold what it was.
 *
 * ONE CORRECTION, FOUND BY CHECKING. Spec §9.6's list reads "human factors,
 * TUV SUD Minnesota IEC and FDA submission November 2023". The FDA's own
 * record for K243371 gives **date received 30 October 2024**. Whatever
 * happened in November 2023, the submission the register knows about is a year
 * later, so the testing and the submission are separate entries at their own
 * dates. Recorded in `deviations.md`.
 */
export type MilestoneVerification =
  "public-record" | "company-stated" | "pending";

export type Milestone = {
  readonly when: string;
  readonly title: string;
  readonly detail: string;
  readonly verification: MilestoneVerification;
  /** In-page or in-site link to where the detail actually lives. */
  readonly href?: string;
  readonly hrefLabel?: string;
};

export const milestones: readonly Milestone[] = [
  {
    when: "2020–21",
    title: "Production facility established",
    detail:
      "Byonyks brings manufacturing online. Attributed to Byonyks and not to a country, per the attribution decision of 20 August 2026.",
    verification: "company-stated",
  },
  {
    when: "2021",
    title: "First 1,000 treatments delivered",
    detail:
      "Using Byonyks cycler technology. The figure has since passed 10,000, as reported by Byonyks USA.",
    verification: "company-stated",
  },
  {
    when: "2022",
    title: "R&D centres opened",
    detail: "Byonyks expands its research and development capacity.",
    verification: "company-stated",
  },
  {
    when: "2023",
    title: "Independent testing and certification",
    detail:
      "Biocompatibility, electrical safety, IEC certification and human factors work, through four independent laboratories across the year.",
    verification: "company-stated",
    href: "/products/the-x1-cycler#compliance",
    hrefLabel: "Each test, its date and its laboratory",
  },
  {
    when: "30 October 2024",
    title: "510(k) submitted to the FDA",
    detail:
      "The date the FDA's own register records for receipt of the premarket notification.",
    verification: "public-record",
  },
  {
    when: "16 May 2025",
    title: "FDA 510(k) clearance granted",
    detail:
      "K243371. The X-1 APD Cycler and the Automated PD Set DS-1 found substantially equivalent. Held by Byonyks.",
    verification: "public-record",
    href: "/products/the-x1-cycler#compliance",
    hrefLabel: "The record, and how to check it",
  },
  {
    // DATED 11 SEP 2026, on client instruction. This entry carried
    // "Not yet stated" and a pending chip from the day the timeline was
    // built, because no execution date had reached this project. The client
    // has now supplied one.
    //
    // IT IS "company-stated", NOT "public-record". A licence between two
    // private companies is not on a register this project can open, which is
    // the same distinction compliance.ts draws between the FDA clearance and
    // everything Byonyks asserts about its own testing.
    //
    // THE TERMS ARRIVED LATER THE SAME DAY. This comment read "a date is not
    // the terms" and pointed at "pending-licence-scope" for the territory, the
    // exclusivity and the product scope. The client supplied all three on
    // 11 September 2026 — exclusive, India, every machine including the X-2
    // and X-3 — so that ledger entry is closed and the sentence below states
    // the scope instead of marking it missing. The wording comes from
    // "licenceScope" in claims.ts rather than being retyped here.
    when: "September 2026",
    title: "Akshar Byonyks licensed for India",
    detail: `The month the licence was executed, as given to this project. ${licenceScope}`,
    verification: "company-stated",
  },
];

/**
 * The Akshar Byonyks team, and what is still missing from it.
 *
 * Open Question 1.4, MUCH NARROWER SINCE 1 SEP 2026 but not closed. Three
 * Akshar Byonyks people are published where there was one, so the spec §14.4
 * risk this recorded — "Investor-first with no named team is not credible" —
 * no longer describes the page. What is still outstanding is smaller and
 * per-record: two of the three have no job title and no photograph, both on
 * this project's do-not-fabricate list, so the page states each gap where the
 * fact would be rather than filling it with a stock portrait or a role title
 * nobody holds.
 *
 * The nine advisory nephrologists are a different matter and are already
 * surfaced, by name and credential, as ByoTalks speakers — spec F-5's
 * compensating route, working as intended.
 */
// `label` IS NO LONGER RENDERED (3 Sep 2026). The provenance mark that showed
// it beside "The people" came out on client instruction. It is kept because it
// is still an accurate record of what is missing and who was asked for it, and
// because the gaps it describes are still in the data — but nothing on the site
// displays it, so do not assume editing it changes a page.
export const leadershipStatus = {
  // REWRITTEN 11 SEP 2026, THOUGH NOTHING RENDERS IT. The note above says this
  // is kept "because it is still an accurate record of what is missing" — and
  // by that morning it was not: it described three Akshar Byonyks people, two
  // of them without a title or a photograph, and there are now six, all with
  // both. Deviation 30 is the entry about precisely this failure mode, so
  // leaving a second instance of it in place would be the lesson recorded and
  // ignored in the same file.
  //
  // `note` is now the only gap that survives: Dr. Yogesh Tank arrived with a
  // name, post-nominals and a photograph and nothing else. The client supplied
  // his title on 12 Sep 2026; the biography has still not arrived.
  note: "One biography pending",
  label:
    "Six Akshar Byonyks people are published, and one colleague at Byonyks. All seven carry a photograph. One record, Dr. Yogesh Tank's, has a job title but no biography yet; the profile says the biography is pending rather than writing one here about a real person. Since 12 September 2026 no card or profile prints which of the two companies a person works for; the roster page still splits the count between them in the paragraph above the grid.",
} as const;
