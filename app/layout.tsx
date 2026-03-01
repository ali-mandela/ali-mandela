import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Ali | SaaS & AI Engineer | Portfolio",
  description: "Product-focused Software Engineer building scalable multi-tenant SaaS platforms and AI-powered backend systems using FastAPI, Angular, Next.js, and MongoDB. Based in Bangalore.",
  keywords: [
    "Muhammad Ali", 
    "SaaS Engineer", 
    "AI Engineer", 
    "FastAPI", 
    "Next.js Portfolio", 
    "Multi-tenant Architecture", 
    "RAG Pipelines", 
    "Software Architect Bangalore"
  ],
  authors: [{ name: "Muhammad Ali" }],
  creator: "Muhammad Ali",
  openGraph: {
    title: "Muhammad Ali | SaaS & AI Engineer",
    description: "Architecting scalable production SaaS and AI-powered systems.",
    url: "https://ali-mandela.dev", // Replace with your actual domain
    siteName: "Muhammad Ali Portfolio",
    images: [
      {
        url: "/og-image.png", // You should generate/add this image
        width: 1200,
        height: 630,
        alt: "Muhammad Ali - SaaS & AI Engineer",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ali | SaaS & AI Engineer",
    description: "Building scalable SaaS and intelligent AI systems with FastAPI and Next.js.",
    creator: "@alimandela", // Update with your actual handle
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Muhammad Ali",
  "jobTitle": "SaaS & AI Engineer",
  "url": "https://ali-mandela.dev",
  "sameAs": [
    "https://github.com/ali-mandela",
    "https://linkedin.com/in/alimandela"
  ],
  "knowsAbout": [
    "Software Engineering",
    "SaaS Architecture",
    "Artificial Intelligence",
    "FastAPI",
    "Angular",
    "Next.js",
    "MongoDB"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
