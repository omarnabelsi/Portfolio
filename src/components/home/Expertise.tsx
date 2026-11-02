import { expertise } from "@/content/expertise";
import { Reveal } from "@/components/ui/Reveal";

/** Evidence-based stack: each technology names the project where it was used. */
export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="relative bg-paper py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="mono-label text-muted md:col-span-3">[ 04 — Technical expertise ]</p>
          <div className="md:col-span-9">
            <Reveal as="h2" mode="lines" id="expertise-title" className="display text-[clamp(2.6rem,6.4vw,6.4rem)]">
              The stack, <span className="serif-accent text-signal">with receipts</span>
            </Reveal>
            <Reveal as="p" className="mt-6 max-w-[56ch] text-ink-2" delay={0.1}>
              No skill bars. Every technology below is paired with the project where it was actually used.
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-x-10 md:grid-cols-2 xl:grid-cols-3">
          {expertise.map((group, gi) => (
            <Reveal key={group.id} className="border-t border-ink pb-10 pt-6" delay={(gi % 3) * 0.08}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="display-tight text-[1.6rem] uppercase">{group.title}</h3>
                <span className="mono-label text-signal-ink">{String(gi + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-2 text-[0.95rem] text-muted">{group.note}</p>
              <ul className="mt-6">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="group flex items-baseline justify-between gap-4 border-b border-line py-2.5 transition-colors hover:border-ink"
                  >
                    <span className="font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                      {skill.name}
                    </span>
                    <span className="shrink-0 text-right mono-label text-[0.65rem] text-muted group-hover:text-signal-ink">
                      {skill.where}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
