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
    <html lang="en" className={notoSans.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
