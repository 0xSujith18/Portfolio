"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Mail, Github, Linkedin, CheckCircle, AlertCircle } from "lucide-react";
import { PERSONAL } from "@/app/lib/data";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_siye5nk";
const TEMPLATE_ID = "template_mbqbj19";
const PUBLIC_KEY = "JuI_O1BST5b72N1MR";

const inputClass =
  "w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-secondary)]";

export default function ContactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
        PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const socials = [
    { label: "GitHub", href: PERSONAL.github, icon: Github, username: "@0xSujith18" },
    { label: "LinkedIn", href: PERSONAL.linkedin, icon: Linkedin, username: "m-s-sujith" },
    { label: "Email", href: `mailto:${PERSONAL.email}`, icon: Mail, username: PERSONAL.email },
  ];

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Get In Touch</span>
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Have a project in mind or just want to say hi? I&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 flex flex-col gap-4"
          >
            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-2">Let&apos;s work together</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                I&apos;m currently open to full-time opportunities, freelance projects, and exciting collaborations.
                Let&apos;s build something amazing together!
              </p>
            </div>

            {socials.map(({ label, href, icon: Icon, username }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center gap-3 hover:border-[var(--accent)] transition-all"
              >
                <div className="p-2 rounded-lg bg-[var(--glass-border)]">
                  <Icon className="w-4 h-4 text-[var(--text-primary)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)]">{label}</p>
                  <p className="text-sm font-medium">{username}</p>
                </div>
              </a>
            ))}


          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Name</label>
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name" className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Email</label>
                  <input
                    type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com" className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Subject</label>
                <input
                  type="text" required value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Project inquiry, collaboration, etc." className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Message</label>
                <textarea
                  required rows={5} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project or idea..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3"
                >
                  <CheckCircle className="w-4 h-4" />
                  Message sent! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4" />
                  Something went wrong. Please try again.
                </div>
              )}

              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 disabled:opacity-70"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {status === "sending" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[var(--bg-primary)]/30 border-t-[var(--bg-primary)] rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
