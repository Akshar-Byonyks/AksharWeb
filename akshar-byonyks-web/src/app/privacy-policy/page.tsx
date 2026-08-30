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
import { enquiryTypes } from "@/lib/contact";

const path = "/privacy-policy";

const description =
  "How Akshar Byonyks International LLC handles personal data under India's Digital Personal Data Protection Act 2023: what the enquiry form collects, why, how long it is kept, and your rights.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: path, languages: { "en-IN": path } },
  openGraph: { title: "Privacy Policy | Akshar Byonyks", description, url: path, type: "website" },
  twitter: { card: "summary" },
};

// PRODUCT.md names this non-negotiable at launch: the DPDP Act 2023 requires a
// privacy notice, consent capture and a named grievance officer live from day
// one. It ships with the contact form rather than after it, because §9.8's
// consent checkbox links here — a required consent control pointing at a 404
// would be a broken compliance control, not just a broken link.
//
// LEGAL REVIEW REQUIRED BEFORE LAUNCH (spec §14.4). This is drafted against the
// obligations the spec states, in the plain register the patient audience
// needs. Every fact this project does not yet hold — the grievance officer, the
// registered address, the retention period — is marked pending rather than
// invented, because inventing a grievance contact is worse than admitting there
// is not one yet.
//
// MOVED ONTO THE SHARED LEGAL SHELL, 30 Aug 2026, when the other four documents
// were built. The layout, section index and link styles this page invented now
// live in `components/legal/legal-document.tsx` and are used by all five.
// Nothing here changed but where the scaffolding is defined.

const lastUpdated = "25 August 2026";

const collected = [
  { field: "Name", why: "So we know who we are replying to." },
  { field: "Email address", why: "So we can reply." },
  { field: "Enquiry type", why: "So your message reaches the right person." },
  { field: "Message", why: "It is what you asked us." },
  { field: "Organisation, phone, city", why: "Optional. Only if you choose to give them." },
];

const rights = [
  { name: "Access", body: "Ask what personal data of yours we hold." },
  { name: "Correction", body: "Ask us to correct anything inaccurate or incomplete." },
  { name: "Erasure", body: "Ask us to delete your enquiry and our correspondence about it." },
  {
    name: "Withdraw consent",
    body: "Withdraw the consent you gave when you sent the form. It is as easy to withdraw as it was to give: email us and say so.",
  },
  {
    name: "Grievance redressal",
    body: "Raise a complaint with our Grievance Officer, and escalate to the Data Protection Board of India if we do not resolve it.",
  },
  { name: "Nomination", body: "Nominate someone to exercise these rights on your behalf." },
];

// Single source for the section index and the anchors it points at, so a
// heading cannot be renamed without its index entry following.
const sections: readonly LegalSectionRef[] = [
  { id: "who-we-are", title: "Who we are" },
  { id: "what-we-collect", title: "What we collect, and why" },
  { id: "lawful-basis", title: "Our lawful basis" },
  { id: "retention", title: "How long we keep it" },
  { id: "recipients", title: "Who else sees it" },
  { id: "your-rights", title: "Your rights" },
  { id: "complaints", title: "Complaints" },
  { id: "children", title: "Children" },
  { id: "changes", title: "Changes" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <DirectionContract>{`
THESIS: a privacy policy on a medical site is read by people deciding whether
to trust it with a health question. It is Read mode: structure for
comprehension first, and say the uncomfortable parts plainly.
OWN-WORLD: the same "show the gaps" instinct the X-1 specification table uses.
The grievance officer and the registered address do not exist yet, so they are
marked pending in the semantic amber rather than filled with a plausible-looking
placeholder that would be worse than an admitted gap.
STORY: who we are → what we collect → why → how long → who else sees it → your
rights → how to complain.
FORM: one measured column. No cards, no icons, no decoration on a legal
document.
FINISH: the plain register throughout — short sentences, everyday words, second
person. Every DPDP obligation the spec names is answered or explicitly marked
as not yet answerable.
`}</DirectionContract>

      <LegalPage
        title="Privacy policy"
        breadcrumb="Privacy Policy"
        standfirst="What happens to the details you send us, under India’s Digital Personal Data Protection Act 2023."
        lastUpdated={lastUpdated}
        sections={sections}
      >
        <LegalSection id="who-we-are" title="Who we are">
          <p>
            Akshar Byonyks International LLC is the data fiduciary for this
            website. That means we decide why and how your personal data is
            used, and we are answerable for it.
          </p>
          <PendingNote
            className="mt-4"
            note="Address pending"
            label="Our India registered office address is not yet confirmed. It will be published here, and it is required before this site goes live."
          />
        </LegalSection>

        <LegalSection id="what-we-collect" title="What we collect, and why">
          <p>
            We collect only what you type into the enquiry form. There is no
            login, no account, and no tracking profile.
          </p>
          <dl className="mt-5 divide-y divide-line rounded-xl border border-line">
            {collected.map(({ field, why }) => (
              <div
                key={field}
                className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-6 sm:px-6"
              >
                <dt className="text-sm font-semibold text-ink">{field}</dt>
                <dd className="text-sm text-muted-foreground">{why}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5">
            Your enquiry type is one of:{" "}
            {enquiryTypes.map((t) => t.label.toLowerCase()).join(", ")}. It sets
            who reads your message first and nothing else.
          </p>
        </LegalSection>

        <LegalSection id="lawful-basis" title="Our lawful basis">
          <p>
            Consent. You tick an unticked box before you send the form, and we
            tell you what you are agreeing to before you tick it. We do not
            treat using the website as consent to anything.
          </p>
          <p>
            You can withdraw consent at any time by emailing <MailLink /> .
            Withdrawing is as easy as giving it was.
          </p>
        </LegalSection>

        <LegalSection id="retention" title="How long we keep it">
          <p>
            Your enquiry reaches us as an email and is not written to any
            database. We keep the email for as long as we need it to deal with
            your enquiry and to keep a record of what we told you, then delete
            it.
          </p>
          <PendingNote
            className="mt-4"
            note="Retention period pending"
            label="A specific retention period is being set with counsel and will be stated here as a number of months, not left to judgement."
          />
        </LegalSection>

        <LegalSection id="recipients" title="Who else sees it">
          <p>
            Our website runs on Cloudflare, and our email is delivered through
            an email service provider. Both process data on our instructions
            only. We do not sell your data, and we do not share it for
            advertising.
          </p>
          <p>
            We use Cloudflare Web Analytics, which counts visits without cookies
            and without building a profile of you. This site sets no advertising
            or tracking cookies — see the{" "}
            <InternalLink href="/cookie-policy">cookie policy</InternalLink>.
          </p>
        </LegalSection>

        <LegalSection id="your-rights" title="Your rights">
          <p>Under the DPDP Act 2023 you can ask us to do any of the following.</p>
          <dl className="mt-5 space-y-4">
            {rights.map(({ name, body }) => (
              <div key={name}>
                <dt className="text-sm font-semibold text-ink">{name}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{body}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5">
            To exercise any of these, email <MailLink /> and tell us what you
            want. We will not charge you for it.
          </p>
        </LegalSection>

        <LegalSection id="complaints" title="Complaints">
          <p>
            If you are unhappy with how we have handled your personal data,
            raise it with our Grievance Officer first. If we do not resolve it,
            you can complain to the Data Protection Board of India. The full
            route, and what happens at each step, is on the{" "}
            <InternalLink href="/grievance-redressal">
              grievance redressal
            </InternalLink>{" "}
            page.
          </p>
          <PendingNote
            className="mt-4"
            note="Grievance Officer pending"
            label="The DPDP Act requires a named Grievance Officer with published contact details. Nobody has been appointed yet. This is a launch-blocking gap, and it is stated here rather than filled with a generic address."
          />
        </LegalSection>

        <LegalSection id="children" title="Children">
          <p>
            This site is not directed at children, and the enquiry form is
            intended for adults. If you are writing on behalf of a child in your
            care, write as yourself.
          </p>
        </LegalSection>

        <LegalSection id="changes" title="Changes">
          <p>
            If we change this policy we will change the date at the top. If the
            change is significant, we will say what changed.
          </p>
          <p>
            Questions about this policy? Email <MailLink /> , or use the{" "}
            <InternalLink href="/contact">enquiry form</InternalLink>.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
