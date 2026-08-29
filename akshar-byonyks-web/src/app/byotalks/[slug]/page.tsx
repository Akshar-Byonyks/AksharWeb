import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { VideoFacade } from "@/components/byotalks/video-facade";
import { CtaBand } from "@/components/sections/cta-band";
import { byotalksSessions, getSession, isoDuration } from "@/lib/byotalks";
import { notMedicalAdvice } from "@/lib/claims";
import { siteUrl } from "@/lib/site-config";

// Spec §9.3: each session gets "a session page with video and speaker
// credentials." Eight of them, statically prerendered — spec §12.4 requires
// content routes to be prerendered at build time and this collection is fixed
// and tiny.
export function generateStaticParams() {
  return byotalksSessions.map((session) => ({ slug: session.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const session = getSession(slug);
  if (!session) return {};

  const path = `/byotalks/${session.slug}`;
  // The speaker's name is in the description because for the clinician
  // audience it is the search term. Spec §11.6 points clinical queries at
  // these sessions; a nephrologist looking for Teitelbaum on adequacy is
  // searching the name, not the title.
  const description = `${session.summary} A ByoTalks session with ${session.speaker}, ${session.credentials[0]}.`;

  return {
    title: `${session.title} — ${session.speaker}`,
    description,
    alternates: { canonical: path, languages: { "en-IN": path } },
    openGraph: {
      title: `${session.title} | ByoTalks`,
      description,
      url: path,
      type: "article",
    },
    twitter: { card: "summary" },
  };
}

// §9.3, one session.
//
// `VideoObject`, at last. Spec §11.7 requires it on ByoTalks, and the first
// build of this page deliberately withheld it: the type needs a `contentUrl`
// or an `embedUrl`, all eight sessions had `videoId: null`, and emitting it
// anyway would have been a machine-readable claim that a video was here when
// none was.
//
// The recordings were found on Byonyks' own channel on 28 Aug 2026, so every
// property below now resolves to something real — `embedUrl` to the actual
// video, `duration` from its own `lengthSeconds`, `uploadDate` from its own
// metadata, `thumbnailUrl` to the session card served from this origin. The
// requirement was blocked rather than dropped, and this is it shipping.
//
// `uploadDate` is the YouTube upload date, not the date the session was
// recorded — those differ by up to a year here, and schema.org means the
// former. The recording dates are printed on Byonyks' own session cards and
// are not transcribed into this codebase, so nothing here can imply one.
export default async function ByoTalksSessionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = getSession(slug);
  if (!session) notFound();

  const path = `/byotalks/${session.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: session.title,
    description: session.summary,
    url: `${siteUrl}${path}`,
    thumbnailUrl: `${siteUrl}${session.thumbnail}`,
    uploadDate: session.publishedAt,
    duration: isoDuration(session.durationSeconds),
    embedUrl: `https://www.youtube.com/embed/${session.videoId}`,
    isPartOf: {
      "@type": "CollectionPage",
      name: "ByoTalks | Akshar Byonyks",
      url: `${siteUrl}/byotalks`,
    },
    // The speaker, with the credentials verified in `byotalks.ts` and nothing
    // constructed here that is not in that file.
    author: {
      "@type": "Person",
      name: session.speaker,
      jobTitle: session.credentials.join("; "),
    },
    publisher: {
      "@type": "Organization",
      name: "Byonyks",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* No image on this hero, now for a composition reason rather than an
          availability one: the session card is the player's own poster fifty
          pixels below, and running it twice in one viewport would read as a
          duplication rather than as emphasis. Ink and type here, the picture
          where the picture does work. */}
      <section aria-labelledby="session-heading" className="bg-ink">
        <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <Breadcrumbs
            tone="dark"
            items={[
              { name: "ByoTalks", href: "/byotalks" },
              { name: session.title },
            ]}
          />

          <div className="mt-10 lg:mt-14">
            <h1
              id="session-heading"
              className="max-w-3xl text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
            >
              {session.title}
            </h1>

            {/* Credentials in the first viewport, at display weight. Spec F-5
                makes this page the site's only home for the advisory-board
                nephrologists' names, and for a clinician deciding whether to
                spend forty minutes, the credential is the deciding line. */}
            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-xl font-semibold text-white">
                {session.speaker}
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {session.credentials.map((credential) => (
                  <li key={credential} className="text-base text-white/70">
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="session-video-heading" className="bg-background">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 id="session-video-heading" className="sr-only">
            The recording
          </h2>
          <div className="mx-auto max-w-4xl">
            <VideoFacade session={session} />

            <div className="mt-12">
              <h3 className="text-2xl font-bold tracking-tight text-balance text-ink">
                What this session covers
              </h3>
              <p className="mt-4 text-lg text-foreground">{session.summary}</p>
              <p className="mt-6 border-t border-line pt-5 text-sm text-muted-foreground">
                {notMedicalAdvice}
              </p>
            </div>

            <p className="mt-10">
              <Link
                href="/byotalks"
                className="inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                All ByoTalks sessions
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Talk to us about a PD programme"
        body="Clinician, hospital, distributor or patient enquiry — we route it to the right person."
      />
    </>
  );
}
