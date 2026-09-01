// Shared site-level facts. Spec §9.8 (form target), §11.2 (canonical URLs)
// and Open Questions 1.1 (phone).

// Canonical origin. Spec §11.2 requires a canonical URL on every page and
// §12.7 confirms `aksharbyonyks.com` as the registered domain; this is the
// one place it is written down, and it backs `metadataBase` in the root
// layout as well as the absolute URLs in structured data.
export const siteUrl = "https://aksharbyonyks.com";

// THE PHONE NUMBER IS REAL AS OF 1 SEP 2026. Client instruction: the staffed
// line for this site is Dr. Vishnu Patel's US number. Open Questions 1.1 —
// "no real, named phone contact exists yet" — and the §14.4 launch gate that
// barred shipping a placeholder contact detail are both closed by it.
//
// IT IS A UNITED STATES NUMBER ON AN INDIA-FACING SITE, and that is stated
// rather than hidden: `phoneRegion` is printed beside it so a reader in
// Ahmedabad knows before dialling that this is an international call, not a
// local one. Presenting a +1 number with no country context on a site whose
// audience is Indian is the kind of omission that costs a patient money and
// costs this company an enquiry.
//
// `phoneTel` is the E.164 form for `tel:` hrefs. It is written out rather than
// derived, because the display form carries parentheses and a hyphen that a
// `.replace(/\s/g, "")` does not strip — the old derivation produced
// `tel:+1(321)527-9725`, which some dialers refuse.
export const siteContact = {
  email: "vishnu@aksharbyonyks.com",
  phone: "+1 (321) 527-9725",
  phoneTel: "+13215279725",
  phoneRegion: "United States line",
  phoneIsPlaceholder: false,
} as const;
