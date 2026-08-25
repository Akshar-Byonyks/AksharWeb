import { ExternalLink } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

// §9.1 row 7. The spec calls for the "62%" claim substantiated here — it
// isn't yet (PRODUCT.md Evidence on Hand: "needs a sourced footnote before
// it ships"). Per the no-unsourced-statistics principle, the specific
// figure is cut rather than shipped as a placeholder; the relationship is
// stated qualitatively instead. Reinstate "62% of US PD machines are
// Byonyks-made" here once a source and date exist.
export function BuiltOnProven() {
  return (
    <section aria-labelledby="built-on-proven-heading" className="bg-surface-2">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2 id="built-on-proven-heading" className="text-3xl font-bold text-ink sm:text-4xl">
              Built on proven technology
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The X-1 is not a new, unproven device. It is licensed from
              Byonyks USA, an established American medical device company
              already serving clinics across the United States, and cleared
              by the US FDA under 510(k) in May 2025. Akshar Byonyks brings
              that same technology — and the manufacturing standards behind
              it — to India.
            </p>
            <a
              href="https://byonyks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 rounded-sm py-1 text-sm font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Visit Byonyks USA
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
