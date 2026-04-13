"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, ArrowUp, Heart } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-black/40 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="text-lg font-bold">
              <span className="text-white">Omar N</span>
            </div>
            <p className="mt-2 text-sm text-white/40">
              Building things that matter, one commit at a time.
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <motion.a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/[0.08] p-3 text-white/50 transition-colors hover:border-white/20 hover:text-white"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/[0.08] p-3 text-white/50 transition-colors hover:border-white/20 hover:text-white"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </motion.a>
            <motion.button
              onClick={scrollToTop}
              className="rounded-xl border border-white/[0.08] p-3 text-white/50 transition-colors hover:border-white/20 hover:text-white"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="flex items-center gap-1.5 text-sm text-white/30">
            Designed & built with <Heart size={14} className="text-red-400" /> by Omar Nabelsi
          </p>
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
