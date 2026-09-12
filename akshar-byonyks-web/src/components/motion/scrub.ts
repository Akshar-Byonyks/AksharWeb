// THE CATCH-UP BETWEEN A SCROLL POSITION AND A SCRUBBED ANIMATION.
//
// Three scenes on this site are scrubbed: the access-geometry stack, the two
// paths band, and the silhouette edge. Each computes a 0..1 progress from its
// own geometry and writes it to `--p`. Every one of them used to write that
// value straight to the element, which is the obvious implementation and is
// wrong for the input people actually scroll with.
//
// WHAT WAS MEASURED (12 Sep 2026, from a reader's own machine after they
// reported animations "completing half from the smallest movement"):
//
//   median wheel event      15px     <- a precision touchpad, reporting finely
//   LARGEST single event   785px     <- one inertial flick
//   peak rate             6133px/s
//
// And the scrub ranges those events drive:
//
//   silhouette edge        550px     <- SHORTER than one wheel event
//   access-geometry stack  700px     <- shorter than one wheel event
//   two paths             1300px
//
// So a single flick could deliver more scroll than an entire animation, in one
// event, and the scene would jump from start to finish between two frames.
// Nothing was non-linear — measured, the scrub was exactly linear, worst step
// equal to average. The scene was simply shorter than the reader's gesture.
//
// Lengthening the tracks was the other option and it was rejected: the tracks
// are pinned, so adding scroll room makes the page hold content still for
// longer, which is the *other* thing that reads badly. This costs no page
// height at all.
//
// WHAT THIS DOES. Progress becomes a target rather than a value, and the
// written value chases it. A 785px jump therefore plays as a fast movement
// over a few frames instead of a cut. This is the same device as GSAP's
// `scrub: <seconds>`, and it is the reason that option exists there too.
//
// The approach is exponential and FRAMERATE-INDEPENDENT — `1 - e^(-dt/tau)`
// rather than a fixed per-frame fraction. A fixed fraction is the usual
// version of this and it silently runs at double speed on a 120Hz display,
// which is a bug a laptop will never show you.
//
// Reduced motion never reaches here: all three callers gate on
// `prefers-reduced-motion: no-preference` before constructing one.

export type Scrub = {
  /** Point the animation at a new progress. It eases there. */
  set: (target: number) => void;
  /** Go there now, with no easing — for mount, resize and teardown. */
  jump: (value: number) => void;
  /** Cancel any in-flight frame. Call from effect cleanup. */
  stop: () => void;
};

export function createScrub(
  write: (value: number) => void,
  /**
   * Time constant. After `tauMs` the value has closed ~63% of the gap, and
   * ~95% after three of them. 200ms reads as weight rather than as lag: a
   * flick still resolves inside a third of a second.
   */
  tauMs = 200,
): Scrub {
  let target = 0;
  let current = 0;
  let frame: number | null = null;
  let last = 0;
  let primed = false;

  const tick = (now: number) => {
    // Clamped, because a backgrounded tab hands back one enormous delta on
    // return and an unclamped step would resolve the whole gap in one frame —
    // reintroducing exactly the cut this exists to remove.
    const dt = Math.min(64, now - last);
    last = now;

    current += (target - current) * (1 - Math.exp(-dt / tauMs));

    // Close enough that another frame would not be visible. Snapping here
    // rather than easing forever is what lets the loop stop; a scrub that
    // keeps a rAF alive after it has arrived is a battery cost on a page the
    // reader may have stopped looking at.
    if (Math.abs(target - current) < 0.0005) {
      current = target;
      frame = null;
      write(current);
      return;
    }

    write(current);
    frame = requestAnimationFrame(tick);
  };

  return {
    set(next) {
      target = next;
      // The FIRST value is never eased. A reader landing mid-page — a reload
      // that restores scroll, a deep link, the back button — must find the
      // scene already at the right frame, not animating into it.
      if (!primed) {
        primed = true;
        current = next;
        write(current);
        return;
      }
      if (frame === null) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    },
    jump(value) {
      primed = true;
      target = value;
      current = value;
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      write(current);
    },
    stop() {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    },
  };
}
