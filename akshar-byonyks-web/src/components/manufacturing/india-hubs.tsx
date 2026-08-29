import { MapPin } from "lucide-react";

import { PendingNote } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { indiaHubs } from "@/lib/compliance";

// §9.4 "Innovation hubs": two facility cards, Hyderabad and Ahmedabad.
//
// THE HARD CONSTRAINT, AND IT IS NOT AN EDITORIAL ONE. Open Questions 2.3 is
// still open: construction is underway on both, there is no confirmed
// completion date, and their function is not confirmed as manufacturing. Spec
// §9.4's note bars describing them as manufacturing facilities until it is,
// because whether they manufacture determines which CDSCO licence route
// applies — Form MD-3/MD-5 via the State Licensing Authority, or MD-7/MD-9 via
// the Central Licensing Authority (spec §14.2). A card here calling them
// factories would be this website taking a regulatory position on behalf of a
// company that has not taken one.
//
// The client's own note, 20 Aug 2026: these cards are "known to look
// unpolished." That was a prediction about "coming soon" cards, and it is
// right about those. The fix is not to dress the gap up but to make the state
// of play itself the content: the city is named, what is true is stated in one
// sentence, and the pending note carries the *specific* missing fact rather
// than the word "soon". A reader learns something real from a card that says
// "function and completion date not confirmed" and nothing at all from one
// that says "coming soon".
//
// Two cards and no third. byonyks.com's own manufacturing page lists three
// hubs including a headquarters and facilities described as "Punjab, South
// Asia"; none of those is an Akshar Byonyks site, and spec F-1 keeps them off
// this site entirely rather than restating them under a vaguer label.
//
// No photograph, and this is a decision rather than an omission — see
// public/images/README.md. A verified Hyderabad street photograph was found;
// nothing verifiable was found for Ahmedabad, and running one confirmed city
// beside one guessed city on the page whose subject is *verified versus
// asserted* would have been the page contradicting itself in pictures.
export function IndiaHubs() {
  return (
    <section aria-labelledby="hubs-heading" className="bg-surface-2">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="hubs-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
            >
              What Akshar Byonyks is building in India
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Two hubs, both under construction. Neither is described here as a
              manufacturing facility, and that is a deliberate limit rather than
              modesty: whether a site manufactures decides which licence it
              needs under the Medical Device Rules 2017, and that is not settled
              yet.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <ul className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {indiaHubs.map((hub) => (
              <li
                key={hub.city}
                className="flex flex-col rounded-2xl border border-line bg-card p-6 sm:p-8"
              >
                {/* Gold, on its own meaning. DESIGN.md fixes gold to
                    "home / India" sitewide, and two Indian cities are the
                    most literal instance of that role on the site. */}
                <div className="inline-flex size-11 items-center justify-center rounded-full bg-[color-mix(in_oklch,var(--color-accent-gold),white_86%)] text-accent-gold">
                  <MapPin className="size-5.5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-ink">{hub.city}</h3>
                <p className="mt-1 text-base text-muted-foreground">
                  {hub.state}
                </p>
                <p className="mt-4 grow text-base text-foreground">
                  {hub.status}
                </p>
                <PendingNote
                  className="mt-6"
                  note="Not confirmed"
                  label={hub.pending}
                />
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
