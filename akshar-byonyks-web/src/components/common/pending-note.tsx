import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";

// Product principle: "no unsourced statistics ship, ever." This renders a
// genuine gap as a deliberate, legible placeholder rather than a confident
// invented value or a silently missing section — same instinct as spec
// §9.7's "an empty section must look deliberate, not broken."
//
// Color: a semantic "pending" amber (deviations.md), not gray — a state
// deserves a state color, distinct from both the destructive-error red and
// the accent-gold brand color it sits near.
//
// Generalized 24 Aug 2026 (was `PendingStat`, Home-only). The X-1 page needs
// the same visual language for two pendings that are not statistics — an
// unpublished device specification and an unconfirmed regulatory position —
// so `note` is now a prop. The default keeps Home's original wording, and
// the shared component is what stops "pending" from being redrawn three
// different ways on three pages.
export function PendingNote({
  label,
  note = "Figure pending source citation",
  tone = "light",
  className,
}: {
  label: string;
  note?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed px-4 py-3",
        tone === "dark"
          ? "border-pending-on-ink/40 bg-white/5"
          : "border-pending/40 bg-surface-2",
        className
      )}
    >
      <p
        className={cn(
          "flex items-center gap-1.5 font-mono text-xs tracking-wide",
          tone === "dark" ? "text-pending-on-ink" : "text-pending"
        )}
      >
        <Clock className="size-3 shrink-0" aria-hidden="true" />
        <span className="min-w-0">{note}</span>
      </p>
      <p
        className={cn(
          "mt-1 text-sm",
          tone === "dark" ? "text-white/85" : "text-foreground"
        )}
      >
        {label}
      </p>
    </div>
  );
}

// The compact form of the same pattern (DESIGN.md, "Two sizes, one
// language"): identical dashed border, semantic pending color and mono clock
// label, sized for a table cell or the end of a row rather than as a card.
// Lived inside x1-spec-table.tsx until 27 Aug 2026, when the how-it-works
// page needed the same chip for its reference slots — at which point two
// copies of a component whose entire job is consistency would have been the
// thing the shared component exists to prevent.
export function PendingChip({ label = "Pending" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-dashed border-pending/40 bg-surface-2 px-2 py-0.5 font-mono text-xs tracking-wide text-pending">
      <Clock className="size-3 shrink-0" aria-hidden="true" />
      {label}
    </span>
  );
}
