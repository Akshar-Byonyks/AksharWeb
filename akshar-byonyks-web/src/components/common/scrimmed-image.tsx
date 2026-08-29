import Image from "next/image";

import { cn } from "@/lib/utils";

// The hero image treatment, with the scrim built in so it cannot be forgotten.
//
// Spec §7.2 is unusually blunt about this: any hero variant placing text over
// imagery "must include a scrim: a gradient or solid overlay behind the text
// block, sufficient for the text to clear 4.5:1 against the darkest and
// lightest points of the image. **Not optional, not per-instance. Built into
// the component so it cannot be forgotten.**" Spec §2 explains why — hero
// headlines on byonyks.com are white type over unscrimmed photographs, and it
// names that as "the most common AA failure on marketing sites" and one axe
// will not catch.
//
// So this component does not take a `scrim` prop. There is no way to call it
// without one. A caller who wants a bare photograph should use `next/image`
// directly and own that decision somewhere a reviewer will see it.
//
// THE SCRIM IS TWO LAYERS, NOT ONE. A single flat wash at the opacity needed
// to guarantee contrast over a bright sky turns the photograph into a grey
// rectangle, at which point there was no reason to add it. The pairing is:
//
//   1. A near-opaque ink layer along the reading edge, fading out across the
//      frame. This is what actually buys the contrast, and it is densest
//      exactly where the type sits.
//   2. A flat ink wash at low opacity over the whole frame, which catches the
//      bright patches the gradient has already thinned out over — a white sky
//      in the top corner is the case that breaks gradient-only scrims.
//
// Together they hold white text well clear of 4.5:1 against both the darkest
// and the lightest points of these photographs while the image is still
// legibly a photograph.
//
// PERFORMANCE. PRODUCT.md describes the patient audience as majority mobile
// and often bandwidth-constrained, and spec §11.3's deferred performance pass
// becomes a hard launch-gate requirement partly because of them. `priority` is
// therefore opt-in and belongs only on an image in the first viewport;
// `sizes="100vw"` is correct for a full-bleed hero and wrong for anything else,
// which is why this component is named for the job it does rather than
// generalised into an image wrapper.
export function ScrimmedImage({
  src,
  alt,
  priority = false,
  objectPosition = "center",
  className,
}: {
  src: string;
  /**
   * Real alternative text, describing the photograph. Not the headline it
   * sits behind — a screen-reader user who gets the headline twice has been
   * told nothing about the picture.
   *
   * Pass `""` only when the image is genuinely decorative, and mean it.
   */
  alt: string;
  priority?: boolean;
  objectPosition?: string;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition }}
      />
      {/* Layer 1: the reading edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/45 sm:to-ink/25"
      />
      {/* Layer 2: the flat wash, for bright patches the gradient thins over. */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />
    </div>
  );
}
