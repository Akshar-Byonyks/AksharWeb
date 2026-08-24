// Primary nav and footer link structure, spec §8.2/§8.3. Single source so
// header and footer can't drift out of sync with each other.

export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

// Spec 8.2: five items plus a persistent CTA. Becomes six with "Investors"
// before "About Us" if that section is approved (Open Questions 2.4) —
// add it to this array only, nothing else needs to change. Children per
// item mirror the sitemap in spec 8.3 and drive the desktop mega-menu.
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
  { label: "Manufacturing", href: "/manufacturing" },
  {
    label: "About Us",
    href: "/about-us",
    children: [
      { label: "Our Story", href: "/about-us/our-story" },
      { label: "Leadership", href: "/about-us/leadership" },
      { label: "Careers", href: "/about-us/careers" },
    ],
  },
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
      { label: "Our Story", href: "/about-us/our-story" },
      { label: "Leadership", href: "/about-us/leadership" },
      { label: "Careers", href: "/about-us/careers" },
      { label: "Manufacturing", href: "/manufacturing" },
      { label: "News", href: "/news" },
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
    links: [{ label: "Contact us", href: "/contact" }],
  },
];
