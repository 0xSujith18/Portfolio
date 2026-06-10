"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User } from "lucide-react";

type Message = { role: "user" | "bot"; text: string };

const RESPONSES: Record<string, string> = {
  default:
    "I'm Sujith's AI assistant! Ask me about his skills, projects, experience, or how to get in touch. 🚀",
  skills:
    "Sujith is proficient in React, Next.js, TypeScript, Node.js, Python, FastAPI, MongoDB, MySQL, AWS, and Docker. He excels in both frontend and backend development! 💪",
  projects:
    "Sujith has built an AI Customer Support Chatbot, LLM-based Document Search System, Smart Data Cleaner, Rainwater Harvesting Assessment Platform, and several full stack web apps! 🛠️",
  leetcode:
    "Sujith has solved 100+ LeetCode problems covering arrays, trees, graphs, DP, and more. He's also solved 1000+ problems on Skillrack! 🏆",
  contact:
    "You can reach Sujith via email at sujith@example.com, or connect on LinkedIn and GitHub. The contact form below works too! 📬",
  experience:
    "Sujith is a Computer Science student (2021-2025) with hands-on experience building full stack applications, AI tools, and cloud-deployed systems. 🎓",
  ai:
    "Sujith has worked with LangChain, OpenAI APIs, vector databases (Pinecone), and RAG architectures. He's built production AI chatbots and document intelligence systems! 🤖",
  cloud:
    "Sujith has experience with AWS (EC2, S3, Lambda), Docker containerization, and GitHub Actions CI/CD pipelines for automated deployments! ☁️",
  hire:
    "Sujith is open to exciting opportunities! He's a quick learner who loves building impactful products. Drop him a message through the contact form below! 🌟",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack")) return RESPONSES.skills;
  if (lower.includes("project") || lower.includes("work") || lower.includes("built")) return RESPONSES.projects;
  if (lower.includes("leetcode") || lower.includes("skillrack") || lower.includes("problem")) return RESPONSES.leetcode;
  if (lower.includes("contact") || lower.includes("reach") || lower.includes("email")) return RESPONSES.contact;
  if (lower.includes("experience") || lower.includes("background") || lower.includes("education")) return RESPONSES.experience;
  if (lower.includes("ai") || lower.includes("ml") || lower.includes("llm") || lower.includes("chatbot")) return RESPONSES.ai;
  if (lower.includes("cloud") || lower.includes("aws") || lower.includes("docker")) return RESPONSES.cloud;
  if (lower.includes("hire") || lower.includes("job") || lower.includes("available") || lower.includes("freelance")) return RESPONSES.hire;
  return RESPONSES.default;
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 I'm Sujith's AI assistant. Ask me anything about him!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(userMsg) }]);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 glass-card shadow-2xl shadow-brand-500/20 flex flex-col overflow-hidden"
            style={{ height: "420px" }}
          >
            <div className="flex items-center gap-3 p-4 border-b border-[var(--border)] bg-gradient-to-r from-brand-600/20 to-accent-purple/20">
              <div className="p-1.5 rounded-lg bg-brand-500/20">
                <Bot className="w-4 h-4 text-brand-400" />
              </div>
              <div>
                <p className="text-sm font-semibold">Sujith's AI Assistant</p>
                <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Online
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                      msg.role === "bot" ? "bg-brand-500/20" : "bg-accent-purple/20"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <Bot className="w-3 h-3 text-brand-400" />
                    ) : (
                      <User className="w-3 h-3 text-accent-purple" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] text-xs px-3 py-2 rounded-xl leading-relaxed ${
                      msg.role === "bot"
                        ? "bg-white/5 text-[var(--text-primary)]"
                        : "bg-brand-500/20 text-[var(--text-primary)]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-brand-400" />
                  </div>
                  <div className="bg-white/5 px-3 py-2 rounded-xl flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t border-[var(--border)]">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/5 border border-[var(--border)] rounded-lg px-3 py-2 text-xs outline-none focus:border-brand-500/50 transition-colors placeholder:text-[var(--text-secondary)]"
                />
                <button
                  onClick={send}
                  disabled={!input.trim()}
                  className="p-2 rounded-lg bg-brand-500 hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <div className="flex gap-1 mt-2 flex-wrap">
                {["Skills", "Projects", "LeetCode", "Contact"].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setInput(q);
                      setTimeout(send, 50);
                    }}
                    className="text-xs px-2 py-1 rounded-full bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 transition-colors border border-brand-500/20"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl btn-primary flex items-center justify-center shadow-lg shadow-brand-500/40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div key="bot" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <Sparkles className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
