import type { CSSProperties } from "react";

import { PERITONEAL_CAVITY } from "@/lib/figures";
import { cn } from "@/lib/utils";

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

// THREE LEVELS. The cavity runs y=37 to y=128 — 91 units — and every depth in
// this figure is one of these three, so the row reads as one body of fluid
// arriving, resting and leaving rather than three unrelated amounts.
//
// HIGH is the prescribed volume, the level dwell holds. LOW is a residual, not
// an empty cavity: a drain does not empty the peritoneum, and drawing it empty
// would be a claim this page has nothing to back. MID is a fill part-way in.
const HIGH = 46; // 90% of the cavity
const MID = 73; //  60%
const LOW = 110; // 20%

// EACH PANEL RESTS IN THE MIDDLE OF ITS OWN ACTION, NOT AT THE END OF IT
// (3 Sep 2026), and that is the whole reason MID exists.
//
// Resting at the end is what a static diagram of a process gets wrong: a fill
// ENDS at the prescribed volume, which is exactly the level dwell holds, so
// the first two panels came to rest as the same picture. Read across, the row
// was full, full, low — the step that means "fluid arriving" drawn identically
// to the step that means "fluid sitting still", separated only by three drops
// five units across. The arc of the story was invisible in the one pose that
// most readers actually keep.
//
// Now it is 60%, 90%, 20%: arriving, held, left behind. Fill is drawn mid-
// arrival, which is also what makes its drops legible — the catheter tip is at
// y=60 and the surface now rests at y=73, so for the first time there is air
// under the tip for a drop to fall through. Before this the tip was under
// water in the resting pose and the drops had nowhere to go.
//
// NOT a return to the bug fixed on 31 Aug 2026, which was fill resting at 44%
// and drain at 57% — a static row saying a drain leaves more behind than a
// fill puts in. The ordering that mattered then still holds now, and by a
// wider margin: LOW is below MID is below HIGH, always.
const LEVELS = { fill: MID, dwell: HIGH, drain: LOW } as const;

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

// FLUID INSIDE A TUBE IS NOT VISIBLE, and that one observation is what fixes
// the drops (3 Sep 2026). Every version of this figure until now drew them
// spaced down the catheter's own shaft, with the 1.5px stroke running between
// each pair — and rendered, that is unmistakably a string of beads threaded on
// a wire, not fluid travelling. Widening the gaps does not help; it makes
// fewer, larger beads. The line showing through BETWEEN the drops is the
// entire defect, so the fix is not to respace them but to stop putting them
// where the line is.
//
// So the shaft is now empty and the drops live only where fluid is actually
// exposed: between the catheter's tip and the surface. Two of them, because
// two reads as a sequence — one leaving, one about to land — where one reads
// as a blemish and three crowd a 23-unit gap.
//
// The tip moved from y=60 to y=50 to open that gap. It stays inside the cavity
// (the roof is at y=37) and stays under the surface during dwell, which rests
// at y=46 — the catheter still sits in the fluid, which is the thing that
// panel needs to be true.
const CATHETER_TIP = 50;
const DROP_LEVELS_FILL = [57, 68];

// DRAIN HAS NO DROPS, on client instruction (3 Sep 2026). It briefly carried
// four of them rising from the residual pool toward the catheter — the fill
// mark mirrored, pointed at the bottom — and inverted drops read as wrong-way-
// up drops rather than as rising ones, whatever the geometry argues.
//
// So the third panel is once more carried by its water level alone. That is a
// state rather than an action, which is the trade being made here knowingly:
// the row now shows two steps happening and one step's result. If drain ever
// wants an action mark again it needs a shape that is not a drop — the drop is
// spoken for, and it only ever means "falling".

// A drop: a point at the top, a circle at the bottom, joined by two curves.
// Built from the level rather than positioned by transform, because the CSS
// animation owns `transform` and a base offset there would be overwritten.
//
// 5 units across and 7 tall, down from 7 and 9 (31 Aug 2026). At the earlier
// size the three of them left gaps of 4 units between shapes 9 units tall, and
// at rest — where all three are visible at once — that read as a chain of
// beads threaded on the catheter rather than as three drops falling down it.
// The gaps are now roughly the height of a drop.
// One direction only. This briefly took a `dir` argument so drain could draw
// the same shape mirrored; that came out on client instruction and the
// parameter went with it rather than sitting unused. A drop points the way it
// falls, and on this site it only falls.
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
          // white/35, NOT /15 (3 Sep 2026). Measured off the rendered page,
          // /15 composites to rgb(39, 60, 99) on ink — 1.54:1, against WCAG
          // 1.4.11's 3:1 floor for a graphic you need in order to understand
          // the content. It was the faintest mark in the figure while every
          // other one cleared 4.3:1, and it is the mark that carries the
          // meaning: the whole three-panel story is the LEVEL of this shape.
          // /35 measures 3.19:1. The cavity outline went up with it — see the
          // note there for why the two had to move together.
          className={cn(
            "fill-white/35",
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
        {/* white/65, raised from /45 with the dialysate (3 Sep 2026). It
            already cleared 1.4.11 on its own at 4.29:1, so this is not a
            contrast fix — it is a SEPARATION one. The wall's job below the
            water line is to be distinguishable from the fluid it contains, and
            /45 against a /15 fill was a 30-point gap that became a 10-point
            gap the moment the fill went to /35. The two are a pair; move one
            and the other follows. */}
        <path
          d={PERITONEAL_CAVITY}
          className="stroke-white/65"
          vectorEffect="non-scaling-stroke"
        />

        {/* The catheter, and the connection point at the top where the bag or
            the cycler attaches. Present in all three steps: it is not removed
            between exchanges, which is itself worth showing. */}
        <path
          d={`M80 8V${CATHETER_TIP}`}
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
          ? DROP_LEVELS_FILL.map((y, i) => (
              <path
                key={y}
                d={dropletPath(y)}
                className="pd-drip fill-white/80"
                // Staggered inside the fill window (starts at 250ms, runs
                // 1000ms), so the drops arrive while the level is rising
                // rather than after it has settled. 250ms apart, which with a
                // 700ms fall puts the second one landing at 1200ms — just as
                // the surface reaches the level it rests at.
                style={{ animationDelay: `${250 + i * 250}ms` }}
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
    body: "Sterile dialysate runs down the catheter into the space around the organs. It flows in under gravity or from the cycler. It is not injected.",
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
              exchange is always the same three steps. Everything else
              (how many, how long, how much fluid) is the part your
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
          {/* THE FIGURE'S LEGEND WAS HERE, and came out on client instruction
              (3 Sep 2026). It named every mark — that the drawing is a
              schematic rather than an anatomical illustration, that the outline
              is the peritoneal cavity, the line the catheter, the shaded area
              dialysate whose level is not a measured volume, the drops fluid
              running in, the arrows a direction and not a quantity.

              None of that is said anywhere else now, so the drawing above is
              unlabelled: DESIGN.md's rule for a bespoke diagram — that a reader
              who has never seen it can name what a mark means — is no longer
              met on this page, and the disclaimer that the cavity outline is
              not anatomy has gone with it. Recorded here rather than argued,
              but do not re-derive it as an oversight: it was removed on
              purpose. */}
          <p className="text-base text-white/75">
            Fill volumes, dwell times and the number of exchanges in a night are
            not the same for everyone. They are set by your nephrologist and
            adjusted over time.
          </p>
        </div>

        {/* THE CLINICAL LAYER FOR THIS SECTION — "Why the fluid removes water
            as well as solute", on diffusion, osmosis and why a longer dwell
            does not mean more fluid removed — was removed on client
            instruction (3 Sep 2026).

            The page's premise is unchanged and is stated in its own direction
            contract: it "lets the clinician open a second layer at each step
            rather than being written a second page." That is now true of two
            steps rather than three — `PdBasics` and `ByHandOrMachine` still
            carry theirs, and the exchange, which is the one step with a
            mechanism a clinician would want, no longer does. `ClinicalLayer`
            itself is untouched and still used by both. */}
      </div>
    </section>
  );
}
