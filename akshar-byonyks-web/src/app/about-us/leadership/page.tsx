import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";

import { ExecutivePortrait } from "@/components/about/executive-portrait";
import { AccentRail } from "@/components/common/accent-rail";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CtaBand } from "@/components/sections/cta-band";
import {
  aksharExecutives,
  byonyksExecutives,
  executives,
  type Executive,
} from "@/lib/leadership";
import { defaultOg } from "@/lib/seo";
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
    images: defaultOg,
  },
  twitter: { card: "summary" },
};

// §9.5 `/about-us/leadership/` and, at `[slug]`, a page each.
//
// FOUR PEOPLE SINCE 1 SEP 2026, down from fifteen, on client instruction:
// every Byonyks card removed except Senthil Kumar's, and Dr. Ronak C. Shah and
// Sahil added for Akshar Byonyks. `src/lib/leadership.ts` records what went,
// what that closed, and the three things still needed from the client — two
// job titles, two photographs, and Senthil Kumar's India note.
//
// ONE LIST, ON CLIENT INSTRUCTION, 29 Aug 2026: "Dont make Akshar Byonyks and
// Byonyks 2 seperate lists. Should be one in the same." An earlier build split
// the roster into two labelled sections; that is gone. Provenance is on every
// record — Senthil Kumar's is transcribed from byonyks.com, the other three
// were supplied by the client.
//
// PLUM ON THE COMPANY LABEL, 30 Aug 2026. Plum means "institutional / formal"
// sitewide, and the `organisation` line is the most literally institutional
// string on this page — it is the label the comment below calls the whole
// defence, and it was rendering in the quietest treatment the design system
// has. Colour is not the sole carrier: the company is written out in words on
// every card, so the rail reinforces a distinction a reader can also simply
// read, and the defence survives intact in monochrome.
//
// ONE PLUM FOR BOTH COMPANIES, not one colour each. Giving Akshar Byonyks and
// Byonyks different accents would make colour encode company identity, which
// is a fifth meaning the four-role system does not have and the Wayfinding
// Rule forbids inventing. The rail marks that an attribution is being made;
// the words say which one.
//
// WITH THE HEADINGS GONE, THE PER-CARD COMPANY LABEL IS THE WHOLE DEFENCE.
// Spec §3.1's first non-negotiable is that the two companies are never
// blurred, and the failure mode for a page like this is not a false sentence —
// it is a grid of faces under one masthead that a reader completes for
// themselves. So every card prints its `organisation` under the role, the
// intro counts the two companies separately, and each profile repeats it. Do
// not remove that label to tidy the cards up. It matters at four records as
// much as it did at fifteen — arguably more, since the one Byonyks person now
// sits among three of ours rather than the reverse.
//
// WHO IS STILL MISSING IS NO LONGER SAID ON THIS PAGE (30 Aug 2026, client
// instruction). A "The rest of the Akshar Byonyks team" section used to sit
// below the grid with a pending note; it is gone.
//
// THE PER-RECORD GAPS ARE ALL CLOSED (10 Sep 2026). This said "'Photograph
// pending' in two frames and 'Title to be confirmed' under two names", and
// there are now none of either: all five records carry a role and a portrait.
// Both branches stay in the markup because the next supplied record may need
// them, and a record can only go without a portrait on purpose — see
// `portraitPending` in `leadership.ts`.
//
// One gap on this route survives, and it is per-record too: the "On India"
// chip on `/about-us/leadership/senthil-kumar`. `/what-we-know/` carries it as
// `pending-india-note` and names this page in its "Appears on" list. That
// entry replaced `pending-executives`, which had gone false — see the note in
// `claims-ledger.ts`.
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
          {/* The title, or a statement that there isn't one. `role` became
              optional on 1 Sep 2026 when two people arrived with a biography
              and no title; the card says so in the same pending grammar the
              portrait frame uses one line above, rather than closing the gap
              up and letting the company label move into the title's slot. */}
          {executive.role ? (
            <p className="mt-1 text-base text-muted-foreground">
              {executive.role}
            </p>
          ) : (
            <p className="mt-1 flex items-center gap-1.5 font-mono text-xs tracking-wide text-pending">
              <Clock className="size-3 shrink-0" aria-hidden="true" />
              Title to be confirmed
            </p>
          )}
          {/* The company, on every card, always — even inside a section that
              is already headed with it. The heading scrolls away; the card
              gets screenshotted, shared and read on its own. */}
          <AccentRail accent="plum" className="mt-2">
            <p className="font-mono text-xs tracking-wide text-plum">
              {executive.organisation}
            </p>
          </AccentRail>
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
            {aksharExecutives.length} at Akshar Byonyks and{" "}
            {byonyksExecutives.length} at Byonyks, the company that designs and
            manufactures the cycler. Each card names the company that person
            works for, and each profile is their own biography, carried word for
            word, with a note of where it came from.
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

      {/* REMOVED 30 Aug 2026, at the client's instruction: the "The rest of the
          Akshar Byonyks team" section — heading, the "one name is published
          above" line, the pending note and the link back to /about-us.

          The gap it declared is not lost, though what remains of it is smaller
          than it was. `/what-we-know/` carried it as `pending-executives`
          until 10 Sep 2026, when that entry was replaced: its sentences had
          gone false — four Akshar Byonyks people are published, not three, and
          every one of them now has a title and a portrait. The surviving gap
          on this route is `pending-india-note`, which names this page in its
          "Appears on" list. The roster page still says which company each
          person works for. What went is the section that said it twice. */}

      <CtaBand
        heading="Talk to Akshar Byonyks"
        body="Patient, clinician, investor, or distributor enquiry. We route it to the right person."
      />
    </>
  );
}
