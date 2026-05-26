"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Only the skills that are verifiable from the original portfolio site
const SKILL_CATEGORIES = [
  {
    category: "Data & Analytics",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/20",
    dotColor: "bg-blue-400",
    pillClass: "bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-200 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]",
    skills: [
      "Data Analytics",
      "Power BI Dashboard Development",
      "Data Visualization",
      "Business Intelligence",
      "Machine Learning",
      "Financial Modeling",
    ],
  },
  {
    category: "Finance & Investment",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20",
    dotColor: "bg-emerald-400",
    pillClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 hover:text-emerald-200 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]",
    skills: [
      "Investment Analysis",
      "Equity Research",
      "Financial Markets",
      "Private Equity",
      "Investment Banking",
      "Financial Analysis",
    ],
  },
  {
    category: "Technical Skills",
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/20",
    dotColor: "bg-purple-400",
    pillClass: "bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-200 hover:shadow-[0_0_12px_rgba(168,85,247,0.2)]",
    skills: [
      "React",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "Python",
      "SQL",
    ],
  },
  {
    category: "Soft Skills",
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/20",
    dotColor: "bg-amber-400",
    pillClass: "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-200 hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]",
    skills: [
      "Research & Analytical Thinking",
      "Leadership & Team Collaboration",
      "Data-Driven Decision Making",
      "Stakeholder Communication",
      "Strategic Planning",
    ],
  },
];

export default function Skills() {
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
    <section id="skills" ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-slate-900/30 to-dark-bg pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono font-medium tracking-[0.3em] text-primary-light uppercase mb-3 block">
            Skills & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Core{" "}
            <span className="bg-gradient-to-r from-primary-light to-accent-purple bg-clip-text text-transparent">
              Competencies
            </span>
          </h2>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${cat.color} border glass-panel hover:shadow-lg transition-all duration-300 group`}
            >
              <h3 className="text-sm font-semibold text-slate-200 mb-4 tracking-wide">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    whileHover={{ 
                      scale: 1.06, 
                      y: -2,
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 18,
                      delay: catIdx * 0.08 + skillIdx * 0.02 
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs border transition-all duration-200 cursor-default select-none ${cat.pillClass}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
