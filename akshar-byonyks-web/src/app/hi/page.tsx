import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { DirectionContract } from "@/components/common/direction-contract";
import { RegisterLink } from "@/components/common/provenance";
import { HindiShell } from "@/components/hindi/hindi-shell";
import { DocumentGrid, GridBlock } from "@/components/layout/document-grid";
import { defaultOg } from "@/lib/seo";
import { fda510k } from "@/lib/compliance";
import { siteContact, siteUrl } from "@/lib/site-config";

const path = "/hi";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "hi" });
  const description = t("home.standfirst");
  return {
    title: t("home.title"),
    description,
    alternates: {
      canonical: path,
      // Both directions, so a crawler that finds either page finds the other.
      languages: { "hi-IN": path, "en-IN": "/" },
    },
    openGraph: {
      title: `${t("home.title")} | Akshar Byonyks`,
      description,
      url: path,
      type: "website",
      images: defaultOg,
      locale: "hi_IN",
    },
    twitter: { card: "summary" },
  };
}

// THE HINDI TRACK, page one.
//
// WHY THIS PAGE EXISTS. PRODUCT.md describes the Priority-2 audience as
// "frequently older, often reading in a second language under stress." The
// site was serving that audience entirely in English. `next-intl` was already
// a dependency and Noto Sans has shipped the Devanagari subset since the first
// build "for the Hindi roadmap" — the roadmap simply had nothing on it.
//
// WHY TWO PAGES AND NOT TWENTY. The specification table, the compliance
// register, the market case and the five legal documents are not translated,
// and should not be. A regulatory position that is still being established
// reads as a commitment once it is in a second language, and the risk of a
// loose translation there is not a style problem. What a patient needs is what
// the therapy is, what the machine does, and who to ask — which is this page
// and the next one.
//
// EVERY REGULATORY SENTENCE IS TRANSLATED, NOT SUMMARISED. `home.clearance`
// and `home.indiaPosition` carry the three constraints PRODUCT.md calls
// non-negotiable: the clearance belongs to Byonyks, a US clearance is not an
// Indian authorisation, and Akshar Byonyks is not the manufacturer. The
// K-number and the decision date are read from `compliance.ts` rather than
// retyped into the catalogue, so they cannot drift from the English.
export default async function HindiHomePage() {
  const t = await getTranslations({ locale: "hi" });

  return (
    <>
      <DirectionContract>{`
THESIS: the patient-facing argument, in the language a large part of that
audience actually reads. Not a translated marketing page — the three things a
patient needs (what the therapy is, what the approval does and does not mean,
who to ask) and nothing else.
OWN-WORLD: the same ink cover, the same document spine, the same provenance
rail. A reader who arrives here from a WhatsApp link and later opens the
English site should recognise it as one site.
STORY: who we are → what the approval means, and what it does not → what
peritoneal dialysis is → why at home → how to reach us.
FORM: the document spine, railed. The regulatory block carries a provenance
mark to the FDA's own record, so a Hindi reader gets the same checkable link
an English reader gets.
FINISH: the translation notice sits ABOVE the heading, in the amber this site
uses for everything unfinished, because a reader deciding whether to trust a
medical page needs to know how it was made before they read it.
`}</DirectionContract>

      <HindiShell
        titleKey="home.title"
        standfirstKey="home.standfirst"
        englishHref="/"
        breadcrumb={[{ name: t("common.languageName") }]}
      >
        <section aria-labelledby="hi-who-heading" className="bg-background">
          <DocumentGrid className="py-16 lg:py-20">
            <GridBlock>
              <h2
                id="hi-who-heading"
                className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl"
              >
                {t("home.whoWeAreHeading")}
              </h2>
              <p className="mt-4 text-lg text-foreground">
                {t("home.whoWeAre")}
              </p>
            </GridBlock>

            <GridBlock
              className="mt-14 border-t border-line pt-10"
              // The Hindi track drops the same apparatus the English one
              // did. The register's name stays in English inside
              // RegisterLink, which is a WCAG 3.1.2 requirement rather
              // than an oversight - see the lang note there.
              rail={
                <RegisterLink
                  source={{ label: fda510k.register, url: fda510k.url }}
                />
              }
            >
              <h2 className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl">
                {t("home.clearanceHeading")}
              </h2>
              <p className="mt-4 text-lg text-foreground">
                {t("home.clearance")}
              </p>
              <p className="mt-4 text-lg text-foreground">
                {t("home.indiaPosition")}
              </p>
            </GridBlock>
          </DocumentGrid>
        </section>

        <section aria-labelledby="hi-therapy-heading" className="bg-surface-2">
          <DocumentGrid className="py-16 lg:py-20">
            <GridBlock>
              <h2
                id="hi-therapy-heading"
                className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl"
              >
                {t("home.therapyHeading")}
              </h2>
              <p className="mt-4 text-lg text-foreground">
                {t("home.therapyLead")}
              </p>
              <p className="mt-4 text-lg text-foreground">
                {t("home.therapyBody")}
              </p>
              <p className="mt-8">
                <Link
                  href="/hi/peritoneal-dialysis"
                  className="inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {t("home.therapyLink")}
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              </p>
            </GridBlock>

            <GridBlock className="mt-14 border-t border-line pt-10">
              <h2 className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl">
                {t("home.whyHomeHeading")}
              </h2>
              <p className="mt-4 text-lg text-foreground">
                {t("home.whyHome")}
              </p>
            </GridBlock>
          </DocumentGrid>
        </section>

        <section aria-labelledby="hi-contact-heading" className="bg-background">
          <DocumentGrid className="py-16 lg:py-20">
            <GridBlock>
              <h2
                id="hi-contact-heading"
                className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl"
              >
                {t("home.contactHeading")}
              </h2>
              <p className="mt-4 text-lg text-foreground">
                {t("home.contactBody")}
              </p>

              <p className="mt-6 text-base">
                <span className="font-semibold text-ink">
                  {t("home.contactEmailLabel")}
                </span>{" "}
                <a
                  href={`mailto:${siteContact.email}`}
                  lang="en"
                  className="tap-target rounded-sm font-semibold text-primary underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {siteContact.email}
                </a>
              </p>

              <p className="mt-4 text-base text-muted-foreground">
                {t("home.contactFormNote")}
              </p>

              <p className="mt-8 text-base font-semibold text-ink">
                {t("home.clinicalWarning")}
              </p>
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
            name: t("home.title"),
            description: t("home.standfirst"),
            url: `${siteUrl}${path}`,
            inLanguage: "hi-IN",
          }),
        }}
      />
    </>
  );
}
