"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, prefersReducedMotion, registerGsap, useIsoLayoutEffect } from "@/lib/motion";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** "lines" splits text into masked lines; "fade" lifts the block. */
  mode?: "lines" | "fade";
  delay?: number;
  stagger?: number;
  id?: string;
};

/**
 * Scroll-triggered reveal. Content is server-rendered and visible without JS;
 * with JS it starts hidden (see [data-reveal] in globals.css) and animates once.
 * Setup (text splitting, triggers) is deferred until the element approaches
 * the viewport, so hydration stays cheap on slower devices.
 */
export function Reveal({ as: Tag = "div", children, className, mode = "fade", delay = 0, stagger = 0.08, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    registerGsap();
    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    let split: SplitText | undefined;
    let ctx: gsap.Context | undefined;

    const setup = () => {
      ctx = gsap.context(() => {
        if (mode === "lines") {
          split = SplitText.create(el, { type: "lines", linesClass: "split-line", mask: "lines" });
          gsap.set(el, { autoAlpha: 1 });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.2,
            stagger,
            delay,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        } else {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 1.2, delay, scrollTrigger: { trigger: el, start: "top 90%", once: true } },
          );
        }
      }, el);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setup();
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      ctx?.revert();
      split?.revert();
    };
  }, [mode, delay, stagger]);

  return (
    <Tag ref={ref} className={className} data-reveal id={id}>
      {children}
    </Tag>
  );
}
