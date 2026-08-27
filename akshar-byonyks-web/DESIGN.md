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

**Revised 26 Aug 2026, after the sitewide critique: up to three moments, assigned by meaning rather than by quota.** The two-moment cap was written to protect ink's rarity, and it did — but the cost was that every section between the opening and the closing had nowhere to go except white or the near-white `surface-2` tint, which is why five consecutive sections on Home and five on the X-1 page arrived at the same composition. The rule was limiting colour and, as a side effect, eliminating compositional variety.

The ceiling is now three, and the third is **earned by meaning, not spent to reach the number**:

- **Ink** carries *home, night, and the patient's life.* Home's "The cycler runs on its own while the household sleeps"; the X-1 page's device hero and its clinician IFU request.
- **White** carries *evidence, regulation, and specification.* The proof band, regulatory status, the specification table, the privacy policy. These stay in the light deliberately — the Priority-1 and Priority-3 audiences read documentary material, and putting a certification band on a dark ground would style it as persuasion.

This is the Wayfinding Rule extended from accent chips to grounds: a ground now means something, the same way gold means home/India. A page that has no third thing worth saying in ink spends two moments and stops; `/contact` and `/privacy-policy` do exactly that. Three is a ceiling, never a target.

**Two ink sections must not be adjacent.** They merge into one undifferentiated mass and both lose their edge. When the X-1 page's device section was first built on ink directly beneath the ink hero, the two read as a single 2,000px block; the fix was to merge them into one larger opening moment rather than to separate them with a token light band.

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
A two-state scene, both states a real photo rather than illustration: "in-center" is a real hemodialysis machine's control panel (Wikimedia Commons, CC BY-SA, cropped and edited — see below), "home" shows Byonyks USA's own official X-1 product render, the same asset used in "Our answer" — each inside its own card. Used only on the Home hero, as its own section directly beneath the hero headline — not sharing the pinned viewport with it. On `prefers-reduced-motion: no-preference`, it is pinned via `position: sticky` inside a scroll track (180vh — roughly 80vh of scroll room) sized to give the stack a full viewport of its own; the two cards form a physical stack — as a CSS custom property (`--p`, 0–1) is driven by scroll position (set imperatively, no animation library), the front "in-center" card scales down, drifts up and left, rotates back, and fades to near-zero opacity as it recedes toward the back of the deck, and the "home" card behind it grows, un-rotates, and rises to take the front. Revision 2 (20 Aug 2026): the original build cross-faded two bare, unframed SVGs with a separate caption line below the stage — it read as a caption slowly fading in, not a visible scene change. Each state is now a self-contained card (title and caption included) and the transform is scale + translateY + translateX + rotate, not opacity alone, so the swap reads as one card physically replacing another — react-bits' "Scroll Stack" pattern, adapted to two states instead of a list. Revision 3 (same day): the stack originally shared the headline's pinned viewport, squeezing it into whatever space the headline left over — reported directly as not fitting proportionally. It now gets its own section and its own full pinned viewport, sized larger accordingly. Revision 4 (same day): sized larger again, and each card's opacity now runs the full 1-to-0 range rather than a partial range with a visible floor — the inactive card is completely transparent at rest and at the far end of the scroll, appearing only during the transition itself, rather than always peeking through a little. Revision 5 (same day): the drawn house/bed/lamp/device scene was replaced with the real X-1 render — the payoff card now shows the actual device rather than a drawing standing in for it, and carries the same "Official product render, courtesy of Byonyks USA" attribution used in "Our answer." The render's source PNG has a genuine alpha channel (confirmed by pixel-sampling its corners, not assumed), so it sits directly on the card's own dark/gold background rather than behind a white backing plate — the first attempt added one reflexively and it read as a sticker. Revision 6 (same day): the drawn clinic/road/clock scene was replaced with a real hemodialysis machine photo (Wikimedia Commons, CC BY-SA), requested to match the X-1 render's real-photography treatment rather than leave the pair asymmetric. Unlike the X-1 render, this source photo isn't a pre-cut marketing asset — it's a real, cluttered clinical-setting photograph, so it needed real editing before it could sit on the card the same way: cropped to just the gauge/screen panel (excluding a cardboard box and tiled wall the photo also showed, and excluding the machine's visible brand/model label so the card doesn't read as a named-competitor callout, honoring "generic" from the original request); a faint reflection of a person visible in the dark monitor was patched out with a solid fill, since PRODUCT.md's caution against depicting people in a clinical setting applies to incidental reflections, not just deliberate portraits; and the edges were feathered to transparent with an alpha gradient — the same visual treatment as the X-1 render's genuine alpha channel, engineered here rather than found. Every edit is disclosed in `public/images/README.md`. Under reduced motion, it renders as a static side-by-side pair of the same two cards instead of a frozen mid-transition frame. This is one of the system's two scroll-driven interactions (the other is the Silhouette Edge below, added 24 Aug 2026); neither should be treated as a general pattern to reach for elsewhere without the same reduced-motion fallback discipline. The two are deliberately different in kind: this one is *scrubbed* — scroll position is the timeline, and the viewer can run it backwards — whereas the silhouette edge only *settles*, arriving at one finished state and staying there. A third scroll-driven interaction needs a reason that is not "the last two were nice."

### Silhouette Edge (closing transition)
The hand-off from the page's last light section into the closing ink mass, across an irregular layered horizon rather than a straight rule. Three terrain ridges of `--color-ink` at descending opacity (35% / 65% / 100%) as one inline SVG per layer, `preserveAspectRatio="none"` over a shared `0 0 1440 160` viewBox, with the band's height set purely in CSS (`h-20` / `sm:h-28` / `lg:h-40`). Depth is tonal and by overlap — no shadow, no blur, consistent with Flat-By-Default. The ridges are deliberately *not* parallel: their crests sit at different x positions with different amplitudes, and the mid ridge passes in front of the rear one on the right-hand side, because evenly-spaced near-parallel curves read as three stacked ribbons rather than as terrain. The shapes are abstract land, not a skyline — at narrow widths `preserveAspectRatio="none"` steepens the curve, which is unremarkable on terrain and would visibly squash buildings.

**The closing ink mass has a height budget (27 Aug 2026).** The silhouette is the first thing a visitor sees when they land at the bottom of a page, and it only reads as an edge if it is actually on screen when scrolling stops. Waves + CTA band + footer must therefore fit inside `100vh` minus the 64px sticky header, or the band is already behind the header by the time the page runs out of scroll — which is what shipped until this date (781px of mass on desktop, 1007px on phones). Vertical padding in the CTA band and the footer is the give: the CTA runs `py-8 / sm:py-10 / lg:py-12` and the footer `py-6 / sm:py-8`, both deliberately tighter than the `py-16` band rhythm above. Footer link padding is `py-1` on a `text-sm` line box — a 28px target, and the floor for this budget: `py-0.5` would land exactly on WCAG 2.5.8's 24px and leave nothing for a future line-height change. Below roughly 670px of viewport height the budget cannot be met without removing footer links, so short viewports still land inside the mass; that is a content decision, not a spacing one.

**It belongs to the section above it, not to the footer.** The footer is sitewide; the background of whatever precedes it is not, and a silhouette only exists as a silhouette against a specific ground. So the last section renders `<SilhouetteEdge />` at its own top edge (on Home, the CTA band) and the footer simply continues the ink underneath. Its lead-in defaults to `bg-background` and is overridable for a page whose last section is tinted.

**Motion** (the system's second scroll-driven interaction). The two rear ridges start low and rise into their authored positions as the band crosses the bottom 60% of the viewport, driven by a `--p` custom property set imperatively on a rAF-throttled scroll handler — the same idiom as the access-geometry scene, no animation library. On fine-pointer devices they also drift horizontally against the cursor (`--mx`, −1 to 1). The front ridge never moves: it is the seal against the ink field below, and travel there would open a gap at the band's bottom edge. Everything is transform-only, so it stays on the compositor. Because this component ships on every page, the scroll and pointer listeners are attached only while the band is intersecting the viewport and torn down when it leaves — a footer decoration should not cost a permanent listener on a route nobody has scrolled to the bottom of. `prefers-reduced-motion` and the no-JS/pre-hydration render both get `--p: 1`: the finished, settled terrain, never a frozen mid-travel frame.

### Scroll Reveal (motion primitive)
A repeating IntersectionObserver reveal (`ScrollReveal`), two variants, exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`), no bounce. **Rise** (translate-y + opacity, 700ms): the default, for cards appearing as a list — benefit cards, audience cards, news cards, each sibling staggered by ~90ms. **Settle** (scale from 96% + opacity, 600ms): reserved for a single focal element easing into place, used once for the X-1 render in "Our answer." Every use degrades to instant-visible under `prefers-reduced-motion`. Reusing "rise" for a single non-list element, or reusing "settle" for a list, blurs the distinction the two variants exist to carry.

Revision (20 Aug 2026): changed from a one-shot reveal (fires once, then the observer disconnects and the element stays visible forever) to a repeating one, on request — "I want the fade in to continue if you scroll from top to bottom again." The observer now stays connected and toggles visibility on every `entry.isIntersecting` change: scrolling an element out of view (either direction) resets it, so scrolling back down past it replays the same reveal rather than finding it permanently already-visible. `prefers-reduced-motion` is unaffected — it forces full visibility regardless of the toggle either way, so there's nothing to replay for those users.

### Count-Up Stat (signature micro-component)
A scroll-triggered count from 0 to a target integer (`CountUpStat`), cubic ease-out, ~1.2s, used exactly once: the "10,000+ therapies delivered" proof point. Reserved for a genuine quantity — "510(k)" and "ISO 13485" beside it are labels, not counts, and stay static text. Counting a non-quantity to manufacture excitement is the kind of thing this rule exists to prevent.

### Hairline Row List (replaces the four-up card grid)

Added 26 Aug 2026. A group of three to five peer items — the four benefits on Home, the four X-1 features — is set as **hairline-separated rows inside the framing-and-artifact split**, not as a grid of bordered cards. The heading and its lead take the narrow left column (sticky on Home, where the group is long); the rows take the wider right one, separated by `border-t border-line`, first row borderless.

The rule exists because the card grid had become the site's only compositional device: one `1px #d8e2e8` rounded rectangle, twelve instances on Home and twenty-three on the X-1 page, and the craft floor names "same-size cards of icon plus heading plus text as the page structure" as the lazy container. Rows also buy back type size — freed from a 280px card, a title sets at `text-lg` and its body at `text-base` instead of both dropping to `text-sm`.

**Accent chips survive the conversion where they teach.** Home's benefit rows keep their `size-12` accent chips, because that group is where a visitor learns the colour code the audience cards below then reuse; the critique's finding was that those meanings get *too few* exposures to be learnable. The X-1 feature rows dropped their chips entirely, because all four were the same primary blue and carried no meaning to teach.

**What stays a card:** the four audience doorways on Home. They are navigational rather than expository, each carries its own accent tint as its ground, and they are the only tinted cards in the system — three reasons they read as a distinct treatment rather than as the same rectangle again.

### Annotated Device Callout (X-1 hero)

The product render at full container width on ink, with **exactly one** leader line and label. The render's PNG has a genuine alpha channel, so it sits directly on the ground with no card, border, or backing plate — a plate behind a cut-out render reads as a sticker.

**One annotation, because one is all that can be drawn honestly.** The obvious version is an exploded diagram with leaders to the fluid warmer, the battery and the catheter port. None of those is visible or identifiable in the render, and PRODUCT.md bars extrapolating from it. The on-device screen is visible and unambiguous, so it gets the callout and the other three features are set as type in the section below. A fabricated technical annotation on a real medical device is a claim, not a decoration.

**The label lives in flow beneath the image, not over it.** The overlay SVG shares the image's `910 × 518` viewBox and both scale together, so the anchor stays on the screen at every width with no resize listener. The leader travels from the anchor down and out through the bottom edge to meet the label. The first build placed the label in the frame's top-left corner and its second line ran into the machine's white body and disappeared — white type on a white render. No region of this frame is both empty enough and wide enough to hold a label, so the label gets guaranteed space instead and the line goes to it. Hidden below `lg`, where the same fact is already stated in the feature list.

### Two Paths (Home, "the night") — the system's third scroll-driven interaction

Two paths run down a pinned viewport, one per route through dialysis, and the reader walks both at once. The clinic path winds; the home path runs straight; at the fifth beat they converge into one line that continues down the page.

**Why a third scrubbed interaction is allowed.** The Full-Bleed Rule's neighbour rule below says a third scroll-driven interaction needs a reason that is not "the last two were nice." This is it: this is the only content on the site that is inherently *sequential*, and scroll is the only input that is inherently a *timeline*. A static version of a sequence has to fake its ordering with numbers or arrows; this one is ordered by the reader's own movement.

**It replaced a figure that failed.** The first build drew the week as three arcs leaving a baseline for the clinic and seven gold marks that never left it. It did not communicate, and the post-mortem is the reusable lesson: **an invented notation needs a legend or an anchor, and this one had neither.** An arc rising off a line is not a known symbol for a journey; the arc encoded no quantity, so it was decoration shaped like data; and its note said "three journeys out, and three back" while three shapes were drawn, so the count read and the count told disagreed. Before shipping a bespoke diagram, check that a reader who has never seen it can name what a mark means.

**Distance is encoded as deviation from a straight line,** which needs no legend at all. That is the fix for the failure above: the meaning is carried by the copy at each beat, and the drawing only reinforces it.

- **The line is drawn per cell, never as one SVG over the whole stage.** Each cell draws only the segment leading down from its own marker to the next: anchored at the marker's own centre offset (`1.375rem`, half of `size-11`, in rem so it tracks text size) and exactly one cell tall, which lands it on the next marker's centre *by construction*. This is the fix for a reported bug, and the reason is worth keeping. Measured against one stage-wide SVG, the markers were out by two independent errors: **horizontally** ±1.14 viewBox units, because `grid-cols-2 gap-8` puts the column centres at 23.86%/76.14% rather than 25/75 — a gap does not split evenly around the centre line; and **vertically** −3.6 to −10.6 units, *different for every marker*, because `justify-center` centres the marker-plus-label group so each marker floated above its row centre by half its own text height, and the notes wrap to different line counts. The second error cannot be fixed by moving coordinates, because the offset depends on content. Markers therefore sit at the **top** of their cell, and the grids carry **no gap** (padding goes inside the cells). Verified 0.00px error on both axes at 1440, 390 and 320.
- **The draw is a top-down `clip-path: inset()`, not a stroke dash.** `pathLength="1"` with `strokeDasharray`/`strokeDashoffset` is the textbook way to normalise a path draw to 0–1 and it does not work here: the browser resolves both properties as px lengths and leaves `calc(1 - var(--p))` sitting unevaluated in computed style, so the paths render as fixed fragments. Each segment clips against its own quarter of progress (`clamp(0, (var(--p) - i/4) * 4, 1)`), so they still draw strictly in order and the convergence cannot arrive before the paths feeding it.
- **Labels sit on the line, opaquely, and the line passes behind them.** The obvious alternative — routing the paths around the text by capping label widths — was tried and cannot work: sampling 200 points along every path against every label's box showed the home lane's straight line crossing all four of its labels by construction, because the line is vertical and the labels are centred under their markers. Narrowing the text only degraded the wrapping while still being crossed. Label and note share **one** `bg-ink` wrapper; separate backgrounds let the line reappear in the gap between them.
- **`max-w-3xl`, not the site container.** This is an A/B comparison; at full width the two column centres sat 600px apart and the eye read two lists rather than one pair.
- **Only the markers respond to scroll — never the text.** Labels stay at full opacity throughout. Dimming real copy until the reader arrives would hold it below WCAG 1.4.3 for as long as it stayed dim, and this audience skews older with diabetes-related visual impairment. Animating the non-text graphic instead is what the Accent Ration Rule already prefers.
- **Pinning is measured, not assumed.** After mount the component measures its own stage against the viewport and pins only if it fits and motion is allowed. At 200% text the same markup is roughly twice as tall and simply renders unpinned. Static and pinned render *identical DOM*, which is what makes the measurement valid.
- **A scroll interaction that silently falls back is indistinguishable from a broken one.** The gate above was first written with a 24px cushion around a 608px stage, so it only engaged above roughly a 700px viewport — and a 1366×768 laptop, whose browser viewport is about 640px, got the static version and read as "the scroll animation doesn't work." That was reported, correctly, as a bug. The stage was tightened to 556px (markers `size-10`, label blocks `py-0.5`, header `pb-2`) and the cushion cut to 8px, which moves the threshold to about a 628px viewport. **Any height-gated enhancement needs its threshold measured against real device viewports, not just checked at the size it was designed on.** The mapping from marker size to `MARKER_HALF` is manual: change one and the other must follow, or the lines leave the icons.
- **Server output, no-JS and reduced-motion all keep `--p: 1`** — the finished drawing, unpinned, every beat visible at once. Never a frozen mid-scroll frame.
- **Gold marks the home path** under the Wayfinding Rule. The clinic path stays white: the burden is not one of the four accent meanings, and colouring it would read as endorsement.

**The fifth beat is a factual safeguard, not a flourish.** Two columns showing home treatment and nothing else can be read as "home dialysis means never seeing a clinic," which is false. The paths converge on "both paths stay under your nephrologist's care," so the correction is carried by the structure of the figure rather than by a disclaimer bolted underneath it.

**It is not a map.** The critique that produced this section originally proposed a silhouette of India as the recurring brand graphic. That was withdrawn before build: depicting India's national boundary is a legal matter in Indian jurisdiction, and an outline authored from memory on an Indian medical-device company's own site is a risk no visual payoff justifies. The craft floor separately calls an approximated organic contour the cheap version of the effect. If an official, boundary-correct outline is ever cleared for use, this section is where it belongs.

**Home now carries two scrubbed scenes, and they must differ in kind.** The hero's card stack is the opening hook and runs 180vh (80vh of scroll room); this is the five-beat explanation and runs 240vh (140vh). The hero was briefly cut to 130vh to force the contrast and that overshot — 30vh of room resolved the swap inside about a third of a wheel flick, so it read as a jump-cut rather than a scrub. The separation that matters is depth, not brevity: keep the hero the shorter of the two, but long enough that the scrub is legible as a scrub. If a future page needs a third, the same test applies: name what only scroll can do here.

### Navigation Current-Page State

`NavLink` (`src/components/layout/nav-link.tsx`) is a client island used inside the otherwise-Server-Component header. It marks the active item with `aria-current="page"` plus `bg-surface-2 font-semibold text-ink` — never colour alone, per the project's "colour is never the sole carrier of meaning" constraint. A section parent counts as current for its children, so `/innovation` is active on `/innovation/the-x1-cycler`; exact matching alone left the header blank on every inner page. `usePathname` is the only reason any of this needs the client, so the island is the link, not the nav.

### Section Index (long documents)

A sticky `lg:top-24` list of anchor links in the left column of a long single-measure document, currently `/privacy-policy`. Plain anchors, no scroll-spy and no active-section tracking: the value is the jump, and a client island tracking scroll position on a privacy policy is a cost this audience pays for nothing. Sections carry `scroll-mt-24` so a jump clears the sticky header. It exists because a 75ch measure centred at 1440px leaves ~818px of empty white on either side for 2,753 continuous pixels — the measure is right, and the space beside it needed a use rather than a filler.

### Two-Layer Disclosure (`ClinicalLayer`)

Added 27 Aug 2026, `/innovation/how-it-works/`. The site's answer to spec §9.2's "plain language for patients, expandable technical layer for clinicians": a native `<details>`/`<summary>` sitting inline at the end of a plain-language block, collapsed by default, labelled **For clinicians** in teal.

- **Native, not a primitive and not hand-rolled.** CLAUDE.md's order is shadcn over hand-rolled, native over both where it does the job, and this is the clearest case on the site: it opens with no JavaScript, is keyboard- and screen-reader-operable with no ARIA authored here, and survives a failed client bundle — which matters because PRODUCT.md describes the patient audience as majority mobile and often bandwidth-constrained.
- **Collapsed by default, and that is the whole design.** The page is written in the patient register; the clinician is the reader who goes looking. The layer that must be sought is the one whose reader will seek it.
- **Teal is not decoration here.** Teal means "clinical evidence" sitewide, and this disclosure holds exactly that. It is a label chip plus a small chevron — never body text — so the Accent Ration Rule holds at the same time.
- Both the platform triangle resets (`list-none` and the webkit marker) are required; with only one, Safari and Chromium disagree and one of them draws two markers. `py-3.5` on a `text-sm` line box is a 48px target — this is the one control a reader has to hit deliberately on the section.

### Exchange Cycle Figure (`/innovation/how-it-works/`)

Three panels — fill, dwell, drain — over one shared `0 0 160 150` viewBox, single 1.5px non-scaling stroke, on ink. The page's one illustration.

**Why it is not scroll-driven.** Two Paths spent the third scroll interaction and set the test for a fourth: name what only scroll can do here. This fails that test on purpose. An exchange is a cycle of three states and a reader should be able to see and compare all three at once; scrubbing would hide two thirds of the subject at every moment in return for nothing.

**Why it is an `<ol>`.** The subject genuinely is an ordered list, so the ordering is carried by the element rather than by an invented notation. The visible digit beside each title is `aria-hidden` — position is already conveyed programmatically, and without it the heading's accessible name reads "1Fill."

**Every mark is named in the caption,** which is the lesson Two Paths paid for: an invented notation needs a legend or an anchor. The outline is the peritoneal cavity, the vertical line the catheter, the shaded region dialysate, and the dwell arrows mark direction only, never quantity. The caption also states that the drawing is a schematic and not an anatomical illustration — a plausible-looking organ outline drawn from memory is the same class of risk as the India boundary that was withdrawn from "the night," and the craft floor separately calls an approximated organic contour the cheap version of the effect.

**Sizing.** The cavity occupies 108 of the viewBox's 160 units, so the drawing renders at roughly two thirds of whatever box it is given; the rest is not padding, the dwell arrows need it. At a 200px cap that put a 135px figure in a 405px column and the page's one illustration read as an icon. The cap is 240px.

### Unbuilt Routes (extended from breadcrumbs, 27 Aug 2026)

The breadcrumb rule — "unbuilt ancestors render as text, not links" — is the general rule, not a breadcrumb-specific one. Anywhere the site would point at a route that does not exist:

- **A route the visitor has already been promised** (it is in the header or the footer) is **shown and not linked.** On `/innovation/`, `/innovation/market/` renders as a card-shaped block with a dashed border, no `href`, no hover state, no focus ring, and an **In preparation** pending chip. Silently omitting it would read as if the hub had forgotten the page rather than as if it were coming; linking it would 404.
- **A route nobody has been promised** (`/innovation/whats-next/`, in the spec's sitemap but not in the nav) is not shown at all.
- **A "Keep reading" card is never the exception.** `/innovation/the-x1-cycler/` shipped this block pointing at two unbuilt routes on the argument that nothing had promised they were live. That was wrong for a card whose entire copy is an invitation to open it, and it is fixed: `KeepReading` takes only routes that exist.

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
