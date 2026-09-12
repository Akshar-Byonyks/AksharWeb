import type { Metadata } from "next";

import { defaultOg } from "@/lib/seo";
import { grievanceOfficer, indiaOffice } from "@/lib/site-config";

import { DirectionContract } from "@/components/common/direction-contract";
import { PendingNote } from "@/components/common/pending-note";
import {
  InternalLink,
  LegalPage,
  LegalSection,
  MailLink,
  type LegalSectionRef,
} from "@/components/legal/legal-document";

const path = "/grievance-redressal";

const description =
  "How to complain about how Akshar Byonyks has handled your personal data, what happens next, and how to escalate to the Data Protection Board of India.";

export const metadata: Metadata = {
  title: "Grievance Redressal",
  description,
  alternates: { canonical: path, languages: { "en-IN": path } },
  openGraph: {
    title: "Grievance Redressal | Akshar Byonyks",
    description,
    url: path,
    type: "website",
    images: defaultOg,
  },
  twitter: { card: "summary" },
};

// Spec §14.1 and §14.3: "Required under DPDP. Named officer, contact, process,
// timeline." The DPDP Act 2023 gives a data principal the right to a readily
// available grievance redressal mechanism, and requires a Grievance Officer
// whose contact details are published.
//
// THREE OF THE FOUR EXIST HERE. Contact, process and timeline are real and
// usable today: a complaint sent to the published address reaches a person and
// gets an answer, and this page says exactly what happens to it.
//
// **THE NAMED OFFICER DOES NOT.** Nobody has been appointed. That is a
// launch-blocking gap and it is stated as one, in the semantic amber, at the
// top of the page rather than buried at the bottom — because someone arriving
// here is arriving with a complaint, and the first thing they need to know is
// whether there is a real person at the end of it. Inventing a name, or
// dressing a generic inbox up as an officer, would be the single worst thing
// this project could do on this particular page: it is the page whose whole
// purpose is that a person exists and is accountable.
//
// THE STATUTORY PERIOD IS NOT INVENTED EITHER. The DPDP Act leaves the response
// period to be prescribed by rules made under it. Rather than state a number
// this project cannot source, the page states a service commitment that is
// ours to make and keep, and marks the prescribed statutory period as one for
// counsel to confirm. A wrong statutory deadline on a statutory page is worse
// than an admitted gap.

const lastUpdated = "30 August 2026";

const sections: readonly LegalSectionRef[] = [
  { id: "who-this-is-for", title: "Who this page is for" },
  { id: "officer", title: "The Grievance Officer" },
  { id: "how-to-complain", title: "How to complain" },
  { id: "what-happens", title: "What happens next" },
  { id: "timeline", title: "How long it takes" },
  { id: "escalate", title: "If we do not resolve it" },
  { id: "other-complaints", title: "Complaints that are not about data" },
];

const steps = [
  {
    n: "1",
    title: "You write to us",
    body: "Email the address below with what happened and what you would like us to do. You do not need a form, a reference number, or legal language.",
  },
  {
    n: "2",
    title: "We acknowledge it",
    body: "We confirm we have it, in writing, so you are not left wondering whether it arrived.",
  },
  {
    n: "3",
    title: "We look into it",
    body: "We find what we hold, what we did with it, and whether we got it wrong. If we need something from you to identify your records, we ask once and clearly.",
  },
  {
    n: "4",
    title: "We answer you",
    body: "In writing, saying what we found, what we have done about it, and what we have not done and why.",
  },
];

export default function GrievanceRedressalPage() {
  return (
    <>
      <DirectionContract>{`
THESIS: someone arriving here is arriving annoyed, and the page's job is to
show them a real person and a real process in the first viewport. Read mode,
and the most operational of the five documents.
OWN-WORLD: the "show the gaps" instinct at its sharpest, and as of 11 Sep 2026
the largest of those gaps is closed. The DPDP Act requires a NAMED officer;
none had been appointed for the life of this page, so the amber note saying so
sat at the top rather than the bottom, because it was the first thing a
complainant needed to know. An officer is now named, with an address and two
ways to reach him, in that same first position — the slot was right whichever
answer went in it. What still carries amber is the statutory period: the Act
leaves it to rules, so the page states the commitment that is ours to make and
marks the statutory number as counsel's to confirm.
STORY: who this is for → who handles it (and the gap) → how to complain → what
happens, in four steps → how long → how to escalate above us.
FORM: one measured column shared with the other four documents; the four
process steps are the only structured block, because a process is the one thing
here that is genuinely a sequence.
FINISH: plain register, short sentences. Nothing on this page promises a
timeline we cannot keep or a person who does not exist.
`}</DirectionContract>

      <LegalPage
        title="Grievance redressal"
        standfirst="If we have got something wrong with your personal data, this is how to tell us, what we will do about it, and how to go above us if we do not fix it."
        lastUpdated={lastUpdated}
        sections={sections}
      >
        <LegalSection id="who-this-is-for" title="Who this page is for">
          <p>
            Anyone who has contacted us through this website and is unhappy with
            how we have handled their personal data: what we collected, what we
            did with it, how long we kept it, or how we answered a request to
            see, correct or delete it.
          </p>
          <p>
            India&rsquo;s Digital Personal Data Protection Act 2023 gives you the
            right to a readily available way of raising this, and the right to
            escalate if we do not deal with it. This page is that route.
          </p>
        </LegalSection>

        <LegalSection id="officer" title="The Grievance Officer">
          <p>
            The DPDP Act requires us to publish the name and contact details of
            a Grievance Officer: a specific accountable person, not a
            department.
          </p>
          {/* NAMED, 11 SEP 2026, AND THIS WAS THE PAGE'S WHOLE PROBLEM. The
              direction contract above still describes the old state — "the Act
              requires a NAMED officer and none has been appointed, so that gap
              sits at the top of the page in the semantic amber". It is not a
              gap any more, so the amber is gone and the name is in the same
              slot, which is where a complainant looks for it either way.

              The contact details are deliberately the ones already published
              on this site rather than a new personal inbox: the Act asks for a
              route that works, and a second address nobody is watching is a
              worse answer than the one the team already reads. */}
          <p>
            Our Grievance Officer is{" "}
            <InternalLink href={grievanceOfficer.profile}>
              {grievanceOfficer.name}
            </InternalLink>
            .
          </p>
          <address className="mt-4 rounded-xl border border-line bg-surface-2 p-5 text-base text-foreground not-italic">
            <span className="block font-semibold text-ink">
              {grievanceOfficer.name}
            </span>
            <span className="block">Grievance Officer</span>
            <span className="mt-3 block">
              {indiaOffice.careOf}
              <br />
              {indiaOffice.lines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </span>
            <MailLink />
            <br />
            {/* `tap-target` because this is a number a person is meant to
                DIAL, and in an address block it inherits the line box of the
                text around it: measured at 22px on a 320px phone, under WCAG
                2.2 SC 2.5.8's 24px floor and a long way under a thumb. The
                utility takes it to 44px and pulls the extra height back out
                with a negative block margin, so the address keeps its
                rhythm. The same phone number on /contact and /locations
                already used it; this was the copy that did not. */}
            <a
              className="tap-target rounded-sm text-primary underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href={`tel:${indiaOffice.phoneTel}`}
            >
              {indiaOffice.phone}
            </a>
          </address>
        </LegalSection>

        <LegalSection id="how-to-complain" title="How to complain">
          <p>
            Email <MailLink /> with &ldquo;Grievance&rdquo; in the subject line.
            Tell us:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>what happened, in your own words;</li>
            <li>
              when it happened, and the email address you used to contact us, so
              we can find the right records;
            </li>
            <li>what you would like us to do about it.</li>
          </ul>
          <p>
            You can also use the{" "}
            <InternalLink href="/contact">enquiry form</InternalLink>, but email
            is better for a complaint because you keep a copy of what you sent.
          </p>
          <p>
            <strong className="text-ink">
              We do not charge for any of this
            </strong>
            , and you do not need a lawyer to do it.
          </p>
        </LegalSection>

        <LegalSection id="what-happens" title="What happens next">
          <ol className="mt-2 space-y-5">
            {steps.map((step) => (
              <li key={step.n} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-line font-mono text-sm text-muted-foreground"
                >
                  {step.n}
                </span>
                <div>
                  <p className="text-base font-semibold text-ink">
                    {step.title}
                  </p>
                  <p className="mt-1 text-base text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </LegalSection>

        <LegalSection id="timeline" title="How long it takes">
          <p>
            Our commitment, which is ours to make and to keep:{" "}
            <strong className="text-ink">
              we acknowledge a grievance within 3 working days
            </strong>{" "}
            and{" "}
            <strong className="text-ink">
              answer it substantively within 30 days
            </strong>
            . If something is genuinely going to take longer, we will tell you
            before the 30 days are up, say why, and give you a date.
          </p>
          <PendingNote
            className="mt-4"
            note="Statutory period to be confirmed"
            label="The DPDP Act leaves the period for responding to a grievance to be prescribed by rules made under it. The commitment above is Akshar Byonyks' own and is not a statement of the statutory deadline. Indian counsel must confirm the prescribed period before launch, and if it is shorter than the commitment above, the commitment changes to match it."
          />
        </LegalSection>

        <LegalSection id="escalate" title="If we do not resolve it">
          <p>
            If you have raised a grievance with us and are not satisfied with
            how we dealt with it, you can complain to the{" "}
            <strong className="text-ink">
              Data Protection Board of India
            </strong>
            , which is the body the DPDP Act 2023 establishes to hear exactly
            this.
          </p>
          <p>
            You are expected to have tried us first, which is why this page
            exists and why we would rather fix it here.
          </p>
        </LegalSection>

        <LegalSection
          id="other-complaints"
          title="Complaints that are not about data"
        >
          <p>
            If your complaint is about something else (the device, information
            on this site, or how someone from Akshar Byonyks dealt with you),
            send it to the same address and say what it concerns. It will be
            routed to the right person.
          </p>
          <p>
            <strong className="text-ink">
              If your concern is clinical or urgent, do not use this page.
            </strong>{" "}
            Speak to your nephrologist or seek medical care. Nothing here is a
            route to medical help.
          </p>
          <p>
            How we handle personal data in the first place is set out in the{" "}
            <InternalLink href="/privacy-policy">privacy policy</InternalLink>.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
