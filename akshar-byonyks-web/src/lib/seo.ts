import type { Metadata } from "next";

// THE DEFAULT SHARE CARD, and the reason it is a constant every page imports
// rather than one field in the root layout.
//
// Added 1 Sep 2026 with the Akshar Byonyks logo the client supplied.
//
// ─── WHY THIS IS NOT INHERITED, WHICH IS THE WHOLE POINT ────────────────────
//
// Next merges route metadata SHALLOWLY, per top-level key. A page that exports
// any `openGraph` object at all replaces the parent's wholesale — so twenty
// routes here that set `openGraph: { title, description, url, type }` and no
// `images` inherit no image from the root layout, however the root declares it.
//
// Two things were tried and measured before this shape was settled on:
//
//   1. `openGraph.images` on the root layout's `metadata`. Result: exactly ONE
//      route emitted an `og:image`, and it was Home — the only route that
//      exports no `openGraph` of its own.
//   2. The `src/app/opengraph-image.jpg` FILE CONVENTION. Next folds a
//      file-based image into a layer whose own metadata has not set
//      `openGraph.images` (`mergeStaticMetadata`, checked against the Next
//      source). That resolves correctly at the root layer — and is then
//      overwritten by the same shallow replace when the page layer's
//      `openGraph` lands on top. Result: identical. Home only.
//
// So the image has to be present in the object each page actually exports.
// This constant is how that happens exactly once, in one place, with one alt
// string, instead of twenty pasted literals that will drift.
//
// ─── USAGE ──────────────────────────────────────────────────────────────────
//
//   openGraph: { title, description, url, type: "website", images: defaultOg },
//
// A page with real imagery of its own — the X-1, Products — passes its own
// `images` instead and should. This is the fallback for pages whose subject is
// the company rather than a thing that can be photographed.
//
// `src/app/opengraph-image.jpg` is kept as well. It costs nothing, it is what
// serves Home, and it is the correct answer if a future route forgets to
// import this.

/**
 * 1200×630, the ratio every platform crops to. The full logo lockup contained
 * on white rather than cropped to fill — cropping this artwork to 1.9:1 would
 * cut either the globe off the top or the tagline off the bottom.
 *
 * Provenance and the crop pipeline are in `public/images/README.md`.
 */
export const defaultOg: NonNullable<
  NonNullable<Metadata["openGraph"]>["images"]
> = [
  {
    url: "/opengraph-image.jpg",
    width: 1200,
    height: 630,
    alt: "Akshar Byonyks International LLC: transforming renal care through breakthrough peritoneal dialysis innovation.",
  },
];
