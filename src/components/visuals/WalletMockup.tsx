"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/useInView";

/** Sample entries for an illustrative interface — not production data. */
const entries = [
  { kind: "Cash in", where: "Radikal location", amount: "+1,500.00", tone: "in" },
  { kind: "Order", where: "Open Market", amount: "−320.00", tone: "out" },
  { kind: "Savings group", where: "Weekly contribution", amount: "−250.00", tone: "out" },
  { kind: "Sale", where: "Storefront", amount: "+875.50", tone: "in" },
  { kind: "Farmer payout", where: "Harvest settlement", amount: "−1,120.00", tone: "out" },
  { kind: "Sale", where: "Premium Market", amount: "+2,040.00", tone: "in" },
] as const;

const bars = [38, 52, 44, 68, 59, 81, 73, 92, 64, 88, 77, 96];
const TARGET = 12480.5;
const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function WalletMockup({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const balance = useRef<HTMLParagraphElement>(null);
  const counted = useRef(false);
  const [tick, setTick] = useState(0);

  // Count the balance up once when it scrolls into view. Writes straight to the
  // DOM (no React re-render per frame); the server-rendered value is the final one.
  useEffect(() => {
    const el = balance.current;
    if (!el || !inView || reduced || counted.current) return;
    counted.current = true;
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / 1600, 1);
      el.textContent = fmt(TARGET * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      el.textContent = fmt(TARGET);
    };
  }, [inView, reduced]);

  // New ledger line every few seconds (append-only: rows only ever push down).
  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => setTick((n) => n + 1), 2600);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  const rows = Array.from({ length: 4 }, (_, i) => {
    const seq = tick + entries.length - i;
    return { ...entries[seq % entries.length], ref: `#${10476 + seq}` };
  });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="overflow-hidden rounded-2xl border border-atz-line bg-atz-bg-2 shadow-[0_50px_120px_-50px_rgba(61,220,151,0.35)]">
        <div className="flex items-center justify-between border-b border-atz-line px-5 py-3">
          <span className="mono-label text-atz-muted">Vendor wallet</span>
          <span className="flex items-center gap-2 mono-label text-atz-accent">
            <i aria-hidden className="h-1.5 w-1.5 rounded-full bg-atz-accent motion-safe:animate-[pulse-dot_1.8s_ease-in-out_infinite]" />
            Ledger synced
          </span>
        </div>

        <div className="grid gap-6 p-5 md:grid-cols-[1.1fr_1fr] md:p-6">
          <div>
            <p className="mono-label text-atz-muted">Balance · rada</p>
            <p ref={balance} className="mt-2 display-tight text-[clamp(2.2rem,4.4vw,3.4rem)] tabular-nums">
              {fmt(TARGET)}
            </p>
            <div className="mt-5 flex h-20 items-end gap-1.5" aria-hidden>
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 origin-bottom rounded-sm bg-atz-accent/70 transition-transform duration-1000 ease-[var(--ease-out)]"
                  style={{ height: `${h}%`, transform: inView || reduced ? "scaleY(1)" : "scaleY(0.05)", transitionDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
            <p className="mt-2 mono-label text-atz-muted">Weekly volume</p>
          </div>

          <div className="flex flex-col gap-2">
            {["Deposit cash", "Pay supplier", "Savings group"].map((a, i) => (
              <span
                key={a}
                className={`flex items-center justify-between rounded-lg border border-atz-line px-4 py-3 text-[0.92rem] ${
                  i === 0 ? "bg-atz-accent text-atz-bg" : ""
                }`}
              >
                {a}
                <span aria-hidden>→</span>
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-atz-line">
          <p className="px-5 pt-4 mono-label text-atz-muted">Append-only history</p>
          <ul className="px-5 pb-4 pt-2" aria-label="Sample ledger entries">
            {rows.map((r, i) => (
              <li
                key={`${tick}-${i}`}
                className={`grid grid-cols-[4rem_1fr_auto] items-baseline gap-3 border-b border-atz-line/70 py-2.5 last:border-0 ${
                  i === 0 && !reduced ? "animate-[slide-in_0.7s_var(--ease-out)]" : ""
                }`}
              >
                <span className="mono-label text-[0.62rem] text-atz-muted">{r.ref}</span>
                <span className="text-[0.9rem]">
                  {r.kind} <span className="text-atz-muted">· {r.where}</span>
                </span>
                <span className={`tabular-nums text-[0.9rem] font-semibold ${r.tone === "in" ? "text-atz-accent" : "text-atz-fg"}`}>
                  {r.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-3 text-right mono-label text-atz-muted">Illustrative interface · sample values</p>
    </div>
  );
}
