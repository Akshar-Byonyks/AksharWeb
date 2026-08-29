import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PendingNote } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { leadershipStatus } from "@/lib/about";
import { distinctSpeakers } from "@/lib/byotalks";

// The team, and its absence.
//
// Spec §9.5 specifies `/about-us/leadership/` with five executives — name, bio
// of 150 to 250 words, portrait, consistent backdrop — and then says
// **"Blocked on Open Questions 1.4. Launch gate."** 1.4 is still fully open:
// the five names have not been given to this project, and they sit on the
// do-not-fabricate list alongside the India office address.
//
// So there is no leadership page, and this is the section that says so. The
// spec's own risk table is blunt about the cost — "Investor-first with no
// named team is not credible" — which is an argument for *getting the names*,
// not for inventing plausible ones or filling the grid with stock portraits
// and role titles nobody holds. An empty section must look deliberate rather
// than broken (spec §9.7); a fabricated one just looks fine until somebody
// checks.
//
// WHAT IS NOT MISSING, AND WHY IT IS SAID HERE. Spec F-5 removed the
// Scientific Advisory Board page and named ByoTalks as the compensating route:
// the advisory nephrologists appear as session speakers, with credentials, at
// no extra cost. That route is live, so this section counts them from the real
// data rather than claiming a number — a page admitting one gap should be
// exact about what it does have.
export function LeadershipPending() {
  const speakers = distinctSpeakers();
  const withBoardSeat = speakers.filter((speaker) =>
    speaker.credentials.some((credential) =>
      credential.includes("Scientific Advisory Board"),
    ),
  );

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
              {leadershipStatus.meanwhile}
            </p>

            <PendingNote
              className="mt-8"
              note={leadershipStatus.note}
              label={leadershipStatus.label}
            />

            {/* The leadership page exists as of 29 Aug 2026 — route, grid,
                profile template and the spec §9.5 contract that enforces a
                150–250 word bio and a portrait. It is deliberately not linked
                from here or from the navigation while its roster is empty: a
                link whose destination is an apology is worse than the honest
                note above it. Both turn on in the same edit that adds the
                five people. */}

            <p className="mt-8 text-lg text-foreground">
              {withBoardSeat.length} of the {speakers.length} clinicians who
              have given ByoTalks sessions sit on Byonyks&rsquo; Scientific
              Advisory Board, and every one of them is named on this site with
              their credentials.
            </p>
            <p className="mt-6">
              <Link
                href="/byotalks"
                className="inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                The clinicians, and their sessions
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
