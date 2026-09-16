import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import {
  RESUME_DRIVE_FILE_ID,
  resumeDownloadUrl,
  resumePreviewUrl,
} from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume | Muhammad Ali — Software Engineer",
  description: "Resume of Muhammad Ali, Software Engineer — SaaS, AI & Web Development.",
  alternates: {
    canonical: "https://amdak.in/resume",
  },
};

export default function ResumePage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 md:px-12 py-10 md:py-16 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-primary-text hover:text-highlight-text transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to portfolio
            </Link>
            <h1 className="text-4xl font-bold text-highlight-text tracking-tight">
              Resume
            </h1>
          </div>

          {RESUME_DRIVE_FILE_ID && (
            <a
              href={resumeDownloadUrl}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-highlight-text text-black rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          )}
        </div>

        {RESUME_DRIVE_FILE_ID ? (
          <div className="rounded-2xl border border-border-ui bg-surface overflow-hidden">
            <iframe
              src={resumePreviewUrl}
              title="Muhammad Ali — Resume"
              className="w-full h-[80vh] min-h-[600px]"
              allow="autoplay"
            />
          </div>
        ) : (
          <p className="text-primary-text">Resume coming soon.</p>
        )}
      </div>
    </div>
  );
}
