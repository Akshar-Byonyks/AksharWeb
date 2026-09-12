import { ScrollReveal } from "@/components/motion/scroll-reveal";

// Spec §9.2, the four named features: fluid warming to body temperature,
// battery backup, needle-free operation, intuitive interface. Those four and
// no more — nothing here is extrapolated from the render or from what an APD
// cycler usually does.
//
// Rebuilt 26 Aug 2026. This was four identical bordered cards, each with a
// 20px icon chip. The sitewide critique found that same rounded rectangle used
// 23 times on this page alone, and the craft floor names "same-size cards of
// icon plus heading plus text as the page structure" as the lazy container.
//
// Two changes. The cards are now hairline-ruled rows: the separator language
// belongs to the specification table one section further down, so a reader
// meets it twice on the page and reads this as continuous with the data rather
// than as another card grid. And the icons are gone — a 20px chip beside a
// 16px heading carried no visual weight at page scale, and dropping it lets
// the feature text set at a real reading size instead of at card-caption size.
//
// The colour note that used to live here is now moot: with the chips removed
// there is no accent to ration. It stays recorded in DESIGN.md's Wayfinding
// Rule, which is where it belonged.
//
// The device itself moved up into the hero, at full container width with one
// honest annotation. It is not repeated here.
const features = [
  {
    title: "Warms fluid to body temperature",
    body: "The X-1 brings dialysate up to body temperature before it is infused, so an exchange does not begin with a cold fill.",
  },
  {
    title: "Battery backup on board",
    body: "An on-board battery carries the machine through an interruption in mains power instead of ending the cycle.",
  },
  {
    title: "Needle-free",
    body: "Peritoneal dialysis works through a soft catheter in the abdomen. There are no needles in an X-1 exchange.",
  },
  {
    title: "Run from the machine itself",
    body: "Setup and each night's treatment are driven from the X-1's own on-device screen.",
  },
] as const;

export function X1Features() {
  return (
    <section aria-labelledby="x1-features-heading" className="bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        {/* The framing-and-artifact split (DESIGN.md, Layout): heading and its
            lead at the narrower share, the material itself at the wider one.
            The specification table below uses the same grid, so the two
            sections share a spine down the page. */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <ScrollReveal>
            <div>
              <h2
                id="x1-features-heading"
                className="text-3xl font-bold text-balance text-ink sm:text-4xl"
              >
                What the device does
              </h2>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                Four things the X-1 is built to do. Everything else about it is
                in the specification below, including what is not yet published.
              </p>
            </div>
          </ScrollReveal>

          <dl>
            {features.map(({ title, body }, index) => (
              <ScrollReveal
                key={title}
                delayMs={index * 90}
                className="border-t border-line py-6 first:border-t-0 first:pt-0 sm:py-7"
              >
                <dt className="text-lg font-semibold text-ink">{title}</dt>
                <dd className="mt-2 max-w-2xl text-base text-muted-foreground">
                  {body}
                </dd>
              </ScrollReveal>
            ))}
          </dl>
        </div>

      </div>
    </section>
  );
}
