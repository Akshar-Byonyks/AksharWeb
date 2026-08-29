import { PendingNote } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
  indiaRegulatoryStatement,
  licensingStatement,
  manufacturingStatement,
  usRegulatoryStatement,
} from "@/lib/claims";

// Spec §8.4: the investor section was cut, and "the India market case (Section
// 3.3, plus licensing scope, plus the timing argument: FDA clearance achieved,
// manufacturing established, policy direction, market concentration creating an
// opening) folds into `/innovation/market/`". The four legs above are §3.3.
// This is the rest of that sentence, and it is the reason the page cannot
// simply be deleted for being long: without it, spec §4.1's Priority-1
// audience has nowhere on the site to read the licensing scope and the
// regulatory status at all.
//
// CUT TO THE THREE FACTS, 28 AUG 2026. Each row used to carry a second
// paragraph arguing for itself, and a fourth row restated the programme's
// peritoneal dialysis component that the cost section already establishes with
// the same citation. What is left is what a Priority-1 reader is checking: is
// it cleared, is it made, is it licensed, and can it be sold here yet.
//
// EVERY REGULATORY LINE COMES FROM `claims.ts` AND NONE IS RETYPED HERE.
// PRODUCT.md's requirement is "one consistent formulation of the licensing
// relationship, reused everywhere — not redrafted per page," and a market page
// arguing for an opportunity is the single most likely place on this site for
// a sentence to drift upward under its own enthusiasm. Importing the strings
// makes that drift impossible without an edit to the file whose header calls
// it a regulatory change rather than a copy tweak.
//
// THE FOURTH LEG OF THE TIMING ARGUMENT IS NOT HERE. "Market concentration
// creating an opening" is the claim that India's dialysis equipment market is
// held by a small number of players, which PRODUCT.md marks as only partially
// transferring from the US argument because "named players differ." No source
// for the Indian market structure was found in this pass, so the slot is
// marked rather than filled with an impression. An opportunity claim is
// precisely the kind an investor checks first.
const facts = [
  { heading: "Cleared", body: usRegulatoryStatement },
  { heading: "Manufactured", body: manufacturingStatement },
  { heading: "Licensed", body: licensingStatement },
  { heading: "Not yet saleable in India", body: indiaRegulatoryStatement },
];

export function TimingAndLicensing() {
  return (
    // A rule-bounded strip, not another full section. It is the page's
    // smallest movement on purpose: four sentences of status, set as a
    // four-column band that a reader can take in at a glance and an investor
    // can check line by line. `proof-band.tsx` uses the same device on Home for
    // the same reason — a credential set is a record, not an argument.
    <section
      aria-labelledby="timing-heading"
      id="timing"
      className="scroll-mt-24 border-y border-line bg-background"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2
                id="timing-heading"
                className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl"
              >
                On what authority
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Whether the thing being proposed can be done, by this company,
                from where it stands today &mdash; including the part that
                cannot be done yet.
              </p>
            </div>
            <PendingNote
              className="sm:max-w-xs"
              label="India dialysis equipment market structure and concentration"
              note="Market analysis pending source citation"
            />
          </div>
        </ScrollReveal>

        <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
          {facts.map(({ heading, body }, index) => (
            <ScrollReveal key={heading} delayMs={index * 70}>
              <div className="h-full bg-card p-5 sm:p-6">
                <dt className="font-mono text-xs tracking-wide text-primary">
                  {heading}
                </dt>
                <dd className="mt-3 text-sm text-foreground">{body}</dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
