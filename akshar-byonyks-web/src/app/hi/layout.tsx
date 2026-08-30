// The Hindi track's language boundary.
//
// The root layout declares `lang="en-IN"` on `<html>`, which is right for the
// nineteen English routes and wrong for these two. A screen reader uses that
// attribute to choose its pronunciation rules, and Devanagari read with an
// English voice is not accented — it is unintelligible. WCAG 3.1.2 (Language
// of Parts) is the criterion, and this is the whole fix: one wrapper carrying
// `lang`, inherited by everything inside it.
//
// A layout rather than an attribute on each page, so a third Hindi page cannot
// be added without it.
export default function HindiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="hi-IN">{children}</div>;
}
