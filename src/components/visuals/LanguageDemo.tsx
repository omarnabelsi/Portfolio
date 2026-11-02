"use client";

import { useState } from "react";

const languages = [
  { code: "en", name: "English", dir: "ltr", hello: "What can I do for you?", hint: "Listening…" },
  { code: "es", name: "Español", dir: "ltr", hello: "¿Qué puedo hacer por ti?", hint: "Escuchando…" },
  { code: "it", name: "Italiano", dir: "ltr", hello: "Cosa posso fare per te?", hint: "In ascolto…" },
  { code: "fr", name: "Français", dir: "ltr", hello: "Que puis-je faire pour vous ?", hint: "J’écoute…" },
  { code: "ar", name: "العربية", dir: "rtl", hello: "كيف يمكنني مساعدتك؟", hint: "أستمع…" },
] as const;

/** Switch interface language; Arabic flips the whole layout to RTL. */
export function LanguageDemo() {
  const [i, setI] = useState(0);
  const lang = languages[i];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
      <div className="flex flex-wrap gap-2 lg:col-span-4 lg:flex-col lg:items-start" role="group" aria-label="Interface language">
        {languages.map((l, idx) => (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            aria-pressed={idx === i}
            onClick={() => setI(idx)}
            className={`rounded-full border px-4 py-2 text-[0.95rem] transition-colors ${
              idx === i
                ? "border-alfa-accent bg-alfa-accent text-alfa-bg"
                : "border-alfa-line text-alfa-muted hover:border-alfa-fg/40 hover:text-alfa-fg"
            }`}
          >
            {l.name}
          </button>
        ))}
      </div>

      <div className="lg:col-span-8">
        <div
          lang={lang.code}
          dir={lang.dir}
          className="overflow-hidden rounded-2xl border border-alfa-line bg-alfa-bg-2"
          aria-live="polite"
        >
          <div className="flex items-center justify-between border-b border-alfa-line px-5 py-3">
            <span className="flex items-center gap-2 text-[0.9rem] text-alfa-cyan">
              <i aria-hidden className="h-2 w-2 rounded-full bg-alfa-cyan motion-safe:animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
              {lang.hint}
            </span>
            <span className="mono-label text-alfa-muted">ALFA</span>
          </div>
          <div className="flex min-h-[220px] flex-col justify-end gap-4 p-6 md:p-8">
            <p className="max-w-[90%] self-start rounded-2xl rounded-ss-sm bg-alfa-fg/[0.06] px-5 py-4 text-[clamp(1.4rem,2.6vw,2.2rem)] font-semibold leading-tight">
              {lang.hello}
            </p>
            <p className="self-end rounded-full border border-alfa-line px-4 py-2 mono-label text-alfa-muted" dir="ltr">
              dir=&quot;{lang.dir}&quot;
            </p>
          </div>
        </div>
        <p className="mt-3 mono-label text-alfa-muted">Demo of the RTL behaviour — strings written for this page</p>
      </div>
    </div>
  );
}
