import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PendingNote } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { leadershipStatus } from "@/lib/about";
import { executives } from "@/lib/leadership";

// The team, on the About page.
//
// Rewritten 29 Aug 2026, when `/about-us/leadership/` was populated from
// byonyks.com on client instruction. Until then this section was a pending
// note and nothing else, because there was nowhere to send anybody.
//
// IT STILL CARRIES THE PENDING NOTE, and that is the point of the section
// rather than a leftover. The leadership page answers "who built the device";
// Open Question 1.4 — the five Akshar Byonyks executives — is a different
// question, still open, and a launch gate. A reader who follows the link must
// already know which of the two they are about to get, or the roster answers
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
              {executives.length} executives at Byonyks — the engineers,
              clinicians and regulatory staff who took the X-1 through to
              clearance — are listed with their biographies, as Byonyks
              publishes them.
            </p>
            <p className="mt-6">
              <Link
                href="/about-us/leadership"
                className="inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                The team behind the X-1
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
