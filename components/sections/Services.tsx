"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Rocket, 
  Code, 
  Brain, 
  LayoutDashboard, 
  MessageSquare,
  ArrowUpRight,
  Phone,
  Mail as MailIcon
} from "lucide-react";

const services = [
  {
    title: "SaaS & MVP Development",
    description: "Designing and building scalable full-stack SaaS applications using FastAPI, Angular/Next.js, and MongoDB with clean architecture and production-ready deployment.",
    icon: Rocket,
    price: "Project-Based",
    link: "mailto:muhmmadali.nitrkl@gmail.com?subject=Inquiry: SaaS Development"
  },
  {
    title: "AI Integration & Automation",
    description: "Integrating OpenAI APIs, RAG pipelines, and custom AI agents into web applications to enable intelligent workflows and backend automation.",
    icon: Brain,
    price: "Custom Scope",
    link: "mailto:muhmmadali.nitrkl@gmail.com?subject=Inquiry: AI Integration"
  },
  {
    title: "Backend Architecture & API Development",
    description: "Building secure, scalable backend systems with FastAPI and Go (Echo), including multi-tenant architecture, RBAC, and production deployment.",
    icon: Code,
    price: "Project / Contract",
    link: "mailto:muhmmadali.nitrkl@gmail.com?subject=Inquiry: Backend Development"
  },
  {
    title: "Frontend Engineering & Developer Tooling",
    description: "Developing high-performance frontend systems in Angular and React, while contributing to internal developer portals and Python API modules.",
    icon: LayoutDashboard,
    price: "Contract-Based",
    link: "mailto:muhmmadali.nitrkl@gmail.com?subject=Inquiry: Frontend Engineering"
  }
];

export default function Services() {
  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, idx) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative p-8 bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/5 text-highlight-text group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-highlight-text mb-4 tracking-tight">
                {service.title}
              </h3>
              <p className="text-primary-text mb-8 leading-relaxed font-light">
                {service.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="text-sm font-mono text-zinc-500 uppercase tracking-widest">{service.price}</span>
              <a 
                href={service.link}
                className="p-2 rounded-full bg-white/5 text-highlight-text hover:bg-white/10 transition-colors"
                aria-label={`Inquire about ${service.title}`}
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>

            {/* Background Glow */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

     <motion.div 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="relative p-12 bg-gradient-to-br from-zinc-800/50 to-zinc-950/50 border border-white/5 rounded-[2.5rem] text-center"
>
  <div className="max-w-xl mx-auto">

    <h2 className="text-4xl font-bold text-highlight-text mb-4 tracking-tight">
      Let’s Build Scalable Systems
    </h2>

    <p className="text-primary-text text-lg font-light mb-4">
      Product-focused Software Engineer building multi-tenant SaaS platforms and AI-powered backend systems using FastAPI, Angular, Next.js, and Go.
    </p>

    <div className="flex items-center justify-center gap-3 text-sm text-zinc-500 mb-8">
      <span>📍 Kargil, Ladakh</span>
      <div className="w-1 h-1 rounded-full bg-highlight-text/40" />
      <span>Based in Bangalore</span>
    </div>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      <a 
        href="mailto:muhmmadali.nitrkl@gmail.com"
        className="flex items-center gap-2 text-highlight-text hover:text-white transition-colors"
      >
        <MailIcon className="w-5 h-5" />
        muhmmadali.nitrkl@gmail.com
      </a>

      <a 
        href="tel:+919682184658"
        className="flex items-center gap-2 text-highlight-text hover:text-white transition-colors"
      >
        <Phone className="w-5 h-5" />
        +91 9682184658
      </a>

      <a 
        href="https://wa.me/919682184658"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-highlight-text hover:text-white transition-colors"
      >
        <MessageSquare className="w-5 h-5" />
        WhatsApp
      </a>
    </div>

    <div className="mt-10">
      <a 
        href="mailto:muhmmadali.nitrkl@gmail.com"
        className="inline-flex items-center gap-3 px-8 py-4 bg-highlight-text text-black rounded-full font-semibold transition-transform hover:scale-105 active:scale-95"
      >
        Start a Conversation
      </a>
    </div>

  </div>
</motion.div>
    </div>
  );
}
