"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center px-4 md:px-12 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-highlight-text" />
          <span className="text-xs font-medium text-primary-text uppercase tracking-widest">Shipping Production SaaS</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-4 leading-[1.1]">
          <span className="text-highlight-text">Ali</span> <br />
          <span className="text-primary-text italic">Mandela</span>
        </h1>

        <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-8">
          <span>Kargil, Ladakh</span>
          <div className="w-1 h-1 rounded-full bg-highlight-text/30" />
          <span>Based in Bangalore</span>
        </div>

        <p className="text-lg md:text-2xl text-primary-text max-w-2xl mb-12 leading-relaxed font-light">
          Product-focused Software Engineer building <span className="text-highlight-text font-normal">scalable multi-tenant SaaS</span> platforms and  <span className="text-highlight-text font-normal">AI-powered systems</span>. Focused on clean architecture, intelligent automation, and production-grade engineering.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button 
            onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-highlight-text text-black rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
          >
            View Experience
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <a 
            href="https://github.com/ali-mandela"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 px-8 py-4 border border-border-ui text-highlight-text rounded-full font-semibold transition-all hover:bg-white/5"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </motion.div>

      {/* Background Decoration */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 w-[30vw] h-[30vw] pointer-events-none opacity-20">
        <div className="absolute inset-0 border border-highlight-text/10 rounded-full animate-pulse" />
        <div className="absolute inset-[10%] border border-highlight-text/5 rounded-full animate-ping [animation-duration:4s]" />
      </div>
    </section>
  );
}
