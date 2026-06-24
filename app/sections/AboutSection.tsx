"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Download, Eye, MapPin, Briefcase, GraduationCap, Zap } from "lucide-react";
import { PERSONAL, LEETCODE_STATS, SKILLRACK_STATS } from "@/app/lib/data";
import { useEffect, useState } from "react";

const STORY = [
  {
    icon: "🧠",
    title: "I think in systems.",
    body: "Whether it's a REST API or a real-time feed, I care about how the pieces fit — not just making it work, but making it right.",
  },
  {
    icon: "🛠️",
    title: "I build end to end.",
    body: "From design to deployment on AWS EC2, I've owned every layer of the stack. React on the front, Node on the back, MongoDB in the middle.",
  },
  {
    icon: "📈",
    title: "I sharpen my edge daily.",
    body: "1100+ Skillrack problems and 100+ LeetCode solves aren't just numbers — they're proof I show up and do the work.",
  },
];

const DOMAINS = [
  { label: "Frontend", icon: "🎨" },
  { label: "Backend", icon: "⚙️" },
  { label: "AI / ML", icon: "🤖" },
  { label: "Cloud", icon: "☁️" },
  { label: "Databases", icon: "🗄️" },
  { label: "DevOps", icon: "🚀" },
];

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [leetSolved, setLeetSolved] = useState(LEETCODE_STATS.totalSolved);
  const [srSolved, setSrSolved] = useState(SKILLRACK_STATS.problemsSolved);

  useEffect(() => {
    fetch("/api/leetcode").then(r => r.json()).then(d => !d.error && setLeetSolved(d.totalSolved)).catch(() => {});
    fetch("/api/skillrack").then(r => r.json()).then(d => !d.error && setSrSolved(d.problemsSolved)).catch(() => {});
  }, []);

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="tag mb-4 inline-block">About Me</span>
          <h2 className="section-title">
            A developer who <span className="gradient-text">gives a damn.</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed">
            Not just about writing code that compiles — about building software people actually enjoy using.
          </p>
        </motion.div>

        {/* Story cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {STORY.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="glass-card p-7"
            >
              <span className="text-3xl mb-4 block">{s.icon}</span>
              <h3 className="font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Identity card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass-card p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] bg-emerald-400/[0.08] dark:bg-emerald-500/[0.06]" />
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-4xl mb-5">
                👨💻
              </div>
              <h3 className="font-black text-xl mb-1">{PERSONAL.name}</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-5">{PERSONAL.title}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "var(--indigo)" }} />
                  Tamil Nadu, India
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                  <GraduationCap className="w-4 h-4 flex-shrink-0" style={{ color: "var(--violet)" }} />
                  B.E. CSE · Sri Eshwar College
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                  <Briefcase className="w-4 h-4 flex-shrink-0" style={{ color: "var(--indigo)" }} />
                  Open to full-time & freelance
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                  <Zap className="w-4 h-4 flex-shrink-0" style={{ color: "var(--violet)" }} />
                  <span>
                    <span className="text-[var(--text-primary)] font-semibold">{leetSolved}</span> LeetCode ·{" "}
                    <span className="text-[var(--text-primary)] font-semibold">{srSolved}+</span> Skillrack
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <a href={PERSONAL.resumeUrl} download className="btn-indigo flex-1 flex items-center justify-center gap-2 text-sm py-2.5">
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
                <a href={PERSONAL.resumeUrl} download className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm py-2.5">
                  <Eye className="w-3.5 h-3.5" />
                  View
                </a>
              </div>
            </div>
          </motion.div>

          {/* Bio + domains */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 space-y-5"
          >
            <div className="glass-card p-7">
              <p className="text-[var(--text-secondary)] leading-[1.85] text-sm">{PERSONAL.bio}</p>
            </div>

            <div className="glass-card p-7">
              <p className="text-[var(--text-secondary)] leading-[1.85] text-sm">
                I enjoy the whole journey — from a blank editor to a live product. I&apos;ve built
                civic platforms, Ayurvedic health apps, and fee management tools, going deeper each
                time on architecture, performance, and UX. Currently maintaining a CGPA of{" "}
                <span className="text-[var(--text-primary)] font-semibold">7.7</span>.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {DOMAINS.map(item => (
                <div key={item.label} className="glass-card p-3 flex items-center gap-2 text-sm font-medium">
                  <span>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
