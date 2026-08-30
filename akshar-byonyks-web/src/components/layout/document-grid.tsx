import { cn } from "@/lib/utils";

// THE DOCUMENT SPINE — the sitewide content grid.
//
// THE PROBLEM IT SOLVES, measured. The sitewide critique of 30 Aug 2026
// measured the span of every section's own text at 1440px. Sections alternated
// between ~83% of the canvas and ~53%, and every 53% section was pinned to the
// container's left edge with roughly 670px of dead white to its right:
//
//   /about-us     53%  53%  62%  53%
//   /innovation   53%  82%  53%
//   /news         53%  81%  84%
//
// The 768px measure was not the bug. A measure of that width is correct for
// 18px body copy and it stays. What was wrong was that it had nothing beside
// it, so a correct reading column read as an unfinished page.
//
// WHY THIS IS NOT A COPY OF THE LEGAL SHELL. `legal-document.tsx` centres an
// index-plus-measure pair inside the container, and that is right for what it
// carries: a sticky table of contents, one per document, whose job is
// navigation. A content page's gutter carries something different — the
// provenance of the block beside it, which changes from block to block and
// scrolls with it. Navigation wants to be centred and stay put; annotation
// wants to be a margin.
//
// So this grid pins the rail to the container's left edge, giving every
// content page one vertical spine at the same x as its own hero headline, and
// lets blocks that are not prose (tables, figures, card grids, unit charts)
// span the whole width. The page then reads narrow-narrow-WIDE-narrow rather
// than at one uniform half-width, which is the rhythm layout.md asks for and
// the thing uniform 53% could never produce.
//
// THE RAIL MUST BE OCCUPIED. A gutter with nothing in it is worse than no
// gutter. If a block has no provenance, no date and no note to put beside it,
// it is a `wide` block, not a railed one.
//
// A SECTION IS RAILED OR WIDE, INCLUDING ITS HEADING. This is the rule that
// keeps the page from growing a third left edge, and it was learned the hard
// way: railing the prose on `/about-us` while leaving the milestone timeline
// alone produced headings at three different x positions on one page.
//
//   Railed section — prose with something to say about it. The heading sits
//   in a GridBlock too, so it starts at the measure edge and the rail beside
//   it can carry a count, a source or nothing.
//
//   Wide section — a figure, a table, a card grid, a timeline. Everything
//   including the heading sits at the container edge.
//
// So a page alternates between two left edges, never more, and the 1px rail
// rule appears at the container edge in every railed section. `milestones.tsx`
// needed no change under this rule: a timeline that already draws its own rule
// with dates hanging off it is a wide figure, and nesting it inside a second
// margin would have drawn two rules two hundred pixels apart saying the same
// thing.

export function DocumentGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

// One block on the spine.
//
// `rail` renders in the gutter on desktop and as a footnote under the body on
// mobile, where there is no gutter to render into. Under, never over: a status
// label stacked above a heading is a kicker, which DESIGN.md rejects outright
// and the craft floor bans without exception.
export function GridBlock({
  rail,
  wide = false,
  children,
  className,
}: {
  /** Gutter content — a provenance mark, a date, a source note. */
  rail?: React.ReactNode;
  /** Spans the full container: tables, figures, card grids, charts. */
  wide?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (wide) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={cn(
        // Tracks are fixed rather than fractional so every block on every page
        // lines up on the same two edges. A fractional rail would drift with
        // its own content length and the spine would stop being a spine.
        "lg:grid lg:grid-cols-[14rem_minmax(0,74ch)] lg:gap-x-12",
        className,
      )}
    >
      {/* Source order puts the body first so a screen reader and a keyboard
          reach the prose before its citation, which is the order a sighted
          reader gets on mobile too. `lg:order-first` moves the rail into the
          margin visually without moving it in the DOM. */}
      <div className="lg:order-2">{children}</div>
      {rail ? (
        <div className="mt-6 lg:order-1 lg:mt-0 lg:pt-1">{rail}</div>
      ) : (
        <div aria-hidden="true" className="lg:order-1" />
      )}
    </div>
  );
}

// Gutter content that is NOT a provenance claim: an editorial aside, a
// cross-reference, a note on method. It matches `ProvenanceMark`'s typography
// so the margin reads as one column rather than two competing ones, but it
// carries no status colour and no hairline rule — because a rule in one of the
// four provenance colours means something specific, and a note is not a claim.
export function RailNote({
  label,
  children,
  className,
}: {
  /** The mono micro-heading. Sentence case, a few words. */
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-l border-line pl-3", className)}>
      <p className="font-mono text-xs leading-5 font-semibold tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="mt-1.5 text-xs leading-5 text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

// The measure, for content that wants the reading column without a rail —
// a standfirst under a hero, an intro paragraph, a closing note.
export function Measure({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("max-w-[74ch]", className)}>{children}</div>;
}
