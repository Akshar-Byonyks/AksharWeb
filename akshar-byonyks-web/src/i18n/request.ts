import { getRequestConfig } from "next-intl/server";

// Importing for the side effect: the key-drift contract throws at module load
// if en.json and hi.json disagree. This module is loaded on every request that
// resolves a locale, so the check cannot be skipped by rendering only English.
import "@/i18n/messages";

// THE HINDI TRACK — configuration.
//
// WHY THERE IS NO `[locale]` SEGMENT AND NO MIDDLEWARE. The obvious way to add
// a locale to a Next.js App Router site is to move every route under
// `app/[locale]/` and let middleware negotiate. That is the right shape for a
// site that is translated. This one is not: two of twenty-one routes carry
// Hindi, and the other nineteen — the specification table, the compliance
// register, the legal documents, the market case — are not going to be, because
// translating a regulatory position nobody has confirmed yet would multiply the
// risk rather than the reach.
//
// A `[locale]` segment would therefore have put a locale prefix on nineteen
// routes that will never have a second locale, changed every canonical URL and
// every internal link on the site, and done it for two pages. The sitewide
// critique named this exact trade — "every route gains a locale segment; do
// this before the URL structure sets, or don't do it" — and this is the third
// option: a real Hindi track at `/hi`, and twenty English URLs that do not
// move.
//
// next-intl supports this directly. `getTranslations({locale: "hi"})` passes
// the explicit locale through to this function, and the library's own types
// document the case where no segment matched ("a page outside of the
// `[locale]` segment renders"). So the message catalogue, the plural rules and
// the date formatting are all real; only the routing is ours.
//
// WHY A CATALOGUE AT ALL, for two pages. Because the reviewer is a person, not
// a build step. The Hindi on this site has not been checked by a qualified
// medical translator, and when it is, that person needs one file with the
// English and the Hindi side by side — not two JSX files to read around. See
// `messages/hi.json`, and the standing gap in `claims-ledger.ts`.

export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "hi";
}

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // `locale` is set when a page passes one explicitly, which is how every
  // Hindi page on this site resolves. `requestLocale` is the segment value and
  // is `undefined` here, because there is no `[locale]` segment — see above.
  const requested = locale ?? (await requestLocale);
  const resolved: Locale = isLocale(requested) ? requested : defaultLocale;

  return {
    locale: resolved,
    messages: (await import(`../../messages/${resolved}.json`)).default,
  };
});
