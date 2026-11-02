import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { caseThemes, type CaseTheme } from "./CaseParts";
import { CharRise, type Segment } from "@/components/ui/CharRise";

type Props = {
  theme: CaseTheme;
  index: string;
  kicker: string;
  /** Title as segments so it can be server-split for the CSS letter rise. */
  title: Segment[];
  summary: string;
  visual: ReactNode;
  meta: ReactNode;
  backdrop?: ReactNode;
};

const step = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;

/** Case-study opener. Entrance is CSS-only so the first paint never waits on JS. */
export function CaseHero({ theme, index, kicker, title, summary, visual, meta, backdrop }: Props) {
  const t = caseThemes[theme];
  return (
    <section aria-labelledby="case-title" className="relative isolate overflow-hidden pb-16 pt-[calc(var(--header-h)+2rem)] md:pb-24">
      {backdrop}
      <div className="container-x">
        <div className={`flex items-center justify-between border-b pb-4 ${t.line}`}>
          <Link href="/#work" className={`mono-label hover:underline ${t.muted}`}>
            ← All work
          </Link>
          <span className={`mono-label ${t.muted}`}>
            <span className={t.accent}>{index}</span> / {kicker}
          </span>
        </div>

        <div className="grid items-center gap-12 pt-12 lg:grid-cols-12 lg:pt-16">
          <div className="lg:col-span-6">
            <h1 id="case-title" className="display text-[clamp(3.6rem,10vw,9.5rem)]">
              <span className="sr-only">{title.reduce((acc, s, i) => acc + (i && s.block ? " " : "") + s.text, "")}</span>
              <span aria-hidden>
                <CharRise segments={title} />
              </span>
            </h1>
            <p className={`intro mt-8 max-w-[48ch] text-[1.12rem] leading-relaxed md:text-[1.2rem] ${t.muted}`} style={step(0.35)}>
              {summary}
            </p>
          </div>
          <div className="intro lg:col-span-6" style={step(0.45)}>
            {visual}
          </div>
        </div>
        <div className="intro mt-16" style={step(0.6)}>
          {meta}
        </div>
      </div>
    </section>
  );
}
