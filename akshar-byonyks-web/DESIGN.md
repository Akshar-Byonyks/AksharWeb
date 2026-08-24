---
name: Akshar Byonyks
description: Indian licensing partner bringing Byonyks' FDA-cleared home peritoneal dialysis technology to India.
colors:
  ink: "#011a48"
  primary: "#0d5d8d"
  accent-gold: "#b08d2f"
  teal: "#0e7c72"
  plum: "#6b3a5c"
  pending: "#9c6410"
  pending-on-ink: "#d99a3a"
  line: "#d8e2e8"
  surface-2: "#f4f7f9"
  surface-3: "#eaf1f5"
  background: "#ffffff"
  foreground: "#33373d"
  muted-foreground: "#5f6b73"
  destructive: "#b91c1c"
typography:
  display:
    fontFamily: "Noto Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Noto Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Noto Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Noto Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  2xl: "18px"
spacing:
  section-y: "5rem"
  band-y: "4rem"
  card-p: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
  button-gold:
    backgroundColor: "{colors.accent-gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  card:
    backgroundColor: "#ffffff"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-p}"
---

# Design System: Akshar Byonyks

## Overview

**Creative North Star: "The Quiet Clinic"**

A clinical-trust system that spends almost all of its register in one committed navy and a near-white ground, then uses color the way a hospital uses department signage: not decoration, wayfinding. Every accent beyond navy carries one specific meaning and recurs wherever that meaning applies — gold for "home / India," teal for "clinical evidence," plum for "institutional / formal" — so a visitor who learns the code once (on the four benefit cards) reads it instantly the second time (the four audience cards). The system reads as sober and evidence-led first (dense proof, sourced footnotes, flat certification-style stats) because the Priority-1 and Priority-3 audiences (investors, clinicians) distrust marketing language, and the Priority-2 audience (patients) needs calm, high-contrast legibility over stimulation. Ink navy is not an accent here; on the Home hero it is spent at full page-scale coverage, the system's boldest color move, and everywhere else it recedes to headings and text. Every accent stays rationed to large display type, icon chips, and non-text graphics — never body copy, never small UI — so rarity keeps carrying meaning rather than becoming decoration. (20 Aug 2026: expanded from a single-accent system to this four-role one at explicit user request, beyond what `docs/aksharbyonykswebsitespec.md` specifies — see `deviations.md`.)

Confirmed visual rejections: no drop shadows as a default depth system (cards separate by a 1px border, not elevation); no gradient text; no kicker/eyebrow labels above headings; no glass or blur effects; no fabricated device photography or renders. Both access-geometry hero cards now carry real, correctly-attributed images rather than illustration: the "home" card is Byonyks' own official render (never claimed as photography when it's a render); the "in-center" card is a real, rights-cleared photo (Wikimedia Commons, CC BY-SA), cropped and edited — every edit disclosed in `public/images/README.md` — rather than a drawing standing in for something real. Authored line art remains the fallback wherever no real, attributable image exists for a subject; it is not this system's default anymore for either hero card.

**Key Characteristics:**
- Flat, bordered surfaces over shadowed ones — depth is tonal (surface-2/surface-3 tints), not lifted.
- Four accent roles (gold, teal, plum, plus primary blue), each with one fixed meaning, recurring across benefit cards, audience cards, and proof stats — never a fifth ad hoc hue, never a role reused for a different meaning.
- Every accent is rationed the same way gold always was: large display type, icon chips, and non-text graphics only, never body text or small UI.
- Line-art iconography (SVG, single stroke weight) carries concepts no real image exists for yet; a real, correctly-attributed image — a Byonyks asset (the X-1 render) or a rights-cleared third-party photo, cropped/edited as needed and disclosed in `public/images/README.md` — replaces it wherever one exists.
- Generous section rhythm (`py-20` / 80px between major sections) keeps a dense, fact-heavy page from feeling cramped.

## Colors

Navy and a WCAG-AA blue carry the system's weight; four rationed accent roles carry meaning (deviations.md — this expands spec §6.1's single-accent system at explicit user request).

### Primary
- **Deep Clinical Ink** (`#011a48`): headings, the hero and CTA band's full-bleed ground, body copy's darkest register. The system's most committed color; used at full section coverage exactly twice (hero, CTA band), never as a small chip elsewhere.
- **Accessible Sky Blue** (`#0d5d8d`): links, primary buttons, stat numbers, icon fills. Darkened from the parent brand's `#1388cd` specifically to clear WCAG AA (4.5:1+) — this darkening is a hard constraint, not a stylistic choice; never lighten it back toward the source hue.

### Secondary
- **India Gold** (`#b08d2f`): "home / India." **Large display type and non-text graphics only — never body text, never small UI, never links.** Confirmed in PRODUCT.md as a WCAG failure at small sizes (3.14:1 on white). Marks: the after-state of the access-geometry scene, primary CTA buttons on dark grounds, the affordability benefit icon, the "Patients & families" audience card, the therapies-delivered proof stat.

### Tertiary
- **Clinical Teal** (`#0e7c72`, 5.07:1 on white): "evidence / clinical rigor." Marks: the residual-kidney-function benefit icon, the "Clinicians" audience card, the ISO 13485 proof stat. Same large-type/non-text/icon-chip rationing as gold.
- **Institutional Plum** (`#6b3a5c`, 8.81:1 on white): "institutional / formal." Marks: the toxin-clearance benefit icon, the "Distributors & government" audience card, the "In India" regulatory panel on `/innovation/the-x1-cycler/` (CDSCO and the Medical Device Rules 2017 are an institutional position, which is plum's own meaning rather than plum borrowed for contrast). Same rationing as gold and teal.

### Neutral
- **Paper White** (`#ffffff`): base background, card surfaces.
- **Cool Mist** (`#f4f7f9`): alternating section backgrounds (`surface-2`) — the system's primary way of separating sections without a rule or shadow.
- **Pale Sky** (`#eaf1f5`): a slightly cooler tint step (`surface-3`) for icon chips and subtle emphasis, used more sparingly than Cool Mist.
- **Hairline** (`#d8e2e8`): the single border color used everywhere a stroke is needed — cards, dividers, form fields.
- **Working Gray** (`#33373d` / muted `#5f6b73`): body text and secondary/muted text respectively.
- **Clinical Alert** (`#b91c1c`): destructive/error only. Deliberately excluded from the brand palette everywhere else — the source logo's kidney-icon red never enters the UI token system, so it never collides with this error meaning.

### Semantic
- **Pending Amber** (`#9c6410` on light grounds, `#d99a3a` — `--color-pending-on-ink` — on the ink hero ground): "figure pending source citation" only. Not a brand accent and never reused as one; a state color stays a state color. The two-value split exists because the base color only clears WCAG's 3:1 UI-component floor on ink, not the 4.5:1 text floor — the lighter value is for text on ink, the base value for everything else.

### Named Rules
**The Full-Bleed Rule.** Ink navy is used as a whole-section background in exactly the highest-stakes moments — never as a card fill, never as a small panel. Its rarity at full coverage is what makes those moments read as the page's emotional peaks. Revised 24 Aug 2026: there are still exactly two such moments, but the second is now **one shaped closing mass** rather than a single band. The CTA band and the site footer are the same continuous ink field, entered across the silhouette edge (below) and carrying no border between them — the footer is not a third ink spend, it is the bottom of the second one. The corollary is that anything else wanting to sit inside that closing mass joins the existing ink rather than introducing a new dark surface of its own.

**The Accent Ration Rule** (formerly the Gold Ration Rule, generalized 20 Aug 2026 to cover all four accents). Each accent — gold, teal, plum, and primary blue where it's acting as an accent rather than the workhorse link/button color — appears on large display type, icon chips, or non-text graphics only. Never body text, never small UI, never a fifth ad hoc hue standing in for one of the four. If a new meaning is needed, it gets one of the four existing roles reused deliberately, or a new role added and documented here — never a one-off color chosen in a single component.

**The Wayfinding Rule.** An accent's meaning is fixed sitewide, not per-section: gold always means "home/India," teal always means "clinical evidence," plum always means "institutional/formal." A component may not borrow an accent's color for a different meaning just because it's visually convenient.

## Typography

**Display Font:** Noto Sans (with system-ui, sans-serif fallback)
**Body Font:** Noto Sans (same family — one self-hostable face across every role, Devanagari subset included for the Hindi roadmap)

**Character:** A single neutral, highly-legible grotesque doing every job in the system — display, body, and label. The choice is deliberately unglamorous: this is a medical-device site for an audience that skews older with diabetes-related visual impairment, so personality is expressed through scale, weight, and color, never through typeface flourish.

### Hierarchy
- **Display** (700, `clamp(2.25rem, 5vw, 3.75rem)`, 1.1 line-height, -0.02em tracking): hero H1 only.
- **Headline** (700, `1.875rem`–`2.25rem`, 1.2 line-height): section H2s (e.g. "Why it is different", "Who we serve").
- **Title** (600, `1.125rem`): card titles (benefit cards, audience cards, news items).
- **Body** (400, `1.125rem`, 1.6 line-height): lead paragraphs under section headings; measure capped by the surrounding `max-w-xl`/`max-w-2xl` container rather than a fixed ch value.
- **Label** (600, `0.75rem`, 0.05em tracking, uppercase): the rare all-caps micro-label ("The dialysis gap in India"), used only where content genuinely needs a category marker — never as a decorative kicker above a heading.

### Named Rules
**The One-Family Rule.** Every role — display, body, label — is Noto Sans. No second face is introduced for "technical" or "editorial" contrast; weight and size carry that distinction instead.

## Layout

A single centered container, `max-w-[1280px]`, with responsive edge padding (`px-4` mobile, `sm:px-6`, `lg:px-8`) — used identically by the header, footer, and every Home section. Sections stack vertically at `py-20` (major content sections) or `py-16` (dense "band" sections: proof stats, CTA), alternating `bg-background` and `bg-surface-2` to separate sections tonally without rules. The one place a section boundary is not a straight line is the closing transition into the ink mass (see Silhouette Edge), which is why that boundary carries no hairline: a rule drawn across it would seam a mass meant to read as continuous. Card grids run 1 column on mobile, 2 on `sm:`, up to 4 on `lg:` for four-item groups (benefit cards, audience cards), with `gap-5`. No sidebar or off-canvas layout anywhere on Home; the mobile drawer nav is the one exception, using a native `<dialog>`.

**The framing-and-artifact split** (added 24 Aug 2026, `/innovation/the-x1-cycler/`). A section built around one dense artifact — a long specification table, and later a comparison table or a chart — splits into two columns from `lg:` up, `grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]` with `gap-16`: the heading and its lead paragraph on the left at the narrower share, the artifact on the right at the wider one. It stacks to one column below `lg`, heading first. The alternative — heading full-width above a `max-w-3xl` table — leaves half the desktop viewport empty beside thirteen rows of data and reads as an unfinished section rather than a deliberately narrow measure. Prose sections keep the full-width heading and the `max-w-2xl`/`max-w-3xl` measure; this pattern is for sections whose subject is a structured artifact, not a paragraph.

## Elevation & Depth

Flat by default. Depth comes from tonal layering (surface-2/surface-3 against background/card) and 1px borders (`--color-line`), not shadows. The one shadow in the entire built system is the desktop header's mega-menu popover (`shadow-lg`) — a structural affordance for a floating panel, not a decorative default. New surface work should reach for a border or a tonal shift before reaching for a shadow.

### Named Rules
**The Flat-By-Default Rule.** Cards, bands, and sections separate using a 1px border or a tonal background shift. A shadow is earned only by an element that is genuinely floating above the page (a popover, a dropdown), never by a card sitting in normal document flow.

## Shapes

A three-step radius scale, all soft rounded corners, no sharp or pill shapes: `rounded-sm`/`md` (6–8px) for small interactive targets (nav links, inline text links), `rounded-lg` (10px) for buttons and small utility panels (the pending-stat placeholder), `rounded-xl` (14px) for standard content cards (benefit cards, news cards), `rounded-2xl` (18px) for the largest featured cards (the four audience doorway cards). Borders are 1px, always `--color-line`, never a heavier or colored rule.

## Components

### Buttons
- **Shape:** `rounded-lg` (10px).
- **Primary:** `bg-primary` / white text, for actions on light grounds.
- **Gold:** `bg-accent-gold` / ink text — reserved for the primary action on a dark (ink) ground, where it doubles as the system's rare accent spend (e.g. "See how it works", "Send an enquiry").
- **Outline:** transparent with a `border-white/30` on dark grounds, or `border-border` on light — the secondary action beside a primary/gold button.
- **Hover / Focus:** background opacity step on hover (`/80`, `/85`); a 2px offset focus ring in `--ring` on every interactive element, never suppressed.

### Cards / Containers
- **Corner Style:** `rounded-xl` standard, `rounded-2xl` for featured/doorway cards.
- **Background:** white (`--card`) on tinted sections, or a light per-card tint (audience cards vary background by the four accent roles — light blue, warm cream/gold, light teal, light plum — matching each card's icon color, so the tint carries the same meaning as the icon rather than being a separate decorative choice).
- **Shadow Strategy:** none; see Elevation & Depth.
- **Border:** 1px `--color-line` on every card.
- **Internal Padding:** `p-6` (24px) standard.

### Placeholder / Pending Data
- **Style:** dashed 1px border in the semantic pending color (vs. solid `--color-line` for real content — the one place the system varies both border style and border color), tonal background matching the section, a small clock icon plus mono-set label ("Figure pending source citation") in the pending color above the value.
- **Purpose:** a deliberate, legible way to ship a genuinely unsourced number without inventing one or silently omitting the section. Not decorative — this pattern exists because PRODUCT.md bars unsourced statistics from shipping as confident claims. The pending color specifically (not gray, not gold) exists so a viewer distinguishes "this is incomplete" from both "this is styled information" and "this is the brand's India accent."
- **Two sizes, one language** (generalized 24 Aug 2026, was `PendingStat`). `PendingNote` is the block form — the card above, with a caller-supplied `note` line, since not every pending thing is a statistic: the X-1 page marks an unconfirmed regulatory position ("Confirmation pending") and a missing 510(k) number ("Reference pending") with the same component. The **compact form** is an inline chip sized for a table cell — same dashed border, same pending color, same mono clock label, reading just "Pending" with the explanation as ordinary text beside it. Use the block form where the pending item is the section's subject; the chip where it is one row among many. Both are the same visual language on purpose: a reader who learns it in the specification table recognizes it in a stat card.

### Breadcrumbs
- **Where:** every page except Home (spec §7.2), at the top of the first section, inside that section's ground rather than in a strip of its own — so it inherits `tone="dark"` on an ink hero and the light treatment elsewhere.
- **Style:** `text-sm`, `muted-foreground` (or `white/60` on ink), chevron separators in `--color-line` (or `white/40`), the current page in `text-ink` (or `white/90`) with `aria-current="page"` and no link.
- **Hit area:** links carry `py-1` so the target clears 24px tall. At the label's own height they measured 20px, and this audience skews older with diabetes-related visual impairment — PRODUCT.md says default to the stricter option when that population carries the cost.
- **Unbuilt ancestors render as text, not links.** While the site is built page by page, a real trail can pass through a hub that does not exist yet. An hrefless crumb is plain text and is omitted from the `BreadcrumbList` structured data's `item`; pointing search engines at a 404 is worse than leaving a position unlinked. The visible trail and the structured data are emitted by the same component so neither can ship without the other.

### Specification / Attribute Table
- **Element:** a real `<table>` at every width, `<th scope="row">` for the attribute and `<td>` for the value, wrapped in the standard `rounded-xl border border-line bg-card` container. Rows separate with `border-t border-line` — no zebra striping, consistent with Flat-By-Default.
- **The container scrolls, the page does not.** That wrapper carries `overflow-x-auto`, not `overflow-hidden`. At 200% text size a table's min-content width exceeds a 390px viewport and a table cannot reflow below it: clipping would lose values, and letting it push the document would make the whole page scroll sideways. Scrolling inside the container is the compliant answer — WCAG 1.4.10 exempts content that genuinely needs a two-dimensional layout, which a data table does. Any wide artifact (comparison table, chart) follows the same rule.
- **Padding and measure:** `px-4 py-4` rising to `sm:px-6`; the attribute column takes `w-[42%]`, `sm:w-[38%]`. The narrower mobile padding is not a style choice — at 390px, `px-6` on both cells spent 96px of the viewport on gutters and forced four-line label wraps.
- **No stacking variant.** Spec §7.2's "stacks to cards under 768px" targets multi-column comparison tables, which become unreadable narrow. A two-column attribute/value table wraps instead, and keeping one real table preserves the row and header semantics that a `display:block` card treatment destroys for screen readers. A genuine multi-column comparison table still needs the card treatment.
- **Pending rows use the compact chip,** never an em dash, "TBC," or an estimate.

### Navigation
- **Style:** flat text links, `text-sm font-medium`, `rounded-md` hover background (`surface-2`). Desktop: CSS-only hover/focus-within mega-menu, no JS. Mobile: full-screen native `<dialog>` drawer, the system's one client-interactive nav pattern.

### Access-Geometry Scene (signature component)
A two-state scene, both states a real photo rather than illustration: "in-center" is a real hemodialysis machine's control panel (Wikimedia Commons, CC BY-SA, cropped and edited — see below), "home" shows Byonyks USA's own official X-1 product render, the same asset used in "Our answer" — each inside its own card. Used only on the Home hero, as its own section directly beneath the hero headline — not sharing the pinned viewport with it. On `prefers-reduced-motion: no-preference`, it is pinned via `position: sticky` inside a short scroll track (160vh — roughly 60vh of scroll room, "a bit" of scroll, not a full extra viewport) sized to give the stack a full viewport of its own; the two cards form a physical stack — as a CSS custom property (`--p`, 0–1) is driven by scroll position (set imperatively, no animation library), the front "in-center" card scales down, drifts up and left, rotates back, and fades to near-zero opacity as it recedes toward the back of the deck, and the "home" card behind it grows, un-rotates, and rises to take the front. Revision 2 (20 Aug 2026): the original build cross-faded two bare, unframed SVGs with a separate caption line below the stage — it read as a caption slowly fading in, not a visible scene change. Each state is now a self-contained card (title and caption included) and the transform is scale + translateY + translateX + rotate, not opacity alone, so the swap reads as one card physically replacing another — react-bits' "Scroll Stack" pattern, adapted to two states instead of a list. Revision 3 (same day): the stack originally shared the headline's pinned viewport, squeezing it into whatever space the headline left over — reported directly as not fitting proportionally. It now gets its own section and its own full pinned viewport, sized larger accordingly. Revision 4 (same day): sized larger again, and each card's opacity now runs the full 1-to-0 range rather than a partial range with a visible floor — the inactive card is completely transparent at rest and at the far end of the scroll, appearing only during the transition itself, rather than always peeking through a little. Revision 5 (same day): the drawn house/bed/lamp/device scene was replaced with the real X-1 render — the payoff card now shows the actual device rather than a drawing standing in for it, and carries the same "Official product render, courtesy of Byonyks USA" attribution used in "Our answer." The render's source PNG has a genuine alpha channel (confirmed by pixel-sampling its corners, not assumed), so it sits directly on the card's own dark/gold background rather than behind a white backing plate — the first attempt added one reflexively and it read as a sticker. Revision 6 (same day): the drawn clinic/road/clock scene was replaced with a real hemodialysis machine photo (Wikimedia Commons, CC BY-SA), requested to match the X-1 render's real-photography treatment rather than leave the pair asymmetric. Unlike the X-1 render, this source photo isn't a pre-cut marketing asset — it's a real, cluttered clinical-setting photograph, so it needed real editing before it could sit on the card the same way: cropped to just the gauge/screen panel (excluding a cardboard box and tiled wall the photo also showed, and excluding the machine's visible brand/model label so the card doesn't read as a named-competitor callout, honoring "generic" from the original request); a faint reflection of a person visible in the dark monitor was patched out with a solid fill, since PRODUCT.md's caution against depicting people in a clinical setting applies to incidental reflections, not just deliberate portraits; and the edges were feathered to transparent with an alpha gradient — the same visual treatment as the X-1 render's genuine alpha channel, engineered here rather than found. Every edit is disclosed in `public/images/README.md`. Under reduced motion, it renders as a static side-by-side pair of the same two cards instead of a frozen mid-transition frame. This is one of the system's two scroll-driven interactions (the other is the Silhouette Edge below, added 24 Aug 2026); neither should be treated as a general pattern to reach for elsewhere without the same reduced-motion fallback discipline. The two are deliberately different in kind: this one is *scrubbed* — scroll position is the timeline, and the viewer can run it backwards — whereas the silhouette edge only *settles*, arriving at one finished state and staying there. A third scroll-driven interaction needs a reason that is not "the last two were nice."

### Silhouette Edge (closing transition)
The hand-off from the page's last light section into the closing ink mass, across an irregular layered horizon rather than a straight rule. Three terrain ridges of `--color-ink` at descending opacity (35% / 65% / 100%) as one inline SVG per layer, `preserveAspectRatio="none"` over a shared `0 0 1440 160` viewBox, with the band's height set purely in CSS (`h-20` / `sm:h-28` / `lg:h-40`). Depth is tonal and by overlap — no shadow, no blur, consistent with Flat-By-Default. The ridges are deliberately *not* parallel: their crests sit at different x positions with different amplitudes, and the mid ridge passes in front of the rear one on the right-hand side, because evenly-spaced near-parallel curves read as three stacked ribbons rather than as terrain. The shapes are abstract land, not a skyline — at narrow widths `preserveAspectRatio="none"` steepens the curve, which is unremarkable on terrain and would visibly squash buildings.

**It belongs to the section above it, not to the footer.** The footer is sitewide; the background of whatever precedes it is not, and a silhouette only exists as a silhouette against a specific ground. So the last section renders `<SilhouetteEdge />` at its own top edge (on Home, the CTA band) and the footer simply continues the ink underneath. Its lead-in defaults to `bg-background` and is overridable for a page whose last section is tinted.

**Motion** (the system's second scroll-driven interaction). The two rear ridges start low and rise into their authored positions as the band crosses the bottom 60% of the viewport, driven by a `--p` custom property set imperatively on a rAF-throttled scroll handler — the same idiom as the access-geometry scene, no animation library. On fine-pointer devices they also drift horizontally against the cursor (`--mx`, −1 to 1). The front ridge never moves: it is the seal against the ink field below, and travel there would open a gap at the band's bottom edge. Everything is transform-only, so it stays on the compositor. Because this component ships on every page, the scroll and pointer listeners are attached only while the band is intersecting the viewport and torn down when it leaves — a footer decoration should not cost a permanent listener on a route nobody has scrolled to the bottom of. `prefers-reduced-motion` and the no-JS/pre-hydration render both get `--p: 1`: the finished, settled terrain, never a frozen mid-travel frame.

### Scroll Reveal (motion primitive)
A repeating IntersectionObserver reveal (`ScrollReveal`), two variants, exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`), no bounce. **Rise** (translate-y + opacity, 700ms): the default, for cards appearing as a list — benefit cards, audience cards, news cards, each sibling staggered by ~90ms. **Settle** (scale from 96% + opacity, 600ms): reserved for a single focal element easing into place, used once for the X-1 render in "Our answer." Every use degrades to instant-visible under `prefers-reduced-motion`. Reusing "rise" for a single non-list element, or reusing "settle" for a list, blurs the distinction the two variants exist to carry.

Revision (20 Aug 2026): changed from a one-shot reveal (fires once, then the observer disconnects and the element stays visible forever) to a repeating one, on request — "I want the fade in to continue if you scroll from top to bottom again." The observer now stays connected and toggles visibility on every `entry.isIntersecting` change: scrolling an element out of view (either direction) resets it, so scrolling back down past it replays the same reveal rather than finding it permanently already-visible. `prefers-reduced-motion` is unaffected — it forces full visibility regardless of the toggle either way, so there's nothing to replay for those users.

### Count-Up Stat (signature micro-component)
A scroll-triggered count from 0 to a target integer (`CountUpStat`), cubic ease-out, ~1.2s, used exactly once: the "10,000+ therapies delivered" proof point. Reserved for a genuine quantity — "510(k)" and "ISO 13485" beside it are labels, not counts, and stay static text. Counting a non-quantity to manufacture excitement is the kind of thing this rule exists to prevent.

## Do's and Don'ts

### Do:
- **Do** spend ink navy at full section coverage only for the highest-stakes moments (hero, final CTA) — its rarity at that scale is the point.
- **Do** restrict every accent — gold, teal, plum — to large display type, icon chips, and non-text graphics; treat any body-text or small-UI use as a defect, not a style choice.
- **Do** keep each accent's meaning fixed: gold is "home/India," teal is "clinical evidence," plum is "institutional/formal." Reuse an existing role before inventing a fifth hue.
- **Do** reach for an accent role only when its fixed meaning genuinely applies, and use primary blue for a peer group that has no such meaning — the X-1 page's four feature cards all take blue chips, because none of "warms fluid," "battery backup," "needle-free" or "on-device screen" is about home/India, clinical evidence, or institutions. A four-up grid is not a reason to spend four accents.
- **Do** separate sections with a 1px border or a `surface-2`/`surface-3` tonal shift before reaching for a shadow.
- **Do** label illustrative or unsourced content explicitly ("Figure pending source citation", "Illustrative diagram — photography pending") rather than presenting it as finished or omitting it.
- **Do** give every interactive element a visible 2px focus ring; this audience's accessibility needs are load-bearing, not optional polish.
- **Do** prefer a real, correctly-attributed image from Byonyks USA over authored illustration once one exists for the subject — but caption a render as a render, never as a photograph.
- **Do** give every scroll-driven or auto-playing animation a `prefers-reduced-motion` path that settles to the finished state instantly, never a frozen mid-animation frame.

### Don't:
- **Don't** introduce a second typeface. Noto Sans carries every role in this system.
- **Don't** use the destructive red (`#b91c1c`) or the logo's kidney-icon red anywhere outside error/destructive states — the palette deliberately keeps only one red meaning.
- **Don't** add a kicker or eyebrow label above a heading. The heading carries its own weight.
- **Don't** use hard offset shadows, glass/blur effects, gradient text, or bounce/elastic easing — none of these exist anywhere in the built system.
- **Don't** ship a specific unsourced statistic as a confident claim. Cut it, or mark it pending — never invent or soften it.
- **Don't** count up a label that isn't a quantity ("510(k)", "ISO 13485"). Count-up is reserved for real numbers.
- **Don't** use the semantic pending color as a brand accent, or a brand accent for a pending/incomplete state. A state color and a brand color must never trade places.
