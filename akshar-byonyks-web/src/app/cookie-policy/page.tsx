import type { Metadata } from "next";

import { defaultOg } from "@/lib/seo";

import { DirectionContract } from "@/components/common/direction-contract";
import { PendingNote } from "@/components/common/pending-note";
import {
  InternalLink,
  LegalPage,
  LegalSection,
  MailLink,
  type LegalSectionRef,
} from "@/components/legal/legal-document";

const path = "/cookie-policy";

const description =
  "This site sets no cookies and no browser storage of its own. What that means, what the one third-party request is, and what changes if you play a ByoTalks video.";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description,
  alternates: { canonical: path, languages: { "en-IN": path } },
  openGraph: {
    title: "Cookie Policy | Akshar Byonyks",
    description,
    url: path,
    type: "website",
    images: defaultOg,
  },
  twitter: { card: "summary" },
};

// Spec §14.3: "Required, even with minimal cookies."
//
// THE MEASUREMENTS IN THIS DOCUMENT WERE TAKEN, NOT ASSUMED. A cookie policy
// is the one legal page whose subject can be checked directly, so it was:
// fourteen routes were loaded in a clean browser profile and the cookie jar,
// `localStorage`, `sessionStorage` and every outbound request host were read
// back. Result — no cookies, no storage keys, and exactly one third-party host
// (`cdn.jsdelivr.net`, the stylesheet and script for the click-to-play video
// placeholder). Writing "we use only essential cookies" without looking would
// have been the easy version of this page and would have been false in the
// other direction: there are none at all.
//
// WHAT IS DELIBERATELY NOT CLAIMED. The measurement was taken against a local
// build. Production sits behind Cloudflare and the contact form uses Turnstile,
// and both can set their own cookies at the edge — so that is stated as a
// pending production verification rather than quietly folded into the "none"
// claim. A cookie policy that is accurate in development and wrong in
// production is worse than one that admits which is which.

const lastUpdated = "30 August 2026";

const sections: readonly LegalSectionRef[] = [
  { id: "short-version", title: "The short version" },
  { id: "what-we-set", title: "What this site sets" },
  { id: "analytics", title: "How we count visits" },
  { id: "third-party", title: "The one third-party request" },
  { id: "videos", title: "If you play a ByoTalks video" },
  { id: "forms", title: "If you send the enquiry form" },
  { id: "control", title: "Controlling cookies yourself" },
  { id: "changes", title: "Changes" },
];

export default function CookiePolicyPage() {
  return (
    <>
      <DirectionContract>{`
THESIS: almost every cookie policy on the web is boilerplate for a consent
banner nobody reads. This site genuinely sets none, which makes the honest
version of this page short, specific and checkable. Read mode.
OWN-WORLD: the same evidence instinct as the X-1 specification table — the
claims here were measured in a clean browser profile, and the one thing that
could not be measured locally (Cloudflare's production edge) is marked pending
instead of being absorbed into the "none" claim.
STORY: the short version → what we set → analytics → the one third-party call →
what changes if you press play → the form → how to control cookies yourself.
FORM: one measured column, shared with the other four documents. No cards, no
icons, no cookie-banner theatre for cookies that do not exist.
FINISH: plain register, second person, and no sentence that would become false
if a reader opened their own developer tools to check it.
`}</DirectionContract>

      <LegalPage
        title="Cookie policy"
        standfirst="This site sets no cookies of its own, so there is no banner to dismiss. Here is exactly what does and does not happen in your browser."
        lastUpdated={lastUpdated}
        sections={sections}
      >
        <LegalSection id="short-version" title="The short version">
          <p>
            <strong className="text-ink">
              We set no cookies, and we store nothing in your browser.
            </strong>{" "}
            There is no advertising, no tracking profile, no analytics cookie
            and no consent banner, because there is nothing to consent to.
          </p>
          <p>
            Two things reach outside this site, and both are described below: a
            stylesheet and script for the video placeholders, and (only if you
            press play) YouTube.
          </p>
        </LegalSection>

        <LegalSection id="what-we-set" title="What this site sets">
          <p>
            Nothing. We checked rather than assumed: the pages of this site were
            loaded in a clean browser profile and the cookie store,{" "}
            <code className="rounded-sm bg-surface-2 px-1 py-0.5 font-mono text-sm">
              localStorage
            </code>{" "}
            and{" "}
            <code className="rounded-sm bg-surface-2 px-1 py-0.5 font-mono text-sm">
              sessionStorage
            </code>{" "}
            were all empty afterwards.
          </p>
          <p>
            There is no login and no account on this site, so there is no
            session cookie either.
          </p>
          <PendingNote
            className="mt-4"
            note="Production edge verification pending"
            label="That check was run against a build of this site. In production the site is served through Cloudflare, which can set its own security cookies at the edge, and the enquiry form uses Cloudflare Turnstile. Both must be re-checked against the live site before launch, and this page updated to name any cookie they set."
          />
        </LegalSection>

        <LegalSection id="analytics" title="How we count visits">
          <p>
            We use Cloudflare Web Analytics, which counts page views without
            setting a cookie and without building a profile of you across sites.
            It does not follow you anywhere, and we cannot use it to identify
            you.
          </p>
        </LegalSection>

        <LegalSection id="third-party" title="The one third-party request">
          <p>
            Pages carrying a ByoTalks video load a small stylesheet and script
            from <strong>jsDelivr</strong>, a public code delivery network. It is
            what draws the video placeholder before you press play.
          </p>
          <p>
            That request tells jsDelivr your IP address and browser, as any
            request to any server does. It sets no cookie. It is the only
            third-party host this site contacts before you interact with it.
          </p>
        </LegalSection>

        <LegalSection id="videos" title="If you play a ByoTalks video">
          <p>
            The recorded sessions are hosted on YouTube.{" "}
            <strong className="text-ink">
              Until you press play, nothing is requested from YouTube or Google
              at all
            </strong>{" "}
            . The player you see beforehand is a still image and a button, not
            an embedded video.
          </p>
          <p>
            When you do press play, YouTube loads and{" "}
            <strong className="text-ink">
              YouTube and Google may set their own cookies
            </strong>
            , under their policies rather than ours. That is your choice to make,
            and it is why the video is behind a click instead of loading with the
            page. You can watch a session and never press play by reading the
            summary on the same page.
          </p>
        </LegalSection>

        <LegalSection id="forms" title="If you send the enquiry form">
          <p>
            The form is protected by Cloudflare Turnstile, which checks that you
            are a person without asking you to solve a puzzle and without
            tracking you across sites. What we do with the details you type is a
            privacy question rather than a cookie question, and it is answered in
            the <InternalLink href="/privacy-policy">privacy policy</InternalLink>
            .
          </p>
        </LegalSection>

        <LegalSection id="control" title="Controlling cookies yourself">
          <p>
            Because we set none, there is nothing here for you to switch off.
            You can still block or delete cookies for any site in your
            browser&rsquo;s settings, and doing so will not stop this site
            working. None of it depends on storage in your browser.
          </p>
          <p>
            If you would rather no third-party request happened at all, do not
            press play on a video; the rest of the site does not need one.
          </p>
        </LegalSection>

        <LegalSection id="changes" title="Changes">
          <p>
            If we add anything that sets a cookie, this page changes before it
            ships, and the date at the top changes with it.
          </p>
          <p>
            Questions? Email <MailLink /> , or use the{" "}
            <InternalLink href="/contact">enquiry form</InternalLink>.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
