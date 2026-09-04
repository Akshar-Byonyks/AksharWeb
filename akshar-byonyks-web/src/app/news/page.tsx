import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { AccentRail } from "@/components/common/accent-rail";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { defaultOg } from "@/lib/seo";
import { newsByDate, newsScaffolds } from "@/lib/news-data";
import { siteUrl } from "@/lib/site-config";

const path = "/news";

const description =
  "Announcements about the X-1 automated peritoneal dialysis cycler, including Byonyks' FDA 510(k) clearance and its United States market plans.";

export const metadata: Metadata = {
  title: "News",
  description,
  alternates: { canonical: path, languages: { "en-IN": path } },
  openGraph: {
    title: "News | Akshar Byonyks",
    description,
    url: path,
    type: "website",
    images: defaultOg,
  },
  twitter: { card: "summary" },
};

// §9.7 `/news/`, and at `[slug]` the two migrated articles.
//
// SECTION ORDER IS THE SPEC'S, NOT THE ONE THAT FLATTERS THE PAGE. §9.7 says
// "structure exactly as the audit specifies" and lists Featured Highlights,
// From the Experts, Latest Updates. Two empty sections above the only live
// content is a poor first impression, and moving Latest Updates to the top was
// considered and rejected: the order is a specified requirement, and the spec's
// own remedy for the empty ones is a design remedy — "an empty section must
// look deliberate, not broken" — not a reordering. So they are kept in place
// and made compact and deliberate, sized as statements rather than voids.
//
// PLUM ON THE PUBLISHER LINE, 30 Aug 2026 — the same mark, for the same
// danger, as the company label on /about-us/leadership/. Both pages are places
// where a reader completes an unlabelled name into "ours", and both answer it
// with one string in the site's quietest treatment. Plum means "institutional
// / formal"; whose announcement this is, is an institutional attribution.
//
// NOT THE PROVENANCE SCALE, and the distinction is worth stating because these
// releases would qualify for it. The scale answers "how is this known" — a
// Byonyks release is `stated`, which is primary blue, and that is what the
// article page itself should carry against its source URL and retrieval date.
// The index card is answering the prior question, "whose is this", so it takes
// the wayfinding rail rather than a citation. Two questions, two marks; the
// palette is shared because the meanings are.
//
// BOTH ARTICLES ARE BYONYKS' PRESS RELEASES, and every card says so. This is a
// news index under an Akshar Byonyks masthead, which is precisely where a
// reader assumes "our news" unless told otherwise — and the newer of the two is
// about entering the *United States* market. Spec §3.1's first non-negotiable
// again: the two companies are never blurred.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "News | Akshar Byonyks",
  description,
  url: `${siteUrl}${path}`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: newsByDate.length,
    itemListElement: newsByDate.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.title,
      url: `${siteUrl}${path}/${article.slug}`,
    })),
  },
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function NewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="news-heading" className="bg-ink">
        <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <Breadcrumbs tone="dark" items={[{ name: "News" }]} />
          <div className="mt-10 max-w-3xl lg:mt-14">
            <h1
              id="news-heading"
              className="text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl"
            >
              News
            </h1>
            <p className="mt-6 text-xl text-white/75">
              Announcements about the X-1. Both releases below were published by{" "}
              <strong>Byonyks</strong>, which designs and manufactures the
              device; each is republished here in full with a link to the
              original. Akshar Byonyks&rsquo; own announcements will appear here
              as they are made.
            </p>
          </div>
        </div>
      </section>

      {/* The two scaffolds, in the order §9.7 specifies. Compact by design:
          the requirement is that an empty section look deliberate, and a
          section that says what will go in it and admits it is empty does
          that, where a full-height section with nothing in it does not. */}
      <section aria-labelledby="scaffolds-heading" className="bg-surface-2">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
          <h2 id="scaffolds-heading" className="sr-only">
            Sections not yet published
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {newsScaffolds.map((scaffold) => (
              <ScrollReveal key={scaffold.id}>
                <section
                  aria-labelledby={`${scaffold.id}-heading`}
                  id={scaffold.id}
                  className="h-full rounded-xl border border-dashed border-pending/40 bg-background p-6"
                >
                  <h3
                    id={`${scaffold.id}-heading`}
                    className="text-xl font-semibold text-balance text-ink"
                  >
                    {scaffold.title}
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">
                    {scaffold.description}
                  </p>
                  <p className="mt-4 flex items-center gap-1.5 font-mono text-xs tracking-wide text-pending">
                    <Clock className="size-3 shrink-0" aria-hidden="true" />
                    {scaffold.note}
                  </p>
                </section>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="latest-updates-heading" className="bg-background">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <h2
            id="latest-updates-heading"
            className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
          >
            Latest Updates
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            {newsByDate.length} releases, newest first.
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {newsByDate.map((article, index) => (
              <ScrollReveal key={article.slug} delayMs={index * 90}>
                <li className="h-full">
                  <Link
                    href={`${path}/${article.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-line bg-card p-6 transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-8"
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <time
                        dateTime={article.published}
                        className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                      >
                        {formatDate(article.published)}
                      </time>
                      {article.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-sm border border-line px-2 py-0.5 font-mono text-xs tracking-wide text-muted-foreground"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-balance text-ink group-hover:text-primary sm:text-2xl">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-base text-muted-foreground">
                      {article.excerpt}
                    </p>
                    {/* Whose announcement it is, on every card, always. */}
                    <AccentRail accent="plum" className="mt-4">
                      <p className="font-mono text-xs tracking-wide text-plum">
                        Published by {article.publisher}
                      </p>
                    </AccentRail>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-base font-semibold text-primary group-hover:underline">
                      Read the release
                      <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading="Talk to Akshar Byonyks"
        body="Patient, clinician, investor, or distributor enquiry. We route it to the right person."
      />
    </>
  );
}
