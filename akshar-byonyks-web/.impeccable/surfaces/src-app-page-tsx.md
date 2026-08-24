---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

## Scope & mode

Home page (`/`), Persuade. Front door for all four audiences (investors → patients → clinicians → distributors, priority order). Establish credibility and route fast — no single funnel.

## Audience, job, action, proof

- **Job:** convince a first-time visitor in seconds that Akshar Byonyks is credible and licensed, then route them to the content built for their audience.
- **Action:** click into an audience-specific page, or reach the CTA band.
- **Proof:** FDA 510(k) clearance (May 2025, Byonyks USA), the licensing relationship, the four-benefit framework, four-audience routing.
- **Constraint:** the human-stakes opening (access-geometry hero) can't push investor-priority proof past the first two sections — the FDA/licensing credibility line lives in the hero itself, not deferred to a later section.

## Chosen direction

**Access-geometry-led** (concept-seed, scope surface, mode persuade, seed `9814a69c`, dealt lead index 3 of 7). The hero dramatizes the India argument — in-center dialysis's weekly trip vs. home PD — as one scroll-scrubbed scene (not two static images) *before* company-credibility content. §9.1's nine rows compose as: hero fuses rows 1–2 (hero + India problem stats), then rows 3–9 in spec order.

**Memorable moment:** two cards — "The in-center routine" and "A quiet night at home" — physically stacked in the hero, the front card scaling back and fading into the deck while the one behind it grows forward to replace it, as the visitor scrolls one gesture through the hero.

**Motion (locked across three rounds):**
- Hero: scroll-scrubbed card stack (react-bits' "Scroll Stack" pattern, two states), the page's one focal/authored moment (see the direction contract in `src/app/layout.tsx`). Revision 2 (20 Aug 2026): replaced a plain opacity cross-fade of two bare SVGs plus a separate caption line below the stage — reported as reading like "text at the bottom that slowly reveals," not a visible scene change. Each state is now a self-contained card (title + caption inside it) driven by scale + translateY + translateX + rotate, not opacity alone, so the swap reads as one card physically replacing another. Revision 3 (same day): the stack originally shared the headline's pinned viewport, cropping it into whatever space the headline left over — reported as "does not fit proportionally." The headline is now its own static block; the stack gets its own section directly beneath it, pinned within a shorter 160vh track (~60vh of scroll room, "a bit" of scroll rather than a near-full second viewport) and sized larger to fill it. Revision 4 (same day): sized larger again on explicit request, and the inactive card's opacity now runs the full 1-to-0 range (no visible floor) so it's completely transparent at rest and at scroll-end — previously it kept a faint "peek" at both extremes. Revision 5 (same day): the "home" card's drawn house/bed/lamp/device scene was replaced with the real Byonyks X-1 product render (same asset and attribution as "Our answer"), chosen from a short menu of options after an abstract data-motif treatment was tried and rewound. Revision 6 (same day): the "in-center" card's drawn clinic/road/clock scene was replaced with a real hemodialysis machine photo too (Wikimedia Commons, CC BY-SA, by Patrick Glanz), on request, so both cards are real photos rather than one photo and one drawing. That source wasn't a pre-cut asset like the X-1 render — it's a real, cluttered clinical photo — so it needed actual editing: cropped to the gauge/screen panel only (dropping a cardboard box, a tiled wall, and the machine's visible brand/model label, so the card reads as generic rather than naming a specific competing manufacturer, honoring the "generic" framing from the original request); a faint reflection of a person in the dark monitor was patched out (PRODUCT.md's caution against depicting people in a clinical setting applies to incidental reflections, not just deliberate portraits); edges feathered to transparent via an alpha gradient to match the X-1 render's treatment. Every edit is disclosed in `public/images/README.md`. Detail in `src/components/home/access-geometry-scene.tsx` and `src/components/home/access-geometry-hero.tsx`.
- Benefit cards (row 4) and audience cards (row 6) cascade in staggered on scroll-into-view (`ScrollReveal`, "rise" variant). `ScrollReveal` repeats on every entry now, not one-shot (20 Aug 2026, requested by name) — scroll to the bottom and back up past a revealed element resets it, so scrolling down again replays the fade-in rather than finding it already visible. Applies everywhere `ScrollReveal` is used on the page, not just these two rows.
- The X-1 render in "Our answer" settles into place on scroll-into-view (`ScrollReveal`, "settle" variant — scale, not rise, since it's one focal image, not a list item).
- The "10,000+ therapies" proof stat counts up on scroll-into-view (`CountUpStat`); "510(k)" and "ISO 13485" beside it stay static since they're labels, not quantities.
- Audience cards additionally get cursor-responsive tilt/lift, each a distinct doorway rather than a uniform grid.
- Built-on-Proven, Latest news, and the CTA band all get a quiet whole-section reveal for continuity with the rest of the page.

**Color (third round, deviates from spec §6.1 — full reasoning in `deviations.md`):**
Expanded from single-accent (gold only) to a four-role wayfinding system — primary blue, gold, teal, plum — each with one fixed meaning, reused identically across the benefit cards, the audience cards, and the proof-band stats. Gold stays exactly as rationed before (large display/non-text only); teal and plum follow the identical rationing. A separate semantic "pending" amber marks unsourced-figure placeholders, deliberately distinct from both gold and the destructive red. The hero's two scene cards follow the same rule: the "home" card carries gold on its border, background wash, and icon only, never its title/caption text.

## Unresolved / flagged in the build

- **India dialysis-gap stats** (row 2): still unsourced (Open Questions 1.8). Shipped as visibly flagged placeholders (`PendingStat`, now in the semantic pending color), not invented numbers.
- **"62%" claim** (row 7): not shipped as a specific figure — unsourced per PRODUCT.md Evidence on Hand. Relationship stated qualitatively instead; reinstate the number once footnoted.
- **Phone number** (CTA band): placeholder, Open Questions 1.1. Single source of truth at `src/lib/site-config.ts` (`siteContact.phone`) — must be replaced before launch (spec §14.4 item 3).
- **X-1 device imagery** (row 3, "Our answer", and the hero's "home" card) — **resolved.** Byonyks USA's own official product render ships in both places, correctly attributed as a render rather than a photograph each time. Provenance: `public/images/README.md`.
- **Hero "in-center" card imagery** — **resolved.** Now a real, rights-cleared photo (Wikimedia Commons, CC BY-SA) of a hemodialysis machine's control panel, cropped to stay generic (no competitor brand/model visible) and edited to remove an incidental reflection of a person. Provenance and every edit disclosed in `public/images/README.md`.
- **"Latest" section** (row 8): spec asks for three items; only two real migrated articles exist (spec §9.7). Shipped with two rather than a fabricated third.
- **Color system** (spec §6.1) — **deviated, not resolved.** The Home page now runs a four-accent system beyond what §6.1 specifies. Scope is Home only; whether this becomes the sitewide system (a formal §6.1 amendment) or stays Home-specific is an open decision for whoever builds the next surface. See `deviations.md`.
