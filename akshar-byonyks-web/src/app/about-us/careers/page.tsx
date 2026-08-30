import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  HeartHandshake,
  Lightbulb,
  Ruler,
  ShieldCheck,
} from "lucide-react";

import { DirectionContract } from "@/components/common/direction-contract";
import { ProvenanceMark } from "@/components/common/provenance";
import {
  DocumentGrid,
  GridBlock,
} from "@/components/layout/document-grid";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { siteContact, siteUrl } from "@/lib/site-config";

const path = "/about-us/careers";

const description =
  "There are no open roles at Akshar Byonyks yet. What we value, how hiring will work, and how to write to us before a role is posted.";

export const metadata: Metadata = {
  title: "Careers",
  description,
  alternates: { canonical: path, languages: { "en-IN": path } },
  openGraph: {
    title: "Careers | Akshar Byonyks",
    description,
    url: path,
    type: "website",
  },
  twitter: { card: "summary" },
};

// Spec §9 `/about-us/careers/`: "Values (Innovation, Trust and accountability,
// Attention to details, Support and connection, Introspection), hiring process,
// departments grid using the 21st.dev icon portfolio. Applications by email in
// Phase 1. Migrate, restyle."
//
// THREE DEPARTURES, EACH FOR A REASON, EACH RECORDED IN deviations.md.
//
// 1. **The departments grid is not migrated.** byonyks.com lists eight teams —
//    Engineering, Software, Medical, Field Support, Legal, Human Resources,
//    Microbiology, Manufacturing. Those are *Byonyks'* teams. Reproducing them
//    under an Akshar Byonyks masthead would assert that this company has a
//    microbiology lab and a manufacturing line, and "never describe Akshar
//    Byonyks as the manufacturer" is the project's hardest standing rule. The
//    India org structure is on the do-not-fabricate list and Open Question 1.4
//    is still open. So the grid is deliberately absent and the gap is stated.
//
// 2. **The 21st.dev icon portfolio is not used.** F-7 requires an account, and
//    the spec's own note says "licensing is inconsistent per component, check
//    each one before shipping." No account exists and no licence has been
//    checked, so shipping a component from it would be shipping an unlicensed
//    asset. These are lucide icons — already a dependency, ISC licensed, and a
//    single-stroke set at consistent weight, which is what §7.2's iconography
//    rule actually asks for.
//
// 3. **The value descriptions are authored, not migrated.** byonyks.com's
//    careers page carries the five value *names* as headings over icon images
//    with no body text at all, and its hiring process is an unreadable diagram.
//    There was nothing to migrate but the names. The sentences under them are
//    written for this site and each one is anchored to something this site
//    actually does, so they are checkable rather than decorative — but they are
//    ours, not the client's, and need sign-off.

const values = [
  {
    name: "Innovation",
    icon: Lightbulb,
    // NO STATISTIC HERE, DELIBERATELY. The first draft of this sentence used
    // the "86% of people who need dialysis have no access" figure — which is a
    // Byonyks press-release claim this site carries under attribution on
    // /news/ and, per the rule written into news-data.ts, may not be restated
    // in Akshar Byonyks' own voice without its own primary source. A careers
    // page is exactly where that kind of number gets borrowed for colour.
    body: "The X-1 exists because the people it was built for were not being reached by the equipment that already existed. That is the standard for a new idea here: does it reach someone who is currently reached by nothing?",
  },
  {
    name: "Trust and accountability",
    icon: ShieldCheck,
    body: "We say who cleared what, in which country, and what is still pending. This site marks its own gaps in amber rather than smoothing them over, and that is not a design flourish — it is the habit we hire for.",
  },
  {
    name: "Attention to details",
    icon: Ruler,
    body: "This is a medical device. A specification that is nearly right, a caption that is nearly accurate, or a figure without a source are all the same category of mistake, and none of them are survivable at the bedside.",
  },
  {
    name: "Support and connection",
    icon: HeartHandshake,
    body: "Home dialysis moves the treatment into someone's bedroom, which moves the burden onto them and the people around them. Everything we build is judged on whether it makes that night easier.",
  },
  {
    name: "Introspection",
    icon: Compass,
    body: "Being wrong early is cheap and being wrong late is not. We would rather find our own mistake, say so, and fix it than defend it.",
  },
];

const process = [
  {
    n: "1",
    title: "You write to us",
    body: "Email us, or use the enquiry form and choose Careers. Tell us what you do and what you want to work on. There is no application portal to fight with.",
  },
  {
    n: "2",
    title: "A person reads it",
    body: "Not a filter. If what you sent lines up with something we need, we reply. If it does not, we still reply.",
  },
  {
    n: "3",
    title: "We talk",
    body: "A conversation about the work itself — the device, the regulatory position, what is hard about it. You should be interrogating us as much as we are interrogating you.",
  },
  {
    n: "4",
    title: "We decide, and we tell you",
    body: "Either way, and without leaving you waiting on silence.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Careers | Akshar Byonyks",
  description,
  url: `${siteUrl}${path}`,
};

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DirectionContract>{`
THESIS: a careers page with no jobs is usually a dead end pretending to be a
door. Persuade mode, but the persuasion is honesty — say there are no roles in
the first viewport, then give a reason to write anyway.
OWN-WORLD: the site's own "show the gaps" habit turned on the company itself.
The values are not decorated adjectives; each is anchored to something this
site visibly does, so a candidate can check the claim before they apply.
STORY: no roles yet, plainly → what we value and why → how hiring will work →
write to us anyway.
FORM: five value cards on a single-stroke icon set at consistent weight, and a
numbered four-step process. The departments grid the spec asks for is
deliberately absent — those are the licensor's teams, not ours.
FINISH: no stock office photography, no "join our journey", no counted
headcount we do not have.
`}</DirectionContract>

      <section aria-labelledby="careers-heading" className="bg-ink">
        <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <Breadcrumbs
            tone="dark"
            items={[{ name: "About us", href: "/about-us" }, { name: "Careers" }]}
          />
          <div className="mt-10 max-w-3xl lg:mt-14">
            <h1
              id="careers-heading"
              className="text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl"
            >
              Careers
            </h1>
            <p className="mt-6 text-xl text-white/75">
              <strong>There are no open roles yet.</strong> Akshar Byonyks is
              early, and we would rather say that than list positions we are not
              filling. If you want to work on getting dialysis to people who
              currently get none, write to us anyway — we read it.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="bg-background">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <h2
            id="values-heading"
            className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
          >
            What we hire for
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Five things, and each one is checkable against something on this
            site rather than being an adjective we like.
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.name} delayMs={(index % 3) * 90}>
                  <li className="h-full rounded-xl border border-line bg-card p-6 sm:p-8">
                    <Icon
                      className="size-6 text-primary"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <h3 className="mt-4 text-xl font-semibold text-balance text-ink">
                      {value.name}
                    </h3>
                    <p className="mt-2 text-base text-muted-foreground">
                      {value.body}
                    </p>
                  </li>
                </ScrollReveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="bg-surface-2">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h2
                id="process-heading"
                className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
              >
                How hiring works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                By email, for now. There is no applicant tracking system and we
                are not pretending there is one.
              </p>

              <ol className="mt-10 space-y-6">
                {process.map((step) => (
                  <li key={step.n} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-background font-mono text-sm text-muted-foreground"
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
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section aria-labelledby="teams-heading" className="bg-background">
        <DocumentGrid className="py-20">
          <ScrollReveal>
            {/* The gap moves into the margin, 30 Aug 2026. Same amber, same
                words, beside the paragraph it qualifies instead of stacked
                under it as a dashed card. */}
            <GridBlock
              rail={
                <ProvenanceMark
                  provenance={{
                    status: "pending",
                    missing:
                      "What the Indian operation will be made of — which functions are hired here, which are shared with Byonyks, and in what order — is not yet settled. It will be published here when it is, rather than described in advance.",
                  }}
                />
              }
            >
              <h2
                id="teams-heading"
                className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
              >
                Teams
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Byonyks, the company that designs and manufactures the X-1, has
                engineering, software, clinical, regulatory and field teams.{" "}
                <strong className="text-ink">
                  Those are Byonyks&rsquo; teams, not ours
                </strong>
                , and this page will not borrow them.
              </p>
              <p className="mt-8">
                <Link
                  href="/about-us/leadership"
                  className="inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  The people already named
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              </p>
            </GridBlock>
          </ScrollReveal>
        </DocumentGrid>
      </section>

      <section aria-labelledby="apply-heading" className="bg-surface-2">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h2
                id="apply-heading"
                className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
              >
                Write to us anyway
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Tell us what you do and what you would want to work on here. A
                speculative note that arrives before a role exists is often the
                one that gets read most carefully.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact?enquiry=careers"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-base font-semibold text-white hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Send a careers enquiry
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
                <a
                  href={`mailto:${siteContact.email}?subject=Careers`}
                  className="inline-flex min-h-11 items-center rounded-lg px-1 py-2.5 text-base font-semibold text-primary underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {siteContact.email}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CtaBand
        heading="Talk to Akshar Byonyks"
        body="Patient, clinician, investor, or distributor enquiry — we route it to the right person."
      />
    </>
  );
}
