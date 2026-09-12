"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { createScrub } from "@/components/motion/scrub";
import { cn } from "@/lib/utils";

// The closing transition: the page's last light section hands off to the
// site's closing ink mass across an irregular, layered horizon rather than a
// straight rule. Three terrain ridges of the same ink token at descending
// opacity read as distance — tonal depth, the system's stated depth device,
// not a shadow and not a blur.
//
// Why this is an edge component and not a footer decoration. The footer is
// sitewide; the background of whatever precedes it is not. A silhouette only
// exists as a silhouette against the section above it, so the section that
// wants the hand-off renders this at its own top edge and the footer simply
// continues the ink underneath with no seam. On Home that section is the CTA
// band, which was already ink — so the CTA band and the footer now read as
// one shaped landmass rather than two stacked rectangles. `bg-background`
// is the default lead-in because the section above it on Home (Latest news)
// is `bg-background`; a future page whose last section is tinted passes
// `bg-surface-2` through `className` instead.
//
// Geometry: one viewBox, `preserveAspectRatio="none"`, height set purely in
// CSS. At narrow widths the curve simply steepens, which is why the ridges
// are abstract terrain and not a skyline — buildings would visibly squash.
// The front ridge fills solid to the bottom of the band across its whole
// width, so it seals against the ink field below at every viewport size.
// The three crests are deliberately at different x positions with different
// amplitudes, and the mid ridge rises above the rear one on the right-hand
// side. Near-parallel curves at even spacing read as three stacked ribbons,
// not as terrain — it is the varying gap between the ridges across the width,
// and the point where one crosses in front of another, that produces depth.
const LAYERS = [
  {
    // Rear ridge: one broad swell cresting left of centre, then a long fall
    // that converges toward the mid ridge at the right edge.
    d: "M 0 74 C 90 66, 190 22, 340 20 C 500 18, 610 58, 760 74 C 920 91, 1090 96, 1240 90 C 1330 86, 1390 80, 1440 76 L 1440 160 L 0 160 Z",
    fill: "fill-ink/35",
    rise: 18,
    drift: -0.9,
  },
  {
    // Mid ridge: the inverse profile — low and close to the front ridge on
    // the left, climbing to its crest right of centre where it passes in
    // front of the rear ridge entirely.
    d: "M 0 116 C 120 112, 250 118, 390 112 C 560 105, 700 78, 900 64 C 1050 53, 1180 58, 1300 70 C 1370 77, 1410 82, 1440 84 L 1440 160 L 0 160 Z",
    fill: "fill-ink/65",
    rise: 9,
    drift: -0.4,
  },
  {
    // Front ridge: a long low shelf, and deliberately motionless. It is the
    // seal between the silhouette and the ink field below it — any travel
    // here would open a gap at the band's bottom edge on some viewport size.
    d: "M 0 132 C 110 128, 200 106, 330 104 C 470 102, 580 124, 720 132 C 850 139, 980 138, 1110 130 C 1230 123, 1350 118, 1440 120 L 1440 160 L 0 160 Z",
    fill: "fill-ink",
    rise: 0,
    drift: 0,
  },
];

// Motion (DESIGN.md's second scroll-driven interaction, added deliberately —
// see deviations.md entry 2). `--p` runs 0 to 1 as the band rises through the
// bottom 60% of the viewport; the two rear ridges start low and settle up
// into their authored positions, so the terrain unfolds rather than slides.
// `--mx` is pointer position, -1 to 1, drifting the rear ridges against the
// cursor for depth. Both are transform-only, so this stays on the compositor.
//
// Cost control, because this component ships on every page: the scroll and
// pointer listeners are attached only while the band is actually intersecting
// the viewport, and torn down when it leaves. A footer decoration should not
// cost a permanent listener on a route nobody has scrolled to the bottom of.
//
// Reduced motion gets `--p: 1` / `--mx: 0` — the settled, finished state, not
// a frozen mid-animation frame. That is also the server-rendered default, so
// the no-JS and pre-hydration renders are the finished state too.
export function SilhouetteEdge({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: no-preference)");
    setEnhanced(mql.matches);
    const onChange = () => setEnhanced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enhanced) return;

    let frame: number | null = null;
    let pointerX = 0;

    // THE SHORTEST SCRUB ON THE SITE, AND THE ONE THAT NEEDED THIS MOST.
    // 60% of the viewport is ~550px, and a single inertial touchpad event was
    // measured at 785px -- more than the entire range, in one event. The band
    // went from unsettled to settled in one frame, which is not a parallax,
    // it is a cut. See `scrub.ts`.
    //
    // Only `--p` eases. `--mx` tracks the pointer, which is already a
    // continuous input and has no bursts to absorb.
    const scrub = createScrub((value) =>
      el.style.setProperty("--p", value.toFixed(4)),
    );

    const progress = () => {
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      // Deliberately not "enters the bottom, exits the top": this band sits
      // at the end of the document, so the page often cannot scroll far
      // enough to push it off the top and that range would never complete.
      // The bottom 60% of the viewport is always traversed the moment the
      // footer is reached, at any page length.
      return Math.min(
        1,
        Math.max(0, (viewport - rect.top) / (viewport * 0.6))
      );
    };

    const update = () => {
      frame = null;
      scrub.set(progress());
      el.style.setProperty("--mx", pointerX.toFixed(4));
    };

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    // A resize moves the band under the reader. Easing to the new value would
    // read as the horizon sliding on its own, so this one lands.
    const onResize = () => {
      scrub.jump(progress());
      el.style.setProperty("--mx", pointerX.toFixed(4));
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      schedule();
    };

    // Coarse-pointer devices get scroll parallax only. There is no hover
    // cursor to track, and a pointermove listener there would fire on every
    // touch drag for nothing.
    const finePointer = window.matchMedia("(pointer: fine)");
    let listening = false;

    const listen = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", onResize);
      if (finePointer.matches) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
      }
    };

    const unlisten = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };

    // Position once on mount, before the observer has said anything. The
    // server-rendered default is the settled state (correct for no-JS), but
    // once JS is driving, a band still below the viewport has to be sitting
    // at its unsettled start — otherwise the first intersection callback
    // moves it from settled to unsettled in view, and the parallax announces
    // itself with a pop in the wrong direction.
    update();

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        listen();
        schedule();
      } else {
        unlisten();
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      unlisten();
      scrub.stop();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [enhanced]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      // overflow-hidden is load-bearing, not tidiness: the rear ridges drift
      // horizontally, and without it a full-width layer translated sideways
      // would extend past the right edge and give the whole document a
      // horizontal scrollbar.
      className={cn(
        "pointer-events-none relative h-20 w-full overflow-hidden bg-background sm:h-28 lg:h-40",
        className
      )}
      style={{ "--p": 1, "--mx": 0 } as CSSProperties}
    >
      {LAYERS.map((layer) => (
        <svg
          key={layer.d}
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          focusable="false"
          className={cn("absolute inset-0 block h-full w-full", layer.fill)}
          style={
            layer.rise === 0 && layer.drift === 0
              ? undefined
              : {
                  transform: `translate(calc(var(--mx, 0) * ${layer.drift}%), calc((1 - var(--p, 1)) * ${layer.rise}%))`,
                }
          }
        >
          <path d={layer.d} />
        </svg>
      ))}
    </div>
  );
}
