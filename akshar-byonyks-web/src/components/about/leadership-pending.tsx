import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DocumentGrid, GridBlock } from "@/components/layout/document-grid";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { aksharExecutives, byonyksExecutives } from "@/lib/leadership";

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
      <DocumentGrid className="py-20">
        <ScrollReveal>
          {/* A PENDING PROVENANCE MARK SAT IN THIS RAIL and came out on client
              instruction (3 Sep 2026). It carried `leadershipStatus.label`:
              that three Akshar Byonyks people are published, that two have no
              job title and no photograph, that both were requested on
              1 September 2026, and that Senthil Kumar's card is Byonyks'.

              The gaps themselves are unchanged — the cards still have no
              titles and no photographs. The page simply no longer says so, so
              a reader now meets an incomplete roster with nothing explaining
              why. `leadershipStatus.label` is kept in `lib/about.ts` and is
              no longer rendered anywhere; see the note there.

              `leadershipStatus.meanwhile` followed it off the page on client
              instruction, 12 Sep 2026 — the sentence pointing a reader at the
              ByoTalks speakers as the nephrologists who advise Byonyks. That
              field is deleted from `about.ts` rather than left unrendered,
              because this was the only thing that read it. */}
          <GridBlock>
            <h2
              id="leadership-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
            >
              The people
            </h2>
            {/* Rewritten 1 Sep 2026, when the roster went from fifteen to
                four. It used to lead with one Akshar Byonyks name and then
                fourteen of the licensor's; it now leads with three of ours.
                The counts are read from the data rather than written out, so
                this sentence cannot go stale the way the last one did. */}
            <p className="mt-4 text-lg text-muted-foreground">
              {aksharExecutives.length} people at Akshar Byonyks, and{" "}
              {byonyksExecutives.length === 1 ? "one colleague" : `${byonyksExecutives.length} colleagues`}{" "}
              at Byonyks, the company that designs and manufactures the cycler.
              Each is listed with the company they work for and with their
              biography as it was given to us.
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
          </GridBlock>
        </ScrollReveal>
      </DocumentGrid>
    </section>
  );
}
