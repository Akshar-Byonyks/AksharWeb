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
        destination: "/products/the-x1-cycler#compliance",
        permanent: true,
      },
      {
        // The X-1 page moved out of /innovation into the new /products
        // section on 1 Sep 2026, on the client's instruction. This path has
        // been the device's URL for the whole build, it is where the
        // /manufacturing redirect above used to land, and it was linked from
        // Home, the Innovation hub, both Innovation children, About Us,
        // ByoTalks and Locations. A permanent redirect keeps every one of
        // those working, along with any link already sent to a partner, and
        // passes the ranking rather than starting the new path from nothing.
        source: "/innovation/the-x1-cycler",
        destination: "/products/the-x1-cycler",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

initOpenNextCloudflareForDev();
