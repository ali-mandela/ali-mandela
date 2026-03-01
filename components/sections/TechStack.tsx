"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  Cloud, 
  Layers, 
  Monitor, 
  ShieldCheck, 
  BrainCircuit, 
  Terminal, 
  GitBranch 
} from "lucide-react";

const stack = [
  { 
    name: "Frontend", 
    items: ["Angular", "React", "Next.js", "TypeScript", "Tailwind"], 
    icon: Monitor 
  },

  { 
    name: "Backend", 
    items: ["FastAPI", "Node.js", "Go (Echo)", "REST APIs"], 
    icon: Layers 
  },

  { 
    name: "Data", 
    items: ["MongoDB", "PostgreSQL", "Aggregation Pipelines", "Tenant-Scoped Queries"], 
    icon: Database 
  },

  { 
    name: "Infra", 
    items: ["Docker", "Render", "Vercel", "Environment-Based Config"], 
    icon: Cloud 
  },

  { 
    name: "AI Systems", 
    items: ["OpenAI APIs", "RAG Pipelines", "Custom Agents", "Prompt Engineering"], 
    icon: BrainCircuit 
  },

  { 
    name: "Security & Architecture", 
    items: ["JWT Authentication", "RBAC", "Multi-Tenant Isolation", "API Design"], 
    icon: ShieldCheck 
  }
];

export default function TechStack() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stack.map((category, idx) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.05 }}
          whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          className="relative group p-6 md:p-8 bg-zinc-900/40 border border-white/5 rounded-2xl md:rounded-3xl overflow-hidden hover:border-white/10 transition-all"
        >
          {/* Categorical Icon */}
          <div className="mb-4 md:mb-6 inline-flex p-3 rounded-2xl bg-white/5 text-highlight-text group-hover:scale-110 transition-transform">
            <category.icon className="w-5 h-5" />
          </div>

          <h3 className="text-xl font-bold text-highlight-text mb-6 tracking-tight">
            {category.name}
          </h3>

          <div className="flex flex-wrap gap-2">
            {category.items.map(item => (
              <span 
                key={item} 
                className="text-[10px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-400 group-hover:text-highlight-text group-hover:bg-white/10 transition-colors font-mono uppercase tracking-widest"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Background Highlight */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      ))}
    </div>
  );
}
