import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ClinicalLayer } from "@/components/innovation/clinical-layer";
import { InViewStage } from "@/components/innovation/in-view-stage";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { deviceName } from "@/lib/claims";

// The section that connects this page to the rest of the site. Until it
// existed, nothing anywhere explained why an automated cycler is a product at
// all — the X-1 page opens on a machine whose job the reader has not been told
// about, and Home compares "the clinic" with "home" without ever naming what
// runs at home. Two sentences of category context do that work.
//
// PRODUCT.md's tone rule for the patient register is explicit that "modality"
// is never used without explaining it. The same applies to the acronyms: CAPD
// and APD both appear expanded first, because a reader will meet both at their
// clinic and the site is the wrong place to learn them for the first time as
// initials.
//
// The figure (27 Aug 2026) is the page's payoff and the reason this section is
// no longer two paragraphs. The difference between the two routes is not
// really clinical for a patient reading this page — it is *when*, and when is
// a thing you can draw. Two strips of the same twenty-four hours: the work
// scattered through the waking half on one, gathered into the sleeping half on
// the other. Nobody has to be told what that means, which is why the copy
// beneath it no longer has to try.
//
// Every number is refused. Exchange counts and timings are a prescription, and
// PRODUCT.md bars inventing one — so the strips carry no axis, no clock and no
// count that the caption does not immediately disown, and the marks are
// positioned to read as "several, spread out" versus "one, together" rather
// than as data.

const DAY_END = 213; // of 320 — roughly two thirds waking, one third asleep.
const STRIP_W = 320;
const STRIP_H = 44;
const MARK_Y = 13;
const MARK_H = 18;

// Where the manual exchanges fall on the waking strip. Four marks, evenly
// spread: enough to read as a rhythm that interrupts the day, and deliberately
// not a claim about how many a given person does.
// Evenly padded against both ends of the waking strip (30 units of clear
// space before the first mark and after the last). At the first spacing the
// four sat in the left two thirds and left a gap against nightfall, which read
// as a claim that exchanges stop in the evening — a schedule statement, from a
// figure that is not allowed to make one.
const MANUAL_MARKS = [30, 78, 126, 174];

function DayNightStrip({
  variant,
  title,
}: {
  variant: "manual" | "automated";
  title: string;
}) {
  const clipId = `pd-strip-${variant}`;
  return (
    <svg
      viewBox={`0 0 ${STRIP_W} ${STRIP_H}`}
      className="h-auto w-full max-w-md"
      role="img"
      aria-label={title}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={STRIP_W} height={STRIP_H} rx="8" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <rect
          x="0"
          y="0"
          width={DAY_END}
          height={STRIP_H}
          className="fill-surface-3"
        />
        <rect
          x={DAY_END}
          y="0"
          width={STRIP_W - DAY_END}
          height={STRIP_H}
          className="fill-ink"
        />

        {variant === "manual"
          ? MANUAL_MARKS.map((x, index) => (
              <rect
                key={x}
                x={x}
                y={MARK_Y}
                width="9"
                height={MARK_H}
                rx="3"
                className="pd-mark fill-primary-aa"
                // Inline, because the stagger is per-mark and the rule in
                // globals.css is per-class. An inline delay with no
                // animation-name to attach to is inert, so this stays
                // harmless under reduced motion and with no JavaScript.
                style={{ animationDelay: `${240 + index * 160}ms` }}
              />
            ))
          : (
            <rect
              x="226"
              y={MARK_Y}
              width="80"
              height={MARK_H}
              rx="6"
              className="pd-band fill-primary-aa"
            />
          )}
      </g>

      {/* The strip's own edge, drawn over the fills rather than as a border on
          the wrapper, so the rounded corners of the clip and the stroke are
          the same geometry and cannot disagree by a subpixel. */}
      <rect
        x="0.75"
        y="0.75"
        width={STRIP_W - 1.5}
        height={STRIP_H - 1.5}
        rx="7.5"
        fill="none"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        className="stroke-line"
      />
    </svg>
  );
}

const routes = [
  {
    variant: "manual" as const,
    term: "Continuous ambulatory peritoneal dialysis (CAPD)",
    strip: "A day divided into waking and sleeping hours, with several separate exchanges marked across the waking part.",
    definition:
      "The exchanges are done by hand, several times through the day, using gravity and a bag. There is no machine. Each one takes some of the day.",
  },
  {
    variant: "automated" as const,
    term: "Automated peritoneal dialysis (APD)",
    strip: "The same day, with one continuous block of treatment marked across the sleeping part and nothing in the waking part.",
    definition:
      "A machine called a cycler performs the exchanges, usually overnight while the patient sleeps. The daytime hours are left free of exchanges.",
  },
];

export function ByHandOrMachine() {
  return (
    <section aria-labelledby="pd-routes-heading" className="bg-surface-2">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <ScrollReveal>
            <div className="lg:sticky lg:top-24">
              <h2
                id="pd-routes-heading"
                className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
              >
                By hand, or by machine
              </h2>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                The three steps are the same either way. What changes is who
                performs them, and when.
              </p>
            </div>
          </ScrollReveal>

          <div>
            {/* One stage around both strips, not one each: they play together
                so the reader sees "several times, through the day" and "once,
                at night" arrive side by side. That simultaneity is the whole
                comparison — staggering them would turn an argument into two
                separate facts. */}
            <InViewStage>
              <dl>
                {routes.map(({ variant, term, strip, definition }, index) => (
                  <ScrollReveal key={term} delayMs={index * 90}>
                    <div className="border-t border-line py-7 first:border-t-0 first:pt-0 sm:py-8">
                      <dt className="text-lg font-semibold text-ink">{term}</dt>
                      <dd className="mt-5 max-w-md">
                        <DayNightStrip variant={variant} title={strip} />
                        {/* The two words that make the strip readable. In flow
                            beneath it rather than inside it: at 200% text an
                            SVG label would either overflow the strip or be
                            scaled down out of legibility, and this figure is
                            small enough that there is no room for either. */}
                        <span
                          aria-hidden="true"
                          className="mt-2 grid grid-cols-[213fr_107fr] text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                        >
                          <span>Day</span>
                          <span>Night</span>
                        </span>
                      </dd>
                      <dd className="mt-5 max-w-2xl text-base text-muted-foreground">
                        {definition}
                      </dd>
                    </div>
                  </ScrollReveal>
                ))}
              </dl>
            </InViewStage>

            <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
              Illustrative. How many exchanges a person does, and when, is a
              prescription set by their nephrologist &mdash; not a property of
              either route.
            </p>

            <ScrollReveal delayMs={180}>
              {/* The one place on this page that names the product. It sits
                  after the category explanation rather than before it, which
                  is the whole argument for the section: a reader who does not
                  know what a cycler is has no way to evaluate a page about
                  one. */}
              <div className="mt-8 border-t border-line pt-8">
                <p className="max-w-2xl text-lg text-foreground">
                  The {deviceName} is an APD cycler. It runs the exchanges
                  overnight, at home, warming the fluid to body temperature
                  before each fill.
                </p>
                <Link
                  href="/innovation/the-x1-cycler"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  See the X-1 cycler
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              </div>

              <ClinicalLayer summary="Where the choice between the two comes from">
                <p>
                  APD covers continuous cycling peritoneal dialysis and its
                  variants, with or without a daytime dwell. The choice between
                  CAPD and APD, and the prescription within either, follows
                  from membrane transport characteristics, residual kidney
                  function, target clearance and ultrafiltration, and the
                  patient&rsquo;s own circumstances — not from the equipment
                  available.
                </p>
              </ClinicalLayer>
            </ScrollReveal>
          </div>
        </div>

        {/* The device where the therapy actually happens (28 Aug 2026).
            Byonyks USA's own photograph of the X-1 on a side table in a living
            room — the manufacturer's asset for the device Akshar Byonyks is
            licensed to bring here, so provenance is the same as the render on
            the X-1 page.

            It earns a place on *this* page rather than that one because it is
            not a product shot. It is a picture of a person doing something
            else while the machine works, which is the only claim this section
            makes about a cycler and the hardest one to make in words.

            Two flags recorded in `public/images/README.md` and both for the
            launch gate: the subject is not Indian, which PRODUCT.md would
            replace rather than keep; and it depicts a person with a medical
            device, which the Drugs and Magic Remedies Act 1954 constrains.
            Shipping it was an explicit client decision after the risk was
            raised, and it needs legal sign-off rather than a designer's. */}
        <ScrollReveal>
          <figure className="mt-16">
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-line sm:aspect-[2/1]">
              <Image
                src="/images/x1-in-home.jpg"
                alt="A cycler on a side table in a living room, its screen showing a setup step, tubing coiled beside it. A man sits on the sofa alongside with a laptop and a mug."
                fill
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              The X-1 in a home, photographed by Byonyks. The therapy runs on a
              schedule set with a nephrologist; what the machine changes is
              where the person has to be while it does.
            </figcaption>
          </figure>
        </ScrollReveal>
      </div>
    </section>
  );
}
