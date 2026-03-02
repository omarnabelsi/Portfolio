"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    siteConfig.navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/[0.06] bg-black/60 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-4">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group relative text-lg font-bold tracking-tight"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Omar N
            </span>
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 md:flex">
            {siteConfig.navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative rounded-lg px-4 py-2 text-sm transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 text-white/70 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-black/95 backdrop-blur-xl md:hidden"
          >
            {siteConfig.navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-light text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
