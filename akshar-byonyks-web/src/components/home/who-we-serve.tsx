"use client";

import { Building2, HeartHandshake, Stethoscope, TrendingUp } from "lucide-react";

import { AudienceCard } from "@/components/home/audience-card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

// Client boundary starts here, not lower: AudienceCard needs the pointer
// handlers, and a Lucide icon component can't cross the server/client
// prop-serialization boundary as a passed-down prop (only rendered
// elements can), so the icon map has to live on the same side as the
// component that renders it.

// §9.1 row 6, corrected in spec v0.5: four cards matching Section 4's
// audiences exactly (Investors & partners combined, Distributors &
// government as the fourth), not the old five-card split. Color: each
// card takes one of the system's four accent roles (deviations.md) — the
// same four roles used on the benefit cards above, so a visitor who
// learned "gold = India/home" there recognizes it again here.
const audiences = [
  {
    icon: TrendingUp,
    title: "Investors & partners",
    body: "Market size, licensing scope, regulatory status, and the India case for home PD.",
    href: "/innovation/market",
    tint: "primary",
  },
  {
    icon: HeartHandshake,
    title: "Patients & families",
    body: "What home peritoneal dialysis is, what a day on it looks like, and whether it fits you.",
    href: "/innovation/how-it-works",
    tint: "gold",
  },
  {
    icon: Stethoscope,
    title: "Clinicians",
    body: "Device specifications, clinical evidence, and ByoTalks sessions from named nephrologists.",
    href: "/byotalks",
    tint: "teal",
  },
  {
    icon: Building2,
    title: "Distributors & government",
    body: "The compliance record: the FDA clearance you can look up, and the certifications behind the device.",
    href: "/innovation/the-x1-cycler#compliance",
    tint: "plum",
  },
] as const;

export function WhoWeServe() {
  return (
    <section aria-labelledby="who-we-serve-heading" className="bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <h2 id="who-we-serve-heading" className="max-w-xl text-3xl font-bold text-ink sm:text-4xl">
          Who we serve
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Four audiences, one licensed technology. Find the path built for
          you.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, index) => (
            <ScrollReveal key={audience.title} delayMs={index * 90}>
              <AudienceCard {...audience} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
