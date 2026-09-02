import { useId } from "react";

import { cn } from "@/lib/utils";
import { splashWordmark } from "@/lib/splash-wordmark";

// The curtain's wordmark: "Akshar" in Pacifico outlines beside Byonyks' own
// traced mark, drawn on and then flooded. Added 1 Sep 2026, replacing the
// `StrokeText` call that set the whole thing in Yellowtail.
//
// WHY THIS EXISTS RATHER THAN A PROP ON `StrokeText`. That component's whole
// geometry is derived from font metrics — an advance, an ascent and a descent
// per em — because it renders live `<text>`. This renders outlines, which have
// no metrics and need none: the box is in the data. Bolting a path mode onto a
// component whose every measurement assumes type would have left both halves
// carrying the other's assumptions. `StrokeText` is unchanged and still used
// nowhere else; if a second caller ever appears, it is still correct.
//
// WHAT IS SHARED IS THE ANIMATION, deliberately. The three classes below —
// `stroke-text-char`, `stroke-text-fill`, and the custom properties they read
// — are exactly the ones `StrokeText` sets, declared once in `globals.css`.
// The draw and the flood are one behaviour on this site and they stay one
// definition; only the thing being drawn differs.
//
// THE DASH IS NORMALISED, NOT MEASURED. `StrokeText` derives its dash length
// from `fontSize * 7` because a glyph's outline length is unknowable without
// measuring. A `<path>` can declare `pathLength="1"`, which makes the browser
// scale its own arc-length arithmetic into a unit interval — so one dash of
// length 1, offset by 1, is "fully hidden" for any contour at any scale, and
// animating that offset to 0 draws it. Nothing here has to know how long the
// B's tail actually is.
//
// REDUCED MOTION and the failing-open contract are unchanged: the finished
// state is the CSS declaration and the animation is what
// `prefers-reduced-motion: no-preference` adds, so this renders complete with
// no JavaScript and no animation frame. See `site-splash.tsx`.

export type SplashWordmarkProps = {
  /** Any CSS colour expression — normally a token reference. */
  strokeColor: string;
  fillColor: string;
  /**
   * User units against the viewBox in `splash-wordmark.ts`, whose x-height is
   * 342. HALF OF THIS IS WHAT YOU SEE, for the same reason it is on
   * `StrokeText`: the stroke is centred on the contour and its inner half is
   * masked away, so pass double the weight the drawn line should have.
   */
  strokeWidth?: number;
  /** Seconds. Passed from `splash.ts`, which derives the curtain's floor. */
  drawDuration: number;
  fillDelay: number;
  fillDuration: number;
  stagger: number;
  className?: string;
};

export function SplashWordmark({
  strokeColor,
  fillColor,
  strokeWidth = 41,
  drawDuration,
  fillDelay,
  fillDuration,
  stagger,
  className,
}: SplashWordmarkProps) {
  const maskId = `splash-wordmark-${useId().replace(/[^\w-]/g, "")}`;

  const { viewBox, contours, label } = splashWordmark;
  const [boxX, boxY, boxWidth, boxHeight] = viewBox.split(" ").map(Number);

  // The list arrives in draw order, left to right across the whole lockup, so
  // the array index IS the stagger index. Contours that are already at their
  // origin carry no transform; the flourish on the A and the Byonyks half do,
  // because nothing rewrites path coordinates — see `splash-wordmark.ts`.

  // COUNTERS ONLY EXIST IF THE FILL SEES ALL THE CONTOURS AT ONCE, and getting
  // that wrong is not subtle: it fills them in. A counter — the hole in an 'a',
  // an 'o', the A's bowl, the k's loop — is not a shape, it is the absence of
  // one, produced by a fill rule resolving an inner contour against the outer
  // contour it sits inside. Split them into one <path> each and there is
  // nothing to resolve against, so every counter paints as another solid blob.
  // That shipped for a day: the 'o' in "Byonyks" was an oval, not a ring.
  //
  // The DRAW layer genuinely needs one element per contour, because each one
  // carries its own `--i` and animates on its own delay. So only the two FILL
  // layers are regrouped — one path per (transform, fill rule) pair, each
  // holding every contour that belongs to it. Fill is order-independent within
  // a path, so this can group across the draw order without disturbing it.
  //
  // THE TWO SOURCES DISAGREE ABOUT THE FILL RULE, AND BOTH ARE RIGHT, which is
  // why grouping is by rule as well as by transform. potrace writes
  // `fill-rule="evenodd"` and relies on it — it traces the boundary of the ink,
  // so its contours never overlap each other and nesting alone decides what is
  // a hole. opentype emits TrueType contours, wound for non-zero, and
  // Pacifico's letters OVERLAP, so evenodd there would punch a hole at every
  // join between letters.
  //
  // Assuming one rule for both is exactly how the first fix went out half
  // working: non-zero opened the 'a', the A's bowl and the k's loop, and left
  // the 'o' a solid oval because potrace had not wound it for that rule.
  const fillGroups = new Map<string, { transform?: string; fillRule?: "evenodd"; ds: string[] }>();
  for (const { d, transform, fillRule } of contours) {
    const key = `${transform ?? ""}|${fillRule ?? ""}`;
    const group = fillGroups.get(key) ?? { transform, fillRule, ds: [] };
    group.ds.push(d);
    fillGroups.set(key, group);
  }
  const fills = [...fillGroups.values()].map(({ transform, fillRule, ds }) => ({
    transform,
    fillRule,
    d: ds.join(" "),
  }));

  return (
    <span
      role="img"
      aria-label={label}
      className={cn("block w-full leading-[0]", className)}
      style={
        {
          "--stroke-draw": `${drawDuration}s`,
          "--stroke-stagger": `${stagger}s`,
          "--stroke-fill-delay": `${drawDuration + fillDelay}s`,
          "--stroke-fill-duration": `${fillDuration}s`,
          // `pathLength="1"` below puts every contour in a unit interval, so
          // the dash the shared CSS reads is 1 rather than a length in units.
          "--stroke-dash": 1,
        } as React.CSSProperties
      }
    >
      <svg
        aria-hidden="true"
        className="block h-auto w-full"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* THE INTERIOR KNOCKOUT, for the same reason `StrokeText` has one.
            The draw layer is `fill: none`, so a contour's outline paints in
            full even where it falls inside a neighbour. Byonyks' half does not
            need this — potrace followed the boundary of the ink, so its
            contours are already the union outline — but PACIFICO'S LETTERS
            OVERLAP, and so does the flourish that sits on the A. Without the
            mask "Akshar" draws with its joins cutting through the letters
            either side, and the flourish draws a seam across the A's shoulder
            instead of merging into it.

            `black`/`white` here are the mask's luminance channel, not paint. */}
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x={boxX}
            y={boxY}
            width={boxWidth}
            height={boxHeight}
          >
            <rect
              x={boxX}
              y={boxY}
              width={boxWidth}
              height={boxHeight}
              fill="white"
            />
            <g fill="black">
              {fills.map(({ d, transform, fillRule }, i) => (
                <path key={`m-${i}`} d={d} transform={transform} fillRule={fillRule} />
              ))}
            </g>
          </mask>
        </defs>

        {/* THE DRAW. Colour goes through `style` rather than the `stroke`
            attribute: `var()` is a CSS value function and does not resolve
            inside an SVG presentation attribute — the same rule recorded on
            `StrokeText`, and the reason tokens can be passed here at all. */}
        <g mask={`url(#${maskId})`}>
          {contours.map(({ d, transform }, i) => (
            <path
              key={`s-${i}`}
              d={d}
              transform={transform}
              pathLength={1}
              className="stroke-text-char"
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              strokeLinecap="round"
              style={
                {
                  fill: "none",
                  stroke: strokeColor,
                  "--i": i,
                } as React.CSSProperties
              }
            />
          ))}
        </g>

        {/* THE FLOOD, a `clip-path: inset()` wipe on the rendered element —
            never a rect inside `<clipPath>`, which is in `<defs>` and so never
            rendered and never animated. Measured once; the note is on
            `StrokeText`. */}
        <g className="stroke-text-fill" style={{ fill: fillColor }}>
          {fills.map(({ d, transform, fillRule }, i) => (
            <path key={`f-${i}`} d={d} transform={transform} fillRule={fillRule} />
          ))}
        </g>
      </svg>
    </span>
  );
}
