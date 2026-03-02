"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/lib/data";
import { fadeInUp } from "@/lib/animations";
import { Briefcase, GraduationCap, Sparkles } from "lucide-react";

const iconMap = {
  work: Briefcase,
  learning: GraduationCap,
  milestone: Sparkles,
};

const colorMap = {
  work: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  learning: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  milestone: "border-purple-500/30 bg-purple-500/10 text-purple-400",
};

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="relative py-32 px-6">
      <div className="mx-auto max-w-4xl">
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
            Journey
          </span>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl"
        >
          My Path So Far
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="mb-16 max-w-xl text-white/40"
        >
          Every great developer has a story. Here&apos;s mine — from the first line of code to building production systems.
        </motion.p>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-blue-500/20 via-white/[0.06] to-transparent md:left-1/2" />

          {timeline.map((item, i) => {
            const Icon = iconMap[item.type];
            const even = i % 2 === 0;

            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ 
                  scale: 1.02,
                  x: even ? 5 : -5
                }}
                className={`relative mb-12 flex items-start gap-6 last:mb-0 md:gap-0 ${
                  even ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Icon on the line */}
                <div className="absolute left-6 -translate-x-1/2 md:left-1/2">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border ${colorMap[item.type]}`}
                  >
                    <Icon size={18} />
                  </motion.div>
                </div>

                {/* Content */}
                <div
                  className={`ml-16 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-white/[0.12] hover:bg-white/[0.04] hover:shadow-lg md:ml-0 md:w-[calc(50%-40px)] ${
                    even ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  <span className="text-xs font-bold tracking-wider text-white/25 uppercase">
                    {item.year}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-white/90">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/40">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
