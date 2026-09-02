import { Noto_Sans } from "next/font/google";

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
//
// ── AND, SINCE 2 SEP 2026, THE DEVANAGARI FONT ────────────────────────────
//
// It used to be a subset of the root layout's declaration, which meant
// next/font preloaded 97 KB of it on all twenty-one routes to serve these
// two. Measured against the production build on a 1.6 Mbps / 4x-CPU mobile
// profile, that was nearly three times the weight of the Latin subset, on
// every page, for one nav link. `layout.tsx` carries the full reasoning.
//
// It is scoped here instead. The same family, so nothing about the type
// design changes — Noto Sans is one superfamily and these are its two
// scripts, which is why spec Section 6 could pick a single family for a
// bilingual site in the first place.
//
// **A THIRD HINDI ROUTE MUST LIVE UNDER `/hi`.** That was already true for the
// `lang` attribute above; it is now also true for the font. A Hindi page
// outside this subtree would render in the reader's system Devanagari rather
// than in Noto Sans — legible, and quietly off-brand.
const notoSansDevanagari = Noto_Sans({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
});

export default function HindiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="hi-IN" className={notoSansDevanagari.variable}>
      {children}
    </div>
  );
}
