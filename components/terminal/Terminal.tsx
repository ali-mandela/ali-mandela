"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FileNode {
  type: "file" | "dir";
  content?: string;
  children?: Record<string, FileNode>;
}

const vfs: Record<string, FileNode> = {
  "projects": {
    type: "dir",
    children: {
      "docbot.txt": { type: "file", content: "Project: DocBot. Multi-tenant AI support bot platform. FastAPI, LangChain, Qdrant, Celery/Redis, embeddable Lit widget." },
      "corely-saas.txt": { type: "file", content: "Project: Corely. Multi-tenant SaaS with FastAPI & Angular. Strict isolation & RBAC." },
      "kclasses-fln.txt": { type: "file", content: "Project: K Classes (FLN). Academic assistance platform, live at flntutors.com. Angular/TS + Python, real-time WebSocket chat." },
      "laaride.txt": { type: "file", content: "Project: LaaRide. Taxi-stand booking platform for Ladakh. FastAPI, MongoDB, Expo/React Native." },
      "fluid-ai.txt": { type: "file", content: "Project: fluid.ai. Autonomous document-generation agent. FastAPI + LangGraph plan-execute-reflect-revise loop." },
      "peanut-ai.txt": { type: "file", content: "Project: peanut_ai (RAGA Health Dashboard). B2B healthcare dashboard. React, TypeScript, Vite, Firebase." },
      "fletnix.txt": { type: "file", content: "Project: Fletnix. Movie catalog & recommendation demo. Angular + Node.js/Express." },
      "rategaurd.txt": { type: "file", content: "Project: rateGaurd. Python guarding/validation tool with a Streamlit dashboard." },
      "eplatform.txt": { type: "file", content: "Project: ePlatform. Ecommerce platform. React/Vite storefront + JavaScript backend." },
      "wassel.txt": { type: "file", content: "Project: Wassel. On-demand logistics for UAE. TypeScript/Expo + Python backend." },
      "truereturn.txt": { type: "file", content: "Project: truereturn. Product return validation system. Under active development." },
      "ai-agents.txt": { type: "file", content: "Project: AI/RAG system. Custom Agent orchestration with OpenAI APIs." },
      "askluxor.txt": { type: "file", content: "Project: Real Estate Marketplace. Node.js, Express, MongoDB. Multi-role property listings." },
      "rapid-foods.txt": { type: "file", content: "Project: Multi-role delivery system. React Native, Node.js. Order lifecycle management." }
    }
  },
  "experience": {
    type: "dir",
    children: {
      "shipthis.txt": { type: "file", content: "Software Engineer @ Shipthis (Mar 2025-Present). Developer platform infra & LLM integrations." },
      "techwire.txt": { type: "file", content: "Software Developer @ TechWire Studio (Dec 2023-Jul 2024). Sole dev, full-stack MERN, REST API design." },
      "freelance.txt": { type: "file", content: "Freelance Full-Stack Developer (Jul 2023-Jul 2024). 10+ projects incl. FLN academic platform (100+ users)." },
      "skropay.txt": { type: "file", content: "Software Developer Intern @ Skropay Fintech (Aug 2022-Jan 2023). Marketing sites, React component library, onboarding portal (300+ signups)." }
    }
  },
  "contact.txt": { type: "file", content: "Email: muhammadali.nitrkl@gmail.com | Phone: +91 9682184658" },
  "README.md": { type: "file", content: "# Muhammad Ali OS\nRun 'help' to see available commands." }
};

interface Command {
  cmd: string;
  output: string | React.ReactNode;
}

export default function Terminal() {
  const [history, setHistory] = useState<Command[]>([
    { cmd: "init", output: "Welcome to Mandela-OS v4.1.0. Identity: Muhammad Ali. Access Granted." },
    { cmd: "help", output: "Available commands: ls, cd, cat, hire, services, clear, whoami, skills, pwd, hobbies" }
  ]);
  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState<string[]>([]); // Empty means root
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const getDir = (path: string[]) => {
    let curr: Record<string, FileNode> = vfs;
    for (const p of path) {
      if (curr[p] && curr[p].type === "dir") {
        curr = curr[p].children || {};
      } else {
        return null;
      }
    }
    return curr;
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const args = input.trim().split(" ");
    const cmd = args[0].toLowerCase();
    let output: string | React.ReactNode = "";

    const currDir = getDir(currentPath);

    switch (cmd) {
      case "ls":
        if (!currDir) {
          output = "Error: internal VFS failure.";
        } else {
          output = Object.keys(currDir).map(k => currDir[k].type === "dir" ? `${k}/` : k).join("  ");
        }
        break;
      case "cd":
        const target = args[1];
        if (!target || target === "~") {
          setCurrentPath([]);
        } else if (target === "..") {
          setCurrentPath(currentPath.slice(0, -1));
        } else if (currDir && currDir[target] && currDir[target].type === "dir") {
          setCurrentPath([...currentPath, target]);
        } else {
          output = `cd: no such directory: ${target}`;
        }
        break;
      case "cat":
        const file = args[1];
        if (currDir && currDir[file] && currDir[file].type === "file") {
          output = currDir[file].content || "";
        } else {
          output = `cat: no such file: ${file}`;
        }
        break;
      case "pwd":
        output = "/" + currentPath.join("/");
        break;
      case "whoami":
        output = "Muhammad Ali | SaaS & AI Engineer | Building Scalable Intelligence";
        break;
      case "services":
        output = "1. SaaS & MVP Development\n2. AI Integration & Automation\n3. Backend Architecture & API Development\n4. Frontend Engineering & Developer Tooling";
        break;
      case "hire":
        output = "Let's build something exceptional.\nEmail: muhammadali.nitrkl@gmail.com\nPhone/WA: +91 9682184658\nLocation: Kargil, Leh & Ladakh / Bangalore / Remote";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "skills":
        output = "Python, TypeScript, JavaScript, FastAPI, Next.js, Angular, MongoDB, PostgreSQL, Redis, LangChain, RAG Pipelines, LLM Fine-Tuning (LoRA/Unsloth), Go, Docker, GitHub Actions, GCP, JWT, RBAC";
        break;
      case "hobbies":
        output = "NCC (National Cadet Corps), Football, Literature & Writing, Cyber Resilience";
        break;
      case "help":
        output = "Available: ls, cd, cat, pwd, whoami, hire, services, clear, skills, hobbies, help";
        break;
      default:
        output = `Command not found: ${cmd}. Type 'help' for options.`;
    }

    setHistory([...history, { cmd: input, output }]);
    setInput("");
  };

  return (
    <div className="w-full h-[500px] md:h-[600px] bg-zinc-950/90 border border-zinc-800 rounded-xl md:rounded-2xl overflow-hidden flex flex-col font-mono shadow-2xl relative">
      <div className="px-4 py-2 md:py-3 bg-zinc-900 border-b border-zinc-800 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest truncate">mandela_term — {currentPath.join("/") || "~"}</div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-4 md:p-6 overflow-y-auto text-xs md:text-sm text-zinc-300 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800"
      >
        <AnimatePresence>
          {history.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-1"
            >
              <div className="flex gap-2">
                <span className="text-accent">visitor@mandela:{currentPath.join("/") || "~"}$</span>
                <span>{item.cmd}</span>
              </div>
              <div className="text-zinc-500 pl-4 whitespace-pre-wrap">{item.output}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <form onSubmit={handleCommand} className="flex gap-2">
          <span className="text-accent">visitor@mandela:{currentPath.join("/") || "~"}$</span>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-zinc-300"
            spellCheck={false}
          />
        </form>
      </div>

      <div className="px-4 py-2 bg-zinc-900/50 border-t border-zinc-800 text-[10px] text-zinc-600 flex justify-between">
        <span>STATUS: OPERATIONAL</span>
        <span>LOCATION: /{currentPath.join("/")}</span>
      </div>
    </div>
  );
}
