import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { contactCta, primaryNav } from "@/lib/navigation";

// Spec 7.2: sticky header, mega-menu on desktop, full-screen drawer on
// mobile, persistent "Contact us" CTA. Server Component — the only piece
// that needs "use client" is the mobile drawer's open/close state, per the
// 7.2 client-component reference list.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      {/* `min-h-16` rather than `h-16`, plus wrapping. The fixed height held at
          100% text but could not contain the row at 200%, where the wordmark,
          the nav and the CTA together exceed any viewport: the children had
          nowhere to go and pushed the document sideways instead. Wrapping lets
          the header grow downward, which is what reflow means. At normal text
          size nothing moves — the content is ~48px tall inside a 64px
          minimum, so the bar measures exactly the 64px it always did. */}
      <div className="mx-auto flex min-h-16 max-w-[1280px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 rounded-sm text-lg font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Akshar Byonyks
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex flex-wrap items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href} className="group relative">
                <NavLink
                  href={item.href}
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {item.label}
                </NavLink>

                {item.children ? (
                  <div className="invisible absolute left-0 top-full z-10 min-w-[220px] rounded-lg border border-line bg-background p-2 opacity-0 shadow-lg transition-[opacity,visibility] group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavLink
                            href={child.href}
                            className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">
          {/* The Hindi track, 30 Aug 2026. In the header rather than the footer
              because PRODUCT.md's Priority-2 audience is "often reading in a
              second language under stress", and a language switch eight
              thousand pixels down the home page is not a switch. Set in
              Devanagari and marked `lang="hi"` so a screen reader pronounces
              it — a switch labelled in the language you cannot read is the
              standard way this control fails. */}
          <Link
            href="/hi"
            lang="hi"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            हिन्दी
          </Link>
          <Button asChild className="hidden sm:inline-flex">
            <Link href={contactCta.href}>{contactCta.label}</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
