"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import ModeWrapper from "@/components/layout/ModeWrapper";
import Hero from "@/components/sections/Hero";
import KnowledgeGraph from "@/components/visuals/KnowledgeGraph";
import ArchitecturalDeepDive from "@/components/sections/ArchitecturalDeepDive";
import Experience from "@/components/sections/Experience";
import TechStack from "@/components/sections/TechStack";
import Hobbies from "@/components/sections/Hobbies";
import Services from "@/components/sections/Services";
import Terminal from "@/components/terminal/Terminal";
import { usePortfolioMode } from "@/hooks/use-portfolio-mode";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { mode, toggleMode, isTransitioning } = usePortfolioMode();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Sidebar 
        mode={mode} 
        toggleMode={toggleMode} 
        isTransitioning={isTransitioning} 
      />
      <MobileNav
        mode={mode} 
        toggleMode={toggleMode} 
        isTransitioning={isTransitioning}
      />
      
      <ModeWrapper mode={mode} isTransitioning={isTransitioning}>
        <div className="container mx-auto px-4 md:px-12 py-10 md:py-20 pb-40">
          <AnimatePresence mode="wait">
            {mode === "normal" ? (
              <motion.div
                key="normal-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-40"
              >
                {/* Hero Section */}
                <div id="profile">
                  <Hero />
                </div>

                {/* Knowledge Graph Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="max-w-6xl"
                >
                  <div className="mb-12">
                    <h2 className="text-4xl font-bold text-highlight-text mb-4 tracking-tight">
                      Technical Breadth
                    </h2>
                    <p className="text-primary-text text-lg max-w-2xl leading-relaxed">
                      Deep expertise in the full stack, from high-performance frontend interfaces 
                      to scalable backend architecture and AI deployments.
                    </p>
                  </div>
                  <KnowledgeGraph />
                </motion.div>

                {/* Featured Projects */}
                <motion.div 
                  id="projects"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="max-w-6xl"
                >
                  <div className="mb-12">
                    <h2 className="text-4xl font-bold text-highlight-text mb-4 tracking-tight">
                      Product Architecture & System Engineering                    </h2>
                    <p className="text-primary-text text-lg max-w-2xl leading-relaxed">
                      Architected and deployed scalable SaaS platforms and intelligent systems — designed with tenant isolation, clean service layers, and production reliability at the core.                    </p>
                  </div>
                  <ArchitecturalDeepDive />
                </motion.div>

                {/* Experience Timeline */}
                <motion.div 
                  id="experience"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="max-w-6xl"
                >
                  <div className="mb-12 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-highlight-text mb-4 tracking-tight">
Engineering Evolution                    </h2>
                    <p className="text-primary-text text-lg max-w-2xl leading-relaxed mx-auto md:mx-0">
                     From building full-stack applications to designing multi-tenant SaaS platforms and intelligent backend systems, driven by scalability and system design thinking.
                    </p>
                  </div>
                  <Experience />
                </motion.div>

                {/* Tech Stack */}
                <motion.div 
                  id="stack"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="max-w-6xl"
                >
                  <div className="mb-12">
                    <h2 className="text-4xl font-bold text-highlight-text mb-4 tracking-tight">
                      The Arsenal
                    </h2>
                    <p className="text-primary-text text-lg max-w-2xl leading-relaxed">
                      A curated set of technologies used to build resilient, scalable, and delightful applications.
                    </p>
                  </div>
                  <TechStack />
                </motion.div>

                {/* Personal Dimension / Hobbies */}
                <motion.div 
                  id="life"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="max-w-6xl"
                >
                  <div className="mb-12">
                    <h2 className="text-4xl font-bold text-highlight-text mb-4 tracking-tight">
                      Life Beyond Code
                    </h2>
                    <p className="text-primary-text text-lg max-w-2xl leading-relaxed">
                      Discipline, teamwork, and continuous learning — shaped by the field, the page, and the service.
                    </p>
                  </div>
                  <Hobbies />
                </motion.div>

                {/* Services & Contact */}
                <motion.div 
                  id="connect"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="max-w-6xl"
                >
                  <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-highlight-text mb-4 tracking-tight">
                      Partnership & Collaboration
                    </h2>
                    <p className="text-primary-text text-lg max-w-2xl leading-relaxed mx-auto">
                      Available for architectural consultations, MVP development, AI integrations, or joining high-growth teams. 
                    </p>
                  </div>
                  <Services />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="dev-content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center min-h-[80vh] pt-12"
              >
                <div className="w-full max-w-5xl">
                   <div className="mb-8 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <h2 className="font-mono text-highlight-text/80 text-sm uppercase tracking-widest">Mandela-OS Console</h2>
                     </div>
                     <span className="font-mono text-[10px] text-zinc-500">ROOT ACCESS GRANTED</span>
                   </div>
                   <Terminal />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ModeWrapper>

      {/* Footer / Copyright */}
      <footer className="fixed bottom-8 right-12 text-[10px] font-mono text-primary-text/40 tracking-widest uppercase z-50 pointer-events-none">
        © 2026 Muhammad Ali · SaaS & AI Engineer
      </footer>
    </div>
  );
}
