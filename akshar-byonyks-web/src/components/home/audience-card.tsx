"use client";

import Link from "next/link";
import { type LucideIcon, ArrowUpRight } from "lucide-react";
import { useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

import { cn } from "@/lib/utils";

// Motion amendment: cursor-responsive tilt/lift, so each audience card
// reads as its own doorway rather than a uniform grid cell. Pointer-driven
// only — motion-reduce keeps the flat hover/focus lift and drops the tilt.
const MAX_TILT_DEG = 6;

const tintClasses: Record<"primary" | "gold" | "teal" | "plum", { bg: string; fg: string }> = {
  primary: { bg: "bg-accent", fg: "text-primary" },
  gold: {
    bg: "bg-[color-mix(in_oklch,var(--color-accent-gold),white_88%)]",
    fg: "text-accent-gold",
  },
  teal: {
    bg: "bg-[color-mix(in_oklch,var(--color-teal),white_88%)]",
    fg: "text-teal",
  },
  plum: {
    bg: "bg-[color-mix(in_oklch,var(--color-plum),white_90%)]",
    fg: "text-plum",
  },
};

export function AudienceCard({
  icon: Icon,
  title,
  body,
  href,
  tint,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
  tint: "primary" | "gold" | "teal" | "plum";
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { bg, fg } = tintClasses[tint];

  function handlePointerMove(event: ReactPointerEvent<HTMLAnchorElement>) {
    const card = cardRef.current;
    if (!card || event.pointerType !== "mouse") return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${(-y * MAX_TILT_DEG).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(x * MAX_TILT_DEG).toFixed(2)}deg`);
  }

  function handlePointerLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <Link
      ref={cardRef}
      href={href}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ "--tilt-x": "0deg", "--tilt-y": "0deg" } as CSSProperties}
      className={cn(
        "group/card relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line p-6 [transform-style:preserve-3d]",
        "transition-transform duration-300 ease-out will-change-transform",
        "hover:-translate-y-1 hover:[transform:perspective(800px)_rotateX(var(--tilt-x))_rotateY(var(--tilt-y))_translateY(-4px)]",
        "focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "motion-reduce:transition-none motion-reduce:hover:transform-none",
        bg
      )}
    >
      <div>
        <Icon className={cn("size-8", fg)} aria-hidden="true" />
        <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      </div>
      {/* text-ink, not the card's accent (fixed 26 Aug 2026). Measured, the
          accent-coloured label failed WCAG 1.4.4 on two of the four tints —
          gold at 2.78:1 and teal at 4.32:1 against their own card grounds,
          where 4.5:1 is required. It was also a standing violation of
          DESIGN.md's Accent Ration Rule, which restricts every accent to large
          display type, icon chips and non-text graphics: "never body text,
          never links." The icon above keeps the accent, because an icon is the
          non-text graphic the rule allows, so each card still reads in its own
          colour without spending that colour on 14px text. */}
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink">
        Explore
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
