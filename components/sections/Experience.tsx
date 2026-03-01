"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, GraduationCap, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    type: "work",
    role: "Frontend Engineer",
    company: "Shipthis",
    period: "Mar 2024 — Present",
    description: "Working as a frontend engineer while contributing across AI systems, backend API modules, and internal developer tooling. Collaborating closely with backend teams to build AI-powered logistics features.",
    achievements: [
      "Integrated LLM-based features into production workflows",
      "Developed and maintained Python API modules",
      "Worked on AI-driven backend services and RAG integrations",
      "Managed internal developer portal and package modules",
      "Contributed across frontend and backend architecture"
    ],
    link: "https://shipthis.co"
  },

  {
    type: "work",
    role: "Software Developer",
    company: "TechWire Studio",
    period: "Dec 2023 — Jul 2024",
    description: "Built scalable frontend applications using React, Next.js, and Tailwind with focus on performance and clean UI architecture.",
    achievements: [
      "Optimized frontend performance",
      "Built reusable component systems",
      "Deployed applications on Vercel"
    ],
    link: "https://example.com"
  },

  {
    type: "work",
    role: "Freelance Full-Stack Developer",
    company: "Independent",
    period: "Jul 2023 — Dec 2023",
    description: "Architected and delivered full-stack systems including multi-tenant SaaS platforms, marketplaces, and backend-driven applications.",
    achievements: [
      "Shipped multi-tenant SaaS (Corely)",
      "Built scalable FastAPI backends",
      "Managed end-to-end product lifecycle"
    ],
    link: "https://example.com"
  },

  {
    type: "work",
    role: "Junior Software Developer Intern",
    company: "Skropay",
    period: "Aug 2022 — Jan 2023",
    description: "Developed React-based UI components and assisted in backend API integrations.",
    achievements: [
      "Built dynamic React components",
      "Improved deployment workflows",
      "Collaborated in agile team"
    ],
    link: "https://example.com"
  },

  {
    type: "edu",
    role: "B.Tech in Computer Science and Engineering",
    company: "NIT Rourkela",
    period: "2019 — Dec 2023",
    description: "Focused on Data Structures, Algorithms, DBMS, and Computer Networks.",
    achievements: [
      "Computer Science Graduate",
      "Strong foundation in core CS subjects"
    ],
    link: "https://nitrkl.ac.in"
  }
];

export default function Experience() {
  return (
    <div className="relative space-y-12">
      {/* Central Line */}
      <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:left-1/2" />

      {experiences.map((exp, index) => (
        <motion.div
          key={exp.role + exp.period}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className={cn(
            "relative flex flex-col md:flex-row gap-8 items-start",
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          )}
        >
          {/* Timeline Dot */}
          <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-highlight-text rounded-full -translate-x-1/2 mt-6 z-10 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />

          <div className="w-full md:w-[45%] pl-10 md:pl-0">
            <div className={cn(
              "p-6 md:p-8 bg-zinc-900/30 border border-white/5 rounded-2xl md:rounded-3xl transition-colors hover:bg-zinc-900/50 group",
              index % 2 === 0 ? "md:text-right" : "md:text-left"
            )}>
              <a 
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link block"
              >
                <div className={cn(
                  "flex items-center gap-3 mb-4",
                  index % 2 === 0 ? "md:justify-end" : ""
                )}>
                  {exp.type === "work" ? <Briefcase className="w-4 h-4 text-primary-text" /> : <GraduationCap className="w-4 h-4 text-primary-text" />}
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{exp.period}</span>
                </div>

                <h3 className="text-2xl font-bold text-highlight-text mb-1 group-hover/link:text-white transition-colors">
                  {exp.role}
                </h3>
                <p className="text-primary-text font-medium mb-4 flex items-center gap-2 group-hover/link:text-highlight-text transition-colors">
                  {exp.company}
                  <Zap className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </p>
              </a>
              
              <p className="text-sm text-zinc-500 leading-relaxed font-light mb-6">
                {exp.description}
              </p>

              <div className={cn(
                "flex flex-wrap gap-2",
                index % 2 === 0 ? "md:justify-end" : ""
              )}>
                {exp.achievements.map(ach => (
                  <span key={ach} className="text-[9px] px-2 py-1 bg-white/5 border border-white/10 rounded uppercase tracking-tighter text-zinc-400">
                    {ach}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Spacer for the other side on MD+ */}
          <div className="hidden md:block w-[45%]" />
        </motion.div>
      ))}
    </div>
  );
}
