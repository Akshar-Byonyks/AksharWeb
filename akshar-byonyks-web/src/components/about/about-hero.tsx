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
    a: `Yes — and a clearance does not travel. It is the device cleared under 510(k) ${fdaClearance.kNumber}, held by Byonyks. That clearance authorises marketing in the United States. India's position is separate, is being established under the Medical Device Rules 2017, and will be stated here precisely once it is confirmed.`,
  },
  {
    q: "Is this an Indian company?",
    a: "Yes. Akshar Byonyks exists for one market, and the argument for home dialysis is stronger in that market than in the one that cleared the device.",
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
          <p className="mt-6 text-xl text-white/75">
            Three questions decide whether the rest of this site is worth your
            time. They are answered here rather than further down.
          </p>
        </div>

        {/* A definition list, because that is literally what this is. The
            questions are marked up as terms so a screen reader announces the
            pairing rather than six loose paragraphs. */}
        <dl className="mt-14 max-w-4xl space-y-8 border-t border-white/15 pt-10 lg:mt-16">
          {questions.map(({ q, a }) => (
            <div key={q}>
              <dt className="text-xl font-semibold text-balance text-white sm:text-2xl">
                {q}
              </dt>
              <dd className="mt-3 text-lg text-white/75">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
