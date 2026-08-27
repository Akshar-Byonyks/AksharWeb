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

type Beat = {
  id: string;
  clinic: { icon: LucideIcon; label: string; note: string };
  home: { icon: LucideIcon; label: string; note: string };
};

// Every line here restates copy already approved elsewhere on this site or a
// plain fact. "Roughly three a week" is the hero's own framing; "overnight" and
// "the on-device screen" are Our Answer's and the X-1 feature list's. No
// frequency, distance or duration figure is introduced, because none is
// sourced (PRODUCT.md: no unsourced statistics ship, ever).
const BEATS: Beat[] = [
  {
    id: "where",
    clinic: { icon: Hospital, label: "A dialysis centre", note: "Where the machine is." },
    home: { icon: House, label: "Your own bedroom", note: "Where you already are." },
  },
  {
    id: "when",
    clinic: { icon: Sun, label: "Daytime sessions", note: "Roughly three a week." },
    home: { icon: Moon, label: "Overnight", note: "While you sleep." },
  },
  {
    id: "getting-there",
    clinic: { icon: Car, label: "There and back", note: "Every session, both ways." },
    home: { icon: Armchair, label: "No journey", note: "Not for the treatment itself." },
  },
  {
    id: "who",
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

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      track.style.setProperty("--p", p.toFixed(4));
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
    };
  }, [pinned]);

  return (
    <div
      ref={trackRef}
      // 240vh gives ~140vh of scroll room across five beats. Unpinned it has no
      // height of its own and the stage simply sits in flow.
      className={pinned ? "relative mt-12 h-[240vh]" : "relative mt-12"}
      style={{ "--p": 1 } as CSSProperties}
    >
      <div
        ref={stageRef}
        // top-16: the site header is its own sticky element at top-0 z-50, so
        // the stage pins beneath it rather than sliding under it.
        className={
          pinned
            ? "sticky top-16 flex h-[calc(100vh-4rem)] flex-col"
            : "flex flex-col"
        }
      >
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
          <div className="grid grid-cols-2 pb-2">
            <ColumnHeading
              kicker="In-centre haemodialysis"
              detail="Treatment happens at a centre"
            />
            <ColumnHeading
              kicker="At home, with the X-1"
              detail="Treatment happens where you sleep"
              accent
            />
          </div>

          <div className="flex flex-1 flex-col">
            {BEATS.map((beat, i) => (
              <div key={beat.id} className="grid flex-1 grid-cols-2">
                <BeatCell
                  {...beat.clinic}
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

function ColumnHeading({
  kicker,
  detail,
  accent = false,
}: {
  kicker: string;
  detail: string;
  accent?: boolean;
}) {
  return (
    <div className="text-center">
      <p
        className={`text-sm font-semibold ${accent ? "text-accent-gold" : "text-white"}`}
      >
        {kicker}
      </p>
      <p className="mt-1 text-xs text-white/60 sm:text-sm">{detail}</p>
    </div>
  );
}

function BeatCell({
  icon,
  label,
  note,
  threshold,
  segment,
  segmentIndex,
  accent = false,
}: {
  icon: LucideIcon;
  label: string;
  note: string;
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
    <div className="relative flex flex-col items-center px-2 text-center sm:px-4">
      <Segment
        d={segment}
        index={segmentIndex}
        className={accent ? "text-accent-gold/70" : "text-white/45"}
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
          `bg-ink` is the section's own ground, so the mask is invisible and
          only the interruption in the line shows. Label and note share one
          wrapper rather than carrying their own backgrounds, otherwise the
          line reappears in the gap between them. */}
      <div className="relative mt-1.5 bg-ink px-2 py-0.5">
        <p className="max-w-32 text-sm font-semibold text-white text-balance sm:max-w-44 sm:text-base lg:max-w-52">
          {label}
        </p>
        <p className="mt-0.5 max-w-32 text-xs text-balance text-white/65 sm:max-w-44 sm:text-sm lg:max-w-52">
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
    <span
      className="relative inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-ink"
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
