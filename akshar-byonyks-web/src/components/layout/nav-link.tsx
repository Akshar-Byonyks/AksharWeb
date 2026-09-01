"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

// Added 26 Aug 2026. The sitewide critique found the header gave no indication
// of where you were — Nielsen heuristic 1, and the one thing breadcrumbs on the
// inner pages could not fix, since Home has no breadcrumb and the header is the
// only persistent locator.
//
// A client island rather than a client header: CLAUDE.md's standing rule is
// Server Components by default, and `usePathname` is the only reason any of
// this needs the client. Scoping it to the link keeps `SiteHeader` a Server
// Component and ships one small shared component rather than the whole nav.
//
// `aria-current="page"` is the load-bearing half. The colour and weight change
// is for sighted users; colour alone would violate the project's own
// "colour is never the sole carrier of meaning" constraint, so the active link
// also gains font-semibold and the tinted background the hover state uses.
export function NavLink({
  href,
  children,
  className,
  activeClassName = "bg-surface-2 font-semibold text-ink",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}) {
  const pathname = usePathname();

  // A section parent counts as current for its children: /innovation is the
  // active trail when you are on /products/the-x1-cycler. Exact match alone
  // would leave the header blank on every inner page, which is precisely the
  // case the critique flagged.
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(className, isActive && activeClassName)}
    >
      {children}
    </Link>
  );
}
