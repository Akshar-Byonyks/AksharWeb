import Image from "next/image";
import { Hospital } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

// The two-state scene shared by both the scroll-scrubbed hero (motion-safe)
// and the static side-by-side fallback (motion-reduce / no-JS). "After" (a
// quiet home night) is Byonyks USA's own official X-1 product render, the
// same asset already used in "Our answer." "Before" ("Life around the
// clinic") is DESIGN.md's default for a concept with no real, rights-clear
// image available: line-art iconography, single stroke weight, colored via
// the card's own currentColor rather than a hardcoded hex — not the real
// hemodialysis-machine photo used in earlier revisions, which read as
// specifically "the control panel" rather than "the routine" the retitled
// card is now making the point about. Revision 5 (20 Aug 2026): replaced
// the drawn house/bed/lamp/device scene with the X-1 render. Revision 7
// (23 Aug 2026): swapped the machine-photo back to line art (a lucide
// Hospital glyph) after the card's title changed from "The in-center
// routine" to "Life around the clinic" — the photo no longer matched, and a
// colored flat-illustration reference the request pointed to would have
// meant a fifth ad-hoc hue plus a hardcoded red cross, both against
// DESIGN.md's Accent Ration and Wayfinding rules.
//
// Presentation: each state is a card (react-bits' "Scroll Stack" pattern —
// two cards physically stacked, the front one scaling/rotating back and
// fading toward the deck as the next one grows forward to replace it), not
// a bare cross-fading icon. Revision 2 (20 Aug 2026): the original build
// cross-faded two unframed SVGs plus a separate caption line below the
// stage — reported as reading like "text at the bottom that slowly
// reveals," not a visible scene change. The caption now lives inside each
// card, and the transform is scale + translateY + rotate, not opacity
// alone, so the swap reads as a physical stack rather than a fade.

// Gold is reserved sitewide for "home/India" (DESIGN.md, The Wayfinding
// Rule) and restricted to large display type / non-text graphics (The
// Accent Ration Rule) — so the "home" card carries gold on its border and
// the scene icon itself, never on its title or caption text. Both cards'
// text stays neutral white so the accent reads as the card's identity, not
// a label color.
//
// Background: transparent, not a translucent wash — DESIGN.md rules out
// glass/blur effects, and a bg-white/[0.06] or bg-accent-gold/10 wash over
// the moving Silk background behind these cards is exactly that. Border +
// content sitting directly on Silk instead.
function SceneCard({
  tone,
  eyebrow,
  title,
  caption,
  children,
  className,
  style,
}: {
  tone: "clinic" | "home";
  eyebrow: string;
  title: string;
  caption: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-5 rounded-2xl border p-10 text-center sm:p-12",
        "bg-transparent",
        tone === "clinic" ? "border-white/15" : "border-accent-gold/30",
        className
      )}
      style={style}
    >
      <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-white/45 uppercase sm:text-sm">
        {tone === "home" && (
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent-gold" />
        )}
        {eyebrow}
      </p>
      <div className={cn("h-auto w-full max-w-[320px] sm:max-w-[380px]", tone === "clinic" ? "text-white/80" : "text-accent-gold")}>
        {children}
      </div>
      <div>
        <p className="text-xl font-semibold text-white sm:text-2xl">{title}</p>
        <p className="mt-1.5 text-base text-white/60 sm:text-lg">{caption}</p>
      </div>
    </div>
  );
}

function ClinicCard({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <SceneCard
      tone="clinic"
      eyebrow="Today"
      title="Life around the clinic"
      caption="Roughly three trips a week, plus the road between them."
      className={className}
      style={style}
    >
      <Hospital
        aria-hidden="true"
        strokeWidth={1.5}
        className="mx-auto size-28 sm:size-32"
      />
    </SceneCard>
  );
}

function HomeCard({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <SceneCard
      tone="home"
      eyebrow="With the X-1"
      title="A quiet night at home"
      caption="The cycler runs on its own while the household sleeps."
      className={className}
      style={style}
    >
      <Image
        src="/images/x1-apd-cycler.png"
        alt="The Byonyks X-1 automated peritoneal dialysis cycler, screen powered on and ready to start a cycle"
        width={910}
        height={518}
        className="h-auto w-full"
        sizes="(min-width: 640px) 380px, 320px"
      />
      <p className="mt-2 text-xs text-white/40">
      </p>
    </SceneCard>
  );
}

export function AccessGeometrySceneScrubbed() {
  return (
    <div className="relative min-h-[480px] w-full max-w-lg sm:min-h-[600px] sm:max-w-2xl">
      {/* Clinic card: starts front and center, scales down, drifts up and
          left, and rotates slightly negative as it recedes toward the back
          of the stack — a card being swiped away, not a fade. Opacity runs
          the full 1-to-0 range (not a partial range with a visible floor)
          so it is completely transparent, not just faded, once the home
          card has fully taken over. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ClinicCard
          className="w-full"
          style={{
            transform:
              "scale(calc(1 - var(--p, 0) * 0.22)) translateY(calc(var(--p, 0) * -52px)) translateX(calc(var(--p, 0) * -22px)) rotate(calc(var(--p, 0) * -5deg))",
            opacity: "calc(1 - var(--p, 0))",
            zIndex: 1,
          }}
        />
      </div>
      {/* Home card: fully transparent at rest (not peeking in), then grows,
          settles, and un-rotates into full view as it takes the front of
          the stack. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <HomeCard
          className="w-full"
          style={{
            transform:
              "scale(calc(0.84 + var(--p, 0) * 0.16)) translateY(calc((1 - var(--p, 0)) * 36px)) rotate(calc((1 - var(--p, 0)) * 3deg))",
            opacity: "var(--p, 0)",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}

export function AccessGeometrySceneStatic() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <ClinicCard />
      <HomeCard />
    </div>
  );
}
