"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion, registerGsap } from "@/lib/motion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis smooth scrolling layered on top of native scroll (no scroll-jacking:
 * scrollbar, keyboard, find-in-page and anchors keep working). Disabled for
 * reduced motion and touch devices, where native momentum is better.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    registerGsap();
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion() || touch) return;

    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: 0 }, autoRaf: false });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // New page: start at the top and recompute trigger positions.
  useEffect(() => {
    if (!window.location.hash) {
      window.__lenis?.scrollTo(0, { immediate: true });
    }
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
