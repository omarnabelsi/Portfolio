"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "@/lib/useInView";

type Node = { id: string; x: number; y: number; label: string; sub: string; hub?: boolean };
type Edge = { from: string; to: string; kind: "goods" | "money"; bend: number; dur: number };

const nodes: Node[] = [
  { id: "farm", x: 70, y: 70, label: "Farmers", sub: "farms · crops · harvests" },
  { id: "proc", x: 250, y: 46, label: "Processing", sub: "configurable chains" },
  { id: "wh", x: 450, y: 82, label: "Warehouse", sub: "dispatch · receiving" },
  { id: "vendor", x: 290, y: 214, label: "Atizan vendors", sub: "storefronts · savings", hub: true },
  { id: "market", x: 540, y: 262, label: "Marketplace", sub: "open · premium" },
  { id: "cash", x: 70, y: 262, label: "Radikal locations", sub: "cash in · cash out" },
  { id: "wallet", x: 220, y: 370, label: "Wallets", sub: "rada currency" },
  { id: "ledger", x: 450, y: 370, label: "Ledger", sub: "append-only history" },
];

const edges: Edge[] = [
  { from: "farm", to: "proc", kind: "goods", bend: -30, dur: 4.2 },
  { from: "proc", to: "wh", kind: "goods", bend: -24, dur: 4.6 },
  { from: "wh", to: "vendor", kind: "goods", bend: 30, dur: 3.8 },
  { from: "vendor", to: "market", kind: "goods", bend: -20, dur: 3.4 },
  { from: "market", to: "ledger", kind: "money", bend: 30, dur: 3.6 },
  { from: "ledger", to: "wallet", kind: "money", bend: 26, dur: 4.4 },
  { from: "cash", to: "wallet", kind: "money", bend: -26, dur: 3.9 },
  { from: "wallet", to: "vendor", kind: "money", bend: -30, dur: 3.2 },
  { from: "wallet", to: "farm", kind: "money", bend: -60, dur: 5.4 },
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

function pathFor(e: Edge) {
  const a = byId[e.from], b = byId[e.to];
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * e.bend, cy = my + (dx / len) * e.bend;
  return `M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`;
}

/**
 * Illustrative ecosystem map: goods (gold) flow from farm to market,
 * money (emerald) flows back through wallets and an append-only ledger.
 */
export function LedgerFlow({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, "100px");
  const reduced = useReducedMotion();
  const animate = inView && !reduced;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg viewBox="0 0 600 420" className="h-auto w-full" role="img" aria-labelledby="ledgerflow-title">
        <title id="ledgerflow-title">
          ATIZAN Ledger ecosystem: goods move from farmers through processing and warehouses to vendors and the
          marketplace, while money moves through Radikal locations, wallets and an append-only ledger.
        </title>
        <defs>
          <radialGradient id="lf-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--atz-accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--atz-accent)" stopOpacity="0" />
          </radialGradient>
          <pattern id="lf-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="var(--atz-line)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="600" height="420" fill="url(#lf-grid)" opacity="0.6" />

        {edges.map((e, i) => (
          <path
            key={`p-${i}`}
            id={`lf-edge-${i}`}
            d={pathFor(e)}
            fill="none"
            stroke={e.kind === "goods" ? "var(--atz-gold)" : "var(--atz-accent)"}
            strokeOpacity={0.38}
            strokeWidth={1.2}
            strokeDasharray={e.kind === "goods" ? "3 5" : undefined}
          />
        ))}

        {animate &&
          edges.flatMap((e, i) =>
            [0, 0.5].map((offset) => (
              <circle
                key={`c-${i}-${offset}`}
                r={e.kind === "money" ? 3 : 2.6}
                fill={e.kind === "goods" ? "var(--atz-gold)" : "var(--atz-accent)"}
              >
                <animateMotion dur={`${e.dur}s`} begin={`${-offset * e.dur}s`} repeatCount="indefinite" rotate="auto">
                  <mpath href={`#lf-edge-${i}`} />
                </animateMotion>
              </circle>
            )),
          )}

        {nodes.map((n) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            {n.hub && <circle r={46} fill="url(#lf-glow)" />}
            <circle r={n.hub ? 9 : 6} fill="var(--atz-bg)" stroke="var(--atz-fg)" strokeWidth={1.3} />
            <circle r={n.hub ? 3.5 : 2.2} fill={n.hub ? "var(--atz-accent)" : "var(--atz-fg)"} />
            <text
              x={n.x > 420 ? -14 : 14}
              y={-4}
              textAnchor={n.x > 420 ? "end" : "start"}
              fill="var(--atz-fg)"
              className="lf-label"
              style={{ fontFamily: "var(--font-archivo)", fontWeight: 600, letterSpacing: "-0.01em" }}
            >
              {n.label}
            </text>
            <text
              x={n.x > 420 ? -14 : 14}
              y={12}
              textAnchor={n.x > 420 ? "end" : "start"}
              fill="var(--atz-muted)"
              className="lf-sub"
              style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "0.04em", textTransform: "uppercase" }}
            >
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 mono-label text-atz-muted">
        <span className="flex items-center gap-2">
          <span className="h-px w-5 border-t border-dashed border-atz-gold" /> Goods
        </span>
        <span className="flex items-center gap-2">
          <span className="h-px w-5 bg-atz-accent" /> Money
        </span>
        <span className="ml-auto">Illustrative diagram</span>
      </div>
    </div>
  );
}
