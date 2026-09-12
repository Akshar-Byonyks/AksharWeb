"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Color, type Mesh, type ShaderMaterial } from "three";

// Ported from React Bits (reactbits.dev) — JS + CSS variant, JS converted to
// TS for this project's strict App Router setup. Shader logic and uniform
// wiring are unmodified from the source component.

type SilkUniforms = {
  uSpeed: { value: number };
  uScale: { value: number };
  uNoiseIntensity: { value: number };
  uColor: { value: Color };
  uRotation: { value: number };
  uTime: { value: number };
};

const hexToNormalizedRGB = (hex: string): [number, number, number] => {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16) / 255,
    parseInt(clean.slice(2, 4), 16) / 255,
    parseInt(clean.slice(4, 6), 16) / 255,
  ];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

// `onFirstFrame` is this project's addition, not React Bits'. Everything
// else in this file — shaders, uniforms, the plane — is the ported component
// unmodified. It exists so the opening curtain can wait for real pixels
// rather than for a chunk to finish downloading: the dynamic import resolving
// only means three.js has parsed, and dropping the curtain there would reveal
// an empty canvas that fills in a beat later. See `lib/splash.ts`.
const SilkPlane = forwardRef<
  Mesh,
  { uniforms: SilkUniforms; onFirstFrame?: () => void }
>(
  function SilkPlane({ uniforms, onFirstFrame }, ref) {
    const { viewport } = useThree();
    const frames = useRef(0);

    useLayoutEffect(() => {
      const mesh = (ref as React.RefObject<Mesh>).current;
      if (mesh) {
        mesh.scale.set(viewport.width, viewport.height, 1);
      }
    }, [ref, viewport]);

    useFrame((_, delta) => {
      const mesh = (ref as React.RefObject<Mesh>).current;
      const material = mesh?.material as ShaderMaterial | undefined;
      if (material) {
        material.uniforms.uTime.value += 0.1 * delta;
      }

      // Signalled on the SECOND tick, not the first. `useFrame` runs before
      // the renderer draws, so at the first callback nothing has reached the
      // screen yet; by the second, frame one is on the glass.
      frames.current += 1;
      if (frames.current === 2) onFirstFrame?.();
    });

    return (
      <mesh ref={ref}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    );
  },
);

export interface SilkProps {
  speed?: number;
  scale?: number;
  /**
   * REQUIRED, though the vendored original defaulted it to "#7B7481" — a grey
   * belonging to no palette on this site. The one caller has always read
   * `--color-primary` and passed it, so the default was unreachable; leaving
   * it in place meant a second, wrong hue sitting in the file a future caller
   * could silently inherit. Required instead of re-defaulted to the token,
   * because this component cannot read CSS custom properties itself — the
   * caller is where the palette lives, and now the compiler says so.
   */
  color: string;
  noiseIntensity?: number;
  rotation?: number;
  /** Project addition — fires once, after the first frame is on screen. */
  onFirstFrame?: () => void;
}

export default function Silk({
  speed = 5,
  scale = 1,
  color,
  noiseIntensity = 1.5,
  rotation = 0,
  onFirstFrame,
}: SilkProps) {
  const meshRef = useRef<Mesh>(null);

  const uniforms = useMemo<SilkUniforms>(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },
      uRotation: { value: rotation },
      uTime: { value: 0 },
    }),
    // Uniforms object identity must stay stable across prop changes; values
    // are pushed into it via the effect below instead of by recreating it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    uniforms.uSpeed.value = speed;
    uniforms.uScale.value = scale;
    uniforms.uNoiseIntensity.value = noiseIntensity;
    uniforms.uColor.value.setRGB(...hexToNormalizedRGB(color));
    uniforms.uRotation.value = rotation;
  }, [speed, scale, noiseIntensity, color, rotation, uniforms]);

  // THE SHADER STOPS WHEN NOBODY IS LOOKING AT IT (2 Sep 2026, measured).
  //
  // `frameloop="always"` is the port's default and it means exactly that: the
  // fragment shader ran every frame for as long as Home stayed open, including
  // the entire scroll through the night figure, the audience cards and the
  // news band, with the canvas hundreds of pixels above the viewport. On a
  // throttled profile the hero was accounting for 3,576ms of long tasks.
  //
  // Starts `true` so the first frame always renders: `onFirstFrame` is what
  // releases the opening curtain, and a canvas that begins paused would hold
  // it to its 3s ceiling. The 200px margin restarts the loop just before the
  // wash scrolls back into view, so it is never caught mid-blank.
  const hostRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="h-full w-full">
      {/* DPR IS CAPPED AT 1.5, NOT 2, and fragment cost scales with the
          square of it. This is an out-of-focus gradient wash with no edge
          anywhere in it, so the resolution a third device-pixel-ratio step
          buys is spent on detail the shader does not contain.

          Checked by rendering the hero on a 412px / 3x profile and looking:
          the wash is smooth at 1.5, with no banding and nothing to alias.
          Deliberately NOT checked by diffing the two renders — the shader is
          animated, so two runs land on different frames and the difference
          that comes back is the animation, not the resolution. */}
      <Canvas dpr={[1, 1.5]} frameloop={onScreen ? "always" : "never"}>
        <SilkPlane
          ref={meshRef}
          uniforms={uniforms}
          onFirstFrame={onFirstFrame}
        />
      </Canvas>
    </div>
  );
}
