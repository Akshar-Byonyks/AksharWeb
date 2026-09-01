"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";

// StrokeText — outlined letterforms that draw themselves on, then flood with
// fill. Ported from React Bits (reactbits.dev), `ts-tailwind` variant.
//
// LICENCE. React Bits is MIT + Commons Clause (David Haz, 2026). The Commons
// Clause forbids selling, sublicensing or redistributing the components
// themselves "whether alone, in a bundle, or as a ported version"; using them
// inside an application or website, including commercially, is explicitly
// granted. This is the latter. Recorded here because `deviations.md` §16.5
// flagged that the silk component shipped with no licence check on file — the
// same licence covers it, and that question is now closed.
//
// ADAPTED, NOT ADOPTED — the verdict `futureIdeas.md` already reached for
// SpotlightCard, for the same two reasons.
//
// 1. GSAP IS GONE. The original imports `gsap` and `gsap/ScrollTrigger` and
//    registers the plugin at module scope. This project has no gsap, and
//    `futureIdeas.md` records rejecting `BounceCards` partly because of "a
//    GSAP dependency the stack does not have". Adding ~70 KB of animation
//    library would be indefensible anywhere on this site and absurd here in
//    particular, since this component renders inside the curtain that holds
//    the page back — the splash would be waiting on its own weight.
//
//    Nothing is lost. The original timeline does exactly two things: tween
//    `strokeDashoffset` from `dash` to 0 with a per-character stagger, then
//    widen a clip rect. Both are CSS animations with a `calc()` delay, which
//    is also the only version that runs on the compositor rather than through
//    a JS tick on the frame where the browser is busiest.
//
//    The trade is real and worth naming: the four triggers the original
//    supports (`mount`, `hover`, `scroll`, `loop`) collapse to `mount`. That
//    is the only one this site has a use for, and `scroll` would have needed
//    ScrollTrigger — the heavier half of the dependency — for something
//    `ScrollReveal` already does here with an IntersectionObserver.
//
// 2. NO HEX ENTERS THE COMPONENT. The original defaults are `#A78BFA` and
//    `#F8FAFC`. CLAUDE.md's standing rule is that every colour resolves
//    through a token, so stroke and fill are passed in as CSS custom property
//    references by the caller and this file names no colour at all.
//
// 3. THE VIEWBOX IS COMPUTED, NOT MEASURED — reversed 31 Aug 2026, and this
//    is the one place this port now disagrees with its own earlier build
//    rather than with the original.
//
//    It used to run a `getBBox()` pass on mount plus a re-measure on
//    `document.fonts.ready`, on the reasoning that measuring beats estimating.
//    It does, for framing. What it cannot do is arrive on time. The curtain is
//    server-rendered markup and its draw is a pure CSS animation, so the
//    wordmark starts animating in the FIRST PAINT — while the measurement
//    cannot run until this component has hydrated, which on Home sits behind
//    three.js and was timed at ~3.5s. So the viewBox swapped from estimate to
//    measured in the middle of the animation, and because the <svg> is
//    `w-full h-auto` its rendered height is a function of the viewBox ratio:
//    158px to 201px, the wordmark jumping 21px up the screen mid-draw.
//    Measured, not theorised.
//
//    Gating the animation on the measurement would have traded a jump for an
//    empty curtain for most of its life — the failure mode the estimate note
//    below already rejected once. So the geometry is now derived from the
//    props alone. It is identical on the server and on every frame after,
//    there is nothing to re-measure, and the wordmark cannot move because
//    nothing it depends on ever changes.
//
//    The cost is honest: framing is looser than a measured box, because the
//    metrics below have to be generous enough that a fallback font cannot
//    overflow them. `preserveAspectRatio="xMidYMid meet"` centres whatever
//    the real advance turns out to be inside that box.
//
// ACCESSIBILITY. The original's `role="img"` + `aria-label` on the wrapper is
// correct and kept: the SVG is two `<text>` elements holding the same string
// twice (one stroked, one filled), so leaving it to be read directly would
// announce the wordmark twice. The inner `<svg>` stays `aria-hidden`.
//
// REDUCED MOTION is handled in CSS rather than in JS as the original does it.
// The original reads `matchMedia` inside the effect and calls its own
// `setEnd()`; here the finished state IS the CSS declaration and the
// animation is what `@media (prefers-reduced-motion: no-preference)` adds, so
// a reduced-motion user gets a fully drawn wordmark with no frame of
// animation and no dependency on JS having run at all.

export type StrokeTextProps = {
  text: string;
  /**
   * Any CSS colour *expression*, including a token reference such as
   * "var(--color-accent-gold)". Applied through `style`, never as an SVG
   * presentation attribute — see the note on the <text> elements below.
   */
  strokeColor: string;
  fillColor: string;
  strokeWidth?: number;
  /** Seconds. */
  drawDuration?: number;
  fillDelay?: number;
  /**
   * Seconds the flood takes to wipe across. Defaults to half the draw, which
   * is what the original derives. Explicit because the curtain has to know
   * when this component finishes in order to not lift before it does, and a
   * formula copied into `splash.ts` would be one edit away from disagreeing.
   */
  fillDuration?: number;
  stagger?: number;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  /**
   * A CSS font-family value, normally a token reference. Defaults to whatever
   * the wrapper inherits, which is Noto Sans everywhere on this site.
   *
   * PASSING THIS MEANS PASSING METRICS TOO. The viewBox below is computed from
   * the three `*Em` constants, and those describe one face — swapping the
   * family without swapping them clips the glyphs against the SVG viewport.
   */
  fontFamily?: string;
  /** Mean advance per character, in em. See the metric block below. */
  advanceEm?: number;
  /** Ascent above the baseline, in em. */
  ascentEm?: number;
  /** Descent below the baseline, in em. */
  descentEm?: number;
  className?: string;
};

// NOTO SANS 700 METRICS, ROUNDED OUTWARDS ON PURPOSE. Taken from a real
// `getBBox()` of "Akshar Byonyks" at 128px before this pass was removed:
// 0.569em of advance per character, 1.066em of ascent and 0.295em of descent.
// The numbers below are each rounded up from those so the box is a superset of
// the text at the shipping weight, and stays one if a fallback font paints the
// first frames — an overflowing glyph would be clipped by the SVG viewport,
// and a box slightly larger than its contents only costs a few per cent of
// scale, which nothing on a splash screen is measured against.
//
// THEY ARE DEFAULTS NOW, NOT CONSTANTS (1 Sep 2026), because the curtain's
// wordmark moved to a script face and a script's box is nothing like a sans's
// — Pacifico runs a third taller below the baseline. A caller that changes
// `fontFamily` must pass its own three, measured the same way. The defaults
// stay Noto Sans so every existing call site is unaffected.
const ADVANCE_EM = 0.62;
const ASCENT_EM = 1.15;
const DESCENT_EM = 0.35;

export function StrokeText({
  text,
  strokeColor,
  fillColor,
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  fillDuration = Math.max(0.4, drawDuration * 0.5),
  stagger = 0.05,
  fontSize = 128,
  fontWeight = 700,
  letterSpacing = -2,
  fontFamily,
  advanceEm = ADVANCE_EM,
  ascentEm = ASCENT_EM,
  descentEm = DESCENT_EM,
  className,
}: StrokeTextProps) {
  const characters = useMemo(() => Array.from(text), [text]);

  // The dash length has to exceed the longest single glyph outline or the
  // stroke reappears at the far end mid-draw. The original's `fontSize * 7`
  // is empirical and holds for Latin at any weight; kept as-is.
  const dash = Math.max(fontSize * 7, 200);

  const fontStyle = {
    fontSize: `${fontSize}px`,
    fontWeight,
    letterSpacing: `${letterSpacing}px`,
    ...(fontFamily ? { fontFamily } : null),
  };

  // The whole geometry, from the props and nothing else. Same value on the
  // server, on the first paint and on every frame after — which is the point.
  const pad = Math.max(strokeWidth, fontSize * 0.1);
  const contentWidth =
    characters.length * fontSize * advanceEm +
    Math.max(0, characters.length - 1) * letterSpacing;
  const viewBox = [
    -pad,
    -(fontSize * ascentEm + pad),
    contentWidth + pad * 2,
    fontSize * (ascentEm + descentEm) + pad * 2,
  ].join(" ");

  // ANCHORED FROM THE MIDDLE, NOT THE START. The box above is a superset of
  // the text, so the leftover slack has to go somewhere; anchoring at x=0
  // would pile all of it on the right and hang the wordmark off-centre. It
  // also makes the webfont swap symmetrical — when Noto Sans replaces the
  // fallback the advance changes, and about the centre that reads as the text
  // settling rather than sliding.
  const anchorX = contentWidth / 2;

  return (
    <span
      role="img"
      aria-label={text}
      className={cn("block w-full leading-[0]", className)}
      style={
        {
          "--stroke-draw": `${drawDuration}s`,
          "--stroke-stagger": `${stagger}s`,
          "--stroke-fill-delay": `${drawDuration + fillDelay}s`,
          "--stroke-fill-duration": `${fillDuration}s`,
          "--stroke-dash": dash,
        } as React.CSSProperties
      }
    >
      {/* HEIGHT COMES FROM THE VIEWBOX, NOT FROM `fontSize`. The original
          hardcodes `height: fontSize * 1.3` in px, which is right only at the
          one width where the viewBox happens to fit unscaled. Anywhere
          narrower — every phone — the glyphs scale down inside a box that does
          not, so the wordmark floats in a fixed 166px well with the rest of
          the layout pushed away from it. Measured at 390px: a 57px wordmark
          with 109px of dead space under it, and the Skip button visibly
          orphaned. `height: auto` against the viewBox's own ratio makes the
          box hug the letters at every width. */}
      <svg
        aria-hidden="true"
        className="block h-auto w-full"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* COLOUR GOES THROUGH `style`, NOT THROUGH `stroke`/`fill`
            ATTRIBUTES. `var()` is a CSS value function: it resolves in a CSS
            declaration and is meaningless inside an XML presentation
            attribute, so `stroke="var(--color-accent-gold)"` parses as an
            invalid paint and the glyphs render with no stroke at all. The
            original component ships hardcoded hex, so it never meets this;
            passing tokens is this project's requirement and this is what it
            costs. Both are CSS properties on SVG, so the style route is
            equivalent and also wins over any attribute. */}
        <text
          x={anchorX}
          y="0"
          textAnchor="middle"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          className="select-none"
          style={{ ...fontStyle, fill: "none", stroke: strokeColor }}
        >
          {characters.map((char, i) => (
            <tspan
              // Characters repeat in this string, so the index is the only
              // stable key available.
              key={`s-${i}`}
              className="stroke-text-char"
              style={{ "--i": i } as React.CSSProperties}
            >
              {char}
            </tspan>
          ))}
        </text>

        {/* THE FLOOD IS A CSS `clip-path`, NOT A CLIPPED RECT. The original
            widens a <rect> inside a <clipPath> through gsap's `attr` plugin.
            Reproducing that with a CSS animation on the rect's `width` does
            not work and the reason is worth recording: elements inside <defs>
            are never rendered, so the browser does not run CSS animations on
            them. Measured — the rect sat at `width: 0px` for the whole
            timeline and the fill never appeared.

            `clip-path: inset()` on the rendered <text> has no such problem,
            animates on the compositor, and takes percentages against the
            element's own box — so it needs no measurement at all, which also
            removes the wipe's dependency on `getBBox()`. */}
        <text
          x={anchorX}
          y="0"
          textAnchor="middle"
          className="stroke-text-fill select-none"
          style={{ ...fontStyle, fill: fillColor, stroke: "none" }}
        >
          {characters.map((char, i) => (
            <tspan key={`f-${i}`}>{char}</tspan>
          ))}
        </text>
      </svg>
    </span>
  );
}
