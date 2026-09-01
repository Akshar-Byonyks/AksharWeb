import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
// lucide dropped its brand icons, so this is the generic external-link mark
// rather than a LinkedIn logo. A wordmark we do not have the right to redraw
// is not worth a dependency.
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";

import { ExecutivePortrait } from "@/components/about/executive-portrait";
import { AccentRail } from "@/components/common/accent-rail";
import { PendingChip } from "@/components/common/pending-note";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CtaBand } from "@/components/sections/cta-band";
import { defaultOg } from "@/lib/seo";
import { executives, getExecutive } from "@/lib/leadership";
import { siteUrl } from "@/lib/site-config";

// §9.5's `[slug]`, the executive profile.
//
// Prerendered from the roster, so a URL exists for exactly the people who
// exist and every other slug 404s. Nothing here is a placeholder profile — a
// resolving page for a person we cannot describe is worse than a 404. The one
// gap that is published is a missing photograph, and the page says so in
// words rather than filling it with a silhouette.
export function generateStaticParams() {
  return executives.map((executive) => ({ slug: executive.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const executive = getExecutive(slug);
  if (!executive) return {};

  const path = `/about-us/leadership/${executive.slug}`;
  // TWO SHAPES, BECAUSE `role` IS OPTIONAL SINCE 1 SEP 2026. Interpolating an
  // absent title would ship "Sahil, undefined at Akshar Byonyks." as a meta
  // description and as a browser tab. The company is the fact that survives
  // when the title is missing, so it carries the sentence on its own.
  const description = executive.role
    ? `${executive.name}, ${executive.role} at ${executive.organisation}.`
    : `${executive.name}, ${executive.organisation}.`;

  return {
    title: executive.role
      ? `${executive.name} — ${executive.role}`
      : executive.name,
    description,
    alternates: { canonical: path, languages: { "en-IN": path } },
    openGraph: {
      title: `${executive.name} | Akshar Byonyks`,
      description,
      url: path,
      type: "profile",
      images: defaultOg,
    },
    twitter: { card: "summary" },
  };
}

export default async function ExecutivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const executive = getExecutive(slug);
  if (!executive) notFound();

  const path = `/about-us/leadership/${executive.slug}`;
  // The attribution line only claims a portrait when there is one.
  const carriedNoun = executive.portrait ? "Biography and portrait" : "Biography";

  // `Person`, with `worksFor` naming the actual employer rather than assuming
  // it is this site's company. Spec §3.1's first non-negotiable, in the
  // machine-readable copy as well as the visible one.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${siteUrl}${path}`,
    mainEntity: {
      "@type": "Person",
      name: executive.name,
      // Omitted rather than guessed, on the same principle as `image` below:
      // a crawler that is told a job title will republish it, and nobody has
      // supplied one for two of these four people.
      ...(executive.role ? { jobTitle: executive.role } : {}),
      // Omitted rather than pointed at a placeholder: structured data that
      // promises an image of a person should resolve to one.
      ...(executive.portrait
        ? { image: `${siteUrl}${executive.portrait}` }
        : {}),
      worksFor: { "@type": "Organization", name: executive.organisation },
      ...(executive.linkedin ? { sameAs: [executive.linkedin] } : {}),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="executive-heading" className="bg-ink">
        <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <Breadcrumbs
            tone="dark"
            items={[
              { name: "About us", href: "/about-us" },
              { name: "Leadership", href: "/about-us/leadership" },
              { name: executive.name },
            ]}
          />
          <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[18rem_1fr] lg:gap-14">
            <ExecutivePortrait
              executive={executive}
              tone="dark"
              sizes="(min-width: 1024px) 18rem, 92vw"
              priority
              className="w-full max-w-72"
            />
            <div>
              <h1
                id="executive-heading"
                className="text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl"
              >
                {executive.name}
                {executive.postNominals ? (
                  <span className="font-normal text-white/70">
                    , {executive.postNominals}
                  </span>
                ) : null}
              </h1>
              {/* The title, or a statement that there isn't one. Same
                  grammar as the portrait frame's "Photograph pending" — the
                  dark-tone pending amber and a clock, saying the gap out loud
                  rather than leaving a blank line where a role should be. */}
              {executive.role ? (
                <p className="mt-4 text-xl text-white/75">{executive.role}</p>
              ) : (
                <p className="mt-4 flex items-center gap-1.5 font-mono text-sm tracking-wide text-pending-on-ink">
                  <Clock className="size-3.5 shrink-0" aria-hidden="true" />
                  Title to be confirmed
                </p>
              )}
              {/* Plum on ink, matching the roster card this page was opened
                  from. The one line on a profile that a reader is most likely
                  to complete wrongly — "an executive, on the Akshar Byonyks
                  site, therefore an Akshar Byonyks executive" — is the one
                  line the page had set at 60% white. */}
              <AccentRail accent="plum" tone="dark" className="mt-2">
                <p className="font-mono text-xs tracking-wide text-plum-on-ink">
                  {executive.organisation}
                </p>
              </AccentRail>
              {executive.linkedin ? (
                <p className="mt-6">
                  <a
                    href={executive.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-accent-gold hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <ExternalLink
                      className="size-4 shrink-0"
                      aria-hidden="true"
                    />
                    LinkedIn
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="bio-heading" className="bg-background">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 id="bio-heading" className="sr-only">
            Biography
          </h2>
          <div className="max-w-3xl">
            {/* Paragraphs come from the data, split on blank lines, so a bio
                is authored as prose rather than as markup. */}
            {executive.bio.split(/\n\s*\n/).map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-5 text-lg text-foreground first:mt-0"
              >
                {paragraph}
              </p>
            ))}

            {/* Where the biography came from, on the page and not only in
                the data. Nothing here was written by this project: the Byonyks
                records are transcribed from each subject's own page, and Dr.
                Patel's was supplied by Akshar Byonyks. A quoted biography of a
                real person with no visible origin is the same defect as an
                uncited statistic, and this site does not ship those — so the
                supplied record gets an attribution line too, not just the ones
                with a URL to point at. */}
            {executive.sourceUrl ? (
              <p className="mt-8 border-t border-line pt-5 text-sm text-muted-foreground">
                {carriedNoun} as published by {executive.organisation}, carried
                here word for word.{" "}
                <a
                  href={executive.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm text-primary underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Source
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                , retrieved {executive.retrieved}.
              </p>
            ) : executive.suppliedBy ? (
              <p className="mt-8 border-t border-line pt-5 text-sm text-muted-foreground">
                {carriedNoun} supplied by {executive.suppliedBy}, carried here
                word for word. Received {executive.retrieved}.
              </p>
            ) : null}

            {/* WHAT THIS PERSON DOES FOR INDIA — a separate block below the
                biography and its attribution line, never spliced into the
                prose above. The biography is somebody else's text carried word
                for word, and appending a sentence inside it would break the
                promise the attribution line just made about it.

                Gold, because it means "home / India" sitewide and this is the
                one block on the page that is about India specifically. The
                rail is not the only carrier: the heading says India too.

                Client instruction, 1 Sep 2026. Senthil Kumar's is asked for
                and has not arrived, so his renders as the pending state — on
                an India-market roster, "what does he do here" is a question
                worth publishing unanswered rather than answering with a
                sentence nobody supplied. */}
            {executive.indiaNote || executive.indiaNotePending ? (
              <AccentRail accent="gold" className="mt-10">
                <h2 className="text-lg font-semibold text-ink">
                  On India
                </h2>
                {executive.indiaNote ? (
                  <p className="mt-3 text-lg text-foreground">
                    {executive.indiaNote}
                  </p>
                ) : (
                  <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-base text-muted-foreground">
                    <PendingChip label="Pending" />
                    <span>
                      {executive.name}&rsquo;s role in the India programme has
                      not been supplied, and the biography above &mdash; his
                      own, as published by {executive.organisation} &mdash;
                      does not describe one.
                    </span>
                  </p>
                )}
              </AccentRail>
            ) : null}

            <p className="mt-10">
              <Link
                href="/about-us/leadership"
                className="inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
                All of the leadership team
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Talk to Akshar Byonyks"
        body="Patient, clinician, investor, or distributor enquiry — we route it to the right person."
      />
    </>
  );
}
