"use client";

import React from "react";
import { 
  User, 
  Briefcase,
  Code2, 
  Settings, 
  Terminal as TerminalIcon, 
  Sparkles,
  MessageSquare,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PortfolioMode } from "@/hooks/use-portfolio-mode";
import { motion } from "framer-motion";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

interface MobileNavProps {
  mode: PortfolioMode;
  toggleMode: () => void;
  isTransitioning: boolean;
}

const navItems = [
  { icon: User, label: "Profile", id: "profile" },
  { icon: Briefcase, label: "Experience", id: "experience" },
  { icon: Code2, label: "Projects", id: "projects" },
  { icon: Settings, label: "Stack", id: "stack" },
  { icon: Heart, label: "Life", id: "life" },
  { icon: MessageSquare, label: "Connect", id: "connect" },
];

export default function MobileNav({ mode, toggleMode, isTransitioning }: MobileNavProps) {
  const activeTab = useScrollSpy(["profile", "experience", "projects", "stack", "life", "connect"]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-sm">
      <nav className={cn(
        "flex items-center justify-around px-2 py-3 rounded-2xl border backdrop-blur-xl transition-all duration-500",
        mode === "normal" 
          ? "bg-black/40 border-white/5" 
          : "bg-zinc-900/60 border-zinc-800"
      )}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="relative flex flex-col items-center justify-center p-2 group"
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors duration-300",
              activeTab === item.id ? "text-highlight-text" : "text-primary-text"
            )} />
            
            {activeTab === item.id && (
              <motion.div 
                layoutId="activeNavMobile"
                className="absolute -bottom-1 w-1 h-1 bg-highlight-text rounded-full"
              />
            )}
          </button>
        ))}

        <div className="w-px h-6 bg-white/10 mx-2" />

        <button
          onClick={toggleMode}
          disabled={isTransitioning}
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500",
            mode === "normal" ? "bg-zinc-800" : "bg-accent/20 text-accent"
          )}
        >
          <motion.div
            animate={{ rotate: mode === "dev" ? 180 : 0 }}
          >
            {mode === "normal" ? <TerminalIcon className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          </motion.div>
        </button>
      </nav>
    </div>
  );
}
