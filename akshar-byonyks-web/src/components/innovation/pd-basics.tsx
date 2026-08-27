import { ClinicalLayer } from "@/components/innovation/clinical-layer";
import { PendingNote } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

// The gap this page exists to close: the site showed what the device is (the
// X-1 page) and what life on the therapy looks like (Home, "the night"), and
// never once said what peritoneal dialysis actually is. A visitor who does not
// already know cannot follow either of the other two pages.
//
// Prose section, so it keeps the full-width heading and a single measure
// rather than the framing-and-artifact split (DESIGN.md, Layout). The split is
// for sections whose subject is a structured artifact; this one's subject is
// three paragraphs, and running them at the narrower column share beside empty
// space would be the split used as decoration.
//
// Register: Priority 2 (patients). PRODUCT.md's tone rule for this audience is
// short sentences, everyday words, second person, and never "modality" without
// explaining it. "Peritoneum", "dialysate" and "catheter" are unavoidable — a
// reader will meet all three at their clinic — so each is defined the first
// time it appears rather than avoided.
export function PdBasics() {
  return (
    <section aria-labelledby="pd-basics-heading" className="bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="pd-basics-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
            >
              Your own body does the filtering
            </h2>

            <div className="mt-6 space-y-5 text-lg text-foreground">
              <p>
                Healthy kidneys clear waste and extra fluid from the blood all
                day, without stopping. When they can no longer do that, the job
                has to be done another way.
              </p>
              <p>
                Peritoneal dialysis does it inside the abdomen. The{" "}
                <strong className="font-semibold text-ink">peritoneum</strong>{" "}
                is the thin membrane that lines the abdominal cavity and covers
                the organs inside it. It is full of small blood vessels, and it
                lets some things pass through it &mdash; which is what makes it
                usable as a filter.
              </p>
              <p>
                A soft tube called a{" "}
                <strong className="font-semibold text-ink">catheter</strong> is
                placed through the abdominal wall in a short operation, and
                stays there. A sterile fluid called{" "}
                <strong className="font-semibold text-ink">dialysate</strong>{" "}
                runs in through it. Waste and extra fluid pass out of the blood
                vessels in the membrane and into that fluid. The used fluid is
                then drained away, and fresh fluid takes its place.
              </p>
              <p>
                No blood leaves the body, and there are no needles in an
                exchange.
              </p>
            </div>

            <ClinicalLayer summary="Transport mechanism and membrane characterisation">
              <p>
                Solute removal is by diffusion across the peritoneal membrane
                down a concentration gradient between plasma and dialysate.
                Fluid removal is by osmosis, driven by an osmotic agent carried
                in the dialysate.
              </p>
              <p className="mt-3">
                Membrane transport characteristics differ between patients and
                change over time, so a prescription follows from characterising
                the individual membrane rather than from a standard schedule.
              </p>
            </ClinicalLayer>

            {/* Spec §9.2 names this page "Nephrologist review required." That
                review has not happened, so the page says so rather than
                implying clinical sign-off it does not have. Same instinct as
                the X-1 specification table's empty rows: a visible gap is
                worth more than a confident-looking blank.

                This note governs every clinical layer on the page, not just
                the one above it, which is why it sits here — under the first
                one a reader will open — rather than being repeated three
                times or buried in the footer. */}
            <PendingNote
              className="mt-6"
              note="Pending nephrologist review"
              label="The clinical layers on this page describe standard peritoneal dialysis physiology and are awaiting review by a nephrologist before launch."
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
