import { PendingNote } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Cite, FigureRegister } from "@/components/market/figure-register";
import { catastropheLadder, costFigures } from "@/lib/market-data";

// Leg 3 of spec §3.3: "Out-of-pocket burden, the Pradhan Mantri National
// Dialysis Programme, Ayushman Bharat PM-JAY coverage, state schemes.
// Reimbursement policy changes; every number carries a date and a source."
//
// REBUILT SHORTER, 28 AUG 2026. This section was the densest on the page and
// carried four things it did not need: the health-system cost per session, the
// three-part breakdown of how households borrowed, and both modelled lifetime
// savings from the PD-first analysis along with its quality-adjusted life year
// figures. `market-data.ts` records why each one went. What remains is one
// household cost, one coverage figure, and the ladder.
//
// THE LADDER IS THE SECTION. Everything else here is setup for it. The finding
// is not that dialysis is expensive — every reader already assumes that. It is
// that the same session becomes ruinous for half of households once the
// schedule requires three of them a week. The schedule is the variable, which
// makes this leg 2's argument arriving through the ledger, and it is the
// reason a home therapy is an economic argument and not only a comfort one.
//
// The first build stated it in the source's own term, "catastrophic health
// expenditure," and never defined it — a technical threshold used as if it
// were plain English, guarding the best finding on the page. The definition
// now comes before any percentage does.
//
// PM-JAY: still pending, and now one pending rather than two. Spec §11.6
// points "is dialysis covered by Ayushman Bharat" at this page and the honest
// answer is partial. The rate cards this build could reach were secondary
// write-ups rather than the National Health Authority's published master, and
// a tariff quoted from a blog is exactly what §14.4 exists to keep off the
// site. The second pending — a per-state coverage map — was cut as a near
// duplicate of the first; two adjacent markers saying "we do not know the
// reimbursement" is one gap drawn twice.
function CatastropheLadder() {
  const { steps, plainThreshold, asOf, source } = catastropheLadder;
  return (
    <figure className="rounded-xl border border-line bg-card p-6 sm:p-8">
      <h3 className="text-xl font-semibold text-balance text-ink">
        What changes the number is the schedule, not the price
      </h3>
      <p className="mt-4 max-w-2xl text-base text-foreground">
        Researchers counted how often paying for hemodialysis pushed a
        household past what it could absorb, defined as spending{" "}
        {plainThreshold}. The cost of one session never changed. Only how many
        of them a week the therapy required.
      </p>

      <dl className="mt-8">
        {steps.map(({ frequency, share, percent }) => (
          <div
            key={frequency}
            className="grid grid-cols-1 gap-x-6 gap-y-2 border-t border-line py-5 first:border-t-0 first:pt-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center"
          >
            <dt className="text-base font-semibold text-ink">{frequency}</dt>
            <dd className="flex items-center gap-4">
              {/* Decoration for a number stated in full beside it.
                  Plum, not blue: the wayfinding system reads plum as
                  "institutional / formal," and what this ladder measures is
                  what the facility's own schedule does to a household. The
                  same meaning marks the facility days in the week figure
                  above, so a reader meets one colour for one idea twice. */}
              <div
                aria-hidden="true"
                className="h-4 grow overflow-hidden rounded-full bg-surface-3"
              >
                <div
                  className="h-full rounded-full bg-plum"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-28 shrink-0 text-right text-3xl font-bold whitespace-nowrap text-ink tabular-nums lg:w-32 lg:text-4xl">
                {share}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <figcaption className="mt-6 border-t border-line pt-5 text-sm text-muted-foreground">
        Share of households pushed past that line, at a subsidised public
        hospital. {asOf}
        <Cite source={source} />
      </figcaption>
    </figure>
  );
}

export function CostAndCoverage() {
  return (
    <section
      aria-labelledby="cost-heading"
      id="cost-and-coverage"
      className="scroll-mt-24 bg-background"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        {/* Layout deliberately unlike the section above it and the one below:
            heading across the measure, the ladder immediately at full width as
            the section's argument, and the supporting figures *after* it as a
            two-up strip rather than in a sticky sidebar. The first build gave
            every section the same framing-and-artifact split, which is a large
            part of why the page read as one long thing. */}
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="cost-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
            >
              What it costs the household
            </h2>
            {/* The lead paragraph -- which said that the best public costing
                of hemodialysis in an Indian public hospital is 2015-16
                fieldwork, used because it is the best there is -- came off on
                client instruction, 11 Sep 2026. The fieldwork period itself is
                NOT hidden: every figure below still prints its own "as of" and
                its own citation, which is where a reader checks the age of a
                number anyway. What is gone is the page saying it once, up
                front, in its own voice. */}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-12">
            <CatastropheLadder />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-14">
            <FigureRegister figures={costFigures} layout="two-up" />
          </div>
        </ScrollReveal>

        <div className="mt-16 border-t border-line pt-14">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-semibold text-ink">
                  What the state already pays for
                </h3>
                <p className="mt-4 text-base text-foreground">
                  The Pradhan Mantri National Dialysis Programme was rolled out
                  on 7 April 2016 to provide free dialysis through district
                  hospitals. It was designed with two components from the start:
                  hemodialysis services and peritoneal dialysis
                  services.
                  <Cite source="pmndp" />
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={90}>
              <div>
                <h3 className="text-xl font-semibold text-ink">
                  What we will not state yet
                </h3>
                <p className="mt-4 text-base text-muted-foreground">
                  Ayushman Bharat PM-JAY reimburses dialysis through its health
                  benefit package, and state schemes reimburse it separately
                  again. The package codes and rates, including those for
                  peritoneal dialysis, are the numbers a payer will
                  actually want, and this page will not carry them until they
                  come from the National Health Authority&rsquo;s own published
                  package master.
                </p>
                <PendingNote
                  className="mt-5"
                  label="PM-JAY and state scheme reimbursement rates for hemodialysis and peritoneal dialysis"
                  note="Rates pending verification against the NHA package master"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
