import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Cite } from "@/components/market/figure-register";
import { accessFigures, scaleFigures } from "@/lib/market-data";

// Legs 1 and 2 of spec §3.3, merged (28 Aug 2026). They were two sections and
// they are one argument: most people with kidney failure in India never reach
// dialysis, and the reason is the road. Split across two headings the second
// half read as a new topic rather than as the answer to the first.
//
// EDITORIAL TREATMENT, SIGNED OFF. The page was called bland and too long, and
// both were the same defect: `proof-band.tsx`'s refusal of the hero-metric
// band got applied as "one form for everything," so ten figures rendered as
// ten identical hairline rows and every screen looked like the last. Spec §9.2
// asks this page for "charts, not paragraphs" and it was shipping paragraphs
// with numbers in them. This section now runs four different forms in
// sequence — display pair, unit figure, schematic, three-up — and shares its
// template with nothing else on the page.
//
// THE THIRD INK MOMENT, AND WHY IT IS EARNED. DESIGN.md permits three
// full-coverage ink spends and says "three is a ceiling, never a target,"
// gating the third on a meaning test: ink carries home, night and patient
// life; the light carries evidence, regulation and specification. Every other
// figure on this page is evidence about a market and stays in the light. This
// one is not. "About two thirds of people with kidney failure died without
// receiving dialysis" is the only fact here that is about people rather than
// about an opportunity, and it is the page's emotional peak. It gets the ink.
//
// It is also the page's fix for blandness, and those two justifications are
// not the same thing — if the meaning test had failed, the blandness would
// have had to be solved another way. It did not fail.
//
// THE HONESTY PROBLEM THE FIGURE HAD TO SOLVE. The obvious unit chart here is
// 2.2 lakh arriving against 175,000 treated, drawn as one bar with a filled
// fraction. That would be a lie in a chart. The first is annual incidence, the
// second is standing prevalence: different measures, different denominators,
// and subtracting one from the other produces a number that means nothing.
// They are shown as two separate display figures with the difference stated in
// words, and the unit chart draws the one figure on this page that is
// genuinely a proportion.

// THE SPLIT THE FIGURE DRAWS, written once and used by both the bar and the
// labels beneath it so the two cannot fall out of alignment.
//
// Two-to-one rather than a percentage, and that is a claim about the source
// rather than a shortcut. The figure behind this is word-valued -- market-data
// records it as "= two thirds", not as 67% -- so a bar drawn at 67/33 would
// assert a precision the paper does not carry. Two-to-one IS two thirds, and
// it is the only honest way to draw an approximation at this size.
// TWO CONSTANTS, BOTH WRITTEN OUT IN FULL, and that is not redundancy.
// Tailwind builds its stylesheet by scanning source text for whole class
// names, so a class assembled at runtime ("sm:" + SPLIT) is a candidate the
// scanner never sees and a rule that is never generated -- the bar would be
// correct and its labels would silently lose their columns at every width.
// Each breakpoint's class therefore appears here as a literal string.
const SPLIT = "grid-cols-[2fr_1fr]";
const SPLIT_SM = "sm:grid-cols-[2fr_1fr]";

const [incidence, prevalence, untreated] = scaleFigures;
const [travelled50km, lived100km, dropout] = accessFigures;

/**
 * The proportion, as one bar split once.
 *
 * REDRAWN 11 SEP 2026, on client instruction: "the visual for 2/3 needs to be
 * replaced with something that makes it more apparent, don't like the boxes."
 *
 * WHAT THE BOXES WERE AND WHY THEY FAILED. A hundred small squares in a
 * ten-by-ten grid, thirty-three filled white and sixty-seven drawn as outlines
 * at white/30. As a unit chart it was technically correct, and it asked the
 * reader to do two jobs before it paid anything back: count, and separate a
 * 1px outline from a solid fill on a dark ground. In the right column of a
 * two-column grid those cells landed around 20px, at which size white/30 on
 * ink is very nearly the ink -- so the honest reading of the old figure was
 * "a block of white squares and some texture". The one number on this page
 * that is about people rather than about an opportunity was the hardest thing
 * on the page to see.
 *
 * WHAT REPLACED IT. One bar, one cut, across the full measure. Nothing to
 * count and nothing to resolve: the gold runs twice as far as the hollow
 * remainder, which IS the fact, and it reads at a glance and at a distance.
 * The figure also moved out of the side column and under the sentence it
 * illustrates, so it gets the whole width rather than a third of it.
 *
 * GOLD IS NOT BORROWED HERE. The Wayfinding Rule fixes gold to "home/India"
 * and this page is the India case; the display figure directly above the bar
 * has been set in text-accent-gold since this section was built, so the bar is
 * the same colour as the number it draws. That link is the point -- a reader
 * who looks up meets the same gold saying the same thing -- and a bar is a
 * non-text graphic, which is what the Accent Ration Rule permits.
 *
 * aria-hidden ON THE BAR AND ITS LABELS, unchanged in spirit from the boxes:
 * the proportion is stated in words immediately above it and again in the
 * figcaption, so a screen reader that also walked the bar would be told the
 * same fact three times.
 */
function UntreatedFigure() {
  return (
    <figure className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="max-w-3xl">
        <p className="text-5xl font-bold tracking-tight text-balance text-accent-gold sm:text-6xl lg:text-7xl">
          {untreated.value}
        </p>
        <p className="mt-5 text-xl font-semibold text-balance text-white sm:text-2xl">
          of people with kidney failure died without ever receiving dialysis
        </p>
        <p className="mt-4 max-w-xl text-base text-white/70">
          Not people who stopped treatment, and not people on a waiting list.
          People for whom the therapy that exists never began.
        </p>
        <p className="mt-5 font-mono text-xs tracking-wide text-white/70">
          {untreated.asOf}
          <Cite source={untreated.source} onInk />
        </p>
      </div>

      <div aria-hidden="true" className="mt-12">
        {/* Solid gold against a hollow remainder rather than two solid fills:
            an outline reads as absence, and the smaller, quieter part of this
            picture is the third who did receive treatment. The divider is a
            2px rule in the section's own ground, so the cut reads as a gap
            rather than as a third colour. */}
        <div className={`grid overflow-hidden rounded-lg ${SPLIT}`}>
          <div className="h-20 bg-accent-gold sm:h-28 lg:h-32" />
          <div className="h-20 border-y border-r border-l-2 border-white/30 border-l-ink bg-white/10 sm:h-28 lg:h-32" />
        </div>

        {/* The labels sit under their own segments from sm and stack below it.
            Stacked, the reading order still matches the bar left to right, and
            each block keeps a rule in its segment's own colour -- AccentRail's
            grammar, and never the only carrier, because the words say which is
            which on their own. */}
        <dl className={`mt-5 grid grid-cols-1 gap-5 sm:gap-8 ${SPLIT_SM}`}>
          <div className="border-t-2 border-accent-gold pt-3">
            <dt className="text-lg font-semibold text-white sm:text-xl">
              Two thirds
            </dt>
            <dd className="mt-1 text-sm text-white/70 sm:text-base">
              Died without ever receiving dialysis
            </dd>
          </div>
          <div className="border-t-2 border-white/30 pt-3">
            <dt className="text-lg font-semibold text-white sm:text-xl">
              One third
            </dt>
            <dd className="mt-1 text-sm text-white/70 sm:text-base">
              Received it
            </dd>
          </div>
        </dl>
      </div>

      <figcaption className="mt-12 border-t border-white/15 pt-5 text-sm text-white/60">
        The bar is the proportion, not a count of cases: roughly one person in
        three with kidney failure received dialysis, and the rest did not.
      </figcaption>
    </figure>
  );
}

const WEEK = ["M", "T", "W", "T", "F", "S", "S"] as const;

/** Which days of the week involve a round trip to a facility. */
const CENTRE_TRIP_DAYS = [0, 2, 4];

function WeekRow({
  title,
  note,
  isMarked,
  markClassName,
}: {
  title: string;
  note: string;
  isMarked: (index: number) => boolean;
  markClassName: string;
}) {
  return (
    <div>
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      {/* aria-hidden: the grid is a picture of the sentence in `note`, and a
          screen reader that walked seven unlabelled cells twice would get
          fourteen letters and no argument. `note` carries the whole meaning. */}
      <ul aria-hidden="true" className="mt-4 grid grid-cols-7 gap-1.5 sm:gap-2">
        {WEEK.map((day, index) => (
          <li
            key={`${title}-${index}`}
            className={
              isMarked(index)
                ? `flex aspect-square items-center justify-center rounded-md text-sm font-semibold ${markClassName}`
                : "flex aspect-square items-center justify-center rounded-md bg-surface-3 text-sm text-muted-foreground"
            }
          >
            {day}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">{note}</p>
    </div>
  );
}

// Colour here is the wayfinding system doing its job rather than decorating:
// plum is "institutional / formal" sitewide and marks the days owned by a
// facility; gold is home and India, and marks the nights that are not. The
// two schedules are the argument, so the two colours are the two meanings the
// palette already carries.
function WeekGeometry() {
  return (
    <figure className="rounded-2xl border border-line bg-card p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12">
        <WeekRow
          title="In-centre hemodialysis"
          note="Three days owned by a facility, plus the road there and back on each of them."
          isMarked={(index) => CENTRE_TRIP_DAYS.includes(index)}
          markClassName="bg-plum text-white"
        />
        <WeekRow
          title="Automated peritoneal dialysis"
          note="Seven nights at home, on a schedule set with a nephrologist. No day at a facility."
          isMarked={() => true}
          markClassName="bg-accent-gold/25 text-ink"
        />
      </div>
      <figcaption className="mt-8 border-t border-line pt-5 text-sm text-muted-foreground">
        A schematic of the two schedules, not of any individual&rsquo;s
        treatment plan. Session frequency is set by a nephrologist and varies by
        patient.
      </figcaption>
    </figure>
  );
}

/** The three-up. Display scale, no register rows, one shared rule. */
function DistanceFigures() {
  return (
    <dl className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {[travelled50km, lived100km, dropout].map((figure, i) => (
        <div
          key={figure.label}
          className={
            i === 0
              ? "pb-8 sm:pr-8 sm:pb-0 lg:pr-12"
              : i === 1
                ? "py-8 sm:px-8 sm:py-0 lg:px-12"
                : "pt-8 sm:pt-0 sm:pl-8 lg:pl-12"
          }
        >
          <dt className="text-4xl font-bold tracking-tight text-ink tabular-nums lg:text-5xl">
            {figure.value}
          </dt>
          <dd className="mt-4 text-lg font-semibold text-ink">
            {figure.label}
          </dd>
          <dd className="mt-2 text-base text-muted-foreground">
            {figure.detail}
          </dd>
          <dd className="mt-3 font-mono text-xs tracking-wide text-muted-foreground">
            {figure.asOf}
            <Cite source={figure.source} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function TheGap() {
  return (
    <section
      aria-labelledby="the-gap-heading"
      id="the-gap"
      className="scroll-mt-24 bg-surface-2"
    >
      <div className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="the-gap-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
            >
              Most people with kidney failure in India never reach a dialysis
              chair
            </h2>
          </div>
        </ScrollReveal>

        {/* The display pair. Two measures, deliberately not combined into one
            figure: see the header note on why subtracting them is meaningless
            arithmetic that would look authoritative. */}
        <ScrollReveal>
          <dl className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-14">
            {[incidence, prevalence].map((figure) => (
              <div key={figure.label}>
                <dt className="text-5xl font-bold tracking-tight text-ink tabular-nums lg:text-6xl">
                  {figure.value}
                </dt>
                <dd className="mt-4 text-lg font-semibold text-balance text-ink">
                  {figure.label}
                </dd>
                <dd className="mt-2 max-w-sm text-base text-muted-foreground">
                  {figure.detail}
                </dd>
                <dd className="mt-3 font-mono text-xs tracking-wide text-muted-foreground">
                  {figure.asOf}
                  <Cite source={figure.source} />
                </dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>

        <ScrollReveal>
          <p className="mt-10 max-w-2xl border-l-2 border-line pl-5 text-base text-muted-foreground">
            The first of those is a yearly arrival and the second is a standing
            total. They are different measures on different denominators, and
            this page does not subtract one from the other. The figure
            below is the one that is genuinely a proportion.
          </p>
        </ScrollReveal>
      </div>

      {/* Full-bleed ink. The page's third and last ink spend, and the only
          section of this page that leaves the light. Sits deliberately a full
          screen below the hero so the two do not read as stripes. */}
      <div className="mt-20 bg-ink">
        <UntreatedFigure />
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl">
              The reason is the road
            </h3>
            <div className="mt-6 space-y-5 text-lg text-foreground">
              <p>
                In-centre hemodialysis organizes a life around a building.
                Three days a week, indefinitely, the patient travels to a
                facility and back, and in most cases someone travels with
                them, which makes it two people&rsquo;s working day, not one.
              </p>
              <p>
                In much of India that journey is not a detail of the treatment.
                It is a recurring cost of it, charged in hours and wages rather
                than in rupees, which is why it appears in no tariff and in none
                of the cost figures further down this page.
              </p>
              <p>
                Automated peritoneal dialysis does not shorten the journey. It
                removes it. That is the whole of the argument, and it is why the
                technology is worth more here than in the market that cleared
                it.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-12">
            <WeekGeometry />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-16 border-t border-line pt-12">
            <DistanceFigures />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
