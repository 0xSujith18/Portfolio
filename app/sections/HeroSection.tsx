"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, ArrowRight } from "lucide-react";
import { PERSONAL, STATS, LEETCODE_STATS, SKILLRACK_STATS } from "@/app/lib/data";
import { useEffect, useState } from "react";

const TYPED_STRINGS = [
  "Full Stack Developer",
  "Problem Solver",
  "Cloud Enthusiast",
  "AI Builder",
];

export default function HeroSection() {
  const [typed, setTyped] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [leetTotal, setLeetTotal] = useState(LEETCODE_STATS.totalSolved);
  const [srTotal, setSrTotal] = useState(SKILLRACK_STATS.problemsSolved);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((r) => r.json())
      .then((d) => !d.error && setLeetTotal(d.totalSolved))
      .catch(() => {});
    fetch("/api/skillrack")
      .then((r) => r.json())
      .then((d) => !d.error && setSrTotal(d.problemsSolved))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const current = TYPED_STRINGS[stringIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (charIndex < current.length) {
            setTyped(current.slice(0, charIndex + 1));
            setCharIndex((c) => c + 1);
          } else {
            setTimeout(() => setDeleting(true), 1800);
          }
        } else {
          if (charIndex > 0) {
            setTyped(current.slice(0, charIndex - 1));
            setCharIndex((c) => c - 1);
          } else {
            setDeleting(false);
            setStringIndex((i) => (i + 1) % TYPED_STRINGS.length);
          }
        }
      },
      deleting ? 55 : 100
    );
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, stringIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full dark:bg-white/[0.03] bg-black/[0.03] blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black mb-4 tracking-tight leading-none"
          style={{ letterSpacing: "-0.04em" }}
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">Sujith</span>
        </motion.h1>

        {/* Typed text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-xl md:text-3xl font-mono font-medium text-[var(--text-secondary)] mb-8 h-10 flex items-center justify-center gap-1"
        >
          <span className="text-[var(--text-primary)]">&gt;</span>
          <span>{typed}</span>
          <span className="w-[2px] h-6 bg-[var(--text-primary)] animate-pulse inline-block ml-0.5" />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building scalable web applications and intelligent solutions that solve real-world problems.
          Passionate about clean code, modern design, and impactful technology.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a href="#projects" className="btn-primary flex items-center gap-2 group">
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contact" className="btn-secondary flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Contact Me
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex items-center justify-center gap-3 mb-16"
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
              className="p-3 rounded-xl glass hover:scale-110 hover:border-[var(--accent)] transition-all duration-200"
              aria-label={label}
            >
              <Icon className="w-5 h-5 text-[var(--text-secondary)]" />
            </a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
        >
          {STATS.map((stat, i) => {
            const value = stat.label === "LeetCode Problems"
              ? String(leetTotal)
              : stat.label === "Skillrack Problems"
              ? `${srTotal}+`
              : stat.value;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="glass-card p-4 text-center group cursor-default"
              >
                <div className="text-2xl md:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                  {value}
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-1 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-secondary)]"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
