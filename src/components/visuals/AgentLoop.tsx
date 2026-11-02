"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, useIsoLayoutEffect } from "@/lib/motion";

const steps = [
  { k: "Request", d: "You speak or type in plain language." },
  { k: "Plan", d: "The model plans and picks from registered, named tools." },
  { k: "Validate", d: "Arguments are checked against the tool’s schema." },
  { k: "Policy", d: "Each call is approved, refused, or auto-permitted." },
  { k: "Execute", d: "Only then does the tool run — under control." },
  { k: "Log", d: "Every action is recorded in history and trust reports." },
];

/** The agent loop as a scroll-scrubbed track: the signal travels step to step. */
export function AgentLoop() {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    registerGsap();
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-step]");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 45%", scrub: 0.6 },
      });
      tl.fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: items.length }, 0);
      items.forEach((item, i) => {
        tl.fromTo(item, { opacity: 0.4 }, { opacity: 1, duration: 0.4 }, i);
        tl.fromTo(item.querySelector("[data-dot]"), { scale: 0.6 }, { scale: 1, duration: 0.4 }, i);
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      <div aria-hidden className="absolute left-0 right-0 top-[11px] hidden h-px bg-alfa-line lg:block" />
      <div
        aria-hidden
        data-progress
        className="absolute left-0 right-0 top-[11px] hidden h-px origin-left bg-gradient-to-r from-alfa-accent to-alfa-cyan lg:block"
      />
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
        {steps.map((s, i) => (
          <li key={s.k} data-step className="relative">
            <span
              data-dot
              aria-hidden
              className="relative z-10 grid h-6 w-6 place-items-center rounded-full border border-alfa-accent bg-alfa-bg"
            >
              <i className="h-2 w-2 rounded-full bg-alfa-cyan" />
            </span>
            <p className="mt-5 mono-label text-alfa-muted">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-1 display-tight text-[1.7rem] uppercase">{s.k}</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-alfa-muted">{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
