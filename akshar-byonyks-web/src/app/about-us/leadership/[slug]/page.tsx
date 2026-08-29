import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
// lucide dropped its brand icons, so this is the generic external-link mark
// rather than a LinkedIn logo. A wordmark we do not have the right to redraw
// is not worth a dependency.
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CtaBand } from "@/components/sections/cta-band";
import { executives, getExecutive } from "@/lib/leadership";
import { siteUrl } from "@/lib/site-config";

// §9.5's `[slug]`, the executive profile.
//
// Prerendered from the roster, and the roster is currently empty (Open
// Question 1.4 — see `leadership.ts`). `generateStaticParams` returning no
// paths is the correct behaviour, not a bug: there are no profiles because
// there are no people, and every one of these URLs 404s until there are. That
// is the honest state and it is better than five placeholder profiles that
// resolve.
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
  const description = `${executive.name}, ${executive.role} at ${executive.organisation}.`;

  return {
    title: `${executive.name} — ${executive.role}`,
    description,
    alternates: { canonical: path, languages: { "en-IN": path } },
    openGraph: {
      title: `${executive.name} | Akshar Byonyks`,
      description,
      url: path,
      type: "profile",
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
      jobTitle: executive.role,
      image: `${siteUrl}${executive.portrait}`,
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
            <div className="relative aspect-4/5 w-full max-w-72 overflow-hidden rounded-xl border border-white/15 bg-white/5">
              <Image
                src={executive.portrait}
                alt={executive.portraitAlt}
                fill
                sizes="(min-width: 1024px) 18rem, 92vw"
                className="object-cover"
                priority
              />
            </div>
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
              <p className="mt-4 text-xl text-white/75">{executive.role}</p>
              <p className="mt-1 text-base text-white/60">
                {executive.organisation}
              </p>
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
