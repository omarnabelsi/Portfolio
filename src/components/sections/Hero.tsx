"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Typewriter from "@/components/ui/Typewriter";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { siteConfig } from "@/lib/data";
import { ArrowDown, MapPin } from "lucide-react";

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Vibrant gradient orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-gradient-to-br from-purple-500/15 to-pink-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-orange-500/8 to-rose-500/8 blur-[130px]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="text-center lg:text-left">
        {/* Status Badge */}
        <motion.div variants={fadeInUp} custom={0} className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-500/[0.08] px-4 py-2 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm text-white/60">Available for opportunities</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={fadeInUp}
          custom={1}
          className="text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          I build software{" "}
          <br className="hidden sm:block" />
          that{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            <Typewriter
              words={[
                "scales.",
                "performs.",
                "lasts.",
                "matters.",
              ]}
              typingSpeed={100}
              deletingSpeed={60}
              pauseTime={2500}
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl lg:mx-0"
        >
          {siteConfig.summary}
        </motion.p>

        {/* Location */}
        <motion.div
          variants={fadeInUp}
          custom={3}
          className="mt-4 flex items-center justify-center gap-2 text-white/30 lg:justify-start"
        >
          <MapPin size={14} />
          <span className="text-sm">{siteConfig.location}</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          custom={4}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
        >
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-shadow hover:shadow-purple-500/40"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">See My Work</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          variants={fadeInUp}
          custom={5}
          onClick={scrollToAbout}
          className="mt-20 inline-flex flex-col items-center gap-2 text-white/20 transition-colors hover:text-white/40 lg:items-start"
          aria-label="Scroll down"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
        </div>

        {/* Photo on right */}
        <motion.div
          variants={fadeInUp}
          custom={2}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[350px] sm:max-w-[450px]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-2 backdrop-blur-sm">
              {imageError ? (
                <div className="flex h-[400px] sm:h-[520px] w-full items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30">
                  <span className="text-lg font-semibold tracking-wide text-white/85">OMAR N</span>
                </div>
              ) : (
                <img
                  src="https://i.ibb.co/fVmY4TdP/IMG-SEGMENT.png"
                  alt="Omar Nabelsi - Software Engineer"
                  className="h-[400px] sm:h-[520px] w-full rounded-2xl object-cover"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
