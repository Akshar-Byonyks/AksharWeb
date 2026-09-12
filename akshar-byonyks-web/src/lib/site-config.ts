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

/**
 * THE INDIA OFFICE. Supplied by the client on 11 September 2026, in answer to
 * "need the official address for the India office", and it closes the oldest
 * launch gate this project held — Open Question 1.1, `pending-address` in the
 * claims ledger, and the "Coming soon" row that had stood on /contact since
 * 1 September.
 *
 * WRITTEN OUT EXACTLY AS GIVEN, only line-broken. The client sent it as one
 * string: "C/O Rashmin Gandhi. M34 Medical Devices Park, Sultanpur Village,
 * Patancheru, Telangana INDIA 502319". Nothing here is normalised, expanded or
 * corrected — an address on a medical device site is a fact about where a
 * regulator, a hospital or a patient can reach this company, and tidying one
 * is how a unit number or a PIN code quietly changes.
 *
 * IT IS A CARE-OF ADDRESS, AND THAT IS LOAD-BEARING FOR THE LEGAL PAGES.
 * "C/O Rashmin Gandhi" is a correspondence address at a third party's
 * premises. That is sufficient for everything this address is used for on
 * /contact, /locations and the privacy policy — where a reader needs to know
 * how to reach the data fiduciary — and it is NOT sufficient to establish a
 * registered office, which is what /terms-of-use's governing-law clause turns
 * on. The two are different facts and this file does not let one stand in for
 * the other: see `isRegisteredOffice`.
 *
 * THE PHONE IS AN INDIAN MOBILE, which is the first locally diallable number
 * this site has ever carried. The existing `phone` above is a +1 line and
 * /contact says so in as many words, because an unmarked country code costs a
 * patient money. This one costs them nothing, so it leads on that page now.
 * The display form is the client's own; it is not regrouped into +91 99666
 * 54309, because a phone number is a fact and not a typographic decision.
 */
export const indiaOffice = {
  careOf: "C/O Rashmin Gandhi",
  lines: [
    "M34 Medical Devices Park",
    "Sultanpur Village, Patancheru",
    "Telangana 502319",
    "India",
  ],
  phone: "+91 9966654309",
  phoneTel: "+919966654309",
  /**
   * FALSE, DELIBERATELY, AND IT GATES THE JURISDICTION CLAUSE.
   *
   * The client was asked for "the official address for the India office" and
   * answered with this. They were not asked whether it is the registered
   * office of the entity, and a care-of address at a medical devices park is
   * the shape of a correspondence address rather than a registered seat. The
   * related question — whether there will be an Indian LLP at all — came back
   * "not sure about indian LLP yet" the same day, which is the answer that
   * makes this flag necessary rather than pedantic: there may not yet BE an
   * Indian entity to register an office for.
   *
   * While this is false, /terms-of-use keeps its pending note on the seat of
   * jurisdiction. Flip it only when the client confirms this is the registered
   * office of record, and change that page in the same commit.
   */
  isRegisteredOffice: false,
} as const;

/**
 * THE GRIEVANCE OFFICER, required by name and with contact details under
 * India's Digital Personal Data Protection Act 2023.
 *
 * Client, 11 September 2026: "Grievance officer can be Rashmin Gandhi. Will
 * send you a profile soon with a picture."
 *
 * PUBLISHED ON "CAN BE", AND THE WORDING IS RECORDED HERE ON PURPOSE. This is
 * a statutory appointment on a legal page, and "can be" is a designation
 * rather than a confirmation. It is published because the alternative is
 * worse: the page carried a launch-blocking pending note saying no officer had
 * been appointed, and leaving that standing after the client named a person
 * would be the site contradicting its own client. If the appointment is not
 * final, this constant is the one place to change.
 *
 * NO PROFILE AND NO PHOTOGRAPH ARE NEEDED FOR THE STATUTE and none is
 * rendered. The Act asks for a name and contact details, which is what
 * /grievance-redressal and /privacy-policy now print. The profile the client
 * is sending is for the leadership roster, not for this.
 */
export const grievanceOfficer = {
  name: "Rashmin Gandhi",
  email: "vishnu@aksharbyonyks.com",
  appointedOn: "11 September 2026",
  /**
   * HIS PROFILE ON THE LEADERSHIP ROSTER, added later the same day when the
   * client supplied his biography and photograph. A complainant being asked
   * to write to a named person can now see who that person is, which is the
   * difference between a name and an accountable human being -- and the DPDP
   * Act's whole point in requiring "a specific accountable person, not a
   * department".
   *
   * THE TWO ROLES STAY SEPARATE. His card says "India Division Lead", which
   * is his job; this is a statutory appointment, which is not. Neither page
   * presents one as the other.
   */
  profile: "/about-us/leadership/rashmin-gandhi",
} as const;
