---
version: 1
slug: "src-app-innovation-the-x1-cycler-page-tsx"
primary_target: "src/app/innovation/the-x1-cycler/page.tsx"
related_targets: ["src/components/innovation/x1-hero.tsx","src/components/innovation/x1-spec-table.tsx","src/components/innovation/x1-regulatory.tsx"]
---

## Scope & mode

`/innovation/the-x1-cycler/` (spec §9.2), Persuade — but a sober one. The device page, and the **content template** the remaining §9.2/§9.4/§9.5 pages compose from (spec §15 Phase 1 names it as one of the six screens to design). Primary audiences are clinicians (Priority 3, who want the IFU and the numbers) and investors (Priority 1, who want to know exactly what is cleared, by whom, and where). Patients reach it from Home's hero CTA, so the patient-facing register has to survive on the same page without blending into the clinician register (PRODUCT.md principle 2).

## Audience, job, action, proof

- **Job:** show what the X-1 actually is and what is actually confirmed about it, without a single claim the project cannot stand behind.
- **Action:** request the IFU and technical documentation (clinician), or read on into the India argument (investor).
- **Proof:** the four named features, the specification table, the FDA 510(k) clearance attributed to Byonyks USA, the licensing relationship, and — load-bearing — the four visible pending markers.
- **Constraint:** no invented specification. No dimension, weight, fill volume, battery runtime or K-number exists in this project's materials, and inventing any of them on a cleared medical device is a labelling exposure (spec §12.8.5, §14.2), not a placeholder.

## Chosen direction

**Show the gaps.** The page's argument is that a specification table with four marked-pending rows is *more* credible to a nephrologist or an investor than a complete-looking one, because those readers can tell the difference. That is the same instinct §9.7 applies to the news scaffolds ("an empty section must look deliberate, not broken") applied to a spec sheet.

Home's token system, spent flatter. Ink at only the two permitted full-bleed moments (hero, closing mass) — Home's silk shader is deliberately *not* reused, since that is Home's one authored focal moment. Primary blue is the sole chip color on the four feature cards.

**Section order:** what it is (hero) → what it does (features) → what is confirmed (specification) → where it stands legally, twice (regulatory) → what a clinician can ask for (IFU) → where to read next (siblings) → contact (shared CTA band). Surfaces alternate ink → background → surface-2 → background → surface-2 → background → ink, so no two adjacent sections share a ground.

**Color decisions, against DESIGN.md's Wayfinding Rule:**
- Feature cards: all four chips primary blue. None of the fixed accent meanings (gold = home/India, teal = clinical evidence, plum = institutional) actually fits "battery backup" or "warms fluid," and borrowing one because a four-up grid looks better in four colors is precisely what that rule exists to stop.
- Regulatory: primary for the US clearance (the mapping Home's proof band set), **plum for India** — CDSCO under the Medical Device Rules is institutional/formal, which is plum's own assigned meaning, not a borrowed one.
- Pending amber does real work here for the first time: three rows in the specification table plus one note in each regulatory card.

**Reuse extracted for the second page** (Home was the only surface before this one, so several system-level pieces were still living in `components/home/`):
- `ScrollReveal` → `components/motion/`
- `PendingStat` → `components/common/pending-note.tsx`, generalized to `PendingNote` with a `note` prop (three pendings on this page are not statistics)
- `CtaBand` → `components/sections/`, parameterized with defaults that leave Home byte-identical
- New: `components/layout/breadcrumbs.tsx` (spec §7.2 + §11.2, visible trail and `BreadcrumbList` in one place), `lib/claims.ts` (every regulatory and licensing sentence, written once), `components/common/direction-contract.tsx`
- The Home direction contract moved out of the root layout into `app/page.tsx`; it was being emitted on every route the moment a second page existed.

## Unresolved / flagged in the build

- **India regulatory position** — genuinely open (Open Questions 1.6, CDSCO authorised agent). Shipped as an explicit statement of what is not yet settled plus a pending note, in `lib/claims.ts` so the eventual legal wording is a one-file edit. **Needs legal review before launch (spec §14.4).**
- **510(k) number** — spec §9.4 says to publish it; nobody has provided it. Marked pending in the US regulatory card.
- **Battery runtime, dimensions and weight, fill volume range and cycle programming** — not published by Byonyks USA. Marked pending in the specification table rather than estimated.
- **Licensing lockup** — the page uses the gated wording ("licensed to bring the X-1 to India"), never "official licensing partner," which still needs Byonyks USA's written approval (spec F-6, PRODUCT.md launch gate). The gate is documented at the top of `lib/claims.ts`.
- **Device imagery** — the Byonyks product render, the only real asset that exists, captioned as a render in both the hero and the Open Graph image. No photography of the physical device exists (`public/images/README.md`).
- **`/innovation/` breadcrumb has no link** — the hub is not built. The crumb renders as text and is omitted from the `BreadcrumbList` `item` rather than pointing at a 404. Add `href` when the hub ships.
- **`/innovation/how-it-works/` and `/innovation/market/`** — linked from "Keep reading" per spec §11.2's two-siblings rule; both 404 until built, the same state as every nav item.
- **`/contact?enquiry=clinician`** — the query parameter is inert until the contact form exists (§9.8), then it pre-selects the enquiry type.
- **Colour system scope** — the open decision Home's brief left for "whoever builds the next surface" is now **resolved: sitewide.** DESIGN.md's Wayfinding Rule already stated accent meanings are fixed sitewide; this page applies them under that rule rather than reopening it. Recorded in `deviations.md`.
- **Footer and header nav link hit areas** measure 19px tall sitewide — under the 24px floor, and outside this page's scope. Flagged for a sitewide pass, not fixed here.
