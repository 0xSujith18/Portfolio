"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Server, Database, Monitor } from "lucide-react";
import { SKILLS, TECH_STACK } from "@/app/lib/data";

const ICON_MAP: Record<string, React.ElementType> = { Monitor, Server, Database, Code2 };

function SkillBar({ level, inView }: { level: number; inView: boolean }) {
  return (
    <div className="skill-bar">
      <motion.div
        className="skill-bar-fill"
        initial={{ width: 0 }}
        animate={{ width: inView ? `${level}%` : 0 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
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
          className="mb-14"
        >
          <span className="tag mb-4 inline-block">Tech Stack</span>
          <h2 className="section-title">
            Tools I <span className="gradient-text">actually use.</span>
          </h2>
          <p className="section-subtitle max-w-xl">
            Not a keyword collector — these are technologies I&apos;ve shipped real things with.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {SKILLS.map((group, i) => {
            const Icon = ICON_MAP[group.icon] || Code2;
            const isIndigo = i % 2 === 0;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-7"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="p-2.5 rounded-xl"
                    style={{ background: isIndigo ? "var(--indigo-glow)" : "var(--violet-glow)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: isIndigo ? "var(--indigo)" : "var(--violet)" }} />
                  </div>
                  <h3 className="font-bold text-lg">{group.category}</h3>
                </div>
                <div className="space-y-5">
                  {group.items.map(skill => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-[var(--text-secondary)] font-mono text-xs">{skill.level}%</span>
                      </div>
                      <SkillBar level={skill.level} inView={inView} />
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="glass-card p-8"
        >
          <p className="text-center text-xs font-semibold text-[var(--text-secondary)] mb-6 uppercase tracking-widest">
            Also in my toolkit
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {TECH_STACK.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.45 + i * 0.03 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:border-[var(--indigo)] transition-all cursor-default"
              >
                <span className="text-base">{tech.icon}</span>
                <span className="text-sm font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
