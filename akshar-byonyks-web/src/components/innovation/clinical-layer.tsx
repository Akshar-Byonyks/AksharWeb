import { ChevronDown } from "lucide-react";

// Spec §9.2, `/innovation/how-it-works/`: "Two-layer content: plain language
// for patients, expandable technical layer for clinicians." This is the second
// layer, and it is a native <details>/<summary> — CLAUDE.md prefers the native
// element over a shadcn primitive over a hand-rolled control, and this is the
// case where the native one wins outright: it opens with no JavaScript, it is
// keyboard- and screen-reader-operable with no ARIA of our own, and it
// survives a failed client bundle. The patient audience is described in
// PRODUCT.md as majority mobile and often bandwidth-constrained; a disclosure
// widget that needs 8kB of React to open would be the wrong trade here.
//
// Collapsed by default on purpose. Priority 2 (patients) is the register this
// page is written in, and Priority 3 (clinicians) is the one that goes looking
// — the layer that has to be sought is the one whose reader will seek it.
//
// Teal, under DESIGN.md's Wayfinding Rule, because teal means "clinical
// evidence" sitewide and that is exactly what this disclosure holds. It is a
// label chip and a small icon, never body text, so the Accent Ration Rule is
// satisfied at the same time.
export function ClinicalLayer({
  summary,
  children,
}: {
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group mt-6 rounded-lg border border-line bg-card">
      {/* `list-none` plus the webkit marker reset removes the platform
          triangle so the chevron is the only affordance; without both, Safari
          and Chromium disagree and one of them draws two.

          py-3.5 on a text-sm line box is a 48px target — well past WCAG
          2.5.8's 24px, and sized as a real button because on a phone this is
          the one thing on the section a reader has to hit deliberately. */}
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-5 py-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">
          <span className="block text-xs font-semibold tracking-wide text-teal uppercase">
            For clinicians
          </span>
          <span className="mt-0.5 block text-sm font-semibold text-ink">
            {summary}
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>
      <div className="border-t border-line px-5 py-4 text-base text-muted-foreground">
        {children}
      </div>
    </details>
  );
}
