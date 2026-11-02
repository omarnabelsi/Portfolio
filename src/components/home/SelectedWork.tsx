"use client";

import Link from "next/link";
import { useRef } from "react";
import { featured, type FeaturedProject } from "@/content/projects";
import { AgentPipeline } from "@/components/visuals/AgentPipeline";
import { LedgerFlow } from "@/components/visuals/LedgerFlow";
import { Reveal } from "@/components/ui/Reveal";
import { gsap, prefersReducedMotion, registerGsap, useIsoLayoutEffect } from "@/lib/motion";

const themes = {
  atizan: {
    panel: "bg-atz-bg text-atz-fg",
    muted: "text-atz-muted",
    line: "border-atz-line",
    accent: "text-atz-accent",
    chip: "border-atz-line text-atz-fg/85",
    cta: "bg-atz-accent text-atz-bg",
  },
  alfa: {
    panel: "bg-alfa-bg text-alfa-fg",
    muted: "text-alfa-muted",
    line: "border-alfa-line",
    accent: "text-alfa-cyan",
    chip: "border-alfa-line text-alfa-fg/85",
    cta: "bg-alfa-accent text-alfa-bg",
  },
} as const;

function Panel({ project }: { project: FeaturedProject }) {
  const t = themes[project.theme];
  const href = `/work/${project.slug}`;
  return (
    <article
      data-panel
      aria-labelledby={`${project.slug}-title`}
      className={`relative flex min-h-[100svh] origin-top flex-col overflow-hidden rounded-t-[28px] [@media(min-width:1024px)_and_(min-height:760px)]:sticky [@media(min-width:1024px)_and_(min-height:760px)]:top-0 ${t.panel}`}
    >
      {project.theme === "atizan" ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_30%,rgba(61,220,151,0.10),transparent_70%)]" />
      ) : (
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_75%_35%,rgba(143,128,255,0.16),transparent_70%),radial-gradient(40%_40%_at_20%_90%,rgba(95,227,232,0.08),transparent_70%)]" />
      )}

      <div data-dim aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0" />
      <div className="container-x relative flex flex-1 flex-col pb-10 pt-[calc(var(--header-h)+1.5rem)]">
        <div className={`flex items-center justify-between border-b pb-4 ${t.line}`}>
          <span className={`mono-label ${t.muted}`}>Case study {project.index} / 02</span>
          <span className={`mono-label hidden sm:inline ${t.muted}`}>{project.kicker}</span>
        </div>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className={`display text-[clamp(5rem,13vw,12rem)] leading-none ${t.accent} opacity-90`} aria-hidden>
              {project.index}
            </p>
            <h3 id={`${project.slug}-title`} className="display mt-4 text-[clamp(3rem,7vw,6.6rem)]">
              {project.name}
            </h3>
            <p className={`mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed md:text-[1.15rem] ${t.muted}`}>
              {project.summary}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li key={tag} className={`rounded-full border px-3 py-1 mono-label ${t.chip}`}>
                  {tag}
                </li>
              ))}
            </ul>
            <Link
              href={href}
              data-cursor="Read"
              className={`group mt-9 inline-flex min-h-12 items-center gap-3 rounded-full px-6 py-3 font-semibold ${t.cta}`}
            >
              Read the case study
              <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="lg:col-span-7">
            {project.theme === "atizan" ? <AtizanVisual /> : <AgentPipeline className="mx-auto max-w-[680px]" />}
          </div>
        </div>
      </div>
    </article>
  );
}

function AtizanVisual() {
  return (
    <div className="relative rounded-2xl border border-atz-line bg-atz-bg-2/70 p-4 md:p-6">
      <LedgerFlow />
    </div>
  );
}

export function SelectedWork() {
  const root = useRef<HTMLElement>(null);

  // As the next panel slides over, the one beneath recedes slightly.
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    registerGsap();
    // Stacking only where panels are sticky (wide and tall viewports).
    const mm = gsap.matchMedia(el);
    mm.add("(min-width: 1024px) and (min-height: 760px)", () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      panels.forEach((panel, i) => {
        const next = panels[i + 1];
        if (!next) return;
        const st = { trigger: next, start: "top bottom", end: "top top", scrub: true };
        gsap.to(panel, { scale: 0.93, ease: "none", scrollTrigger: st });
        gsap.to(panel.querySelector("[data-dim]"), { opacity: 0.5, ease: "none", scrollTrigger: { ...st } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="relative bg-paper">
      <div className="container-x grid gap-6 pb-14 pt-28 md:grid-cols-12 md:pb-20 md:pt-40">
        <p className="mono-label text-muted md:col-span-3">[ 01 — Selected work ]</p>
        <div className="md:col-span-9">
          <Reveal as="h2" mode="lines" className="display text-[clamp(3.4rem,10vw,10rem)]" id="work-title">
            Two systems, <span className="serif-accent text-signal">built to be trusted</span>
          </Reveal>
          <Reveal as="p" className="mt-8 max-w-[52ch] text-[1.1rem] leading-relaxed text-ink-2" delay={0.15}>
            One moves money between farmers, vendors and buyers. The other gives an AI model hands on a real computer.
            Both live or die on the same thing: every action has to be checked, recorded and explainable.
          </Reveal>
        </div>
      </div>

      <div className="relative">
        {featured.map((p) => (
          <Panel key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
