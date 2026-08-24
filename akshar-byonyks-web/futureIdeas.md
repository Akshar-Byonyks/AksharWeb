# Future ideas

Ideas evaluated but not built. Each entry records what was considered, what was
decided, and enough reasoning that the decision does not have to be re-argued
from scratch. Nothing here is committed work — it is a queue with its homework
already done.

---

## 1. Spotlight cards on "What the device does" (X-1 cycler page)

**Date:** 24 Aug 2026. **Where it would land:** `src/components/innovation/x1-features.tsx`, the four-up feature grid. **Status:** not built, ready to build.

### The idea, in one line

**Give each feature card a border that darkens toward primary blue under the
cursor** — a spotlight applied to the card's outline, not to its fill.

### Where it came from

Evaluating two ReactBits components for that grid. Record of both, so neither
gets re-proposed:

| Component | Verdict |
|---|---|
| `BounceCards` | **Rejected.** Renders `images` only — no slot for the icon, heading and body the cards actually carry. Hardcoded `alt={`card-${idx}`}`, fixed `containerWidth/Height` in px, `elastic.out` easing against the system's fixed `cubic-bezier(0.16, 1, 0.3, 1)`, a GSAP dependency the stack does not have, hover-only with no keyboard path, no `prefers-reduced-motion` branch, and `gsap.fromTo('.card', { scale: 0 })` — which starts content invisible and JS-gated, the exact failure mode being removed elsewhere. |
| `SpotlightCard` | **Adapted, not adopted.** Well-made: takes `children`, no dependency, no fixed dimensions, `pointer-events: none` on the overlay, handles `:focus-within`, and never hides content. But it is built for a `#111` card with a white bloom, and every value in it is a hardcoded hex. What survives is the idea, re-implemented on this project's tokens. |

### Why the border and not the fill

The straight inversion — dark radial gradient washing across a light card —
does not work, for two reasons worth writing down:

1. **The metaphor inverts badly.** On a dark surface a light spotlight reads as
   illumination: additive, it reveals. On a light surface a dark gradient reads
   as a shadow or a smudge — the cursor dims whatever it touches. Subtractive
   where the original was additive.
2. **There is nowhere for a fill to go.** `--card` and `--background` are both
   `#ffffff` (`globals.css`). The card fill and the section ground are the same
   white, so the only direction available to a fill effect is *darker*, and a
   dark wash reads as dirt on a page about a cleared medical device.

The border has the opposite problem, which is to say none. The `border-line`
hairline (`#d8e2e8`) is the **only** thing defining these cards against the
white section. Darkening it toward `--color-primary` (`#0d5d8d`) is:

- a wide, legible range — hairline grey to deep blue, not a 6% tint nobody sees;
- **additive in meaning even though it is darker in value** — it strengthens the
  card's own edge rather than staining its surface;
- semantically about *this card* ("the one you are pointing at") rather than an
  ambient decorative wash, which is what keeps it out of animation-debt
  territory;
- already the page's colour logic — primary blue is the workhorse interactive
  colour, and the four feature chips are primary blue, so the border resolving
  toward primary on hover is the existing system responding, not a new hue.

### Implementation sketch

Client component, `src/components/common/spotlight-card.tsx`. The `p-px` plus
`mask-composite: exclude` pair paints the gradient into the 1px ring only, so
the fill stays clean white.

```tsx
"use client";
export function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const onPointerMove = (e: React.PointerEvent) => {
    const node = ref.current;
    if (!node || frame.current !== null) return;
    const { clientX, clientY } = e;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const r = node.getBoundingClientRect();
      node.style.setProperty("--spot-x", `${clientX - r.left}px`);
      node.style.setProperty("--spot-y", `${clientY - r.top}px`);
    });
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove}
         className={cn("group/spot relative rounded-xl border border-line bg-card", className)}>
      <div aria-hidden="true"
           className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity
                      duration-300 group-hover/spot:opacity-100 group-focus-within/spot:opacity-100
                      motion-reduce:transition-none"
           style={{
             background:
               "radial-gradient(220px circle at var(--spot-x,50%) var(--spot-y,50%), var(--color-primary), transparent 70%)",
             mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
             maskComposite: "exclude",
           }} />
      {children}
    </div>
  );
}
```

### Constraints it must hold

- **Tokens only.** The gradient resolves through `var(--color-primary)`; no hex
  enters the component. This is the CI-enforced rule in CLAUDE.md, and the
  reason ReactBits' version could not be used as shipped.
- **rAF-batched pointer handling,** matching `layout/silhouette-edge.tsx`'s
  standard rather than ReactBits' unthrottled `mousemove`. Four of these sit
  side by side; four uncoordinated handlers writing inline custom properties on
  every pointer event is the version that drops frames.
- **Keyboard parity.** `group-focus-within/spot` alongside `group-hover/spot`,
  so tabbing to a card inside the grid lights the same border. The original had
  `:focus-within` almost by accident; here it is deliberate.
- **Decoration only, and it must stay that way.** No information may live in the
  spotlight. Touch users never see it — the Priority-2 patient audience is
  majority mobile — and nothing is lost, which is the condition that makes the
  effect acceptable at all.
- **Degrades to nothing.** `var(--spot-x, 50%)` defaults centre the glow with no
  pointer, and the card renders identically with the overlay absent.

### The objection this does not answer

Recorded so it is not lost: the weakness of that section is **structural, not a
finish problem**. Four same-size boxes of icon + heading + body are the default
page scaffold, and a cursor-following border makes generic cards feel more
expensive without making them less generic. The spotlight is worth building —
it costs little, breaks nothing, and is the correct light-surface form of the
effect — but it should not be mistaken for having addressed the section.

### Also on the table for the same section

**Anchor the four features to the device itself.** They are four properties of
one physical machine, and the real Byonyks render already sits in the hero.
Annotating the device — features placed around it with thin leader lines —
is specific to this product, cannot be truthfully copied by a neighbouring one,
and matches the technical-document register the rest of the page uses. This is
the stronger idea of the two and the one that would actually change the
section's character. It needs a layout decision (`/impeccable shape`) before
code, which is why it is not sketched here.
