import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

// The two-state scene shared by both the scroll-scrubbed hero (motion-safe)
// and the static side-by-side fallback (motion-reduce / no-JS). "After" (a
// quiet home night) is Byonyks USA's own official X-1 product render, the
// same asset already used in "Our answer."
//
// "BEFORE" IS A PHOTOGRAPH AGAIN, AND THIS TIME OF THE RIGHT THING
// (11 Sep 2026, client instruction: the scrolling cards should carry a real
// image). The history is worth keeping, because this slot has now held four
// different answers and three of them were wrong for reasons that are easy
// to repeat:
//
//   Revision 5 (20 Aug 2026) replaced a drawn house/bed/lamp scene with the
//   X-1 render on the home card.
//   Revision 6 ran a real hemodialysis-machine photo here and it was pulled
//   on 23 Aug: cropped to the gauges, it read as "the control panel" rather
//   than "the routine", which is what the retitled card is about.
//   Revision 7 fell back to a lucide "Hospital" glyph — DESIGN.md's default
//   for a concept with no real, rights-clear image. CLAUDE.md has since
//   inverted that default ("reach for a real image first", 28 Aug 2026), and
//   line art is now the fallback rather than the resting state.
//   Revision 8 is this one: a photograph of a hospital ward in Kolkata, with
//   patients in beds and a family member sitting with each of them.
//
// WHY THIS FRAME AND NOT A MACHINE OR A BUILDING. The card says "roughly
// three trips a week, plus the road between them", and the subject of that
// sentence is a household, not equipment. Two other candidates were
// downloaded and rejected on sight — a heritage hospital dome that reads as
// a monument, and an ambulance bay at night that reads as an emergency —
// both recorded in public/images/README.md, which also carries the DMR Act
// flag this image is filed under.
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

            CHAOS AND ORDER ARE NOT SET IN THE TYPE AT ALL. Two earlier
            attempts are worth recording so neither is tried again. Tinting the
            titles apart is unavailable twice over: the Accent Ration Rule keeps
            every accent off text at this size, and the Wayfinding Rule has
            already spent gold on "home / India" as the card's identity. And
            knocking each word of the clinic title off its baseline — a fixed
            per-word translate and rotate, which shipped here for five days —
            was removed on request (31 Aug 2026). It made the one title on the
            card that has to be read hardest to read, on a page whose audience
            skews older with diabetes-related visual impairment.

            What is left is the honest carrier: the words themselves say which
            is which, the eyebrow says when, and the gold rule below marks the
            home card. All three survive monochrome, and none of them asks the
            reader to decode a typographic gesture. */}
        <p className="text-2xl font-bold tracking-tight text-balance text-white sm:text-3xl lg:text-4xl">
          {title}
        </p>

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
      {/* FRAMED, UNLIKE THE X-1 RENDER OPPOSITE, and the asymmetry is
          correct rather than an oversight. That render is a transparent PNG
          with its own silhouette, so a frame round it would draw a box that
          is not there. This is a rectangular photograph on a dark ground,
          and an unframed rectangle bleeding into the Silk background reads
          as a rendering error. The border is white/15 — the same value the
          clinic card's own edge carries, so the photo sits inside the card's
          language rather than introducing a second one.

          No scrim and no ScrimmedImage: spec §7.2 requires the scrim where
          text sits OVER an image, and nothing does here. The caption and the
          title are on the card, above and below the frame. */}
      {/* IN COLOUR SINCE 11 SEP 2026, on the client's instruction, and the
          swap cost this card something worth writing down.

          It was a black-and-white ward in Kolkata, chosen partly BECAUSE it
          was monochrome: the note in public/images/README.md argued that a
          colour ward photo competes with the gold on the home card while a
          grey one reads as the "before" state without spending an accent.
          That reasoning was sound and it is now overruled, which is the
          client's call to make.

          What replaces it is a consulting room rather than a ward, and that
          is the part that is not a like-for-like. The old frame showed the
          ACCOMPANIMENT — the relative sitting with each patient, which is the
          half of the in-centre cost that appears in no tariff. Nothing in the
          colour pool on the sanctioned libraries carried that and was also
          India, unbranded and clean on the 1954 Act. So the accompaniment
          argument now lives only in prose, on /innovation/market, which is
          where its figures are anyway.

          What the swap gained, beyond colour: the patient's face is turned
          away, so unlike the frame it replaces nobody receiving care here is
          identifiable. See the README entry for what that does and does not
          do to the Drugs and Magic Remedies Act 1954 flag. */}
      <div className="overflow-hidden rounded-xl border border-white/15">
        <Image
          src="/images/clinic-consult-kashmir.jpg"
          alt="A doctor in a consulting room takes a seated patient's blood pressure with a cuff and stethoscope. A desk with an anatomical model of a knee joint stands between them."
          width={1600}
          height={1067}
          className="h-auto w-full"
          sizes="(min-width: 640px) 380px, 320px"
        />
      </div>
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
