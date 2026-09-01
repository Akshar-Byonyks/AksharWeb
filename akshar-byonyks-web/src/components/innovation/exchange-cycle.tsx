import type { CSSProperties } from "react";

import { PERITONEAL_CAVITY } from "@/lib/figures";
import { cn } from "@/lib/utils";

import { ClinicalLayer } from "@/components/innovation/clinical-layer";
import { InViewStage } from "@/components/innovation/in-view-stage";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

// The page's one figure, and its third ink moment (DESIGN.md, the Full-Bleed
// Rule as revised 26 Aug 2026: up to three, earned by meaning). Ink carries
// "home, night, and the patient's life," and an exchange is the therapy
// happening inside the patient's own body overnight — it is not evidence,
// regulation or specification, which is what white carries. The practical
// payoff is the same one Two Paths gets: single-weight line art reads at full
// strength on ink and washes out on white.
//
// NOT a fourth scroll-driven interaction. DESIGN.md is explicit that a third
// needed a reason that was not "the last two were nice," and Two Paths spent
// it. The test it set — name what only scroll can do here — this section
// fails: an exchange is a cycle of three states, all three of which a reader
// should be able to see and compare at once. Scrubbing would hide two thirds
// of the subject at any moment in exchange for nothing.
//
// The notation follows the lesson Two Paths paid for: an invented notation
// needs a legend or an anchor. Every mark in the drawing is named in the
// caption below it, and the drawing carries no quantity it does not state.

const ART_W = 160;
const ART_H = 150;

// The peritoneal cavity, drawn as a closed rounded form rather than an
// anatomical cross-section. An approximated organ outline would be the cheap
// version of a medical illustration, and this project has no nephrologist
// review yet to back one — so the shape is honestly schematic and the caption
// says so.

// TWO LEVELS, NOT THREE. The cavity runs y=37 to y=128 — 91 units — and every
// depth in this figure is one of these two, so the row reads as one body of
// fluid arriving, resting and leaving rather than three unrelated amounts.
//
// HIGH is the level dwell holds. LOW is a residual, not an empty cavity: a
// drain does not empty the peritoneum, and drawing it empty would be a claim
// this page has nothing to back.
const HIGH = 46; // 90% of the cavity
const LOW = 110; // 20%

// Where each panel comes to rest, which is the END of its own step. That pose
// is what the server sends and what a reader with reduced motion or no
// JavaScript keeps, so read across, the static row is: full, full, low.
//
// Fixed 31 Aug 2026. Fill used to rest at 44% and drain at 57%, so the static
// row said a drain leaves more fluid behind than a fill puts in.
const LEVELS = { fill: HIGH, dwell: HIGH, drain: LOW } as const;

type Step = keyof typeof LEVELS;

// Where each animation begins. Fill rises from the residual the previous drain
// left behind; drain falls from the level dwell has been holding. The cycle
// closes, and dwell has no entry because dwell does not move.
const STARTS: Partial<Record<Step, number>> = { fill: LOW, drain: HIGH };

// THE SURFACE MOVES; THE SHAPE DOES NOT. The fluid rect's bottom is fixed on
// the bottom of the drawing and the keyframe scales it about that same edge,
// so the only thing that ever travels is the water line.
//
// The build before this one translated the whole rect instead, which is a body
// of water sliding down rather than a level falling — and at any offset large
// enough to read, the slab's own lower edge lifted clear of the cavity floor
// and became visible as an edge.
//
// The factor is derived here rather than written into the keyframes, so the two
// levels above stay the only place a depth is stated. `depth` is how far the
// fluid reaches below the floor line, and the ratio of the two depths is the
// scale that puts the surface at the starting level.
const depth = (level: number) => ART_H - level;

function startScale(step: Step) {
  const from = STARTS[step];
  return from === undefined ? undefined : depth(from) / depth(LEVELS[step]);
}

// Where the drops sit at rest: down the catheter, ending at the water line.
// They were inside the container until the fill panel started coming to rest
// full (31 Aug 2026) — the catheter tip is at y=60 and the finished surface is
// at y=46, so the tip is under water and there is no air left in the container
// to fall through. These three run from just below the connection at the top
// down to y=42, whose lower edge meets the surface; the last of them sits in
// the sliver of air between the cavity roof at y=37 and the water.
const DROP_LEVELS = [16, 29, 42];

// A drop: a point at the top, a circle at the bottom, joined by two curves.
// Built from the level rather than positioned by transform, because the CSS
// animation owns `transform` and a base offset there would be overwritten.
//
// 5 units across and 7 tall, down from 7 and 9 (31 Aug 2026). At the earlier
// size the three of them left gaps of 4 units between shapes 9 units tall, and
// at rest — where all three are visible at once — that read as a chain of
// beads threaded on the catheter rather than as three drops falling down it.
// The gaps are now roughly the height of a drop.
function dropletPath(y: number) {
  return [
    `M80 ${y - 3.5}`,
    `C 81.4 ${y - 1.2} 82.5 ${y - 0.6} 82.5 ${y + 1}`,
    `A 2.5 2.5 0 1 1 77.5 ${y + 1}`,
    `C 77.5 ${y - 0.6} 78.6 ${y - 1.2} 80 ${y - 3.5}`,
    "Z",
  ].join(" ");
}

function CycleFigure({ step }: { step: Step }) {
  const clipId = `pd-cavity-${step}`;
  const from = startScale(step);
  return (
    <svg
      viewBox={`0 0 ${ART_W} ${ART_H}`}
      // 240px, not 200 (27 Aug 2026): the cavity is 108 of the viewBox's
      // 160 units, so the drawing renders at two thirds of whatever the box
      // is given. At 200 that put a 135px figure in a 405px column and the
      // page's one illustration read as an icon. The rest of the box is not
      // padding — the dwell arrows need it.
      className="h-auto w-full max-w-[240px]"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={PERITONEAL_CAVITY} />
        </clipPath>
      </defs>

      {/* Dialysate. Drawn first so the cavity outline sits on top of its edge
          rather than being hidden under it.

          The rect is authored at the level this panel comes to rest at, so the
          resting pose needs no transform and the keyframes travel *to* scale
          1. That ordering matters: the finished drawing is what the server
          sends and what a reader without JavaScript keeps, and the animation
          is a departure from it rather than the thing that assembles it. */}
      {/* THE CLIP IS ON THE GROUP, NOT ON THE RECT, and that is load-bearing.
          `clip-path` resolves in the user space of the element carrying it, so
          a clip and a transform on the same element transform together: the
          cavity would be squashed toward the floor along with the fluid, and
          the fill would visibly spill past the outline at the bottom while it
          rose. Held here, one level up, the cavity stays exactly the shape the
          stroke below draws, and the rect scales inside it. */}
      <g clipPath={`url(#${clipId})`}>
        <rect
          x="0"
          y={LEVELS[step]}
          width={ART_W}
          height={ART_H - LEVELS[step]}
          className={cn(
            "fill-white/15",
            step === "fill" && "pd-fluid-fill",
            step === "drain" && "pd-fluid-drain",
          )}
          // The one number the animation needs and cannot work out for itself.
          // Dwell sets nothing and carries no animation class.
          style={
            from === undefined
              ? undefined
              : ({ "--pd-from": from.toFixed(4) } as CSSProperties)
          }
        />
      </g>

      {/* Every stroke in this figure is a 1.5px hairline at non-scaling
          weight, so the three panels read as one drawing at any width —
          DESIGN.md's "single stroke weight" line-art characteristic taken
          literally. `vectorEffect` is not inherited, so it is set per element
          rather than once on the group. */}
      <g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path
          d={PERITONEAL_CAVITY}
          className="stroke-white/45"
          vectorEffect="non-scaling-stroke"
        />

        {/* The catheter, and the connection point at the top where the bag or
            the cycler attaches. Present in all three steps: it is not removed
            between exchanges, which is itself worth showing. */}
        <path
          d="M80 8V60"
          className="stroke-white/70"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx="80"
          cy="8"
          r="3.5"
          className="stroke-white/70"
          vectorEffect="non-scaling-stroke"
        />

        {/* Dialysate arriving, drawn as drops in the catheter rather than as
            two chevrons (31 Aug 2026). A chevron is a direction sign; a drop is
            the thing itself, and this is the one panel where what travels down
            the line is the whole point.

            Filled, not stroked, which is the one place this figure departs from
            its own hairline rule: a 1.5px outline at 5 units across closes up
            into a blob at the size these render, and an outlined drop reads as
            a bubble rather than as fluid. Everything else in the drawing stays
            a stroke.

            The shape is pointed at the top and round at the bottom, so it still
            reads as falling in the static pose — which is what a reader without
            JavaScript, or with reduced motion, actually gets. */}
        {step === "fill"
          ? DROP_LEVELS.map((y, i) => (
              <path
                key={y}
                d={dropletPath(y)}
                className="pd-drip fill-white/80"
                // Staggered inside the fill window (starts at 250ms, runs
                // 1000ms), so the drops arrive while the level is rising
                // rather than after it has settled. The last one lands as the
                // surface reaches the level it rests at.
                style={{ animationDelay: `${250 + i * 150}ms` }}
              />
            ))
          : null}


        {/* Dwell: transfer across the membrane, drawn as four arrows pointing
            inward through the cavity wall. They carry no quantity — they mark
            a direction, and the caption says which direction and of what. */}
        {step === "dwell" ? (
          <g className="pd-transfer stroke-white">
            <path d="M12 82H32" vectorEffect="non-scaling-stroke" />
            <path d="M26 77L32 82L26 87" vectorEffect="non-scaling-stroke" />
            <path d="M148 82H128" vectorEffect="non-scaling-stroke" />
            <path d="M134 77L128 82L134 87" vectorEffect="non-scaling-stroke" />
            <path d="M54 146V126" vectorEffect="non-scaling-stroke" />
            <path d="M49 132L54 126L59 132" vectorEffect="non-scaling-stroke" />
            <path d="M106 146V126" vectorEffect="non-scaling-stroke" />
            <path
              d="M101 132L106 126L111 132"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ) : null}
      </g>
    </svg>
  );
}

const steps: { step: Step; title: string; body: string }[] = [
  {
    step: "fill",
    title: "Fill",
    body: "Sterile dialysate runs down the catheter into the space around the organs. It flows in under gravity or from the cycler — it is not injected.",
  },
  {
    step: "dwell",
    title: "Dwell",
    body: "The fluid stays there. Waste and extra fluid cross out of the blood vessels in the membrane and into it. How long it stays is part of the prescription.",
  },
  {
    step: "drain",
    title: "Drain",
    body: "The used fluid drains back out through the same catheter and is discarded. The next exchange begins with fresh fluid.",
  },
];

export function ExchangeCycle() {
  return (
    <section
      id="the-exchange"
      aria-labelledby="exchange-cycle-heading"
      className="scroll-mt-24 bg-ink text-white"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="exchange-cycle-heading"
              className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              One exchange, three steps
            </h2>
            <p className="mt-6 text-lg text-white/75">
              A peritoneal dialysis treatment is made of exchanges, and an
              exchange is always the same three steps. Everything else &mdash;
              how many, how long, how much fluid &mdash; is the part your
              nephrologist sets.
            </p>
          </div>
        </ScrollReveal>

        {/* An ordered list, because the subject genuinely is an ordered list.
            Hairline-separated columns rather than three bordered cards: the
            same register the Home proof band uses, and the reason this page
            does not add another rounded rectangle to the site's count. */}
        {/* One observer for the whole group, not one per panel: the delays in
            globals.css sequence fill, then dwell, then drain, so on a desktop
            viewport — where all three sit side by side — the reader watches a
            single cycle travel across the row rather than three figures
            twitching at once. Total run is about 3.4 seconds. */}
        <InViewStage className="mt-14">
          <ol className="grid grid-cols-1 divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {steps.map(({ step, title, body }, index) => (
              <li
                key={step}
                className="py-8 first:pt-0 last:pb-0 sm:px-6 sm:py-0 sm:first:pt-0 sm:first:pl-0 sm:last:pr-0"
              >
                <ScrollReveal delayMs={index * 90}>
                  <div className="flex flex-col items-start">
                    <CycleFigure step={step} />
                    <h3 className="mt-6 flex items-baseline gap-2.5 text-xl font-semibold">
                      {/* aria-hidden, or the heading's accessible name becomes
                        "1Fill". The position is already conveyed
                        programmatically by the <ol>/<li> this sits in, so the
                        visible digit is reinforcement for sighted readers and
                        nothing else — exactly what aria-hidden is for. */}
                      <span
                        aria-hidden="true"
                        // white/60, not /40: the same measurement that fixed
                        // the hero scene cards. /40 lands near 3.5:1 on ink and
                        // this audience skews older with diabetes-related
                        // visual impairment, so PRODUCT.md's rule is the
                        // stricter option. /60 measures 6.08:1 and still reads
                        // as a quiet marker beside the title.
                        className="text-base font-normal text-white/60"
                      >
                        {index + 1}
                      </span>
                      {title}
                    </h3>
                    <p className="mt-2 text-base text-white/70">{body}</p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </InViewStage>

        <div className="mt-12 max-w-3xl space-y-5">
          {/* The legend. DESIGN.md, Two Paths: "before shipping a bespoke
              diagram, check that a reader who has never seen it can name what
              a mark means." Every mark above is named here. */}
          <p className="text-sm text-white/60">
            Schematic, not an anatomical illustration. The outline is the
            peritoneal cavity, the vertical line is the catheter, and the shaded
            area is dialysate. In step 2 the arrows show waste and extra fluid
            crossing the membrane into the fluid; they mark direction only, not
            quantity.
          </p>
          <p className="text-base text-white/75">
            Fill volumes, dwell times and the number of exchanges in a night are
            not the same for everyone. They are set by your nephrologist and
            adjusted over time.
          </p>
        </div>

        {/* Constrained to the prose measure so the disclosure does not read as
            a fourth column of the figure above. */}
        <div className="mt-8 max-w-3xl">
          <ClinicalLayer summary="Why the fluid removes water as well as solute">
            <p>
              Diffusion moves solute down the plasma-to-dialysate concentration
              gradient. Water follows separately, by osmosis: the dialysate
              carries an osmotic agent at a concentration higher than plasma,
              and the resulting gradient drives ultrafiltration across the
              membrane for as long as the gradient holds.
            </p>
            <p className="mt-3">
              Because that gradient dissipates during the dwell, the
              relationship between dwell length and net ultrafiltration is not
              linear, and a longer dwell does not mean more fluid removed.
            </p>
          </ClinicalLayer>
        </div>
      </div>
    </section>
  );
}
