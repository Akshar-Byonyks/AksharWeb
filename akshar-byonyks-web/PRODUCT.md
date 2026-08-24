# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Four audiences, priority-ordered. Priority shapes emphasis and design register, not exclusion — every audience gets a real path, but investor and patient needs win contested design decisions.

1. **Investors and partners (Priority 1).** Need market size with sources, licensing scope, regulatory status and what remains open, supply chain reality, traction, leadership credibility, what the capital does. They read fast and distrust marketing language — content for them is denser, more numeric, more sober than the rest of the site: dated sources, footnotes, tables. Convert via an enquiry pre-classified by type, routed to `vishnu@aksharbyonyks.com`.
2. **Patients and caregivers (Priority 2).** Need plain-language explanation of peritoneal dialysis, what a day on PD looks like, whether they're a candidate, cost and coverage, training and support, a visible phone number. Majority mobile, often bandwidth-constrained, frequently older, often reading in a second language under stress — large type, high contrast, short paragraphs, no autoplay. Public communication is constrained by India's Drugs and Magic Remedies (Objectionable Advertisements) Act 1954: educational only, no outcome promises, always routes treatment decisions to a physician.
3. **Nephrologists and clinics (Priority 3).** Need device specs and IFU, clinical evidence, ByoTalks, training/onboarding, service commitments, and consumables supply reliability — the #1 clinician objection to a new PD supplier, and one the current site doesn't address at all. Need a named contact.
4. **Distributors and governments (Priority 4).** Need corporate credentials in a form that pastes into a tender response — print-optimised, so it can become a PDF attached to a bid.

## Product Purpose

Akshar Byonyks International LLC is the official India licensing partner of Byonyks USA, bringing Byonyks' FDA-cleared (510(k), granted May 2025) X-1 automated peritoneal dialysis cycler to the India market. The site (`aksharbyonyks.com`) exists to establish Akshar Byonyks as a credible entity, generate qualified investor and patient enquiries, and become a reference source on home PD in India — while staying legally clean under India's DPDP Act 2023 from day one (privacy policy, consent capture, and a named grievance officer live at launch, non-negotiable).

## Positioning

Akshar Byonyks holds the licence to bring Byonyks' FDA-cleared home dialysis technology to India — Indian company, Indian team, Indian market, proven global technology. This is a licensing relationship, not ownership of the clearance or the manufacturing: **Byonyks USA holds the FDA 510(k) clearance**, and Akshar Byonyks may never be described as the manufacturer unless and until it manufactures.

The mechanism a neighboring product could not truthfully copy: the licensed relationship to Byonyks' already-FDA-cleared APD technology, positioned against India's access-geometry problem. In-centre haemodialysis means roughly three trips a week to a facility — travel time, lost wages, often no facility within reach. Home PD removes the trip. This is the strongest single argument in the Indian market, and the US parent's own site barely makes it.

## Operating Context

- **Scope is India only.** No global section, no regional pages, no international-expansion narrative. `byonyks.com` (the global US property) is out of scope and untouched.
- New domain, greenfield build on `aksharbyonyks.com`. Content approach is **migrate-and-edit, not write-from-scratch** — roughly half of `byonyks.com`'s existing corpus is reusable once rebased on India.
- **Nothing is gated:** no login, no data room, no auth layer, in any phase.
- **Manufacturing has no operating India facility to show yet.** Hyderabad and Ahmedabad hubs are under construction with no confirmed completion date. The Manufacturing page runs two "coming soon" cards plus an attributed claim ("Manufactured at Byonyks' ISO 13485 certified facility," "Over 10,000 therapies delivered using Byonyks technology") — resolved finding: attribute to Byonyks generically, never to a country.
- **Investor section: cut** (decided 20 Aug 2026, this session). No `/investors/` pages, no sixth nav item. The India market case lives permanently in `/innovation/market/`, the milestone timeline in `/about-us/our-story/`, and "Investor" becomes one of the contact form's enquiry types once that form is built.

## Capabilities and Constraints

- **Stack (existing codebase):** Next.js 15 App Router, Tailwind v4, shadcn/ui component layer, deployed to Cloudflare Workers via the OpenNext adapter. Content routes are statically prerendered at build time.
- **Regulatory precision, non-negotiable:** never state or imply Akshar Byonyks holds the FDA clearance (correct construction: "the X-1 cycler, cleared by the US FDA under 510(k)," attributed to Byonyks); never imply FDA clearance authorises sale in India (state the Indian regulatory position separately); never describe Akshar Byonyks as the manufacturer unless/until it manufactures. One consistent formulation of the licensing relationship, reused everywhere — not redrafted per page.
- **CDSCO authorised-agent status is still open.** Every regulatory statement on the site depends on the answer (Medical Device Rules 2017 import licence, Form MD-14/MD-15).
- Licence itself is confirmed as existing and acceptable, but exclusivity, territory, and product-scope specifics (X-1 only vs. the X2/X3 roadmap) are **not yet given** — needed before the licensing-lockup wording can be written precisely.
- The **"Official licensing partner of Byonyks USA"** claim (the licensing lockup) needs Byonyks USA's **written** approval before it can go live — currently verbal/personal knowledge only. Named launch-gate item; do not ship the claim without it.
- **DPDP Act 2023:** Phase 1 does not store form submissions at rest beyond email (lowest-risk posture, fewer obligations held).
- **Drugs and Magic Remedies (Objectionable Advertisements) Act 1954:** patient-facing copy must be educational, must not promise outcomes, must route treatment decisions to a physician.
- **WCAG 2.1 Level AA is the accessibility target, non-negotiable** — see Accessibility & Inclusion below.
- No unsourced statistics ship, ever. Every device claim ties to what is actually cleared and licensed. No outcome guarantees, no unsubstantiated superlatives.
- No numeric performance budget gates the Phase 1 build (deferred to a dedicated post-frontend performance pass, explicit client decision) — but performance-conscious defaults (bundle discipline, Server Components by default) stay in force regardless, because the patient audience carries the cost of every unnecessary kilobyte of JavaScript.
- **Still fully open, do not fabricate:** the five India executives (names, bios, portraits) for the Leadership page; the India office street address (a flagged placeholder is in use, must be replaced before launch); sourced and dated statistics for the India market case (scale, access geometry, cost and coverage, modality mix); the CDSCO authorised-agent answer.

## Brand Commitments

- Name: **Akshar Byonyks International LLC.** Tagline, from the delivered logo: "Transforming Renal Care Through Breakthrough Peritoneal Dialysis Innovation."
- Logo delivered by the client 20 Aug 2026; the file itself is not yet saved into the repo (arrived as a chat attachment with no extraction tool available in that session) — see `design-system/brand/README.md`. Mark: a globe with India highlighted in gold, wrapped by a gold ring, an "AB" monogram with a red kidney icon, gold-and-blue script wordmark.
- **Colour system:** primary blue inherits `byonyks.com`'s hue (202°) and saturation but is darkened to `#0d5d8d` to clear WCAG AA (the source site's `#1388cd` only reaches 3.87:1). Gold (`#b08d2f`) was added as a single restrained accent — large display type and non-text graphics only, never body text — filling the brand spec's "India-specific accent" requirement, since the logo's gold already does that job by highlighting India on the globe. The kidney red stays confined to the logo icon and does not enter the UI token system — it would collide with the destructive/error token and read as alarm on a patient-facing medical site. Full token table and reasoning: site spec §6.1 and `design-system/brand/README.md`.
- **Typography:** Noto Sans for both display and text roles, Devanagari subset included from day one even though Hindi isn't launching yet — one self-hostable family rather than two.
- **Tone, three registers, one voice:** investor content is precise, numeric, sourced. Patient content uses short sentences, everyday words, second person, and never uses "modality" without explaining it. Clinician content is technically exact, peer-to-peer, no marketing adjectives. Sitewide: no unsourced statistics, no outcome guarantees, no unsubstantiated superlatives.

## Evidence on Hand

- FDA 510(k) clearance for the X-1 automated peritoneal dialysis cycler, granted to Byonyks USA, May 2025 — third company to clear an APD cycler in the US.
- Founder story: Farrukh Usman's aunt was on dialysis, his mother carries diabetes risk — the origin of the desire for pain-free home treatment. Migrating with an added India-and-licensing chapter.
- ByoTalks: eight sessions with named nephrologists. Captions are a hard accessibility requirement, not an enhancement.
- Milestone timeline, described as already investor-grade and reusable as written.
- The four-benefit framework (preserves peritoneal membrane integrity, affordability, preserves residual renal function longer, eliminates acid/toxins from dialysate) and the "Patients, Payers, Providers, Producer" framing — both reusable; "Payers" needs reframing for India.
- "62% of US PD machines" and "10,000+ therapies delivered" claims exist but need a sourced footnote before they ship; the therapies figure is attributed to Byonyks generically, never to a country.
- **State explicitly, for future work not to fabricate:** no India office address yet (placeholder only); no confirmed five executives; no sourced India market statistics; no CDSCO authorised-agent confirmation; no written Byonyks USA approval of the licensing-partner claim; no operating India manufacturing facility to photograph or describe.

## Product Principles

1. **Precision over persuasion on every regulatory and clinical claim** — attribution to Byonyks USA is exact and non-negotiable everywhere the FDA clearance, manufacturing, or licence scope is mentioned.
2. **One voice, three registers** — the same underlying facts get denser/numeric treatment for investors, plain/reassuring treatment for patients, technical/peer-to-peer treatment for clinicians. Never blend registers on one page.
3. **Evidence before claims** — no statistic ships without a source and a date; an unsourceable claim gets cut, not softened.
4. **India-specific, not globally diluted** — content that doesn't transfer from the US parent's argument (Medicare economics, US executive orders) gets replaced with India-specific evidence, never kept for volume.
5. **Accessibility is load-bearing, not a compliance checkbox** — WCAG 2.1 AA is driven by a real patient population that skews older with a high rate of diabetes-related visual impairment, so contrast and legibility choices default to the stricter option.

## Accessibility & Inclusion

WCAG 2.1 Level AA, non-negotiable. Patient audience skews older with a high proportion of diabetes-related visual impairment. Constraints future component work must honor: keyboard operability with a visible focus ring at 3:1 contrast minimum; meaningful alt text on content images, empty alt on decorative; captions required on all ByoTalks sessions; persistent visible form labels, never placeholder-only; form field borders 1px minimum; form inputs 16px minimum (prevents the automatic zoom iOS applies to smaller fields); any text over imagery must be scrimmed for contrast; colour is never the sole carrier of meaning; text resizes to 200% without loss of content or function.
