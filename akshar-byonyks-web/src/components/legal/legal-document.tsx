import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SilhouetteEdge } from "@/components/layout/silhouette-edge";
import { siteContact } from "@/lib/site-config";

// The shared shell for the five legal and policy documents: privacy, terms,
// cookies, grievance redressal and accessibility.
//
// Extracted 30 Aug 2026, when the other four were built. The privacy policy
// had grown a good structure — ink header, sticky section index beside a
// measure-limited column, plain `Section` blocks with `scroll-mt` so an anchor
// jump clears the sticky header — and the alternative was five copies of it.
// Five copies of a layout is how a heading gets renamed on one page and not the
// other four, and how one document quietly stops matching the rest.
//
// READ MODE, and the same reasoning the privacy policy wrote down: these are
// read by people deciding whether to trust a medical site, or by someone who
// needs to complain and needs to find out how. Structure for comprehension,
// one measured column, no cards and no decoration on a legal document.

export type LegalSectionRef = { id: string; title: string };

export function LegalPage({
  title,
  breadcrumb,
  standfirst,
  lastUpdated,
  sections,
  children,
}: {
  title: string;
  /** Defaults to the visible title when the crumb should read the same. */
  breadcrumb?: string;
  standfirst: string;
  lastUpdated: string;
  sections: readonly LegalSectionRef[];
  children: React.ReactNode;
}) {
  return (
    <>
      <section aria-labelledby="legal-heading" className="bg-ink">
        <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-14 sm:px-6 lg:px-8">
          <Breadcrumbs tone="dark" items={[{ name: breadcrumb ?? title }]} />
          <h1
            id="legal-heading"
            className="mt-10 max-w-3xl text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">{standfirst}</p>
          <p className="mt-4 text-sm text-white/60">Last updated {lastUpdated}</p>
        </div>
      </section>

      <section aria-labelledby="legal-body-heading" className="bg-background">
        <h2 id="legal-body-heading" className="sr-only">
          {title} in full
        </h2>
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,75ch)] lg:justify-center lg:gap-16 lg:px-8 lg:py-20">
          {/* Index first in source order as well as on screen: a keyboard or
              screen-reader user meets the contents before the document, which
              is the same order a sighted reader gets. */}
          <SectionIndex sections={sections} />
          <div>{children}</div>
        </div>
      </section>

      <SilhouetteEdge />
    </>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    // scroll-mt clears the sticky header when a section index link jumps here,
    // otherwise the heading lands underneath it.
    <section id={id} className="mt-12 scroll-mt-24 first:mt-0">
      <h2 className="text-2xl font-bold text-balance text-ink">{title}</h2>
      <div className="mt-3 space-y-4 text-base text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

// The sitewide critique measured the privacy policy using 43% of a 1440px
// viewport — a correct 622px measure centred in 818px of empty white either
// side. The measure is right and stays; what was missing was anything in the
// space beside it. On a long legal document a reader genuinely wants to jump to
// "Your rights", so the empty column earns a use rather than being filled.
//
// Plain anchor links, no JS: no scroll-spy, no active-section tracking. The
// value here is the jump, and a client island tracking scroll position on a
// privacy policy would be a cost this page's audience pays for nothing.
export function SectionIndex({
  sections,
}: {
  sections: readonly LegalSectionRef[];
}) {
  return (
    <nav aria-labelledby="legal-index-heading" className="lg:sticky lg:top-24">
      <h2
        id="legal-index-heading"
        className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
      >
        On this page
      </h2>
      <ul className="mt-4 space-y-1">
        {sections.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="block rounded-sm py-1.5 text-sm text-muted-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MailLink({ label }: { label?: string }) {
  return (
    <a
      className="inline-block rounded-sm py-1 font-semibold text-primary underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      href={`mailto:${siteContact.email}`}
    >
      {label ?? siteContact.email}
    </a>
  );
}

export function InternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-block rounded-sm py-1 font-semibold text-primary underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {children}
    </Link>
  );
}
