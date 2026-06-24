"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Github, Bot, Search, Sparkles, Droplets, LayoutDashboard, MessageSquare, Leaf, BookOpen, CreditCard, ArrowRight,
} from "lucide-react";
import { PROJECTS } from "@/app/lib/data";

const ICON_MAP: Record<string, React.ElementType> = {
  Bot, Search, Sparkles, Droplets, LayoutDashboard, MessageSquare, Leaf, BookOpen, CreditCard,
};

const FILTERS = ["All", "AI/ML", "Full Stack", "Cloud", "Data"];

function filterMatch(project: (typeof PROJECTS)[0], filter: string) {
  if (filter === "All") return true;
  const map: Record<string, string[]> = {
    "AI/ML": ["AI", "LLM", "OpenAI", "LangChain", "Chatbot"],
    "Full Stack": ["Next.js", "React", "Node.js", "Express"],
    Cloud: ["AWS", "Docker"],
    Data: ["MongoDB", "MySQL", "PostgreSQL", "Pandas"],
  };
  return map[filter]?.some((kw) => project.tags.some((t) => t.includes(kw)));
}

export default function ProjectsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = PROJECTS.filter((p) => filterMatch(p, filter));

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="tag mb-4 inline-block">Portfolio</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Real-world applications showcasing full stack, AI, and cloud capabilities.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? "btn-primary"
                  : "glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => {
              const Icon = ICON_MAP[project.icon] || Bot;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onHoverStart={() => setHovered(project.id)}
                  onHoverEnd={() => setHovered(null)}
                  className="glass-card p-6 flex flex-col group relative overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className="absolute inset-0 bg-[var(--accent-glow)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
                  />

                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30 font-medium">
                        Featured
                      </span>
                    </div>
                  )}

                  <div
                    className="w-10 h-10 rounded-xl bg-[var(--glass-border)] flex items-center justify-center mb-4"
                  >
                    <Icon className="w-5 h-5 text-[var(--text-primary)]" />
                  </div>

                  <h3 className="font-bold text-lg mb-2 leading-snug">{project.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
                    {hovered === project.id ? project.longDescription : project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="tag text-xs">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="tag text-xs">+{project.tags.length - 4}</span>
                    )}
                  </div>

                  <div className="flex gap-1.5 mb-4 flex-wrap">
                    {project.metrics.map((m) => (
                      <span
                        key={m}
                        className="text-xs px-2 py-0.5 rounded-full glass border border-[var(--glass-border)] text-[var(--text-secondary)]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-auto pt-2 relative z-10">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg btn-primary"
                    >
                      <Github className="w-3.5 h-3.5" /> View on GitHub
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/0xSujith18"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            <Github className="w-4 h-4" />
            View All on GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
