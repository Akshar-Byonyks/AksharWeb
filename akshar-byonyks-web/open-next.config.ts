import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// THE PRERENDERED PAGES HAVE TO BE READ FROM SOMEWHERE, AND WITHOUT THIS
// THERE IS NOWHERE (12 Sep 2026).
//
// This file used to say:
//
//   "No incremental cache override: every content route is statically
//    prerendered at build time (spec 12.1) ... There's no ISR revalidation
//    to cache, so the default is sufficient."
//
// The premise was right and the conclusion was wrong, and production is where
// the difference showed. Measured against the live site:
//
//   x-nextjs-prerender: 1      <- the page WAS built at compile time
//   x-nextjs-cache: MISS       <- and was re-rendered anyway, every request
//   Cache-Control: s-maxage=31536000
//   (no cf-cache-status)       <- the edge is not holding the HTML either
//
// "No ISR to revalidate" does not mean "nothing to read". The App Router
// serves these routes through the worker rather than as flat files, because
// one URL has to answer with either HTML or an RSC payload depending on the
// request headers (hence the `Vary: rsc, next-router-*` those responses
// carry). So the worker runs on every page view — and with no incremental
// cache configured it had no store to pull the prerendered output from, so it
// rendered the page again. One sampled request spent **459ms of CPU** doing
// that for a page that had not changed since the build.
//
// WHAT IT COST. On 11 Sep, 1,063 of 1,333 requests (80%) ran the worker.
// During the busiest sixteen minutes of the week, 22 of them died with
// `exceededResources` — and they died CHEAPLY, 13-18ms of CPU against 35ms
// for the successes beside them, which is the signature of the 128MB memory
// ceiling under concurrency rather than a slow page. A scraper on Tencent
// Cloud sending `cache-control: no-cache` was a good part of that load, and
// `no-cache` guarantees a full re-render every time when there is no store.
//
// WHY THE STATIC-ASSETS ADAPTER AND NOT R2 OR KV. Its own documentation is
// the argument: "should only be used for applications that do NOT want
// revalidation and ONLY want to serve prerendered data." That is this site
// exactly — 48 prerendered routes, no ISR anywhere, one Route Handler for the
// contact form. It reads from the assets already uploaded with the worker, so
// it adds no bucket, no namespace, no binding and no bill. R2 or KV would be
// the answer the day a route opts into ISR; today they would be infrastructure
// serving a cache that never invalidates.
//
// **IF A ROUTE EVER ADOPTS ISR, THIS HAS TO CHANGE.** This adapter cannot
// write, so a revalidating route would silently keep serving its build-time
// copy forever. That is the trade being made here deliberately, and it is
// safe only as long as spec 12.1 holds.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
