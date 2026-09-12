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

---

## 10. `/about-us/leadership/`: the licensor's roster, on client instruction (29 Aug 2026)

Built empty in the morning, populated in the afternoon. Both halves are worth
recording because the second reverses a recommendation the first one made.

### What was built first, and why it was empty

Spec §9.5 specifies five Akshar Byonyks executives with 150–250 word bios and
consistent portraits, then says **"Blocked on Open Questions 1.4. Launch gate."**
1.4 is open and those five are on the do-not-fabricate list, so the first build
shipped the route, the grid, the `[slug]` profile template, the structured data
and a module-load contract — and no people.

It also recorded, in writing, why byonyks.com's own fourteen executives were
**not** used to fill the gap: four biographies name Lahore or Pakistan against
spec F-1, two job titles carry "South Asia", portrait rights are unconfirmed,
and they are the licensor's staff answering a different question from the one
the page asks.

### The client's answer

> "Simply pull data from byonyks.com and use that in the about us page."

Instruction taken. Fourteen executives transcribed verbatim — name, role,
biography, portrait, LinkedIn — with the source URL and retrieval date on every
record. Nothing paraphrased, nothing invented, no biography edited.

### What was built to keep it truthful

The failure mode for this page is not a false sentence. It is **fourteen faces
under an Akshar Byonyks masthead with nothing saying otherwise**, which a reader
completes for themselves. So:

- Every record carries `organisation: "Byonyks"`, **every card prints it**, and
  the profile JSON-LD's `worksFor` says it too. Spec §3.1's first
  non-negotiable, enforced by the data shape rather than by remembering.
- **The first viewport names Byonyks** — "These are the executives of Byonyks,
  the company that designs and manufactures the cycler."
- A closing section, **"The Akshar Byonyks team"**, carries the pending note for
  the five. It sits below the grid rather than above it: the roster is real
  content and leads, but nobody may leave believing they have met the Indian
  company's leadership.
- `/about-us/`'s own "The people" section links through and repeats the
  distinction before the reader arrives.

### Two contracts, because there are two kinds of record

Spec §9.5's 150–250 word rule is enforced at module load — **for biographies
this project authors**. Eight of the fourteen transcribed ones fall outside it
(49 words at the short end, 517 at the long) and the rule is deliberately not
applied to them: padding a 49-word bio to 150 means inventing facts about a real
person, and cutting a 517-word one means deciding which half of someone's career
matters. Transcribed records answer to **provenance** instead — a source URL and
a retrieval date, both required, both enforced.

### Three things that remain open, and are the client's

1. **Four biographies name Lahore or Pakistan** — Farrukh Usman, Annie Usman,
   Nauman Tarif, Ahmed Muzammal — and two titles read "South Asia". This
   **conflicts with spec F-1**, the client's own attribution decision of 20 Aug
   2026. Carried verbatim per the 29 Aug instruction, flagged per record in
   `namesALocation` so the conflict is visible in the data. The alternative —
   silently editing a real person's published biography to delete where they
   work — was not taken and should not be taken by anyone else without asking
   them.
2. **Portrait rights are unconfirmed.** Fourteen named individuals'
   photographs from another company's site. Byonyks USA's approval covers name
   and marks, verbally (F-6 / OQ 1.5); nothing covers employee photographs.
   Launch gate.
3. **§9.5's "consistent backdrop, crop and lighting" is not met.** The source
   backdrops run white cut-out to dark grey to outdoors; two images are event
   stills rather than portraits. The grid normalises the crop and nothing else
   is fixable without editing other people's photographs. A re-shoot is the
   answer.

### And the question this page still does not answer

Open Question 1.4 is unchanged. The site now names fourteen people who built the
device and **zero people who run the Indian company** — which the spec's risk
table calls out directly: "Investor-first with no named team is not credible."
The roster helps; it does not close that gate.

### 10a. The portraits, normalised (29 Aug 2026)

Client: portraits confirmed usable from Byonyks; crop them to make backgrounds
and proportions similar; then build each page.

**Measured before deciding.** Sampling the top band and upper side columns of
each image separated ten flat studio backdrops from four real-place
photographs. That measurement chose the treatment per image rather than one
rule being applied hopefully to all fourteen.

- **Ten backdrops replaced** with `--color-surface-3`, by border-seeded flood
  fill so a colour occurring inside the subject cannot be removed unless it is
  connected to the frame edge.
- **Four kept.** A bad cut-out of a real person is worse than an honest
  photograph; they were cropped tighter instead.
- **All fourteen reframed** to 4:5, top-anchored. 5.2 MB → 1.2 MB.

**Two bugs worth keeping, because both looked like design problems and were
not.**

1. **`sharp.blur()` on a one-channel raw buffer returns three channels.** Every
   mask lookup was therefore reading a pixel a third of the way into the image,
   which rendered all ten subjects as faint ghosts over the new ground. Two
   passes were spent blaming the compositing before measuring `soft.length` —
   843,942 against 281,314 pixels — which found it immediately. **Take the
   stride from `info`; never assume a raw buffer kept its channel count.**
2. **`sharp.strategy.attention` decapitates portraits.** It crops to the
   highest-entropy region, which on a head-and-shoulders shot is frequently the
   shirt pattern or a busy background. Four of fourteen lost the top of the
   head. A top-anchored crop with a per-image nudge is predictable and
   reviewable; a saliency heuristic is neither.

**And one that only showed at full size.** Mary Hoffman's dark-grey backdrop is
within the general tolerance of the shadowed strands of her hair, so the fill
walked through them and removed about a third of it. Visible in the contact
sheet as a chewed edge; obvious at full size. Fixed with a per-image tolerance
(52 → 26) plus a bounded 3-ring dilation to clear the rim that left behind.
**The contact sheet found it, the full-size view confirmed it — both steps were
necessary, and neither is optional on fourteen photographs of real people.**

**Each profile page now shows its own provenance:** "Biography and portrait as
published by Byonyks, carried here word for word", with a link to the source and
the retrieval date. A quoted biography without a visible source is the same
defect as an uncited statistic.

Verified: all fourteen profile pages return 200, render their portrait at
288×360, carry multiple biography paragraphs and a working source link, with no
console errors. 37 static pages.

---

## 11. The first Akshar Byonyks executive (29 Aug 2026)

Client supplied one record — Dr. Vishnu Patel, MD, Vice President — to sit at
the top of the leadership list. Carried verbatim, with one character added: the
supplied text ended without a full stop.

**The roster is now two companies, so it is now two grids.** One person from
Akshar Byonyks above fourteen from Byonyks, in a single mixed grid, told apart
only by a caption, is exactly the blur spec §3.1 forbids — and a reader who
skims the top of a leadership page and sees an Akshar Byonyks masthead over
fifteen faces has been told something false without a false sentence being
written. The page is now two labelled sections under two company headings, the
first viewport carries `licensingStatement` verbatim from `claims.ts`, and every
card still prints its own `organisation` — the heading scrolls away, but a card
gets screenshotted and read on its own.

**A third kind of record, and the contract that goes with it.** There were two
before: authored here (§9.5's 150–250 words, enforced) and transcribed from a
public page (provenance, enforced). This one is neither — somebody else's words
with no URL to cite. Rather than let it through unchecked, `suppliedBy` carries
the same obligation as `sourceUrl`: a date is required, and the profile prints
"Biography supplied by Akshar Byonyks, carried here word for word. Received 29
August 2026." **A biography of a real person with no stated origin is the same
defect as an uncited statistic, whether it arrived off a website or out of an
email.**

**No photograph was supplied**, and the portrait contract deliberately fails the
build on a missing one. It still does — but a record may now declare
`portraitPending`, which publishes a marked placeholder instead: the initials,
plus "Photograph pending" in the site's existing pending language (dashed
border, mono clock label, the semantic pending amber). Not a grey silhouette,
which is a picture of nobody presented as a picture. The omission has to be
declared, so a portrait can still only go missing on purpose, and the gap is
visible to the client on every visit — which is how the photograph arrives.
`ProfilePage`'s `image` key is omitted rather than pointed at the placeholder.

### Two things carried as supplied, and flagged rather than edited

1. **124 words, against §9.5's 150 floor.** Padding it means inventing facts
   about a real person — the same reasoning already applied to the transcribed
   records. It is the client's copy about the client's own executive, so it is
   theirs to extend.
2. **"the development of manufacturing and distribution capabilities in
   India."** This does not say Akshar Byonyks manufactures — it describes
   building a capability — and `claims.ts` still says "Byonyks designs and
   manufactures the device" everywhere the site speaks in its own voice. Worth
   watching: it is one edit away from the claim the project is not allowed to
   make.

**Open Question 1.4 is not closed by one name.** The pending note stays, below
both grids, and now also says the photograph is missing.

---

## 12. One list, and Dr. Patel's portrait (29 Aug 2026)

Client, same day as §11: *"Dont make Akshar Byonyks and Byonyks 2 seperate
lists. Should be one in the same."* Plus his photograph.

### The split is gone

§11 had built the roster as two labelled sections under two company headings,
because one Akshar Byonyks name above fourteen Byonyks names in a single grid is
the blur spec §3.1 forbids. The client's instruction reverses that and it is
their call; the two sections are now one list of fifteen, Dr. Patel first.

**What was kept, and why it was not up for grabs.** Every card still prints its
`organisation` under the role, the intro still says the list spans both
companies, and each profile still names the employer in the visible copy and in
the JSON-LD's `worksFor`. The instruction was about the *lists*; §3.1's
requirement that the two companies are never blurred is not something a layout
change can satisfy on its own. **With the section headings gone, that per-card
label is now the whole of the defence** — which is recorded at the top of
`leadership.ts` and in the page, so nobody removes it later to tidy up the
cards.

### The portrait, and why it took four attempts

His backdrop is a **graded warm-brown vignette**, not the flat colour the other
ten studio portraits have — measured spread 25.4, swinging ~90 levels between
the top corners and mid-height. The existing fixed-tolerance flood fill is the
wrong tool for that, and the failures were instructive:

1. **Fixed tolerance, single seed** — cannot cross the gradient without also
   being wide enough to walk into him.
2. **Local-delta region growing** — compares each pixel to the neighbour it
   spread from, which handles gradients. It **consumed his cheek, jaw, neck and
   shirt**: backdrop-to-skin is a soft transition here, and once across it, skin
   is itself a smooth gradient in the same hue family. Also, seeding from every
   border pixel put seeds directly **on his shoulders**, which run off the
   bottom and both lower sides.
3. **Quadratic surface fit** — model the vignette, judge each pixel against the
   colour predicted at its own position. Right idea, poisoned input: a fixed 10%
   top band already contained his hair, residual 32.5. Bounding the sample by
   the **measured** top of his head (y=21) and rejecting outliers twice took the
   residual to **3.0**.
4. **Hard threshold on a soft edge** — even with a good surface, a binary
   in/out decision on his slightly out-of-focus jaw cut a **ragged, stair-
   stepped silhouette**.

**What finally worked was not a colour rule at all.** Shadow could not be
separated from skin by colour or luminance — measured, and they overlap almost
completely, because the backdrop is literally brown and so is he. What separates
them is **texture**: the backdrop is smooth everywhere, gradient p99 = 4.1, and
his silhouette is an edge even where soft. So the fill flows through anything
flat and may not cross anything steep, with the fitted surface kept as a second,
independent condition. At a gradient ceiling of 8 the subject holds at 57% of
the frame; at 14 it collapses to 24%, i.e. the fill has broken into him — which
is how the ceiling was chosen.

Then three bounded clean-ups: a 3-ring dilation to close the dark contact-shadow
rim (the colour guard was refusing to absorb the exact pixels dilation exists
for), a connected-component rule to absorb stray islands (he is one mass), and a
28px trim of the left edge for one shadow patch that was **bridged to his
shoulder** and so counted as part of him — cheaper and safer than widening a
tolerance that would have to pass over his face to reach it.

**Framing:** full width kept and the top padded with the same ground colour,
rather than cutting width to reach 4:5. His source is framed tighter than the
others, and cutting width left his head visibly larger than everyone else's in
the grid. Padding above his head is invisible because that area is already
exactly that colour. Sides and bottom were not padded — his shoulders run to
those edges and ground beyond them would read as a cut-out.

**Nothing about him was retouched.** No face, skin, colour or feature altered.

`portraitPending` and the placeholder built in §11 are now unused but retained:
the rest of the Akshar Byonyks team is still outstanding, and the next record to
arrive without a photograph should publish the same way rather than wait.

---

## 13. Four portraits reverted to their originals (29 Aug 2026)

Client: *"Revert to original portrait photos for Vishnu Patel, Mary Hoffman,
Hassan Abrar, and Nauman Tarif."* Done — those four are now the untouched
source files, and the normalisation applied to them earlier today is undone.

| Portrait | Now serving | Backdrop | Ratio |
| --- | --- | --- | --- |
| Vishnu Patel | `vishnu-patel.jpg`, the file the client sent | brown vignette | 0.878 |
| Mary Hoffman | `mary-hoffman.png` | dark grey | 0.621 |
| Hassan Abrar | `hassan-abrar.png` | pale blue | 0.621 |
| Nauman Tarif | `nauman-tarif-md.png` | pale blue-white | 0.621 |

The three PNGs were recovered from git at `1e856c0`, which is why the earlier
pass kept them in history instead of only in a scratch directory. The other
eleven are unchanged: still 900×1125 on `--color-surface-3`.

### One code change was needed, and it is not cosmetic

The grid frame is 4:5. Three of these four are **0.62**, well outside it, so the
frame now crops them — and `object-cover` defaults to a **centred** crop, which
on a tall portrait takes the top of the head off. The shared portrait component
now anchors to the top (`object-top`), so the whole crop is spent on the chest
instead, which is what a portrait can afford to lose. Verified on all four:
nobody is decapitated. The eleven that are already exactly 4:5 are unaffected.

### What this costs, stated rather than buried

- **Page weight.** `public/images/leadership/` goes from **1.3 MB to 2.0 MB**.
  The three restored files are PNGs of photographs — 437 KB for a 418×673 image
  — which is a bad format for the job. Next's image optimiser transcodes them at
  request time so what a visitor downloads is far smaller, but the repo and the
  Workers bundle carry the full size. **Re-encoding them to JPEG at their
  original dimensions, with no crop and no backdrop change, would recover most
  of that and alter nothing the client objected to.** Not done here, because the
  instruction said original files and that is what is committed; it is a
  one-line follow-up if wanted.
- **Spec §9.5 consistency moves further away.** The set now runs brown, dark
  grey, pale blue, pale blue-white and `--color-surface-3` across fifteen
  cards, with two different aspect ratios underneath. That was already an open
  item needing a re-shoot; it is now more visible. **This is the client's call
  and it is recorded as theirs, not as a defect that crept in.**

Nothing else changed: all fifteen still carry their `organisation` on the card,
the list is still one list, and every biography still carries its provenance.

---

## 14. `/news/` and the two migrated articles (29 Aug 2026)

Spec §9.7 and the client's audit response: *"Build future highlights and from
the experts to be later populated / Keep latest updates as is / Keep both news
articles."* Built as specified: three sections, two of them scaffolds, two real
articles at `/news/[slug]`.

### The bodies came from the markup, not from a summary

Both releases were collected from byonyks.com. The first attempt used a fetch
tool that renders a page through a summarising model, and its output **read
like an article without being one** — the opening line it produced ("Device
manufacturer Byonyks announced…") is not the article's opening line ("Itasca,
IL – Device maker Byonyks has received…"), and several sentences were
paraphrases of direct quotes. It was caught because the excerpt on the index
page did not match the body it returned.

**A text may not be labelled "carried word for word" unless it came from the
source markup.** Both bodies were re-fetched as raw HTML and extracted from the
paragraph elements. The site says these are verbatim, so they are.

### The statistics are carried, not adopted

Between them these releases assert that 85% of Americans on dialysis do not
receive PD, that PD has a 10% survival advantage over in-center hemodialysis
(attributed to the U.S. Renal Data System), that ~86% of the world's population
needing dialysis has no access, and that Byonyks has delivered 10,000+
therapies. The project rule is that no unsourced statistic ships, and it holds
here **because none of these are presented as this site's figures**: they sit
inside an attributed, dated, linked republication of somebody else's press
release — the same contract the leadership biographies answer to.
`carriedClaims` lists them per record so the exposure is visible in the data.
**If any of these numbers is ever lifted out of an article page and stated in
Akshar Byonyks' own voice, it needs its own primary source first.**

### Whose news this is, said before the first sentence

A news index under an Akshar Byonyks masthead is exactly where a reader assumes
"our news", and the newer of the two articles is about entering the **United
States** market. So: the publisher is on every card, in the hero, in the article
header, in the `NewsArticle` author/publisher, and in an editorial note that
sits **above** the body rather than a footnote below it. Spec §3.1's first
non-negotiable, applied the same way it is on the leadership grid.

### Section order kept, against the instinct to improve it

§9.7 says "structure exactly as the audit specifies" and lists Featured
Highlights, From the Experts, Latest Updates. Two empty sections above the only
live content is a poor first impression, and **moving Latest Updates to the top
was considered and rejected**: the order is a specified requirement, and the
spec's own remedy for the empty ones is a design remedy — "an empty section must
look deliberate, not broken" — not a reordering. They render as compact,
labelled cards that say what will go in them and admit they are empty. Both are
empty at source too: byonyks.com's own "From the Experts" heading has nothing
under it, and its "Featured Highlights" is a photo gallery with no articles
behind it. There was nothing to migrate and nothing was invented to fill them.

### `/impeccable audit` — run, for the first time on this project

The standing CLAUDE.md rule says run it on every new template. It had never been
run. It was run here and it found things:

- **P2, fixed.** The detector flagged `border-l-4` on the editorial aside —
  "the most recognizable tell of AI-generated UIs". True, and replaced with the
  site's own idiom: a bordered box with a mono eyebrow, as `PendingNote` does.
- **P1, fixed.** The category chips used `border-white/45`… after measurement.
  They started at `border-white/25`, which is **2.19:1 against the ink** and
  under WCAG 1.4.11's 3:1 for a component boundary. `/45` is 4.30:1 and is
  already the site's on-ink border weight (x1-hero, market-hero,
  how-it-works-hero), so this is not a new token.
- **P3, fixed.** The inline "Source" and "Wire release" links measured 45×19 and
  97×20. Inline links in a sentence are exempt from WCAG 2.2's 24×24 target
  rule, but `py-1` — which the codebase already uses on its standalone text
  links — clears it anyway without changing the layout.

**One thing the audit reported that was wrong, and it was my checker.** The
first contrast sweep reported ~11 failures per page. Nearly all were false:
the script parsed `oklab(0.999994 0.0000455 0.0000200 / 0.75)` as if the first
three numbers were RGB, so every alpha colour on the ink background came back as
1.24:1. Recomputed properly by compositing alpha over the real backdrop, every
pair passes — the worst is the 14px breadcrumb at **6.68:1**, and the 12px date
and category text are **8.69:1**. A tool that reports failures is not the same
as a failure.

Clean after the fixes: no detector findings, no heading-level jumps, one `h1`
per page, no horizontal overflow at 390px or 1400px, no unlabelled new-tab
links, no targets under 24px.

### Still open

`/news/` was one of six 404ing nav and footer links. **Five remain:**
`/terms-of-use`, `/cookie-policy`, `/grievance-redressal`, `/accessibility` and
`/about-us/careers`. Spec §9.7 also warns that a news index whose newest post is
February 2026 signals a stalled company, and that the minimum viable cadence is
one post a month — that is a content-ownership problem, not a build one, and the
spec assigns it an owner in Phase 0.

---

## 15. The last five routes: terms, cookies, grievance, accessibility, careers (30 Aug 2026)

Client: *"Complete all of them."* All five 404ing links are now real pages.
**Every nav and footer link on this site resolves.**

### The scaffolding was extracted first

The privacy policy had grown a good structure — ink header, sticky section index
beside a measure-limited column, `scroll-mt` so anchor jumps clear the sticky
header. The alternative to extracting it was five copies of that layout, which
is how a heading gets renamed on one document and not the other four. It now
lives in `components/legal/legal-document.tsx` and all five use it. The privacy
policy was moved onto it in the same pass; nothing about that page changed but
where its scaffolding is defined.

**A side effect worth noting:** the shared `MailLink` and `InternalLink` carry
`py-1`, which silently closed the four sub-24px targets the audit had been
reporting on the privacy policy.

### Each page states facts it could establish, and marks the rest

- **`/terms-of-use/`.** Nothing on this site is gated, sold or account-based,
  which removes most of what a terms document normally governs. **No
  arbitration clause**: spec §14.3 says the tooling notes' guidance is US-framed
  and that arbitration in consumer contracts is treated differently under
  Indian law. Copying it would have been the single most likely clause here to
  be unenforceable, so the dispute-resolution seat is marked pending for
  counsel. Registered address and CDSCO position likewise.
- **`/cookie-policy/`.** **The claims here were measured, not assumed.** Fourteen
  routes were loaded in a clean browser profile and the cookie jar,
  `localStorage`, `sessionStorage` and every outbound request host read back.
  Result: **no cookies, no storage keys, one third-party host** —
  `cdn.jsdelivr.net`, the video placeholder's stylesheet and script. "We use
  only essential cookies" would have been the easy version of this page and
  false in the other direction. What could **not** be measured locally —
  Cloudflare's production edge and Turnstile — is marked as pending production
  verification rather than folded into the "none" claim.
- **`/grievance-redressal/`.** Spec §14.3 wants "named officer, contact,
  process, timeline." Three of the four are real and usable today. **The named
  officer is not**, and that gap sits at the top of the page in the semantic
  amber rather than the bottom, because someone arriving here is arriving with a
  complaint and the first thing they need is whether a real person is at the end
  of it. The statutory response period is left to rules under the DPDP Act, so
  the page states a **service commitment that is ours to keep** (3 working days
  to acknowledge, 30 days to answer) and marks the prescribed statutory period
  as counsel's to confirm. A wrong statutory deadline on a statutory page is
  worse than an admitted gap.
- **`/accessibility/`.** Written from measurement rather than from a template.
  Fourteen routes at 1400px and 390px were checked for document language, skip
  link, main landmark, heading order, `h1` count, missing alt text, horizontal
  overflow and unlabelled new-tab links; contrast was computed by compositing
  alpha colours over their real backdrops. **Three gaps are named with their
  WCAG criteria**: machine-generated captions on all eight ByoTalks recordings
  (SC 1.2.2 — the most consequential gap on the site), no audio description
  (SC 1.2.5), and no assistive-technology testing or independent audit. The page
  deliberately does **not** claim "WCAG 2.1 AA compliant", because automated
  structural checks cannot support that claim.
- **`/about-us/careers/`.** No open roles, said in the first viewport.

### Three departures on Careers, each deliberate

1. **The departments grid is not migrated.** byonyks.com lists eight teams
   including **Microbiology and Manufacturing**. Those are Byonyks' teams.
   Reproducing them under an Akshar Byonyks masthead would assert this company
   has a manufacturing line — the project's hardest standing rule is that Akshar
   Byonyks is never described as the manufacturer. The India org structure is on
   the do-not-fabricate list and Open Question 1.4 is still open, so the section
   says whose teams those are and marks ours pending.
2. **The 21st.dev icon portfolio is not used.** F-7 requires an account, and the
   spec's own note says licensing is inconsistent per component and each must be
   checked before shipping. No account exists and no licence has been checked,
   so shipping one would be shipping an unlicensed asset. These are lucide icons
   — already a dependency, ISC licensed, single-stroke at consistent weight,
   which is what §7.2's iconography rule actually asks for. **Client decision
   needed if the 21st.dev direction is to be honoured.**
3. **The value descriptions are authored, not migrated.** byonyks.com carries
   the five value *names* as headings over icon images with no body text, and its
   hiring process is an unreadable diagram. There was nothing to migrate but the
   names. The sentences are written for this site and each is anchored to
   something the site actually does — but they are ours and **need client
   sign-off**.

### The audit caught me borrowing a number

The first draft of the Careers "Innovation" value read *"...refused to accept
that **86%** of the people who need dialysis simply would not get it."* That
figure is a Byonyks press-release claim which `/news/` carries under
attribution, and which `news-data.ts` — written the day before — explicitly says
**may not be restated in Akshar Byonyks' own voice without its own primary
source**. A careers page is exactly where a number like that gets borrowed for
colour. It was caught on review of the rendered page and the sentence was
rewritten without it. The rule held; it just needed enforcing against its own
author.

### Audit result

Detector clean on all six templates. Across fourteen routes at two viewports:
no heading-level jumps, one `h1` per page, no missing alt text, no horizontal
overflow, no unlabelled new-tab links, and **zero flags on any of the five new
pages**. Two pre-existing flags remain and are **not defects**: the source
citations on `/innovation/market/` and two links on `/contact/` are inline text
links inside sentences, which WCAG 2.2 SC 2.5.8 explicitly exempts.

One real fix outside the five: Home's "Visit Byonyks USA" link opened a new tab
without saying so. Fixed rather than listed.

### Still open

Nothing routed from the navigation 404s any more. Outstanding on these pages is
not engineering: the **Grievance Officer appointment**, the **registered office
address**, the **retention period**, the **jurisdiction seat**, **written trade
mark permission**, **human-verified captions**, an **independent accessibility
audit**, and **client sign-off on the authored careers values**.

---

## 16. The provenance scale, the document spine, and the ledger (30 Aug 2026)

Client, after a sitewide audit and critique: *"Conduct fixes 1, 2, 4, 5, 6… except removing the silk."* Five directions from the critique's Part 3, built. **The silk hero stays** — the critique argued against it, the client kept it, and that is the client's call. It is untouched.

### What the audit measured, before any of this

- **Content span at 1440px.** Sections alternated between ~83% of the canvas and ~53%, and every 53% section was pinned left with ~670px of dead white beside it. `/about-us` ran **53, 53, 62, 53**.
- **58 rendered "pending" markers** across sixteen routes, fifteen on `/innovation/the-x1-cycler/` alone.
- **Two display-numeral treatments** at different sizes, only one with tabular figures.
- Zero contrast failures across eighteen routes; zero heading-order, alt-text or overflow flags. The structural floor was already good, which is why this work is composition and system rather than repair.

### 16.1 The provenance scale — accents get a second job

**No new hue.** The four accent roles DESIGN.md already documents now also carry *how a fact is known*: plum = on the public record, teal = published source, primary = stated by Byonyks, pending amber = not yet established. Each keeps the meaning it already had. **Gold stays out**, because gold means "home / India" and not reaching for the fifth accent is why the other four still mean something.

**This is a promotion, not an invention.** `compliance.ts` already split `public-record` from `company-stated` when the X-1 page was built. All this does is take that distinction sitewide and add the two statuses the rest of the site needed.

**The type makes bad provenance unrepresentable.** `Provenance` is a discriminated union, not a status string with optional fields: a `record` cannot be constructed without a URL a reader can open. "On the public record" is a claim about verifiability, and if it can render without the link it is decoration. Same instinct as the module-load contracts in `leadership.ts`, moved one step earlier to compile time.

**Three on-ink values added**, chosen so all four land within **6.6–7.0:1 on ink** and read as one tonal family with the pre-existing `pending-on-ink` rather than four unrelated tints.

**Form.** A **1px** rule and a mono label in the gutter. Not a thick coloured border — the craft floor bans that above 1px, and the detector flags it as a side-tab. On mobile the mark becomes a footnote **under** the block, never above it, because a status label stacked on a heading is a kicker and this design system rejects those outright.

**It removed a real flag.** `origin-story.tsx`'s founder quotation had a **4px gold left border** — a detector `side-tab` finding on the one block whose entire point is that it is somebody else's words. It now carries the provenance rail at 1px, saying *where it was published and when it was checked*, in words as well as colour. Decoration became information and the flag went with it. **Detector findings: 5 → 4.**

### 16.2 The document spine — the legal grid, generalised

A prose section is now a two-track grid: a 14rem gutter pinned to the container's left edge, and a 74ch measure beside it. `/about-us`'s hero went **53% → 68%**, "The people" **53% → 65%**, `/innovation`'s India section **53% → 65%**.

**Three rules make it a system rather than an indent**, and the second was learned the hard way:

1. **The rail must be occupied.** An empty gutter is worse than no gutter. No provenance, no date, no note → the block is `wide`, not railed.
2. **A section is railed or wide, including its heading.** Railing the prose on `/about-us` while leaving the milestone timeline alone produced headings at **three different x positions on one page**. Fixed by making the choice per-section, so a page alternates between exactly two left edges.
3. **The rail is a margin, not navigation.** Which is why this is *not* a copy of `legal-document.tsx`. That shell centres an index-plus-measure pair, and that is right for a sticky table of contents: navigation wants to be centred and stay put. Annotation wants to be a margin. The five legal documents keep their own shell.

`milestones.tsx` needed **no change** under rule 2: a timeline that already draws its own rule with dates hanging off it is a wide figure, and nesting it in a second margin would have drawn two rules two hundred pixels apart saying the same thing.

### 16.3 `/what-we-know/` — the ledger

One page carrying every factual claim on the site with its basis: **37 entries — 1 public record, 15 published sources, 6 stated by Byonyks, 15 not yet established.**

**It derives; it does not restate.** Entries are assembled from `compliance.ts`, `market-data.ts` and `byotalks.ts` — the same data the pages themselves render. A ledger that retyped those facts would be a second copy free to drift, which is the exact defect `market-data.ts` documents on its own opening lines (byonyks.com carries Guatemala at 56%; the paper says 45%). **Only the gaps are hand-written**, because an absence has no data structure to derive from — and the file says so, and says the drift risk is a person's job to catch.

**No client-side filter**, for the reason `legal-document.tsx` gives for its own index: four anchors do the whole job, and a filter island on a static register would be a cost this audience pays for nothing. It would also *hide entries*, which on a page whose entire argument is "here is all of it" is the wrong default.

**One data bug caught on first render.** Market figures' `asOf` is the period a figure *describes*, not a fetch date, so the first draft rendered "Retrieved Stated in the 2016 programme guidelines…". The type now gives each status its own date semantics: a public register is dated by when it was **checked** (it can change under you), research and company credentials by the period they **describe** (it cannot).

### 16.4 The display numeral

One named role replacing two ad hoc treatments, with a four-step ramp **read off the site rather than imposed on it** — so adopting it changed no rendered pixel on `/innovation/market/`, the best page on the site. Tabular figures are now on everywhere a column of numbers is meant to be compared, and deliberately **not** globally: an even digit advance is exactly what you do not want mid-sentence.

Also themed, per the craft floor's "browser surfaces": the **caret colour** in the enquiry form, which was shipping as OS near-black on a navy-and-white system.

### 16.5 What was NOT done, and why

- **The silk hero stays.** Client decision, stated plainly. The 227 KB gzipped of three.js it loads on Home is therefore still there, and it is still more than the entire rest of Home's JavaScript (189 KB gz). It remains undocumented in this file's own terms — a stock React Bits component with no licence check recorded — and that is worth revisiting.
- **The scrim was not recalibrated.** Not in the selected set. The hero photographs on `/innovation/` and `/byotalks/` still survive at roughly 10% of available dynamic range.
- **The placeholder `tel:` link stays.** Client decision: `+91 00000 00000` remains a live tappable link sitewide.
- **The 404 is still the framework default**, and the mobile menu button is still 32×32. Both were in the other list.

### Verification

`tsc` and `eslint --max-warnings 0` clean. **49 static pages.** Zero contrast failures across **21 routes** with alpha composited over real backdrops. Zero heading-order, `h1`-count, alt-text, overflow, new-tab-label or target-size flags at 1440px and 390px. Detector 5 → 4; the three remaining `#000`/`#999` findings are the pre-existing `@media print` values documented in `globals.css` itself, and the fourth is `button.tsx`'s `0.8rem`. **The narrow ignores for the print values could not be persisted — `hook-admin.mjs` is blocked by this environment's sandbox — so they will keep reporting.**

**One defect found in this work and fixed:** the new provenance source links were 20px tall standalone links in the margin. SC 2.5.8's inline exception covers targets constrained by surrounding prose, which these are not, so they took `py-1` to clear 24px rather than an argued exemption.

---

## 17. The Hindi track (30 Aug 2026)

Two routes — `/hi` and `/hi/peritoneal-dialysis` — in Hindi, for the Priority-2 audience PRODUCT.md describes as *"frequently older, often reading in a second language under stress."* The site was serving that audience entirely in English. `next-intl` had been a dependency since the first build with **zero importing files**, and Noto Sans has shipped the Devanagari subset from day one "for the Hindi roadmap". The roadmap had nothing on it.

### No `[locale]` segment, and no middleware — a deliberate departure

The conventional shape is `app/[locale]/` plus negotiating middleware. That is right for a site that is *translated*. This one is not, and should not be: **two of twenty-one routes carry Hindi**, and the specification table, the compliance register, the market case and the five legal documents are not going to. Translating a regulatory position nobody has confirmed yet multiplies the risk rather than the reach — and a hedged English sentence reads as a commitment once it is in a second language.

A `[locale]` segment would therefore have put a locale prefix on nineteen routes that will never have a second locale, and changed every canonical URL and internal link on the site, for two pages. The critique named this trade explicitly: *"every route gains a locale segment — do this before the URL structure sets, or don't do it."* This is the third option: a real Hindi track, and **twenty English URLs that do not move**.

next-intl supports it directly. `getTranslations({ locale: "hi" })` passes the explicit locale through to `getRequestConfig`, and the library's own types document the no-segment case. The catalogue, plural rules and formatting are all real; only the routing is ours.

**Context7 was unavailable in this session**, and `CLAUDE.md` requires consulting it before writing next-intl code. The API was verified instead against the installed package's own type declarations in `node_modules/next-intl/dist/types/`, which is the closest available substitute and is stated here rather than glossed over.

### Why a catalogue at all, for two pages

Because **the reviewer is a person, not a build step.** The Hindi here has not been checked by a qualified medical translator. When it is, that person needs one file with the English and the Hindi side by side — not two JSX files to read around. `messages/hi.json` opens with a note telling the reviewer exactly which strings to check hardest.

### The gap is declared, in Hindi, above the fold

Every Hindi page opens with a notice — in the same semantic amber and dashed border this site uses for everything unfinished — saying the translation has not been checked by a qualified medical translator and that **the English is authoritative where the two differ**. Above the content, not below it: the same reasoning the ByoTalks player uses for machine-generated captions. A reader deciding whether to trust a medical page needs to know how it was made *before* they read it. It is carried in `claims-ledger.ts` as `pending-hindi-review` and appears on `/what-we-know/` with the other fifteen gaps.

### Three correctness fixes the work exposed

1. **`lang` on the boundary.** The root layout declares `lang="en-IN"`, which is right for nineteen routes and wrong for two. A screen reader chooses pronunciation from that attribute, and Devanagari read with an English voice is not accented, it is unintelligible. `app/hi/layout.tsx` carries `lang="hi-IN"` — a layout rather than a per-page attribute, so a third Hindi page cannot be added without it. WCAG 3.1.2.
2. **`font-mono` on Devanagari, removed.** The mono stack carries no Devanagari glyphs, so the notice label was rendering in an arbitrary substituted face — and `tracking-wide` on Devanagari is worse than cosmetic, because conjuncts are ligated forms and the matras are positioned relative to the glyphs they attach to. Letter-spacing pulls the marks apart. Fixed systemically in `globals.css` under `[lang|="hi"]`: tracking reset to normal, and line height opened to 1.75 body / 1.4 headings, because Devanagari occupies more vertical space than Latin at the same size.
3. **English inside a Hindi region.** The FDA register's name is a proper name and stays English — but it was rendering unmarked inside `lang="hi-IN"`. `ProvenanceMark` now takes a translated status label and marks the source name `lang="en"`, so a screen reader switches voice for the register's name and reads the status in Hindi.

### The regulatory sentences are translated, not summarised

`home.clearance` and `home.indiaPosition` carry the three constraints PRODUCT.md calls non-negotiable: the clearance belongs to **Byonyks, not Akshar Byonyks**; a US clearance is **not** an Indian authorisation; Akshar Byonyks is **not** the manufacturer. The K-number and decision date are read from `compliance.ts` rather than retyped into the catalogue, so they cannot drift from the English.

### A contract, because the failure is silent

next-intl renders a missing key as **the key path**. A Hindi page missing `home.indiaPosition` does not crash and does not warn — it renders the literal string `home.indiaPosition` where the sentence about India's regulatory position should be, builds, deploys, and looks roughly right to anyone who does not read Hindi. That is not a typo; it is the regulatory sentence going missing in the language of the audience least able to cross-check it.

`src/i18n/messages.ts` compares the key sets at module load and fails the build instead. It also catches the likelier version: a reviewer renames or drops a key while rewording.

### What is not translated, and deliberately so

The seven questions to ask a nephrologist **are** carried — under the Drugs and Magic Remedies (Objectionable Advertisements) Act 1954 the decision belongs to a physician, and giving the reader the words to ask honours that better than telling them to ask.

The **four benefits are not**, because their clinical references are still pending and an unreferenced benefit claim reads as a promise in any language. The **authored figures are not**: their labels are drawn in English inside the SVG, and a Devanagari page with an English diagram is worse than the same page with the three steps set as prose.

The **contact form is not**. It is the one dynamic route on the site and carries Turnstile; forking it for two pages would fork the validation messages too. `/hi` instead carries the email address, a Hindi sentence saying you may write in either language and will be answered in the one you used, and a note that the form itself is in English.

### Still open

**The Hindi awaits review by a qualified medical translator.** It is marked on every Hindi page, in Hindi, and listed on `/what-we-know/`. Until it is reviewed the English is authoritative — and that is stated to the reader rather than only in this file.

---

## 18. Spending the accents (30 Aug 2026)

Client, on the home page: *"there are hints of other colors other than blue, white, and gold. Where else can we implement hints of other colors."* The answer was not that the site needed more colour. It was that the site already had a four-role colour code, taught it entirely on Home, and then almost never spoke it again.

### What the measurement showed

Across twenty-one routes: **teal in six places, three of them on Home. Plum in five, two of them on Home.** With zero of either: `/byotalks`, `/byotalks/[slug]`, `/news`, `/about-us/leadership`, `/about-us/leadership/[slug]`, `/about-us/careers`, `/innovation`, `/innovation/how-it-works`, and the five legal documents.

`why-different.tsx` had already written the diagnosis into its own source when the home page was rebuilt — the accent meanings *"get too few exposures to be learnable"* — and then nothing acted on it. The amber `pending` marker is the control in this experiment: it has **58 exposures** and is the one status on the site a reader recognises instantly. The mechanism works. It was just never used.

### `AccentRail`, and why it is not a second annotation language

The new component is a 1px rule with content beside it — deliberately the **same** form as `ProvenanceMark`, because a reader should learn one margin grammar here rather than two. The two answer different questions and are kept apart in the docs as well as the source:

- `ProvenanceMark` / `ProvenanceChip` — **how a fact is known.** Status, source, date. A citation.
- `AccentRail` — **what kind of thing this is.** No label, no date, `aria-hidden` on the rule.

They share a palette because they share the same four meanings, which is the reason the provenance scale could be built in §16 without inventing a hue.

**Colour is never the sole carrier here, and that is what licenses a 1px rule at all.** Everything a rail marks is fully legible in text — a clinician's credentials, a company's name. Nothing is lost in monochrome.

### The three placements, and the reasoning that selected them

**Teal on `/byotalks`.** Recorded sessions from named nephrologists is the most literal instance of "clinical evidence" this project has, and spec F-5 makes those credentials the reason the page exists. The page's *only* accent was **gold on the play button** — an accent spent on an affordance, and the wrong one, since gold means home/India. That is a Wayfinding Rule violation that had been sitting in the open since the previews were added on 28 Aug.

**Teal was not the fix for the button.** A control is not a meaning, so the circle went neutral white and teal went to the credentials instead. The same reasoning keeps links primary sitewide, including the FDA link inside the now-plum public-record panel.

**Plum on `/about-us/leadership` and `/news`.** Both carry one string that the site's most-repeated non-negotiable depends on — spec §3.1, that Akshar Byonyks and Byonyks are never blurred — and both were rendering it in the design system's quietest treatment. The roster page's own comment calls its `organisation` label *"the whole defence"*; it was 12px mono grey.

**One plum for both companies, not one each.** Giving Akshar Byonyks and Byonyks different accents would make colour encode company identity, which is a fifth meaning the four-role system does not have and the Wayfinding Rule forbids inventing. The rail says an attribution is being made; the words say which one.

**`/news` was proposed as plum, questioned, and kept as plum for a stated reason.** Under the provenance scale a Byonyks press release is `stated`, which is primary — so the first instinct was that plum was simply an error. It is not, because the index card is not answering the provenance question. It answers the prior one, *whose is this*, exactly as the leadership card does. The provenance question belongs on the article page against its source URL and retrieval date, and is noted below as still open.

**Plum on `/innovation/the-x1-cycler`, which is a correctness fix rather than an addition.** This page **invented** the public-record/company-stated split, §16 generalised it into the sitewide scale, and the page itself was never migrated — it was the last file hand-rolling the distinction it originated, and it rendered it **backwards** against `/what-we-know/`, where all thirty-seven claims are listed under the four colours. Under the scale a public register is plum and a company statement is primary. The K-number took plum, both registers took a real `ProvenanceChip`, and a status can no longer be renamed here without being renamed everywhere.

### Accents on ink, for the first time

The three on-ink tints added in §16 (6.6–7.0:1 on `--color-ink`) had no callers. A dark ground could previously carry white and gold and nothing else. Two now use them — the ByoTalks hero's clinical note in teal, the leadership profile's company line in plum — and both sit **below** the heading. A coloured label stacked over an h1 is a kicker, which DESIGN.md rejects outright; the same reasoning puts the provenance mark under a block on mobile rather than over it.

### Where accents were deliberately not added

`/innovation`'s three doorways already refuse them in their own source, and correctly: none of the three meanings fits three equal doors, and a fourth would be the ad hoc hue the Accent Ration Rule bans. `market-hero` is already gold and the page is about India. `about-hero` has no accent meaning present, so a rail there would be decoration — which is the thing this whole system exists to refuse. The five legal documents stay monochrome.

### One real AA defect found, and the measurement bug that had hidden it

The contrast sweep for this work reported 145 failures on five routes, including the header nav at 1.05:1. That was the **script**, not the site: it read `getComputedStyle` colours with a regex, so Tailwind v4's `oklch(0.29 0.09 262)` parsed as `rgb(0.29, 0.09, 262)`. Rewritten to rasterise every colour through a 1×1 canvas, which also resolves `color-mix()` and alpha correctly.

The corrected sweep then found a genuine failure that §16's own sweep had passed: **`text-muted-foreground/80` at 12px = 3.59:1**, under AA, on the twenty date lines of `/what-we-know/`. `--muted-foreground` is `#5f6b73`, a deliberate 5.06:1 on white, and the 80% opacity threw that away for nothing — the date is already separated from the source by being its own mono line. Fixed in `provenance.tsx`. The dark tone measures 6.68:1 and is unchanged.

**§16's "zero contrast failures across 21 routes" should be read with this in mind.** It was measured with the broken parser.

### Verification

`tsc` and `eslint --max-warnings 0` clean. Detector **4 findings, unchanged** — the three `@media print` values documented in `globals.css` and `button.tsx`'s `0.8rem`, all pre-existing, none from this work. Zero contrast failures across eight routes with colours rasterised and alpha composited over real backdrops; zero sub-24px targets. The one remaining sweep hit is `lite-youtube`'s own `.lyt-visually-hidden` span — 1×1px, `clip: rect(0,0,0,0)`, `clip-path: inset(50%)` — screen-reader-only text inside the play button, and a gap in the script's visibility filter rather than a page defect.

### Still open

- **The news article pages carry no provenance mark.** Each record has a `sourceUrl` and a `retrieved` date and would take a `stated` mark honestly. The index cards were done; `[slug]` was left, deliberately, rather than widening this change.
- **The `[slug]` leadership biography attribution is still hand-rolled prose** ("carried here word for word… Source, retrieved X"). It is accurate and it is not on the scale. Same call as above.

---

## 19. The opening curtain (30 Aug 2026)

Client instruction: *"import stroke text from ReactBits. Use it to make a loading screen for the site when it is first loaded that says Akshar Byonyks and waits for the silk background to be loaded before giving the user access to the website."*

### The cost, stated once

Anything standing between a visitor and this site's content costs more here than on most sites. PRODUCT.md describes the Priority-2 audience as *"frequently older, often reading in a second language under stress"*, and commit `5752b72` exists specifically to fix progressive-enhancement failures on these pages. A curtain is the opposite instinct.

It is the client's call, it is a reasonable one for a front door, and the version below is the one that does not become a defect. The reason it is defensible at all is that **it holds back nothing that is not already downloading** — it is a cover over a load that happens regardless, not an added wait.

### StrokeText: adapted, not adopted

`StrokeText` is real — React Bits ships it, described as *"outlined letterforms draw themselves on, then flood with fill"*. It was fetched from the upstream repository rather than written from memory, and then changed in three ways.

**Licence, checked and now on file.** React Bits is **MIT + Commons Clause** (David Haz, 2026). The Commons Clause forbids selling, sublicensing or redistributing the components themselves, *"whether alone, in a bundle, or as a ported version"*; using them inside an application or website, commercially included, is explicitly granted. This is the latter. §16.5 recorded that the silk component had shipped with **no licence check on file** — the same licence covers it, and that open question is closed.

**GSAP is gone.** The original imports `gsap` and `gsap/ScrollTrigger` and registers the plugin at module scope. `futureIdeas.md` already records rejecting `BounceCards` partly for *"a GSAP dependency the stack does not have"*, and importing ~70 KB of animation library into the component that renders **inside the curtain holding the page back** would have had the splash waiting on its own weight. The original timeline does exactly two things — tween `strokeDashoffset` with a per-character stagger, then widen a clip — and both are CSS animations with a `calc()` delay, which also puts them on the compositor rather than on a JS tick during the busiest frames of the load. The cost is honest: the four triggers (`mount`, `hover`, `scroll`, `loop`) collapse to `mount`, the only one this site wants.

**No hex enters the component.** The original's defaults are `#A78BFA` and `#F8FAFC`.

### Four defects found by measuring, not by reading

**1. `var()` does not work in SVG presentation attributes.** `stroke="var(--color-accent-gold)"` parses as an invalid paint and the glyphs render with no stroke at all. It is a CSS value function; it resolves in a declaration, not in an XML attribute. The original never meets this because it ships hardcoded hex — passing tokens is this project's requirement, and this is what it costs. Both are CSS properties on SVG, so `style` is the equivalent and correct route.

**2. CSS animations do not run on elements inside `<defs>`.** The original widens a `<rect>` inside a `<clipPath>` through gsap's `attr` plugin. Reproducing that as a CSS animation on the rect's `width` fails silently — measured, the rect sat at `width: 0px` for the entire timeline and the white flood never appeared. Elements in `<defs>` are never rendered, so the browser does not animate them. Replaced with `clip-path: inset()` on the rendered `<text>`, which animates normally, runs on the compositor, and takes percentages against the element's own box — so the flood needs **no measurement at all**.

**3. Stroke width is in user units, and the viewBox is scaled.** `strokeWidth` is measured against the 128-unit font inside the viewBox, which is then fitted to its container. The original's `1.4` default rendered here as **0.87 CSS px** — a sub-pixel hairline, invisible on a dark ground. Raised to 3.5.

**4. The SVG kept a fixed pixel height at every width.** The original hardcodes `height: fontSize * 1.3`, correct only at the one width where the viewBox happens to fit unscaled. At 390px the glyphs scaled down to 57px inside a box that stayed 166px, leaving 109px of dead space and a visibly orphaned Skip button. `height: auto` against the viewBox ratio makes the box hug the letters at every width.

A fifth was self-inflicted and worth recording: the first build held the SVG at `opacity: 0` until `getBBox()` succeeded, reasoning that a mis-scaled wordmark is worse than none. On a splash that is backwards — the measurement is asynchronous and can be starved, and the observed failure was a perfectly working curtain **with an empty middle**. It now renders against an estimated viewBox immediately and tightens on the next frame.

### The curtain, and the six things that keep it from becoming a defect

1. **Home only.** Silk exists on `/` and nowhere else, so "wait for silk" is only coherent there. Someone arriving on `/privacy-policy` from a search result meets the page. The other twenty routes never render the markup — confirmed in the build, where every non-Home route's bundle is unchanged.
2. ~~**Once per session.**~~ **Every load of Home** — client instruction, 30 Aug 2026. It shipped once-per-session via `sessionStorage` and the client asked for it on every reload, so the key and its try/catch are gone. A client-side navigation back to Home still does not replay it; only a real document load runs the arming script.
3. **It fails open.** Ceiling of 3s in the effect, and a **6s failsafe outside React** (below).
4. **No JavaScript, no curtain.** Verified against the production build: JS off delivers the site unobstructed.
5. **Reduced motion is not made to wait.** Those visitors never load silk — the hero gates it behind the same query — so waiting would hang them until the ceiling. They get a still, fully drawn wordmark and a 350ms beat.
6. ~~**Nobody is trapped.** A real Skip button~~ — **removed on client instruction, 30 Aug 2026.** Stated plainly because it is the one guarantee this feature gave up: a keyboard or screen-reader visitor now has no way out except waiting, and no way to see how long that is.

   What is left in its place is that there is nothing to escape *to*. The curtain holds no focusable element, so Tab does nothing rather than moving focus somewhere invisible, and everything behind stays `inert`. **The two ceilings stopped being a backstop and became the entire safety story**, which is the reason neither may be raised.

### Arming by injected stylesheet, not by an attribute

The obvious build sets `data-splash` on `<html>` and selects on it. That works, and it logs a **React hydration mismatch on every first visit** — `<html>` is React-rendered and the server never sent the attribute. `suppressHydrationWarning` did **not** suppress it under Next 15.5. Appending a `<style>` element the framework does not own touches no React-rendered attribute, so there is nothing to diff. Zero console errors after the change.

Context7 was again unavailable this session, so this was resolved by measurement rather than by documentation — the same substitution recorded in §17.

### The failsafe, which is the most important twelve characters in the feature

Testing broke the design's central claim on the first try. **Block the silk chunk and `next/dynamic` throws during render, Home's subtree never hydrates, and `SiteSplash`'s effect never runs** — so the 3-second ceiling, which lives inside that effect, never arms. The curtain is server-rendered markup held up by an injected stylesheet: with no JavaScript alive to take it down, it stays up **forever**. A flaky CDN would have locked visitors out of a medical-device site behind a decoration.

So the same inline script that raises the curtain now also schedules its removal, before React exists and independent of whether React ever works. Verified against the production build with the app page chunk aborted: React never hydrated (`data-splash-inert` count 0, proving the effect never ran) and the curtain still lifted at **6063 ms** with the scroll released.

**The general lesson, which is not about splash screens:** a timeout that guarantees a fail-open is worth exactly as much as the assumption that the code containing it runs. If the thing being guarded is visible without JavaScript, the guarantee has to be too.

### Two focus bugs, both found by pressing Tab

Neither was visible in the code.

1. The component renders inside `<main>`, so marking `#main-content` inert made **the curtain's own Skip button unreachable**. `<main>` is no longer marked; its children are, minus the curtain.
2. The root layout's "Skip to main content" link is a direct child of `<body>`, ahead of `<header>`, so it was **the first thing Tab reached** while the curtain was up — a link into inert content, offered from behind a curtain. It is inert now too.

### Two changes on client instruction, 30 Aug 2026

**The Skip button is gone** and **the curtain fires on every load of Home** rather than once per session. Both are recorded above where the original guarantees were claimed, rather than quietly edited out of them.

Together they change the risk profile in one direction: the curtain is now a recurring, unskippable wait. It is bounded — measured at **2.5 s** on the production build, hard-stopped at 3 s by the effect and 6 s by the failsafe — and that bound is now the only thing standing between a returning reader and a toll booth. If either ceiling is ever raised, this is the paragraph that should stop it.

### Cost

Home: **12.1 kB → 13.4 kB** route, 132 kB → 134 kB first load. Every other route unchanged. For comparison, the gsap dependency this port dropped is roughly 70 KB.

### Verification

`tsc` and `eslint --max-warnings 0` clean. Build: **49 static pages**. Detector **4 findings, unchanged** — the three `@media print` values and `button.tsx`'s `0.8rem`, all pre-existing, none from this work. Contrast on the curtain: Skip **8.65:1** at 12px, gold on ink **5.39:1** on display type, white on ink **16.9:1**; Skip target **52×32**. No horizontal overflow at 390px. Fifteen behavioural checks pass **against the production build**, including: the curtain fires on three consecutive loads; a client-side navigation back to Home does not replay it; nothing inside it is focusable and Tab moves nowhere; scroll is locked while it is up and released after; and — with the app page chunk aborted so React never hydrates (`data-splash-inert` count 0, proving the effect never ran) — the failsafe still lifts it at **6065 ms**.

Timing was measured **inside the page**, not across the test harness: an earlier suite reported the curtain lifting at 5.9 s and that was the harness's own round-trips being counted, not the curtain. In-page it is inert at 562 ms and gone at 2535 ms. Worth recording because the wrong number would have looked like the failsafe firing on every load.

### Still open

- **The floor is 1100 ms and it is a guess.** It exists so the wordmark is a moment rather than a flicker. Nobody has watched a real visitor meet it, and it is the first number to change if the curtain feels slow.
- **`SPLASH_MIN_MS_REDUCED` (350 ms) shows a still wordmark to reduced-motion visitors.** The alternative — not showing the curtain to them at all — is defensible and was not chosen, because the wordmark is a brand moment rather than a motion effect. Worth revisiting if anyone objects.
- **There is no way to skip the curtain, by instruction.** If a visitor ever reports being stuck behind it, the fix is not a new Skip button unless the client asks for one — it is to lower `SPLASH_MAX_MS`.

### A legal document, quietly falsified and quietly repaired

`/cookie-policy` states — as a **measured** fact, not boilerplate, and its source comment says so — that after browsing this site the cookie store, `localStorage` and `sessionStorage` are all empty. The once-per-session gate wrote `ab-splash-seen` to `sessionStorage`, which made that page **false** for as long as the gate existed, and nothing caught it: a legal claim broken by a splash screen.

Removing the gate on the client's instruction repaired it by accident. That is not a good enough reason to leave it, so it was re-measured rather than assumed — seven routes plus a full curtain cycle, all three stores empty — and `lib/splash.ts` now carries the rule in the place someone would reintroduce the bug: **if the curtain ever needs to remember anything about a visitor, the cookie policy is part of that change, not a follow-up.**

---

## 20. The gooey nav (31 Aug 2026)

Client instruction: *"import navigation-1 from reactbits as well and use it for the navigation bar."*

### What "navigation-1" turned out to be

**A React Bits Pro block** — $99–$299, login-gated, delivered into a buyer's repo through their CLI. Its source cannot be obtained without a licence, and rebuilding it from marketing previews would have been guesswork sold as a port, so it was not attempted. Put to the client with the alternatives; the answer was GooeyNav.

**GooeyNav is the only free React Bits navigation component with no dependencies.** That decided it, and the shortlist is worth recording so nobody re-runs it: PillNav wants gsap *and* `react-router-dom` — the wrong router entirely for a Next.js app — while CardNav (gsap + react-icons), FlowingMenu, BubbleMenu and StaggeredMenu all want gsap, the dependency `futureIdeas.md` already rejected a component over. LineSidebar is dependency-free but is a sidebar.

### Seven defects in the component as shipped

Each is a defect rather than a preference, and every one of them was found by running it rather than by reading it.

1. **Its styles were global, and one was destructive.** The component ships a `<style>` tag containing bare `li::after { content: ""; position: absolute; inset: 0; background: white }`. In a header that renders on every route, that paints a white box over **every list item on the site** — the specification table, the compliance register, `/what-we-know/`, the footer. All of it is now scoped under `.gooey-nav` in `globals.css`.
2. **Enter did not navigate.** `handleKeyDown` calls `preventDefault()` on Enter and Space and then runs only the particle effect, so a keyboard user pressing Enter on a nav link got an animation and stayed put. The handler is gone; the browser was already doing the job.
3. **The active item was local state.** `activeIndex` starts at a prop and only changes on click — wrong after a back button, a link from body copy, or a direct load of any inner page. It is derived from `usePathname()` now, using the identical section-parent rule `nav-link.tsx` uses, and it drives `aria-current="page"`, which the original never set at all.
4. **`<a href>` meant a full page reload** on every nav click.
5. **The duplicated label was read twice.** The colour-inversion trick draws the active label a second time in an overlay. It was removed outright rather than hidden: the active link is `text-ink font-semibold` and inverts on its own.
6. **No reduced-motion branch.** Fifteen particle elements per activation, unconditionally.
7. **It needs a dark ground to exist at all.** The effect is `blur(7px) contrast(100)` over `mix-blend-mode: lighten` with a black backing plate — on the white header it was invisible.

### Three more found in integration

**`querySelectorAll("li")` is wrong the moment the nav has submenus.** The original has none, so it indexes every `<li>` under the nav. This site's dropdowns contribute five more in document order, so index 3 landed on "The India Market" — an element inside a hidden panel, measuring 0×0 — instead of "News". The indicator rendered at zero size in the corner and never moved. Now `:scope > li`.

**The backing plate escaped.** At `inset: -75px` of solid black, with the effect as a bare sibling, it painted a grey band across the header and a black block into the section below: `mix-blend-mode` was compositing against the page rather than against the nav's own ground. The effect now lives in a clipped stage with the blend isolated to it — and the links and dropdowns stay **outside** that stage, or `overflow: hidden` would cut the submenus off at the panel's edge.

**Then the plate showed through anyway**, because `overflow` plus `z-index` make the stage its own stacking context: the blend was lightening against transparency, where black stays black. The stage carries the ink background itself now, so black disappears into it and the pale tile survives.

### Two decisions where the design system won

**It is not a pill.** The component is a pill and DESIGN.md's Shapes rule is explicit — *"no sharp or pill shapes"* — so the detector flagged it and **the component was conformed to the system rather than the system amended for the import**. `rounded-lg` panel, `rounded-md` tile matching the nav links' own radius. The nineteen existing `rounded-full` uses are circles for icon chips and caps on progress meters; neither is a container, and neither is what that rule is about.

**No accent.** White on ink. A navigation indicator is a control, not one of the four meanings — the same reasoning that returned the ByoTalks play button to neutral in §18. Gold here would have said "home / India" about the News tab. The original's four-colour particle variety has nowhere to land in a system where every hue already means something.

**`#000` and `#fff` are now documented in DESIGN.md as compositing primitives**, not palette entries. Neither is ever seen — black is what the blend erases, white is what survives it — and both must be true extremes for the arithmetic. `--color-ink` is navy and leaves a coloured halo; `--color-background` is redefined to near-black by the `.dark` block and would invert the effect outright.

### What did not change

`aria-current="page"` and `font-semibold` remain the accessible signal; the tile is decoration on top and nothing is lost without it. **When no section matches — `/contact`, `/what-we-know/`, the five legal documents — the tile hides rather than highlighting something arbitrary**, which the original has no representation for. The header is still a Server Component with the nav as a client island, still wraps rather than overflows at 200% text, and `NavLink` still backs the mobile drawer untouched.

### Verification

`tsc` and `eslint --max-warnings 0` clean. Build: **49 static pages**; `/news` 1.77 kB and the shared bundle 103 kB, both unchanged — the port is effectively free, against the ~70 KB gsap would have cost.

Seventeen checks pass **against the production build**: the active section is right on four routes including two section-parent cases; the indicator hides on three routes with no section; submenus open on hover *and* on keyboard focus; Enter navigates; 15 particles fire on click and 0 remain after; an inactive link measures **9.8:1** on ink at 14px with a 60×36 target; no hydration errors; reduced motion creates no particles; no horizontal overflow at 200% text; and the mobile drawer is untouched.

Detector **4 → 5**. The one addition is the `#000` compositing plate, now documented in DESIGN.md; the other four are the pre-existing `@media print` values and `button.tsx`'s `0.8rem`.

### A dev-server trap worth recording

Mid-integration a hydration mismatch appeared that was **not a code defect**: Turbopack was serving stale server-rendered HTML — `gooey-nav relative` with no `gooey-stage` — against a freshly compiled client bundle. Three forced recompiles did not clear it; restarting the dev server did. `curl | grep` on the served markup is the quick way to tell a real mismatch from a stale one, and it is worth doing before changing any code in response to a hydration error here.

### Still open

- **The particle burst fires on click only.** A section reached by keyboard, by browser back, or by a link in body copy moves the tile without a burst. That is defensible — the burst marks a deliberate act — but it is an asymmetry nobody has ruled on.
- **The dropdown panels are still hover/`focus-within`**, inherited unchanged from the previous header. They are keyboard-reachable but they are not a menu button with `aria-expanded`, and on touch there is no way to open a submenu without navigating to the section first. That predates this work and was not widened by it.

---

## 21. `/locations`, and naming Pakistan against the audit (31 Aug 2026)

Built on the client's request, as a top-level route in the primary nav — both the page and its placement were the client's call, made the same day. The nav goes from four items to five, filling the slot the retired Manufacturing page left (§8).

### What it deviates from, and who decided

Four decisions were put to the client before anything was written, because each one changed what the page could contain:

| Question | Decision |
|---|---|
| Whose locations | The whole Byonyks group, not Akshar Byonyks alone |
| The Bangalore address byonyks.com publishes | Publish it, as Akshar Byonyks' India office |
| The upcoming India site | Both Hyderabad and Ahmedabad |
| Route | Top-level `/locations` |

The consequence of the first answer was put to the client as its own question, because it reverses a standing instruction: **the group's only operating factory and R&D centre are in Pakistan.** The audit's instruction was "get rid of Pakistan office", and spec F-1 and §9.8 are built around it ("Lahore removed per the audit").

Three alternatives were offered — carry the facilities without naming the country, omit them entirely, or use byonyks.com's own "South Asia" grouping. **The client chose to name Punjab and Lahore.** That is recorded here rather than left as a silent contradiction between `src/lib/locations.ts` and spec §9.8, so a future reader finding both knows which is current and who decided.

F-1's substantive warning is unaffected and still holds: **no Pakistani facility is described as Indian anywhere.** Every row names its own country, and the two-company field on every row is what stops "Byonyks operates a factory" from reading as "Akshar Byonyks operates a factory".

### Open Questions 1.1 is partly answered, and partly not

1.1 records the India address as missing, "truncated in the audit". It is published on byonyks.com and it is still truncated there — `43, Residency Road, , Bangalore, Karnataka 560025`, with a doubled comma where a line was dropped. The page renders that gap as a gap: `address` holds `null` in the dropped line's place and the row carries a "Line missing" marker, so a reader copying the address into a courier form is not handed a partial one that looks complete.

**This does not resolve the registered office.** A registered office is a corporate-registry fact required on the privacy policy and the terms of use; the Bengaluru address is Byonyks' published account of where its India office is. `pending-address` in the ledger now says so explicitly, because the two were one line away from being confused.

**Also still open: `siteContact.phone` is a placeholder** (`+91 00000 00000`), and byonyks.com publishes a real India number that now appears on `/locations`. Whether that number is the one `/contact` should route to is a client question, not a build decision, so nothing was changed there.

### What the page does not do

- **No map.** §5 already reversed on this: depicting India's boundary is a legal matter in Indian jurisdiction, and its condition for ever shipping one — "someone must supply a boundary-correct official outline and have it reviewed" — has not been met. A locations page is the worst place to make the exception.
- ~~**No photography.**~~ **Reversed the next day, 1 Sep 2026, on request** ("each location should have an image preview", then "find images of the offices using the web or on byonyks.com"). Five of the six rows now carry Byonyks' own published picture of the site; the sixth is recorded below. Stock city photography was offered and declined, correctly: a Bengaluru skyline beside a street address is a picture of a city that reads as a picture of the premises, and on a page arguing which company holds which building that is the one image class guaranteed to mislead. The Itasca frame carries the numerals **550**, which corroborate the address printed beside it.
- **Photographs and plans are distinguished as data, not as prose.** The three operating sites have photographs; the two announced sites have architectural drawings, because they do not exist. `Location.image.kind` carries which, the visible caption is generated from that field, and a module-load contract refuses an announced site with a photograph or an operating site with a drawing — CLAUDE.md's "never caption a render as a photograph" enforced rather than remembered. It earns something unplanned: a reader can see which sites exist, because photographs and line drawings do not look alike.
- **Two SGS badges were cropped out.** The Byonyks factory and R&D photographs both ship on byonyks.com with an "ISO 13485 System Certification" badge composited into the top-right corner. That badge asserts a credential this project has never received a certificate number for — `compliance.ts` carries ISO 13485 as *stated*, not *record* — and burning it into an image would put an unverifiable certification on the page where the provenance system cannot reach it. Both crops exclude it from frame rather than painting over it. Recorded in `public/images/README.md`.
- **"Coming soon" on hover, over the two unbuilt sites only** (1 Sep 2026, on request). The drawing is the underlay; a wash and a white label ride over it on pointer hover. Three things about it are decisions rather than defaults. **The wash is `ink/65`, which is darker than "slightly" and set by the contrast floor, not by taste:** these are line drawings on white, so the worst case for white type is the paper — measured by sampling the composited pixels, /65 puts white at **5.45:1** against the lightest point, /60 at 4.6:1 and /55 at 3.9:1. **It is hover-only and never fires on touch,** because Tailwind v4 emits `hover:` inside `@media (hover: hover)` and a permanent 65% wash on a phone would hide the drawing the row exists to show; nothing is lost, since "not built" is already carried three times in text on that row. **It is `aria-hidden`** for the same reason — a screen reader would otherwise hear a fourth copy. Under `prefers-reduced-motion` the transition property resolves to `none`, so it snaps rather than fades.
- **Not `ScrimmedImage`, deliberately.** That component's own docblock asks a caller needing different behaviour to own the decision where a reviewer will see it; this is that. It is a full-bleed hero treatment — `sizes="100vw"` and a left reading-edge gradient — and both are wrong for a 216px thumbnail. What carries over is the rule it exists to enforce: text over an image gets a scrim measured against the image's lightest point, which is the measurement above.
- **The one row with no picture is ours.** No photograph of the Bengaluru office is published anywhere — not `/contact`, not `/about-us`, nothing on the open web. The slot is held open and marked, the same decision the address one line below makes about its own missing line. **It is the first thing to fix:** the only Akshar Byonyks premises on the page is the only one without an image.
- **No `Organization` structured data with an address.** `/about-us` refuses one for the stated reason that a placeholder in structured data is a placeholder a crawler will publish. `PostalAddress` has no way to express "a line is missing" — the visible page can hold a gap open and a schema field cannot — so the machine-readable address waits for the same missing line the visible one does.
- ~~**Rows, not cards,** per the Hairline Row List rule (§5).~~ **Reversed 1 Sep 2026, on request:** cards that open in place. §5 replaced four-up card grids sitewide because one bordered rectangle had become the only compositional device here, and the craft floor names "same-size cards of icon plus heading plus text as the page structure" as the lazy container. That rule is met on its own terms rather than ignored — the same entry carves out what stays a card, Home's audience doorways, on the grounds that they are "navigational rather than expository." These are the same kind of object: not a rectangle wrapped around static prose but a control with two states a reader operates. The thing §5 was written against, a page whose structure is a grid of inert boxes, is not what this is.
- **One register, India at the top** (1 Sep 2026, on request). The page shipped split into "Operating today" and "Announced, not open" — sorted by the distinction a reader cares about *second*, which buried the one they care about first: on an India-market site, the India office sat third in the first group and the two India sites in a separate group further down. There are three India sites and three others, so sorting India forward fills the entire top row of the three-column grid with India and the second row with the rest. **The emphasis is the layout, not a badge applied to it** — and it incidentally removes the orphaned fourth card the old split produced. A module-load contract asserts the merge loses no site and that no non-India site sorts into the India block, because the top row being India is the whole point of the ordering.
- **The status moved from the section heading onto the card face.** With one register, a card can no longer rely on which group it sits in, so every face now reads `COUNTRY · ENTITY · ROLE` — "INDIA · BYONYKS · ANNOUNCED" is what stops an unbuilt site reading like an open one. A status that lives on the card survives a re-sort; a status that lives in a section heading does not.
- **The India row is the visually weakest, and that is the facts rather than the design.** Two of the three India cards are line drawings because those buildings do not exist, and the third has no photograph at all — so the row the page is built to emphasise is the one with a placeholder and two wireframes, sitting above three rich photographs of foreign premises. Nothing here can fix that honestly. **One photograph of the Bengaluru office would.**
- **Native `<details>`/`<summary>`, following `clinical-layer.tsx`.** CLAUDE.md prefers the native element over a shadcn primitive over a hand-rolled control, and native wins outright here: it opens with no JavaScript, it is keyboard- and screen-reader-operable with no ARIA of our own, and it survives a failed client bundle — which matters on a page carrying the only India address the site publishes. **Every fact stays in the document whether or not a card is open**, verified with all six closed: the Bengaluru address, the Lahore phone number and the CDSCO note are all still in the DOM, so a reader without JS, a crawler and Ctrl+F all find them.
- **The closed face carries place, country and entity — never just a pretty picture.** Which company holds which building is this page's whole argument, so it cannot be a thing you have to open a card to learn. Gold marks the three India cards as a 1px left edge, which is `AccentRail`'s grammar applied to a card border since a card cannot carry the rail component itself; 1px exactly, because the craft floor bans a coloured left border above that weight as the most recognisable tell of generated UI. The country is written out on every card, so the edge is never the only carrier.

---

## 22. The client-instruction pass (1 Sep 2026)

Twelve instructions in one message. Nine are done, three are blocked on material only the client has. This section records the reasoning on the ones where following the instruction literally would have created a problem, and states plainly what is outstanding.

### `/products`, and the X-1 page leaving `/innovation`

> "Move X1 cycler page to a new main tab called products, add in x2 and x3 coming and add in image from byonyks site"

`/innovation/the-x1-cycler` became `/products/the-x1-cycler`, `/products` was built as the section hub, and **Products sits first in the primary nav, ahead of Innovation.** That ordering is the substantive part rather than a tidy-up: Innovation is an argument — how the therapy works, why India — and Products is the thing you can buy. A visitor who arrives knowing they want the cycler should not have to guess that a device lives under a word describing a point of view. The nav goes from five items to six.

**Every old link keeps working.** `/innovation/the-x1-cycler` was the device's URL for the whole build, is where the `/manufacturing` redirect landed, and was linked from Home, the Innovation hub, both Innovation children, About Us, ByoTalks and Locations. It now 308s permanently to the new path, so anything already sent to a partner resolves and the ranking passes. Twenty-one source files were updated to the new path; the breadcrumb on the device page reads "Products", because a trail that names a section the URL does not contain is worse than no trail.

**The Innovation hub's `hasPart` no longer lists the X-1.** `hasPart` describes containment, not relatedness — a hub claiming a page in another section as its own part is the structured-data version of a wrong breadcrumb. The visible doorway to it stays.

**The footer merged Products into the Innovation column rather than growing a fifth.** The grid is `sm:grid-cols-4` and spec 8.1 rule 4 caps it at four; a fifth column wraps to a second row and leaves one orphan under four. The footer is explicitly not a sitemap, so one column headed "Products and innovation" leads with the two devices, and the header keeps the sections apart where a visitor is actually navigating.

### The X-2 and X-3 are a section, not two pages

Byonyks publishes **one paragraph** about them and closes it "More details coming soon." No specification, no date, no price, no clinical data, no regulatory position in any jurisdiction. Two pages built on one paragraph would be several screens of padding, and everything added to fill them would be invented — so they are a section on the hub with an anchor from the nav, and a module-load contract in `src/lib/products.ts` **throws if an announced device is ever given a page.** If Byonyks publishes specifications, that rule is deleted in the same commit that adds the pages, deliberately, rather than discovered as a red build.

**Byonyks' paragraph is quoted, never restated.** It says the two devices "will truly revolutionize peritoneal dialysis and disrupt the market". Set as body copy under this masthead that is Akshar Byonyks forecasting a market disruption for devices nobody has seen; it ships as a blockquote with Byonyks named, the source linked and the retrieval date printed, which is the same contract the migrated news articles and the transcribed biographies answer to.

**The teaser image is Byonyks' own and shows nothing, which is why it is usable.** Two draped shapes labelled X2 and X3 — a picture of a thing being withheld rather than a picture of a device. It is also AI-generated, and Byonyks' own filename says so (`ChatGPT-Image-Jun-12-2025`). That is stated in `public/images/README.md` and the visible caption reads "Byonyks · teaser illustration. Neither device has been shown." **The alt text describes dust sheets, not devices** — writing "the X-2 and X-3 devices" into the accessibility layer would tell a screen-reader user they had been shown two machines. An AI render *of a device* would not have been used at all.

### India licensing shows as in progress, with a date

> "X1 cycler licensing in India should show as in progress along with the date"

The India panel on the device page previously carried a paragraph and an amber "Confirmation pending" note, which reads as *stalled* — a gap nobody is working on. It now carries a status plate mirroring the US panel's premarket-notification plate: **"In progress", under "Licensing under the Medical Device Rules 2017", over "Status as of 1 September 2026".** Same plate, same mono label, same weight, so the two jurisdictions read as two answers to one question rather than as one finished card beside one unfinished one. Plum, not amber: amber is the provenance scale's "not established", and work under way is not a gap.

**The date is labelled "Status as of", and that wording is load-bearing.** No filing or submission date has been supplied to this project, and a bare date printed beside the word "licensing" is read as the day something was lodged with CDSCO. If the client meant the application date, it replaces `indiaLicensing.asOf` in `src/lib/claims.ts` and the label on `x1-regulatory.tsx` changes with it — one edit, one place.

The "not yet confirmed" note stays underneath, because the authorised agent, the risk classification and the import licence route genuinely are not settled. Nothing here may become "approved" or "licensed" without the licence number and the route beside it.

### The roster: fifteen people to four

> "Senthil Kumar stays but add a blurb on India part, but get rid of all Byonyks leadership cards and only add new ones for Akshar Byonyks specifically"

Thirteen transcribed Byonyks records removed; Dr. Ronak C. Shah and Sahil added for Akshar Byonyks; Senthil Kumar kept and still labelled Byonyks, because that is where he works. **All three of the §10 launch-gate problems are closed or shrunk by the removal itself:** the four biographies naming Lahore or Pakistan against spec F-1 are gone, the portrait-rights gate is now one photograph rather than fourteen — Senthil Kumar's, the only one still taken from byonyks.com — and a consistent portrait set is something a single shoot can deliver.

**The thirteen portrait files were deleted, not left unreferenced.** They are photographs of named individuals taken from another company's website, for which the written permission spec F-6 requires has never existed. Leaving them served from this origin with nothing pointing at them would have kept the whole rights exposure and removed the only justification for it. Recoverable from git.

**A new module-load contract asserts the roster is majority ours.** For two days it was fourteen of the licensor's people to one of this company's, and a reader counting faces under this masthead completes that into "Akshar Byonyks' leadership" — which is exactly what spec §3.1's first non-negotiable exists to stop. The per-card `organisation` label is still the defence; this is the shape that stops the defence from having to work that hard.

**`Executive.role` became optional**, because two people arrived with a biography and no job title, and a leadership page is the last place to invent one for a named individual. The card and the profile print "Title to be confirmed" in the same pending grammar the portrait frame used one line above until the photographs arrived later that day; the page metadata drops the title from its description rather than shipping "Sahil, undefined at Akshar Byonyks"; and the JSON-LD omits `jobTitle` rather than asserting a guess to a crawler. "Nephrologist" was available from Dr. Shah's first sentence and is deliberately not used — it is what he is, not what he does for this company, and the role line on a leadership card is read as the second.

**One thing here can mislead a reader, and it is written down rather than left in the data.** Dr. Shah's supplied biography is *about Byonyks* — "This belief led to the creation of Byonyks", then four paragraphs of Byonyks' mission, closing on "Byonyks' goal". His card says Akshar Byonyks, on the client's instruction. Both are followed: the label is what the client asked for, and the text is carried exactly as given, because silently rewriting a real person's account of his own career to name a different company is not a thing this project does. A reader who opens that profile therefore meets an Akshar Byonyks label above a Byonyks biography. **Either his title clarifies it or the biography needs a line about his Akshar Byonyks role — the client's call, and their words either way.**

**`Executive.indiaNote` was added for "the India part", and Senthil Kumar's is pending.** It is a separate field rather than an edit to `bio` because `bio` is somebody else's text carried word for word and appending a sentence would break the promise the attribution line makes about it. It renders under an "On India" heading on a gold rail, below the biography and its attribution. No blurb was supplied, so his renders as the pending state — his transcribed biography runs 35 years through Viisage, PeakPoint and Oasis and mentions India nowhere, and on a roster of four for an India-market company "what does he do here" is a question worth publishing unanswered rather than answering with a sentence nobody wrote.

### `/locations`: three sites removed, and §21 partly reversed

> "Get rid of Bengaluru, Punjab, and Lahore locations"

Punjab and Lahore going **restores the standing audit direction that §21 above reversed for one day.** Spec F-1 and §9.8 are built around "Lahore removed per the audit"; §21 records the client overriding that on 31 Aug, and this records them reverting it on 1 Sep. Manufacturing attributes to Byonyks and never to a country again, which is where F-1 always wanted it.

**Bengaluru was replaced rather than deleted, and that is a judgement worth challenging if the client disagrees.** It was the only Akshar Byonyks row and the only one with a street address. Deleting it outright leaves an Akshar Byonyks locations page on which this company holds no premises at all and every remaining row belongs to the licensor — a page that answers "where is Byonyks" under this masthead and never answers "where are you". So the city and the address are gone, and an India office row remains that **names no city**, with its role reading "Address coming soon" — the client's own wording for it on `/contact` the same day. A module-load contract now throws if the last Akshar Byonyks row is ever removed, so that decision has to be made deliberately.

Six sites became four; the hero, the register lead, the rail note and the "what this page does not say" section were all rewritten to the new counts. The `/what-we-know` ledger entry `pending-india-address-line` was retired with the row whose gap it described, and `pending-address` widened to cover the India office as well as the registered office — one entry per missing fact, which is that file's own rule.

### Contact: a real phone, a required phone, and an address that is coming

> "Phone number should be Vishnu Uncle phone number: +1 (321) 527-9725" / "Indian address should be coming soon" / "Make phone number and city required in contact us form"

**The phone placeholder is gone**, which closes Open Questions 1.1's phone half and the §14.4 launch gate that barred shipping a placeholder contact detail. `pending-phone` was removed from the ledger rather than restated.

**It is a United States number on an India-facing site, and the page says so.** `siteContact.phoneRegion` prints "United States line — an international call from India" beneath it. An unmarked country code costs a patient money and costs this company the enquiry. The number is also now a `tel:` link on `/contact`, which it could not be while it was a placeholder, and `phoneTel` carries the E.164 form as its own field — the old `.replace(/\s/g, "")` derivation produced `tel:+1(321)527-9725` from the new display form, which some dialers refuse.

**Phone and city are required in `contactSchema`**, which both the client form and the Route Handler parse against, so the rule cannot be enforced in one and forgotten in the other. The format stays deliberately permissive — a six-character floor and a length cap, no pattern. This site serves India and the diaspora, and a strict pattern rejects more real numbers than it catches bad ones. Both fields are now unconditional in the enquiry email, where the old `input.phone ? ... : null` guard would only ever hide a validation bug from the person reading it.

**"Coming soon" is a row on the contact panel, not a note under it.** A reader scanning for an address should find the answer where they look for it, and the answer is that there is not one yet.

### The curtain's wordmark is a script now — and it is an approximation

> "Change font on loading animation to Byonyks logo font"

**Nobody supplied the font file or named the family**, and both marks carry custom swashes, so the face cannot be identified from artwork with certainty.

**It was chosen twice in one day, and the second time against the right logo — which is the lesson worth keeping.** The first pass had only the *Byonyks* mark from byonyks.com, a heavy near-monoline brush script, and Pacifico matched it well after six candidates were rendered against it and looked at. Hours later the client supplied the **Akshar Byonyks** lockup, and its wordmark turned out to be a completely different face: high-contrast, sharply slanted, pointed terminals, a swashed `A` and an open-bowled `B`. Pacifico is monoline, round and casual; beside the real artwork it was obviously wrong.

The fix was to crop the wordmark out of the supplied logo, render the candidates directly underneath it, and compare letter by letter. **Yellowtail** ships: its `A` swash, `k` loop, `y` descender, `B` bowl and thick/thin contrast all map onto the real mark, where Lobster Two is heavier and more compressed, Playball lighter and more upright, and Pacifico shares none of its structure. The real mark is bolder than Yellowtail has a weight for — on an outline that draws itself and then floods, letterform structure carries the resemblance and stroke weight does not, which was verified by screenshotting the curtain rather than assumed.

**The generalisable rule, now in CLAUDE.md: compare a typeface against the artwork, not against a description of it.** The first choice was made carefully and was still wrong, because it was careful about the wrong logo.

This is a **deliberate, recorded exception to spec Section 6's one-family rule**, scoped to a single element. Nothing else on the site may use it.

**The metrics are measured, not estimated — and they were re-measured when the face changed**, which is the reason they are props on `StrokeText` rather than constants inside it. The component computes its viewBox from three per-em numbers that describe exactly one face: Noto Sans 700 runs 0.569em advance, 1.066em ascent, 0.295em descent; Pacifico 0.507 / 1.305 / 0.453; Yellowtail 0.403 / 0.969 / 0.305. Carry the wrong set and the wordmark is either clipped at the descenders or sitting in a box a third too wide and scaled down to fit it. Each is read with `getBBox()` and `getComputedTextLength()` on the real string at 128px in Chromium with the webfont loaded, then rounded outwards in `SPLASH_FONT_METRICS`. **Letter-spacing is zero and must stay zero** — the component's −2px default pulls a connected script's joins apart. The three numbers travel with the family from one constant, so changing the face without the box is not possible by accident, and the note there says how to re-measure when the real file arrives.

`display: "swap"`, not `"block"`: a block period would hold the wordmark invisible for up to three seconds, which on a slow connection is an empty ink curtain for the whole of `SPLASH_MAX_MS`. Both ceilings are untouched.

### The script had to be knocked out before it could be drawn

Reported by the client on the reload screen: "before the letters get white fill, you can see a lot of lines in the fill of letters from the font". Correct, and it was a consequence of the face change above rather than anything new.

**`StrokeText`'s draw layer is `fill: none`, so every glyph's outline is painted in full — including the parts of it that fall inside the letters either side.** On Noto Sans that costs nothing, because adjacent letters do not touch. Yellowtail is a joined script whose letters deliberately overlap, so the same code drew the wordmark as a thicket: entry and exit strokes crossing straight through the bodies of their neighbours, worst at the `sh` and `ks` joins and under the descenders of "Byonyks". Screenshotted mid-draw before and after.

**Only the drawing was ever wrong.** The white flood covers every interior line, so the finished wordmark had always been clean — the defect lived entirely in the ~1.9s before the flood lands, which is also exactly the part of the animation the curtain exists to show.

The fix is a luminance mask of *everything, minus the glyphs*, applied to the stroke layer, which clips it to the outside of the letterform union — the silhouette a reader expects an outlined script to have. Three things made this the right shape rather than a heavier hand:

- **It is background-agnostic.** The obvious alternative — filling each glyph with the curtain's ink so later letters cover earlier outlines — does not work in one `<text>` element, because SVG paints the whole element's fill and then the whole element's stroke, so every crossing survives. Splitting the string into one `<text>` per character would fix the paint order and would need a per-character advance measurement, which §3 of the component removed on purpose after it made the wordmark jump 21px mid-draw.
- **Nothing in the mask is animated,** so the `<defs>` trap recorded on the flood — elements inside `<defs>` are never rendered, so the browser never runs their CSS animations — does not apply here.
- **`black` and `white` inside a mask are the alpha channel, not paint.** The no-hardcoded-hex rule has nothing to bite on; the component still names no colour.

**`strokeWidth` went 3.5 → 7, and that is not a weight change.** A centred stroke shows only its outer half once the interior is masked, so 3.5 drew at half the weight that had been measured and chosen. 7 puts the visible band back where it was. The two numbers now move together, and the prop's doc says so, because the next person to tune this will otherwise halve the line without meaning to.

The one real consequence: **the settled wordmark's gold keyline is twice as heavy as it was**, since that ring is also the outer half of the stroke. It reads as a two-colour logo lockup rather than a hairline, which is arguably better on the mark this is standing in for — but it is a visible change to a frame the client has already approved, and it can go back to a hairline by halving both numbers together.

Verified: zero hydration errors and zero console errors on Home with the mask's `useId` crossing the server/client boundary; the `mask` reference resolves in the DOM; reduced motion still arrives fully drawn and flooded; no clipping at 1440, 390 or 320.

### And then the wordmark stopped being type at all

The client sent the Byonyks mark itself and asked whether the curtain's "Byonyks" could look like it.

**It could not, with any font, and that is a fact about the artwork rather than a limit of the search.** The B is drawn: a flame flourish rising above it, and a tail that sweeps left and runs underneath the whole word. No typeface contains that glyph. Every version of this wordmark up to here — Noto Sans, then Pacifico, then Yellowtail — had been answering "which face is closest", and the honest answer to "can it look like this" was: only by using this.

So the curtain now draws **outlines**. Byonyks' own published logo, traced from the transparent PNG they serve, beside "Akshar" in Pacifico converted to paths, both in one coordinate system in `src/lib/splash-wordmark.ts`. The trace settings, the licence position and the regeneration recipe are in `public/images/README.md`.

**Three things fell out of it that are worth more than the request.**

**The curtain loads no webfont.** `Yellowtail` was declared in `layout.tsx` on all twenty-one routes to serve one decoration on one of them; it left in the same change, and with it the spec Section 6 exception it had been granted a few hours earlier. Nothing on this site is outside Noto Sans again.

**There is nothing left to keep in sync.** `SPLASH_FONT_METRICS` paired a family with three per-em numbers because `StrokeText` computes a viewBox from them, and swapping one without the other clips the glyphs. That hazard is gone: outlines carry their own box.

**The first paint is the final paint.** With `display: swap` the curtain could render cursive-default letterforms and then jump when the real face arrived. The geometry is now identical on the server, in the first paint and on every frame after — which is the same property §3 of `stroke-text.tsx` gave up runtime measurement to get.

**The trace is already the union outline.** potrace follows the boundary of the ink, so where the B's tail runs beneath "yonyks" the contour goes round the merged silhouette rather than through it — exactly the shape the knockout mask added hours earlier has to synthesise for live text. Byonyks' half needs no mask. Pacifico's letters overlap, so "Akshar" does, and both halves are masked so the lockup reads as one mark.

**Two measurements, not two judgements.** Pacifico's x-height was read off a rendered `a` and the face sized so its x-height equals the artwork's own measured 342 units, both on the artwork's measured baseline of y=650. And `strokeWidth` went 7 → 44, which is again not a weight change: the viewBox is 5148 units wide where the old one was 814, so a unit is worth a fifth of what it was. Measured in the browser, the drawn line is 4.38 CSS px against the 4.4 the text version had.

**`SPLASH_MIN_MS` now takes the max of two endings,** which the note there had already predicted would be needed "if the stagger or the wordmark ever grows enough to invert" the order. It did: nineteen contours against fourteen characters puts the last stroke at 1.92s, past the flood's 1.9s. It is derived from the contour count rather than a constant, so regenerating the wordmark cannot silently re-invert it.

**Two things for the client to decide, neither of which is ours.** This puts **Byonyks' registered wordmark on an Akshar Byonyks surface** — asked for directly, and a brand call rather than a technical one. And it makes the curtain disagree with the company's own lockup, which sets *both* words in a single high-contrast script; the supplied `Akshar Byonyks Logo.png` is the alternative source if they would rather the opening matched their own logo than Byonyks'. Tracing that instead is the same recipe pointed at a different file — but it needs the original at full resolution, not the 1200×630 share card, which is all this repo holds.

### The logo and the two headshots arrived the same day

The client supplied `Akshar Byonyks Logo.png`, `Ronak Headshot.png` and `Sahil Heeadshot.jpg` hours after the pass above shipped. All three filled gaps that had deliberately been left visible rather than hidden — two `portraitPending` frames and a `LOGO: null` slot that had been reserving its exact space since 31 Aug so that nothing would reflow on the day it was filled. Nothing did.

**The portraits took the same normalisation as the rest of the set** — 900×1125, `cover` anchored north, q88 — and nothing else. No retouching, no backdrop replacement. Spec §9.5's "same backdrop, crop and lighting" is now down to backdrop alone: brown studio, white, white, city skyline. Only a single shoot fixes that honestly; editing a real person's photograph to change what is behind them was tried once here and the client reversed it the same day (§13).

**The logo is cut into two assets by use, because the lockup cannot be scaled down.** It stacks a globe, a monogram, a script wordmark, an entity line and a two-line tagline into a near-square; at the 34px the nav reserves, the whole thing would be 44px wide with the tagline under 2px. So the **emblem** — globe, ring, monogram — goes in the nav, and the **full lockup** becomes the site's default Open Graph card, where 1200×630 gives the tagline room to be read. The favicon is the emblem with a deliberate margin, via Next's `icon.png` file convention.

The nav's reserved slot height went from 28px to 34px in the process, and that was measured rather than guessed: at 28 the continents, the ring and the monogram collapsed into a blue smudge. 34 is near the ceiling — the capsule is 48px while clipped.

**The default share card is the quiet win, and it took three attempts to actually ship.** Eighteen routes had no `openGraph.images` and shared to WhatsApp and LinkedIn as a bare title over a blank rectangle; on this audience WhatsApp is the share channel that matters and it is exactly the one that renders a card.

What did not work, both verified by curling the built pages rather than assumed:

1. **`openGraph.images` on the root layout.** Next merges metadata shallowly per top-level key — a page exporting any `openGraph` object replaces the parent's wholesale — so the twenty routes that set `{ title, description, url, type }` and no `images` inherited nothing. Exactly one route emitted an `og:image`: Home, the only one with no `openGraph` of its own.
2. **The `src/app/opengraph-image.jpg` file convention.** Next folds a file-based image into any layer that has not set `openGraph.images` itself (`mergeStaticMetadata` in the Next source). That resolves correctly at the root layer and is then overwritten by the same shallow replace when the page's `openGraph` lands on top. Identical result: Home only.

What works is `defaultOg` in `src/lib/seo.ts`, imported by each page and passed as its own `images`. One constant, one alt string, twenty call sites — instead of twenty pasted literals that drift. The file convention is kept as well: it costs nothing, it is what serves Home, and it is the right answer if a future route forgets the import. `twitter:image` is derived automatically.

**The logo is not in the footer, and that is a deliberate stop.** The footer is `bg-ink`; the supplied file is opaque white with no alpha. Knocking the white out is not the easy fix it sounds like — the artwork's own highlights are white (the keyline around the monogram, the silver continents), so a threshold knockout punches holes through the mark, and the globe's drop shadow survives as a grey smudge on dark. **One request for a transparent or reversed-out version closes it**, and until then the footer waits rather than carrying a damaged mark.

### Two things are still blocked on the client

| Instruction | What is needed |
|---|---|
| "Add in featured highlights and from the experts from email in news" | The email. Both scaffolds are built and render as designed empty states; nothing can go in them that was not supplied, and inventing news items or expert commentary is the one thing a page like this must never do. The instruction document itself was checked for it and contains only the instruction list. |
| "Sitewide, add in more stock images of Indians getting hemodialysis" | Photography, or a Pexels/Unsplash API key. |

And two smaller ones, both one line each: **job titles for Dr. Shah and Sahil**, whose cards now carry a photograph and a name and read "Title to be confirmed" underneath — which makes the gap more visible than it was, not less — and **Senthil Kumar's India note**.

**The imagery one is worth reading in full in `public/images/README.md`.** Pexels and Unsplash — the two sources CLAUDE.md names first — both returned `403`/`Authorization required` to unauthenticated requests from this environment. Openverse was searched across eight queries filtered to commercial-use and CC0/public-domain; the only genuinely India-specific dialysis set it returned was an album from the Ramakrishna Mission's centre at Kankhal, and every frame was downloaded and looked at. **Rejected on sight:** one is an inauguration ceremony with a monk, religious imagery and a dozen identifiable attendees; another is a scan of a Hindi newspaper clipping, which is the newspaper's copyright regardless of who uploaded it. Publishing either would imply that a named religious institution and a dozen identifiable people are affiliated with this company — the same objection that disqualified Pexels 36035002 in the 28 Aug pass. The rest of that pool is Wellcome Collection historical archive material, US political photocalls, and `by-sa` images of identifiable patients in hospital beds, which run straight into the Drugs and Magic Remedies Act caution this repo applies strictly enough to have patched a bystander's reflection out of a monitor.

**Nothing shipped rather than something generic.** CLAUDE.md: "a photograph that could be anywhere is worth less here than no photograph."

### One unrelated bug fixed in passing

`/locations` called `<CtaBand leadIn="Locations" />`. `leadIn` is a className forwarded to `SilhouetteEdge`, so that string emitted a class matching nothing. Harmless in effect, wrong in fact, and removed — the band follows a section on the plain `background`, which is what the edge already draws against.

## 23. The A takes the B's flourish (2 Sep 2026)

> "The A in Akshar should have similar word art to the B in Byonyks. Additionally, the letters for Akshar feel a little too chunky and need to be a bit smaller."

Both halves done, and the first one crosses a line this project has not crossed before, so it is recorded rather than mentioned.

### It is the same artwork, not a lookalike

The flourish on the A is the flame contour and the wedge that closes its underside, lifted straight out of the traced Byonyks logo. Nothing was drawn to resemble it. They were identified by rendering all ten contours of the trace in separate colours and looking, because path data says nothing about which contour is which — that colour map is the reason the extraction took one pass instead of several.

### What it means, stated plainly

**This assembles a mark that exists in neither company's logo.** Akshar Byonyks' own lockup sets both words in one high-contrast script with no flourish on either; Byonyks' mark has the flourish only on its B. A lockup with the flourish on both is new, and this project made it.

That is a departure worth naming because §22 spent most of its length refusing to invent things — job titles, an India blurb, news items, a photograph of an office. **The distinction is that those would have asserted facts about the world, and this asserts nothing.** It is a decoration on a company's own name, asked for directly and in writing by the client, on artwork the client's licensor owns. It is still a brand decision rather than a technical one, and it is the client's to keep or reverse.

### The placement is measured; one number is not

Against the B, the flourish is **70.2% of the letter's width** and inset **20.7% from its left**. The A gets the same two ratios, so the pairing is the artwork's own proportion rather than a guess.

The number that is a judgement is how deep the flourish dips onto the shoulder. The artwork dips 17 units into the B; at 1× on the A it read as floating above the letter rather than belonging to it, because Pacifico's A has a rounded shoulder where the B has a flat one. 1×, 3× and 6× were rendered and compared, 6× taken, and the two flourishes then cropped at equal zoom and set side by side to confirm they read as one piece of lettering.

### "Chunky" was two things, and both were adjusted

"Akshar" went from parity with the artwork's x-height to **0.85** of it. Smaller type also carries a proportionally lighter stroke, which is most of what "chunky" was describing.

`strokeWidth` went 44 → 41, which is again not a weight change: shrinking "Akshar" narrowed the viewBox from 5148 to 4797 units, so a unit is worth more than it was. Measured in the browser at **4.38 CSS px** — the same figure the two previous versions of this wordmark were tuned to, so the drawn line has held its weight across three rebuilds of what is being drawn.

### One structural change fell out of it

The module used to export two named halves with a shared transform each. The flourish broke that: it belongs to "Akshar" positionally but needs the artwork's coordinates. So the export is now **one flat list in draw order, each contour carrying its own optional `transform`** — which is also simpler, and is what keeps the draw reading as writing across all three sources.

It is typed explicitly rather than `as const`, because under `as const` the array becomes a tuple of literal types and the contours with no `transform` key make that property unreadable off the union. Caught by `tsc`, not at runtime.

`SPLASH_MIN_MS` followed the contour count from 19 to 21 without anyone touching it — 2.00s now, still well under the 3s ceiling — which is the whole reason it was made a derivation rather than a constant.

### The counters had been filled in for a day

> "The lower case a in Akshar and lowercase o in Byonyks should have some lines in the middle to fill in the letter before the white fill. A smaller outline of the letter itself if that makes sense."

It makes sense, and it was not a request for a new effect. **The counters were missing** — the 'o' in "Byonyks" was rendering as a solid oval rather than a ring, and so were the 'a', the A's bowl and the k's loop. The client described the symptom precisely from the outside.

**A counter is not a shape; it is the absence of one.** It exists because the non-zero winding rule cancels an inner contour against the outer contour it sits inside. That cancellation can only happen if the fill sees both contours in the same `<path>`. When the wordmark became outlines on 1 Sep, every contour was given its own `<path>` so it could carry its own `--i` and animate on its own delay — and with nothing to cancel against, each counter painted as another solid blob.

The fix keeps the draw layer exactly as it was, because that layer genuinely needs one element per contour, and regroups only the two FILL layers — the mask and the flood — by transform. Three paths, one per coordinate system, each holding every contour that belongs to it. Fill is order-independent within a path, so the grouping does not disturb the left-to-right draw order.

**That fix was half right, and the client caught the half that was not.** It opened the 'a', the A's bowl and the k's loop, and left the 'o' in "Byonyks" a solid oval — reported as "the a is fixed, the o still is not", which is exactly what it was.

**The two sources disagree about the fill rule, and both are right.** The first pass assumed non-zero for everything. opentype emits TrueType contours, which are wound for non-zero, so "Akshar" was fine. **potrace writes `fill-rule="evenodd"` on its output and relies on it** — it traces the boundary of the ink, so its contours never overlap each other and nesting alone decides what is a hole, which means direction is not something it has to get right. Under non-zero its 'o' counter did not cancel.

The mistake was assuming this could be checked once and applied to both. It was checked once — the trace WAS rendered as a single path and the counter WAS there — but that render kept potrace's own `fill-rule="evenodd"` attribute, so what it proved was that potrace is self-consistent, not that non-zero would work.

So the fill rule now travels per contour, from its source, and the fill layers group by rule as well as by transform. **Applying evenodd to everything would fail the other way**: Pacifico's letters overlap — it is why the knockout mask exists at all — and evenodd punches a hole at every join between them.

**The draw phase gets the effect the client actually described for free.** With the counter no longer painted into the mask, the stroke around it is no longer knocked out, so each counter now draws its own smaller outline inside the letter — the "smaller outline of the letter itself" — and then opens to the ink ground when the flood lands.

Verified by cropping the 'o' and the 'a' at 4x in both phases, before and after.

---

## 24. The mobile pass: the capsule was sitting on the prose (10 Sep 2026)

> "adapt for mobile devices. Have noticed issued already in navbra not being fully visible for mobile devices, but want a site wide audit"

The report was about the navbar. The measurement found something worse than a control that could not be seen: **the navbar was sitting on top of the writing.**

### What was actually happening

`AnimatedNav` is `sticky top-0` inside a header that draws nothing — the capsule carries its own surface and the strip around it is transparent. On a desktop viewport there is margin either side of the text column for a floating pill to occupy. On a phone there is none, so every paragraph on the site scrolled underneath a translucent white capsule parked across the middle of the measure.

Measured, at 390px with `prefers-reduced-motion` (where the bar never collapses), on `/about-us`: the expanded pill covered three consecutive words of a sentence set on the ink section — "and the case for" — leaving the line reading "market, an … home dialysis is stronger". A sweep of fourteen routes at 390px and 768px found the **collapsed** dot alone overlapping running text on **eleven of them, by up to 47px** — whole words behind an opaque circle, on `/products`, `/about-us`, `/locations`, `/what-we-know`, `/hi`, `/privacy-policy` and more.

The second half of "not fully visible" was the bar's contents. Below `lg` the seven links are in the drawer, so the whole of the site's chrome was **an emblem, a language switch and a hamburger** — nowhere did it say whose site this is. The emblem is a 34px globe with a monogram over it; that is a mark, not identification.

### What changed

**Below `lg` the header is a bar, and the capsule is a desktop object.** Full-bleed, opaque, edge to edge, with the controls on the edges where thumbs are, and the company name set beside the emblem. Nothing can pass under it because it is not transparent, and the document already reserved its height — this component has been in flow rather than `fixed` since it was written, which is what made this a class change rather than an edit to twenty route templates. The appearance half is expressed entirely in `lg:` classes, so it is correct in the first paint with nothing to hydrate.

**The collapse does not run below `lg` at all.** Shrinking seven links and a CTA to a dot is a real saving on a desktop bar. Below `lg` those links are already behind the drawer and the bar holds three controls, so the collapse bought no space, cost a tap to undo, and produced exactly the floating dot that was landing on the text. PRODUCT.md's Priority-2 reader is on a phone, on a slow connection, often under stress; a header that hides itself and has to be summoned back is the wrong trade for them. The media query is read at event time rather than kept in state — a query resolved during render is a hydration mismatch — with a `change` listener for the resize case only.

**At `lg` and up nothing moved.** The capsule, the collapse, the hysteresis, the panel clipping and every note in §20 stand exactly as they were.

### `viewport-fit=cover` was tried and taken back out

It is the one line that makes `env(safe-area-inset-*)` resolve to anything but 0, and it was added so the bar could tint the strip under the status area. It came out again, and the reason is this site's full-bleed sections.

`cover` hands the page the whole screen — notch, rounded corners and all — and a landscape iPhone then puts a ~44px inset on the leading edge that every line of text has to be padded away from. There is no shared shell component to pad: `max-w-[1280px]` is written inline in **71 places**. Padding `body` instead was tried and is worse — it insets the closing ink mass, the silhouette edge and every tonal band away from the screen edge, which is the one thing those sections exist to reach.

Against that cost, `cover` buys a tinted status-bar strip and nothing else: the drawer is `h-dvh`, so **without** `cover` iOS insets the layout viewport itself and the home indicator can never overlap it. The browser's own safe viewport is the better deal here. A `viewport` export now stands in `layout.tsx` carrying Next's default values, so that this is a recorded decision rather than a default nobody looked at — and so that the absence of `maximumScale` is on the record too.

### The wordmark's size, and why the bar still wraps

Two passes were needed on one row of three controls.

The wordmark first shipped at `text-[0.9375rem]` — 15px, chosen to fit 320px and **off the type ramp**, which the design hook caught. It is `text-base` now, a documented step. At 16px the name measures 122px and does not truncate at any width from 320px up.

Going to 16px made the row wrap at 320px, and the fix for that was briefly `flex-nowrap` below `lg` so the wordmark's `truncate` could fire — **`flex-wrap` wraps before it shrinks**, so with wrapping on an ellipsis is unreachable. That bought a tidy 320px bar and broke the thing wrapping exists for: measured at 320px with 200% text, the row could not fit, could not wrap, and pushed the document to 360px. A WCAG 1.4.10 reflow failure, and precisely the defect this component's `min-h`/`flex-wrap` pair was written to prevent in the first place.

So wrapping stands, and **the row was made narrower instead of made to hold by force**: horizontal padding on the bar (`px-2`→`px-1`), the home link (`px-2`→`px-1.5`) and the language switch (`px-2.5`→`px-1.5`), below `lg` only. Measured after: 320, 360, 390, 430 and 768 are each a single 56px row with a 44×44 trigger, no truncation and no overflow. At 200% the bar wraps and grows downward, which is correct.

**The lesson, recorded because it cost two passes:** `truncate` and `flex-wrap` on the same flex line are mutually exclusive, and wrap wins. Pick one deliberately — do not set both and assume the ellipsis is a safety net, because it is not.

### The drawer had three gaps

It is the only navigation on a phone, and it was missing pieces the bar behind it was carrying.

- **No way Home.** The wordmark at the top was a `<span>`. The bar's emblem goes Home, but the bar is behind this dialog while it is open — so the one screen listing every destination on the site omitted the destination every reader knows the name of. It is a `<Link>` now.
- **No language switch.** Same cause: it lives in the bar, and the dialog covers the bar. For as long as a reader had the menu open, the control that answers "I would rather read this in Hindi" did not exist. PRODUCT.md puts that reader on a phone, which is the only place this drawer appears.
- **Targets under 44px.** The child links (`py-2` on a 14px line) made 37px, and the trigger and close buttons were the 36px `size-icon` default.

### Five standalone links were under the touch floor

A link set in running text is exempt from the 44px floor — WCAG 2.5.8 says so, and enlarging one would tear a hole in the paragraph. A link standing on its own is not exempt. Five were at 19–22px: the email and phone in `/contact`'s "Reach us directly" list, the phone on each locations card, the contact address on the Hindi home page, and the "read this in English" switch at the top of every Hindi page. One of them is tap-to-call, on a page whose own comment says "this audience reads it on a phone".

They share a `tap-target` utility rather than five copies of the incantation. **The negative margin is the point**: padding a 19px link up to 44 would move everything under it by 25px and re-space four correct layouts, so `margin-block: -0.75rem` gives the 24px back to the flow. Verified against a screenshot of the contact aside before and after — the hit area grew, the page did not move.

### What the audit did not find

Worth recording, because it is the part that was already right. Across 24 routes at 320px, 390px and 768px there was **no horizontal overflow anywhere** — `document.scrollWidth` never exceeded the viewport — **no content clipped** by an `overflow-x: hidden` ancestor (every hit was `sr-only`, which is what `sr-only` is), no text under 12px, and the one `<table>` on the site (`/products/the-x1-cycler`) already fits 390px inside an `overflow-x: auto` parent without needing to scroll. The responsive skeleton was sound; what was broken was the thing floating on top of it.

### A build error was blocking `npm run dev` entirely

Not a mobile issue, but nothing could be audited until it was fixed. `src/app/favicon.ico` declares three 32bpp entries whose embedded PNGs are **colour type 2 (RGB, no alpha)**. Turbopack's ICO decoder requires RGBA when an entry claims 32bpp and refuses the file: *"The PNG is not in RGBA format"* — served as a full-screen build error on **every route** in dev. Webpack's production path does not check, which is why `next build` passed throughout and this had gone unnoticed.

The three embedded PNGs were re-encoded to colour type 6 in place, preserving the existing artwork rather than re-deriving the icon from `icon.png`. 9,739 → 10,880 bytes.

---

## 25. Byonyks: verbal is enough, and the roster is closed (10 Sep 2026)

> "For Byonyks, verbal confirmation is all we need. Additionally, none of the Byonyks staff will be going into the website"

Two client instructions in one line, and between them they retire the last launch gate this project held over Byonyks.

### The gate was this project's own, and the client is entitled to retire it

`pending-trademark` recorded that Byonyks USA's approval for its name, its marks and its employees' photographs and biographies was verbal, and asserted that **written** permission was required before launch. Nothing external imposed that: no regulator asks for it, and it is not one of the Drugs and Magic Remedies or DPDP obligations the other legal gaps answer to. It was a standard this project set for its client, about its client's own relationship with its own licensor.

So it is **closed, not downgraded**. A ledger entry that says a thing is missing when the only party who can want it has said they do not is not recording a gap — it is the site contradicting its own client in public, on `/what-we-know`.

Removed from `src/lib/claims-ledger.ts`, and the `PendingNote` it fed on `/terms-of-use` came off with it. Those two had to move together: the ledger's build-time contract fails if a page carries a pending note with no matching entry, which is exactly the drift it exists to catch, and it verified this edit.

**The photograph half closed with it.** `leadership.ts` had recorded one surviving portrait-rights question — Senthil Kumar's, the last of fourteen after the 1 Sep removal of thirteen transcribed Byonyks records — and it was gated on precisely this permission. It is covered.

### The roster is closed, and Senthil Kumar stays

The second instruction is forward-looking, and was confirmed as such rather than assumed: **no Byonyks staff go into this site**, and Senthil Kumar stays as the standing 1 Sep exception ("Senthil Kumar stays but add a blurb on India part"). Reading it as a removal would have reversed a specific, recorded client instruction about a named real person, which is not something to infer from a sentence that could equally be read as forward-looking — so it was put back to the client, and the answer was keep.

He is therefore the last Byonyks person on the site rather than the first of a category. Every new leadership record is `organisation: "Akshar Byonyks"`. The `"Byonyks"` member of that union survives for his record alone and is not an invitation to a second. The rule is in CLAUDE.md, because it governs future work rather than describing a gap in this one.

### The ByoTalks clinicians are not staff

Also confirmed rather than assumed, because the alternative reading would have deleted eight sessions, the speaker register and the `/byotalks` routes. They are external nephrologists, not employees; they carry no portraits here, only names and credentials; and two of those credentials read "Byonyks Scientific Advisory Board". Spec finding F-5 had already settled that removing the Advisory Board takes real value off the site. Unchanged, credential lines included.

### What this leaves

`pending-trademark` was one of the seven hard launch blockers on the outstanding list. Six remain, and all six are external obligations rather than this project's own standards: the India registered office address, the CDSCO licence route and authorised agent, the named Grievance Officer, the data retention period, legal sign-off on the patient-in-therapy imagery, and a jurisdiction clause from Indian counsel.

---

## 26. The retention period: two years (10 Sep 2026)

> "Put it in as two years"

`/privacy-policy` said "we keep the email for as long as we need it to deal with your enquiry … then delete it", with a note admitting a real period was owed. It now says two years, and `pending-retention` is out of the claims ledger.

### Ten years was the opening proposal, and was argued down

The number first put forward was ten years. The objection, in short: DPDP 2023's storage-limitation principle asks whether retention is still necessary for the purpose, and the purpose of a contact-form enquiry is served once it has been answered. Ten years is not that. The form takes a name, an organisation, an email, a phone number, a city and a free-text message — and on a dialysis site that message routinely contains the sender's own kidney condition or a family member's. A decade of those in one inbox enlarges the breach surface and the erasure-request burden every month, and buys nothing in year nine.

The likelier origin of "ten years" is a real obligation applied to the wrong thing: device-record or company-record retention stretched across all enquiry mail. That is over-retention by the back door, and naming it is what moved the number.

### The paragraph was rewritten, not patched

A period cannot be dropped into prose written to describe an open-ended hold. "As long as we need it … then delete it" implies a short, purposeful keep; "two years" printed under it would have made the sentence misleading rather than merely vague. So the section states the period as its own sentence, dates it from the day the enquiry is sent, and adds the thing the old wording never offered — that a sender can ask for deletion sooner, without giving a reason.

### It is a company decision, and the ledger no longer says otherwise

The removed entry claimed the period was "being set with counsel". It was not; it was set by the client. Nothing on the page asserts a lawyer chose it, and nothing should be added later that does unless one has.

**One question was raised and deliberately left unanswered rather than guessed:** whether correspondence touching device safety — a malfunction, a complaint, an adverse event — carries a longer obligation on an importer and licensee under the Medical Device Rules 2017. No second period was invented for it. A retention rule this site has not been given is not one it should print; if counsel sets one it belongs in the same section, not in a new gap.

### The half that is not code

Enquiries exist only as email in the Google Workspace inbox behind the contact address — nothing writes them to a database, which is what makes this easy to comply with and also what makes it manual. Two years is now an operational commitment: somebody has to delete on that schedule. A published period nobody acts on is a worse position than the open-ended wording it replaced, because it is a specific promise visibly broken.

Launch blockers: six down to five.

---

## 27. The therapy-imagery gate is retired, and only half of that file's problem with it (10 Sep 2026)

> "patient in therapy imagery has been signed off on"

`x1-in-home.jpg` — Byonyks USA's own photograph of the X-1 on a side table with a man on the sofa beside it — has carried two flags since 28 Aug 2026, both filed under spec §14.4's launch gate. **They were never the same kind of problem, and this closes one of them.**

### What closed

**The Drugs and Magic Remedies (Objectionable Advertisements) Act 1954 flag.** The image depicts a person with a medical device in a therapy context. This repo has applied that constraint strictly enough to patch a bystander's reflection out of a monitor on a different image, so the flag was raised rather than reasoned around, and CLAUDE.md's standing rule states the principle plainly: an image like this is a legal question, not a design one. Using it at all was an explicit client decision on 28 Aug after the risk was put to them; the sign-off is what that decision was always conditional on. The client confirmed on 10 Sep that it has been given, and the gate is retired on that confirmation.

**The record does not name who gave it.** That is stated in `public/images/README.md` rather than papered over, because a legal sign-off with no signatory and no date is a weaker record than it looks, and reconstructing either later is exactly the thing this file exists to prevent. If it is ever needed, it needs adding from someone's memory of the actual event.

### What did not close, and is a different kind of thing entirely

**The subject is not Indian.** A white Western man on an India-market site, against a PRODUCT.md that is emphatic that material which does not transfer gets replaced rather than kept for volume.

This flag sat next to the legal one in the same list and under the same heading, which made it easy to read the two as one item and assume an approval retires both. It does not. **No approval can close it** — it is editorial, and the only thing that closes it is commissioning a photograph shot in India. That is already named at the foot of the README as the single change that would do the most good here, because the same shoot would also fix the standing India-specificity flag on `clinicians-in-discussion.jpg`.

The README now labels the two flags CLOSED and STILL OPEN explicitly rather than leaving them as a numbered pair, and says of the open one that nothing about the sign-off touches it.

### The rule survives the instance

CLAUDE.md's imagery rule is unchanged in force: the next clinical-context image starts flagged like every other one. What was added is that the one instance the site currently carries is cleared, so a future reader does not re-raise a gate that has been answered — and, alongside it, the warning that the second flag on the same file is not covered by the same answer.

Nothing user-facing changed. This gate was never a claims-ledger entry or a `PendingNote`; it lived only in the internal image record, which is why no page copy and no `SOURCES.md` regeneration follow from it.

Launch blockers: five down to four.

---

## 28. Rohit Pankhaniya's portrait is a photograph (10 Sep 2026)

> "Rohit Pankhaniya's is a real image"

The launch gate raised on 8 Sep is closed. The file is what it appeared to be.

**What was flagged, and why it was a reasonable check.** `Rohit Headshot.png` arrived as a 72dpi near-square PNG carrying no EXIF at all — no camera, no date, no exposure — and the skin, beard edges and background falloff had a smoothness characteristic of generated imagery. On the leadership page of a medical-device company, for a named board-certified physician, against a CLAUDE.md rule that says never caption a render as a photograph, that combination was worth stopping on.

**Why it was flagged rather than decided.** Not one of those signals is proof. Every one of them is also what happens to a real photograph exported through an editor, saved off LinkedIn, or screenshotted — all of which strip EXIF and can produce a square PNG. So the question went to the client, which is the only party who could actually answer it, and the answer is that the signals were artefacts of how the file travelled rather than of how the image was made.

**The lesson worth keeping, and it is not "the check was wasted".** Metadata absence is evidence about a file's history, never about its subject. A stripped EXIF block tells you a picture has been through software; it does not tell you a person was generated. The reasoning is kept in `public/images/README.md` rather than deleted, because the check was right to run even though the suspicion was wrong — and the next near-square PNG with no EXIF should get the same treatment and may get the opposite answer.

**Nothing rendered changes.** `portraitAlt` was deliberately written to describe what is in the frame without asserting how the image was made, which is accurate either way, so it stands as written. Nothing on the site ever captioned it as a render. The only edits are to the two records that carried the open question.

**What this does not close.** The set still has five different backdrops — brown studio, white, white, skyline, plain grey — against spec §9.5's "same backdrop, crop and lighting". That is unfixable by editing photographs of real people, and one shoot closes it.

---

## 29. `overflow-wrap: anywhere`, and the seven routes that were failing reflow (10 Sep 2026)

Raised as one defect — the CTA band on `/products` pushing the document to 360px at 320px/200% text — and it was seven routes and a one-word CSS change.

### The rule was already there and was the wrong value

`globals.css` has carried `body { overflow-wrap: break-word }` since it was written, with a comment naming exactly this scenario: a heading like "Specification" at 200% text on a 320px viewport is a single word wider than its container, and WCAG 1.4.4 requires text to reach 200% without loss of content.

**`break-word` only does half of that job, and the half it skips is the half that matters here.**

The two values break lines identically. They differ in one respect: the soft wrap opportunities `break-word` introduces are **not** counted when the browser computes an element's min-content size, and `anywhere`'s **are**. So under `break-word` the long word wraps visually — and the box around it is still sized to the whole unbroken word, because that is still its min-content contribution. Anything sized to fit its content then blows out, and takes the document with it. The text was never clipped; the layout was.

### Seven routes, not one

Measured at 320px with 200% text, before the change:

| Route | Document width | Cause |
|---|---|---|
| `/products` | 360px | the word "specification?" |
| `/about-us/careers` | 492px | a paragraph |
| `/contact`, `/hi`, `/privacy-policy`, `/terms-of-use`, `/accessibility` | 475–500px | `vishnu@aksharbyonyks.com` |

The contact address is the interesting one: five routes failing on the same unbreakable string, and none of them a heading. **Scoping the fix to `h1`–`h6` was tried and fixed exactly one of the seven.** It belongs on `body`, where it already was.

### The cost was measured rather than assumed

`anywhere` changes intrinsic sizing site-wide, which could in principle shrink anything deliberately sized to its content — a table column, a provenance chip, a `w-fit` box. This site has all three.

Every element's bounding box was captured with and without the change, across eleven routes at 390px and 1280px at normal text size, and compared. **Not one differed** — same widths, same heights, same document height. `anywhere` only acts when a box would otherwise be forced wider than the space it has, which is precisely the case the rule exists for.

After: **zero of twenty-one routes overflow at 320px**, at normal text and at 200%, with the skip link checked in its focused state.

### What it looks like when it fires

At 320px/200% the `/products` heading now breaks as "specificati / on?". That is not pretty, and it is correct: at 48px bold there is no width at which that word fits 256px, so the choice is a mid-word break or lost content, and WCAG 1.4.4 settles it. `hyphens: auto` would render it "specifica- / tion?" instead, which reads better — but it would also hyphenate ordinary paragraphs at ordinary sizes across the whole site, which is a typographic decision rather than a correctness one and was not taken here.

### Not a regression from the mobile pass

Verified against HEAD before touching anything: the same seven routes failed identically with the nav work stashed. This predates §24.

---

## 30. The ledger had gone stale about our own leadership (10 Sep 2026)

`pending-executives` read, on `/what-we-know`, in public:

> Three Akshar Byonyks people are published on the leadership page. Two of them, Dr. Ronak C. Shah and Sahil, arrived with a biography but no job title and no photograph, so their cards say "Title to be confirmed" and "Photograph pending"...

**Every clause of that had become false.** Four Akshar Byonyks people are published, not three. All four carry a job title. All five records on the page carry a portrait, and none sets `portraitPending`. Sahil acquired a surname on 8 Sep with the client's officer schedule. Verified against the rendered pages, not just the data: `/about-us/leadership` returns zero occurrences of "Title to be confirmed" and zero of "Photograph pending".

So the site's transparency register was publishing a statement about this company's own leadership that this company's own leadership page contradicted — which is a worse failure than the gap it was describing ever was.

### The mechanism that failed, because it will fail again

Entries are written beside the pages they describe, and then the pages move on. The build contract pairs a rendered `PendingNote` with a ledger entry and fails if one exists without the other — but **it cannot read prose**. An entry whose *sentences* go stale while its `id` still matches a live gap passes every automated check there is. The note at the head of `claims-ledger.ts` already says this: "The contract at the foot of this file will not catch that — only a person reading both will."

That is exactly what happened. Four separate client instructions landed on the leadership records between 1 and 8 September — a title, a portrait, a surname, a whole new executive — and each one was applied to `leadership.ts` without anyone re-reading the sentence in the ledger that described the old state.

**A ledger of gaps needs re-reading whenever the thing it describes is edited, and nothing enforces that.** Worth knowing before the next roster change.

### Replaced rather than removed, because the gap narrowed instead of vanishing

One pending marker is still rendered on that route: the "On India" chip on `/about-us/leadership/senthil-kumar`. An entry is owed to it, so `pending-executives` becomes `pending-india-note`, describing what is actually missing — the note the client asked for on 1 Sep saying what the one Byonyks person on the roster does for the India programme. His biography is his own, as published by Byonyks, and describes a career in the United States; on an India-market roster that leaves the obvious question unanswered, and the profile publishes it unanswered rather than answering it with a sentence nobody wrote.

The two comments in `about-us/leadership/page.tsx` that pointed at the old id and described "two frames" and "two names" were stale in the same way and were corrected with it. The `Title to be confirmed` and `Photograph pending` branches stay in the markup: no record needs them today, and the next supplied one may.

Claims: 38 to 37.

### Still unestablished, and deliberately not asserted either way

Whether four *is* the complete Akshar Byonyks leadership roster. Open Questions 1.4 asked for five executives, and the removed entry was originally carrying a roster-level "incomplete" claim alongside the per-record ones. Nothing in this repo establishes that the roster is short, and inventing an "incomplete" claim would repeat the error just fixed in the opposite direction. It is a question for the client, not an entry.

---

## 31. The market page now says Akshar Byonyks manufactures the X-1, and the rest of the site does not (11 Sep 2026)

**Where:** `src/lib/claims.ts` (`indiaManufactureAndLicence`), `src/components/market/timing-and-licensing.tsx`.

### What the project's own rules say

`claims.ts` opens with three non-negotiables carried from PRODUCT.md. The third: **"Never describe Akshar Byonyks as the manufacturer unless and until it manufactures. Manufacturing attributes to Byonyks generically, never to a country (spec F-1, resolved 20 Aug 2026)."** Everything else in the repository agrees with it:

- `manufacturingStatement` — "The X-1 is manufactured at a Byonyks ISO 13485 certified facility." Rendered on `/products/the-x1-cycler`.
- `compliance.ts` — the ISO 13485 entry sits in the **company-stated** register, attributed to Byonyks, with no certificate number, no issuing body and no expiry.
- The FDA's own record for K243371 names **Byonyks Pvt, Ltd.** as the applicant.
- `locations.ts` publishes **no Akshar Byonyks facility at all** — its register is one Byonyks head office and two announced, unopened India hubs whose function `compliance.ts` is explicit must not be described as manufacturing until the CDSCO licence route is settled.

### What shipped instead

Client instruction, verbatim: *"In On what authority, merge the manufactured and licensed boxes. X1 is manufactured at an AKSHAR byonyks site with Akshar byonyks being in charge of everything. Should be no mention of byonyks."*

The `/innovation/market/` "On what authority" band went from four boxes to three. The merged box reads:

> **Manufactured and licensed** — Akshar Byonyks International LLC manufactures the X-1 at its own ISO 13485 certified site and is responsible for the device in India end to end: manufacture, supply, regulatory filing and clinical support.

### What stayed true regardless, and why the scope is one band

- **Nothing else was rewritten.** The instruction named that band. `manufacturingStatement`, the compliance register, the specification table's "Designed and manufactured by: Byonyks" row, the products hero and the leadership hero are untouched. A reader who moves from `/innovation/market/` to `/products/the-x1-cycler/` therefore meets two different answers to "who makes this", and that is a live inconsistency, not a resolved one.
- **The clearance box still names Byonyks, and must.** `usRegulatoryStatement` ends "held by Byonyks, not by Akshar Byonyks". That is what the FDA's register says. Rule 1 — never state or imply Akshar Byonyks holds the clearance — was not relaxed to satisfy "no mention of byonyks", because doing so would put a false statement about a public record on a medical-device site. This is the one part of the instruction that was not applied, and it was not applied deliberately.
- **No certificate backs the new sentence.** The ISO 13485 certificate number has never reached this project for *either* company.

### What closes this

The Akshar Byonyks ISO 13485 certificate. When it arrives it goes into `compliance.ts` as its own credential, `manufacturingStatement` changes with it, the specification table's attribution row changes with it, and `indiaManufactureAndLicence` stops being a special case. Until then this entry is the record that one page disagrees with the other four on a question a procurement officer will check.

---

## 32. Searching KDIGO for the four benefit references changed three of the four claims (11 Sep 2026)

**Where:** `src/components/innovation/pd-benefits.tsx`, `src/lib/claims-ledger.ts` (`pending-benefit-references`).

### What the spec says

§9.2 asks `/innovation/how-it-works/` to carry "the four benefits, each with a supporting reference." The section shipped with four visibly empty reference slots, on PRODUCT.md's third principle — "evidence before claims — no statistic ships without a source and a date; an unsourceable claim gets cut, not softened."

### What shipped instead

Client instruction: *"For reference citations, search at https://kdigo.org/."* Searching it settled two things before a single citation was placed.

**First, what KDIGO publishes.** KDIGO has **no clinical practice guideline** on dialysis modality, peritoneal dialysis, or the peritoneal membrane — its guideline programme is anaemia, blood pressure, CKD evaluation, CKD-MBD, diabetes, glomerular disease, heart failure, hepatitis C, lipids, AKI, ADPKD and transplantation. Everything KDIGO says about PD is in **Controversies Conference reports**, so those are what is cited, and the page describes them as conference conclusions rather than as recommendations.

**Second, that two of the four claims said more than KDIGO will say, and one said the opposite.**

| Claim | What KDIGO says | What changed |
|---|---|---|
| Protects the peritoneal membrane | Nothing. The closest statement is the inverse framing: a peritoneum "damaged through surgery or inflammation" is an **absolute contraindication** to PD (2023 home dialysis report). | **Still uncited.** The page says KDIGO publishes nothing on this and that a reference has to come from elsewhere. Citing the contraindication line under this heading would be the citation contradicting the claim above it. |
| Lower total cost of being treated | PD costs are generally lower than in-centre HD, "but this tends to be truer in high-income regions"; in several countries PD costs **more**, "often because of the high costs of consumables", and "local manufacturing of PD fluid reduces shipping and tariffs" (2023). The 2019 report names the same reversal for "countries with no local manufacturing of peritoneal dialysis fluids or with tariffs on importing peritoneal dialysis supplies." | **Qualified on the page.** The single most useful finding of the search for this site: the qualification is about imported consumables, which is India. An India-market page printing the unqualified claim over a source that names the reversal would be citing a paper it had not read. |
| Supports residual kidney function | Preserving RKF "is important and should be a goal for all clinicians and dialysis patients", but the evidence comparing its decline across modalities is "small, mostly single-center, observational studies from more than 2 decades ago" and "not robust enough to suggest one modality is favorable over another" (2019). | **Reversed.** It read "Home peritoneal dialysis is associated with preserving residual renal function for longer than in-centre hemodialysis." KDIGO explicitly declines that comparison. It now describes what the prescription is managed around — fewer exchanges while function lasts — which is what KDIGO does state. |
| Clears acid and toxins → **Clears waste and excess fluid** | Small solute clearance is a floor, not the whole measure: keep to "accepted minimums for small solute removal", while adequacy is judged on residual function, volume status, nutrition, symptoms and the patient's goals (2019). | **Retitled and corrected.** "Toxins" is not a term either report uses, and the old body said the cycle removes what builds up "in the dialysate" — which has it backwards; the dialysate is what waste crosses *into*. |

### What stayed true regardless

- **No claim was softened to fit a citation, and no citation was fitted to a claim.** Where KDIGO is silent the slot stays pending and says why; where KDIGO is narrower than the claim, the claim moved.
- **Every reference links to KDIGO's own PDF**, not to the journal. Both were fetched and read on 11 Sep 2026; `kidney-international.org` and PubMed both refuse an automated fetch, and a citation a reader cannot open is not a citation.
- **`pending-benefit-references` narrowed rather than closed.** No nephrologist has reviewed any of the four, which is the half of that entry a citation cannot discharge.

### Still outstanding

A reference for the peritoneal-membrane claim. ISPD — which does publish PD-specific guidance, including on solutions and membrane assessment — is the obvious place to look next, and was out of scope here because the instruction named KDIGO.

---

## 33. The navbar's layout animation was measuring against page scroll (11 Sep 2026 — the diagnosis held, the fix did not; see 40)

**Where:** `src/components/ui/animated-nav.tsx`.

### The report

"When opening a byotalk page, the navbar has a bug that makes it enter in the middle of the screen and goes up vertically in position."

### What it actually was

Not a ByoTalks bug. Every route, and ByoTalks is simply the easiest place to trigger it — `/byotalks` is a long index and the session links sit near the bottom, so the reader is always deep in the page when they click.

The capsule carries `layout="position"`. Motion's layout projection measures an element in **page** coordinates: viewport rect plus scroll offset. That is correct for an element in normal flow and wrong for a `position: sticky` one, whose page coordinate moves with the scroll while its painted position does not. On a client-side navigation from 2400px down `/byotalks`, Motion measures the bar at page-y 2400 before the route change and at page-y 0 after Next resets the scroll — a 2400px delta nothing visible travelled through. It then animates the bar from 2400px below its destination up to it, clamped into view by the scroll reset: the bar appears partway down the screen and travels upward.

### The fix that was shipped, and did not work

`layoutRoot` alone on the sticky `<header>`. **It was inert.** Motion documents `layoutRoot` as a modifier on a node that is itself a layout node, and this header had no `layout` prop, so it never became a projection node and there was nothing for the capsule to resolve against. Corrected on 12 Sep 2026 — see deviation 40.

**This shipped unverified**, on the stated ground that no browser automation was available in the session. Playwright was in `node_modules` the whole time. The entry below is the one with measurements in it.

---

## 34. Six client answers, four launch gates closed, and one that only looked closed (11 Sep 2026)

**Where:** `src/lib/site-config.ts`, `src/lib/locations.ts`, `src/lib/claims.ts`, `src/lib/claims-ledger.ts`, `src/lib/about.ts`, `src/lib/compliance.ts`, `/contact`, `/locations`, `/privacy-policy`, `/terms-of-use`, `/grievance-redressal`, `/products`.

Eight outstanding questions were put to the client and six came back with something usable. This entry records what each answer changed, and — the part worth reading — the two places where the obvious reading of an answer would have been wrong.

### What closed

| Gap | Answer | Where it landed |
|---|---|---|
| `pending-address` — the India office address, Open Question 1.1 and a §14.4 launch gate carried since the first build | C/O Rashmin Gandhi, M34 Medical Devices Park, Sultanpur Village, Patancheru, Telangana 502319, and a +91 mobile | `siteContact`'s new `indiaOffice`, rendered on `/contact`, `/locations`, `/privacy-policy` and `/terms-of-use` |
| `pending-grievance-officer` — a named officer, required by the DPDP Act 2023, launch-blocking | "Grievance officer can be Rashmin Gandhi" | `grievanceOfficer`, rendered on `/grievance-redressal` and `/privacy-policy` |
| `pending-licence-scope` — exclusivity, territory, product scope | "License is exclusive to India covers all machines. X2 and X2,3 as well." | `licenceScope` in `claims.ts`, rendered on `/products` and in the `/about-us` milestone |
| `pending-india-hubs`, the completion-date half | Summer 2027 for Hyderabad, Late 2027 for Ahmedabad | `expectedCompletion` on both `locations.ts` rows, with a matching field on the parked `indiaHubs` record |

`indiaLicensing.asOf` also moved from 1 to 11 September, because "CDSCO in progress" is a reconfirmation of the status and that field is labelled "Status as of" on both pages that print it.

### The address came back onto `/locations`, which its own source file had pre-authorised

The Bengaluru row went on 1 Sep, its "coming soon" replacement on 2 Sep, and for nine days every row on that page was a Byonyks site. `locations.ts` recorded the consequence and the condition for reversing it in the same note: *"the day the India office has a published address it belongs back on this page."* It does, and it leads the register — `byIndiaFirst` preserves array order, so being first in the array puts it first on the page, which is the right answer to a reader who came to a locations page asking where **this** company is.

**One thing broke on the way, and it is the kind that ships.** The card's image footnote was `Byonyks · ${kind}` / `"Byonyks · no image published"` — two hardcoded strings, correct for as long as every row was Byonyks'. Our office has no photograph, so the card would have printed **"Byonyks · no image published" under Akshar Byonyks' own address**, on the one page whose entire job is keeping the two companies apart. Spec §3.1's first non-negotiable, defeated by a caption. It reads `location.entity` now.

### The two answers that do not mean what they look like

**1. An address is not a registered office.** "C/O Rashmin Gandhi" is a correspondence address at a third party's premises, and the same round of questions returned *"Not sure about indian LLP yet"* — so there may not yet be an Indian entity for a registered office to belong to. Three pages turn on that distinction and they are now split accordingly:

- `/contact`, `/privacy-policy` and the locations register want *where to reach this company*. They get the address, no caveat, no pending note. `/contact` now carries **no pending note at all**, a first for this site.
- `/terms-of-use` prints the address under "Where to reach us" — deliberately not "our registered office" — and **keeps its jurisdiction pending note**, narrowed to the surviving gap: the seat of the courts follows from a registered office that does not exist yet.
- The `Organization` structured data on `/about-us` and `/locations` is still withheld. The reason changed rather than disappeared: a crawler reads `PostalAddress` as the seat of the company, which is the one thing the terms still mark pending. Both source comments were rewritten rather than left to go stale.

This is enforced in data, not in prose: `indiaOffice.isRegisteredOffice` is `false`, and flipping it is the commit that changes `/terms-of-use`.

A new ledger entry, `pending-india-entity`, carries what `pending-address` did not.

**2. "Can be" is a designation, not a confirmation.** The client wrote *"Grievance officer can be Rashmin Gandhi."* That is published as the appointment, because the alternative was worse — leaving a launch-blocking note saying nobody had been appointed, after the client named somebody, would be the site contradicting its own client on a legal page. The exact wording is recorded on the constant, and `grievanceOfficer` is the single place to change if the appointment is not final. The profile and photograph the client is sending are for the leadership roster; the DPDP Act asks for a name and contact details, and neither page renders a portrait.

### What the dates do not settle

The client called Hyderabad and Ahmedabad "offices". The site keeps Byonyks' published **function** for both — dialysate manufacturing and distribution, tubing sets and machine assembly — because only the date was being answered, and the two are different claims. A completion date says when a building is finished; it says nothing about what it will be licensed to do, and `compliance.ts`'s standing constraint is that neither may be called a manufacturing facility until the CDSCO route is settled, because that route decides which licence form applies. `pending-india-hubs` was reframed from "completion dates" to "what the hubs will be licensed to do" — same id, so the routes it is attached to keep their entry.

Every rendered date carries the word **Expected**, and both cards repeat it in a sentence. A date on a medical-device site is read by procurement as a supply date.

### Still open after this round

X-1 specifications (battery runtime, dimensions and weight, fill volume, cycle programming — "will get you specs on X1 soon from Byonyks"), X-2/X-3 specifications ("TBD"), the Indian LLP decision, the CDSCO confirmation itself, the two additional Akshar Byonyks leadership records, and Rashmin Gandhi's profile and headshot.

Claims: 37 to 36.

## 35. Two leadership records, one of them with no biography at all (11 Sep 2026)

**Where:** `src/lib/leadership.ts`, `src/app/about-us/leadership/[slug]/page.tsx`, `public/images/leadership/`.

### What the spec says

§9.5 wants the roster consistent — same backdrop, same crop, same lighting — and `leadership.ts` has refused since it was written to publish a biography this project wrote about a real person.

### What shipped instead

Two records arrived on the same afternoon and they were opposite cases.

**Dr. Rashmin Gandhi** came complete: a named role (India Division Lead), a six-paragraph biography, and a portrait. Carried word for word, `suppliedBy` and `retrieved` set.

**Dr. Yogesh Tank** came as a name, post-nominals and a photograph, with "No description yet". Holding a whole person off the roster until a paragraph exists is the wrong trade, and writing a placeholder biography is the one thing `leadership.ts` exists to prevent — so `bio` became optional, gated by a new `bioPending` flag, with the same shape as `portraitPending`: a missing biography **fails the build** unless the record declares the absence. The profile page gained a third pending state to go with "Title to be confirmed" and "Photograph pending".

**No title was inferred from "MD".** It says he is a physician; it does not say what he does at this company. Dr. Shah's record already carries the cost of that guess — "nephrologist" would have been read straight out of his own biography and would have been wrong, because he is Secretary.

### The one open question, and it is about a real person's credentials

Two different sets of post-nominals were supplied for Dr. Gandhi. The client's covering line reads "Rashmin Gandhi, MD". The supplied profile's own signature line reads "Dr. Rashmin Gandhi, FRCS (Edinburgh), FRCS (Glasgow)", and the biography corroborates that pair in prose. **Nothing in the supplied text mentions an MD.**

All three are published, because every alternative involves this project deciding which of a real clinician's stated credentials to drop: removing the MD edits the client's own line about their own person, and removing the FRCS pair discards the qualifications the biography evidences. **If the MD is wrong it should be corrected rather than left.** A medical degree somebody does not hold is a misstatement about a real person on a medical device site, and it is flagged for that and not for tidiness.

### Three roles, one person, deliberately not merged

Dr. Gandhi is the India Division Lead on the roster, the named Grievance Officer under the DPDP Act, and the care-of name on the India office address. `/grievance-redressal` links to his profile so a complainant can see who they are writing to. His card says "India Division Lead" because that is his job; running the statutory appointment into it would make a legal function read as a job title.

### What this closed on its own

The headcount. `/about-us` and the roster page compute from the data, so "6 people at Akshar Byonyks, and one colleague at Byonyks" became true when the sixth record landed rather than by anyone typing a 6. The stale prose around it did **not** self-correct and was fixed by hand: the counts in `leadership.ts`'s header and `leadershipStatus` in `about.ts`, which still described "three Akshar Byonyks people, two without a title or photograph". That is deviation 30's failure mode, in the same file deviation 30 is about.

---

## 36. The benefit references left the page the week they arrived (11 Sep 2026)

**Where:** `src/lib/pd-benefits.ts` (new), `src/components/innovation/pd-benefits.tsx`, `src/lib/market-data.ts`, `src/lib/claims-ledger.ts`, `scripts/generate-sources.mjs`.

### What the spec says

§9.2: `/innovation/how-it-works/` carries "the four benefits, each with a supporting reference."

### What shipped instead

Client instruction: *"In innovation page, References should be placed in seperate document with the rest of the sources."*

This is the **same instruction the 3 Sep pass acted on** when it took the citations off `/innovation/market` — visible sourcing comes off the pages, nothing is deleted from the data, `SOURCES.md` is where the evidence is read. Deviation 32 had put the KDIGO references onto the page one day earlier; they came off the next.

**The mechanism, not a deletion.** `marketSources` gained the two KDIGO reports as `kind: "research"`, which is the existing switch that decides what renders: register sources are still linked on the site, research sources are recorded only in `SOURCES.md`. The generator walks that array, so registering them there is what makes "with the rest of the sources" literal rather than a figure of speech.

**The claims data moved out of the component into `src/lib/pd-benefits.ts`.** `claims-ledger.ts` is what `SOURCES.md` is generated from, and it cannot import a component without dragging React into a Node script. So the four claims now live where the page and the ledger both read them — the pattern `locations.ts`, `compliance.ts` and `market-data.ts` already follow, and the reason `claims-ledger.ts` opens by saying "THIS FILE DERIVES; IT DOES NOT RESTATE."

### Three contracts, because the evidence is no longer visible

While a reference sat under its claim, a missing one was visible to anyone who opened the page. It is now visible only in a generated file nobody opens on a normal day, so the build is the only thing left that will notice. `pd-benefits.ts` throws at module load for:

- a claim with **neither** a source nor a declared gap — a health claim with no evidence and nothing saying so;
- a claim with **both** — a record contradicting itself about whether it knows something;
- a claim citing a source **without a note saying what that source concludes.**

The third is the one that matters most, and it is the failure this whole change could have been. On three of these four the source concludes something *narrower* than the sentence above it; one of them reverses what the claim used to say. A bare source id would survive the type checker, generate a tidy-looking `SOURCES.md` row, and lose the only part of the citation that qualifies the claim.

### `pending-benefit-references` split in two, and the id changed

It was one entry carrying two different gaps: that the four claims had no citations, and that no nephrologist had read them. The first is now three derived `published` entries and one derived `pending` entry for the peritoneal-membrane claim — a gap belongs in the data once the data can express it. What is left is `pending-benefit-review`, the half a citation cannot discharge. The id changed because the claim did; keeping a label about references over a record that no longer mentions them is deviation 30's failure mode.

**Ledger: 37 claims to 41. Sources: 6 to 8.**

### What did not quietly revert

The three sentences deviation 32 rewrote to match what KDIGO actually supports. That is worth stating because the opposite would have been easy and invisible: with no citation rendered beneath them, the softened claims could have been restored to their stronger originals and nothing on screen would have contradicted them. **The sources did not stop applying when they stopped being displayed.**

### One heading changed, because it had stopped being true

"Four benefits, and their references" became "Why it is offered", and the lead paragraph promising to set the claims against KDIGO's conclusions went with it. A page cannot announce references it does not show.

---

## 37. The home-therapy photograph now has an Indian subject, and three questions came with it (11 Sep 2026)

**Where:** `public/images/x1-in-home-india.jpg` (new), `public/images/x1-in-home.jpg` (deleted), `src/components/innovation/by-hand-or-machine.tsx`.

### What the spec says

PRODUCT.md is emphatic that content is India-specific and that material which does not transfer gets **replaced rather than kept for volume**.

### What shipped instead

The client supplied a replacement for the one image that had been failing that rule since 28 Aug 2026: Byonyks USA's own living-room photograph of the X-1, whose subject was a white Western man. `public/images/README.md` had recorded that this flag "is closed by commissioning a photograph, not by anyone approving one." A photograph is what closed it — the same room, the same device, the same framing, an Indian subject.

### Three things the swap did not close, all of them the client's

1. **The DMR Act 1954 sign-off does not travel.** The client confirmed sign-off on 10 Sep 2026 **for the old file**. This one depicts a person with a medical device in a therapy context in the same way, and this repo's own rule — written against `clinic-ward-kolkata.jpg` — is that an approval is given for an image and every new instance starts flagged. Probably a formality after the 10 Sep decision. Not this project's formality to complete.
2. **Nobody has said who took it, so the caption stopped saying.** It read "The X-1 in a home, photographed by Byonyks", which was true of the file it described — that one came from `byonyks.com/wp-content/uploads/2025/07/`. This one did not; checked 11 Sep 2026, the only version of the scene byonyks.com serves is still the original. An attribution is not something to carry over to a file it may not describe. **If Byonyks did shoot it, the line should go back on.**
3. **How this scene comes to exist twice over is not recorded.** One set dressed and shot with two subjects is an ordinary explanation. So is a commissioned re-shoot. A third is that the frame was derived from the Byonyks photograph rather than taken — and on a medical device site that is materially different from the other two, because it changes what the picture is evidence of and it bears on (1). **This project cannot tell which from the file:** no metadata survives, and at 1024px the usual tells are indistinguishable from downscaling. Asked, not assumed.

   **A second frame arrived within the hour** — same subject, same set, a different and better composition, which replaced the first in place. That is consistent with a real shoot, since a derived single image does not usually come with alternates. It is **not** confirmation of one, and the question stands until the client answers it.

### The cost, stated rather than hidden

**1024×682, against the 1536×1024 it replaces.** The figure renders up to 1216 CSS px, so this is upscaled on a full-width desktop slot even at 1× and well short on any retina screen. Published anyway, because an India-specific subject at 1024px is worth more to this site than a non-Indian one at 1536px — that is PRODUCT.md's ordering, not a preference. **It was not upscaled to disguise the difference**, which would have invented a third of the pixels.

**The second frame landed at 1024×682 as well, which settles where the ceiling comes from.** Two separate attachments from two separate sends arriving at exactly the same long edge is the chat client re-encoding, not the camera. **A larger original exists on the client's side and is worth asking for** — it is a one-line swap here and it removes the only real cost of this change.

### Still open

`clinicians-in-discussion.jpg` carries the same India-specificity flag and is untouched by this. One of the two the README named is now solved.

---

## 38. The company tag came off every leadership card and profile (12 Sep 2026)

**Where:** `src/app/about-us/leadership/page.tsx`, `src/app/about-us/leadership/[slug]/page.tsx`, `src/lib/leadership.ts`, `src/lib/about.ts`.

### What the spec says

§3.1's **first non-negotiable** is that Akshar Byonyks and Byonyks are never blurred. The roster's own code carried this in block capitals: *"WITH THE HEADINGS GONE, THE PER-CARD COMPANY LABEL IS THE WHOLE DEFENCE … Do not remove that label to tidy the cards up."*

### What shipped instead

Client instruction: *"The tag under each person in leadership of Byonyks vs Akshatr Byonyks should be deleted."* Both instances are gone — the plum-railed mono line under the role on every roster card, and the same line on every profile hero.

**The old comment was right about the risk and wrong about being the whole defence.** Checking before deleting is what found what else carries §3.1, and there were three things:

| Still carries it | Where | Derived? |
|---|---|---|
| The counts sentence — "6 at Akshar Byonyks and 1 at Byonyks, the company that designs and manufactures the cycler" | Above the roster grid | Yes, from the records |
| `worksFor` in the JSON-LD, and the per-profile meta description | Every profile page | Yes, from `organisation` |
| "Portrait of Senthil Kumar, VP Business Development at Byonyks" | His portrait's alt text | **No** |

The third is luck, not a mechanism, and the code now says so. Alt text on this roster is hand-written per record and **only two of the seven name a company at all** — the other five describe clothing and backdrop. It happens to be present on the one record where the distinction matters. It would not survive somebody rewriting his alt.

### What was deliberately not done

**`organisation` stays on the record and stays required.** All three survivors above read it, and deleting the field would have broken the JSON-LD and the meta descriptions — a far larger change than the one asked for. It is no longer printed, which is a different thing from no longer being true. The field's own documentation now carries the sharper version of the risk: a wrong value there is now a wrong value **no reader can see and correct for**.

### Who actually loses something

The sighted visitor who lands on a single card, or screenshots one, without reading the paragraph above the grid. That is the specific case the label existed for, and nothing replaces it. Senthil Kumar — the one Byonyks person, now among six of ours — is the record where that matters.

### Stale prose fixed in the same pass

Three sentences went false the moment the tag came off, and all three were about the tag:

- The roster intro: *"Each card names the company that person works for."*
- `leadershipStatus` in `about.ts`: *"Senthil Kumar's card is Byonyks', and says so."*
- `leadership.ts`'s own header: *"printed on every card, printed on every profile."*

Deviation 30 is the entry about exactly this failure mode, and this is the third pass in a week to hit it in these two files.

---

## 39. A LinkedIn mark on the roster card, and the nested-anchor problem it created (12 Sep 2026)

**Where:** `src/components/common/linkedin-mark.tsx` (new), `src/app/about-us/leadership/page.tsx`, `src/lib/leadership.ts`.

### What shipped

Client instruction: put Vishnu Patel's LinkedIn on his leadership card next to his portrait, as a clickable logo rather than a pasted URL. His profile URL went onto his record; the mark renders on the card for **any** executive with a `linkedin` value, so Senthil Kumar's — transcribed from byonyks.com in August — now shows one too.

### The structural problem, which is not cosmetic

**The whole card is a single `<Link>` to the profile page.** An `<a>` inside an `<a>` is invalid HTML, and browsers recover from it by closing the outer anchor early — which would have silently broken the card's own link and left a tab stop pointing nowhere. Nothing would have looked wrong.

So the mark is a **sibling** of the card link, absolutely positioned over the portrait's top-right corner, with the `<li>` made `relative` to be its containing block. That is the only arrangement in which both links work with a keyboard. Verified in the built HTML:

```
<li><a href="/about-us/leadership/vishnu-patel">…portrait, name, role…</a>
    <a href="https://www.linkedin.com/in/…" target="_blank" rel="noopener noreferrer">…</a></li>
```

### Three decisions inside it

- **The mark is an inline SVG, because lucide has no LinkedIn icon** — it dropped brand marks, and every other icon on this site is lucide.
- **36px, which is the target size and the visible size at once.** WCAG 2.2 SC 2.5.8 asks for 24px minimum; the tile fills its box, so no invisible padding is doing the work. An icon-sized target would have been a link only a mouse could use.
- **The accessible name is the person's, not "LinkedIn".** A screen reader listing the links on this page would otherwise read "LinkedIn" once per card with no way to tell them apart.

### Revised hours later: the brand tile, and why the supplied PNG was not shipped

It first went in as a monochrome glyph on a white disc — the disc because the backdrops on this roster run white to dark grey to a city skyline, so a bare glyph had no colour that stayed legible over all of them. The client then sent LinkedIn's blue tile and asked for **that image** to be the button.

**The file itself could not be used, and the reason is not stylistic: the supplied PNG has no alpha channel.** Its background is opaque white and the blue tile sits inside a 9% white margin. Dropped onto a photograph — which is exactly where this button lives — it would have rendered as a white square with a blue square inside it.

So the tile is reproduced as SVG, with its geometry measured off the supplied file rather than recalled:

| Measured | Value | Note |
|---|---|---|
| Fill | `#0066C8` | Sampled from the flat interior. LinkedIn's current published brand blue is `#0A66C2`; the supplied file is a shade off it and the supplied file wins — it is what was asked for, and the difference is invisible at 32px. |
| Corner radius | ≈23% of the side | Traced down the left edge of the arc. The generous "squircle" of the modern app icon, not the tighter older favicon radius. |

The SVG was rasterised back to 280px and compared against the original before it shipped.

**Two knock-on changes.** The white disc is gone — the tile brings its own opaque ground, which solves the legibility problem rather than working around it — replaced by a `ring-black/10` hairline that only shows against a pale corner. And hover is now opacity rather than hue, because every other link on this site shifts colour on hover and this one cannot: the colour is another company's trademark.

**The fixed colours are the one deliberate exception to the palette on this site.** `linkedin-mark.tsx` records why: the value of a brand tile is that it is recognised before it is read, and recolouring it into this site's blues would destroy that and be wrong besides.

### Not verified

**That the URL resolves.** It was supplied by the client and is published as given; LinkedIn refuses automated requests, so nothing here confirms the profile exists or belongs to this person. The field's documentation now records why that matters more than it looks: a wrong LinkedIn is a link to **a different real person** under this person's name and face, which is why it must never be filled in from a search.

### The profile page followed the same day

It had kept a gold **"LinkedIn"** text label with a generic external-link chevron. The client asked for that to go and the tile to take its place, so both places a reader can meet this link now look like the same link. Two differences from the card, both deliberate: the tile is **40px rather than 36px**, because on a profile it is the only outbound link on the page and it sits in a hero at display sizes; and the hairline ring flips to `ring-white/20`, because this hero is on ink and `ring-black/10` would be invisible there.

**The trade, named rather than glossed:** there is no longer a visible word "LinkedIn" anywhere on the site. The mark is recognised on sight by nearly everyone, and the accessible name still reads "Vishnu Patel on LinkedIn (opens in a new tab)" in full — but a reader who does not know the glyph now has nothing to read. The instruction was explicit about removing the word.

`ExternalLink` left the import with it; it had no other use in that file. The JSON-LD `sameAs` is untouched.

---

## 40. The navbar fix, measured this time (12 Sep 2026)

**Where:** `src/components/ui/animated-nav.tsx`.

### Why there is a second entry

Deviation 33 diagnosed this correctly and then shipped a fix that did nothing. The client reported the bug again, unchanged, against `/byotalks` **and** `/about-us/leadership`.

Two separate failures, and the second is the one worth keeping:

1. **`layoutRoot` without `layout` is inert.** Motion documents the two as a pair — `layoutRoot` modifies a node that is *itself* a projection node. The header had no `layout` prop, so it never became one, and the capsule below had nothing to resolve against.
2. **It shipped unverified, and the stated reason was wrong.** Deviation 33 says "no browser automation was available in the session." **Playwright was in `node_modules` the whole time**, with Chromium and WebKit already installed. Nobody looked. A fix to a visual bug that nobody watched is a guess with a commit message.

### What the measurement showed

A Playwright trace sampling the bar's painted `top` every frame across a navigation, before the fix:

| From | Depth | Vertical travel |
|---|---:|---:|
| `/byotalks` | 900 | 876px |
| `/byotalks` | 2400 | 759px |
| `/about-us/leadership` | 900 | 700px |
| `/about-us/leadership` | 2400 | 682px |
| `/news` | 1139 | 990px |
| `/innovation/market` | 2400 | 1571px |
| `/innovation/market` | 5000 | **4171px** |

**It was never a ByoTalks bug, and it was never a two-page bug.** It is every route, and the drop is proportional to how deep the reader was — those two pages are simply long indexes whose links sit near the bottom, so a reader is always deep when they click. The trace catches it as a literal transform on the nav: `matrix(1, 0, 0, 1, 0, 681.8)` springing back to zero.

The mechanism is exactly what deviation 33 described: Motion's layout projection measures in page coordinates (viewport rect + scroll offset), which is wrong for anything inside a pinned `position: sticky` ancestor, whose page coordinate moves with the scroll while its painted position does not. Next resets the scroll on navigation, so the before/after measurement differs by the whole scroll depth.

### The fix

`layout` **and** `layoutRoot` on the header, which is the documented pairing:

```jsx
<motion.div layout layoutRoot>   {/* parent resolves instantly */}
  <motion.div layout />          {/* child measures relative to it */}
</motion.div>
```

The header's own bogus scroll-sized delta now resolves instantly rather than tweening — invisible — and the capsule measures against the header rather than against the document, leaving only the real delta: the centre-to-right travel when the bar collapses.

### What was verified, and how

A regression script covering **12 navigation cases** — four routes at three scroll depths each — plus back-button scroll restoration, at three viewports, against both the dev server and a production `next start`:

- **0px of vertical travel on every case**, against up to 4171px before.
- **Back-navigation with scroll restoration**: 0px.
- **Phone (390×844) and tablet (820×1180)**, where the chrome is different: 0px on the nav and 0px on the header itself.
- **The animation the layout prop exists for still works**: the bar collapses from 733px wide to 48px, slides from left 354 to left 1376, passes through **32 intermediate horizontal positions** rather than jumping, and moves 0px vertically throughout.

The script is in the session scratchpad, not the repo. **It should be in the repo** — this is the second time this bug has been "fixed", and the only thing that distinguishes this attempt from the last one is that something watched it.

### The lesson, stated plainly

Deviation 33's own closing line names the reproduction to run: "scroll to the bottom of `/byotalks`, click a session, watch the bar." Nobody ran it. **A visual bug is not fixed until something has watched it not happen.**

---

## 41. Site-wide audit of the navbar bug class (12 Sep 2026)

**Where:** no code changed. This is the record of what was checked after deviation 40.

### What was audited, and how

Client instruction: check that no other link that leads to a new page has the same or a similar problem. The detector is deliberately general rather than looking for the navbar — after every navigation it samples **every element in the document** for ~900ms and flags two things:

1. **Phantom transform** — any element holding a translate over 24px that is gone by the end of the window. That is this bug's signature: a displacement nothing visible moved through.
2. **Chrome drift** — the banner, the primary nav or the footer changing painted position by more than 8px after the route has changed.

**The detector was validated against the broken component first.** Run with the fix reverted, it produced 30 findings, up to 5788px. A clean result from an unvalidated detector proves nothing — which is the mistake deviation 40 exists to record.

### Coverage

38 routes crawled (21 static + 17 dynamic); **39 distinct internal targets, all 39 exercised** from a deep scroll position, at three viewports, against a production build.

Two coverage gaps had to be closed by hand, and both are worth knowing about:

- **The nav's dropdown panels are in the DOM on every page**, just visually hidden. That made five links look like global chrome and put them in a pass that could not click them. They were reached instead through body links on their parent pages — and `/about-us/careers` through the footer, which turns out to be the only visible place it is linked at all.
- **The home page opens behind a splash curtain that locks scrolling** with `overflow: hidden` on `<html>` and `<body>`. The first harness scrolled the page anyway, programmatically — something no reader can do — and caught the header at `top: -7557`, because `overflow: hidden` kills `position: sticky` on a descendant. **That was a false positive of the test, not a site bug**, and the harness now waits the curtain out. It is recorded because the underlying fact is real and load-bearing: if that scroll lock is ever applied while the page is not at the top, the header will unpin and fly off.

### Result

**Chrome drift: none.** Every navigation, at 1440×900, 820×1180 and 390×844.

Three transforms were flagged by the broad phantom detector. All three were identified and all three are intended:

| Element | Transform | What it is |
|---|---|---|
| `nav[aria-label="Primary"]` | `translate(680, 0)` | The bar reopening on a route change — it parks right when collapsed and slides back to centre. Horizontal and real. The detector now ignores the nav's horizontal component and keeps watching its vertical one. |
| The "Life around the clinic" scene card | `translate(-17, -41)` | The home page's own scroll-driven scene, on the page being left, in the frames before the route swaps. |
| A `fill-ink/35` decorative edge | `translate(0, 29)` | An entrance animation on the destination page. |

### Why the blast radius was always small, and what to watch

Only three things survive a client-side navigation: `<AnimatedNav />`, `<SiteFooter />` and the skip link. **Everything inside `<main>` unmounts and remounts**, so it gets a fresh measurement and cannot carry a stale one across a scroll reset. That is why this bug could only ever have lived in the navbar.

A static sweep confirms Motion's `layout` props exist in exactly one file, `animated-nav.tsx`. The `layout=` hits in `figure-register.tsx` and `modality-mix.tsx` are a plain string prop of those components' own (`"stack" | "two-up"`), not Motion's.

**So the rule to keep: a Motion `layout` prop on anything that both survives navigation and sits inside a `sticky` or `fixed` ancestor reintroduces this bug.** Today that is only the nav. The footer is not sticky and carries no layout animation. If either of those changes, this audit needs re-running.

---

## 42. The reveal wrapper was destroying list semantics site-wide (12 Sep 2026)

**Where:** `scroll-reveal.tsx` gains an `as` prop; eleven call sites change.

Found by `/impeccable audit`, fixed by `/impeccable harden`. 192 failing axe
nodes, one cause: `ScrollReveal` rendered an unconditional `<div>`.

### What that did

| Container | What the browser actually got |
|---|---|
| Leadership `<ul>` | 7 children, **0 of them `<li>`** |
| ByoTalks `<ol>` | 8 children, 0 `<li>` — and no numbering |
| Five `<dl>`s | `dl > div > div > dt`, and `<dl>` allows **one** div level |

A screen reader announces a list by counting its items. There were none to
count, so seven executives and eight sessions arrived as unrelated blocks: no
"list, 7 items", no position, no way to skip the set. On the `<dl>`s the loss
is worse than navigation — the terms stopped being associated with their
definitions at all, which on `/innovation/market` means every figure came
apart from its label, its detail line and its as-of date. That is the whole of
spec §3.3 ("every number carries a date and a source") failing silently for
the readers who most depend on it being programmatic. **WCAG 1.3.1, Level A.**

`leadership/page.tsx` had a comment noting the `<ul>`/`<div>` nesting and
deciding not to fix it. It was read as a layout quirk. It was an a11y defect.

### The fix

`as?: "div" | "li"`, defaulting to `div`. Deliberately two values, not any
tag: widening it would invite a `<section>` wrapped around something that is
not one. Five `<ul>`/`<ol>` call sites now pass `as="li"` and drop their inner
`<li>`; five `<dl>` call sites merge the inner `<div>`'s classes up so the
reveal wrapper *is* the one legal group.

`speaker-register.tsx` could not be merged that way — its accent rail is two
more div levels — so it became what it always was: a `<ul>` of eight people,
each card holding its own `<dl>`. The rail is untouched.

### The thing worth knowing

**`first:` was dead on every one of these rows.** The inner `<div>` was always
the only child of its wrapper, so `first:border-t-0 first:pt-0` matched on
every item and the separators those components ask for have never been drawn.
Moving the classes onto the wrapper repaired that as a side effect: the rules
between the X-1's features, between the PD benefits, between the seven
questions on `/innovation/how-it-works` and between stacked figures are now
visible, and only the true first item has none. Verified by screenshot.

An a11y wrapper that silently voids `:first-child` is a general hazard, not a
detail of this one: **any styling hook that depends on sibling position breaks
when something is wrapped around it.**

### Verified

Production build. axe-core across 20 routes at desktop and mobile: `list`,
`listitem`, `definition-list` and `dlitem` all at **0 nodes**, from 192. Six
list sections screenshotted under reduced motion. No horizontal overflow at
320/390/768/1024/1440, no new scroll at 200% text, `tsc` and `eslint src`
clean.

### Not a defect, and the audit was wrong about it

The audit also reported the Hindi routes as serving Devanagari under
`lang="en-IN"`. **They do not.** `src/app/hi/layout.tsx` wraps both pages in
`lang="hi-IN"`, which is WCAG 3.1.2 (Language of Parts) and is the documented
pattern for a translated subtree under one root layout. The audit counted
`lang` attributes on `<html>` and on the language-switch links and missed the
wrapper. Every string on those pages — English chrome, Hindi body — is
correctly declared. Nothing to fix, and the finding is withdrawn.

---

## 43. The one link on the site that colour alone had to carry (12 Sep 2026)

**Where:** `locations/page.tsx`, `location-register.tsx`. Two class changes.

Found by `/impeccable audit`, fixed by `/impeccable clarify`. The last axe
violation on the site.

### The link in the prose

`/locations` has the site's only link set INSIDE a paragraph of body copy —
"How the licensing relationship works", running through a grey sentence in
primary blue. It had `hover:underline` and nothing else, so at rest the only
thing separating it from the text around it was hue. A reader who cannot
distinguish that blue from that grey had no way to know a link was there;
hover does not reach them, and on a phone there is no hover at all.
**WCAG 1.4.1.** It is now underlined at rest, on the site's own in-prose
convention — `underline underline-offset-2 hover:text-ink` — which the legal
pages, the provenance marks and every citation link already used.

### What was NOT changed, and why

Twenty-odd other links keep `hover:underline`. They are the standalone
call-to-action links — bold, on their own line, with an arrow glyph — and the
breadcrumb and footer navigation. None of those sit in a text block, and none
of them rely on colour alone: weight, position and iconography all carry.
1.4.1 is about a link a reader must pick OUT OF running text, and applying a
resting underline to every CTA on the site would be a visual change wearing an
accessibility argument. axe agrees: across twenty routes it flagged one link,
and one is what changed.

### One inconsistency found alongside it

The phone number on each location card was `hover:underline` while the phone
and email links on `/contact`, `/about-us/careers` and `/hi` were all
underlined at rest. Not a 1.4.1 failure — it is the whole content of its own
paragraph, not embedded in prose — but a number a reader is meant to dial
should look the same everywhere it appears. Brought onto the same convention.

### Also checked, and correct

The page's prose was read against `locations.ts` for deviation 30's failure
mode. "Four sites, two companies" is four records and two entities; "The first
site below is ours, in Patancheru" is the `india-office` row leading the
register; "designed at one of them and announced for the other two" is Itasca
plus the two `planned` rows. Nothing stale.

### Verified

Production build, axe-core across twenty routes at desktop and mobile:
**0 rules violated, site-wide.** The in-prose link screenshotted in context;
the phone link's computed style confirmed as `underline` at 2.88px offset in
primary. `tsc` and `eslint src` clean.

---

## 44. Polish pass: three values with no author, and one target too small (12 Sep 2026)

**Where:** `button.tsx`, `silk.tsx`, `grievance-redressal/page.tsx`, and one
deleted image. Found by `/impeccable audit`, fixed by `/impeccable polish`.

### The type step that belonged to nobody

`button.tsx`'s `sm` size carried shadcn's stock `text-[0.8rem]`. DESIGN.md's
ramp has no 0.8rem step, and the size has exactly one consumer on the site:
the header's "Contact us" pill — whose every neighbour in the nav, the links,
the dropdown items and the Hindi switch, is `text-sm`. A 12.8px label sitting
beside 14px ones was a difference nobody had decided. Now `text-sm`.
Screenshotted at 1440, 1024, 768 and 390; the capsule absorbs the extra
width.

### The colour that could never be reached

`silk.tsx` is vendored, and defaulted `color` to `#7B7481` — a grey belonging
to no palette here. The one caller has always read `--color-primary` from the
stylesheet and passed it, so the default was dead. Deleting it and leaving the
prop optional would only move the problem; the prop is now **required**, so a
future caller cannot silently inherit a wrong hue and the compiler says so.
Not re-defaulted to the token, because this component cannot read CSS custom
properties — the caller is where the palette lives. Verified: the hero canvas
still paints, in primary, with no console errors.

### The 549 KB nobody was loading

`in-center-hemodialysis.png` was retired on 23 Aug 2026 and kept "in case a
future revision wants the photo back". That revision arrived on 12 Sep and
wanted a different photograph (`clinic-consult-kashmir.jpg`), so the file had
spent three weeks as deployed, publicly addressable bytes that no page
referenced. Deleted; `public/images` goes 5.2 MB to 4.7 MB. **No visitor ever
downloaded it** — this is deploy weight, not page weight, and the audit should
have said so. The provenance entry stays, now carrying the one-line
`git checkout` that brings the file back.

### And one thing the polish pass found that the audit had not

Widening the sweep to `/grievance-redressal` — a route the audit had not
included — caught the Grievance Officer's phone number at **22px tall on a
320px screen**, under WCAG 2.2 SC 2.5.8's 24px floor. It is a number a person
in a complaint is meant to dial, sitting in an `<address>` block where it
inherits the line box of the text around it.

The site already had the answer: a `tap-target` utility (44px min-height, the
extra height pulled back out with a negative block margin so text rhythm
survives), used by the same phone number on `/contact` and `/locations`. This
was the copy that did not use it. Now it does, and the address block keeps its
spacing — screenshotted at 320px to confirm.

The three targets still listed by the sweep are links inside sentences, which
SC 2.5.8 explicitly exempts.

### Verified

Production build. Design detector: **0 findings** across `src`, from 1.
axe-core, 21 routes × desktop and mobile: **0 rules violated**. No horizontal
overflow at 320/390/768/1024/1440, no new scroll at 200% text, no console
errors across 21 routes, all 39 internal links resolve, `tsc` and
`eslint src` clean.

---

## 45. The scrubbed scenes were shorter than one flick of a touchpad (12 Sep 2026)

**Where:** new `src/components/motion/scrub.ts`; `access-geometry-hero.tsx`,
`two-paths.tsx`, `silhouette-edge.tsx` use it.

Reported by the client: scrolling "severely spikes the speed and completes
half of the animation from the smallest of movements". Three earlier readings
of the complaint were wrong, and the record of that matters more than the fix.

### What was checked first, and found innocent

| Hypothesis | How it was tested | Result |
|---|---|---|
| The audit fixes shortened pages | Rebuilt HEAD in a second worktree, measured both | `/byotalks`, `/`, `/news`, `/contact` **identical**; the rest taller |
| Page height changes during scroll | Stepped 200px at a time, watched `scrollHeight` | No change, no drift, any page |
| A scroll library or `scroll-behavior` | Grep + computed styles on three routes | None. All browser defaults |
| The scrub maths | Sampled `--p` every 50px | **Exactly linear**, worst step == average |

Every one of those was a real possibility and every one was wrong. The site
was behaving correctly at each of them.

### What it actually was

The reader's own input, measured on their machine with a bare HTML page:

```
zoom                    100%      <- fine
median wheel event        15px    <- fine, a precision touchpad
LARGEST single event     785px    <- one inertial flick
peak rate               6133px/s
```

Against the scrub ranges:

```
silhouette edge          550px    <- SHORTER than one wheel event
access-geometry stack    700px    <- shorter than one wheel event
two paths               1300px
```

**A single wheel event could deliver more scroll than an entire animation.**
`--p` was written straight from the scroll offset, so the scene went 0 -> 1
between two frames. Not a spike in the animation: a cut, correctly rendering
a gesture larger than the whole range.

The silhouette edge is the one that made this site-wide. It ships on **every
page** and has the shortest range of the three, which is why `/byotalks` —
with no pinned bands and a byte-identical height to HEAD — still felt wrong.

### The fix, and the option not taken

`--p` becomes a target that the written value chases, exponentially and
**framerate-independently** (`1 - e^(-dt/tau)`, tau 200ms). A fixed per-frame
fraction is the usual version of this and runs at double speed on a 120Hz
display — a bug a laptop never shows you. Same device as GSAP's
`scrub: <seconds>`, and the same reason that option exists there.

**Lengthening the tracks was rejected.** The tracks are pinned, so scroll room
is time the page holds content still — and the client had already objected to
the page "ramping up in certain areas", which is the edge of exactly those
held bands. Lengthening trades one complaint for a worse one. This costs no
page height at all.

Three details that are not incidental:

- **The first value is never eased.** A reload that restores scroll, a deep
  link or the back button must find the scene already on the right frame.
- **Resize jumps rather than eases**, or re-measuring reads as the scene
  drifting on its own.
- **`dt` is clamped to 64ms**, because a backgrounded tab hands back one
  enormous delta and an unclamped step would resolve the whole gap in a single
  frame — reintroducing the cut this exists to remove.

Only `--p` eases. `--mx` on the silhouette edge tracks the pointer, which is
already continuous and has no bursts to absorb.

### Verified

Production build. Replaying the client's own 785px event:

| Scene | `--p` after one frame | Settles |
|---|---|---|
| access-geometry stack | 0.003 (**was 1.000**) | ~0.6s |
| silhouette edge | 0.000 (**was 1.000**) | ~0.74s |

`prefers-reduced-motion: reduce` still lands on `--p: 1` with no easing and an
unpinned Home; no console errors in either motion mode across `/`, `/byotalks`
and `/locations`; `tsc` and `eslint src` clean.

---

## 46. Prerendered pages were being re-rendered on every request (12 Sep 2026)

**Where:** `open-next.config.ts`, and a correction to `wrangler.jsonc`.

Started as "Cloudflare is firing 22 errors". The errors were the symptom; the
cache was the disease.

### The 22 errors

All `exceededResources`, all on 11 Sep, in two bursts sixteen minutes apart
(19:30 and 19:46 UTC). Not since. **Not CPU** — they used LESS CPU than the
successes beside them (13-18ms against 35ms) and died inside 130ms of wall
time, which is the 128MB isolate memory ceiling under concurrency.

### What was actually wrong

```
11 Sep, zone-wide:   1,333 requests
  served from cache:   270  (20%)
  ran the worker:    1,063  (80%)
```

On a site where **all 48 content routes are prerendered at build time**. The
live headers said it outright:

```
x-nextjs-prerender: 1      <- built at compile time
x-nextjs-cache: MISS       <- re-rendered anyway, every request
```

One sampled request spent **459ms of CPU** rendering a page that had not
changed since the build; hourly means reached 561ms.

### The comment that was wrong, and why it read as right

`open-next.config.ts` said: *"every content route is statically prerendered
... There's no ISR revalidation to cache, so the default is sufficient."*

The premise holds. The conclusion does not. **"No ISR to revalidate" is not
"nothing to read."** App Router routes are served through the worker rather
than as flat files, because one URL must answer with HTML or an RSC payload
depending on request headers — which is what the `Vary: rsc, next-router-*`
on every response is for. So the worker runs on every page view, and with no
incremental cache it had no store to read the prerendered output from. It
rendered the page again.

This is a deviation-30 failure with a twist: not stale prose describing
changed data, but **reasoning that was sound locally and false in production**,
where nothing in the dev loop shows a cache header.

### Fix

`staticAssetsIncrementalCache`. Its own documentation is the argument: "should
only be used for applications that do NOT want revalidation and ONLY want to
serve prerendered data." It reads from assets already uploaded beside the
worker — no bucket, no namespace, no binding, no bill. R2 or KV would be the
answer the day a route adopts ISR; today they would be infrastructure serving
a cache that never invalidates.

**If a route ever adopts ISR this must change.** The adapter cannot write, so
a revalidating route would serve its build-time copy forever. The trade is
deliberate and safe only while spec 12.1 holds.

### Verified

`opennextjs-cloudflare build` + `populateCache local` wrote 45 cache entries to
`.open-next/assets/cdn-cgi/_next_cache`. Against the built worker on wrangler:

| Route | before | after |
|---|---|---|
| `/` | MISS | **HIT** |
| `/innovation/how-it-works` | MISS | **HIT** |
| `/byotalks` | MISS | **HIT** |
| `/about-us/leadership` | MISS | **HIT** |
| `/products/the-x1-cycler` | MISS | **HIT** |

`deploy`, `upload` and `preview` all call `populateCache` themselves, so the
existing npm scripts carry this with no change. **A plain `wrangler deploy`
would not** — it skips the populate step and the cache would silently miss.

### Also corrected

`wrangler.jsonc` warned about the Free plan's 10ms CPU ceiling. This worker is
not on it — requests routinely spend 50-500ms and succeed, and every one would
have returned 1102 on Free. The note is kept, because 459ms to serve a
prerendered page is unhealthy on any plan, but it no longer tells the next
reader the wrong thing. The outcome to watch is `exceededResources`, not
`exceededCpu`.

### Not fixed here, because it is not code

The load included a scraper on Tencent Cloud (AS132203, `zh-CN`, a spoofed
2019 iPhone UA, plain HTTP) sending `cache-control: no-cache` — which
guarantees a full re-render when there is no store. Edge caching of HTML, Bot
Fight Mode and Always-Use-HTTPS are dashboard settings on a Free zone and are
the client's to apply.

---
