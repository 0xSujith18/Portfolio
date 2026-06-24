"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Download } from "lucide-react";
import { PERSONAL, LEETCODE_STATS, SKILLRACK_STATS } from "@/app/lib/data";
import { useEffect, useState } from "react";

const ROLES = ["Full Stack Developer", "Problem Solver", "Cloud Enthusiast", "AI Builder"];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [leetTotal, setLeetTotal] = useState(LEETCODE_STATS.totalSolved);
  const [srTotal, setSrTotal] = useState(SKILLRACK_STATS.problemsSolved);

  useEffect(() => {
    fetch("/api/leetcode").then(r => r.json()).then(d => !d.error && setLeetTotal(d.totalSolved)).catch(() => {});
    fetch("/api/skillrack").then(r => r.json()).then(d => !d.error && setSrTotal(d.problemsSolved)).catch(() => {});
  }, []);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setTyped(current.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIndex > 0) {
          setTyped(current.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        } else {
          setDeleting(false);
          setRoleIndex(i => (i + 1) % ROLES.length);
        }
      }
    }, deleting ? 45 : 95);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  const stats = [
    { value: String(leetTotal), label: "LeetCode solved", color: "var(--indigo)" },
    { value: `${srTotal}+`, label: "Skillrack problems", color: "var(--violet)" },
    { value: "5+", label: "Projects shipped", color: "var(--indigo)" },
    { value: "15+", label: "Technologies", color: "var(--violet)" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[120px] bg-blue-400/[0.07] dark:bg-blue-500/[0.05]" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full blur-[100px] bg-emerald-400/[0.07] dark:bg-emerald-500/[0.05]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — intro */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black mb-3 leading-[1.05]"
              style={{ letterSpacing: "-0.04em" }}
            >
              Hey, I&apos;m<br />
              <span className="gradient-text">Sujith.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="flex items-center gap-2 mb-6 h-8"
            >
              <span className="font-mono font-bold text-xl" style={{ color: "var(--indigo)" }}>{">"}</span>
              <span className="text-lg md:text-xl font-mono text-[var(--text-secondary)]">{typed}</span>
              <span className="w-[2px] h-5 rounded-full animate-pulse" style={{ background: "var(--indigo)" }} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-8 max-w-lg"
            >
              I build things for the web — fast, accessible, and thoughtfully crafted.
              A <span className="text-[var(--text-primary)] font-semibold">CS sophomore</span> who
              turns curiosity into production-ready software.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a href="#projects" className="btn-indigo flex items-center gap-2 group">
                See My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={PERSONAL.resumeUrl} download className="btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.52 }}
              className="flex items-center gap-3"
            >
              {[
                { href: PERSONAL.github, icon: Github, label: "GitHub" },
                { href: PERSONAL.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${PERSONAL.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl glass hover:scale-110 transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--indigo)] transition-colors" />
                </a>
              ))}
              <span className="text-[var(--text-secondary)] text-xs ml-1 font-mono">@0xSujith18</span>
            </motion.div>
          </div>

          {/* Right — identity + stats */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="glass-card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] bg-blue-400/10 dark:bg-blue-500/10" />
              <div className="relative z-10">
                <div className="text-5xl mb-4">👨‍💻</div>
                <h2 className="text-2xl font-black mb-1">Sujith M S</h2>
                <p className="text-[var(--text-secondary)] text-sm mb-4">Full Stack Developer · B.E. CSE, SECE</p>
                <div className="flex flex-wrap gap-2">
                  <span className="tag-indigo">React & Node</span>
                  <span className="tag-violet">AWS & Cloud</span>
                  <span className="tag">DSA Enthusiast</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="glass-card p-5 text-center"
                >
                  <div className="text-3xl font-black mb-0.5" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-[var(--text-secondary)] font-medium">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
