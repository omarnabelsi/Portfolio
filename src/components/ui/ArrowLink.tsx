"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/motion";

type Variant = "solid" | "outline" | "ghost";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  cursor?: string;
};

const styles: Record<Variant, string> = {
  solid: "bg-ink text-paper",
  outline: "border border-current",
  ghost: "",
};

/**
 * Magnetic call-to-action. The label rolls to a duplicate on hover;
 * the whole button drifts toward the pointer on fine-pointer devices.
 */
export function ArrowLink({ href, children, variant = "solid", external, className = "", cursor }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.25,
      y: (e.clientY - (r.top + r.height / 2)) * 0.35,
      duration: 0.5,
      ease: "power3.out",
    });
  };
  const onLeave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
  };

  const inner = (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 shrink-0 transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-45"
      >
        <path d="M3 13 13 3M5 3h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </>
  );

  const cls = `group inline-flex min-h-12 items-center gap-3 rounded-full px-6 py-3 text-[0.95rem] font-semibold tracking-tight will-change-transform ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        data-cursor={cursor}
      >
        {inner}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link ref={ref} href={href} className={cls} onPointerMove={onMove} onPointerLeave={onLeave} data-cursor={cursor}>
      {inner}
    </Link>
  );
}
