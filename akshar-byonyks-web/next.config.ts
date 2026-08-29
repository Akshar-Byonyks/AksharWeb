import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

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

export default nextConfig;

initOpenNextCloudflareForDev();
