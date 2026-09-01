import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { DirectionContract } from "@/components/common/direction-contract";
import { HindiShell } from "@/components/hindi/hindi-shell";
import { DocumentGrid, GridBlock } from "@/components/layout/document-grid";
import { defaultOg } from "@/lib/seo";
import { siteUrl } from "@/lib/site-config";

const path = "/hi/peritoneal-dialysis";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "hi" });
  const description = t("pd.standfirst");
  return {
    title: t("pd.title"),
    description,
    alternates: {
      canonical: path,
      languages: { "hi-IN": path, "en-IN": "/innovation/how-it-works" },
    },
    openGraph: {
      title: `${t("pd.title")} | Akshar Byonyks`,
      description,
      url: path,
      type: "article",
      images: defaultOg,
      locale: "hi_IN",
    },
    twitter: { card: "summary" },
  };
}

// THE HINDI TRACK, page two: the therapy itself.
//
// This is `/innovation/how-it-works/` reduced to what a patient needs and
// translated. What is deliberately NOT carried over: the "for clinicians"
// technical layers, the four benefits (whose clinical references are still
// pending, and an unreferenced benefit claim reads as a promise in any
// language), and the authored figures. The figures are not dropped for effort
// — their labels are drawn in English inside the SVG, and a Devanagari page
// with an English diagram is worse than the same page with the three steps
// set as prose, which is what they are here.
//
// The seven questions are the load-bearing part of this page. PRODUCT.md
// requires patient copy to route treatment decisions to a physician, and the
// Drugs and Magic Remedies (Objectionable Advertisements) Act 1954 makes that
// a legal requirement rather than a stylistic one. A list of questions to ask
// a nephrologist does that better than a sentence telling the reader to ask
// one, because it gives them the words.
export default async function HindiPeritonealDialysisPage() {
  const t = await getTranslations({ locale: "hi" });

  const steps = [
    { title: t("pd.fillTitle"), body: t("pd.fill") },
    { title: t("pd.dwellTitle"), body: t("pd.dwell") },
    { title: t("pd.drainTitle"), body: t("pd.drain") },
  ];

  const questions = [
    t("pd.q1"),
    t("pd.q2"),
    t("pd.q3"),
    t("pd.q4"),
    t("pd.q5"),
    t("pd.q6"),
    t("pd.q7"),
  ];

  return (
    <>
      <DirectionContract>{`
THESIS: what peritoneal dialysis actually is, for someone who has just been
told they may need it and reads Hindi more comfortably than English. Read
mode, at the plainest register on the site.
OWN-WORLD: the same ink cover and document spine as every other page, so the
Hindi track is part of the site rather than a leaflet bolted to it.
STORY: your own body does the filtering → one exchange, three steps → by hand
or by machine → what the X-1 does → the questions to take to your appointment.
FORM: the three steps as a numbered register, not the authored SVG figure —
that figure's labels are drawn in English and a Devanagari page with an
English diagram reads worse than prose.
FINISH: the page ends on seven questions rather than on a claim. Under the
Drugs and Magic Remedies Act the decision belongs to a physician, and giving
the reader the words to ask is a better way of honouring that than telling
them to ask.
`}</DirectionContract>

      <HindiShell
        titleKey="pd.title"
        standfirstKey="pd.standfirst"
        englishHref="/innovation/how-it-works"
        breadcrumb={[
          { name: t("common.languageName"), href: "/hi" },
          { name: t("pd.title") },
        ]}
      >
        <section aria-labelledby="hi-pd-peritoneum" className="bg-background">
          <DocumentGrid className="py-16 lg:py-20">
            <GridBlock>
              <h2
                id="hi-pd-peritoneum"
                className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl"
              >
                {t("pd.peritoneumHeading")}
              </h2>
              <p className="mt-4 text-lg text-foreground">
                {t("pd.peritoneum")}
              </p>
              <p className="mt-4 text-lg text-foreground">{t("pd.catheter")}</p>
            </GridBlock>
          </DocumentGrid>
        </section>

        <section aria-labelledby="hi-pd-exchange" className="bg-ink">
          <DocumentGrid className="py-16 lg:py-20">
            <GridBlock>
              <h2
                id="hi-pd-exchange"
                className="text-2xl font-bold tracking-tight text-balance text-white sm:text-3xl"
              >
                {t("pd.exchangeHeading")}
              </h2>
              <p className="mt-4 text-lg text-white/75">
                {t("pd.exchangeLead")}
              </p>
            </GridBlock>

            <GridBlock wide className="mt-12">
              <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-white/15 md:grid-cols-3">
                {steps.map((step, i) => (
                  <li key={step.title} className="bg-ink p-6">
                    <p
                      aria-hidden="true"
                      className="font-mono text-sm tabular-nums text-white/50"
                    >
                      {i + 1}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base text-white/75">{step.body}</p>
                  </li>
                ))}
              </ol>
            </GridBlock>
          </DocumentGrid>
        </section>

        <section aria-labelledby="hi-pd-byhand" className="bg-background">
          <DocumentGrid className="py-16 lg:py-20">
            <GridBlock>
              <h2
                id="hi-pd-byhand"
                className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl"
              >
                {t("pd.byHandHeading")}
              </h2>
            </GridBlock>

            <GridBlock wide className="mt-8">
              <dl className="grid grid-cols-1 gap-x-12 gap-y-8 border-t border-line pt-8 md:grid-cols-2">
                <div>
                  <dt className="text-xl font-semibold text-ink">
                    {t("pd.byHandTitle")}
                  </dt>
                  <dd className="mt-2 text-base text-muted-foreground">
                    {t("pd.byHand")}
                  </dd>
                </div>
                <div>
                  <dt className="text-xl font-semibold text-ink">
                    {t("pd.byMachineTitle")}
                  </dt>
                  <dd className="mt-2 text-base text-muted-foreground">
                    {t("pd.byMachine")}
                  </dd>
                </div>
              </dl>
            </GridBlock>

            <GridBlock className="mt-14 border-t border-line pt-10">
              <h2 className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl">
                {t("pd.x1Heading")}
              </h2>
              <p className="mt-4 text-lg text-foreground">{t("pd.x1")}</p>
            </GridBlock>
          </DocumentGrid>
        </section>

        <section aria-labelledby="hi-pd-questions" className="bg-surface-2">
          <DocumentGrid className="py-16 lg:py-20">
            <GridBlock>
              <h2
                id="hi-pd-questions"
                className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl"
              >
                {t("pd.questionsHeading")}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t("pd.questionsLead")}
              </p>
              <ol className="mt-8 space-y-5">
                {questions.map((question, i) => (
                  <li key={question} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 font-mono text-sm tabular-nums text-muted-foreground"
                    >
                      {i + 1}
                    </span>
                    <span className="text-lg text-foreground">{question}</span>
                  </li>
                ))}
              </ol>
            </GridBlock>
          </DocumentGrid>
        </section>
      </HindiShell>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: t("pd.title"),
            description: t("pd.standfirst"),
            url: `${siteUrl}${path}`,
            inLanguage: "hi-IN",
          }),
        }}
      />
    </>
  );
}
