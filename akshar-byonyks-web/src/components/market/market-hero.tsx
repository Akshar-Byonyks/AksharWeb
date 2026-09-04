import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ScrimmedImage } from "@/components/common/scrimmed-image";
import { Button } from "@/components/ui/button";

// Spec §9.2, `/innovation/market/`. Statement hero, ink at full coverage —
// the first of this page's three moments under DESIGN.md's Full-Bleed Rule.
// The second is the untreated-proportion figure inside `the-gap.tsx` and the
// third is the closing mass; that middle one is the only content here that is
// about people rather than about a market, which is the meaning test the rule
// sets for spending a third.
//
// THE HEADLINE. Spec §9.1's note bars opening on a bare category term, and
// "Home dialysis in India" would be exactly that. This opens on the claim
// being made instead — that there is a case, and that it is India's rather
// than a translation of the US parent's. §11.6 points "dialysis cost in India"
// and "is dialysis covered by Ayushman Bharat" at this page, and both are
// answered inside it rather than promised in the heading.
//
// THE SECOND BUTTON went from "read the sources first" to the conversion path
// on 28 Aug 2026, when the numbered register it pointed at was cut. Citations
// now sit at each figure and link straight to the paper, so there is nowhere
// left to send a reader for them and nothing lost by not sending them.
//
// THE AUDIENCE LINE (28 Aug 2026). This page is written for spec §4.1's
// Priority-1 reader and says so in its own first viewport, because §11.6
// routes "dialysis cost in India" here and that search is at least as likely
// to be a frightened patient as an analyst. PRODUCT.md describes that reader
// as often mobile, older, and reading in a second language under stress; the
// worst thing this page could do to them is let them work down to a
// catastrophic-expenditure ladder before realising it was not written for
// them. Naming the audience and pointing elsewhere in the same sentence costs
// one line and is the whole remedy.
export function MarketHero() {
  return (
    <section
      aria-labelledby="market-hero-heading"
      className="relative isolate bg-ink"
    >
      {/* The photograph is the argument, not decoration: this page's case is
          that the barrier to dialysis in India is a road, and that is a road
          in India with people travelling it. Alt text describes the picture
          rather than repeating the headline over it. */}
      <ScrimmedImage
        src="/images/india-rural-road.jpg"
        alt="A tree-lined rural road in Uttar Pradesh, with motorcyclists and cyclists travelling along it."
        priority
        objectPosition="center 60%"
      />
      <div className="relative mx-auto max-w-[1280px] px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <Breadcrumbs
          tone="dark"
          items={[
            { name: "Innovation", href: "/innovation" },
            { name: "The India market" },
          ]}
        />

        <div className="mt-10 lg:mt-14">
          <h1
            id="market-hero-heading"
            className="max-w-3xl text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
          >
            The India case for home dialysis
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            India adds more people to kidney failure each year than its
            centre-based dialysis system treats in total. The gap is not mainly
            a shortage of machines. It is a distance and a schedule, and
            those are the two things home peritoneal dialysis changes.
          </p>
          <p className="mt-5 max-w-2xl text-base text-white/60">
            Written for investors and partners. Every figure names the year it
            describes and the source it came from, linked; where one cannot be
            sourced yet, the slot is marked rather than filled. If you are a
            patient or a carer,{" "}
            <Link
              href="/innovation/how-it-works"
              className="rounded-sm font-semibold text-white underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              start with how the therapy works
            </Link>
            .
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-auto min-h-11 shrink min-w-0 bg-accent-gold px-6 py-2.5 text-base whitespace-normal text-ink hover:bg-accent-gold/85"
            >
              <Link href="#the-gap">Start with the gap</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-auto min-h-11 shrink min-w-0 border-white/45 bg-transparent px-6 py-2.5 text-base whitespace-normal text-white hover:bg-white/10"
            >
              <Link href="/contact">Talk to us about India</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
