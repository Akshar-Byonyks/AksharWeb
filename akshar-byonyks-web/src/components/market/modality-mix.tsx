import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Cite, FigureRegister } from "@/components/market/figure-register";
import {
  GUATEMALA_PD_SHARE,
  modalityFigures,
} from "@/lib/market-data";

// Leg 4 of spec §3.3: "India's PD share of dialysis versus comparable
// countries. The Guatemala 56% comparison from the current site is a good
// rhetorical device and should be kept."
//
// It is kept, at 45%. That is what the published source says, and the 56% on
// byonyks.com could not be traced to anything. Section 5's P1 defect on that
// site is one claim carried at two values because nobody re-checked it; a
// rebuild that inherits the unchecked number has reproduced the defect while
// congratulating itself on the redesign.
//
// THE DERIVED NUMBER. India's PD share is not stated anywhere as a percentage.
// It is arithmetic on two counts from one paper, and the caption says so and
// shows the division. A derived figure presented as a quoted one is the same
// class of error as an unsourced figure, and it is harder to catch later.
//
// WHY BARS RATHER THAN A TABLE. Spec §7.2 lists a comparison table for this
// page and §9.2 asks for "charts, not paragraphs." The comparison is two
// numbers on one axis, and a two-row table of two percentages is a table
// pretending to be a chart. The bar is the shorter honest form. It carries no
// information the adjacent text does not, which is why it is aria-hidden: the
// figures are read from the text, and the bar exists to make the ratio
// unmissable at a glance rather than to be the only place it lives.
//
// The 2024 count that disagrees with the 2018 one is now a footnote under the
// comparison rather than a third register row (28 Aug 2026). It was the third
// thing a reader met in a section whose whole job is a single ratio, and a
// competing estimate is a qualification on a finding, not a finding.

/**
 * India's peritoneal dialysis share, computed rather than quoted.
 *
 * 8,500 of (175,000 + 8,500) = 4.6%. Both counts are 2018, from the same
 * paper, so the division is between like figures — which is the only condition
 * under which this site will derive a number at all.
 */
const INDIA_PD_SHARE = 4.6;

function ShareBar({
  country,
  share,
  note,
  barClassName,
}: {
  country: string;
  share: number;
  note: React.ReactNode;
  barClassName: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-semibold text-ink">{country}</h3>
        <p className="text-3xl font-bold tracking-tight text-ink tabular-nums">
          {share}%
        </p>
      </div>
      {/* Decoration for a number that is stated in full immediately above it.
          A progress role here would announce a percentage the reader has
          already been given, twice.

          `min-w` on the fill: at 4.6% of a narrow mobile column the bar is a
          couple of pixels and reads as a rendering fault rather than as a
          small quantity. The floor keeps it legible as a deliberate mark
          without inflating it enough to misstate the ratio beside it. */}
      <div
        aria-hidden="true"
        className="mt-3 h-3 w-full overflow-hidden rounded-full bg-surface-3"
      >
        <div
          className={`h-full min-w-[0.75rem] rounded-full ${barClassName}`}
          style={{ width: `${share}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{note}</p>
    </div>
  );
}

export function ModalityMix() {
  return (
    <section
      aria-labelledby="modality-heading"
      id="modality-mix"
      className="scroll-mt-24 bg-surface-2"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        {/* Third distinct layout on the page: a centred statement rather than
            a left-framed one, because this section makes a single comparison
            and has no sequence to walk a reader through. */}
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="modality-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
            >
              India runs almost no home dialysis
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Peritoneal dialysis has been available in India for decades and is
              named in the national programme. Fewer than one dialysis patient
              in twenty is on it, which is a finding about how the
              country&rsquo;s dialysis capacity was built, not about whether the
              therapy works.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-12">
            <FigureRegister
              figures={modalityFigures}
              emphasis="row"
              layout="two-up"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <figure className="mt-16 rounded-2xl border border-line bg-card p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-ink">
              The comparison worth making
            </h3>
            <p className="mt-3 max-w-3xl text-base text-muted-foreground">
              Guatemala is not a large or wealthy health system. It is the
              comparison because it shows that a country&rsquo;s peritoneal
              dialysis share is set by how its dialysis programme was
              organized, not by how much money it has.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* COLOUR CORRECTION, 28 Aug 2026. The first build put gold on
                  Guatemala's bar, which inverted the site's own wayfinding:
                  gold means home and India everywhere else on this site, so
                  spending it on the comparator told a reader the opposite of
                  what the section argues. India now carries gold — a sliver of
                  it, which is the point — and Guatemala carries teal, the
                  "evidence / clinical rigor" role, which is exactly what a
                  cited external comparator is. */}
              <ShareBar
                country="India"
                share={INDIA_PD_SHARE}
                barClassName="bg-accent-gold"
                note={
                  <>
                    Derived, not quoted: 8,500 of roughly 183,500 people on
                    dialysis, both counts 2018 from the same source.
                    <Cite source="pd-first" />
                  </>
                }
              />
              <ShareBar
                country="Guatemala"
                share={45}
                barClassName="bg-teal"
                note={
                  <>
                    {GUATEMALA_PD_SHARE.detail}
                    <Cite source={GUATEMALA_PD_SHARE.source} />
                  </>
                }
              />
            </div>

          </figure>
        </ScrollReveal>
      </div>
    </section>
  );
}
