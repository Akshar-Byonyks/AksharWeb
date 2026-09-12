import { PendingNote } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
  indiaLicensing,
  indiaManufactureAndLicence,
  indiaRegulatoryStatement,
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
//
// FOUR BOXES BECAME THREE, 11 SEP 2026, on client instruction: "merge the
// manufactured and licensed boxes." They were two sentences answering one
// question -- who makes this and who may bring it here -- and the client's
// answer to both is now the same company, so they are one box. The merged
// sentence lives in claims.ts, where its conflict with the rest of this
// repository's manufacturing record is written down in full. Read that note
// before reusing "indiaManufactureAndLicence" anywhere else; it is scoped to
// this band on purpose.
//
// THE CLEARANCE BOX STILL NAMES BYONYKS AND MUST. "usRegulatoryStatement"
// ends "held by Byonyks, not by Akshar Byonyks", which is what the FDA's own
// register says about K243371. Rule 1 in claims.ts -- never state or imply
// Akshar Byonyks holds the clearance -- is the oldest non-negotiable on this
// project, and dropping that clause to remove a mention of Byonyks would put
// a false statement about a public record on a medical device site.
const facts = [
  { heading: "Cleared", body: usRegulatoryStatement },
  { heading: "Manufactured and licensed", body: indiaManufactureAndLicence },
  // The heading changed on 1 Sep 2026 with the client's "show as in progress"
  // instruction. "Not yet saleable in India" was accurate and told an investor
  // only what cannot happen; "Licensing in progress in India" is the same fact
  // read forward, and the sentence under it still says plainly that a US
  // clearance does not authorise sale here. The date rides in the heading
  // rather than a fourth column, because this band is three sentences of
  // status and a fourth would make it a table.
  {
    heading: `Licensing in progress in India, as of ${indiaLicensing.asOf}`,
    body: indiaRegulatoryStatement,
  },
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
            </div>
            <PendingNote
              className="sm:max-w-xs"
              label="India dialysis equipment market structure and concentration"
              note="Market analysis pending source citation"
            />
          </div>
        </ScrollReveal>

        {/* Three columns from md, not the old two-then-four. The band lost a
            box when "Manufactured" and "Licensed" merged, and three cells in a
            two-column grid leave one cell empty -- which on this strip is not
            whitespace but a bare panel of "bg-line" showing through the
            "gap-px", reading as a fourth card that failed to load. Three
            across from md fills the row exactly; below md it stacks. */}
        <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {facts.map(({ heading, body }, index) => (
            <ScrollReveal
              key={heading}
              delayMs={index * 70}
              className="h-full bg-card p-5 sm:p-6"
            >
              <dt className="font-mono text-xs tracking-wide text-primary">
                {heading}
              </dt>
              <dd className="mt-3 text-sm text-foreground">{body}</dd>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
