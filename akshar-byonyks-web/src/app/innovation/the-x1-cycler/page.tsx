import type { Metadata } from "next";

import { DirectionContract } from "@/components/common/direction-contract";
import { X1Continue } from "@/components/innovation/x1-continue";
import { X1Features } from "@/components/innovation/x1-features";
import { X1Hero } from "@/components/innovation/x1-hero";
import { X1Ifu } from "@/components/innovation/x1-ifu";
import { X1Regulatory } from "@/components/innovation/x1-regulatory";
import { X1SpecTable } from "@/components/innovation/x1-spec-table";
import { CtaBand } from "@/components/sections/cta-band";
import { deviceName } from "@/lib/claims";
import { siteUrl } from "@/lib/site-config";

const path = "/innovation/the-x1-cycler";

const description =
  "Byonyks' automated peritoneal dialysis cycler: needle-free, warmed dialysate, battery backup. FDA 510(k) cleared May 2025 and licensed to Akshar Byonyks for India.";

// Spec §11.2: unique authored title and description, a canonical URL, hreflang
// from day one at a single locale, and per-page Open Graph imagery. The OG
// image is the same Byonyks product render the page itself uses — the only
// real device asset that exists (public/images/README.md).
export const metadata: Metadata = {
  title: "The X-1 automated peritoneal dialysis cycler",
  description,
  alternates: {
    canonical: path,
    languages: { "en-IN": path },
  },
  openGraph: {
    title: `${deviceName} | Akshar Byonyks`,
    description,
    url: path,
    type: "website",
    images: [
      {
        url: "/images/x1-apd-cycler.png",
        width: 910,
        height: 518,
        alt: "The Byonyks X-1 automated peritoneal dialysis cycler",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

// Spec §11.2 structured data. `MedicalDevice` names Byonyks USA as
// manufacturer and says nothing about Akshar Byonyks in that role — the same
// non-negotiable that governs the visible copy (src/lib/claims.ts) applies to
// the machine-readable version of it. Kept deliberately narrow: no property is
// asserted that this project cannot substantiate, and no schema.org enum is
// guessed at.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: `${deviceName} | Akshar Byonyks`,
  description,
  url: `${siteUrl}${path}`,
  mainEntity: {
    "@type": "MedicalDevice",
    name: deviceName,
    alternateName: "Byonyks X-1",
    description:
      "An automated peritoneal dialysis cycler for use at home, cleared by the US Food and Drug Administration under 510(k) in May 2025.",
    manufacturer: {
      "@type": "Organization",
      name: "Byonyks USA",
      url: "https://byonyks.com",
    },
  },
};

// §9.2 `/innovation/the-x1-cycler/` — the device page, and the site's content
// template. Section order: what it is (hero), what it does (features), what is
// confirmed (specification), where it stands legally (regulatory), what a
// clinician can ask for (IFU), where to go next (siblings), how to get in
// touch (CTA band).
//
// Surface rhythm alternates ink → background → surface-2 → background →
// surface-2 → background → ink, so no two adjacent sections share a ground and
// the page opens and closes on the two permitted full-bleed ink moments.
export default function X1CyclerPage() {
  return (
    <>
      <DirectionContract>{`
THESIS: on a cleared medical device, credibility comes from showing what is
confirmed and marking what is not. A specification table with four visible
gaps is worth more to a nephrologist or an investor than a complete-looking
one, because they can tell the difference.
OWN-WORLD: Home's token system spent flatter — ink at only the two permitted
full-bleed moments, primary blue as the sole chip color (no accent borrowed
for a meaning it does not carry), and the semantic pending amber doing real
work inside the specification rather than decorating an empty state.
STORY: what it is, what it does, what is confirmed, where it stands legally
in two separate jurisdictions, what a clinician can ask for, where to read
next.
FIRST VIEWPORT: ink hero; breadcrumb trail; the real Byonyks render beside
the headline, captioned as a render; the licensing sentence; the IFU request
as the primary action.
FORM: the content template — split-image hero, four-up feature grid,
attribute/value table, two-panel regulatory statement. This is the pattern
the remaining content pages compose from.
FINISH: no invented specification, no borrowed accent meaning, every
regulatory sentence imported from src/lib/claims.ts rather than written here.
`}</DirectionContract>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <X1Hero />
      <X1Features />
      <X1SpecTable />
      <X1Regulatory />
      <X1Ifu />
      <X1Continue />
      <CtaBand />
    </>
  );
}
