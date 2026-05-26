"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const EXPERIENCE = [
  {
    role: "Power BI Intern",
    company: "Cognifyz Technologies",
    period: "Internship",
    details: [
      "Developed interactive Power BI dashboards for financial data analysis",
      "Performed data cleaning, transformation, and visualization",
      "Applied DAX and analytics techniques to generate business insights",
      "Supported investment analysis using data-driven approaches"
    ]
  }
];

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-slate-900/40 to-dark-bg pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent-cyan/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono font-medium tracking-[0.3em] text-primary-light uppercase mb-3 block">
            Work History
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Professional{" "}
            <span className="bg-gradient-to-r from-primary-light to-accent-purple bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </motion.div>

        {/* Experience Timeline */}
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent-purple/20 to-transparent" />

          <div className="space-y-8">
            {EXPERIENCE.map((exp, idx) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative flex gap-8"
              >
                {/* Dot */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border border-slate-700/60 bg-slate-900">
                    <Briefcase className="w-5 h-5 text-primary-light" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8 p-5 rounded-2xl glass-panel border border-slate-800/60 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                      <p className="text-sm text-primary-light font-medium mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full border bg-slate-800/60 border-slate-700 text-slate-400">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {exp.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-sm text-slate-400 flex items-start gap-2 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
