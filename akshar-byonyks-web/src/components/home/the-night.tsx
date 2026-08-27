import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TwoPaths } from "@/components/home/two-paths";

// Added 26 Aug 2026. Home's third full-bleed ink moment, and the site's answer
// to a critique finding: "The cycler runs on its own while the household
// sleeps" was the most human sentence on the site and it was set at 14px as a
// card caption inside the hero's scroll-scrub stack. This section promotes it
// to display scale and gives it the ground it was always describing — ink is
// already the colour of night, and the page was spending 9% of its height on
// it.
//
// It also carries the geography argument the rest of the site drops after the
// hero. The original critique proposed a silhouette of India as the recurring
// graphic; that was withdrawn before build. Depicting India's national boundary
// is a legal matter in Indian jurisdiction, not a stylistic one — a boundary
// authored from memory on an Indian medical-device company's own site is a risk
// the visual payoff does not justify, and the craft floor separately calls an
// approximated organic contour the cheap version of the effect.
//
// The figure beneath has been rebuilt once already. The first version drew the
// week as arcs leaving a baseline; it was reported as unreadable and it was —
// see two-paths.tsx for what replaced it and why.
export function TheNight() {
  return (
    <section aria-labelledby="the-night-heading" className="bg-ink text-white">
      <div className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="the-night-heading"
              className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              The cycler runs on its own while the household sleeps.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-white/75">
              In-centre haemodialysis organises the week around the clinic
              &mdash; roughly three trips, plus the road between them.
              Automated peritoneal dialysis runs overnight, at home, on a
              schedule set with your nephrologist.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Outside the container: the pinned stage manages its own width, because
          a sticky element inside a padded wrapper still pins, but its height
          has to be free of the wrapper's own vertical rhythm. */}
      <TwoPaths />

      <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <p className="max-w-2xl text-sm text-white/60">
          An illustration of how the two routes differ in practice, not a
          clinical schedule. Therapy and its frequency are set by your
          nephrologist.
        </p>
      </div>
    </section>
  );
}
