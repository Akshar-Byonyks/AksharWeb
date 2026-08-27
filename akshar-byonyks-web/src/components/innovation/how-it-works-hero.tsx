import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { notMedicalAdvice } from "@/lib/claims";

// Spec §9.2, `/innovation/how-it-works/`. The statement hero, not the
// split-image variant the X-1 page uses: there is no device on this page and
// no rights-clear image of the therapy, and DESIGN.md bars fabricated clinical
// imagery. The one figure this page has is the exchange diagram, and it is
// authored line art placed where it belongs — in the section that explains it.
//
// Ink at full section coverage, the first of this page's three permitted
// moments (DESIGN.md, the Full-Bleed Rule as revised 26 Aug 2026). The other
// two are the exchange cycle and the closing mass.
//
// The Drugs and Magic Remedies (Objectionable Advertisements) Act 1954 line
// sits in the first viewport, not at the foot of the page. This is the site's
// most patient-facing surface — the one page whose whole subject is a medical
// therapy — so the statement that it is not medical advice is part of the
// opening, not a disclaimer swept to the bottom.
export function HowItWorksHero() {
  return (
    <section aria-labelledby="hiw-hero-heading" className="bg-ink">
      <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <Breadcrumbs
          tone="dark"
          items={[
            { name: "Innovation", href: "/innovation" },
            { name: "How it works" },
          ]}
        />

        <div className="mt-10 lg:mt-14">
          <h1
            id="hiw-hero-heading"
            className="max-w-3xl text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
          >
            How peritoneal dialysis works
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            Peritoneal dialysis cleans the blood inside the body, using the
            lining of the abdomen as the filter. It can be done at home. This
            page explains the therapy in everyday language, with a technical
            layer a clinician can open at each step.
          </p>
          <p className="mt-5 max-w-2xl text-base text-white/60">
            {notMedicalAdvice}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-auto min-h-11 shrink min-w-0 bg-accent-gold px-6 py-2.5 text-base whitespace-normal text-ink hover:bg-accent-gold/85"
            >
              <Link href="#the-exchange">Start with one exchange</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-auto min-h-11 shrink min-w-0 border-white/45 bg-transparent px-6 py-2.5 text-base whitespace-normal text-white hover:bg-white/10"
            >
              <Link href="/innovation/the-x1-cycler">See the X-1 cycler</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
