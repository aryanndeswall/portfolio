"use client";
import React from "react";
import Link from "next/link";
import { BoxReveal } from "../reveal-animations";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Skills structured into core categories with real project evidence
const SKILLS_SHOWCASE = [
  {
    title: "Frontend Development",
    skills: [
      { name: "Next.js", value: 95, level: "Expert", evidence: "Primary Framework (AuditAI)", color: "#a855f7", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "React.js", value: 95, level: "Expert", evidence: "Daily Driver (Agri-Score/AgriChain)", color: "#61dafb", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", value: 90, level: "Advanced", evidence: "Production Typed (AuditAI)", color: "#007acc", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS", value: 95, level: "Expert", evidence: "Responsive Layouts (Global)", color: "#38bdf8", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
      { name: "Flutter & Dart", value: 85, level: "Advanced", evidence: "Cross-Platform Mobile Apps", color: "#02569B", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" }
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", value: 90, level: "Advanced", evidence: "Core Server Runtime (AgriChain)", color: "#6cc24a", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", value: 88, level: "Advanced", evidence: "RESTful API Architecture", color: "#808080", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Python (FastAPI)", value: 85, level: "Advanced", evidence: "Model Inference Host (Agri-Score)", color: "#ffd43b", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
    ]
  },
  {
    title: "Databases & ORM",
    skills: [
      { name: "PostgreSQL", value: 88, level: "Advanced", evidence: "Data Store Layer (AuditAI)", color: "#336791", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Supabase", value: 92, level: "Expert", evidence: "Real-Time DB (Agri-Score/Audit)", color: "#3ecf8e", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
      { name: "MongoDB", value: 85, level: "Advanced", evidence: "Document Store (AgriChain)", color: "#47a248", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Prisma ORM", value: 90, level: "Advanced", evidence: "Type-Safe DB Queries", color: "#8a94e6", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" }
    ]
  },
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "ML Inference", value: 80, level: "Intermediate", evidence: "Credit Risk Scoring Models", color: "#ff6b6b", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Spatial Land AI", value: 85, level: "Advanced", evidence: "Google Earth Engine Integration", color: "#2ecc71", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" }
    ]
  },
  {
    title: "Blockchain & Web3",
    skills: [
      { name: "Solidity", value: 85, level: "Advanced", evidence: "EVM Smart Contracts (AgriChain)", color: "#555555", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
      { name: "Web3 / ethers.js", value: 85, level: "Advanced", evidence: "Decent. Escrows & Voting", color: "#e0a96d", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
    ]
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Docker", value: 80, level: "Intermediate", evidence: "App Containerization", color: "#2496ed", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Git & GitHub", value: 92, level: "Expert", evidence: "Version Control & CI/CD", color: "#f1502f", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Vercel", value: 95, level: "Expert", evidence: "Production Deployments", color: "#ffffff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
      { name: "Firebase", value: 85, level: "Advanced", evidence: "Real-Time Auth (AgriChain)", color: "#ffca28", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
    ]
  }
];

const SkillsSection = () => {
  return (
    <section id="skills" className="w-full relative min-h-screen pb-32">
      {/* ── ZONE A: Sticky Interactive Keyboard Area (100vh scroll container) ── */}
      <div className="w-full h-screen relative flex flex-col items-center justify-start pt-24 pointer-events-none">
        <div className="top-[70px] sticky mb-96 pointer-events-auto">
          <Link href={"#skills"}>
            <BoxReveal width="100%">
              <h2
                className={cn(
                  "bg-clip-text text-4xl text-center text-transparent md:text-7xl font-bold tracking-tight",
                  "bg-gradient-to-b from-black/80 to-black/50",
                  "dark:bg-gradient-to-b dark:from-white/90 dark:to-white/30 dark:bg-opacity-50"
                )}
              >
                SKILLS
              </h2>
            </BoxReveal>
          </Link>
          <p className="mx-auto mt-4 line-clamp-4 max-w-3xl font-normal text-base text-center text-neutral-400">
            (hint: press a key)
          </p>
        </div>
      </div>

      {/* ── ZONE B: Premium Recruiter-Friendly Showcase Grid ── */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 mt-12 md:mt-24">
        {/* Decorative Grid Separator */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mb-16" />

        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4 tracking-wide uppercase font-mono">
            Technical Arsenal
          </h3>
          <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto">
            A comprehensive, recruiter-friendly summary of my professional competencies, backed by real project implementation evidence.
          </p>
        </div>

        {/* Masonry-style Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="list" aria-label="Skills Category Showcase">
          {SKILLS_SHOWCASE.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="glass-skill-card rounded-2xl p-6 md:p-8 backdrop-blur-md relative border border-white/10 shadow-xl shadow-black/40 overflow-hidden group"
              role="listitem"
            >
              {/* Card corner light sweep decoration */}
              <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent group-hover:w-full transition-all duration-700" />

              <h4 className="text-xl font-bold text-slate-100 mb-6 font-mono tracking-wide flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
                {category.title}
              </h4>

              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    {/* Skill Info Row */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        {/* Safe devicon rendering with secure fallback styling */}
                        <div className="w-6 h-6 flex items-center justify-center rounded bg-slate-950/40 p-[2px] border border-white/5">
                          <img
                            src={skill.icon}
                            alt={`${skill.name} icon`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback if image fails to load
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>
                        <span className="font-medium text-slate-200 font-sans">{skill.name}</span>
                      </div>
                      
                      {/* Level and Value indicator */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-mono px-2 py-[2px] rounded-full border border-purple-500/30 text-purple-400 bg-purple-950/20">
                          {skill.level}
                        </span>
                        <span className="font-mono text-xs text-neutral-400">{skill.value}%</span>
                      </div>
                    </div>

                    {/* Glowing Progress Bar */}
                    <div className="w-full bg-slate-950/80 rounded-full h-[6px] overflow-hidden border border-white/5">
                      <motion.div
                        className="h-full rounded-full skill-glow-bar"
                        style={{
                          backgroundColor: skill.color,
                          "--skill-glow-color": skill.color,
                          width: `${skill.value}%`
                        } as any}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        role="progressbar"
                        aria-valuenow={skill.value}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>

                    {/* Project Evidence Label */}
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 pl-9 font-mono">
                      <span className="text-purple-400">✦</span>
                      <span>{skill.evidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
