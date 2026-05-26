"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ChevronDown } from "lucide-react";

const ACHIEVEMENTS = [
  {
    id: 1,
    title: "HackNUthon 6.0 (2025) — Top 10 Finalist",
    details: [
      "Secured a position among the top 10 teams in RapidOps track.",
      "Demonstrated strong analytical thinking, problem-solving, and technical skills.",
      "Collaborated in a team to develop innovative technology-driven solutions."
    ]
  },
  {
    id: 2,
    title: "Smart India Hackathon (2024) — Top 1400 Teams Nationwide",
    details: [
      "Qualified among the top 1400 teams out of 89,000+ teams across India.",
      "Demonstrated strong innovation, analytical, and technical capabilities.",
      "Worked on solving real-world problems using software and analytical approaches."
    ]
  },
  {
    id: 3,
    title: "MINeD Hackathon (2025) — National Level Participant",
    details: [
      "Participated in national-level hackathon organized by Nirma University.",
      "Strengthened skills in teamwork, innovation, and rapid solution development.",
      "Competed with teams from across the country in challenging technical scenarios."
    ]
  }
];

export default function Achievements() {
  const [isVisible, setIsVisible] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="achievements" ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-slate-900/30 to-dark-bg pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono font-medium tracking-[0.3em] text-primary-light uppercase mb-3 block">
            Recognition
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            <span className="bg-gradient-to-r from-primary-light to-accent-purple bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-4 max-w-xl mx-auto">
            Competitive hackathons and innovation challenges showcasing technical excellence.
          </p>
        </motion.div>

        {/* Achievements List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {ACHIEVEMENTS.map((ach, idx) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/20 hover:border-primary-light/30 overflow-hidden glass-panel transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(ach.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-800/20 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed pr-4">
                    {ach.title}
                  </h3>
                </div>
                <div className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${openId === ach.id ? "rotate-180 text-primary-light" : ""}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openId === ach.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-slate-800/60 bg-slate-950/20">
                      <ul className="space-y-2.5">
                        {ach.details.map((detail, dIdx) => (
                          <li key={dIdx} className="text-sm text-slate-350 flex items-start gap-2.5 leading-relaxed">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
