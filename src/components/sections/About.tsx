"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="about" className="py-20 sm:py-32 px-4 sm:px-6">
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
            About
          </span>
        </motion.div>

        <div ref={ref} className="grid gap-16 lg:grid-cols-5">
          {/* Left: Story */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold tracking-tight text-white md:text-4xl"
            >
              I don&apos;t just write code.
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                I engineer solutions.
              </span>
            </motion.h2>

            <motion.div variants={fadeInUp} custom={1} className="mt-8 space-y-5 text-base leading-relaxed text-white/50">
              <p>
                I&apos;m Omar — a full-stack software engineer based in Saida, Lebanon. I specialize 
                in building web applications that are fast, maintainable, and designed to grow with 
                the business they serve.
              </p>
              <p>
                My journey into software started with curiosity — the kind where you open DevTools 
                on every website you visit just to see how things work. That curiosity turned into a 
                career built on React, Vue, Next.js, Node.js, and Python, where I&apos;ve shipped 
                everything from e-commerce platforms to real-time dashboards.
              </p>
              <p>
                What sets me apart isn&apos;t just the tech I use — it&apos;s <em className="not-italic text-white/70">how</em> I 
                think about problems. I believe in Clean Architecture, SOLID principles, and writing 
                code that the next developer (or future me) can understand at a glance. I don&apos;t 
                ship features — I ship <em className="not-italic text-white/70">systems</em>.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Quick Facts */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            {/* Quick Facts */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-sm font-semibold tracking-widest text-white/30 uppercase">
                Quick Facts
              </h3>

              <div className="space-y-6">
                {[
                  { label: "Focus", value: "Full-Stack Web Development" },
                  { label: "Frontend", value: "React, Vue, Next.js, TypeScript" },
                  { label: "Backend", value: "Node.js, NestJS, Python (Flask/Django/FastAPI)" },
                  { label: "Philosophy", value: "Clean Architecture & SOLID" },
                  { label: "Based in", value: "Saida, Lebanon" },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <span className="text-xs font-medium tracking-wider text-white/25 uppercase">
                      {item.label}
                    </span>
                    <p className="mt-1 text-sm text-white/70">{item.value}</p>
                    {i < 4 && <div className="mt-4 h-px bg-white/[0.05]" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
