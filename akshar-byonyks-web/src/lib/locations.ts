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
//     street address. It is replaced rather than deleted — see `india-office`
//     below — because deleting it outright would leave an Akshar Byonyks
//     locations page on which this company holds no premises at all, and every
//     remaining row belongs to the licensor. The city and the address are
//     gone; the fact that there is an India office is not. Its address now
//     reads "coming soon", which is the client's own wording for it on
//     /contact the same day.
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

/** Retrieved together, in one pass, so one date covers the set. */
export const LOCATIONS_RETRIEVED = "31 August 2026";
const BYONYKS = "Byonyks";

export type LocationStatus = "operating" | "planned";

export type Location = {
  readonly id: string;
  /**
   * What to call the place. A city where one is published; the country where
   * none is — see `india-office`, whose city is deliberately not named.
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
    id: "india-office",
    // NO CITY, ON PURPOSE. The Bengaluru row was removed on 1 Sep 2026 and
    // nothing has been published to replace it, so this row names the country
    // it can substantiate and stops. Putting a different city here would be
    // the exact failure the rest of this file is arranged to prevent: an
    // address nobody supplied, written down because a card looked empty.
    // "India office" as the heading, not "India". The card sets `place` as its
    // title and `country · entity · role` beneath, so a row whose place is its
    // country rendered as "India" over "INDIA · AKSHAR BYONYKS · INDIA
    // OFFICE" — a heading that looked like a placeholder above a line that
    // said the same word twice.
    place: "India office",
    country: "India",
    entity: "Akshar Byonyks",
    // THE ROLE SLOT CARRIES THE STATUS ON THIS PAGE — the two announced sites
    // put "Announced" here for the same reason. "Address coming soon" is the
    // client's own wording (1 Sep 2026) and it says precisely what is coming:
    // the address. Not "Coming soon", which on a card for an office that is
    // already open would read as the office being the thing that has not
    // arrived.
    role: "Address coming soon",
    detail:
      "The office for the India market, and where every enquiry this site sends is read. Its address has not been published yet.",
    status: "operating",
    // PENDING, NOT STATED. Every other row on this page is Byonyks' own
    // published account of itself; this one is the absence of a published
    // account, and the scale has a status for exactly that.
    provenance: {
      status: "pending",
      missing: "The India office address has not been published.",
    },
    gap: "The India office address is coming soon. Until it is published, enquiries reach the same people by email and by phone — see the Contact page.",
  },
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
      statedBy: BYONYKS,
      asOf: LOCATIONS_RETRIEVED,
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
    provenance: {
      status: "stated",
      statedBy: BYONYKS,
      asOf: LOCATIONS_RETRIEVED,
    },
    gap: "No opening date, no operating entity and no CDSCO manufacturing licence has been published for this site.",
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
    provenance: {
      status: "stated",
      statedBy: BYONYKS,
      asOf: LOCATIONS_RETRIEVED,
    },
    gap: "The city is the client audit's correction of a published “Gujarat”. No opening date, operating entity or CDSCO manufacturing licence has been published.",
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

// AT LEAST ONE ROW MUST BE OURS. Added 1 Sep 2026, when removing the Bengaluru
// row nearly left an Akshar Byonyks locations page listing only the licensor's
// premises — a page that would answer "where is Byonyks" under this company's
// masthead and never answer "where are you". If a future edit removes the
// India office, it has to decide what this page is for rather than discover
// the answer in production.
if (!locations.some((l) => l.entity === "Akshar Byonyks")) {
  throw new Error(
    "locations: no Akshar Byonyks site remains. A locations page under this masthead that lists only the licensor's buildings does not answer the question it is asked.",
  );
}

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
