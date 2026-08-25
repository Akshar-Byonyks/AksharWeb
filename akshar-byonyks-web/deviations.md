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
