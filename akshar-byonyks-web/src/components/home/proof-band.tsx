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
const proofPoints = [
  {
    stat: "510(k)",
    label: "FDA clearance",
    detail: "Granted to Byonyks USA, May 2025 — the X-1 automated peritoneal dialysis cycler.",
    className: "text-primary",
  },
  {
    stat: "ISO 13485",
    label: "Certified manufacturing",
    detail: "The X-1 is manufactured at a Byonyks ISO 13485 certified facility.",
    className: "text-teal",
  },
];

export function ProofBand() {
  return (
    <section aria-labelledby="proof-heading" className="border-y border-line bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <h2 id="proof-heading" className="sr-only">
          Proof
        </h2>
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {proofPoints.map(({ stat, label, detail, className }) => (
              <div key={label}>
                <p className={`text-4xl font-bold ${className}`}>{stat}</p>
                <p className="mt-1 text-sm font-semibold text-ink">{label}</p>
                <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
              </div>
            ))}
            <div>
              <CountUpStat
                to={10000}
                suffix="+"
                className="text-4xl font-bold text-accent-gold"
              />
              <p className="mt-1 text-sm font-semibold text-ink">
                Therapies delivered
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Using Byonyks cycler technology, as reported by Byonyks USA.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
