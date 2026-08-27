import { PendingChip } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

// Spec §9.2: this page "carries the four benefits, each with a supporting
// reference." The four are PRODUCT.md's migrated framework and they already
// ship on Home, in the patient register, as four hairline rows with accent
// chips.
//
// Repeating that section here would have been the obvious build and it would
// have added nothing. What this page owes the reader is the half Home cannot
// carry: the reference each claim rests on. So this is the same four claims
// set as an evidence register — the claim, then the source slot — and the
// source slot is empty on all four, visibly, because no reference has been
// published for any of them yet.
//
// That is not a gap being dressed up. PRODUCT.md's third principle is
// "evidence before claims — no statistic ships without a source and a date; an
// unsourceable claim gets cut, not softened," and the X-1 page's own direction
// contract says a specification with four visible gaps is worth more to a
// nephrologist or an investor than a complete-looking one. This section is
// that argument applied to the therapy claims rather than to the device
// specification.
//
// No accent chips, unlike Home's version of the four. Home's group is where
// the wayfinding colour code is taught and it keeps them; here the treatment
// is documentary, and colouring a reference register would decorate exactly
// the thing whose credibility depends on not being decorated. Same reasoning
// that stripped the chips off the X-1 feature rows.
//
// White ground: DESIGN.md's revised Full-Bleed Rule puts evidence, regulation
// and specification in the light, and this is evidence.
const benefits = [
  {
    title: "Protects the peritoneal membrane",
    body: "Peritoneal dialysis filters through the lining of the patient’s own abdomen, so preserving that lining’s integrity over time is part of what the therapy is designed around.",
  },
  {
    title: "Lower total cost of being treated",
    body: "Home therapy removes the recurring cost of travel to a centre, the working hours lost to it for both the patient and whoever travels with them, and the clinic time itself.",
  },
  {
    title: "Supports residual kidney function",
    body: "Home peritoneal dialysis is associated with preserving residual renal function for longer than in-centre haemodialysis.",
  },
  {
    title: "Clears acid and toxins",
    body: "Each cycle removes acid and toxins that build up in the dialysate — the same job healthy kidneys do continuously.",
  },
];

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
                Four benefits, and their references
              </h2>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                These are the four reasons peritoneal dialysis is offered. Each
                one rests on published evidence, and none of those references
                is on this site yet. They are marked rather than implied.
              </p>
            </div>
          </ScrollReveal>

          <dl>
            {benefits.map(({ title, body }, index) => (
              <ScrollReveal key={title} delayMs={index * 90}>
                <div className="border-t border-line py-6 first:border-t-0 first:pt-0 sm:py-7">
                  <dt className="text-lg font-semibold text-ink">{title}</dt>
                  <dd className="mt-2 max-w-2xl text-base text-muted-foreground">
                    {body}
                  </dd>
                  {/* The reference slot. A chip and a label, not a sentence
                      each: four identical sentences would be four times the
                      noise for one fact, which the lead paragraph has already
                      stated once. */}
                  <dd className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                    <PendingChip label="Reference pending" />
                    <span>Citation to be added at nephrologist review.</span>
                  </dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
