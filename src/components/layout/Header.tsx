"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { Seal } from "@/components/ui/Seal";

/**
 * Fixed header. Text uses mix-blend-difference so it stays legible over
 * paper, ink and both case-study palettes without per-section logic.
 * Hides while scrolling down, returns on scroll up.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 240 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 240) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Seal sits outside the blended layer so it keeps its true vermilion. */}
      <div
        className={`fixed left-0 top-0 z-[71] transition-transform duration-500 ease-[var(--ease-out)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex h-[var(--header-h)] items-center pl-[var(--gutter)]">
          <Link href="/" aria-label={`${site.name} — home`} tabIndex={-1}>
            <Seal />
          </Link>
        </div>
      </div>
      <header
        className={`fixed inset-x-0 top-0 z-[70] text-white mix-blend-difference transition-transform duration-500 ease-[var(--ease-out)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="flex items-center pl-12" aria-label={`${site.name} — home`}>
            <span className="display-tight text-[0.95rem] uppercase tracking-[-0.01em]">Omar Nabelsi</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group relative py-2 text-[0.9rem] font-medium tracking-tight">
                    {item.label}
                    <span className="absolute inset-x-0 bottom-1 h-px origin-right scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-out)] group-hover:origin-left group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-current px-4 py-2 text-[0.85rem] font-semibold transition-colors hover:bg-white hover:text-black md:inline-flex"
            >
              GitHub ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <button
              ref={menuButton}
              type="button"
              className="relative grid h-11 w-11 place-items-center md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`absolute h-[1.5px] w-6 bg-current transition-transform duration-500 ease-[var(--ease-out)] ${open ? "rotate-45" : "-translate-y-[4px]"}`}
              />
              <span
                className={`absolute h-[1.5px] w-6 bg-current transition-transform duration-500 ease-[var(--ease-out)] ${open ? "-rotate-45" : "translate-y-[4px]"}`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[65] bg-ink text-paper transition-[clip-path] duration-700 ease-[var(--ease-in-out)] md:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile" className="container-x flex h-full flex-col justify-between pb-10 pt-28">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-1 display text-[clamp(2.4rem,11vw,5rem)]"
                >
                  <span className="mono-label text-signal-bright">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="mono-label text-paper/70">
            github.com/{site.githubHandle} ↗
          </a>
        </nav>
      </div>
    </>
  );
}
