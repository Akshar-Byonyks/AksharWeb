import type { MetadataRoute } from "next";

import { byotalksSessions } from "@/lib/byotalks";
import { executives } from "@/lib/leadership";
import {
  contactCta,
  footerColumns,
  primaryNav,
  type NavLink,
} from "@/lib/navigation";
import { newsArticles } from "@/lib/news-data";
import { siteUrl } from "@/lib/site-config";

// THE SITEMAP.
//
// Built 4 Sep 2026, when the domain was connected to Cloudflare and the site
// stopped being a preview. Until then nothing here was reachable by a crawler,
// so its absence cost nothing; from the moment DNS resolves it does.
//
// WHAT A SITEMAP IS FOR HERE. Google finds pages by following links, and this
// site's footer is explicitly "not a sitemap" (spec 8.1 rule 4, capped at four
// columns of six). That is right for a reader and leaves fourteen real pages
// with no path from the front door — every leadership profile, every ByoTalks
// session, both news articles. This file is how those get crawled.
//
// DERIVED, NOT LISTED. The three dynamic collections come from the same
// modules the pages themselves render, so a session or an article added to the
// data is in the sitemap the same build. The alternative — a hand-kept list of
// URLs — is the drift this codebase refuses everywhere else.
//
// NO `priority` AND NO `changeFrequency`. Google has said publicly it ignores
// both, and Bing treats priority as a hint at best. Emitting them would be
// cargo cult: thirty-four rows of numbers nobody reads, that a future editor
// would have to maintain and would eventually get wrong.
//
// `lastModified` IS SET ONLY WHERE A REAL DATE EXISTS — the publication dates
// on news and ByoTalks. The tempting move is `new Date()` on every row, which
// makes each build tell crawlers that all thirty-four pages changed today.
// That is false, it trains Google to distrust the signal, and the signal is
// the only reason the field exists. Pages with no meaningful modification date
// carry none.

/**
 * Static routes, in the order a reader would meet them.
 *
 * Deliberately absent, and each for its own reason:
 *
 * - `/what-we-know` — carries `robots: noindex` since 3 Sep 2026. Listing a
 *   page in the sitemap while asking search engines not to index it is a
 *   contradiction Search Console reports as an error ("Indexed, though blocked"
 *   / "Submitted URL marked noindex"). The noindex is the instruction; this
 *   file must not argue with it. See NOT_IN_SITEMAP below.
 * - `/api/contact` — a POST handler, not a page.
 * - `/_not-found`, `/icon.png`, `/apple-icon.png`, `/opengraph-image.jpg` —
 *   generated assets and the 404, none of them destinations.
 */
const STATIC_ROUTES = [
  "/",
  "/products",
  "/products/the-x1-cycler",
  "/innovation",
  "/innovation/how-it-works",
  "/innovation/market",
  "/byotalks",
  "/about-us",
  "/about-us/leadership",
  "/about-us/careers",
  "/locations",
  "/news",
  "/contact",
  "/hi",
  "/hi/peritoneal-dialysis",
  "/privacy-policy",
  "/terms-of-use",
  "/cookie-policy",
  "/grievance-redressal",
  "/accessibility",
] as const;

/**
 * Routes that exist, are linked from nowhere, and must stay out of the
 * sitemap. Kept as an explicit set rather than an omission so that the
 * contract below can tell "deliberately excluded" apart from "forgotten".
 */
const NOT_IN_SITEMAP: ReadonlySet<string> = new Set(["/what-we-know"]);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map((path) => ({ url: `${siteUrl}${path}` })),

    // Both dated `YYYY-MM-DD` in their own modules, which is what
    // `lastModified` wants.
    ...newsArticles.map((article) => ({
      url: `${siteUrl}/news/${article.slug}`,
      lastModified: article.published,
    })),
    ...byotalksSessions.map((session) => ({
      url: `${siteUrl}/byotalks/${session.slug}`,
      lastModified: session.publishedAt,
    })),

    // No date: `retrieved` on an executive is when the biography was
    // transcribed from its source, not when this page changed, and the two
    // are different claims. `provenance.ts` makes the same distinction.
    ...executives.map((executive) => ({
      url: `${siteUrl}/about-us/leadership/${executive.slug}`,
    })),
  ];
}

// ---------------------------------------------------------------------------
// Module-load contract, in the manner of `leadership.ts`, `news-data.ts` and
// `claims-ledger.ts`.
//
// THE FAILURE THIS CATCHES. A sitemap is the one file on a site that nobody
// looks at. Add a route, link it in the nav, ship it — and it is missing here
// for months with no symptom a human would notice, because the page works
// fine and only its ranking suffers. So the build fails instead: if the site
// links to an internal destination in its own navigation, that destination is
// in the sitemap or it is on the excluded list on purpose.
// ---------------------------------------------------------------------------

function hrefsIn(links: readonly NavLink[]): string[] {
  return links.flatMap((link) => [
    link.href,
    ...(link.children ? hrefsIn(link.children) : []),
  ]);
}

const linkedInternally = new Set(
  [
    ...hrefsIn(primaryNav),
    contactCta.href,
    ...hrefsIn(footerColumns.flatMap((column) => column.links)),
  ]
    // Internal paths only — the footer also carries mailto: and tel:.
    .filter((href) => href.startsWith("/"))
    // `/products#x2-x3` is the Products page, not a route of its own.
    .map((href) => href.split("#")[0])
    .filter(Boolean),
);

const inSitemap: ReadonlySet<string> = new Set(STATIC_ROUTES);

for (const href of linkedInternally) {
  if (inSitemap.has(href) || NOT_IN_SITEMAP.has(href)) continue;
  throw new Error(
    `sitemap: "${href}" is linked from the site's own navigation but is not in the sitemap. ` +
      "Add it to STATIC_ROUTES, or to NOT_IN_SITEMAP if it is deliberately unlisted.",
  );
}
