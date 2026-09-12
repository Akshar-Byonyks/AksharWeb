import { AccentRail } from "@/components/common/accent-rail";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { distinctSpeakers } from "@/lib/byotalks";

// The reason spec F-5 works.
//
// F-5's finding: removing the Scientific Advisory Board from the site takes
// nine named nephrologists with it — Teitelbaum, Misra, Saxena, Meyer among
// them — and "for the clinician audience, those names are the credential that
// opens a conversation." Its remedy is this page: surface them as session
// speakers instead of as a roster, "no extra page, credibility retained at
// zero cost."
//
// The session list above does that one session at a time. Read that way, four
// advisory-board nephrologists are four separate bylines scattered down a
// page, and the group never assembles in a reader's head. This section is the
// assembly — the same names, gathered, with what each one is. It is not a
// roster page, which is what F-5 was told to remove; it is the speaker credits
// of a library that happens to have those people in it, which is exactly what
// F-5 asked for.
//
// **Nothing here is written by hand.** The list, the credentials and the
// session counts are all derived from `byotalks.ts`, so this section cannot
// name someone who does not speak, or miss someone who does. A hand-kept
// roster beside a generated list is the drift F-5's "no extra page" was partly
// avoiding.
//
// Surface-2, not ink: these are credentials, and DESIGN.md puts evidence and
// attribution in the light.
//
// TEAL, ADDED 30 Aug 2026. This section is the largest concentration of
// clinical credentials on the site and it carried no accent at all, on a page
// whose only accent was gold on a play button. Teal means "clinical evidence"
// sitewide; nine named nephrologists and what each one is, is the most literal
// instance of that meaning this project has. It rides the shared `AccentRail`,
// so the mark here and the mark on the session cards cannot drift apart.
export function SpeakerRegister() {
  const speakers = distinctSpeakers();

  return (
    <section
      aria-labelledby="speakers-heading"
      id="speakers"
      className="scroll-mt-24 bg-surface-2"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <ScrollReveal>
            <div className="lg:sticky lg:top-28">
              <h2
                id="speakers-heading"
                className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
              >
                Who is speaking
              </h2>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                Several of these clinicians sit on Byonyks&rsquo; Scientific
                Advisory Board. They appear here as what they are on this
                site: the people who recorded the sessions.
              </p>
            </div>
          </ScrollReveal>

          {/* A LIST OF PEOPLE, EACH OF WHOM IS A TERM AND A DEFINITION.
              (Restructured 12 Sep 2026.)

              This was one <dl> spanning the whole grid, with each card a
              <div> inside it. That is not a legal <dl>: the content model
              allows exactly ONE div grouping level between the list and its
              <dt>/<dd> pairs, and the accent rail alone contributes two. A
              screen reader stopped associating the names with the
              credentials underneath them, which on this page is the entire
              content.

              The outer structure is now a <ul>, which is what a register of
              eight speakers actually is — it gains the count and the
              position each card had been missing — and the term/definition
              pairing moves inside each card where it has room to be legal.
              The card wrapper is the <li> itself, so the rail can keep its
              own markup untouched. */}
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {speakers.map(({ speaker, credentials, sessionCount }, index) => (
              <ScrollReveal
                key={speaker}
                as="li"
                delayMs={index * 70}
                className="bg-card p-6"
              >
                <AccentRail accent="teal">
                  <dl>
                    <dt className="text-lg font-semibold text-ink">
                      {speaker}
                    </dt>
                    <dd>
                      <ul className="mt-2 space-y-1">
                        {credentials.map((credential) => (
                          <li
                            key={credential}
                            className="text-sm text-muted-foreground"
                          >
                            {credential}
                          </li>
                        ))}
                      </ul>
                      {/* The count stays muted. A session count is a fact about
                          this library, not a credential, and colouring it would
                          spend the accent on the one line in the card that is
                          not clinical evidence. */}
                      <p className="mt-4 font-mono text-xs tracking-wide text-muted-foreground">
                        {sessionCount === 1
                          ? "1 session"
                          : `${sessionCount} sessions`}
                      </p>
                    </dd>
                  </dl>
                </AccentRail>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
