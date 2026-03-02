"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Timeline from "@/components/sections/Timeline";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

// Dynamic imports for heavy visual components (no SSR)
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});
const GridBackground = dynamic(() => import("@/components/ui/GridBackground"), {
  ssr: false,
});
const FloatingParticles = dynamic(() => import("@/components/ui/FloatingParticles"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <CustomCursor />
      <GridBackground />
      <FloatingParticles />

      <div className="relative z-10">
        <Navbar />
        <main className="overflow-x-hidden">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <CTA />
          <Timeline />
          <Process />
        </main>
        <Footer />
      </div>
    </div>
  );
}
