import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
// lucide dropped its brand icons, so this is the generic external-link mark
// rather than a LinkedIn logo. A wordmark we do not have the right to redraw
// is not worth a dependency.
import { ArrowLeft, Clock } from "lucide-react";

import { ExecutivePortrait } from "@/components/about/executive-portrait";
import { AccentRail } from "@/components/common/accent-rail";
import { LinkedInMark } from "@/components/common/linkedin-mark";
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
      ? `${executive.name}, ${executive.role}`
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
              {/* THE COMPANY LINE CAME OFF HERE TOO, 12 Sep 2026, same client
                  instruction as the roster card — "the tag under each person".
                  It was plum on ink, directly under the role.

                  This is the instance that cost more of the two. The comment
                  it replaces named the exact misreading it existed to stop:
                  "an executive, on the Akshar Byonyks site, therefore an
                  Akshar Byonyks executive" — and on a profile page, unlike the
                  roster, there is no counts paragraph nearby to carry the
                  distinction instead. What still carries it here is the
                  JSON-LD `worksFor` below, the portrait's alt text, and the
                  page's own meta description; all three read `organisation`,
                  which is why that field stays required. None of the three is
                  visible on the page. See deviation 38. */}
              {/* THE BRAND TILE, REPLACING A TEXT LINK (12 Sep 2026, client
                  instruction). This was a gold "LinkedIn" label with a generic
                  external-link chevron; it is now the same blue tile the
                  roster card carries, so the two places a reader can meet this
                  link look like the same link.

                  BIGGER HERE THAN ON THE CARD — 40px against 36px. On the
                  roster the tile is an attribute pinned to a thumbnail among
                  six others; on a profile it is the only outbound link on the
                  page and it sits in a hero at display sizes, where 36px reads
                  as an afterthought.

                  THE RING FLIPS TO WHITE because this hero is on ink. The card
                  uses ring-black/10 to hold an edge against a pale photograph;
                  the same value here would be invisible, and a blue tile on
                  dark navy is exactly the case that needs one.

                  NO VISIBLE WORD "LINKEDIN" ANY MORE, which is a real trade
                  and worth naming: the mark is recognised on sight by almost
                  everyone and the accessible name still says it in full, but a
                  reader who does not know the glyph now has nothing to read.
                  The instruction was explicit about removing the word. */}
              {executive.linkedin ? (
                <p className="mt-6">
                  <a
                    href={executive.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-10 overflow-hidden rounded-lg shadow-sm ring-1 ring-white/20 transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <LinkedInMark className="size-full" />
                    <span className="sr-only">
                      {executive.name} on LinkedIn (opens in a new tab)
                    </span>
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
                is authored as prose rather than as markup.

                THE SECOND BRANCH IS NEW (11 Sep 2026) and it is this page's
                third pending state, after "Title to be confirmed" and
                "Photograph pending" in the hero above. A record can now
                arrive as a name, a title and a face with the words still to
                come — `bioPending` in leadership.ts — and this is where the
                page says so instead of rendering a profile with nothing on
                it. Same grammar as the other two: the chip, the amber, and a
                sentence naming what is missing rather than a blank. */}
            {executive.bio ? (
              executive.bio.split(/\n\s*\n/).map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-5 text-lg text-foreground first:mt-0"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-lg text-muted-foreground">
                <PendingChip label="Biography pending" />
                <span>
                  {executive.name}&rsquo;s biography has not been supplied yet.
                  It will be published here in their own words, as every other
                  biography on this roster is.
                </span>
              </p>
            )}

            {/* THE ATTRIBUTION LINE CAME OFF, 11 Sep 2026, on client
                instruction. It printed one of two sentences under every
                biography — "as published by <organisation>, carried here word
                for word, retrieved <date>" for the transcribed records, and
                "supplied by <supplier>, carried here word for word, received
                <date>" for the client's own copy — and it is the last of this
                site's visible provenance marks to go, after the 2 and 3 Sep
                removals took the rest.

                WHAT WENT WITH IT, so nobody has to reconstruct it. Every
                biography on this roster is somebody else's text carried
                verbatim; none was written here. That is still true and is
                still recorded, in "leadership.ts" per record and in
                SOURCES.md. The page simply no longer says it, so a reader now
                meets a quoted biography of a real person with no stated
                origin.

                "sourceUrl", "suppliedBy" and "retrieved" are all still
                required by the module-load contract in "leadership.ts" and
                must stay populated. They are the record; this was only its
                rendering. */}

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
            {/* THE PENDING BRANCH IS GONE, 11 Sep 2026, on client
                instruction: Senthil Kumar's profile should not carry an
                "On India / Pending" block saying his role in the India
                programme has not been supplied. Only a record that actually
                HAS an "indiaNote" renders this section now.

                "indiaNotePending" stays on the type and stays true on his
                record in "leadership.ts", because it is still an accurate
                note of something the client was asked for and has not sent.
                It simply renders nothing. If a blurb arrives, set "indiaNote"
                and clear the flag — the contract in that file still refuses
                both at once. */}
            {executive.indiaNote ? (
              <AccentRail accent="gold" className="mt-10">
                <h2 className="text-lg font-semibold text-ink">
                  On India
                </h2>
                <p className="mt-3 text-lg text-foreground">
                  {executive.indiaNote}
                </p>
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
        body="Patient, clinician, investor, or distributor enquiry. We route it to the right person."
      />
    </>
  );
}
