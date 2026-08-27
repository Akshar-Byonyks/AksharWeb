import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PendingChip } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

// The hub's actual job: route. DESIGN.md's Hairline Row List rule converted
// most of the site's card grids to rows, and named the one exception —
// "the four audience doorways on Home… navigational rather than expository."
// These are the same kind of thing, so they stay cards. Unlike the audience
// cards they carry no accent tint: gold, teal and plum each mean something
// fixed sitewide and none of those meanings is "this is a page about the
// device."
//
// **The unbuilt child is shown, and is not a link.** `/innovation/market/` is
// in the primary nav and in the footer, so a visitor already knows it is meant
// to exist; a hub that silently omitted it would read as if the page had been
// forgotten rather than as if it were coming. It renders as a card-shaped
// block with no href and the pending chip — the same reasoning DESIGN.md gives
// for breadcrumbs ("unbuilt ancestors render as text, not links"), applied one
// level down. What it must not do is 404, which is what linking it would.
//
// `/innovation/whats-next/` (spec §8.3: the X2 and X3 roadmap) is neither
// built nor in the nav, and is not shown at all. There is a difference between
// a page a visitor has been promised and one they have not.
const built = [
  {
    href: "/innovation/the-x1-cycler",
    title: "The X-1 cycler",
    body: "The device itself: what it does, its specification, and its regulatory position in the US and in India — including the rows that are not yet published.",
  },
  {
    href: "/innovation/how-it-works",
    title: "How peritoneal dialysis works",
    body: "The therapy in plain language — the peritoneum, the three steps of an exchange, and the difference between doing them by hand and by cycler. With a technical layer at each step.",
  },
];

export function InnovationDoorways() {
  return (
    <section aria-labelledby="innovation-doorways-heading" className="bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="innovation-doorways-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
            >
              What is in this section
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Start with the therapy if the words are new, or with the device
              if they are not.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {built.map(({ href, title, body }, index) => (
            <ScrollReveal key={href} delayMs={index * 90}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-8"
              >
                <h3 className="text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 grow text-base text-muted-foreground">
                  {body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-base font-semibold text-primary group-hover:underline">
                  Read on
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </span>
              </Link>
            </ScrollReveal>
          ))}

          <ScrollReveal delayMs={180}>
            {/* No `href`, no hover state, no focus ring: nothing here is
                interactive, and giving it the affordances of a link would be
                the one thing worse than omitting the card. */}
            <div className="flex h-full flex-col rounded-2xl border border-dashed border-line bg-surface-2 p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-ink">
                The India market
              </h3>
              <p className="mt-3 grow text-base text-muted-foreground">
                Scale, access geometry, cost and coverage, and the mix of
                therapies actually in use. It is not published yet because
                every figure on it has to carry a source and a date, and those
                are still being gathered.
              </p>
              <p className="mt-5">
                <PendingChip label="In preparation" />
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
