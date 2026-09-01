// Primary nav and footer link structure, spec §8.2/§8.3. Single source so
// header and footer can't drift out of sync with each other.

export type NavLink = {
  label: string;
  href: string;
  /** Set when the label is not in the page's own language. */
  lang?: string;
  children?: NavLink[];
};

// Spec 8.2 specifies five items plus a persistent CTA. **Five ship**, as of
// 31 Aug 2026, but not the five the spec names.
//
// "Manufacturing" was retired on the client's decision, 29 Aug 2026, after a
// measurement found eleven of that page's nineteen facts already stated
// elsewhere, and its label promising a factory the page opened by saying does
// not exist. Its compliance record now lives on /innovation/the-x1-cycler as
// "Quality and compliance", and /manufacturing redirects there.
//
// "Locations" took the fifth slot on 31 Aug 2026, also the client's call —
// both the page and its top-level placement. It is deliberately NOT the
// retired page under a softer name: that one promised a factory and had none
// to show, while this one is a register of premises that exist, each row
// naming which of the two companies holds it. It sits beside About Us because
// it is company information, not product. Both recorded in deviations.md.
//
// Children per item mirror the sitemap in spec 8.3 and drive the desktop
// mega-menu.
export const primaryNav: NavLink[] = [
  {
    label: "Innovation",
    href: "/innovation",
    children: [
      { label: "The X-1 Cycler", href: "/innovation/the-x1-cycler" },
      { label: "How It Works", href: "/innovation/how-it-works" },
      { label: "The India Market", href: "/innovation/market" },
    ],
  },
  { label: "ByoTalks", href: "/byotalks" },
  // Two children, not spec §8.3's three. /leadership/ is built and populated
  // (29 Aug 2026) so it is linked. /our-story/ is not built because /about-us/
  // absorbed the founder narrative rather than linking to it — the pre-build
  // measurement found the story was the substance and the hub the restatement.
  // /careers/ was built 30 Aug 2026 and is linked. /our-story/ is still not a
  // route. Links follow routes here, never the other way round.
  {
    label: "About Us",
    href: "/about-us",
    children: [
      { label: "Leadership", href: "/about-us/leadership" },
      { label: "Careers", href: "/about-us/careers" },
    ],
  },
  { label: "Locations", href: "/locations" },
  { label: "News", href: "/news" },
];

export const contactCta: NavLink = { label: "Contact us", href: "/contact" };

// Spec 8.1 rule 4: the footer is not a sitemap. Max 4 columns, 6 links per
// column (spec 7.2) — curated, not exhaustive.
export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Innovation",
    links: [
      { label: "The X-1 Cycler", href: "/innovation/the-x1-cycler" },
      { label: "How It Works", href: "/innovation/how-it-works" },
      { label: "The India Market", href: "/innovation/market" },
      { label: "ByoTalks", href: "/byotalks" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Leadership", href: "/about-us/leadership" },
      { label: "Careers", href: "/about-us/careers" },
      { label: "News", href: "/news" },
      // The ledger. In Company rather than Legal: it is not a policy, it is
      // this company's account of what it can and cannot substantiate.
      { label: "What We Know", href: "/what-we-know" },
      { label: "हिन्दी", href: "/hi", lang: "hi" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms-of-use" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Grievance Redressal", href: "/grievance-redressal" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
  {
    heading: "Contact",
    // Locations lands here rather than in Company, which already holds the
    // column limit of six. It belongs beside "Contact us" anyway: a reader
    // hunting a footer for an address is looking under this heading.
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Locations", href: "/locations" },
    ],
  },
];
