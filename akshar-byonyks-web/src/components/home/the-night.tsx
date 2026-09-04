import type { CSSProperties } from "react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TwoPaths } from "@/components/home/two-paths";

// Added 26 Aug 2026. Home's third full-bleed ink moment, and the site's answer
// to a critique finding: "The cycler runs on its own while the household
// sleeps" was the most human sentence on the site and it was set at 14px as a
// card caption inside the hero's scroll-scrub stack. This section promotes it
// to display scale and gives it the ground it was always describing — ink is
// already the colour of night, and the page was spending 9% of its height on
// it.
//
// It also carries the geography argument the rest of the site drops after the
// hero. The original critique proposed a silhouette of India as the recurring
// graphic; that was withdrawn before build. Depicting India's national boundary
// is a legal matter in Indian jurisdiction, not a stylistic one — a boundary
// authored from memory on an Indian medical-device company's own site is a risk
// the visual payoff does not justify, and the craft floor separately calls an
// approximated organic contour the cheap version of the effect.
//
// The figure beneath has been rebuilt once already. The first version drew the
// week as arcs leaving a baseline; it was reported as unreadable and it was —
// see two-paths.tsx for what replaced it and why.
// THE GROUND IS THE ANIMATION. This section spends its scroll on one idea, so
// the colour of the section itself moves with it: dusk at the top, full ink by
// the time the figure has finished drawing. `--p` is the same 0-1 progress the
// figure runs on, set by `TwoPaths` on this element rather than on its own
// track — a wrapper cannot read a custom property from a descendant, and the
// heading above the figure and the note below it are part of the same evening.
//
// A FLAT COLOUR, NOT A GRADIENT, and that is the whole point of the rebuild.
// The first attempt washed a gradient behind the figure and every opaque label
// plate in it turned into a visible rectangle. A gradient cannot be matched by
// anything that is not in register with it; a flat value can be matched exactly
// by anything that names the same variable, which is what `--night-ground` is
// for. Every element in the figure that has to disappear into the ground —
// label plates, marker discs, the dark half of the moon — paints with it, so
// they are invisible at every scroll position by construction rather than by
// coincidence.
//
// 12% toward the site own daylight ground, measured rather than chosen: at that
// depth the smallest text in the section (white/60 at 12px) holds 5.56:1 and
// gold holds 4.00:1 against a 3:1 floor, since the Accent Ration Rule already
// keeps gold to large type and non-text graphics. It moves toward
// `--color-white` rather than `--color-background` deliberately — the latter
// inverts under the stylesheet vestigial dark block, which would turn dusk into
// something darker than midnight.
//
// With no JavaScript, reduced motion, or a viewport too short to pin, `--p` is
// never set and `var(--p, 1)` resolves to 1: pure ink, exactly the ground this
// section has always had. The fallback is the finished state, never a frozen
// mid-scroll frame.
export function TheNight() {
  return (
    <section
      aria-labelledby="the-night-heading"
      // pb-20/lg:pb-28 mirrors the heading block's own pt-20/lg:pt-28 above.
      // The closing note used to carry the bottom of this section and was
      // removed on 31 Aug 2026; without a replacement the figure would have
      // ended flush against the white section below it.
      className="pb-20 text-white lg:pb-28"
      style={
        {
          "--night-ground":
            "color-mix(in oklab, var(--color-ink), var(--color-white) calc((1 - var(--p, 1)) * 12%))",
          background: "var(--night-ground)",
        } as CSSProperties
      }
    >
      <div className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="the-night-heading"
              className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              The cycler runs on its own while the household sleeps.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-white/75">
              In-centre hemodialysis organizes the week around the clinic:
              roughly three trips, plus the road between them.
              Automated peritoneal dialysis runs overnight, at home, on a
              schedule set with your nephrologist.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Outside the container: the pinned stage manages its own width, because
          a sticky element inside a padded wrapper still pins, but its height
          has to be free of the wrapper's own vertical rhythm. */}
      <TwoPaths />

    </section>
  );
}
