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
// Per-word displacement for the clinic title, in px and degrees. A fixed table
// rather than anything generated: this component server-renders, so a random
// value would differ on the client and tear on hydration. Five entries, which
// is coprime with neither of the two titles' word counts by accident — it just
// has to be long enough that a four-word line does not fall into a visible
// repeat.
const CLINIC_JITTER = [
  { y: -5, r: -2.2 },
  { y: 6, r: 1.6 },
  { y: -3, r: 2.4 },
  { y: 5, r: -1.5 },
  { y: -6, r: 1.9 },
];

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
      {/* white/60, not white/45 (fixed 26 Aug 2026): measured at 4.29:1 against
          the ink card ground, just under WCAG 1.4.4's 4.5:1 for 14px text.
          This audience skews older with diabetes-related visual impairment, so
          PRODUCT.md's rule is to take the stricter option — /60 measures
          6.08:1 and the label still reads as a quiet marker, not a heading. */}
      <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-white/60 uppercase sm:text-sm">
        {tone === "home" && (
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent-gold" />
        )}
        {eyebrow}
      </p>
      <div className={cn("h-auto w-full max-w-[320px] sm:max-w-[380px]", tone === "clinic" ? "text-white/80" : "text-accent-gold")}>
        {children}
      </div>
      <div>
        {/* THE TITLE IS THE POINT OF THE CARD, so it is set at DESIGN.md's
            Headline role (700) rather than its Title role (600, 1.125rem).
            These two lines are the whole argument of the opening — "roughly
            three trips a week" against "the household sleeps" — and at
            `text-xl font-semibold` they were the fourth thing the eye reached,
            after the eyebrow, the image and the card's own edge.

            CHAOS AND ORDER ARE SET, NOT COLOURED. The obvious move is tinting
            the two titles apart, and it is unavailable twice over: the Accent
            Ration Rule keeps every accent off text at this size, and the
            Wayfinding Rule has already spent gold on "home / India" as the
            card's identity. So the contrast is carried by arrangement, which
            also survives monochrome and never makes colour the sole carrier of
            the distinction — the words themselves already say which is which. */}
        {tone === "clinic" ? (
          <p className="text-2xl font-bold tracking-tight text-balance text-white sm:text-3xl lg:text-4xl">
            {/* Every word knocked off the line it should be on. Displacement
                and rotation are per-word and FIXED, never generated — this
                renders on the server, and a random offset would hydrate to a
                different value and tear.

                Kept deliberately small: ±6px and under 2.5deg. This audience
                skews older with diabetes-related visual impairment, so the
                word has to stay a word. Baselines stay horizontal and the
                spaces between words are real text nodes, so the line still
                wraps normally and a screen reader still reads one sentence. */}
            {title.split(" ").map((word, i) => {
              const jitter = CLINIC_JITTER[i % CLINIC_JITTER.length];
              return (
                <span key={`${word}-${i}`}>
                  {i > 0 ? " " : null}
                  <span
                    className="inline-block"
                    style={{
                      transform: `translateY(${jitter.y}px) rotate(${jitter.r}deg)`,
                    }}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
          </p>
        ) : (
          <p className="text-2xl font-bold tracking-tight text-balance text-white sm:text-3xl lg:text-4xl">
            {title}
          </p>
        )}

        {/* Order, stated once: a 1px gold rule under the home title and
            nothing under the clinic one. This is `AccentRail`'s grammar and
            gold's fixed meaning — "home / India" — not a flourish, and it sits
            BELOW the heading because a coloured mark above one is a kicker,
            which this system rejects outright. `aria-hidden`: the distinction
            is already in the words. */}
        {tone === "home" ? (
          <span
            aria-hidden="true"
            className="mx-auto mt-4 block h-px w-16 bg-accent-gold"
          />
        ) : null}

        <p className="mt-4 text-base text-white/60 sm:text-lg">{caption}</p>
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
        // `size-*` is rem-based, so at 200% text this decorative glyph grew to
        // 224px and pushed a 320px viewport 17px sideways. It is an
        // illustration, not type: it carries no information that gets easier to
        // read when it doubles, and WCAG 1.4.4 is about text. Capping the
        // rendered box keeps the reflow clean while leaving the icon free to
        // scale at every width where there is room for it.
        className="mx-auto size-28 max-h-[40vw] max-w-[40vw] sm:size-32"
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
    // `overflow-hidden` bounds the composition to its own frame. Both cards
    // carry a rest-state rotation, and a rotated box is wider than an
    // upright one by (height x sin(angle)) — so the taller the card grows,
    // the further its corners bleed sideways. At 200% text on a 320px
    // viewport that bleed reached 17px past the viewport and scrolled the
    // whole document. Clipping costs nothing visible: each card is at its
    // maximum rotation exactly when its opacity is at or near zero, and the
    // cards are `inset-0` children designed to live inside this frame.
    <div className="relative min-h-[480px] w-full max-w-lg overflow-hidden sm:min-h-[600px] sm:max-w-2xl">
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
