import Link from "next/link";
import { FileText } from "lucide-react";

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
export function X1Ifu() {
  return (
    <section aria-labelledby="x1-ifu-heading" className="bg-surface-2">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* One full-width panel with the action set beside the copy, rather
              than a narrow card stacked above a button. It is the page's
              clinician conversion and it sits directly above the CTA band, so
              it needs to read as a band of its own weight, not as a third
              column of body text. */}
          <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-2xl">
                <div className="inline-flex size-11 items-center justify-center rounded-full bg-accent text-primary">
                  <FileText className="size-5.5" aria-hidden="true" />
                </div>
                <h2
                  id="x1-ifu-heading"
                  className="mt-4 text-2xl font-bold text-ink sm:text-3xl"
                >
                  Request the Instructions for Use
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Clinicians and clinics evaluating the X-1 can request the
                  Instructions for Use and the technical documentation behind
                  the specification above. Tell us what you need and who you
                  are asking for, and we will route it.
                </p>
              </div>
              <Button asChild size="lg" className="h-auto min-h-11 shrink min-w-0 py-2.5 px-6 text-base whitespace-normal">
                <Link href="/contact?enquiry=clinician">
                  Request the documentation
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
