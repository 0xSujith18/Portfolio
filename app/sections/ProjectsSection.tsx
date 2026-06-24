"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, ArrowRight } from "lucide-react";
import { PROJECTS } from "@/app/lib/data";

export default function ProjectsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="tag mb-4 inline-block">Portfolio</span>
          <h2 className="section-title">
            Things I&apos;ve <span className="gradient-text">built & shipped.</span>
          </h2>
          <p className="section-subtitle max-w-xl">
            Real products, real code, real impact. Each one taught me something new.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => {
            const isOpen = expanded === project.id;
            const accentColor = i % 2 === 0 ? "var(--indigo)" : "var(--violet)";
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                onClick={() => setExpanded(isOpen ? null : project.id)}
                className="glass-card p-7 flex flex-col cursor-pointer relative overflow-hidden group"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, var(--indigo), var(--violet))` }}
                />

                {project.featured && (
                  <span className="absolute top-4 right-4 tag-indigo text-[10px]">Featured</span>
                )}

                <span
                  className="text-5xl font-black mb-4 leading-none select-none"
                  style={{ WebkitTextStroke: `1px ${accentColor}`, color: "transparent" }}
                >
                  0{i + 1}
                </span>

                <h3 className="font-black text-xl mb-2 leading-snug">{project.title}</h3>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={isOpen ? "long" : "short"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1"
                  >
                    {isOpen ? project.longDescription : project.description}
                  </motion.p>
                </AnimatePresence>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="tag text-[11px]">{tag}</span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="tag text-[11px]">+{project.tags.length - 4}</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.metrics.map(m => (
                    <span key={m} className="text-[11px] px-2 py-0.5 rounded-full glass text-[var(--text-secondary)]">
                      ✓ {m}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg btn-primary"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                  <span className="text-xs text-[var(--text-secondary)]">
                    {isOpen ? "Less ↑" : "More ↓"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/0xSujith18"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            <Github className="w-4 h-4" />
            All projects on GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
