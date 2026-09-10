import Link from "next/link";
import { Languages } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { DocumentGrid, GridBlock } from "@/components/layout/document-grid";
import { SilhouetteEdge } from "@/components/layout/silhouette-edge";

// The shared shell for the Hindi track.
//
// THE NOTICE IS THE POINT, and it sits above the content rather than at the
// foot of it. This site marks machine-generated captions on every ByoTalks
// player before the video, for the same reason and in the same words: a
// reader deciding whether to trust a medical page needs to know how it was
// made before they read it, not after.
//
// The Hindi here is a translation of approved English copy that no qualified
// medical translator has checked. That is a real limitation on a page whose
// audience is least able to cross-check it, and the honest thing is to say so
// in Hindi, at the top, with a link to the English. It is the same standing
// gap `claims-ledger.ts` carries as `pending-hindi-review`.
//
// NOT AN EYEBROW. The notice is a bordered block above the `h1`, not a label
// stacked on the heading — DESIGN.md rejects kickers and the craft floor bans
// them outright. This is a distinct piece of content with its own border and
// its own subject, which is what a notice is.
export async function HindiShell({
  titleKey,
  standfirstKey,
  englishHref,
  breadcrumb,
  children,
}: {
  titleKey: "home.title" | "pd.title";
  standfirstKey: "home.standfirst" | "pd.standfirst";
  /** The English page this one translates. Also the `hreflang` counterpart. */
  englishHref: string;
  breadcrumb: { name: string; href?: string }[];
  children: React.ReactNode;
}) {
  const t = await getTranslations({ locale: "hi" });

  return (
    <>
      <section aria-labelledby="hi-heading" className="bg-ink">
        <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <Breadcrumbs tone="dark" items={breadcrumb} />

          {/* The translation notice, in the semantic amber this site uses for
              everything it has not finished. Dashed border, same as every
              other declared gap. */}
          <div className="mt-8 max-w-2xl rounded-lg border border-dashed border-pending-on-ink/40 bg-white/5 px-4 py-3">
            {/* NOT font-mono, and no tracking, unlike every other status
                label on this site. The mono stack (ui-monospace, SFMono,
                monospace) carries no Devanagari, so the browser substitutes an
                arbitrary fallback face and the label stops belonging to the
                system it is supposed to signal. Letter-spacing is worse than
                cosmetic here: Devanagari conjuncts and the matra above the
                line are positioned relative to the glyphs they attach to, and
                tracking pulls them apart. Noto Sans ships the Devanagari
                subset on this site already, so the label uses it at the same
                size and weight — the register is carried by size, weight and
                colour instead of by the face. */}
            <p className="flex items-center gap-1.5 text-xs font-semibold text-pending-on-ink">
              <Languages className="size-3.5 shrink-0" aria-hidden="true" />
              {t("notice.label")}
            </p>
            <p className="mt-1.5 text-sm text-white/85">{t("notice.body")}</p>
            <p className="mt-2">
              <Link
                href={englishHref}
                lang="en"
                className="tap-target rounded-sm text-sm font-semibold text-white underline underline-offset-2 hover:text-pending-on-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t("common.switchToEnglish")}
              </Link>
            </p>
          </div>

          <div className="mt-10 max-w-3xl">
            <h1
              id="hi-heading"
              className="text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl"
            >
              {t(titleKey)}
            </h1>
            <p className="mt-6 text-xl text-white/75">{t(standfirstKey)}</p>
          </div>
        </div>
      </section>

      {children}

      {/* The medical disclaimer closes every Hindi page, as it closes every
          patient-facing English one. Drugs and Magic Remedies (Objectionable
          Advertisements) Act 1954: educational only, no outcome promises,
          treatment decisions routed to a physician. */}
      <section aria-labelledby="hi-disclaimer-heading" className="bg-surface-2">
        <DocumentGrid className="py-14">
          <h2 id="hi-disclaimer-heading" className="sr-only">
            {t("common.notMedicalAdvice")}
          </h2>
          <GridBlock>
            <p className="text-base text-muted-foreground">
              {t("common.notMedicalAdvice")}
            </p>
          </GridBlock>
        </DocumentGrid>
      </section>

      <SilhouetteEdge />
    </>
  );
}
