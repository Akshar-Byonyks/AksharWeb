import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PendingNote } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { leadershipStatus } from "@/lib/about";
import { byonyksExecutives } from "@/lib/leadership";

// The team, on the About page.
//
// Rewritten twice on 29 Aug 2026: first when `/about-us/leadership/` was
// populated from byonyks.com on client instruction, then again when the first
// Akshar Byonyks executive was supplied. Before that this section was a
// pending note and nothing else, because there was nowhere to send anybody.
//
// IT STILL CARRIES THE PENDING NOTE, and that is the point of the section
// rather than a leftover. Open Question 1.4 is not closed by one name, and it
// is a launch gate. A reader who follows the link must already know that most
// of what is on the other end is the licensor's team, or the roster answers
// the wrong question on their behalf.
export function LeadershipPending() {
  return (
    <section aria-labelledby="leadership-heading" className="bg-surface-2">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="leadership-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
            >
              The people
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Dr. Vishnu Patel, Vice President, for Akshar Byonyks, and{" "}
              {byonyksExecutives.length} executives at Byonyks — the engineers,
              clinicians and regulatory staff who took the X-1 through to
              clearance. Each is listed with the company they work for and with
              their biography as it was given to us.
            </p>
            <p className="mt-6">
              <Link
                href="/about-us/leadership"
                className="inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                The leadership team
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            </p>

            <PendingNote
              className="mt-10"
              note={leadershipStatus.note}
              label={leadershipStatus.label}
            />

            <p className="mt-6 text-base text-muted-foreground">
              {leadershipStatus.meanwhile}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
