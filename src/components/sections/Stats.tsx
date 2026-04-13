"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Rocket, Zap, Users } from "lucide-react";

const stats = [
  { 
    icon: Code2, 
    value: "3+", 
    label: "Years Experience",
    color: "from-blue-400 to-cyan-400"
  },
  { 
    icon: Rocket, 
    value: "15+", 
    label: "Projects Shipped",
    color: "from-purple-400 to-pink-400"
  },
  { 
    icon: Zap, 
    value: "12+", 
    label: "Technologies",
    color: "from-orange-400 to-rose-400"
  },
  { 
    icon: Users, 
    value: "100%", 
    label: "Client Satisfaction",
    color: "from-emerald-400 to-teal-400"
  },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <div
          ref={ref}
          className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-white/[0.15] hover:bg-white/[0.04]"
              >
                <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${stat.color} p-2.5`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className={`text-3xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-medium text-white/40 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
