import { AccessGeometryHero } from "@/components/home/access-geometry-hero";
import { BuiltOnProven } from "@/components/home/built-on-proven";
import { LatestNews } from "@/components/home/latest-news";
import { OurAnswer } from "@/components/home/our-answer";
import { ProofBand } from "@/components/home/proof-band";
import { WhoWeServe } from "@/components/home/who-we-serve";
import { WhyDifferent } from "@/components/home/why-different";
import { CtaBand } from "@/components/sections/cta-band";
import { DirectionContract } from "@/components/common/direction-contract";

// §9.1 Home. Direction: Access-geometry-led. Section order follows the spec's
// nine rows, with rows 1–2 fused into AccessGeometryHero per the shape brief.
export default function Home() {
  return (
    <>
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
      <WhyDifferent />
      <ProofBand />
      <WhoWeServe />
      <BuiltOnProven />
      <LatestNews />
      <CtaBand />
    </>
  );
}
