"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";
import { projects } from "@/lib/data";
import { fadeInUp } from "@/lib/animations";
import { ExternalLink, ChevronRight } from "lucide-react";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [expanded, setExpanded] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);
  
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      className="group relative grid gap-8 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-white/[0.1] hover:shadow-2xl hover:shadow-blue-500/20 md:p-10 lg:grid-cols-2"
    >
      {/* Left: Image placeholder & overlay */}
      <motion.div 
        className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] lg:aspect-auto lg:min-h-[300px]"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Decorative code pattern */}
          <div className="space-y-3 px-8 font-mono text-xs text-white/10">
            <div>
              <span className="text-blue-400/30">const</span>{" "}
              <span className="text-cyan-400/30">app</span>{" "}
              <span className="text-white/20">=</span>{" "}
              <span className="text-emerald-400/30">createApp</span>
              <span className="text-white/20">(&#123;</span>
            </div>
            <div className="pl-4">
              <span className="text-purple-400/30">architecture</span>
              <span className="text-white/15">:</span>{" "}
              <span className="text-amber-400/30">&quot;clean&quot;</span>
              <span className="text-white/15">,</span>
            </div>
            <div className="pl-4">
              <span className="text-purple-400/30">scalable</span>
              <span className="text-white/15">:</span>{" "}
              <span className="text-emerald-400/30">true</span>
              <span className="text-white/15">,</span>
            </div>
            <div className="pl-4">
              <span className="text-purple-400/30">production</span>
              <span className="text-white/15">:</span>{" "}
              <span className="text-emerald-400/30">true</span>
            </div>
            <div>
              <span className="text-white/20">&#125;)</span>
            </div>
          </div>
        </div>
        {/* Hover gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-purple-500/10 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Right: Details */}
      <div className="flex flex-col justify-center">
        <div className="mb-2 text-xs font-medium tracking-wider text-blue-400/70 uppercase">
          {project.subtitle}
        </div>
        <h3 className="mb-3 text-2xl font-bold text-white">{project.title}</h3>
        <p className="mb-6 text-sm leading-relaxed text-white/45">
          {project.description}
        </p>

        {/* Case Study Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mb-4 flex items-center gap-1.5 text-sm font-medium text-blue-400/80 transition-colors hover:text-blue-400"
        >
          {expanded ? "Hide details" : "View case study"}
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={14} />
          </motion.div>
        </button>

        {/* Case Study Content */}
        <motion.div
          initial={false}
          animate={{
            height: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 mb-6">
            <div>
              <span className="text-xs font-bold tracking-wider text-red-400/70 uppercase">
                Problem
              </span>
              <p className="mt-1 text-sm text-white/40">{project.problem}</p>
            </div>
            <div className="h-px bg-white/[0.05]" />
            <div>
              <span className="text-xs font-bold tracking-wider text-emerald-400/70 uppercase">
                Solution
              </span>
              <p className="mt-1 text-sm text-white/40">{project.solution}</p>
            </div>
            <div className="h-px bg-white/[0.05]" />
            <div>
              <span className="text-xs font-bold tracking-wider text-blue-400/70 uppercase">
                Impact
              </span>
              <p className="mt-1 text-sm text-white/40">{project.impact}</p>
            </div>
          </div>
        </motion.div>

        {/* Tech Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2.5 py-1 text-xs text-white/50"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Link */}
        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
            whileHover={{ x: 4 }}
          >
            View Live <ExternalLink size={14} />
          </motion.a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-gradient-to-r from-blue-400 to-transparent" />
          <span className="text-sm font-medium tracking-widest text-blue-400 uppercase">
            Projects
          </span>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl"
        >
          Selected Work
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="mb-16 max-w-xl text-white/40"
        >
          Real projects, real problems, real solutions. Each one taught me something new about building software that works.
        </motion.p>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
