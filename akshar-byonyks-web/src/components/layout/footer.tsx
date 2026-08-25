import Link from "next/link";

import { footerColumns } from "@/lib/navigation";

// Spec 7.2 / P1 defect fix: max 4 columns, 6 links per column, no team
// roster. Spec 8.1 rule 4: the footer is not a sitemap, so this is
// deliberately curated rather than exhaustive.
//
// Ground: ink, not surface-2 (deviations.md entry 2). The footer is the
// bottom of the site's closing ink mass, which begins at the silhouette edge
// above it — so there is deliberately no `border-t` here. The hairline was
// the system's separation device between a light footer and the section
// above; with both sides ink it would draw a seam across a mass that is
// supposed to read as continuous.
//
// Text inverts accordingly. `text-white/70` on ink measures 8.69:1 and
// `text-white/60` 6.68:1, both clear of the 4.5:1 floor, and the same
// treatment already ships on the CTA band. The focus ring switches from
// `--ring` to white for the same reason it does there: `--ring` is tuned
// against light grounds, and this audience's focus indicators are
// load-bearing (PRODUCT.md), not decorative.
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footerColumns.map((column) => (
            // `min-w-0`: a `1fr` grid track floors at min-content, so a long
            // single word ("Manufacturing", "Grievance Redressal") pushed the
            // column wider than its share instead of wrapping inside it.
            <div key={column.heading} className="min-w-0">
              <h2 className="text-sm font-semibold text-white">{column.heading}</h2>
              {/* The list gap moves into the links themselves. Spacing between
                  labels is preserved; what changes is that the padding belongs
                  to the anchor, so the 24px target is the thing you actually
                  click rather than dead space around it. */}
              <ul className="mt-2 flex flex-col">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block max-w-full py-1.5 text-sm text-white/70 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/60">
          <p>&copy; {year} Akshar Byonyks International LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
