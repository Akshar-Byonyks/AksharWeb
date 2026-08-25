import Link from "next/link";
import { Phone } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SilhouetteEdge } from "@/components/layout/silhouette-edge";
import { Button } from "@/components/ui/button";
import { siteContact } from "@/lib/site-config";

// §9.1 row 9 on Home; the closing conversion band on every page after it.
// Phone number is a placeholder (Open Questions 1.1) — must be replaced
// before launch (spec §14.4 item 3).
//
// This band is where the page's closing ink mass begins, so it carries the
// silhouette edge that hands off from the last light section above it. The
// footer below is the same ink with no border between them: CTA band and
// footer are one shaped landmass, not two stacked rectangles (deviations.md
// entry 2).
//
// Parameterized 24 Aug 2026, when `/innovation/the-x1-cycler/` became the
// second page to close with it. Copy defaults to Home's, so Home is
// unchanged; `leadIn` exists because the silhouette is drawn against the
// section above it, which is `bg-background` on Home and `bg-surface-2` on
// the X-1 page — a straight rule there would seam a mass meant to read as
// continuous.
export function CtaBand({
  heading = "Talk to Akshar Byonyks",
  body = "Patient, clinician, investor, or distributor enquiry — we route it to the right person.",
  ctaLabel = "Send an enquiry",
  ctaHref = "/contact",
  leadIn,
}: {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  leadIn?: string;
} = {}) {
  return (
    <section aria-labelledby="cta-band-heading" className="bg-ink">
      <SilhouetteEdge className={leadIn} />
      <ScrollReveal className="block">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-6 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h2 id="cta-band-heading" className="text-2xl font-bold text-white sm:text-3xl">
              {heading}
            </h2>
            <p className="mt-2 max-w-md text-white/70">{body}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${siteContact.phone.replace(/\s/g, "")}`}
              className="inline-flex min-w-0 items-center gap-2 rounded-sm text-white/90 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={
                siteContact.phoneIsPlaceholder
                  ? "Phone number placeholder, to be confirmed"
                  : `Call ${siteContact.phone}`
              }
            >
              <Phone className="size-4" aria-hidden="true" />
              <span>{siteContact.phone}</span>
            </a>
            <Button
              asChild
              size="lg"
              className="h-auto min-h-11 shrink min-w-0 bg-accent-gold px-6 py-2.5 text-base whitespace-normal text-ink hover:bg-accent-gold/85"
            >
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
