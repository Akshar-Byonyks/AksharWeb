import type { Metadata } from "next";

import { DirectionContract } from "@/components/common/direction-contract";
import { ByoTalksHero } from "@/components/byotalks/byotalks-hero";
import { SessionIndex } from "@/components/byotalks/session-index";
import { SpeakerRegister } from "@/components/byotalks/speaker-register";
import { CtaBand } from "@/components/sections/cta-band";
import { KeepReading } from "@/components/sections/keep-reading";
import { defaultOg } from "@/lib/seo";
import { byotalksSessions } from "@/lib/byotalks";
import { siteUrl } from "@/lib/site-config";

const path = "/byotalks";

const description =
  "Recorded sessions with nephrologists on peritoneal dialysis: catheter insertion and drainage complications, PD prescription, adequacy beyond Kt/V, peritonitis, and supporting patients on home therapy.";

// Spec §11.6 points clinical queries — "PD prescription", "Kt/V peritoneal
// dialysis", "PD peritonitis" — at ByoTalks sessions. The description is
// written from the session titles themselves rather than around them, because
// those titles are the queries.
export const metadata: Metadata = {
  title: "ByoTalks",
  description,
  alternates: {
    canonical: path,
    languages: { "en-IN": path },
  },
  openGraph: {
    title: "ByoTalks | Akshar Byonyks",
    description,
    url: path,
    type: "website",
    images: defaultOg,
  },
  twitter: { card: "summary" },
};

// `CollectionPage` with an `ItemList`, not eight `VideoObject`s.
//
// Spec §11.7's `VideoObject` requirement is met on the session pages, where
// each video is the page's subject and the type has one unambiguous referent.
// Emitting eight of them here as well would make this page claim to be eight
// videos, and duplicate every property across two URLs for a crawler to
// reconcile. An `ItemList` pointing at the eight pages is what a library index
// actually is.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ByoTalks | Akshar Byonyks",
  description,
  url: `${siteUrl}${path}`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: byotalksSessions.length,
    itemListElement: byotalksSessions.map((session, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: session.title,
      url: `${siteUrl}${path}/${session.slug}`,
    })),
  },
};

// §9.3 `/byotalks/`. The second nav item, and the first section of the site
// built outside `/innovation/`.
//
// Kept as-is per the audit, which means: an index of the eight sessions and a
// page each, with the speakers' credentials prominent. Spec F-4 records that
// this section is "the most differentiated content asset in the group" and
// that transcripts and topic filtering would be the highest-return enhancement
// available — both are Phase 3 and neither is built here.
//
// THE RECORDINGS WERE FOUND (28 Aug 2026). The first build of this page shipped
// eight pending states, because byonyks.com's `/learn/` page describes the
// sessions without linking any of them and the raw HTML contains no embed at
// all. All eight are public on Byonyks' own channel; `byotalks.ts` records how
// each id was confirmed.
//
// The one absence that remains is real and is stated on every session page
// rather than hidden: all eight carry YouTube's automatic captions and none has
// a human-checked track, which spec §7.3 requires. That is a launch-gate item,
// and the page says so above the player instead of letting the presence of a
// caption button imply compliance.
//
// Surface rhythm: ink → background → surface-2 → background → ink. Two ink
// moments, opening and closing mass. DESIGN.md permits a third and this page
// has no third thing worth saying in ink — a library and its speaker credits
// are attribution, and attribution belongs in the light.
export default function ByoTalksPage() {
  return (
    <>
      <DirectionContract>{`
THESIS: eight nephrologists already recorded the most differentiated content
this group owns. It was sitting unlinked on a YouTube channel while the site
described it in prose; the job was to find it and put it in front of the
clinician audience with the speakers' credentials attached.
OWN-WORLD: the documentary register applied to a library. Byonyks' own
designed session cards as previews — headshots, credentials, dates, on their
brand — with credentials repeated as text beneath, because a thumbnail does
not replace "Former President of the ISPD" set where it can be read.
STORY: what these sessions are, the eight of them with who gave each, and the
speakers gathered so the advisory-board names read as a group rather than as
scattered bylines.
FIRST VIEWPORT: ink over clinicians mid-conversation; the breadcrumb; and
counts computed from the data rather than typed. The line naming these
clinician-to-clinician rather than product presentations was removed on
client instruction, 3 Sep 2026.
FORM: statement hero over a scrimmed photograph, a two-column preview grid
with runtimes, a generated speaker grid, and a facade player that loads
nothing from the host until it is asked to.
FINISH: no fabricated video id — every one was read off the channel and
confirmed against oEmbed — no third-party script before a click, caption
quality stated above the player rather than implied by its presence, and the
misspelled speaker name the old site carried corrected where it is written.
`}</DirectionContract>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ByoTalksHero />
      <SessionIndex />
      <SpeakerRegister />
      <KeepReading
        items={[
          {
            href: "/innovation/how-it-works",
            title: "How peritoneal dialysis works",
            body: "The therapy these sessions discuss, in plain language, with a technical layer at each step for clinicians.",
          },
          {
            href: "/products/the-x1-cycler",
            title: "The X-1 cycler",
            body: "The device Akshar Byonyks is licensed to bring to India: specification, regulatory position, and what is not yet published.",
          },
        ]}
      />
      <CtaBand
        heading="Talk to us about a PD programme"
        body="Clinician, hospital, distributor or patient enquiry. We route it to the right person."
      />
    </>
  );
}
