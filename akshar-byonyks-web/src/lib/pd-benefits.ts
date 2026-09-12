import type { SourceId } from "@/lib/market-data";
import { getSource } from "@/lib/market-data";

// THE FOUR REASONS PERITONEAL DIALYSIS IS OFFERED, AND THE EVIDENCE UNDER
// EACH ONE.
//
// WHY THIS IS A DATA MODULE AND NOT A COMPONENT. It was both, in
// `components/innovation/pd-benefits.tsx`, until 11 Sep 2026: the four claims
// and their references lived inside the file that rendered them, because the
// references were rendered. The client's instruction that day was
// "References should be placed in separate document with the rest of the
// sources", which means the page stops printing them and SOURCES.md starts —
// and SOURCES.md is generated from `claims-ledger.ts`, which is a library
// module and cannot import a component without dragging React into a Node
// script.
//
// So the claims moved here, where the page and the ledger can both read them.
// That is the pattern `locations.ts`, `compliance.ts` and `market-data.ts`
// already follow, and the reason claims-ledger.ts opens by saying "THIS FILE
// DERIVES; IT DOES NOT RESTATE": a second hand-typed copy of these four
// sentences in the ledger would be free to drift from the four on the page.
//
// WHAT IS STILL ON THE PAGE: the title and the body. What left: `source` and
// `note`, which now reach the reader through SOURCES.md and `/what-we-know`
// rather than as a reference line under each claim. Nothing was deleted —
// that is the same distinction the 3 Sep 2026 pass drew when it took the
// citations off the market page, and the whole reason SOURCES.md exists.

export type Benefit = {
  readonly title: string;
  /** The claim as the reader meets it. This is what `/innovation/how-it-works` renders. */
  readonly body: string;
  /**
   * The registered source this claim rests on, by id from `marketSources`.
   *
   * An id rather than a URL, deliberately. `getSource` throws for an id that
   * is not registered, so a reference cannot be attached to a claim without
   * the full citation existing somewhere SOURCES.md will find it — which is
   * precisely what "with the rest of the sources" has to mean if it is to
   * mean anything.
   */
  readonly source?: SourceId;
  /**
   * What that source actually concludes — which on three of these four is
   * NARROWER THAN THE CLAIM, and on one of them was the opposite of what the
   * claim used to say.
   *
   * This is the field that stops the move to SOURCES.md from being a quiet
   * downgrade. A bare source id would record that a KDIGO report was consulted
   * and lose the finding that made it worth consulting.
   */
  readonly note?: string;
  /** Why this claim has no reference yet. Mutually exclusive with `source`. */
  readonly pending?: string;
};

// ─── THE FOUR CLAIMS, AND WHAT KDIGO ACTUALLY SUPPORTS ─────────────────────
//
// Three of these four sentences changed on 11 Sep 2026, and the change was
// not editorial. The instruction was to source the references from KDIGO;
// reading KDIGO is what found that two of the claims, as written, said more
// than KDIGO will say and one said the opposite of what KDIGO says. A
// citation attached to a sentence its own source contradicts is worse than
// the pending chip it replaced, because the pending chip was at least honest
// about not knowing.
//
// The one that reversed is "Supports residual kidney function". It used to
// read "Home peritoneal dialysis is associated with preserving residual renal
// function for longer than in-centre hemodialysis." The 2019 conference
// report says the evidence comparing that decline across modalities is
// "small, mostly single-center, observational studies from more than 2 decades
// ago" and is "not robust enough to suggest one modality is favorable over
// another." So the claim is now about what the therapy is managed around
// rather than about which modality wins, which is the part KDIGO does state.
//
// The one that gained a qualification is the cost claim, and the
// qualification is about India specifically -- see its note below. It is the
// single most useful thing this search turned up for this site.
//
// The one still without a reference is the peritoneal membrane, and it is
// marked rather than fitted with the nearest citation to hand. See its entry.
//
// THE REWRITTEN SENTENCES STAY REWRITTEN NOW THAT THE REFERENCES HAVE COME
// OFF THE PAGE. That is worth stating because the opposite would have been
// easy and invisible: with no citation rendered beneath them, the softened
// claims could have been quietly restored to their stronger originals and
// nothing on screen would have contradicted them. The sources did not stop
// applying when they stopped being displayed.
export const benefits: readonly Benefit[] = [
  {
    title: "Protects the peritoneal membrane",
    body: "Peritoneal dialysis filters through the lining of the patient’s own abdomen, so the condition of that lining over time is what the therapy depends on.",
    // NOT CITED, DELIBERATELY. KDIGO publishes nothing on preserving the
    // peritoneal membrane -- no guideline, and no conference statement. The
    // closest thing in either report is the opposite framing: the home
    // dialysis report lists "lack of a viable peritoneum, such as when the
    // peritoneum has been damaged through surgery or inflammation" as an
    // absolute contraindication to PD, which makes the membrane a
    // prerequisite rather than something the therapy protects. Citing that
    // line under this heading would be the citation contradicting the claim
    // above it. A reference for this one has to come from somewhere else --
    // the ISPD guidelines are the obvious place to look next.
    pending:
      "KDIGO publishes no guideline or conference statement on preserving the peritoneal membrane. Its home dialysis report treats an intact peritoneum as a prerequisite for the therapy rather than an outcome of it, so this claim still needs a reference from elsewhere.",
  },
  {
    title: "Lower total cost of being treated",
    body: "Home therapy removes the recurring cost of travel to a centre, the working hours lost to it for both the patient and whoever travels with them, and the clinic time itself.",
    source: "kdigo-home",
    // THE QUALIFICATION IS THE POINT, AND IT IS ABOUT THIS MARKET. KDIGO's
    // 2019 report puts it plainly: PD "is often more cost-effective than
    // hemodialysis" in industrialized countries, "yet the opposite may be
    // true for countries with no local manufacturing of peritoneal dialysis
    // fluids or with tariffs on importing peritoneal dialysis supplies."
    // The 2023 report adds that "large-scale use of PD can lead to cost
    // reductions, and local manufacturing of PD fluid reduces shipping and
    // tariffs." An India-market site that printed the unqualified claim
    // while its own source names imported consumables as the thing that
    // reverses it would be citing a paper it had not read.
    //
    // THE CLAIM ON THE PAGE SURVIVES THE QUALIFICATION, which is why it is
    // still here after the references came off. The body is about what the
    // patient and their family stop spending -- travel, lost working hours,
    // clinic time. KDIGO's reversal is about health-system cost where
    // dialysis fluid is imported. Those are different ledgers, and the one
    // the page makes a claim about is not the one the caveat overturns.
    note: "The conference report finds PD costs are generally lower than in-centre haemodialysis, and is explicit that this can reverse where dialysis fluid is imported rather than made locally, because of consumable costs and tariffs.",
  },
  {
    title: "Supports residual kidney function",
    body: "Preserving whatever kidney function remains is a goal for everyone on dialysis, and a peritoneal prescription can be set around it — fewer exchanges a day while that function lasts, increasing as it declines.",
    source: "kdigo-initiation",
    note: "The conference report calls preserving residual kidney function a goal for all clinicians and patients, and states that the evidence comparing its decline between modalities is not robust enough to favour one over the other.",
  },
  {
    title: "Clears waste and excess fluid",
    body: "Each cycle removes solutes and the fluid that builds up between exchanges, the work healthy kidneys do continuously.",
    source: "kdigo-initiation",
    // Retitled from "Clears acid and toxins". "Toxins" is not a term either
    // report uses, and the old body said the cycle removes what builds up
    // "in the dialysate", which has it backwards -- the dialysate is what
    // the waste crosses into. "Small solute clearance" is KDIGO's term and
    // "waste and excess fluid" is the plain-language version of it, which
    // is the register this page is written in.
    note: "The conference report treats small solute clearance as a floor rather than the whole measure: clinicians should keep to accepted minimums for it, while adequacy is judged on residual function, volume status, nutrition, symptoms and the patient’s own goals as well.",
  },
];

// ---------------------------------------------------------------------------
// Module-load contracts.
//
// These matter MORE now that the references are not rendered, not less. While
// the reference sat under the claim on the page, a missing one was visible to
// anyone who opened /innovation/how-it-works. It is now visible only in a
// generated file that nobody opens on a normal day, so the build is the only
// thing left that will notice.
// ---------------------------------------------------------------------------
for (const benefit of benefits) {
  // A CLAIM IS EITHER SOURCED OR DECLARED UNSOURCED. Never neither, which
  // would be a health claim on a medical device site with no evidence behind
  // it and nothing saying so; and never both, which is a record contradicting
  // itself about whether it knows something.
  if (!benefit.source && !benefit.pending) {
    throw new Error(
      `pd-benefits: "${benefit.title}" has no source and no pending note. ` +
        "Register a source in marketSources and cite it here, or say why there isn't one.",
    );
  }
  if (benefit.source && benefit.pending) {
    throw new Error(
      `pd-benefits: "${benefit.title}" has both a source and a pending note. Remove one.`,
    );
  }

  // A SOURCE WITHOUT A NOTE IS THE FAILURE THIS WHOLE CHANGE COULD HAVE BEEN.
  // Three of these four sources conclude something narrower than the sentence
  // they sit under. A bare id would survive the type checker, generate a
  // tidy-looking SOURCES.md row, and lose the only part of the citation that
  // qualifies the claim.
  if (benefit.source && !benefit.note) {
    throw new Error(
      `pd-benefits: "${benefit.title}" cites a source but does not say what it concludes. ` +
        "The note is what carries the qualification; a bare citation implies the source says more than it does.",
    );
  }

  // Throws for an id that is not in `marketSources`, which is what makes
  // "with the rest of the sources" enforceable rather than aspirational.
  if (benefit.source) getSource(benefit.source);
}
