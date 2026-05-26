"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/BrandIcons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-900 bg-slate-950/80 backdrop-blur-md py-12 overflow-hidden dot-grid">
      <div className="section-container relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo and signature */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <h4 className="text-sm font-bold text-slate-100">
            Bhavnish Nanda
          </h4>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            MBA Finance · Data Analytics · Investment Analysis
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {[
            { icon: Linkedin, href: "https://www.linkedin.com/in/bhavnishnanda/", label: "LinkedIn" },
            { icon: Github, href: "https://github.com/Bhavnish10", label: "GitHub" },
            { icon: Mail, href: "mailto:bhavnishnanda9933@gmail.com", label: "Email" },
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <a
                key={idx}
                href={item.href}
                target={item.label === "Email" ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={item.label}
                className="w-9 h-9 rounded-full border border-slate-800 bg-slate-900/30 hover:border-primary-light hover:text-primary-light flex items-center justify-center text-slate-400 cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <IconComponent className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        {/* Copyright & Scroll-to-Top */}
        <div className="flex items-center gap-6">
          <p className="text-[10px] font-mono text-slate-500">
            &copy; {new Date().getFullYear()} Bhavnish Nanda. Built with React, Tailwind CSS, Node.js, and MongoDB.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="w-9 h-9 rounded-full border border-slate-800 bg-slate-900/50 hover:bg-primary/20 hover:border-primary-light flex items-center justify-center text-slate-400 hover:text-primary-light cursor-pointer transition-all duration-300 hover:scale-105 focus:outline-none"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
