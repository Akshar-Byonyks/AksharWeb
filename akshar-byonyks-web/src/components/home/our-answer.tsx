import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

// §9.1 row 3: "The X-1 in one image and three sentences." The image is
// Byonyks USA's own official product render (public/images/README.md has
// the source and why it's fair use) — a render, not a photograph, and
// captioned as such rather than passed off as the genuine article.
export function OurAnswer() {
  return (
    <section aria-labelledby="our-answer-heading" className="bg-background">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <ScrollReveal variant="settle">
          <figure>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
              <Image
                src="/images/x1-apd-cycler.png"
                alt="The Byonyks X-1 automated peritoneal dialysis cycler, screen powered on and ready to start a cycle"
                width={910}
                height={518}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </div>
          </figure>
        </ScrollReveal>

        <ScrollReveal variant="settle" delayMs={120}>
          <h2 id="our-answer-heading" className="text-3xl font-bold text-ink sm:text-4xl">
            Our answer: the X-1 cycler
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            The X-1 is Byonyks&rsquo; automated peritoneal dialysis cycler,
            cleared by the US FDA under 510(k) in May 2025. It runs the
            exchange cycle overnight while the patient sleeps, replacing
            repeated clinic visits with treatment at home. Akshar Byonyks is
            licensed to bring it to India.
          </p>
          <Link
            href="/innovation/the-x1-cycler"
            className="mt-6 inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            See the full specification
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
