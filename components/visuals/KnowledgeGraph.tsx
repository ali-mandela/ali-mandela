"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePortfolioMode } from "@/hooks/use-portfolio-mode";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  connections: string[];
}

const nodesByMode = {
  normal: [
    { id: "1", label: "FastAPI", x: 400, y: 200, connections: ["2", "3", "4", "8", "9"], link: "https://fastapi.tiangolo.com" },
    { id: "2", label: "Next.js", x: 600, y: 120, connections: ["1", "6"], link: "https://nextjs.org" },
    { id: "3", label: "Angular", x: 200, y: 120, connections: ["1", "6"], link: "https://angular.io" },
    { id: "4", label: "MongoDB", x: 250, y: 380, connections: ["1"], link: "https://www.mongodb.com" },
    { id: "5", label: "PostgreSQL", x: 550, y: 380, connections: ["1"], link: "https://www.postgresql.org" },
    { id: "6", label: "TypeScript", x: 400, y: 50, connections: ["2", "3"], link: "https://www.typescriptlang.org" },
    { id: "7", label: "Go", x: 750, y: 250, connections: ["10"], link: "https://go.dev" },
    { id: "8", label: "AI / LLM (OpenAI)", x: 650, y: 450, connections: ["1", "11"], link: "https://platform.openai.com" },
    { id: "9", label: "Python", x: 200, y: 250, connections: ["1", "8"], link: "https://www.python.org" },
    { id: "10", label: "Echo (Go)", x: 850, y: 300, connections: ["7"], link: "https://echo.labstack.com" },
    { id: "11", label: "RAG & Custom Agents", x: 450, y: 500, connections: ["8"], link: "https://en.wikipedia.org/wiki/Retrieval-augmented_generation" },
    { id: "12", label: "Docker", x: 750, y: 100, connections: ["1", "7"], link: "https://www.docker.com" }
  ],

  dev: [
    { id: "d1", label: "Multi-Tenant Architecture", x: 200, y: 150, connections: ["d2", "d3"] },
    { id: "d2", label: "Tenant Isolation (DB Scoped)", x: 400, y: 250, connections: ["d1", "d4"] },
    { id: "d3", label: "Role-Based Access Control", x: 150, y: 400, connections: ["d1"] },
    { id: "d4", label: "AI Integration (OpenAI APIs)", x: 600, y: 300, connections: ["d2", "d5"] },
    { id: "d5", label: "RAG Pipelines & Agents", x: 500, y: 480, connections: ["d4"] },
    { id: "d6", label: "Production Deployment (Dockerized)", x: 750, y: 150, connections: ["d2"] }
  ]
};

export default function KnowledgeGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mode } = usePortfolioMode();

  return (
    <div className="w-full overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
      <div ref={containerRef} className="relative min-w-[600px] md:min-w-full h-[500px] md:h-[600px] overflow-hidden bg-black/40 rounded-3xl border border-white/5 backdrop-blur-sm group">
        <div className="absolute top-6 md:top-8 left-6 md:left-8">
        <h3 className="text-sm font-mono text-highlight-text uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">Technical Ecosystem</h3>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {(mode === "normal" ? nodesByMode.normal : nodesByMode.dev).map((node: any) => 
          node.connections.map((targetId: string) => {
            const target = (mode === "normal" ? nodesByMode.normal : nodesByMode.dev).find((n: any) => n.id === targetId);
            if (!target) return null;
            return (
              <motion.line
                key={`${node.id}-${targetId}`}
                x1={node.x}
                y1={node.y}
                x2={target.x}
                y2={target.y}
                stroke="white"
                strokeOpacity="0.1"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            );
          })
        )}
      </svg>

      {(mode === "normal" ? nodesByMode.normal : nodesByMode.dev).map((node: any) => (
        <motion.a
          key={node.id}
          href={node.link || "#"}
          target={node.link ? "_blank" : undefined}
          rel={node.link ? "noopener noreferrer" : undefined}
          className="absolute flex items-center justify-center group/node"
          style={{ left: node.x - 40, top: node.y - 20 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-highlight-text/5 blur-md rounded-lg group-hover/node:bg-highlight-text/10 transition-colors" />
            <div className="relative px-4 py-2 bg-surface border border-border-ui rounded-lg text-xs font-mono text-primary-text hover:text-highlight-text hover:border-highlight-text/50 transition-all cursor-pointer">
              {node.label}
            </div>
          </div>
        </motion.a>
      ))}

      {/* Decorative Neural Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: [null, "-10%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      </div>
    </div>
  );
}
