import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Cite } from "@/components/market/figure-register";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { founderStory } from "@/lib/about";

// The origin. Spec §9.5 assigns this to `/about-us/our-story/`; it is here
// because the pre-build measurement found it was one of only four things this
// section of the site could say that the rest of it does not already say. A
// hub page built from the other eight would have been `/manufacturing/` again.
//
// QUOTED, NOT ADOPTED — the whole point of this component. byonyks.com's
// `/the-vision/` carries the narrative in the first person and signs it
// **Farrukh Usman, Founder and CEO of Byonyks**. Akshar Byonyks is a different
// company and its own founders are Open Question 1.4, unknown to this project.
// Lifting "my aunt" onto this site in the first person would invent an origin
// for a company that has not told us its own — the same class of error as
// re-badging a factory, arriving through a story instead of a certificate.
//
// So it is set as a quotation with a name and a role on it, and the copy
// around it says whose company the story started. That is not a hedge: an
// origin story is only worth anything if the reader knows whose it is, and
// "the man who built this device watched his aunt go through the alternative"
// is a stronger sentence than an unattributed one, not a weaker one.
//
// The US sentence in the original — "Every clinic in America is using more
// than 20-year-old dialysis technologies" — is not carried over. Spec §3.2
// lists the US-market arguments among the claims that do not transfer, and
// PRODUCT.md's fourth principle replaces content that does not transfer rather
// than keeping it for volume. The trim is recorded in `about.ts`.
//
// NOT MIGRATED FROM byonyks.com/about-us/: "62% of all the peritoneal dialysis
// machines in the US have contributions from our team members" and the "$44
// billion dialysis businesses in North America" line. Both are unsourced,
// both are US-market claims, and the project rule for an unsourceable
// statistic is to cut it rather than soften it.
//
// The one statistic this section does carry is imported and cited, not
// retyped. It belongs to /innovation/market/ and to a specific paper with a
// specific period, and a number that travels between pages without its source
// is exactly the defect market-data.ts was built to make impossible.
export function OriginStory() {
  return (
    <section aria-labelledby="origin-heading" className="bg-surface-2">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="origin-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
            >
              Why the device exists
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The X-1 was not designed as a product category. It was designed by
              someone who had watched the alternative up close, and he has said
              so in his own words.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {/* Gold on the rule, not on the type. The Accent Ration Rule allows
              accents on non-text graphics; gold means "home / India", and the
              sentence this quotation ends on is about treatment at home. */}
          <figure className="mt-12 max-w-3xl border-l-4 border-accent-gold pl-6 sm:pl-8">
            <blockquote className="text-xl text-balance text-ink sm:text-2xl sm:leading-relaxed">
              <p>{founderStory.quote}</p>
            </blockquote>
            <figcaption className="mt-6 text-base text-muted-foreground">
              <span className="font-semibold text-ink">
                {founderStory.attribution}
              </span>
              <span className="mt-1 block">{founderStory.role}</span>
              <span className="mt-2 block text-sm">
                Published on {founderStory.source}, retrieved{" "}
                {founderStory.retrieved}.
              </span>
            </figcaption>
          </figure>
        </ScrollReveal>

        <ScrollReveal>
          {/* The India chapter, as the second beat of the same section rather
              than a section of its own. It is one idea — the founder's reason
              scales — and splitting it in two would have produced two thin
              sections saying half a thing each. */}
          <div className="mt-16 max-w-3xl border-t border-line pt-10">
            <h3 className="text-2xl font-bold tracking-tight text-balance text-ink">
              And why an Indian company exists to bring it here
            </h3>
            <p className="mt-4 text-lg text-foreground">
              That reason travels further than the market it was written in. A
              needleless treatment at home removes a clinic trip; in the United
              States the trip is an inconvenience, and across most of India it
              is the reason people do not receive dialysis at all. About two
              thirds of people with kidney failure in India died without ever
              receiving it — 2010 data, reported 2020
              <Cite source="gkha-india" />.
            </p>
            <p className="mt-4 text-lg text-foreground">
              Akshar Byonyks exists to close the distance between a device that
              is already cleared and a country where it would matter most. It
              does not manufacture the X-1 and it does not hold its clearance.
              It holds the licence to bring it here, and the work of getting it
              approved, supplied and supported for Indian patients.
            </p>
            <p className="mt-8">
              <Link
                href="/innovation/market"
                className="inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                The India case, in sourced figures
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
