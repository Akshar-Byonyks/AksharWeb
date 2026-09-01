import { ExternalLink } from "lucide-react";

import { PendingChip } from "@/components/common/pending-note";
import { ProvenanceChip } from "@/components/common/provenance";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { companyStated, fda510k, publicRecord } from "@/lib/compliance";

// Spec §9.4's "quality and compliance" content, living on the device page.
//
// WHY IT IS HERE AND NOT ON `/manufacturing/` (29 Aug 2026). It shipped as a
// standalone page first. Measured against the rest of the site afterwards,
// **eleven of that page's nineteen facts already appeared somewhere else** —
// and they were the prominent ones. Its entire hero was the licensing chain
// that `/innovation/`, this page and `/innovation/market/` all already carry;
// ISO 13485 and the clearance were on Home's proof band. What was genuinely
// only there was fine print: the product code, the regulation, the submission
// date, the decision, the link to the register, and two pending hub cards.
//
// Roughly half a page of restatement, in nav slot three of five, under a label
// — "Manufacturing" — that promised a factory the page then opened by saying
// does not exist. The spec's own audit had already called that page thin
// (§2.1) and F-1 warned that a manufacturing page with no manufacturing is
// worse than none; this build took the warning seriously the second time.
//
// So the record moved to where a reader is already looking at the device, one
// section below the regulatory statement it evidences, and the page went away.
// Client decision, 29 Aug 2026. Recorded in `deviations.md`.
//
// THE SPLIT IS THE POINT, AND IT IS WHAT SURVIVED THE MERGE. Spec §9.4 asks
// for one list of certifications. One list would put a clearance anybody can
// pull off a government register in the same visual grammar as five test-house
// milestones that exist, in this project, as sentences in a client audit with
// no certificate number attached to any of them. An investor running diligence
// and a procurement officer attaching this to a tender both need to know which
// is which before they need anything else, so the distinction is the section's
// structure rather than a disclaimer under it.
//
// Ground: `surface-2`, which keeps the Full-Bleed Rule's meaning test intact —
// ink carries home, night and the patient's life; the light carries evidence,
// regulation and specification, because "a certification band on a dark ground
// would be styled as persuasion." It also keeps the page's alternation honest,
// sitting between the regulatory panels (background) and the IFU request (ink).
//
// COLOUR, CORRECTED 30 Aug 2026. This section shipped with primary blue on
// the public-record panel and nothing on the stated register, on the reasoning
// that "Home's proof band fixed regulatory proof to blue". That was right when
// it was written and is now drift, because this file's own distinction has
// since been generalised into the sitewide provenance scale — which reads a
// public register as PLUM and a company statement as PRIMARY. Left alone, the
// page that invented the split was the one page rendering it backwards against
// `/what-we-know/`, where all thirty-seven of the site's claims are listed
// under the same four colours.
//
// So the K-number takes plum and the stated rows take primary, and both
// registers now carry a real `ProvenanceChip` rather than a hand-rolled label.
// This file was the last place on the site still hand-rolling the distinction
// it originated; a status cannot now be renamed here without renaming it
// everywhere.
//
// The FDA link stays primary. Links are primary sitewide, and a control is not
// a meaning — the same reason the ByoTalks play button was returned to neutral
// rather than given an accent of its own.
//
// Teal is still deliberately not borrowed for the stated register: teal means
// clinical evidence, and a company statement awaiting its certificate is not
// evidence yet.
export function X1Compliance() {
  return (
    <section
      aria-labelledby="compliance-heading"
      id="compliance"
      className="scroll-mt-24 bg-surface-2"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="compliance-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
            >
              Quality and compliance
            </h2>
            {/* Deliberately does not restate who manufactures or who holds the
                clearance. The regulatory panels immediately above say both,
                from `claims.ts`, and saying it twice in two adjacent sections
                is exactly the repetition that cost the standalone page its
                existence. */}
            <p className="mt-4 text-lg text-muted-foreground">
              Everything below is one of two things: a public record you can
              check yourself, or a statement by Byonyks, attributed to Byonyks.
              Which one it is decides how much weight it carries, so it decides
              how this section is laid out.
            </p>
            <p className="mt-3 text-base text-muted-foreground">
              This page is formatted to print as a plain document, without
              navigation, for attaching to a tender.
            </p>
          </div>
        </ScrollReveal>

        {/* Register one. One entry, given the whole width and a display
            treatment — the K-number is the single most useful string on this
            page, and burying it in a row of six would waste it. */}
        <ScrollReveal>
          <h3 className="mt-14 text-sm font-semibold tracking-wide text-ink uppercase">
            On the public record
          </h3>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground">
            Verifiable by anyone, without asking Byonyks or Akshar Byonyks for
            anything.
          </p>

          {publicRecord.map((credential) => {
            const { verification } = credential;
            if (verification.kind !== "public-record") return null;
            return (
              <div
                key={credential.title}
                className="mt-6 rounded-2xl border border-line bg-card p-6 sm:p-8"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                  <div className="lg:w-72 lg:shrink-0">
                    <p className="font-mono text-xs tracking-wide text-muted-foreground">
                      Premarket notification
                    </p>
                    <p className="mt-1 font-mono text-4xl font-bold tracking-tight text-plum sm:text-5xl">
                      {credential.reference}
                    </p>
                    <ProvenanceChip status="record" className="mt-3" />
                    <p className="mt-3 text-lg font-semibold text-ink">
                      {credential.title}
                    </p>
                    <p className="mt-1 text-base text-muted-foreground">
                      {credential.date}
                    </p>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-base text-foreground">
                      {credential.detail}
                    </p>

                    {/* The register's own fields, as a definition list. A
                        reader comparing this page against the FDA's page
                        should find the same labels in the same words. */}
                    <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-2">
                      {[
                        ["Device on the clearance", fda510k.deviceName],
                        ["Classification", fda510k.classificationName],
                        ["Regulation", fda510k.regulationNumber],
                        ["Product code", fda510k.productCode],
                        ["Type", fda510k.clearanceType],
                        ["Decision", fda510k.decision],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <dt className="font-mono text-xs tracking-wide text-muted-foreground">
                            {label}
                          </dt>
                          <dd className="mt-1 text-base text-ink">{value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-6 border-t border-line pt-5">
                      <a
                        href={verification.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        Open the record on the FDA database
                        <ExternalLink
                          className="size-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      {/* The URL in full, because a printed page cannot be
                          clicked and this section is built to be printed. */}
                      <p className="mt-2 text-sm break-all text-muted-foreground">
                        {verification.register} · {verification.url}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Checked against the register on {verification.checked}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollReveal>

        {/* Register two. Hairline rows, no cards: the same documentary grammar
            the specification table above and Home's proof band already use, so
            a reader meets one register language across the site. */}
        <ScrollReveal>
          <h3 className="mt-16 text-sm font-semibold tracking-wide text-ink uppercase">
            Stated by Byonyks
          </h3>
          {/* No lead paragraph under this heading, unlike the register above
              it — removed on request, 31 Aug 2026. The heading itself is what
              has to stay: it is the only thing separating these credentials
              from the independently verifiable ones above, and each row still
              names the certificate number it is missing. */}

          <ul className="mt-6 divide-y divide-line border-y border-line">
            {companyStated.map((credential) => {
              const { verification } = credential;
              return (
                <li
                  key={credential.title}
                  className="flex flex-col gap-2 py-6 sm:flex-row sm:gap-10"
                >
                  <div className="sm:w-44 sm:shrink-0">
                    <p className="font-mono text-sm text-muted-foreground tabular-nums">
                      {credential.date ?? "Date not stated"}
                    </p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg font-semibold text-ink">
                      {credential.title}
                    </p>
                    <p className="mt-1 text-base text-foreground">
                      {credential.detail}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <ProvenanceChip status="stated" />
                      <p className="text-sm text-muted-foreground">
                        {verification.kind === "company-stated"
                          ? verification.recordedIn
                          : verification.register}
                      </p>
                      {/* PendingChip stays. It answers a different question —
                          not "how is this known" but "which specific number is
                          missing" — and the scale's own `pending` status is for
                          a claim with no basis at all, which is not this. */}
                      {credential.referencePending ? (
                        <PendingChip
                          label={`${credential.referencePending} pending`}
                        />
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
