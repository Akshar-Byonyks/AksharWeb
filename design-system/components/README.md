# Component staging

Third-party components parked here ahead of the real Next.js build (spec Phase 1). Nothing in this folder runs anywhere yet — no app exists in this repo to import it into (see `docs/aksharbyonykswebsitespec.md` Phase 0.1). Treat these as vetted source, ready to `cp` into `components/` once the app is scaffolded.

## Silk.jsx

Source: [reactbits.dev](https://reactbits.dev), Silk component, JS variant, saved verbatim (unmodified) on 19 August 2026.

**What it is:** an animated WebGL shader background — a full-bleed `<Canvas>` plane rendering a moving silk-like noise pattern, built on React Three Fiber (`@react-three/fiber`) and `three`.

**Not yet installed anywhere.** When it's wired into the real app:

- **Dependencies:** `npm i three @react-three/fiber` (not in the spec's current dependency list — add to `12.1.1`'s stack table when this lands).
- **`"use client"` required.** It's a Canvas/WebGL component with a continuous render loop — no server-rendering path, no way to shrink this to zero client JS.
- **Placement, per spec `12.8.3`'s Shaders.com verdict** (Silk is the same category of component — a WebGL shader background — so the same guardrails apply even though it ships via reactbits.dev, not Shaders.com): **homepage hero only.** Never on patient, clinical, or regulatory pages. Static image fallback for the no-JS/reduced-motion case. Disabled entirely under `prefers-reduced-motion`.
- **Performance:** `11.3`'s budget is currently deferred (v0.6) — no KB/LCP number blocks adding this during frontend build. It is exactly the kind of addition the deferred post-frontend performance pass (`14.4` item 9) exists to catch. Expect to measure it then, and be willing to cut it or replace it with a static/CSS treatment if it doesn't clear whatever budget gets set.
- **Suggested brand values**, from the 6.1 token set, if used behind the "Home dialysis" hero: `color="#0d5d8d"` (primary) rather than the component's own default `#7B7481`, to stay on-brand instead of shipping the library default.

No CSS-only variant was provided alongside this source (React Bits labels it "JavaScript + CSS" but the fetched source is Canvas/WebGL only — there's no separate stylesheet to it). Re-fetch from reactbits.dev if a CSS-only fallback treatment is needed later.

## ScrollStack.jsx / ScrollStack.css

Source: [reactbits.dev](https://reactbits.dev), ScrollStack component, JS + CSS variant, saved verbatim (unmodified) on 19 August 2026. **Targeted use: `/about-us/leadership/`**, stacking the five executive person cards (spec `9.5`, `7.2`) as the page scrolls.

**What it is:** a scroll-driven pinning/scaling effect — each `ScrollStackItem` pins and scales down as the next one scrolls over it — built on `requestAnimationFrame` + a `Lenis` smooth-scroll instance, not on native CSS scroll-timelines.

**Not yet installed anywhere.** When it's wired into the real app:

- **Dependency:** `npm i lenis` — new, not in `12.1.1`'s stack table. Lenis intercepts and smooths the page's native scroll, so it isn't scoped to one section; typically it's initialized once per page (`useWindowScroll={true}` fits the Leadership page — it's a single page-level section, not an independently-scrolling sub-container).
- **`"use client"` required** — scroll-position tracking via `useLayoutEffect` + `requestAnimationFrame` has no server-render path. Spec `7.2` (v0.7) lists **Person card + bio (Leadership only)** in its client-component reference for exactly this reason; it's an ordinary implementation choice, not something that needs sign-off.
- **`prefers-reduced-motion` is not handled in the source as given.** `7.1`'s motion rule ("fully disabled under `prefers-reduced-motion`") applies here same as it did to Silk and the exploded-view animation, and the pinning/scaling effect plus Lenis's scroll-hijacking both need to fall back to a plain stacked list — not just a shorter animation — for that media query, and for keyboard-only scrolling generally, since Lenis intercepting native scroll is a known friction point for keyboard and assistive-tech navigation.
- **Five cards is a light load for this effect** — ScrollStack is usually shown with more items than that. Worth a design review of whether five pinning transitions read as "polished" or as "fiddly" before committing engineering time; a static or CSS-only stacked layout is the fallback if it doesn't.
- **Performance:** same deferred-budget status as Silk (`11.3`, v0.6) — no KB/JS gate blocks adding this during frontend build, but it is exactly what the post-frontend performance pass and `14.4` item 9 exist to catch, given it adds a new runtime dependency (Lenis).
