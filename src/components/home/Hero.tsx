"use client";

import Link from "next/link";
import { useRef } from "react";
import { site } from "@/content/site";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ContourField } from "@/components/visuals/ContourField";
import { CharRise } from "@/components/ui/CharRise";
import { gsap, isFinePointer, prefersReducedMotion, registerGsap, useIsoLayoutEffect } from "@/lib/motion";

const step = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;

/**
 * Entrance choreography is CSS (see .char / .intro in globals.css) so the
 * hero paints without waiting for JavaScript. GSAP only adds the scroll
 * parallax and the pointer lean, which are enhancements.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    registerGsap();
    const q = gsap.utils.selector(el);

    const ctx = gsap.context(() => {
      // Scroll parallax: the name drifts up, the seal travels faster and turns.
      gsap.to(q("[data-hero-name]"), {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q("[data-hero-seal-wrap]"), {
        yPercent: -45,
        rotate: -6,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    // Seal leans toward the pointer.
    const sealWrap = q("[data-hero-seal-inner]")[0] as HTMLElement | undefined;
    const onMove = (e: PointerEvent) => {
      if (!sealWrap) return;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      gsap.to(sealWrap, { x: nx * 28, y: ny * 20, rotate: nx * 4, duration: 1.2, ease: "power3.out" });
    };
    if (isFinePointer()) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[var(--header-h)]"
    >
      <div className="intro-soft absolute inset-0 -z-10">
        <ContourField className="h-full w-full [mask-image:radial-gradient(120%_90%_at_75%_40%,#000_35%,transparent_85%)]" />
      </div>

      <div className="container-x flex flex-1 flex-col">
        {/* Meta row */}
        <div className="grid grid-cols-2 gap-4 pt-6 md:grid-cols-12 md:pt-10">
          <p className="intro mono-label text-muted md:col-span-3" style={step(0.3)}>
            [ <span className="max-sm:hidden">Portfolio — </span>Index 00 ]
          </p>
          <p className="intro mono-label text-muted max-md:text-right md:col-span-4" style={step(0.36)}>
            {site.role}
          </p>
          <p className="intro mono-label hidden text-muted md:col-span-5 md:block md:text-right" style={step(0.42)}>
            Systems · Interfaces · Agents
          </p>
        </div>

        {/* Name + seal */}
        <div className="relative mt-auto pt-16 md:pt-10">
          <div
            data-hero-seal-wrap
            className="pointer-events-none absolute right-[-2vw] top-[-6vw] z-0 md:right-[2vw] md:top-[-4vw]"
            aria-hidden
          >
            <div data-hero-seal-inner>
              <span
                data-hero-seal
                lang="ar"
                dir="rtl"
                className="hero-seal block font-arabic text-[44vw] leading-[1.3] text-signal md:text-[30vw] lg:text-[27vw]"
              >
                {site.nameArabic}
              </span>
            </div>
          </div>

          <h1 id="hero-title" className="relative z-10">
            <span className="sr-only">
              {site.name} — {site.role}
            </span>
            <span aria-hidden data-hero-name className="display block text-[18.6vw] md:text-[16.2vw]">
              <CharRise segments={[{ text: "Omar", block: true }, { text: "Nabelsi", block: true }]} />
            </span>
          </h1>
        </div>

        {/* Statement + CTAs */}
        <div className="relative z-10 grid gap-8 border-t border-line py-8 md:grid-cols-12 md:items-end md:py-10">
          <p
            style={step(0.5)}
            className="intro display-tight max-w-[34ch] text-[clamp(1.45rem,2.6vw,2.6rem)] font-[560] leading-[1.06] md:col-span-7"
          >
            Full-stack engineer building software that{" "}
            <Link href="/work/atizan-ledger" className="serif-accent text-signal-ink underline decoration-1 underline-offset-[0.18em] hover:decoration-2">
              moves money
            </Link>{" "}
            and{" "}
            <Link href="/work/alfa" className="serif-accent text-signal-ink underline decoration-1 underline-offset-[0.18em] hover:decoration-2">
              takes action
            </Link>{" "}
            — and earns the trust to do both.
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <span className="intro inline-block" style={step(0.65)}>
              <ArrowLink href="/#work" cursor="Scroll">Explore my work</ArrowLink>
            </span>
            <span className="intro inline-block" style={step(0.72)}>
              <ArrowLink href="/#contact" variant="outline">Get in touch</ArrowLink>
            </span>
            <span className="intro inline-block" style={step(0.79)}>
              <ArrowLink href={site.github} variant="ghost" external className="px-3">
                GitHub
              </ArrowLink>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
