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
  Trophy,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

import CaseStudyModal from "../modals/CaseStudyModal";

const CATEGORIES = ["All", "Web Dev", "AI/ML", "Mobile", "Backend/Tools"] as const;

const projects = [
  {
    title: "DocBot – Multi-Tenant AI Support Bot Platform",
    icon: Bot,
    category: "AI/ML",
    description: "Multi-tenant SaaS platform that lets companies launch an AI support chatbot trained on their own documents, embeddable on any website.",
    longDescription: "A multi-tenant Retrieval-Augmented Generation (RAG) support bot platform built with FastAPI, LangChain, and Groq (Llama 3.1 8B), streaming answers over Server-Sent Events with per-tenant Qdrant collections and conversation history in MongoDB. Runs locally via Docker Compose.",
    techDetails: [
      "Per-tenant Qdrant collections for data isolation, with conversation history in MongoDB.",
      "Async ingestion pipeline with Celery and RabbitMQ that parses PDF, DOCX, and TXT files from Backblaze B2, chunks text with configurable per-tenant size and overlap, and generates BAAI/bge-small-en-v1.5 embeddings with FastEmbed, retrying failures with exponential backoff.",
      "Embeddable Lit Web Component chat widget with token-by-token streaming, installable with a single script tag.",
      "JWT and Google OAuth authentication, owner-based role access, team invites, tenant API keys, per-plan Redis rate limiting, and encrypted bring-your-own MongoDB storage across 27 REST API endpoints.",
      "9 services containerized with Docker Compose (API, worker, MongoDB, Qdrant, RabbitMQ, Nginx, Flower, Prometheus, Grafana) with structured logging and Prometheus metrics."
    ],
    outcomes: [
      "27 REST API endpoints",
      "9 containerized services",
      "Per-tenant data isolation",
      "Token-by-token streaming widget"
    ],
    tags: ["FastAPI", "LangChain", "Groq", "Qdrant", "Celery", "RabbitMQ", "Lit"],
    color: "text-purple-400",
    link: "https://github.com/ali-mandela/docbot"
  },

  {
    title: "aivar – Autonomous Test Generation Agent",
    icon: Trophy,
    category: "AI/ML",
    description: "Hackathon semi-finalist: an AI agent that takes a URL and login credentials, explores the web app, and generates, runs, and self-heals a Playwright end-to-end test suite.",
    longDescription: "Built as Team Lead of team Amdak (4 members) for the Bessemer Tech Catalyst Hackathon (Bessemer Venture Partners India + Polaris School of Technology), on a problem statement by Aivar Innovations — reaching the semi-final round. The agent needs only a URL, username, and password, and outputs runnable Playwright tests as standard Pytest files.",
    techDetails: [
      "8-stage orchestrator state machine: explore, plan, critique, generate, validate, execute, triage, report — with a coverage gate.",
      "Inline locator self-healing, plus triage that separates real bugs from script issues and flaky tests.",
      "Cross-provider LLM failover across OpenRouter, Google Gemini, and Sarvam AI with per-run healing and cost limits.",
      "Live decision log streamed to a React UI, with run history in PostgreSQL."
    ],
    outcomes: [
      "Hackathon semi-finalist",
      "Led a team of 4",
      "Self-healing E2E test suites"
    ],
    tags: ["Python", "FastAPI", "Playwright", "Pytest", "React", "PostgreSQL"],
    color: "text-amber-400",
    link: "https://github.com/ali-mandela/aivar"
  },

  {
    title: "Logistics Data Extractor – Fine-Tuned LLM",
    icon: Package,
    category: "AI/ML",
    description: "Fine-tuned small language model that extracts structured JSON from unstructured logistics notes, deployed live on Hugging Face Spaces.",
    longDescription: "Fine-tuned Gemma 3 (270M) using LoRA and Unsloth on a self-generated 1,000-sample dataset, then deployed it as a live inference app on Hugging Face Spaces with Gradio and ZeroGPU — covering the full pipeline from data generation to production serving.",
    techDetails: [
      "Self-generated 1,000-sample training dataset of logistics notes.",
      "LoRA fine-tuning of Gemma 3 (270M) with Unsloth and PyTorch.",
      "Average training loss reduced from 4.21 to 1.19.",
      "Live Gradio inference app on Hugging Face Spaces (ZeroGPU)."
    ],
    outcomes: [
      "Training loss 4.21 → 1.19",
      "Live on Hugging Face Spaces"
    ],
    tags: ["Python", "PyTorch", "Unsloth", "LoRA", "Hugging Face", "Gradio"],
    color: "text-emerald-400",
    link: "https://huggingface.co/spaces/alimandela/freight-note-parser"
  },

  {
    title: "Corely – Multi-Tenant SaaS Platform",
    icon: Server,
    category: "Web Dev",
    description: "Multi-tenant SaaS platform with modular inventory, billing, and reporting services.",
    longDescription: "Architected a multi-tenant SaaS platform with per-tenant database namespacing, JWT authentication, and an API gateway, with modular backend services for inventory, billing, and reporting built for horizontal scaling.",
    techDetails: [
      "Per-tenant database namespacing for tenant isolation.",
      "JWT authentication and an API gateway.",
      "Modular backend services for inventory, billing, and reporting.",
      "Role-Based Access Control with role-scoped API access.",
      "FastAPI backend, Angular frontend, Dockerized."
    ],
    outcomes: [
      "Zero cross-tenant data leakage",
      "Live deployment"
    ],
    tags: ["FastAPI", "Angular", "MongoDB", "Docker", "JWT", "RBAC"],
    color: "text-blue-400",
    link: "https://corely-six.vercel.app/"
  },

  {
    title: "FLN Tutors – Academic Assistance Platform",
    icon: GraduationCap,
    category: "Web Dev",
    description: "Academic assistance platform connecting students with domain experts through real-time chat and role-based dashboards — live at flntutors.com.",
    longDescription: "Worked on FLN Tutors, an academic assistance platform connecting students with domain experts, with real-time WebSocket chat, asynchronous task handling, and role-based dashboards for students, experts, and admins.",
    techDetails: [
      "Real-time WebSocket chat between students and experts.",
      "Asynchronous task handling and role-based dashboards (student / expert / admin).",
      "FastAPI and Next.js with MongoDB and Redis.",
      "Deployed on AWS EC2, with AWS SES for transactional email and AWS SNS for notifications."
    ],
    outcomes: [
      "10,000+ page visitors",
      "500+ active users"
    ],
    tags: ["FastAPI", "Next.js", "WebSockets", "MongoDB", "Redis", "AWS"],
    color: "text-green-400",
    link: "https://www.flntutors.com/"
  },

  {
    title: "fluid.ai – Autonomous Document-Generation Agent",
    icon: FileText,
    category: "AI/ML",
    description: "FastAPI AI agent that turns a natural-language request into a planned, self-reviewed Microsoft Word (.docx) business document.",
    longDescription: "An autonomous document generation agent built as a LangGraph state machine that plans a business document, drafts it section by section, critiques its own draft, and revises weak sections within a bounded revision limit.",
    techDetails: [
      "LangGraph state machine: plan → draft → critique → revise, with a bounded revision limit.",
      "Structured LLM output decoupled from .docx rendering with python-docx.",
      "Backblaze B2 storage and a Server-Sent Events endpoint that streams each agent step live.",
      "Offline Pytest tests using a fake LLM."
    ],
    outcomes: [
      "Self-revising drafting loop",
      "Live step-by-step streaming"
    ],
    tags: ["Python", "FastAPI", "LangGraph", "Groq", "SSE", "Pytest"],
    color: "text-orange-400",
    link: "https://github.com/ali-mandela/fluid.ai"
  },

  {
    title: "LaaRide – Taxi Booking Platform for Ladakh",
    icon: Car,
    category: "Mobile",
    description: "In progress: a digital taxi-stand platform modernizing shared-seat taxi bookings for Ladakh's traditional stand-based taxi system.",
    longDescription: "Designed to let drivers list upcoming fixed-route trips (for example, Kargil to Leh) and passengers book available seats, with support for private bookings.",
    techDetails: [
      "Asynchronous FastAPI backend with MongoDB (Motor) and a modular structure.",
      "Versioned REST API (/api/v1).",
      "React Native and Expo mobile app.",
      "JWT auth, trip creation, seat booking, and payments planned as upcoming modules."
    ],
    outcomes: [
      "In active development"
    ],
    tags: ["FastAPI", "MongoDB", "React Native", "Expo"],
    color: "text-yellow-400",
    link: "https://github.com/ali-mandela/laaride"
  },

  {
    title: "RAGA Health Dashboard (peanut_ai)",
    icon: HeartPulse,
    category: "Web Dev",
    description: "B2B healthcare SaaS dashboard simulating patient management, analytics, and authentication for a clinical setting, using mock data.",
    longDescription: "A B2B healthcare dashboard built with React, TypeScript, Vite, and Tailwind CSS, featuring Firebase Authentication with protected routes, an analytics dashboard, and patient management.",
    techDetails: [
      "Firebase Authentication with protected routes.",
      "Analytics dashboard with Recharts.",
      "Patient management with grid and list views, search, and filters by status and department.",
      "Zustand state management, browser and in-app toast notifications, responsive layout."
    ],
    outcomes: [
      "Live deployment"
    ],
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "Firebase"],
    color: "text-pink-400",
    link: "https://peanut-ai-sooty.vercel.app"
  },

  {
    title: "Fletnix – Movie Recommendation Platform",
    icon: Film,
    category: "Web Dev",
    description: "Netflix-style movie catalog and recommendation demo app.",
    longDescription: "A movie catalog and recommendation demo app with an Angular 19 frontend and a Node.js and MongoDB backend.",
    techDetails: [
      "Angular 19 frontend for browsing and recommendations.",
      "Node.js and MongoDB backend with JWT-based signup and sign-in APIs.",
      "API tests."
    ],
    outcomes: [
      "Live deployment"
    ],
    tags: ["Angular", "TypeScript", "Node.js", "MongoDB", "JWT"],
    color: "text-red-400",
    link: "https://fletnix-client.vercel.app"
  },

  {
    title: "rateGaurd",
    icon: Gauge,
    category: "Backend/Tools",
    description: "Python tool with a Streamlit dashboard for invoice-related rate guarding and validation.",
    longDescription: "A Python tool with a Streamlit dashboard for invoice-related rate guarding and validation.",
    techDetails: [
      "Python core logic.",
      "Streamlit dashboard for invoice review."
    ],
    outcomes: [
      "Live deployment"
    ],
    tags: ["Python", "Streamlit"],
    color: "text-cyan-400",
    link: "https://rategaurd.streamlit.app/"
  },

  {
    title: "ePlatform – Ecommerce Platform",
    icon: ShoppingCart,
    category: "Web Dev",
    description: "Full-stack ecommerce platform with a client storefront and backend services.",
    longDescription: "A full-stack ecommerce platform with a React/Vite client storefront and backend services.",
    techDetails: [
      "React + Vite storefront.",
      "Separate backend service."
    ],
    outcomes: [
      "Live deployment"
    ],
    tags: ["React", "Vite", "JavaScript"],
    color: "text-blue-300",
    link: "https://eplatformck.vercel.app"
  },

  {
    title: "Wassel – On-Demand Logistics for UAE",
    icon: Truck,
    category: "Mobile",
    description: "Porter-style on-demand logistics and delivery platform, built for the UAE region.",
    longDescription: "A Porter-style on-demand logistics and delivery platform built for the UAE region, pairing a TypeScript/Expo client with a Python backend.",
    techDetails: [
      "TypeScript/Expo client app.",
      "Python backend service."
    ],
    outcomes: [],
    tags: ["TypeScript", "Expo", "Python"],
    color: "text-teal-400",
    link: "https://github.com/ali-mandela"
  },

  {
    title: "truereturn – Return Validation System",
    icon: RotateCcw,
    category: "Backend/Tools",
    description: "Validates whether a customer's product return is legitimate before it is approved. Under active development.",
    longDescription: "A system that evaluates whether a customer's product return is legitimate before it is approved — under active development.",
    techDetails: [
      "Under active development."
    ],
    outcomes: [],
    tags: ["In Development"],
    color: "text-zinc-400",
    link: "https://github.com/ali-mandela"
  },

  {
    title: "AI Agent & RAG System",
    icon: Cpu,
    category: "AI/ML",
    description: "AI-powered backend service integrating OpenAI APIs with custom Retrieval-Augmented Generation (RAG) pipelines.",
    longDescription: "An AI-powered backend service integrating OpenAI APIs with custom Retrieval-Augmented Generation (RAG) pipelines.",
    techDetails: [
      "OpenAI API integration.",
      "Custom RAG pipelines.",
      "Python backend."
    ],
    outcomes: [],
    tags: ["OpenAI", "RAG", "Python"],
    color: "text-purple-300",
    link: "https://github.com/ali-mandela"
  },

  {
    title: "Rapid Foods – Multi-Role Delivery System",
    icon: Zap,
    category: "Mobile",
    description: "Food delivery application supporting Admin, Restaurant, User, and Delivery Partner modules.",
    longDescription: "A food delivery application supporting Admin, Restaurant, User, and Delivery Partner modules, built with React Native, Node.js, and MongoDB.",
    techDetails: [
      "React Native mobile application.",
      "Node.js backend with MongoDB.",
      "Role-based modules for Admin, Restaurant, User, and Delivery Partner."
    ],
    outcomes: [],
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
