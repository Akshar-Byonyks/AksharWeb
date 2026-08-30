import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import createNextIntlPlugin from "next-intl/plugin";

// The Hindi track. There is no `[locale]` segment and no middleware — the
// plugin only needs to know where the request config lives, so the two `/hi`
// pages can call `getTranslations({ locale: "hi" })` and the other nineteen
// routes keep the URLs they already have. Reasoning in `src/i18n/request.ts`.
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // /manufacturing/ was built and then retired on 29 Aug 2026 (see
        // deviations.md). byonyks.com carries the same path and partners may
        // have it written down, so it keeps resolving — to the section that
        // absorbed its content, not to a generic page.
        source: "/manufacturing",
        destination: "/innovation/the-x1-cycler#compliance",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

initOpenNextCloudflareForDev();
