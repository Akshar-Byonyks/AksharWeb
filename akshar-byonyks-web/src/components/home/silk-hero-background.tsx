"use client";

import { useState } from "react";

import Silk from "@/components/home/silk";
import { signalSilkReady } from "@/lib/splash";

// --color-primary (#0d5d8d, "Accessible Sky Blue" in DESIGN.md) is the
// site's workhorse blue — links, primary buttons, stat numbers, icon fills —
// darker than --color-brand-accent (#1388cd) by design, so it reads as a
// deliberate deep-blue wash rather than the brighter parent-brand hue. Read
// from the CSS custom property so this stays the one place the hue is
// defined, rather than a second hardcoded copy that can drift from it. Safe
// to read synchronously here: this component is only ever mounted client-side
// (loaded via next/dynamic with ssr: false, itself gated on a
// prefers-reduced-motion check), so globals.css is already applied.
export default function SilkHeroBackground() {
  const [color] = useState(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue("--color-primary")
      .trim(),
  );

  return (
    <Silk
      speed={5}
      scale={1.3}
      color={color}
      noiseIntensity={0}
      rotation={0}
      // Tells the opening curtain there are pixels on the canvas. Nothing on
      // this page reads the result — the curtain is in the root layout and
      // this is the far end of a module-level bus, deliberately, so that
      // wiring it did not require making the layout a client component.
      onFirstFrame={signalSilkReady}
    />
  );
}
