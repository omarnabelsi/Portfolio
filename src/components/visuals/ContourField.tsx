"use client";

import { useEffect, useRef } from "react";
import { createNoise3D } from "@/lib/noise";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  className?: string;
  /** Stroke colour for regular contour lines. */
  ink?: string;
  /** Colour for the single highlighted contour. */
  accent?: string;
  levels?: number;
};

/**
 * Animated topographic contour lines (marching squares over simplex noise).
 * The pointer presses a gentle "summit" into the field. Runs at ~30fps,
 * pauses off-screen / in background tabs, and renders one static frame
 * when reduced motion is requested. It also measures its own frame cost:
 * on devices where a frame is expensive it settles into a static frame
 * rather than competing with scrolling and input.
 */
export function ContourField({ className = "", ink = "18,17,16", accent = "194,50,24", levels = 13 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const noise = createNoise3D(11);
    const reduced = prefersReducedMotion();
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let w = 0, h = 0, cols = 0, rows = 0, cell = 16;
    let field = new Float32Array(0);
    let raf = 0, last = 0, t = 0, visible = true;
    let frames = 0, cost = 0;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, s: 0, ts: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = coarse || w < 700 ? 24 : 15;
      cols = Math.ceil(w / cell) + 1;
      rows = Math.ceil(h / cell) + 1;
      field = new Float32Array(cols * rows);
      draw();
    };

    const sample = () => {
      const mr2 = 190 * 190;
      for (let j = 0; j < rows; j++) {
        const y = j * cell;
        for (let i = 0; i < cols; i++) {
          const x = i * cell;
          let v = noise(x * 0.0021, y * 0.0021, t) * 0.62 + noise(x * 0.0058, y * 0.0058, t * 1.6 + 9) * 0.22;
          if (mouse.s > 0.001) {
            const dx = x - mouse.x, dy = y - mouse.y;
            v += mouse.s * 0.55 * Math.exp(-(dx * dx + dy * dy) / mr2);
          }
          field[j * cols + i] = v;
        }
      }
    };

    const lerp = (a: number, b: number, l: number, va: number, vb: number) => a + ((l - va) / (vb - va || 1e-6)) * (b - a);

    const draw = () => {
      if (!w) return;
      sample();
      ctx.clearRect(0, 0, w, h);
      const highlight = Math.floor(levels * 0.62);
      for (let L = 0; L < levels; L++) {
        const level = -0.75 + (1.5 * (L + 0.5)) / levels;
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = field[j * cols + i], b = field[j * cols + i + 1];
            const c = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
            const idx = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x = i * cell, y = j * cell;
            const top = () => [lerp(x, x + cell, level, a, b), y] as const;
            const right = () => [x + cell, lerp(y, y + cell, level, b, c)] as const;
            const bottom = () => [lerp(x, x + cell, level, d, c), y + cell] as const;
            const left = () => [x, lerp(y, y + cell, level, a, d)] as const;
            const seg = (p: readonly [number, number], q: readonly [number, number]) => {
              ctx.moveTo(p[0], p[1]);
              ctx.lineTo(q[0], q[1]);
            };
            switch (idx) {
              case 1: case 14: seg(left(), bottom()); break;
              case 2: case 13: seg(bottom(), right()); break;
              case 3: case 12: seg(left(), right()); break;
              case 4: case 11: seg(top(), right()); break;
              case 6: case 9: seg(top(), bottom()); break;
              case 7: case 8: seg(left(), top()); break;
              case 5: seg(left(), top()); seg(bottom(), right()); break;
              case 10: seg(top(), right()); seg(left(), bottom()); break;
            }
          }
        }
        const isAccent = L === highlight;
        ctx.strokeStyle = isAccent ? `rgba(${accent},0.75)` : `rgba(${ink},${L % 4 === 0 ? 0.2 : 0.11})`;
        ctx.lineWidth = isAccent ? 1.4 : L % 4 === 0 ? 1.1 : 0.8;
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 33) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      t += dt * 0.045;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      mouse.s += (mouse.ts - mouse.s) * 0.06;
      const t0 = performance.now();
      draw();
      // Exponential moving average of draw time; bail out on slow devices.
      cost = frames === 0 ? performance.now() - t0 : cost * 0.8 + (performance.now() - t0) * 0.2;
      if (++frames > 8 && cost > 12) cancelAnimationFrame(raf);
    };

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (mouse.x < -999) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
      mouse.ts = 1;
    };
    const onLeave = () => (mouse.ts = 0);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const onVis = () => (visible = document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);

    resize();
    // Start animating once the main thread is idle, so the field never competes with hydration.
    let idle = 0;
    const start = () => (raf = requestAnimationFrame(loop));
    if (!reduced) {
      const w = window as Window & { requestIdleCallback?: typeof requestIdleCallback };
      if (w.requestIdleCallback) idle = w.requestIdleCallback(start, { timeout: 1500 });
      else idle = window.setTimeout(start, 600);
      if (!coarse) {
        window.addEventListener("pointermove", onPointer, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      (window as Window & { cancelIdleCallback?: typeof cancelIdleCallback }).cancelIdleCallback?.(idle);
      window.clearTimeout(idle);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [ink, accent, levels]);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none ${className}`} />;
}
