import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DirectionContract } from "@/components/common/direction-contract";
import { PendingNote } from "@/components/common/pending-note";
import { ProvenanceMark } from "@/components/common/provenance";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { DocumentGrid, GridBlock } from "@/components/layout/document-grid";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { licensingStatement } from "@/lib/claims";
import { getProduct, x2x3ComingSoon, x2x3Statement } from "@/lib/products";
import { siteUrl } from "@/lib/site-config";

const path = "/products";

const description =
  "The devices Akshar Byonyks brings to India: the FDA-cleared X-1 automated peritoneal dialysis cycler, and the X-2 and X-3 that Byonyks has announced but not yet described.";

export const metadata: Metadata = {
  title: "Products",
  description,
  alternates: { canonical: path, languages: { "en-IN": path } },
  openGraph: {
    title: "Products | Akshar Byonyks",
    description,
    url: path,
    type: "website",
    images: [
      {
        url: "/images/x1-apd-cycler.png",
        width: 910,
        height: 518,
        alt: "The Byonyks X-1 automated peritoneal dialysis cycler",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

// `CollectionPage`, and `hasPart` names the one child that exists. The X-2 and
// X-3 are deliberately absent from the structured data: pointing a crawler at
// a section anchor as though it were a product page is the machine-readable
// version of the overclaim this whole page is arranged to avoid, and
// `schema.org/Product` has no honest shape for a device with no specification,
// no date and no regulatory position.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Products | Akshar Byonyks",
  description,
  url: `${siteUrl}${path}`,
  hasPart: [
    {
      "@type": "WebPage",
      name: "The X-1 automated peritoneal dialysis cycler",
      url: `${siteUrl}/products/the-x1-cycler`,
    },
  ],
};

// §8.2 `/products/`, built 1 Sep 2026 on the client's instruction — the sixth
// item in the primary nav, and the new home of the X-1 page.
//
// THE PAGE IS ABOUT ONE DEVICE AND TWO ANNOUNCEMENTS, and its whole job is to
// keep those two categories from reading as one range. A products page that
// sets three cards side by side tells a procurement officer there are three
// devices; there is one, and two paragraphs. So the X-1 gets the full-width
// opening block with its clearance on the public record, and the X-2 and X-3
// get a section below it that quotes Byonyks, names Byonyks, and states in
// this site's own voice what has not been published.
//
// THE TEASER IMAGE IS BYONYKS' OWN AND SHOWS NOTHING, which is why it is
// usable. It is two draped shapes labelled X2 and X3 — a picture of a thing
// being withheld, not a picture of a device. That is the only kind of image
// that can honestly sit under an announcement with no specification behind it,
// and its provenance (including that Byonyks generated it) is recorded in
// public/images/README.md.
//
// Surface rhythm: ink hero, background for the X-1, surface-2 for the
// announcements, then the closing ink band. Two ink moments, as everywhere.
export default function ProductsPage() {
  const x1 = getProduct("x1")!;
  const x2x3 = getProduct("x2-x3")!;

  return (
    <>
      <DirectionContract>{`
THESIS: there is one device you can specify and two you cannot. A products
page earns trust by making that gap visible instead of setting three cards in
a row and letting the reader count to three.
OWN-WORLD: the provenance scale doing the structural work. The X-1 carries a
record mark — a 510(k) number on a public register — and the X-2 and X-3 carry
a stated mark over Byonyks' own paragraph plus a pending note naming what has
never been published. The distance between those two marks IS the page.
STORY: what we can sell today → what has been announced → talk to us.
FIRST VIEWPORT: ink, breadcrumb, the licensing sentence, and the device.
FORM: one wide block for the X-1 with its render at full container width, then
a railed section for the announcements. No card grid: three cards would make
one product and two press lines look like a range.
FINISH: Byonyks' forecast is quoted and attributed, never restated in our
voice; the teaser image is captioned as an illustration; the alt text
describes dust sheets, because that is what is in the frame.
`}</DirectionContract>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="products-heading" className="bg-ink">
        <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-14 sm:px-6 lg:px-8 lg:pb-20">
          <Breadcrumbs tone="dark" items={[{ name: "Products" }]} />
          <h1
            id="products-heading"
            className="mt-10 max-w-3xl text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl"
          >
            One cleared device, and two that have been announced
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            {licensingStatement} The X-1 is the device this company can put in
            front of a clinician today, with its clearance on a register anyone
            can open. The X-2 and X-3 are Byonyks&rsquo; announcements, and this
            page keeps them apart from the device that exists.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="products-x1-heading"
        className="bg-background"
        id="x1"
      >
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <ScrollReveal>
            <DocumentGrid>
              <GridBlock
                rail={
                  <ProvenanceMark
                    provenance={x1.provenance}
                    label="On the public record"
                  />
                }
              >
                <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                  Available now
                </p>
                <h2
                  id="products-x1-heading"
                  className="mt-3 text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
                >
                  {x1.name}
                </h2>
                <p className="mt-5 text-lg text-ink">{x1.summary}</p>
                <p className="mt-4 text-base text-muted-foreground">
                  The device page carries the specification with its gaps
                  marked, the regulatory position in both jurisdictions stated
                  separately, the quality and compliance record, and the route
                  for a clinician to request the Instructions for Use.
                </p>
                <Link
                  href={x1.href!}
                  className="mt-6 inline-flex items-center gap-2 rounded-sm text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  The X-1 cycler in full
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              </GridBlock>

              <GridBlock wide className="mt-10">
                {/* Byonyks' own product visualisation, captioned as a render
                    rather than as photography — CLAUDE.md, and the same
                    treatment it gets on the device page. No real photograph of
                    the physical X-1 exists in this project. */}
                <figure>
                  <div className="overflow-hidden rounded-xl border border-line bg-surface-2 p-6 sm:p-10">
                    <Image
                      src={x1.image!.src}
                      alt={x1.image!.alt}
                      width={x1.image!.width}
                      height={x1.image!.height}
                      className="mx-auto h-auto w-full max-w-[820px]"
                      sizes="(min-width: 1280px) 820px, 92vw"
                    />
                  </div>
                  <figcaption className="mt-3 font-mono text-xs tracking-wide text-muted-foreground">
                    Byonyks · product render, not a photograph
                  </figcaption>
                </figure>
              </GridBlock>
            </DocumentGrid>
          </ScrollReveal>
        </div>
      </section>

      <section
        aria-labelledby="products-next-heading"
        className="scroll-mt-24 bg-surface-2"
        id="x2-x3"
      >
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <ScrollReveal>
            <DocumentGrid>
              <GridBlock>
                <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                  Announced
                </p>
                <h2
                  id="products-next-heading"
                  className="mt-3 text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
                >
                  {x2x3.name}
                </h2>
                <p className="mt-5 text-lg text-ink">{x2x3.summary}</p>
              </GridBlock>

              <GridBlock wide className="mt-10">
                <figure>
                  <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-line">
                    <Image
                      src={x2x3.image!.src}
                      alt={x2x3.image!.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 1216px, 92vw"
                    />
                  </div>
                  {/* THE CAPTION IS THE HONEST PART OF THIS IMAGE. It is not a
                      photograph, it is not a render of either device, and
                      Byonyks generated it — all three are said, because a
                      reader who takes it for a product shot has been told
                      something untrue by a picture. */}
                  <figcaption className="mt-3 font-mono text-xs tracking-wide text-muted-foreground">
                    Byonyks · teaser illustration. Neither device has been shown.
                  </figcaption>
                </figure>
              </GridBlock>

              <GridBlock className="mt-12">
                <h3 className="text-lg font-semibold text-ink">
                  What Byonyks says about them
                </h3>
                {/* A blockquote, and it has to be one. This is a forecast of
                    market disruption for two devices that have not been shown,
                    written by the manufacturer. Set as body copy under this
                    masthead it would read as Akshar Byonyks' own promise. */}
                <blockquote className="mt-4 border-l-2 border-line pl-5">
                  <p className="text-base leading-relaxed text-ink">
                    {x2x3Statement}
                  </p>
                  <p className="mt-3 text-base text-muted-foreground">
                    {x2x3ComingSoon}
                  </p>
                </blockquote>

                <PendingNote
                  className="mt-6"
                  note="Nothing further published"
                  label="No specification, launch date, price, clinical data or regulatory position — in India, the United States or anywhere else — has been published for the X-2 or the X-3. Akshar Byonyks' licence covers the X-1; whether it extends to either of these has not been established."
                />

                <p className="mt-6 text-base text-muted-foreground">
                  When Byonyks publishes something a clinician can evaluate,
                  these get pages of their own with the same specification
                  table, the same marked gaps and the same separate regulatory
                  statements the X-1 page carries. Until then this section is
                  the whole of what is known.
                </p>
              </GridBlock>
            </DocumentGrid>
          </ScrollReveal>
        </div>
      </section>

      <CtaBand
        leadIn="bg-surface-2"
        heading="Want the specification?"
        body="Clinicians can request the Instructions for Use and the technical documentation behind the published specification."
      />
    </>
  );
}
