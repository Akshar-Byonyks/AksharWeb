import type { Provenance } from "@/components/common/provenance";

// THE DEVICE ROSTER, and the distance between what can be specified and what
// has only been announced.
//
// BUILT 1 SEP 2026, on the client's instruction: "move X1 cycler page to a new
// main tab called products, add in x2 and x3 coming and add in image from
// byonyks site". The X-1 page itself moved wholesale from
// /innovation/the-x1-cycler; this module is the new part.
//
// ONE DEVICE HAS A PAGE AND TWO DO NOT, and that asymmetry is the point of the
// file rather than an unfinished state in it. The X-1 has a 510(k) number, a
// specification table with its gaps marked, and an Instructions for Use a
// clinician can request. Byonyks publishes exactly one paragraph about the X-2
// and X-3 and closes it "More details coming soon." — no specification, no
// date, no regulatory position in any jurisdiction. Giving those two a page
// each would mean writing several screens around a paragraph, and everything
// added to fill the space would be invented. So they are a section on the hub,
// and `hasPage` says which is which.
//
// THE PARAGRAPH IS CARRIED, NOT ADOPTED — the same contract `news-data.ts` and
// `leadership.ts` answer to. It is Byonyks' claim about Byonyks' unreleased
// products, quoted verbatim, attributed on the page, with the retrieval date
// beside it. It says these devices "will truly revolutionize peritoneal
// dialysis and disrupt the market". **That sentence must never be restated in
// Akshar Byonyks' own voice**, and it is not: the page prints it as a
// quotation with the publisher named, because a licensee forecasting a market
// disruption for a device that does not exist yet is a claim nobody here can
// stand behind.

/** One pass, one date. */
export const PRODUCTS_RETRIEVED = "1 September 2026";

export const PRODUCTS_SOURCE = "https://byonyks.com/products/";

export type Product = {
  readonly id: string;
  readonly name: string;
  /** The device's own designation, as Byonyks writes it. */
  readonly designation: string;
  /** One line, on the card face. */
  readonly summary: string;
  /** Where the full page is, when there is one. */
  readonly href?: string;
  /**
   * Whether this device has a page of its own. Derived nowhere: a device with
   * a `href` must have a page behind it, and the contract below enforces it.
   */
  readonly hasPage: boolean;
  readonly status: "available" | "announced";
  /** What the reader can check, and how. */
  readonly provenance: Provenance;
  readonly image?: {
    readonly src: string;
    readonly alt: string;
    /**
     * CLAUDE.md: never caption a render as a photograph. Neither of these is
     * a photograph and the page says so on each, in these words.
     */
    readonly kind: "product render" | "teaser illustration";
    readonly width: number;
    readonly height: number;
  };
};

export const products: readonly Product[] = [
  {
    id: "x1",
    name: "The X-1 cycler",
    designation: "Byonyks X-1 APD Cycler",
    summary:
      "The automated peritoneal dialysis cycler Akshar Byonyks is licensed to bring to India. Cleared by the US FDA under 510(k) K243371 on 16 May 2025.",
    href: "/products/the-x1-cycler",
    hasPage: true,
    status: "available",
    // The one device on this page whose central claim is on a public register
    // anybody can open, which is exactly why it gets `record` and the other
    // row does not.
    provenance: {
      status: "record",
      source: {
        label: "FDA 510(k) database, K243371",
        url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfPMN/pmn.cfm?ID=K243371",
      },
      retrieved: "29 August 2026",
    },
    image: {
      src: "/images/x1-apd-cycler.png",
      alt: "The Byonyks X-1 automated peritoneal dialysis cycler, a compact white unit with its screen lit.",
      kind: "product render",
      width: 910,
      height: 518,
    },
  },
  {
    id: "x2-x3",
    name: "The X-2 and X-3",
    designation: "Byonyks X2 & X3 Devices",
    summary:
      "Two devices Byonyks has announced and not yet described. No specification, no date and no regulatory position in any jurisdiction has been published for either.",
    hasPage: false,
    status: "announced",
    provenance: {
      status: "stated",
      statedBy: "Byonyks",
      asOf: PRODUCTS_RETRIEVED,
    },
    image: {
      src: "/images/products/x2-x3-teaser.png",
      // The alt text describes what is in the frame, which is two covered
      // shapes — not two dialysis machines. Writing "the X-2 and X-3 devices"
      // here would put a claim in the accessibility layer that the picture
      // itself refuses to make.
      alt: "Two objects of different sizes under grey dust sheets on a deep blue ground, the smaller marked X2 and the larger X3. Neither device is visible.",
      kind: "teaser illustration",
      width: 1024,
      height: 683,
    },
  },
] as const;

/**
 * Byonyks' own paragraph about the X-2 and X-3, word for word from the markup
 * of its /products/ page. Not paraphrased, not trimmed, not softened.
 *
 * It is a forecast about unreleased devices written by the manufacturer. The
 * page renders it as a quotation with Byonyks named and dated, never as this
 * company's own description — see the file header.
 */
export const x2x3Statement =
  "The combination of these two devices will truly revolutionize peritoneal dialysis and disrupt the market by delivering ultra-pure, biocompatible, non-inflammatory dialysis solutions with devices that are patient-friendly. Doing so will improve patient outcomes by reducing proven inflammatory mediators, allowing glucose & bicarbonate concentrations to be customized, and providing innovative ways to reduce the risk of peritonitis. It will also be very eco friendly by significantly reducing the amount of plastic medical waste typically generated by home PD systems.";

/** Byonyks' own closing line under that paragraph, carried with it. */
export const x2x3ComingSoon = "More details coming soon.";

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

// Module-load contracts, in the manner of `locations.ts`, `leadership.ts` and
// `news-data.ts`. The rules that must not be broken are enforced where they
// cannot be forgotten.
const seen = new Set<string>();

for (const product of products) {
  if (seen.has(product.id)) {
    throw new Error(`products: duplicate id "${product.id}".`);
  }
  seen.add(product.id);

  // A LINK AND A PAGE ARE ONE FACT. The nav, the footer and the hub all read
  // `hasPage`, and a row that claims a page it does not have ships a 404 into
  // the primary navigation of a medical device site.
  if (product.hasPage !== Boolean(product.href)) {
    throw new Error(
      `products: "${product.id}" says hasPage=${product.hasPage} but ${product.href ? "has" : "has no"} href. ` +
        "A device has a page and a link, or neither.",
    );
  }

  // AN ANNOUNCED DEVICE HAS NO PAGE, and this is the contract that keeps the
  // X-2 and X-3 from quietly acquiring one built out of adjectives. If Byonyks
  // publishes specifications, delete this rule in the same commit that adds
  // the page — deliberately, not by discovering the build is red.
  if (product.status === "announced" && product.hasPage) {
    throw new Error(
      `products: "${product.id}" is announced and has a page. Byonyks has published a paragraph about it; a page would have to be padded with claims nobody can stand behind.`,
    );
  }

  if (product.image && !product.image.alt.trim()) {
    throw new Error(`products: "${product.id}" has an image with no alt text.`);
  }
}

// Exactly one device is available today. If that ever stops being true the
// hub's copy — which is written around one shippable device and two
// announcements — has to be rewritten rather than silently outgrown.
if (products.filter((p) => p.status === "available").length !== 1) {
  throw new Error(
    "products: the hub's copy assumes exactly one available device. Rewrite the page, then change this contract.",
  );
}
