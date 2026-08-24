// Shared site-level facts. Spec §9.8 (form target), §11.2 (canonical URLs)
// and Open Questions 1.1 (phone).

// Canonical origin. Spec §11.2 requires a canonical URL on every page and
// §12.7 confirms `aksharbyonyks.com` as the registered domain; this is the
// one place it is written down, and it backs `metadataBase` in the root
// layout as well as the absolute URLs in structured data.
export const siteUrl = "https://aksharbyonyks.com";

// PHONE IS A PLACEHOLDER. Open Questions 1.1: no real, named phone contact
// exists yet. Spec §14.4 item 3 bars shipping a placeholder contact detail
// at launch — this constant exists so there is exactly one place to swap
// the real number in, not scattered across every section that shows it.
export const siteContact = {
  email: "vishnu@aksharbyonyks.com",
  phone: "+91 00000 00000",
  phoneIsPlaceholder: true,
} as const;
