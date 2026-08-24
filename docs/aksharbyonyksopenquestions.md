# Akshar Byonyks Website: Open Questions That Will Stop Work (reconstructed)

**Status: reconstruction, not the original document.**

> **Read this before using the file.** The website spec (`aksharbyonykswebsitespec.md`) cites a companion document by this exact title roughly two dozen times — as "F-1" through "F-7," and as numbered items like "Open Questions 1.4" or "Open Questions 2.3" — but that companion file was never provided into this repo. Only the main spec exists here.
>
> This file was **assembled entirely from those citations**, then progressively resolved through direct client decisions starting 20 August 2026 (see the log below). It is not a copy of a real document, because no real document was available to copy. Two consequences follow:
>
> 1. **The F-1 through F-7 findings are faithful** — that content is written out in full in the main spec (its lines 145–205) and is reproduced here essentially as-is, not reconstructed from fragments.
> 2. **The numbered "Tier 1" / "Tier 2" items are partial.** The main spec cites specific numbers (1.1, 1.3, 1.4, 1.5, 1.6, 1.8, 2.1, 2.3, 2.4, 2.5, 2.8) with enough surrounding context to reconstruct what each one asks. Numbers implied by the sequence but never cited (1.2, 1.7, 2.2, 2.6, 2.7, and anything past 1.8 / 2.8) are listed as **gaps** — known to exist, content unknown. Nothing has been invented to fill them.
>
> **If the real document exists** — in email, a shared drive, or someone's notes — replace this file with it and delete this one. Treat this reconstruction as a working scaffold for Phase 0.2, not a source of truth equal to the original.

---

## Decisions confirmed 20 August 2026

Resolved directly by the client, folded in below. Full detail under each item; summary here for a fast read.

| Item | Decision | Still needed |
|---|---|---|
| **F-1** (Pakistan attribution) | Attribute to Byonyks, not to a country (option 1, recommended) | — resolved |
| **F-2 / 2.1** (US office) | No US office listed; name Byonyks USA as licensor | Whether the legal footer needs a separate US registration/incorporation note — open |
| **F-3** (routing email) | Build as a configuration value, not hardcoded | — resolved |
| **F-4** (ByoTalks) | Keep as scoped. Phase 3 enhancement plan must be presented for review **before** implementation begins | When to draft that plan (now vs. closer to Phase 3) — open |
| **F-5** (Scientific Advisory Board) | Credits-only via ByoTalks speaker credentials, no dedicated SAB page — confirms the existing spec §9.5 rule, no change needed | — resolved |
| **F-6** (licensing paper) | Agreement exists, authorised by the owner of both companies | **Not yet in writing** — currently personal/verbal knowledge only. Spec launch gate item 6 (§14.4) requires written confirmation before launch |
| **F-7** (component library) | Pivot toward ReactBits, sitewide, not just the Careers icon portfolio | Scoping pass against §12.8.3's guardrails — separate piece of work, not resolved by this decision alone |
| **1.1** (India address) | Placeholder for now, don't block the build | Actual placeholder text; **must be replaced before launch** — see note below |
| **1.3** (licence scope) | Confirmed as acceptable | Exclusive/non-exclusive, territory, and product-scope specifics not yet given |
| **1.5** (Byonyks USA written approval) | Approved by the owner | Same gap as F-6 — approval is real but undocumented |
| **2.3** (Hyderabad/Ahmedabad function) | Construction underway | Explicitly **still open** — no confirmed completion date, function not confirmed as manufacturing |
| **2.4** (Investor section) | **Cut**, decided 20 Aug 2026 during Impeccable `init`. Market case folds into `/innovation/market/`, milestones into `/about-us/our-story/`, "Investor" added to the contact form's enquiry types | — resolved |

**On the 1.1 placeholder:** the client audit's own top defect (P0) is a placeholder phone number, `123-456-7890`, live sitewide including on the FDA press release page. The main spec's launch gate (§14.4 item 3) bars placeholder contact details at launch. Whatever placeholder address goes in now should be treated the same way — fine for continued building, not fine to ship. Flag it visibly in code (e.g. a `// TODO: real address, blocks launch gate 3` comment) so it can't ship by accident.

**On F-6/1.5, specifically:** the underlying fact (Byonyks USA authorised this) is treated as true for content-writing purposes, but the main spec's launch gate needs something documentable — even a short confirmation email would satisfy it. Getting that in writing is now a Phase 0 action item, not a launch-week scramble.

---

## The five that matter most

Per the main spec's own priority call (§"To unblock Phase 0"), with current status:

1. **F-1: proof attribution**, once the Pakistan operation is removed from the site. **Resolved** — attribute to Byonyks.
2. **The India office address.** The client audit's line for it is truncated. **Placeholder in use**; real address still needed before launch.
3. **The five executive names, bios and portraits** for `/about-us/leadership/`. **Still fully open.**
4. **The X-1's CDSCO status and the authorised agent** — who holds the import licence in India. **Still fully open.**
5. **Byonyks USA's written approval** for use of its name, marks and FDA clearance reference. **Substantively yes, not yet in writing.**

---

## F-1 through F-7: findings written in full in the main spec

These are not reconstructed — they're carried over from the main spec verbatim in substance, since that document actually contains them in full (unlike the numbered Open Questions below).

### F-1. Removing Pakistan removes the proof — **Resolved 20 Aug 2026**

**Decision: option 1.** Attribute to Byonyks, not to a country. Client note: the resulting "coming soon" cards for Hyderabad and Ahmedabad are known to look unpolished, but construction on both facilities is already underway and this state is expected to be short-lived — no confirmed completion date yet (see Tier 2 item 2.3, still open).

**The most important item in the whole set of open questions.**

The instruction is "get rid of Pakistan office" — understood, and there are sound commercial reasons for an India-market entity to do that. But nearly every substantive proof point on byonyks.com originates in the Pakistan operation:

| Asset | Origin | Status if Pakistan is removed |
|---|---|---|
| ISO 13485 certified factory, established 2021 | Punjab, Pakistan | Cannot be shown as an Akshar Byonyks facility |
| 10,000+ successful therapies delivered | Pakistan deployment | Cannot be attributed without naming where |
| R&D facility | Lahore, Pakistan | Removed |
| "From Blueprint to Breakthrough" imagery | Pakistan factory | Unusable |
| Manufacturing and assembly photography | Pakistan factory | Unusable |
| BBC segment | Filmed in the region | Needs checking |

Net effect: the Manufacturing page has no operating facility to show. It becomes two "coming soon" cards for Hyderabad and Ahmedabad. In front of a priority-one investor audience, a manufacturing page with no manufacturing is worse than no manufacturing page at all.

**Resolution, as decided:** "Manufactured at Byonyks' ISO 13485 certified facility." "Over 10,000 therapies delivered using Byonyks technology." True, verifiable, never names Pakistan, preserves every proof point.

**What will not happen:** re-badging a Pakistani facility as Indian. That is a factual misrepresentation on a medical device site and would not survive a CDSCO enquiry, a diligence process, or a journalist with ten minutes.

### F-2. A home address as the US office — **Resolved 20 Aug 2026**

**Decision:** no US office listed — a home address as a corporate office is a privacy breach. Name Byonyks USA as the licensor instead. Open sub-question: whether a US registration/incorporation detail (distinct from an "office") still belongs in the legal footer — not yet answered.

The client audit says to list Vishnu's home address as the US office.

- **Credibility.** Priority-one audience is investors. A residential address listed as a corporate office is among the first things a diligence process checks, and it is trivially verifiable.
- **Personal exposure.** Publishing a private residential address makes it permanently indexed and scrapeable, attached to a named individual.
- **Consistency.** Why does an India-specific entity list a US office at all? If the reason is US registration, that belongs in the legal footer, not as an office on the contact page.

### F-3. One email address for four audiences — **Resolved 20 Aug 2026**

**Decision:** confirmed — build the form so the routing address is changeable later, per the spec's existing recommendation.

Routing everything to `vishnu@aksharbyonyks.com` is fine for launch and is specified that way.

- Build the form so the routing address is a **configuration value, not hardcoded.** Adding `patients@`, `clinical@` and `partners@` later then costs five minutes.
- Keep the enquiry-type field regardless, so the subject line arrives pre-classified and the inbox stays sortable.

### F-4. Keeping ByoTalks as-is leaves value on the table — **Resolved, with a new process requirement**

**Decision:** keep ByoTalks as scoped. New requirement: before any Phase 3 ByoTalks enhancement work (transcripts, topic filtering, related-sessions rail) begins, present a plan for review first. Not yet decided whether that plan should be drafted now or closer to when Phase 3 actually starts.

Specified as instructed. For the record: the eight sessions are the most differentiated content asset in the group. Captions are required anyway under WCAG 2.1 AA, and once captions exist, transcripts are nearly free and become indexable long-form clinical content that no competitor in the Indian market has. Moved to Phase 3 as optional rather than removed.

### F-5. Removing the Scientific Advisory Board — **Resolved 20 Aug 2026**

**Decision:** credits-only. The SAB names stay off a dedicated page and continue to surface as speaker credentials inside ByoTalks — this confirms the main spec's existing §9.5 rule ("No SAB page, no Board page") rather than reversing it.

The audit specifies executive team only. The consequence is that nine named nephrologists — including Isaac Teitelbaum, Madhukar Misra, Anjali Saxena, Simon Davies and Fredric Finkelstein — no longer appear anywhere. For the clinician audience, those names are the credential that opens a conversation.

**Cheap middle path (already reflected in the main spec's §9.3):** keep the five-person leadership page exactly as instructed, and surface the advisory names inside ByoTalks, where they appear naturally as session speakers with their credentials. No extra page, no roster, credibility retained at zero cost.

### F-6. "Official licensing partner" needs paper behind it — **Substantively resolved, formally open**

**Decision:** the agreement exists; authorised by the owner of both companies. **Not yet documented** — currently personal/verbal knowledge, not something that can be pointed to. This is the same gap as Tier 1 item 1.5 below, and directly blocks main spec launch gate item 6 (§14.4) until something written exists.

Before that claim goes live: confirm the executed agreement exists and that the site wording matches it (exclusive or non-exclusive, territory, product scope — see 1.3 below, also not yet fully specified); confirm Byonyks USA approves use of its name, marks and FDA clearance reference in writing; confirm who is the CDSCO authorised agent (see 1.6, still open).

### F-7. 21st.dev components — **Direction decided, scoping still needed**

**Decision:** pivot toward ReactBits components, and not narrowly scoped to the Careers icon portfolio — a broader sitewide pass. Not yet done: the actual scoping work. Note for that pass: reactbits.dev is mostly animated text/background effects (the Silk and ScrollStack components already parked in `design-system/components/` are examples), not an icon-portfolio library like 21st.dev — so the Careers icon-grid use case specifically may still need a different source, while the "look and feel" pass elsewhere on the site is where ReactBits actually fits. This needs to go through the same guardrails already established in main spec §12.8.3 (client-boundary discipline, `prefers-reduced-motion`, never on patient/clinical/regulatory pages) on a per-component basis — treated as its own follow-up task, not resolved by this decision alone.

The 21st.dev icon portfolio is React and Tailwind, which as of spec v0.5 is the native stack, so the integration friction earlier versions flagged is gone.

Two things still apply: render it as a Server Component if it has no interactivity, so it ships no JavaScript even though it is a React component (only mark it `"use client"` if it genuinely animates on interaction), and confirm the licence on each component before shipping — the tooling notes flag 21st.dev licensing as inconsistent per component, and this is a commercial medical site.

---

## Tier 1: regulatory and content blockers

Numbered `1.x` in the main spec's citations. These gate specific pages or launch-gate items directly.

### 1.1 The India office address — **Placeholder approved, real address still required before launch**

**Decision:** use a placeholder for now and continue building; don't let this block engineering. Actual placeholder text not yet specified. **Must be replaced with a real address before launch** — see the note in the decisions log above.

Cited at main spec §9.8 ("India office blocked on Open Questions 1.1, address truncated in the audit") and §9.4's contact table. The client audit contains a line for this but it's truncated in the source material — the actual address was never captured. Needed for the Contact page and any registered-office disclosure. Part of launch gate item 4.

### 1.2 — gap

Never cited anywhere in the main spec. A `1.2` slot is implied by the sequence (1.1, then 1.3) but nothing about its content survives in any citation. Unknown.

### 1.3 Licence agreement scope — **Confirmed as acceptable; specifics still needed**

**Decision:** confirmed. Not yet specified: whether the agreement is exclusive or non-exclusive, the territory it covers, and the product scope (X-1 only, or the X2/X3 roadmap too). These are the actual terms that need to end up in site copy — "confirmed" alone isn't enough to write the licensing-lockup wording accurately.

Grouped with 1.5 and 1.6 under F-6. This is the paper behind the "official licensing partner of Byonyks USA" claim.

### 1.4 The five executives — **Still fully open**

**Status: blocked, launch gate.** Cited at main spec §9.5 ("Blocked on Open Questions 1.4. Launch gate.") and in the risk table ("Five executives not identified. High. Launch gate. Investor-first with no named team is not credible."). Needed: name, bio (150–250 words), and portrait for each of the five, with a consistent backdrop/crop/lighting treatment. Part of launch gate item 4.

### 1.5 Byonyks USA's written approval — **Substantively resolved, formally open**

**Decision:** approved by the owner. Same documentation gap as F-6 — this is currently verbal/personal knowledge, not something written down. This is launch gate item 6 in the main spec's §14.4, and that gate specifically requires it "in writing."

### 1.6 The CDSCO authorised agent — **Still fully open**

Cited at main spec §14.2: "Who is the CDSCO licence holder? Under the Medical Device Rules 2017, an imported device requires an import licence (Form MD-14 application, Form MD-15 licence) held through an Indian authorised agent holding a manufacturing or wholesale licence. Establish whether Akshar Byonyks is that agent. Every regulatory statement on the site depends on the answer."

### 1.7 — gap

Never cited anywhere in the main spec. Unknown.

### 1.8 Statistics sourcing for the India argument — **Still fully open**

**Status: open, longest-running task in Phase 0.2.** Cited at main spec §3.3: "Four legs. Each needs a sourced, dated number before it ships." The four legs, per that section:

1. **Scale** — India's CKD and ESKD burden, new dialysis starts per year, the gap between patients who need dialysis and patients who get it.
2. **Access geometry** — in-centre haemodialysis means roughly three trips a week to a facility; home PD removes that trip. Flagged in the main spec as the strongest single argument in the Indian market, and one byonyks.com barely makes.
3. **Cost and coverage** — out-of-pocket burden, the Pradhan Mantri National Dialysis Programme, Ayushman Bharat PM-JAY coverage, state schemes. Every number needs a date and a source since reimbursement policy changes.
4. **Modality mix** — India's PD share of dialysis versus comparable countries. The Guatemala 56% comparison from the current site is flagged as a good rhetorical device worth keeping if it can be sourced.

---

## Tier 2: business and positioning decisions

Numbered `2.x` in the main spec's citations. These are choices the client needs to make, not facts to be gathered.

### 2.1 The US office — **Resolved 20 Aug 2026** (see F-2 above)

No US office listed; Byonyks USA named as the licensor.

### 2.2 — gap

Never cited anywhere in the main spec. Unknown.

### 2.3 Function of the Hyderabad and Ahmedabad hubs — **Still open**

**Explicitly confirmed still open** alongside the F-1 decision: construction is underway on both, but there's no confirmed completion date and their function isn't confirmed as manufacturing yet. This matters beyond copy — whether they end up as manufacturing vs. R&D vs. something else determines which CDSCO licence route applies (Form MD-3/MD-5 via the State Licensing Authority for lower-risk classes, Form MD-7/MD-9 via the Central Licensing Authority for higher, per §14.2). They should not be described as manufacturing facilities before this is confirmed.

### 2.4 Investor section: build or cut — **Resolved 20 August 2026: cut**

Decided during the Impeccable `init` interview for `akshar-byonyks-web/PRODUCT.md`, since the frontend build was already mid-work on the primary nav and needed an answer. No `/investors/the-opportunity/` or `/investors/milestones/` pages ship; the primary nav stays five items, not six. The market case folds into `/innovation/market/`, the milestones fold into `/about-us/our-story/`, and "Investor" is added to the contact form's enquiry types — nothing is lost except prominence. See main spec §9.6, now updated to match.

### 2.5 Language: English only, or Hindi too — **Still fully open**

**Status: assumed default, pending confirmation.** Main spec §12.6: "Assumed default pending Open Questions 2.5: English at launch, architecture ready for more." The build proceeds either way with `next-intl`, a Devanagari font subset from day one, and a hidden language switcher, so confirming this later doesn't cost a rebuild — only translation and review time.

### 2.6 — gap

Never cited anywhere in the main spec. Unknown.

### 2.7 — gap

Never cited anywhere in the main spec. Unknown.

### 2.8 Domain registrant and DNS control — **Partially resolved**

**Status: partially resolved.** Main spec §12.7.1: `aksharbyonyks.com` is registered and live, with working Google Workspace email — that resolves the domain half. What's still open: confirming **who the registrant of record is** and obtaining DNS control, before any DNS migration to Cloudflare (which must follow the MX-preservation procedure in §12.7.3, or `vishnu@aksharbyonyks.com` goes down along with every enquiry path on the site).

---

## Exit criteria

Quoted directly from the main spec, §"Phase 0: Discovery and decisions":

> **F-1 resolved, Tier 1 and Tier 2 questions closed, statistics sourced, counsel engaged, domains secured.**

F-1 is now resolved. Statistics (1.8), counsel engagement, and full domain security (2.8) remain open, along with several Tier 1/Tier 2 items above — see the decisions log for the current count.

The "Tier 1 and Tier 2" phrase is the main spec's own language — this reconstruction's two-tier structure is built to match it, not the other way around.

---

## Gaps, summarised

Five numbered slots are implied by the citation sequence but never referenced anywhere in the main spec: **1.2, 1.7, 2.2, 2.6, 2.7.** There may also be items beyond 1.8 and 2.8 in the original that nothing in the main spec ever needed to cite. None of that content has been guessed at here. If the real document turns up, that's where it will fill in what this reconstruction can't.
