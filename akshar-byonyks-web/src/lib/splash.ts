// The opening curtain's timing contract and its one cross-tree signal.
//
// WHY A MODULE-LEVEL BUS AND NOT REACT CONTEXT. The two ends of this signal
// are about as far apart as a Next.js tree allows: the curtain lives in the
// root layout, and the thing it waits for is a WebGL first frame inside a
// `next/dynamic({ ssr: false })` chunk mounted four components deep in Home,
// behind a `prefers-reduced-motion` gate. Wiring a provider through that would
// mean turning the root layout into a client component — pushing every route
// on the site across the server/client boundary to serve a decoration on one
// of them. A five-line event bus keeps the layout a Server Component.
//
// It is also honest about lifetime: this state belongs to one page load, and a
// module singleton is exactly one page load. Nothing needs to survive a
// navigation, because the curtain never runs twice in a session.

// NO `sessionStorage` GATE ANY MORE. This carried a `SPLASH_SEEN_KEY` so the
// curtain ran once per visit; the client asked for it on every reload
// (30 Aug 2026), so the key and its try/catch are gone. Worth knowing what
// went with them: that gate was also the reason a visitor could never meet the
// curtain twice in a row, so the ceilings below are now the only thing keeping
// it from being a repeated tax rather than an opening.
//
// A client-side navigation back to Home still does not replay it — the arming
// script only runs on a real document load.
//
// DO NOT REINSTATE A STORAGE KEY HERE WITHOUT UPDATING `/cookie-policy`.
// That page states, as a measured fact rather than boilerplate, that after
// browsing this site the cookie store, `localStorage` and `sessionStorage`
// are all empty. The once-per-session gate quietly falsified it for as long as
// it existed — a legal document made wrong by a splash screen, which is not a
// trade anyone would have made on purpose. Re-verified empty across seven
// routes and a full curtain cycle after the key was removed.
//
// If a future change needs to remember anything about a visitor, the cookie
// policy is part of that change, not a follow-up.

/** The curtain only ever runs on the front door — see `site-splash.tsx`. */
export const SPLASH_PATH = "/";

/** id of the <style> element the arming script injects. Its presence is the
 *  single source of truth for "the curtain is up"; removing it puts
 *  `.site-splash` back to `display: none` and releases the scroll lock. */
export const SPLASH_ARM_ID = "ab-splash-arm";

/**
 * THE WORDMARK'S OWN TIMELINE, in seconds, passed straight to `StrokeText`.
 * It lives here rather than inline at the call site because the floor below is
 * derived from it, and the two disagreeing is exactly the bug this fixes.
 *
 * WHAT WENT WRONG (31 Aug 2026). These numbers and the floor were set
 * independently: a 1.5s draw with a 0.15s pause and a 0.75s flood finished at
 * 2.4s, while the floor let the curtain dismiss at 1.1s and fade out by 1.55s.
 * On a warm reload — where silk and the fonts are cached and the curtain hits
 * its floor rather than its ceiling — the flood had not STARTED when the
 * curtain finished leaving. The animation reliably played the gold draw and
 * never filled white, which reads as a broken animation rather than a fast one.
 *
 * The timings are shortened rather than the floor simply raised to 2.4s.
 * Making every visitor wait an extra 1.3s to watch a decoration finish is the
 * wrong half of that trade for this audience — PRODUCT.md's Priority-2 reader
 * is "frequently older, often reading in a second language under stress". This
 * costs them 850ms more than before instead, and the wordmark completes.
 */
export const SPLASH_DRAW_S = 1.2;
export const SPLASH_FILL_DELAY_S = 0.1;
export const SPLASH_FILL_DURATION_S = 0.6;
export const SPLASH_STAGGER_S = 0.04;

/**
 * THE WORDMARK'S FACE AND ITS BOX, kept together because they are one fact.
 *
 * The curtain set "Akshar Byonyks" in Noto Sans 700 until 1 Sep 2026, when the
 * client asked for the logo's face instead. `layout.tsx` carries why Yellowtail
 * stands in for a face nobody has supplied, and why it is recorded as an
 * approximation rather than presented as the real thing. **It was chosen twice
 * that day** — first against the Byonyks mark, then re-chosen against the
 * Akshar Byonyks lockup when the client supplied it, which turned out to use a
 * completely different script. The metrics below were re-measured with it.
 *
 * THE THREE NUMBERS ARE MEASURED, NOT ESTIMATED. `getBBox()` and
 * `getComputedTextLength()` on "Akshar Byonyks" set in Yellowtail at 128px,
 * with letter-spacing at zero, in Chromium with the webfont loaded: 0.403em of
 * mean advance per character, 0.969em of ascent and 0.305em of descent. Each is
 * rounded outwards below, exactly as the Noto Sans defaults in
 * `stroke-text.tsx` are, so the box stays a superset of the glyphs — an
 * overflowing swash is clipped by the SVG viewport, while a box a few per cent
 * too large costs only scale.
 *
 * THESE NUMBERS ARE NOTHING LIKE THE SANS DEFAULTS, which is the whole reason
 * they are props rather than constants: Yellowtail's mean advance is 0.403em
 * against Noto Sans 700's 0.569em, so a script wordmark set in the sans box
 * sits in a frame a third too wide and shrinks to fit it.
 *
 * LETTER-SPACING IS ZERO AND MUST STAY ZERO. Yellowtail is a connected script.
 * The component's -2px default pulls the joins apart and turns a signature into
 * fourteen separate letters.
 *
 * IF THE REAL LOGO FONT ARRIVES: re-measure with it rather than reusing these.
 * Set the string at 128px in an <svg><text>, wait on `document.fonts.ready`,
 * then read `getBBox()` — ascent is `-y / 128`, descent is `(y + height) / 128`
 * and the advance is `getComputedTextLength() / 128 / characterCount`.
 */
export const SPLASH_FONT_METRICS = {
  family: "var(--font-wordmark), cursive",
  advanceEm: 0.44,
  ascentEm: 1.02,
  descentEm: 0.35,
  letterSpacing: 0,
} as const;

/**
 * Floor. Below this the wordmark is a flicker rather than a moment, and a
 * curtain that flashes reads as a bug — but it now also guarantees the flood
 * has landed, so it is DERIVED rather than chosen. Change the timings above
 * and this follows them.
 *
 * The flood is what finishes last: it ends at draw + delay + duration = 1.9s,
 * while the staggered draw's final character lands at
 * `stagger * (chars - 1) + draw` = 1.72s for the fourteen in "Akshar Byonyks".
 * If the stagger or the wordmark ever grows enough to invert that, this needs
 * to take the max of the two rather than the flood alone.
 *
 * Well under `SPLASH_MAX_MS`, which is the ceiling and is not to be raised —
 * on a slow load that ceiling still wins and the curtain still lifts mid-draw,
 * because failing open beats finishing the animation.
 */
export const SPLASH_MIN_MS = Math.round(
  (SPLASH_DRAW_S + SPLASH_FILL_DELAY_S + SPLASH_FILL_DURATION_S) * 1000,
);

/** Reduced motion draws nothing, so there is nothing to wait for beyond
 *  confirming the wordmark rendered. */
export const SPLASH_MIN_MS_REDUCED = 350;

/** CEILING, AND THE MOST IMPORTANT NUMBER IN THIS FILE. Whatever happens —
 *  WebGL unavailable, the chunk 404s behind a proxy, three.js throws, the
 *  device is too slow to reach a first frame — the curtain lifts. A splash
 *  screen that can wait forever is a site that can fail closed, and this one
 *  is in front of medical-device information. It fails open, always. */
export const SPLASH_MAX_MS = 3000;

/** Matches the CSS transition on `.site-splash`. */
export const SPLASH_FADE_MS = 450;

/**
 * THE FAILSAFE, AND THE ONLY GUARANTEE THAT DOES NOT DEPEND ON REACT.
 *
 * `SPLASH_MAX_MS` above lives inside a `useEffect`, which is worth exactly as
 * much as the assumption that the page hydrates. With the Skip button removed
 * (30 Aug 2026) these two timers are the ONLY way out of the curtain, so this
 * one stopped being a backstop and became half the safety story. Testing broke that assumption
 * on the first try: block the silk chunk and `next/dynamic` throws during
 * render, Home's subtree never hydrates, `SiteSplash`'s effect never runs —
 * and the curtain, which is pure server-rendered markup held up by an injected
 * stylesheet, stays up forever with no JavaScript alive to take it down. A
 * flaky CDN would have locked visitors out of the site behind a decoration.
 *
 * So the same inline script that raises the curtain also schedules its
 * removal, before React exists and independent of whether React ever works.
 * Longer than `SPLASH_MAX_MS` because in every healthy load React gets there
 * first; this is insurance, not the normal path.
 */
export const SPLASH_FAILSAFE_MS = 6000;

let silkReady = false;
const listeners = new Set<() => void>();

/** Called from the silk canvas's first rendered frame. Idempotent. */
export function signalSilkReady() {
  if (silkReady) return;
  silkReady = true;
  for (const listener of listeners) listener();
  listeners.clear();
}

/**
 * Resolves on the silk canvas's first frame, or immediately if it has already
 * happened. Returns an unsubscribe so a curtain that lifted on the timeout
 * first does not leave a listener holding a reference to an unmounted tree.
 */
export function onSilkReady(listener: () => void): () => void {
  if (silkReady) {
    listener();
    return () => {};
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}
