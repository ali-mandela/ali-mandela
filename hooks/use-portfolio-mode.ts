"use client";

import { useState, useEffect } from "react";

export type PortfolioMode = "normal" | "dev";

export function usePortfolioMode() {
  const [mode, setMode] = useState<PortfolioMode>("normal");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("portfolio-mode") as PortfolioMode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const toggleMode = () => {
    setIsTransitioning(true);
    const newMode = mode === "normal" ? "dev" : "normal";
    
    // Artificial delay for sexy transition animations
    setTimeout(() => {
      setMode(newMode);
      localStorage.setItem("portfolio-mode", newMode);
      setIsTransitioning(false);
    }, 500);
  };

  return { mode, toggleMode, isTransitioning };
}
