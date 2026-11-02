"use client";

import { useEffect } from "react";
import { site } from "@/content/site";

/**
 * Intro sequence: the seal writes itself right-to-left (as Arabic is written),
 * a hairline fills, and the curtain lifts — ~1.8s total, once per session.
 * Animation is pure CSS so it can never block a visitor without JS;
 * clicking or pressing any key skips it.
 */
export function Loader() {
  const skip = () => document.documentElement.classList.add("loader-skip");

  useEffect(() => {
    window.addEventListener("keydown", skip, { once: true });
    return () => window.removeEventListener("keydown", skip);
  }, []);
  return (
    <div
      className="loader"
      aria-hidden
      onClick={skip}
      onAnimationEnd={(e) => {
        if (e.animationName === "loader-exit") skip();
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <span className="loader__seal" lang="ar" dir="rtl">
          {site.nameArabic}
        </span>
        <span className="loader__bar" />
        <span className="mono-label text-paper/60">Omar Nabelsi — Portfolio</span>
      </div>
    </div>
  );
}
