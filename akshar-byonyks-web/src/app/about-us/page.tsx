import type { Metadata } from "next";

import { AboutHero } from "@/components/about/about-hero";
import { LeadershipPending } from "@/components/about/leadership-pending";
import { Milestones } from "@/components/about/milestones";
import { OriginStory } from "@/components/about/origin-story";
import { DirectionContract } from "@/components/common/direction-contract";
import { CtaBand } from "@/components/sections/cta-band";
import { KeepReading } from "@/components/sections/keep-reading";
import { siteUrl } from "@/lib/site-config";

const path = "/about-us";

const description =
  "Akshar Byonyks is licensed to bring Byonyks' FDA-cleared X-1 home dialysis cycler to India. Who the two companies are, why the device was built, and how it reached clearance.";

export const metadata: Metadata = {
  title: "About us",
  description,
  alternates: {
    canonical: path,
    languages: { "en-IN": path },
  },
  openGraph: {
    title: "About us | Akshar Byonyks",
    description,
    url: path,
    type: "website",
  },
  twitter: { card: "summary" },
};

// `AboutPage`, and an `Organization` that claims only what can be substantiated.
// No `founder` property: Akshar Byonyks' own founders are Open Question 1.4 and
// naming Byonyks' founder in that slot would assert something false in
// machine-readable form — the exact error the visible copy is built to avoid.
// No `address`, because the India office is Open Question 1.1 and a placeholder
// in structured data is a placeholder a crawler will publish.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About us | Akshar Byonyks",
  description,
  url: `${siteUrl}${path}`,
  mainEntity: {
    "@type": "Organization",
    name: "Akshar Byonyks International LLC",
    url: siteUrl,
    description:
      "Licensed to bring the Byonyks X-1 automated peritoneal dialysis cycler to India.",
  },
};

// §9.5 `/about-us/`. Spec calls it "the single most important new page on the
// site", and the shape it ships in is not the shape the spec draws.
//
// MEASURED BEFORE BUILDING, which is the process this project adopted after
// `/manufacturing/` shipped and was retired the same day. Twelve facts this
// page might carry were checked against the rendered copy of the other seven
// pages. **Four were new**: the founder narrative, the founder's name, the
// milestone arc, and the company values. The other eight — the licensing
// sentence, the clearance, the India regulatory position — are already on the
// site, most of them on three pages.
//
// Spec §9.5 assigns the hub "who Akshar Byonyks is, the licensing relationship
// per §3.1, links to the three children" and puts the founder narrative on
// `/about-us/our-story/`. Built literally, the hub would have been made almost
// entirely of the eight facts that already exist, with the four that do not on
// a page behind it. That is `/manufacturing/` again, and the measurement caught
// it this time before the code existed rather than after.
//
// So: **one page, carrying the story.** `/about-us/our-story/` is not built,
// because this is it. `/about-us/leadership/` is not built because Open
// Question 1.4 is open and the five names are on the do-not-fabricate list —
// the page says so rather than routing to an empty one.
// `/about-us/careers/` is genuinely separate content (values, hiring process,
// departments grid) and is a later piece of work; nothing here links to it,
// because this repo has shipped links to unbuilt routes once already and does
// not intend to again.
//
// Surface rhythm: ink → surface-2 → background → surface-2 → background → ink.
// Two ink moments, opening and closing mass; no two adjacent sections share a
// ground. The quotation and the timeline both stay in the light — one is
// testimony and one is a record, and neither is the page's emotional peak in
// the way the Full-Bleed Rule reserves ink for.
export default function AboutPage() {
  return (
    <>
      <DirectionContract>{`
THESIS: the reader's real question is whether "licensed India partner of an
American company" covers something solid. Answer it in the first viewport, in
question-and-answer, including the half that is a no — a US clearance does not
carry into India.
OWN-WORLD: the documentary register applied to a company rather than a device.
An origin story set as a quotation with a name on it, and a timeline that
marks which of its dates a stranger can check.
STORY: the three questions; why the device exists, in its founder's words, and
why an Indian company exists to bring it here; how it reached clearance; who
is not named yet and why.
FIRST VIEWPORT: ink, and three questions with three answers — no scrolling
required to learn what the two companies are to each other.
FORM: a definition list as a hero, one attributed quotation, a rule-and-dates
timeline in two verification tiers, one honest pending block.
FINISH: the founder narrative is quoted and attributed, never adopted; the two
unsourced US claims on byonyks.com/about-us/ are cut rather than softened; the
imported statistic keeps its citation; and no structured-data property asserts
a founder or an address this project does not have.
`}</DirectionContract>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutHero />
      <OriginStory />
      <Milestones />
      <LeadershipPending />
      <KeepReading
        items={[
          {
            href: "/innovation/market",
            title: "The India market",
            body: "The case for home dialysis here, in sourced and dated figures — the distances, the out-of-pocket burden, and how little of India's dialysis happens at home.",
          },
          {
            href: "/innovation/the-x1-cycler",
            title: "The X-1 cycler",
            body: "The device itself: what is confirmed about the specification, its regulatory position in two jurisdictions, and the compliance record behind it.",
          },
        ]}
      />
      <CtaBand
        heading="Talk to Akshar Byonyks"
        body="Patient, clinician, investor, or distributor enquiry — we route it to the right person."
      />
    </>
  );
}
