"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/useInView";

/** Counts up to a documented figure once, the first time it becomes visible. */
export function ToolCounter({ to, className = "" }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [seen, setSeen] = useState(false);
  const [n, setN] = useState(0);

  if (inView && !seen) setSeen(true);

  useEffect(() => {
    if (!seen || reduced) return;
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, reduced, to]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={String(to)}>
      {reduced ? to : n}
    </span>
  );
}
