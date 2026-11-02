import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink pb-24 pt-28 text-paper md:pb-32 md:pt-40">
      <div className="container-x">
        <p className="mono-label text-paper/55">[ 06 — Contact ]</p>
        <Reveal as="h2" mode="lines" id="contact-title" className="display mt-8 text-[clamp(3.2rem,10.5vw,11rem)]">
          Let’s build something <span className="serif-accent text-signal-bright">that holds up.</span>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-[36ch] text-[1.1rem] leading-relaxed text-paper/75">
              Building something that has to be correct as well as fast? Send a note — or read through the code
              first.
            </p>
            <ul className="mt-10 space-y-4">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-paper/20 pb-4 text-[1.2rem] font-semibold"
                >
                  <span>
                    <span className="block mono-label font-normal text-paper/50">GitHub</span>
                    github.com/{site.githubHandle}
                  </span>
                  <span aria-hidden className="transition-transform duration-500 group-hover:rotate-45 group-hover:text-signal-bright">
                    ↗
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="group flex items-center justify-between border-b border-paper/20 pb-4 text-[1.2rem] font-semibold">
                    <span>
                      <span className="block mono-label font-normal text-paper/50">Email</span>
                      {site.email}
                    </span>
                    <span aria-hidden className="transition-transform duration-500 group-hover:rotate-45 group-hover:text-signal-bright">
                      ↗
                    </span>
                  </a>
                </li>
              )}
              {site.linkedin && (
                <li>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-paper/20 pb-4 text-[1.2rem] font-semibold">
                    <span>
                      <span className="block mono-label font-normal text-paper/50">LinkedIn</span>
                      LinkedIn profile
                    </span>
                    <span aria-hidden>↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="relative lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
