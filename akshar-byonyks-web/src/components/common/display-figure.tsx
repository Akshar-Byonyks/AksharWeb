import { cn } from "@/lib/utils";

// THE DISPLAY NUMERAL — the site's typographic signature, named.
//
// WHY THIS EXISTS. The sitewide critique of 30 Aug 2026 found that this site
// is at its best when it sets a number enormous and lets it carry the section:
// `510(k)`, `K243371`, `≈ two thirds`, `₹2,838`, `2.2 lakh`, `≈ 175,000`. That
// is not a coincidence. PRODUCT.md's Priority-1 and Priority-3 audiences
// "read fast and distrust marketing language", and a figure at display size
// with its source on the same row is the one move that reads as evidence
// rather than as a claim.
//
// It was happening twice, differently. `proof-band.tsx` set its three stats at
// `text-5xl lg:text-6xl` with an accent colour and **no tabular figures**;
// `figure-register.tsx` set its values at `text-4xl lg:text-5xl` **with**
// them. Two treatments of the same idea, one of which had the numerals wrong —
// which is the kind of drift a named role exists to stop, and which the craft
// floor calls out by name ("the numerals in tabular data ship with browser
// defaults that belong to no design system").
//
// TABULAR FIGURES ARE NOT COSMETIC HERE. Proportional digits set `1` narrower
// than `8`, so a stacked column of figures — which is what the market page and
// the ledger both are — reads as ragged and the eye cannot compare magnitudes
// down the column. `tabular-nums` is the difference between a list of numbers
// and a table of them.
//
// THIS IS NOT THE HERO-METRIC TEMPLATE the craft floor refuses, and the
// distinction matters. That pattern is a decorative band of big numbers with
// small labels and an accent, used to make a page feel substantial. Every use
// of this component carries a source, a date or a status on the same row, and
// `proof-band.tsx` already argued the point when it refused to become one.
// The size is here because the figure is the thing being read, not to make the
// section feel important.

// A four-step ramp, named for scale rather than for role, because the same
// size does different jobs on different pages and role names would collide.
// The four steps are the ones already in use across `proof-band.tsx` and
// `figure-register.tsx` — this ramp was read off the site, not imposed on it,
// so adopting it changes no rendered pixel on the market page.
const sizes = {
  /** The band IS the section. Home's proof register. */
  hero: "text-5xl lg:text-6xl",
  /** The figure carries its section. Market page legs, the ledger counts. */
  lead: "text-4xl lg:text-5xl",
  /** The prose is the argument and the figure supports it. */
  row: "text-3xl lg:text-4xl",
  /** Inside a card, a table cell, or a two-up supporting pair. */
  dense: "text-2xl lg:text-3xl",
} as const;

// Every tone resolves to a documented DESIGN.md role. Gold keeps its meaning
// ("home / India") and is not a generic "make this one stand out" option; the
// accent ration rule allows it here because a display numeral is large type,
// which is precisely what gold is rationed to.
const tones = {
  ink: "text-ink",
  primary: "text-primary",
  teal: "text-teal",
  plum: "text-plum",
  gold: "text-accent-gold",
  pending: "text-pending",
  "on-ink": "text-white",
  "gold-on-ink": "text-accent-gold",
  "pending-on-ink": "text-pending-on-ink",
} as const;

/**
 * The role as a class string, for the one caller that cannot be wrapped:
 * `CountUpStat` renders its own `<p>` and takes a className, because it needs
 * a ref on the element it animates. Exporting the recipe keeps that stat on
 * the same size, tracking and numerals as every other figure on the site
 * instead of a hand-copied approximation of them.
 */
export function displayFigureClass({
  size = "row",
  tone = "ink",
  className,
}: {
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  className?: string;
} = {}) {
  return cn(
    "font-bold tracking-tight tabular-nums",
    sizes[size],
    tones[tone],
    className,
  );
}

export function DisplayFigure({
  children,
  size = "row",
  tone = "ink",
  as: Tag = "p",
  className,
}: {
  children: React.ReactNode;
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  /** `dt` inside a definition list, `span` inline, `p` by default. */
  as?: "p" | "dt" | "span" | "div";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-bold tracking-tight tabular-nums",
        sizes[size],
        tones[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
