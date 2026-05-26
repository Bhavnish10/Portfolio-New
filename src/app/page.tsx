"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <SmoothScroll>
      <div className="relative min-h-screen text-slate-100 bg-dark-bg selection:bg-primary/30 selection:text-primary-light">
        {/* Scroll Progress Bar */}
        <motion.div className="scroll-progress" style={{ scaleX }} />

        {/* Custom cursor follow spotlights */}
        <CustomCursor />

        {/* Floating blurred glass header navigation */}
        <Navbar />

        {/* Main Content Sections — matching original site structure */}
        <main className="relative w-full overflow-hidden">
          <Hero />
          <About />
          <Journey />
          <Skills />
          <Projects />
          <Certifications />
          <Achievements />
          <Contact />
        </main>

        {/* Footer info panels */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
