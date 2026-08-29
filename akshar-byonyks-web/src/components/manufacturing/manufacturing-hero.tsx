import { licensingStatement } from "@/lib/claims";

// §9.4 hero. Spec offers byonyks.com's "Crafting Quality, Building Tomorrow"
// or a replacement; this is the replacement, and the reason is spec F-1.
//
// F-1 is the most important finding in the whole specification: strip the
// Pakistan operation out of the story and this page has no facility to show,
// which makes "a manufacturing page with no manufacturing — worse than no
// manufacturing page at all." The resolution adopted on 20 Aug 2026 was to
// attribute every proof point to Byonyks rather than to a country. A hero that
// then opened with "Crafting Quality, Building Tomorrow" would be doing the
// opposite of that resolution's intent: a couplet with no subject, over a page
// whose entire difficulty is *who the subject is*.
//
// So the headline asks the question the page exists to answer, and the second
// half of it — "and how to check" — is the thing byonyks.com never offers and
// the Priority-1 audience arrives for. Spec §4.1: investors "read fast and
// distrust marketing language."
//
// THE FIRST VIEWPORT STATES THE NEGATIVE. "Akshar Byonyks does not manufacture
// the X-1" is not a weakness being confessed; it is the single most likely
// misreading of this page's existence in the navigation, and leaving it to be
// inferred from an absence is how a regulatory misstatement happens by
// omission. PRODUCT.md's third non-negotiable is that Akshar Byonyks is never
// described as the manufacturer, and the cheapest way to keep that rule is to
// say so where it cannot be missed.
//
// Ink, and no photograph. The Full-Bleed Rule assigns ink to *position* and
// white to *evidence* — the compliance register below is evidence and stays in
// the light. On imagery: this is the one page on the site where a photograph
// of a building or a production line would be actively dishonest, because
// there is no Akshar Byonyks facility for it to be a picture of and any
// factory image here reads as one. Recorded as a considered rejection in
// public/images/README.md rather than as a section nobody looked at.
const chain = [
  {
    role: "Designs and manufactures the X-1",
    party: "Byonyks",
    note: "Including the quality system, the testing, and the US clearance.",
  },
  {
    role: "Licensed to bring it to India",
    party: "Akshar Byonyks",
    note: "An Indian company. It does not manufacture the device.",
  },
  {
    role: "Regulatory position in India",
    party: "Being established",
    note: "Under the Medical Device Rules 2017. Stated in full once confirmed.",
  },
];

export function ManufacturingHero() {
  return (
    <section aria-labelledby="manufacturing-heading" className="bg-ink">
      <div className="mx-auto max-w-[1280px] px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-28 lg:pb-24">
        <div className="max-w-3xl">
          <h1
            id="manufacturing-heading"
            className="text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
          >
            {/* "X-1" must not break across lines. At display size inside
                max-w-3xl it did exactly that, and "X-" over "1" on two lines
                reads as a typesetting fault on the one word that is the
                product's name. */}
            Who makes the <span className="whitespace-nowrap">X-1</span>, and
            how to check.
          </h1>
          <p className="mt-6 text-xl text-white/75">
            {licensingStatement} This page is the evidence behind that sentence,
            separated into what anybody can verify on a public register and what
            Byonyks states.
          </p>
        </div>

        {/* The chain, not a card grid. Three parties in a fixed order with a
            rule between them reads as a record of who does what; three boxes
            would read as three equal features, and they are not equal — the
            middle one is the only one this company is. */}
        <dl className="mt-14 grid grid-cols-1 divide-y divide-white/15 border-t border-white/15 lg:mt-16 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {chain.map(({ role, party, note }, index) => (
            <div
              key={role}
              className={
                index === 0
                  ? "py-6 lg:pt-8 lg:pr-8 lg:pb-0"
                  : "py-6 lg:px-8 lg:pt-8 lg:pb-0"
              }
            >
              <dt className="font-mono text-xs tracking-wide text-white/60">
                {role}
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-white">
                {party}
              </dd>
              <dd className="mt-2 text-base text-white/70">{note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
