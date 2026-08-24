# Akshar Byonyks: Website Specification

**Version:** 0.7
**Date:** 19 August 2026
**Prepared for:** Samir, and the Akshar Byonyks ownership group
**Supersedes:** v0.6, v0.5, v0.4, v0.3, v0.2, v0.1
**Companion documents:** Akshar Byonyks Website: Open Questions That Will Stop Work (**the original was never provided into this repo — `docs/aksharbyonyksopenquestions.md` is a reconstruction assembled solely from this spec's own citations of it; see that file's provenance note before treating it as authoritative**); byonyks.com Design Token Audit; **Akshar Byonyks Frontend Sketches** (interactive spec-vs-extracted wireframes, 7 screens, built against the 6.1/7.1 tokens below — [claude.ai/code/artifact/955aa280-2262-4294-9a94-f22bb6aa6aea](https://claude.ai/code/artifact/955aa280-2262-4294-9a94-f22bb6aa6aea))
**Source material:** Full parse of byonyks.com (40 pages, 6 templates); the client audit dated August 2026; live computed-style audit of 15 pages dated 12 August 2026; internal AI tooling notes

---

## Changelog: what v0.7 changes

**The `"use client"` governance gate is retired.** v0.5 through v0.6 treated every client component as something that "needs to appear on the 7.2 list or carry a written justification" — an audit-trail requirement layered on top of React Server Components. That was calibrated for a stricter JS-minimization posture than this project actually wants: the stack is a working blend of Next.js, React and Tailwind, and reaching for `"use client"` where a component genuinely needs interactivity is a normal, unremarkable implementation choice, not an exception that has to clear a written bar.

**What does not change:** Server Components are still the App Router's default rendering mode — that is a fact of the framework, not a policy this spec imposes, and nothing here asks anyone to fight it. The 7.2 table of components known to need `"use client"` stays, as a reference of known cases. What is gone is the requirement that every other use of it be justified against that list or written up in the PR.

**What actually changed:**

| Area | v0.6 | v0.7 |
|---|---|---|
| Section 7.2 | "Only these need to be client components," an exhaustive, enforced list; "everything else... ships zero JavaScript" | Reworded: the table is a reference of known cases, not a gate. The zero-JS framing is dropped as something to defend. |
| Section 12.8.1, rule 4 | "Every `use client` is a bundle decision. It needs to appear on the 7.2 list or carry a written justification." | Removed. Use `"use client"` where a component needs it. |
| Section 12.9, item 1 | "Nothing gets `use client` unless it appears on the 7.2 list or carries a written justification in the PR." | Reworded to a default, not a gate. |
| Phase 0.1 `CLAUDE.md` rule | "`use client` requires justification against the 7.2 list." | Removed. |
| Section 16 risk table | Mitigation named "the 7.2 client-component list" as a standing-defaults gate | Reworded: no gate exists during frontend build; the post-frontend performance pass is where this is actually measured and, if needed, cut back |
| `design-system/components/README.md`, spec 7.2 (ScrollStack note) | Framed `"use client"` on Person card + bio as "a real spec conflict, not a formality" | Reworded: an ordinary implementation choice once ScrollStack ships, not a conflict |

**Why now:** raised directly by the client while reviewing the ScrollStack integration for `/about-us/leadership/` — the "zero JavaScript" framing on Person card + bio read as more ceremony than a Next.js/React/Tailwind project blending client and server components where necessary should carry. Corrected across every section that inherited that framing, not just the one that surfaced it.

---

## Changelog: what v0.6 changes

**Performance is deliberately unmeasured for the duration of frontend build.** Client decision: get the frontend fully built first, then run a dedicated performance pass. Every numeric performance cap and CI-enforced gate in v0.5 — the Core Web Vitals targets, the JavaScript weight budgets, the bundle-size CI check, the Phase 1 exit criteria tied to them — is removed or marked deferred below. This is not a decision to ignore performance forever; it is a sequencing decision, and it is stated plainly rather than left to be discovered when someone notices there is no longer a number in Section 11.3.

**What stays, because it isn't a budget, it's the architecture:** Server Components by default, prerendering every content route, and the `"use client"` boundary discipline in 7.2 are load-bearing decisions for how this app is built on Next.js, not performance optimisations bolted on afterward. Removing them would mean re-architecting later, not just re-measuring. They stay as written; only the numeric enforcement around them is deferred.

**What actually changed:**

| Area | v0.5 | v0.6 |
|---|---|---|
| Section 5 goals | LCP < 2.0s, INP < 200ms, CLS < 0.1 as a 6-month target | Target removed. Revisit once the performance pass runs. |
| Section 11.3 | Hard budget table: LCP < 2.5s, JS < 180KB / 250KB, page weight caps | Replaced with a placeholder. No numeric target until the post-frontend performance pass. |
| Section 12.9 | "Not optional extras," CI bundle-size gate wired up in week 2, Core Web Vitals audited at every phase gate | Architectural disciplines kept as defaults; the CI gate and per-phase Vitals audit are deferred to the performance pass, not run during frontend build. |
| `@next/bundle-analyzer` | Phase 0 mandatory install, wired into CI in week 2 | Moved to the optional/deferred tool list. Install it when the performance pass starts. |
| Phase 1 exit criteria | Blocked on Core Web Vitals and first-load JS under budget | No longer a Phase 1 blocker. Phase 1 exits on the launch gates in 14.4, not on a performance number. |

**The honest risk this reintroduces:** this is exactly the failure mode 12.9 existed to prevent — `"use client"` spreading and first-load JS drifting upward invisibly, unmeasured, across the whole frontend build. Accepted deliberately in exchange for not blocking frontend velocity on a number nobody has measured yet. See the updated risk entry in Section 16. The performance pass before launch is not optional; only its timing moved.

---

## Changelog: what v0.5 changes

**The platform changes from Astro to Next.js, React and Tailwind, so that shadcn/ui components can be pulled in directly.** This is a client decision and the spec now reflects it fully. Sections 7, 11.3 and all of 12 are rewritten.

| Area | v0.4 | v0.5 |
|---|---|---|
| Framework | Astro 5.x, islands | **Next.js 15, App Router, React Server Components** |
| Styling | Hand-rolled CSS with custom properties | **Tailwind v4**, design tokens declared in `@theme` |
| Components | Design reference only, reimplemented by hand | **shadcn/ui as the base layer**, installed via CLI and MCP, plus third-party shadcn registries |
| Hosting | Cloudflare Pages, static | **Cloudflare Workers via `@opennextjs/cloudflare`**, all content routes prerendered |
| Content | Astro content collections | **Keystatic reader API**, same schemas, same build-time validation |
| Forms | Standalone Cloudflare Worker | **Next.js Route Handler**, same logic, one fewer moving part |
| i18n | Astro i18n routing | **next-intl** |
| JS budget | Under 50KB on content pages | **Revised. See 11.3.** This is the real cost of the decision and it is stated plainly rather than buried. |

### What this buys, and what it costs

**Buys:** shadcn components install with one command and are copied into the repo as source you own, not a runtime dependency. The shadcn MCP server lets components be pulled conversationally. Third-party shadcn-compatible registries (Magic UI, Unlumen and others from the tooling notes) can be wired into `components.json` and pulled the same way. Most of the libraries that v0.4 had to classify as "reference only" become directly usable. Build velocity goes up substantially.

**Costs:** React plus the Next.js runtime is roughly 90 to 120KB gzipped before a single line of our own code. Under Astro the content pages shipped almost nothing. **The under-50KB budget in v0.4 is not achievable on this stack and pretending otherwise would be dishonest.** 11.3 sets a revised, achievable budget and 12.9 lists the specific disciplines needed to hold it. The LCP target of 2.0 seconds on Indian mobile networks is still reachable, but it now requires deliberate work rather than coming free.

**The mitigation that matters most:** shadcn is copy-in source, not an installed package. You ship only the components you actually add, and you can edit or strip any of them. That is materially better than pulling a monolithic component library.

---

## Changelog: what v0.4 changed

v0.4 folds the internal AI tooling notes into the spec: which plugins, MCP servers, skills and component libraries get used, when, and which are deliberately excluded.

**New: Section 12.8, the tooling stack.** Install list with commands, a governing rule for component libraries, and per-tool verdicts.
**New: Phase 0.1, tooling setup.** Half a day of work, done before anything else, with specific commands.
**New: Appendix E,** the full assessment of every tool in the notes, including the ones we are not using and why.
**Inline throughout:** sections that depend on a specific tool now carry a **`[TOOL]`** note naming it and the guardrail that applies.

**Amended after review.** Section 12.1 now opens with an explicit **backend and hosting architecture** outline: what runs where, the full request path, what we deliberately do not run, and the running cost. Section 12.7 is rewritten around **live DNS findings**: `aksharbyonyks.com` is registered at Namecheap with working Google Workspace email, and every other variant including `.in` and `.co.in` is currently unregistered and available.

### The one analytical point that matters

> **Superseded by v0.5.** Retained for traceability. The reasoning below was correct for the Astro stack; v0.5 changes the stack, which resolves the tension in the opposite direction.

Most of the UI libraries in the notes are **React plus Tailwind plus shadcn**. This project was **Astro, static output, under 50KB of JavaScript on content pages, LCP under 2.0 seconds on Indian mobile networks.** Those were in direct tension. Pulling a shader background or an animated component library in as a runtime dependency would have blown the performance budget that the platform choice existed to protect.

**The v0.4 governing rule was: use these libraries as design reference, not as runtime dependencies.** v0.5 replaces it with **"install freely, hydrate deliberately"** and moves the constraint from the package boundary to the client-component boundary. Section 12.8.1 has the current rule.

---

## Changelog: what v0.3 changed

v0.3 folds in a technical audit of byonyks.com's rendered design values, read directly from the live pages with `getComputedStyle` rather than sampled from screenshots. Full results are in Appendix D and in the companion Design Token Audit.

**One recommendation is overturned.**

| Area | v0.2 said | v0.3 says | Why |
|---|---|---|---|
| Primary colour | Inherit the Byonyks primary to signal technology continuity | **Inherit the hue, not the hex.** Primary becomes `#0d5d8d`. `#1388cd` is demoted to large-display and non-text use only | `#1388cd` measures 3.87:1 on white and 3.87:1 as a background for white text. WCAG AA requires 4.5:1. It fails in both directions, and it is the link colour, button fill and footer background on all 15 pages. Section 6 and Section 7.3 were in direct conflict. |
| Typography | Noto Sans and Noto Serif are the safe free choice for Devanagari | Unchanged, but now evidenced | Poppins, the de facto Byonyks face, has no Devanagari coverage. Carrying it forward would block the Hindi path. |
| Design tokens | Semantic colour tokens, not literal | Unchanged, but now evidenced, and Section 7.1 gains concrete starting values | byonyks.com has **zero** brand design tokens. Every value is hardcoded per element in Elementor. That is the mechanical cause of the eleven blues, the eight dark neutrals, and the conflicting statistics. |
| Hero component | Three variants specified | Adds a **mandatory scrim requirement** on any variant with text over imagery | Hero headlines on byonyks.com are white type over unscrimmed photographs. Contrast there cannot be computed and is the most common AA failure on marketing sites. |
| Contact form | Persistent visible labels required | Unchanged, plus a 1px minimum border rule | byonyks.com uses 0.8px borders, which render inconsistently and can disappear at some zoom levels. |

Everything else in v0.2 stands.

---

## Changelog: what v0.2 changed

The client audit answered most of what was open in v0.1 and overturned several assumptions.

| Area | v0.1 assumed | Client audit says | Effect |
|---|---|---|---|
| Relationship | India JV or subsidiary | **Official licensing partner of Byonyks USA for the India market** | Rewrites Section 3, the About page, and the entire regulatory framing |
| Scope | India entity within a global group narrative | **Not global, only India.** Remove Byonyks Global and all five regional pages | Sitemap shrinks substantially |
| Leadership | India team, global leadership, full Scientific Advisory Board | **Executive team only. Five people. Name, bio, portrait.** | 25 bio pages become 5. SAB and Board removed. |
| ByoTalks | Rebuild as a filterable library with transcripts | **Keep the same** | Phase 2 scope reduced. See F-4. |
| Pakistan operations | Resolve the naming convention | **Remove the Pakistan office entirely** | See F-1. Most consequential item in the audit. |
| Expansion sites | Hyderabad and Gujrat (assumed Pakistan) | **Hyderabad and Ahmedabad**, both India | Manufacturing becomes an India roadmap |
| Contact | Four routed forms | **Forward to vishnu@aksharbyonyks.com** | Domain confirmed. See F-3. |
| US office | Itasca, IL commercial address | **Vishnu's home address** | See F-2. |
| Careers | Rebuild with a jobs collection | **Keep, use the icon portfolio from 21st.dev** | Design direction set |
| News | Rebuild the index | **Featured Highlights and From the Experts as scaffolds. Keep Latest Updates as is. Keep both articles.** | Confirmed |
| Innovation | Split into Technology and patient pillars | **Keep Innovation, rebase on India** | Structure preserved |

**Net effect on size:** 21 core pages in v0.1, **14 in v0.2.** (The investor section, once a conditional +3, was cut on 20 Aug 2026 — see 9.6.) Roughly 33,500 words of content becomes roughly 19,000. Timeline shortens by about two weeks. The audit produced a tighter, more focused site, which is a good outcome.

**Open items are tracked in the companion Open Questions document.** Forty questions, fourteen hard blockers. This spec references them by number (O-1 through O-4, and the tiered questions 1.1 through 4.12).

---

## Flags: where following the audit literally creates a problem

These are not objections. They are places where the instruction, executed as written, creates a downstream problem that is cheaper to resolve now than at launch.

### F-1. Removing Pakistan removes the proof

**The most important item in this document.**

The instruction is "get rid of Pakistan office." Understood, and there are sound commercial reasons for an India-market entity to do that. But nearly every substantive proof point on byonyks.com originates in the Pakistan operation:

| Asset | Origin | Status if Pakistan is removed |
|---|---|---|
| ISO 13485 certified factory, established 2021 | Punjab, Pakistan | Cannot be shown as an Akshar Byonyks facility |
| 10,000+ successful therapies delivered | Pakistan deployment | Cannot be attributed without naming where |
| R&D facility | Lahore, Pakistan | Removed |
| "From Blueprint to Breakthrough" imagery | Pakistan factory | Unusable |
| Manufacturing and assembly photography | Pakistan factory | Unusable |
| BBC segment | Filmed in the region | Needs checking |

Net effect: **the Manufacturing page has no operating facility to show.** It becomes two "coming soon" cards for Hyderabad and Ahmedabad. In front of a priority-one investor audience, a manufacturing page with no manufacturing is worse than no manufacturing page at all.

**Three resolutions, in order of preference:**

1. **Attribute to Byonyks, not to a country.** "Manufactured at Byonyks' ISO 13485 certified facility." "Over 10,000 therapies delivered using Byonyks technology." True, verifiable, never names Pakistan, preserves every proof point. **Recommended.**
2. **Attribute to the licensor generically.** "Our licensing partner Byonyks operates an ISO 13485 certified manufacturing facility." Slightly weaker, cleanest separation.
3. **Drop the claims entirely.** Manufacturing becomes a pure India roadmap. Honest, but discards the strongest evidence the group has.

**What we will not do:** re-badge a Pakistani facility as Indian. That is a factual misrepresentation on a medical device site and would not survive a CDSCO enquiry, a diligence process, or a journalist with ten minutes.

### F-2. A home address as the US office

The audit says to list Vishnu's home address as the US office.

- **Credibility.** Priority-one audience is investors. A residential address listed as a corporate office is among the first things a diligence process checks, and it is trivially verifiable.
- **Personal exposure.** Publishing a private residential address makes it permanently indexed and scrapeable, attached to a named individual.
- **Consistency.** Why does an India-specific entity list a US office at all? If the reason is US registration, that belongs in the legal footer, not as an office on the contact page.

**Recommended:** do not list a US office. Name Byonyks USA as the licensor instead. This is also the most consistent reading of "not global, only India."

### F-3. One email address for four audiences

Routing everything to `vishnu@aksharbyonyks.com` is fine for launch and is specified that way.

- Build the form so the **routing address is a configuration value, not hardcoded.** Adding `patients@`, `clinical@` and `partners@` later then costs five minutes.
- Keep the enquiry-type field regardless, so the subject line arrives pre-classified and the inbox stays sortable.

### F-4. Keeping ByoTalks as-is leaves value on the table

Specified as instructed. For the record: the eight sessions are the most differentiated content asset in the group. Captions are required anyway under WCAG 2.1 AA (Section 7.3), and once captions exist, transcripts are nearly free and become indexable long-form clinical content that no competitor in the Indian market has. Moved to Phase 3 as optional rather than removed.

### F-5. Removing the Scientific Advisory Board

The audit specifies executive team only. The consequence is that nine named nephrologists, including Isaac Teitelbaum, Madhukar Misra, Anjali Saxena, Simon Davies and Fredric Finkelstein, no longer appear anywhere. For the clinician audience, those names are the credential that opens a conversation.

**Cheap middle path, specified in 9.3:** keep the five-person page exactly as instructed, and surface the advisory names inside ByoTalks, where they appear naturally as session speakers with their credentials. No extra page, no roster, credibility retained at zero cost.

### F-6. "Official licensing partner" needs paper behind it

Before that claim goes live: confirm the executed agreement exists and that the site wording matches it (exclusive or non-exclusive, territory, product scope); confirm Byonyks USA approves use of its name, marks and FDA clearance reference in writing; confirm who is the CDSCO authorised agent. See Open Questions 1.3, 1.5 and 1.6.

### F-7. 21st.dev components

The 21st.dev icon portfolio is React and Tailwind, which **as of v0.5 is now our native stack**, so the integration friction that v0.4 flagged is gone.

Two things still apply. **Render it as a Server Component if it has no interactivity**, so it ships no JavaScript even though it is a React component. Only mark it `"use client"` if it genuinely animates on interaction. And **confirm the licence on each component before shipping**: the tooling notes flag 21st.dev licensing as inconsistent per component, and this is a commercial medical site.

---

## 1. Executive summary

Byonyks is a US medical device company holding FDA 510(k) clearance for the X-1 automated peritoneal dialysis (APD) cycler, granted May 2025, making it the third company to clear an APD cycler in the United States.

**Akshar Byonyks is the official licensing partner of Byonyks USA for the India market.** It is not a subsidiary and not a joint venture in the ordinary sense. That distinction shapes everything on the site: what can be claimed, who holds the regulatory authorisation, and how the FDA clearance may be referenced.

byonyks.com remains the global property and is **out of scope**. The new site is a greenfield India property on `aksharbyonyks.com`.

**Scope is India only.** No global section, no regional pages, no international expansion narrative.

**Audience priority:** investors and partners first, patients and caregivers second, nephrologists and clinics third, distributors and governments fourth.

**Platform:** Next.js 15 (App Router) with React and Tailwind v4, component layer built on shadcn/ui, deployed to Cloudflare Workers via the OpenNext adapter. All content routes are statically prerendered at build time. Chosen for build velocity and direct access to the shadcn ecosystem; the performance disciplines this requires are in 11.3 and 12.9.

**Content approach:** migrate and edit. Roughly half the existing corpus is reusable once rebased on India.

**Nothing is gated.** No login, no data room, no auth layer in any phase.

**Site size:** 14 core pages plus collections, plus 5 legal pages.

---

## 2. Current state audit: byonyks.com

### 2.1 Inventory and disposition

**40 pages across 6 templates.** Full URL list in Appendix A.

| Section | Pages | Assessment | Disposition |
|---|---|---|---|
| Home | 1 | Current, FDA clearance is the hero | Rebuild for India |
| Innovation | `/innovation/`, `/market/`, `/learn/` | Strongest content on the site | **Keep, rebase on India** |
| Byonyks Global | Hub + 5 regions | US, Middle East, Europe near-empty | **Remove entirely** |
| Team | `/about-us/` + 25 bios | 14 exec, 9 SAB, 5 BOD | **Reduce to 5 executives** |
| News & Media | Index + 2 posts | Newest post February 2026 | **Keep structure, keep both posts** |
| Company | `/careers/`, `/manufacturing/`, `/contact/` | Careers has no jobs, Manufacturing is thin | **Keep all three** |
| Legacy deck | `/the-vision/`, `/the-people/`, `/the-plan/`, `/products/`, `/the-progress/` | Orphaned, duplicative, one conflicting statistic | Mine for content, do not reproduce |

### 2.2 Defects

**P0. Placeholder contact details live sitewide.** The footer on all 40 pages shows `123-456-7890` and an unrendered email, including on the FDA press release page, which is the page most likely to be read by a journalist, an investor or a regulator.

**P0. No privacy policy, no consent mechanism.** `/privacy-policy/` returns 404. The contact form collects first name, last name, company, organisation type, email, phone and free text, with no privacy notice, no consent checkbox, no cookie notice, no retention period, no named controller. For an India entity that is a DPDP Act 2023 exposure from day one.

**P1. Five near-duplicate content sets.** `/the-plan/` cites 13% US home dialysis; `/market/` cites 14%. Same claim, two numbers, same domain.

**P1. Sitewide roster in the footer.** 28 team links on all 40 pages. Inflates page weight, dilutes internal link equity, unusable on mobile. The five-person decision resolves this by itself.

**P1. SEO unmanaged.** Default WordPress robots.txt, built-in `wp-sitemap.xml`, meaning no SEO plugin installed at all. No structured data, no detectable meta descriptions.

**P2. Naming inconsistency.** "South Asia" on Global pages, "Lahore, Punjab" and "Bangalore, Karnataka" on Contact. Resolved by the Pakistan removal, but see F-1.

**P3. Copy errors.** "Perfect for for every lifestyle" on `/innovation/`. "Dr. Klemen Meyers" versus "Klemens Meyer, MD". "Ahmed Muzmmal" likely a misspelling.

### 2.3 What survives

1. **The four-benefit framework:** preserves peritoneal membrane integrity, makes dialysis affordable, preserves residual renal function longer, eliminates acid and toxins from dialysate.
2. **"A winning solution for all":** Patients, Payers, Providers, Producer. Reframe "Payers" for India.
3. **ByoTalks.** Eight sessions with named nephrologists.
4. **The milestone timeline** from `/the-progress/`. Investor-grade content already written.
5. **The founder story** from `/the-vision/`: Farrukh Usman's aunt on dialysis, his mother's diabetes risk, the desire for pain-free home treatment.
6. **The "62% of US PD machines" claim.** Powerful if substantiable. Needs a footnote.
7. **The 10,000+ therapies figure.** Subject to F-1 attribution.
8. **X-1 product detail and the X2 / X3 roadmap** from `/products/`.

---

## 3. Positioning

### 3.1 The relationship, stated plainly

**Akshar Byonyks is the official licensing partner of Byonyks USA for the India market.**

The About page must answer, above the fold:

1. Who is Akshar Byonyks and who is Byonyks?
2. Is the machine I would buy the same machine the FDA cleared?
3. Is this an Indian company?

**Recommended framing:** Akshar Byonyks holds the licence to bring Byonyks' FDA-cleared home dialysis technology to India. Indian company, Indian team, Indian market, proven global technology.

**Precision requirements, non-negotiable:**

- **Never state or imply that Akshar Byonyks holds the FDA clearance.** Byonyks USA holds it. The correct construction is "the X-1 cycler, cleared by the US FDA under 510(k)", with the clearance attributed to Byonyks.
- **Never imply that FDA clearance authorises sale in India.** It does not. State the Indian position separately.
- **Never describe Akshar Byonyks as the manufacturer** unless and until it manufactures.
- Use **one consistent formulation** of the licensing relationship across every page. Draft it once, get it approved, store it in the CMS as a reusable block so it cannot drift.

### 3.2 Why the byonyks.com argument does not transfer

| byonyks.com argument | Status in India |
|---|---|
| 7% of Medicare budget for 1.3% of population | Irrelevant. No Medicare. |
| CMS moving ESKD patients to at-risk plans | Irrelevant. |
| 2019 executive order, 80% home dialysis target | Irrelevant. |
| $15,000 per patient per year saving | Wrong currency, wrong order of magnitude. |
| $50,000+ per US patient per year | Useful only as contrast, paired with an India figure. |
| Duopoly of two national manufacturers | Partially transfers. Named players differ. |
| 75% of ESKD patients worldwide have no access | Transfers well, lands harder in India. |
| 843 million CKD patients worldwide | Transfers. Pair with an India figure. |

### 3.3 The India argument

Four legs. Each needs a sourced, dated number before it ships. See Open Questions 1.8.

1. **Scale.** India's CKD and ESKD burden, new dialysis starts per year, and the gap between patients who need dialysis and patients who get it.
2. **Access geometry.** In-centre haemodialysis means roughly three trips a week to a facility. For most of India that is travel time, lost wages for the patient and an attendant, and in many districts no facility within reach. Home PD removes the trip. **This is the strongest single argument in the Indian market and byonyks.com barely makes it.**
3. **Cost and coverage.** Out-of-pocket burden, the Pradhan Mantri National Dialysis Programme, Ayushman Bharat PM-JAY coverage, state schemes. Reimbursement policy changes; every number carries a date and a source.
4. **Modality mix.** India's PD share of dialysis versus comparable countries. The Guatemala 56% comparison from the current site is a good rhetorical device and should be kept.

---

## 4. Audiences

### 4.1 Investors and partners (Priority 1)

**Needs:** market size with sources; licensing scope; regulatory status and what remains; supply chain reality; traction; leadership credibility; what the capital does.

**Conversion:** enquiry to `vishnu@aksharbyonyks.com`, pre-classified by type.

**Design note:** this audience reads fast and distrusts marketing language. Their content should be denser, more numeric and more sober than the rest of the site. Dated sources, footnotes, tables.

### 4.2 Patients and caregivers (Priority 2)

**Needs:** what PD is, in plain language; what a day on PD looks like; whether they are a candidate; cost and coverage; training and support; who to call.

**Design note:** majority mobile, often constrained bandwidth, frequently older, often reading in a second language under stress. Large type, high contrast, short paragraphs, visible phone number, no autoplay. **This audience is why the performance pass deferred in 11.3 is a hard requirement of the launch gate (14.4), even though it is not enforced during frontend build.** They carry the cost of every unnecessary kilobyte of JavaScript; the disciplines in 12.9 stay as defaults for exactly that reason, even without CI enforcement behind them yet.

**Compliance note:** public communication about medical treatment in India is constrained by the Drugs and Magic Remedies (Objectionable Advertisements) Act 1954. Patient copy must be educational, must not promise outcomes, and must route treatment decisions to a physician.

### 4.3 Nephrologists and clinics (Priority 3)

**Needs:** device specifications and IFU; clinical evidence; ByoTalks; training and onboarding; service commitments; **consumables supply reliability, which is the number one clinician objection to any new PD supplier and which the current site does not address at all**; a named contact.

### 4.4 Distributors and governments (Priority 4)

**Needs:** corporate credentials in a form that pastes into a tender response. Build the credentials content print-optimised so it can be printed to PDF and attached to a bid.

---

## 5. Goals and success measures

| Goal | Measure | Target at 6 months |
|---|---|---|
| Establish Akshar Byonyks as a credible entity | Branded search volume | Zero to a stable non-zero baseline |
| Generate qualified investor conversations | Enquiries per month, meeting conversion | Baseline month 1, then set target |
| Generate patient enquiries | Enquiries per month | Baseline month 1 |
| Reference source on home PD in India | Organic sessions on Innovation; target-term rankings | Top 10 for 5 terms |
| Serve clinicians | ByoTalks engagement, clinician enquiries | Baseline |
| Perform on Indian mobile networks | Core Web Vitals, field, mobile, p75 | **Deferred.** No target set until the post-frontend performance pass. See 11.3. |
| Be legally clean | Privacy policy live, consent captured, grievance officer named | Day 1, non-negotiable |

---

## 6. Brand and identity

**Custom logo is confirmed in scope by the audit.** Akshar Byonyks has no public presence; search returns nothing.

**Logo delivered by the client, 20 August 2026.** Full company name from the mark: **Akshar Byonyks International LLC.** Tagline: "Transforming Renal Care Through Breakthrough Peritoneal Dialysis Innovation." Mark: a globe (India highlighted) wrapped by a gold ring through an "AB" monogram with a kidney icon, gold-and-blue script wordmark below.

**The actual image file could not be saved into this repo** — it arrived as a pasted chat attachment, and there is no tool available in this session to extract a binary from that and write it to disk. **Save it to `design-system/brand/akshar-byonyks-logo.png`** (folder created, awaiting the file) so it can actually be referenced from code and run through `extract-design-system` for real colour values.

**Resolved, 20 August 2026 — blue-plus-one, not blue-plus-two.** Blue stays the workhorse: text, links, buttons, backgrounds, everything accessibility-critical, unchanged from 6.1. Gold enters the token system as a single sparing accent — `--color-accent-gold` in 6.1 — which also finally fills the "India-specific accent" requirement in the table below (nothing had claimed that role until now, and gold is already doing that exact job in the logo, where it highlights India on the globe). It is restricted to the same use class as `--color-brand-accent`: large display type and non-text graphics only, never body text, never a background for white body text. The kidney red stays confined to the logo icon itself and does not enter the UI palette — it would collide with the `--destructive` error token already in `globals.css` and read as alarm on a site whose patient audience is managing a chronic condition. See `design-system/brand/README.md` for the reasoning in full.

| Asset | Requirement |
|---|---|
| Wordmark and logo | **Delivered by client 20 Aug 2026** — see note above and `design-system/brand/`. Works standalone and in a lockup with the Byonyks mark. Legible at 24px for favicon (verify: the delivered mark is detail-heavy — globe texture, ring, kidney vasculature — worth checking it actually reads at favicon size, or whether a simplified monogram-only variant is needed for that use). |
| Licensing lockup | Visual treatment for "Official licensing partner of Byonyks USA". Approved by Byonyks USA before use. See F-6. |
| Colour system | **Inherit the hue, not the hex.** See 6.1 below. Primary `#0d5d8d`, derived from the Byonyks blue at the same hue and saturation. Add an India-specific accent. All combinations pass WCAG AA at 4.5:1 for body text. |
| Typography | **Noto Sans, for both display and text roles.** Devanagari coverage from day one even if Hindi launches later; Noto Sans alone covers it, so there is one family to self-host and subset rather than two. **Poppins, the current Byonyks face, has no Devanagari coverage and cannot be carried forward if Hindi is on the roadmap.** |
| Iconography | Single-stroke line set, consistent weight. 21st.dev direction on Careers; see F-7. |
| Photography | Commission real photography. The current site's stock-heavy look undercuts credibility. Highest-leverage non-code investment in the project. See F-1 on usable facility imagery. |

**`[TOOL]` Identity and design direction.** Run **extract-design-system** against any reference site the designer wants to draw from, one page per run, to get a `tokens.json` starting point rather than eyeballing values. Run **`/impeccable critique`** on the first design comps: its 59 detector rules catch overused fonts, purple-gradient AI slop and contrast failures before they reach a template. See 12.8.2.
| Document templates | Letterhead, one-pager, tender credentials sheet. |

### 6.1 The primary colour, amended

The Byonyks blue is `#1388cd`. It is the link colour, the button fill and the footer background on all 15 pages of byonyks.com. Measured against white it is **3.87:1**. White text on it is also **3.87:1**. WCAG 2.1 AA requires 4.5:1 for normal text, so it fails as a foreground and as a background.

v0.2 recommended inheriting it. That cannot stand alongside the WCAG AA requirement in 7.3. The resolution is to **inherit the hue and darken the value**, which preserves brand recognition and clears the threshold.

| Token | Hex | On white | Use |
|---|---|---|---|
| `--color-primary` | **`#0d5d8d`** | 7.08:1 | Links, buttons, interactive elements, small text. Clears AAA. Recommended default. |
| `--color-primary-aa` | `#117cbc` | 4.53:1 | Minimum acceptable substitution if `#0d5d8d` reads too dark in design review. Clears AA only. |
| `--color-brand-accent` | `#1388cd` | 3.87:1 | **Large display type at 24px and above, and non-text graphics only.** Never for body text, never as a background for white body text. |
| `--color-ink` | `#011a48` | 16.90:1 | Headings. Carried over from byonyks.com unchanged; it is the strongest value on the current site. |
| `--color-accent-gold` | `#b08d2f` | 3.14:1 | **India-specific accent** (see 6, resolved 20 Aug 2026). Same use restriction as `--color-brand-accent`: large display type and non-text graphics only — stat callouts, dividers, badges, credential/certification marks. Never body text, never a background for white body text. Hue ~44°, near-complementary to the primary blue's 202° — deliberate contrast, not a clash. Sourced from the logo's gold, picked by hand since the logo file itself still isn't in the repo (see brand README); re-verify against the real file once it's extracted. |

All three blues share the same hue (202°) and saturation (83%). Only lightness differs, so the family reads as one brand.

**Recommendation: use `#0d5d8d` as primary.** The patient audience skews older and a high proportion of ESKD patients have diabetes-related visual impairment, which makes the AAA margin worth having rather than a nicety.

**Tone.** Three registers, one voice. Investor content: precise, numeric, sourced. Patient content: short sentences, everyday words, second person; never "modality" without explaining it. Clinician content: technically exact, peer-to-peer, no marketing adjectives.

Sitewide: no unsourced statistics; no outcome guarantees; no unsubstantiated superlatives; every device claim tied to what is actually cleared and licensed.

---

## 7. Design system

### 7.1 Foundations

- **Grid:** 12 column, 1280px max content, 1440px full-bleed. Breakpoints 480, 768, 1024, 1280.
- **Spacing:** 4px base scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128).
- **Type scale:** modular, ~1.25 ratio. Body 17px minimum on mobile. Line height 1.6. **Nothing carries over from byonyks.com:** it has 17 distinct sizes with no ratio between them, and a body line height of 1.25 that is too tight for sustained reading. **Concrete values, realized in the frontend sketches and canonical from here on:** `0.8rem, 1rem, 1.25rem, 1.563rem, 1.953rem, 2.441rem, 3.052rem, 3.815rem` (a clean 1.25 ratio each step, body anchored at the 1rem/17px step).
- **Font weights:** three maximum (400, 600, 700). byonyks.com loads five, including 300, which is a legibility risk at body size for an older patient audience.
- **Radius:** not previously specified; the sketches establish `10px` for cards and section-level containers, `6px` for buttons and inputs. Treat these as the starting `--radius` / `--radius-sm` tokens pending design review.
- **Colour tokens:** semantic, not literal, declared once in Tailwind v4's `@theme` block in `app/globals.css`. Tailwind v4 emits them as real CSS custom properties, so `--color-primary` is both a Tailwind utility (`bg-primary`) and a raw CSS variable. Starting values in 6.1, extended below with the body/surface/border tokens the sketches needed to render a full page rather than just brand accents. **Every colour on the site must resolve through a token. No hardcoded hex and no arbitrary Tailwind values like `bg-[#1388cd]` in components.** This is the direct structural fix for the eleven blues and eight dark neutrals on byonyks.com, which exist precisely because there was never one place to change them.
- **Enforce it in CI:** an ESLint rule banning arbitrary colour values in `className`, plus a grep check for raw hex in `components/`. Cheaper than review.
- **shadcn's own token names** (`--background`, `--foreground`, `--primary`, `--muted`) map onto this scheme. Set them from our 6.1 values at init so every shadcn component inherits the brand automatically rather than shipping shadcn defaults.
- **Motion:** under 200ms, fully disabled under `prefers-reduced-motion`.

**Supporting tokens, realized in the frontend sketches** (6.1 defines the four brand colours; these fill in what a full page needs and are not yet design-reviewed):

| Token | Hex | On white | Use |
|---|---|---|---|
| `--color-body` | `#33373d` | 11.97:1 | Body text. Same value already measured and passed in Appendix D.2. |
| `--color-muted` | `#5f6b73` | 4.88:1 | Secondary text, captions, card descriptions. Passes AA at this size; re-check per use if paired with a tinted surface. |
| `--color-surface` | `#ffffff` | — | Default page and card background. |
| `--color-surface-2` | `#f4f7f9` | — | Alternating section background, muted panels. |
| `--color-surface-3` | `#eaf1f5` | — | Icon chips, table headers, notice bar. |
| `--color-line` | `#d8e2e8` | — | Default border and divider colour. |

**Reference build:** the companion Frontend Sketches implement this full token set (6.1 plus the table above) as `[data-tokens="spec"]` across seven representative screens, side by side with the same screens rendered in byonyks.com's extracted tokens. Treat it as the working reference for anyone restyling shadcn primitives at `init` — closer to source than re-deriving values from this table by hand.

### 7.2 Component inventory

| Component | Used on | Notes |
|---|---|---|
| Header + primary nav | All | Mega-menu desktop, full-screen drawer mobile. Sticky, persistent "Contact us" CTA. |
| Footer | All | **Max 4 columns, 6 links per column. No team roster.** Direct fix for the P1 defect. |
| Hero, 3 variants | Landing pages | Statement, split-image, video-background. **Any variant placing text over imagery must include a scrim:** a gradient or solid overlay behind the text block, sufficient for the text to clear 4.5:1 against the darkest and lightest points of the image. Not optional, not per-instance. Built into the component so it cannot be forgotten. |
| Stat block | Home, Innovation, Market | Number, label, **required source footnote slot**. Cannot render without a source. |
| Benefit card grid | Innovation | 2, 3 or 4 up. |
| Milestone timeline | About | Vertical mobile, horizontal desktop. Collection-driven. |
| Person card + bio | About Us | Portrait, name, role, bio. Five people. |
| Video card + player | ByoTalks | Facade-loaded, no third-party script until click. |
| Article card + article page | News | |
| Placeholder section | News scaffolds | Designed empty state, or hidden via CMS toggle. Per the audit. |
| Quote / testimonial | Throughout | Attribution and role required. |
| Comparison table | Innovation, Market | Stacks to cards under 768px. |
| FAQ accordion | Patient and clinician content | Emits FAQPage structured data. |
| Enquiry form | Contact | One base component, enquiry-type field, config-driven routing. |
| CTA band | Section ends | |
| Facility card | Manufacturing | Location, function, certifications, status. |
| Icon portfolio | Careers | 21st.dev direction. See F-7. |
| Notice bar | Sitewide | Dismissible, session-memory only, no storage APIs. |
| Breadcrumbs | All except home | Emits BreadcrumbList. |
| Language switcher | All | Built now, hidden until locale two ships. |

**`[TOOL]` Building these components.** **shadcn/ui is the base layer.** Install primitives with `npx shadcn@latest add <component>` or conversationally through the shadcn MCP server, then restyle them against the 6.1 tokens. Third-party shadcn-compatible registries (Magic UI, Unlumen and others) are wired into `components.json` and pull the same way. See 12.8.

**Replacing v0.4's "reference only" rule:** every component in this table starts as a **React Server Component**, which is simply the App Router's default rendering mode. Add `"use client"` on the ones that need browser interactivity. The components below are the known cases so far — a reference list, not an enforced ceiling:

| Known to need `"use client"` | Why |
|---|---|
| Header nav (mobile drawer, mega-menu) | Open and close state |
| FAQ accordion | Expand and collapse. Try native `<details>` first; it costs nothing. |
| Enquiry form | Validation, Turnstile, submit state |
| Video player facade | Click-to-load |
| Notice bar | Dismiss |
| Language switcher | Only if it needs client-side routing state |
| Comparison table | Only if it has interactive sorting or filtering. Static tables stay server-rendered. |
| Person card + bio (Leadership only) | The ScrollStack treatment below needs scroll-position tracking with no server-render path. |

Every other component in the table above — hero, card grid, stat block, timeline, article card, facility card, and Person card + bio outside the Leadership ScrollStack treatment — has no reason to be a client component and stays server-rendered by default. That is simply what Server Components are for, not a budget being protected.

**ScrollStack** (12.8.3, parked at `design-system/components/ScrollStack.jsx`) stacks the five Person card + bio entries on `/about-us/leadership/` as the page scrolls. It needs `"use client"` and adds `lenis` as a new runtime dependency (12.1.1) — an ordinary implementation choice for what the component does, not a spec conflict.

Use **Haikei** for static SVG section backgrounds: still the cheapest answer to a problem a shader library solves expensively. Full per-library verdicts in 12.8.3.

### 7.3 Accessibility

**Target: WCAG 2.1 Level AA.** Non-negotiable for a healthcare site serving a patient population that skews older and includes a high proportion of people with diabetes-related visual impairment.

- Keyboard operable throughout, visible focus ring at 3:1 contrast minimum.
- Meaningful alt text on content images, empty alt on decorative.
- **Captions required on all eight ByoTalks sessions.** Hard requirement, not an enhancement.
- Persistent visible form labels, never placeholder-only. byonyks.com has labels in the DOM but duplicates the field name in the placeholder, which usually means the label is visually hidden. Errors announced to screen readers and described in text, not colour.
- **Form field borders 1px minimum.** byonyks.com uses 0.8px, which renders inconsistently across devices and can disappear entirely at some zoom levels.
- **Form inputs at 16px minimum**, which prevents the automatic zoom iOS applies to smaller fields. byonyks.com gets this right and it should be carried over.
- **Text over imagery must be scrimmed.** Contrast against a photograph varies pixel by pixel and cannot be verified by an automated checker, so this is a design rule enforced in the hero component rather than a test.
- Colour never the sole carrier of meaning.
- Text resizes to 200% without loss of content or function.
- Automated axe checks in CI, plus one manual screen reader audit before launch. **Automated checks will not catch text-over-image failures.** Add a manual pass over every hero before launch.

**`[TOOL]` Accessibility tooling.** Run axe through **plain Playwright** in CI, not through an LLM-driven browser: these pages are stable and under our control, so a deterministic check that fails loudly is strictly better than one that can return a plausible wrong answer. Layer **`/impeccable audit`** on top for its contrast detectors. See 12.8.2 and the exclusion note on playwright-mcp in 12.8.4.

If government tenders are in scope, also check against the Guidelines for Indian Government Websites (GIGW).

---

## 8. Information architecture

### 8.1 Principles

1. One page, one job, one audience.
2. No orphans. The `/the-vision/` cluster problem does not recur.
3. Maximum depth of three.
4. The footer is not a sitemap.

### 8.2 Primary navigation

```
Innovation  |  ByoTalks  |  Manufacturing  |  About Us  |  News  |  [Contact us]
```

Five items plus a persistent CTA, mirroring the structure the audit preserved. Careers sits under About Us and in the footer.

**Resolved 20 August 2026 (Open Questions 2.4): cut.** The nav stays five items. No `/investors/` section ships; see 9.6.

### 8.3 Sitemap

```
/                                     Home

/innovation/                          Innovation hub, India-based
  /innovation/the-x1-cycler/          The device
  /innovation/how-it-works/           Four benefits, two levels of technicality
  /innovation/market/                 The India case
  /innovation/whats-next/             X2 and X3, labelled in development

/byotalks/                            ByoTalks index (kept as-is per the audit)
  /byotalks/[slug]                    Individual session

/manufacturing/                       Manufacturing and innovation hubs
                                      Hyderabad and Ahmedabad

/about-us/                            About Us
  /about-us/our-story/                Founder narrative and milestones
  /about-us/leadership/               Executive team, 5 people
  /about-us/leadership/[slug]         Individual bio
  /about-us/careers/                  Careers, 21st.dev icon portfolio

/news/                                News & Media
  /news/[slug]                        Article (2 migrated)
                                      Featured Highlights (scaffold)
                                      From the Experts (scaffold)
                                      Latest Updates (live)

/contact/                             Routes to vishnu@aksharbyonyks.com

/privacy-policy/    /terms-of-use/    /cookie-policy/
/grievance-redressal/                 /accessibility/
/sitemap.xml  /robots.txt  /404

CUT, 20 August 2026 (Open Questions 2.4):
/investors/the-opportunity/           Folded into /innovation/market/
/investors/milestones/                Folded into /about-us/our-story/
```

**Page count: 14 core pages plus collections** (5 bios, 8 ByoTalks sessions, 2 articles), plus 5 legal pages. No investor section.

### 8.4 Content reuse map

New domain, so no redirects. This is a reuse map.

| Source on byonyks.com | Destination | Action |
|---|---|---|
| `/innovation/` four benefits | `/innovation/how-it-works/` | Migrate, edit for India |
| `/innovation/` "winning solution for all" | `/innovation/market/` | Migrate, rewrite "Payers" for India |
| `/innovation/` lifestyle segments | `/innovation/how-it-works/` | Migrate, reshoot imagery |
| `/market/` structure and logic | `/innovation/market/` | Keep the structure, replace every number |
| `/market/` global access statistics | `/innovation/market/` | Migrate, re-source and date |
| `/learn/` ByoTalks, all 8 | `/byotalks/` | Migrate. Add captions. Fix "Klemen Meyers". |
| `/the-progress/` milestones | `/about-us/our-story/` | Migrate. (No `/investors/milestones/` — investor section cut, 9.6.) |
| `/the-vision/` founder story | `/about-us/our-story/` | Migrate, add the India and licensing chapter |
| `/products/` X-1 detail | `/innovation/the-x1-cycler/` | Migrate, align to India licence scope |
| `/products/` X2 and X3 | `/innovation/whats-next/` | Migrate with in-development labelling |
| `/about-us/` bios | `/about-us/leadership/` | **Do not migrate. Five new India executives.** |
| `/about-us/` departments | `/about-us/careers/` | Migrate |
| `/manufacturing/` | `/manufacturing/` | Migrate structure. See F-1 on content. |
| `/south-asia/` facility content | `/manufacturing/` | **Subject to F-1.** Attribute to Byonyks, never to a country. |
| `/careers/` values and process | `/about-us/careers/` | Migrate |
| `/contact/` India office | `/contact/` | **Blocked. Address missing (Open Questions 1.1).** |
| `/contact/` Lahore office | Nothing | Remove per the audit |
| Both news articles | `/news/` | Migrate both |
| `/the-people/`, `/the-plan/` | Nothing | Retire. Fully duplicative. |
| `/byonyks-global/` and 5 regions | Nothing | Remove per the audit |
| SAB and BOD rosters | ByoTalks speaker credits only | Per F-5 |

---

## 9. Page-by-page specification

### 9.1 Home `/`

**Purpose:** establish credibility in eight seconds, then route four audiences.

| # | Section | Content | Status |
|---|---|---|---|
| 1 | Hero | What Akshar Byonyks does in one sentence, the licensing relationship, and the FDA clearance as a credibility badge correctly attributed to Byonyks. | Write new |
| 2 | The problem, in India | Three to four sourced statistics on the India dialysis gap. Every number footnoted with source and date. | Write new |
| 3 | Our answer | The X-1 in one image and three sentences. Links to Innovation. | Edit |
| 4 | Why it is different | Four benefits as cards. | Migrate |
| 5 | Proof | FDA 510(k) clearance, ISO 13485 manufacturing, 10,000+ therapies. **Attribution per F-1.** | Migrate |
| 6 | Who we serve | Four cards, matching the four audiences in Section 4: **Investors & partners, Patients & families, Clinicians, Distributors & government.** The routing mechanism. | Write new |
| 7 | Built on proven technology | The licensing relationship, the "62%" claim substantiated, link to Byonyks. | Write new |
| 8 | Latest | Three most recent news items, auto-populated. | Dynamic |
| 9 | CTA band | Contact, with phone number and form link. | Write new |

**Corrected in v0.5:** row 6 previously read "Patients, Clinicians, Investors, Partners," which split Investors and Partners into two cards and silently dropped Distributors & Governments, contradicting Section 4's four-audience grouping. The Frontend Sketches built it against Section 4 (Investors & partners combined, Distributors & government as the fourth card); this row now matches both.

**Note:** do not lead the hero with "Dialysis at Home" as a bare statement, as byonyks.com does. It reads as a category, not a company. **The Frontend Sketches' placeholder headline, "Home dialysis, built for India," does not clear this bar** — it still opens on the category term before pivoting to India, which is a market qualifier, not a statement of what Akshar Byonyks does. Treat it as an unresolved placeholder, not final copy. The real headline should lead with the company's action (for example, a construction that opens with "Akshar Byonyks brings/licenses/delivers...") per the Recommended framing in 3.1.

### 9.2 `/innovation/` and children

**Kept and rebased on India, per the audit.**

**`/innovation/`** Mission statement, four-benefit summary, links to the four children, India context block, CTA. Migrate and edit.

**`/innovation/the-x1-cycler/`** Product page. Hero image of the actual device. Features: fluid warming to body temperature, battery backup, needle-free operation, intuitive interface. Specification table. **Regulatory status stated precisely and separately: FDA 510(k) cleared in the US (held by Byonyks); India position stated as it actually is.** IFU request CTA. Migrate and edit.

**`/innovation/how-it-works/`** Two-layer content: plain language for patients, expandable technical layer for clinicians. Carries the four benefits, each with a supporting reference. Absorbs the three lifestyle segments (at home, students, travel). Migrate, add references. **Nephrologist review required.**

**`/innovation/market/`** The India case, built on the four legs in Section 3.3. Charts, not paragraphs. Every figure sourced and dated. Includes "A winning solution for all" reframed: Patients, Payers (government schemes, private insurance, self-pay), Providers, Producer. Keep the structure, write all new content.

**`/innovation/whats-next/`** X2 and X3: ultra-pure biocompatible non-inflammatory solutions, customisable glucose and bicarbonate, reduced peritonitis risk, reduced plastic waste. **Every item labelled as in development and not available for sale.** Migrate, add labelling.

**`[TOOL]` The device page.** Two candidates here, both with conditions. A **Magic UI device mockup frame**, taken as a static asset, for presenting the X-1 interface. And the **exploded-view scroll animation** in 12.8.5, which would be a strong treatment for an investor audience but must be driven from real photography or CAD rather than generated imagery, and must pass the performance guardrails. A **Lottie** animation of the exchange cycle belongs on `/innovation/how-it-works/`, not here, and needs nephrologist sign-off on clinical accuracy.

### 9.3 `/byotalks/`

**Kept as-is per the audit.** Index listing the eight sessions, each linking to a session page with video and speaker credentials.

1. Helping PD Patients, Joanna Lee Neumann RN CNN
2. PD Catheter Insertion, Dr Rashid Sharaf
3. Cardio Renal Benefits of Peritoneal Dialysis, Dr Madhukar Misra
4. Not Kt/V, Prof Isaac Teitelbaum MD
5. PD Catheter-Related Issues During Drainage, Dr Rashid Sharaf
6. A Difficult Case of PD-Related Peritonitis, Dr Klemens Meyer
7. A Discussion on PD Prescription, Dr Anjali B Saxena
8. A Discussion on PD, Dr Klemens Meyer

**Required on migration:**

- **Captions on all eight** (WCAG 2.1 AA).
- Fix "Dr. Klemen Meyers" to "Klemens Meyer, MD".
- **Display each speaker's credentials prominently.** This is where the advisory board names live now, per F-5, at zero extra cost.
- `VideoObject` structured data.
- Facade-loaded player: no third-party script until click.

**`[TOOL]` Captions and transcripts.** Use **claude-video** to draft captions for the eight sessions, and transcripts if Phase 3 approves them. **Pass explicit start and end timestamps on every run.** Full-length analysis across eight clinical sessions is extremely token-expensive, and the tool bills for what it processes. **Every draft caption needs a clinician review pass before publishing:** an automated mis-transcription of a drug name, a dose or a Kt/V figure on a medical device site is a clinical accuracy problem, not a typo.

**Deferred to Phase 3 as optional:** transcripts, topic filtering, related-sessions rail.

### 9.4 `/manufacturing/`

| Section | Content | Status |
|---|---|---|
| Hero | "Crafting Quality, Building Tomorrow" or a replacement | Migrate |
| Manufacturing today | **F-1 resolved 20 Aug 2026.** ISO 13485 facility and 10,000+ therapies attributed to Byonyks, never to a country. | Write new from the attributed framing |
| Innovation hubs | Two facility cards: **Hyderabad** and **Ahmedabad**. Function per Open Questions 2.3. | Write new |
| Quality and compliance | Certifications with numbers and dates: ISO 13485, IEC via SGS and TUV SUD, biocompatibility via FiLab, FDA 510(k) number. Print-optimised for tender attachment. | Write new from existing facts |
| CTA | Partnership enquiry | Write new |

**Note:** the audit's "Hyderabad and Ahmedabad" corrects byonyks.com's "Hyderabad and Gujrat". Both hubs are in India. If they will manufacture, that is a separate CDSCO licence route from an import licence, and they should not be described as manufacturing facilities before that path is confirmed.

### 9.5 `/about-us/` and children

**`/about-us/`** Who Akshar Byonyks is, the licensing relationship per Section 3.1, links to the three children. Write new. **The single most important new page on the site.**

**`/about-us/our-story/`** Founder narrative migrated from `/the-vision/`: the aunt on dialysis, the mother's diabetes risk, the desire for pain-free home treatment. Extended with the India chapter and how the licensing partnership came about. Includes the milestone timeline. Migrate and extend.

**`/about-us/leadership/`** and **`[slug]`** **Five executives only. Name, bio, portrait, per the audit.** No SAB page, no Board page. Consistent portrait treatment: same backdrop, crop and lighting. Bios of 150 to 250 words.

**Blocked on Open Questions 1.4. Launch gate.**

**`/about-us/careers/`** Values (Innovation, Trust and accountability, Attention to details, Support and connection, Introspection), hiring process, departments grid using the **21st.dev icon portfolio**. See F-7. Applications by email in Phase 1. Migrate, restyle.

### 9.6 `/investors/` — **cut, 20 August 2026 (Open Questions 2.4)**

Was specified so it could be approved or cut cleanly; cut. No `/investors/the-opportunity/` or `/investors/milestones/` pages ship, and the primary nav stays five items (8.2).

The India market case (Section 3.3, plus licensing scope, plus the timing argument: FDA clearance achieved, manufacturing established, policy direction, market concentration creating an opening) folds into `/innovation/market/` instead of getting its own page. The milestone timeline — production facility 2020-21; 1,000+ treatments 2021; R&D centres 2022; FiLab France biocompatibility July 2023; HTW China electrical September 2023; SGS Geneva IEC certification October 2023; human factors, TUV SUD Minnesota IEC and FDA submission November 2023; FDA 510(k) clearance May 2025; extended with India milestones — folds into `/about-us/our-story/` instead of `/investors/milestones/`. "Investor" is added to the contact form's enquiry types (9.4) so that audience still has a direct path in. Nothing is lost except prominence.

### 9.7 `/news/`

**Structure exactly as the audit specifies:**

| Section | State at launch |
|---|---|
| Featured Highlights | **Scaffold**, ready to populate |
| From the Experts | **Scaffold**, ready to populate |
| Latest Updates | **Live**, both migrated articles |

Both articles migrate: "Byonyks receives 510(k) clearance for new dialysis machine" (21 May 2025) and "Byonyks Makes Headlines: FDA-Cleared X1 APD Cycler Set to Enter U.S. Market" (3 February 2026).

**Design requirement:** an empty section must look deliberate, not broken. Recommend a CMS toggle that hides a section until its collection has entries. A visible empty section on launch day undercuts the credibility the rest of the site is building.

**Content warning:** a news index whose newest post is February 2026 signals a stalled company. Minimum viable cadence is one post a month.

### 9.8 `/contact/`

Single form routing to `vishnu@aksharbyonyks.com`, address held as a configuration value per F-3.

Field styling per 7.3: 16px inputs, persistent visible labels, 1px borders minimum.

| Field | Type | Required |
|---|---|---|
| Name | Text | Yes |
| Organisation | Text | No |
| Enquiry type | Select: Patient or caregiver, Clinician, Investor, Partner or distributor, Careers, Other | Yes |
| Email | Email | Yes |
| Phone | Tel | No |
| City | Text | No |
| Message | Textarea | Yes |
| Consent | Unchecked checkbox, links to privacy policy | Yes |

Enquiry type sets the email subject prefix so the inbox stays sortable.

**Note on the Frontend Sketches:** the sketch's contact form omits the City field above. That is a gap in the sketch, not a scope decision — City stays in the field table and the real build must include it.

**Offices:** India office blocked on Open Questions 1.1 (address truncated in the audit). US office blocked on 2.1 and F-2. Lahore removed per the audit.

**The placeholder `123-456-7890` must never appear.** A real number is required before launch.

---

## 10. Content production plan

### 10.1 Volume

| Category | Pages | Words (approx) | Status |
|---|---|---|---|
| Home | 1 | 900 | Write new |
| Innovation | 5 | 5,500 | Migrate and edit |
| ByoTalks | 1 + 8 sessions | 1,200 | Migrate |
| Manufacturing | 1 | 1,200 | Migrate and write |
| About Us | 4 + 5 bios | 3,500 + 1,000 | Mixed |
| News | 1 + 2 articles | 400 | Migrate |
| Contact | 1 | 300 | Write new |
| Legal | 5 | 4,000 | Drafted by counsel |
| **Total** | **14 plus collections** | **~18,000** | Investor section cut, 20 Aug 2026 (9.6) — no separate word budget |

### 10.2 Review gates

| Content type | Gates |
|---|---|
| Patient-facing education | Nephrologist review, then Indian regulatory counsel review for advertising compliance |
| Device claims | Regulatory affairs sign-off against the actual cleared and licensed indications |
| Licensing wording | Byonyks USA written approval, plus counsel review against the licence agreement |
| Statistics | Source and date recorded in the CMS alongside the figure |
| Investor material | Executive sign-off, plus a check that nothing constitutes an offer of securities |
| Legal pages | Indian counsel, drafted not adapted |

**Build the source field into the CMS schema as required.** A stat block that cannot render without a source is the cheapest enforcement mechanism available, and the direct structural fix for byonyks.com's conflicting-statistic defect.

**`[TOOL]` Content production.** Pull only the relevant modules from **marketingskills**; the full collection is large and most of it targets unregulated consumer marketing that does not apply here. Run **MarkItDown** over every source document the client sends before reading it, which cuts input cost substantially on the licence agreement, regulatory correspondence and any brand guidance. Nothing generated by any tool bypasses the review gates in this table.

### 10.3 Photography and video

**Commission:** the X-1 in a real domestic Indian setting; a patient doing an exchange (signed consent and release); Indian clinicians; the five executives on a consistent backdrop.

**Gather:** all eight ByoTalks recordings at source quality; the BBC segment; device photography from Byonyks USA.

**Do not use, pending F-1:** any facility or assembly photography identifying a Pakistani location.

---

## 11. SEO

### 11.1 Target query clusters

| Cluster | Example queries | Landing page |
|---|---|---|
| Category, patient | peritoneal dialysis at home, home dialysis India | `/innovation/how-it-works/` |
| Comparison | peritoneal dialysis vs hemodialysis | `/innovation/how-it-works/` |
| Cost | dialysis cost in India, is dialysis covered by Ayushman Bharat | `/innovation/market/` |
| Device | APD cycler, automated peritoneal dialysis machine India | `/innovation/the-x1-cycler/` |
| Clinical | PD prescription, Kt/V peritoneal dialysis, PD peritonitis | ByoTalks sessions |
| Brand | Akshar Byonyks, Byonyks India, X-1 cycler | Home, About Us |

**Note:** the smaller sitemap concentrates SEO effort on fewer pages. `/innovation/how-it-works/` and `/innovation/market/` now carry the load a dedicated patient pillar carried in v0.1, so both need to be longer and better structured than a typical marketing page.

### 11.2 Technical requirements

- Semantic HTML. One `<h1>` per page, correct heading order.
- Unique title and meta description per page, authored in the CMS, never auto-generated.
- Canonical URLs on every page.
- Sitemap generated from the App Router (`app/sitemap.ts`), submitted to Google Search Console and Bing Webmaster Tools.
- Purpose-written `robots.txt`, not a framework default.
- Structured data: `Organization` and `MedicalOrganization` sitewide; `MedicalWebPage` on patient education; `FAQPage` on FAQ blocks; `VideoObject` on ByoTalks; `NewsArticle` on news; `BreadcrumbList` sitewide.
- Open Graph and Twitter Card tags with per-page images.
- Descriptive slugs: lowercase, hyphenated, no dates, no IDs.
- Internal linking: every content page links to at least two siblings and one conversion page.
- `hreflang` from day one at a single locale.
- 404 page offering search and the main hubs.

### 11.3 Performance — deferred until after frontend build

**No numeric performance budget is in force during Phase 1.** Client decision, v0.6: build the frontend first, measure and set real targets in a dedicated performance pass afterward, rather than designing against a number nobody has tested yet. See the v0.6 changelog at the top of this document for the reasoning and what this trades away.

**What is still true and worth keeping in view, without being a gate:**

- React plus the Next.js App Router runtime is roughly 90 to 120KB gzipped before any of our own code. That is the floor this stack starts from; it is not optional and no amount of discipline removes it.
- The patient audience (4.2) is majority mobile, often on constrained bandwidth, and carries the cost of every unnecessary kilobyte of JavaScript. That fact does not change because the budget is deferred — it is the reason the performance pass is a launch gate later (14.4), not a reason it needs to be a build gate now.
- The client-component boundary discipline in 7.2 stays as-is: it is an architectural decision about how this app is structured on Next.js, not a performance optimisation waiting on a number.
- Fonts: self-hosted via `next/font`, subset, `font-display: swap`. This is a correctness and licensing practice, not a budget line, and there is no reason to do it any other way regardless of the performance timeline.

**What is explicitly not happening in Phase 1:** no CI bundle-size gate, no per-PR first-load-JS threshold, no LCP/INP/CLS target, no page-weight cap. `@next/bundle-analyzer` moves to the optional tool list (12.8.2) and gets installed when the performance pass starts, not in Phase 0.

**Before launch, not before frontend build:** a real performance pass against field data — Core Web Vitals at p75 on mobile, first-load JS per route, page weight — happens once the frontend is functionally complete, and it is a hard requirement of 14.4's launch gate. The disciplines in 12.9 are still the right defaults to build with; only their enforcement is deferred, so that fixing what the measurement finds is cheaper than it would be discovering it for the first time at launch review.

---

## 12. Technical specification

### 12.1 Architecture: backend and hosting

**There is no traditional backend.** No database, no virtual machine, no container, no origin host to patch or pay for. That is a deliberate choice, not a gap, and it is worth stating plainly because it is the first question a technical stakeholder or an investor's diligence process will ask.

The stack is **Next.js 15 on the App Router**, written in React with Tailwind v4, with the component layer built on **shadcn/ui**. It deploys to **Cloudflare Workers** through the OpenNext adapter, which Cloudflare's own framework guide now recommends over the older `next-on-pages`.

**Every content route is statically prerendered at build time.** A visitor requesting the Innovation page gets prebuilt HTML from the nearest Cloudflare edge location; nothing renders per request. The only code that executes at request time is the form Route Handler. In practice this behaves like a static site with one serverless endpoint, which is exactly what the site needs.

**Why not a pure static export?** `output: 'export'` would drop the Next server entirely, but it also drops Route Handlers, server actions and built-in image optimisation. Given we need one server endpoint anyway, OpenNext with prerendered routes gives the same delivery characteristics plus room to grow. Static export remains a viable fallback if the Worker runtime ever becomes a problem; the form would then move back to a standalone Worker as specified in v0.4.

#### What runs where

| Stage | Where it runs | What happens |
|---|---|---|
| **Author** | Keystatic at `/keystatic`, or a code editor | Content edits are written as Markdown and JSON into the git repo. Every edit is a commit. |
| **Build** | Cloudflare build container, triggered by a push to GitHub | Next reads content through the Keystatic reader, the validation script in 12.2 fails the build on a bad or unsourced record, every content route is prerendered to HTML, the sitemap and Pagefind index are generated, images are optimised. |
| **Serve** | Cloudflare's global edge network | Prerendered HTML plus static assets from the nearest edge location. **No per-request rendering on content routes.** |
| **Form submit** | A Next.js Route Handler running on Cloudflare Workers | The one piece of request-time compute. Verifies Turnstile, validates the payload, rate limits, sends two emails. Milliseconds, in the visitor's region. |
| **Hydration** | The visitor's browser | Only the components marked `"use client"` in 7.2. Everything else is server-rendered and ships no JavaScript. |
| **Search** | The visitor's browser | Pagefind indexes the prerendered HTML at build. Search runs client-side with no server call. |
| **Analytics** | Cloudflare | Cookieless, aggregated, no personal data. |

#### The complete request path

```
Visitor in Bengaluru requests /innovation/market/
  -> Cloudflare edge (nearest PoP)
  -> prerendered HTML served from cache
  -> React hydrates ONLY the client components on that route
     (on most content routes: the header nav, and nothing else)
  -> done. No database. No per-request render.

Visitor submits the contact form
  -> POST /api/contact  (Next Route Handler on Cloudflare Workers)
       verify Turnstile token
       validate payload (Zod, shared with the client schema)
       rate limit by IP
       send notification -> Resend -> vishnu@aksharbyonyks.com
       send auto-reply   -> Resend -> the visitor
  -> confirmation rendered client-side.
     Nothing written to a database. Nothing stored at rest.
```

#### What we deliberately do not run

| Not used | Why |
|---|---|
| Origin application server (Node, PHP, Python) | Content routes are prerendered. The only server code is one Route Handler, running on Workers, not on a host we manage. |
| Database | Content lives in git. Form submissions are emailed, not stored. See 12.4. |
| CMS backend or admin server | Keystatic is git-based and reads from the repo, not a service. |
| Container or VM host | No long-running process exists. |
| Per-request SSR on content pages | Everything under `/innovation`, `/about-us`, `/byotalks`, `/news` and the rest is prerendered. If a route ever needs SSR, it must be justified against 11.3. |
| Session store, auth service | **Nothing on this site is gated in any phase.** See Appendix E.4 for the security workstream this removes. |
| CDN as a separate product | Cloudflare Pages is the CDN. |

#### Why this is the right architecture here

- **Performance.** Prerendered HTML at the edge is the fastest possible delivery. React hydration is the cost we have taken on, and 11.3 plus 12.9 are how it stays bounded.
- **Velocity.** shadcn components install in one command and arrive as source in our repo. On a 14-page site with a tight timeline, this is the single biggest schedule lever available.
- **Cost.** Close to zero. See the table below.
- **Security surface.** No server to compromise, no database to breach, no dependency runtime to patch. For a medical device company handling enquiries from patients, the smallest possible attack surface is a real asset.
- **Compliance.** Storing no personal data at rest is the lowest-obligation posture under the DPDP Act. See 14.1.
- **Reliability.** No origin means no origin outage. There is no single point of failure to monitor.
- **Diligence.** "Static site on a global edge network, no server, no database" is a clean answer when an investor asks what the infrastructure costs and who maintains it.

#### Running cost

Verify current tiers at purchase time; these move. Figures are indicative.

| Service | Tier | Indicative cost |
|---|---|---|
| Cloudflare Workers (hosting, CDN, SSL, previews, via OpenNext) | Free tier covers a marketing site of this size comfortably | **Free to low** |
| Cloudflare Workers requests (form endpoint and route serving) | Free tier allowance far exceeds expected volume | **Free** |
| Cloudflare Turnstile (spam) | Free | **Free** |
| Cloudflare Web Analytics | Free | **Free** |
| Cloudflare Images or R2 (media) | Small paid tier depending on volume | Low |
| Keystatic (CMS) | Open source, runs in the app | **Free** |
| Pagefind (search) | Open source, static | **Free** |
| Resend or Postmark (transactional email) | Free tier covers expected enquiry volume | **Free to low** |
| GitHub | Team tier if branch protection on a private repo is required | Low, per user |
| Domains | See 12.7 | Low, annual |

**Total recurring infrastructure cost is effectively the domains plus email plus a small media allowance.** The meaningful costs on this project are people, photography, counsel and translation, not hosting.

#### 12.1.1 Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 15, App Router** | React Server Components let most of the site render on the server and ship no JavaScript, which keeps first-load JS low on a React stack even before 11.3's deferred performance pass sets a formal target. |
| Language | TypeScript, strict | Content schemas, form payloads and component props all typed from one source. |
| UI library | **React 19** | Required by shadcn and by the current component registries. |
| Styling | **Tailwind v4** | Design tokens declared in `@theme` and emitted as CSS custom properties, which satisfies the 7.1 token rule directly. Required by shadcn. |
| Components | **shadcn/ui** | Copy-in source, not a runtime dependency. Install with the CLI or the MCP server. Restyled against 6.1 tokens at init. |
| Component registries | shadcn-compatible registries in `components.json` | Magic UI, Unlumen and others pull through the same command. See 12.8.3. |
| Rendering | **Static prerender for every content route** | `generateStaticParams` on all dynamic segments. SSR must be justified per route. |
| Hosting and runtime | **Cloudflare Workers via `@opennextjs/cloudflare`** | Cloudflare's currently recommended Next.js adapter. Strong India edge presence, per-PR previews, automatic SSL. |
| Forms and API | **Next.js Route Handler** on Workers | One fewer moving part than a standalone Worker. Same validation, same rate limiting. |
| Spam protection | Cloudflare Turnstile | Free, cookieless, no Google dependency. Better than reCAPTCHA for a DPDP-conscious site. |
| Images | `next/image` with a Cloudflare Images loader | Automatic AVIF and WebP, responsive srcsets. |
| Fonts | `next/font`, self-hosted, subset | Zero layout shift, no third-party request. Devanagari subset from day one per Section 6. |
| Video | Cloudflare Stream, or YouTube with a click-to-load facade | The facade is both a performance and a privacy requirement. |
| Search | Pagefind, indexing the prerendered output | Static, no server, no third-party service. Runs as a post-build step. |
| Analytics | Cloudflare Web Analytics | Cookieless, no personal data, no consent banner required. |
| CMS | **Keystatic** (see 12.3) | Git-based, first-class Next.js App Router support, same schemas drive both editing and reads. |
| Content access | `@keystatic/core/reader` in Server Components | Typed reads at build time from the same config that powers the editor. See 12.2. |
| Validation | Zod, in a prebuild script | Fails the build on an unsourced statistic. See 12.2. |
| i18n | **next-intl** | App Router support, message catalogues, locale routing. See 12.6. |
| Email delivery | Resend or Postmark | Transactional only. |
| Bundle enforcement | `@next/bundle-analyzer` plus a CI size check | **Deferred.** Installed and wired up when the post-frontend performance pass starts, not in Phase 1. See 11.3 and 12.9. |
| Version control and CI | GitHub, with Cloudflare build integration | |

**Fallback:** if the Workers runtime proves awkward, `output: 'export'` produces a pure static build deployable to Cloudflare Pages, with the form moving back to a standalone Worker. Nothing in the content or design layers would change.

### 12.2 Content model

Astro content collections do not exist on this stack. The equivalent, and a better fit here because we are already using Keystatic, is **the Keystatic config as the single schema definition**, read in Server Components through `@keystatic/core/reader`, with a Zod prebuild check that hard-fails the build.

- `keystatic.config.ts` defines every collection. It drives the editor UI **and** the typed reader, so the schema cannot drift between what an editor can enter and what the site expects.
- Server Components call `createReader()` at build time. No client-side fetching, no API layer, no runtime cost.
- `scripts/validate-content.ts` runs before `next build`, parses every record with Zod, and **exits non-zero on failure**. This is what makes the sourcing rule enforceable rather than aspirational.

Collections, unchanged from v0.4:

```
collections:
  leadership   { name, role, portrait, bio, order }
                 5 entries. No group field: executive team only.

  byotalks     { title, speaker, speakerCredentials, videoId, duration,
                 captionsUrl, publishedAt }

  news         { title, slug, publishedAt, category, excerpt, heroImage,
                 body, mediaContact, section[highlights|experts|updates] }

  milestones   { date, title, description,
                 category[regulatory|manufacturing|clinical|corporate] }

  facilities   { name, location, function, established, certifications[],
                 status[live|coming-soon], images[], description }

  statistics   { key, value, unit, label, source, sourceUrl, asOfDate, region }

  faqs         { question, answer, category, audience[patient|clinician|investor] }
```

The `statistics` collection is the important one. Every number on the site is referenced by key. `source` and `asOfDate` are required fields in both the Keystatic schema and the Zod prebuild check, **so an unsourced statistic cannot be entered by an editor and cannot pass the build.** Two independent gates on the defect that produced conflicting figures on byonyks.com.

`news.section` drives the Featured Highlights and From the Experts scaffolds: a section with no entries renders its empty state or hides, per the CMS toggle in 9.7.

**Rendering pattern.** A `<Stat>` Server Component takes a `key`, looks the record up, and renders the value with its source footnote. Because it is a Server Component it ships no JavaScript, and because the source is part of the record it cannot be omitted.

### 12.3 CMS

**Recommendation: Keystatic.** Git-based, free, no external service, and it has first-class Next.js App Router support: mount the admin UI at `/keystatic` with `@keystatic/next` and read content with the same config through `@keystatic/core/reader`. Content lives in the repo as Markdown and JSON, so every edit is a git commit with full history and rollback.

**Exclude `/keystatic` from the sitemap and add `noindex`.** An indexable CMS route on a medical device site is avoidable embarrassment.

**Alternative for a hosted editorial experience:** Sanity. Better editing UX, real-time collaboration, generous free tier, but an external dependency and a cost above that tier.

**Do not use** anything requiring a database or a server to maintain. It defeats the reason for choosing this stack.

### 12.4 Form handling

```
Contact form  ("use client", react-hook-form + zodResolver)
  -> client-side validation against the shared Zod schema
  -> Turnstile challenge (invisible)
  -> POST /api/contact   (Next Route Handler, runs on Cloudflare Workers)
       -> verify Turnstile token
       -> re-validate payload with the SAME Zod schema (never trust the client)
       -> rate limit by IP
       -> compose subject line from enquiry type
       -> send notification to CONTACT_EMAIL (env var,
          currently vishnu@aksharbyonyks.com)
       -> send auto-reply to submitter
  -> confirmation state rendered client-side
```

**One schema, two uses.** The Zod schema lives in `lib/schemas/contact.ts` and is imported by both the client form and the Route Handler, so client and server validation cannot diverge. Server-side re-validation is not optional.

**Build it on shadcn's `Form`, `Input`, `Select` and `Label` primitives**, which wrap Radix and give correct keyboard and screen-reader behaviour out of the box. This is the one place the accessibility requirements in 7.3 are genuinely hard to hand-roll, and it is a direct benefit of the stack change. Persistent visible labels still required; do not rely on shadcn defaults for that.

**Storage decision:** in Phase 1, do not store submissions at rest beyond email. Email-only is the lowest-risk posture under DPDP: less personal data held means fewer obligations. If a CRM is introduced later, storage and retention policy must be written first.

### 12.5 Environments

| Environment | Branch | URL | Purpose |
|---|---|---|---|
| Production | `main` | aksharbyonyks.com | Live |
| Staging | `develop` | staging.aksharbyonyks.com, behind Cloudflare Access | Client review |
| Preview | any PR | auto-generated | Per-change review |

Staging must be `noindex` and access-controlled. A crawlable staging copy of a medical device site is a real problem.

### 12.6 Internationalisation

Assumed default pending Open Questions 2.5: English at launch, architecture ready for more.

Build now regardless:

- **next-intl** configured with `en` as default locale, unprefixed.
- All UI strings in `messages/en.json`, never hardcoded in components. Enforce with a lint rule against bare string literals in JSX where practical.
- Keystatic collections keyed by locale.
- `hreflang` emitted via the App Router `metadata` export.
- Language switcher component built and hidden.
- `next/font` loads a Devanagari subset from day one so the type system is not redone.

Adding Hindi later then costs translation and review time only, not a rebuild.

### 12.7 Domains

Checked by DNS resolution on 12 August 2026.

#### 12.7.1 What exists today

| Domain | Status | Detail |
|---|---|---|
| **`aksharbyonyks.com`** | **Registered and live** | Nameservers `dns1/dns2.registrar-servers.com`, which is **Namecheap** default DNS. A record `192.64.119.144`, a Namecheap parking page. **MX records point to Google Workspace**, so `vishnu@aksharbyonyks.com` is a working mailbox today. |
| `byonyks.com` | Registered, Byonyks USA | Already on **Cloudflare DNS**, with Google Workspace email. Useful: the group has existing Cloudflare familiarity. |

**Good news:** the primary domain is secured and the contact address from the client audit works. That resolves the domain half of Open Questions 2.8. What remains is confirming **who the registrant of record is** and obtaining DNS control.

#### 12.7.2 What to buy, and why

Every domain below resolved **NXDOMAIN**, meaning unregistered and available as of 12 August 2026. Availability is not permanent. Register in Phase 0.1.

| Domain | Priority | Reasoning |
|---|---|---|
| **`aksharbyonyks.in`** | **Buy now** | The `.in` ccTLD is a real credibility signal with Indian hospitals, distributors and especially government tender committees. For an entity whose entire positioning is "Indian company", not holding the Indian domain is a gap a competitor or a squatter can exploit. |
| **`aksharbyonyks.co.in`** | **Buy now** | The other commonly typed Indian variant. Cheap defensive registration. |
| `aksharbyonyks.net`, `aksharbyonyks.org` | Buy | Standard defensive set. Low cost, prevents impersonation of a medical device brand. |
| `akshar-byonyks.com` | Buy | Hyphenated variant, a common typo-squat target. |
| **`byonyks.in`** | **Flag to Byonyks USA** | **This is available.** Byonyks does not hold the Indian ccTLD for its own brand, in the market it is now licensing into. If a third party registers it, that is a problem for both entities and awkward to unwind. Worth raising even though it sits outside this project's scope. |

**Redirect policy:** one canonical hostname, `aksharbyonyks.com`. Every other registration 301-redirects to it. Do not serve duplicate content across domains; it splits search authority and creates a canonicalisation problem.

#### 12.7.3 Moving DNS to Cloudflare

The site deploys on Cloudflare Pages, so DNS should move from Namecheap to Cloudflare.

> **Warning. This is where teams break their own email.**
>
> `aksharbyonyks.com` currently has **live Google Workspace MX records** at Namecheap. Changing nameservers to Cloudflare **without recreating those MX records first will stop all email to `vishnu@aksharbyonyks.com`**, which is the single address every enquiry on this site routes to.
>
> **Order of operations, non-negotiable:**
>
> 1. Export the full existing zone from Namecheap. Every record, not just the ones that look important.
> 2. Add the domain to Cloudflare and let it import.
> 3. **Verify every MX record and the Google Workspace SPF TXT record are present in Cloudflare** before touching nameservers.
> 4. Only then change nameservers at Namecheap.
> 5. Send a test email from an external address and confirm delivery before proceeding.

#### 12.7.4 Infrastructure checklist

- Cloudflare DNS for all registered domains.
- **SPF, DKIM and DMARC configured before the first form goes live.** Auto-replies from the Worker will otherwise land in spam and enquiries will be silently lost. Coverage must include the transactional sender (Resend or Postmark) as well as Google Workspace.
- Cloudflare WAF, default managed rules.
- Cloudflare Access on the staging subdomain, per 12.5.
- **Do not point the domain at the new site until the legal pages are live** and every launch gate in 14.4 has passed.

### 12.8 Tooling: plugins, MCP servers and component libraries

#### 12.8.1 The governing rule

**v0.4's rule is retired.** It said "design reference, not runtime dependencies," and it existed because the stack was Astro. On React and Tailwind, shadcn **is** the component system. The rule that replaces it is narrower and sharper:

> **Install freely. Hydrate deliberately.**

Pulling a shadcn component costs nothing at runtime if it renders on the server. What costs is `"use client"`. So:

1. **Install what you need.** `npx shadcn@latest add <component>`, or ask the shadcn MCP server. Components arrive as source in `components/ui/`, owned by us and editable.
2. **Restyle to the 6.1 tokens immediately.** Never ship shadcn's default palette. Set the token values at `init` so this happens once rather than per component.
3. **Default to Server Components.** A shadcn Card, Table, Badge or Separator with no interaction has no reason to be a client component. Most of the 7.2 inventory is in this category.
4. **Use `"use client"` where a component needs it.** No audit trail required. Push the directive as far down the tree as possible where it's easy to: a client-side disclosure button inside a server-rendered card, not a client-rendered card.
5. **Read the Next build output on every PR.** First-load JS per route is printed for free. Enforce it in CI per 11.3.
6. **Prefer the platform.** `<details>` for disclosure, `<select>` for selects, CSS for animation and scroll effects. Reach for a component when the native element genuinely cannot do the job, which for the form controls it cannot.

**What did not change:** third-party licensing still needs checking per component. **What did change in v0.6:** the JavaScript budget is no longer an active gate during frontend build — see 11.3. It returns as a hard gate at the post-frontend performance pass and at 14.4's launch gate.

#### 12.8.2 Install in Phase 0

Verify each command against the project's current README at install time. Install order matters only for Context7, which should go first so every subsequent tool is configured against current docs.

| # | Tool | Type | Install | Why, for this project |
|---|---|---|---|---|
| 1 | **Context7** | MCP server | `npx ctx7 setup` | Next.js 15 App Router, `@opennextjs/cloudflare`, shadcn, Tailwind v4, Keystatic, next-intl, Pagefind and Turnstile all move fast, and model training data on them is stale. This pulls current version-specific docs into the prompt. **Install first.** Add a rule to `CLAUDE.md` telling the agent to consult it before writing framework code. |
| 2 | **MarkItDown** | CLI | `pip install 'markitdown[all]'` | Converts Word, PowerPoint, Excel and PDF to Markdown so they cost a fraction of the input tokens. This project already has two client `.docx` files and will get more: the licence agreement, regulatory correspondence, brand guidance, tender templates. **Run it on every document before reading it.** |
| 3 | **Impeccable** | Skill | `npx impeccable install` | 23 design commands and **59 deterministic detector rules**, including contrast checks and AI-slop anti-patterns (overused fonts, purple gradients). Given that the whole reason for Section 6.1 is a contrast failure on the current site, an automated detector on our own output is worth having. Use `/impeccable audit` and `/impeccable critique` on every new template. |
| 4 | **Plain Playwright** | Library | `npm i -D @playwright/test` then `npx playwright install chromium` | Visual regression and accessibility CI against our own pages, which are stable and under our control. Deterministic, free, fails loudly. **This is the default, not playwright-mcp.** See 12.8.4. |
| 4b | **shadcn CLI and MCP server** | CLI plus MCP | `npx shadcn@latest init` then `pnpm dlx shadcn@latest mcp init --client claude`, then restart Claude Code | **The reason for the stack change.** The CLI copies components into the repo as source. The MCP server lets components be browsed, searched and installed conversationally, and **works with any shadcn-compatible registry**, including the third-party ones in 12.8.3. Configure those in `components.json` under `registries`. |
| 5 | **extract-design-system** | Skill | `npx skills add arvindrk/extract-design-system` (requires Node 20+ and Playwright) | Produces W3C `tokens.json` and `tokens.css` from a public site. Appendix D was produced by hand; this is the repeatable path. Use it on reference sites during design, and re-run it on our own staging build to confirm the token set is what we intended. **One page per run.** |
| 6 | **Codeburn** | Plugin | Per repo README | Reads prior sessions and reports where token spend went. On a four-phase build this is the difference between knowing and guessing what the AI-assisted portion actually costs. Install now, read it at each phase gate. |
| 7 | **21st.dev** | Web service | Account only | Already required by the client audit for the Careers icon portfolio. **Two free components per day**, which is a planning constraint: queue the components you need rather than discovering the limit mid-session. **Licensing is inconsistent per component. Check each one before shipping.** See F-7. |

**Optional, install when the phase needs it:**

| Tool | Type | Install | When |
|---|---|---|---|
| **`@next/bundle-analyzer`** | Library | `npm i -D @next/bundle-analyzer` | **The post-frontend performance pass, not Phase 0 (v0.6).** Wire it into CI when 11.3's deferred budget is set, not before. |
| **claude-video** | Plugin | Per repo README | Phase 1, for ByoTalks captions, and Phase 3 if transcripts are approved. **Pass explicit start and end timestamps.** Full-length video analysis is extremely token-expensive across eight sessions. |
| **marketingskills** | Skill collection | Per repo README | Phase 1 and 2 content work. **Download only the relevant parts.** The full collection is very large and most of it does not apply to a regulated medical device site. |
| **n8n-mcp** | MCP server | Per repo README | Phase 3 only, if the form pipeline grows past email into a CRM. Not needed for the Phase 1 architecture in 12.4. |
| **remotion skills** | Skill | Per repo README | Phase 3 at the earliest, if a product explainer video is commissioned. |

#### 12.8.3 Component libraries, and where each is allowed

Verdicts are for this project specifically: a regulated medical device site, investor-first, patient-second, on a hard accessibility budget and a performance budget deferred to the post-frontend pass (11.3).

**This table is substantially rewritten for v0.5.** On React and Tailwind, most of these become directly usable rather than reference-only.

| Library | Verdict | Where it may be used |
|---|---|---|
| **shadcn/ui** | **The base layer** | Every primitive: form controls, tables, accordion, dialog, tabs, badge, card, separator. Install via CLI or MCP, restyle to 6.1 tokens at init. Its Radix foundation gives correct keyboard and screen-reader behaviour, which directly serves 7.3. |
| **Magic UI** | **Install, via registry** | shadcn-compatible, so add it to `components.json` and pull components directly. Device mockups for the X-1 interface on `/innovation/the-x1-cycler/`. **Text animation on the homepage hero at most, never on patient education pages**, and each animated component is a `"use client"` decision that must clear 11.3. |
| **Unlumen.ui** | **Install, via registry** | shadcn registry. Navigation and marketing patterns. Same client-boundary discipline. |
| **smoothui.dev** | **Install, conditionally** | Requires Tailwind v4 and React 19, which **we now ship**, so the v0.4 blocker is gone. Marketing layouts, hero and section composition. It also has a Claude MCP plugin. |
| **reactbits.dev** | **Selective install** | Large, stack-agnostic, text effects and backgrounds. Take individual components rather than adopting wholesale, and treat every animated one as a bundle decision. **Silk** (WebGL shader background, React Three Fiber) is parked at `design-system/components/Silk.jsx`, staged but not installed — it is a shader background, so the Shaders.com row's guardrails apply verbatim: homepage hero only, static fallback, disabled under `prefers-reduced-motion`, never on patient/clinical/regulatory pages. **ScrollStack** (scroll-pinned card stack, requires `lenis`) is parked at `design-system/components/ScrollStack.jsx`, staged but not installed, targeted at the five person cards on `/about-us/leadership/`. See `7.2` and `design-system/components/README.md` — it's a `"use client"` component, an ordinary choice for what it does, and it needs an explicit `prefers-reduced-motion` fallback the upstream source does not provide. |
| **Haikei** (`haikei.app`) | **Still recommended** | Static SVG backgrounds, zero JavaScript. On a React stack this matters more, not less: it is free page weight where an animated background is not. The notes call the output "dated"; that is a design-direction problem for the designer, not a technical one. |
| **Shaders.com** | **Almost certainly no** | WebGL shader backgrounds on a site targeting mid-range Android on constrained Indian bandwidth is the wrong trade. If the designer insists on one shader treatment, it is **homepage hero only**, `client:visible`, with a static image fallback, disabled under `prefers-reduced-motion`. No LCP threshold is enforced during frontend build (11.3), but this is exactly the kind of addition the deferred performance pass exists to catch — measure it then, and be willing to cut it. Never on patient, clinical or regulatory pages. |
| **Lottie** (`lottiefiles.com`) | **Yes, one specific use** | A Lottie explainer of the peritoneal dialysis exchange cycle on `/innovation/how-it-works/`. Small file, scales cleanly, far better than video for a diagram. **Two conditions: a nephrologist signs off on the clinical accuracy of the animation, and the licence is checked.** The notes flag licensing explicitly. |
| **retroui.dev** | **No** | Retro theme only, with no custom theming. Wrong register for a medical device company, regardless of stack. |
| **ui.watermelon.sh**, **variant.com** | **No** | Dashboard and app UI. Nothing on this site is a dashboard and nothing is gated. |

**Registry configuration.** Add third-party registries once in `components.json`:

```json
{
  "registries": {
    "@magicui":  "https://magicui.design/r/{name}.json",
    "@unlumen":  "https://unlumen.ui/r/{name}.json"
  }
}
```

Then `npx shadcn@latest add @magicui/marquee`, or ask the MCP server for it. **Verify each registry URL against its current documentation at setup time**, and check the licence on every component pulled from a third-party registry before it ships.

#### 12.8.4 Deliberately excluded, and why

Naming these prevents someone re-proposing them in month three.

| Tool | Why not |
|---|---|
| **Headroom** | **macOS only.** The team is on Windows. Also paid. Non-starter regardless of merit. |
| **Graphify** | Built for large unfamiliar repositories. This is a greenfield Next.js project the team is writing. Nothing to map. |
| **Ponytail** | The notes say it modifies existing code. On a regulated site where every claim has been through counsel and regulatory review, a tool that rewrites code unprompted is a liability. Excluded. |
| **playwright-mcp** | The notes make the case well: cost and latency on every run, significant configuration, and Microsoft points its own coding agents at the plain CLI instead. Our pages are stable and we control them, so the LLM-in-the-loop layer buys nothing. **Revisit only if plain Playwright scripts start breaking because page structure keeps changing.** |
| **browser-harness** | Explicitly bad for CI, which is where our browser automation lives. Useful for messy one-off tasks on logged-in sites; we do not have those. |
| **career-ops** | Job scraping. Not applicable. Note that the Careers page ships without an ATS in Phase 1 anyway. |
| **ecc** | The notes carry the link with no description. **Unassessed.** Do not install until someone has evaluated what it does. |

#### 12.8.5 The exploded-view scroll animation

The notes describe a technique for scroll-driven product animation: generate a start frame and an exploded-view end frame in Google Flow, interpolate to video, convert to a 30fps JPG sequence via ezgif, and drive it from scroll position.

On `/innovation/the-x1-cycler/` this would be a strong treatment. An exploded view of an APD cycler that assembles as you scroll is exactly the kind of thing that makes a device page memorable to an investor.

**Two hard constraints before anyone builds it.**

**Regulatory.** This is a cleared medical device. **Do not use a generated depiction of the X-1.** An AI-generated image that differs from the actual cleared device is a labelling and advertising exposure, not an aesthetic choice, and it would not survive review under the advertising rules in Section 14.2. The technique must be driven from **photography or CAD renders of the real device**, and the sequence needs regulatory sign-off like any other product imagery. If generated imagery is used anywhere on the site for any purpose, see the AI disclosure note in 14.3.

**Performance.** A 30fps frame sequence is hundreds of images, which is not free regardless of whether a formal page-weight budget is active. Required guardrails: desktop and large-tablet only; static hero image on mobile; frames lazy-loaded and preloaded in a window around the scroll position, never all at once; AVIF or WebP, not JPG; disabled entirely under `prefers-reduced-motion`. No page-weight cap is enforced during frontend build (11.3 is deferred), but this component is a first candidate for cutting if the post-frontend performance pass finds it too heavy. **Be willing to cut it.**

### 12.9 Engineering defaults that keep performance recoverable later

**No budget is enforced during frontend build (v0.6, see 11.3).** What follows is not "hold this number" — there is no number yet. It is the set of defaults cheap to build in from day one and expensive to retrofit, so that whatever the post-frontend performance pass finds is a tuning problem, not an architecture problem. Build with them; do not gate merges on them.

| # | Discipline | Detail |
|---|---|---|
| 1 | **Server Components by default** | The App Router's default rendering mode. `"use client"` goes on components that need it — the 7.2 table tracks known cases, not a gate every new one must clear. |
| 2 | **Push client boundaries down** | A client disclosure button inside a server-rendered card, not a client-rendered card. Wrapping a large subtree in `"use client"` to make one button work is the most common way React sites get heavy, budget or no budget. |
| 3 | **Prerender every content route** | `export const dynamic = 'force-static'` plus `generateStaticParams` on dynamic segments. Any route that opts into SSR needs a reason. |
| 4 | **`next/dynamic` for below-the-fold interactivity** | The video player facade, the FAQ accordion and anything in the footer load on demand rather than in the initial bundle. |
| 5 | **No client-side data fetching** | Content is read at build time through the Keystatic reader. There is no reason to ship a fetching library, and no SWR or React Query in this project. |
| 6 | **No animation library unless earned** | CSS transitions and `@keyframes` handle almost everything the design needs. If Framer Motion or similar is proposed, scope it to specific routes; it becomes a real question at the performance pass, not a blocker now. |
| 7 | **`next/font` only** | Self-hosted, subset, no third-party font request, no layout shift. |
| 8 | **Tree-shake icons** | Import individual icons (`import { ArrowRight } from 'lucide-react'`), never a barrel import of the whole set. |

**Deferred to the post-frontend performance pass, not run during frontend build:** the CI bundle-size check (`@next/bundle-analyzer`, previously item 8 here) and Core Web Vitals auditing on a throttled mobile profile (previously item 10). Both return at that pass and are a hard requirement of 14.4's launch gate — see the v0.6 changelog for why they're not active now.

**If the eventual budget cannot be held**, the escape hatch is `output: 'export'` for the content routes with the form on a standalone Worker, which is the v0.4 architecture reached by a different path. Decide that at the performance pass on evidence, not on instinct.

---

## 13. Analytics and measurement

| Tool | Purpose | Privacy posture |
|---|---|---|
| Cloudflare Web Analytics | Traffic, pages, referrers, Core Web Vitals field data | Cookieless, no personal data, no consent banner |
| Google Search Console | Search performance, indexing, structured data validation | No site-side tracking |
| Server-side form event logging | Conversion counts by enquiry type | Aggregate only, no personal data |

**Deliberately excluded from Phase 1: Google Analytics and Meta Pixel.** Both require a consent banner under DPDP and both add weight. If paid acquisition begins later, revisit with a consent management platform in place. Starting without them and adding later is far easier than the reverse.

**Reporting:** one monthly report covering sessions by section, enquiries by type, top organic queries, Core Web Vitals, and ByoTalks engagement.

---

## 14. Legal, regulatory and compliance

**I am not a lawyer and this is not legal advice. Everything here needs review by Indian counsel and by a regulatory affairs professional before launch.** This is a checklist of what to ask them, not an answer.

### 14.1 Data protection: DPDP Act 2023

byonyks.com's total absence of a privacy policy is the most urgent defect not to carry forward. Work through with counsel:

- A privacy notice at the point of collection: what is collected, why, for how long.
- Consent that is free, specific, informed, unconditional and unambiguous, captured by affirmative action. **An unchecked checkbox. Not pre-checked, and not implied by submission.**
- Notice availability in the languages listed in the Eighth Schedule on request. May affect the language decision.
- Data principal rights: access, correction, erasure, grievance redressal.
- **A named Grievance Officer with published contact details.** Hence `/grievance-redressal/`.
- Breach notification procedure documented internally.
- Retention limits, and deletion when the purpose is served.

The minimal-data architecture in 12.4 is chosen specifically to keep these obligations small.

### 14.2 Medical device regulation and the licensing structure

The licensing relationship changes the regulatory picture materially from v0.1. Confirm with regulatory counsel:

- **Who is the CDSCO licence holder?** Under the Medical Device Rules 2017, an imported device requires an import licence (Form MD-14 application, Form MD-15 licence) held through an Indian authorised agent holding a manufacturing or wholesale licence. **Establish whether Akshar Byonyks is that agent.** Every regulatory statement on the site depends on the answer.
- **Confirm the X-1's risk classification** under MDR 2017 and the licence route that follows.
- **Never conflate FDA clearance with Indian authorisation.** State both, separately, and attribute the FDA clearance to Byonyks. byonyks.com's sitewide FDA banner would be actively misleading in an India-only context.
- **Local manufacturing.** If Hyderabad and Ahmedabad will manufacture, that is a separate licence route (Form MD-3 / MD-5 via the State Licensing Authority for lower-risk classes, Form MD-7 / MD-9 via the Central Licensing Authority for higher). Do not describe them as manufacturing facilities before the licence path is confirmed.
- **Advertising to the public.** The Drugs and Magic Remedies (Objectionable Advertisements) Act 1954 restricts public advertising for the treatment of certain conditions. Patient-facing content must be educational, must not promise outcomes, and must direct treatment decisions to a physician.
- **Labelling and IFU.** Anything reproducing device labelling or instructions for use must match the approved documents exactly.
- **Testimonials.** Patient testimonials for medical devices carry regulatory risk in India and require signed consent.
- **In-development products.** `/innovation/whats-next/` must state clearly that X2 and X3 are in development and not available for sale.
- **Trade mark use.** Confirm written permission from Byonyks USA for use of the name, marks, product imagery and clearance references. See F-6.

### 14.3 Required pages

| Page | Status |
|---|---|
| `/privacy-policy/` | Required. Drafted by counsel, not adapted from a template. |
| `/terms-of-use/` | Required. |
| `/cookie-policy/` | Required, even with minimal cookies. |
| `/grievance-redressal/` | Required under DPDP. Named officer, contact, process, timeline. |
| `/accessibility/` | Recommended. Conformance target and a contact for issues. |
| Medical disclaimer | Component on every patient-facing page. |
| AI disclosure | **Required if any AI-generated imagery, video or copy ships.** The tooling notes flag FTC AI disclosure obligations. Confirm the equivalent Indian requirement with counsel, and note that on a medical device site the higher bar is the advertising rules in 14.2 rather than disclosure alone: a generated depiction of a cleared device that differs from the real one is a labelling problem no disclaimer fixes. See 12.8.5. |

**`[TOOL]` What the no-gating decision buys us.** The tooling notes carry a substantial checklist for custom login screens: session tokens out of `localStorage` and into httpOnly cookies, server-side authorisation on every route, RLS policies, email verification, rate limiting and lockout on auth endpoints, and enforced password policy with breached-password checks. **None of it applies, because nothing on this site is gated in any phase.** That is worth stating explicitly: the decision to keep everything public removed an entire class of security obligation, review burden and ongoing liability. **If an investor data room is ever reintroduced, that whole checklist becomes live and must be budgeted as its own workstream.** The arbitration-clause and terms-of-service points in those notes are US-framed; arbitration clauses in consumer contracts are treated differently under Indian law, so route that to counsel rather than copying the US pattern.

### 14.4 Launch gate

**The site does not go live until:**

1. All legal pages are published.
2. Consent capture works on the contact form.
3. No placeholder contact details exist anywhere. A real phone number is live.
4. The India address, the five executives, and the US office decision are all resolved.
5. Regulatory has signed off on every device claim and on the licensing wording.
6. Byonyks USA has approved use of its name, marks and clearance reference in writing.
7. A nephrologist has reviewed all patient-facing content.
8. F-1 is resolved and no facility claim is unattributable.
9. **The performance pass deferred in 11.3 has run**, against real Core Web Vitals field data on a throttled mobile profile, with targets set and met. Deferred until after frontend build; not deferrable past this gate.

Hard gate. byonyks.com shipping with `123-456-7890` in the footer of an FDA press release is exactly the failure mode this prevents.

---

## 15. Phases of development

Working estimates assuming one designer, one developer, one writer, and an available client decision-maker. **Roughly two weeks shorter than v0.1 because the audit cut the scope.**

### Phase 0: Discovery and decisions (1.5 to 2 weeks)

#### Phase 0.1: Tooling setup (half a day, do this first)

Before any discovery work, because MarkItDown changes how every subsequent document is read and Context7 changes how every subsequent line of framework code is written.

```bash
# 1. Context7 first, so everything after is configured against current docs
npx ctx7 setup

# 2. MarkItDown, before reading any client document
pip install 'markitdown[all]'
markitdown "Akshar Byonyks.docx" > client-audit.md
markitdown "AI Notes.docx"        > tooling-notes.md
# run this on every .docx, .pptx, .xlsx and .pdf the client sends, without exception

# 3. Impeccable, into the project root once the repo exists
npx impeccable install

# 4. Playwright, for visual regression and accessibility CI
npm i -D @playwright/test && npx playwright install chromium

# 4b. Scaffold the app, then the component system
npm create cloudflare@latest -- akshar-byonyks-web --framework=next
cd akshar-byonyks-web
npx shadcn@latest init          # set the 6.1 token values HERE, not later
pnpm dlx shadcn@latest mcp init --client claude   # then restart Claude Code
npm i next-intl @keystatic/core @keystatic/next zod
# @next/bundle-analyzer intentionally NOT installed here (v0.6) — see 11.3.
# Install it when the post-frontend performance pass starts, not in Phase 0.

# 5. Design token extraction (needs Node 20+ and the Playwright install above)
npx skills add arvindrk/extract-design-system
```

Then, in `CLAUDE.md` at the repo root, add standing rules:

- Consult **Context7** before writing Next.js App Router, OpenNext, Keystatic, next-intl, Pagefind or Turnstile code. All of these move fast. Do not write framework code from memory.
- Run **`/impeccable audit`** on every new template before it goes to review.
- **Server Components by default,** the App Router's default rendering mode. See 12.9 for the client-component reference list; it's not a gate to clear.
- No first-load-JS measurement is required before merging in Phase 1 (v0.6, see 11.3). That changes at the post-frontend performance pass.
- Every colour must resolve through a token from Section 6.1. **No hardcoded hex and no arbitrary Tailwind colour values in components.**
- Prefer **shadcn primitives** over hand-rolled interactive controls, and the **native element** over both where it does the job.

**Also in Phase 0.1:** create the 21st.dev account and **queue the components needed for the Careers icon portfolio**, because the free tier allows two per day and discovering that mid-build costs a week. Check the licence on each one as it is pulled.

**Install Codeburn now** and read it at every phase gate, so the AI-assisted cost of the build is measured rather than estimated.

#### Phase 0.1b: Domains and repository

**Domains.** `aksharbyonyks.com` is already registered at Namecheap with working Google Workspace email. Confirm the registrant of record and obtain DNS control. Then **register the available variants immediately**, all of which resolved NXDOMAIN on 12 August 2026:

- `aksharbyonyks.in` and `aksharbyonyks.co.in`, priority, for Indian institutional and tender credibility
- `aksharbyonyks.net`, `aksharbyonyks.org`, `akshar-byonyks.com`, defensive
- **Separately, flag to Byonyks USA that `byonyks.in` is unregistered.** Their brand and their call, but it is exposed in the market they are licensing into.

Do not migrate DNS to Cloudflare until the MX preservation procedure in 12.7.3 has been followed. Breaking `vishnu@aksharbyonyks.com` takes every enquiry path on the site offline.

**Repository.** Create the GitHub organisation and the `web` repository before build starts, so Cloudflare Pages binds to its permanent home rather than being reconnected later. The organisation matters here specifically because **Keystatic is git-based**: the client's content editors will be committing, which needs organisation membership with a scoped team, not collaborator invites on someone's personal account. Note that branch protection on a private repository requires the GitHub Team tier, so budget for it if the review gates in 10.2 are to be enforced mechanically through `CODEOWNERS`.

#### Phase 0.2: Discovery

Driven entirely by the companion Open Questions document.

- **Resolve F-1: proof attribution.** Highest priority.
- Resolve the US office question (F-2).
- Get the India address, the five executives, and a real phone number.
- ~~Confirm the investor section~~ **Resolved 20 Aug 2026: cut. See 9.6.** Confirm the language decision.
- Get the India regulatory position and confirm the CDSCO authorised agent.
- Confirm the licence agreement wording and get Byonyks USA's written approval.
- Confirm the function of the Hyderabad and Ahmedabad hubs.
- **Source and date every statistic.** Longest task in this phase; will slip without one named owner.
- Gather assets: ByoTalks masters, device photography, BBC segment.
- Register `aksharbyonyks` variants including `.in`.
- Engage Indian counsel.
- Brief the custom logo and identity work.

**Exit criteria:** F-1 resolved, Tier 1 and Tier 2 questions closed, statistics sourced, counsel engaged, domains secured.

### Phase 1: Foundation and launch (5 to 6 weeks)

**Design (weeks 1 to 3, overlapping build)**
Logo and identity, design system, and high-fidelity design for six screens: home, one hub template, one content template, one bio template, one article template, the contact form. Everything else composes from the system.

**Build (weeks 2 to 5)**

- Next.js 15 App Router scaffold via OpenNext, Cloudflare Workers, CI, three environments.
- Tailwind v4 `@theme` tokens set from 6.1. shadcn initialised **against those tokens**, not defaults.
- Design system built on shadcn primitives, Server Components by default.
- Keystatic config, `@keystatic/next` admin at `/keystatic` with `noindex`, reader wired into Server Components.
- `scripts/validate-content.ts` in the prebuild step, failing on unsourced statistics.
- Contact form: shadcn `Form` primitives, shared Zod schema, `/api/contact` Route Handler, Turnstile, Resend.
- SEO foundations: App Router `metadata`, sitemap, robots, structured data, hreflang scaffold.
- next-intl configured, single locale active.
- Cloudflare Web Analytics, Pagefind post-build indexing.
- **Bundle analyzer and the CI size gate from 11.3, wired up in week 2, not week 5.**

**Pages (14 plus collections)**
```
/                              /innovation/
/innovation/the-x1-cycler/     /innovation/how-it-works/
/innovation/market/            /byotalks/ (+ 8 sessions)
/manufacturing/                /about-us/
/about-us/our-story/           /about-us/leadership/ (+ 5 bios)
/about-us/careers/             /news/ (+ 2 articles)
/contact/                      All 5 legal pages
```

**Deferred to Phase 2:** `/innovation/whats-next/`, commissioned photography. (The investor section is not deferred — it's cut, 20 Aug 2026, see 9.6.)

**Exit criteria:** all launch gates in 14.4 passed, including the performance pass (14.4 item 9) run against real Core Web Vitals on a throttled mobile profile; axe clean; forms tested end to end; Search Console verified. **No performance number gates the build sub-phase of Phase 1** (v0.6, see 11.3) — the performance pass runs once the frontend is functionally complete, as the last step before this phase actually exits.

**Decision point at the performance pass:** if the JavaScript budget set at that pass cannot be held after applying 12.9, decide then whether to move content routes to `output: 'export'`. On evidence, not instinct.

### Phase 2: Depth (3 to 4 weeks)

- `/innovation/whats-next/` with in-development labelling.
- Commissioned photography shot and integrated, replacing all stock.
- Manufacturing page populated as the Hyderabad and Ahmedabad hubs firm up.
- First post-launch performance and accessibility audit.
- Editorial training and handover, with a written content guide.

### Phase 3: Scale (4 to 8 weeks, scope-dependent)

- **Hindi locale**, if approved. Translation, review by a native-speaking clinician, locale QA. Budget 3 to 4 weeks.
- **ByoTalks enhancement (optional, per F-4):** transcripts, topic filtering, related sessions. Highest content return available for the effort.
- **Featured Highlights and From the Experts populated**, switching the scaffolds live.
- **Careers:** jobs collection and job pages, if hiring volume justifies it.
- **CRM integration**, with a retention and consent policy written first.
- Conversion optimisation on the contact path.

### Phase 4: Operate (ongoing)

**Monthly:** one news post minimum; review any statistic whose `asOfDate` is over 12 months old; check Search Console for errors; review form conversion.
**Quarterly:** Core Web Vitals review; accessibility spot check; content gap analysis; add ByoTalks sessions as recorded.
**Annually:** full accessibility audit; legal page review against regulatory change; design system review.

**Assign an owner in Phase 0.** byonyks.com's news index, whose newest post is from February 2026, is what happens without one.

---

## 16. Risks

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| **F-1 unresolved: no attributable manufacturing or clinical proof** | **Very high. The investor case and the clinician case both rest on it.** | High | Resolve in Phase 0. Recommended: attribute to Byonyks, never to a country. |
| Statistics cannot be sourced to a credible current reference | High. The market case collapses; unsourced numbers are a regulatory risk. | High | Own it in Phase 0. Cut unsourceable claims rather than soften them. |
| Licence agreement does not support the claimed positioning | High. It is the site's central claim. | Low to medium | Verify the executed agreement in Phase 0. Get written approval. |
| Five executives not identified | High. Launch gate. Investor-first with no named team is not credible. | Medium | Open Questions 1.4. |
| Regulatory review rewrites patient copy late | High. Rework at the end of Phase 1. | Medium | Engage counsel in Phase 0. Send page outlines before copy is written. |
| Home address published as the US office | Medium. Diligence flag plus personal privacy exposure. | Medium | F-2. Recommended: drop the US office listing. |
| Photography slips | Medium. Launches with stock, undercutting credibility. | Medium | Book the shoot in Phase 0. |
| Designer reproduces the Byonyks palette from a screenshot or the live site | Medium. Reintroduces the failing `#1388cd` as a text colour and the site ships an AA failure. | **High**, because copying the existing brand is the obvious thing to do | Give the designer Appendix D and the Design Token Audit at brief time, not at review. Put the token table from 6.1 in the design file itself. |
| Hero text ships over unscrimmed imagery | Medium. The most common AA failure on marketing sites, and axe will not catch it. | Medium | Scrim built into the hero component per 7.2. Manual pass over every hero before launch. |
| Empty News scaffolds look broken at launch | Medium. Undercuts credibility. | Medium | CMS toggle to hide empty sections. |
| Scope creep from "rebuild byonyks.com too" | High. Doubles the project. | Medium | byonyks.com is explicitly out of scope. Written amendment required. |
| Consumables supply questions go unanswered | Medium. First objection every nephrologist raises. | High | Address it directly in the Innovation section. |
| Team cannot maintain the site after handover | Medium. Site decays. | Medium | Keystatic, a written editorial guide, and training in Phase 2. |
| **`"use client"` spreads and first-load JS drifts, unmeasured, through frontend build** | **High. This is the main risk the stack change introduces, and v0.6's deferred budget (11.3) knowingly widens the window it has to happen in.** Degrades the patient experience on mid-range Android over constrained bandwidth, and it accumulates invisibly with no CI gate catching it in the moment. | **High.** Marking a component client-side is always the quickest way to make something work, and as of v0.7 there's no PR-level justification requirement to slow that down either. | No gate exists during frontend build — v0.7 removed the informal one along with the numeric one. The `@next/bundle-analyzer` CI gate and per-route first-load JS check are deferred to the post-frontend performance pass (11.3) and are a hard requirement of 14.4's launch gate: whatever accumulated gets measured and, if it's too heavy, cut back then, not caught as it happens. |
| Team unfamiliarity with React Server Components | Medium. RSC boundaries are the most commonly misunderstood part of the App Router, and getting them wrong is exactly what causes the risk above. | Medium | Context7 for current docs. Review the client boundary explicitly in every PR. Budget a short ramp-up in Phase 1 week 1. |
| shadcn defaults ship instead of brand tokens | Medium. The site looks like every other shadcn site, which for a brand with no public presence is a real cost. | **High if tokens are not set at `init`** | Set 6.1 values during `shadcn init`, before adding a single component. Run `/impeccable critique` on the first templates. |
| Third-party registry component licence not cleared | Medium. Same exposure as 21st.dev, now across more registries. | Medium | Check the licence on every component pulled from a third-party registry, at pull time. |
| 21st.dev two-per-day limit discovered mid-build | Low to medium. Costs days of waiting at exactly the wrong moment. | Medium | Queue the needed components in Phase 0.1. |
| 21st.dev component licence is not cleared before shipping | Medium. Licensing is inconsistent per component and this is a commercial medical site. | Medium | Check the licence on each component as it is pulled, not at launch review. |
| AI-generated imagery of the X-1 ships | **High. Regulatory exposure, not an aesthetic issue.** | Low if flagged, high if not | 12.8.5. Real photography or CAD only. Regulatory sign-off on product imagery like any other device claim. |
| claude-video run without timestamps | Low. Token cost, not a quality risk. | Medium | Explicit start and end timestamps on every run, per 12.8.2. |

---

## 17. Immediate actions

### On byonyks.com, this week, independent of this project

1. **Replace `123-456-7890` and the broken email in the footer.** Ten minutes of work, currently damaging every page including the FDA press release.
2. **Publish a privacy policy** and add a consent checkbox to the contact form.
3. **Fix the conflicting home dialysis percentage** between `/the-plan/` and `/market/`.
4. **Fix "Perfect for for every lifestyle"** on `/innovation/`.
5. **Darken the link colour from `#1388cd` to `#0d5d8d`.** One value in Elementor's global settings. It takes the site from an AA failure on every link on every page to an AAA pass, and costs nothing visually. Worth flagging to Byonyks USA independently of the India project.
6. **Fix `#c8d5dc` on white on the Innovation page.** 1.5:1, effectively invisible.

### To unblock Phase 0

See the companion Open Questions document. The five that matter most:

1. **F-1: proof attribution** once Pakistan is removed.
2. **The India address.** The audit line is truncated.
3. **The five executive names, bios and portraits.**
4. **The X-1's CDSCO status and the authorised agent.**
5. **Byonyks USA's written approval** for name, mark and clearance-reference use.

---

## Appendix A: Complete byonyks.com URL inventory

```
https://byonyks.com/
https://byonyks.com/innovation/
https://byonyks.com/market/
https://byonyks.com/learn/
https://byonyks.com/byonyks-global/
https://byonyks.com/united-states/
https://byonyks.com/south-asia/
https://byonyks.com/middle-east/
https://byonyks.com/east-africa/
https://byonyks.com/europe/
https://byonyks.com/about-us/            (anchors: #Team, #SAB, #BOD)
https://byonyks.com/news-and-media/      (anchors: #highlights, #doctors, #updates)
https://byonyks.com/careers/
https://byonyks.com/manufacturing/
https://byonyks.com/contact/
https://byonyks.com/the-vision/
https://byonyks.com/the-people/
https://byonyks.com/the-plan/
https://byonyks.com/products/
https://byonyks.com/the-progress/
https://byonyks.com/fda-510k-clearance/
https://byonyks.com/byonyks-makes-headlines-fda-cleared-x1-apd-cycler-set-to-enter-u-s-market/

Bios (25):
/farrukh-usman/  /rod-kenley/  /salahuddin-khan/  /doug-wilkerson/  /annie-usman/
/frank-rudolph-2/  /eric-flachbart/  /andrew-king-md/  /michael-wollowitz/
/mary-hoffman/  /hassan-abrar/  /nauman-tarif-md/  /ahmed-muzmmal/  /senthil-kumar/
/prof-fredric-finkelstein-md/  /madhukar-misra-md/  /klemens-meyer-md/
/matthew-rivara-md/  /isaac-teitelbaum-md/  /simon-davies-md/  /anjali-b-saxena-md/
/denise-barnes-r-n/  /khalid-mahmood-md/

Returns 404: /privacy-policy/
Note: Tahir Javed (BOD) has no bio page; links to /about-us/#Team
```

**Platform detected:** WordPress. robots.txt is framework default. Sitemap is the built-in `wp-sitemap.xml`, indicating no SEO plugin installed.

---

## Appendix B: Social profiles

```
Facebook   https://www.facebook.com/ByonyksMedical/
LinkedIn   https://www.linkedin.com/company/byonyks/
X          https://x.com/Byonyks_
YouTube    https://www.youtube.com/@Byonyks-Official
Instagram  https://www.instagram.com/byonyks/
```

**Recommendation: a separate LinkedIn company page for Akshar Byonyks**, because LinkedIn is the channel Indian investors and clinicians actually use, and a separate page is what makes the entity findable and verifiable. Share the other handles until there is content volume to justify more.

---

## Appendix C: Client audit, as received

Reproduced verbatim for traceability.

```
Akshar Byonyks: India specific
Custom logo
Keep innovation, base on India
Keep ByoTalks the same
Not global, only india
ONLY executive team: 5 person list (Name and bio and portrait)
Build future highlights and from the experst to be later populated
Keep latest updates as is
Keep both news articles
Keep about us careers, use icon portfolio from 21st dev
Keep manufacturing, will populate with future innovation hubs,
  coming soon to hyderbad and ahemadabad
Forward contact us to vishnu@aksharbyonyks.com
Put Us office to Vishnu Uncle home address
Change India address to
Get rid of Pakistan office
Official licensing partner of byonyks usa for india specific market
```

Note: the line "Change India address to" is incomplete as received.

---

## Appendix D: Design token audit, byonyks.com

Read from live computed styles across 15 pages at a 1280px viewport, 12 August 2026, using `getComputedStyle` rather than screenshot sampling. Contrast calculated per the WCAG 2.1 relative luminance formula. The full report with colour swatches is in the companion Design Token Audit.

### D.1 Headline finding

**There is no design system.** Not a weak one. Zero brand design tokens exist anywhere on byonyks.com. The only CSS custom properties present are WordPress core block presets that nothing uses (`--wp--preset--color--pale-pink`, `--wp--preset--color--luminous-vivid-orange` and the rest of the default palette) and Elementor and XPro plugin internals (`--xpro-hotspot-tooltip-transform-y` and similar).

Every colour, size and spacing value is hardcoded on the individual element inside Elementor. That is the mechanical reason there are eleven blues and eight dark neutrals, and it is the same root cause as the conflicting home dialysis statistic: there was never a single place to change anything.

### D.2 Contrast, measured

| Foreground | Background | Ratio | Result | Where |
|---|---|---|---|---|
| `#c8d5dc` | `#ffffff` | 1.50 | **FAIL** | Innovation, nav item. Effectively invisible. |
| `#2196f3` | `#ffffff` | 3.12 | **FAIL** | The Progress timeline. Stock Material Design blue, a plugin default. |
| `#1388cd` | `#ffffff` | 3.87 | **FAIL** | Every link, all 15 pages |
| `#ffffff` | `#1388cd` | 3.87 | **FAIL** | Footer and buttons, all 15 pages |
| `#69727d` | `#ffffff` | 4.88 | PASS | Social icons, captions |
| `#324a6d` | `#ffffff` | 8.99 | PASS | Footer contact block |
| `#33373d` | `#ffffff` | 11.97 | PASS | Body text |
| `#1c244b` | `#ffffff` | 14.96 | PASS | Navigation |
| `#011a48` | `#ffffff` | 16.90 | PASS | Headings |

**Not measurable:** the hero headlines are white text over background images ("Dialysis at Home" at 59px, "Market Dynamics", "ByoTalks: Nephrology Insights" at 72px). Contrast against a photograph varies pixel by pixel and cannot be computed. These need a manual check, and the new build addresses the class of problem with the mandatory hero scrim in 7.2.

### D.3 Colour inventory

**Eleven blues:** `#1388cd` (primary), `#011a48`, `#1c244b`, `#324a6d`, `#1a4db2`, `#132a59`, `#000673`, `#004c9a`, `#2196f3`, `#0581ff`, `#0077b5` (LinkedIn brand blue on bio pages).

**Eight dark neutrals, all doing one job:** `#33373d`, `#3f444b`, `#2b3138`, `#2b2b2b`, `#282828`, `#333333`, `#19191a`, `#000000`.

**Four near-identical off-whites:** `#ffffff`, `#fafbfc`, `#f9fafd`, `#f9f9f9`. The last three are visually indistinguishable from each other and near-indistinguishable from white.

### D.4 Typography inventory

| Typeface | Peak nodes | Where | Verdict |
|---|---|---|---|
| Poppins | 208 | Every page, body and most headings | The de facto brand face. **No Devanagari coverage.** |
| System stack | 77 | All `<a>` elements, homepage `<h2>`, News index | **Unstyled.** Falling through to browser defaults. |
| DM Sans | 35 | About Us, Contact, Careers, Manufacturing | Stray |
| Manrope | 16 | Scattered across 8 pages | Stray |
| Raleway | 1 | Homepage `<h1>` only | **One use across the entire site** |
| Arial | 8 | South Asia, Manufacturing | Unstyled fallback |

**The homepage `<h1>`, "Dialysis at Home" at 59px/700, is set in Raleway, which appears exactly once on byonyks.com.** Meanwhile every link on the site renders in the browser's default system stack because nothing styles them. Four web fonts download and the most prominent text on the site uses the least-used one.

### D.5 Type scale and rhythm

**17 distinct font sizes, no modular ratio:** 10, 13, 14, 15, 16, 18, 19, 20, 22, 23, 24, 25, 30, 32, 35, 40, 59, 72px. 16px carries roughly 210 to 266 nodes per page; everything else is scattered, with seven sizes clustered inside a single 7px band.

**Body line height is 20px on 16px text, a ratio of 1.25.** Too tight for sustained reading. Links use 26.4px on 16px, a ratio of 1.65, so body and link text have different line heights and baselines go uneven wherever they mix.

**Five font weights loaded:** 300, 400, 600, 700, 800. Weight 300 at body size is a legibility risk for the patient audience.

### D.6 Contact form

| Finding | Assessment |
|---|---|
| Inputs render at 16px | **Good.** Prevents the automatic zoom iOS applies to smaller fields. Carry this over. |
| Every visible field has an associated `<label>` in the DOM | **Good.** |
| Placeholders duplicate the field names | **Check.** Usually indicates the label is visually hidden. 7.3 requires persistent visible labels. |
| Field borders are 0.8px | **Fix.** Sub-pixel borders render inconsistently and can vanish at some zoom levels. 1px minimum. |

### D.7 What carries into Akshar Byonyks

| Element | Carry over | Reasoning |
|---|---|---|
| Blue hue, 202° | **Yes** | Recognisable and appropriate for medical. Take the hue, not the hex. |
| `#1388cd` exactly | **No** | Fails AA in both directions. See 6.1. |
| Deep navy `#011a48` | **Yes** | 16.9:1 on white. Excellent heading colour. |
| Poppins | **Probably not** | Works visually, but no Devanagari coverage, which blocks the Hindi path in 12.6. |
| Raleway, Manrope, DM Sans, Arial | **No** | Sprawl with no rationale. One family, Noto Sans, per Section 6. |
| Type scale | **No** | There is no scale to carry. Build from scratch per 7.1. |
| 1.25 body line height | **No** | Too tight. 7.1 calls for 1.6. |
| Weight 300 | **No** | Legibility risk for an older patient audience with a high rate of diabetes-related visual impairment. |
| 16px form inputs | **Yes** | Correctly implemented today. |

---

---

## Appendix E: AI tooling notes, full assessment

Every item from the internal tooling notes, assessed against this project. Verdicts are project-specific: a regulated medical device site on **Next.js, React and Tailwind with shadcn/ui**, prerendered to Cloudflare Workers, investor-first, with a hard accessibility budget and a performance budget deferred to the post-frontend pass. Nothing is gated behind auth. **Revised for the v0.5 stack change; performance sequencing revised again in v0.6.**

### E.1 Adopted

| Tool | Type | Phase | Use |
|---|---|---|---|
| Context7 | MCP | 0 onward | Current docs for Next.js App Router, OpenNext, shadcn, Keystatic, next-intl, Pagefind, Turnstile |
| MarkItDown | CLI | 0 onward | Convert every client `.docx`, `.pptx`, `.xlsx`, `.pdf` before reading |
| Impeccable | Skill | 0 onward | Design audits, contrast detectors, AI-slop rules on every template |
| Plain Playwright | Library | 1 onward | Visual regression and axe accessibility CI from Phase 1. Core Web Vitals on throttled mobile from the post-frontend performance pass, not before (v0.6). |
| **shadcn CLI and MCP** | CLI plus MCP | 0 onward | **The component system.** Install primitives, pull from third-party registries conversationally |
| **@next/bundle-analyzer** | Library | **Post-frontend performance pass, not Phase 1 (v0.6)** | Enforce the JavaScript budget in CI once 11.3 sets one |
| extract-design-system | Skill | 0 and 1 | Token extraction from reference sites and from our own staging build |
| Codeburn | Plugin | 0 onward | Measure AI-assisted build cost at each phase gate |
| 21st.dev | Service | 1 | Careers icon portfolio, per the client audit. Two per day, licence per component |
| Haikei | Service | 1 | Static SVG backgrounds, zero JavaScript |
| claude-video | Plugin | 1, and 3 if approved | ByoTalks captions and transcripts, timestamped runs, clinician review |
| marketingskills | Skills | 1 and 2 | Selected modules only |
| Lottie | Asset | 2 | Exchange-cycle explainer, clinician sign-off and licence check |
| n8n-mcp | MCP | 3 only | If the form pipeline grows past email into a CRM |
| remotion skills | Skill | 3 at earliest | Only if a product explainer video is commissioned |

### E.2 Now directly installable (changed in v0.5)

shadcn/ui is the base layer. Magic UI, Unlumen.ui and smoothui.dev are shadcn-compatible and wire into `components.json` as registries. reactbits.dev is selective install. The v0.4 "reference only" classification was a consequence of the Astro stack and no longer applies.

**What replaces it:** install freely, hydrate deliberately. Server Components are the default; `"use client"` goes on whatever needs it, no justification required as of v0.7. See 12.8.1 and 12.9.

### E.3 Rejected, with reasons

| Tool | Reason |
|---|---|
| Headroom | macOS only, team is on Windows. Also paid. |
| Graphify | For large unfamiliar repos. This is greenfield and small. |
| Ponytail | Modifies existing code. Unacceptable where every claim has cleared counsel and regulatory review. |
| playwright-mcp | Cost, latency and configuration for no benefit on stable pages we control. Microsoft points its own agents at the plain CLI. Revisit only if plain Playwright scripts start breaking on structural change. |
| browser-harness | Explicitly bad for CI, which is where our automation lives. |
| career-ops | Job scraping. Not applicable. |
| retroui.dev | Retro theme only, no custom theming. Wrong register for a medical device company. |
| ui.watermelon.sh, variant.com | Dashboard and app UI. Nothing here is a dashboard, nothing is gated. |
| Shaders.com | WebGL on mid-range Android over constrained bandwidth is the wrong trade. Narrow homepage-hero exception with guardrails in 12.8.3. |
| ecc | No description supplied in the notes. **Unassessed.** Do not install until evaluated. |

### E.4 Legal and security items from the notes

| Item | Applies here |
|---|---|
| FTC AI disclosure | **Yes, if any generated asset ships.** Confirm the Indian equivalent with counsel. See 14.3 and 12.8.5. |
| Arbitration clause in terms of service | **Route to counsel.** US-framed. Arbitration clauses in consumer contracts are treated differently under Indian law. Do not copy the US pattern. |
| Apple and Google privacy nutrition labels | **No.** There is no mobile app in any phase. |
| UGC liability, DMCA agent registration | **No, currently.** No user uploads anywhere. **Becomes live if patient testimonials with user submission are ever added**, which also intersects the regulatory caution in 14.2. |
| Session tokens out of `localStorage` | **No.** Nothing is gated. |
| Server-side authorisation audit, RLS policies | **No.** No auth layer. |
| Email verification, 2FA or OTP | **No.** No accounts. |
| Rate limiting and lockout on auth endpoints | **Partially.** No auth endpoints, but the contact form Worker in 12.4 rate limits by IP and uses Turnstile. |
| Password policy, breached-password checks | **No.** No passwords. |

**The pattern is worth naming.** Nine of these ten items are inapplicable **because of one decision**: nothing on this site is gated. That decision was made for simplicity and it turns out to have removed an entire security workstream, an ongoing review burden and a category of liability. If an investor data room is reintroduced, all nine come back and should be budgeted as their own workstream rather than absorbed into a phase.

---
