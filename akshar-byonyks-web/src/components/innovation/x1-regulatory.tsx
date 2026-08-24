import { Landmark, ShieldCheck } from "lucide-react";

import { PendingNote } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
  indiaRegulatoryStatement,
  licensingStatement,
  manufacturingStatement,
  usRegulatoryStatement,
} from "@/lib/claims";

// Spec §9.2, the load-bearing requirement on this page: "Regulatory status
// stated precisely and separately: FDA 510(k) cleared in the US (held by
// Byonyks); India position stated as it actually is."
//
// Separately is the operative word, and it is why this is two panels rather
// than one paragraph with a "meanwhile, in India" clause. A reader who takes
// away nothing but the layout should still take away "there are two positions
// here, and they are not the same."
//
// Every sentence comes from src/lib/claims.ts. None of it is authored in this
// component, so it cannot drift from the other pages stating the same facts,
// and a legal edit lands in one file.
//
// Color: primary blue for the US clearance — the mapping Home's proof band
// already set, where regulatory proof is blue. Plum for India, because
// DESIGN.md fixes plum to "institutional / formal" and CDSCO under the Medical
// Device Rules is exactly that. Pending amber inside the India card for the
// part that is genuinely unconfirmed. Teal is not borrowed for any of it even
// though "evidence" is tempting: teal means clinical evidence, and a
// regulatory clearance is not a clinical finding.
export function X1Regulatory() {
  return (
    <section aria-labelledby="x1-regulatory-heading" className="bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="x1-regulatory-heading"
              className="text-3xl font-bold text-ink sm:text-4xl"
            >
              Regulatory status
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Two jurisdictions, two separate positions. They are stated
              separately because a clearance in one country is not an
              authorisation in another.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-line bg-card p-6">
              <div className="inline-flex size-11 items-center justify-center rounded-full bg-accent text-primary">
                <ShieldCheck className="size-5.5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">
                In the United States
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {usRegulatoryStatement}
              </p>
              {/* The K-number is the one thing a clinician or an investor can
                  independently verify on the FDA database, and spec §9.4 says
                  to publish it. Nobody has given it to this project yet, so it
                  is marked rather than omitted — and marking it also stops
                  this card sitting half-empty beside the taller one. */}
              <PendingNote
                className="mt-4"
                note="Reference pending"
                label="The 510(k) number, so the clearance can be looked up directly on the FDA database."
              />
            </div>

            <div className="rounded-xl border border-line bg-card p-6">
              {/* Plum, and plum only. DESIGN.md fixes it to "institutional /
                  formal" — CDSCO and the Medical Device Rules are literally
                  that, so this is the existing role applied to its own
                  meaning, not an accent borrowed because a second card needed
                  a second color. Without a chip here the two panels' headings
                  sat at different heights and the pair read as one finished
                  card beside one unfinished one. */}
              <div className="inline-flex size-11 items-center justify-center rounded-full bg-[color-mix(in_oklch,var(--color-plum),white_88%)] text-plum">
                <Landmark className="size-5.5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">In India</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {indiaRegulatoryStatement}
              </p>
              <PendingNote
                className="mt-4"
                note="Confirmation pending"
                label="CDSCO authorised agent, device risk classification, and the import licence route under the Medical Device Rules 2017."
              />
            </div>
          </div>

          <div className="mt-8 max-w-3xl border-t border-line pt-6">
            <p className="text-sm text-muted-foreground">
              {licensingStatement} {manufacturingStatement}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
