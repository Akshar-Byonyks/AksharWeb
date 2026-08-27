"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { PendingNote } from "@/components/common/pending-note";
import {
  AccessGeometrySceneScrubbed,
  AccessGeometrySceneStatic,
} from "@/components/home/access-geometry-scene";
import { Button } from "@/components/ui/button";

// Code-split: pulls in three.js + @react-three/fiber, so it should never
// land in the server bundle or the initial client chunk for users who don't
// end up rendering it (reduced-motion users never do — see `enhanced` below).
const SilkHeroBackground = dynamic(
  () => import("@/components/home/silk-hero-background"),
  { ssr: false },
);

// Direction: Access-geometry-led (shape session, seed 9814a69c). The hero
// dramatizes the India argument itself — in-center dialysis's weekly trip
// vs. home PD — before any company-credibility content, per §9.1 rows 1–2
// fused into one opening movement. The motion amendment: this is one scene
// redrawn by scroll, not two static images; `prefers-reduced-motion` gets a
// static side-by-side instead of the pinned track, never a frozen mid-point.
const INDIA_GAP_STATS = [
  "Share of India's dialysis patients on in-center haemodialysis vs. home therapies",
  "Average one-way distance patients travel for a haemodialysis session",
  "India's estimated ESKD population currently receiving any form of dialysis",
];

export function AccessGeometryHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: no-preference)");
    setEnhanced(mql.matches);
    const onChange = () => setEnhanced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enhanced) return;
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress =
        total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      track.style.setProperty("--p", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enhanced]);

  return (
    // No overflow-hidden here: it would clip nothing visually today, but it
    // silently breaks position: sticky for the scroll-scrub track below —
    // any ancestor with non-visible overflow kills sticky for descendants.
    //
    // Solid ink, with the hand-off to white moved out into its own fixed-height
    // band below the content (26 Aug 2026). It used to be a percentage gradient
    // across the whole section — ink to 85%, white by 100% — which put the
    // "dialysis gap in India" stat cards, the last block in the section, inside
    // the fade. Their dashed bottom borders dissolved completely and their white
    // label text finished on a near-white ground. A percentage stop cannot know
    // what content lands on it; a fixed band after the content can.
    <section aria-label="Introduction" className="relative bg-ink text-white">
      {/* Silk spans the whole hero — headline, scroll-scrub track, and the
          gap stats — as one continuous canvas behind all three, not a
          separate layer per block. relative only, no overflow-hidden: that
          would break position: sticky on the track below (see the note on
          <section> above), and since this wrapper's height comes entirely
          from its own (in-flow) content, the absolutely-positioned canvas
          layer has a definite height to stretch to without it. */}
      <div className="relative">
        {/* Silk only ever mounts once `enhanced` is true, so reduced-motion
            users get the <section>'s ink-to-white gradient with no motion
            on top of it — a static ground, not a frozen animation frame. */}
        {enhanced ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            // Silk settles into plain ink over its last 15% rather than into
            // white. Since 26 Aug 2026 this wrapper stops at the end of the
            // content, so the mask no longer has to stay in lockstep with a
            // section-wide gradient — it fades the wash out over the stat
            // cards, which land on solid ink, and the ink-to-white hand-off
            // happens in the band below this element entirely.
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
            }}
          >
            <SilkHeroBackground />
          </div>
        ) : null}

        <div className="relative z-10">
          {/* Headline: its own static block, not part of the pinned track. It
              used to share the pinned viewport with the scene, which squeezed
              the cards into whatever space the headline left over and made the
              stack read as an undersized afterthought rather than its own
              moment — reported directly as "does not fit proportionally." */}
          <div className="mx-auto w-full max-w-[1280px] px-4 pt-24 pb-16 sm:px-6 lg:px-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Akshar Byonyks brings Byonyks&rsquo; FDA-cleared home dialysis
              technology to India.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              Licensed from Byonyks USA and cleared by the US FDA under
              510(k) in May 2025, the X-1 automated peritoneal dialysis
              cycler is arriving for India&rsquo;s dialysis patients.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-auto min-h-11 shrink min-w-0 bg-accent-gold px-6 py-2.5 text-base whitespace-normal text-ink hover:bg-accent-gold/85"
              >
                <Link href="/innovation/the-x1-cycler">See how it works</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-auto min-h-11 shrink min-w-0 border-white/30 bg-transparent px-6 py-2.5 text-base whitespace-normal text-white hover:bg-white/10"
              >
                <Link href="/contact">Talk to us</Link>
              </Button>
            </div>
          </div>

          {/* Card-stack section, immediately after the headline. Motion-safe:
              a pinned track (180vh — 80vh of scroll room) so the stack owns a
              full viewport of its own instead of being cropped inside the
              headline's leftover space. Motion-reduce: the same two cards, laid out statically. */}
          {enhanced ? (
            <div
              ref={trackRef}
              // 180vh (26 Aug 2026): 80vh of scroll room, up from 30vh. At
              // 130vh the card swap resolved inside about a third of a flick,
              // which read as a jump-cut rather than a scrub — the stack had
              // finished changing before the eye had time to follow it.
              //
              // It was short because Home carries a second scrubbed scene — the
              // two-path journey in "the night" — and the two have to differ in
              // kind, not just in position. They still do at this length: the
              // journey runs 240vh (140vh of room) and explains at five beats'
              // depth, while this stays the one-gesture opening.
              className="relative h-[180vh]"
              style={{ "--p": 0 } as CSSProperties}
            >
              {/* top-16, not top-0: the site header is its own sticky element
                  at top-0 z-50, so this stage pins just beneath it instead of
                  sliding underneath and being covered. */}
              <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 px-4">
                <AccessGeometrySceneScrubbed />
                {/* Static, not bounced: a moving cue here would compete with
                    the scroll-driven stack itself, the page's one authored
                    motion. */}
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 shrink-0 text-white/40"
                  style={{ opacity: "calc(1 - var(--p, 0))" }}
                />
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8">
              <AccessGeometrySceneStatic />
            </div>
          )}

          <div className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-wide text-white/50 uppercase">
              The dialysis gap in India
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {INDIA_GAP_STATS.map((label) => (
                <PendingNote key={label} label={label} tone="dark" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The ink-to-white hand-off, as its own band outside the content
          wrapper above. Nothing is ever laid over it, which is the whole
          point: a fade is only safe where no text or border has to survive
          it. Height is fixed rather than a percentage of the section so it
          reads the same whether the section is 1,600px or 3,000px tall. */}
      <div
        aria-hidden="true"
        className="h-16 w-full sm:h-24"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--color-ink) 0%, var(--color-background) 100%)",
        }}
      />
    </section>
  );
}
