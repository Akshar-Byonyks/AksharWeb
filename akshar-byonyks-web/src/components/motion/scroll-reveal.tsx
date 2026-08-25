"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

// Staggered cascade-on-scroll-into-view, shape brief's motion amendment for
// the benefit cards (§9.1 row 4) and audience cards (row 6). IntersectionObserver
// rather than a scroll library.
//
// PROGRESSIVE ENHANCEMENT (24 Aug 2026). This used to render its children at
// `opacity: 0` and rely on JavaScript to bring them back, which made the
// animation load-bearing for *content*. With the client bundle blocked, slow
// or failed, ten blocks on the X-1 page — the specification, both regulatory
// panels, the IFU request and the closing CTA — stayed permanently invisible
// even though the server had already sent the markup. PRODUCT.md describes the
// patient audience as majority mobile and often bandwidth-constrained, so that
// is precisely the population that paid for it.
//
// The default is now the finished state: the server renders every child fully
// visible with no transition attached, and that is also what a reader without
// JavaScript keeps. The animation is added afterwards, by the client, and only
// to elements the reader cannot see yet.
//
//   1. On mount, an element still below the reveal boundary is hidden. No
//      transition is attached at that point, so it snaps rather than fading
//      out — and it is off-screen either way.
//   2. One frame later the transition is armed, so the *entry* animates while
//      that initial hide never did.
//   3. Anything already on screen at mount is left visible and simply
//      observed. Animating content the reader has already been looking at was
//      never the intent, and hiding it first would be a real flash.
//
// One tree, rendered in its visible state, progressively enhanced — no
// duplicated markup for a no-JS path.
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
  // `visible` starts true so the server-rendered markup *is* the visible
  // state. `armed` gates the transition separately, so the client's first
  // hide is instant and only what follows it animates.
  const [visible, setVisible] = useState(true);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // The same line the observer uses: viewport height less the 10% the
    // rootMargin insets. Measured at mount rather than assumed, so a reload
    // that restores scroll position mid-page correctly treats what is on
    // screen as on screen and leaves it alone.
    const boundary = window.innerHeight * 0.9;
    if (node.getBoundingClientRect().top >= boundary) setVisible(false);

    const frame = requestAnimationFrame(() => setArmed(true));

    // `threshold: 0` is edge entry, not a visible-area ratio: the reveal fires
    // when the element crosses the root boundary, which the negative bottom
    // margin already insets to 90% of the viewport. The trigger carries no
    // term for the element's own height.
    //
    // `threshold: 0.2` did, and it was a trap for tall children: an element
    // more than five times the inset root can never expose 20% of itself at
    // once, so the ratio never crosses, no callback after the initial one ever
    // fires, and the element sticks. At 200% text the X-1 specification and
    // regulatory sections measure ~4300px against a ~760px root — a ceiling of
    // 0.177 — and both were invisible to exactly the readers who set text that
    // large. Fixed in the primitive because any wrapper around a whole section
    // rather than a card is one text-size step from the same failure.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        // Transition classes only exist once the client has taken over. Before
        // that there is nothing to animate, because nothing is hidden.
        armed && [
          "transition-[opacity,transform] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
          variant === "rise" ? "duration-700" : "duration-[600ms]",
        ],
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
