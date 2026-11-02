"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/motion";

let firstRender = true;

/**
 * Route transition: on client navigations a vermilion curtain covers the
 * old frame and lifts off the new page. Skipped on the first load (the
 * intro loader owns that moment) and for reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const curtain = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = curtain.current;
    if (!el) return;
    if (firstRender || prefersReducedMotion()) {
      firstRender = false;
      gsap.set(el, { display: "none" });
      return;
    }
    const tl = gsap.timeline();
    tl.set(el, { display: "block", clipPath: "inset(0% 0% 0% 0%)" })
      .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "expo.inOut", delay: 0.05 })
      .set(el, { display: "none" });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <div ref={curtain} aria-hidden className="pointer-events-none fixed inset-0 z-[85] hidden bg-signal" />
      {children}
    </>
  );
}
