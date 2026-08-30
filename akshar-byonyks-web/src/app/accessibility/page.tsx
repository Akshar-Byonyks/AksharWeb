import type { Metadata } from "next";

import { DirectionContract } from "@/components/common/direction-contract";
import { PendingNote } from "@/components/common/pending-note";
import {
  InternalLink,
  LegalPage,
  LegalSection,
  MailLink,
  type LegalSectionRef,
} from "@/components/legal/legal-document";
import { byotalksSessions } from "@/lib/byotalks";

const path = "/accessibility";

const description =
  "How accessible this site is, measured rather than claimed: what was tested, what passes, and the three known gaps we have not closed yet.";

export const metadata: Metadata = {
  title: "Accessibility",
  description,
  alternates: { canonical: path, languages: { "en-IN": path } },
  openGraph: {
    title: "Accessibility | Akshar Byonyks",
    description,
    url: path,
    type: "website",
  },
  twitter: { card: "summary" },
};

// Spec §14.3: "Recommended. Conformance target and a contact for issues."
//
// EVERY CLAIM ON THIS PAGE WAS MEASURED BEFORE IT WAS WRITTEN. Fourteen routes
// were loaded at 1400px and 390px and checked for document language, skip link,
// main landmark, heading-level order, `h1` count, images without `alt`,
// horizontal overflow and unlabelled new-tab links. The results are what the
// "What passes" section says. This is the difference between an accessibility
// statement and an accessibility aspiration, and the standard boilerplate
// version of this page — "we are committed to ensuring accessibility for all
// users" — tells a screen-reader user nothing they can act on.
//
// THE PAGE ADMITS WHAT IT CANNOT CLAIM. Three real gaps are named:
//
//   1. **Captions are machine-generated on all eight ByoTalks recordings.**
//      SC 1.2.2 asks for captions that are accurate; auto-captions on clinical
//      vocabulary are not. This is the most consequential gap on the site for a
//      deaf or hard-of-hearing user and it is named first.
//   2. **No audio description** on those recordings (SC 1.2.5).
//   3. **No assistive-technology testing and no third-party audit.** Automated
//      structural checks catch a fraction of what a screen-reader user hits.
//      Saying "WCAG 2.1 AA compliant" off the back of automated checks alone
//      would be a claim this project cannot support.
//
// The measurement that found the one unlabelled new-tab link on Home also fixed
// it, which is the useful order: run the check, fix what it finds, then write
// down what is left.

const lastUpdated = "30 August 2026";

const sections: readonly LegalSectionRef[] = [
  { id: "target", title: "What we are aiming for" },
  { id: "what-passes", title: "What we checked, and what passes" },
  { id: "known-gaps", title: "Known gaps" },
  { id: "how-tested", title: "How this was tested" },
  { id: "features", title: "Things you may find useful" },
  { id: "tell-us", title: "Tell us if something does not work" },
];

const passes = [
  "Every page declares its language as English (India), so a screen reader pronounces it correctly.",
  "Every page starts with a “Skip to main content” link, and has one main landmark.",
  "Every page has exactly one level-1 heading, and heading levels never skip a level.",
  "Every image carries alt text; decorative marks are hidden from screen readers rather than described.",
  "No page scrolls sideways at 390px or at 1400px, so text reflows instead of forcing a horizontal scroll.",
  "Links that open in a new tab say so, in text a screen reader reads out.",
  "Body text meets the AA contrast minimum, and the design tokens carry their measured ratios in the stylesheet.",
  "Motion respects the reduced-motion setting in your operating system.",
];

export default function AccessibilityPage() {
  const captionCount = byotalksSessions.filter(
    (s) => s.captions === "auto",
  ).length;

  return (
    <>
      <DirectionContract>{`
THESIS: an accessibility statement is only worth anything if a disabled reader
can act on it. That means naming what was tested, what passed, and what is
still broken — not a paragraph about commitment. Read mode.
OWN-WORLD: this is the "show the gaps" instinct at its most literal, and the
one page on the site where the gaps ARE the content. Every pass claim here was
measured across fourteen routes at two viewports before it was written; the
three things that cannot be claimed are named with their WCAG criteria.
STORY: the target → what passes, measured → what is broken, named → how it was
tested and what that does not cover → features you can use → how to tell us.
FORM: one measured column shared with the other four documents. No badges, no
compliance seal, no "AA compliant" claim the testing does not support.
FINISH: plain register. The known-gaps section leads with captions, because on
a site whose clinical content is eight recorded talks, that is the gap that
locks the most people out.
`}</DirectionContract>

      <LegalPage
        title="Accessibility"
        standfirst="What we have tested, what passes, and the gaps we have not closed. Measured on this site rather than copied from a template."
        lastUpdated={lastUpdated}
        sections={sections}
      >
        <LegalSection id="target" title="What we are aiming for">
          <p>
            Our target is{" "}
            <strong className="text-ink">
              WCAG 2.1 Level AA
            </strong>
            . This site is built to it, and the structural checks below pass —
            but we have not had an independent audit, so{" "}
            <strong className="text-ink">
              we do not claim to be fully conformant
            </strong>
            . What follows is what we know, honestly.
          </p>
          <p>
            Much of this site is read by people managing kidney failure, often on
            a phone, often older, often in a second language and often tired.
            Accessibility here is not a compliance exercise.
          </p>
        </LegalSection>

        <LegalSection id="what-passes" title="What we checked, and what passes">
          <p>
            Every item below was measured across the site, not assumed:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            {passes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection id="known-gaps" title="Known gaps">
          <p>
            These are real, they are ours, and they are not fixed yet.
          </p>

          <div className="mt-5 space-y-6">
            <div>
              <p className="text-base font-semibold text-ink">
                1. Video captions are machine-generated
              </p>
              <p className="mt-1">
                All {captionCount} ByoTalks recordings carry automatic captions
                from YouTube rather than human-checked ones. WCAG 2.1 asks for
                captions that are accurate and synchronised (SC 1.2.2), and
                automatic captions are unreliable on clinical vocabulary —
                exactly the words in these talks that matter most. The player
                says so above each video rather than describing them simply as
                &ldquo;captions available&rdquo;.{" "}
                <strong className="text-ink">
                  Human-verified caption tracks are needed and are not done.
                </strong>
              </p>
            </div>

            <div>
              <p className="text-base font-semibold text-ink">
                2. No audio description on the recordings
              </p>
              <p className="mt-1">
                The recordings have no audio description track (SC 1.2.5). They
                are largely people talking, so the loss is smaller than it would
                be for a procedural video, but it is a gap and not a
                technicality. Each session page carries a written summary of what
                the session covers.
              </p>
            </div>

            <div>
              <p className="text-base font-semibold text-ink">
                3. No assistive-technology testing and no independent audit
              </p>
              <p className="mt-1">
                The checks behind this page are automated and structural. They
                do not tell us how the site actually behaves with a screen
                reader, with voice control, or at 400% zoom with a magnifier.{" "}
                <strong className="text-ink">
                  Testing with real assistive technology, and an independent
                  audit, have not been done.
                </strong>{" "}
                Until they are, treat the claims above as our own testing rather
                than a verified conformance statement.
              </p>
            </div>
          </div>

          <PendingNote
            className="mt-6"
            note="Independent audit pending"
            label="An accessibility audit by someone other than the team that built the site — including testing with screen readers and by disabled users — has not been commissioned. Nothing on this page should be read as a substitute for one."
          />
        </LegalSection>

        <LegalSection id="how-tested" title="How this was tested">
          <p>
            Fourteen pages of the site — home, the innovation and market pages,
            ByoTalks and a session page, about us, leadership and a profile,
            news and an article, the contact form and the privacy policy — were
            loaded at a desktop width of 1400px and a phone width of 390px, and
            checked for document language, skip link, main landmark, heading
            order, single level-1 heading, missing alt text, horizontal overflow
            and unlabelled links that open new tabs.
          </p>
          <p>
            Colour contrast was calculated for the text and background pairs the
            pages actually render, including semi-transparent text over the dark
            sections, by compositing the colour over its real backdrop rather
            than reading the declared value.
          </p>
          <p>
            Where a check found something, it was fixed before this page was
            written rather than being listed as a known issue: one link that
            opened a new tab without saying so, and a low-contrast border on the
            news article labels.
          </p>
        </LegalSection>

        <LegalSection id="features" title="Things you may find useful">
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              Videos do not load or play until you press play, so nothing starts
              moving or making sound on its own.
            </li>
            <li>
              If your system is set to reduce motion, the reveal animations do
              not run.
            </li>
            <li>
              The site works without JavaScript for reading; text, navigation and
              links do not depend on it.
            </li>
            <li>
              Text resizes with your browser&rsquo;s zoom and text-size settings
              without content being cut off.
            </li>
            <li>
              Long documents like this one have a section index you can jump
              from, and every section has a keyboard-reachable anchor.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="tell-us" title="Tell us if something does not work">
          <p>
            If any part of this site is difficult or impossible for you to use,
            please tell us — it is the fastest way for us to find what our own
            testing missed.
          </p>
          <p>
            Email <MailLink /> , or use the{" "}
            <InternalLink href="/contact">enquiry form</InternalLink>. Tell us
            the page, what you were trying to do, and what happened. If you use
            assistive technology, saying which one helps us reproduce it.
          </p>
          <p>
            <strong className="text-ink">
              We will reply, and we will tell you honestly whether and when we
              can fix it.
            </strong>{" "}
            If you are not satisfied with our answer, the{" "}
            <InternalLink href="/grievance-redressal">
              grievance redressal
            </InternalLink>{" "}
            route is open to you.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
