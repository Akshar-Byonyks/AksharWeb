import type { Metadata } from "next";

import { DirectionContract } from "@/components/common/direction-contract";
import { CostAndCoverage } from "@/components/market/cost-and-coverage";
import { MarketHero } from "@/components/market/market-hero";
import { ModalityMix } from "@/components/market/modality-mix";
import { TheGap } from "@/components/market/the-gap";
import { TimingAndLicensing } from "@/components/market/timing-and-licensing";
import { CtaBand } from "@/components/sections/cta-band";
import { KeepReading } from "@/components/sections/keep-reading";
import { defaultOg } from "@/lib/seo";
import { siteUrl } from "@/lib/site-config";

const path = "/innovation/market";

const description =
  "The India case for home peritoneal dialysis, in sourced and dated figures: the scale of kidney failure, the distance patients travel for in-centre dialysis, what a session costs a household, and why India runs almost no home dialysis.";

// Spec §11.5 names this page and `/innovation/how-it-works/` as the two that
// carry the SEO load a dedicated patient pillar used to carry. §11.6 points
// "dialysis cost in India" and "is dialysis covered by Ayushman Bharat" here.
// The description answers the first and does not answer the second, because
// the honest answer to the second is partly a pending slot and a meta
// description is the wrong place to hedge.
export const metadata: Metadata = {
  title: "The India market",
  description,
  alternates: {
    canonical: path,
    languages: { "en-IN": path },
  },
  openGraph: {
    title: "The India market | Akshar Byonyks",
    description,
    url: path,
    type: "article",
    images: defaultOg,
  },
  twitter: { card: "summary" },
};

// `Article`, not `MedicalWebPage`: the X-1 and how-it-works pages make medical
// statements about a device and a therapy, and this one makes an economic and
// epidemiological argument. `citation` lists the sources the page actually
// carries. The visible page cites each source inline at the figure it supports;
// this is the machine-readable form of the same list, and the two are kept in
// step by hand — there is no longer a rendered register to diff against.
//
// No `MedicalWebPage`, no `MedicalCondition`, no outcome property anywhere:
// the same restraint the how-it-works page applied, for the same reason. A
// schema property this project cannot substantiate is a claim made where
// nobody reviews it.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The India case for home dialysis",
  description,
  url: `${siteUrl}${path}`,
  isPartOf: {
    "@type": "CollectionPage",
    name: "Innovation | Akshar Byonyks",
    url: `${siteUrl}/innovation`,
  },
  citation: [
    "Bharati J, Jha V. Global Dialysis Perspective: India. Kidney360 1(10):1143-1147, 2020. doi:10.34067/KID.0003982020",
    "Kaur G, Prinja S, Ramachandran R, Malhotra P, Gupta KL, Jha V. Cost of hemodialysis in a public sector tertiary hospital of India. Clinical Kidney Journal 11(5):726-733, 2018. doi:10.1093/ckj/sfx152",
    "Gupta D, Jyani G, Ramachandran R, et al. Peritoneal dialysis-first initiative in India: a cost-effectiveness analysis. Clinical Kidney Journal 15(1):128-135, 2022. doi:10.1093/ckj/sfab126",
    "Natarajan H. Peritoneal Dialysis in the Comfort of Home - Regain Your Independence. Indian Journal of Nephrology 34(2):103-104, 2024. doi:10.25259/ijn_374_23",
    "Garcia P, Sanchez-Polo V. Global Dialysis Perspective: Guatemala. Kidney360 1(11):1300-1305, 2020. doi:10.34067/KID.0004092020",
  ],
};

// §9.2 `/innovation/market/`. The page the hub has been promising and the
// three siblings have been refusing to link to, because until now it did not
// exist and `keep-reading.tsx` will not point at a 404.
//
// Section order is the order the argument has to be built in: how many people,
// how far they travel, what it costs their household, what share of them are
// on the therapy this company licenses — and finally on what authority this
// company can act on any of it.
//
// HALVED, 28 AUG 2026. The first build ran nine sections and about twenty-two
// figures and was correctly called unreadable. Spec §4.1's "denser, more
// numeric and more sober" was read as licence rather than as a description of
// something a person still has to get through. Cut: the four-cell "winning
// solution for all" synthesis, whose own comment conceded it introduced no
// claim — a section that only restates is the first thing to go when a page is
// too long; the quality-adjusted life year block and both modelled lifetime
// savings; the household-borrowing breakdown; and roughly half of every
// register. `market-data.ts` records the reasoning at each deletion, because a
// future reader deciding whether to put one back needs the specific one rather
// than a summary.
//
// The deviation from spec §9.2 to record: it lists "A winning solution for
// all" reframed for India as part of this page and that section no longer
// exists. Its Patients, Payers and Producer arguments are made by the legs
// themselves; only the Providers case — nephrologist density as the binding
// constraint on centre-based capacity — is genuinely lost, and it is available
// to put back as a single register row if the client wants it.
//
// EDITORIAL REBUILD, 28 Aug 2026. The halved page was still called bland and
// still too long, and both were one defect: every section shared the same
// framing-and-artifact split and the same hairline register, so ten figures
// looked like one figure repeated and no screen was a landmark. Spec §9.2 asks
// this page for "charts, not paragraphs" and it had been shipping paragraphs
// with numbers in them.
//
// The rebuild gives each section its own layout and its own form — left-framed
// sequence with a full-bleed unit figure; full-width ladder with the support
// figures after it; centred statement with a two-bar comparison; a
// rule-bounded four-column status strip. Nothing shares a
// template with anything else, which is what stops a long page reading as an
// undifferentiated one.
//
// SURFACE RHYTHM. ink → surface-2 (carrying a full-bleed ink band) →
// background → surface-2 → background strip → background → ink. The strip and
// `KeepReading` share a ground and are separated by the strip's own bottom
// rule, which is `proof-band.tsx`'s device on Home.
// **Three ink moments**, which is DESIGN.md's stated ceiling: the hero, the
// untreated-proportion figure inside `the-gap.tsx`, and the closing mass. The
// third is meaning-tested rather than spent to reach the number — see that
// component's header. Every other figure here is evidence about a market and
// stays in the light, which is where DESIGN.md's rule puts evidence.
export default function MarketPage() {
  return (
    <>
      <DirectionContract>{`
THESIS: the India argument was the one thing the US parent's site barely made
and the one thing this site could not yet make, because its four legs are
exactly the figures PRODUCT.md forbids inventing. The page is the answer to
that: a literature pass done in the open, where the citation travels with the
number instead of trailing it, and the gaps that remain are shown at full size
rather than written around.
DISCIPLINE: a figure earns its place by being load-bearing, not by being
available. The first build carried every number the sources gave and became
unreadable; this one carries ten and each is one the case collapses without.
Density is what §4.1's reader wants of the evidence, not of the page.
OWN-WORLD: the palette spent as meaning rather than as decoration. Plum marks
what a facility owns — the three days in the week schematic, the bars of the
catastrophe ladder. Gold marks home and India, including the sliver of it that
is India's share of home dialysis. Teal marks the one external comparator. No
accent lands on a bare statistic, and no figure is a card.
STORY: how many people; how far they travel; what one week of the schedule
does to a household; how few are on the therapy anyway. Then on what authority
this company can act on any of it.
FIRST VIEWPORT: ink; the breadcrumb; the claim that the gap is a distance and
a schedule rather than a machine shortage; and who the page is written for,
with patients pointed elsewhere in the same breath.
FORM: statement hero, a unit figure on ink, one authored week schematic, one
ladder that moves only with the schedule, one two-bar comparison, and a
rule-bounded status strip. Each section its own shape.
CITATION: named at the figure and linked to the paper, never a superscript
pointing at an apparatus. The register section was cut for ending the page on
grey text; the attribution it carried moved up to the numbers instead, which
is where a reader wanted it.
FINISH: no map of India, no jargon left undefined — the catastrophe threshold
is given in words before any percentage appears — no derived figure passed off
as a quoted one, no inherited number left unchecked (Guatemala ships at the
45% its source states, not the 56% the US site carries), and two visible
pendings where a real authority has not yet been read.
`}</DirectionContract>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarketHero />
      <TheGap />
      <CostAndCoverage />
      <ModalityMix />
      <TimingAndLicensing />
      <KeepReading
        items={[
          {
            href: "/innovation/how-it-works",
            title: "How peritoneal dialysis works",
            body: "The therapy this whole argument rests on, explained in plain language — what the peritoneum does and what one exchange is.",
          },
          {
            href: "/products/the-x1-cycler",
            title: "The X-1 cycler",
            body: "The machine that runs those exchanges overnight — what is confirmed about it, and what has not been published yet.",
          },
        ]}
      />
      <CtaBand
        heading="Ask about the India opportunity"
        body="Investor, distributor, clinician or patient enquiry — we route it to the right person. Investor questions go direct."
      />
    </>
  );
}
