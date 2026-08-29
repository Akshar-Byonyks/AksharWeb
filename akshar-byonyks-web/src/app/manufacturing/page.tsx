import type { Metadata } from "next";

import { DirectionContract } from "@/components/common/direction-contract";
import { ComplianceRegister } from "@/components/manufacturing/compliance-register";
import { IndiaHubs } from "@/components/manufacturing/india-hubs";
import { ManufacturingHero } from "@/components/manufacturing/manufacturing-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { KeepReading } from "@/components/sections/keep-reading";
import { deviceName } from "@/lib/claims";
import { fda510k } from "@/lib/compliance";
import { siteUrl } from "@/lib/site-config";

const path = "/manufacturing";

const description =
  "Who manufactures the X-1 cycler, the certifications behind it, and what can be independently verified — FDA 510(k) K243371, ISO 13485, and the India hubs under construction.";

export const metadata: Metadata = {
  title: "Manufacturing and quality",
  description,
  alternates: {
    canonical: path,
    languages: { "en-IN": path },
  },
  openGraph: {
    title: "Manufacturing and quality | Akshar Byonyks",
    description,
    url: path,
    type: "website",
  },
  twitter: { card: "summary" },
};

// Structured data, kept as narrow as the visible copy.
//
// No `Certification` type and no invented enum: schema.org's certification
// vocabulary is newer than the rest of what this site emits and most of the
// entries on this page have no certificate number to put in it, so asserting
// them as machine-readable certifications would claim more than the page does.
// `PropertyValue` states the one number that is real, points at the register
// that holds it, and guesses nothing.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Manufacturing and quality | Akshar Byonyks",
  description,
  url: `${siteUrl}${path}`,
  about: {
    "@type": "MedicalDevice",
    name: deviceName,
    manufacturer: {
      "@type": "Organization",
      name: "Byonyks",
      url: "https://byonyks.com",
    },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "FDA 510(k) premarket notification number",
      value: fda510k.kNumber,
      url: fda510k.url,
    },
  },
};

// §9.4 `/manufacturing/`. The third nav item, and the page spec F-1 calls the
// hardest problem in the whole document.
//
// F-1, in one line: remove the Pakistan operation from the story and this page
// has no facility to show, which makes "a manufacturing page with no
// manufacturing worse than no manufacturing page at all." The resolution taken
// on 20 Aug 2026 was to attribute every proof point to Byonyks and never to a
// country. What that resolution does not do by itself is tell you what the
// page *is*, and the answer this build gives is: it is not a facility tour, it
// is a chain of custody. Who makes the device, what standard it is made to,
// which of those claims can be checked by a stranger, and what Akshar Byonyks
// is building — in that order, because that is the order the claims weaken in.
//
// THE 510(k) NUMBER ARRIVED WITH THIS PAGE. Spec §9.4 asks for it; it had been
// a pending note on `/innovation/the-x1-cycler/` since that page was built.
// 510(k) decisions are public, the FDA publishes an API, and the record is
// `K243371`. Reading it also settled a sitewide wording question the site had
// been getting slightly wrong — see `src/lib/claims.ts` and `deviations.md`.
//
// Surface rhythm: ink → white → surface-2 → white → ink. Two ink moments,
// opening and closing mass, and the compliance register deliberately not one
// of them. The Full-Bleed Rule assigns white to evidence, regulation and
// specification precisely so a certification band is not styled as persuasion,
// and this page is where that rule earns its keep.
export default function ManufacturingPage() {
  return (
    <>
      <DirectionContract>{`
THESIS: Akshar Byonyks has no factory, and a manufacturing page that pretends
otherwise fails the first diligence question asked of it. So this page is a
chain of custody instead of a facility tour — and the one thing it can offer
that byonyks.com does not is a number a stranger can look up.
OWN-WORLD: the documentary register at its most literal. A register split in
two by how much the reader has to take on trust, in the same hairline grammar
as the specification table and the proof band.
STORY: who makes the X-1; what is on the public record; what Byonyks states;
what is being built in India and what is genuinely not decided about it.
FIRST VIEWPORT: ink, the question as the headline, and the three-party chain
— Byonyks manufactures, Akshar Byonyks is licensed, India is being
established — so the relationship cannot be misread from the nav label.
FORM: statement hero on ink, one verified credential given display weight
against five attributed ones in a hairline list, two honest pending cards,
and a print stylesheet so the page can be attached to a tender.
FINISH: no facility photography of a facility that does not exist; every
certification labelled with who states it; the missing certificate numbers
named one by one rather than glossed; and no claim about where anything is
made, in either direction.
`}</DirectionContract>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ManufacturingHero />
      <ComplianceRegister />
      <IndiaHubs />
      {/* Neither belongs in a printed annexe: one is navigation, the other
          is an invitation. `data-print-hidden` is read by the print block in
          globals.css. */}
      <div data-print-hidden>
        <KeepReading
          items={[
            {
              href: "/innovation/the-x1-cycler",
              title: "The X-1 cycler",
              body: "The device itself — what is confirmed about the specification, and what Byonyks has not published yet.",
            },
            {
              href: "/innovation/market",
              title: "The India market",
              body: "Why a home therapy matters here: the distances, the out-of-pocket burden, and India's share of dialysis done at home.",
            },
          ]}
        />
        <CtaBand
          heading="Partnership and supply enquiries"
          body="Distributor, hospital procurement, or investor — including requests for the certificates named on this page."
        />
      </div>
    </>
  );
}
