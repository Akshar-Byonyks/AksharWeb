import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { PERITONEAL_CAVITY } from "@/lib/figures";

// The hub's actual job: route. DESIGN.md's Hairline Row List rule converted
// most of the site's card grids to rows, and named the one exception —
// "the four audience doorways on Home… navigational rather than expository."
// These are the same kind of thing, so they stay cards. Unlike the audience
// cards they carry no accent tint: gold, teal and plum each mean something
// fixed sitewide and none of those meanings is "this is a page about the
// device."
//
// **All three children are now built and all three are links** (28 Aug 2026).
// `/innovation/market/` shipped, so the pending card that stood in its place —
// dashed border, empty frame, "In preparation" chip — is gone rather than
// softened into a link with a caveat. A pending treatment left standing over a
// page that exists is worse than the gap it was covering: it tells a reader
// the section is unfinished while the finished thing sits one click away.
//
// `/innovation/whats-next/` (spec §8.3: the X2 and X3 roadmap) is neither
// built nor in the nav, and is not shown at all. There is a difference between
// a page a visitor has been promised and one they have not.

// The marks (27 Aug 2026). The hub had no visual of any kind — a statement
// hero, three text cards and three paragraphs — and a section front door that
// is entirely type gives a reader nothing to aim at.
//
// One drawing language, shared with the exchange figure two clicks away: the
// same 160×150 box, the same 1.5px non-scaling hairline, the same small circle
// standing for the connection point. The therapy card draws the *actual*
// cavity path, imported rather than redrawn, so a reader who opens that door
// meets the mark again at full scale and moving. That recognition is the
// point, and a copied path could not deliver it — it would drift.
//
// No accent is spent on them. Primary blue is the workhorse here rather than
// an accent: none of gold's "home/India", teal's "clinical evidence" or plum's
// "institutional" describes what any of these three doors leads to, and
// DESIGN.md is explicit that a group of peers with no such meaning takes blue.
const MARK_VIEWBOX = "0 0 160 150";

function CyclerMark() {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className="h-auto w-14"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        x="44"
        y="30"
        width="72"
        height="66"
        rx="10"
        className="stroke-primary"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="57"
        y="43"
        width="46"
        height="24"
        rx="4"
        className="stroke-primary/55"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M80 96v20c0 12-14 14-26 14"
        className="stroke-primary"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx="50"
        cy="130"
        r="3.5"
        className="stroke-primary"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function TherapyMark() {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className="h-auto w-14"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d={PERITONEAL_CAVITY}
        className="stroke-primary"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M80 8V60"
        className="stroke-primary/55"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx="80"
        cy="8"
        r="3.5"
        className="stroke-primary/55"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// The market mark: two bars on a baseline, one an order of magnitude shorter
// than the other.
//
// It is the modality comparison that page's fourth leg is built on — India's
// share of dialysis patients on peritoneal dialysis against Guatemala's —
// abstracted to the one thing about it a reader needs to carry through a
// click. Same job the therapy mark does with the cavity path: meet the shape
// here, meet it at full size and with its numbers on the other side.
//
// It is not a map, here or there. The market page's own comment gives the
// reason at length; the short version is that this project draws no national
// boundary from memory.
function MarketMark() {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className="h-auto w-14"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M30 122h100"
        className="stroke-primary/55"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="54"
        y="104"
        width="22"
        height="18"
        className="stroke-primary"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="94"
        y="34"
        width="22"
        height="88"
        className="stroke-primary"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const built: { href: string; title: string; body: string; mark: ReactNode }[] = [
  {
    href: "/products/the-x1-cycler",
    title: "The X-1 cycler",
    body: "The device itself: what it does, its specification, and its regulatory position in the US and in India, including the rows that are not yet published.",
    mark: <CyclerMark />,
  },
  {
    href: "/innovation/how-it-works",
    title: "How peritoneal dialysis works",
    body: "The therapy in plain language: the peritoneum, the three steps of an exchange, and the difference between doing them by hand and by cycler. With a technical layer at each step.",
    mark: <TherapyMark />,
  },
  {
    href: "/innovation/market",
    title: "The India market",
    body: "The case in sourced and dated figures: the scale of kidney failure, how far patients travel for in-centre dialysis, what a session costs a household, and why India runs almost no home dialysis.",
    mark: <MarketMark />,
  },
];

export function InnovationDoorways() {
  return (
    <section
      aria-labelledby="innovation-doorways-heading"
      className="bg-background"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="innovation-doorways-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
            >
              What is in this section
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Start with the therapy if the words are new, or with the device
              if they are not. The market case is where the figures are, and
              every one of them carries its source.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {built.map(({ href, title, body, mark }, index) => (
            <ScrollReveal key={href} delayMs={index * 90}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-8"
              >
                {/* 250ms and 3px: this is feedback on a pointer entering a
                    door, not an event. Anything larger reads as the card
                    trying to be interesting; anything slower reads as lag.
                    The card's border already does the primary work. */}
                <span className="block transition-transform duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                  {mark}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 grow text-base text-muted-foreground">
                  {body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-base font-semibold text-primary group-hover:underline">
                  Read on
                  <ArrowRight
                    className="size-4 shrink-0 transition-transform duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
