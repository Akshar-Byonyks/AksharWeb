import type { Metadata } from "next";

import { AccessGeometryHero } from "@/components/home/access-geometry-hero";
import { SiteSplash } from "@/components/motion/site-splash";
import { BuiltOnProven } from "@/components/home/built-on-proven";
import { LatestNews } from "@/components/home/latest-news";
import { OurAnswer } from "@/components/home/our-answer";
import { ProofBand } from "@/components/home/proof-band";
import { TheNight } from "@/components/home/the-night";
import { WhoWeServe } from "@/components/home/who-we-serve";
import { WhyDifferent } from "@/components/home/why-different";
import { CtaBand } from "@/components/sections/cta-band";
import { DirectionContract } from "@/components/common/direction-contract";

// Home had no metadata export of its own and inherited the root layout's.
// It needs one now to declare the Hindi counterpart: a crawler that finds
// /hi must be able to find its way back here, or the pair reads as duplicate
// content rather than as one page in two languages. Title and description are
// deliberately left inheriting, so this adds the alternates and nothing else.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/", "hi-IN": "/hi" },
  },
};

// §9.1 Home. Direction: Access-geometry-led. Section order follows the spec's
// nine rows, with rows 1–2 fused into AccessGeometryHero per the shape brief.
export default function Home() {
  return (
    <>
      {/* THE OPENING CURTAIN LIVES ON HOME, NOT IN THE ROOT LAYOUT, and that
          placement is the whole reason it is cheap. Silk exists on this route
          and nowhere else, so "hold until the background is ready" is only a
          coherent instruction here; putting the component in the layout would
          have shipped and hydrated it on twenty routes that can never show it.

          It is server-rendered — present in the first paint rather than
          mounted after hydration — because a curtain that arrives late paints
          the real page and then covers it up. What decides whether it is
          actually visible is the inline script in the root layout, which runs
          before this markup and is the single place that rule lives.

          `position: fixed` with `z-200`, so being inside <main> costs it
          nothing: it still covers the header, and the header, main and footer
          are all set `inert` while it is up. */}
      <SiteSplash />
      {/* Moved here from the root layout on 24 Aug 2026: a direction contract
          belongs to its own surface, and this one was being emitted on every
          route once a second page existed. */}
      <DirectionContract>{`
THESIS: the opening dramatizes the problem, the weekly clinic trip, not the
device — refusing the hero-shot-of-equipment every competitor and the US
parent default to.
OWN-WORLD: ink (#011a48) spent at full hero-scale coverage, gold (#b08d2f)
restricted to the home state's light and stat accents, white line-art
icons, Noto Sans — the existing token system committed harder, not a new one.
STORY: the visitor watches one scene morph, in-center routine to a quiet
home night, in a single scroll gesture, then meets FDA-clearance proof, the
four benefits, their own audience doorway, and a real way to reach us.
FIRST VIEWPORT: full-bleed ink hero; headline plus licensing/FDA
credibility line top third; pinned before/after scene as the dominant
mass; scroll cue bottom third.
FORM: Access-geometry-led, dealt lead (index 3 of 7, seed 9814a69c),
scroll-scrubbed morph as signature interaction.
FINISH: unreviewed and undocumented is unfinished; this build ends with
the finish review, the verdict, DESIGN.md, and every shipping raster
carrying its provenance.
`}</DirectionContract>
      <AccessGeometryHero />
      <OurAnswer />
      {/* Third ink moment (26 Aug 2026). Placed here deliberately: "Our
          answer" has just said what the machine is, so this is where what it
          means lands, before the four clinical reasons in "Why it is
          different" explain why. See DESIGN.md's revised Full-Bleed Rule. */}
      <TheNight />
      <WhyDifferent />
      <ProofBand />
      <WhoWeServe />
      <BuiltOnProven />
      <LatestNews />
      <CtaBand />
    </>
  );
}
