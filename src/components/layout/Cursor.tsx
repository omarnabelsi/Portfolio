"use client";

import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * A follower ring that complements (never replaces) the native cursor.
 * Elements with data-cursor="Label" expand it and show the label.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;
    el.style.display = "grid";

    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button");
      const text = target?.dataset.cursor ?? "";
      if (label.current && label.current.textContent !== text) label.current.textContent = text;
      el.dataset.state = text ? "label" : target ? "link" : "idle";
    };
    const leave = () => (el.dataset.state = "hidden");

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      data-state="hidden"
      className="cursor-ring pointer-events-none fixed left-0 top-0 z-[80] hidden place-items-center"
    >
      <span ref={label} className="mono-label text-[0.62rem] text-paper" />
    </div>
  );
}
