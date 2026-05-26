"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Github, Linkedin } from "@/components/BrandIcons";

const ROLES = [
  "MBA Finance Candidate",
  "Data Analytics Professional",
  "Technology Enthusiast",
  "Investment Analysis Aspirant",
  "Business Intelligence Analyst",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Stable particle data — generated once on client, never during SSR
  const particlesRef = useRef<
    Array<{
      top: string;
      left: string;
      xDelta: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    // Only generate once
    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: 15 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        xDelta: Math.random() * 20 - 10,
        duration: 8 + Math.random() * 7,
        delay: Math.random() * 5,
      }));
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 30 : 80;

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullText.slice(0, currentText.length + 1));
        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setCurrentText(fullText.slice(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          return;
        }
      }
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden dot-grid"
    >
      {/* Background Neon Glowing Spotlights */}
      <div className="absolute inset-0 z-0 spotlight-bg pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Floating particles — rendered client-only with stable pre-seeded values */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {mounted && particlesRef.current.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{ top: p.top, left: p.left }}
            animate={{
              y: [0, -30, 0],
              x: [0, p.xDelta, 0],
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="section-container relative z-10 grid grid-cols-12 gap-8 items-center">
        {/* Intro Text */}
        <div className="col-span-12 md:col-span-8 flex flex-col items-start text-left">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 px-3.5 py-1.5 rounded-full mb-6 glass-panel"
          >
            <span className="w-2 h-2 rounded-full bg-primary-light animate-ping" />
            <span className="text-[10px] md:text-xs font-mono font-medium tracking-widest text-slate-300 uppercase">
              MBA Finance · Data Analytics · Investment Analysis
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-display font-bold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Bhavnish{" "}
            <span className="bg-gradient-to-r from-primary-light via-primary to-accent-purple bg-clip-text text-transparent text-glow">
              Nanda
            </span>
          </motion.h1>

          {/* Typewriter text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="h-8 font-mono text-sm sm:text-base font-semibold text-slate-300 mb-6 flex items-center"
          >
            <span className="text-primary-light mr-2">&gt;_</span>
            <span className="typewriter-cursor">{currentText}</span>
          </motion.div>

          {/* Bio from original site */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl"
          >
            Applying financial knowledge and analytical skills to develop data-driven insights and contribute to strategic financial and business decision-making.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-1.5 bg-gradient-to-r from-primary via-primary-light to-accent-cyan text-white text-xs font-semibold px-6 py-3 rounded-full cursor-pointer hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group active:scale-95"
            >
              <span>Download Resume</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>

            <button
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-1.5 border border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-900/80 text-slate-300 hover:text-white text-xs font-semibold px-6 py-3 rounded-full cursor-pointer transition-all duration-300 active:scale-95"
            >
              Contact Me
            </button>

            <a
              href="https://www.linkedin.com/in/bhavnishnanda/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-slate-700 hover:border-primary/50 bg-slate-900/40 hover:bg-slate-900/80 text-slate-400 hover:text-primary-light text-xs font-semibold px-4 py-3 rounded-full cursor-pointer transition-all duration-300 active:scale-95"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/Bhavnish10"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-900/80 text-slate-400 hover:text-white text-xs font-semibold px-4 py-3 rounded-full cursor-pointer transition-all duration-300 active:scale-95"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Cinematic Profile Visual */}
        <div className="col-span-12 md:col-span-4 flex items-center justify-center relative min-h-[280px] md:min-h-[320px] order-first md:order-last mb-8 md:mb-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/40 to-accent-purple/20 blur-2xl animate-pulse-glow" />
            {/* Profile card */}
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-center overflow-hidden glass-panel shadow-[0_0_80px_rgba(0,102,255,0.15)]">
              <img
                src="/profile.png"
                alt="Bhavnish Nanda"
                className="w-[90%] h-[90%] rounded-2xl object-cover border border-slate-700/50"
                loading="lazy"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-slate-900/90 border border-slate-700/80 rounded-2xl px-3 py-2 glass-panel shadow-lg"
            >
              <span className="text-[10px] font-mono text-primary-light font-semibold tracking-wider">BN</span>
              <p className="text-[8px] text-slate-400 mt-0.5">Nirma University</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-10">
        <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-slate-700 flex justify-center p-1 bg-slate-900/30"
        >
          <div className="w-1 h-2 bg-primary-light rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
