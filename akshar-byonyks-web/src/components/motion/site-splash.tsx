"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { SplashWordmark } from "@/components/motion/splash-wordmark";
import { cn } from "@/lib/utils";
import {
  armSplash,
  consumeSplashReplay,
  onSilkReady,
  onSplashReplay,
  SPLASH_ARM_ID,
  SPLASH_DRAW_S,
  SPLASH_FADE_MS,
  SPLASH_FILL_DELAY_S,
  SPLASH_FILL_DURATION_S,
  SPLASH_MAX_MS,
  SPLASH_MIN_MS,
  SPLASH_MIN_MS_REDUCED,
  SPLASH_STAGGER_S,
} from "@/lib/splash";

// THE OPENING CURTAIN. Client instruction, 30 Aug 2026: a loading screen on
// first load that says "Akshar Byonyks" in React Bits' stroke text and holds
// until the silk background is ready.
//
// THE COST, STATED ONCE AND THEN BUILT ANYWAY. Anything that stands between a
// visitor and this site's content is a real cost here, more than on most
// sites: PRODUCT.md describes the Priority-2 audience as "frequently older,
// often reading in a second language under stress", and commit 5752b72 exists
// specifically to fix progressive-enhancement failures on these pages. A
// curtain is the opposite instinct. It is the client's call, it is a
// reasonable one for a front door, and what follows is the version that does
// not become a defect:
//
//   1. HOME ONLY. Silk exists on `/` and nowhere else, so "wait for silk" is
//      only a coherent instruction there. Someone arriving on
//      /privacy-policy or /grievance-redressal from a search result meets the
//      page, not a brand moment. The head script enforces this, so the other
//      twenty routes never even render the markup.
//   2. EVERY LOAD OF HOME, on client instruction (30 Aug 2026). This shipped
//      as once-per-session via `sessionStorage` — a first impression rather
//      than a toll booth — and the client asked for it on every reload. It is
//      a recurring wait now, so the ceiling below is doing more work than it
//      was: it is what keeps the curtain from becoming a tax on a returning
//      reader. Client-side navigation back to Home does NOT replay it; only a
//      real page load runs the arming script.
//   3. IT FAILS OPEN, ALWAYS. `SPLASH_MAX_MS` lifts the curtain whatever
//      happens — no WebGL, chunk blocked, three.js throws, device too slow to
//      reach a first frame. Waiting on a decoration must never be able to
//      withhold medical-device information. That timeout is not a fallback,
//      it is the actual contract; the silk signal only ever makes it faster.
//   4. NO JAVASCRIPT, NO CURTAIN. The arming script is the only thing that
//      makes it visible, so a visitor without JS gets the site directly.
//      This is also why the curtain is server-rendered and CSS-hidden rather
//      than mounted after hydration — mounting it later would mean painting
//      the real page and then covering it up, which is worse than no splash.
//   5. REDUCED MOTION IS NOT MADE TO WAIT. Those visitors never load silk at
//      all (the hero gates it behind the same query), so waiting for it would
//      hang until the ceiling. They get a still wordmark and a short beat.
//   6. NOTHING IS FOCUSABLE, AND THE TIMER IS THE ONLY EXIT. The curtain
//      carried a Skip button; the client removed it (30 Aug 2026). Stated
//      plainly, because it is the one guarantee this feature gave up: a
//      keyboard or screen-reader visitor now has no way out except waiting,
//      and cannot see how long that is.
//
//      What replaces it is that there is nothing to escape TO — the curtain
//      holds no focusable element, so Tab does nothing rather than moving
//      focus somewhere invisible, and everything behind stays `inert` so
//      focus cannot wander under it. The exit is bounded by two ceilings that
//      are now the whole safety story rather than a backstop, which is why
//      neither may be raised: 3s in the effect, 6s outside React.
//
// The reason it is defensible at all is that it holds back nothing that is
// not already being downloaded. It is a cover over a load that happens
// regardless, not an added wait.

// `useLayoutEffect` on the client, `useEffect` on the server. The standard
// shape, and here it is not merely to silence React's warning: what the effect
// below does has to happen before a paint, and there is no paint on the
// server. A document load arms from the head script long before any effect in
// this component runs, so the server branch has nothing to do either way.
const useArmEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function SiteSplash() {
  // Identifies this element so the inert sweep below can skip it. The
  // curtain's own visibility is CSS, not React.
  const rootRef = useRef<HTMLDivElement>(null);
  const [leaving, setLeaving] = useState(false);
  // Counts cycles. Nothing reads its value: it is a dependency of the effect
  // that runs one, and the `key` that makes the wordmark redraw.
  const [replay, setReplay] = useState(0);

  const dismiss = useCallback(() => {
    // The injected <style> IS the curtain. Its presence is the armed state and
    // removing it is the dismissal — `.site-splash` returns to display:none
    // and the scroll lock lifts in the same paint.
    const arm = document.getElementById(SPLASH_ARM_ID);
    if (!arm) return;

    setLeaving(true);

    window.setTimeout(
      () => {
        // A REPLAY THAT STARTED WHILE THIS FADE WAS IN FLIGHT has already put
        // a new stylesheet in the head — `armSplash` appends a fresh element
        // rather than reusing this one precisely so that identity can be
        // checked here. Without it, the previous cycle's timer lands in the
        // middle of the new curtain, removes the stylesheet holding it up and
        // un-inerts the page behind it: the curtain blinks out instead of
        // playing. Unreachable today, because the nav is `inert` for the whole
        // cycle including this fade and so the logo cannot be clicked during
        // it — this is what keeps that from being load-bearing.
        if (document.getElementById(SPLASH_ARM_ID) !== arm) return;

        arm.remove();
        for (const el of document.querySelectorAll("[data-splash-inert]")) {
          el.removeAttribute("inert");
          el.removeAttribute("data-splash-inert");
        }
        // No focus restoration, because focus can no longer have been inside
        // the curtain — it holds nothing focusable. Whatever the browser gave
        // the visitor on load is still where it was.
      },
      // Reduced motion has no transition to wait out.
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 0
        : SPLASH_FADE_MS,
    );
  }, []);

  // ARRIVING ON HOME FROM A LOGO CLICK (2 Sep 2026). The head script only runs
  // on a real document load, so a client-side navigation carries no curtain of
  // its own; the nav's logo leaves a request behind instead and this consumes
  // it. Nothing else does — every other link to `/` finds no request and
  // arrives on Home unobstructed.
  //
  // A LAYOUT EFFECT, and that is the whole reason the arming is not done at
  // the click. It runs between React's commit and the browser's paint, so the
  // stylesheet is in force in the same frame the curtain's markup appears. A
  // passive effect would paint Home and then cover it up a frame later, which
  // is the exact failure the server-rendered markup exists to avoid.
  useArmEffect(() => {
    if (consumeSplashReplay()) armSplash();
  }, []);

  // A LOGO CLICK MADE WHILE ALREADY ON HOME. Nothing remounts and nothing
  // navigates, so there is no arrival to hand the request to and no other page
  // to freeze — this arms on the spot and bumps the cycle, which is the whole
  // trigger. The request is consumed here too, so the flag cannot survive to
  // arm a second time on some later arrival.
  useEffect(
    () =>
      onSplashReplay(() => {
        consumeSplashReplay();
        armSplash();
        setReplay((n) => n + 1);
      }),
    [],
  );

  useEffect(() => {
    // Not armed: not Home, or the failsafe already fired. Arming is still the
    // single decision point and this component still never second-guesses it.
    // There are two arming SITES now rather than one — the head script on a
    // document load, the layout effect above on a logo click — and each still
    // writes the rule about who sees a curtain in exactly one place.
    if (!document.getElementById(SPLASH_ARM_ID)) return;

    // A replay reuses this component rather than remounting it, so the
    // fade-out class from the previous cycle is still on the element. On the
    // first run React bails out of a state update that changes nothing.
    setLeaving(false);

    // Hold the page behind the curtain out of the a11y tree and the tab
    // order — everything except the curtain itself.
    //
    // TWO BUGS THIS SHAPE FIXES, both found by keyboard-testing rather than by
    // reading the code:
    //
    //   1. This component renders inside <main>, so marking `#main-content`
    //      inert took the curtain's own subtree out of the a11y tree with it.
    //      That is why <main> is not marked and its children are, minus this
    //      one — the curtain still has to be announced as a loading status
    //      even now that it holds no controls.
    //   2. The root layout's "Skip to main content" link is a direct child of
    //      <body>, ahead of <header>, so it was the FIRST thing Tab reached
    //      while the curtain was up — a link to content that was inert,
    //      offered from behind a curtain. It is included now.
    //
    // Everything is tagged with our own attribute so `inert` is only ever
    // removed from elements this code set it on, never from one that had it.
    const root = rootRef.current;
    const main = document.getElementById("main-content");
    const behind = [
      document.querySelector("header"),
      document.querySelector("footer"),
      document.querySelector('a[href="#main-content"]'),
      ...(main ? Array.from(main.children) : []),
    ];

    for (const el of behind) {
      if (!el || el === root || el.hasAttribute("inert")) continue;
      el.setAttribute("inert", "");
      el.setAttribute("data-splash-inert", "");
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minMs = reduced ? SPLASH_MIN_MS_REDUCED : SPLASH_MIN_MS;
    const startedAt = performance.now();

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      // Never before the floor, so the wordmark is a moment rather than a
      // flicker on a fast connection.
      const remaining = Math.max(0, minMs - (performance.now() - startedAt));
      window.setTimeout(dismiss, remaining);
    };

    // The ceiling. Set first, so it is armed even if everything below throws.
    const ceiling = window.setTimeout(finish, SPLASH_MAX_MS);

    // Silk is only ever mounted for `no-preference` visitors — the hero gates
    // it on exactly this query — so for anyone else there is nothing to wait
    // for and the font is the whole condition.
    const expectsSilk = window.matchMedia(
      "(prefers-reduced-motion: no-preference)",
    ).matches;

    const fonts = document.fonts?.ready ?? Promise.resolve();
    let unsubscribe = () => {};

    if (expectsSilk) {
      const silk = new Promise<void>((resolve) => {
        unsubscribe = onSilkReady(resolve);
      });
      Promise.all([fonts, silk]).then(finish).catch(finish);
    } else {
      fonts.then(finish).catch(finish);
    }

    return () => {
      window.clearTimeout(ceiling);
      unsubscribe();
    };
  }, [dismiss, replay]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "site-splash fixed inset-0 z-200 flex-col items-center justify-center bg-ink px-6",
        // No fade IN. The curtain is in the first paint — that is the entire
        // reason it is server-rendered rather than mounted after hydration —
        // so there is nothing to fade in from. Only the exit is animated, and
        // the transition itself is declared under
        // `prefers-reduced-motion: no-preference` in globals.css.
        leaving && "opacity-0",
      )}
      role="status"
      aria-label="Loading Akshar Byonyks"
      aria-busy={!leaving}
    >
      <div className="w-full max-w-[64rem]">
        {/* WHITE DRAWS, GOLD FLOODS — inverted 3 Sep 2026, and the two
            colours are the same two as before. Only their jobs swapped, which
            is why this cost no new token and no new hue: the Accent Ration
            Rule's ban on "a one-off color chosen in a single component" makes
            inventing a third colour here the expensive answer, not the
            obvious one.

            WHY ROUND THIS WAY. Gold is 5.39:1 on ink and white is 16.9:1, and
            the two phases do not need contrast equally. The draw is a
            HAIRLINE, moving, and over in 1.2s; the flood is a solid mass that
            then sits still. Gold was carrying the hairline and white the mass,
            which is the harder job given to the weaker colour — measured on
            screen, the drawn keyline was genuinely dim and the wordmark did
            not become properly readable until the flood had crossed it. This
            way the lockup is legible from the first stroke. PRODUCT.md's
            Priority-2 reader is "frequently older, often reading in a second
            language under stress", so that is a legibility fix that happens
            to also look better, not a preference.

            AND IT NOW RESOLVES INTO THE BRAND RATHER THAN OUT OF IT. Gold to
            white ended the site's one brand-specific colour on its most
            generic one; white to gold makes the wipe read as the gold
            ARRIVING. It also matches the handoff: the curtain lifts onto an
            ink hero carrying a solid `bg-accent-gold` CTA, so the last frame
            of the opening and the first frame of the page are now the same
            gold instead of two different palettes.

            WHITE IS NOW OUT OF THIS COMPONENT ENTIRELY — client instruction,
            8 Sep 2026: the outline takes the same gold as the flood. Read the
            two paragraphs above as history rather than as the current
            arrangement; they are kept because the tradeoff they describe is
            real and is what was traded away.

            WHAT THAT COSTS, STATED PLAINLY. The draw phase is now gold on ink
            at 5.39:1 instead of white at 16.9:1, which is the legibility
            regression the round-swap above was made to fix. It clears WCAG AA
            for large text (3:1) comfortably, and this is display-scale
            decoration whose text lives on the wrapper's `aria-label`, so
            nothing is gated on reading it — but the hairline is measurably
            dimmer while it draws than it was.

            AND THE FLOOD NO LONGER READS AS A COLOUR ARRIVING. White-to-gold
            made the wipe legible as an event; gold-to-gold makes it a change
            of WEIGHT only, outline to solid. That is a quieter opening, which
            may well be the point. The handoff argument survives intact: the
            curtain still lifts onto an ink hero carrying a solid
            `bg-accent-gold` CTA, and now the whole opening is that gold rather
            than only its last frame.

            STILL NOT A LITERAL. `--color-accent-gold` is the token, passed
            through `style` rather than a `stroke=` attribute because `var()`
            does not resolve in SVG presentation attributes. The old stroke was
            `currentColor` against a `text-white` wrapper; both are gone, since
            `currentColor` was that class's only consumer. Note for anyone
            reaching for a light keyline again: `var(--color-background)` looks
            like the right token and is a trap — globals.css carries a `.dark`
            block that redefines it to near-black, so the keyline would vanish
            into the curtain the day a theme switch is added.

            A BRIGHTER GOLD WAS BUILT AND REJECTED. `#c79f35` at 6.79:1 —
            gold lifted for a dark ground exactly the way `--color-pending` and
            the three provenance accents have on-ink counterparts — is richer
            as a solid mass, where the base gold reads faintly olive. It would
            also be a SECOND gold, and it would not match that hero CTA seconds
            later. If the base gold is ever judged too muted at this size, the
            CTA moves with it; the curtain does not get its own.

            The Accent Ration Rule permits an accent on large display type,
            which at this size it comfortably is. Nothing here carries meaning
            by colour — the wordmark's text is on the wrapper's
            `aria-label`. */}
        <SplashWordmark
          // A REPLAY REDRAWS, AND THIS IS WHAT MAKES IT REDRAW. The draw and
          // the flood are CSS animations declared `forwards`, so on a second
          // cycle the existing elements are already sitting at their finished
          // state and neither restarts — the curtain would show a wordmark
          // that is simply, instantly, complete. Remounting the subtree is
          // what starts the animations over.
          key={replay}
          // ONE COLOUR, BOTH PHASES — client instruction, 8 Sep 2026: the
          // outline takes the same gold as the flood. The wrapper's
          // `text-white` went with it; `currentColor` was its only consumer,
          // and a class kept for a reference that no longer exists is how the
          // next person concludes white still matters here.
          //
          // Both values are still tokens, not literals, and both still reach
          // the SVG through `style` rather than a presentation attribute —
          // `var()` does not resolve in `stroke=` or `fill=`, which is the
          // rule that made `SplashWordmark` take paint as props in the first
          // place.
          strokeColor="var(--color-accent-gold)"
          fillColor="var(--color-accent-gold)"
          // OUTLINES, NOT TYPE, since 1 Sep 2026. The client asked for the
          // curtain's "Byonyks" to look like the real Byonyks mark; no font
          // contains that B, so the wordmark is now artwork — Pacifico
          // outlines for "Akshar" beside Byonyks' own traced logo, both in one
          // coordinate system in `src/lib/splash-wordmark.ts`. Yellowtail left
          // `layout.tsx` in the same change, so no webfont loads for this.
          //
          // STROKE WIDTH IS IN USER UNITS, NOT PIXELS, against a viewBox whose
          // x-height is 342 — roughly 5.6x the 128-unit box the old text
          // version used, which is why this number is not the 7 that one
          // carried. Half of it is what you see: the inner half is masked
          // away, exactly as on `StrokeText`, so this draws at 22 units and
          // leaves the same weight of gold keyline once the flood lands.
          strokeWidth={41}
          // From `splash.ts`, not chosen here: `SPLASH_MIN_MS` is derived from
          // these four numbers AND the lockup's contour count, so the curtain
          // cannot lift before the last stroke finishes. Retune them there.
          drawDuration={SPLASH_DRAW_S}
          fillDelay={SPLASH_FILL_DELAY_S}
          fillDuration={SPLASH_FILL_DURATION_S}
          stagger={SPLASH_STAGGER_S}
        />
      </div>
    </div>
  );
}
