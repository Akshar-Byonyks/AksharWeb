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
import { fdaClearance, licensingStatement } from "@/lib/claims";

const path = "/terms-of-use";

const description =
  "The terms on which you may use aksharbyonyks.com: what the site is for, what it is not, and the limits of what it says about the X-1.";

export const metadata: Metadata = {
  title: "Terms of Use",
  description,
  alternates: { canonical: path, languages: { "en-IN": path } },
  openGraph: {
    title: "Terms of Use | Akshar Byonyks",
    description,
    url: path,
    type: "website",
  },
  twitter: { card: "summary" },
};

// Spec §14.3 lists this as required. It is short on purpose.
//
// NOTHING ON THIS SITE IS GATED, SOLD OR ACCOUNT-BASED, which removes most of
// what a terms document normally exists to govern — there is no login, no
// purchase, no user content and no subscription. Spec §14.3 makes the same
// point about the security checklist. So this covers what actually applies:
// what the site is for, the regulatory limits on reading it as a sales
// document, whose intellectual property is on it, and how to complain.
//
// NO ARBITRATION CLAUSE. The tooling notes' terms-of-service guidance is
// US-framed, and spec §14.3 says so explicitly: "arbitration clauses in
// consumer contracts are treated differently under Indian law, so route that
// to counsel rather than copying the US pattern." Copying it would be the
// single most likely thing in this document to be unenforceable, so it is not
// here and the gap is marked rather than filled.
//
// LEGAL REVIEW REQUIRED BEFORE LAUNCH (spec §14.4). Every fact this project
// does not hold — registered address, jurisdiction seat, CDSCO position — is
// marked pending rather than invented.

const lastUpdated = "30 August 2026";

const sections: readonly LegalSectionRef[] = [
  { id: "who-we-are", title: "Who these terms are with" },
  { id: "what-this-site-is", title: "What this site is for" },
  { id: "not-medical-advice", title: "Not medical advice" },
  { id: "not-an-offer", title: "Not an offer to sell" },
  { id: "regulatory", title: "Regulatory status" },
  { id: "accuracy", title: "Accuracy, and where we are unsure" },
  { id: "intellectual-property", title: "Intellectual property" },
  { id: "acceptable-use", title: "Acceptable use" },
  { id: "third-party-links", title: "Links to other sites" },
  { id: "liability", title: "Our liability" },
  { id: "governing-law", title: "Governing law" },
  { id: "changes", title: "Changes" },
];

export default function TermsOfUsePage() {
  return (
    <>
      <DirectionContract>{`
THESIS: a terms page nobody is forced to accept is read only by someone
checking whether the company is straight with them. Read mode. Say what the
site is and is not, in the fewest words that survive counsel.
OWN-WORLD: the same "show the gaps" instinct as the X-1 specification table and
the privacy policy. The jurisdiction seat and the CDSCO position do not exist
yet, so they are marked pending in the semantic amber rather than filled with a
plausible-looking placeholder.
STORY: who → what the site is for → what it is not (advice, an offer) → what is
true about the device → whose IP → how to behave → our limits → which law.
FORM: one measured column, shared with the other four documents. No cards, no
icons, no decoration on a legal document.
FINISH: short sentences, everyday words, second person. Every regulatory
sentence comes from claims.ts rather than being rewritten here.
`}</DirectionContract>

      <LegalPage
        title="Terms of use"
        standfirst="What this website is for, what it is not, and the limits of what it tells you about the X-1."
        lastUpdated={lastUpdated}
        sections={sections}
      >
        <LegalSection id="who-we-are" title="Who these terms are with">
          <p>
            This website is published by Akshar Byonyks International LLC
            (&ldquo;Akshar Byonyks&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
            By using the site you accept these terms. If you do not accept them,
            please stop using the site.
          </p>
          <PendingNote
            className="mt-4"
            note="Registered address pending"
            label="Our India registered office address is not yet confirmed. It will be published here and on the privacy policy, and it is required before this site goes live."
          />
        </LegalSection>

        <LegalSection id="what-this-site-is" title="What this site is for">
          <p>
            This site exists to explain the X-1 automated peritoneal dialysis
            cycler and Akshar Byonyks&rsquo; role in bringing it to India, and
            to let you contact us. There is no account, no login, nothing to buy
            and nothing to download that we ask you to pay for.
          </p>
          <p>
            You may read, print and share what is on it. You do not need our
            permission to link to it.
          </p>
        </LegalSection>

        <LegalSection id="not-medical-advice" title="Not medical advice">
          <p>
            Everything here about peritoneal dialysis is general information for
            education. It is not medical advice, it is not a diagnosis, and it is
            not a treatment recommendation for you or for anyone you care for.
          </p>
          <p>
            <strong className="text-ink">
              Decisions about dialysis are for you and your nephrologist.
            </strong>{" "}
            Nothing on this site should delay or replace speaking to a
            physician. If you are unwell, seek medical care.
          </p>
        </LegalSection>

        <LegalSection id="not-an-offer" title="Not an offer to sell">
          <p>
            Nothing on this site is an offer to sell the X-1, a price, or a
            promise that the device is available to you. Information about the
            device is descriptive. Any supply would be under a separate written
            agreement and subject to the regulatory position below.
          </p>
        </LegalSection>

        <LegalSection id="regulatory" title="Regulatory status">
          <p>{licensingStatement}</p>
          <p>
            The X-1 holds a United States FDA 510(k) clearance
            {fdaClearance.kNumber ? ` (${fdaClearance.kNumber})` : ""}, held by
            Byonyks.{" "}
            <strong className="text-ink">
              A United States clearance is not an Indian authorisation and does
              not permit sale in India.
            </strong>{" "}
            The two are separate, and this site states them separately
            everywhere.
          </p>
          <PendingNote
            className="mt-4"
            note="India regulatory position pending"
            label="The CDSCO licence route for the X-1 under the Medical Device Rules 2017, and who holds it, is not yet confirmed. Until it is, nothing on this site should be read as saying the device is approved for sale in India."
          />
        </LegalSection>

        <LegalSection id="accuracy" title="Accuracy, and where we are unsure">
          <p>
            We try to keep this site accurate and current, and where a figure
            comes from somewhere we say where. Where we do not yet hold a fact,
            the site says so rather than estimating — those notices are
            deliberate, and they are the honest state of the page on the day you
            read it.
          </p>
          <p>
            Device specifications, regulatory positions and market figures can
            change. We do not warrant that everything here is complete or up to
            date at the moment you read it, and you should not rely on this site
            alone for a clinical, purchasing or investment decision.
          </p>
        </LegalSection>

        <LegalSection id="intellectual-property" title="Intellectual property">
          <p>
            The text, layout, illustrations and code of this site belong to
            Akshar Byonyks unless stated otherwise. The <strong>Byonyks</strong>{" "}
            name, the <strong>X-1</strong> name and the device itself belong to
            Byonyks, and appear here under our licensing relationship with them.
          </p>
          <p>
            Some material on this site is other people&rsquo;s and is marked as
            such where it appears: the executive biographies and portraits, and
            the press releases under{" "}
            <InternalLink href="/news">News</InternalLink>, are Byonyks&rsquo;
            own published material, republished with attribution and a link to
            the source. The recorded ByoTalks sessions are hosted on
            Byonyks&rsquo; own channel.
          </p>
          <PendingNote
            className="mt-4"
            note="Written trade mark permission pending"
            label="Byonyks USA's approval for use of its name and marks is currently verbal. Written permission covering the name, the marks and the employee photographs and biographies used on this site is required before launch."
          />
        </LegalSection>

        <LegalSection id="acceptable-use" title="Acceptable use">
          <p>Please do not:</p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              use the enquiry form to send unlawful, abusive or deliberately
              false messages, or anyone else&rsquo;s personal data without their
              knowledge;
            </li>
            <li>
              attempt to gain unauthorised access to the site or the systems
              behind it, or interfere with its availability;
            </li>
            <li>
              scrape or copy the site systematically to republish it as your
              own; or
            </li>
            <li>
              use our name or Byonyks&rsquo; name in a way that suggests we
              endorse you when we do not.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="third-party-links" title="Links to other sites">
          <p>
            We link to byonyks.com, to the FDA&rsquo;s own records, to published
            research and to news outlets. We do not control those sites and we
            are not responsible for their content or their privacy practices.
            Links that open in a new tab say so.
          </p>
        </LegalSection>

        <LegalSection id="liability" title="Our liability">
          <p>
            We provide this site as it is. To the extent Indian law allows, we
            are not liable for loss arising from your reliance on the general
            information here, or from the site being unavailable.
          </p>
          <p>
            <strong className="text-ink">
              Nothing in these terms limits our liability where the law does not
              allow it to be limited
            </strong>{" "}
            — including for death or personal injury caused by negligence, for
            fraud, or under any statutory right you have as a consumer that
            cannot be excluded.
          </p>
        </LegalSection>

        <LegalSection id="governing-law" title="Governing law">
          <p>
            These terms are governed by the laws of India.
          </p>
          <PendingNote
            className="mt-4"
            note="Jurisdiction seat pending"
            label="The courts having jurisdiction follow from our registered office, which is not yet confirmed. A dispute-resolution clause has deliberately not been drafted here: arbitration clauses in consumer contracts are treated differently under Indian law than under US law, and this is one for Indian counsel rather than a copied template."
          />
        </LegalSection>

        <LegalSection id="changes" title="Changes">
          <p>
            If we change these terms we will change the date at the top. If the
            change is significant, we will say what changed.
          </p>
          <p>
            Questions about these terms? Email <MailLink /> , or use the{" "}
            <InternalLink href="/contact">enquiry form</InternalLink>. To
            complain about how we have handled your personal data, see{" "}
            <InternalLink href="/grievance-redressal">
              grievance redressal
            </InternalLink>
            .
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
