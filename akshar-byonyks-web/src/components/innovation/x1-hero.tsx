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
// Rebuilt 26 Aug 2026. The render used to sit in the right half of a two-column
// split, boxed in a rounded card with a white/5 backing plate, about 560px
// wide. The sitewide critique found it was the only real product asset on the
// site and was being shown at roughly a quarter of its potential. It is now the
// hero's payoff at full container width, with one annotation.
//
// Stacked rather than split for that reason: a two-column hero caps the device
// at half the viewport, which is the constraint being removed. The type block
// keeps its own measure above it.
//
// Ink at full section coverage. DESIGN.md's Full-Bleed Rule, revised 26 Aug
// 2026, allows up to three such moments per page; this page spends them on the
// opening, the clinician IFU request, and the closing mass. Home's silk shader
// is *not* reused: that is Home's one authored focal moment, and repeating it
// here would spend a signature on a page that does not need it.
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

        <div className="mt-10 lg:mt-14">
          <h1
            id="x1-hero-heading"
            className="max-w-3xl text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
          >
            The X-1 automated peritoneal dialysis cycler
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            An automated peritoneal dialysis machine built to run the exchange
            cycle at home, overnight, without needles. {licensingStatement}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-auto min-h-11 shrink min-w-0 bg-accent-gold px-6 py-2.5 text-base whitespace-normal text-ink hover:bg-accent-gold/85"
            >
              {/* §9.2's "IFU request CTA". The query parameter pre-selects
                  the enquiry type on the contact form (§9.8). */}
              <Link href="/contact?enquiry=clinician">
                Request the Instructions for Use
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-auto min-h-11 shrink min-w-0 border-white/45 bg-transparent px-6 py-2.5 text-base whitespace-normal text-white hover:bg-white/10"
            >
              <Link href="#specification">See the specification</Link>
            </Button>
          </div>
        </div>

        <AnnotatedDevice />
      </div>
    </section>
  );
}

// The render's source PNG carries a genuine alpha channel (DESIGN.md records
// that this was confirmed by pixel-sampling, not assumed), so it sits directly
// on the ink ground with no backing plate. The old bordered card and white/5
// plate are gone for the same reason DESIGN.md gives for the Home scene card:
// a backing plate behind a cut-out render reads as a sticker.
//
// The overlay and the image share one 910x518 aspect ratio and both scale with
// the container, so the callout's anchor stays on the screen at every width
// without a resize listener or a magic breakpoint.
const ART_W = 910;
const ART_H = 518;

// Centre of the white "Welcome / Press Start" display in the source render.
const SCREEN_X = 262;
const SCREEN_Y = 200;

// Where the leader drops out of the frame, and therefore where the label below
// it starts. Chosen to clear the machine's lower-left body rather than to look
// tidy in the abstract.
const LEADER_X = 110;

// ONE annotation, not four. The obvious version of this is an exploded diagram
// with leader lines to the fluid warmer, the battery and the catheter port —
// and it would be fabricated, because none of those is visible or identifiable
// in the render. PRODUCT.md's "nothing extrapolated from the render" governs.
// The on-device screen IS visible and unambiguous, so exactly one callout is
// drawn, to the one thing that can be pointed at honestly. The other three
// features are set as type in the section below, not annotated onto the image.
function AnnotatedDevice() {
  return (
    <figure className="relative mt-14 w-full lg:mt-20">
      <div className="relative" style={{ aspectRatio: `${ART_W} / ${ART_H}` }}>
        <Image
          src="/images/x1-apd-cycler.png"
          alt="The Byonyks X-1 automated peritoneal dialysis cycler, a compact bedside machine with its on-device screen showing a welcome message and a start control"
          width={ART_W}
          height={ART_H}
          priority
          className="h-full w-full object-contain"
          sizes="(min-width: 1280px) 1216px, 100vw"
        />

        {/* Decorative reinforcement only: the fact it points at is stated in
            full in the "Run from the machine itself" entry in the section
            below, so hiding the whole leader under lg costs no information.
            Below that width the line would cross most of the machine to reach
            a label with nowhere to sit.

            The leader exits the frame rather than terminating beside the
            screen. The first build put the label in the top-left corner and
            its second line ran straight into the machine's white body and
            vanished — white type on a white render. There is no region of this
            frame both empty enough and wide enough to hold a label, so the
            label lives in flow below the image where the space is guaranteed,
            and the line travels to meet it. Most of that travel is across the
            black fascia, where gold reads at full strength. */}
        <svg
          viewBox={`0 0 ${ART_W} ${ART_H}`}
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          fill="none"
          aria-hidden="true"
        >
          <path
            d={`M${SCREEN_X} ${SCREEN_Y} L${LEADER_X} 460 L${LEADER_X} ${ART_H}`}
            stroke="currentColor"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
            className="text-accent-gold"
          />
          <circle cx={SCREEN_X} cy={SCREEN_Y} r="5" className="fill-accent-gold" />
        </svg>
      </div>

      <p
        className="mt-4 hidden max-w-xs text-sm font-semibold text-white lg:block"
        style={{ marginInlineStart: `${(LEADER_X / ART_W) * 100}%` }}
      >
        The on-device screen
        <span className="mt-0.5 block font-normal text-white/65">
          Every night&rsquo;s treatment is started here.
        </span>
      </p>

      <figcaption className="mt-6 max-w-2xl text-sm text-white/60">
        Official product render, courtesy of Byonyks USA. A render, not a
        photograph &mdash; no photography of the physical device exists yet.
      </figcaption>
    </figure>
  );
}
