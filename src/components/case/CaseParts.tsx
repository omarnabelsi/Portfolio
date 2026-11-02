import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/** Palette hooks per case study; components read these instead of hardcoding colours. */
export const caseThemes = {
  atizan: {
    page: "bg-atz-bg text-atz-fg",
    muted: "text-atz-muted",
    line: "border-atz-line",
    accent: "text-atz-accent",
    accent2: "text-atz-gold",
    surface: "bg-atz-bg-2",
    accentBg: "bg-atz-accent text-atz-bg",
  },
  alfa: {
    page: "bg-alfa-bg text-alfa-fg",
    muted: "text-alfa-muted",
    line: "border-alfa-line",
    accent: "text-alfa-cyan",
    accent2: "text-alfa-accent",
    surface: "bg-alfa-bg-2",
    accentBg: "bg-alfa-accent text-alfa-bg",
  },
} as const;
export type CaseTheme = keyof typeof caseThemes;

export function CaseSection({
  index,
  label,
  title,
  theme,
  children,
  id,
}: {
  index: string;
  label: string;
  title: ReactNode;
  theme: CaseTheme;
  children: ReactNode;
  id: string;
}) {
  const t = caseThemes[theme];
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-20 md:py-32">
      <div className="container-x">
        <div className={`grid gap-6 border-t pt-6 md:grid-cols-12 ${t.line}`}>
          <p className={`mono-label md:col-span-3 ${t.muted}`}>
            <span className={t.accent}>{index}</span> — {label}
          </p>
          <Reveal as="h2" mode="lines" id={`${id}-title`} className="display-tight text-[clamp(2.2rem,5vw,4.8rem)] md:col-span-9">
            {title}
          </Reveal>
        </div>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}

export type StatusItem = { label: string; note: string };

function StatusColumn({ theme, title, items, ok }: { theme: CaseTheme; title: string; items: StatusItem[]; ok: boolean }) {
  const t = caseThemes[theme];
  return (
    <div className={`rounded-2xl border p-6 md:p-8 ${t.line} ${t.surface}`}>
      <p className="flex items-center gap-3 mono-label">
        <span
          aria-hidden
          className={`grid h-5 w-5 place-items-center rounded-full text-[0.7rem] ${ok ? t.accentBg : "border border-[#ffcf7a] text-[#ffcf7a]"}`}
        >
          {ok ? "✓" : "!"}
        </span>
        {title}
      </p>
      <ul className="mt-6">
        {items.map((it) => (
          <li key={it.label} className={`border-t py-4 ${t.line}`}>
            <p className="font-semibold tracking-tight">{it.label}</p>
            <p className={`mt-1 text-[0.95rem] leading-relaxed ${t.muted}`}>{it.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StatusBoard({
  theme,
  done,
  pending,
  doneTitle = "Built & tested",
  pendingTitle = "Not yet verified",
}: {
  theme: CaseTheme;
  done: StatusItem[];
  pending: StatusItem[];
  doneTitle?: string;
  pendingTitle?: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <StatusColumn theme={theme} title={doneTitle} items={done} ok />
      <StatusColumn theme={theme} title={pendingTitle} items={pending} ok={false} />
    </div>
  );
}

export function NextProject({ href, name, kicker, theme }: { href: string; name: string; kicker: string; theme: CaseTheme }) {
  const t = caseThemes[theme];
  return (
    <section aria-label="Next case study" className={`border-t ${t.line}`}>
      <Link href={href} data-cursor="Next" className="group container-x block py-20 md:py-28">
        <p className={`mono-label ${t.muted}`}>Next case study — {kicker}</p>
        <p className="display mt-6 flex items-center gap-6 text-[clamp(3.4rem,11vw,11rem)]">
          <span className="transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-4">{name}</span>
          <span aria-hidden className={`text-[0.5em] transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-6 ${t.accent}`}>
            →
          </span>
        </p>
      </Link>
    </section>
  );
}

export function MetaGrid({ theme, items }: { theme: CaseTheme; items: { k: string; v: string }[] }) {
  const t = caseThemes[theme];
  return (
    <dl className={`grid grid-cols-2 border-t md:grid-cols-4 ${t.line}`}>
      {items.map((m) => (
        <div key={m.k} className={`border-b py-4 pr-4 ${t.line}`}>
          <dt className={`mono-label ${t.muted}`}>{m.k}</dt>
          <dd className="mt-2 text-[0.98rem] font-semibold leading-snug tracking-tight">{m.v}</dd>
        </div>
      ))}
    </dl>
  );
}
