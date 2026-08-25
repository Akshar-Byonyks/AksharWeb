import Image from "next/image";
import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { licensingStatement } from "@/lib/claims";

// Spec §9.2: "Product page. Hero image of the actual device." The split-image
// hero variant (§7.2), deliberately not the video or statement variant — the
// device is the subject here, and the audience that matters most on this page
// (clinicians, investors) wants to see it immediately.
//
// No scrim rule to satisfy: the §7.3 requirement applies to text placed over
// imagery, and this variant sets the type beside the image, not on it.
//
// Ink at full section coverage. DESIGN.md's Full-Bleed Rule allows exactly
// two such moments per page — the opening and the closing mass — and this
// page spends them the same way Home does. Home's silk shader is *not*
// reused: that is Home's one authored focal moment, and repeating it here
// would spend a signature on a page that does not need it.
export function X1Hero() {
  return (
    <section aria-labelledby="x1-hero-heading" className="bg-ink">
      <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <Breadcrumbs
          tone="dark"
          items={[
            // No `href` on Innovation: `/innovation/` is not built yet, so
            // the crumb renders as text rather than as a link to a 404. Add
            // `href: "/innovation"` when the hub ships.
            { name: "Innovation" },
            { name: "The X-1 cycler" },
          ]}
        />

        <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1
              id="x1-hero-heading"
              className="max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              The X-1 automated peritoneal dialysis cycler
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              An automated peritoneal dialysis machine built to run the
              exchange cycle at home, overnight, without needles.{" "}
              {licensingStatement}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-auto min-h-11 shrink min-w-0 py-2.5 px-6 text-base whitespace-normal bg-accent-gold text-ink hover:bg-accent-gold/85"
              >
                {/* §9.2's "IFU request CTA". The query parameter pre-selects
                    the enquiry type on the contact form (§9.8) once that page
                    exists; it is inert until then, and harmless. */}
                <Link href="/contact?enquiry=clinician">
                  Request the Instructions for Use
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-auto min-h-11 shrink min-w-0 py-2.5 px-6 text-base whitespace-normal border-white/45 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="#specification">See the specification</Link>
              </Button>
            </div>
          </div>

          <figure>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image
                src="/images/x1-apd-cycler.png"
                alt="The Byonyks X-1 automated peritoneal dialysis cycler, a compact bedside machine with its screen powered on"
                width={910}
                height={518}
                priority
                className="h-auto w-full"
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </div>
            <figcaption className="mt-3 text-sm text-white/60">
              Official product render, courtesy of Byonyks USA. A render, not
              a photograph — no photography of the physical device exists yet.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
