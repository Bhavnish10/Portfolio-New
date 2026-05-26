"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const EDUCATION = [
  {
    degree: "MBA",
    institution: "Institute of Management, Nirma University",
    period: "2025–2027",
    details: [
      "Specialization: Finance",
      "Minor: Digital Transformation & Analytics",
      "Currently pursuing MBA with focus on finance, analytics, and investment analysis",
      "Developing expertise in financial markets, data analytics, and business strategy"
    ],
    icon: "🎓",
    color: "from-blue-500/20 to-purple-500/20",
    highlight: true,
  },
  {
    degree: "B.Tech in Computer Science",
    institution: "Institute of Technology, Nirma University",
    period: "2022–2025",
    details: [
      "CGPA/Percentage: 82.90%",
      "Built strong foundation in programming, machine learning, and data analytics",
      "Completed academic and research projects in cybersecurity and machine learning",
      "Developed strong problem-solving and analytical skills"
    ],
    icon: "💻",
    color: "from-green-500/20 to-teal-500/20",
    highlight: false,
  },
  {
    degree: "Class XII (CBSE)",
    institution: "Bhagwan Mahavir International School, Surat",
    period: "2020–2021",
    details: [
      "Percentage: 92.80%",
      "Focused on science and mathematics",
      "Developed strong analytical and logical thinking foundation"
    ],
    icon: "📚",
    color: "from-orange-500/20 to-red-500/20",
    highlight: false,
  },
  {
    degree: "Class X (CBSE)",
    institution: "S. D. Jain Modern School",
    period: "2018–2019",
    details: [
      "Percentage: 91.80%",
      "Built strong academic foundation",
      "Developed interest in technology and analytical thinking"
    ],
    icon: "🏫",
    color: "from-pink-500/20 to-rose-500/20",
    highlight: false,
  }
];

export default function Education() {
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
    <section id="education" ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-slate-900/40 to-dark-bg pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono font-medium tracking-[0.3em] text-primary-light uppercase mb-3 block">
            Academic Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            <span className="bg-gradient-to-r from-primary-light to-accent-purple bg-clip-text text-transparent">
              Education
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent-purple/20 to-transparent" />

          <div className="space-y-8">
            {EDUCATION.map((edu, idx) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative flex gap-8"
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border bg-slate-900 ${
                      edu.highlight
                        ? "border-primary/40 shadow-[0_0_20px_rgba(0,102,255,0.3)]"
                        : "border-slate-700/60"
                    }`}
                  >
                    <span className="text-xl">{edu.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 pb-8 p-5 rounded-2xl glass-panel border transition-all duration-300 hover:shadow-lg ${
                    edu.highlight
                      ? "border-primary/20 bg-primary/5"
                      : "border-slate-800/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-white">{edu.degree}</h3>
                      <p className="text-sm text-primary-light font-medium mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-mono px-3 py-1 rounded-full border flex-shrink-0 ${
                        edu.highlight
                          ? "bg-primary/10 border-primary/30 text-primary-light"
                          : "bg-slate-800/60 border-slate-700 text-slate-400"
                      }`}
                    >
                      {edu.period}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {edu.details.map((detail, dIdx) => (
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
