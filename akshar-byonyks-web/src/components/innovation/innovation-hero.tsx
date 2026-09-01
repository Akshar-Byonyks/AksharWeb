import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ScrimmedImage } from "@/components/common/scrimmed-image";
import { licensingStatement, usRegulatoryStatement } from "@/lib/claims";

// Spec §9.2: "`/innovation/` Mission statement, four-benefit summary, links to
// the four children, India context block, CTA."
//
// The hub existed as a nav item and a breadcrumb position for the whole build
// and never as a page, which is why `/products/the-x1-cycler/` shipped with
// an unlinked "Innovation" crumb and a code comment promising to link it when
// the hub arrived. This is that page; both crumbs now resolve.
//
// IMAGE ADDED 28 Aug 2026. This was a statement hero with no image, on the
// reasoning that the site had exactly one real device asset and the X-1 page
// was where it belonged. That reasoning still holds for the *device* — the
// render is not repeated here — but it was answering the wrong question. What
// a section front door needs is not a product shot; it is a picture of the
// place the technology has to reach. An aerial of one real village, road
// running through it, is that, and it is also the closest this project comes
// to a map without drawing a boundary from memory (see `figures.ts`).
//
// Two ink moments on this page, not three: the opening and the closing mass.
// DESIGN.md is explicit that three is a ceiling and never a target, and a hub
// whose whole content is a mission statement and four doorways has no third
// thing worth saying in ink.
export function InnovationHero() {
  return (
    <section
      aria-labelledby="innovation-hero-heading"
      className="relative isolate bg-ink"
    >
      <ScrimmedImage
        src="/images/india-village-road-aerial.jpg"
        alt="An aerial view of a highway running through an Indian village, houses and temples along one side and farmland along the other."
        priority
        objectPosition="center 35%"
      />
      <div className="relative mx-auto max-w-[1280px] px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <Breadcrumbs tone="dark" items={[{ name: "Innovation" }]} />

        <div className="mt-10 lg:mt-14">
          <h1
            id="innovation-hero-heading"
            className="max-w-3xl text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
          >
            Proven home dialysis technology, licensed for India
          </h1>
          {/* The mission statement §9.2 asks for, taken from PRODUCT.md's
              Positioning rather than redrafted: Indian company, Indian team,
              Indian market, proven global technology. The access-geometry
              argument that follows from it is the next-but-one section, not
              this paragraph — the hub says who this is and what is here, and
              the argument gets a section of its own where it can be made
              properly. */}
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            An Indian company, an Indian team and an Indian market, built on
            technology that is already cleared and proven elsewhere. This
            section covers the therapy, the device that automates it, and the
            case for both in India.
          </p>
          <p className="mt-5 max-w-2xl text-base text-white/60">
            {licensingStatement} {usRegulatoryStatement}
          </p>
        </div>
      </div>
    </section>
  );
}
