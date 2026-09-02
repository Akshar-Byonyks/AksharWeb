import { Clock, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

// THE PROVENANCE SCALE.
//
// This site already knew, at 58 separate points, how each of its facts was
// known — and rendered every one of them as the same small amber "pending"
// chip. The sitewide critique of 30 Aug 2026 found that the chip had become
// the most repeated visual element on the site, which meant the one thing
// here a competitor cannot copy (the evidentiary discipline) was reading as a
// defect list.
//
// So the status is no longer a chip bolted onto a paragraph. It is a
// register: a hairline rule and a mono label in the outside gutter, running
// beside the prose the way a citation runs beside a legal or scientific text.
// A reader learns the code once and reads the rest of the site with it.
//
// NO NEW HUE. The four accent roles DESIGN.md already documents are given a
// second, structural job, each keeping the meaning it already had:
//
//   plum    "institutional / formal"   -> on the public record
//   teal    "clinical evidence"        -> published source
//   primary the site's own workhorse   -> company statement
//   pending "not yet established"      -> not yet established
//
// Gold stays out. Gold means "home / India", and the discipline of NOT
// reaching for the fifth accent is the reason the other four still mean
// something. See deviations.md §16.
//
// WHY A DISCRIMINATED UNION rather than a `status` string plus optional
// fields: "on the public record" is a claim about verifiability. If it can be
// rendered without a URL a reader can open, it is decoration. The type makes
// that unrepresentable rather than merely discouraged — the same instinct as
// the module-load contracts in `leadership.ts` and `news-data.ts`, moved one
// step earlier to compile time.
export type Provenance =
  | {
      status: "record";
      /** A public register a reader can open and check for themselves. */
      source: { label: string; url: string };
      retrieved: string;
    }
  | {
      status: "published";
      /** Published research or a dated public source. URL where one exists. */
      source: { label: string; url?: string };
      /**
       * The period the figure DESCRIBES, not the day we looked it up. These
       * differ on this site more often than not — the Kidney360 figures are
       * 2010 data reported in 2020 — and `market-data.ts` already keeps them
       * apart. Rendering a period behind the word "Retrieved" would restate
       * a source date as a fetch date, which is the sloppiness this whole
       * scale exists to prevent.
       */
      asOf: string;
    }
  | {
      status: "stated";
      /**
       * Whose assertion this is, where naming them adds something. OPTIONAL
       * since 2 Sep 2026: the client holds Byonyks' permission for its
       * material and asked for the Byonyks attributions to come off, so the
       * Byonyks-sourced entries now omit it and the mark renders the status
       * alone. `origin-story.tsx` still sets it, and that is why this field
       * survives rather than being deleted.
       */
      statedBy?: string;
      /** The date on the credential, where the credential carries one. */
      asOf?: string;
    }
  | {
      status: "pending";
      /** What is missing, in the words a reader would use. Not "TBD". */
      missing: string;
    };

export type ProvenanceStatus = Provenance["status"];

// One table, read by the marks, the inline chips and the legend on
// `/what-we-know/`. A status cannot be renamed in one place and not the
// others, which is the failure the shared legal shell was extracted to stop.
export const provenanceMeta: Record<
  ProvenanceStatus,
  { label: string; short: string; meaning: string; light: string; dark: string }
> = {
  record: {
    label: "On the public record",
    short: "Public record",
    meaning:
      "Held in a public register anyone can open and check without asking us — the FDA's 510(k) database, a government scheme document, a court or corporate filing.",
    light: "text-plum",
    dark: "text-plum-on-ink",
  },
  published: {
    label: "Published source",
    short: "Published",
    meaning:
      "Published research, a journal article or a dated public report by someone independent of this company. Named and dated so you can weigh it.",
    light: "text-teal",
    dark: "text-teal-on-ink",
  },
  stated: {
    label: "Company statement",
    short: "Stated",
    meaning:
      "The company's own account of its device, testing or operations. It is not independently verifiable from here, and the specific numbers that would make it checkable are listed as pending where they are missing.",
    light: "text-primary",
    dark: "text-primary-on-ink",
  },
  pending: {
    label: "Not yet established",
    short: "Pending",
    meaning:
      "Nobody has given us this yet, or nobody has confirmed it. The slot is marked rather than filled with a plausible-looking value.",
    light: "text-pending",
    dark: "text-pending-on-ink",
  },
};

const ruleColor: Record<ProvenanceStatus, { light: string; dark: string }> = {
  record: { light: "bg-plum", dark: "bg-plum-on-ink" },
  published: { light: "bg-teal", dark: "bg-teal-on-ink" },
  stated: { light: "bg-primary", dark: "bg-primary-on-ink" },
  pending: { light: "bg-pending", dark: "bg-pending-on-ink" },
};

function ProvenanceBody({
  provenance,
  tone,
  label,
}: {
  provenance: Provenance;
  tone: "light" | "dark";
  label?: string;
}) {
  const meta = provenanceMeta[provenance.status];
  const muted = tone === "dark" ? "text-white/70" : "text-muted-foreground";
  // NOT `text-muted-foreground/80`, which is what this shipped as and what a
  // corrected contrast sweep caught on 30 Aug 2026: `--muted-foreground` is
  // #5f6b73, a deliberate 5.06:1 on white, and dropping it to 80% opacity
  // takes it to 3.59:1 — under AA on the twenty date lines of /what-we-know/.
  // The date is already separated from the source by being its own mono line;
  // the extra transparency bought nothing and cost the contrast floor.
  //
  // (The earlier sweep that passed this was measuring `getComputedStyle`
  // colours with a regex, which reads oklch(0.29 0.09 262) as rgb(0.29, 0.09,
  // 262). Colours are rasterised through a canvas now.)
  //
  // The dark tone is unchanged and measures 6.68:1 on ink.
  const dateTone = tone === "dark" ? "text-white/60" : "text-muted-foreground";

  return (
    <>
      <p
        className={cn(
          "flex items-start gap-1.5 font-mono text-xs leading-5 font-semibold tracking-wide",
          tone === "dark" ? meta.dark : meta.light,
        )}
      >
        {provenance.status === "pending" ? (
          <Clock className="mt-px size-3 shrink-0" aria-hidden="true" />
        ) : null}
        <span className="min-w-0">{label ?? meta.label}</span>
      </p>

      {provenance.status === "pending" ? (
        <p className={cn("mt-1.5 text-xs leading-5", muted)}>
          {provenance.missing}
        </p>
      ) : null}

      {provenance.status === "stated" && provenance.statedBy ? (
        <p className={cn("mt-1.5 text-xs leading-5", muted)}>
          {provenance.statedBy}
        </p>
      ) : null}

      {provenance.status === "record" || provenance.status === "published" ? (
        // The source name is a register's proper name and stays in English
        // wherever it appears. On the Hindi track that makes it a language
        // part: without an explicit lang, a screen reader pronounces "FDA 510(k)
        // Premarket Notification database" with Hindi rules. WCAG 3.1.2.
        <p className={cn("mt-1.5 text-xs leading-5", muted)} lang="en">
          {provenance.source.url ? (
            <a
              href={provenance.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                // py-1 takes the 20px line box to 28px, clearing WCAG 2.2
                // SC 2.5.8's 24px floor. The inline exception does not apply
                // here: this link stands alone in the margin rather than
                // inside a sentence of non-target text, so its size is not
                // constrained by surrounding prose. Same py-1 the shared legal
                // shell already puts on MailLink and InternalLink.
                "inline-flex items-start gap-1 rounded-sm py-1 underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                tone === "dark" ? "hover:text-white" : "hover:text-ink",
              )}
            >
              <span className="min-w-0">{provenance.source.label}</span>
              <ExternalLink className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            provenance.source.label
          )}
        </p>
      ) : null}

      {/* Each status dates itself the way its own source does. A public
          register is dated by when it was CHECKED, because the register can
          change under you. Research and a company credential are dated by the
          period they describe, which does not. */}
      {provenance.status === "record" ? (
        <p className={cn("mt-1 font-mono text-xs leading-5", dateTone)}>
          Retrieved {provenance.retrieved}
        </p>
      ) : null}
      {(provenance.status === "published" || provenance.status === "stated") &&
      provenance.asOf ? (
        <p className={cn("mt-1 font-mono text-xs leading-5", dateTone)}>
          {provenance.asOf}
        </p>
      ) : null}
    </>
  );
}

// The rail mark. Desktop: it sits in the gutter beside the prose it annotates.
// Mobile: there is no gutter, so it becomes a footnote UNDER the block.
//
// Under, not over, and that is not an aesthetic preference. A status label
// stacked above a heading is a kicker, which DESIGN.md rejects outright and
// the craft floor bans without exception. Below the block it is what it
// actually is — a citation on the thing you just read.
export function ProvenanceMark({
  provenance,
  tone = "light",
  label,
  className,
}: {
  provenance: Provenance;
  tone?: "light" | "dark";
  /** Translated status label, for the Hindi track. Defaults to the scale's own English wording. */
  label?: string;
  className?: string;
}) {
  const rule = ruleColor[provenance.status];

  return (
    <div className={cn("flex gap-3", className)}>
      {/* 1px, never more. A thick coloured left border on a block is the
          single most recognisable tell of generated UI, and the craft floor
          bans it above 1px. The weight here comes from the mono label and the
          space around it, not from the rule. */}
      <span
        aria-hidden="true"
        className={cn(
          "w-px shrink-0 self-stretch",
          tone === "dark" ? rule.dark : rule.light,
        )}
      />
      <div className="min-w-0">
        <ProvenanceBody provenance={provenance} tone={tone} label={label} />
      </div>
    </div>
  );
}

// The inline form, for a table cell or the end of a row — where a rail does
// not exist and the status belongs to one value rather than one section.
//
// Supersedes `PendingChip` for anything that has a provenance rather than
// only an absence; `PendingChip` stays for the pure "this slot is empty"
// case it was written for.
export function ProvenanceChip({
  status,
  label,
  className,
}: {
  status: ProvenanceStatus;
  /** Overrides the scale's own short label where a cell needs its own word. */
  label?: string;
  className?: string;
}) {
  const meta = provenanceMeta[status];
  const rule = ruleColor[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wide",
        meta.light,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-3 w-px shrink-0", rule.light)} />
      {status === "pending" ? (
        <Clock className="size-3 shrink-0" aria-hidden="true" />
      ) : null}
      {label ?? meta.short}
    </span>
  );
}
