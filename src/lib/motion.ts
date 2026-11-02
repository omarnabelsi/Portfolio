"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useLayoutEffect } from "react";

let registered = false;
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
  registered = true;
}

export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isFinePointer() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Delay for hero choreography so it starts as the CSS loader exits. */
export function introDelay() {
  if (typeof document === "undefined") return 0;
  const el = document.documentElement;
  if (el.classList.contains("loader-seen") || el.classList.contains("loader-skip") || prefersReducedMotion()) return 0.15;
  return 1.0;
}

export { gsap, ScrollTrigger, SplitText };
