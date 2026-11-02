"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, useIsoLayoutEffect } from "@/lib/motion";

export type Layer = { name: string; items: string[]; note?: string };

type Props = {
  layers: Layer[];
  /** Tailwind classes for colours, so the component serves both case studies. */
  tone: { line: string; muted: string; accent: string; surface: string };
};

/**
 * Architecture as stacked plates. On scroll the plates separate and
 * settle into place one after another, top of stack first.
 */
export function LayerStack({ layers, tone }: Props) {
  const root = useRef<HTMLOListElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-layer]", {
        y: (i: number) => -60 * (i + 1),
        autoAlpha: 0,
        rotateX: 18,
        transformOrigin: "50% 0%",
        stagger: 0.12,
        duration: 1.2,
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <ol ref={root} className="grid gap-3 [perspective:1400px]">
      {layers.map((layer, i) => (
        <li
          key={layer.name}
          data-layer
          className={`grid gap-4 rounded-xl border p-5 md:grid-cols-12 md:items-center md:p-6 ${tone.line} ${tone.surface}`}
        >
          <div className="flex items-baseline gap-4 md:col-span-4">
            <span className={`mono-label ${tone.accent}`}>L{i + 1}</span>
            <p className="display-tight text-[1.5rem] uppercase">{layer.name}</p>
          </div>
          <ul className="flex flex-wrap gap-2 md:col-span-6">
            {layer.items.map((item) => (
              <li key={item} className={`rounded-full border px-3 py-1 text-[0.88rem] ${tone.line}`}>
                {item}
              </li>
            ))}
          </ul>
          {layer.note && <p className={`mono-label md:col-span-2 md:text-right ${tone.muted}`}>{layer.note}</p>}
        </li>
      ))}
    </ol>
  );
}
