"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, ExternalLink } from "lucide-react";
import { Github } from "@/components/BrandIcons";

const PROJECTS = [
  {
    id: "malware-detection",
    title: "Android Malware Detection Framework",
    description: "ML and XAI-based research project.",
    techStack: ["Python", "ML", "XAI"],
    githubUrl: "https://github.com/Bhavnish10",
    details: [
      "Developed ML-based Android malware detection framework",
      "Achieved 97% accuracy using advanced ML algorithms",
      "Applied Explainable AI for model transparency",
      "Presented research at ICIT 2025, Bangkok"
    ],
    featured: true,
    badge: "97% accuracy Android ML & XAI"
  },
  {
    id: "electrocast",
    title: "ElectroCast — AI-Based Electricity Demand Forecasting System",
    description: "Developed ML-based electricity demand forecasting system using Random Forest algorithm with integrated datasets and interactive dashboard.",
    techStack: ["Python", "ML", "Streamlit", "Random Forest"],
    githubUrl: "https://github.com/Bhavnish10",
    details: [
      "Developed AI-based electricity demand forecasting system using Random Forest algorithm",
      "Integrated weather, holiday, and historical demand datasets for accurate predictions",
      "Built interactive dashboard using Streamlit for real-time visualization"
    ],
    featured: false
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker App — Android Application",
    description: "Developed an Android-based Expense Tracker application for efficient expense management. Implemented MVVM architecture for scalable and structured application design. Used Room Database for secure, persistent, and offline data storage.",
    techStack: ["Android", "MVVM", "Room Database", "Kotlin"],
    githubUrl: "https://github.com/Bhavnish10",
    details: [
      "Developed Android-based Expense Tracker application for efficient expense management",
      "Implemented MVVM architecture for scalable and structured application design",
      "Used Room Database for secure, persistent, and offline data storage",
      "Enabled CRUD operations (add, edit, delete expenses) for effective financial tracking",
      "Designed responsive UI with animations for improved user experience",
      "Provided financial insights by tracking spending patterns and total expenses"
    ],
    featured: false
  }
];

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);
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
    <section id="projects" ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-slate-900/30 to-dark-bg pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono font-medium tracking-[0.3em] text-primary-light uppercase mb-3 block">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary-light to-accent-purple bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-4 max-w-xl mx-auto">
            Selected work combining machine learning, mobile development, and data forecasting.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => setActiveProject(project)}
              className="group relative rounded-2xl border border-slate-800 hover:border-primary/30 bg-slate-900/40 hover:bg-slate-900/80 p-6 glass-panel cursor-pointer shadow-lg hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full active:scale-[0.98]"
            >
              <div className="flex-1">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-light group-hover:scale-110 transition-transform">
                    <FolderOpen className="w-5 h-5" />
                  </div>
                  {project.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-primary/20 bg-primary/10 text-primary-light font-medium">
                      {project.badge}
                    </span>
                  )}
                </div>
                
                <h3 className="text-base font-semibold text-white group-hover:text-primary-light transition-colors mb-2">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">
                  {project.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-800/60 border border-slate-700 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {activeProject && (
          <div
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden glass-panel max-h-[85vh] flex flex-col cursor-default"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-6 py-4 backdrop-blur">
                <h3 className="text-sm font-mono font-medium tracking-wider text-primary-light">
                  Project Details
                </h3>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-6 overflow-y-auto flex-1 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{activeProject.title}</h2>
                  <p className="text-sm text-slate-300 leading-relaxed">{activeProject.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest mb-3">
                    Key Features / Milestones
                  </h4>
                  <ul className="space-y-3">
                    {activeProject.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-light"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-slate-800 bg-slate-950/40 px-6 py-4 flex justify-end gap-3">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
