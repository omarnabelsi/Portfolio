import Link from "next/link";
import { nav, site } from "@/content/site";
import { Seal } from "@/components/ui/Seal";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="container-x grid gap-12 border-t border-paper/15 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Seal size="md" />
          <p className="mt-6 max-w-sm text-paper/70">
            Full-stack software engineer. Financial systems, AI agents, and the infrastructure that keeps them honest.
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="mono-label text-paper/50">Index</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-signal-bright">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="mono-label text-paper/50">Elsewhere</p>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-signal-bright">
                GitHub ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            {site.linkedin && (
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-signal-bright">
                  LinkedIn ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            )}
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-signal-bright">
                  {site.email}
                </a>
              </li>
            )}
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-signal-bright">
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div aria-hidden className="container-x select-none">
        <p className="display whitespace-nowrap text-[17.2vw] leading-[0.78] text-paper/[0.07] md:text-[16.4vw]">
          Nabelsi
        </p>
      </div>

      <div className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 py-6 mono-label text-paper/55">
        <p>
          © <Year /> {site.name}
        </p>
        <p>Built with Next.js · GSAP · Lenis</p>
        <a href="#top" className="hover:text-paper">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
