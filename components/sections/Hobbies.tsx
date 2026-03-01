"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Trophy, BookOpen, Anchor } from "lucide-react";
import { cn } from "@/lib/utils";

const hobbies = [
  {
    title: "National Cadet Corps (NCC)",
    description: "Developed discipline, leadership, and a strong sense of national service through rigorous training and community engagement.",
    icon: Anchor,
    color: "text-blue-400",
    tag: "Leadership"
  },
  {
    title: "Football",
    description: "An avid player who enjoys the strategic team dynamics and competitive spirit of the game. Always up for a match!",
    icon: Trophy,
    color: "text-green-400",
    tag: "Team Player"
  },
  {
    title: "Literature & Writing",
    description: "Deep interest in classic literature and modern writing. Finds inspiration in storytelling and diverse perspectives.",
    icon: BookOpen,
    color: "text-purple-400",
    tag: "Analytical"
  },
  {
    title: "Cyber Resilience",
    description: "Exploring secure systems and digital sovereignty as a personal passion beyond professional work.",
    icon: Shield,
    color: "text-orange-400",
    tag: "Hobbyist"
  }
];

export default function Hobbies() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {hobbies.map((hobby, index) => (
        <motion.div
          key={hobby.title}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative p-6 bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all"
        >
          <div className="relative z-10 flex items-start gap-4">
            <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0", hobby.color)}>
              <hobby.icon className="w-6 h-6" />
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-highlight-text tracking-tight">
                  {hobby.title}
                </h3>
                <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-zinc-500 font-mono">
                  {hobby.tag}
                </span>
              </div>
              
              <p className="text-primary-text/80 text-sm leading-relaxed font-light">
                {hobby.description}
              </p>
            </div>
          </div>
          
          {/* Subtle Hover Decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-2xl" />
        </motion.div>
      ))}
    </div>
  );
}
