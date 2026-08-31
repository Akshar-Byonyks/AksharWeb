import { cn } from "@/lib/utils";

// THE WAYFINDING RAIL.
//
// DESIGN.md fixes each accent's meaning sitewide — gold "home / India", teal
// "clinical evidence", plum "institutional / formal", primary blue the
// regulatory workhorse. Measured on 30 Aug 2026, teal appeared in six places
// across twenty-one routes and plum in five, three and two of those on Home
// respectively. `why-different.tsx` had already named the consequence in its
// own comment: the meanings "get too few exposures to be learnable". A code
// taught once on the home page and then never spoken again is decoration.
//
// This is the shape those further exposures take. It is deliberately the SAME
// form the provenance marks use — a 1px rule and the content set beside it —
// because a reader should meet one margin grammar on this site, not two. What
// differs is the job:
//
//   ProvenanceMark  answers HOW A FACT IS KNOWN.   Four statuses, a label, a
//                   source and a date. It is a citation.
//   AccentRail      answers WHAT KIND OF THING THIS IS. No label and no date,
//                   `aria-hidden` on the rule itself. It is wayfinding.
//
// The two share a palette because they share the same four meanings, which is
// the whole reason the provenance scale could be built without a new hue.
//
// COLOUR IS NEVER THE SOLE CARRIER HERE, and that is what makes the rule
// legitimate at 1px. Everything an `AccentRail` marks is already fully legible
// in text — a clinician's credentials, a company's name. The rail reinforces a
// category a reader can also simply read, so it is marked `aria-hidden` and
// nothing is lost when colour is unavailable.
//
// 1px, never more, on both tones. A thick coloured left border is the craft
// floor's single most-cited tell of generated UI, and it is banned above 1px.
export type AccentRole = "gold" | "teal" | "plum" | "primary";

// On ink the three cool accents switch to their on-ink tints (6.6-7.0:1 on
// `--color-ink`), added 30 Aug 2026 for exactly this. Gold needs no variant:
// it was chosen as an on-ink accent in the first place.
const railColor: Record<AccentRole, { light: string; dark: string }> = {
  gold: { light: "bg-accent-gold", dark: "bg-accent-gold" },
  teal: { light: "bg-teal", dark: "bg-teal-on-ink" },
  plum: { light: "bg-plum", dark: "bg-plum-on-ink" },
  primary: { light: "bg-primary", dark: "bg-primary-on-ink" },
};

export function AccentRail({
  accent,
  tone = "light",
  className,
  children,
}: {
  accent: AccentRole;
  tone?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
}) {
  const rule = railColor[accent];

  return (
    <div className={cn("flex gap-3", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "w-px shrink-0 self-stretch",
          tone === "dark" ? rule.dark : rule.light,
        )}
      />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
