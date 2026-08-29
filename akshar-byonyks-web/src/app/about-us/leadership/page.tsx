import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ExecutivePortrait } from "@/components/about/executive-portrait";
import { PendingNote } from "@/components/common/pending-note";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { executives, type Executive } from "@/lib/leadership";
import { licensingStatement } from "@/lib/claims";
import { siteUrl } from "@/lib/site-config";

const path = "/about-us/leadership";

const description =
  "The leadership of Akshar Byonyks, licensed to bring the X-1 to India, and of Byonyks, the company that designs and manufactures the cycler.";

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
// ONE LIST, ON CLIENT INSTRUCTION, 29 Aug 2026: "Dont make Akshar Byonyks and
// Byonyks 2 seperate lists. Should be one in the same." An earlier build split
// the roster into two labelled sections; that is gone. Byonyks' fourteen were
// transcribed from byonyks.com, Dr. Vishnu Patel was supplied by the client,
// and provenance is on every record — see `src/lib/leadership.ts`, which also
// carries what still needs a decision before launch (four biographies name a
// location spec F-1 keeps off this site, portrait rights are unconfirmed, and
// portrait treatment is not consistent in the way §9.5 asks for).
//
// WITH THE HEADINGS GONE, THE PER-CARD COMPANY LABEL IS THE WHOLE DEFENCE.
// Spec §3.1's first non-negotiable is that the two companies are never
// blurred, and the failure mode for a page like this is not a false sentence —
// it is fifteen faces under one masthead that a reader completes for
// themselves. So every card prints its `organisation` under the role, the
// intro says the list spans both companies, and each profile repeats it. Do
// not remove that label to tidy the cards up.
//
// AND IT SAYS WHO IS STILL MISSING. Open Question 1.4 is not closed by one
// name. The pending note sits below the grid: it is real content and leads,
// but nobody may leave believing they have met the Indian company's leadership
// in full.
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

function ExecutiveCard({
  executive,
  index,
}: {
  executive: Executive;
  index: number;
}) {
  return (
    <ScrollReveal delayMs={(index % 3) * 90}>
      <li>
        <Link
          href={`${path}/${executive.slug}`}
          className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {/* One aspect ratio and one ground for all fifteen. It normalises
              the crop; it cannot normalise the backdrops, which run white to
              dark grey in the source set. Spec §9.5 asks for consistent
              treatment and only a re-shoot delivers that — see leadership.ts. */}
          <ExecutivePortrait
            executive={executive}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          />
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
          {/* The company, on every card, always — even inside a section that
              is already headed with it. The heading scrolls away; the card
              gets screenshotted, shared and read on its own. */}
          <p className="mt-1 font-mono text-xs tracking-wide text-muted-foreground">
            {executive.organisation}
          </p>
        </Link>
      </li>
    </ScrollReveal>
  );
}

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
              Leadership
            </h1>
            <p className="mt-6 text-xl text-white/75">
              {licensingStatement} Everyone below is named with the company they
              work for.
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
            The leadership team
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            {executives.length} people across Akshar Byonyks and Byonyks. Each
            card names the company that person works for, and each profile is
            their own biography, carried word for word, with a note of where it
            came from.
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {executives.map((executive, index) => (
              <ExecutiveCard
                key={executive.slug}
                executive={executive}
                index={index}
              />
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
                The rest of the Akshar Byonyks team
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                One name is published above. The others are not, and this page
                is built to carry them the day they arrive.
              </p>
              <PendingNote
                className="mt-8"
                note="Akshar Byonyks executives pending"
                label="The remaining names, biographies and portraits of the Akshar Byonyks executive team have not yet been provided. This page is not waiting on design or engineering."
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
