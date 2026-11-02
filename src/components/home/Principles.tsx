"use client";

import { useRef } from "react";
import { principles } from "@/content/principles";
import { gsap, prefersReducedMotion, registerGsap, useIsoLayoutEffect } from "@/lib/motion";

/**
 * Engineering philosophy as a scroll-read manifesto: each statement fills
 * with ink as it passes the reading line, its proof slides in beneath.
 */
export function Principles() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-principle]").forEach((item) => {
        const title = item.querySelector("[data-fill]");
        const proof = item.querySelector("[data-proof]");
        gsap.fromTo(
          title,
          { backgroundSize: "0% 100%, 100% 100%" },
          {
            backgroundSize: "100% 100%, 100% 100%",
            ease: "none",
            scrollTrigger: { trigger: item, start: "top 80%", end: "top 40%", scrub: true },
          },
        );
        gsap.fromTo(
          proof,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 1, scrollTrigger: { trigger: item, start: "top 55%", once: true } },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="principles"
      aria-labelledby="principles-title"
      className="relative bg-ink py-24 text-paper md:py-36"
    >
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="mono-label text-paper/55">[ 05 — Engineering philosophy ]</p>
            <h2 id="principles-title" className="display mt-6 text-[clamp(2.8rem,5.6vw,5.4rem)]">
              How I <span className="serif-accent text-signal-bright">build</span>
            </h2>
            <p className="mt-6 max-w-[38ch] text-paper/70">
              Six rules I keep coming back to — each one paired with where it shows up in real code.
            </p>
          </div>
        </div>

        <ol className="lg:col-span-8">
          {principles.map((p, i) => (
            <li key={p.title} data-principle className="grid gap-4 border-t border-paper/15 py-10 md:grid-cols-[5rem_1fr] md:py-14">
              <span className="mono-label pt-3 text-signal-bright">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p
                  data-fill
                  className="display-tight bg-no-repeat text-[clamp(2rem,4.4vw,4.2rem)] text-paper [-webkit-background-clip:text] [background-clip:text] [-webkit-text-fill-color:transparent]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--paper), var(--paper)), linear-gradient(rgb(239 235 227 / 0.2), rgb(239 235 227 / 0.2))",
                    backgroundSize: "100% 100%, 100% 100%",
                  }}
                >
                  {p.title}
                </p>
                <p data-proof className="mt-5 max-w-[60ch] text-[1.05rem] leading-relaxed text-paper/70">
                  {p.proof}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
