import type { Metadata } from "next";
import { CaseSection, MetaGrid, NextProject, StatusBoard, caseThemes } from "@/components/case/CaseParts";
import { CaseHero } from "@/components/case/CaseHero";
import { LayerStack } from "@/components/visuals/LayerStack";
import { LedgerFlow } from "@/components/visuals/LedgerFlow";
import { ModuleMap } from "@/components/visuals/ModuleMap";
import { WalletMockup } from "@/components/visuals/WalletMockup";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "ATIZAN Ledger — case study",
  description:
    "Case study: a digital wallet, marketplace and agricultural supply-chain platform for women market vendors and farmers in Haiti — NestJS, PostgreSQL, Redis, Angular and React Native.",
  alternates: { canonical: "/work/atizan-ledger" },
  openGraph: { url: "/work/atizan-ledger" },
};

const t = caseThemes.atizan;

const engineering = [
  {
    title: "Money as a type, not a number",
    body: "Amounts move through decimal.js and a dedicated Money helper, so rounding is explicit and binary floating-point never touches a balance.",
  },
  {
    title: "Append-only financial history",
    body: "Audit and financial records are written once and never edited. Corrections are new entries — the history always explains the balance.",
  },
  {
    title: "Migration discipline",
    body: "Every schema change is a versioned TypeORM migration against PostgreSQL 15, so environments evolve the same way, in the same order.",
  },
  {
    title: "Role-based authorization",
    body: "Different people use the platform for different jobs; role-based authorization in the backend decides who can do what.",
  },
  {
    title: "Tests across the stack",
    body: "Automated tests plus cross-stack end-to-end tests that drive the dashboard, API and database together.",
  },
  {
    title: "Contracts and automation",
    body: "API documentation and contract generation keep clients in sync with the backend; CI/CD pipelines include security automation.",
  },
];

export default function AtizanPage() {
  return (
    <div className={`${t.page} min-h-screen`}>
      <CaseHero
        theme="atizan"
        index="01"
        kicker="Case study · Radikal"
        title={[
          { text: "ATIZAN", block: true },
          { text: "Ledger", block: true, className: "serif-accent normal-case text-atz-gold" },
        ]}
        summary="A digital wallet, marketplace and agricultural supply-chain platform for women market vendors — the atizan — and farmers in Haiti, operated through Radikal’s network of physical locations."
        visual={<WalletMockup />}
        meta={
          <MetaGrid
            theme="atizan"
            items={[
              { k: "Domain", v: "Fintech · Marketplace · Supply chain" },
              { k: "Context", v: "Internal Radikal platform" },
              { k: "Clients", v: "Angular dashboard · React Native app" },
              { k: "Environment", v: "Staging on DigitalOcean" },
            ]}
          />
        }
      />

      <CaseSection
        id="problem"
        index="01"
        label="The problem"
        theme="atizan"
        title={
          <>
            Trade that runs on cash and trust <span className="serif-accent text-atz-gold">needs a shared record.</span>
          </>
        }
      >
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="space-y-6 text-[1.1rem] leading-[1.75] text-atz-fg/85 md:col-span-6 md:col-start-4">
            <p>
              Market vendors are a vital link between Haitian farmers and the people who buy their food, and much of
              that trade moves in cash. Farmers, processors, warehouses and vendors each hold a piece of the chain — but
              without a shared record, money is hard to save, goods are hard to trace and payouts are hard to verify.
            </p>
            <p>
              ATIZAN Ledger connects those pieces. Radikal’s physical locations act as the bridge between cash and the
              digital wallet, so people can take part without changing how they already do business.
            </p>
          </Reveal>
        </div>
      </CaseSection>

      <CaseSection
        id="platform"
        index="02"
        label="The platform"
        theme="atizan"
        title={
          <>
            One platform, <span className="serif-accent text-atz-accent">many interlocking businesses.</span>
          </>
        }
      >
        <ModuleMap />
      </CaseSection>

      <CaseSection
        id="flow"
        index="03"
        label="How value moves"
        theme="atizan"
        title={
          <>
            Goods flow one way. <span className="serif-accent text-atz-gold">Money flows back.</span>
          </>
        }
      >
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="rounded-2xl border border-atz-line bg-atz-bg-2/70 p-4 md:p-8 lg:col-span-8">
            <LedgerFlow />
          </div>
          <Reveal className="space-y-5 text-atz-fg/85 lg:col-span-4">
            <p className="text-[1.05rem] leading-relaxed">
              A harvest is registered, processed through a configurable chain, received at a warehouse and routed to
              vendors and buyers. Every sale, payout, deposit and withdrawal lands in the same ledger.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-atz-muted">
              That shared history is what lets a farmer’s payout, a vendor’s savings and a buyer’s order all be traced
              back to the same events.
            </p>
          </Reveal>
        </div>
      </CaseSection>

      <CaseSection
        id="architecture"
        index="04"
        label="Architecture"
        theme="atizan"
        title={
          <>
            A modular backend <span className="serif-accent text-atz-accent">with observability built in.</span>
          </>
        }
      >
        <LayerStack
          tone={{ line: t.line, muted: t.muted, accent: t.accent, surface: t.surface }}
          layers={[
            { name: "Clients", items: ["Angular 22", "Angular Material", "Tailwind CSS", "React Native", "Expo"] },
            { name: "API", items: ["NestJS 12", "Node.js 24 LTS", "TypeScript", "Role-based auth", "Contract generation"] },
            { name: "Data", items: ["PostgreSQL 15", "TypeORM migrations", "Redis 7"] },
            {
              name: "Payments",
              items: ["PayPal · Premium checkout", "Stripe sandbox · buyer-wallet testing"],
              note: "PayPal via test double",
            },
            { name: "Ledger mirror", items: ["Solidity", "Hardhat", "ethers"], note: "Experimental" },
            {
              name: "Operations",
              items: ["Docker", "Prometheus", "Alertmanager", "Grafana", "DigitalOcean staging", "AWS ECS"],
              note: "ECS = target architecture",
            },
          ]}
        />
      </CaseSection>

      <CaseSection
        id="engineering"
        index="05"
        label="Engineering"
        theme="atizan"
        title={
          <>
            Built for the day <span className="serif-accent text-atz-gold">someone asks “where did this cent go?”</span>
          </>
        }
      >
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="sticky top-28 overflow-hidden rounded-2xl border border-atz-line bg-[#030a07]">
              <div className="flex items-center justify-between border-b border-atz-line px-5 py-3">
                <span className="mono-label text-atz-muted">money.ts</span>
                <span className="mono-label text-atz-gold">Illustrative pattern</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[0.82rem] leading-[1.75] text-atz-fg/90">
                <code>
                  <span className="text-atz-muted">{"// Floats drift:\n"}</span>
                  {"0.1 + 0.2 "}
                  <span className="text-atz-muted">{"// 0.30000000000000004\n\n"}</span>
                  <span className="text-atz-muted">{"// Money doesn't:\n"}</span>
                  <span className="text-atz-accent">const</span>
                  {" total = Money.of("}
                  <span className="text-atz-gold">{'"0.10"'}</span>
                  {")\n  .add(Money.of("}
                  <span className="text-atz-gold">{'"0.20"'}</span>
                  {"));\n\ntotal.toString(); "}
                  <span className="text-atz-muted">{'// "0.30"'}</span>
                </code>
              </pre>
              <p className="border-t border-atz-line px-5 py-3 text-[0.85rem] text-atz-muted">
                A simplified sketch of the idea — not ATIZAN source code.
              </p>
            </div>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-atz-line bg-atz-line sm:grid-cols-2 lg:col-span-7">
            {engineering.map((e, i) => (
              <li key={e.title} className="bg-atz-bg p-6 md:p-7">
                <span className="mono-label text-atz-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-[1.2rem] font-semibold leading-tight tracking-tight">{e.title}</h3>
                <p className="mt-3 text-[0.96rem] leading-relaxed text-atz-muted">{e.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </CaseSection>

      <CaseSection
        id="status"
        index="06"
        label="Status, honestly"
        theme="atizan"
        title={
          <>
            What’s running — <span className="serif-accent text-atz-accent">and what’s still a plan.</span>
          </>
        }
      >
        <StatusBoard
          theme="atizan"
          doneTitle="Implemented"
          pendingTitle="Qualified or planned"
          done={[
            { label: "Wallet, marketplace and supply-chain modules", note: "Implemented in the modular NestJS backend with Angular and React Native clients." },
            { label: "Financial integrity", note: "decimal.js Money helper and append-only audit history." },
            { label: "Testing & delivery", note: "Automated and cross-stack end-to-end tests, CI/CD with security automation." },
            { label: "Observability", note: "Prometheus, Alertmanager and Grafana; staging on DigitalOcean." },
          ]}
          pending={[
            { label: "PayPal Premium checkout", note: "Tested against a test double — not yet against live PayPal." },
            { label: "Stripe", note: "Used in sandbox for buyer-wallet testing only." },
            { label: "AWS ECS", note: "The target deployment architecture — not yet an exercised live deployment." },
            { label: "Blockchain ledger mirror", note: "Experimental. Not part of the production money path." },
          ]}
        />
        <p className="mt-10 max-w-[70ch] text-[0.95rem] leading-relaxed text-atz-muted">
          ATIZAN Ledger is an internal Radikal project. Everything shown here is an original illustration with sample
          values — no production data, internal repositories, private APIs or infrastructure details are published.
        </p>
      </CaseSection>

      <NextProject href="/work/alfa" name="ALFA" kicker="AI desktop agent" theme="atizan" />
    </div>
  );
}
