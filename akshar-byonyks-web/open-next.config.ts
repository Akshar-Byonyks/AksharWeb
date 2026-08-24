import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental cache override: every content route is statically
// prerendered at build time (spec 12.1), with no per-request rendering
// except the form Route Handler. There's no ISR revalidation to cache,
// so the default is sufficient. Revisit only if a route ever opts into ISR.
export default defineCloudflareConfig();
