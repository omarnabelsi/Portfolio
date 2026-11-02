"use client";

import { useRef, useState } from "react";
import { moreWork } from "@/content/projects";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Index of public repositories. On fine pointers a typographic "poster"
 * follows the cursor; on touch the rows simply link to GitHub.
 */
export function MoreWork() {
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = preview.current;
    if (!el || !isFinePointer()) return;
    const d = prefersReducedMotion() ? 0 : 0.6;
    gsap.to(el, { x: e.clientX, y: e.clientY, duration: d, ease: "power3.out" });
  };

  const current = active !== null ? moreWork[active] : null;

  return (
    <section aria-labelledby="more-title" className="relative bg-paper py-24 md:py-36" onPointerMove={onMove}>
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="mono-label text-muted md:col-span-3">[ 02 — From the repositories ]</p>
          <div className="md:col-span-9">
            <Reveal as="h2" mode="lines" id="more-title" className="display text-[clamp(2.6rem,6.4vw,6.4rem)]">
              More things <span className="serif-accent text-signal">I’ve built</span>
            </Reveal>
            <Reveal as="p" className="mt-6 max-w-[56ch] text-ink-2" delay={0.1}>
              Public projects from GitHub — commerce platforms, a desktop shell, applied machine learning. Each row
              opens the source.
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 border-t border-ink" onPointerLeave={() => setActive(null)}>
          {moreWork.map((p, i) => (
            <li key={p.repo} className="border-b border-line">
              <a
                href={`${site.github}/${p.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Source"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group relative grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-2 py-6 md:grid-cols-12 md:py-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
                />
                <span className="relative mono-label text-muted transition-colors group-hover:text-paper/60 md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative display-tight text-[clamp(1.6rem,3.6vw,3.2rem)] uppercase transition-[color,transform] duration-500 ease-[var(--ease-out)] group-hover:translate-x-3 group-hover:text-paper md:col-span-5">
                  {p.name}
                </span>
                <span className="relative col-span-3 col-start-2 max-w-[52ch] text-[0.98rem] leading-relaxed text-ink-2 transition-colors group-hover:text-paper/75 md:col-span-4 md:col-start-auto">
                  {p.summary}
                </span>
                <span className="relative col-start-3 row-start-1 flex flex-col items-end gap-1 text-right md:col-span-2 md:col-start-auto md:row-start-auto">
                  {p.status && (
                    <span className="mono-label text-signal-ink transition-colors group-hover:text-signal">{p.status}</span>
                  )}
                  <span className="mono-label hidden text-muted transition-colors group-hover:text-paper/60 md:block">
                    {p.stack.join(" · ")}
                  </span>
                  <span aria-hidden className="text-xl transition-[transform,color] duration-500 group-hover:rotate-45 group-hover:text-signal">
                    ↗
                  </span>
                </span>
                <span className="sr-only"> — view source on GitHub (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating preview poster */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        style={{ transform: "translate(-9999px,-9999px)" }}
      >
        <div
          className={`translate-x-8 -translate-y-1/2 transition-[opacity,scale] duration-500 ease-[var(--ease-out)] ${
            current ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <div
            className="flex aspect-[4/5] w-[240px] flex-col justify-between rounded-md p-5 text-paper shadow-2xl"
            style={{ background: current?.hue ?? "#121110" }}
          >
            <span className="mono-label text-paper/70">github.com/{site.githubHandle}</span>
            <div>
              <p className="display text-[1.7rem] leading-[0.92] [overflow-wrap:anywhere]">{current?.name}</p>
              <p className="mt-3 mono-label text-paper/75">{current?.stack.join(" / ")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
