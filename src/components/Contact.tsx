"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Mail, MessageSquare, Send, ArrowRight } from "lucide-react";
import { Github, Linkedin, Whatsapp } from "@/components/BrandIcons";

interface InteractiveCardProps {
  href: string;
  className: string;
  title: string;
  subtitle: string;
  orbColor: string;
  arrowColor: string;
  glowColor: string;
  borderColor: string;
  brandRgb: string;
  icon: React.ReactNode;
  showArrow?: boolean;
}

function InteractiveSocialCard({
  href,
  className,
  title,
  subtitle,
  orbColor,
  arrowColor,
  glowColor,
  borderColor,
  brandRgb,
  icon,
  showArrow = true
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [orbPos, setOrbPos] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized position from -0.5 to 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    // Set rotation angles
    x.set(mouseX * 12);
    y.set(-mouseY * 12);

    // Track cursor location relative to card
    setOrbPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={cardRef}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative overflow-hidden bg-slate-900/10 backdrop-blur-sm border transition-all duration-300 p-5 rounded-2xl cursor-pointer ${borderColor} ${glowColor} hover:shadow-lg ${className}`}
    >
      {/* Background container for floating particles */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl z-0"
        style={{ transform: "translateZ(-10px)" }}
      >
        {/* Floating Bubble 1 */}
        <motion.div
          animate={{
            x: [0, 10, -10, 0],
            y: [0, -10, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute -top-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br ${orbColor} blur-md opacity-20`}
        />

        {/* Floating Bubble 2 */}
        <motion.div
          animate={{
            x: [0, -10, 10, 0],
            y: [0, 10, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br ${orbColor} blur-md opacity-20`}
        />

        {/* Interactive glow orb (mouse follower) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r ${orbColor} blur-2xl pointer-events-none`}
              style={{
                left: orbPos.x,
                top: orbPos.y,
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Content wrapper with perspective translation */}
      <div 
        className="relative z-10 w-full h-full flex items-center justify-between gap-4"
        style={{ transform: "translateZ(10px)" }}
      >
        {/* Left side: Sphere and Text */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Glass Sphere Wrapper */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0">
            {/* Base Glow */}
            <div className={`absolute w-12 h-4 rounded-full blur-md bottom-2 sm:bottom-3 opacity-60 bg-gradient-to-r ${orbColor}`} />
            
            {/* Orbit Ring */}
            <div className={`absolute w-[130%] h-[32%] border border-dashed rounded-full rotate-[-8deg] scale-y-[0.8] opacity-60 border-slate-700 group-hover:border-slate-500 transition-colors duration-300`}>
              {/* Small glowing dots on orbit path */}
              <div className={`absolute top-0 left-1/4 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${orbColor} shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse`} />
              <div className={`absolute bottom-0 right-1/4 w-1 h-1 rounded-full bg-slate-500 opacity-60`} />
            </div>

            {/* The Glass 3D Sphere */}
            <div 
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full relative overflow-hidden flex items-center justify-center border border-white/15 shadow-lg transition-all duration-500 group-hover:scale-105`}
              style={{
                background: `radial-gradient(circle at 50% 80%, rgba(${brandRgb}, 0.4) 0%, rgba(8, 12, 28, 0.95) 75%, rgba(${brandRgb}, 0.1) 100%)`,
                boxShadow: `
                  inset 0 6px 10px rgba(255, 255, 255, 0.35),
                  inset 0 -8px 12px rgba(${brandRgb}, 0.5),
                  0 4px 15px rgba(0, 0, 0, 0.4),
                  0 0 20px rgba(${brandRgb}, 0.25)
                `
              }}
            >
              {/* Glossy top-light reflection oval */}
              <div className="absolute top-0.5 left-[15%] w-[70%] h-[30%] bg-gradient-to-b from-white/35 to-white/0 rounded-full" />
              
              {/* Brand Icon wrapper */}
              <div className="relative z-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                {icon}
              </div>
            </div>
          </div>

          {/* Text Details */}
          <div>
            <h4 className="text-sm sm:text-base font-display font-bold text-white tracking-wide group-hover:text-slate-100 transition-colors">
              {title}
            </h4>
            <span className="text-[10px] sm:text-xs font-mono text-slate-400 group-hover:text-slate-300 transition-colors">
              {subtitle}
            </span>
          </div>
        </div>

        {/* Right side: Arrow */}
        {showArrow && (
          <div className={`transform transition-all duration-300 group-hover:translate-x-1.5 flex-shrink-0 ${arrowColor}`}>
            <ArrowRight className="w-5 h-5 transition-opacity" />
          </div>
        )}
      </div>
    </motion.a>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("bhavnishnanda9933@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-16 md:py-20 border-b border-slate-900 bg-slate-950/50 dot-grid">
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Headings */}
        <div className="text-left mb-16">
          <span className="text-[10px] font-mono font-medium tracking-[0.25em] text-primary-light uppercase">
            Collaborate
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white mt-3">
            Initiate Connection
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent-purple rounded-full mt-4" />
        </div>

        {/* Info grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Details & Socials (Bento Cards) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-panel p-6 rounded-2xl bg-slate-900/20 space-y-4">
              <h3 className="text-sm font-bold text-slate-100 tracking-wide">
                Let's discuss opportunities
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seeking opportunities in **equity research, private equity, data analytics, and digital transformation strategy**. If you are looking for an AI developer who speaks corporate finance, let's chat.
              </p>
            </div>

            {/* Quick CTAs list */}
            <div className="grid grid-cols-2 gap-4">
              <InteractiveSocialCard
                href="https://www.linkedin.com/in/bhavnishnanda/"
                className="col-span-2"
                title="LinkedIn"
                subtitle="linkedin.com/in/bhavnishnanda"
                orbColor="from-blue-500 to-indigo-600"
                arrowColor="text-blue-500 animate-pulse"
                glowColor="shadow-blue-950/20"
                borderColor="border-blue-950/40 hover:border-blue-500/30"
                brandRgb="10, 102, 194"
                icon={<Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />}
              />

              <InteractiveSocialCard
                href="https://github.com/Bhavnish10"
                className="col-span-1"
                title="GitHub"
                subtitle="Bhavnish10"
                orbColor="from-cyan-400 to-blue-500"
                arrowColor="text-cyan-400"
                glowColor="shadow-cyan-950/20"
                borderColor="border-cyan-950/40 hover:border-cyan-500/30"
                brandRgb="34, 211, 238"
                icon={<Github className="w-5 h-5 sm:w-6 sm:h-6" />}
                showArrow={false}
              />

              <InteractiveSocialCard
                href="https://wa.me/919925208620"
                className="col-span-1"
                title="WhatsApp"
                subtitle="Immediate Ping"
                orbColor="from-emerald-400 to-teal-500"
                arrowColor="text-emerald-400"
                glowColor="shadow-emerald-950/20"
                borderColor="border-emerald-950/40 hover:border-emerald-500/30"
                brandRgb="37, 211, 102"
                icon={<Whatsapp className="w-5 h-5 sm:w-6 sm:h-6" />}
              />
            </div>
          </div>

          {/* Right Column: Premium Direct Mail Card */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-2xl bg-slate-900/30 flex flex-col justify-between min-h-[380px] border-slate-800/80">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-primary-light uppercase tracking-wider">
                  Direct Channel
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight">
                Let's discuss opportunities in finance, analytics, and technology.
              </h3>

              <p className="text-sm text-slate-400 leading-relaxed">
                Whether you want to discuss equity research, data analytics, predictive modeling, or custom business intelligence dashboard development, feel free to reach out. I typically respond to direct emails within 24 operational hours.
              </p>

            </div>

            <div className="mt-8 p-4 rounded-xl bg-slate-950/80 border border-slate-900 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-light flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-mono text-slate-200 select-all truncate">
                  bhavnishnanda9933@gmail.com
                </span>
              </div>
              <button
                onClick={copyEmail}
                className="px-3.5 py-1.5 border border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-[10px] font-mono font-semibold rounded-lg text-slate-300 hover:text-white cursor-pointer transition-all active:scale-95 flex-shrink-0 focus:outline-none"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
