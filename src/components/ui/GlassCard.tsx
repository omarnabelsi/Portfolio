"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl ${className}`}
      whileHover={
        hover
          ? {
              y: -4,
              borderColor: "rgba(255,255,255,0.15)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            }
          : undefined
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
