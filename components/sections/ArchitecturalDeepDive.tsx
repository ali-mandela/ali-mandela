"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Server,
  Bot,
  FileText,
  HeartPulse,
  GraduationCap,
  Car,
  Film,
  ShoppingCart,
  Truck,
  Gauge,
  RotateCcw,
  Cpu,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

import CaseStudyModal from "../modals/CaseStudyModal";

const CATEGORIES = ["All", "Web Dev", "AI/ML", "Mobile", "Backend/Tools"] as const;

const projects = [
  {
    title: "DocBot – Multi-Tenant AI Support Bot Platform",
    icon: Bot,
    category: "AI/ML",
    description: "Multi-tenant RAG platform for AI support bots, with full per-tenant data isolation and an embeddable streaming widget.",
    longDescription: "Architected a multi-tenant RAG pipeline using LangChain, HuggingFace embeddings, and Qdrant vector DB, with per-tenant namespaced collections for full data isolation. Built an async ingestion pipeline for PDF, DOCX, and TXT files, plus an embeddable Lit widget with token-by-token streaming, deployable via a single script tag.",
    techDetails: [
      "Per-tenant namespaced collections in Qdrant for strict data isolation.",
      "Async ingestion pipeline (Celery + Redis) for PDF, DOCX, and TXT files.",
      "HuggingFace embeddings feeding a LangChain RAG pipeline.",
      "Embeddable Lit widget with token-by-token streaming via a single script tag.",
      "FastAPI backend, Next.js dashboard."
    ],
    outcomes: [
      "Full tenant data isolation",
      "Drop-in embeddable widget",
      "Streaming, low-latency responses"
    ],
    tags: ["FastAPI", "LangChain", "Qdrant", "Celery", "Redis", "Lit"],
    color: "text-purple-400",
    link: "https://github.com/ali-mandela"
  },

  {
    title: "Corely – Multi-Tenant SaaS Platform",
    icon: Server,
    category: "Web Dev",
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
    link: "https://corely-six.vercel.app/dashboard"
  },

  {
    title: "K Classes (FLN) – Tutoring & Academic Assistance Platform",
    icon: GraduationCap,
    category: "Web Dev",
    description: "Academic assistance platform connecting students with subject experts — live in production at flntutors.com with 100+ active users.",
    longDescription: "Built and shipped FLN, a live tutoring platform connecting students and domain experts, with real-time WebSocket chat, async task handling, and role-based dashboards for students, experts, and admins. TypeScript/Angular frontend backed by a Python service.",
    techDetails: [
      "TypeScript/Angular frontend (kclasses) for student and tutor dashboards.",
      "Python backend service (sealserver) handling business logic and data.",
      "Real-time WebSocket chat between students and experts.",
      "Async task handling and role-based dashboards (student / expert / admin).",
      "Deployed and live in production at flntutors.com."
    ],
    outcomes: [
      "Live in production with 100+ active users",
      "Real-time chat & structured task workflows"
    ],
    tags: ["TypeScript", "Angular", "Python", "WebSockets"],
    color: "text-green-400",
    link: "https://www.flntutors.com/"
  },

  {
    title: "LaaRide – Taxi Booking Platform for Ladakh",
    icon: Car,
    category: "Mobile",
    description: "Digital taxi-stand platform modernizing shared-seat bookings for Ladakh's traditional stand-based taxi system.",
    longDescription: "Instead of real-time ride-hailing, LaaRide digitizes the existing taxi-stand model — powering shared seat bookings, driver trip listings, and scalable transport management for the region.",
    techDetails: [
      "FastAPI + MongoDB backend for bookings and driver trip listings.",
      "Expo/React Native rider app for on-demand and fixed-route trips.",
      "Built around Ladakh's high-altitude, stand-based taxi model rather than live ride-hailing."
    ],
    outcomes: [
      "Digitizes an existing regional taxi-stand system",
      "Shared-seat and custom trip booking",
      "Cross-platform mobile app (Leh–Kargil, Srinagar–Leh, Leh–Nubra routes)"
    ],
    tags: ["FastAPI", "MongoDB", "React Native", "Expo"],
    color: "text-yellow-400",
    link: "https://github.com/ali-mandela/laaride"
  },

  {
    title: "fluid.ai – Autonomous Document-Generation Agent",
    icon: FileText,
    category: "AI/ML",
    description: "FastAPI agent that plans, drafts, and self-revises business documents, returning a polished .docx file.",
    longDescription: "Takes a natural-language request, autonomously plans a business document, drafts it section by section, reflects on and revises its own draft, and returns a polished Microsoft Word (.docx) file — via a LangGraph plan → execute → reflect → revise state machine.",
    techDetails: [
      "LangGraph state machine: plan → execute → reflect → revise (bounded re-revision loop).",
      "FastAPI service exposing a single /agent endpoint.",
      "Self-critique step where the agent reflects on and revises its own draft.",
      "Outputs a production-ready .docx file."
    ],
    outcomes: [
      "Self-revising AI drafting loop",
      "Structured, section-by-section document generation"
    ],
    tags: ["Python", "FastAPI", "LangChain/LangGraph"],
    color: "text-orange-400",
    link: "https://github.com/ali-mandela/fluid.ai"
  },

  {
    title: "peanut_ai – RAGA Health Dashboard",
    icon: HeartPulse,
    category: "Web Dev",
    description: "B2B healthcare SaaS dashboard simulating patient management, analytics, and authentication for a clinical setting.",
    longDescription: "A modern B2B healthcare dashboard built with React, TypeScript, and Vite, simulating a healthcare SaaS platform with Firebase authentication, analytics, and patient management.",
    techDetails: [
      "React + TypeScript + Vite frontend.",
      "Firebase authentication (login system).",
      "Analytics dashboard with charts and insights.",
      "Patient management with grid and list views, search and filtering."
    ],
    outcomes: [
      "Full B2B healthcare dashboard simulation",
      "Live deployment"
    ],
    tags: ["React", "TypeScript", "Vite", "Firebase"],
    color: "text-pink-400",
    link: "https://peanut-ai-sooty.vercel.app/dashboard"
  },

  {
    title: "Fletnix – Movie Recommendation Platform",
    icon: Film,
    category: "Web Dev",
    description: "Netflix-style movie catalog and recommendation demo app.",
    longDescription: "A sample movie catalog and recommendation platform with an Angular client and a Node.js/Express backend, showcasing content browsing and recommendation flows.",
    techDetails: [
      "Angular frontend (fletnixClient) for movie browsing and recommendations.",
      "Node.js/Express backend (fletnix-backend) with MongoDB."
    ],
    outcomes: [
      "Live deployment"
    ],
    tags: ["Angular", "Node.js", "MongoDB"],
    color: "text-red-400",
    link: "https://fletnix-client.vercel.app/"
  },

  {
    title: "rateGaurd",
    icon: Gauge,
    category: "Backend/Tools",
    description: "Python tool with a Streamlit dashboard for invoice-related rate guarding/validation.",
    longDescription: "A Python-based guarding/validation utility with a live Streamlit dashboard for reviewing invoice data.",
    techDetails: [
      "Python core logic.",
      "Streamlit dashboard interface for invoice review."
    ],
    outcomes: [
      "Live deployment"
    ],
    tags: ["Python", "Streamlit"],
    color: "text-cyan-400",
    link: "https://rategaurd.streamlit.app/invoices"
  },

  {
    title: "ePlatform – Ecommerce Platform",
    icon: ShoppingCart,
    category: "Web Dev",
    description: "Full-stack ecommerce platform with a client storefront and backend services.",
    longDescription: "An ecommerce platform pairing a React/Vite storefront with a JavaScript backend for product, order, and store management.",
    techDetails: [
      "React + Vite storefront (eplatformck).",
      "JavaScript backend service (eplatformbk)."
    ],
    outcomes: [],
    tags: ["React", "Vite", "JavaScript"],
    color: "text-blue-300",
    link: "https://github.com/ali-mandela/eplatformck"
  },

  {
    title: "Wassel – On-Demand Logistics for UAE",
    icon: Truck,
    category: "Mobile",
    description: "Porter-style on-demand logistics and delivery platform, built for the UAE region.",
    longDescription: "A logistics and delivery platform in the spirit of Porter (India), adapted for the UAE market — pairing a TypeScript/Expo client with a Python backend service.",
    techDetails: [
      "TypeScript/Expo client app (Wassel).",
      "Python backend service (Serve_wassel) for logistics operations."
    ],
    outcomes: [],
    tags: ["TypeScript", "Expo", "Python"],
    color: "text-teal-400",
    link: "https://github.com/ali-mandela/Wassel"
  },

  {
    title: "truereturn – Return Validation System",
    icon: RotateCcw,
    category: "Backend/Tools",
    description: "Validates whether a customer's product return is legitimate before it's approved. Under active development.",
    longDescription: "A system that takes a product returned by a customer and evaluates whether the return is valid — currently under active construction, not yet finalized.",
    techDetails: [
      "Currently under active development — architecture not yet finalized."
    ],
    outcomes: [],
    tags: ["In Development"],
    color: "text-zinc-400",
    link: "https://github.com/ali-mandela/truereturn"
  },

  {
    title: "AI Agent & RAG System",
    icon: Cpu,
    category: "AI/ML",
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
    color: "text-purple-300",
    link: "https://github.com/ali-mandela"
  },

  {
    title: "askLuxor – Real Estate Marketplace",
    icon: Zap,
    category: "Web Dev",
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
    color: "text-orange-300",
    link: "https://askluxor.onrender.com"
  },

  {
    title: "Rapid Foods – Multi-Role Delivery System",
    icon: Zap,
    category: "Mobile",
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
    color: "text-yellow-300",
    link: "https://github.com/ali-mandela"
  }
];

export default function ArchitecturalDeepDive() {
  const [selectedProject, setSelectedProject] = React.useState<typeof projects[0] | null>(null);
  const [activeCategory, setActiveCategory] = React.useState<(typeof CATEGORIES)[number]>("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-10">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest border transition-all",
              activeCategory === cat
                ? "bg-highlight-text text-black border-highlight-text"
                : "bg-white/5 text-primary-text/70 border-white/10 hover:border-white/20 hover:text-primary-text"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            layout
            onClick={() => setSelectedProject(project)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="group relative p-6 md:p-8 bg-zinc-900/40 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden block transition-all hover:border-white/20 cursor-pointer"
          >
            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center", project.color)}>
                  <project.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-500 font-mono">
                  {project.category}
                </span>
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
      </motion.div>

      <CaseStudyModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </>
  );
}
