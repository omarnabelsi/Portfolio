import type { Metadata } from "next";
import { CaseSection, MetaGrid, NextProject, StatusBoard } from "@/components/case/CaseParts";
import { CaseHero } from "@/components/case/CaseHero";
import { AgentLoop } from "@/components/visuals/AgentLoop";
import { AgentPipeline } from "@/components/visuals/AgentPipeline";
import { LanguageDemo } from "@/components/visuals/LanguageDemo";
import { LayerStack } from "@/components/visuals/LayerStack";
import { ToolCounter } from "@/components/visuals/ToolCounter";
import { Reveal } from "@/components/ui/Reveal";
import { caseThemes } from "@/components/case/CaseParts";

export const metadata: Metadata = {
  title: "ALFA — AI desktop assistant case study",
  description:
    "Case study: ALFA, a voice-and-keyboard AI agent for Windows with 64 named tools and a permission engine that evaluates every action. Python, FastAPI, Tauri, Rust, React and the Claude API.",
  alternates: { canonical: "/work/alfa" },
  openGraph: { url: "/work/alfa" },
};

const t = caseThemes.alfa;

const domains = [
  { name: "Desktop", items: ["Open & close apps", "CPU · RAM · GPU usage", "Notifications", "Type & click in the foreground app"] },
  { name: "Files", items: ["Search & read", "Write & organise", "Move · rename · copy", "Recycle-bin deletion", "Undo supported actions"] },
  { name: "Browser", items: ["Web search", "Dedicated browser profile", "Read, scroll & fill forms", "Downloads need approval"] },
  { name: "Screen", items: ["Screenshots when permitted", "Screen recording", "Screen understanding", "OBS replay buffer (setup required)"] },
  { name: "Productivity", items: ["Reminders · focus mode", "Study timer", "Prayer times & reminders", "Gmail · Calendar · Asana", "Daily summaries · routines"] },
  { name: "Communication", items: ["Read Discord & WhatsApp", "Send WhatsApp — with approval"] },
  { name: "Memory", items: ["Local conversation database", "You choose what’s remembered or forgotten"] },
  { name: "Code", items: ["Search & read project files", "Edit code · run tests", "Git status, diffs & history"] },
];

const safety = [
  { k: "Named tools only", d: "The model can only call registered tools. There is no eval and no arbitrary shell-string execution." },
  { k: "Policy on every call", d: "Arguments are validated, then a policy decides: approve, refuse, or auto-permit." },
  { k: "Explicit approval for risk", d: "Dangerous actions — sending messages, deleting, downloading — wait for a human." },
  { k: "Untrusted content stays data", d: "Web pages, emails and screen text are treated as information, never as instructions." },
  { k: "Visible history", d: "Action history and trust reporting show what ran, when, and why it was allowed." },
  { k: "Privacy modes", d: "Streamer mode and guest mode, plus permission management you control." },
];

export default function AlfaPage() {
  return (
    <div className={`${t.page} min-h-screen`}>
      <CaseHero
        theme="alfa"
        index="02"
        kicker="Case study · AI agent"
        backdrop={
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_45%_at_78%_38%,rgba(143,128,255,0.22),transparent_70%),radial-gradient(35%_35%_at_15%_85%,rgba(95,227,232,0.10),transparent_70%)]"
          />
        }
        title={[{ text: "ALFA" }, { text: ".", className: "text-alfa-accent" }]}
        summary="A voice-and-keyboard AI assistant for Windows. You ask in plain language; the model picks a named tool; a permission layer checks the action; ALFA runs it and answers on screen — and out loud, if you like."
        visual={<AgentPipeline />}
        meta={
          <MetaGrid
            theme="alfa"
            items={[
              { k: "Platform", v: "Windows desktop" },
              { k: "Input", v: "Voice · keyboard · terminal client" },
              { k: "Default model", v: "Claude" },
              { k: "Tools", v: "64 built-in · MCP optional" },
            ]}
          />
        }
      />

      <CaseSection
        id="loop"
        index="01"
        label="More than a chatbot"
        theme="alfa"
        title={
          <>
            The model proposes. <span className="serif-accent text-alfa-cyan">The policy decides.</span>
          </>
        }
      >
        <Reveal as="p" className="mb-14 max-w-[62ch] text-[1.1rem] leading-relaxed text-alfa-fg/85">
          A chatbot only talks. ALFA acts on a real computer — so the interesting engineering isn’t the conversation, it’s
          everything between “the model wants to do something” and “something happened”. Plans can retry, and long-running
          tasks survive restarts.
        </Reveal>
        <AgentLoop />
      </CaseSection>

      <CaseSection
        id="capabilities"
        index="02"
        label="Capabilities"
        theme="alfa"
        title={
          <>
            Sixty-four named tools, <span className="serif-accent text-alfa-cyan">one front door.</span>
          </>
        }
      >
        <div className="mb-12 flex flex-wrap items-end gap-x-10 gap-y-4">
          <ToolCounter to={64} className="display text-[clamp(6rem,16vw,14rem)] leading-[0.8] text-alfa-accent" />
          <p className="max-w-[40ch] pb-2 text-[1.05rem] leading-relaxed text-alfa-muted">
            Built-in tools across eight domains. Each one is registered, typed and governed by the same permission
            engine — nothing reaches the operating system any other way.
          </p>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-alfa-line bg-alfa-line sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((d, i) => (
            <li key={d.name} className="group bg-alfa-bg p-6 transition-colors hover:bg-alfa-bg-2 md:p-7">
              <div className="flex items-baseline justify-between">
                <p className="display-tight text-[1.5rem] uppercase">{d.name}</p>
                <span className="mono-label text-alfa-muted group-hover:text-alfa-cyan">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <ul className="mt-5 space-y-2 text-[0.95rem] text-alfa-muted">
                {d.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span aria-hidden className="text-alfa-accent">
                      ›
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[0.95rem] text-alfa-muted">
          Additional tools can come from Model Context Protocol servers — only when explicitly configured.
        </p>
      </CaseSection>

      <CaseSection
        id="safety"
        index="03"
        label="Security model"
        theme="alfa"
        title={
          <>
            Built to say no <span className="serif-accent text-alfa-cyan">before it says done.</span>
          </>
        }
      >
        <div className="grid gap-12 lg:grid-cols-12">
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-alfa-line bg-alfa-line sm:grid-cols-2 lg:col-span-8">
            {safety.map((s, i) => (
              <li key={s.k} className="bg-alfa-bg p-6 md:p-7">
                <span className="mono-label text-alfa-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[1.2rem] font-semibold tracking-tight">{s.k}</h3>
                <p className="mt-2 text-[0.96rem] leading-relaxed text-alfa-muted">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl border border-alfa-line bg-alfa-bg-2 p-7">
              <p className="mono-label text-alfa-muted">Emergency stop</p>
              <p className="mt-6 flex flex-wrap items-center gap-2" aria-label="Control plus Alt plus Backspace">
                {["Ctrl", "Alt", "Backspace"].map((k, i) => (
                  <span key={k} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden className="text-alfa-muted">+</span>}
                    <kbd className="rounded-lg border border-b-4 border-alfa-line bg-alfa-bg px-3.5 py-2 font-mono text-[0.95rem] text-alfa-fg">
                      {k}
                    </kbd>
                  </span>
                ))}
              </p>
              <p className="mt-6 text-[0.98rem] leading-relaxed text-alfa-muted">
                Interrupts whatever ALFA is doing, at any moment. A human always has the last word.
              </p>
            </div>
          </div>
        </div>
      </CaseSection>

      <CaseSection
        id="voice"
        index="04"
        label="Languages & voice"
        theme="alfa"
        title={
          <>
            Five languages, <span className="serif-accent text-alfa-cyan">right-to-left included.</span>
          </>
        }
      >
        <LanguageDemo />
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-alfa-line bg-alfa-line md:grid-cols-3">
          {[
            { k: "Speech in", v: "Whisper", d: "Recognition runs locally." },
            { k: "Speech out", v: "Kokoro · Piper", d: "Local synthesis for supported languages." },
            {
              k: "Optional voice",
              v: "Microsoft speech service",
              d: "Used for the optional Lebanese Arabic female voice — this one is a cloud service, not offline.",
            },
          ].map((v) => (
            <div key={v.k} className="bg-alfa-bg p-6 md:p-7">
              <p className="mono-label text-alfa-muted">{v.k}</p>
              <p className="mt-3 text-[1.35rem] font-semibold tracking-tight">{v.v}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-alfa-muted">{v.d}</p>
            </div>
          ))}
        </div>
      </CaseSection>

      <CaseSection
        id="stack"
        index="05"
        label="Architecture"
        theme="alfa"
        title={
          <>
            A desktop shell around <span className="serif-accent text-alfa-cyan">a guarded agent core.</span>
          </>
        }
      >
        <LayerStack
          tone={{ line: t.line, muted: t.muted, accent: t.accent, surface: t.surface }}
          layers={[
            { name: "Interface", items: ["Tauri", "Rust", "React", "TypeScript", "Terminal client"], note: "Multilingual · RTL" },
            { name: "Agent core", items: ["Python", "FastAPI", "Claude API", "Planning & retries", "Durable tasks"] },
            { name: "Guardrails", items: ["Tool registry", "Argument validation", "Policy engine", "Approvals", "Activity log"] },
            { name: "Integrations", items: ["64 built-in tools", "MCP servers (opt-in)", "Gmail · Calendar · Asana"] },
            { name: "Voice", items: ["Whisper", "Kokoro", "Piper"], note: "Local-first" },
            { name: "Memory", items: ["Local database", "User-controlled memory"] },
          ]}
        />
        <p className="mt-6 text-[0.95rem] text-alfa-muted">Technologies as documented for the project; layer grouping simplified for clarity.</p>
      </CaseSection>

      <CaseSection
        id="status"
        index="06"
        label="Status, honestly"
        theme="alfa"
        title={
          <>
            Substantial and tested — <span className="serif-accent text-alfa-cyan">with the gaps written down.</span>
          </>
        }
      >
        <StatusBoard
          theme="alfa"
          done={[
            { label: "Agent loop & permission engine", note: "Tool selection, validation, policy, approvals and logging." },
            { label: "Tools", note: "The built-in tool set across desktop, files, browser, screen, productivity and code." },
            { label: "Multilingual desktop interface", note: "Five languages, including an RTL Arabic layout." },
            { label: "Voice in & out · terminal client", note: "Built and tested." },
          ]}
          pending={[
            { label: "Distribution", note: "The installer is not code-signed, and there is no auto-updater yet." },
            { label: "Real-world input", note: "Real desktop keyboard and mouse execution isn’t fully verified." },
            { label: "Integrations", note: "Some have limited real-account verification; OBS was checked only against a simulated environment." },
            { label: "Quality metrics", note: "Translations await native-speaker review; no published speed or accuracy measurements yet." },
          ]}
        />
      </CaseSection>

      <NextProject href="/work/atizan-ledger" name="ATIZAN Ledger" kicker="Fintech platform" theme="alfa" />
    </div>
  );
}
