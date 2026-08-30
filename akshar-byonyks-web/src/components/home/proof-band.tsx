import {
  DisplayFigure,
  displayFigureClass,
} from "@/components/common/display-figure";
import { CountUpStat } from "@/components/home/count-up-stat";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

// §9.1 row 5: FDA 510(k) clearance, ISO 13485 manufacturing, 10,000+
// therapies. Attribution per F-1 (resolved 20 Aug 2026): manufacturing and
// the therapies figure attribute to Byonyks generically, never to a
// country — Akshar Byonyks may not be described as the manufacturer.
//
// Color: each stat gets a distinct role instead of uniform blue
// (deviations.md) — regulatory (blue/trust), quality (teal/clinical),
// impact (gold/human) — so the three read as different kinds of proof,
// not one repeated number.
//
// Rebuilt 26 Aug 2026. The sitewide critique found this was the densest
// credibility on the site — the thing the Priority-1 and Priority-3 audiences
// actually arrive for — rendered as three plain paragraphs at text-4xl on a
// 242px band, and called it the weakest treatment of the strongest content.
//
// Deliberately NOT rebuilt as a hero-metric band (big number, small label,
// accent), which the craft floor names as a default to refuse and which would
// read as marketing to exactly the two audiences that distrust it. It is built
// as a register instead: hairline-separated entries, the credential set at
// display weight, the issuing attribution given equal prominence to the
// credential because on this site the attribution is the regulatorily load-
// bearing half. The separator language is the specification table's, so a
// reader meets the same documentary grammar on both pages.
//
// The ground stays white on purpose. Under the revised Full-Bleed Rule, ink
// carries home/night/patient-life and white carries evidence/regulation/
// specification. This is evidence; it belongs in the light.
const proofPoints = [
  {
    stat: "510(k)",
    label: "FDA clearance",
    detail:
      "K243371, granted to Byonyks on 16 May 2025 — the X-1 automated peritoneal dialysis cycler. Held by Byonyks, not by Akshar Byonyks.",
    tone: "primary" as const,
  },
  {
    stat: "ISO 13485",
    label: "Certified manufacturing",
    detail: "The X-1 is manufactured at a Byonyks ISO 13485 certified facility.",
    tone: "teal" as const,
  },
];

export function ProofBand() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="border-y border-line bg-background"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <h2 id="proof-heading" className="sr-only">
          Proof
        </h2>
        <ScrollReveal>
          {/* Divider between entries rather than around them: a rule that
              separates reads as a record, a box that encloses reads as a card,
              and this page already had twelve of those. */}
          <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {proofPoints.map(({ stat, label, detail, tone }, i) => (
              <div
                key={label}
                className={
                  i === 0
                    ? "pb-8 sm:pr-8 sm:pb-0 lg:pr-12"
                    : "py-8 sm:px-8 sm:py-0 lg:px-12"
                }
              >
                {/* Moved onto the named display-numeral role, 30 Aug 2026.
                    This band and `figure-register.tsx` were setting the same
                    idea at two sizes, and only one of them had tabular
                    figures on. `tone` is carried on the data rather than as a
                    class string so the role stays the only place the size and
                    the numerals are decided. */}
                <DisplayFigure size="hero" tone={tone}>
                  {stat}
                </DisplayFigure>
                <p className="mt-4 text-lg font-semibold text-ink">{label}</p>
                <p className="mt-2 text-base text-muted-foreground">{detail}</p>
              </div>
            ))}
            <div className="pt-8 sm:pt-0 sm:pl-8 lg:pl-12">
              <CountUpStat
                to={10000}
                suffix="+"
                className={displayFigureClass({ size: "hero", tone: "gold" })}
              />
              <p className="mt-4 text-lg font-semibold text-ink">
                Therapies delivered
              </p>
              <p className="mt-2 text-base text-muted-foreground">
                Using Byonyks cycler technology, as reported by Byonyks USA.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
