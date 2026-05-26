"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

import { GraduationCap, Cpu, Users, Target } from "lucide-react";

const CORE_COMPETENCIES = [
  "Data Analytics",
  "Power BI Dashboard Development",
  "Investment Analysis",
  "Machine Learning",
  "Data Visualization",
  "Business Intelligence",
  "Financial Markets Understanding",
  "Research and Analytical Thinking",
  "Leadership and Team Collaboration",
];

const getCompetencyColor = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes("data") || s.includes("visualization") || s.includes("analytics") || s.includes("bi")) {
    return "bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-200 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]";
  }
  if (s.includes("investment") || s.includes("market") || s.includes("finance") || s.includes("equity")) {
    return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 hover:text-emerald-200 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]";
  }
  if (s.includes("machine") || s.includes("programming") || s.includes("technical") || s.includes("python") || s.includes("react")) {
    return "bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-200 hover:shadow-[0_0_12px_rgba(168,85,247,0.2)]";
  }
  // Fallback (Soft Skills / Leadership)
  return "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-200 hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]";
};

const BIO_CARDS = [
  {
    icon: GraduationCap,
    iconClass: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    glowGradient: "from-transparent via-blue-500/10 to-transparent",
    title: "Academic & Tech Hybrid",
    content: (
      <>
        <span className="font-semibold text-white">MBA candidate</span> at <span className="text-blue-400 font-medium">Institute of Management, Nirma University</span> with a strong foundation in financial analysis and data-driven decision making. My <span className="font-semibold text-white">B.Tech in Computer Science</span> provides a unique blend of quantitative rigor, programming expertise, and business acumen.
      </>
    ),
  },
  {
    icon: Cpu,
    iconClass: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    glowGradient: "from-transparent via-emerald-500/10 to-transparent",
    title: "Analytical & Financial Focus",
    content: (
      <>
        Proficient in <span className="font-semibold text-white">Power BI</span>, data analytics, and <span className="text-emerald-400 font-medium">machine learning applications</span> for financial modeling. Seeking opportunities in <span className="font-semibold text-white">equity research, private equity, and investment analysis</span> where I can leverage technical skills to deliver actionable financial insights and strategic recommendations.
      </>
    ),
  },
  {
    icon: Users,
    iconClass: "border-purple-500/20 bg-purple-500/10 text-purple-400",
    glowGradient: "from-transparent via-purple-500/10 to-transparent",
    title: "Communication & Impact",
    content: (
      <>
        Proven ability to <span className="text-purple-400 font-medium">translate complex data into clear narratives</span> for stakeholders ranging from technical teams to executive decision-makers, with experience in research, analytics, and leadership-oriented roles.
      </>
    ),
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function About() {
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
    <section id="about" ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-slate-900/50 to-dark-bg pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono font-medium tracking-[0.3em] text-primary-light uppercase mb-3 block">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Finance professional with analytical expertise{" "}
            <span className="bg-gradient-to-r from-primary-light to-accent-purple bg-clip-text text-transparent">
              and technical foundation.
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[1.6fr,1fr] gap-12 items-start">
          {/* Bio cards — animated and interactive */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="space-y-6"
          >
            {BIO_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-5 rounded-2xl glass-panel border border-slate-800/60 hover:border-slate-700/60 hover:bg-slate-900/30 transition-all duration-300 flex gap-5 items-start relative overflow-hidden group"
                >
                  {/* Glowing background gradient on hover */}
                  <div className={`absolute -inset-px bg-gradient-to-r ${card.glowGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  
                  {/* Icon Wrapper */}
                  <div className={`p-3 rounded-xl border flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${card.iconClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="space-y-1 z-10">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      {card.title}
                    </h4>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {card.content}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Career Objectives */}
            <motion.div
              variants={itemVariants}
              className="p-5 rounded-2xl glass-panel border border-slate-800/60 hover:border-slate-700/60 hover:bg-slate-900/30 transition-all duration-300 flex gap-5 items-start relative overflow-hidden group"
            >
              {/* Glowing background gradient on hover */}
              <div className="absolute -inset-px bg-gradient-to-r from-transparent via-primary-light/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Icon Wrapper */}
              <div className="p-3 rounded-xl border flex-shrink-0 border-primary-light/20 bg-primary-light/10 text-primary-light transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Target className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="space-y-1 z-10">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Career Objectives
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Seeking opportunities in{" "}
                  <span className="font-semibold text-primary-light">
                    Finance, Equity Research, Private Equity, Investment Banking, or Financial
                    Modeling
                  </span>{" "}
                  to apply my analytical skills, financial knowledge, and technical expertise in
                  supporting data-driven investment decisions and strategic business outcomes.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Core Competencies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="p-5 rounded-2xl glass-panel border border-slate-800/60">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Core Competencies
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {CORE_COMPETENCIES.map((skill, idx) => {
                  const colorClass = getCompetencyColor(skill);
                  return (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 18,
                        delay: 0.15 + idx * 0.03,
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs border transition-all duration-200 cursor-default select-none ${colorClass}`}
                    >
                      {skill}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
