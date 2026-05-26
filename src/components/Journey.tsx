"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, Code, BookOpen, School } from "lucide-react";

const JOURNEY_ITEMS = [
  {
    id: "mba",
    type: "education",
    degree: "MBA",
    institution: "Institute of Management, Nirma University",
    period: "2025–2027",
    details: [
      "Specialization: Finance",
      "Minor: Digital Transformation & Analytics",
      "Focusing on financial markets, data analytics, and business strategy",
      "Developing analytical frameworks for investment analysis and corporate valuation"
    ],
    icon: <GraduationCap className="w-5 h-5" />,
    color: "from-blue-500/20 to-purple-500/20",
    glowColor: "group-hover:border-blue-500/30",
    highlight: true,
  },
  {
    id: "internship",
    type: "work",
    degree: "Power BI Intern",
    institution: "Cognifyz Technologies",
    period: "Internship",
    details: [
      "Developed interactive Power BI dashboards for financial data analysis",
      "Performed data cleaning, transformation (PQ), and visualization",
      "Applied DAX formulas to generate deep business and finance insights",
      "Supported research workflows with data-driven modeling approaches"
    ],
    icon: <Briefcase className="w-5 h-5" />,
    color: "from-emerald-500/20 to-teal-500/20",
    glowColor: "group-hover:border-emerald-500/30",
    highlight: false,
  },
  {
    id: "btech",
    type: "education",
    degree: "B.Tech in Computer Science",
    institution: "Institute of Technology, Nirma University",
    period: "2022–2025",
    details: [
      "CGPA/Percentage: 82.90%",
      "Built strong foundation in programming, machine learning, and databases",
      "Completed academic projects in machine learning models and security",
      "Gained quantitative rigor and advanced logical problem-solving skills"
    ],
    icon: <Code className="w-5 h-5" />,
    color: "from-cyan-500/20 to-blue-500/20",
    glowColor: "group-hover:border-cyan-500/30",
    highlight: false,
  },
  {
    id: "xii",
    type: "education",
    degree: "Class XII (CBSE)",
    institution: "Bhagwan Mahavir International School, Surat",
    period: "2020–2021",
    details: [
      "Percentage: 92.80%",
      "Specialized in Physics, Chemistry, and Mathematics",
      "Developed foundational logical and mathematical thinking systems"
    ],
    icon: <BookOpen className="w-5 h-5" />,
    color: "from-orange-500/20 to-red-500/20",
    glowColor: "group-hover:border-orange-500/30",
    highlight: false,
  },
  {
    id: "x",
    type: "education",
    degree: "Class X (CBSE)",
    institution: "S. D. Jain Modern School",
    period: "2018–2019",
    details: [
      "Percentage: 91.80%",
      "Acquired strong analytical grounding and academic excellence"
    ],
    icon: <School className="w-5 h-5" />,
    color: "from-pink-500/20 to-rose-500/20",
    glowColor: "group-hover:border-pink-500/30",
    highlight: false,
  }
];

export default function Journey() {
  const [filter, setFilter] = useState<"all" | "work" | "education">("all");
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

  const filteredItems = JOURNEY_ITEMS.filter(
    (item) => filter === "all" || item.type === filter
  );

  return (
    <section id="journey" ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-slate-900/30 to-dark-bg pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-mono font-medium tracking-[0.3em] text-primary-light uppercase mb-3 block">
            Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Professional & Academic{" "}
            <span className="bg-gradient-to-r from-primary-light to-accent-purple bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          
          {/* Interactive filter tabs */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {(["all", "work", "education"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer focus:outline-none ${
                  filter === type
                    ? "text-white font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="relative z-10">{type}</span>
                {filter === type && (
                  <motion.div
                    layoutId="active-journey-tab"
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-purple/20 rounded-full border border-primary/30"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Timeline container */}
        <div className="max-w-3xl mx-auto relative min-h-[400px]">
          {/* Timeline line */}
          <div className="absolute left-6 top-2 bottom-6 w-px bg-gradient-to-b from-primary/40 via-accent-purple/20 to-transparent" />

          <motion.div layout className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 30, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative flex gap-6 sm:gap-8 group"
                >
                  {/* Node Icon */}
                  <div className="flex-shrink-0 relative z-10">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border bg-slate-950 transition-all duration-300 group-hover:scale-110 ${
                        item.highlight
                          ? "border-primary/50 shadow-[0_0_20px_rgba(0,102,255,0.4)] text-primary-light"
                          : "border-slate-800 text-slate-400 group-hover:border-slate-600 group-hover:text-slate-200"
                      }`}
                    >
                      {item.icon}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div
                    className={`flex-1 p-5 rounded-2xl bg-slate-900/10 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg ${
                      item.highlight
                        ? "border-primary/20 bg-primary/5 hover:border-primary/40"
                        : `border-slate-850 hover:border-slate-700 ${item.glowColor}`
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                      <div>
                        <h3 className="text-base font-semibold text-white group-hover:text-primary-light transition-colors duration-200">
                          {item.degree}
                        </h3>
                        <p className="text-sm text-slate-350 font-medium mt-0.5">
                          {item.institution}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-mono px-3 py-1 rounded-full border flex-shrink-0 ${
                          item.highlight
                            ? "bg-primary/10 border-primary/30 text-primary-light"
                            : "bg-slate-850 border-slate-750 text-slate-400"
                        }`}
                      >
                        {item.period}
                      </span>
                    </div>
                    
                    <ul className="mt-3 space-y-1.5">
                      {item.details.map((detail, dIdx) => (
                        <li
                          key={dIdx}
                          className="text-sm text-slate-400 flex items-start gap-2.5 leading-relaxed group-hover:text-slate-300 transition-colors duration-200"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light/60" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
