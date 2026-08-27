import { ClinicalLayer } from "@/components/innovation/clinical-layer";
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
const CAVITY =
  "M26 56C26 43 38 37 54 37H106C122 37 134 43 134 56V104C134 120 114 128 80 128C46 128 26 120 26 104Z";

// Dialysate level per step, in viewBox units. Lower y is fuller.
const LEVELS = { fill: 88, dwell: 46, drain: 116 } as const;

type Step = keyof typeof LEVELS;

function CycleFigure({ step }: { step: Step }) {
  const clipId = `pd-cavity-${step}`;
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
          <path d={CAVITY} />
        </clipPath>
      </defs>

      {/* Dialysate. Drawn first so the cavity outline sits on top of its edge
          rather than being hidden under it. */}
      <rect
        x="0"
        y={LEVELS[step]}
        width={ART_W}
        height={ART_H - LEVELS[step]}
        clipPath={`url(#${clipId})`}
        className="fill-white/15"
      />

      {/* Every stroke in this figure is a 1.5px hairline at non-scaling
          weight, so the three panels read as one drawing at any width —
          DESIGN.md's "single stroke weight" line-art characteristic taken
          literally. `vectorEffect` is not inherited, so it is set per element
          rather than once on the group. */}
      <g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={CAVITY} className="stroke-white/45" vectorEffect="non-scaling-stroke" />

        {/* The catheter, and the connection point at the top where the bag or
            the cycler attaches. Present in all three steps: it is not removed
            between exchanges, which is itself worth showing. */}
        <path d="M80 8V60" className="stroke-white/70" vectorEffect="non-scaling-stroke" />
        <circle cx="80" cy="8" r="3.5" className="stroke-white/70" vectorEffect="non-scaling-stroke" />

        {step === "fill" ? (
          <g className="stroke-white">
            <path d="M74 22L80 28L86 22" vectorEffect="non-scaling-stroke" />
            <path d="M74 36L80 42L86 36" vectorEffect="non-scaling-stroke" />
          </g>
        ) : null}

        {step === "drain" ? (
          <g className="stroke-white">
            <path d="M74 28L80 22L86 28" vectorEffect="non-scaling-stroke" />
            <path d="M74 42L80 36L86 42" vectorEffect="non-scaling-stroke" />
          </g>
        ) : null}

        {/* Dwell: transfer across the membrane, drawn as four arrows pointing
            inward through the cavity wall. They carry no quantity — they mark
            a direction, and the caption says which direction and of what. */}
        {step === "dwell" ? (
          <g className="stroke-white">
            <path d="M12 82H32" vectorEffect="non-scaling-stroke" />
            <path d="M26 77L32 82L26 87" vectorEffect="non-scaling-stroke" />
            <path d="M148 82H128" vectorEffect="non-scaling-stroke" />
            <path d="M134 77L128 82L134 87" vectorEffect="non-scaling-stroke" />
            <path d="M54 146V126" vectorEffect="non-scaling-stroke" />
            <path d="M49 132L54 126L59 132" vectorEffect="non-scaling-stroke" />
            <path d="M106 146V126" vectorEffect="non-scaling-stroke" />
            <path d="M101 132L106 126L111 132" vectorEffect="non-scaling-stroke" />
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
        <ol className="mt-14 grid grid-cols-1 divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
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

        <div className="mt-12 max-w-3xl space-y-5">
          {/* The legend. DESIGN.md, Two Paths: "before shipping a bespoke
              diagram, check that a reader who has never seen it can name what
              a mark means." Every mark above is named here. */}
          <p className="text-sm text-white/60">
            Schematic, not an anatomical illustration. The outline is the
            peritoneal cavity, the vertical line is the catheter, and the
            shaded area is dialysate. In step 2 the arrows show waste and extra
            fluid crossing the membrane into the fluid; they mark direction
            only, not quantity.
          </p>
          <p className="text-base text-white/75">
            Fill volumes, dwell times and the number of exchanges in a night
            are not the same for everyone. They are set by your nephrologist
            and adjusted over time.
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
