"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioMode } from "@/hooks/use-portfolio-mode";
import { cn } from "@/lib/utils";

interface ModeWrapperProps {
  mode: PortfolioMode;
  children: React.ReactNode;
  isTransitioning: boolean;
}

export default function ModeWrapper({ mode, children, isTransitioning }: ModeWrapperProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <AnimatePresence mode="wait">
        {mode === "normal" ? (
          <motion.div
            key="normal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0"
          >
            {/* Soft Ambient Glows for Normal Mode */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-white/2 blur-[100px] rounded-full" />
          </motion.div>
        ) : (
          <motion.div
            key="dev-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0 bg-black"
          >
            {/* CRT Scanline Overlay */}
            <div className="crt-overlay opacity-10" />
            
            {/* Digital Grid for Dev Mode */}
            <div 
              className="absolute inset-0 opacity-[0.03]" 
              style={{ 
                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Morph Animation */}
      <motion.main
        animate={{ 
          scale: isTransitioning ? 0.98 : 1,
          filter: isTransitioning ? "blur(4px)" : "blur(0px)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(
          "relative z-10 md:pl-20 transition-colors duration-700 w-full min-h-screen",
          mode === "dev" ? "font-mono" : "font-sans"
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.main>

      {/* Flash effect during transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-white/10 pointer-events-none mix-blend-overlay"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
