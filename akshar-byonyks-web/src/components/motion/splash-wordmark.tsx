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
  strokeWidth = 44,
  drawDuration,
  fillDelay,
  fillDuration,
  stagger,
  className,
}: SplashWordmarkProps) {
  const maskId = `splash-wordmark-${useId().replace(/[^\w-]/g, "")}`;

  const { viewBox, byonyksTransform, akshar, byonyks, label } = splashWordmark;
  const [boxX, boxY, boxWidth, boxHeight] = viewBox.split(" ").map(Number);

  // One flat list so the stagger index runs continuously across the lockup:
  // "Akshar" left to right, then "Byonyks" left to right. The Byonyks half
  // carries a transform because its contours are still in the artwork's own
  // coordinates — see the note in `splash-wordmark.ts` about why nothing
  // rewrites path data.
  const halves = [
    { contours: akshar, transform: undefined as string | undefined },
    { contours: byonyks, transform: byonyksTransform },
  ];

  let index = 0;
  const groups = halves.map((half) => ({
    transform: half.transform,
    contours: half.contours.map((d) => ({ d, i: index++ })),
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
            OVERLAP, and without the mask "Akshar" draws with its joins cutting
            through the letters either side. Masking both halves keeps one
            treatment across a lockup that has to read as one mark.

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
            {groups.map((group, g) => (
              <g key={`m-${g}`} transform={group.transform} fill="black">
                {group.contours.map(({ d, i }) => (
                  <path key={`m-${i}`} d={d} />
                ))}
              </g>
            ))}
          </mask>
        </defs>

        {/* THE DRAW. Colour goes through `style` rather than the `stroke`
            attribute: `var()` is a CSS value function and does not resolve
            inside an SVG presentation attribute — the same rule recorded on
            `StrokeText`, and the reason tokens can be passed here at all. */}
        <g mask={`url(#${maskId})`}>
          {groups.map((group, g) => (
            <g key={`s-${g}`} transform={group.transform}>
              {group.contours.map(({ d, i }) => (
                <path
                  key={`s-${i}`}
                  d={d}
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
          ))}
        </g>

        {/* THE FLOOD, a `clip-path: inset()` wipe on the rendered element —
            never a rect inside `<clipPath>`, which is in `<defs>` and so never
            rendered and never animated. Measured once; the note is on
            `StrokeText`. */}
        <g className="stroke-text-fill">
          {groups.map((group, g) => (
            <g key={`f-${g}`} transform={group.transform} style={{ fill: fillColor }}>
              {group.contours.map(({ d, i }) => (
                <path key={`f-${i}`} d={d} />
              ))}
            </g>
          ))}
        </g>
      </svg>
    </span>
  );
}
