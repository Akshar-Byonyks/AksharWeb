import Image from "next/image";
import { Clock } from "lucide-react";

import type { Executive } from "@/lib/leadership";
import { cn } from "@/lib/utils";

// One 4:5 frame for every executive, whether or not a photograph exists.
//
// The placeholder is deliberately in the site's established pending language —
// dashed border, mono clock label, the semantic pending amber — and not a grey
// silhouette. A silhouette is a picture of nobody presented as a picture; this
// says "photograph pending" in words, which is the same instinct as
// `PendingNote` and spec §9.7's "an empty section must look deliberate, not
// broken". It also means the gap is visible to the client every time they open
// the page, which is how the photograph eventually arrives.
//
// Initials rather than a blank panel, so the frame still reads as a person's
// place in the grid at a glance.
function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ExecutivePortrait({
  executive,
  sizes,
  priority = false,
  tone = "light",
  className,
}: {
  executive: Executive;
  sizes: string;
  priority?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const frame = cn(
    "relative aspect-4/5 overflow-hidden rounded-xl border",
    tone === "dark" ? "border-white/15 bg-white/5" : "border-line bg-surface-2",
    className,
  );

  if (executive.portrait) {
    return (
      <div className={frame}>
        {/* `object-top`, not the default centre. Four of these are their
            original files at their original aspect ratios — three of them
            0.62, well outside this 4:5 frame — so the frame crops them. A
            centred crop on a tall portrait takes the top of the head off.
            Anchoring to the top spends the whole crop on the chest instead,
            which is what a portrait can afford to lose. The eleven that are
            already 4:5 are unaffected. */}
        <Image
          src={executive.portrait}
          alt={executive.portraitAlt}
          fill
          sizes={sizes}
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        frame,
        "border-dashed",
        tone === "dark" ? "border-pending-on-ink/40" : "border-pending/40",
      )}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
        <span
          aria-hidden="true"
          className={cn(
            "text-4xl font-semibold tracking-tight",
            tone === "dark" ? "text-white/40" : "text-ink/25",
          )}
        >
          {initialsOf(executive.name)}
        </span>
        <span
          className={cn(
            "flex items-center gap-1.5 font-mono text-xs tracking-wide",
            tone === "dark" ? "text-pending-on-ink" : "text-pending",
          )}
        >
          <Clock className="size-3 shrink-0" aria-hidden="true" />
          Photograph pending
        </span>
      </div>
    </div>
  );
}
