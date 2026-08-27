import Link from "next/link";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";

// Spec §9.2's "IFU request CTA", and the block the specification table's
// pending rows point at. Its own section rather than a line in the table,
// because for the Priority-3 audience (spec §4.3: clinicians need the IFU,
// the specs and a named contact) this is the page's actual conversion.
//
// Deliberately not a document download. No IFU asset exists in this repo, and
// a device manufacturer's IFU is controlled documentation — offering it as a
// direct file would imply a distribution right this project has not
// established. The request routes through the contact form (§9.8), where the
// enquiry type arrives pre-classified.
//
// Promoted to ink 26 Aug 2026, the second of this page's three full-bleed ink
// moments under DESIGN.md's revised Full-Bleed Rule. It was a bordered card
// inside a tinted section — the sitewide critique measured it using 47% of the
// viewport with nothing beside it, and it read as one more rounded rectangle
// among twenty-three. On ink it is the dark punctuation between the page's two
// documentary sections, and the card disappears: a full-bleed ground does the
// separating a border was standing in for.
export function X1Ifu() {
  return (
    <section aria-labelledby="x1-ifu-heading" className="bg-ink text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <ScrollReveal>
          {/* The action sits beside the copy rather than under it: this is the
              page's clinician conversion, and it needs to read as a band of
              its own weight, not as a column of body text with a button. */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              <h2
                id="x1-ifu-heading"
                className="text-2xl font-bold text-balance sm:text-3xl"
              >
                Request the Instructions for Use
              </h2>
              <p className="mt-4 text-lg text-white/75">
                Clinicians and clinics evaluating the X-1 can request the
                Instructions for Use and the technical documentation behind the
                specification above. Tell us what you need and who you are
                asking for, and we will route it.
              </p>
            </div>
            {/* Gold, not primary blue: DESIGN.md reserves the gold button for
                the primary action on a dark ground, and this is now one. */}
            <Button
              asChild
              size="lg"
              className="h-auto min-h-11 shrink min-w-0 bg-accent-gold px-6 py-2.5 text-base whitespace-normal text-ink hover:bg-accent-gold/85"
            >
              <Link href="/contact?enquiry=clinician">
                Request the documentation
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
