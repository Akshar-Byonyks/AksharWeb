import { ArrowDown, Landmark, ShieldCheck } from "lucide-react";

import { PendingNote } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { fda510k } from "@/lib/compliance";
import {
  indiaLicensing,
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
              {/* THE K-NUMBER, 29 AUG 2026. This slot was a `PendingNote`
                  from the day the page was built, on the reasoning that
                  nobody had given the number to this project. Nobody had to:
                  510(k) decisions are published, and the FDA's own API
                  returns exactly one record for this applicant. Spec §9.4
                  asks for the number precisely so a reader can check the
                  clearance without trusting this site, so the number is
                  useless without the link and they ship together. */}
              <div className="mt-4 rounded-lg border border-line bg-surface-2 px-4 py-3">
                <p className="font-mono text-xs tracking-wide text-muted-foreground">
                  Premarket notification
                </p>
                <p className="mt-1 font-mono text-lg font-semibold text-ink">
                  {fda510k.kNumber}
                </p>
                {/* In-page, not out to the FDA. The full record and the
                    external link live in "Quality and compliance" directly
                    below; two links to the same register in one viewport is
                    one more than a reader needs. */}
                <a
                  href="#compliance"
                  className="mt-2 inline-flex items-center gap-1.5 rounded-sm py-1 text-sm font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  The full record, and how to check it
                  <ArrowDown className="size-3.5 shrink-0" aria-hidden="true" />
                </a>
              </div>
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
              {/* THE STATUS, SET LIKE THE K-NUMBER OPPOSITE. Client
                  instruction, 1 Sep 2026: the India licensing should show as
                  in progress, with the date.

                  It mirrors the US panel's premarket-notification block
                  deliberately — same plate, same mono label, same weight — so
                  the two jurisdictions read as two answers to one question
                  rather than as one finished card beside one unfinished one.
                  What differs is the word in the slot: a K-number on the left,
                  a status on the right, because that is genuinely all there is
                  on this side.

                  Plum, not amber. Amber is the provenance scale's "not
                  established", and it was what this panel used to carry —
                  which read as stalled. Work under way is not a gap, and plum
                  is already this card's institutional accent. */}
              <div className="mt-4 rounded-lg border border-line bg-surface-2 px-4 py-3">
                <p className="font-mono text-xs tracking-wide text-muted-foreground">
                  Licensing under the {indiaLicensing.framework}
                </p>
                <p className="mt-1 text-lg font-semibold text-plum">
                  {indiaLicensing.status}
                </p>
                {/* "Status as of", not a bare date. A date printed beside the
                    word "licensing" is read as the day something was filed
                    with CDSCO, and no filing date has been supplied to this
                    project. This says what the date actually is. */}
                <p className="mt-1 font-mono text-xs tracking-wide text-muted-foreground">
                  Status as of {indiaLicensing.asOf}
                </p>
              </div>
              <PendingNote
                className="mt-4"
                note="Not yet confirmed"
                label="The CDSCO authorised agent, the device risk classification and the import licence route are not settled. Until they are, nothing on this site should be read as saying the X-1 is approved for sale in India."
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
