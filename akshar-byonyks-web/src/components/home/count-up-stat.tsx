"use client";

import { useEffect, useRef, useState } from "react";

// Counts up every time it scrolls into view, and resets so it's ready to
// count up again if the viewer scrolls away and back — reserved for the one
// genuinely numeric proof point ("10,000+"). "510(k)" and "ISO 13485" are
// labels, not quantities, and don't get this treatment; a count-up on a
// non-number would be decoration, not feedback.
export function CountUpStat({
  to,
  durationMs = 1200,
  suffix = "",
  className,
}: {
  to: number;
  durationMs?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const frameRef = useRef<number | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }

    const stopAnimation = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    // No disconnect() on trigger: the observer keeps watching so a later
    // exit-then-re-entry fires again instead of only ever counting up once.
    const observer = new IntersectionObserver(
      ([entry]) => {
        stopAnimation();
        if (!entry.isIntersecting) {
          // Reset rather than leave it at `to`, so re-entry is a count-up
          // again, not a no-op flash of an already-finished number.
          setValue(0);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(to * eased));
          frameRef.current = progress < 1 ? requestAnimationFrame(tick) : null;
        };
        frameRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => {
      stopAnimation();
      observer.disconnect();
    };
  }, [to, durationMs]);

  return (
    <p ref={ref} className={className}>
      {value.toLocaleString("en-IN")}
      {suffix}
    </p>
  );
}
