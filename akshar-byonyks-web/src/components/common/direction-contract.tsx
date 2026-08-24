// The impeccable direction contract for a surface, rendered as a real HTML
// comment (not a JSX comment) so it survives the production build and stays
// greppable in shipped markup.
//
// Moved out of the root layout on 24 Aug 2026, when the X-1 page became the
// second surface. A contract belongs to one surface, and Home's was being
// emitted on every route the moment a second page existed. Each page renders
// its own now.
export function DirectionContract({ children }: { children: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ display: "none" }}
      dangerouslySetInnerHTML={{ __html: `<!--\n${children.trim()}\n-->` }}
    />
  );
}
