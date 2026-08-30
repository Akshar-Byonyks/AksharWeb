// The news index, spec §9.7.
//
// TWO ARTICLES, AND THEY ARE BYONYKS'. Both are press releases published by
// Byonyks — spec §9.7 says migrate both, and the client's audit response says
// "Keep latest updates as is / Keep both news articles". They are republished
// here in full, word for word, with the source URL and the retrieval date on
// each record. Nothing is paraphrased and nothing is invented.
//
// THE BODIES CAME FROM THE MARKUP, NOT FROM A SUMMARY. The first attempt to
// collect these used a fetch tool that renders a page through a summarising
// model. Its output read like an article and was not one: the opening line it
// produced ("Device manufacturer Byonyks announced...") is not the opening
// line of the article ("Itasca, IL – Device maker Byonyks has received..."),
// and several sentences were paraphrases of quotes. **A text may not be
// labelled "word for word" unless it came from the source markup.** These did.
//
// THE PUBLISHER IS NAMED ON EVERY CARD AND EVERY ARTICLE. Same reasoning as
// `leadership.ts`: spec §3.1's first non-negotiable is that Akshar Byonyks and
// Byonyks are never blurred, and a news index under this masthead is a place
// where a reader will assume "our news" unless told otherwise. The second
// article is about entering the **United States** market; on an India-facing
// site that is exactly the sentence a reader could complete wrongly. So each
// article carries an editorial note saying whose release it is and what Akshar
// Byonyks' actual relationship to it is.
//
// THE STATISTICS ARE CARRIED, NOT ADOPTED. Between them these releases assert
// that 85% of Americans on dialysis do not receive PD, that PD has a 10%
// survival advantage over in-center hemodialysis (attributed to the U.S. Renal
// Data System), that ~86% of the world's population needing dialysis has no
// access, and that Byonyks has delivered 10,000+ therapies. The project rule
// is that no unsourced statistic ships — and it holds here, because none of
// these are presented as this site's figures. They are quoted inside an
// attributed, dated, linked republication of somebody else's press release,
// which is the same contract the leadership biographies answer to. **If any of
// these numbers is ever lifted out of an article page and stated in Akshar
// Byonyks' own voice, it needs its own primary source first.** `carriedClaims`
// lists them per record so that this is visible in the data.

export type NewsCategory = "Press Release" | "Company Updates";

export type NewsArticle = {
  readonly slug: string;
  readonly title: string;
  /** ISO 8601, as dated by the publisher on its own page. */
  readonly published: string;
  readonly categories: readonly NewsCategory[];
  /** Whose announcement this is. Printed on every card and every article. */
  readonly publisher: "Akshar Byonyks" | "Byonyks";
  /** Required: nothing here is written by this project. */
  readonly sourceUrl: string;
  readonly retrieved: string;
  /** Where the release went out on a wire, where it did. */
  readonly wireUrl?: string;
  /** The index card's summary. Drawn from the article's own first sentence. */
  readonly excerpt: string;
  /** Body paragraphs, verbatim from the source markup. */
  readonly body: readonly string[];
  /**
   * Figures asserted inside this release. Carried as quotation, never restated
   * as this site's own. See the file header.
   */
  readonly carriedClaims?: readonly string[];
  /** Spec F-1: this text names a country or region. */
  readonly namesALocation?: readonly string[];
};

export const newsArticles: readonly NewsArticle[] = [
  {
    slug: "x1-cycler-to-enter-us-market",
    title:
      "Byonyks Makes Headlines: FDA-Cleared X1 APD Cycler Set to Enter U.S. Market",
    published: "2026-02-03",
    categories: ["Company Updates", "Press Release"],
    publisher: "Byonyks",
    sourceUrl:
      "https://byonyks.com/byonyks-makes-headlines-fda-cleared-x1-apd-cycler-set-to-enter-u-s-market/",
    retrieved: "29 August 2026",
    wireUrl:
      "https://www.globenewswire.com/news-release/2026/02/03/3230967/0/en/Byonyks-X1-Revolutionizing-Dialysis-Now-FDA-Cleared-and-Planning-to-start-Patients-in-the-U-S.html",
    excerpt:
      "Byonyks announces plans to enter the United States market with the FDA-cleared X-1, beginning in California, Texas and Illinois.",
    namesALocation: ["United States", "California", "Texas", "Illinois"],
    carriedClaims: [
      "10,000+ therapies worldwide through overseas licenses",
      "PD has a 10% higher survival rate than in-center hemodialysis (attributed to the U.S. Renal Data System)",
      "85% of Americans on dialysis do not currently receive PD",
      "approximately 86% of people who need dialysis lack access to it",
    ],
    body: [
      "Byonyks has received U.S. FDA 510(k) clearance for its X1 Automated Peritoneal Dialysis (APD) Cycler, marking a significant milestone in the company’s mission to expand access to safe, reliable, and more affordable home-based dialysis technologies.",
      "Having already demonstrated success with 10,000+ therapies worldwide through its overseas licenses, Byonyks is now planning to enter the U.S. market under the leadership of Founder and CEO Farrukh Usman. The company’s initial rollout will focus on California, Texas, and Illinois.",
      "The X1 APD Cycler is designed to deliver automated peritoneal dialysis therapy at home, supporting patients requiring long-term renal replacement therapy while reducing the burden of in-center treatment. Peritoneal dialysis is a bloodless therapy that offers patients greater flexibility, an improved quality of life, and helps preserve residual kidney function for longer. Data from the U.S. Renal Data System show that peritoneal dialysis has a 10% higher survival rate than in-center hemodialysis — yet 85% of Americans on dialysis do not currently receive it.",
      "Globally, approximately 86% of people who need dialysis lack access to it. Byonyks is committed to changing that through innovation that expands global access to dialysis, improves biocompatibility, minimizes metabolic impact, reduces infection risk, and lowers the carbon footprint.",
    ],
  },
  {
    slug: "fda-510k-clearance",
    title: "Byonyks receives 510(k) clearance for new dialysis machine",
    published: "2025-05-21",
    categories: ["Press Release"],
    publisher: "Byonyks",
    sourceUrl: "https://byonyks.com/fda-510k-clearance/",
    retrieved: "29 August 2026",
    excerpt:
      "The FDA clears the X-1 automated peritoneal dialysis cycler, making Byonyks the third company to obtain marketing clearance for an APD device.",
    namesALocation: ["Itasca, IL", "United States"],
    carriedClaims: [
      "only the third company to obtain FDA marketing clearance for an APD cycler",
      "85% of Americans on dialysis do not receive PD",
      "in-center hemodialysis has a 10% lower survival rate than PD (attributed to the U.S. Renal Data System)",
      "about 86% of the world's population who need dialysis have no access to it",
    ],
    body: [
      "Itasca, IL – Device maker Byonyks has received 510(k) clearance from the Food and Drug Administration for its X1 automated peritoneal dialysis (APD) cycler.",
      "Byonyks is only the third company to obtain marketing clearance from the FDA for an APD cycler, according to Farrukh Usman, founder and CEO of Byonyks.",
      "“Research shows that peritoneal dialysis (PD) preserves residual kidney function longer, and the therapy improves both quantity and quality of life,” Usman said. “Unfortunately, 85% of Americans on dialysis do not receive PD. The FDA’s clearance of X1 heralds a new era.”",
      "According to the U.S. Renal Data System, use of in-center hemodialysis, the most common form of kidney dialysis, has a 10% lower survival rate than peritoneal dialysis. “Our mission is not limited to putting a cycler on the market; Byonyks’ advanced development projects are aimed at significantly improving the clinical outcomes for PD patients and reducing and/or eliminating the many reasons for short tenures on this therapy,” Rod Kenley, Byonyks’ Chief Innovation Officer, said.",
      "Currently, about 86% of the world’s population who need dialysis have no access to it. “Byonyks is a dynamic company driven to improve the lives of our patients through transformative innovation that will improve global access to dialysis, improve biocompatibility, minimize metabolic impact, and reduce the risk of infection, all while decreasing the carbon footprint. That is a grand slam,” Andrew King, MD, Byonyks’ Chief Medical Officer, said.",
    ],
  },
];

/**
 * The two scaffold sections, spec §9.7 and the client's audit response:
 * "Build future highlights and from the experts to be later populated."
 *
 * Both are empty at source too — byonyks.com's own "From the Experts" heading
 * has nothing under it, and its "Featured Highlights" is a photo gallery with
 * no articles behind the images. So there is nothing to migrate into either,
 * and inventing entries to fill them is the one thing that must not happen on
 * a page like this.
 *
 * Spec §9.7: "an empty section must look deliberate, not broken." That is a
 * rendering requirement, met on the page — these render as designed, compact
 * empty states rather than as blank voids or as sections that silently vanish.
 */
export type NewsScaffold = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly note: string;
};

export const newsScaffolds: readonly NewsScaffold[] = [
  {
    id: "featured-highlights",
    title: "Featured Highlights",
    description:
      "Conferences, advisory board appointments and programme milestones, as they happen.",
    note: "No highlights published yet",
  },
  {
    id: "from-the-experts",
    title: "From the Experts",
    description:
      "Commentary from the nephrologists advising the programme. Until this is populated, the recorded ByoTalks sessions are where the clinicians speak.",
    note: "No expert commentary published yet",
  },
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

/** Newest first, by the publisher's own date rather than by array order. */
export const newsByDate: readonly NewsArticle[] = [...newsArticles].sort(
  (a, b) => b.published.localeCompare(a.published),
);

/**
 * Home's "Latest" row (§9.1 row 8) asks for three. Two real articles exist, so
 * two ship: padding to three with an invented item is the failure this whole
 * module is arranged to prevent. Derived from `newsArticles` so the two lists
 * cannot drift apart.
 */
export type NewsItem = {
  title: string;
  date: string;
  href: string;
};

export const latestNews: NewsItem[] = newsByDate.slice(0, 3).map((article) => ({
  title: article.title,
  date: article.published,
  href: `/news/${article.slug}`,
}));

// Enforced at module load, so a violation fails the build rather than shipping.
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const slugs = new Set<string>();

for (const article of newsArticles) {
  if (slugs.has(article.slug)) {
    throw new Error(`news: duplicate slug "${article.slug}".`);
  }
  slugs.add(article.slug);

  // Provenance. Nothing on this page is written by this project, so every
  // record has to say where it came from and when it was taken — the same
  // contract the transcribed leadership biographies answer to.
  if (!article.sourceUrl || !article.retrieved) {
    throw new Error(
      `news: "${article.title}" is republished with no source URL or no retrieval date. ` +
        "A quoted article without either is a claim nobody can check against its source.",
    );
  }

  if (!ISO_DATE.test(article.published)) {
    throw new Error(
      `news: "${article.title}" has published date "${article.published}", which is not YYYY-MM-DD. ` +
        "The date is rendered in a <time datetime> and in NewsArticle structured data; both need it valid.",
    );
  }

  if (article.body.length === 0) {
    throw new Error(
      `news: "${article.title}" has no body. An article page with a headline and no article is worse than no page — ` +
        "leave it out of this list until the text exists.",
    );
  }

  if (!article.excerpt) {
    throw new Error(`news: "${article.title}" has no excerpt for its card.`);
  }
}
