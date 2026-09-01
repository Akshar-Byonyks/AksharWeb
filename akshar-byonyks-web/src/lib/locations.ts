import type { Provenance } from "@/components/common/provenance";

// WHERE THE GROUP OPERATES, and — the part that carries the weight — which
// company holds each site.
//
// THIS PAGE EXISTS BECAUSE THE CLIENT ASKED FOR IT ON 31 AUG 2026, and it
// names Pakistan, on the client's explicit instruction given the same day.
// That reverses the standing "get rid of Pakistan office" direction the audit
// gave and that spec F-1 is built around. The reversal is recorded in
// deviations.md §9 rather than left as an undocumented contradiction between
// this file and the spec, because a future reader finding Lahore here and
// "Lahore removed per the audit" in §9.8 deserves to know which is current
// and who decided.
//
// TWO COMPANIES, NEVER BLURRED. `entity` is not decoration. Akshar Byonyks is
// the India licensee; Byonyks designs, manufactures and holds the FDA
// clearance. byonyks.com solves this by filing Pakistan and India together
// under "South Asia", which keeps the proof while hiding the country — spec
// F-1 refuses that framing by name, and so does this page. Every row says
// which company and which country, or it does not ship.
//
// NOTHING HERE IS INVENTED. Every address, phone number, function and date is
// published by Byonyks on byonyks.com and retrieved on the date below. Where
// the source is incomplete — and the India address is — the gap is a field, a
// visible marker and a sentence, never a plausible guess.

/** Retrieved together, in one pass, so one date covers the set. */
export const LOCATIONS_RETRIEVED = "31 August 2026";
const BYONYKS = "Byonyks";

export type LocationStatus = "operating" | "planned";

export type Location = {
  readonly id: string;
  /** What to call the place. A city, except where only a province is published. */
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

// The India address is published with a dropped segment — byonyks.com renders
// it "43, Residency Road, , Bangalore", and that doubled comma is the same
// truncation Open Questions 1.1 records as the reason no India address ships
// on /contact. `null` holds the dropped line's place rather than closing the
// gap silently, so the page can say a line is missing instead of presenting a
// three-line address as complete.
export const locations: readonly Location[] = [
  {
    id: "bengaluru",
    // "Bengaluru" in our own voice, the official name and the one this
    // audience uses; the address below stays verbatim as published, which is
    // why the two spellings differ on the same row. Quoting a source and
    // writing prose are different acts.
    place: "Bengaluru",
    region: "Karnataka",
    country: "India",
    entity: "Akshar Byonyks",
    role: "India office",
    detail:
      "The office for the India market, and the address behind every enquiry this site sends.",
    status: "operating",
    address: ["43, Residency Road", null, "Bangalore, Karnataka 560025"],
    phone: "+91 97 8660 0505",
    provenance: {
      status: "stated",
      statedBy: BYONYKS,
      asOf: LOCATIONS_RETRIEVED,
    },
    gap: "One line of this address is missing from the published source, and it is not guessed here.",
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
    id: "punjab",
    // A province, not a city, because a city is not published. The factory is
    // the origin of both the ISO 13485 certification and the 10,000+ therapies
    // figure the rest of this site attributes to Byonyks rather than to a
    // country — so it is the one row that most changes what the page means.
    place: "Punjab",
    country: "Pakistan",
    entity: BYONYKS,
    role: "Manufacturing",
    detail:
      "The group's dialysis device manufacturing unit, and the site behind the ISO 13485 certification the X-1 is built under.",
    status: "operating",
    established: "2021",
    provenance: {
      status: "stated",
      statedBy: BYONYKS,
      asOf: LOCATIONS_RETRIEVED,
    },
    gap: "Byonyks publishes the province but not the town, and the ISO 13485 certificate number has not reached this project.",
    image: {
      src: "/images/locations/punjab-manufacturing.jpg",
      alt: "The entrance to a single-storey industrial building, with BYONYKS mounted vertically in metal letters on a blue panel beside the door.",
      kind: "photograph",
    },
  },
  {
    id: "lahore",
    place: "Lahore",
    region: "Punjab",
    country: "Pakistan",
    entity: BYONYKS,
    role: "Research and development",
    detail: "The group's research centre for dialysis technology.",
    status: "operating",
    address: ["45 A Commercial, Sector XX", "DHA Phase 3", "Lahore, Punjab"],
    phone: "+92 42 111 543 639",
    provenance: {
      status: "stated",
      statedBy: BYONYKS,
      asOf: LOCATIONS_RETRIEVED,
    },
    image: {
      src: "/images/locations/lahore-research.jpg",
      alt: "A three-storey glass-fronted commercial building with illuminated Byonyks and Bloodless Dialysis signage above the ground floor.",
      kind: "photograph",
    },
  },
  {
    id: "hyderabad",
    place: "Hyderabad",
    // TELANGANA IS LOAD-BEARING, not padding. There is a Hyderabad in Sindh,
    // Pakistan, and this page now names Pakistan sites two rows above. Leaving
    // the state off would make the single most important claim on the page —
    // that the group's next two facilities are in India — ambiguous exactly
    // where it must not be.
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
// they care about first: an India-market site had its India office third in
// the first group and its two India sites in a separate group further down.
//
// There are three India sites and three others, so on the three-column grid
// this fills the entire top row with India and the second row with the rest —
// the highlight is the layout itself, not a decoration applied to it. Each
// group keeps the order declared above.
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
  // architectural drawings for the two announced sites and photographs for the
  // three operating ones, and the page labels each image with its kind — so
  // this is the one pairing that must never be mislabelled. CLAUDE.md's "never
  // caption a render as a photograph" is the rule; this is the enforcement.
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
