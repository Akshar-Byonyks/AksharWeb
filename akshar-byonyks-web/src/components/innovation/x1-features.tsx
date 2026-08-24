import { BatteryCharging, Droplet, SlidersHorizontal, Thermometer } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { notMedicalAdvice } from "@/lib/claims";

// Spec §9.2, the four named features: fluid warming to body temperature,
// battery backup, needle-free operation, intuitive interface. Those four and
// no more — nothing here is extrapolated from the render or from what an APD
// cycler usually does.
//
// Color: all four icon chips are primary blue, not one accent each. The four
// accent roles carry fixed sitewide meanings (DESIGN.md's Wayfinding Rule —
// gold is home/India, teal is clinical evidence, plum is institutional), and
// none of those meanings actually fits "battery backup" or "warms fluid."
// Borrowing an accent because a four-up grid looks better in four colors is
// exactly what that rule exists to prevent.
const features = [
  {
    icon: Thermometer,
    title: "Warms fluid to body temperature",
    body: "The X-1 brings dialysate up to body temperature before it is infused, so an exchange does not begin with a cold fill.",
  },
  {
    icon: BatteryCharging,
    title: "Battery backup on board",
    body: "An on-board battery carries the machine through an interruption in mains power instead of ending the cycle.",
  },
  {
    icon: Droplet,
    title: "Needle-free",
    body: "Peritoneal dialysis works through a soft catheter in the abdomen. There are no needles in an X-1 exchange.",
  },
  {
    icon: SlidersHorizontal,
    title: "Run from the machine itself",
    body: "Setup and each night's treatment are driven from the X-1's own on-device screen.",
  },
] as const;

export function X1Features() {
  return (
    <section aria-labelledby="x1-features-heading" className="bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <h2
          id="x1-features-heading"
          className="max-w-xl text-3xl font-bold text-ink sm:text-4xl"
        >
          What the device does
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, body }, index) => (
            <ScrollReveal key={title} delayMs={index * 90}>
              <div className="h-full rounded-xl border border-line bg-card p-6">
                <div className="inline-flex size-11 items-center justify-center rounded-full bg-accent text-primary">
                  <Icon className="size-5.5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
          {notMedicalAdvice}
        </p>
      </div>
    </section>
  );
}
