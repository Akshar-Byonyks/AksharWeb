import { Activity, IndianRupee, ShieldCheck, Sparkles } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { cn } from "@/lib/utils";

// §9.1 row 4, four-benefit framework (PRODUCT.md Evidence on Hand,
// migrated as-is). Motion amendment: cascades in staggered on scroll,
// not flat. Color: each benefit gets one of the system's four accent
// roles (deviations.md) — the same four roles recur on the audience cards
// below, so the color-coding teaches itself once and pays off twice.
const benefits = [
  {
    icon: ShieldCheck,
    title: "Protects the peritoneal membrane",
    body: "Peritoneal dialysis uses the lining of your own abdomen to filter blood. The X-1 is designed to help preserve that lining's integrity over time.",
    accent: "primary",
  },
  {
    icon: IndianRupee,
    title: "Built to be affordable",
    body: "Home therapy removes the recurring cost of travel, lost working hours, and clinic time that come with repeated in-center visits.",
    accent: "gold",
  },
  {
    icon: Activity,
    title: "Supports residual kidney function",
    body: "Home peritoneal dialysis is associated with preserving residual renal function for longer than in-center haemodialysis.",
    accent: "teal",
  },
  {
    icon: Sparkles,
    title: "Clears what the body can't",
    body: "Each cycle removes acid and toxins that build up in the dialysate, the same job healthy kidneys do continuously.",
    accent: "plum",
  },
] as const;

const chipClasses: Record<(typeof benefits)[number]["accent"], string> = {
  primary: "bg-accent text-primary",
  gold: "bg-[color-mix(in_oklch,var(--color-accent-gold),white_85%)] text-accent-gold",
  teal: "bg-[color-mix(in_oklch,var(--color-teal),white_85%)] text-teal",
  plum: "bg-[color-mix(in_oklch,var(--color-plum),white_88%)] text-plum",
};

export function WhyDifferent() {
  return (
    // Rebuilt 26 Aug 2026. Four equal cards of chip-plus-heading-plus-text is
    // the page structure the craft floor names as the lazy container, and the
    // sitewide critique counted twelve instances of that same rounded rectangle
    // on this page. These are now hairline-separated rows in the
    // framing-and-artifact split, the same grammar the X-1 page's feature list
    // and specification table use.
    //
    // The accent chips STAY. DESIGN.md's Wayfinding Rule depends on this group
    // teaching the colour code that the audience cards below then reuse — gold
    // is home/India, teal is clinical evidence, plum is institutional — and the
    // critique's own finding was that those meanings get too few exposures to
    // be learnable, not too many. Removing an exposure to tidy the layout would
    // have made the real problem worse. At row width the chip finally sits
    // beside text at a readable size rather than above 14px card copy.
    <section aria-labelledby="why-different-heading" className="bg-surface-2">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <ScrollReveal>
            <div className="lg:sticky lg:top-24">
              <h2
                id="why-different-heading"
                className="text-3xl font-bold text-balance text-ink sm:text-4xl"
              >
                Why it is different
              </h2>
              <p className="mt-6 max-w-md text-sm text-muted-foreground">
                This is general information, not medical advice. Talk to your
                nephrologist about whether home peritoneal dialysis is right
                for you.
              </p>
            </div>
          </ScrollReveal>

          <div>
            {benefits.map(({ icon: Icon, title, body, accent }, index) => (
              <ScrollReveal key={title} delayMs={index * 90}>
                <div className="flex gap-5 border-t border-line py-7 first:border-t-0 first:pt-0">
                  <div
                    className={cn(
                      "inline-flex size-12 shrink-0 items-center justify-center rounded-full",
                      chipClasses[accent]
                    )}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-ink">{title}</h3>
                    <p className="mt-2 text-base text-muted-foreground">
                      {body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
