"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { PortfolioMode } from "@/hooks/use-portfolio-mode";
import { motion } from "framer-motion";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { 
  User, 
  Code2, 
  Briefcase, 
  Settings, 
  Terminal as TerminalIcon, 
  Sparkles,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Heart
} from "lucide-react";

interface SidebarProps {
  mode: PortfolioMode;
  toggleMode: () => void;
  isTransitioning: boolean;
}

const navItems = [
  { icon: User, label: "Profile", id: "profile" },
  { icon: Code2, label: "Projects", id: "projects" },
  { icon: Briefcase, label: "Experience", id: "experience" },
  { icon: Settings, label: "Stack", id: "stack" },
  { icon: Heart, label: "Life", id: "life" },
  { icon: MessageSquare, label: "Connect", id: "connect" },
];

const socialItems = [
  { icon: Github, href: "https://github.com/ali-mandela", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/muhammadali-01/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:muhammadali.nitrkl@gmail.com", label: "Email" },
];

export default function Sidebar({ mode, toggleMode, isTransitioning }: SidebarProps) {
  const activeTab = useScrollSpy(["profile", "experience", "projects", "stack", "life", "connect"]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full w-20 flex-col items-center py-8 z-50 border-r transition-all duration-500 hidden md:flex",
      mode === "normal" 
        ? "bg-black/20 backdrop-blur-xl border-white/5" 
        : "bg-zinc-900/40 backdrop-blur-md border-zinc-800"
    )}>
      {/* Logo Area */}
      <div className="mb-12 relative flex flex-col items-center gap-4">
        <div className="relative group cursor-pointer" onClick={() => scrollTo("profile")}>
          <div className="w-10 h-10 rounded-xl bg-highlight-text flex items-center justify-center overflow-hidden">
            <span className="text-black font-bold text-xl">AM</span>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1 border border-dashed border-highlight-text/20 rounded-xl pointer-events-none"
          />
        </div>
        
      
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all hover:bg-white/5"
            aria-label={item.label}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors duration-300",
              activeTab === item.id ? "text-highlight-text" : "text-primary-text group-hover:text-highlight-text"
            )} />
            
            {activeTab === item.id && (
              <motion.div 
                layoutId="activeNav"
                className="absolute right-0 w-1 h-6 bg-highlight-text rounded-l-full"
              />
            )}
            
            {/* Tooltip */}
            <span className="absolute left-16 px-2 py-1 bg-surface border border-border-ui text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Socials & Mode Toggle */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col gap-4">
          {socialItems.map((social) => (
            <a 
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-text hover:text-highlight-text transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <button
          onClick={toggleMode}
          disabled={isTransitioning}
          className={cn(
            "group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden",
            mode === "normal" 
              ? "bg-zinc-800 text-zinc-400 hover:text-highlight-text" 
              : "bg-accent/20 text-accent border border-accent/20"
          )}
          aria-label="Toggle Developer Mode"
        >
          <motion.div
            animate={{ 
              rotate: mode === "dev" ? 180 : 0,
              scale: isTransitioning ? 0.8 : 1
            }}
          >
            {mode === "normal" ? <TerminalIcon className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          </motion.div>
          
          {/* Transition Glow */}
          {isTransitioning && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 2 }}
              className="absolute inset-0 bg-white/20 blur-xl rounded-full"
            />
          )}
        </button>
      </div>
    </aside>
  );
}
