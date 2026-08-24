import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

// Spec §11.2, internal linking: "every content page links to at least two
// siblings and one conversion page." These are the two siblings; the
// conversion page is reached from the hero, the IFU panel, and the closing CTA
// band.
//
// Both routes are in the primary nav already but neither is built yet, so they
// 404 today — the same state every nav item except Home and this page is in
// while the site is built out page by page. Nothing here needs to change when
// they ship.
const siblings = [
  {
    href: "/innovation/how-it-works",
    title: "How peritoneal dialysis works",
    body: "The exchange cycle in plain language, with a technical layer for clinicians.",
  },
  {
    href: "/innovation/market",
    title: "The case for home dialysis in India",
    body: "Access, cost and coverage — the argument the X-1 exists to answer.",
  },
];

export function X1Continue() {
  return (
    <section aria-labelledby="x1-continue-heading" className="bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <h2
          id="x1-continue-heading"
          className="text-3xl font-bold text-ink sm:text-4xl"
        >
          Keep reading
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {siblings.map(({ href, title, body }, index) => (
            <ScrollReveal key={href} delayMs={index * 90}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-xl border border-line bg-card p-6 hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <h3 className="text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:underline">
                  Read on
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
