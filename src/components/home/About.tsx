"use client";

import Image from "next/image";
import { useRef } from "react";
import portrait from "../../../public/images/omar-nabelsi-portrait.jpg";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Seal } from "@/components/ui/Seal";
import { gsap, prefersReducedMotion, registerGsap, useIsoLayoutEffect } from "@/lib/motion";

const facts = [
  { k: "Discipline", v: "Full-stack · Backend · AI agents" },
  { k: "Languages", v: "TypeScript, Python, Rust" },
  { k: "Recent focus", v: "Fintech ledgers, desktop agents" },
  { k: "Code", v: `github.com/${site.githubHandle}`, href: site.github },
];

export function About() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    registerGsap();
    const ctx = gsap.context(() => {
      // Frame wipes open, image settles from a slight zoom while scrolling.
      gsap.fromTo(
        "[data-portrait-frame]",
        { clipPath: "inset(18% 12% 18% 12%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-portrait-frame]", start: "top 90%", end: "top 30%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        "[data-portrait-img]",
        { scale: 1.22, yPercent: -4 },
        {
          scale: 1.02,
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: "[data-portrait-frame]", start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" aria-labelledby="about-title" className="relative bg-paper-2 py-24 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="mono-label text-muted">[ 03 — About ]</p>
          <figure className="relative mt-8 lg:sticky lg:top-24">
            <div data-portrait-frame className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-ink">
              <div data-portrait-img className="absolute inset-0 will-change-transform">
                <Image
                  src={portrait}
                  alt="Omar Nabelsi, arms crossed, wearing a white textured shirt — black-and-white portrait."
                  fill
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  placeholder="blur"
                  className="object-cover object-[50%_30%] [filter:sepia(0.12)_contrast(1.04)]"
                />
              </div>
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(18,17,16,0.55))]" />
              <Seal size="md" className="absolute bottom-5 right-5 rotate-[-4deg] shadow-lg" />
            </div>
            <figcaption className="mt-3 flex justify-between mono-label text-muted">
              <span>Fig. 01 — {site.name}</span>
              <span>{site.role}</span>
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-7 lg:pt-14">
          <Reveal as="h2" mode="lines" id="about-title" className="display text-[clamp(2.6rem,6vw,6rem)]">
            I like the parts of software <span className="serif-accent text-signal">most people never see.</span>
          </Reveal>

          <div className="mt-12 grid gap-8 text-[1.08rem] leading-[1.7] text-ink-2 md:grid-cols-2 md:gap-10">
            <Reveal as="p">
              I’m a full-stack engineer who works across the whole request: the interface someone touches, the API that
              answers, the database that remembers, and the infrastructure that keeps it all running. My recent work sits
              at two demanding edges — financial systems where every amount must reconcile, and AI agents that act on a
              real computer and have to ask before doing anything risky.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              Most days I write TypeScript and Python — NestJS, FastAPI, Django, React, Angular, Next.js — and reach for
              Rust and Tauri when software needs to live on the desktop. I care about the unglamorous details: migrations
              that run cleanly, money stored as decimals, permissions checked on every call, and status notes that tell
              the truth about what’s finished.
            </Reveal>
          </div>

          <Reveal className="mt-14 border-l-2 border-signal pl-6" delay={0.1}>
            <p className="mono-label text-signal-ink">Approach</p>
            <p className="mt-3 serif-accent text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.15] text-ink">
              Find the thing that must never go wrong. Make it structurally impossible. Then make everything around it
              fast and pleasant to use.
            </p>
          </Reveal>

          <dl className="mt-14 grid border-t border-ink sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.k} className="border-b border-line py-5 sm:odd:pr-6 sm:even:border-l sm:even:pl-6">
                <dt className="mono-label text-muted">{f.k}</dt>
                <dd className="mt-2 text-[1.05rem] font-semibold tracking-tight">
                  {f.href ? (
                    <a href={f.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                      {f.v} ↗<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    f.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
