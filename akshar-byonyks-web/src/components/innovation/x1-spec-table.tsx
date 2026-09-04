import { PendingChip } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

// Spec §9.2: "Specification table."
//
// Every value below is either a fact this project actually holds (spec §9.2's
// named features, the FDA clearance and its holder, the licensing structure)
// or an explicit gap. Nothing is inferred from the product render and nothing
// is filled in from what an APD cycler typically does. PRODUCT.md is blunt
// about why: inventing a dimension, a weight or a fill volume for a cleared
// medical device is a labelling exposure, not a placeholder.
//
// Layout note on §7.2's "stacks to cards under 768px": that rule targets
// multi-column comparison tables, which become unreadable narrow. This is a
// two-column attribute/value table, which does not — it wraps. Keeping one
// real <table> at every width preserves the row and header semantics that a
// display:block card treatment destroys for screen readers, so no stacking
// variant ships here.
type SpecRow = { attribute: string; value: string; pending?: string };

const rows: SpecRow[] = [
  { attribute: "Device", value: "X-1 automated peritoneal dialysis (APD) cycler" },
  {
    attribute: "Therapy",
    value: "Automated peritoneal dialysis, performed at home, typically overnight",
  },
  {
    attribute: "Patient connection",
    value: "Needle-free, via a peritoneal dialysis catheter",
  },
  {
    attribute: "Dialysate temperature",
    value: "Warmed to body temperature before infusion",
  },
  { attribute: "Power", value: "Mains, with on-board battery backup" },
  { attribute: "Control", value: "On-device screen" },
  {
    attribute: "Battery runtime",
    value: "",
    pending: "Rated runtime not yet published by Byonyks USA.",
  },
  {
    attribute: "Dimensions and weight",
    value: "",
    pending: "Not yet published.",
  },
  {
    attribute: "Fill volume range and cycle programming",
    value: "",
    pending: "Not yet published. Clinicians can request the IFU below.",
  },
  { attribute: "Designed and manufactured by", value: "Byonyks" },
  {
    attribute: "Licensed for India by",
    value: "Akshar Byonyks International LLC",
  },
  {
    attribute: "US regulatory status",
    value:
      "FDA 510(k) K243371, cleared 16 May 2025. Class II under 21 CFR 876.5630. Clearance held by Byonyks.",
  },
  {
    attribute: "India regulatory status",
    value: "",
    pending:
      "Being established under the Medical Device Rules 2017. Stated in full once confirmed.",
  },
];

// The compact form of DESIGN.md's Placeholder / Pending Data pattern. The chip
// itself moved into pending-note.tsx on 27 Aug 2026 when a second page needed
// it; what stays here is only the cell-specific arrangement of chip plus
// explanation.
function PendingValue({ note }: { note: string }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
      <PendingChip />
      <span>{note}</span>
    </span>
  );
}

export function X1SpecTable() {
  return (
    <section
      id="specification"
      aria-labelledby="x1-spec-heading"
      className="scroll-mt-24 bg-surface-2"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        {/* Two columns from `lg` up: the framing on the left, the table on the
            right with the wider share. A 13-row table constrained to max-w-3xl
            left half the desktop viewport empty beside it, which read as an
            unfinished section rather than a deliberately narrow measure. */}
        <ScrollReveal>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            {/* THE FRAMING RIDES THE TABLE DOWN. This is a thirteen-row table
                and the heading that says what the rows mean — "rows marked
                pending are genuinely unpublished" — used to scroll away from
                the pending rows it explains. Sticky keeps it beside them for
                the length of the section.

                It works because a grid item's containing block is its grid
                area, and this area is as tall as the table beside it. So the
                heading pins on the way down and releases on its own when the
                area ends, without measuring anything: it never escapes into
                the next section.

                `lg:self-start` is load-bearing, not decoration. A grid item
                stretches to its row by default, which leaves a sticky item no
                room to travel inside its own box — it would simply never
                move. `items-start` on the container already does this today;
                the explicit class is here so that removing it cannot quietly
                turn the effect off.

                `top-24` clears the sticky nav, whose host measures 72px, with
                24px to spare. The two full-viewport stages on Home pin at
                `top-16` because they are centred artwork that can tuck under
                the bar; a heading cannot.

                Not sticky below `lg`: the columns stack there, so the framing
                sits above the table rather than beside it, and pinning it
                would park a heading on top of the rows it introduces. */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2
                id="x1-spec-heading"
                className="text-3xl font-bold text-ink sm:text-4xl"
              >
                Specification
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                What is confirmed, and what is not. Rows marked pending are
                genuinely unpublished. They are left empty rather than
                estimated.
              </p>
            </div>

            {/* `overflow-x-auto`, not `overflow-hidden`: at 200% text size the
                table's min-content width exceeds a 390px viewport, and a table
                cannot reflow below it. Scrolling inside this container is the
                compliant answer — WCAG 1.4.10 exempts content that needs a
                two-dimensional layout, which a data table does — whereas
                clipping would lose values and letting it push the page would
                make the whole document scroll sideways. Spec §7.3 requires
                text to reach 200% without loss of content or function. */}
            <div className="overflow-x-auto rounded-xl border border-line bg-card">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  X-1 automated peritoneal dialysis cycler specification
                </caption>
                <tbody>
                  {rows.map(({ attribute, value, pending }, index) => (
                    <tr
                      key={attribute}
                      className={index > 0 ? "border-t border-line" : undefined}
                    >
                      <th
                        scope="row"
                        className="w-[42%] px-4 py-4 align-top text-sm font-semibold text-ink sm:w-[38%] sm:px-6"
                      >
                        {attribute}
                      </th>
                      <td className="px-4 py-4 align-top text-sm text-muted-foreground sm:px-6">
                        {pending ? <PendingValue note={pending} /> : value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
