# Deviations from the website spec

Tracks every place the built code goes beyond `docs/aksharbyonykswebsitespec.md`. Each entry: what the spec says, what shipped instead, why, and what stayed true regardless. This file is additive — new deviations get appended, existing ones get corrected in place if the underlying decision changes, never silently deleted.

---

## 1. Home page color system: three new accent roles beyond spec §6.1

**Date:** 20 Aug 2026. **Where:** `src/app/globals.css`, `src/components/home/*`.

### What the spec says

§6.1 defines exactly four brand color tokens — `--color-primary` (#0d5d8d), `--color-primary-aa` (#117cbc), `--color-brand-accent` (#1388cd), `--color-ink` (#011a48) — plus one accent added in §6's 20 Aug 2026 resolution, `--color-accent-gold` (#b08d2f), restricted to "large display type and non-text graphics only." §6 states the decision explicitly by name: **"blue-plus-one, not blue-plus-two"** — one dominant blue family plus exactly one accent, reasoned as "a fairly standard color-theory move (dominant + single accent beats dominant + two competing accents for hierarchy)." Red is explicitly excluded from the UI token system entirely (confined to the logo icon) because it "would collide with the `--destructive` error token."

### What shipped instead

Requested by name — "colorize the home page," with explicit sign-off to exceed the spec. Two new brand-adjacent accent roles, plus one semantic (non-brand) state color:

| Token | Hex | Contrast on white | Contrast on `--color-ink` | Role |
|---|---|---|---|---|
| `--color-teal` | `#0e7c72` | 5.07:1 | — | "Evidence / clinical rigor." Clinicians audience card, the residual-kidney-function benefit icon, the ISO 13485 proof stat. |
| `--color-plum` | `#6b3a5c` | 8.81:1 | — | "Institutional / formal." Distributors & government audience card, the toxin-clearance benefit icon. |
| `--color-pending` | `#9c6410` | 4.95:1 | 3.42:1 | Semantic "figure pending source citation" state only — never reused as a brand accent. Distinct hue from `--color-accent-gold` (36° vs 44°) and from `--destructive` (0°) so neither brand warmth nor error meaning bleeds into it. |
| `--color-pending-on-ink` | `#d99a3a` | — | 6.95:1 | Same role as `--color-pending`, lightened for use as *text* on the ink hero background — the base pending color only clears the 3:1 UI-component floor on ink, not the 4.5:1 text floor. |

Every hue was chosen for spacing from every existing token (destructive 0°, gold 44°, primary 202°, ink 219°, new teal 175°, new plum 318°) specifically so no new role reads as "the same color, lighter or darker" — the failure mode a same-hue palette would risk.

**Applied:**
- **Benefit cards** ("Why it is different"): each of the four gets one accent role as an icon-chip color (blue, gold, teal, plum) instead of uniform blue.
- **Audience cards** ("Who we serve"): the same four roles, one per card, replacing the original build's `surface`/`ink` neutral tints for Clinicians and Distributors — those two cards read as near-identical grays in the first build (a finding I'd flagged myself in an earlier finish review); teal and plum resolve that directly.
- **Proof band**: 510(k) stays blue (regulatory/trust), ISO 13485 becomes teal (quality/clinical), 10,000+ therapies becomes gold (impact/human, India-adjacent) — three different kinds of proof now read as three different kinds of proof, not one repeated number.
- **Pending-stat placeholders**: the "figure pending" treatment gets the semantic pending color plus a small clock icon, replacing a plain gray dashed box.

### What stayed true regardless

- **WCAG 2.1 AA held everywhere**, computed by relative-luminance formula before any hex was chosen (table above), not eyeballed — the same rigor §6.1 itself demonstrates for the original four colors.
- **The Gold Ration Rule is unchanged**: gold still only appears on large display type and non-text graphics (the 10,000+ stat, benefit/audience icon chips) — never body text, never a background under white body text.
- **The kidney-icon-red exclusion is unchanged**: neither new hue is anywhere near red (0°); plum's 318° is magenta-adjacent, not red-adjacent, and stays clearly separated from `--destructive`.
- **Every color still resolves through a token** declared once in `globals.css`'s `@theme` block — no hardcoded hex or arbitrary Tailwind color values in any component, per §7.1's explicit CI-enforced rule.
- **Scope is Home only.** No other page exists yet to be inconsistent with this. When Contact, the Innovation hub, or the Leadership bio pages get built, someone needs to decide whether this expanded palette becomes the sitewide system (formalizing a §6.1 amendment) or stays a Home-specific treatment — that decision is open, not made here.

DESIGN.md and its sidecar (`.impeccable/design.json`) were updated in the same pass to describe this as the actual shipped world, not the prior Restrained-only one.

---

## 2. Silhouette footer edge: a second scroll-driven interaction, and the footer on ink

**Date:** 24 Aug 2026. **Where:** `src/components/layout/silhouette-edge.tsx` (new), `src/components/layout/footer.tsx`, `src/components/home/cta-band.tsx`, `DESIGN.md`.

### What the spec and DESIGN.md say

Spec §7.2 specifies the footer only as "max 4 columns, 6 links per column, no team roster" — it is silent on the footer's ground, so nothing there is contradicted. The tension is with DESIGN.md, which this repo treats as binding:

1. **The Full-Bleed Rule:** ink navy at whole-section coverage "in exactly the highest-stakes moments (hero, CTA band) — never as a card fill, never as a small panel." An ink footer directly beneath the ink CTA band reads as a third full-bleed spend.
2. **The access-geometry scene** is described as "the system's only scroll-driven interaction; it should not be treated as a general pattern to reach for elsewhere."
3. Section boundaries are a 1px `--color-line` hairline or a `surface-2` tonal shift. The footer's `border-t border-line` was exactly that device.

### What shipped instead

Requested by name, after a written comparison of five concepts ranked for this codebase; the chosen option was the layered-terrain silhouette **with** parallax, the option whose stated cost was this deviation.

- **A new `SilhouetteEdge` component.** Three ink terrain ridges at 35% / 65% / 100% opacity, inline SVG, `preserveAspectRatio="none"`, height in CSS only. Rendered by the *section above* the footer (on Home, the CTA band), not by the footer — the footer is sitewide and the ground it sits against is not.
- **The footer moves from `bg-surface-2` to `bg-ink`,** with text inverted and its `border-t` removed.
- **Scroll + pointer parallax.** `--p` (scroll progress across the bottom 60% of the viewport) and `--mx` (pointer, −1 to 1) set imperatively on a rAF-throttled handler; the two rear ridges rise and drift, the front ridge never moves.

**The Full-Bleed Rule is amended rather than broken.** There are still exactly two full-coverage ink moments. The second is now one *shaped closing mass* — CTA band and footer as a single continuous ink field entered across the silhouette — instead of two stacked rectangles. The footer is the bottom of the second spend, not a third one. DESIGN.md's rule text was rewritten to say so, so the next person reads the actual constraint rather than a rule the code visibly contradicts.

**The "only scroll-driven interaction" line is now "two," with the distinction recorded:** the access-geometry scene is *scrubbed* (scroll is the timeline; it runs backwards), the silhouette only *settles* (one finished state, arrived at once). That difference is the reason a second one was allowed, and it is the test a hypothetical third would have to pass.

### What stayed true regardless

- **Every color still resolves through a token.** The ridges are `fill-ink` at Tailwind opacity steps — no new hue, no hardcoded hex, no fifth accent. The Accent Ration and Wayfinding rules are untouched: gold, teal and plum are not involved, so no accent has borrowed a new meaning for decoration.
- **Depth is tonal and by overlap** — three opacity steps and crossing ridges. No shadow, no blur, no gradient text; the Flat-By-Default and no-glass rejections hold.
- **WCAG held, computed not eyeballed.** On ink, `text-white/70` (footer links) is **8.69:1** and `text-white/60` (copyright) is **6.68:1**, both clear of the 4.5:1 floor. Link focus rings move from `--ring` to white, matching the CTA band's existing treatment on the same ground — `--ring` is tuned against light grounds and this audience's focus indicators are load-bearing (PRODUCT.md), not polish.
- **Reduced motion settles, never freezes.** `prefers-reduced-motion` gets `--p: 1` — the finished terrain. That is also the server-rendered default, so no-JS and pre-hydration render the finished state too; JS repositions to the unsettled start on mount only when it is off-screen.
- **The per-route cost was the objection, so it is gated.** Scroll and pointer listeners attach only while the band intersects the viewport and are removed when it leaves; pointer tracking is skipped entirely on coarse-pointer devices. Motion is transform-only. Nothing is added to the initial bundle beyond one small client component, which matters because PRODUCT.md names bandwidth-constrained mobile as a Priority-2 audience trait.
- **No new assets.** The geometry is three path strings in the component — nothing in `public/`, nothing to optimise, version or attribute.
- **Scope is sitewide by construction.** The footer is in `layout.tsx`, so the ink ground reaches every future page; the silhouette edge does not, since each page's last section opts into it. Only Home exists today, so nothing is currently inconsistent — but the ink footer is now the default for the ~40 planned pages, and that is the decision being recorded here.

---

## 3. Colour system scope, resolved: the four-accent system is sitewide (24 Aug 2026)

### What was open

Entry 1 recorded the four-accent wayfinding system (primary / gold / teal / plum, plus the semantic pending amber) as a deliberate expansion of spec §6.1's "blue-plus-one" — and left one question explicitly unanswered, in Home's surface brief: *"Scope is Home only; whether this becomes the sitewide system (a formal §6.1 amendment) or stays Home-specific is an open decision for whoever builds the next surface."*

`/innovation/the-x1-cycler/` is that next surface, so the question came due.

### Resolved: sitewide

DESIGN.md had in fact already answered it. **The Wayfinding Rule** reads: *"An accent's meaning is fixed sitewide, not per-section: gold always means 'home/India,' teal always means 'clinical evidence,' plum always means 'institutional/formal.'"* A system whose defining rule is sitewide fixity cannot coherently be scoped to one page — either the meanings hold everywhere or the rule is decoration. So this is a confirmation, not a new decision, and no rule text needed rewriting.

**What that means in practice, demonstrated on the X-1 page:**

- **The roles are available, not owed.** The four feature cards ("What the device does") take primary blue chips — all four, not one accent each. None of the fixed meanings actually fits "battery backup" or "warms fluid to body temperature," and spreading four accents across a four-up grid because it looks better in four colours is exactly what the Accent Ration Rule exists to prevent. A page using one role, or none, is the system working.
- **A role is used when the meaning genuinely applies.** Plum ("institutional / formal") marks the "In India" regulatory panel, because CDSCO and the Medical Device Rules 2017 are literally an institutional/formal position. That is plum's own meaning, not plum borrowed for contrast against the blue panel beside it.
- **Regulatory proof stays blue,** matching the mapping Home's proof band already set, where the 510(k) stat is primary and the ISO 13485 stat is teal. Teal was not taken for "In the United States" even though "evidence" is tempting — teal means *clinical* evidence, and a regulatory clearance is not a clinical finding.
- **Pending amber does real work for the first time.** On Home it marked three unsourced statistics. Here it marks three unpublished specification rows, an unconfirmed regulatory position, and a missing 510(k) number — none of which are statistics, which is why `PendingStat` was generalised to `PendingNote` with a caller-supplied label.

### What this does not change

Spec §6.1 still says blue-plus-one, and this repo still ships blue-plus-three. **The deviation in entry 1 stands as a deviation** — this entry settles its scope, not its legitimacy. If §6.1 is ever formally amended, entry 1 is the text to fold in.

### Consequences to watch

The four roles now have to survive twelve more pages without a fifth hue appearing. The pressure point is any page with a grid of more than four peer items where the temptation is one colour each: `/innovation/how-it-works/` (four benefits again), `/about-us/careers/` (a departments grid), and `/manufacturing/` (two facility cards plus a certifications block). The rule to hold is the one this page held: **reach for a role when the meaning applies, and for primary blue when it does not.**

---

## 4. Contact form: a JavaScript-dependent conversion path, and three library realities

**Date:** 25 Aug 2026. **Where:** `src/app/contact/`, `src/components/contact/`, `src/app/api/contact/`, `src/lib/contact.ts`, `src/lib/email.ts`, `src/lib/turnstile.ts`, `src/components/ui/{input,textarea,field,label,separator}.tsx`.

### What the spec says

§15 names the build precisely: "Contact form: shadcn `Form` primitives, shared Zod schema, `/api/contact` Route Handler, Turnstile, Resend." §9.8 fixes the field table, and §7.3 fixes field styling: 16px inputs, persistent visible labels, 1px borders minimum. CLAUDE.md adds: "Prefer **shadcn primitives** over hand-rolled interactive controls, and the **native element** over both where it does the job."

### What shipped instead

**1. The form does not work without JavaScript.** Chosen by name after the alternatives were put side by side: a Server Action baseline would have worked with JS disabled, and was declined in favour of the specced react-hook-form architecture. The consequence is real and worth stating, because it is the same defect class that was removed from `ScrollReveal` the day before: with the client bundle blocked or failed, the site's only conversion path is inert. Mitigation is a `<noscript>` block giving `vishnu@aksharbyonyks.com` as a direct `mailto:` — one sentence, no duplicated form. The patient audience PRODUCT.md describes as "majority mobile, often bandwidth-constrained" is exactly who pays for this, and they now get an address instead of a dead form.

**2. `shadcn add form` writes nothing.** The v4 registry carries `form` as a name with no `files` array; `field` is the current primitive and the one with documentation. `Field`/`FieldLabel`/`FieldDescription`/`FieldError` carry the label-description-error structure instead. This is the spec's intent — shadcn primitives — against the library as it actually is now, not as it was when §15 was written.

**3. Native `<select>` and native checkbox, not the shadcn/Radix ones.** CLAUDE.md's preference order puts the native element above both, and a six-option single select is the textbook case: the platform picker is better on this audience's phones, needs no JavaScript of its own, and brings its own accessibility. `select.tsx` and `checkbox.tsx` were added by the CLI, went unused, and were deleted along with their Radix dependencies rather than left as dead code.

**4. The shadcn field styling is overridden for §7.3.** Stock `Input` is `h-8` with `md:text-sm` — 32px tall, dropping to 14px above 768px. Both fail §7.3, so the primitives were edited once rather than every call site: 44px controls, 16px text that never drops. Same for `Textarea` and the select.

**5. Turnstile and Resend are wired but inert.** No keys exist (`.dev.vars` holds only `NEXTJS_ENV`). The Turnstile verifier returns `configured: false` and the Route Handler proceeds; the email adapter simulates in development and **refuses to simulate in production**, returning a truthful 503 that tells the visitor nothing was sent and gives them the address. **The form therefore has no spam protection until the Turnstile keys are added.** That is a launch-gate item, not a detail.

**6. `/contact` is server-rendered on demand, not prerendered.** It reads `?enquiry=` to pre-select the enquiry type, which is the page's one authored idea. Reading it on the server means it is correct in the first paint rather than flashing "not noticed" after hydration; the cost is that this one route is dynamic while the rest of the site stays static.

### What stayed true regardless

- **The shared Zod schema is genuinely shared.** `src/lib/contact.ts` is imported by both the client form and the Route Handler, and the Route Handler re-parses every submission — client validation is a convenience, never the gate.
- **§9.8's field table shipped complete,** including City, which the frontend sketch omits and the spec explicitly calls a gap in the sketch rather than a scope decision.
- **DPDP posture unchanged:** consent is an unchecked, required checkbox that says what is collected before it asks; nothing is stored at rest beyond the email itself.
- **Nothing invented.** No office address, and the placeholder phone is published *with* its pending marker rather than quietly. The privacy policy marks the Grievance Officer, the registered address and the retention period as pending, in the same semantic amber the X-1 specification table uses.
- **The Radix barrel did not come back.** The CLI generates `import { X } from "radix-ui"`; every generated component was converted to its narrow package, pinned to the exact version `radix-ui` depends on. Heaviest remaining chunk holds 5 radix references, against 168 before the earlier optimize pass.

### Needs a decision before launch

`/privacy-policy` is **drafted, not legally reviewed** (spec §14.4). It answers every DPDP obligation the spec names, in the plain register, but the wording needs counsel — and the Grievance Officer is a named-person requirement nobody has filled.

---

## 5. Ground as a carrier of meaning, and the retreat from the card grid (26 Aug 2026)

Prompted by a sitewide `/impeccable critique`. The reported symptom was "too much white background, minimal visuals, too many words." Two thirds of that held up under measurement and the last third did not, which is the reason this entry exists.

### The word count was the wrong diagnosis

Home carried **530 words across 4,655px**; the X-1 page, 598. That is sparse for the page length, not dense. The wall-of-text feeling came from text being the *only* medium — two images existed in the entire project and both sat in the Home hero — so cutting copy would have emptied the pages further and produced the same complaint. Nothing was cut. Word count rose slightly (Home to 622) while the pages stopped reading as walls, because what changed was everything around the words.

### The ink measurement in the critique was wrong, and the direction it pointed was right

The critique reported Home at 9% ink and made "spend more ink" its P0 on that basis. The figure was an instrumentation error: the Home hero's background was a `linear-gradient`, and the measuring script resolved grounds by walking for `backgroundColor`, so it classified the hero as white. Home was really ~39% ink before any change. What was true, and what the screenshots showed independently, is that the ink sat entirely at the two ends and the whole middle was uniformly light.

The fix therefore was not "more ink" but "ink in the middle, for a reason." Recorded here because the number was quoted to the client before it was checked.

### What changed

**The Full-Bleed Rule went from two moments to a ceiling of three, assigned by meaning** (DESIGN.md). Ink now carries home/night/patient-life; white carries evidence/regulation/specification. `/contact` and `/privacy-policy` still spend two, because neither has a third thing worth saying in ink — three is a ceiling, never a target. Two ink sections may not be adjacent; when the X-1 device section was first built on ink directly under the ink hero the two merged into one 2,000px mass, and the resolution was to combine them into one larger opening rather than to insert a token light band.

Measured: Home 39% → **51% ink**, X-1 → **43%**, and in both cases the light and dark now alternate instead of bracketing.

**Four-up card grids became hairline row lists.** One `1px #d8e2e8` rounded rectangle was doing all the compositional work — 12 instances on Home, 23 on the X-1 page — and the craft floor names that exact pattern as the lazy container. Home's benefit rows kept their accent chips because that group teaches the colour code the audience cards reuse; the X-1 feature rows dropped theirs, which were four identical blues teaching nothing.

**A P1 defect was fixed that predates this pass.** The Home hero's ink-to-white transition was a percentage gradient across the whole section, and the three "dialysis gap in India" stat cards — the last block in it — sat inside the fade. Their dashed bottom borders dissolved completely and their white label text finished on a near-white ground. A percentage stop cannot know what content lands on it; the hand-off is now a fixed-height band below the content, with nothing ever laid over it.

### Two accessibility failures found while verifying, both pre-existing

Neither appeared in the critique — the first contrast script composited semi-transparent grounds against white instead of against the ink beneath them, and skipped single-character text nodes entirely.

- **Audience card "Explore" links** measured **2.78:1** on the gold tint and **4.32:1** on the teal, against a 4.5:1 requirement. They were also a standing violation of the Accent Ration Rule, which bars accents from body text and links. Now `text-ink`; the icons keep their accent, which the rule permits.
- **Access-geometry card labels** ("Today", "With the X-1") at `white/45` measured **4.29:1** on ink. Now `white/60`, 6.08:1.

Verified after: **zero** text-contrast failures across all four routes, **zero** document overflow and **zero** sub-24px targets across 320/390/768/1440 at 100% and 200% text.

### Still open

- **India is not depicted anywhere,** and this was a deliberate reversal. The critique proposed an India silhouette as the recurring brand graphic; depicting the national boundary is a legal matter in Indian jurisdiction, and an outline authored from memory would probably get J&K, Ladakh and Aksai Chin wrong on an Indian company's own site. The geography argument is carried by treatment rhythm instead. **To ship a map, someone must supply a boundary-correct official outline and have it reviewed** — the "night" section is built to take one.
- Home still shows the X-1 render twice (hero card stack, and "Our answer") at moderate size. Acceptable, but it is the only real asset the project owns and a second photographed or rendered subject would relieve it.
- `/contact` (82% white) and `/privacy-policy` (90% white) were left light on purpose. Both are documentary, and the privacy page's empty column now carries a section index rather than a decoration.

### 5a. The week figure failed, and what replaced it (26 Aug 2026, same day)

The treatment-rhythm figure described above shipped and was immediately reported as not communicating. That was correct, and the reasons are worth keeping because they generalise:

- **An invented notation needs a legend or an anchor.** An arc leaving a baseline and returning is not a known symbol for a journey to a clinic. Nothing on screen taught it.
- **It encoded no quantity.** The arc's height and width meant nothing — not distance, not hours. Decoration shaped like data.
- **Its own caption contradicted it.** "Three journeys out, and three back" describes six trips; three shapes were drawn.
- **The second lane depended on the first landing.** "Nothing leaves the line" only means something once you have understood that things leave the line above. The first lane failed, so the second was a rule with dots on it.

**Replaced by "Two Paths"** (`src/components/home/two-paths.tsx`): two routes drawn down a pinned viewport, walked simultaneously as the reader scrolls, converging at the end. The argument moved onto the one axis it always had and the figure lacked — time.

**No dependency was added, despite that being offered.** Nothing here is quantitative, so a charting library would have supplied a more sophisticated way to draw nothing; and this project already has the house idiom for scroll-driven work (a `--p` custom property on a rAF-throttled handler, listeners gated on intersection, transform/clip only, no animation library). GSAP or Framer would have cost 30–50 kB on a page whose Priority-2 audience is described as majority-mobile and bandwidth-constrained.

**This is the system's third scroll-driven interaction,** which DESIGN.md gates behind "a reason that is not 'the last two were nice.'" The reason recorded: this is the only inherently sequential content on the site, and scroll is the only inherently sequential input. The Home hero's card-stack track was cut from 160vh to 130vh at the same time, so the two scrubbed scenes differ in kind — hook versus explanation — rather than repeating the same clinic-versus-home move at the same depth. Restored to 180vh on 27 Aug 2026: 130vh left only 270px of scroll room at 1440x900, under one wheel flick, and the swap finished before the eye could follow it. The two scenes still differ in kind at 180vh vs. 240vh; shortening a scrub past the point where it reads as scrubbing is not contrast, it is a defect.

**A factual safeguard is built into the structure.** Two columns showing home treatment and nothing else can be read as "home dialysis means never seeing a clinic." The fifth beat converges both paths on "both paths stay under your nephrologist's care," so the correction is load-bearing geometry rather than small print.

**Two implementation notes worth not rediscovering:**

- `pathLength="1"` with `strokeDasharray`/`strokeDashoffset` is the textbook 0–1 path draw and it does not work through a CSS custom property. The browser resolves both as px lengths and leaves `calc(1 - var(--p))` unevaluated in computed style; the paths render as static fragments. A top-down `clip-path: inset()` is both reliable and better here, because one clip over all three paths stops the convergence drawing before the paths that feed it.
- Pinning is gated on a **measurement**, not a breakpoint: the component measures its own stage against the viewport after mount and stays unpinned when it will not fit. That is what keeps 200% text and short viewports working (verified static at 1280×720 and 390×667, pinned at 1440×900, 390×844 and 320×800, with zero text spill at any of them). It only works because the pinned and static states render identical DOM.

### 5b. Two Paths: the lines did not run through the icons (26 Aug 2026)

Reported after 5a shipped, and correct. Measured against the single stage-wide SVG, every marker was off, by two independent errors:

- **Horizontal, ±1.14 viewBox units (~8px).** The beat row was `grid-cols-2 gap-8`, so the two column centres sat at 23.86% and 76.14%, not 25% and 75%. A gap does not split evenly around the centre line, and the paths were written against 25/75.
- **Vertical, −3.6 to −10.6 units, and different for every marker.** Cells were `justify-center`, which centres the marker-and-label group, so each marker floated above its row centre by half its own text height. The notes wrap to different line counts, so no single offset was ever going to be right; mobile was worse, where more notes wrap to two lines.

The second error is the interesting one: **it cannot be fixed by adjusting coordinates, because the offset depends on the content.** So the geometry was rebuilt to be content-independent rather than re-tuned. Each cell now draws only the segment from its own marker down to the next one, anchored at the marker's own centre offset and exactly one cell tall — which lands on the next marker by construction, whatever the rows, the wrapping or the font size do. Markers moved to the top of their cells; the grids lost their gaps and gained internal padding instead.

Verified 0.00px error on both axes at 1440×900, 390×844 and 320×800.

**A second defect surfaced while verifying, one that had been invisible in screenshots.** Sampling 200 points along every path against every label's bounding box showed the paths crossing the labels almost everywhere — including all four labels in the home lane, whose line is straight and whose labels are centred on it. Two rounds of capping label widths to route the paths around the text failed (and degraded wrapping to "Your own / bedroom") because that collision is structural, not incidental. Labels now carry an opaque `bg-ink` wrapper and the line passes behind them, which is how a timeline normally handles a label on its own spine.

**Lesson for the next diagram:** eyeballing a screenshot did not catch either problem. Both were found by measuring geometry against the DOM — marker centres against path anchors, and sampled path points against text boxes. Any figure whose lines are supposed to meet its labels should be verified that way rather than by looking at it.

### 5c. The scroll animation "stopped working" — it was the height gate (26 Aug 2026)

Reported immediately after 5b: centring fixed, animation gone. Nothing was broken mechanically. Under a real scroll the stage stuck at 64px, `--p` ran 0 → 0.9995, and the segments clipped in order.

**The pin gate was refusing.** It required the stage's natural height plus a 24px cushion to fit the viewport under the header. The stage measured 608px, so the interaction only engaged above roughly a 700px viewport. A 1366×768 Windows laptop has a browser viewport near 640px — it silently took the static fallback, which draws every line at once. From the outside that is identical to a broken animation.

Fixed by shrinking the stage rather than by weakening the safety check: markers `size-11` → `size-10`, label blocks `py-1` → `py-0.5`, header `pb-4` → `pb-2`, convergence `mt-3` → `mt-2`. Natural height 608px → **556px**. The cushion also went from 24px to 8px, since the stage only has to fit. Threshold is now about a 628px viewport, verified pinning and animating correctly at 1366×640.

`MARKER_HALF` had to move with the marker size (1.375rem → 1.25rem); it is the anchor every segment is positioned against, so the two are a manual pair. Alignment re-verified at 0.00px on both axes after the change.

**The general lesson, recorded because it will recur:** a progressive enhancement that degrades silently gives the user no signal that it degraded. Every height- or capability-gated enhancement needs its threshold measured against real device viewports, not just confirmed at the size it was authored on. The fallbacks themselves were all still correct — 200% text, reduced motion, no-JS and short viewports each render the finished, unpinned diagram with every beat visible.

---

## 6. `/innovation/` and `/innovation/how-it-works/`: what shipped short of the spec, and why (27 Aug 2026)

**Where:** `src/app/innovation/page.tsx`, `src/app/innovation/how-it-works/page.tsx`, `src/components/innovation/*`, `src/components/sections/keep-reading.tsx`.

### The spec's four children, and the two that shipped

§8.3 lists four children under `/innovation/`: `the-x1-cycler`, `how-it-works`, `market`, `whats-next`. Two now exist. The other two are not late — they are blocked on content this project does not hold, and building them anyway would mean fabricating it:

- **`/innovation/market/`** is specified as "charts, not paragraphs. Every figure sourced and dated." PRODUCT.md's "still fully open, do not fabricate" list names exactly that material: sourced and dated statistics for scale, access geometry, cost and coverage, and modality mix. A market page built today would be an all-pending shell, which is worse than an honest absence.
- **`/innovation/whats-next/`** (X2 and X3) is not in the primary nav at all, so no visitor has been promised it.

The difference matters for how each is treated. `market` is in the header and the footer, so a visitor already knows it should exist: `/innovation/` shows it as a **card-shaped block with no `href` and an "In preparation" chip** — the pending language DESIGN.md already defines, applied to a route rather than to a figure. `whats-next` is shown nowhere.

**This extends a rule that already existed.** DESIGN.md's breadcrumb entry says "unbuilt ancestors render as text, not links," for the reason that pointing a reader or a crawler at a 404 is worse than leaving a position unlinked. The same reasoning, one level down, is what governs the doorway card and what removed `/innovation/market/` from the "Keep reading" block on `/innovation/the-x1-cycler/`, where it had been shipping as a live-looking link to a 404 since 24 Aug 2026.

### The four benefits appear twice sitewide, not three times

§9.2 asks `/innovation/` for a "four-benefit summary" and `/innovation/how-it-works/` for "the four benefits, each with a supporting reference." Taken literally that is three instances of the same four claims — Home already carries them — on three pages a visitor may well read in sequence, which is the precise repetition the 26 Aug sitewide critique found and the reason DESIGN.md's Hairline Row List rule exists.

What shipped: Home keeps them in the patient register with the accent chips that teach the wayfinding code. `how-it-works` carries them as an **evidence register** — the same four claims, no chips, each with its reference slot visible and empty. The hub carries neither, and links to them instead.

The reference slots are empty because there is no reference. All four are PRODUCT.md's migrated framework and none of them arrived with a citation. Marking four visible gaps is the same decision the X-1 specification table already made, and the X-1 page's own direction contract argues for it: a register with four visible gaps is worth more to a nephrologist or an investor than a complete-looking one.

### Clinical content is written, and is marked unreviewed

§9.2 marks `how-it-works` **"Nephrologist review required."** That review has not happened. The page ships the clinical layers anyway — diffusion, osmosis, membrane characterisation, the CAPD/APD distinction — because they are standard physiology rather than claims about this product, and because a page explaining a therapy without them would fail the clinician audience entirely.

What it does not do is imply sign-off it does not have. A `PendingNote` under the first clinical layer states, in the reader's view, that the layers are awaiting nephrologist review before launch. **Launch gate: that note comes out only when a nephrologist has actually read them**, and at the same time the four reference slots get filled. Both are one review, not two.

Deliberately excluded from the clinical layers, pending that review: anything prescriptive. No numeric dwell times, no fill volumes, no peritonitis management, no candidacy criteria. Peritonitis appears once on the page, as a question for the patient to ask their nephrologist, never as guidance.

### Two components generalised rather than copied

`X1Continue` became `KeepReading` (`src/components/sections/keep-reading.tsx`) and the compact pending chip moved out of `x1-spec-table.tsx` into `pending-note.tsx` as `PendingChip`. Both were about to acquire a second hand-maintained copy on the new page, and both are components whose entire purpose is that two places look the same.

### What stayed true regardless

- No unsourced statistic anywhere on either page. The India argument on the hub is made **without a single number** — "roughly three trips a week" is a description of the therapy schedule, not a claim about India — because every figure that would strengthen it is on the do-not-fabricate list.
- Every regulatory sentence comes from `src/lib/claims.ts` at its gated wording. Neither page upgrades the licensing claim.
- The Drugs and Magic Remedies Act line is in the first viewport of `how-it-works`, not at the foot of it, and the page's closing section is seven questions routed to a nephrologist with no answers attached.
- No anatomical illustration. The exchange figure is a schematic and its caption says so; an organ outline drawn from memory on a medical-device site is the same class of risk as the India boundary that was withdrawn from "the night."
- Three full-bleed ink moments on `how-it-works` (hero, the exchange, the closing mass), two on the hub. Ceiling respected, no two adjacent.

---

## 7. `/innovation/market/`: an editorial register, and the figure that had to be refused (28 Aug 2026)

**Date:** 28 Aug 2026. **Where:** `src/app/innovation/market/`, `src/components/market/*`, `src/lib/market-data.ts`.

### What the spec and DESIGN.md say

1. Spec §4.1 wants investor content "denser, more numeric and more sober than the rest of the site. Dated sources, footnotes, tables." §9.2 wants "charts, not paragraphs."
2. `proof-band.tsx` established the house treatment for evidence and reasoned it out at length: the hero-metric band — big number, small label, accent colour — is "a default to refuse," because it "would read as marketing to exactly the two audiences that distrust it." A hairline register replaced it.
3. DESIGN.md's creative north star is "The Quiet Clinic," and its Full-Bleed Rule caps ink at three whole-section moments, gated on a meaning test: ink carries home, night and patient life; the light carries evidence, regulation and specification.
4. Deviation 3 settled the four-accent palette as sitewide but left the harder question open by name: whether a page may use teal and plum *inside figures* rather than as card-level role chips.

### What shipped instead

Requested by name after two review passes ("bland," "too long," "definitely needs more visuals"), with an explicit choice of the most editorial of three options offered.

**The first build applied point 2 as a universal rule and produced the defect.** Ten figures rendered as ten identical hairline rows across nine sections that all shared one framing-and-artifact layout. The result was correctly called bland and long, and those were the same fault: with no formal variety, no screen is a landmark and a reader cannot feel progress. §9.2 asked for charts and the page was shipping paragraphs with numbers in them.

**What changed:**

- **Every section now has its own layout and its own form.** Left-framed sequence with a full-bleed unit figure; full-width ladder with its supporting figures placed *after* it; centred statement with a two-bar comparison; a rule-bounded four-column status strip; a numbered register. Nothing shares a template.
- **Display-scale numbers**, where `proof-band.tsx` would have used a register row. The refusal in point 2 is kept where it belongs — no accent colour on a bare statistic, no count-up, no card around a number — but "one form for every group of figures" was never what that reasoning said, and reading it that way is what broke the page.
- **A third full-bleed ink moment**, inside `the-gap.tsx`: one hundred unit marks, thirty-three filled, for "about two thirds of people with kidney failure died without receiving dialysis." Within the stated ceiling, and meaning-tested rather than spent to reach the number — every other figure on the page is evidence about a market and stays in the light; this one is about people, and is the page's emotional peak.
- **Teal and plum inside figures**, which deviation 3 left open. Plum ("institutional / formal") marks the days a facility owns in the week schematic and the bars of the catastrophic-expenditure ladder — one colour, one idea, met twice. Teal ("evidence / clinical rigor") marks Guatemala as a cited external comparator.
- **A colour bug fixed in passing.** The first build put gold on Guatemala's bar. Gold means home and India everywhere else on this site, so spending it on the comparator told a reader the opposite of the section's argument. India carries gold now — a sliver of it, which is the point.

### The figure that was refused

The obvious unit chart for the opening is 2.2 lakh arriving each year against ~175,000 treated, drawn as one bar with a filled fraction. **It would be a lie in a chart.** The first is annual incidence, the second is standing prevalence: different measures on different denominators, and subtracting one from the other yields a number that means nothing while looking authoritative. The two are shown as separate display figures with the difference stated in words, and the unit chart draws the one figure on the page that is genuinely a proportion. A chart is a claim; this one would not have been supportable.

### Scope reduction, recorded

The page went from nine sections and about twenty-two figures to five sections and ten, across two passes. Spec §9.2 lists "A winning solution for all" reframed for India as part of this page and **that section no longer exists** — its own code comment conceded it introduced no new claim, which made it the first thing to cut. Patients, Payers and Producer are argued by the legs themselves; the Providers case (nephrologist density as the binding constraint on centre-based capacity) is genuinely lost and is a one-row restore if wanted. Spec §3.3's legs 1 and 2 are also now one section rather than two, because they are one argument.

### What stayed true regardless

- **Every figure still carries a source and a date.** `Figure` cannot be constructed without a `source`, `sourceNumber()` throws on an unregistered id, and all six sources are cited at least once — a register entry nothing points at would be the page claiming work it does not do.
- **Every colour resolves through a token.** No hex, no arbitrary Tailwind colour values.
- **Contrast computed, not eyeballed.** Gold on ink is 5.39:1, which clears AA for the display number and the on-ink citation markers; the citation marker takes a separate `onInk` variant because primary blue on ink is 1.9:1 and would have rendered an unreadable link as a working one.
- **Ink ceiling respected and no two moments adjacent** — hero, the untreated figure a full screen below it, and the closing mass.
- **The jargon is gone.** "Catastrophic health expenditure" is now defined in plain words — spending more than 40% of everything the household spends outside food — before any percentage appears, checked against the source's own threshold rather than paraphrased.
- **No map of India**, for the reason `figures.ts` already records. The argument is a schedule, not a geography, and it is drawn as one.


---

## 8. `/manufacturing/`: the 510(k) number, and a sitewide claim that had to be narrowed (29 Aug 2026)

Spec §9.4 asks this page for "certifications with numbers and dates: ISO 13485,
IEC via SGS and TUV SUD, biocompatibility via FiLab, FDA 510(k) number." Getting
the last of those meant looking the clearance up, and looking it up changed two
things about the rest of the site.

### The number existed all along

`K243371`. It had been a `PendingNote` on `/innovation/the-x1-cycler/` since
that page was built, on the reasoning that nobody had supplied it. That
reasoning was wrong in the same way the ByoTalks video ids were wrong the day
before: **510(k) decisions are public**, the FDA publishes an API over them, and
a search on the applicant returns exactly one record. Every field now on the
page — device name, product code, regulation, class, submission date, decision
date, decision — is copied from that record and from nowhere else.

- Submitted 30 October 2024, found substantially equivalent 16 May 2025.
- Class II, 21 CFR 876.5630, product code FKX, Traditional 510(k).
- Verified against `https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfPMN/pmn.cfm?ID=K243371` on 29 August 2026.

"May 2025" everywhere on the site is now "16 May 2025", which is what the
register says.

### The clearance is not held by Byonyks USA

**This is the finding that matters, and it is a correction rather than an
addition.** `src/lib/claims.ts` said, in the site's only sentence about the US
clearance: "That clearance is held by Byonyks USA, not by Akshar Byonyks." The
FDA's record names the applicant as **"Byonyks Pvt, Ltd."** Two Byonyks
establishments are separately registered with the FDA and both list this
device; one is a US entity, and it appears on the record as the US agent, not as
the applicant.

So the site was asserting something its own primary source contradicts, on the
most load-bearing regulatory sentence it has. Both affected strings were
**narrowed to "Byonyks"**:

| Was | Is |
|---|---|
| "That clearance is held by Byonyks USA" | "That clearance is held by Byonyks" |
| "Byonyks USA designs and manufactures the device." | "Byonyks designs and manufactures the device." |
| `fdaClearance.holder: "Byonyks USA"` | `fdaClearance.holder: "Byonyks"` |
| `MedicalDevice.manufacturer.name: "Byonyks USA"` | `"Byonyks"` |

Nothing was added. An over-specific attribution was removed, and what remains is
true under either entity — and is already the formulation **spec F-1 requires**
for manufacturing ("attribute to Byonyks, never to a country"). The licensing
relationship is untouched: naming Byonyks USA as the licensor is spec F-2's own
instruction and is a corporate fact the client asserts, not a regulatory one the
FDA publishes.

**This wants a lawyer's eye before launch.** Adding it to the §14.4 gate list.

### A second overclaim, found in the same sweep

Home's "built on proven" section said the X-1 was licensed from a company
"already serving clinics across the United States." Byonyks' own February 2026
headline is "FDA-Cleared X1 APD Cycler **Set to Enter** U.S. Market." A device
about to enter a market is not already serving it. The sentence now states the
clearance and the test houses, which are both supportable.

### What the page is, given F-1

F-1 predicted this page becomes "two coming-soon cards" and that a manufacturing
page with no manufacturing is worse than none. The build's answer is that it is
**not a facility tour, it is a chain of custody**, and its structure is the one
distinction a diligence reader needs first: *what you can check* against *what
Byonyks states*. One verified credential gets display weight; five attributed
ones sit in a hairline register, each naming the specific certificate number
that has not reached this project rather than the page implying it is complete.

- **The India hubs are not called manufacturing facilities.** Open Questions 2.3
  is still open and spec §9.4 bars it, because whether a site manufactures
  decides its CDSCO licence route (§14.2). The cards say "function and
  completion date not confirmed", which is a real fact, instead of "coming
  soon", which is not one.
- **Neither applicant address is reproduced.** F-1 attributes to Byonyks and
  never to a country, and no marketing site prints its licensor's street
  address. The link to the FDA's own page is right there and shows the reader
  everything the site leaves out. What the site may not do is *assert* a
  location, in either direction — and it does not.
- **A print stylesheet**, because §9.4 asks for the compliance section to be
  attachable to a tender. Header, footer, the closing CTA and "keep reading" are
  dropped; ink flattens to paper; ScrollReveal's hidden state is forced visible,
  without which a reader who prints before scrolling gets blank sheets.

### What stayed true regardless

- **Every colour resolves through a token.** No hex, no arbitrary Tailwind colour values.
- **Ink ceiling respected**: two moments, hero and closing mass. The compliance register stays in the light, which is exactly the meaning test the Full-Bleed Rule sets — a certification band on a dark ground would be styled as persuasion.
- **A structural guard, in the shape of `market-data.ts`'s.** `compliance.ts` throws at module load if an entry sits in the public-record register without a reference number. A verification badge over an unverifiable claim fails the build rather than shipping.
- **No `Certification` structured data.** Most entries have no certificate number to put in it; `PropertyValue` states the one number that is real and guesses no enum.

### 8a. The page was retired the same day it shipped (29 Aug 2026)

**Client, on reading it: "Is the manufacturing page needed? I feel like it adds
unnecessary content to the website that repeats what is already here."**

Measured rather than argued. Every one of the page's nineteen facts was checked
against the rendered copy of the other six pages:

| | |
|---|---|
| Facts that appeared **elsewhere too** | **11** |
| Facts found **only** on `/manufacturing/` | 8 |

And the split ran the wrong way. The duplicated eleven were the **prominent**
ones — the entire hero chain (licensed / designs and manufactures / India being
established) was already on `/innovation/`, `/innovation/the-x1-cycler/` and
`/innovation/market/`; ISO 13485 and the clearance were on Home's proof band.
The unique eight were **fine print**: product code, regulation, submission date,
decision, the register link, HTW, and two pending hub cards.

At ~785 words including nav and footer chrome, roughly half the real copy was
restatement — in nav slot three of five, under a label that promised a factory
the page opened by saying does not exist. **Both of those were foreseeable.**
Spec §2.1 had already called this page thin and kept it anyway; F-1 warned that
a manufacturing page with no manufacturing is worse than none. The first build
designed around that warning instead of acting on it.

**What changed**

- The compliance record moved to `/innovation/the-x1-cycler/` as
  **"Quality and compliance"** (`x1-compliance.tsx`), one section below the
  regulatory panels it evidences. The two-tier split — public record against
  company statement — survives intact; it was always the substance.
- **The hero chain was deleted, not moved.** It was the duplication.
- The FDA record's `detail` lost its trailing "held by Byonyks, not by Akshar
  Byonyks" sentence, which the regulatory panel now sits directly on top of.
- The regulatory card's external FDA link became an in-page link to
  `#compliance`. Two links to the same register in one viewport is one more
  than a reader needs.
- **Primary nav is four items, not spec §8.2's five.** Recorded here as the
  deviation it is.
- `/manufacturing` returns a **308** to `/innovation/the-x1-cycler#compliance`.
  byonyks.com carries the same path and partners may have it written down.
- The print stylesheet moved with the content: the X-1 page now prints as the
  tender document, with Keep Reading and the CTA band excluded.
- `indiaHubs` is **parked, not deleted** — nothing renders it. A company's own
  footprint is About Us material and `/about-us/` is not built. The research is
  real and the constraint attached to it is load-bearing: whoever builds that
  page must not quietly turn these into factories while Open Question 2.3 is
  open.

**Result**

| | Before | After |
|---|---|---|
| `/innovation/the-x1-cycler/` | ~754 words | ~1,131 words |
| `/manufacturing/` | ~785 words | — |
| Pages stating the FDA record's detail | 1 | 1 |

Net: one fewer page, one fewer nav item, ~400 fewer words sitewide, and no fact
duplicated by the move. The licensing chain still appears on three pages, which
is pre-existing and deliberate — it is one string from `claims.ts`, reused.

**The reusable lesson.** The measurement that retired this page took ten minutes
and could have been run before it was built. "Does this page say anything the
site does not already say?" is a cheaper question than "how do I make this page
good?", and it should come first.

---

## 9. `/about-us/`: measured before it was built, and reshaped by the result (29 Aug 2026)

The process change `/manufacturing/` paid for, applied for the first time.
Twelve facts this page might carry were checked against the rendered copy of
the other seven pages **before any component existed**.

| | |
|---|---|
| Facts already on the site | 8 |
| Facts **new to the site** | **4** |

The four: the founder narrative, the founder's name, the milestone arc, and the
company values. The eight: the licensing sentence, the clearance, the India
regulatory position and so on — most of them already on three pages each.

### What that changed

Spec §9.5 gives `/about-us/` "who Akshar Byonyks is, the licensing relationship
per §3.1, links to the three children," and puts the founder narrative on a
separate `/about-us/our-story/`. Built literally, **the hub would have been made
almost entirely of the eight facts that already exist**, with the four that do
not on a page behind it. That is `/manufacturing/` again, and this time the
measurement caught it before the code rather than after.

So: **one page, carrying the story.** `/about-us/our-story/` is not built
because this is it.

### The founder story is not Akshar Byonyks'

**The finding that governs the page.** byonyks.com's `/the-vision/` carries the
narrative — the aunt on dialysis, the mother's diabetes risk, the wish for a
needleless treatment at home — in the first person, signed **Farrukh Usman,
Founder and CEO**, of **Byonyks**. Akshar Byonyks is a separate Indian entity
whose own founders are Open Question 1.4 and are unknown to this project.

Migrating "my aunt" into the first person here would have invented an origin for
a company that has not told us its own — the same class of error as re-badging a
factory, arriving through a story instead of a certificate. It is **quoted and
attributed by name**, with the source URL and retrieval date under it, and the
surrounding copy says whose company it started. That reads stronger, not weaker:
"the man who built this device watched his aunt go through the alternative" is a
better sentence than an unattributed one.

### A date correction, found by checking

Spec §9.6's milestone list reads "human factors, TUV SUD Minnesota IEC and **FDA
submission November 2023**". The FDA's own record for K243371 gives **date
received 30 October 2024**. The testing and the submission are therefore
separate entries at their own dates, and the submission carries the register's.

### What was cut rather than migrated

byonyks.com's `/about-us/` runs two claims that do not ship here: **"62% of all
the peritoneal dialysis machines in the US have contributions from our team
members"** and the **"$44 billion dialysis businesses in North America"** line.
Both are unsourced and both are US-market claims — spec §3.2's list of arguments
that do not transfer. The project rule for an unsourceable statistic is to cut
it, not soften it. The founder quote's own US sentence ("Every clinic in America
is using more than 20-year-old dialysis technologies") is trimmed for the same
reason, and the trim is recorded in `about.ts` rather than made silently.

### Two tiers again, because a timeline launders evidence

Evenly spaced dots imply evenly weighted facts. Two of these dates come from the
FDA's database and five are Byonyks' own account of its history, so each entry
is marked with the same vocabulary the compliance register uses — filled marker
for the public record, hollow for a company statement, dashed for what has not
happened. **The four test houses are not reprinted**; 2023 is one entry linking
to the register that holds them. A timeline is an arc, a register is a record,
and the arc should not become a second copy of the record.

### The leadership gap is stated, not filled

Spec §9.5: "Blocked on Open Questions 1.4. Launch gate." The five executives are
on the do-not-fabricate list, so there is no `/about-us/leadership/` and the
page says why. The risk table's "investor-first with no named team is not
credible" is an argument for **getting the names**, not for inventing plausible
ones. What the page does do is count the advisory nephrologists **from the real
ByoTalks data** rather than claiming a number — spec F-5's compensating route,
working.

### A pre-existing nav defect, partly fixed

The primary nav and footer pointed at **nine routes that do not exist**. Three
were this page's own children and are now removed — a mega-menu opening onto
three 404s is worse than no mega-menu, and this repo has shipped links to
unbuilt routes once already.

**Six remain and are deliberately untouched here:** `/news`, `/terms-of-use`,
`/cookie-policy`, `/grievance-redressal`, `/accessibility`. The legal four are
launch-gate pages that counsel drafts (spec §14.3) and removing their links
would hide the gate rather than close it. They need building, not delinking.
