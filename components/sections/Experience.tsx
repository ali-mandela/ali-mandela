"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, GraduationCap, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    type: "work",
    role: "Software Engineer",
    company: "Shipthis",
    period: "Mar 2025 — Present",
    description: "Engineering developer platform infrastructure and LLM integrations — spanning multi-tenant SaaS, microservices, async APIs, and real-time systems.",
    achievements: [
      "NL-to-report generator (96% accuracy)",
      "Python SDK & developer platform infra",
      "Shipthis Developer Portal + CI/CD",
      "Magic Drop AI logistics optimization",
      "EcoFreight carbon insights (Go + Next.js)"
    ],
    link: "https://shipthis.co"
  },

  {
    type: "work",
    role: "Software Developer",
    company: "TechWire Studio",
    period: "Dec 2023 — Jul 2024",
    description: "Sole developer on a real estate marketplace portal — owned full-stack architecture, REST API design, and deployments end-to-end using the MERN stack.",
    achievements: [
      "Modular MERN features (listings, search, users)",
      "RBAC across Admin / Agent / User roles",
      "2-week release cadence"
    ],
    link: "https://askluxor.onrender.com"
  },

  {
    type: "work",
    role: "Freelance Full-Stack Developer",
    company: "Independent",
    period: "Jul 2023 — Jul 2024",
    description: "Delivered 10+ full-stack web and mobile projects across e-commerce, CMS, food delivery, and academic assistance — from client requirements to production.",
    achievements: [
      "Built FLN academic platform (100+ active users)",
      "Real-time WebSocket chat & async tasks",
      "10+ production projects shipped"
    ],
    link: "https://github.com/ali-mandela"
  },

  {
    type: "work",
    role: "Software Developer Intern",
    company: "Skropay Fintech",
    period: "Aug 2022 — Jan 2023",
    description: "Built marketing websites and a reusable React component library for a fintech startup's early product development.",
    achievements: [
      "4 pixel-perfect marketing websites",
      "Reusable React component library",
      "Onboarding portal (300+ signups)"
    ],
    link: "https://github.com/ali-mandela"
  },

  {
    type: "edu",
    role: "B.Tech in Computer Science and Engineering",
    company: "NIT Rourkela",
    period: "2019 — 2023",
    description: "Focused on Data Structures, Algorithms, DBMS, Computer Networks, Operating Systems, and Discrete Mathematics.",
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
