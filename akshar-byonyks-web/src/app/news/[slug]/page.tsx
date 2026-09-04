import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CtaBand } from "@/components/sections/cta-band";
import { defaultOg } from "@/lib/seo";
import { licensingStatement } from "@/lib/claims";
import { getNewsArticle, newsArticles } from "@/lib/news-data";
import { siteUrl } from "@/lib/site-config";

// §9.7's two migrated articles.
//
// REPUBLICATION, NOT AUTHORSHIP. Every word of both bodies is Byonyks', taken
// from the source markup and carried unchanged. Three things follow from that
// and all three are on the page rather than only in the data:
//
//   1. **An editorial note above the article**, because this is a Byonyks
//      press release sitting under an Akshar Byonyks masthead, and the newer
//      one is about entering the United States market. A reader who arrives
//      from the nav needs to know whose announcement this is before they read
//      the first sentence, not after.
//   2. **A provenance line below it** — publisher, date, source link, wire
//      link, retrieval date. Same contract as the leadership biographies.
//   3. **The figures stay inside the quotation.** These releases assert market
//      and survival statistics; they are Byonyks' claims, attributed, and they
//      are never restated in this site's own voice anywhere else. See the
//      `carriedClaims` note in news-data.ts.
//
// The `author`/`publisher` in the structured data is Byonyks for the same
// reason `worksFor` is on the executive profiles: the machine-readable copy
// has to agree with the visible one about who is speaking.

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return {};

  const path = `/news/${article.slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: path, languages: { "en-IN": path } },
    openGraph: {
      title: `${article.title} | Akshar Byonyks`,
      description: article.excerpt,
      url: path,
      type: "article",
      images: defaultOg,
      publishedTime: article.published,
    },
    twitter: { card: "summary" },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  const path = `/news/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    url: `${siteUrl}${path}`,
    datePublished: article.published,
    author: { "@type": "Organization", name: article.publisher },
    publisher: { "@type": "Organization", name: article.publisher },
    isBasedOn: article.sourceUrl,
    articleSection: article.categories[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="article-heading" className="bg-ink">
        <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <Breadcrumbs
            tone="dark"
            items={[{ name: "News", href: "/news" }, { name: article.title }]}
          />
          <div className="mt-10 max-w-3xl lg:mt-14">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <time
                dateTime={article.published}
                className="text-xs font-semibold tracking-wide text-white/70 uppercase"
              >
                {formatDate(article.published)}
              </time>
              {article.categories.map((category) => (
                // `border-white/45`, the site's existing on-ink border weight
                // (x1-hero, market-hero, how-it-works-hero). /25 measured
                // 2.19:1 against the ink, under WCAG 1.4.11's 3:1 for a
                // component boundary; /45 is 4.30:1 and already in the
                // vocabulary, so this is not a new value.
                <span
                  key={category}
                  className="rounded-sm border border-white/45 px-2 py-0.5 font-mono text-xs tracking-wide text-white/70"
                >
                  {category}
                </span>
              ))}
            </div>
            <h1
              id="article-heading"
              className="mt-5 text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl"
            >
              {article.title}
            </h1>
            <p className="mt-5 text-base text-white/60">
              Published by {article.publisher}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="body-heading" className="bg-background">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 id="body-heading" className="sr-only">
            Release
          </h2>
          <div className="max-w-3xl">
            {/* Whose release this is, before the first sentence rather than
                after the last. */}
            <aside
              aria-label="About this release"
              className="rounded-lg border border-line bg-surface-2 px-5 py-4"
            >
              <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                About this release
              </p>
              <p className="mt-2 text-base text-foreground">
                This is a <strong>{article.publisher}</strong> press release,
                republished here in full and unedited. {licensingStatement} The
                figures and statements below are {article.publisher}&rsquo;s
                own.
              </p>
            </aside>

            {article.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-6 text-lg text-foreground"
              >
                {paragraph}
              </p>
            ))}

            <p className="mt-8 border-t border-line pt-5 text-sm text-muted-foreground">
              Published by {article.publisher} on {formatDate(article.published)}
              , carried here word for word. Retrieved {article.retrieved}.
            </p>

            <p className="mt-10">
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
                All news
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Talk to Akshar Byonyks"
        body="Patient, clinician, investor, or distributor enquiry. We route it to the right person."
      />
    </>
  );
}
