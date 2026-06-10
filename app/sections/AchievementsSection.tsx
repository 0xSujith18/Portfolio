"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Trophy, Target, TrendingUp, Award, ExternalLink, Code2 } from "lucide-react";
import { LEETCODE_STATS, SKILLRACK_STATS } from "@/app/lib/data";
import { useEffect, useState } from "react";

type LeetStats = { totalSolved: number; easy: number; medium: number; hard: number; ranking: number };

function CircularProgress({ value, max, color, label, sublabel }: {
  value: number; max: number; color: string; label: string; sublabel: string;
}) {
  const pct = (value / max) * 100;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90">
          <circle cx="48" cy="48" r={radius} fill="none" stroke="var(--border)" strokeWidth="6" />
          <motion.circle
            cx="48" cy="48" r={radius} fill="none"
            stroke={color} strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-lg font-bold">{value}</span>
          <span className="text-xs text-[var(--text-secondary)]">{sublabel}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>
    </div>
  );
}

export default function AchievementsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [live, setLive] = useState<LeetStats | null>(null);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((r) => r.json())
      .then((d) => !d.error && setLive(d))
      .catch(() => {});
  }, []);

  const lc = {
    totalSolved: live?.totalSolved ?? LEETCODE_STATS.totalSolved,
    easy: live?.easy ?? LEETCODE_STATS.easy,
    medium: live?.medium ?? LEETCODE_STATS.medium,
    hard: live?.hard ?? LEETCODE_STATS.hard,
  };

  const difficultyData = [
    { label: "Easy", value: lc.easy, color: "#10b981", bg: "bg-green-500/10 border-green-500/20 text-green-400" },
    { label: "Medium", value: lc.medium, color: "#f59e0b", bg: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400" },
    { label: "Hard", value: lc.hard, color: "#ef4444", bg: "bg-red-500/10 border-red-500/20 text-red-400" },
  ];

  return (
    <section id="achievements" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Achievements</span>
          <h2 className="section-title">
            Coding <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            My competitive programming stats and problem-solving achievements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* LeetCode Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-orange-500/20">
                <Code2 className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg">LeetCode</h3>
                <p className="text-xs text-[var(--text-secondary)]">Algorithmic Problem Solving</p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-2xl font-bold gradient-text">{lc.totalSolved}</div>
                <div className="text-xs text-[var(--text-secondary)]">Problems Solved</div>
              </div>
            </div>

            <div className="flex justify-around mb-6">
              {difficultyData.map((d) => (
                <CircularProgress
                  key={d.label}
                  value={d.value}
                  max={d.label === "Easy" ? 60 : d.label === "Medium" ? 70 : 20}
                  color={d.color}
                  label={d.label}
                  sublabel="solved"
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {difficultyData.map((d) => (
                <div key={d.label} className={`px-3 py-2 rounded-xl border text-center ${d.bg}`}>
                  <div className="text-xl font-bold">{d.value}</div>
                  <div className="text-xs font-medium">{d.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <TrendingUp className="w-4 h-4 text-brand-400" />
                Max Rating: <span className="text-[var(--text-primary)] font-medium">{LEETCODE_STATS.maxRating}</span>
              </div>
              <a
                href={LEETCODE_STATS.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg btn-primary"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Profile
              </a>
            </div>
          </motion.div>

          {/* Skillrack Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-brand-500/20">
                <Trophy className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Skillrack</h3>
                <p className="text-xs text-[var(--text-secondary)]">Consistent Problem Solver</p>
              </div>
            </div>

            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ type: "spring", delay: 0.5, stiffness: 100 }}
                className="text-6xl font-black gradient-text mb-2"
              >
                1000+
              </motion.div>
              <p className="text-[var(--text-secondary)] font-medium">Problems Solved</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="glass p-4 rounded-xl text-center">
                <Award className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                <div className="font-bold text-lg">{SKILLRACK_STATS.badges}</div>
                <div className="text-xs text-[var(--text-secondary)]">Badges Earned</div>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <Target className="w-5 h-5 text-brand-400 mx-auto mb-1" />
                <div className="font-bold text-lg gradient-text">{SKILLRACK_STATS.score}</div>
                <div className="text-xs text-[var(--text-secondary)]">Score Level</div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-brand-500/10 to-accent-purple/10 border border-brand-500/20">
              <p className="text-sm text-center text-[var(--text-secondary)]">
                🏆 Strong foundation in <span className="text-brand-400 font-medium">DSA</span>, algorithms & competitive programming
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
