// components/hero-globe.tsx
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Hero globe — a Canvas 2D rendering of Earth (continents as scattered
 * "night-lights" points, no filled body so whatever sits behind it shows
 * through) with small lime blocks that fall out of the sky and strike the
 * surface in slow, low-frequency waves that repeat forever.
 *
 * This replaces the previous CSS-3D wireframe-sphere-with-orbiting-cubes
 * build (bare latitude/longitude rings, six cubes that each fell once and
 * then orbited forever). That version is superseded, not this file's
 * ancestor to preserve compatibility with — every constant below was
 * re-derived for the new design, picked in a side-by-side comparison of 5
 * concepts and refined through several rounds of feedback (continents
 * accurate enough to read as real geography, no glow beyond the sphere's
 * own edge, points visible on the far side too — dimmer, not culled — and
 * a slower, block-shaped, endlessly-repeating impact instead of a one-shot
 * cube landing).
 *
 * Canvas, not WebGL/three.js: still well within the project's "no 3D
 * engine" constraint (Canvas 2D is a 2D immediate-mode raster API, not a
 * GPU 3D pipeline) and is the right tool for a dense, continuously-rotating
 * point field — redrawing ~140 points plus a few falling blocks every
 * frame this way is far cheaper than animating that many DOM nodes.
 */

// ---------------------------------------------------------------------------
// Stage box — unchanged from the previous build, so hero.tsx's positioning
// math (which centers HERO_GLOBE_CENTER against the hero's text column)
// needs no changes.
// ---------------------------------------------------------------------------

const STAGE_W = 760;
const STAGE_H = 940;
const CENTER = { x: STAGE_W / 2, y: 500 };
export const HERO_GLOBE_CENTER = CENTER;

const R = 260; // sphere radius, px — matches the previous build's scale
const TILT = (17 * Math.PI) / 180;
const SPIN_SECONDS = 46; // one full rotation

// ---------------------------------------------------------------------------
// Continent outlines, in [longitude, latitude] degrees. Traced to be
// recognizable at a glance (Baja California, the Isthmus of Panama, Cape
// Horn, the Horn of Africa, the Indian subcontinent, the Malay peninsula,
// Kamchatka, Cape York all present as landmarks) rather than rough blobs —
// still simplified/low-poly, since this renders at a few hundred pixels as
// a hero-background ornament, not a map.
// ---------------------------------------------------------------------------

type LngLat = [number, number];

const CONTINENTS: { pts: LngLat[] }[] = [
  {
    pts: [
      [-165, 68], [-165, 60], [-152, 58], [-135, 58], [-130, 55], [-125, 48], [-124, 40],
      [-117, 33], [-114, 29], [-108, 23], [-97, 19], [-92, 15], [-84, 9], [-79, 8],
      [-81, 16], [-88, 21], [-97, 26], [-90, 30], [-81, 31], [-75, 35], [-70, 41],
      [-66, 45], [-60, 47], [-55, 52], [-65, 58], [-78, 62], [-85, 68], [-95, 70], [-110, 72], [-140, 71],
    ],
  },
  {
    pts: [
      [-77, 8], [-72, 11], [-60, 10], [-51, 4], [-35, -5], [-38, -13], [-40, -18],
      [-45, -23], [-48, -26], [-57, -34], [-58, -38], [-62, -40], [-68, -49], [-70, -53],
      [-72, -52], [-74, -46], [-73, -38], [-71, -30], [-71, -18], [-75, -14], [-81, -4], [-79, 3], [-77, 8],
    ],
  },
  {
    pts: [
      [-17, 15], [-16, 21], [-10, 30], [-6, 35], [2, 37], [10, 37], [20, 33], [32, 31],
      [34, 27], [38, 18], [43, 12], [51, 12], [51, 2], [45, -3], [40, -11], [40, -17],
      [35, -24], [33, -28], [27, -33], [18, -34], [15, -27], [12, -19], [13, -8], [9, 0],
      [3, 6], [-3, 5], [-8, 5], [-11, 7], [-13, 9], [-17, 15],
    ],
  },
  {
    pts: [
      [-9, 37], [-9, 43], [-2, 43], [1, 42], [3, 42], [7, 44], [10, 44], [9, 46], [2, 49],
      [-5, 49], [-5, 52], [5, 53], [9, 55], [10, 57], [8, 58], [11, 59], [18, 58], [13, 55],
      [15, 54], [19, 54], [24, 54], [28, 60], [30, 65], [25, 66], [20, 69], [25, 71],
      [30, 70], [35, 66], [32, 60], [30, 55], [27, 45], [23, 42], [23, 38], [19, 40],
      [14, 42], [16, 46], [13, 45], [9, 44], [-2, 44], [-9, 37],
    ],
  },
  {
    pts: [
      [27, 45], [35, 47], [38, 45], [35, 41], [36, 37], [42, 37], [48, 42], [52, 47],
      [48, 45], [47, 40], [50, 37], [55, 37], [61, 37], [54, 26], [50, 28], [48, 30],
      [50, 25], [56, 25], [62, 25], [68, 24], [71, 20], [73, 17], [72, 21], [70, 23],
      [69, 22], [77, 8], [80, 13], [80, 17], [85, 20], [88, 22], [92, 22], [95, 20],
      [98, 16], [99, 8], [104, 1], [103, 4], [105, 10], [109, 11], [106, 16], [108, 21],
      [112, 22], [114, 22], [118, 24], [122, 25], [121, 31], [122, 31], [121, 37],
      [126, 37], [129, 35], [127, 38], [129, 42], [131, 43], [135, 48], [142, 46],
      [141, 43], [140, 36], [136, 34], [133, 34], [130, 34], [133, 33], [131, 31],
      [141, 45], [145, 49], [156, 51], [163, 57], [162, 60], [170, 65], [178, 68],
      [170, 70], [150, 73], [130, 73], [110, 74], [95, 73], [80, 73], [68, 68], [60, 70],
      [55, 68], [52, 66], [45, 67], [40, 66], [36, 64], [33, 66], [36, 68], [42, 66],
      [48, 66], [60, 68], [58, 53], [50, 45], [45, 42], [40, 44], [35, 45], [27, 45],
    ],
  },
  {
    pts: [
      [113, -22], [114, -26], [115, -32], [115, -35], [117, -35], [122, -34], [131, -32],
      [135, -35], [138, -35], [140, -38], [144, -38], [147, -38], [150, -37], [150, -33],
      [153, -28], [153, -24], [151, -24], [149, -21], [146, -19], [143, -14], [141, -12],
      [136, -12], [132, -12], [130, -12], [130, -15], [126, -14], [123, -17], [121, -18],
      [114, -22], [113, -22],
    ],
  },
];

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function pointInPoly([x, y]: LngLat, poly: LngLat[]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// Deterministic point scatter inside each continent, computed once at
// module load (46 points each, same seed every time) — used both to render
// the "night-lights" and as the pool of candidate impact targets.
const rnd = seededRand(42);
const CONTINENT_SAMPLES: LngLat[][] = CONTINENTS.map(({ pts }) => {
  const lons = pts.map((p) => p[0]);
  const lats = pts.map((p) => p[1]);
  const minLon = Math.min(...lons), maxLon = Math.max(...lons);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const samples: LngLat[] = [];
  let tries = 0;
  while (samples.length < 46 && tries < 2000) {
    tries++;
    const lon = minLon + rnd() * (maxLon - minLon);
    const lat = minLat + rnd() * (maxLat - minLat);
    if (pointInPoly([lon, lat], pts)) samples.push([lon, lat]);
  }
  return samples;
});
const TARGET_POOL: LngLat[] = CONTINENT_SAMPLES.flat();

// ---------------------------------------------------------------------------
// Projection
// ---------------------------------------------------------------------------

function project(lonDeg: number, latDeg: number, theta: number) {
  const lambda = (lonDeg * Math.PI) / 180 + theta;
  const phi = (latDeg * Math.PI) / 180;
  const x0 = R * Math.cos(phi) * Math.sin(lambda);
  const y0 = R * Math.sin(phi);
  const z0 = R * Math.cos(phi) * Math.cos(lambda);
  const y = y0 * Math.cos(TILT) - z0 * Math.sin(TILT);
  const z = y0 * Math.sin(TILT) + z0 * Math.cos(TILT);
  return { x: CENTER.x + x0, y: CENTER.y - y, z };
}

// No back-face cull — the sphere has no filled body, so far-side points
// stay visible too, just dimmer (floors near 0.15 rather than going to 0).
function depthAlpha(z: number) {
  return Math.max(0, 0.32 + 0.68 * (z / R));
}

// ---------------------------------------------------------------------------
// Impact engine — waves of blocks fall, strike, flash, and fade, forever.
// ---------------------------------------------------------------------------

interface Asteroid {
  lon: number;
  lat: number;
  start: number;
  dur: number;
}
interface Mark {
  lon: number;
  lat: number;
  at: number;
}

const WAVE_MIN_MS = 6400;
const WAVE_MAX_MS = 9000;
const FALL_MIN_MS = 2700;
const FALL_MAX_MS = 3600;
const MAX_MARKS = 9;
const MARK_LIFE_MS = 15000;
const BLOCK_HALF = 6.5; // full 13px — matches the previous build's cube size
const START_DX = -95;
const START_DY = -400;

function drawRoundedBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  half: number,
  rotation: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  const r = half * 0.28;
  const w = half * 2;
  ctx.beginPath();
  ctx.moveTo(-half + r, -half);
  ctx.arcTo(half, -half, half, half, r);
  ctx.arcTo(half, half, -half, half, r);
  ctx.arcTo(-half, half, -half, -half, r);
  ctx.arcTo(-half, -half, -half + w, -half, r);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function HeroGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = STAGE_W * dpr;
    canvas.height = STAGE_H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const styles = getComputedStyle(document.documentElement);
    const accentHex = styles.getPropertyValue("--color-accent").trim() || "#cde833";
    const rgb = [1, 3, 5].map((i) => parseInt(accentHex.slice(i, i + 2), 16));
    const accent = (a: number) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

    let theta = 0;
    let asteroids: Asteroid[] = [];
    let marks: Mark[] = [];
    let nextWaveAt = performance.now() + 900;
    let raf = 0;
    const spinSpeed = (2 * Math.PI) / SPIN_SECONDS;

    function spawnWave(now: number) {
      const count = Math.random() < 0.35 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        let candidate: LngLat | null = null;
        for (let tries = 0; tries < 12; tries++) {
          const pick = TARGET_POOL[Math.floor(Math.random() * TARGET_POOL.length)];
          if (project(pick[0], pick[1], theta).z > R * 0.15) {
            candidate = pick;
            break;
          }
        }
        if (!candidate) continue;
        asteroids.push({
          lon: candidate[0],
          lat: candidate[1],
          start: now + i * 220,
          dur: FALL_MIN_MS + Math.random() * (FALL_MAX_MS - FALL_MIN_MS),
        });
      }
      nextWaveAt = now + WAVE_MIN_MS + Math.random() * (WAVE_MAX_MS - WAVE_MIN_MS);
    }

    function drawGlobe() {
      // Rim only — no fill, so nothing behind the sphere is occluded, and
      // no glow bleeds past its own edge.
      ctx!.beginPath();
      ctx!.arc(CENTER.x, CENTER.y, R, 0, Math.PI * 2);
      ctx!.strokeStyle = accent(0.6);
      ctx!.lineWidth = 1.4;
      ctx!.stroke();

      CONTINENT_SAMPLES.forEach((samples) => {
        samples.forEach(([lon, lat], i) => {
          if (i % 2 === 0) return; // sparse — reads as scattered city lights
          const p = project(lon, lat, theta);
          const a = Math.min(1, depthAlpha(p.z) * 1.1 + 0.15);
          ctx!.fillStyle = accent(a);
          ctx!.shadowColor = accent(0.9);
          ctx!.shadowBlur = 5;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 2.3, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.shadowBlur = 0;
        });
      });
    }

    function drawAsteroids(now: number) {
      asteroids = asteroids.filter((a) => {
        const t = (now - a.start) / a.dur;
        if (t < 0) return true;
        if (t >= 1) {
          marks.push({ lon: a.lon, lat: a.lat, at: now });
          if (marks.length > MAX_MARKS) marks.shift();
          return false;
        }
        const target = project(a.lon, a.lat, theta);
        const ease = 1 - Math.pow(1 - t, 3);
        const x = target.x + START_DX * (1 - ease);
        const y = target.y + START_DY * (1 - ease);
        const alpha = Math.min(1, t / 0.12);

        ctx!.save();
        ctx!.globalAlpha = alpha;
        ctx!.strokeStyle = accent(0.5);
        ctx!.lineWidth = 1.2;
        ctx!.beginPath();
        ctx!.moveTo(target.x + START_DX * (1 - ease) * 1.6, target.y + START_DY * (1 - ease) * 1.6);
        ctx!.lineTo(x, y);
        ctx!.stroke();

        ctx!.fillStyle = accent(1);
        ctx!.shadowColor = accent(0.85);
        ctx!.shadowBlur = 14;
        drawRoundedBlock(ctx!, x, y, BLOCK_HALF, t * ((170 * Math.PI) / 180));
        ctx!.restore();
        return true;
      });

      marks = marks.filter((m) => {
        const age = now - m.at;
        if (age > MARK_LIFE_MS) return false;
        const p = project(m.lon, m.lat, theta);

        const flashT = age / 420;
        if (flashT < 1) {
          ctx!.save();
          ctx!.globalAlpha = (1 - flashT) * 0.9;
          ctx!.strokeStyle = accent(1);
          ctx!.lineWidth = 1.8;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 6 + flashT * 34, 0, Math.PI * 2);
          ctx!.stroke();
          ctx!.restore();
        }

        const fade = Math.max(0, 1 - age / MARK_LIFE_MS);
        ctx!.save();
        ctx!.globalAlpha = fade * depthAlpha(p.z);
        ctx!.fillStyle = accent(1);
        ctx!.shadowColor = accent(0.9);
        ctx!.shadowBlur = 9;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
        return true;
      });
    }

    let last = performance.now();
    function frame(now: number) {
      const dt = Math.min(64, now - last);
      last = now;
      theta += spinSpeed * (dt / 1000);
      ctx!.clearRect(0, 0, STAGE_W, STAGE_H);
      drawGlobe();
      if (now >= nextWaveAt) spawnWave(now);
      drawAsteroids(now);
      raf = requestAnimationFrame(frame);
    }

    if (reducedMotion) {
      ctx.clearRect(0, 0, STAGE_W, STAGE_H);
      drawGlobe();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
      style={{ width: STAGE_W, height: STAGE_H }}
    />
  );
}
