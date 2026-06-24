"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Trophy, Target, TrendingUp, Award, ExternalLink, Code2 } from "lucide-react";
import { LEETCODE_STATS, SKILLRACK_STATS } from "@/app/lib/data";
import { useEffect, useState } from "react";

type LeetStats = { totalSolved: number; easy: number; medium: number; hard: number };
type SrStats = { problemsSolved: number; certificates: number; score: number };

function CircularProgress({ value, max, label }: { value: number; max: number; label: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90">
          <circle cx="48" cy="48" r={radius} fill="none" stroke="var(--border)" strokeWidth="6" />
          <motion.circle
            cx="48" cy="48" r={radius} fill="none"
            stroke="var(--indigo)" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-lg font-bold">{value}</span>
          <span className="text-[10px] text-[var(--text-secondary)]">solved</span>
        </div>
      </div>
      <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>
    </div>
  );
}

export default function AchievementsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [leet, setLeet] = useState<LeetStats | null>(null);
  const [sr, setSr] = useState<SrStats | null>(null);

  useEffect(() => {
    fetch("/api/leetcode").then(r => r.json()).then(d => !d.error && setLeet(d)).catch(() => {});
    fetch("/api/skillrack").then(r => r.json()).then(d => !d.error && setSr(d)).catch(() => {});
  }, []);

  const lc = {
    totalSolved: leet?.totalSolved ?? LEETCODE_STATS.totalSolved,
    easy: leet?.easy ?? LEETCODE_STATS.easy,
    medium: leet?.medium ?? LEETCODE_STATS.medium,
    hard: leet?.hard ?? LEETCODE_STATS.hard,
  };

  const skillrack = {
    problemsSolved: sr?.problemsSolved ?? SKILLRACK_STATS.problemsSolved,
    certificates: sr?.certificates ?? SKILLRACK_STATS.certificates,
    score: sr?.score ?? SKILLRACK_STATS.score,
  };

  const difficulties = [
    { label: "Easy", value: lc.easy, max: 60 },
    { label: "Medium", value: lc.medium, max: 70 },
    { label: "Hard", value: lc.hard, max: 20 },
  ];

  return (
    <section id="achievements" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="tag mb-4 inline-block">Achievements</span>
          <h2 className="section-title">
            Numbers that <span className="gradient-text">tell the story.</span>
          </h2>
          <p className="section-subtitle max-w-xl">
            Consistency over time. Every problem solved is a rep at the gym.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* LeetCode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl" style={{ background: "var(--indigo-glow)" }}>
                <Code2 className="w-5 h-5" style={{ color: "var(--indigo)" }} />
              </div>
              <div>
                <h3 className="font-bold text-lg">LeetCode</h3>
                <p className="text-xs text-[var(--text-secondary)]">Algorithmic Problem Solving</p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-2xl font-black">{lc.totalSolved}</div>
                <div className="text-xs text-[var(--text-secondary)]">Problems Solved</div>
              </div>
            </div>

            <div className="flex justify-around mb-6">
              {difficulties.map(d => (
                <CircularProgress key={d.label} value={d.value} max={d.max} label={d.label} />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {difficulties.map(d => (
                <div key={d.label} className="px-3 py-2 rounded-xl glass text-center">
                  <div className="text-xl font-bold">{d.value}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{d.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <TrendingUp className="w-4 h-4" />
                Max Rating: <span className="text-[var(--text-primary)] font-medium ml-1">{LEETCODE_STATS.maxRating}</span>
              </div>
              <a
                href={LEETCODE_STATS.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg btn-primary"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Profile
              </a>
            </div>
          </motion.div>

          {/* Skillrack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl" style={{ background: "var(--violet-glow)" }}>
                <Trophy className="w-5 h-5" style={{ color: "var(--violet)" }} />
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
                className="text-6xl font-black mb-2"
                style={{ color: "var(--violet)" }}
              >
                {skillrack.problemsSolved}
              </motion.div>
              <p className="text-[var(--text-secondary)] font-medium">Programs Solved</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="glass p-4 rounded-xl text-center">
                <Award className="w-5 h-5 mx-auto mb-1" style={{ color: "var(--indigo)" }} />
                <div className="font-bold text-lg">{skillrack.certificates}</div>
                <div className="text-xs text-[var(--text-secondary)]">Certificates</div>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <Target className="w-5 h-5 mx-auto mb-1" style={{ color: "var(--violet)" }} />
                <div className="font-bold text-lg">{skillrack.score.toLocaleString()}</div>
                <div className="text-xs text-[var(--text-secondary)]">Score</div>
              </div>
            </div>

            <div className="mt-4 flex justify-end pt-4 border-t border-[var(--border)]">
              <a
                href={SKILLRACK_STATS.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg btn-primary"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Profile
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
