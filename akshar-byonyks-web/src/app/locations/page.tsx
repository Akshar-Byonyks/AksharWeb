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
  "Where the group operates: Akshar Byonyks' office in Patancheru, Telangana, Byonyks' head office in the United States, and the two India facilities announced but not yet built.";

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
// THE INDIA OFFICE CAME BACK ON 11 SEP 2026, when the client supplied its
// address. For nine days every row here was a Byonyks site and this page did
// not answer "where are you" under its own masthead — /contact was the only
// page that said an Akshar Byonyks India office existed at all. It leads the
// register now. `src/lib/locations.ts` carries the full reasoning and
// deviations.md §9 records the turns.
//
// THE STRUCTURED-DATA REFUSAL ABOVE STILL STANDS, and the reason has narrowed
// rather than gone. There is a real postal address now, so "there is nothing
// to publish" is no longer the argument. What replaces it: the address is a
// care-of correspondence address, the client has not decided whether an Indian
// entity will exist to hold a registered office, and `PostalAddress` on an
// `Organization` is read by a crawler as the seat of the company. Emitting it
// would assert in machine-readable form the one thing /terms-of-use still
// marks pending. When the registered office is confirmed, this is the page
// that gets the structured data.
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
                The first site below is ours, in Patancheru. The rest are
                Byonyks&rsquo;, and are listed because the device this company
                brings to India is designed at one of them and announced for
                the other two.{" "}
                {/* UNDERLINED AT REST, NOT ON HOVER. This is the one link on
                    the site that sits INSIDE a paragraph of body prose, and
                    that changes what it owes the reader: with only colour
                    separating it from the sentence around it, anyone who
                    cannot distinguish this blue from the grey it runs through
                    has no way to know a link is there at all. Hover does not
                    help them, and on a phone there is no hover.

                    WCAG 1.4.1. The standalone call-to-action links elsewhere
                    are a different case and keep hover-underline: they are
                    bold, set on their own line, and carry an arrow, so colour
                    is never the only cue.

                    This is also simply the site's own convention arriving
                    late — every in-prose link in the legal pages, the
                    provenance marks and the citation links is already
                    "underline underline-offset-2 hover:text-ink". */}
                <Link
                  href="/about-us"
                  className="rounded-sm text-primary underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
            title="All four sites, India first"
            lead="Akshar Byonyks' own office leads, then the two announced India facilities, then Byonyks' head office. Hyderabad and Ahmedabad are announced rather than open: both now carry an expected completion date, and neither is called a manufacturing site here, because that is a separate CDSCO licence route and no licence has been published for either. Every card names the company that holds the building."
            items={byIndiaFirst}
          />
        </div>
      </div>

      {/* "What this page does not say" — the closing limits section — was
          removed on client instruction, 11 Sep 2026. It stated in words that
          every row on this page is Byonyks' own account of itself, unchecked
          against a corporate register, and that no Akshar Byonyks India
          address is published. Nothing replaced it, so a reader now meets
          three cards with no note of what is and is not on the record. The
          facts themselves are unchanged: /contact still carries the pending
          note for the unpublished India office, and the quality and
          compliance record on /products/the-x1-cycler still sets out which
          certificate numbers are held. */}

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
