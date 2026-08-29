import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PendingNote } from "@/components/common/pending-note";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { executives } from "@/lib/leadership";
import { siteUrl } from "@/lib/site-config";

const path = "/about-us/leadership";

const description =
  "The executive team at Byonyks, the company that designs and manufactures the X-1 automated peritoneal dialysis cycler that Akshar Byonyks is licensed to bring to India.";

export const metadata: Metadata = {
  title: "Leadership",
  description,
  alternates: { canonical: path, languages: { "en-IN": path } },
  openGraph: {
    title: "Leadership | Akshar Byonyks",
    description,
    url: path,
    type: "website",
  },
  twitter: { card: "summary" },
};

// §9.5 `/about-us/leadership/` and, at `[slug]`, a page each.
//
// POPULATED FROM byonyks.com ON CLIENT INSTRUCTION, 29 AUG 2026. The roster is
// Byonyks' fourteen executives, transcribed verbatim with provenance on every
// record — see `src/lib/leadership.ts`, which also carries the three things
// that still need a decision before launch (four biographies name a location
// spec F-1 keeps off this site; portrait rights are unconfirmed; and the
// portrait treatment is not consistent in the way §9.5 asks for).
//
// THE PAGE SAYS WHOSE TEAM THIS IS, TWICE, WHERE IT CANNOT BE MISSED. The
// first viewport names Byonyks, and every card carries the company under the
// role. Spec §3.1's first non-negotiable is that the two companies are never
// blurred, and the failure mode for a page like this is not a false sentence —
// it is fourteen faces under an Akshar Byonyks masthead with nothing saying
// otherwise, which a reader completes for themselves.
//
// AND IT SAYS WHO IS STILL MISSING. Open Question 1.4 — the five Akshar
// Byonyks executives — is open, is a launch gate, and is a different question
// from the one this roster answers. That note sits below the grid rather than
// above it: the grid is real content and leads, but a reader must not leave
// this page believing they have met the Indian company's leadership.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Leadership | Akshar Byonyks",
  description,
  url: `${siteUrl}${path}`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: executives.length,
    itemListElement: executives.map((executive, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: executive.name,
      url: `${siteUrl}${path}/${executive.slug}`,
    })),
  },
};

export default function LeadershipPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="leadership-heading" className="bg-ink">
        <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <Breadcrumbs
            tone="dark"
            items={[
              { name: "About us", href: "/about-us" },
              { name: "Leadership" },
            ]}
          />
          <div className="mt-10 max-w-3xl lg:mt-14">
            <h1
              id="leadership-heading"
              className="text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl"
            >
              The team behind the X-1
            </h1>
            <p className="mt-6 text-xl text-white/75">
              These are the executives of <strong>Byonyks</strong>, the company
              that designs and manufactures the cycler. Akshar Byonyks is
              licensed to bring that device to India; its own executive team is
              listed further down, and is not yet published.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="roster-heading" className="bg-background">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <h2
            id="roster-heading"
            className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
          >
            Byonyks executive team
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Fourteen people, as published by Byonyks. Each profile is their own
            biography, carried word for word, with a link to where it came from.
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {executives.map((executive, index) => (
              <ScrollReveal key={executive.slug} delayMs={(index % 3) * 90}>
                <li>
                  <Link
                    href={`${path}/${executive.slug}`}
                    className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    {/* One aspect ratio and one ground for all fourteen. It
                        normalises the crop; it cannot normalise the backdrops,
                        which run white to dark grey in the source set. Spec
                        §9.5 asks for consistent treatment and only a re-shoot
                        delivers that — recorded in leadership.ts. */}
                    <div className="relative aspect-4/5 overflow-hidden rounded-xl border border-line bg-surface-2">
                      <Image
                        src={executive.portrait}
                        alt={executive.portraitAlt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-balance text-ink group-hover:text-primary">
                      {executive.name}
                      {executive.postNominals ? (
                        <span className="font-normal text-muted-foreground">
                          , {executive.postNominals}
                        </span>
                      ) : null}
                    </h3>
                    <p className="mt-1 text-base text-muted-foreground">
                      {executive.role}
                    </p>
                    {/* The company, on every card, always. */}
                    <p className="mt-1 font-mono text-xs tracking-wide text-muted-foreground">
                      {executive.organisation}
                    </p>
                  </Link>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="akshar-team-heading" className="bg-surface-2">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h2
                id="akshar-team-heading"
                className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
              >
                The Akshar Byonyks team
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A different question, and one this page does not yet answer.
                Everyone above works for the licensor.
              </p>
              <PendingNote
                className="mt-8"
                note="Five executives pending"
                label="The names, biographies and portraits of the Akshar Byonyks executive team have not yet been provided. This page is built to publish them the day they are — it is not waiting on design or engineering."
              />
              <p className="mt-8">
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  What Akshar Byonyks is, and what it is licensed to do
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CtaBand
        heading="Talk to Akshar Byonyks"
        body="Patient, clinician, investor, or distributor enquiry — we route it to the right person."
      />
    </>
  );
}
