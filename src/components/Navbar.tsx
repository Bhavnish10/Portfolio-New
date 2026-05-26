"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Journey", id: "journey" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Certifications", id: "certifications" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Is scrolled
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const sections = NAV_LINKS.map(link => {
        // Special case for achievements & certs section (id "achievements") which contains certifications
        const el = document.getElementById(link.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return {
            id: link.id,
            // Section is active if it takes up the top part of screen
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height,
          };
        }
        return null;
      }).filter(Boolean);

      // Find the section that occupies the screen viewport
      const current = sections.find(
        sec => sec && sec.top <= 160 && sec.bottom > 160
      );
      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial trigger

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        isScrolled || isMobileMenuOpen
          ? "bg-slate-950 border-slate-900/90 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3.5"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent-purple flex items-center justify-center font-bold text-sm tracking-tighter text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            BN
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-wide text-slate-100 group-hover:text-primary-light transition-colors duration-300">
              Bhavnish Nanda
            </h1>
            <p className="text-[9px] text-slate-400 group-hover:text-slate-300 transition-colors duration-300 font-mono tracking-wider uppercase">
              MBA Finance · Analytics
            </p>
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1.5">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`relative px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-300 cursor-pointer rounded-full ${
                activeSection === link.id
                  ? "text-primary-light font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="relative z-10">{link.label}</span>
              {activeSection === link.id && (
                <motion.div
                  layoutId="active-nav-glow"
                  className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:flex items-center gap-1 bg-gradient-to-r from-primary to-primary-light hover:to-accent-cyan text-white text-xs font-semibold px-4 py-2 rounded-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 group active:scale-95"
        >
          <span>Connect</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1.5 rounded-full border border-slate-800 hover:bg-slate-900 transition-colors text-slate-400 hover:text-slate-200 focus:outline-none"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-16 left-4 right-4 z-30 p-6 rounded-2xl border border-slate-800/80 bg-slate-950 shadow-2xl flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, idx) => (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === link.id
                      ? "bg-primary/10 text-primary-light border-l-2 border-primary-light"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
            
            <button
              onClick={() => scrollTo("contact")}
              className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-primary to-primary-light py-3 rounded-xl text-xs font-semibold text-white cursor-pointer transition-all duration-300"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
