import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DirectionContract } from "@/components/common/direction-contract";
import { RegisterLink } from "@/components/common/provenance";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { DocumentGrid, GridBlock } from "@/components/layout/document-grid";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { licenceScope, licensingStatement } from "@/lib/claims";
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
            can open.
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
              {/* The status word and the retrieval date came off 3 Sep
                  2026 with the rest of the site's visible provenance. The
                  register link stayed: the claim it sits beside is an FDA
                  clearance, and RegisterLink carries the reasoning for why
                  those two were separated rather than removed together.

                  The narrowing is not defensive typing for its own sake.
                  `product.provenance` is the four-way union, and only the
                  `record` arm has a URL at all — so this is the compiler
                  refusing to render a register link for a company
                  statement, which is exactly the confusion the scale was
                  built to prevent. */}
              <GridBlock
                rail={
                  x1.provenance.status === "record" ? (
                    <RegisterLink source={x1.provenance.source} />
                  ) : undefined
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
                <Link
                  href={x1.href!}
                  className="mt-6 inline-flex items-center gap-2 rounded-sm text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  The X-1 cycler in full
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              </GridBlock>

              <GridBlock wide className="mt-10">
                {/* Byonyks' own product visualisation. It carried the caption
                    "Byonyks · product render, not a photograph" until 3 Sep
                    2026, when the client asked for it off this page. Worth
                    knowing what went with it: no photograph of the physical
                    X-1 exists in this project, and this image's alt describes
                    a lit unit rather than a rendering, so there is now nothing
                    on this page that tells a reader which of the two they are
                    looking at. The device page keeps the distinction in a
                    source comment only. */}
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
                {/* WHAT THIS COMPANY WOULD HAVE THE RIGHT TO SELL, added
                    11 Sep 2026 when the client supplied the licence terms.
                    Until then this section could say only that two devices had
                    been announced, which left an investor or a distributor to
                    guess whether the India licence reached them at all. It
                    does.

                    IT IS A COMMERCIAL SENTENCE AND MUST NOT BE READ AS A
                    REGULATORY ONE, which is why the second half is here. An
                    exclusive licence covering every machine says nothing about
                    whether either device exists, has a specification, or could
                    be sold in India — and the whole architecture of this page
                    is built to keep an announcement from reading as a product.
                    The scope sentence itself lives in claims.ts. */}
                <p className="mt-4 text-base text-muted-foreground">
                  {licenceScope} That is a commercial position, not a
                  regulatory one: neither device has a published specification,
                  and no regulatory status has been stated for either in any
                  jurisdiction.
                </p>
              </GridBlock>

              <GridBlock wide className="mt-10">
                {/* THE ALT TEXT IS NOW THE ONLY HONEST PART OF THIS IMAGE.
                    The caption under it — "Byonyks · teaser illustration.
                    Neither device has been shown." — came off on 3 Sep 2026 at
                    the client's request. It said three things, and the only
                    one still said anywhere is carried by `products.ts`'s alt:
                    that the frame holds two covered shapes rather than two
                    machines, ending "Neither device is visible." That alt is
                    doing the caption's job now, so do not "improve" it into
                    naming the devices — that would put a claim in the
                    accessibility layer that the picture itself refuses to
                    make, and nothing would be left. */}
                <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-line">
                  <Image
                    src={x2x3.image!.src}
                    alt={x2x3.image!.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 1216px, 92vw"
                  />
                </div>
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
