import Image from "next/image";
import Link from "next/link";
import {
  Ban,
  BatteryCharging,
  MonitorCog,
  Syringe,
  Thermometer,
} from "lucide-react";

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
            // "Products" since 1 Sep 2026, when the page moved out of
            // /innovation. The crumb follows the URL, always — a trail that
            // names a section the path does not contain is worse than no
            // trail, because it is confidently wrong about where you are.
            { name: "Products", href: "/products" },
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

        <DeviceFrames />
      </div>
    </section>
  );
}

// TWO FRAMES: THE DEVICE, AND WHAT IT IS BUILT TO DO. Rebuilt 31 Aug 2026,
// replacing a single full-container render that carried one gold leader line.
//
// THE LEADER LINE IS GONE BECAUSE IT WAS DECORATION SHAPED LIKE INFORMATION.
// It travelled roughly 700px diagonally across the machine to report that the
// on-device screen is where a session is started — pointing at a screen with
// the word "Start" printed on it, and restating "Run from the machine itself"
// from the section directly below. The earlier reasoning for drawing only one
// callout was right (nothing else in this render is honestly identifiable, and
// inventing a warmer or a battery to point at was correctly refused); the
// conclusion should have been not to annotate at all.
//
// THE RENDER IS NO LONGER BLOWN UP. Its source is 910px wide and it was being
// displayed at 1216px — a 1.34x upscale, which is why the on-screen text read
// as soft. Nothing else on this page is stretched past its own resolution.
// Each frame is now about 596px at the widest breakpoint, inside the render's
// native width, so it is never asked to be larger than it is.
//
// THE SECOND FRAME IS LINE ART, AND THE PREVIOUS TWO ATTEMPTS AT IT ARE WHY.
// A photograph of the device in a home was tried first and rejected on sight:
// the only frame available without an identifiable face reduced to a
// disembodied forearm holding a mug, and the subject was a Western man on an
// India-market site. Before that, the frame did not exist at all and the
// render was annotated instead. Line art is DESIGN.md's documented fallback
// for exactly this position — a subject with no usable photograph — and this
// page already has a precedent for it in the sitewide scene components.
//
// LUCIDE, NOT THE NOUN PROJECT, though the register requested was the latter's.
// The two look alike (single stroke weight, open counters, no fill), but Noun
// Project glyphs are overwhelmingly CC BY: each one shipped would owe a visible
// per-icon credit, and a second icon family beside the lucide set already used
// on every other page of this site would read as two hands. Same look, MIT
// licence, already in the bundle, nothing new to attribute.
//
// AT ILLUSTRATION SCALE, AND WITHOUT CARDS, which is what keeps this from
// reintroducing the pattern `x1-features.tsx` deliberately removed. That
// section dropped its icons for two stated reasons: the craft floor names
// "same-size cards of icon plus heading plus text" as the lazy container, and a
// 20px chip beside a 16px heading carried no visual weight. Neither applies
// here. These are 48px marks with no border, no plate and no card around them,
// standing as the artwork rather than decorating a heading.
//
// Every glyph is `aria-hidden` and every one is labelled in text beside it, so
// no meaning is carried by a picture alone.
const ART_W = 910;
const ART_H = 518;

// The four features from spec §9.2, and no others — the same four the section
// below sets out in prose, and each one already backed by the specification
// table. The marks are the index; the prose is the explanation. Nothing here
// introduces a fact the page does not already make and support elsewhere.
const MARKS = [
  { Icon: Thermometer, label: "Warmed dialysate" },
  { Icon: Syringe, label: "Needle-free", negated: true },
  { Icon: BatteryCharging, label: "Battery backup" },
  { Icon: MonitorCog, label: "On-device control" },
];

function DeviceFrames() {
  return (
    <figure className="mt-14 w-full lg:mt-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-6">
        <div>
          {/* No plate and no frame. The PNG carries a genuine alpha channel
              (DESIGN.md records that as pixel-sampled, not assumed), so the
              render sits straight on the ink — a backing plate behind a cut-out
              reads as a sticker. */}
          <div className="relative" style={{ aspectRatio: `${ART_W} / ${ART_H}` }}>
            <Image
              src="/images/x1-apd-cycler.png"
              alt="The Byonyks X-1 automated peritoneal dialysis cycler, a compact bedside machine with its on-device screen showing a welcome message and a start control"
              width={ART_W}
              height={ART_H}
              priority
              className="h-full w-full object-contain"
              sizes="(min-width: 1280px) 596px, (min-width: 1024px) 47vw, 100vw"
            />
          </div>
          <FrameCaption
            title="The device"
            body="Byonyks USA's official product render, at its own resolution — a render, not a photograph."
          />
        </div>

        <div>
          {/* The render's aspect box, but only from lg — where the two frames
              actually share a row and have to match. Stacked, there is nothing
              to align with, and a fixed aspect there would be a height a label
              could overflow: at 200% text these wrap to two lines and the grid
              grows past 518/910 of its own width. Padding takes over instead. */}
          <div className="flex items-center py-6 lg:aspect-[910/518] lg:py-0">
            <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-10 text-center">
              {MARKS.map(({ Icon, label, negated }) => (
                <li key={label} className="flex flex-col items-center gap-3">
                  {negated ? (
                    // "Needle-free" is the one claim that is an absence, and an
                    // absence has no glyph of its own. A syringe inside the
                    // standard prohibition ring is the ordinary way to draw one
                    // — kept monochrome rather than red, so it reads as
                    // "without" and not as a warning.
                    <span
                      aria-hidden="true"
                      className="relative inline-flex size-12 shrink-0 items-center justify-center text-white/85"
                    >
                      <Ban className="absolute inset-0 size-12" strokeWidth={1.25} />
                      <Icon className="size-6" strokeWidth={1.5} />
                    </span>
                  ) : (
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      // `size-*` is rem-based, so at 200% text these decorative
                      // glyphs would double and push a 320px viewport sideways.
                      // They are illustration, not type: capping the rendered
                      // box keeps the reflow clean, the same fix the home scene
                      // needed for its own large glyph.
                      className="size-12 max-h-[18vw] max-w-[18vw] shrink-0 text-white/85 sm:max-h-none sm:max-w-none"
                    />
                  )}
                  <span className="text-sm font-semibold text-balance text-white">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <FrameCaption
            title="What it is built to do"
            body="Four things, each one set out in full in the section below and carried in the specification after it."
          />
        </div>
      </div>

    </figure>
  );
}

function FrameCaption({ title, body }: { title: string; body: string }) {
  return (
    // Not a `figcaption`: there is one figure here, and nesting a figure per
    // frame to earn a second one would be markup written to satisfy a rule
    // rather than a reader. The provenance the render's caption carries is the
    // part that has to survive, and it does.
    <p className="mt-4 text-sm font-semibold text-white">
      {title}
      <span className="mt-1 block font-normal text-white/65">{body}</span>
    </p>
  );
}
