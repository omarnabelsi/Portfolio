import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { SelectedWork } from "@/components/home/SelectedWork";
import { MoreWork } from "@/components/home/MoreWork";
import { About } from "@/components/home/About";
import { Expertise } from "@/components/home/Expertise";
import { Principles } from "@/components/home/Principles";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <SelectedWork />
      <MoreWork />
      <About />
      <Expertise />
      <Principles />
      <Contact />
    </>
  );
}
