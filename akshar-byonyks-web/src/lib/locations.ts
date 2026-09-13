import type { Provenance } from "@/components/common/provenance";

// WHERE THE GROUP OPERATES, and — the part that carries the weight — which
// company holds each site.
//
// THIS PAGE EXISTS BECAUSE THE CLIENT ASKED FOR IT ON 31 AUG 2026.
//
// THREE SITES WERE REMOVED ON 1 SEP 2026, on the client's instruction:
// Bengaluru, Punjab and Lahore. What went with each of them is worth stating,
// because two of the three took a load-bearing fact off this page:
//
//   • BENGALURU was the only Akshar Byonyks row, and the only one with a
//     street address. It was replaced rather than deleted by an `india-office`
//     row whose address read "coming soon" — and THAT ROW WAS ITSELF REMOVED
//     ON 2 SEP 2026, on the client's instruction. See the note below the
//     array for what that decides about this page.
//   • PUNJAB was the manufacturing site, and the origin of the ISO 13485
//     certification the X-1 is built under. That certification is still stated
//     on the X-1 product page; what this page no longer does is name the
//     building or the country it stands in.
//   • LAHORE was the research and development site.
//
// Removing the last two restores spec F-1's standing direction — attribute
// manufacturing to Byonyks, never to a country — which the 31 Aug instruction
// had reversed for one day. deviations.md §9 records both turns.
//
// TWO COMPANIES, NEVER BLURRED. `entity` is not decoration. Akshar Byonyks is
// the India licensee; Byonyks designs, manufactures and holds the FDA
// clearance. byonyks.com solves this by filing its sites under "South Asia",
// which keeps the proof while hiding the country — spec F-1 refuses that
// framing by name, and so does this page. Every row says which company and
// which country, or it does not ship.
//
// NOTHING HERE IS INVENTED. Every address, function and date is published by
// Byonyks on byonyks.com and retrieved on the date below. Where there is no
// published fact — and for the India office there is none — the gap is a
// field, a visible marker and a sentence, never a plausible guess.

/**
 * Retrieved together, in one pass, so one date covers the set.
 *
 * NO LONGER RENDERED (2 Sep 2026) — see `PRODUCTS_RETRIEVED`. Kept as the
 * internal record of when these addresses were pulled.
 */
export const LOCATIONS_RETRIEVED = "31 August 2026";
const BYONYKS = "Byonyks";

export type LocationStatus = "operating" | "planned";

export type Location = {
  readonly id: string;
  /**
   * What to call the place. A city where one is published; the country where
   * none is. Every current row publishes a city, but the country-only case is
   * still legal — the `india-office` row used it until 2 Sep 2026.
   */
  readonly place: string;
  /** State or province. Present where it disambiguates; see `hyderabad`. */
  readonly region?: string;
  readonly country: string;
  /** Which company holds this site. Never inferred, never blurred. */
  readonly entity: "Akshar Byonyks" | typeof BYONYKS;
  /** What happens here, in two or three words. */
  readonly role: string;
  /** One sentence. What the reader would ask next. */
  readonly detail: string;
  readonly status: LocationStatus;
  /** The year the site began operating, where Byonyks publishes one. */
  readonly established?: string;
  /**
   * WHEN A PLANNED SITE IS EXPECTED TO BE FINISHED. Supplied by the client on
   * 11 September 2026 for both India hubs, and this is the first time either
   * has carried one.
   *
   * DELIBERATELY A STRING, AND DELIBERATELY IMPRECISE. The client's answer was
   * "Summer 2027" and "Late 2027". Parsing either into a date would invent a
   * month, and rendering "2027" alone would drop half of what was said. The
   * page prints what was given.
   *
   * IT IS AN EXPECTATION, NOT A COMMITMENT, and the copy around it must keep
   * saying so — a construction date on a medical device site is read by
   * procurement as a supply date, and the CDSCO licence that would make either
   * building a manufacturing site has not been published for either.
   */
  readonly expectedCompletion?: string;
  /** Street address exactly as published. Missing lines are `null`. */
  readonly address?: readonly (string | null)[];
  readonly phone?: string;
  readonly provenance: Provenance;
  /** What this row cannot tell the reader, in the words they would use. */
  readonly gap?: string;
  /**
   * Byonyks' own picture of the site. Absent where none has been published —
   * which is the case for exactly one row, and it is ours.
   */
  readonly image?: {
    readonly src: string;
    readonly alt: string;
    /**
     * A photograph of a building that exists, or a drawing of one that does
     * not. CLAUDE.md: never caption a render as a photograph. This is that
     * rule as a field rather than as a habit — the caption is generated from
     * it, so the two cannot drift.
     */
    readonly kind: "photograph" | "plan drawing";
  };
};

export const locations: readonly Location[] = [
  {
    id: "itasca",
    place: "Itasca",
    region: "Illinois",
    country: "United States",
    entity: BYONYKS,
    role: "Head office",
    detail:
      "Byonyks' corporate base: the company that designed the X-1, holds its FDA clearance, and licenses it to Akshar Byonyks for India.",
    status: "operating",
    address: ["550 E. Devon Avenue, Unit 140", "Itasca, IL 60143"],
    provenance: {
      status: "stated",
    },
    image: {
      src: "/images/locations/itasca-head-office.jpg",
      alt: "A single-storey brick office building photographed from its corner, with the numerals 550 mounted in metal on both faces under a clear sky.",
      kind: "photograph",
    },
  },
  {
    id: "hyderabad",
    place: "Hyderabad",
    // TELANGANA IS LOAD-BEARING, not padding. There is a Hyderabad in Sindh,
    // Pakistan, and this page named Pakistan sites until 1 Sep 2026. Leaving
    // the state off would make the claim ambiguous exactly where it must not
    // be.
    region: "Telangana",
    country: "India",
    entity: BYONYKS,
    role: "Announced",
    detail:
      "Announced as the group's central hub for dialysate manufacturing and distribution.",
    status: "planned",
    // Client, 11 September 2026, answering a direct question about completion
    // dates for both hubs. They called both of them "offices"; this row keeps
    // Byonyks' published FUNCTION rather than adopting that word, because the
    // two are different claims and only one of them was being answered.
    expectedCompletion: "Summer 2027",
    provenance: {
      status: "stated",
    },
    gap: "The completion date is an expectation, not a commitment. No operating entity and no CDSCO manufacturing licence has been published for this site.",
    image: {
      src: "/images/locations/hyderabad-plan.jpg",
      alt: "An isometric cutaway drawing of a planned facility interior, showing storage racking, workbenches, desks and a forklift.",
      kind: "plan drawing",
    },
  },
  {
    id: "ahmedabad",
    // The city comes from the client audit, which corrects byonyks.com's
    // "Gujarat" — a state, not a site. The function below is Byonyks' own
    // published wording. Two sources on one row, and the row says so.
    place: "Ahmedabad",
    region: "Gujarat",
    country: "India",
    entity: BYONYKS,
    role: "Announced",
    detail:
      "Announced as the unit for producing tubing sets and assembling machines.",
    status: "planned",
    expectedCompletion: "Late 2027",
    provenance: {
      status: "stated",
    },
    gap: "The city is the client audit's correction of a published “Gujarat”. The completion date is an expectation, not a commitment, and no operating entity or CDSCO manufacturing licence has been published.",
    image: {
      src: "/images/locations/ahmedabad-plan.jpg",
      alt: "A wireframe architectural drawing of a planned industrial building with a long-span roof structure over an open floor.",
      kind: "plan drawing",
    },
  },
] as const;

// ONE REGISTER, INDIA AT THE TOP (1 Sep 2026, on request). This replaced a
// split into "Operating today" and "Announced, not open", which sorted the
// page by a distinction the reader cares about second and buried the thing
// they care about first.
//
// The operating/announced distinction did not disappear with the split: it
// moved onto the cards, where every face carries its own role ("Announced" for
// the two that are not built) and each unbuilt card states what is not yet
// known. A status that lives on the card survives re-sorting; a status that
// lives in a section heading does not.
// COUNTS FOR THE PAGE'S PROSE, DERIVED RATHER THAN WRITTEN OUT.
//
// The heading and the register's title used to spell these numbers: "Four
// sites, two companies" and "All four sites, India first". Deviation 43 read
// both against this file and found them correct, which they were on 12 Sep
// 2026 at 04:00. They were wrong by that afternoon, when the client asked for
// the Akshar Byonyks row to come off and the page became three sites held by
// one company — with the prose still saying four and two.
//
// That is deviation 30's failure mode exactly: the data is edited and the
// sentence about the data is not re-read. Auditing the strings again would
// only schedule the next occurrence, so the strings are gone.
export const siteCount = locations.length;
export const entityCount = new Set(locations.map((l) => l.entity)).size;

export const byIndiaFirst: readonly Location[] = [
  ...locations.filter((l) => l.country === "India"),
  ...locations.filter((l) => l.country !== "India"),
];

// The merge must not silently drop a site, and the India block must actually
// be a block — if a non-India card ever sorted into the middle of it, the top
// row would stop being the highlight this ordering exists to create.
if (byIndiaFirst.length !== locations.length) {
  throw new Error("locations: byIndiaFirst lost or duplicated a site.");
}
{
  const firstNonIndia = byIndiaFirst.findIndex((l) => l.country !== "India");
  if (byIndiaFirst.slice(firstNonIndia).some((l) => l.country === "India")) {
    throw new Error(
      "locations: an India site sorted below a non-India one. The top row must be India.",
    );
  }
}

// MODULE-LOAD CONTRACTS, in the manner of `leadership.ts`, `news-data.ts` and
// `compliance.ts`: the rules that must not be broken are enforced where they
// cannot be forgotten, not left to review.

// THIS PAGE ANSWERS "WHERE ARE YOU" AGAIN, AS OF 11 SEP 2026.
//
// The history is short and worth keeping, because the question was live for
// nine days. A contract added on 1 Sep required at least one Akshar Byonyks
// row; the client removed the last one on 2 Sep, the contract came out with
// it, and this note recorded the resulting decision — that the page was the
// group's premises register rather than this company's address, and that
// /contact was the only place on the site saying an India office existed at
// all. It also said what would reverse that: "the day the India office has a
// published address it belongs back on this page."
//
// That day was 11 September 2026. The `india-office` row leads the array, so
// it leads the register.
//
// THE CONTRACT IS NOT COMING BACK, and that is deliberate rather than an
// oversight. A guard requiring at least one row of ours would now pass
// trivially and would fire, if it ever fired, at exactly the moment somebody
// had a reason to remove the row — which is a client decision, not a build
// error. What stays enforced is the rule that actually protects spec F-1: the
// manufacturing-role guard below, which refuses to let an Akshar Byonyks row
// claim a role the company does not hold.

for (const l of locations) {
  if (!l.place || !l.country) {
    throw new Error(`locations: "${l.id}" must name a place and a country.`);
  }

  // THE PROJECT'S HARDEST STANDING RULE. Akshar Byonyks is a licensee. It does
  // not manufacture, and no row may say it does — this is the same rule that
  // kept byonyks.com's eight-team departments grid off /about-us/careers.
  if (
    l.entity === "Akshar Byonyks" &&
    /manufactur|assembl|production/i.test(l.role)
  ) {
    throw new Error(
      `locations: "${l.id}" gives Akshar Byonyks a manufacturing role. It is the India licensee, never the manufacturer.`,
    );
  }

  // A site that does not exist yet cannot have a street address or a phone.
  // If one ever appears on a planned row it came from somewhere unverified.
  if (l.status === "planned" && (l.address || l.phone)) {
    throw new Error(
      `locations: "${l.id}" is planned but carries an address or phone. A facility that is not open has neither.`,
    );
  }

  // An announced site with no gap stated would read as a commitment with a
  // date behind it. None of them has one.
  if (l.status === "planned" && !l.gap) {
    throw new Error(
      `locations: planned site "${l.id}" must state what is not yet known.`,
    );
  }

  // A BUILDING THAT DOES NOT EXIST CANNOT BE PHOTOGRAPHED. Byonyks publishes
  // architectural drawings for the two announced sites and a photograph for
  // its head office, and the page labels each image with its kind — so this is
  // the one pairing that must never be mislabelled. CLAUDE.md's "never caption
  // a render as a photograph" is the rule; this is the enforcement.
  if (l.image) {
    const expected = l.status === "planned" ? "plan drawing" : "photograph";
    if (l.image.kind !== expected) {
      throw new Error(
        `locations: "${l.id}" is ${l.status} but its image is a ${l.image.kind}. ` +
          `An announced site has drawings, an operating one has photographs.`,
      );
    }
    if (!l.image.alt.trim()) {
      throw new Error(`locations: "${l.id}" has an image with no alt text.`);
    }
  }
}
