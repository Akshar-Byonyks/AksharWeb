import type { Metadata } from "next";

import { DirectionContract } from "@/components/common/direction-contract";
import { InnovationDoorways } from "@/components/innovation/innovation-doorways";
import { InnovationHero } from "@/components/innovation/innovation-hero";
import { InnovationIndiaContext } from "@/components/innovation/innovation-india-context";
import { CtaBand } from "@/components/sections/cta-band";
import { siteUrl } from "@/lib/site-config";

const path = "/innovation";

const description =
  "Home peritoneal dialysis for India: the therapy explained, the FDA-cleared X-1 cycler that automates it, and why removing the trip to a dialysis centre matters more here.";

export const metadata: Metadata = {
  title: "Innovation",
  description,
  alternates: {
    canonical: path,
    languages: { "en-IN": path },
  },
  openGraph: {
    title: "Innovation | Akshar Byonyks",
    description,
    url: path,
    type: "website",
  },
  twitter: { card: "summary" },
};

// `CollectionPage`, not `MedicalWebPage`: this page routes, it does not make a
// medical statement of its own. `hasPart` lists only children that exist —
// pointing structured data at an unbuilt route is the same mistake the
// breadcrumb component refuses to make. All three now do (28 Aug 2026);
// `/innovation/whats-next/` still does not and is still absent.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Innovation | Akshar Byonyks",
  description,
  url: `${siteUrl}${path}`,
  hasPart: [
    {
      "@type": "WebPage",
      name: "The X-1 automated peritoneal dialysis cycler",
      url: `${siteUrl}/innovation/the-x1-cycler`,
    },
    {
      "@type": "WebPage",
      name: "How peritoneal dialysis works",
      url: `${siteUrl}/innovation/how-it-works`,
    },
    {
      "@type": "WebPage",
      name: "The India market",
      url: `${siteUrl}/innovation/market`,
    },
  ],
};

// §9.2 `/innovation/`. The section hub — the nav item and the breadcrumb
// position that both existed before the page did.
//
// Deliberately short. A hub's failure mode is becoming a summary of its own
// children, at which point a reader has no reason to open any of them and the
// site says everything twice. Three sections: who this is, what is here, and
// the one argument that belongs to the section rather than to any single page
// inside it.
//
// Two ink moments, not three (DESIGN.md: three is a ceiling, never a target).
// `leadIn` is `bg-surface-2` because the India context section above the
// closing mass is tinted, and the silhouette is drawn against whatever ground
// actually precedes it.
export default function InnovationPage() {
  return (
    <>
      <DirectionContract>{`
THESIS: a hub earns its place by routing and by carrying the one argument that
belongs to the section rather than to any page in it — not by summarising its
children until nobody needs to open them.
OWN-WORLD: the same token system at its quietest. One ink opening, one closing
mass, no accent spent anywhere, and the only visual language on the page is
three hairline marks, each a compression of the figure its child draws at full
size.
STORY: who this is, what is in the section, and why the argument lands
differently in India than in the market the technology was cleared in.
FIRST VIEWPORT: ink; the breadcrumb finally resolving; the mission statement;
the licensing and clearance sentences at their gated wording.
FORM: statement hero, three navigational doorway cards, single-measure prose.
FINISH: no figure without a source, no benefit restated for the third time,
and no evidence held at this altitude that belongs to a child page.
`}</DirectionContract>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InnovationHero />
      <InnovationDoorways />
      <InnovationIndiaContext />
      <CtaBand leadIn="bg-surface-2" />
    </>
  );
}
