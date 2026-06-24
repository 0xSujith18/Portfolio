"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { User, Download, Eye, MapPin, Briefcase } from "lucide-react";
import { PERSONAL, LEETCODE_STATS, SKILLRACK_STATS } from "@/app/lib/data";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [totalSolved, setTotalSolved] = useState(LEETCODE_STATS.totalSolved);
  const [srSolved, setSrSolved] = useState(SKILLRACK_STATS.problemsSolved);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((r) => r.json())
      .then((d) => !d.error && setTotalSolved(d.totalSolved))
      .catch(() => {});
    fetch("/api/skillrack")
      .then((r) => r.json())
      .then((d) => !d.error && setSrSolved(d.problemsSolved))
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">About Me</span>
          <h2 className="section-title">
            Who <span className="gradient-text">I Am</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 flex flex-col items-center gap-4"
          >
            <div className="relative">
              <div className="w-48 h-48 rounded-3xl glass-card flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-[var(--bg-secondary)] flex items-center justify-center">
                  <span className="text-7xl">👨‍💻</span>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 glass-card px-3 py-1.5 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Available
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-xl">{PERSONAL.name}</h3>
              <p className="text-[var(--text-secondary)] text-sm mt-1">{PERSONAL.title}</p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <MapPin className="w-4 h-4 text-[var(--text-secondary)]" />
                India
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Briefcase className="w-4 h-4 text-[var(--text-secondary)]" />
                Open to Opportunities
              </div>
            </div>

            <div className="flex gap-2 w-full">
              <a href={PERSONAL.resumeUrl} download className="btn-primary flex-1 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </a>
              <a href={PERSONAL.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                View
              </a>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="md:col-span-3 space-y-5"
          >
            <div className="glass-card p-6">
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                {PERSONAL.bio}
              </p>
            </div>

            <div className="glass-card p-6">
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                My expertise includes developing responsive user interfaces, designing RESTful APIs,
                managing databases, and deploying applications to cloud platforms. I have solved{" "}
                <span className="text-[var(--text-primary)] font-semibold underline underline-offset-2">{totalSolved} LeetCode problems</span> and{" "}
                <span className="text-[var(--text-primary)] font-semibold underline underline-offset-2">{srSolved}+ Skillrack problems</span>, strengthening
                my problem-solving and algorithmic thinking skills.
              </p>
            </div>

            <div className="glass-card p-6">
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                I enjoy transforming ideas into complete products and have worked on projects involving
                AI chatbots, document intelligence systems, data processing platforms, and cloud-based
                applications. I continuously explore new technologies and strive to build impactful
                software that delivers excellent user experiences.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Frontend", icon: "🎨" },
                { label: "Backend", icon: "⚙️" },
                { label: "AI/ML", icon: "🤖" },
                { label: "Cloud", icon: "☁️" },
                { label: "Databases", icon: "🗄️" },
                { label: "DevOps", icon: "🚀" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-card p-3 flex items-center gap-2 text-sm font-medium"
                >
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
