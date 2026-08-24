// Real migrated articles, spec §9.7. Only two exist at launch — the spec
// itself acknowledges this ("Latest Updates: Live, both migrated articles").
// Home's "Latest" row (§9.1 row 8) asks for three; shipping a fabricated
// third item would violate the no-unsourced-claims rule, so this list stays
// at two until a real third article exists.
export type NewsItem = {
  title: string;
  date: string;
  href: string;
};

export const latestNews: NewsItem[] = [
  {
    title: "Byonyks receives 510(k) clearance for new dialysis machine",
    date: "2025-05-21",
    href: "/news",
  },
  {
    title:
      "Byonyks Makes Headlines: FDA-Cleared X1 APD Cycler Set to Enter U.S. Market",
    date: "2026-02-03",
    href: "/news",
  },
];
