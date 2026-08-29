"use client";

import { useEffect, useRef, useState } from "react";

// The trigger for the two figure animations on `/innovation/how-it-works/`.
// Sets `data-pd-cycle="playing"` on its wrapper while the figure is on screen;
// every keyframe in globals.css hangs off that attribute.
//
// Deliberately not a scroll-scrubbed interaction. DESIGN.md's test for a
// fourth of those — name what only scroll can do here — these figures fail:
// an exchange is a cycle of three states a reader needs to compare at once,
// and the day/night strips are a before-and-after. Neither wants the reader's
// wheel as its timeline. What they want is to be *seen happening*, once.
//
// Why an attribute rather than a class: it toggles cleanly, and removing it on
// exit tears the animation down so re-entry restarts it from the beginning
// rather than finding it already finished. That matches ScrollReveal, which
// was changed to repeat on 20 Aug 2026 for the same reason — a reader who
// scrolls back up should see the same page they scrolled down through.
//
// PROGRESSIVE ENHANCEMENT. The attribute is absent on the server, with no
// JavaScript, and under `prefers-reduced-motion`. In all three the figure
// renders in its finished, authored pose — the fluid at the level each panel's
// label describes, the transfer arrows drawn, the night band full width. There
// is no state in which the animation is what makes the figure legible, which
// is the whole reason it can be an animation at all.
export function InViewStage({
  children,
  className,
  /** Fraction of the figure that must be on screen before it plays. */
  threshold = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // A tall figure on a short viewport can never expose a high ratio of
    // itself — the exchange list stacks to roughly 1,800px on a phone against
    // an 844px viewport, a ceiling of about 0.47 — so the caller's threshold
    // is capped against what this element can actually reach. Same class of
    // bug ScrollReveal hit at `threshold: 0.2` and worth not repeating.
    const reachable = node.getBoundingClientRect().height / window.innerHeight;
    const effective =
      reachable > 0 ? Math.min(threshold, (1 / reachable) * 0.6) : threshold;

    const observer = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: Math.max(0, Math.min(1, effective)) }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} data-pd-cycle={playing ? "playing" : undefined} className={className}>
      {children}
    </div>
  );
}
