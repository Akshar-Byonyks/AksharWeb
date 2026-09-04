"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type Variants,
} from "framer-motion";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import {
  contactCta,
  primaryNav,
  type NavLink as NavItem,
} from "@/lib/navigation";
import { requestSplashReplay, SPLASH_PATH } from "@/lib/splash";
import { cn } from "@/lib/utils";

// Ported and adapted, not dropped in — CLAUDE.md's standing rule for any
// third-party component. What changed from the source paste, all of it
// load-bearing:
//
// 1. IT IS IN FLOW, NOT `fixed`. The source floats at `fixed top-6`, which
//    means every route underneath needs top clearance it does not have —
//    inner pages open at `pt-10` and their breadcrumbs would sit under the
//    pill. The header this replaces was `sticky top-0`, so the document
//    already reserves a bar's worth of space at the top of every route.
//    Staying in flow inherits that reservation exactly and leaves all ~20
//    route templates untouched. It still pins and still collapses.
// 2. REAL NAV DATA. The source ships four hardcoded demo links to `#`. This
//    reads `primaryNav`, the single source the footer and mobile drawer also
//    read, so the three cannot drift apart.
// 3. THE COLLAPSED STATE IS REACHABLE BY KEYBOARD. The source hangs `onClick`
//    on the <nav> and hides the links with `pointer-events-none`, which
//    leaves them tabbable while invisible and leaves the collapsed pill
//    operable by mouse only. Here the link group goes `inert` when collapsed
//    (out of the tab order and out of the accessibility tree together), and
//    the collapsed affordance is a real <button> with `aria-expanded`.
// 4. IT DOES NOT COLLAPSE UNDER `prefers-reduced-motion`. A nav that
//    disappears on scroll is a moving target for anyone who asked the
//    platform for less motion, so under that setting it simply stays open.
// 5. THE PILL ONLY CLIPS WHILE IT IS MOVING. `overflow-hidden` is what makes
//    the width collapse look right, but it also clips any section panel drawn
//    inside the capsule. Rendering the panel outside the <nav> fixes the
//    clipping and breaks something worse: the panel's links land at the very
//    end of the tab order instead of after their own trigger, so tabbing off
//    "Innovation" moves to "ByoTalks" and closes the panel — the children
//    become unreachable by keyboard, which is the same defect as the source's
//    `pointer-events-none`. So the clip is conditional. It is on whenever the
//    nav is collapsed or mid-animation, and off once it settles open, which is
//    the only time a panel can be showing. The panel then lives inside its own
//    <li>, in the correct DOM order.

/** Scroll depth before the nav is allowed to collapse at all. */
const COLLAPSE_AFTER_Y = 150;
/** How far back up the user must scroll to bring it back. */
const EXPAND_SCROLL_THRESHOLD = 80;
/** And how far down before it closes — the same hysteresis, mirrored. */
const COLLAPSE_SCROLL_THRESHOLD = 80;
/** Just past the reopening spring, after which the capsule stops clipping. */
const CLIP_FAILSAFE_MS = 1500;

// THE LOGO SLOT, FILLED 1 SEP 2026. The client supplied the Akshar Byonyks
// lockup; this slot was built on 31 Aug reserving its space so that nothing
// would reflow on the day it arrived, and nothing did.
//
// IT IS THE EMBLEM, NOT THE LOCKUP, and that is forced by the artwork rather
// than chosen. The supplied file stacks a globe, the AB monogram, the script
// wordmark, "INTERNATIONAL LLC" and a two-line tagline into a near-square
// 1628×1258. Scaled to the 28px this bar reserves, the whole lockup would be
// 36px wide with the tagline set at under 2px — unreadable, and an insult to
// the artwork. The emblem (globe, gold ring, monogram) is cropped out of it
// and carries the mark on its own, which is what a compact nav bar is for.
//
// `alt` carries the company name rather than being empty: this is the only
// home control in the bar, and it replaced a link that read "Home", so the
// image IS the link's accessible name. An empty alt here would leave a
// keyboard or screen-reader user with an unlabelled link.
//
// Provenance is in `public/images/README.md`, per CLAUDE.md gate 2, including
// the crop box this file was cut with.
type LogoAsset = { src: string; width: number; height: number; alt: string };
const LOGO: LogoAsset | null = {
  src: "/images/brand/akshar-byonyks-emblem.png",
  // Intrinsic dimensions of the file on disk, not the rendered size — the
  // rendered height is `LOGO_SLOT_HEIGHT` and the width follows from the
  // ratio. next/image needs the true intrinsics to reserve layout correctly.
  width: 360,
  height: 247,
  alt: "Akshar Byonyks",
};

/**
 * Reserved height of the logo slot; the placeholder matches it exactly.
 *
 * RAISED FROM 28 TO 34 ON 1 SEP 2026, when the real emblem went in and was
 * measured on screen rather than imagined. 28 was chosen while the slot held
 * the word "Home", where it was simply a line of text; the emblem is a globe
 * with a monogram over it and at 28px the continents, the gold ring and the AB
 * all collapsed into a blue smudge. At 34 the mark reads.
 *
 * 34 is also close to the ceiling: the capsule is 48px tall while clipped, so
 * this plus the row's padding is what the bar can hold without the logo
 * touching its edges. It must stay a constant whatever its value — the width
 * animates and the height must not, or the collapse springs vertically.
 */
const LOGO_SLOT_HEIGHT = 34;

const containerVariants: Variants = {
  expanded: {
    width: "auto",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
  collapsed: {
    width: "3rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      // NO `when: "afterChildren"` (removed 31 Aug 2026). It was here so the
      // pill would not shrink until its contents had faded, and it is the
      // reason the bar broke on fast scrolling.
      //
      // `afterChildren` waits for the WHOLE nested variant tree — the four
      // direct children, then the list, then every item inside it, each with
      // its own 0.2s and its own stagger. That is comfortably over half a
      // second. A reader flicking up and down changes direction faster than
      // that, so the next state arrived before the width animation had been
      // allowed to start, and it never started at all: measured over a
      // three-second flick, `aria-expanded` flipped six times while the width
      // stayed at exactly one value the entire time. The bar sat open, at full
      // width, with its links already `inert` — visible, and not clickable.
      //
      // Shrinking immediately is also what this component already says it
      // wants: the class list below notes the collapsed contents "are meant to
      // be clipped by the width animation", which is what `isClipped` is for.
      // The stagger stays, it just no longer gates the container.
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants: Variants = {
  expanded: { opacity: 1, x: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

const itemVariants: Variants = {
  expanded: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", damping: 15 },
  },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

// THIS BUTTON IS ITS OWN ANIMATION ROOT — see the `animate` prop where it is
// rendered, which is what stops the nav's 0.33s of inherited stagger from
// reaching it.
//
// THE EXIT IS INSTANT, AND THAT IS DELIBERATE. Rooting the button alone cut
// the icon from a full-opacity ~800ms down to a ~130ms ghost, but a ghost is
// still something a reader sees inside an open bar, and a duration-based fade
// is at the mercy of the frame it lands on. Measured across twenty routes,
// peak opacity while the bar was ALREADY past 200px ranged 0.18 to 0.86 — the
// worst of them on the heaviest page, where a dropped frame froze the fade
// part-way while the width spring ran on. No fade duration can be made
// reliable here, because the two animations are racing and only one of them
// is time-based.
//
// Asymmetric on purpose. Going OPEN the icon is simply gone: its job has been
// taken over by the bar's own contents, and nothing is served by watching it
// dissolve behind them. Coming CLOSED it still springs in after 0.15s, so it
// arrives once the pill has actually shrunk to meet it.
const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 15, stiffness: 300, delay: 0.15 },
  },
};

export function AnimatedNav({ items = primaryNav }: { items?: NavItem[] }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isExpanded, setExpanded] = React.useState(true);

  // Which section's child panel is showing. `null` is closed.
  const [openHref, setOpenHref] = React.useState<string | null>(null);
  // The capsule clips its contents while it is moving; see note 5 above.
  // Driven by a timer rather than framer's `onAnimationComplete`, because
  // `initial={false}` means the mount fires `onAnimationStart` with no
  // animation to follow it — the completion callback never arrives and the
  // clip latches on forever, which silently swallows every section panel.
  const [isClipped, setClipped] = React.useState(false);

  const shellRef = React.useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  // THE TURNING POINT OF THE CURRENT GESTURE: the shallowest scroll position
  // reached since the bar opened, or the deepest reached since it closed. Both
  // states measure the reader's next move against it, so the bar responds to a
  // gesture rather than to a single event.
  //
  // BOTH DIRECTIONS ARE HYSTERETIC, and that is the whole of this (31 Aug
  // 2026). Two earlier versions failed here in ways only a real trace showed:
  //
  //   1. The anchor was the position the bar COLLAPSED at, fixed. Carry on
  //      down a long page and `anchor - latest` goes negative, so the upward
  //      gesture can never clear the threshold — the bar stayed a dot until
  //      you scrolled back above where it shut.
  //   2. Closing had no threshold at all: any downward event past
  //      `COLLAPSE_AFTER_Y` shut it. But one upward flick does not arrive as a
  //      monotonic run — scroll anchoring and momentum bounce it back down
  //      mid-gesture, and a traced 300px flick read [967, 1025, 967]. So the
  //      bar opened on the first event, the 58px bounce slammed it shut again,
  //      and the last event was too small to reopen it. It ended closed after
  //      a gesture that was unambiguously upward.
  //
  // Requiring a real run in EITHER direction makes both bounces inert.
  const gestureAnchor = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (reduceMotion) return;

    if (isExpanded) {
      // Open: the anchor rides the shallowest point, so the distance below it
      // is how far the reader has actually committed to going down.
      gestureAnchor.current = Math.min(gestureAnchor.current, latest);
      if (
        latest > COLLAPSE_AFTER_Y &&
        latest - gestureAnchor.current > COLLAPSE_SCROLL_THRESHOLD
      ) {
        setExpanded(false);
        gestureAnchor.current = latest;
      }
      return;
    }

    // Near the top the bar is always open, whatever the gesture was. Without
    // this, landing back at the top by any route that is not a slow scroll —
    // anchor jump, Home key, browser scroll restoration — leaves the header a
    // dot on a page that has nothing above it to scroll up through.
    if (latest <= COLLAPSE_AFTER_Y) {
      setExpanded(true);
      gestureAnchor.current = latest;
      return;
    }

    // Closed: the anchor rides the deepest point, so a bounce cannot walk it
    // back up and shorten the gesture that reopens.
    gestureAnchor.current = Math.max(gestureAnchor.current, latest);
    if (gestureAnchor.current - latest > EXPAND_SCROLL_THRESHOLD) {
      setExpanded(true);
      gestureAnchor.current = latest;
    }
  });

  // A panel that outlived its trigger would hang in mid-air over the page:
  // close it when the pill collapses, and when a navigation completes.
  React.useEffect(() => {
    if (!isExpanded) setOpenHref(null);
  }, [isExpanded]);

  // Clip immediately on the way closed, and stay clipped until the reopening
  // spring has ACTUALLY settled — `onAnimationComplete` on the bar below is
  // what releases it. This timer is only a failsafe.
  //
  // It used to be the other way round: a flat `CLIP_RELEASE_MS` of 600ms was
  // the release, and it is what produced the reported jump on expand. The
  // release turns wrapping loose on a bar with about 2px of slack (554px of
  // content in a 556px bar), so landing even slightly before the width spring
  // finished meant the contents did not fit, wrapped to a second row for a few
  // frames, and made the bar 74px tall instead of 48. `layout="position"` then
  // animated the delta that implied — a measured translateY(-26px) springing
  // back to zero, which is exactly the bar shifting up and returning.
  //
  // A stopwatch cannot know when a spring has arrived, and this spring is
  // interruptible, so no constant is correct. The failsafe is kept because
  // `onAnimationComplete` has been unreliable in this component before (it
  // does not fire for an animation that never ran), and a bar stuck clipped
  // forever would hide its own links. It is set well past the spring so that
  // if it ever is the thing that fires, it still lands after the width is
  // final.
  React.useEffect(() => {
    if (!isExpanded) {
      setClipped(true);
      return;
    }
    const timer = setTimeout(() => setClipped(false), CLIP_FAILSAFE_MS);
    return () => clearTimeout(timer);
  }, [isExpanded]);

  // A new route arrives at the top of the document, and this component does
  // not remount across a client-side navigation — so a bar that collapsed on
  // the way down the previous page would otherwise land on the next one as a
  // dot, above content the reader cannot scroll up through to reopen it.
  // Every route starts with the full bar.
  React.useEffect(() => {
    setOpenHref(null);
    setExpanded(true);
    gestureAnchor.current = 0;
  }, [pathname]);

  // The same section-parent rule `NavLink` uses: /innovation is the active
  // trail while you are on /products/the-x1-cycler. Two different answers to
  // "where am I" in one header would be worse than either.
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  // THE LOGO IS THE WAY BACK TO THE OPENING, on client instruction (2 Sep
  // 2026): clicking the mark replays the site's curtain. It is the only
  // control that does. The footer's home link, a body link and the back button
  // all still arrive on Home without one, which is what keeps this a
  // deliberate act rather than a toll on ordinary navigation.
  //
  // MODIFIED CLICKS ARE EXCLUDED because they do not navigate this tab at all:
  // a cmd-click opens Home in a new one and leaves this page exactly where it
  // is, so requesting a curtain would arm one on a page nobody is leaving.
  //
  // The request is a flag rather than a curtain — `splash.ts` explains why the
  // arming has to happen at the far end rather than here.
  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    // Already on Home: there is no route change to carry the reader to the top
    // of the document, and lifting a curtain onto the middle of a page they
    // had scrolled is a strange place to be returned to.
    if (pathname === SPLASH_PATH) window.scrollTo({ top: 0 });

    requestSplashReplay();
  };

  // Focus leaving the shell entirely closes the panel; focus moving from the
  // trigger into the panel does not, because the panel is a descendant.
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!shellRef.current?.contains(event.relatedTarget as Node | null)) {
      setOpenHref(null);
    }
  };

  return (
    // Centred while open, parked at the right edge once collapsed. The pill
    // itself carries `layout="position"` so it travels there instead of
    // teleporting — position only, because its width is already being animated
    // by the variants and letting layout drive size as well makes it stretch.
    // A <header>, not a <div>, since 2 Sep 2026. Two things were wrong with
    // the div. It left the site with no banner landmark at all — `header.tsx`
    // supplied one until this replaced it on 31 Aug and nothing took over the
    // role. And `site-splash.tsx` holds the page `inert` behind the curtain by
    // selecting `header`, `footer` and `main`'s children, so with no <header>
    // in the document the nav was the one region NOT held back: every link in
    // it stayed clickable and screen-reader-reachable underneath a curtain
    // that announces itself as a loading status. Found while wiring the logo
    // to replay that curtain, which the gap would have let a reader retrigger
    // mid-cycle.
    <header
      className={cn(
        "sticky top-0 z-50 flex px-4 py-3",
        isExpanded ? "justify-center" : "justify-end",
      )}
    >
      <div
        ref={shellRef}
        className="relative"
        onMouseLeave={() => setOpenHref(null)}
        onBlur={handleBlur}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpenHref(null);
        }}
      >
        <motion.nav
          aria-label="Primary"
          layout="position"
          initial={false}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={containerVariants}
          // The real clip release. The width is final at this point, so
          // letting the contents wrap can no longer make the bar taller than
          // it is about to be — see the effect above for what happened when a
          // timer guessed at this instead.
          onAnimationComplete={(definition) => {
            if (definition === "expanded") setClipped(false);
          }}
          whileHover={!isExpanded ? { scale: 1.05 } : undefined}
          whileTap={!isExpanded ? { scale: 0.95 } : undefined}
          className={cn(
            // `min-h-12` and `flex-wrap`, not `h-12`. WCAG 1.4.10: at 200%
            // text on a 320px viewport the wordmark, the Hindi switch and the
            // menu trigger together exceed any phone, and a fixed-height row
            // that cannot wrap pushes the document sideways instead — measured
            // at 324px in a 320px viewport. The header this replaced carried
            // the same fix for the same reason; the capsule lost it, and
            // reflow means the bar grows downward rather than the page growing
            // outward. At normal text size the row fits and the pill measures
            // exactly the 48px it always did, so nothing moves.
            "relative flex max-w-full items-center justify-center rounded-full border border-line bg-background/80 shadow-lg backdrop-blur supports-backdrop-filter:bg-background/70",
            // WRAPPING IS FOR THE BAR THAT IS SETTLED OPEN, and the height is
            // pinned while it is moving. Three bugs met here; this is the
            // combination that answers all of them (31 Aug 2026).
            //
            // Wrapping exists for WCAG 1.4.10: at 200% text on a 320px
            // viewport the wordmark, the Hindi switch and the menu trigger
            // exceed any phone, and a row that cannot wrap pushes the document
            // sideways instead — measured at 324px in a 320px viewport.
            //
            // But it must be OFF while the width is animating, because a bar
            // narrower than its contents does not clip them, it stacks them.
            // Left on through an expand, the seven links sit on four rows for
            // the whole animation — measured at tops 13/54/86/88 inside a 48px
            // box — and snap into a single row at the end, which reads as the
            // contents jumbling and then sorting themselves out. It is also
            // what turns the collapsed capsule into a 48x106 stack instead of
            // a circle.
            //
            // `isClipped` already means exactly "collapsed, or moving", and it
            // is now released by the width animation itself rather than by a
            // timer, so by the time wrapping is turned on the width is final
            // and the contents cannot wrap by accident. That is what fixed the
            // separate translateY(-26px) jump on expand: a release that landed
            // mid-spring let the bar wrap for a few frames on its 2px of slack,
            // grew it to 74px tall, and `layout="position"` animated the delta.
            //
            // The height pin below is the third leg: while clipped the box is a
            // fixed 3rem, so nothing that happens to the contents inside it can
            // move the box and give the layout animation a delta to find.
            !isClipped ? "flex-wrap" : "flex-nowrap",
            // On while collapsed or moving, off once settled open — the only
            // state in which a section panel can be showing. `h-12` rides the
            // same flag: see the note above for why the height must not move
            // while the width does. `min-h-12` takes over once settled, so the
            // bar is free to grow downward at large text sizes.
            isClipped ? "h-12 overflow-hidden" : "min-h-12",
          )}
        >
          <motion.div
            variants={logoVariants}
            className="flex shrink-0 items-center pl-1.5"
          >
            <Link
              href="/"
              onClick={handleLogoClick}
              aria-current={pathname === "/" ? "page" : undefined}
              className={cn(
                "flex items-center rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap text-foreground transition-colors hover:bg-surface-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                pathname === "/" && "bg-surface-2 font-semibold text-ink",
              )}
            >
              {LOGO ? (
                <Image
                  src={LOGO.src}
                  alt={LOGO.alt}
                  width={LOGO.width}
                  height={LOGO.height}
                  priority
                  className="w-auto"
                  style={{ height: LOGO_SLOT_HEIGHT }}
                />
              ) : (
                // Reads "Home" until the logo PNG lands. Holding the slot's
                // exact height means the bar does not resize when the image
                // replaces this, and a labelled link beats an empty box: the
                // home control is never invisible in the tab order.
                <span
                  className="flex items-center"
                  style={{ height: LOGO_SLOT_HEIGHT }}
                >
                  Home
                </span>
              )}
            </Link>
          </motion.div>

          {/* `inert` rather than `pointer-events-none`: it takes the links out
              of the tab order and the accessibility tree at the same time, so
              the collapsed pill cannot hide four links that a keyboard still
              reaches and a screen reader still announces. */}
          <motion.ul
            inert={!isExpanded}
            className="hidden shrink-0 items-center gap-0.5 px-1 lg:flex"
          >
            {items.map((item) => {
              const active = isActive(item.href);
              const hasChildren = Boolean(item.children?.length);
              return (
                <motion.li
                  key={item.href}
                  variants={itemVariants}
                  className="relative"
                  onMouseEnter={() =>
                    setOpenHref(hasChildren ? item.href : null)
                  }
                  onFocus={() => setOpenHref(hasChildren ? item.href : null)}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={hasChildren ? openHref === item.href : undefined}
                    className={cn(
                      "block rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap text-foreground transition-colors hover:bg-surface-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      // Weight as well as tint: colour is never the sole
                      // carrier of meaning here.
                      active && "bg-surface-2 font-semibold text-ink",
                    )}
                  >
                    {item.label}
                  </Link>

                  {/* THE PANEL HAS NO MARGIN, IT HAS PADDING. The visible card
                      is inset by `pt-2`, so the hit area runs unbroken from
                      the trigger to the card. With `mt-2` those eight pixels
                      belong to neither element, the pointer crosses dead
                      ground on its way down, `onMouseLeave` fires on the shell
                      and the panel shuts under the cursor.

                      It sits inside its own <li>, immediately after the link
                      that opens it, so Tab from "Innovation" lands on "The X-1
                      Cycler" rather than skipping to the next section. */}
                  {hasChildren && openHref === item.href ? (
                    <div className="absolute top-full left-0 z-10 pt-2">
                      <ul className="min-w-[220px] rounded-lg border border-line bg-background p-2 shadow-lg">
                        {item.children?.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={
                                isActive(child.href) ? "page" : undefined
                              }
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm whitespace-nowrap text-foreground transition-colors hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                                isActive(child.href) &&
                                  "bg-surface-2 font-semibold text-ink",
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div
            variants={itemVariants}
            inert={!isExpanded}
            className="flex shrink-0 items-center gap-1 pr-1.5 pl-1"
          >
            {/* The Hindi track keeps its place in the primary chrome, set in
                Devanagari and marked `lang="hi"` so a screen reader
                pronounces it — a switch labelled in the language you cannot
                read is the standard way this control fails. */}
            <Link
              href="/hi"
              lang="hi"
              className="rounded-full px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              हिन्दी
            </Link>
            <Button
              asChild
              size="sm"
              className="hidden rounded-full sm:inline-flex"
            >
              <Link href={contactCta.href}>{contactCta.label}</Link>
            </Button>
            {/* The full-screen drawer carries the same children on small
                screens, and it is a native <dialog> — focus trap, Escape and
                backdrop dismissal for free. */}
            <MobileNav />
          </motion.div>

          {/* A real button, not a click handler on the <nav>. It fills the
              collapsed pill and is `inert` while the nav is open, so there is
              never a second invisible control in the tab order. */}
          <motion.button
            type="button"
            variants={collapsedIconVariants}
            // ITS OWN `animate`, AND THAT IS THE FIX (2 Sep 2026). Reported as
            // the three-line icon staying inside the bar after scrolling up to
            // reopen it, and that is exactly what happened.
            //
            // Variants propagate to every descendant motion component that
            // inherits the parent's state, and the nav's `expanded` transition
            // carries `delayChildren: 0.12` with `staggerChildren: 0.07`. This
            // button is the FOURTH motion child of the nav, so framer handed it
            // 0.12 + 3 x 0.07 = 0.33s of delay before its fade even began, and
            // another 0.2s to run. The width spring, meanwhile, has the bar
            // visibly wide almost at once — so for about a third of a second a
            // full-opacity menu icon sat in the middle of an open navbar.
            //
            // A child that declares its own `animate` is an animation root: the
            // parent's orchestration stops at it. The stagger then stays where
            // it was actually wanted — on the links, which are meant to arrive
            // one after another — and the icon leaves on its own 0.12s.
            //
            // `initial={false}` because this is a root now. Without it the
            // button animates from its variant on first mount, which on a page
            // that loads scrolled (an anchor, a restored position) would flash
            // the menu icon over the open bar on arrival.
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            inert={isExpanded}
            aria-expanded={isExpanded}
            aria-label="Show navigation"
            onClick={() => setExpanded(true)}
            className="absolute inset-0 flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Menu aria-hidden="true" className="size-5 text-ink" />
          </motion.button>
        </motion.nav>
      </div>
    </header>
  );
}
