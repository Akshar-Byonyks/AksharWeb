import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { DocumentGrid, GridBlock } from "@/components/layout/document-grid";
import { LocationRegister } from "@/components/locations/location-register";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { defaultOg } from "@/lib/seo";
import { byIndiaFirst } from "@/lib/locations";

const path = "/locations";

const description =
  "Where the group operates: Byonyks' head office in the United States, and the two India facilities it has announced but not opened. No Akshar Byonyks India address has been published. The Contact page is where to reach the office.";

export const metadata: Metadata = {
  title: "Locations",
  description,
  alternates: { canonical: path, languages: { "en-IN": path } },
  openGraph: {
    title: "Locations | Akshar Byonyks",
    description,
    url: path,
    type: "website",
    images: defaultOg,
  },
  twitter: { card: "summary" },
};

// Built 31 August 2026 on the client's request, as a top-level route in the
// primary nav — the client's call on both counts, which takes the nav from
// four items to five.
//
// NO `Organization` STRUCTURED DATA WITH AN ADDRESS, and that is deliberate.
// `/about-us` already refuses one for the stated reason that "a placeholder in
// structured data is a placeholder a crawler will publish". There is now no
// India address at all to publish, and `PostalAddress` has no way to say
// "coming soon" that a crawler would respect — it would either be omitted or
// filled with the licensor's US address, and the second of those is the exact
// company-blurring this page exists to prevent. So the page ships with
// breadcrumbs only, and the machine-readable address waits for the real one.
//
// THREE SITES CAME OFF THIS PAGE ON 1 SEP 2026 — Bengaluru, Punjab and Lahore
// — on the client's instruction, and THE INDIA OFFICE THAT REPLACED BENGALURU
// CAME OFF ON 2 SEP, also on instruction. The two Pakistan rows had been added
// on 31 Aug against the standing audit direction, so their removal restores
// spec F-1 rather than departing from it.
//
// The consequence of the second removal is worth stating here as well as in
// the data: **every row on this page is now a Byonyks site**, so the page is
// the group's premises register and no longer answers "where are you" under
// this company's masthead. /contact is the only place that still says the
// India office exists. `src/lib/locations.ts` carries the full reasoning and
// deviations.md §9 records the turns.
export default function LocationsPage() {
  return (
    <>
      <div className="mx-auto max-w-[1280px] px-4 pt-10 sm:px-6 lg:px-8">
        {/* Tone stays light: this hero is on `background`, not the ink most
            other section heroes on this site open with. */}
        <Breadcrumbs items={[{ name: "Locations" }]} />
      </div>

      <section
        aria-labelledby="locations-heading"
        className="mx-auto max-w-[1280px] px-4 pt-8 pb-16 sm:px-6 lg:px-8 lg:pt-12 lg:pb-20"
      >
        <ScrollReveal>
          <DocumentGrid>
            {/* An "On this page" rail note sat here — "Three in India and one
                in the United States; two operating, two announced. Every card
                says which company holds it." — and came out on client
                instruction (3 Sep 2026). The counts it gave are still true of
                the cards below; they are just no longer summarised before the
                reader reaches them. */}
            <GridBlock>
              <h1
                id="locations-heading"
                className="text-4xl font-bold tracking-tight text-balance text-ink sm:text-5xl"
              >
                Four sites, two companies
              </h1>
              <p className="mt-6 text-lg text-ink">
                Akshar Byonyks is the India licensee for the X-1 cycler. Byonyks
                designed the device, manufactures it, and holds its FDA
                clearance. Those are two companies with separate premises, and
                this page keeps them apart on every row rather than presenting
                one map and letting the reader assume.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                One of the sites below is ours, and its address is still coming.
                The rest are Byonyks&rsquo;, and are listed because the device
                this company brings to India is designed at one of them and
                announced for the other two.{" "}
                <Link
                  href="/about-us"
                  className="rounded-sm text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  How the licensing relationship works
                </Link>
                .
              </p>
            </GridBlock>
          </DocumentGrid>
        </ScrollReveal>
      </section>

      <div className="bg-surface-2">
        {/* No `space-y` here any more: it separated the two registers, and
            there is one. */}
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          {/* ONE REGISTER, NOT TWO. The split into "Operating today" and
              "Announced, not open" sorted the page by the distinction a reader
              cares about second, and buried the one they care about first: on
              an India-market site, the two India sites sat in a group further
              down the page. Sorting India to the front puts them in the first
              two cells of the three-column grid, so the emphasis is the layout
              rather than a badge stuck on top of it. The operating/announced distinction did
              not go away — it moved onto each card's face, where it survives
              the re-sort that a section heading would not. */}
          <LocationRegister
            id="sites"
            title="All three sites, India first"
            lead="The two India sites lead, then Byonyks' head office. Hyderabad and Ahmedabad are announced rather than open. Neither has a published opening date, and neither is called a manufacturing site here, because that is a separate CDSCO licence route and no licence has been published for either. Every card names the company that holds the building."
            items={byIndiaFirst}
          />
        </div>
      </div>

      {/* WHAT THIS PAGE CANNOT TELL YOU, stated by the page rather than left
          for a reader to notice. Every other register on this site closes the
          same way, and a locations page has more to declare than most: two of
          the three rows are announcements, and since 2 Sep 2026 none of them
          is ours. A reader who came here to find Akshar Byonyks has to be told
          that in words rather than left to infer it from three cards that all
          say Byonyks. */}
      <section
        aria-labelledby="locations-limits-heading"
        className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <ScrollReveal>
          <DocumentGrid>
            <GridBlock>
              <h2
                id="locations-limits-heading"
                className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl"
              >
                What this page does not say
              </h2>
              <p className="mt-6 text-base text-ink">
                Every address, function and date above is Byonyks&rsquo; own
                account of itself, published on its website and retrieved on one
                day. None of it has been checked against a corporate register,
                which is why no row is marked as being on the public record.
              </p>
              <p className="mt-4 text-base text-ink">
                Every site above belongs to Byonyks. Akshar Byonyks&rsquo; own
                India office is not listed, because no address for it has been
                published.{" "}
                <Link
                  href="/contact"
                  className="rounded-sm text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Contact
                </Link>{" "}
                is where to reach it. The ISO&nbsp;13485
                certification the X-1 is built under is real and central to the
                device, but its certificate number has never reached this
                project, and the facility behind it is no longer named on this
                page. The{" "}
                <Link
                  href="/products/the-x1-cycler"
                  className="rounded-sm text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  quality and compliance record
                </Link>{" "}
                sets out exactly which numbers are and are not held.
              </p>

            </GridBlock>
          </DocumentGrid>
        </ScrollReveal>
      </section>

      {/* No `leadIn`: this band follows a section on the plain `background`,
          which is what `SilhouetteEdge` already draws against by default. It
          carried `leadIn="Locations"` until 1 Sep 2026 — the prop is a
          className forwarded to the edge, so that string was emitting a class
          that matches nothing. Harmless in effect, wrong in fact. */}
      <CtaBand
        heading="Looking for the right office?"
        body="Tell us who you are and what you need, and we route it to the right person rather than the nearest address."
      />
    </>
  );
}
