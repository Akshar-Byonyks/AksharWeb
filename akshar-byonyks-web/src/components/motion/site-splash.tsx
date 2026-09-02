"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { StrokeText } from "@/components/motion/stroke-text";
import { cn } from "@/lib/utils";
import {
  onSilkReady,
  SPLASH_ARM_ID,
  SPLASH_DRAW_S,
  SPLASH_FADE_MS,
  SPLASH_FILL_DELAY_S,
  SPLASH_FILL_DURATION_S,
  SPLASH_FONT_METRICS,
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

export function SiteSplash() {
  // Identifies this element so the inert sweep below can skip it. The
  // curtain's own visibility is CSS, not React.
  const rootRef = useRef<HTMLDivElement>(null);
  const [leaving, setLeaving] = useState(false);

  const dismiss = useCallback(() => {
    // The injected <style> IS the curtain. Its presence is the armed state and
    // removing it is the dismissal — `.site-splash` returns to display:none
    // and the scroll lock lifts in the same paint.
    const arm = document.getElementById(SPLASH_ARM_ID);
    if (!arm) return;

    setLeaving(true);

    window.setTimeout(
      () => {
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

  useEffect(() => {
    // Not armed: not Home, or the failsafe already fired. The arming script
    // is the single decision point — this component never second-guesses it,
    // so there is exactly one place the rule lives.
    if (!document.getElementById(SPLASH_ARM_ID)) return;

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
  }, [dismiss]);

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
        {/* Gold draws, white floods, and neither is a literal.
            `--color-accent-gold` is the token; the flood is `currentColor`
            against a `text-white` wrapper, which is the same white the rest of
            the site sets on ink and keeps CLAUDE.md's no-hardcoded-hex rule
            intact. Deliberately NOT `var(--color-background)`, which looks
            like the right token and is a trap: globals.css carries a `.dark`
            block that redefines it to near-black, so the flood would disappear
            into the curtain the day a theme switch is added.

            Gold on ink measures 5.39:1 and the Accent Ration Rule permits an
            accent on large display type, which at this size it comfortably is.
            Nothing here carries meaning by colour — the wordmark's text is on
            the wrapper's `aria-label`. */}
        <StrokeText
          className="text-white"
          text="Akshar Byonyks"
          strokeColor="var(--color-accent-gold)"
          fillColor="currentColor"
          // THE BYONYKS LOGO'S FACE, on client instruction (1 Sep 2026), and
          // the only element on this site that is not Noto Sans. The family
          // and the three metrics travel together from `splash.ts` — the
          // viewBox is computed from them, and a script's box is nothing like
          // a sans's, so changing one without the others clips the glyphs.
          fontFamily={SPLASH_FONT_METRICS.family}
          advanceEm={SPLASH_FONT_METRICS.advanceEm}
          ascentEm={SPLASH_FONT_METRICS.ascentEm}
          descentEm={SPLASH_FONT_METRICS.descentEm}
          // Zero, not the component's -2px default. Yellowtail is a connected
          // script and negative tracking pulls its joins apart.
          letterSpacing={SPLASH_FONT_METRICS.letterSpacing}
          fontSize={128}
          // 400 is the only weight Yellowtail ships. The real mark is bolder;
          // on an outline that draws and floods, letterform structure carries
          // the resemblance and stroke weight does not.
          fontWeight={400}
          // STROKE WIDTH IS IN USER UNITS, NOT PIXELS, and that is the one
          // number the original component gets wrong once its SVG is scaled.
          // `strokeWidth` is measured against the 128-unit font inside the
          // viewBox; the viewBox is then fitted to the container, so at this
          // size every user unit lands at roughly 0.7 CSS px. The original's
          // 1.4 default renders as a sub-pixel hairline that disappears on a
          // dark ground — measured at 0.87 CSS px before this was raised.
          //
          // DOUBLED FROM 3.5 ON 1 SEP 2026, and it is not a weight change.
          // `StrokeText` now masks the stroke to the OUTSIDE of the letterform
          // union, so a centred stroke shows only its outer half and 3.5 drew
          // at half the weight it used to. 7 puts the visible band back to the
          // 3.5 that was measured here. The two numbers move together: halve
          // this and the drawn line halves with it.
          strokeWidth={7}
          // From `splash.ts`, not chosen here: `SPLASH_MIN_MS` is derived from
          // these same four numbers so the curtain cannot lift before the
          // flood lands. Retuning the animation means editing them there.
          drawDuration={SPLASH_DRAW_S}
          fillDelay={SPLASH_FILL_DELAY_S}
          fillDuration={SPLASH_FILL_DURATION_S}
          stagger={SPLASH_STAGGER_S}
        />
      </div>
    </div>
  );
}
