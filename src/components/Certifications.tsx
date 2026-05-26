"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronDown } from "lucide-react";

const CERTIFICATIONS = [
  {
    id: 1,
    year: "2025",
    title: "Bloomberg Market Concepts (BMC) — Bloomberg (Nov 2025)",
    details: [
      "Earned Bloomberg Market Concepts certification covering equities, fixed income, foreign exchange, and macroeconomic indicators.",
      "Developed strong understanding of financial markets, investment principles, and Bloomberg Terminal functionality.",
      "Strengthened practical knowledge of global financial systems and market analysis."
    ]
  },
  {
    id: 2,
    year: "2025",
    title: "Alteryx Designer Core Certification — Alteryx (2025)",
    details: [
      "Earned certification demonstrating proficiency in data preparation, blending, and transformation using Alteryx Designer.",
      "Developed skills in building automated data workflows and performing advanced data analytics.",
      "Gained hands-on experience in data cleaning, transformation, and analytical reporting.",
      "Strengthened ability to convert raw data into actionable business insights using no-code/low-code analytics tools."
    ]
  },
  {
    id: 3,
    year: "2025",
    title: "Deloitte Australia — Data Analytics Job Simulation (Jul 2025)",
    details: [
      "Completed Deloitte's data analytics simulation program focused on real-world business problem solving.",
      "Applied data analysis, interpretation, and visualization techniques to derive business insights.",
      "Gained practical exposure to analytics workflows used in professional consulting environments."
    ]
  },
  {
    id: 4,
    year: "2024",
    title: "Career Essentials in Generative AI — Microsoft & LinkedIn (Jun 2024)",
    details: [
      "Completed certification covering fundamentals of Artificial Intelligence and Generative AI.",
      "Developed understanding of AI applications in business, analytics, and automation."
    ]
  },
  {
    id: 5,
    year: "2024",
    title: "Ethics in the Age of Generative AI — LinkedIn (Jun 2024)",
    details: [
      "Learned ethical principles, responsible AI usage, and governance in AI systems.",
      "Gained awareness of ethical challenges and real-world AI implementation considerations."
    ]
  }
];

export default function Certifications() {
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
    <section id="certifications" ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-slate-900/40 to-dark-bg pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent-purple/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono font-medium tracking-[0.3em] text-primary-light uppercase mb-3 block">
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            <span className="bg-gradient-to-r from-primary-light to-accent-purple bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-4 max-w-xl mx-auto">
            Professional certifications in finance, analytics, and emerging technologies.
          </p>
        </motion.div>

        {/* Certifications List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/20 hover:border-primary-light/30 overflow-hidden glass-panel transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(cert.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-800/20 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-purple/15 border border-accent-purple/20 flex items-center justify-center text-accent-purple flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-primary-light font-semibold mb-1 block">
                      {cert.year}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed pr-4">
                      {cert.title}
                    </h3>
                  </div>
                </div>
                <div className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${openId === cert.id ? "rotate-180 text-primary-light" : ""}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openId === cert.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-slate-800/60 bg-slate-950/20">
                      <ul className="space-y-2.5">
                        {cert.details.map((detail, dIdx) => (
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
