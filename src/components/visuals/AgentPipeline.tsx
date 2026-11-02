"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/useInView";

type Decision = "auto" | "approval";
type Scenario = {
  id: string;
  tab: string;
  request: string;
  tool: string;
  args: string;
  decision: Decision;
  policy: string;
  result: string;
};

/** Illustrative scenarios — they demonstrate the architecture, not recorded runs. */
const scenarios: Scenario[] = [
  {
    id: "files",
    tab: "Files",
    request: "Move last week’s screenshots into a folder called Archive.",
    tool: "File management · move",
    args: "source: Pictures/Screenshots · target: Pictures/Archive",
    decision: "auto",
    policy: "Allowed · reversible, undo available",
    result: "Files moved. Undo is one request away.",
  },
  {
    id: "message",
    tab: "Message",
    request: "Tell Sara on WhatsApp I’m running ten minutes late.",
    tool: "Communication · WhatsApp send",
    args: "to: Sara · text: “Running ten minutes late”",
    decision: "approval",
    policy: "Needs approval · sends on your behalf",
    result: "You approved it. Message sent and logged.",
  },
  {
    id: "system",
    tab: "System",
    request: "What’s eating my GPU right now?",
    tool: "Desktop · system usage",
    args: "metrics: cpu, ram, gpu",
    decision: "auto",
    policy: "Allowed · read-only",
    result: "Top processes reported, spoken aloud if voice is on.",
  },
  {
    id: "delete",
    tab: "Delete",
    request: "Clear out the old build folders in my projects.",
    tool: "File management · delete",
    args: "mode: recycle bin · scope: project build folders",
    decision: "approval",
    policy: "Needs approval · destructive action",
    result: "Approved. Sent to the Recycle Bin, not erased.",
  },
];

const STEPS = ["Request", "Tool selected", "Arguments validated", "Policy", "Executed", "Result"] as const;
const STEP_MS = 900;

export function AgentPipeline({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, "-10% 0px");
  const reduced = useReducedMotion();
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const s = scenarios[scenarioIdx];
  const shownStep = reduced ? STEPS.length : step;

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setTimeout(
      () => {
        if (step < STEPS.length) setStep(step + 1);
        else if (auto) {
          setScenarioIdx((i) => (i + 1) % scenarios.length);
          setStep(0);
        }
      },
      step === 0 ? 500 : step >= STEPS.length ? 2600 : STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [inView, reduced, step, auto]);

  const choose = (i: number) => {
    setAuto(false);
    setScenarioIdx(i);
    setStep(0);
  };

  const rows: { label: string; value: string; tone?: "accent" | "warn" }[] = [
    { label: "Request", value: `“${s.request}”` },
    { label: "Tool", value: s.tool },
    { label: "Args", value: s.args },
    { label: "Policy", value: s.policy, tone: s.decision === "approval" ? "warn" : "accent" },
    { label: "Run", value: s.decision === "approval" ? "Executed after explicit approval" : "Executed under policy" },
    { label: "Result", value: s.result, tone: "accent" },
  ];

  return (
    <div ref={ref} className={`text-alfa-fg ${className}`}>
      <div className="overflow-hidden rounded-xl border border-alfa-line bg-alfa-bg-2/80 shadow-[0_40px_120px_-40px_rgba(143,128,255,0.45)] backdrop-blur">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-alfa-line px-4 py-3">
          <span className="flex gap-1.5" aria-hidden>
            <i className="h-2.5 w-2.5 rounded-full bg-alfa-fg/20" />
            <i className="h-2.5 w-2.5 rounded-full bg-alfa-fg/20" />
            <i className="h-2.5 w-2.5 rounded-full bg-alfa-fg/20" />
          </span>
          <span className="mono-label text-alfa-muted">ALFA · agent loop</span>
          <span className="ml-auto flex items-center gap-2 mono-label text-alfa-cyan">
            <i className="h-1.5 w-1.5 rounded-full bg-alfa-cyan motion-safe:animate-[pulse-dot_1.6s_ease-in-out_infinite]" aria-hidden />
            Listening
          </span>
        </div>

        {/* Voice activity */}
        <div className="flex h-14 items-center justify-center gap-[3px] border-b border-alfa-line px-4" aria-hidden>
          {Array.from({ length: 48 }, (_, i) => (
            <span
              key={i}
              className="h-9 w-[3px] origin-center rounded-full bg-gradient-to-t from-alfa-accent to-alfa-cyan"
              style={{
                animation: inView && !reduced && shownStep <= 1 ? `wave ${0.7 + ((i * 37) % 9) / 10}s ease-in-out ${-(i % 7) / 7}s infinite` : "none",
                transform: inView && !reduced && shownStep <= 1 ? undefined : `scaleY(${0.22 + (((i * 53) % 11) / 11) * 0.4})`,
                opacity: 0.55 + ((i * 29) % 5) / 10,
              }}
            />
          ))}
        </div>

        {/* Steps */}
        <ol className="space-y-0 px-4 py-4 md:px-5" aria-live="off">
          {rows.map((row, i) => {
            const active = shownStep > i;
            const current = shownStep === i + 1 && !reduced;
            return (
              <li
                key={row.label}
                className={`grid grid-cols-[5.5rem_1fr] items-start gap-3 border-b border-alfa-line/60 py-2.5 transition-[opacity,transform] duration-500 last:border-0 ${
                  active ? "translate-x-0 opacity-100" : "translate-x-2 opacity-25"
                }`}
              >
                <span className={`mono-label pt-0.5 ${current ? "text-alfa-cyan" : "text-alfa-muted"}`}>
                  {String(i + 1).padStart(2, "0")} {row.label}
                </span>
                <span
                  className={`text-[0.92rem] leading-snug ${
                    row.tone === "warn" ? "text-[#ffcf7a]" : row.tone === "accent" ? "text-alfa-cyan" : "text-alfa-fg"
                  }`}
                >
                  {row.value}
                  {row.label === "Policy" && active && s.decision === "approval" && (
                    <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-[#ffcf7a]/40 px-2 py-0.5 align-middle mono-label text-[0.62rem] text-[#ffcf7a]">
                      Approve · Deny
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Scenario tabs (real controls) */}
      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Choose an example request">
        {scenarios.map((sc, i) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => choose(i)}
            aria-pressed={i === scenarioIdx}
            className={`rounded-full border px-3.5 py-1.5 mono-label transition-colors ${
              i === scenarioIdx
                ? "border-alfa-accent bg-alfa-accent text-alfa-bg"
                : "border-alfa-line text-alfa-muted hover:border-alfa-fg/50 hover:text-alfa-fg"
            }`}
          >
            {sc.tab}
          </button>
        ))}
        <span className="ml-auto mono-label text-alfa-muted">Illustrative sequence</span>
      </div>
      <p className="sr-only" aria-live={auto ? "off" : "polite"}>
        Example: {s.request} Tool: {s.tool}. Policy: {s.policy}. Result: {s.result}
      </p>
    </div>
  );
}
