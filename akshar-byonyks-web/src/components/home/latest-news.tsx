import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { latestNews } from "@/lib/news-data";

// §9.1 row 8. Only two real articles exist at launch (spec §9.7) — shown
// as-is rather than padded to three with invented content.
export function LatestNews() {
  return (
    <section aria-labelledby="latest-news-heading" className="bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="latest-news-heading" className="text-3xl font-bold text-ink sm:text-4xl">
              Latest
            </h2>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 rounded-sm py-1 text-sm font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              All news
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {latestNews.map((item, index) => (
            <ScrollReveal key={item.title} delayMs={index * 90}>
              <Link
                href={item.href}
                className="group flex flex-col gap-2 rounded-xl border border-line bg-card p-6 transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <time
                  dateTime={item.date}
                  className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                >
                  {new Date(item.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <p className="text-base font-semibold text-ink group-hover:text-primary">
                  {item.title}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
