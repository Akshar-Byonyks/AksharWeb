import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { benefits } from "@/lib/pd-benefits";

// Spec §9.2: this page "carries the four benefits, each with a supporting
// reference." The four are PRODUCT.md's migrated framework and they already
// ship on Home, in the patient register, as four hairline rows with accent
// chips.
//
// THE REFERENCES CAME OFF THIS PAGE ON 11 SEP 2026, and the spec line above
// is the reason that needs explaining rather than just doing. The client's
// instruction was "References should be placed in separate document with the
// rest of the sources", which is the same instruction the 3 Sep pass acted on
// when it took the citations off `/innovation/market` — visible sourcing
// comes off the pages, the evidence stays in the data, SOURCES.md is where it
// is read.
//
// So §9.2 is still satisfied, and by the same reading the market page relies
// on: every one of these four claims still has a reference or a declared
// absence, `pd-benefits.ts` throws at module load if one does not, and
// `getSource` throws if the reference is not a registered citation. What
// changed is where a reader finds it. This page carries the claims; SOURCES.md
// and `/what-we-know` carry what each one rests on.
//
// WHAT THIS SECTION NOW OWES HOME, given that Home already lists the same
// four. Home's version is a teaser in the patient register with accent chips;
// this is the full statement of each claim in the register the rest of the
// page is written in. The lead no longer promises references it does not
// show, which is the one thing the old version did that this must not.
//
// No accent chips, unlike Home's version of the four. Home's group is where
// the wayfinding colour code is taught and it keeps them; here the treatment
// is documentary, and colouring a claim register would decorate exactly the
// thing whose credibility depends on not being decorated. Same reasoning that
// stripped the chips off the X-1 feature rows.
//
// White ground: DESIGN.md's revised Full-Bleed Rule puts evidence, regulation
// and specification in the light, and this is evidence.

export function PdBenefits() {
  return (
    <section aria-labelledby="pd-benefits-heading" className="bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <ScrollReveal>
            <div>
              <h2
                id="pd-benefits-heading"
                className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
              >
                Why it is offered
              </h2>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                These are the four reasons peritoneal dialysis is offered.
                Three rest on the conclusions of KDIGO&rsquo;s dialysis
                conferences, and are written to say no more than those
                conferences do. The fourth has no published reference behind it
                yet.
              </p>
            </div>
          </ScrollReveal>

          {/* The claim, and nothing under it.

              The reference slot that used to sit here held a sentence saying
              what the cited report concludes and a link to the report itself.
              Both survive in `pd-benefits.ts` and are written into SOURCES.md
              on every build; neither is rendered. */}
          <dl>
            {benefits.map(({ title, body }, index) => (
              <ScrollReveal
                key={title}
                delayMs={index * 90}
                className="border-t border-line py-6 first:border-t-0 first:pt-0 sm:py-7"
              >
                <dt className="text-lg font-semibold text-ink">{title}</dt>
                <dd className="mt-2 max-w-2xl text-base text-muted-foreground">
                  {body}
                </dd>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
