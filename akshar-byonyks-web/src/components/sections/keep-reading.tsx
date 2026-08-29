import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

// Spec §11.2, internal linking: "every content page links to at least two
// siblings and one conversion page." This is the two-siblings half; the
// conversion page is reached from every page's hero and its closing CTA band.
//
// Was `X1Continue`, hardcoded to the X-1 page's two siblings. Generalised on
// 27 Aug 2026 when `/innovation/how-it-works/` needed the identical block with
// different destinations — at which point the choice was one component with a
// prop or two files that had to be kept looking the same by hand.
//
// **Only ever pass routes that exist.** The X-1 page shipped this block
// pointing at `/innovation/how-it-works/` and `/innovation/market/` while
// neither was built, so both 404'd. That was defensible for a section header
// nobody promised was live; it is not defensible for a card whose entire copy
// is an invitation to read the thing. Both routes exist as of 28 Aug 2026 and
// both are linked again. The rule that produced the gap has not changed and is
// the reason it closed cleanly: the cards followed the routes, rather than the
// routes being owed to the cards.
export type ReadingLink = { href: string; title: string; body: string };

export function KeepReading({
  items,
  heading = "Keep reading",
}: {
  items: ReadingLink[];
  heading?: string;
}) {
  const headingId = "keep-reading-heading";
  return (
    <section aria-labelledby={headingId} className="bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <h2 id={headingId} className="text-3xl font-bold text-ink sm:text-4xl">
          {heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {items.map(({ href, title, body }, index) => (
            <ScrollReveal key={href} delayMs={index * 90}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-xl border border-line bg-card p-6 hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <h3 className="text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:underline">
                  Read on
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
