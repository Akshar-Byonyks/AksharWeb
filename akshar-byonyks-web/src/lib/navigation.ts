// Primary nav and footer link structure, spec §8.2/§8.3. Single source so
// header and footer can't drift out of sync with each other.

export type NavLink = {
  label: string;
  href: string;
  /** Set when the label is not in the page's own language. */
  lang?: string;
  children?: NavLink[];
};

// Spec 8.2 specifies five items plus a persistent CTA. **Six ship**, as of
// 1 Sep 2026, and not the five the spec names.
//
// "Manufacturing" was retired on the client's decision, 29 Aug 2026, after a
// measurement found eleven of that page's nineteen facts already stated
// elsewhere, and its label promising a factory the page opened by saying does
// not exist. Its compliance record now lives on /products/the-x1-cycler as
// "Quality and compliance", and /manufacturing redirects there.
//
// "Locations" took the fifth slot on 31 Aug 2026, also the client's call —
// both the page and its top-level placement. It is deliberately NOT the
// retired page under a softer name: that one promised a factory and had none
// to show, while this one is a register of premises that exist, each row
// naming which of the two companies holds it. It sits beside About Us because
// it is company information, not product. Both recorded in deviations.md.
//
// "PRODUCTS" TOOK THE SIXTH ON 1 SEP 2026, on the client's instruction: "move
// X1 cycler page to a new main tab called products, add in x2 and x3 coming".
// The X-1 page moved wholesale from /innovation/the-x1-cycler to
// /products/the-x1-cycler and the old path redirects permanently.
//
// IT SITS FIRST, AHEAD OF INNOVATION, and that is the substantive half of the
// change rather than a tidy-up. Innovation is an argument — how the therapy
// works, why India, what is coming. Products is the thing you can buy, and a
// visitor who arrives knowing they want the cycler should not have to guess
// that a device lives under a word that describes a point of view. The
// mega-menu's three children are the same three the spec's sitemap gives
// /innovation, minus the device.
export const primaryNav: NavLink[] = [
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "The X-1 Cycler", href: "/products/the-x1-cycler" },
      // NOT A ROUTE, AND DELIBERATELY SO. Byonyks publishes one paragraph
      // about the X-2 and X-3 and ends it "More details coming soon." A page
      // per device built on a paragraph would be a page that says nothing;
      // the hub carries them as a section, and this is an anchor into it. If
      // Byonyks publishes specifications, they get pages and this becomes two
      // links.
      { label: "X-2 and X-3", href: "/products#x2-x3" },
    ],
  },
  {
    label: "Innovation",
    href: "/innovation",
    children: [
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
  // ONE COLUMN FOR BOTH SECTIONS, not the two the header now has. The footer
  // grid is `sm:grid-cols-4` and spec 8.1 rule 4 caps it at four columns; a
  // fifth would wrap to a second row and leave one orphan under four. The
  // footer is explicitly not a sitemap, so the two devices lead a column that
  // also carries the three Innovation pages, and the header keeps the two
  // sections apart where a visitor is actually navigating.
  {
    heading: "Products and innovation",
    links: [
      { label: "The X-1 Cycler", href: "/products/the-x1-cycler" },
      { label: "X-2 and X-3", href: "/products#x2-x3" },
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
      // THE LEDGER IS NO LONGER LISTED (3 Sep 2026, client instruction).
      // /what-we-know still exists and still renders every claim with its
      // source - it is simply not advertised, and carries robots noindex.
      // It is the URL to hand a regulator or a journalist who asks, rather
      // than a destination the site walks a reader to.
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
