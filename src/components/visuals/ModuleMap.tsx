"use client";

import { useState } from "react";

type Flow = "money" | "goods" | "markets" | "people";
type Module = { name: string; detail: string; flows: Flow[]; experimental?: boolean };

const modules: Module[] = [
  { name: "Wallet & rada currency", detail: "Balances, transfers and a platform currency.", flows: ["money", "people"] },
  { name: "Cash in · cash out", detail: "Deposits and withdrawals at Radikal’s physical locations.", flows: ["money"] },
  { name: "Vendor marketplace", detail: "A marketplace built around atizan vendors.", flows: ["markets", "goods", "people"] },
  { name: "Supply chain registry", detail: "Farmers, farms, crops and harvests.", flows: ["goods", "people"] },
  { name: "Processing chains", detail: "Facilities and configurable multi-step processing.", flows: ["goods"] },
  { name: "Farmer wallets & payouts", detail: "Settling harvests back to the people who grew them.", flows: ["money", "people"] },
  { name: "Logistics & routing", detail: "Order routing, dispatch, warehouse receiving.", flows: ["goods"] },
  { name: "Delivery & returns", detail: "Tracking every shipment, handling what comes back.", flows: ["goods"] },
  { name: "Savings groups", detail: "Group savings for vendors, held in the wallet system.", flows: ["money", "people"] },
  { name: "Consumer marketplace", detail: "Open Market and Premium Market storefronts.", flows: ["markets"] },
  { name: "Quality control", detail: "Quality-control workflows for marketplace storefronts.", flows: ["markets", "goods"] },
  { name: "Premium checkout", detail: "Payment integration for Premium Market orders.", flows: ["money", "markets"] },
  { name: "Ledger mirror", detail: "Solidity mirror of ledger history — an experiment, not production.", flows: ["money"], experimental: true },
];

const filters: { id: Flow | "all"; label: string }[] = [
  { id: "all", label: "All domains" },
  { id: "money", label: "Money" },
  { id: "goods", label: "Goods" },
  { id: "markets", label: "Markets" },
  { id: "people", label: "People" },
];

/** Interactive map of the platform's business domains. */
export function ModuleMap() {
  const [active, setActive] = useState<Flow | "all">("all");

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Highlight domains by flow">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
            className={`rounded-full border px-4 py-2 mono-label transition-colors ${
              active === f.id
                ? "border-atz-accent bg-atz-accent text-atz-bg"
                : "border-atz-line text-atz-muted hover:border-atz-fg/50 hover:text-atz-fg"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-atz-line bg-atz-line sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((m, i) => {
          const on = active === "all" || m.flows.includes(active);
          return (
            <li
              key={m.name}
              className={`relative bg-atz-bg p-5 transition-[opacity,background-color] duration-500 md:p-6 ${
                on ? "opacity-100" : "opacity-25"
              } ${on && active !== "all" ? "bg-atz-bg-2" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="mono-label text-atz-muted">{String(i + 1).padStart(2, "0")}</span>
                {m.experimental && (
                  <span className="rounded-full border border-atz-gold/50 px-2 py-0.5 mono-label text-[0.6rem] text-atz-gold">
                    Experimental
                  </span>
                )}
              </div>
              <p className="mt-6 text-[1.1rem] font-semibold leading-tight tracking-tight">{m.name}</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-atz-muted">{m.detail}</p>
              <div className="mt-4 flex gap-1.5" aria-hidden>
                {m.flows.map((f) => (
                  <span
                    key={f}
                    className={`h-1 w-6 rounded-full ${
                      f === "money" ? "bg-atz-accent" : f === "goods" ? "bg-atz-gold" : f === "markets" ? "bg-atz-fg/60" : "bg-atz-muted/60"
                    }`}
                  />
                ))}
              </div>
            </li>
          );
        })}
        <li className="flex flex-col justify-end bg-atz-bg-2 p-5 md:p-6 sm:col-span-2 lg:col-span-3">
          <p className="display-tight text-[clamp(1.6rem,2.6vw,2.4rem)] text-atz-fg">
            Thirteen domains. <span className="serif-accent text-atz-gold">One ledger of truth.</span>
          </p>
        </li>
      </ul>
    </div>
  );
}
