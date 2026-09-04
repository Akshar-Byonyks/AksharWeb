import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/layout/footer";
import { AnimatedNav } from "@/components/ui/animated-nav";
import { siteUrl } from "@/lib/site-config";
import {
  SPLASH_ARM_CSS,
  SPLASH_ARM_ID,
  SPLASH_FAILSAFE_MS,
  SPLASH_PATH,
} from "@/lib/splash";

// Spec Section 6: Noto Sans for both display and text roles — one family,
// self-hosted.
//
// DEVANAGARI IS NOT IN THIS DECLARATION ANY MORE (2 Sep 2026, measured). It
// was, from day one, "for the Hindi roadmap". The roadmap arrived as two
// routes out of twenty-one — and the subset was still being fetched on all
// of them, because next/font preloads every subset it is given.
//
// The numbers, taken against the production build on a 1.6 Mbps / 4x-CPU
// mobile profile: 97 KB of Devanagari on every route, against 35 KB of Latin.
// Outside `/hi` the only Devanagari on this entire site is the nav's
// "हिन्दी" link — five characters, pulling nearly three times the weight of
// every Latin glyph the site uses. It was also arriving late enough to
// reflow the page: the single 0.091 layout shift measured on `/products` was
// the font swapping in at 4.3s.
//
// The subset now loads inside `/hi` only, declared in that route's own
// layout. The nav link falls back to the reader's own Devanagari face —
// Android, iOS, Windows and macOS all ship one, and `globals.css` names them
// explicitly rather than trusting the generic fallback.
const notoSans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// THE CURTAIN NO LONGER LOADS A FACE, AND NOTHING ON THIS SITE IS NOW OUTSIDE
// NOTO SANS (1 Sep 2026, later the same day).
//
// A `Yellowtail` declaration stood here for a few hours, as a recorded
// exception to spec Section 6, so the opening curtain could answer the client
// instruction "change font on loading animation to Byonyks logo font". It has
// been removed, and the exception with it.
//
// WHAT CHANGED. The client sent the actual Byonyks mark and asked whether the
// curtain could look like it. It cannot, with any font: that B is bespoke
// lettering — a flame flourish above it, and a tail that sweeps under the
// whole word — and no typeface contains it. Approximating it was the entire
// premise of the Yellowtail declaration, and the premise was wrong.
//
// So the wordmark became artwork instead: Byonyks' own published logo, traced,
// beside "Akshar" in Pacifico converted to outlines, both in one coordinate
// system in `src/lib/splash-wordmark.ts`. Outlines need no font at the point
// of use, so **a webfont that was loaded on all twenty-one routes to serve one
// decoration on one of them is gone.**
//
// It also closes the failure mode this declaration had to carry: with `swap`,
// the first paint could show cursive-default letterforms and then jump when
// the face arrived. The curtain now renders identically on the server, in the
// first paint and on every frame after.
//
// IF THE REAL LOGO FONT IS EVER SUPPLIED, it does not come back here. It would
// change how `splash-wordmark.ts` is generated, and that recipe lives in
// `public/images/README.md`.

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
  // THE DEFAULT SHARE CARD IS `src/app/opengraph-image.jpg`, NOT A FIELD HERE,
  // and that is the whole trick. Added 1 Sep 2026 with the supplied logo.
  //
  // Putting `openGraph.images` on this object does NOT reach the other routes.
  // Next merges metadata shallowly per top-level key: a page that exports any
  // `openGraph` object at all replaces this one wholesale, so twenty routes
  // that set `openGraph: { title, description, url, type }` and no `images`
  // inherit nothing. Measured, not assumed — with the images declared here,
  // exactly one route emitted an `og:image` and it was Home.
  //
  // The file convention merges by a different rule. Next folds a file-based
  // `opengraph-image` into a layer's metadata whenever that layer has not set
  // `openGraph.images` itself, which is true of every route on this site
  // except the three that carry their own product imagery — and those three
  // still win, which is what should happen.
  //
  // So the card now reaches the eighteen routes that had no image at all, and
  // until today shared to WhatsApp and LinkedIn as a bare title over a blank
  // rectangle. On this audience WhatsApp is the share channel that matters and
  // it is exactly the one that renders a card. `opengraph-image.alt.txt`
  // beside the file carries its alt text.
  //
  // It is the FULL lockup there, not the nav's emblem: a share card has
  // 1200×630 to play with, so the wordmark, the entity name and the tagline
  // are all legible. Contained on white rather than cropped to fill — cropping
  // this artwork to a 1.9:1 frame would cut either the globe or the tagline.
  openGraph: {
    siteName: "Akshar Byonyks",
    locale: "en_IN",
  },
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
            )};s.textContent=${JSON.stringify(
              SPLASH_ARM_CSS,
            )};document.head.appendChild(s);setTimeout(function(){s.remove()},${SPLASH_FAILSAFE_MS})}catch(e){}})()`,
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
