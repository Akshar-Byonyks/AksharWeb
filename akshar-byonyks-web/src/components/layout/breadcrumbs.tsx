import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteUrl } from "@/lib/site-config";

// Spec §7.2: breadcrumbs on every page except Home. Spec §11.2: they emit
// `BreadcrumbList` structured data. Both jobs live here so a page cannot
// ship the visible trail and forget the markup, or vice versa.
//
// Server component — a trail of links has no interactive state.
//
// `href` is optional on purpose. This is page two of fourteen, so a real
// trail can legitimately pass through a hub that is not built yet: an
// hrefless crumb renders as plain text rather than as a link to a 404, and
// it is also omitted from the structured data's `item` (a `BreadcrumbList`
// pointing search engines at a missing URL is worse than one that leaves the
// position unlinked). Adding the route later means adding `href` here and
// nothing else.
export type Crumb = { name: string; href?: string };

export function Breadcrumbs({
  items,
  tone = "light",
  className,
}: {
  /** Ancestors only, in order. "Home" is prepended and the current page is the last item. */
  items: Crumb[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const trail: Crumb[] = [{ name: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(({ name, href }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      ...(href ? { item: `${siteUrl}${href === "/" ? "" : href}` } : {}),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol
          className={cn(
            "flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm",
            tone === "dark" ? "text-white/60" : "text-muted-foreground"
          )}
        >
          {trail.map(({ name, href }, index) => {
            const isCurrent = index === trail.length - 1;
            return (
              <li key={name} className="flex items-center gap-x-1.5">
                {index > 0 ? (
                  <ChevronRight
                    className={cn(
                      "size-3.5 shrink-0",
                      tone === "dark" ? "text-white/40" : "text-line"
                    )}
                    aria-hidden="true"
                  />
                ) : null}
                {isCurrent ? (
                  <span
                    aria-current="page"
                    className={tone === "dark" ? "text-white/90" : "text-ink"}
                  >
                    {name}
                  </span>
                ) : href ? (
                  <Link
                    href={href}
                    // `py-1` is a hit-area decision, not spacing: at the label's
                    // own height these links measured 20px tall, under the 24px
                    // floor. WCAG 2.1 AA does not require it, but this
                    // audience skews older with diabetes-related visual
                    // impairment, and PRODUCT.md says to default to the
                    // stricter option when that population carries the cost.
                    className={cn(
                      "rounded-sm py-1 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2",
                      tone === "dark"
                        ? "hover:text-white focus-visible:outline-white"
                        : "hover:text-ink focus-visible:outline-ring"
                    )}
                  >
                    {name}
                  </Link>
                ) : (
                  // Ancestor whose route does not exist yet. Plain text, not
                  // a link to nowhere.
                  <span>{name}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
