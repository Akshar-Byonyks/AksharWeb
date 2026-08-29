import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ExecutivePortrait } from "@/components/about/executive-portrait";
import { PendingNote } from "@/components/common/pending-note";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CtaBand } from "@/components/sections/cta-band";
import {
  aksharExecutives,
  byonyksExecutives,
  executives,
  type Executive,
} from "@/lib/leadership";
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
// TWO COMPANIES, TWO LABELLED GROUPS. Byonyks' fourteen executives were
// transcribed from byonyks.com on client instruction, 29 Aug 2026; Dr. Vishnu
// Patel was supplied by the client the same day and is the first Akshar
// Byonyks executive on the site. Provenance is on every record — see
// `src/lib/leadership.ts`, which also carries what still needs a decision
// before launch (four biographies name a location spec F-1 keeps off this
// site; portrait rights are unconfirmed; portrait treatment is not consistent
// in the way §9.5 asks for; and one portrait does not exist yet).
//
// THE SPLIT IS THE POINT. Spec §3.1's first non-negotiable is that the two
// companies are never blurred, and the failure mode for a page like this is
// not a false sentence — it is fifteen faces under one masthead, told apart
// only by a caption, which a reader completes for themselves. So the roster is
// two sections under two company headings, the first viewport says which is
// which, and every card still prints the company under the role.
//
// AND IT SAYS WHO IS STILL MISSING. Open Question 1.4 is not closed by one
// name. The pending note sits below both grids: they are real content and
// lead, but nobody may leave believing they have met the Indian company's
// leadership in full.
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
              Two companies, listed separately. {licensingStatement} Everyone
              below is named with the company they work for.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="akshar-roster-heading" className="bg-background">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <h2
            id="akshar-roster-heading"
            className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
          >
            Akshar Byonyks
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            The company this site belongs to, and the licensee for India.
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {aksharExecutives.map((executive, index) => (
              <ExecutiveCard
                key={executive.slug}
                executive={executive}
                index={index}
              />
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="byonyks-roster-heading"
        className="border-t border-line bg-background"
      >
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <h2
            id="byonyks-roster-heading"
            className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
          >
            Byonyks
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            The licensor — the engineers, clinicians and regulatory staff who
            took the X-1 through to FDA clearance. {byonyksExecutives.length}{" "}
            people, as published by Byonyks. Each profile is their own
            biography, carried word for word, with a link to where it came from.
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {byonyksExecutives.map((executive, index) => (
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
                label="The remaining names, biographies and portraits of the Akshar Byonyks executive team have not yet been provided — and no photograph has been provided for Dr. Patel. Neither is waiting on design or engineering."
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
