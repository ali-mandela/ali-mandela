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
      "corely-saas.txt": { type: "file", content: "Project: Corely. Multi-tenant SaaS with FastAPI & Angular. Strict isolation & RBAC." },
      "ai-agents.txt": { type: "file", content: "Project: AI/RAG system. Custom Agent orchestration with OpenAI APIs." },
      "fln-platform.txt": { type: "file", content: "Project: Academic expert platform. Scalable workflow management with MongoDB Aggregation." },
      "askluxor.txt": { type: "file", content: "Project: Real Estate Marketplace. Node.js, Express, MongoDB. Multi-role property listings." },
      "rapid-foods.txt": { type: "file", content: "Project: Multi-role delivery system. React Native, Node.js. Order lifecycle management." }
    }
  },
  "experience": {
    type: "dir",
    children: {
      "shipthis.txt": { type: "file", content: "Frontend Engineer @ Shipthis (2024-Present). AI Logistics & Internal Tooling." },
      "techwire.txt": { type: "file", content: "Software Developer @ TechWire Studio (2023-2024). Next.js & React performance." },
      "freelance.txt": { type: "file", content: "Full-Stack Freelancer (2023). Shipped multiple production SaaS platforms." }
    }
  },
  "contact.txt": { type: "file", content: "Email: muhmmadali.nitrkl@gmail.com | Phone: +91 9682184658" },
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
        output = "1. Multi-Tenant SaaS Development (FastAPI, Angular)\n2. AI Agent Integration & RAG Pipelines\n3. Scalable Backend Architecture (Node.js, Go)\n4. Production Cloud Deployment";
        break;
      case "hire":
        output = "Let's build something exceptional.\nEmail: muhmmadali.nitrkl@gmail.com\nPhone/WA: +91 9682184658\nLocation: Bangalore / Worldwide";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "skills":
        output = "FastAPI, Angular, Next.js, MongoDB, Python, Go, Node.js, AI (OpenAI API, RAG), Docker";
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
          <div className="w-2.5 h-2.5 md:w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 md:w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 md:w-3 h-3 rounded-full bg-green-500/80" />
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
