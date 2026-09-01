import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { PendingChip } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { cn } from "@/lib/utils";
import type { Location } from "@/lib/locations";

// A register of sites, set as cards that open in place.
//
// CARDS HERE, AGAINST THE HAIRLINE ROW LIST RULE, ON REQUEST (1 Sep 2026).
// DESIGN.md §5 replaced four-up card grids across this site because one
// bordered rectangle had become its only compositional device, and the craft
// floor names "same-size cards of icon plus heading plus text as the page
// structure" as the lazy container. That rule is not being quietly ignored —
// it is being met on its own terms. The same entry carves out what stays a
// card: Home's audience doorways, "navigational rather than expository". These
// are the same kind of object. A card here is not a rectangle wrapped around
// static prose; it is a control with two states that a reader operates, and
// the thing the rule was written against — a page whose structure is a grid of
// inert boxes — is not what this is. Recorded in deviations.md §21.
//
// NATIVE <details>, NOT REACT STATE, following `clinical-layer.tsx` exactly.
// CLAUDE.md prefers the native element over a shadcn primitive over a
// hand-rolled control, and this is the case where native wins outright: it
// opens with no JavaScript, it is keyboard- and screen-reader-operable with no
// ARIA of our own, and it survives a failed client bundle. Every fact stays in
// the document whether or not the card is open, so a reader without JS, a
// crawler, and Ctrl+F all still find the Itasca address.
//
// AND NO MAP, WHICH IS NOT A STYLISTIC CHOICE. deviations.md §5 records the
// site reversing on exactly this: depicting India's national boundary is a
// legal matter in Indian jurisdiction, and an outline authored from memory
// would probably get J&K, Ladakh and Aksai Chin wrong on an Indian company's
// own site. Its condition for ever shipping one — "someone must supply a
// boundary-correct official outline and have it reviewed" — has not been met.
//
// THE PICTURES ARE THE BUILDINGS THEMSELVES, and all three come from Byonyks'
// own published pages rather than from stock. A stock city photograph beside a
// street address is a picture of a place the reader will take for a picture of
// the premises, and on a page whose entire argument is which company holds
// which building that is the one image class guaranteed to mislead. The Itasca
// frame carries the numerals 550, which corroborate its own address.
//
// PHOTOGRAPH OR PLAN, NEVER CONFLATED. The operating head office has a
// photograph; the two announced sites have architectural drawings, because
// they are not built. `Location.image.kind` carries which, the caption is
// generated from that field, and a module-load contract in `locations.ts`
// refuses the wrong pairing — CLAUDE.md's "never caption a render as a
// photograph" enforced rather than remembered.
//
// ONE CARD HAS NO PICTURE, AND IT IS OURS. Nothing of the Akshar Byonyks India
// office has been published — no photograph, and since 1 Sep 2026 no address
// either. The frame is held open and marked rather than filled with a generic
// Indian cityscape, which is the same decision the card's own "coming soon"
// makes about the address.

function LocationCard({ location }: { location: Location }) {
  const isIndia = location.country === "India";

  return (
    <details
      className={cn(
        "group overflow-hidden rounded-xl border border-line bg-card",
        // Gold means home/India sitewide (DESIGN.md, the Wayfinding Rule), and
        // this is `AccentRail`'s grammar — a 1px rule beside the content —
        // applied to a card edge, since a card cannot carry the rail component
        // itself. 1px exactly: the craft floor bans a coloured left border on
        // a block above that weight as the most recognisable tell of generated
        // UI. Never the only carrier — every card writes its country out.
        isIndia && "border-l-accent-gold",
      )}
    >
      {/* The whole collapsed face is the control, so clicking the picture or
          the name opens the card. `list-none` plus the webkit marker reset
          removes the platform triangle so the chevron is the only affordance;
          without both, Safari and Chromium disagree and one draws two. */}
      <summary className="flex cursor-pointer list-none flex-col rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
        <div className="group/img relative aspect-[4/3] overflow-hidden border-b border-line bg-surface-3">
          {location.image ? (
            <Image
              src={location.image.src}
              alt={location.image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
            />
          ) : (
            // Not an empty box and not a placeholder graphic: the same "we do
            // not have this" grammar the rest of the page uses, so the absence
            // reads as a stated fact rather than a loading failure.
            <div className="flex h-full items-center justify-center p-4 text-center">
              <PendingChip label="No photograph published" />
            </div>
          )}

          {/* COMING SOON, on the two sites that are not built. The drawing is
              the underlay and this rides over it on hover.

              `ink/65` is darker than "slightly" and set by the contrast floor
              rather than by taste: these are line drawings on white, so the
              worst case for white type is the paper. Measured by sampling the
              composited pixels — /65 puts white at 5.45:1 against the lightest
              point, /60 at 4.6:1, /55 at 3.9:1 and failing.

              Hover only, and not a gap: Tailwind v4 emits `hover:` inside
              `@media (hover: hover)`, so it never fires on touch, where a
              permanent 65% wash would hide the drawing the card exists to
              show. "Not built" is already carried by the section heading, the
              role line on the face, and the pending note inside. `aria-hidden`
              for the same reason. The words are Byonyks' own — byonyks.com
              labels both sites "Coming soon!" — which keeps this consistent
              with the card's `stated` provenance instead of introducing a
              promise this page cannot date. */}
          {location.status === "planned" && location.image ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center bg-ink/65 opacity-0 transition-opacity duration-200 ease-out group-hover/img:opacity-100 motion-reduce:transition-none"
            >
              <span className="font-mono text-sm font-semibold tracking-wide text-white uppercase">
                Coming soon
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex items-start justify-between gap-3 px-5 py-4">
          <span className="min-w-0">
            <h3 className="text-lg font-bold tracking-tight text-ink">
              {location.place}
              {location.region ? (
                <span className="font-normal text-muted-foreground">
                  , {location.region}
                </span>
              ) : null}
            </h3>
            {/* THE TWO-COMPANY LINE, on the closed face and not inside, without
                exception. byonyks.com files its Pakistan and India sites
                together under "South Asia", which keeps the proof while leaving
                a reader to assume one company owns all of it. The correction
                cannot be a thing you have to open a card to find.

                THE ROLE JOINED IT when the two registers merged (1 Sep 2026).
                "Operating today" and "Announced, not open" used to be section
                headings, so a card never had to say which it was; in one
                register it does, and "ANNOUNCED" on the face is what stops an
                unbuilt site from reading like an open one. */}
            <span className="mt-1 block font-mono text-xs tracking-wide text-muted-foreground uppercase">
              {location.country} · {location.entity} · {location.role}
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
          />
        </div>
      </summary>

      <div className="border-t border-line px-5 py-5">
        <p className="text-base text-ink">{location.detail}</p>

        {/* The role moved up to the closed face when the registers merged, so
            what is left for this line is the one fact the face has no room
            for. No remaining site publishes a founding year, so this renders
            for none of them today — kept because the field is on the type and
            a future row may carry one. */}
        {location.established ? (
          <p className="mt-3 font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Operating since {location.established}
          </p>
        ) : null}

        {location.address ? (
          <address className="mt-4 text-base leading-relaxed text-muted-foreground not-italic">
            {location.address.map((line, i) =>
              line === null ? (
                // The dropped line, held open rather than closed up. Rendering
                // the two known lines flush would present a partial address as
                // a complete one, which is the one thing a reader copying it
                // into a courier form must not be given.
                <span key={`gap-${i}`} className="block py-0.5">
                  <PendingChip label="Line missing" />
                </span>
              ) : (
                <span key={line} className="block">
                  {line}
                </span>
              ),
            )}
          </address>
        ) : null}

        {location.phone ? (
          <p className="mt-2 text-base">
            <a
              href={`tel:${location.phone.replace(/[^+\d]/g, "")}`}
              className="rounded-sm text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {location.phone}
            </a>
          </p>
        ) : null}

        {location.gap ? (
          <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <PendingChip />
            <span>{location.gap}</span>
          </p>
        ) : null}

        {/* The picture's own provenance, kept with the picture rather than in a
            page-level footnote. A drawing of an unbuilt factory and a
            photograph of a real one must never be indistinguishable. */}
        <p className="mt-5 border-t border-line pt-3 font-mono text-xs tracking-wide text-muted-foreground">
          {location.image
            ? `Byonyks · ${location.image.kind}`
            : "Byonyks · no image published"}
        </p>
      </div>
    </details>
  );
}

export function LocationRegister({
  id,
  title,
  lead,
  rail,
  items,
}: {
  id: string;
  title: string;
  lead: string;
  /** The provenance covering every card in the group. */
  rail?: React.ReactNode;
  items: readonly Location[];
}) {
  return (
    // `id` as well as the heading's: `scroll-mt-24` only means something on an
    // element that can actually be a scroll target.
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <ScrollReveal>
        {/* Wide, not railed. DESIGN.md: "a section is railed or wide, including
            its heading" — a card grid is a wide block, so the heading sits at
            the container edge with it rather than in the document spine's
            gutter, and the page keeps exactly two left edges. */}
        <div className="max-w-3xl">
          <h2
            id={`${id}-heading`}
            className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base text-muted-foreground">{lead}</p>
          {rail ? <div className="mt-6">{rail}</div> : null}
        </div>

        {/* `items-start`, so opening one card grows that card rather than
            stretching every sibling in its row to match. */}
        <ul className="mt-10 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((location) => (
            <li key={location.id}>
              <LocationCard location={location} />
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}
