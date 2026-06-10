"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, Zap } from "lucide-react";
import { PERSONAL, STATS, LEETCODE_STATS } from "@/app/lib/data";
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

  useEffect(() => {
    fetch("/api/leetcode")
      .then((r) => r.json())
      .then((d) => !d.error && setLeetTotal(d.totalSolved))
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
      deleting ? 60 : 110
    );
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, stringIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-purple/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent-cyan/5 blur-3xl" />
        <div className="absolute inset-0 bg-dots opacity-30" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/20 text-sm font-medium text-brand-400 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Open to Work · Available for Freelance
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">Sujith</span>{" "}
          <span className="animate-float inline-block">👋</span>
        </motion.h1>

        {/* Typed text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl font-semibold text-[var(--text-secondary)] mb-6 h-10"
        >
          <span className="gradient-text">{typed}</span>
          <span className="animate-pulse text-brand-400 ml-0.5">|</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building scalable web applications and intelligent solutions that solve real-world problems.
          Passionate about clean code, modern design, and impactful technology.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a href="#projects" className="btn-primary flex items-center gap-2">
            <Zap className="w-4 h-4" />
            View Projects
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
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-16"
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
              className="p-3 rounded-xl glass hover:scale-110 hover:border-brand-500/40 transition-all duration-200"
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
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {STATS.map((stat, i) => {
            const value = stat.label === "LeetCode Problems" ? String(leetTotal) : stat.value;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="glass-card p-4 text-center group"
              >
                <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
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
