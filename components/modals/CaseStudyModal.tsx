import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Zap } from "lucide-react";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    longDescription?: string;
    techDetails?: string[];
    outcomes?: string[];
    link: string;
  } | null;
}

export default function CaseStudyModal({ isOpen, onClose, project }: CaseStudyModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project || !mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer pointer-events-auto"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-black/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto mx-4"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
              <div>
                <h2 className="text-3xl font-bold text-highlight-text tracking-tight">{project.title}</h2>
                <p className="text-sm text-zinc-500 font-mono mt-1 uppercase tracking-widest">Technical Deep-Dive</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-8 overflow-y-auto custom-scrollbar space-y-10">
              <section>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-highlight-text" />
                  Overview
                </h3>
                <p className="text-primary-text leading-relaxed font-light">
                  {project.longDescription || project.description}
                </p>
              </section>

              {project.techDetails && (
                <section>
                  <h3 className="text-lg font-semibold text-white mb-4">Core Implementation</h3>
                  <ul className="space-y-3">
                    {project.techDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-primary-text font-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-highlight-text mt-2 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.outcomes && (
                <section>
                  <h3 className="text-lg font-semibold text-white mb-4">Impact & Outcomes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.outcomes.map((outcome, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm text-highlight-text font-medium">
                        {outcome}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-white/5 bg-zinc-900/80 mt-auto flex items-center justify-between">
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary-text hover:text-highlight-text transition-colors font-mono text-xs uppercase"
              >
                <ExternalLink className="w-4 h-4" />
                View Source Code
              </a>
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-white text-black rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-transform"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
