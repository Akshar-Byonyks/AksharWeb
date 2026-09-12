import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";

import { ExecutivePortrait } from "@/components/about/executive-portrait";
import { LinkedInMark } from "@/components/common/linkedin-mark";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CtaBand } from "@/components/sections/cta-band";
import {
  aksharExecutives,
  byonyksExecutives,
  otherExecutives,
  principalExecutives,
  rosterOrder,
  type Executive,
} from "@/lib/leadership";
import { defaultOg } from "@/lib/seo";
import { licensingStatement } from "@/lib/claims";
import { siteUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";

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
// THE PER-CARD COMPANY LABEL CAME OFF ON 12 SEP 2026, on the client's
// instruction: "The tag under each person in leadership of Byonyks vs Akshar
// Byonyks should be deleted." It was a plum-railed mono line under the role,
// on every card and on every profile hero, and both are gone.
//
// WHAT THAT COMMENT USED TO SAY, BECAUSE IT IS STILL THE RISK. It read: "WITH
// THE HEADINGS GONE, THE PER-CARD COMPANY LABEL IS THE WHOLE DEFENCE. Spec
// §3.1's first non-negotiable is that the two companies are never blurred, and
// the failure mode for a page like this is not a false sentence — it is a grid
// of faces under one masthead that a reader completes for themselves. Do not
// remove that label to tidy the cards up." The instruction overrides it, and
// the reasoning was not wrong; it is recorded as deviation 38.
//
// IT WAS NOT, HOWEVER, THE WHOLE DEFENCE — that sentence overstated it, and
// checking before deleting is what found the three things still carrying §3.1
// on this page:
//
//   1. THE COUNTS SENTENCE directly below, which names both companies and
//      splits the roster between them in words. It is derived from the data,
//      so it cannot drift from the records.
//   2. SENTHIL KUMAR'S PORTRAIT ALT — "Portrait of Senthil Kumar, VP Business
//      Development at Byonyks." This is the one record where the distinction
//      actually matters and his alt happens to carry it, so a screen reader
//      still gets it. Do not generalise that: alt text on this roster is
//      hand-written per record and only two of the seven name a company at
//      all; the other five describe clothing and backdrop. It is luck, not a
//      mechanism, and it would not survive somebody rewriting his alt.
//   3. THE JSON-LD `worksFor` on each profile, so crawlers and anything
//      building a knowledge panel still attribute each person correctly.
//
// SO `organisation` STAYS ON THE RECORD and stays required. It is no longer
// printed, which is a different thing from no longer being true, and all three
// survivors above read it. Deleting the field would be a much larger change
// than the one that was asked for.
//
// THE ONE READER WHO NOW GETS NOTHING is the sighted visitor who lands on a
// single card, or screenshots one, without reading the paragraph above the
// grid. That was the specific case the old label existed for.
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
    numberOfItems: rosterOrder.length,
    itemListElement: rosterOrder.map((executive, index) => ({
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
  className,
}: {
  executive: Executive;
  index: number;
  className?: string;
}) {
  return (
    // THE ScrollReveal IS THE <li>, AND IS ALSO THE GRID CHILD.
    //
    // It used to render a <div> with the <li> inside it, which meant the
    // <ul> had seven <div> children and no list items at all: a screen
    // reader got seven unrelated blocks instead of "list, 7 items" with a
    // position on each. That is why `as="li"` exists (12 Sep 2026) — see
    // scroll-reveal.tsx for the measurement.
    //
    // The column-span class has to land here for the same reason it always
    // did: this element is what the grid measures.
    //
    // RELATIVE, BECAUSE THE LINKEDIN MARK CANNOT LIVE INSIDE THE LINK.
    // The whole card is one <Link> to the profile, and an <a> nested inside
    // an <a> is invalid HTML — browsers recover from it by closing the outer
    // anchor early, which silently breaks the card's own link and leaves a
    // tab stop pointing nowhere. So the mark is a SIBLING of the card link,
    // absolutely positioned over the portrait's corner, and this <li> is the
    // positioning context that makes that possible.
    //
    // Not a decision about layout convenience: it is the only arrangement in
    // which both links work with a keyboard.
    <ScrollReveal
      as="li"
      delayMs={(index % 3) * 90}
      className={cn("relative", className)}
    >
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
      </Link>

      {/* THE LINKEDIN MARK, ON THE PORTRAIT'S TOP-RIGHT CORNER.

          WHY IT SITS ON THE PHOTOGRAPH rather than under the name. The card
          below the frame is a reading column — name, then title — and
          dropping an icon into it puts a second tap target in the middle of
          a sentence. The portrait has a corner doing nothing, and a mark
          there reads as an attribute of the person rather than an item in
          the list. Top-right rather than bottom: the portrait is the first
          element in the card, so the top of this <li> IS the top of the
          frame, whereas its bottom is below the name and title. Subjects on
          this roster are centred, so the upper corner is backdrop.

          THE TILE IS THE BUTTON (12 Sep 2026, client instruction: "make
          this image the button users can click on"). It was a monochrome
          glyph on a white disc for a few hours; it is now LinkedIn's own
          blue tile at 36px, which is the mark the client sent.

          That solved the legibility problem rather than dodging it. The
          backdrops on this roster run white to dark grey to a city skyline,
          so no single glyph colour is readable over all of them — the
          previous version answered that with a white disc to sit the glyph
          on. The brand tile brings its own opaque ground, so the contrast
          is now against something neither this file nor the photographer
          controls, and it is the same everywhere.

          THE HAIRLINE RING IS FOR ONE CASE: a portrait with a pale
          top-right corner, where a blue tile on near-white needs an edge to
          stop it floating. ring-black/10 is invisible against the other
          backdrops.

          36px IS THE TARGET SIZE, NOT THE ICON SIZE. WCAG 2.2 SC 2.5.8 asks
          for 24px minimum; the tile fills its box, so the visible mark and
          the hit area are the same rectangle and there is no invisible
          padding doing the work. An icon-sized target here would be a link
          only a mouse could use.

          HOVER IS OPACITY, NOT COLOUR. Every other link on this site shifts
          hue on hover. This one cannot: the colour is another company's
          trademark and the file that draws it says why it is fixed.

          THE ACCESSIBLE NAME IS THE PERSON'S, not "LinkedIn". A screen
          reader listing links on this page would otherwise read "LinkedIn"
          once per card with no way to tell them apart. */}
      {executive.linkedin ? (
        <a
          href={executive.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-2 top-2 inline-flex size-9 overflow-hidden rounded-lg shadow-sm ring-1 ring-black/10 transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <LinkedInMark className="size-full" />
          <span className="sr-only">
            {executive.name} on LinkedIn (opens in a new tab)
          </span>
        </a>
      ) : null}
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
            manufactures the cycler. Each profile is that person&rsquo;s own
            biography, carried word for word, with a note of where it came
            from.
          </p>

          {/* TWO ROWS, NOT ONE GRID, since 11 Sep 2026 on client instruction:
              "put President and Vice President in their own row at the top.
              Everyone should go below."

              IT IS STILL ONE LIST TO A SCREEN READER, and that is the point of
              the markup. The client's standing instruction of 29 Aug 2026 --
              "Dont make Akshar Byonyks and Byonyks 2 seperate lists. Should be
              one in the same." -- is about the company split and is untouched
              here; what would break it is announcing two lists. So this is one
              <ul> whose first two items are given the full row by a grid
              placement rule, rather than two <ul>s with a heading each. Reading
              order, list semantics and the item count are all unchanged.

              THE TWO PRINCIPALS SPAN THE ROW. At lg the grid is three columns
              and there are two of them, so each takes half the width via
              "lg:col-span-3" on a nested two-up -- no. Simpler and with no
              nesting: the list is a six-column grid at lg, principals take
              three columns each and everyone else takes two. Six is the lowest
              common multiple of the two row shapes, so one grid serves both
              and no card is ever orphaned by a wrap.

              Below lg the six-column grid collapses to the same one- and
              two-column shapes the page always had, and the principals simply
              lead the list -- which is the correct outcome on a phone, where a
              "row" of two full-width cards is two cards. */}
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
            {principalExecutives.map((executive, index) => (
              <ExecutiveCard
                key={executive.slug}
                executive={executive}
                index={index}
                className="lg:col-span-3"
              />
            ))}
            {otherExecutives.map((executive, index) => (
              <ExecutiveCard
                key={executive.slug}
                executive={executive}
                index={index}
                className="lg:col-span-2"
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
