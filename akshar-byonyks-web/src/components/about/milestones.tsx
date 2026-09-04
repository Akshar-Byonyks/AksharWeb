import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PendingChip } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { milestones } from "@/lib/about";

// The milestone timeline. Spec §9.6 folded it here when the investor section
// was cut: "the milestone timeline … folds into /about-us/our-story/ instead
// of /investors/milestones/."
//
// WHAT IT DOES NOT REPRINT. The spec's list is nine entries and four of them
// are the test houses — FiLab, HTW, SGS, TÜV SÜD. Those are now rows in the
// compliance register on `/products/the-x1-cycler/`, with their dates, their
// laboratories and the certificate numbers that are still missing. Restating
// them here would be the duplication that retired `/manufacturing/` on 29 Aug
// 2026, reintroduced the same day on a different page.
//
// So 2023 is **one entry that links to the register** rather than four that
// copy it. A timeline is an arc; a register is a record. The arc's job is to
// say that independent testing happened and roughly when; the record's job is
// to say exactly what and by whom, once.
//
// THE TWO TIERS CAME OFF 3 Sep 2026, with the rest of the site's visible
// provenance and on the same client instruction.
//
// They used to be marked twice over: a filled dot for the FDA's record against
// a hollow one for Byonyks' own account, and a label in words beside each. The
// words went first, because they are what a reader actually reads as sourcing.
//
// THE MARKERS HAD TO GO WITH THEM, and this is the part worth writing down.
// The old comment here justified the two dot shapes on the grounds that "the
// label beside it carries the same meaning in words for anyone who cannot use
// the shape" — which is WCAG 1.4.1 satisfied by the label, not by the dot.
// Delete the label and the dot becomes the sole carrier of a distinction with
// no text equivalent anywhere on the page: a worse accessibility position than
// before the labels existed. So the two shapes collapse into one neutral
// marker, and the timeline no longer draws a distinction it cannot state.
//
// PENDING IS DIFFERENT AND STAYS. `PendingChip` is not a citation — it says a
// number has not been published yet, which is the opposite claim, and it
// carries its own words. Its dashed marker keeps a text equivalent and so
// keeps its shape.
//
// The distinction itself is not lost: `about.ts` still records `verification`
// on every milestone, and SOURCES.md still separates the FDA record from the
// company statements.
//
// Surface: background, between two tinted sections. Evidence stays in the
// light, per the Full-Bleed Rule's meaning test.
const PENDING_LABEL = "Not yet stated";

export function Milestones() {
  return (
    <section aria-labelledby="milestones-heading" className="bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="milestones-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
            >
              How the X-1 got here
            </h2>
            {/* The second sentence used to read "Two of these dates are on a
                public register and the rest are Byonyks' own account, so each
                one says which it is." It came out with the labels it was
                describing, on 3 Sep 2026. A page that promises each entry says
                which it is, beside entries that no longer say, is a worse
                failure than the silence — it is the site vouching for a
                discipline the reader can see it is not keeping. */}
            <p className="mt-4 text-lg text-muted-foreground">
              Five years from a production line to a US clearance.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {/* A rule down the left with the dates hanging off it, not a row of
              dots. Dots space events evenly and these are not evenly spaced —
              the gap between submission and clearance is most of the story an
              investor is asking about. */}
          <ol className="mt-12 max-w-4xl border-l border-line">
            {milestones.map((milestone) => (
              <li
                key={milestone.title}
                className="relative pb-10 pl-8 last:pb-0"
              >
                {/* One marker for everything that has happened, dashed for
                    what has not. Non-text graphic, so the Accent Ration Rule
                    allows it, and the only distinction it still draws is the
                    one the PendingChip beside it also states in words. */}
                <span
                  aria-hidden="true"
                  className={
                    milestone.verification === "pending"
                      ? "absolute top-1.5 -left-[6.5px] size-3 rounded-full border border-dashed border-pending bg-background"
                      : "absolute top-1.5 -left-[6.5px] size-3 rounded-full border border-line bg-background"
                  }
                />
                <p className="font-mono text-sm tracking-wide text-muted-foreground tabular-nums">
                  {milestone.when}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-balance text-ink">
                  {milestone.title}
                </h3>
                <p className="mt-2 max-w-2xl text-base text-foreground">
                  {milestone.detail}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {milestone.verification === "pending" ? (
                    <PendingChip label={PENDING_LABEL} />
                  ) : null}
                  {milestone.href ? (
                    <Link
                      href={milestone.href}
                      className="inline-flex items-center gap-1.5 rounded-sm py-1 text-sm font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {milestone.hrefLabel}
                      <ArrowRight
                        className="size-3.5 shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </div>
    </section>
  );
}
