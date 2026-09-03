"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return false; // SSR can't read a media query — matches the client's first
  // render too, via useSyncExternalStore, so there's no hydration mismatch.
}

/**
 * SSR-safe `prefers-reduced-motion: reduce` read (no hydration mismatch).
 *
 * framer-motion's own `useReducedMotion` reads `window.matchMedia`
 * synchronously during its first client render (not inside an effect), so
 * when the device actually has reduced motion enabled, that first client
 * render disagrees with the `null`-derived server render and React throws a
 * hydration mismatch. This hook fixes that by going through
 * `useSyncExternalStore` with a server snapshot that always matches the
 * client's pre-hydration value (`false`).
 */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
