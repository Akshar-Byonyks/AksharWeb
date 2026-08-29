import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PendingNote } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { executives } from "@/lib/leadership";
import { siteUrl } from "@/lib/site-config";

const path = "/about-us/leadership";

const description =
  "The executives leading Akshar Byonyks, the Indian licensing partner for the Byonyks X-1 automated peritoneal dialysis cycler.";

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
  // Nothing to index until there is somebody on it. A team page that ranks
  // while it is empty spends the crawl budget and the first impression on an
  // apology; it becomes indexable in the same edit that adds the five.
  robots: executives.length === 0 ? { index: false, follow: true } : undefined,
};

// §9.5 `/about-us/leadership/`, the second About page, built at the client's
// request on 29 Aug 2026 ("there should be a second page for all of the
// executives similar to how byonyks.com does their website").
//
// THE PAGE IS BUILT. THE ROSTER IS NOT, AND WILL NOT BE INVENTED. Open
// Question 1.4 — the five Akshar Byonyks executives, with names, biographies
// and portraits — is still fully open and is a launch gate in both the spec
// (§14.4) and its risk table. Those five are on this project's
// do-not-fabricate list.
//
// So what ships is everything except the people: the route, the grid, the
// profile pages at `[slug]`, the structured data, and a contract in
// `leadership.ts` that refuses a bio outside spec §9.5's 150–250 words or an
// executive without a portrait. Adding the five is a data edit against that
// file and nothing here changes.
//
// NOT LINKED FROM THE NAVIGATION YET, on purpose. This repo has already
// shipped links to routes that did not exist once, and the fix then was that
// the cards follow the routes rather than the routes being owed to the cards.
// The same rule applies to a route that exists and is empty: `/about-us/`
// keeps its honest pending block, and the moment `executives` has entries,
// the link and the `index` directive turn on together.
//
// See `leadership.ts` for why byonyks.com's own fourteen executives are not
// used to fill the gap — five of those biographies name a country spec F-1
// keeps off this site, two of them carry it in the job title, and all fourteen
// work for the other company.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Leadership | Akshar Byonyks",
  description,
  url: `${siteUrl}${path}`,
  // No `ItemList` while the roster is empty: an empty list is a claim that
  // there are zero executives, which is false. The property appears when
  // people do.
  ...(executives.length > 0
    ? {
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
      }
    : {}),
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
              Leadership
            </h1>
            <p className="mt-6 text-xl text-white/75">
              The people running the Indian company — not the licensor&rsquo;s
              team, and not an advisory board.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="roster-heading" className="bg-background">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <h2 id="roster-heading" className="sr-only">
            The executive team
          </h2>

          {executives.length === 0 ? (
            <ScrollReveal>
              {/* Spec §9.7's rule, applied to a page rather than a section: an
                  empty state must look deliberate, not broken. It says exactly
                  what is missing and what will be true when it arrives, which
                  is more than "coming soon" and more useful than five grey
                  silhouettes. */}
              <div className="max-w-2xl">
                <PendingNote
                  note="Five executives pending"
                  label="The names, biographies and portraits of the Akshar Byonyks executive team have not yet been provided. This page is built and will publish them the day they are — it is not waiting on design or engineering."
                />
                <p className="mt-8 text-lg text-foreground">
                  Nothing is shown here in the meantime. A team page filled with
                  stock portraits, or with the licensor&rsquo;s staff standing
                  in for an Indian executive team, would answer the question
                  this page exists to answer with something untrue.
                </p>
                <p className="mt-4 text-lg text-foreground">
                  The clinicians who advise Byonyks are on this site already, by
                  name and credential, as the speakers in ByoTalks.
                </p>
                <p className="mt-8">
                  <Link
                    href="/byotalks"
                    className="inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    The clinicians, and their sessions
                    <ArrowRight
                      className="size-4 shrink-0"
                      aria-hidden="true"
                    />
                  </Link>
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {executives.map((executive, index) => (
                <ScrollReveal key={executive.slug} delayMs={(index % 3) * 90}>
                  <li>
                    <Link
                      href={`${path}/${executive.slug}`}
                      className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      <div className="relative aspect-4/5 overflow-hidden rounded-xl border border-line bg-surface-2">
                        <Image
                          src={executive.portrait}
                          alt={executive.portraitAlt}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                          className="object-cover"
                        />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold text-ink group-hover:text-primary">
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
                      {/* The company, on every card, always. Spec §3.1's first
                          non-negotiable is that the two are never blurred, and
                          a face grid is the easiest place to blur them. */}
                      <p className="mt-1 text-sm text-muted-foreground">
                        {executive.organisation}
                      </p>
                    </Link>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBand
        heading="Talk to Akshar Byonyks"
        body="Patient, clinician, investor, or distributor enquiry — we route it to the right person."
      />
    </>
  );
}
