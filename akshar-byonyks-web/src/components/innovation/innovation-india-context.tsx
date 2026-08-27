import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

// Spec §9.2's "India context block", and the argument PRODUCT.md calls "the
// strongest single argument in the Indian market" — the one the US parent's
// own site barely makes.
//
// Written entirely without numbers, on purpose. Every figure that would
// strengthen it — how many people are on dialysis, how far they travel, what
// share is on home therapy — is on PRODUCT.md's "still fully open, do not
// fabricate" list, and the site's third principle is that an unsourceable
// claim gets cut rather than softened. The geometry of the argument survives
// without them: three trips a week is a description of the therapy schedule,
// not a statistic about India.
//
// It does not restate the four benefits, although §9.2 lists a "four-benefit
// summary" for this page. They already run on Home in the patient register and
// on `/innovation/how-it-works/` as an evidence register with their reference
// slots; a third instance on the hub between the two would be the exact
// repetition the sitewide critique found and would leave the hub with nothing
// of its own to say. The doorway above carries the reader to them instead.
export function InnovationIndiaContext() {
  return (
    <section aria-labelledby="innovation-india-heading" className="bg-surface-2">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="innovation-india-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
            >
              Why this argument is different in India
            </h2>

            <div className="mt-6 space-y-5 text-lg text-foreground">
              <p>
                In-centre haemodialysis organises the week around a facility
                &mdash; roughly three trips, plus the road between them. In
                much of India that road is the treatment&rsquo;s real cost:
                travel time, working hours lost by the patient and by whoever
                travels with them, and in many districts no facility within
                reach at all.
              </p>
              <p>
                Automated peritoneal dialysis does not shorten that trip. It
                removes it. The therapy runs overnight, at home, on a schedule
                set with a nephrologist &mdash; which is why the technology
                matters more here than it does in the markets it was cleared
                in.
              </p>
              <p className="text-base text-muted-foreground">
                The sourced version of this argument &mdash; scale, cost,
                coverage and the mix of therapies actually in use, each figure
                dated and attributed &mdash; is the market page, and it
                publishes when those sources are confirmed. Nothing on this
                site states a figure it cannot source.
              </p>
            </div>

            <Link
              href="/innovation/how-it-works"
              className="mt-8 inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              How the therapy actually works
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
