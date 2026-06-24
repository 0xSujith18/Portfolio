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
          className="mb-14"
        >
          <span className="tag mb-4 inline-block">Journey</span>
          <h2 className="section-title">
            How I got <span className="gradient-text">here.</span>
          </h2>
          <p className="section-subtitle max-w-xl">
            Education, competitions, and every milestone that shaped how I write code today.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-7 top-0 bottom-0 timeline-line hidden md:block" />

          <div className="space-y-6">
            {EXPERIENCE.map((exp, i) => {
              const Icon = ICON_MAP[exp.icon] || Code2;
              const color = i % 2 === 0 ? "var(--indigo)" : "var(--violet)";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 hidden md:flex">
                    <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center z-10">
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                  </div>

                  <div className="flex-1 glass-card p-6 relative overflow-hidden">
                    <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full opacity-60" style={{ background: color }} />
                    <div className="pl-4">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-black text-base leading-snug">{exp.title}</h3>
                          <p className="text-[var(--text-secondary)] text-sm mt-0.5">{exp.company}</p>
                        </div>
                        <span className="tag text-xs">{exp.period}</span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] mt-3 mb-3 leading-relaxed">{exp.description}</p>
                      <ul className="space-y-1.5 mb-4">
                        {exp.achievements.map((a, ai) => (
                          <li key={ai} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color }} />
                            <span className="text-[var(--text-secondary)]">{a}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
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
