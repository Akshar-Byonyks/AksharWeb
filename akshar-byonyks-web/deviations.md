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
