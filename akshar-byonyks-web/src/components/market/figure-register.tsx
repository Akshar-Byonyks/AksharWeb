import { DisplayFigure } from "@/components/common/display-figure";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { cn } from "@/lib/utils";
import { type Figure, getSource, type SourceId } from "@/lib/market-data";

// The two primitives every figure on `/innovation/market/` is drawn with.
//
// FORM, AND WHY IT IS NOT A STAT BAND. `proof-band.tsx` refused the
// hero-metric treatment — big number, small label, accent colour — on the
// grounds that it "reads as marketing to exactly the two audiences that
// distrust it," and built a hairline register instead. That reasoning applies
// with more force here than it did there: this is the page spec §4.1 says is
// read by people who "read fast and distrust marketing language," and whose
// content should be "denser, more numeric and more sober than the rest of the
// site. Dated sources, footnotes, tables." A register is what that describes.
//
// So: no accent colour on a number, no count-up, no card. Rules that separate
// rather than boxes that enclose, the value at display weight because it is
// the thing being read, and the citation carried on the same row as the value
// rather than swept to the foot of the page. A reader who wants to check a
// figure should not have to hold it in their head while they scroll.

/**
 * The inline citation. Rewritten 28 Aug 2026, when the numbered source
 * register at the foot of the page was cut.
 *
 * It used to be a superscript number pointing at that list, which meant a
 * reader who wanted to check a figure lost their place, scrolled to the end,
 * read a formal citation, and then had to find their way back. Naming the
 * source where the figure is and linking it straight to the paper is fewer
 * moves and less furniture, and it is the reason removing the register cost
 * the page nothing in verifiability.
 *
 * Opens in a new tab — the one place this project overrides that choice for
 * the reader. A citation is checked *against* the page it supports, and
 * replacing the page with a journal ends the reading it was serving.
 *
 * RENDERS REGISTERS ONLY, since 3 Sep 2026 (client instruction: take the
 * visible sourcing off the site and keep the record elsewhere). A `research`
 * source now returns nothing here and lives in SOURCES.md instead.
 *
 * WHY THIS COMPONENT RATHER THAN ITS ELEVEN CALL SITES. Every figure on the
 * market page still passes its source in, `market-data.ts` still refuses to
 * hold a figure without one, and `getSource` still throws for an unregistered
 * id. So the data path is untouched and the invariant spec §7.2 exists to
 * protect ("cannot render without a source") still holds — what changed is
 * only whether the citation is painted. Had the call sites been edited
 * instead, the next figure added to this page would have shipped with no
 * source at all and nothing would have caught it.
 */
export function Cite({
  source,
  onInk = false,
}: {
  source: SourceId;
  /**
   * Sitting on the ink ground. Primary blue on ink is 1.9:1 — an unreadable
   * link rendered as if it were a working one. Gold on ink is 5.39:1 and is
   * already the accent this site spends there.
   */
  onInk?: boolean;
}) {
  const { shortName, url, kind } = getSource(source);
  // The one exception the client kept: an official register behind a claim
  // about a regulated device. See the `kind` note in `market-data.ts`.
  if (kind !== "register") return null;
  return (
    <>
      <span aria-hidden="true"> · </span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "rounded-sm underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2",
          onInk
            ? "text-accent-gold hover:text-white focus-visible:outline-white"
            : "text-primary hover:text-ink focus-visible:outline-ring"
        )}
      >
        <span className="sr-only">Source: </span>
        {shortName}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </>
  );
}

/**
 * The as-of line. Split out because spec §3.3's requirement that "every number
 * carries a date and a source" is two obligations, and a component that
 * satisfies one of them silently is worse than no component.
 */
function AsOf({ figure }: { figure: Figure }) {
  return (
    <dd className="mt-3 font-mono text-xs tracking-wide text-muted-foreground">
      {figure.asOf}
      <Cite source={figure.source} />
    </dd>
  );
}

/**
 * A list of figures as a documentary register.
 *
 * `emphasis="lead"` sets the value at display size, for a section where the
 * numbers are the argument. `emphasis="row"` keeps them at heading size, for a
 * section where the prose is the argument and the numbers support it.
 */
export function FigureRegister({
  figures,
  emphasis = "lead",
  layout = "stack",
  className,
}: {
  figures: readonly Figure[];
  emphasis?: "lead" | "row";
  /**
   * `"two-up"` breaks the vertical rhythm for a pair of figures that support
   * a figure above them rather than carrying a section on their own. It exists
   * because a page where every group of numbers stacks identically is the
   * thing this component was accused of, correctly.
   */
  layout?: "stack" | "two-up";
  className?: string;
}) {
  return (
    <dl
      className={cn(
        layout === "two-up" &&
          "grid grid-cols-1 gap-x-10 border-t border-line pt-8 sm:grid-cols-2",
        className
      )}
    >
      {figures.map((figure, index) => (
        <ScrollReveal key={`${figure.source}-${figure.label}`} delayMs={index * 90}>
          <div
            className={cn(
              layout === "two-up"
                ? "py-4"
                : "border-t border-line py-6 first:border-t-0 first:pt-0 sm:py-7"
            )}
          >
            {/* Moved onto the named display-numeral role, 30 Aug 2026. The
                two steps this component already used ARE the role's "lead"
                and "dense", so nothing here renders differently — it just
                stops being a second place where the size and the tabular
                figures are decided. */}
            <DisplayFigure
              as="dt"
              size={emphasis === "lead" ? "lead" : "dense"}
              tone="ink"
            >
              {figure.value}
            </DisplayFigure>
            <dd className="mt-3 max-w-2xl text-lg font-semibold text-ink">
              {figure.label}
            </dd>
            {figure.detail ? (
              <dd className="mt-2 max-w-2xl text-base text-muted-foreground">
                {figure.detail}
              </dd>
            ) : null}
            <AsOf figure={figure} />
          </div>
        </ScrollReveal>
      ))}
    </dl>
  );
}

// `FigureGroup` — a three-across variant sharing one as-of line — lived here
// until 28 Aug 2026. Its only caller was the "how those households found the
// money" block in the cost section, which was cut for illustrating a finding
// the catastrophe ladder already proves. A second layout primitive kept alive
// for a use that no longer exists is how a component library starts costing
// more than it saves.
