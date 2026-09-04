import { splashWordmark } from "@/lib/splash-wordmark";

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
// It is also honest about lifetime: this state belongs to one document, and a
// module singleton is exactly one document. The replay bus at the foot of this
// file rides the same singleton for the same reason, and needs it more: a logo
// click on /products has to reach a `SiteSplash` that has not mounted yet, on
// a route that does not exist yet, and a module is the only thing the two ends
// of that gap share.

// NO `sessionStorage` GATE ANY MORE. This carried a `SPLASH_SEEN_KEY` so the
// curtain ran once per visit; the client asked for it on every reload
// (30 Aug 2026), so the key and its try/catch are gone. Worth knowing what
// went with them: that gate was also the reason a visitor could never meet the
// curtain twice in a row, so the ceilings below are now the only thing keeping
// it from being a repeated tax rather than an opening.
//
// A client-side navigation back to Home does not replay it BY DEFAULT — the
// arming script only runs on a real document load. The nav's logo is the one
// exception, on client instruction (2 Sep 2026): it re-arms the curtain from
// client code via `requestSplashReplay` below, so the mark in the bar is the
// deliberate way back to the opening. Every other route to `/` — the footer's
// link, a body link, the back button — still arrives without one.
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
 * The rules that <style> carries. It lives here because TWO things now inject
 * it — the inline script in `layout.tsx`, which runs before React exists, and
 * `armSplash` below, which runs on a logo click. Two copies of this string
 * drifting apart would produce a curtain that shows without locking the
 * scroll, or locks the scroll without showing.
 */
export const SPLASH_ARM_CSS =
  ".site-splash{display:flex}html,body{overflow:hidden}";

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
 * THE WORDMARK NO LONGER HAS A FACE, AND THAT IS THE POINT (1 Sep 2026).
 *
 * `SPLASH_FONT_METRICS` used to live here: a family plus the three per-em
 * numbers `StrokeText` needs to compute a viewBox around live text. It is gone
 * because the curtain no longer sets type. The client asked for its "Byonyks"
 * to look like the real Byonyks mark, and no font can do that — the B is
 * bespoke lettering with a flourish and a tail that sweeps under the word — so
 * the wordmark is now outlines, in `src/lib/splash-wordmark.ts`, with its box
 * baked into the data.
 *
 * Three things went with it, all improvements:
 *
 *   - **No webfont in the curtain.** Yellowtail was loaded on every page to
 *     serve one decoration on one route, and left `layout.tsx` in the same
 *     change. The opening can no longer be altered by a font failing to load.
 *   - **No metrics to keep in sync.** The pairing of family and box was a
 *     standing hazard — swap one without the other and the glyphs clip. There
 *     is nothing left to pair.
 *   - **No fallback frame.** A `swap` face meant the first paint could show
 *     cursive-default letterforms and then jump. Outlines are the same on the
 *     server, in the first paint and on every frame after.
 *
 * If the real logo font is ever supplied, it does not come back here: it would
 * change how `splash-wordmark.ts` is GENERATED, and that recipe is in
 * `public/images/README.md`.
 */

/**
 * Floor. Below this the wordmark is a flicker rather than a moment, and a
 * curtain that flashes reads as a bug — but it also guarantees the animation
 * has landed, so it is DERIVED rather than chosen. Change the timings above
 * and this follows them.
 *
 * IT NOW TAKES THE MAX OF TWO ENDINGS, which the previous note said would be
 * needed "if the stagger or the wordmark ever grows enough to invert" the
 * order — and moving to outlines did exactly that. The flood ends at
 * draw + delay + duration = 1.9s. The staggered draw ends at
 * `stagger * (contours - 1) + draw`, and the lockup has NINETEEN contours
 * where the old string had fourteen characters, so that is now 1.92s and the
 * draw finishes last. Taking the flood alone would have dismissed the curtain
 * on the final contour mid-stroke.
 *
 * Derived from the contour count rather than a constant, so re-generating the
 * wordmark with a different pairing cannot silently re-invert it.
 *
 * Well under `SPLASH_MAX_MS`, which is the ceiling and is not to be raised —
 * on a slow load that ceiling still wins and the curtain still lifts mid-draw,
 * because failing open beats finishing the animation.
 */
const SPLASH_CONTOURS = splashWordmark.contours.length;

export const SPLASH_MIN_MS = Math.round(
  Math.max(
    SPLASH_DRAW_S + SPLASH_FILL_DELAY_S + SPLASH_FILL_DURATION_S,
    SPLASH_STAGGER_S * (SPLASH_CONTOURS - 1) + SPLASH_DRAW_S,
  ) * 1000,
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

let failsafeTimer = 0;

/**
 * PUTS THE CURTAIN UP FROM CLIENT CODE, doing by hand what the inline script
 * in `layout.tsx` does on a document load — failsafe included, because the
 * failsafe is not optional just because React is demonstrably alive at the
 * moment of the click. A navigation that never arrives would otherwise leave
 * the scroll locked with nothing scheduled to let go of it.
 *
 * IT APPENDS A FRESH ELEMENT RATHER THAN REUSING THE ONE IN THE HEAD, and
 * that is deliberate rather than lazy. The stylesheet IS the curtain, so a new
 * element is a new cycle — which gives `site-splash.tsx` an identity to check
 * before a fade-out timer from the cycle before removes the curtain this one
 * just raised. Exactly one is ever in the document.
 */
export function armSplash() {
  if (typeof document === "undefined") return;

  document.getElementById(SPLASH_ARM_ID)?.remove();

  const arm = document.createElement("style");
  arm.id = SPLASH_ARM_ID;
  arm.textContent = SPLASH_ARM_CSS;
  document.head.appendChild(arm);

  window.clearTimeout(failsafeTimer);
  failsafeTimer = window.setTimeout(() => arm.remove(), SPLASH_FAILSAFE_MS);
}

/**
 * THE REPLAY REQUEST, AND WHY IT IS A FLAG RATHER THAN A CALL TO `armSplash`.
 *
 * A logo click on another route happens while the reader is still looking at
 * that route. Arming there would set `html,body{overflow:hidden}` on the page
 * they are still on, and on a route that has not been prefetched that is a
 * frozen page with no curtain on it for as long as the navigation takes —
 * which reads as the site hanging, not as an opening. So a cross-route click
 * records the intent and `SiteSplash` arms itself on the way in, before the
 * browser paints.
 *
 * A click made while already on Home has no navigation to wait for and no
 * other page to freeze, so the listener path arms immediately instead.
 *
 * THE STAMP IS WHAT KEEPS THE FLAG FROM GOING STALE. A click that never
 * arrives anywhere — the reader hits back, the navigation fails — must not put
 * a curtain in front of an unrelated visit to Home ten minutes later.
 */
let replayRequestedAt = 0;
const replayListeners = new Set<() => void>();

export function requestSplashReplay() {
  replayRequestedAt = Date.now();
  for (const listener of [...replayListeners]) listener();
}

/** True at most once per request, and only if the arrival was prompt. */
export function consumeSplashReplay() {
  const fresh =
    replayRequestedAt !== 0 &&
    Date.now() - replayRequestedAt < SPLASH_FAILSAFE_MS;
  replayRequestedAt = 0;
  return fresh;
}

/**
 * For a `SiteSplash` that is already mounted — a logo click made while on
 * Home, where nothing remounts and so nothing would otherwise re-run. Unlike
 * `onSilkReady` this set is NOT cleared after firing: it is a subscription for
 * the life of the component, not a one-shot.
 */
export function onSplashReplay(listener: () => void): () => void {
  replayListeners.add(listener);
  return () => replayListeners.delete(listener);
}
