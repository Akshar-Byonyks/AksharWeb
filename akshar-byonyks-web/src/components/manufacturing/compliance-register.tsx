import { ExternalLink } from "lucide-react";

import { PendingChip } from "@/components/common/pending-note";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { companyStated, fda510k, publicRecord } from "@/lib/compliance";

// §9.4 "Quality and compliance": certifications with numbers and dates,
// print-optimised for tender attachment.
//
// THE SPLIT IS THE POINT. The spec asks for one list. One list would put a
// clearance anybody can pull off a government register in the same visual
// grammar as five test-house milestones that exist, in this project, as
// sentences in a client audit with no certificate number attached to any of
// them. A procurement officer attaching this to a tender and an investor
// running diligence both need to know which is which before they need to know
// anything else, so the distinction is the section's structure rather than a
// disclaimer under it.
//
// It is also the honest reading of spec F-1. F-1's resolution is "attribute to
// Byonyks, never to a country" — an instruction about *attribution*, and a page
// that attributes properly has to show where each attribution lands.
//
// Ground: white, per the Full-Bleed Rule's meaning test. Ink carries home,
// night and the patient's life; white carries evidence, regulation and
// specification. "Putting a certification band on a dark ground would style it
// as persuasion," and this is the section that has the least business being
// persuasive.
//
// Colour: primary blue on the public-record panel only. Home's proof band
// already fixed regulatory proof to blue, and confining it to the one verified
// entry means the colour is doing the same job as the layout instead of
// decorating both registers equally. Teal is deliberately not borrowed for the
// stated register: teal means clinical evidence, and a company statement
// awaiting its certificate is not evidence yet.
export function ComplianceRegister() {
  return (
    <section
      aria-labelledby="compliance-heading"
      id="compliance"
      className="scroll-mt-24 bg-background"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="compliance-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
            >
              The compliance record
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything below is one of two things: a public record you can
              check yourself, or a statement by Byonyks that is attributed to
              Byonyks. Nothing here is a claim by Akshar Byonyks about its own
              manufacturing, because Akshar Byonyks does not manufacture.
            </p>
            {/* Spec §9.4 asks for this section to be print-optimised for
                tender attachment. Saying so is half the feature — a
                procurement officer who does not know the page prints cleanly
                will screenshot it instead. */}
            <p className="mt-3 text-base text-muted-foreground">
              This page is formatted to print as a plain annexe, without
              navigation or images, for attaching to a tender.
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
                    <p className="mt-1 font-mono text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                      {credential.reference}
                    </p>
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
            Home's proof band and the X-1 specification table use, so a reader
            meets one register language across the site rather than three. */}
        <ScrollReveal>
          <h3 className="mt-16 text-sm font-semibold tracking-wide text-ink uppercase">
            Stated by Byonyks
          </h3>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground">
            True as attributions, and attributed here rather than restated as
            Akshar Byonyks&rsquo; own. None of these has reached this project
            with its certificate number, and each row says which number is
            missing rather than the register implying it is complete.
          </p>

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
                      <p className="text-sm text-muted-foreground">
                        Stated by:{" "}
                        {verification.kind === "company-stated"
                          ? verification.recordedIn
                          : verification.register}
                      </p>
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
