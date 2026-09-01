import type { Metadata } from "next";
import Link from "next/link";

import { ProvenanceMark } from "@/components/common/provenance";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  DocumentGrid,
  GridBlock,
  RailNote,
} from "@/components/layout/document-grid";
import { LocationRegister } from "@/components/locations/location-register";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { defaultOg } from "@/lib/seo";
import { byIndiaFirst, LOCATIONS_RETRIEVED } from "@/lib/locations";

const path = "/locations";

const description =
  "Where Akshar Byonyks and Byonyks operate: the Akshar Byonyks India office, Byonyks' head office, and the two India facilities that have been announced but not opened.";

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
// — on the client's instruction. The two Pakistan rows had been added on 31
// Aug against the standing audit direction, so their removal restores spec
// F-1 rather than departing from it; the Bengaluru row was this company's own,
// and what replaced it is an India office with its address marked "coming
// soon" rather than nothing at all. `src/lib/locations.ts` carries the full
// reasoning and deviations.md §9 records both turns.
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
            <GridBlock
              rail={
                <RailNote label="On this page">
                  Three in India and one in the United States; two operating,
                  two announced. Every card says which company holds it.
                </RailNote>
              }
            >
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
              an India-market site, the India office sat third in the first
              group and the two India sites in a separate group further down.
              Sorting India to the front puts all three in the top row of the
              three-column grid, so the emphasis is the layout rather than a
              badge stuck on top of it. The operating/announced distinction did
              not go away — it moved onto each card's face, where it survives
              the re-sort that a section heading would not. */}
          <LocationRegister
            id="sites"
            title="All four sites, India first"
            lead="The three India sites lead, then Byonyks' head office. The Akshar Byonyks India office is open and its address is coming soon; Hyderabad and Ahmedabad are announced rather than open — neither has a published opening date, and neither is called a manufacturing site here, because that is a separate CDSCO licence route and no licence has been published for either. Every card names the company that holds the building."
            rail={
              <ProvenanceMark
                provenance={{
                  status: "stated",
                  statedBy: "Byonyks",
                  asOf: LOCATIONS_RETRIEVED,
                }}
                label="Stated by Byonyks"
              />
            }
            items={byIndiaFirst}
          />
        </div>
      </div>

      {/* WHAT THIS PAGE CANNOT TELL YOU, stated by the page rather than left
          for a reader to notice. Every other register on this site closes the
          same way, and a locations page has more to declare than most: two of
          the four rows are announcements, and the one row that is ours has no
          address on it at all. */}
      <section
        aria-labelledby="locations-limits-heading"
        className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <ScrollReveal>
          <DocumentGrid>
            <GridBlock
              rail={
                <RailNote label="Method">
                  Retrieved from Byonyks&rsquo; own published pages on{" "}
                  {LOCATIONS_RETRIEVED}. Nothing on this page is inferred.
                </RailNote>
              }
            >
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
                The Akshar Byonyks India office has no published address, so the
                card says that rather than naming a city. The ISO&nbsp;13485
                certification the X-1 is built under is real and central to the
                device, but its certificate number has never reached this
                project, and the facility behind it is no longer named on this
                page — the{" "}
                <Link
                  href="/products/the-x1-cycler"
                  className="rounded-sm text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  quality and compliance record
                </Link>{" "}
                sets out exactly which numbers are and are not held.
              </p>
              <p className="mt-4 text-base text-muted-foreground">
                Everything this site can and cannot substantiate is collected in{" "}
                <Link
                  href="/what-we-know"
                  className="rounded-sm text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  What we know
                </Link>
                .
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
