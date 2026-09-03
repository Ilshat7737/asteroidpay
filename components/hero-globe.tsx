// components/hero-globe.tsx
"use client";

import { useEffect, useSyncExternalStore } from "react";
import { animate, motion, useMotionValue, useTime, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false; // SSR can't read a media query — matches the client's first
  // render too, via useSyncExternalStore, so there's no hydration mismatch.
}

/** SSR-safe `prefers-reduced-motion: reduce` read (no hydration mismatch). */
function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
}

/**
 * Hero globe — a CSS-3D wireframe sphere with a two-stage lime glow and six
 * cubes that fall out of the sky and land (then orbit) on its surface.
 *
 * Geometry follows the Task 2 "Section Artboards" construction spec for the
 * Hero artboard (the plan's own placeholder code for this task predates that
 * spec and is not used here). No WebGL/three.js — everything below is CSS 3D
 * transforms (`perspective` + `transform-style: preserve-3d`) driven by
 * Framer Motion, per the plan's constraints.
 */

// ---------------------------------------------------------------------------
// Geometry constants (values fixed by the approved spec, 1440px-viewport
// reference). Do not "tune" these — they were independently re-derived and
// verified against the approved design canvas.
// ---------------------------------------------------------------------------

const R = 260; // sphere radius, px
const TILT_DEG = 17; // static camera tilt (τ)
const LATITUDES = [0, 34, -34, 62, -62] as const; // φ, degrees
const MERIDIAN_ANGLES = [0, 36, 72, 108, 144] as const; // rotateY, degrees —
// each ellipse's 180°-opposite half is drawn for free by CSS's inherent
// double-sided rendering of a transformed element, so 5 divs give 10 lines.

const SPIN_SECONDS = 32; // one full rotateY(0 -> 360) loop
const FALL_SECONDS = 2.75; // within the spec's 2.5-3s range
const BAND_OFFSET_Y = -1.55 * R; // cube spawn band, relative to sphere center

// This component's own local composition box. Task 7 is responsible for
// placing the whole thing within the hero's right column (spec: sphere
// center at (1080, 360) at the 1440px reference, bleeding ~44px past the
// 1152px content edge) via the `className` prop — these two numbers are
// just internal layout, not page coordinates.
const STAGE_W = 760;
const STAGE_H = 940;
const CENTER = { x: STAGE_W / 2, y: 500 };

const CUBE_SIZE = 13;

// Depth-based opacity ramp — three fixed steps (spec), assigned statically
// per ring/meridian rather than recomputed every frame.
const DEPTH = { near: 0.3, mid: 0.22, far: 0.14 };

function ringOpacity(phi: number) {
  const a = Math.abs(phi);
  if (a === 0) return DEPTH.near; // equator: least foreshortened by the tilt
  if (a === 34) return DEPTH.mid;
  return DEPTH.far; // ±62°: most foreshortened, furthest-reading latitude
}

function meridianOpacity(angle: number) {
  // Every meridian passes through the sphere's center, so none is actually
  // "further away" than another — this isn't a depth cue. It's a fixed,
  // intentional line-weight decoration keyed to each meridian's angle at
  // rest, so the wireframe reads as less uniform/flat: 0° (most face-on at
  // rest) gets the boldest line, 72°/108° (nearest edge-on, closest to a 90°
  // turn) the faintest, and 36°/144° in between.
  if (angle === 0) return DEPTH.near;
  if (angle === 36 || angle === 144) return DEPTH.mid;
  return DEPTH.far;
}

// ---------------------------------------------------------------------------
// Projection helper
// ---------------------------------------------------------------------------

/**
 * Orthographic projection (matching the scene's static camera tilt τ) of a
 * (longitude, latitude) point on the sphere's surface onto the screen, given
 * as an {x, y} pixel offset from the sphere's own center. This is what lets
 * the six landing points sit exactly on the rendered rings/meridians instead
 * of at approximate, hardcoded pixel offsets.
 */
function projectLatLong(lambdaDeg: number, phiDeg: number, radius: number = R, tiltDeg: number = TILT_DEG) {
  const lambda = (lambdaDeg * Math.PI) / 180;
  const phi = (phiDeg * Math.PI) / 180;
  const tau = (tiltDeg * Math.PI) / 180;
  return {
    x: radius * Math.cos(phi) * Math.sin(lambda),
    y: -radius * (Math.sin(phi) * Math.cos(tau) - Math.cos(phi) * Math.cos(lambda) * Math.sin(tau)),
  };
}

// Six named landing points. Longitudes are chosen from the drawn meridian set
// (multiples of 36°) and latitudes from the drawn ring set, so every cube
// lands exactly on a ring/meridian intersection rather than a spot floating
// near the wireframe.
const LANDING_POINTS = [
  { name: "alpha", lambda: 0, phi: 34 },
  { name: "beta", lambda: 72, phi: -34 },
  { name: "gamma", lambda: 144, phi: 62 },
  { name: "delta", lambda: 216, phi: -62 },
  { name: "epsilon", lambda: 288, phi: 0 },
  { name: "zeta", lambda: 324, phi: 34 },
] as const;

// Staggered fall-start times (seconds after mount) spread across one spin
// period so the six cubes don't all drop in unison. Each cube falls once and
// stays landed/orbiting thereafter — see FallingCube's `progress`.
const FALL_DELAY_SECONDS = LANDING_POINTS.map((_, i) => (i * SPIN_SECONDS) / LANDING_POINTS.length);

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
}

// ---------------------------------------------------------------------------
// Wireframe primitives
// ---------------------------------------------------------------------------

function Meridian({ angle }: { angle: number }) {
  return (
    <div
      className="absolute inset-0 rounded-full border"
      style={{
        borderColor: "var(--color-accent)",
        opacity: meridianOpacity(angle),
        transform: `rotateY(${angle}deg)`,
      }}
    />
  );
}

function LatitudeRing({ phi }: { phi: number }) {
  const rad = (phi * Math.PI) / 180;
  const size = 2 * R * Math.cos(rad); // diameter shrinks toward the poles
  const inset = (2 * R - size) / 2;
  const z = R * Math.sin(rad);
  return (
    <div
      className="absolute rounded-full border"
      style={{
        top: inset,
        left: inset,
        width: size,
        height: size,
        borderColor: "var(--color-accent)",
        opacity: ringOpacity(phi),
        transform: `rotateX(90deg) translateZ(${z}px)`,
      }}
    />
  );
}

function GlobeWireframe({ spin }: { spin: MotionValue<number> }) {
  return (
    <div
      className="absolute"
      style={{
        left: CENTER.x - R,
        top: CENTER.y - R,
        width: 2 * R,
        height: 2 * R,
        // Large relative to R so the browser's true perspective projection
        // stays close to the orthographic approximation `projectLatLong`
        // uses — keeping the manually-placed cubes aligned with the
        // genuinely-3D-rendered rings/meridians.
        perspective: 5200,
      }}
    >
      <div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d", transform: `rotateX(${-TILT_DEG}deg)` }}
      >
        <motion.div className="relative h-full w-full" style={{ transformStyle: "preserve-3d", rotateY: spin }}>
          {MERIDIAN_ANGLES.map((angle) => (
            <Meridian key={angle} angle={angle} />
          ))}
          {LATITUDES.map((phi) => (
            <LatitudeRing key={phi} phi={phi} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Two-stage lime glow
// ---------------------------------------------------------------------------

function GlobeGlow() {
  const bloomSize = R * 3.2;
  const rimSize = R * 2.08;
  return (
    <>
      {/* Large, soft ambient bloom behind the whole composition */}
      <div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          left: CENTER.x - bloomSize / 2,
          top: CENTER.y - bloomSize / 2,
          width: bloomSize,
          height: bloomSize,
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-accent) 22%, transparent) 0%, transparent 68%)",
          filter: "blur(64px)",
        }}
      />
      {/* Tight limb/rim glow directly around the sphere edge */}
      <div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          left: CENTER.x - rimSize / 2,
          top: CENTER.y - rimSize / 2,
          width: rimSize,
          height: rimSize,
          boxShadow:
            "0 0 42px 6px color-mix(in oklch, var(--color-accent) 42%, transparent), inset 0 0 30px 2px color-mix(in oklch, var(--color-accent) 22%, transparent)",
        }}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Falling / orbiting cubes
// ---------------------------------------------------------------------------

function FallingCube({
  point,
  delay,
  spin,
  time,
  reducedMotion,
}: {
  point: (typeof LANDING_POINTS)[number];
  delay: number;
  spin: MotionValue<number>;
  time: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const liveLambda = useTransform(spin, (s) => point.lambda + s);
  const liveX = useTransform(liveLambda, (l) => projectLatLong(l, point.phi).x);
  const liveY = useTransform(liveLambda, (l) => projectLatLong(l, point.phi).y);

  // 0 = still waiting at the spawn band, 1 = landed — driven by `time`, a
  // monotonic elapsed-ms-since-mount clock that never resets, NOT by `spin`
  // (which sawtooths 360 -> 0 every 32s to keep looping). Deriving this from
  // spin used to make every cube's progress snap back to 0 in the same frame
  // the spin loop wrapped, blacking out all six cubes at once every 32s.
  // Once a cube lands it stays landed forever; `spin` still drives its
  // continued orbit separately via `liveLambda` above.
  const progress = useTransform(time, (ms) => {
    if (reducedMotion) return 1;
    const local = ms / 1000 - delay;
    if (local <= 0) return 0;
    if (local >= FALL_SECONDS) return 1;
    return easeInOutCubic(local / FALL_SECONDS);
  });

  const y = useTransform([progress, liveY], (values) => {
    const [p, ly] = values as number[];
    return BAND_OFFSET_Y + (ly - BAND_OFFSET_Y) * p;
  });
  const opacity = useTransform(progress, (p) => (reducedMotion ? 1 : Math.min(1, p / 0.15)));
  const rotate = useTransform(progress, (p) => p * 170);

  return (
    <motion.div
      className="absolute rounded-[3px] bg-accent"
      style={{
        left: CENTER.x - CUBE_SIZE / 2,
        top: CENTER.y - CUBE_SIZE / 2,
        width: CUBE_SIZE,
        height: CUBE_SIZE,
        boxShadow: "0 0 10px 2px color-mix(in oklch, var(--color-accent) 70%, transparent)",
        x: liveX,
        y,
        opacity,
        rotate,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------

export function HeroGlobe({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const spin = useMotionValue(0);
  const time = useTime(); // independent, monotonic clock for cube fall/landing

  useEffect(() => {
    if (reducedMotion) return;
    const controls = animate(spin, 360, {
      duration: SPIN_SECONDS,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [reducedMotion, spin]);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none relative", className)}
      style={{ width: STAGE_W, height: STAGE_H }}
    >
      <GlobeGlow />
      <GlobeWireframe spin={spin} />
      {LANDING_POINTS.map((point, i) => (
        <FallingCube
          key={point.name}
          point={point}
          delay={FALL_DELAY_SECONDS[i]}
          spin={spin}
          time={time}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
