import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { AccentRail } from "@/components/common/accent-rail";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { byotalksSessions, formatDuration } from "@/lib/byotalks";

// Spec §9.3: "Index listing the eight sessions, each linking to a session page
// with video and speaker credentials."
//
// PREVIEWS ADDED 28 Aug 2026, once the recordings were found. The first build
// of this section was a hairline register with no imagery, on the reasoning
// that "eight video cards with no thumbnails to put on them would be eight
// empty rectangles." That reasoning was sound and it expired the moment the
// thumbnails existed.
//
// The thumbnails are not generic stills. Byonyks made a designed card for each
// session — headshots of the speakers, their credentials, the date the session
// was recorded, on the Byonyks brand. They are the single best asset available
// for this page, they carry the F-5 credential argument visually, and they are
// the manufacturer's own material, so provenance is clean.
//
// SERVED FROM THIS ORIGIN, NOT HOTLINKED. Each card is downloaded into
// `public/images/byotalks/`. Hotlinking `i.ytimg.com` would put eight
// third-party requests on the index just to render a listing, which is the
// cost the facade discipline on the session page exists to avoid — it would be
// odd to refuse it there and accept it here. It also means the listing keeps
// working if a video is ever made private.
//
// The credential block stays at the weight the first build gave it. Spec F-5
// makes this page the only home for the advisory-board nephrologists' names,
// and a thumbnail does not replace "Former President of the ISPD" set in text.
export function SessionIndex() {
  return (
    <section
      aria-labelledby="sessions-heading"
      id="sessions"
      className="scroll-mt-24 bg-background"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="sessions-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
            >
              The sessions
            </h2>
            {/* WHAT BYOTALKS IS, rewritten 3 Sep 2026 on client instruction.
                Every clause is checked against `byotalks.ts` rather than
                written to sound right:

                "Byonyks' own" — the recordings are on Byonyks USA's channel,
                @Byonyks-Official. Attributed to Byonyks and not to Akshar
                Byonyks, which is spec §3.1's first non-negotiable.

                "long-form" — the sessions run between roughly one and two
                hours; `durationSeconds` carries the real figures.

                "nephrologists and nursing leads" — NOT "nephrologists". Five
                of the six speakers are physicians, and the sixth is Joanna Lee
                Neumann, RN, CNN, a Senior Director of Clinical Services. The
                hero says "clinicians" for the same reason; a sentence here
                calling them all nephrologists would misdescribe her.

                "several of them" — four of the six carry "Byonyks Scientific
                Advisory Board". Deliberately not a number: it stays true if a
                session is added, which the sentence it replaces did not.

                THE COUNT IS GONE, and that is a fix rather than a trim. This
                paragraph opened "Eight recorded conversations" — a hardcoded
                figure directly under a hero that computes the same number from
                the data precisely so a ninth session cannot leave a stale one.
                The listing below is the count.

                What also left: "Nothing loads from the video host until you
                press play." The facade is unchanged and still does exactly
                that; the claim now lives only on /accessibility, which states
                it in full. */}
            <p className="mt-4 text-lg text-muted-foreground">
              ByoTalks is Byonyks&rsquo; own video series: long-form recorded
              sessions in which the clinicians who do this work (
              nephrologists and nursing leads, several of them on Byonyks&rsquo;
              Scientific Advisory Board) talk through peritoneal dialysis
              in practice. Each has a page here with the full recording and the
              speaker&rsquo;s credentials.
            </p>
          </div>
        </ScrollReveal>

        <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          {byotalksSessions.map((session, index) => (
            <ScrollReveal
              key={session.slug}
              as="li"
              delayMs={(index % 2) * 90}
              className="h-full"
            >
              <Link
                href={`/byotalks/${session.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-card p-4 hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-5"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl bg-ink">
                  <Image
                    src={session.thumbnail}
                    alt={`Session card for “${session.title}”, showing the speakers and their credentials.`}
                    fill
                    sizes="(min-width: 768px) 42vw, 92vw"
                    className="object-cover"
                  />
                  {/* Play affordance. The card links to the session page, not
                      to the video — it is a promise that a video is there,
                      which is what a preview is. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center bg-ink/25 opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                  >
                    {/* A NEUTRAL CONTROL, DELIBERATELY (30 Aug 2026). This circle was gold,
                          and gold means "home / India" under the Wayfinding Rule —
                          an accent spent on a play button, which is an
                          affordance and not a meaning. Teal was the obvious
                          swap and is just as wrong for the same reason: a
                          control is not clinical evidence. Teal on this page
                          marks the credentials instead, which is the thing
                          that actually is. */}
                    <span className="flex size-14 items-center justify-center rounded-full bg-white text-ink">
                      <Play className="size-6 translate-x-0.5" />
                    </span>
                  </span>
                  <span className="absolute right-2 bottom-2 rounded-md bg-ink/85 px-2 py-1 font-mono text-xs tracking-wide text-white tabular-nums">
                    {formatDuration(session.durationSeconds)}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-balance text-ink group-hover:text-primary">
                  {session.title}
                </h3>

                {/* Teal, because this is what teal means. Spec F-5 makes
                    these credentials the reason this page exists — "for the
                    clinician audience, those names are the credential that
                    opens a conversation" — and they were rendering as the
                    same grey as everything else on the card. */}
                <AccentRail accent="teal" className="mt-3">
                  <p className="text-base font-semibold text-ink">
                    {session.speaker}
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {session.credentials.map((credential) => (
                      <li
                        key={credential}
                        className="text-sm text-muted-foreground"
                      >
                        {credential}
                      </li>
                    ))}
                  </ul>
                </AccentRail>

                <p className="mt-4 grow text-base text-muted-foreground">
                  {session.summary}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-base font-semibold text-primary group-hover:underline">
                  Open the session
                  <ArrowRight
                    className="size-4 shrink-0 transition-transform duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
