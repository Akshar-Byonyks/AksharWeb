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
    <section aria-labelledby="why-different-heading" className="bg-surface-2">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <h2 id="why-different-heading" className="max-w-xl text-3xl font-bold text-ink sm:text-4xl">
          Why it is different
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, body, accent }, index) => (
            <ScrollReveal key={title} delayMs={index * 90}>
              <div className="h-full rounded-xl border border-line bg-card p-6">
                <div
                  className={cn(
                    "inline-flex size-11 items-center justify-center rounded-full",
                    chipClasses[accent]
                  )}
                >
                  <Icon className="size-5.5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
          This is general information, not medical advice. Talk to your
          nephrologist about whether home peritoneal dialysis is right for
          you.
        </p>
      </div>
    </section>
  );
}
