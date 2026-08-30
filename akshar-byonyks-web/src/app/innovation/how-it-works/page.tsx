import type { Metadata } from "next";

import { DirectionContract } from "@/components/common/direction-contract";
import { AskYourNephrologist } from "@/components/innovation/ask-your-nephrologist";
import { ByHandOrMachine } from "@/components/innovation/by-hand-or-machine";
import { ExchangeCycle } from "@/components/innovation/exchange-cycle";
import { HowItWorksHero } from "@/components/innovation/how-it-works-hero";
import { PdBasics } from "@/components/innovation/pd-basics";
import { PdBenefits } from "@/components/innovation/pd-benefits";
import { CtaBand } from "@/components/sections/cta-band";
import { KeepReading } from "@/components/sections/keep-reading";
import { siteUrl } from "@/lib/site-config";

const path = "/innovation/how-it-works";

const description =
  "Peritoneal dialysis explained in plain language: what the peritoneum does, the three steps of an exchange, and the difference between doing them by hand and by cycler — with a technical layer for clinicians.";

// Spec §11.5 names this page and `/innovation/market/` as the two that carry
// the SEO load a dedicated patient pillar used to carry, and §11.6 targets it
// for "peritoneal dialysis at home", "home dialysis India" and "peritoneal
// dialysis vs hemodialysis". The description is written for the first two; the
// third is answered inside the page rather than in the metadata, because a
// comparison claim in a meta description is a claim about outcomes.
export const metadata: Metadata = {
  title: "How peritoneal dialysis works",
  description,
  alternates: {
    canonical: path,
    // Reciprocal with the Hindi track (30 Aug 2026). A crawler that finds
    // either page must be able to find the other, or the pair reads as
    // duplicate content rather than as one page in two languages.
    languages: { "en-IN": path, "hi-IN": "/hi/peritoneal-dialysis" },
  },
  openGraph: {
    title: "How peritoneal dialysis works | Akshar Byonyks",
    description,
    url: path,
    type: "article",
  },
  twitter: { card: "summary" },
};

// Structured data, kept as narrow as the X-1 page's: `MedicalWebPage` about a
// `MedicalProcedure`, with no property this project cannot substantiate and no
// schema.org enum guessed at. Notably absent: `MedicalSpecialty`, a `howPerformed`
// value, and anything resembling an outcome — the first because the enum would
// be a guess, the last two because the page has not had nephrologist review.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "How peritoneal dialysis works | Akshar Byonyks",
  description,
  url: `${siteUrl}${path}`,
  mainEntity: {
    "@type": "MedicalProcedure",
    name: "Peritoneal dialysis",
    alternateName: "PD",
    description:
      "A form of dialysis that filters blood inside the body, using the peritoneum — the membrane lining the abdominal cavity — as the filter. Sterile dialysate is run into the cavity through a catheter, left to dwell while waste and excess fluid cross into it, and then drained.",
  },
};

// §9.2 `/innovation/how-it-works/`. Section order is the order a reader who
// knows nothing needs: what the therapy is, what one exchange is, who performs
// it, why it is offered at all, and what to do with that — then where to read
// next and how to reach a person.
//
// Surface rhythm: ink → background → ink → surface-2 → background → surface-2
// → background → ink. Three full-bleed ink moments, the ceiling DESIGN.md's
// revised Full-Bleed Rule allows, and each one earned by that rule's own
// meaning test rather than spent to reach the number: the opening, the
// exchange itself (the therapy inside the patient's body), and the closing
// mass. No two are adjacent.
export default function HowItWorksPage() {
  return (
    <>
      <DirectionContract>{`
THESIS: the site could describe the machine and the life, and never once said
what the therapy is. A reader who does not already know peritoneal dialysis
cannot evaluate either of the other two pages. This one closes that gap in the
register the patient audience actually needs, and lets the clinician open a
second layer at each step rather than being written a second page.
OWN-WORLD: the same token system spent on explanation rather than on proof —
ink's third moment goes to a hand-drawn schematic instead of to a product
render, teal appears for the first time as a disclosure affordance rather than
as a stat colour, and the four benefit claims are set as an evidence register
with four visibly empty source slots.
STORY: what the peritoneum does, one exchange in three steps, by hand or by
cycler, the four benefits and their missing references, the questions to take
to a nephrologist.
FIRST VIEWPORT: ink; breadcrumb; the plain-language definition; the
not-medical-advice line above the fold rather than under the page.
FORM: prose measure for explanation, an ordered three-panel figure for the
cycle, the framing-and-artifact split for the two structured registers, native
<details> for the clinical layer.
FINISH: no invented clinical figure, no anatomical illustration drawn from
memory, no outcome claim, and every unsourced benefit marked pending rather
than asserted.
`}</DirectionContract>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HowItWorksHero />
      <PdBasics />
      <ExchangeCycle />
      <ByHandOrMachine />
      <PdBenefits />
      <AskYourNephrologist />
      {/* `/innovation/market/` now exists and is still not offered here, for a
          reason that has changed from "it would 404" to a judgement about this
          page's reader (28 Aug 2026). This is the site's most patient-facing
          surface. Sending someone who has just learned what a peritoneal
          exchange is to a page of cost-effectiveness ratios and catastrophic-
          expenditure percentages is the wrong second read, and the market page
          links back here for the reader travelling the other way. The X-1 page
          is this page's true sibling; the hub is where anyone who wants the
          third door will find it. */}
      <KeepReading
        items={[
          {
            href: "/innovation/the-x1-cycler",
            title: "The X-1 cycler",
            body: "The machine that runs these exchanges overnight — what it does, what is confirmed about it, and what is not yet published.",
          },
          {
            href: "/innovation",
            title: "Innovation",
            body: "How the licensed technology, the therapy and the India argument fit together.",
          },
        ]}
      />
      <CtaBand />
    </>
  );
}
