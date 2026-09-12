// LINKEDIN'S BRAND TILE — blue rounded square, white "in".
//
// WHY THIS IS AN SVG AND NOT THE PNG THAT WAS SUPPLIED. The client sent the
// tile as a 350×350 PNG on 12 Sep 2026 and asked for it to be the button. It
// is reproduced here rather than shipped, for one reason that is about the
// result and not about convenience: **that file has no alpha channel.** Its
// background is opaque white, and the blue tile sits inside a 9% white margin.
// Dropped onto a photograph — which is where this button lives, pinned to the
// corner of a portrait — it would have rendered as a white square with a blue
// square inside it.
//
// The measurements below are taken from that file, so what renders is the mark
// that was sent, not an approximation of it from memory:
//
//   - #0066C8, sampled from the tile's flat interior. (LinkedIn's current
//     published brand blue is #0A66C2; the supplied file is a shade off it.
//     The supplied file wins — it is what was asked for, and the difference
//     is invisible at 32px.)
//   - Corner radius ≈ 23% of the side, traced down the left edge of the arc.
//     That is the generous "squircle" of the modern app icon rather than the
//     tighter radius of the older favicon.
//
// The other thing the SVG buys: this renders at one device pixel per device
// pixel at any size and any DPR, which a 350px raster pinned into a 32px box
// does not.
//
// COLOURS ARE FIXED, NOT `currentColor`. This is the one mark on the site that
// is deliberately outside the palette: it is another company's trademark and
// recolouring it into this site's blues would be both wrong and a worse
// signal, since the whole value of a brand tile is that it is recognised
// before it is read.
//
// USED FOR THE ONE PURPOSE LINKEDIN'S BRAND GUIDELINES PERMIT WITHOUT A
// LICENCE: as a link to a LinkedIn presence. Not on a badge, not as this
// site's own iconography, not recoloured. If it ever starts decorating
// something that is not a link to linkedin.com, that is the line.
//
// `aria-hidden` ALWAYS. It renders inside a link whose accessible name comes
// from the caller and names the person — "Vishnu Patel on LinkedIn" — because
// "LinkedIn" alone, repeated down a roster, tells a screen-reader user nothing
// about which profile they are about to open.
export function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="24" height="24" rx="5.5" fill="#0066C8" />
      {/* The "in", in three subpaths: the n, the i's tittle, the i's stem. */}
      <path
        fill="#fff"
        d="M19.6 19.6h-2.96v-4.63c0-1.1-.02-2.53-1.54-2.53-1.54 0-1.78 1.2-1.78 2.45v4.71h-2.96v-9.54h2.84v1.3h.04c.4-.75 1.36-1.54 2.8-1.54 3 0 3.56 1.97 3.56 4.54v5.24z"
      />
      <path
        fill="#fff"
        d="M6.06 8.76a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44z"
      />
      <path fill="#fff" d="M7.54 19.6H4.57v-9.54h2.97v9.54z" />
    </svg>
  );
}
