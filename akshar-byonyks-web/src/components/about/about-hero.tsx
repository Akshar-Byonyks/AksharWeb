import { fdaClearance } from "@/lib/claims";

// §9.5: "Who Akshar Byonyks is, the licensing relationship per Section 3.1."
//
// §3.1 is unusually specific about this page and it is the reason the hero is
// built as three questions rather than as a paragraph. It requires that the
// page answer, **above the fold**:
//
//   1. Who is Akshar Byonyks and who is Byonyks?
//   2. Is the machine I would buy the same machine the FDA cleared?
//   3. Is this an Indian company?
//
// A reader asking those has one worry underneath all three — that "licensed
// India partner of an American company" is a phrase covering something less
// solid than it sounds. Prose invites them to keep looking for the catch.
// Question and answer puts the catch in writing, which is the only thing that
// actually settles it.
//
// THE SECOND ANSWER IS DELIBERATELY HALF A NO. "Yes, the same device" and "no,
// that clearance does not carry into India" are both true and the site's two
// non-negotiables (PRODUCT.md) require them to be stated together and
// separately. Answering only the first half here would be the single most
// consequential misreading available on this website, and it would be this
// page's fault for setting it up.
//
// Ink, and no photograph: this is a position, and the Full-Bleed Rule gives
// ink to position. The image search for this page is recorded in
// public/images/README.md, including why the licensor's founder portrait was
// not taken.
const questions = [
  {
    q: "Who is Akshar Byonyks, and who is Byonyks?",
    a: "Byonyks designs and manufactures the X-1 automated peritoneal dialysis cycler. Akshar Byonyks International LLC is licensed to bring that device to India. Two companies, one device, and the licence is the whole of the relationship between them.",
  },
  {
    q: "Is it the same machine the FDA cleared?",
    a: `Yes, and a clearance does not travel. It is the device cleared under 510(k) ${fdaClearance.kNumber}, held by Byonyks. That clearance authorises marketing in the United States. India's position is separate, is being established under the Medical Device Rules 2017, and will be stated here precisely once it is confirmed.`,
  },
  {
    q: "Is this an Indian company?",
    // EXPANDED 11 SEP 2026, on client instruction: say that the X-1 was built
    // and cleared for the United States, and that Akshar Byonyks is the
    // company taking it into India specifically.
    //
    // WHAT IT DELIBERATELY DOES NOT SAY. Spec F-1 (20 Aug 2026) attributes
    // Byonyks to no country, so this answer describes the market the
    // CLEARANCE covers -- a fact on the FDA's own register -- and never the
    // licensor's nationality. "Byonyks is an American company" is the
    // sentence this is written to avoid, and the public record would not
    // support it either: the applicant on K243371 is Byonyks Pvt, Ltd.
    a: "Yes. The X-1 was built for the United States and cleared there, and a 510(k) reaches no further than that market. Akshar Byonyks International LLC exists for India alone — the CDSCO route, the supply and the clinical support are being built here, not translated from a US programme. The argument for home dialysis is stronger in this market too: in the United States a trip to a clinic is an inconvenience, and across most of India it is the reason people never receive dialysis at all.",
  },
];

export function AboutHero() {
  return (
    <section aria-labelledby="about-heading" className="bg-ink">
      <div className="mx-auto max-w-[1280px] px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-28 lg:pb-24">
        <div className="max-w-3xl">
          <h1
            id="about-heading"
            className="text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
          >
            An Indian company, and a licence.
          </h1>
        </div>

        {/* A definition list, because that is literally what this is. The
            questions are marked up as terms so a screen reader announces the
            pairing rather than six loose paragraphs. */}
        {/* Set as a two-track list, 30 Aug 2026. The sitewide critique
            measured this hero using 53% of a 1440px canvas with the right
            47% empty. Three questions side by side would have filled it and
            read as parallel — but these are a sequence a reader works
            through, so the question moves into its own track and the answer
            keeps the measure. Same reading order, the width used, and the
            pairing a definition list is for made visible rather than merely
            marked up. */}
        <dl className="mt-14 divide-y divide-white/10 border-t border-white/15 lg:mt-16">
          {questions.map(({ q, a }) => (
            <div
              key={q}
              className="py-8 lg:grid lg:grid-cols-[minmax(0,22rem)_minmax(0,64ch)] lg:gap-x-12"
            >
              <dt className="text-xl font-semibold text-balance text-white sm:text-2xl">
                {q}
              </dt>
              <dd className="mt-3 text-lg text-white/75 lg:mt-0">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
