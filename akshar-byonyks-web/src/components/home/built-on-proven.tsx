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
    // py-16, not py-20. The sitewide critique measured this as a 376px band
    // holding 61 words and nothing else, and noted that every section on the
    // page carried identical padding so no page had a rhythmic peak. This one
    // is a short qualitative statement between two larger moments — it should
    // read as the page taking a breath, not as another full-height section.
    <section aria-labelledby="built-on-proven-heading" className="bg-surface-2">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2 id="built-on-proven-heading" className="text-3xl font-bold text-ink sm:text-4xl">
              Built on proven technology
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              The X-1 is not a new, unproven device. It is licensed from
              Byonyks USA, and the cycler itself was cleared by the US FDA
              under 510(k) K243371 on 16 May 2025 after testing by SGS,
              TÜV SÜD and FiLab. Akshar Byonyks brings that same technology
              — and the manufacturing standards behind it — to India.
            </p>
            <a
              href="https://byonyks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 rounded-sm py-1 text-sm font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Visit Byonyks USA
              <span className="sr-only"> (opens in a new tab)</span>
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
