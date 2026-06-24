"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL, NAV_LINKS } from "@/app/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xl font-black tracking-tight text-[var(--text-primary)]">&lt;Sujith /&gt;</span>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Full Stack Developer · Problem Solver · Cloud Enthusiast
            </p>
          </div>

          <div className="flex items-center gap-1">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
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
                className="p-2 rounded-lg glass hover:scale-110 transition-all duration-200 hover:border-[var(--accent)]"
                aria-label={label}
              >
                <Icon className="w-4 h-4 text-[var(--text-secondary)]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)]" />
      </div>
    </footer>
  );
}
