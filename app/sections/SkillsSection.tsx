"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Server, Database, Cloud, Monitor, Cpu } from "lucide-react";
import { SKILLS, TECH_STACK } from "@/app/lib/data";

const ICON_MAP: Record<string, React.ElementType> = { Monitor, Server, Database, Cloud, Cpu, Code2 };

function SkillBar({ level, inView }: { level: number; inView: boolean }) {
  return (
    <div className="skill-bar">
      <motion.div
        className="skill-bar-fill"
        initial={{ width: 0 }}
        animate={{ width: inView ? `${level}%` : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

export default function SkillsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Tech Stack</span>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            A curated set of technologies I use to build modern, scalable applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {SKILLS.map((group, gi) => {
            const Icon = ICON_MAP[group.icon] || Code2;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: gi * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-[var(--glass-border)]">
                    <Icon className="w-5 h-5 text-[var(--text-primary)]" />
                  </div>
                  <h3 className="font-semibold text-lg">{group.category}</h3>
                </div>
                <div className="space-y-4">
                  {group.items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-[var(--text-secondary)]">{skill.level}%</span>
                      </div>
                      <SkillBar level={skill.level} inView={inView} />
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-8"
        >
          <h3 className="text-center font-semibold text-lg mb-6 text-[var(--text-secondary)]">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {TECH_STACK.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.04 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-[var(--glass-border)] hover:border-[var(--accent)] transition-all cursor-default"
              >
                <span className="text-lg">{tech.icon}</span>
                <span className="text-sm font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
