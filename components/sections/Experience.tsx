"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Entry = {
  type: "work" | "edu" | "award";
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  link?: string;
};

const experiences: Entry[] = [
  {
    type: "award",
    role: "Team Lead · Semi-finalist",
    company: "Bessemer Tech Catalyst Hackathon",
    period: "Sep 2026",
    description: "Led team Amdak (4 members) to the semi-final round with aivar, an autonomous agent that explores a web app and generates, runs, and self-heals Playwright end-to-end tests — built for a problem statement by Aivar Innovations. Organized by Bessemer Venture Partners India and Polaris School of Technology.",
    achievements: [
      "Semi-finalist",
      "8-stage orchestrator state machine",
      "Self-healing Playwright tests",
      "Cross-provider LLM failover"
    ],
    link: "https://github.com/ali-mandela/aivar"
  },

  {
    type: "work",
    role: "Software Engineer",
    company: "Shipthis",
    period: "Mar 2025 — Present",
    description: "Building LLM-powered features, AI document workflows, developer platform SDKs, and CI/CD pipelines for logistics products.",
    achievements: [
      "NL-to-report generator (<1 min, 96% accuracy)",
      "Magic Drop: ~4K docs/week, ~73% fewer LLM tokens",
      "Python SDK, JS API package & Lit Web Components",
      "Shipthis Developer Portal + CI/CD",
      "EcoFreight (Go + Next.js), ~40K shipments/week",
      "Custom Templates"
    ],
    link: "https://shipthis.co"
  },

  {
    type: "work",
    role: "Software Developer",
    company: "TechWire Studio",
    period: "Apr 2024 — Jan 2025",
    description: "Sole developer on AskLuxor, a real estate marketplace — a Node.js/Express REST API with MongoDB and JWT authentication, and a React/Vite frontend with Redux Toolkit, deployed end-to-end.",
    achievements: [
      "Role-based Admin, Agent & public portals",
      "Property & agent search and filtering",
      "2-week release cadence"
    ],
    link: "https://www.techwire.studio"
  },

  {
    type: "work",
    role: "Software Developer",
    company: "Dr. Khan Classes Pvt. Ltd.",
    period: "Jun 2023 — Apr 2024",
    description: "Delivered full-stack client applications and domain-specific tools using Node.js, Express, Python, MongoDB, and Firebase — from requirements gathering through production deployment.",
    achievements: [
      "Pragathi e-commerce, job portal, Pvt Classes",
      "AI chatbot",
      "Doctor management platform",
      "Digital library system"
    ]
  },

  {
    type: "work",
    role: "Software Developer Intern",
    company: "Skropay Fintech",
    period: "Aug 2022 — Jan 2023",
    description: "Built marketing websites, a reusable React component library, and a pre-launch onboarding portal for a fintech startup.",
    achievements: [
      "4 pixel-perfect marketing websites",
      "Reusable React component library",
      "Onboarding portal (300+ signups)"
    ]
  },

  {
    type: "edu",
    role: "B.Tech in Computer Science and Engineering",
    company: "NIT Rourkela",
    period: "2019 — 2023",
    description: "Core coursework in Data Structures and Algorithms, DBMS, Computer Networks, Operating Systems, and Discrete Mathematics.",
    achievements: [
      "NCC Cadet Captain",
      "Coordinator, Innovision (Tech Fest)",
      "Coordinator, Nitrutsav (Cultural Fest)"
    ],
    link: "https://nitrkl.ac.in"
  }
];

const iconFor = (type: Entry["type"]) =>
  type === "work" ? Briefcase : type === "edu" ? GraduationCap : Trophy;

export default function Experience() {
  return (
    <div className="relative space-y-12">
      {/* Central Line */}
      <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:left-1/2" />

      {experiences.map((exp, index) => {
        const Icon = iconFor(exp.type);
        const header = (
          <>
            <div className={cn(
              "flex items-center gap-3 mb-4",
              index % 2 === 0 ? "md:justify-end" : ""
            )}>
              <Icon className="w-4 h-4 text-primary-text" />
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{exp.period}</span>
            </div>

            <h3 className="text-2xl font-bold text-highlight-text mb-1 group-hover/link:text-white transition-colors">
              {exp.role}
            </h3>
            <p className="text-primary-text font-medium mb-4 flex items-center gap-2 group-hover/link:text-highlight-text transition-colors">
              {exp.company}
              {exp.link && <Zap className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />}
            </p>
          </>
        );

        return (
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
                {exp.link ? (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link block"
                  >
                    {header}
                  </a>
                ) : (
                  <div className="group/link block">{header}</div>
                )}

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
        );
      })}
    </div>
  );
}
