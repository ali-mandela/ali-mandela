"use client";

import React from "react";
import { motion } from "framer-motion";
import { Server, Shield, Cpu, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

import CaseStudyModal from "../modals/CaseStudyModal";

const projects = [
  {
    title: "Corely – Multi-Tenant SaaS Platform",
    icon: Server,
    description: "Production-grade multi-tenant SaaS platform serving multiple independent clients with strict tenant isolation.",
    longDescription: "Architected a shared-database multi-tenant system using tenant-scoped data isolation and role-based access control. Designed clean backend service layers, modular routing, and secure authentication workflows. Built for scalability and deployed in production serving real customers.",
    techDetails: [
      "FastAPI backend with modular architecture (core, services, routes).",
      "Tenant-aware middleware enforcing strict data isolation using tenant_id.",
      "Role-Based Access Control (Admin / Manager / Staff).",
      "MongoDB indexing optimized for tenant-scoped queries.",
      "Dockerized deployment with environment-based configuration."
    ],
    outcomes: [
      "Live paying customers",
      "Secure tenant-level data segregation",
      "Production-ready scalable architecture"
    ],
    tags: ["FastAPI", "Angular", "MongoDB", "Multi-Tenant SaaS"],
    color: "text-blue-400",
    link: "https://corely-six.vercel.app/"
  },

  {
    title: "AI Agent & RAG System",
    icon: Cpu,
    description: "AI-powered backend service integrating OpenAI APIs with custom Retrieval-Augmented Generation pipelines.",
    longDescription: "Developed intelligent backend services using OpenAI models combined with custom RAG pipelines for context-aware responses. Designed modular agent orchestration logic to automate domain-specific tasks and enhance system intelligence.",
    techDetails: [
      "OpenAI API integration for LLM-based processing.",
      "Custom RAG pipeline with document retrieval layer.",
      "Agent-based orchestration logic for task automation.",
      "Python modules integrated with FastAPI backend."
    ],
    outcomes: [
      "Context-aware AI responses",
      "Reusable AI service architecture",
      "Production-ready AI integration"
    ],
    tags: ["AI", "OpenAI", "RAG", "Python"],
    color: "text-purple-400",
    link: "https://github.com/alimandela/ai-agents"
  },

  {
    title: "FLN – Expert & Assignment Platform",
    icon: Shield,
    description: "Scalable academic services platform connecting students with experts through structured workflows.",
    longDescription: "Built a backend-driven system for managing assignments, expert dashboards, KPI tracking, and admin workflows. Designed role-based authentication, OTP verification, and scalable task lifecycle management.",
    techDetails: [
      "FastAPI backend with role-based user management.",
      "MongoDB aggregation pipelines for KPI tracking.",
      "JWT authentication with OTP verification.",
      "Next.js frontend deployed on Vercel.",
      "Backend deployed on Render."
    ],
    outcomes: [
      "Structured expert-task lifecycle system",
      "Scalable admin dashboard architecture",
      "Cloud production deployment"
    ],
    tags: ["FastAPI", "Next.js", "MongoDB"],
    color: "text-green-400",
    link: "https://pvt-classes.vercel.app/"
  },

  {
    title: "askLuxor – Real Estate Marketplace",
    icon: Zap,
    description: "Role-based property marketplace with scalable listing and inquiry management.",
    longDescription: "Designed a marketplace platform connecting agents, users, and admins. Implemented structured backend services for property listings, inquiries, and administrative workflows with secure authentication and scalable image handling.",
    techDetails: [
      "Node.js + Express backend with RESTful APIs.",
      "MongoDB for scalable property storage.",
      "Role-based authentication (Admin / Agent / User).",
      "Cloud deployment on Render."
    ],
    outcomes: [
      "Multi-role marketplace architecture",
      "Secure property inquiry workflows",
      "Scalable backend services"
    ],
    tags: ["Node.js", "Express", "MongoDB"],
    color: "text-orange-400",
    link: "https://askluxor.onrender.com"
  },

  {
    title: "Rapid Foods – Multi-Role Delivery System",
    icon: Zap,
    description: "Comprehensive food delivery application supporting Admin, Restaurant, User, and Delivery Partner modules.",
    longDescription: "Engineered a multi-module delivery system with real-time order tracking and secure payment integration. Designed scalable backend APIs for order lifecycle management and user account handling.",
    techDetails: [
      "Node.js backend with order lifecycle management.",
      "React Native mobile application.",
      "Secure payment integration.",
      "Role-based modules for multiple stakeholders."
    ],
    outcomes: [
      "End-to-end delivery workflow system",
      "Multi-role scalable architecture",
      "Secure transaction processing"
    ],
    tags: ["React Native", "Node.js", "MongoDB"],
    color: "text-yellow-400",
    link: "https://github.com/alimandela/rapid-foods"
  }
];

export default function ArchitecturalDeepDive() {
  const [selectedProject, setSelectedProject] = React.useState<typeof projects[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            onClick={() => setSelectedProject(project)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative p-6 md:p-8 bg-zinc-900/40 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden block transition-all hover:border-white/20 cursor-pointer"
          >
            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6", project.color)}>
                <project.icon className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-bold text-highlight-text mb-4 tracking-tight">
                {project.title}
              </h3>

              <p className="text-primary-text mb-8 leading-relaxed font-light">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-primary-text/80 font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-highlight-text group-hover:text-white transition-colors">
                View Tech Case Study 
                <Zap className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
          </motion.div>
        ))}
      </div>

      <CaseStudyModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
    </>
  );
}
