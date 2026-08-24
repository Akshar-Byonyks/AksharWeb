"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

// Staggered cascade-on-scroll-into-view, shape brief's motion amendment for
// the benefit cards (§9.1 row 4) and audience cards (row 6). IntersectionObserver
// rather than a scroll library.
//
// Repeats on every entry, not one-shot (20 Aug 2026, requested by name):
// scrolling down reveals each element, scrolling back up past it resets it
// (it exits the intersection root, same observer callback, no unmount
// involved), and scrolling down again replays the reveal exactly as the
// first pass did. The observer is never disconnected except on unmount —
// `setVisible` just tracks `entry.isIntersecting` directly.
//
// Two variants: "rise" (translate-y + opacity) for cards appearing as a
// list — the default. "settle" (scale + opacity) for a single focal
// element easing into place, used once for the X-1 render in Our Answer;
// reusing "rise" everywhere would flatten every section into the same
// generic scroll-reveal animate.md warns against.
export function ScrollReveal({
  children,
  delayMs = 0,
  variant = "rise",
  className,
}: {
  children: React.ReactNode;
  delayMs?: number;
  variant?: "rise" | "settle";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // `threshold: 0` is edge entry, not a visible-area ratio: the reveal fires
    // the moment the element crosses the root boundary, which the negative
    // bottom margin already insets to 90% of the viewport. The trigger
    // condition carries no term for the element's own height.
    //
    // `threshold: 0.2` did carry one, and it was a trap for tall children. An
    // element more than five times the inset root can never expose 20% of
    // itself at once, so the ratio never crosses the threshold, no callback
    // after the initial one ever fires, and the element stays at `opacity: 0`
    // permanently. At 200% text on a 390px viewport the X-1 specification and
    // regulatory sections measure ~4300px against a ~760px root — a ceiling of
    // 0.177 — so both were invisible to precisely the readers who set text
    // that large. Any wrapper around a whole section rather than a card is one
    // text-size step from the same failure, which is why this is fixed in the
    // primitive and not in those two callers.
    //
    // Behaviour delta for short children: a card no longer waits for a fifth
    // of itself to clear the boundary, so it reveals a few tens of pixels
    // earlier. The cascade, the stagger and the easing are untouched.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        variant === "rise" ? "duration-700" : "duration-[600ms]",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : cn(
              "opacity-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100",
              variant === "rise" ? "translate-y-6" : "scale-[0.96]"
            ),
        className
      )}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
