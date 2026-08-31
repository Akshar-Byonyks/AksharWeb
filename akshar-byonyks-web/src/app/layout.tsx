import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/layout/footer";
import { AnimatedNav } from "@/components/ui/animated-nav";
import { siteUrl } from "@/lib/site-config";
import { SPLASH_ARM_ID, SPLASH_FAILSAFE_MS, SPLASH_PATH } from "@/lib/splash";

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
        {/* ARMS THE OPENING CURTAIN, AND IS THE ONLY THING THAT DOES.
            `site-splash.tsx` never second-guesses this, so the rule about who
            sees a splash lives in exactly one place.

            IT INJECTS A STYLESHEET RATHER THAN SETTING AN ATTRIBUTE. The first
            build set `data-splash` on <html> and selected on it from
            globals.css. That works and it also logs a React hydration mismatch
            on every first visit, because <html> is React-rendered and the
            server never sent the attribute — and `suppressHydrationWarning`
            did not suppress it under Next 15.5. A <style> element appended by
            hand is owned by nobody, so there is nothing for React to diff.

            Inline and synchronous as the first thing in the body: the rules
            have to be in effect before the header paints, or the visitor sees
            the real page for a frame and then has it covered up — which is
            worse than no splash at all.

            Everything stays inside try/catch even though the only storage
            call is gone: this runs before anything else on the page, and an
            exception here would be an exception before a single other line of
            the site has executed. Failing means no curtain, which is the safe
            side of that coin.

            No JavaScript at all means this never runs, no stylesheet is
            injected, `.site-splash` stays at `display: none`, and the site is
            delivered unobstructed.

            IT ALSO SCHEDULES ITS OWN REMOVAL, and that line is the most
            important one here. The curtain is server-rendered markup held up
            by this stylesheet; the timeout that lifts it normally lives in a
            React effect. Testing found the hole: abort the silk chunk and
            `next/dynamic` throws during render, Home never hydrates, that
            effect never runs, and the curtain stays up forever with nothing
            alive to remove it. Whatever happens to React, this timer does not
            depend on it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(location.pathname!==${JSON.stringify(
              SPLASH_PATH,
            )})return;var s=document.createElement("style");s.id=${JSON.stringify(
              SPLASH_ARM_ID,
            )};s.textContent=".site-splash{display:flex}html,body{overflow:hidden}";document.head.appendChild(s);setTimeout(function(){s.remove()},${SPLASH_FAILSAFE_MS})}catch(e){}})()`,
          }}
        />
        <a
          href="#main-content"
          className="fixed top-0 left-0 z-100 -translate-y-full rounded-b-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-ring motion-reduce:transition-none"
        >
          Skip to main content
        </a>
        {/* Replaced `SiteHeader` site-wide, 31 Aug 2026. Sticky rather than
            `fixed` so it keeps the space in the document the old header held
            — every route's own top spacing still works. `header.tsx` is left
            on disk, unused, so this is one import away from being reverted. */}
        <AnimatedNav />
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
