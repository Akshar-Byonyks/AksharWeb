import type { Metadata } from "next";
import Link from "next/link";

import { DirectionContract } from "@/components/common/direction-contract";
import { DisplayFigure } from "@/components/common/display-figure";
import {
  ProvenanceMark,
  provenanceMeta,
  type ProvenanceStatus,
} from "@/components/common/provenance";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { DocumentGrid, GridBlock } from "@/components/layout/document-grid";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CtaBand } from "@/components/sections/cta-band";
import {
  ledgerByStatus,
  ledgerCounts,
  ledgerOrder,
  ledger,
} from "@/lib/claims-ledger";
import { siteUrl } from "@/lib/site-config";

const path = "/what-we-know";

const description =
  "Every factual claim on this site, with how it is known: what is on the public record, what comes from published research, what Byonyks states, and what is not established yet.";

export const metadata: Metadata = {
  title: "What we know",
  description,
  alternates: { canonical: path, languages: { "en-IN": path } },
  openGraph: {
    title: "What we know | Akshar Byonyks",
    description,
    url: path,
    type: "website",
  },
  twitter: { card: "summary" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "What we know | Akshar Byonyks",
  description,
  url: `${siteUrl}${path}`,
};

// THE LEDGER PAGE.
//
// Built 30 Aug 2026, from the sitewide critique. Its finding: the single most
// distinctive thing about this site — that it publishes what it does not know,
// 58 separate times — was being rendered as a small amber chip that read as an
// unfinished to-do list rather than as the discipline it is.
//
// The chips are not the problem. What was missing was anywhere a reader could
// see all of it at once and understand that it is a system. PRODUCT.md says
// this site should "become a reference source on home PD in India"; a page
// that lays out its own evidentiary state, sourced and dated, is the most
// direct way to be one. It is also the one page here that a competitor cannot
// clone in an afternoon, because cloning it would mean doing the sourcing.
//
// READ MODE, and the register grammar the rest of the site already uses:
// hairline separators rather than cards, the count at display weight because
// the count is the thing being read, the provenance in the margin beside the
// claim rather than swept to a footnote.
//
// NO CLIENT-SIDE FILTER, deliberately, and for the reason `legal-document.tsx`
// gives for its own index: the value here is the jump, and four anchors
// deliver it. A filter island on a static register would be a cost this
// audience pays for nothing — and it would hide entries, which on a page whose
// entire argument is "here is all of it" is the wrong default.

function StatusSection({ status }: { status: ProvenanceStatus }) {
  const meta = provenanceMeta[status];
  const entries = ledgerByStatus(status);

  return (
    <section
      id={status}
      aria-labelledby={`${status}-heading`}
      className="scroll-mt-24 border-t border-line pt-14 first:border-t-0 first:pt-0"
    >
      <DocumentGrid className="px-0 sm:px-0 lg:px-0">
        <GridBlock
          rail={
            <p className="font-mono text-xs leading-5 font-semibold tracking-wide text-muted-foreground">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </p>
          }
        >
          <h2
            id={`${status}-heading`}
            className="text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl"
          >
            {meta.label}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">{meta.meaning}</p>
        </GridBlock>
      </DocumentGrid>

      <ul className="mt-10 space-y-0">
        {entries.map((entry) => (
          <li key={entry.id} className="border-t border-line py-7 first:border-t-0">
            <DocumentGrid className="px-0 sm:px-0 lg:px-0">
              <GridBlock
                rail={<ProvenanceMark provenance={entry.provenance} />}
              >
                <p className="text-lg font-semibold text-balance text-ink">
                  {entry.claim}
                </p>
                {entry.detail ? (
                  <p className="mt-2 text-base text-muted-foreground">
                    {entry.detail}
                  </p>
                ) : null}
                <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  <span className="font-mono text-xs tracking-wide">
                    Appears on
                  </span>
                  {entry.appearsOn.map((page, i) => (
                    <span key={page.href} className="inline-flex items-center">
                      {i > 0 ? (
                        <span aria-hidden="true" className="mr-2">
                          ·
                        </span>
                      ) : null}
                      <Link
                        href={page.href}
                        className="rounded-sm py-0.5 font-semibold text-primary underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        {page.label}
                      </Link>
                    </span>
                  ))}
                </p>
              </GridBlock>
            </DocumentGrid>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function WhatWeKnowPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DirectionContract>{`
THESIS: the site's evidentiary state, in one place, as a register. A reader
who wants to know whether to believe this company should be able to audit it
in one scroll rather than assembling it from nine routes. Read mode.
OWN-WORLD: this IS the own-world move. The four accent roles DESIGN.md
already documents are promoted from decoration to a provenance scale, and
this page is where the scale is taught — the legend and the data in one
document, so a reader who learns the code here reads every other page with it.
STORY: how many of each → what each status means → every claim under it,
with its source in the margin and the pages it appears on beneath it.
FORM: the document spine. Provenance in the gutter, claim in the measure.
Hairline separators, no cards: a rule that separates reads as a record, a box
that encloses reads as marketing.
FINISH: counts at display weight, because on this page the counts are the
argument. No filter island, no scroll-spy — four anchors do the whole job.
`}</DirectionContract>

      <section aria-labelledby="wwk-heading" className="bg-ink">
        <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <Breadcrumbs tone="dark" items={[{ name: "What we know" }]} />
          <div className="mt-10 max-w-3xl lg:mt-14">
            <h1
              id="wwk-heading"
              className="text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl"
            >
              What we know, and how we know it
            </h1>
            <p className="mt-6 text-xl text-white/75">
              Every factual claim this site makes, and the basis for it. Some of
              it you can check in a public register without taking our word for
              anything. Some of it is Byonyks&rsquo; own account, marked as
              theirs. Some of it we do not have yet, and that is here too.
            </p>
          </div>
        </div>
      </section>

      {/* The counts, which are also the legend and the index. One block doing
          three jobs rather than three blocks doing one each — the counts ARE
          the summary of the site's evidentiary position, and each is the link
          to the section it counts. */}
      <section aria-labelledby="counts-heading" className="bg-surface-2">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
          <h2 id="counts-heading" className="sr-only">
            The ledger at a glance
          </h2>
          <ScrollReveal>
            <div className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
              {ledgerOrder.map((status, i) => {
                const meta = provenanceMeta[status];
                return (
                  <a
                    key={status}
                    href={`#${status}`}
                    className={`group block rounded-sm py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                      i === 0 ? "lg:pr-8" : "lg:px-8"
                    } ${i < 2 ? "border-b border-line pb-6 lg:border-b-0 lg:pb-4" : "pt-6 lg:pt-4"} ${
                      i % 2 === 1 ? "pl-6 lg:pl-8" : ""
                    }`}
                  >
                    <DisplayFigure
                      size="lead"
                      tone={
                        status === "record"
                          ? "plum"
                          : status === "published"
                            ? "teal"
                            : status === "stated"
                              ? "primary"
                              : "pending"
                      }
                    >
                      {ledgerCounts[status]}
                    </DisplayFigure>
                    <p className="mt-2 text-base font-semibold text-ink group-hover:underline">
                      {meta.label}
                    </p>
                  </a>
                );
              })}
            </div>
            <p className="mt-8 max-w-[74ch] text-base text-muted-foreground">
              {ledger.length} claims in total. The four marks below are the same
              four you will see in the margin of every page on this site.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section aria-labelledby="register-heading" className="bg-background">
        <h2 id="register-heading" className="sr-only">
          The register in full
        </h2>
        <div className="mx-auto max-w-[1280px] space-y-14 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {ledgerOrder.map((status) => (
            <StatusSection key={status} status={status} />
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
