// The leadership roster, and the contract a profile has to satisfy to ship.
//
// Spec §9.5: "`/about-us/leadership/` and `[slug]` — **Five executives only.
// Name, bio, portrait, per the audit.** No SAB page, no Board page. Consistent
// portrait treatment: same backdrop, crop and lighting. Bios of 150 to 250
// words." Then, immediately: **"Blocked on Open Questions 1.4. Launch gate."**
//
// 1.4 is still fully open. The five names, their biographies and their
// portraits have not been given to this project, and they sit on the
// do-not-fabricate list beside the India office address and the CDSCO
// authorised-agent answer.
//
// SO THIS FILE SHIPS THE CONTRACT, NOT THE PEOPLE. The pages, the grid, the
// profile route and the validation below are all built and working. The roster
// is empty because the honest value of `executives` today is empty. When the
// five arrive, this is a data edit — add five objects — and nothing else has
// to be written.
//
// WHY THE VALIDATION IS HERE RATHER THAN IN A REVIEW CHECKLIST. Spec §9.5's
// "150 to 250 words" and "portrait" are not style preferences; they are what
// stops a leadership page from becoming five paragraphs of uneven length with
// three headshots and two initials, which is what an under-specified team page
// always decays into. The rules that matter get enforced by the build, the way
// `market-data.ts` refuses a figure without a source and `compliance.ts`
// refuses a public-record entry without a reference number.
//
// WHOSE EXECUTIVES, AND WHY NOT BYONYKS'. byonyks.com publishes fourteen
// executives with full biographies, portraits and LinkedIn profiles, and
// putting that roster here was considered seriously — it is real, public,
// verifiable material, and it is the same class of source as the founder
// quotation on `/about-us/`. It is not used, for two reasons that are the
// client's to overrule rather than a developer's to settle:
//
//   1. **Five of the fourteen biographies name Lahore, Pakistan or South
//      Asia, and two carry it in the job title itself** — "Chief Operating
//      Officer, South Asia", "Chief Medical Officer, South Asia". Spec F-1
//      keeps that off this site. Listing those two people here therefore means
//      editing a real person's job title, and listing three others means
//      editing their biography to remove where they work. That is not a
//      content trim; it is rewriting individuals' professional identities to
//      fit a positioning decision, and nobody has asked them.
//   2. **They are Byonyks' employees, not Akshar Byonyks'.** The spec's own
//      audit removed the advisory board and the board of directors from this
//      site precisely so the team page would answer "who runs the Indian
//      company". A roster of the licensor's staff answers a different
//      question, and answers the asked one with silence.
//
// Both are decisions, not blockers. If the client wants the Byonyks roster
// here, attributed as Byonyks' leadership, the type below already supports it
// via `organisation` — it is a data change and a legal check on the portraits.

export type Executive = {
  readonly slug: string;
  readonly name: string;
  /** Post-nominals, kept separate so the grid can set them at a lighter weight. */
  readonly postNominals?: string;
  readonly role: string;
  /**
   * Which company this person is an executive of.
   *
   * Present so that a Byonyks executive can never appear on this site
   * unlabelled. Spec §3.1's first non-negotiable is that the two companies
   * are never blurred, and a team page is the easiest place in the world to
   * blur them by omission.
   */
  readonly organisation: "Akshar Byonyks" | "Byonyks";
  /** 150–250 words, per spec §9.5. Enforced below. */
  readonly bio: string;
  /** Path under /public. Required — see the note on consistent treatment. */
  readonly portrait: string;
  readonly portraitAlt: string;
  readonly linkedin?: string;
};

/**
 * The roster.
 *
 * Empty, deliberately, and the page renders that state rather than hiding it.
 * See the file header: Open Question 1.4, launch gate, do-not-fabricate.
 */
export const executives: readonly Executive[] = [];

export function getExecutive(slug: string): Executive | undefined {
  return executives.find((executive) => executive.slug === slug);
}

export function bioWordCount(bio: string): number {
  return bio.split(/\s+/).filter(Boolean).length;
}

// The contract, enforced at module load so a violation fails the build rather
// than shipping. Spec §9.5's numbers, checked rather than remembered.
const MIN_BIO_WORDS = 150;
const MAX_BIO_WORDS = 250;

for (const executive of executives) {
  const words = bioWordCount(executive.bio);
  if (words < MIN_BIO_WORDS || words > MAX_BIO_WORDS) {
    throw new Error(
      `leadership: "${executive.name}" has a ${words}-word bio. Spec §9.5 requires ${MIN_BIO_WORDS}–${MAX_BIO_WORDS}. ` +
        "Uneven bios are what an unenforced team page decays into; edit the bio rather than the rule.",
    );
  }
  if (!executive.portrait || !executive.portraitAlt) {
    throw new Error(
      `leadership: "${executive.name}" has no portrait. Spec §9.5 requires one for every executive, ` +
        "with consistent backdrop, crop and lighting. A grid where some faces are missing reads as a company with something to hide.",
    );
  }
}
