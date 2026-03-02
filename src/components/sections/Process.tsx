"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/lib/data";
import { fadeInUp } from "@/lib/animations";

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="relative py-20 sm:py-32 px-4 sm:px-6">
      {/* Background accent */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.03] blur-[100px]" />

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
            Process
          </span>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl"
        >
          How I Build Products
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="mb-16 max-w-xl text-white/40"
        >
          Great software isn&apos;t an accident. It&apos;s the result of disciplined thinking, intentional design, and iterative refinement.
        </motion.p>

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                boxShadow: "0 20px 60px rgba(59, 130, 246, 0.3)"
              }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-blue-400/40 hover:bg-blue-500/5 cursor-pointer"
            >
              {/* Step number */}
              <motion.span 
                className="text-4xl font-bold text-white/[0.04] transition-colors group-hover:text-blue-500/20"
                whileHover={{ scale: 1.1 }}
              >
                {step.step}
              </motion.span>

              {/* Icon */}
              <motion.div 
                className="mt-2 mb-3 text-2xl"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {step.icon}
              </motion.div>

              <h3 className="mb-2 text-lg font-semibold text-white/90">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/40">
                {step.description}
              </p>

              {/* Connector line for desktop */}
              {i < processSteps.length - 1 && (
                <div className="absolute top-1/2 -right-3 hidden h-px w-6 bg-white/[0.08] lg:block" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-2xl border border-white/[0.06] bg-gradient-to-r from-blue-500/[0.04] to-purple-500/[0.04] p-8 text-center md:p-12"
        >
          <blockquote className="mx-auto max-w-2xl">
            <p className="text-lg font-medium leading-relaxed text-white/60 md:text-xl italic">
              &ldquo;Any fool can write code that a computer can understand. Good programmers write code 
              that humans can understand.&rdquo;
            </p>
            <footer className="mt-4 text-sm text-white/30">
              — Martin Fowler
            </footer>
          </blockquote>
          <p className="mx-auto mt-6 max-w-lg text-sm text-white/35">
            This isn&apos;t just a quote I like — it&apos;s how I work. Clean code, clear intent, 
            and architecture that tells a story. Every function, every module, every system I build 
            is designed to be understood, not just executed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
