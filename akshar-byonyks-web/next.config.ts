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
      {
        // Sahil Pankhaniya's profile, which shipped at `/sahil` on 1 Sep 2026
        // because the supplied biography gave no surname. The client's officer
        // schedule of 8 Sep supplied one — "President and Chief Executive
        // Officer: Sahil Pankhaniya" — and the slug follows the name, as every
        // other profile on the roster does.
        //
        // THE OLD PATH WAS PUBLISHED, which is the whole reason this entry
        // exists rather than a rename on its own. It has been live and in the
        // submitted sitemap since 1 Sep, so dropping it would 404 the chief
        // executive's profile for anyone holding the link — and it is exactly
        // the URL most likely to have been sent to an investor or a partner.
        source: "/about-us/leadership/sahil",
        destination: "/about-us/leadership/sahil-pankhaniya",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

initOpenNextCloudflareForDev();
