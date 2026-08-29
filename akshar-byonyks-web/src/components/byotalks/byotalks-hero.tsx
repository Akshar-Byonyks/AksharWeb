import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ScrimmedImage } from "@/components/common/scrimmed-image";
import { byotalksSessions, distinctSpeakers } from "@/lib/byotalks";

// Spec §9.3 `/byotalks/`. Ink at full coverage — one of this page's two
// moments, the other being the closing mass. No third: everything between is a
// library and its speakers, which DESIGN.md's meaning test puts in the light.
//
// THE IMAGE, under the revised imagery doctrine (DESIGN.md, 28 Aug 2026):
// clinicians talking to each other, which is literally what ByoTalks is. It
// depicts a conversation rather than a treatment, so it stays clear of the
// Drugs and Magic Remedies Act question that patient photography raises, and
// nobody in it is identifiable as a named individual, so it implies no
// endorsement. Its one flaw — the clinicians are not Indian — is recorded in
// `public/images/README.md` against the launch gate.
//
// THE COUNTS ARE COMPUTED, NOT WRITTEN. "Eight sessions" and the speaker count
// are derived from the data, so a ninth session added to `byotalks.ts` cannot
// leave a stale number in the hero. Spec §5's P1 defect on the old site is one
// claim carried at two values; a hardcoded count next to a rendered list is
// the same defect waiting for someone to add a row.
export function ByoTalksHero() {
  const sessionCount = byotalksSessions.length;
  const speakerCount = distinctSpeakers().length;

  return (
    <section
      aria-labelledby="byotalks-hero-heading"
      className="relative isolate bg-ink"
    >
      <ScrimmedImage
        src="/images/clinicians-in-discussion.jpg"
        alt="Three clinicians in white coats standing together in discussion, one speaking and the others listening."
        priority
        objectPosition="center 30%"
      />
      <div className="relative mx-auto max-w-[1280px] px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <Breadcrumbs tone="dark" items={[{ name: "ByoTalks" }]} />

        <div className="mt-10 lg:mt-14">
          <h1
            id="byotalks-hero-heading"
            className="max-w-3xl text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
          >
            Nephrologists on peritoneal dialysis, at length
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            {sessionCount} recorded sessions with {speakerCount} clinicians on
            the practical questions of peritoneal dialysis &mdash; catheter
            insertion and its complications, prescription, adequacy,
            peritonitis, and what a home programme has to provide around the
            patient.
          </p>
          <p className="mt-5 max-w-2xl text-base text-white/60">
            Clinician to clinician. These are not product presentations, and
            nothing in them is a recommendation about an individual&rsquo;s
            treatment.
          </p>
        </div>
      </div>
    </section>
  );
}
