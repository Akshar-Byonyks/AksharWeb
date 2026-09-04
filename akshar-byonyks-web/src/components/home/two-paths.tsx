"use client";

import {
  Armchair,
  Car,
  Hospital,
  House,
  Moon,
  MonitorCog,
  Stethoscope,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

// Added 26 Aug 2026, replacing the treatment-rhythm figure that shipped earlier
// the same day. That figure drew three arcs leaving a baseline for the clinic
// week and seven gold marks that never left it, and it did not communicate:
// an arc rising off a line is not a known symbol for a journey, it encoded no
// quantity, and its "three journeys out and three back" note described six
// trips while three shapes were drawn. It was a bespoke notation shipped
// without a legend — decoration shaped like data.
//
// The replacement moves the argument onto the one axis it always had and the
// old figure lacked: TIME. Two paths run down a pinned viewport and a reader
// walks both at once, beat by beat, as they scroll.
//
// THIS IS THE SYSTEM'S THIRD SCROLL-DRIVEN INTERACTION, and DESIGN.md requires
// a reason for that which is not "the last two were nice." The reason: this is
// the only content on the site that is inherently sequential, and scroll is the
// only input that is inherently a timeline. The static version of a sequence
// has to fake its own ordering with numbers or arrows; this one is ordered by
// the reader's own movement.
//
// It is *scrubbed* rather than *settling*, which puts it in the same family as
// the access-geometry scene rather than the silhouette edge. The two scrubbed
// scenes on Home are deliberately different in depth: the hero's card stack is
// a two-second emotional hook and its track was shortened to 130vh so it reads
// as one gesture, while this is the five-beat explanation.
//
// NO ANIMATION LIBRARY. A `--p` custom property driven 0-1 by a rAF-throttled
// scroll handler is the house idiom, used by both existing interactions, and
// the path draw is `pathLength="1"` with a dash offset — CSS, not JS. GSAP or
// Framer would have added 30-50 kB to a page whose Priority-2 audience
// PRODUCT.md describes as majority-mobile and bandwidth-constrained, to do
// something forty lines already do.

type Side = {
  icon: LucideIcon;
  label: string;
  note: string;
};

type Beat = {
  id: string;
  /**
   * The question this row answers, shown between the two columns. The rows
   * were always a four-question comparison and the questions were only ever
   * in the source — a reader had to infer that row three was about the
   * journey. Naming them lets the figure be scanned like the table it is,
   * which is what the investor and clinician audiences do with it.
   */
  name: string;
  clinic: Side;
  home: Side;
};

// Every line here restates copy already approved elsewhere on this site or a
// plain fact. "Roughly three a week" is the hero's own framing; "overnight" and
// "the on-device screen" are Our Answer's and the X-1 feature list's. No
// frequency, distance or duration figure is introduced, because none is
// sourced (PRODUCT.md: no unsourced statistics ship, ever).
const BEATS: Beat[] = [
  {
    id: "where",
    name: "Where",
    clinic: { icon: Hospital, label: "A dialysis centre", note: "Where the machine is." },
    home: { icon: House, label: "Your own bedroom", note: "Where you already are." },
  },
  {
    id: "when",
    name: "When",
    clinic: { icon: Sun, label: "Daytime sessions", note: "Roughly three a week." },
    home: { icon: Moon, label: "Overnight", note: "While you sleep." },
  },
  {
    id: "getting-there",
    name: "Getting there",
    clinic: { icon: Car, label: "There and back", note: "Every session, both ways." },
    home: { icon: Armchair, label: "No journey", note: "Not for the treatment itself." },
  },
  {
    id: "who",
    name: "Who runs it",
    clinic: { icon: Stethoscope, label: "Clinical staff", note: "They run the session." },
    home: { icon: MonitorCog, label: "You or your carer", note: "From the on-device screen." },
  },
];

// Progress at which each marker lights. Four connectors span the four gaps
// between the five markers, so the line reaches marker i at exactly i/4.
const MARKER_THRESHOLDS = [0, 0.25, 0.5, 0.75];
const CONVERGENCE_THRESHOLD = 0.95;

// The winding path passes through x=25 at every beat and bulges to alternating
// sides between them, then bends in to meet the straight one at the fifth row.
// Distance is encoded as deviation from a straight line, which needs no legend
// — the failure of the arcs was inventing a symbol and not teaching it.
//
// Deviation is ±10 units, down from ±21 in the first build. Under
// preserveAspectRatio="none" the horizontal scale is larger than the vertical
// one, so a deviation that looks modest in the viewBox arrives on screen
// multiplied: at ±21 the clinic path swung most of the way across the gap and
// read as a wild swerve into the other column rather than as a road.
//
// GEOMETRY, rebuilt 26 Aug 2026 after the lines were reported as not running
// through the centre of the icons. Measured, they were out by two independent
// errors, and the second one is the reason this is no longer one big SVG:
//
//   Horizontal, -1.14/+1.14 viewBox units (~8px). The row was `grid-cols-2
//   gap-8`, so the two column centres sat at 23.86% and 76.14%, not 25/75. A
//   gap does not split evenly around the centre line.
//
//   Vertical, -3.6 to -10.6 units, DIFFERENT FOR EVERY MARKER. Cells were
//   `justify-center`, which centres the marker-plus-label group, so each marker
//   floated above its row centre by half its own text height — and the notes
//   wrap to different line counts, so no single offset was ever right. Mobile
//   was worse, where more notes wrap to two lines.
//
// The second error cannot be fixed by moving coordinates, because the offset
// depends on content. So the line is no longer drawn against percentages of the
// whole stage. Each cell draws only the segment leading DOWN from its own
// marker to the next one: the segment starts at the marker's own centre offset
// and is exactly one cell tall, which lands it on the next marker's centre by
// construction. Row heights, text wrapping and font size can now all vary
// without the line drifting off the icons.
//
// Segment coordinates are cell-local: 0-100 across the cell's own width, so
// x=50 is the marker, x=0 and x=100 are the cell edges. Because the row is
// `grid-cols-2` with no gap, the clinic cell's right edge and the home cell's
// left edge are both the container's centre line — which is where the two
// paths converge, so the final segments simply run to x=100 and x=0.
const SEG_STRAIGHT = "M50 0 L50 100";
// Bulge alternates side per gap so the clinic route reads as a road rather than
// a repeated flick. x=88/12 keeps it clear of the label, which is capped at
// max-w-32 on mobile for exactly that reason.
const SEG_WIND_RIGHT = "M50 0 C 88 22, 88 78, 50 100";
const SEG_WIND_LEFT = "M50 0 C 12 22, 12 78, 50 100";
const SEG_JOIN_RIGHT = "M50 0 C 50 45, 100 60, 100 100";
const SEG_JOIN_LEFT = "M50 0 C 50 45, 0 60, 0 100";

// Fixed star field. Module-level and hand-placed, never generated: this
// component server-renders, and a random position would hydrate to a different
// one and tear. Percentages, so it reflows with the stage at any width.
// Deliberately sparse and unevenly spaced — an even grid reads as a pattern.
// Brightness runs hotter than the first build (x1.9, not x1.6): the dusk wash
// that used to open the sequence is gone, so the field carries the shift alone.
const STARS = [
  { x: 7, y: 12, s: 2, b: 0.55 },
  { x: 15, y: 31, s: 1, b: 0.35 },
  { x: 12, y: 62, s: 2, b: 0.4 },
  { x: 4, y: 78, s: 1, b: 0.3 },
  { x: 22, y: 8, s: 1, b: 0.45 },
  { x: 31, y: 20, s: 2, b: 0.3 },
  { x: 27, y: 88, s: 1, b: 0.4 },
  { x: 44, y: 5, s: 1, b: 0.35 },
  { x: 52, y: 15, s: 2, b: 0.5 },
  { x: 48, y: 71, s: 1, b: 0.3 },
  { x: 63, y: 27, s: 1, b: 0.4 },
  { x: 71, y: 9, s: 2, b: 0.45 },
  { x: 68, y: 55, s: 1, b: 0.3 },
  { x: 79, y: 40, s: 1, b: 0.5 },
  { x: 86, y: 18, s: 2, b: 0.35 },
  { x: 92, y: 60, s: 1, b: 0.4 },
  { x: 88, y: 83, s: 1, b: 0.3 },
  { x: 96, y: 34, s: 2, b: 0.45 },
];

// THE SECTION BECOMES NIGHT AS YOU READ IT.
//
// The heading above this figure is "The cycler runs on its own while the
// household sleeps", and the ground under it was flat navy from first frame to
// last. This spends the scroll progress the figure already computes on the one
// thing the section is actually about: stars come out and a crescent rises, so
// by the beat that says "While you sleep" the page has genuinely become night.
//
// NIGHT ARRIVES AS OBJECTS AND AS THE GROUND ITSELF, NEVER AS A WASH, and that
// is a constraint the labels impose rather than a preference. The first build
// opened with a dusk gradient across the top two-thirds that receded as the
// scrub ran. Every label below is an opaque plate — that is what stops the
// connector lines from crossing the text, see `BeatCell` — and an opaque plate
// over a gradient is a visible rectangle, reported on sight.
//
// Both replacements are immune to that. Points of light have no register to be
// out of: a star that falls behind a plate is simply not drawn, and nothing
// shows. And the dusk that was lost with the gradient came back as a flat
// section-wide colour instead (`--night-ground`, defined in `the-night.tsx`),
// which every plate, marker and the dark half of the moon paints with, so all
// of them stay invisible at every scroll position by construction.
//
// AUTHORED, NOT PHOTOGRAPHED, and that is a departure from DESIGN.md's default
// worth stating. A real night photograph is the standing first choice, and
// there is none in `public/images/` — the closest asset is a daytime living
// room already carrying two launch-gate flags. But this layer sits BEHIND a
// scroll-drawn diagram: a photograph here would compete with four lines and
// eight labels and cost contrast on a page whose audience skews older with
// diabetes-related visual impairment. Line art is the documented fallback for
// what a photograph cannot carry, and this is that case.
//
// NO BLUR AND NO NEW HUE. DESIGN.md rules out glass and blur outright, so the
// moon is two flat overlapping discs — a white one with an ink one offset
// across it — rather than a soft glow. Everything here is white on ink at low
// alpha, which is this file's existing idiom (`bg-white/18` on the markers),
// so no colour is invented and no accent is spent: gold still means home.
//
// It is `aria-hidden` and carries nothing. With no JavaScript, reduced motion,
// or a viewport too short to pin, `--p` stays 1 and the sky is simply already
// night — the finished state, never a frozen mid-scroll frame.
function NightSky() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {STARS.map((star) => (
        <span
          key={`${star.x}-${star.y}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.s}px`,
            height: `${star.s}px`,
            opacity: `calc(var(--p, 1) * ${star.b * 1.9})`,
          }}
        />
      ))}

      {/* The crescent: a white disc with an ink disc slid across it. It rises
          as the figure runs — 40px of travel, which is a drift rather than a
          movement, because a moon that visibly flies up the screen would
          compete with the lines being drawn.

          POSITION IS MEASURED, NOT COMPOSED, for the same reason the wash is
          gone: this is the one object large enough that anything crossing it
          reads as a bite taken out of the moon rather than as nothing at all.
          Both coordinates were set by testing every text rectangle in the stage
          against the disc, at 1440, 768, 641 and 390.

          Horizontal: 1% from the right at sm and up. At 3% the disc still
          grazed the last glyph of a two-line note at 641px, the narrowest width
          that still pins, because the right-hand column widest label plate
          reaches 87% of the content box there.

          Vertical: 16% at sm and up, after 8% and then 3% both landed on the At
          home column two-line detail line — and a white disc at 25% sitting
          behind 14px text is exactly the contrast this audience cannot afford.
          Below sm the columns stack and there is no outer margin to sit in, so
          2% puts the moon in the clear ground beside the first entry, whose
          note is short. All four widths now measure zero text over the disc. */}
      <div
        className="absolute right-[3%] top-[2%] size-16 sm:right-[1%] sm:top-[16%] sm:size-20"
        style={{
          opacity: "calc(var(--p, 1) * 0.9)",
          transform: "translateY(calc((1 - var(--p, 1)) * 40px))",
        }}
      >
        <div className="absolute inset-0 rounded-full bg-white/25" />
        <div className="absolute inset-0 translate-x-[26%] -translate-y-[14%] rounded-full bg-[var(--night-ground)]" />
      </div>
    </div>
  );
}

export function TwoPaths() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  // Progressive enhancement, the same shape the harden pass established for
  // ScrollReveal: the finished state renders first and JS may then take it
  // over. Server output, no-JS, reduced-motion and any viewport too short to
  // hold the stage all keep --p: 1 and an unpinned column — the completed
  // drawing, never a frozen mid-scroll frame.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const decide = () => {
      const motionOk = window.matchMedia(
        "(prefers-reduced-motion: no-preference)"
      ).matches;
      // Measured, not assumed. At 200% text the same markup is roughly twice as
      // tall and cannot fit a pinned viewport; rather than clip it or let it
      // scroll inside a sticky box, the enhancement simply does not apply. The
      // measurement works because static and pinned render identical DOM.
      // Margin is 8px, not 24. The stage only has to *fit*; a generous cushion
      // here is not caution, it is the difference between a laptop running the
      // interaction and silently getting the static fallback.
      const fits = stage.scrollHeight <= window.innerHeight - 64 - 8;
      setPinned(motionOk && fits);
    };

    decide();
    const mql = window.matchMedia("(prefers-reduced-motion: no-preference)");
    mql.addEventListener("change", decide);
    window.addEventListener("resize", decide);
    return () => {
      mql.removeEventListener("change", decide);
      window.removeEventListener("resize", decide);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!pinned || !track) return;

    // --p IS HOSTED ON THE SECTION, NOT ON THIS TRACK. The section paints its
    // own ground from the same progress (see `the-night.tsx`), and a custom
    // property inherits downward only — a wrapper cannot read one a descendant
    // sets. The geometry is still measured from the track, which is the element
    // that actually defines the scroll range; only the host changed.
    const host = track.closest("section") ?? track;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      host.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Listeners only while the band is on screen, the same discipline the
    // silhouette edge uses: a section nobody has scrolled to should not cost a
    // permanent scroll listener.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          update();
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
        } else {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      },
      { rootMargin: "10% 0px" }
    );
    io.observe(track);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      // Hand the section back its default. A resize that un-pins the figure
      // would otherwise strand the ground at whatever dusk it had reached,
      // while the figure itself jumps to its finished state.
      host.style.removeProperty("--p");
    };
  }, [pinned]);

  return (
    <div
      ref={trackRef}
      // 240vh gives ~140vh of scroll room across five beats. Unpinned it has no
      // height of its own and the stage simply sits in flow.
      className={pinned ? "relative mt-12 h-[240vh]" : "relative mt-12"}
    >
      <div
        ref={stageRef}
        // top-16: the site header is its own sticky element at top-0 z-50, so
        // the stage pins beneath it rather than sliding under it.
        //
        // `isolate`, on both branches. NightSky sits at -z-10, and a negative
        // z-index only stays put inside a stacking context. Pinned, `sticky`
        // forms one on its own and the sky rendered correctly. Unpinned —
        // mobile, reduced motion, any viewport too short to hold the stage —
        // `relative` with an auto z-index forms none, so the sky fell all the
        // way back behind this section own ink background and never appeared
        // at all. `isolate` makes the stage a stacking context either way.
        className={
          pinned
            ? "isolate sticky top-16 flex h-[calc(100vh-4rem)] flex-col"
            : "isolate relative flex flex-col"
        }
      >
        <NightSky />
        {/* max-w-3xl, not the site's usual max-w-[1280px] container. This is
            an A/B comparison and the two columns have to be close enough to
            compare: at full container width their centres sat 600px apart and
            the eye read two separate lists rather than one pair. Narrower also
            reduces how much preserveAspectRatio="none" stretches the paths
            horizontally. */}
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
          {/* No gap on any of these grids. The two column centres have to land
              exactly on 25% and 75% of the container for the converging
              segments to meet on the centre line; a gap shifts them inward.
              Breathing room comes from padding inside each cell instead. */}
          {/* Hidden once the columns stack: two headings side by side stop
              heading anything when what is under them is one list. Each entry
              carries its own lane tag there instead. */}
          <div className="hidden grid-cols-2 pb-1 sm:grid">
            <ColumnHeading
              title="In-centre hemodialysis"
              detail="Treatment happens at a centre"
            />
            <ColumnHeading
              title="At home, with the X-1"
              detail="Treatment happens where you sleep"
              accent
            />
          </div>

          <div className="flex flex-1 flex-col">
            {BEATS.map((beat, i) => (
              <div
                key={beat.id}
                className="relative grid flex-1 grid-cols-1 gap-y-6 pt-8 sm:grid-cols-2 sm:gap-y-0 sm:pt-0"
              >
                {/* The row's question. Centred between the two markers from
                    `sm` up — the columns sit at 25% and 75% and the paths pass
                    through those same points, so the middle of the row is the
                    one place nothing is ever drawn. Below `sm` the columns
                    stack, so it becomes an ordinary heading above the pair.
                    One element, two positions, no duplicated markup.

                    `white/60`, not `/50`: measured at 6.08:1 on ink where /45
                    came out at 4.29:1, under the 4.5:1 floor for text this
                    size. */}
                <p className="static mb-1 block text-left text-xs font-semibold tracking-wide text-white/60 uppercase sm:absolute sm:text-center sm:left-1/2 sm:top-0 sm:mb-0 sm:-translate-x-1/2">
                  {beat.name}
                </p>
                <BeatCell
                  {...beat.clinic}
                  lane="In-centre"
                  threshold={MARKER_THRESHOLDS[i]}
                  segment={
                    i === BEATS.length - 1
                      ? SEG_JOIN_RIGHT
                      : i % 2 === 0
                        ? SEG_WIND_RIGHT
                        : SEG_WIND_LEFT
                  }
                  segmentIndex={i}
                />
                <BeatCell
                  {...beat.home}
                  lane="At home"
                  threshold={MARKER_THRESHOLDS[i]}
                  segment={i === BEATS.length - 1 ? SEG_JOIN_LEFT : SEG_STRAIGHT}
                  segmentIndex={i}
                  accent
                />
              </div>
            ))}

            {/* The fifth beat spans both columns, because the two paths
                genuinely converge here. This is the honest answer to "does
                home dialysis mean never seeing a clinic" — it is answered by
                the structure of the figure rather than by a disclaimer
                bolted under it.

                Marker at the top of the row, not centred, so its centre sits
                the same distance below the row's top edge as every other
                marker — which is what the segment above it is drawn to meet. */}
            <div className="flex flex-1 flex-col items-center px-2 text-center">
              <Marker icon={Stethoscope} threshold={CONVERGENCE_THRESHOLD} accent />
              <p className="relative mt-3 max-w-md text-base font-semibold text-white">
                Both paths stay under your nephrologist&rsquo;s care
              </p>
              <p className="relative mt-1 max-w-md text-sm text-white/65">
                Home therapy changes where treatment happens, not whether you
                are looked after. Regular clinic review continues either way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Half of `size-10` (2.5rem). In rem rather than px so the anchor tracks the
// marker at any text size — at 200% the marker is 80px and its centre moves
// with it. If the marker size changes, this must change with it.
const MARKER_HALF = "1.25rem";

// One gap in the journey: from this cell's marker down to the next cell's.
// Positioned at the marker's own centre and exactly one cell tall, so the far
// end lands on the next marker's centre whatever the rows or the text do.
//
// The draw is a top-down `clip-path: inset()`, not a stroke dash. The dash
// version looked right on paper — pathLength="1" normalises a path so
// dasharray and dashoffset map straight onto 0-1 — but the browser resolves
// both properties as px lengths and left `calc(1 - var(--p))` sitting
// unevaluated in computed style, so paths rendered as fixed fragments that
// never moved. Each segment clips against its own quarter of the progress, so
// they still draw strictly in order and the convergence cannot arrive early.
function Segment({
  d,
  index,
  className,
}: {
  d: string;
  index: number;
  className: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 h-full w-full"
      style={{
        top: MARKER_HALF,
        clipPath: `inset(0 0 calc((1 - clamp(0, (var(--p, 1) - ${index / 4}) * 4, 1)) * 100%) 0)`,
      }}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={d}
        strokeWidth="1.5"
        strokeLinecap="round"
        // The viewBox is stretched to the cell, so a scaled stroke would come
        // out heavier on the horizontal sweeps than on the vertical runs.
        vectorEffect="non-scaling-stroke"
        className={className}
        stroke="currentColor"
      />
    </svg>
  );
}

// THE TWO HEADINGS ARE THE COLUMNS' ARGUMENT, so they are set like it — 700
// weight at 18-24px, up from 14px at 600. At the old size they read as labels
// on a diagram, and the diagram was left to make the point alone.
//
// CHAOS AND ORDER STAY IN THE GEOMETRY, NOT THE TYPE. A version of this
// knocked each word of the clinic heading off its line to echo the winding
// connector; it was removed on request (31 Aug 2026). The distinction is
// already drawn, and drawn better, by the paths themselves — the clinic
// column's connector winds through `SEG_WIND_RIGHT`/`SEG_WIND_LEFT` while the
// home column's runs `SEG_STRAIGHT` — so both headings are simply set level
// and let the lines beneath them carry it.
//
// THE SIZE IS WHAT MAKES THE GOLD LEGAL. `accent` already painted this heading
// `--color-accent-gold` at 14px, which the Accent Ration Rule does not allow —
// gold is for large display type and non-text graphics, never small UI.
// Promoting the heading brings the colour that was already here into the rule
// rather than adding a new spend, and gold's fixed meaning (home / India) is
// exactly what this column is.
function ColumnHeading({
  title,
  detail,
  accent = false,
}: {
  title: string;
  detail: string;
  accent?: boolean;
}) {
  return (
    <div className="text-center">
      <p
        className={`text-lg font-bold tracking-tight text-balance sm:text-xl lg:text-2xl ${
          accent ? "text-accent-gold" : "text-white"
        }`}
      >
        {title}
      </p>
      <p className="mt-1 text-xs text-white/60 sm:text-sm">{detail}</p>
    </div>
  );
}

function BeatCell({
  icon,
  label,
  note,
  lane,
  threshold,
  segment,
  segmentIndex,
  accent = false,
}: {
  icon: LucideIcon;
  label: string;
  note: string;
  /** Which column this is. Only rendered below `sm`, where the columns stack
   *  and the headings above them no longer sit over anything. */
  lane: string;
  threshold: number;
  segment: string;
  segmentIndex: number;
  accent?: boolean;
}) {
  return (
    // items-center with no justify-center: the marker sits at the TOP of the
    // cell, so its centre is a fixed distance from the cell's top edge no
    // matter how the label below it wraps. That is the whole fix for the
    // per-marker vertical drift.
    // BELOW `sm` THIS IS A ROW, NOT A COLUMN CELL. Two 128px-wide lanes on a
    // 390px phone was the majority experience of this figure and it wrapped
    // badly — "Your own / bedroom" on two lines under a marker. Stacked, each
    // entry gets the full width, the marker moves beside the text instead of
    // above it, and the text reads left-aligned like the list it has become.
    // The drawn paths are hidden there: they are cell-local geometry built for
    // two columns at 25% and 75%, and a single column has no such centres to
    // converge on. What survives is the comparison, which is the part a phone
    // reader actually needs.
    <div className="relative flex items-start gap-3 px-2 text-left sm:flex-col sm:items-center sm:gap-0 sm:px-4 sm:text-center">
      <Segment
        d={segment}
        index={segmentIndex}
        className={cn(
          "hidden sm:block",
          accent ? "text-accent-gold/70" : "text-white/45",
        )}
      />
      <Marker icon={icon} threshold={threshold} accent={accent} />
      {/* The label block sits ON the line, opaquely, so the path reads as
          passing behind it — the standard way a timeline handles a label on
          its own spine.

          This replaced an attempt to route the paths around the text by
          capping label widths. Measured by sampling 200 points along every
          path against every label's box, that never worked and could not: the
          home lane's line is straight and the labels are centred under their
          markers, so the line runs through the middle of all four of them by
          construction. Narrowing the text only made the wrapping worse
          ("Your own / bedroom") while still being crossed.

          `relative` puts the block above the absolutely-positioned segment;
          `--night-ground` is the section own ground at whatever point of the
          evening the scroll has reached, so the mask is invisible and only the
          interruption in the line shows. It must be that variable and not
          `bg-ink`: the section no longer stays one colour, and a fixed ink
          plate on a ground that has moved 12% toward daylight is precisely the
          rectangle this figure was reported for. Label and note share one
          wrapper rather than carrying their own backgrounds, otherwise the line
          reappears in the gap between them.

          `sm:` only. Below `sm` the columns stack and the segments are hidden,
          so there is no line left to mask — and the plate there is nearly the
          full content width, wide enough to cut the moon and much of the star
          field out of the sky behind it. A mask with nothing to hide is just an
          opaque rectangle. */}
      <div className="relative min-w-0 flex-1 px-0 py-0 sm:mt-1 sm:flex-none sm:bg-[var(--night-ground)] sm:px-2 sm:py-0.5">
        {/* Which lane this is. Redundant on desktop, where the column heading
            is directly above it — so it is hidden there rather than repeated
            four times down each column. Stacked, it is the only thing telling
            the two entries apart other than the accent, and colour is never
            allowed to be the sole carrier. */}
        <p className="text-xs font-semibold tracking-wide text-white/60 uppercase sm:hidden">
          {lane}
        </p>
        <p className="text-sm font-semibold text-white text-balance sm:max-w-44 sm:text-base lg:max-w-52">
          {label}
        </p>
        <p className="mt-0.5 text-xs text-balance text-white/65 sm:max-w-44 sm:text-sm lg:max-w-52">
          {note}
        </p>
      </div>
    </div>
  );
}

// Only the marker responds to scroll. The label and note stay at full opacity
// throughout, deliberately: dimming text until the reader arrives would put
// real copy below WCAG 1.4.3 for however long it stayed dim, and this project's
// audience skews older with diabetes-related visual impairment. Animating the
// non-text graphic instead is also what DESIGN.md's Accent Ration Rule already
// prefers.
function Marker({
  icon: Icon,
  threshold,
  accent = false,
}: {
  icon: LucideIcon;
  threshold: number;
  accent?: boolean;
}) {
  return (
    // ONE MARK PER BEAT. A version of this drew the two repeating clinic beats
    // as a stack of three — two dimmed copies offset behind the live disc — to
    // give the figure the asymmetry its argument implies. Removed on request
    // (31 Aug 2026). To read as a stack rather than as three separate things
    // the copies had to carry their own ink fill and their own border, which
    // made them two more outlined boxes sitting on a ground they no longer
    // matched. The frequency is stated in the note directly under each marker —
    // "Roughly three a week", "Every session, both ways" — which is where a
    // screen reader was taking it from in any case, since the discs were
    // aria-hidden.
    <span
      className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[var(--night-ground)]"
      style={{ "--t": threshold } as CSSProperties}
    >
      {/* Values outside 0-1 are clamped by the browser, so this needs no
          clamp(): it is 0 until --p passes the beat, then ramps to solid. */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full ${accent ? "bg-accent-gold/30" : "bg-white/18"}`}
        style={{ opacity: "calc((var(--p, 1) - var(--t)) * 12)" }}
      />
      <Icon
        className={`relative size-4.5 ${accent ? "text-accent-gold" : "text-white/85"}`}
        aria-hidden="true"
      />
    </span>
  );
}
