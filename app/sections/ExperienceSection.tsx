"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Trophy, GraduationCap, School, CheckCircle2 } from "lucide-react";
import { EXPERIENCE } from "@/app/lib/data";

const ICON_MAP: Record<string, React.ElementType> = { Code2, Trophy, GraduationCap, School };

export default function ExperienceSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Journey</span>
          <h2 className="section-title">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            My professional journey and continuous learning path.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 timeline-line hidden md:block" />

          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => {
              const Icon = ICON_MAP[exp.icon] || Code2;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex gap-6 group"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 hidden md:flex">
                    <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center hover:border-[var(--accent)] transition-all z-10">
                      <Icon className="w-6 h-6 text-[var(--text-primary)]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 glass-card p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{exp.title}</h3>
                        <p className="text-[var(--text-secondary)] font-medium text-sm">{exp.company}</p>
                      </div>
                      <span className="tag text-xs">{exp.period}</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((a, ai) => (
                        <li key={ai} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[var(--text-primary)] flex-shrink-0 mt-0.5" />
                          <span className="text-[var(--text-secondary)]">{a}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
