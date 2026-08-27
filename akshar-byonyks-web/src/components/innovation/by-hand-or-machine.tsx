import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ClinicalLayer } from "@/components/innovation/clinical-layer";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { deviceName } from "@/lib/claims";

// The section that connects this page to the rest of the site. Until it
// existed, nothing anywhere explained why an automated cycler is a product at
// all — the X-1 page opens on a machine whose job the reader has not been told
// about, and Home compares "the clinic" with "home" without ever naming what
// runs at home. Two sentences of category context do that work.
//
// PRODUCT.md's tone rule for the patient register is explicit that "modality"
// is never used without explaining it. The same applies to the acronyms: CAPD
// and APD both appear expanded first, because a reader will meet both at their
// clinic and the site is the wrong place to learn them for the first time as
// initials.
//
// A definition list of two, hairline-separated, rather than two cards side by
// side. DESIGN.md's Hairline Row List is written for three-to-five peer items;
// at two the reason still holds and the alternative is worse — two equal
// bordered rectangles is the exact "lazy container" the sitewide critique
// found thirty-five instances of.
const routes = [
  {
    term: "Continuous ambulatory peritoneal dialysis (CAPD)",
    definition:
      "The exchanges are done by hand, several times through the day, using gravity and a bag. There is no machine. Each one takes some of the day.",
  },
  {
    term: "Automated peritoneal dialysis (APD)",
    definition:
      "A machine called a cycler performs the exchanges, usually overnight while the patient sleeps. The daytime hours are left free of exchanges.",
  },
];

export function ByHandOrMachine() {
  return (
    <section aria-labelledby="pd-routes-heading" className="bg-surface-2">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <ScrollReveal>
            <div className="lg:sticky lg:top-24">
              <h2
                id="pd-routes-heading"
                className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
              >
                By hand, or by machine
              </h2>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                The three steps are the same either way. What changes is who
                performs them, and when.
              </p>
            </div>
          </ScrollReveal>

          <div>
            <dl>
              {routes.map(({ term, definition }, index) => (
                <ScrollReveal key={term} delayMs={index * 90}>
                  <div className="border-t border-line py-6 first:border-t-0 first:pt-0 sm:py-7">
                    <dt className="text-lg font-semibold text-ink">{term}</dt>
                    <dd className="mt-2 max-w-2xl text-base text-muted-foreground">
                      {definition}
                    </dd>
                  </div>
                </ScrollReveal>
              ))}
            </dl>

            <ScrollReveal delayMs={180}>
              {/* The one place on this page that names the product. It sits
                  after the category explanation rather than before it, which
                  is the whole argument for the section: a reader who does not
                  know what a cycler is has no way to evaluate a page about
                  one. */}
              <div className="mt-8 border-t border-line pt-8">
                <p className="max-w-2xl text-lg text-foreground">
                  The {deviceName} is an APD cycler. It runs the exchanges
                  overnight, at home, warming the fluid to body temperature
                  before each fill.
                </p>
                <Link
                  href="/innovation/the-x1-cycler"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  See the X-1 cycler
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              </div>

              <ClinicalLayer summary="Where the choice between the two comes from">
                <p>
                  APD covers continuous cycling peritoneal dialysis and its
                  variants, with or without a daytime dwell. The choice between
                  CAPD and APD, and the prescription within either, follows
                  from membrane transport characteristics, residual kidney
                  function, target clearance and ultrafiltration, and the
                  patient&rsquo;s own circumstances — not from the equipment
                  available.
                </p>
              </ClinicalLayer>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
