import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/header";
import { siteUrl } from "@/lib/site-config";

// Spec Section 6: Noto Sans for both display and text roles — one family,
// self-hosted, Devanagari subset included from day one for the Hindi roadmap.
const notoSans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin", "devanagari"],
  weight: ["400", "600", "700"],
});

// metadataBase makes every per-page `alternates.canonical` and Open Graph URL
// resolve absolute, which spec §11.2 requires on every page. The title
// template gives child routes "<page> | Akshar Byonyks" without each one
// repeating the suffix; `default` keeps Home exactly as it was.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Akshar Byonyks",
    template: "%s | Akshar Byonyks",
  },
  description: "Site under development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={notoSans.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        {/* WCAG 2.4.1 Bypass Blocks. The landmark set alone technically
            satisfies it (technique ARIA11), but the sticky header repeats five
            nav items and a CTA ahead of the content on every route, and
            PRODUCT.md's standing instruction for this audience is to take the
            stricter option.

            Parked off-screen with a transform rather than `sr-only` +
            `focus:not-sr-only`: both of those emit a `position` declaration at
            the same specificity, so which one wins depends on Tailwind's
            emitted source order rather than on anything stated here. A
            translate keeps the link in the layout, in the a11y tree and
            focusable at all times, and the reveal is then unambiguous.

            `z-100` clears the header's `z-50`; without it the link slides in
            behind the sticky bar it exists to bypass. */}
        <a
          href="#main-content"
          className="fixed top-0 left-0 z-100 -translate-y-full rounded-b-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-ring motion-reduce:transition-none"
        >
          Skip to main content
        </a>
        <SiteHeader />
        {/* `tabIndex={-1}` so the fragment jump moves focus into the region
            itself, not merely the scroll position — Safari and older WebKit
            need it. It is a landmark rather than a control, so it takes no
            focus ring of its own. */}
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
