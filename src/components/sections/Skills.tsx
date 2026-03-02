"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { skills } from "@/lib/data";
import { fadeInUp } from "@/lib/animations";

function SkillCategory({
  category,
  index,
}: {
  category: (typeof skills)[keyof typeof skills];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)"
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-white/[0.12] hover:bg-white/[0.04] cursor-pointer"
    >
      {/* Gradient header line */}
      <div
        className={`mb-4 h-1 w-16 rounded-full bg-gradient-to-r ${category.color} opacity-60 transition-all group-hover:w-24 group-hover:opacity-100`}
      />
      <h3 className="mb-4 text-lg font-semibold text-white/90">{category.label}</h3>

      <div className="flex flex-wrap gap-2">
        {category.items.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 8px 30px rgba(59, 130, 246, 0.3)"
            }}
            className="rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/60 transition-all hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white/90 cursor-pointer"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-32 px-4 sm:px-6">
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
            Skills
          </span>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl"
        >
          My Toolkit
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="mb-12 max-w-xl text-white/40"
        >
          Technologies I use to turn ideas into reliable, production-ready software.
        </motion.p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(skills).map((category, i) => (
            <SkillCategory key={category.label} category={category} index={i} />
          ))}
        </div>

        {/* Architecture Principles Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-white/[0.06] bg-gradient-to-r from-blue-500/[0.04] to-purple-500/[0.04] px-8 py-6 text-center"
        >
          {["Clean Architecture", "SOLID Principles", "REST APIs", "SSR / CSR / SSG", "Authentication Systems", "AI Integrations"].map(
            (principle) => (
              <span
                key={principle}
                className="text-sm font-medium text-white/40"
              >
                {principle}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
