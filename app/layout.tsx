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
  metadataBase: new URL("https://amdak.in"),
  title: "Muhammad Ali | Software Engineer — SaaS, AI & Web Development | Kargil, Leh, Ladakh",
  description: "Software Engineer building scalable SaaS platforms, AI-powered systems, and web/app solutions — serving clients across Kargil, Leh & Ladakh, and Bangalore. FastAPI, Next.js, Angular, MongoDB.",
  keywords: [
    "Muhammad Ali",
    "SaaS Engineer",
    "AI Engineer",
    "FastAPI",
    "Next.js Portfolio",
    "Multi-tenant Architecture",
    "RAG Pipelines",
    "Software Architect Bangalore",
    "Web Developer Kargil",
    "Software Developer Ladakh",
    "App Development Leh",
    "IT Services Kargil",
    "Web Development Ladakh",
    "Software Engineer Leh Ladakh",
    "Tech Services Kargil Ladakh",
  ],
  authors: [{ name: "Muhammad Ali" }],
  creator: "Muhammad Ali",
  openGraph: {
    title: "Muhammad Ali | Software Engineer — SaaS, AI & Web Development",
    description: "Architecting scalable SaaS and AI-powered systems — serving clients across Kargil, Leh & Ladakh, and Bangalore.",
    url: "https://amdak.in",
    siteName: "Muhammad Ali Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ali | SaaS, AI & Web Development",
    description: "Building scalable SaaS and intelligent AI systems — serving Kargil, Leh & Ladakh, and Bangalore.",
    creator: "@alimandela",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "GFBktvKqxdu9kgkRX8nZCcweaJp1ZbYP3Y82EnzFowg",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://amdak.in",
  },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://amdak.in/#person",
  "name": "Muhammad Ali",
  "jobTitle": "Software Engineer",
  "url": "https://amdak.in",
  "image": "https://amdak.in/apple-touch-icon.png",
  "email": "mailto:muhammadali.nitrkl@gmail.com",
  "telephone": "+91-9682184658",
  "homeLocation": {
    "@type": "Place",
    "name": "Kargil, Ladakh",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kargil",
      "addressRegion": "Ladakh",
      "addressCountry": "IN",
    },
  },
  "workLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "addressCountry": "IN",
    },
  },
  "sameAs": [
    "https://github.com/ali-mandela",
    "https://linkedin.com/in/alimandela"
  ],
  "knowsAbout": [
    "Software Engineering",
    "SaaS Architecture",
    "Artificial Intelligence",
    "Python",
    "FastAPI",
    "LangChain",
    "RAG Pipelines",
    "LLM Fine-Tuning",
    "Angular",
    "Next.js",
    "MongoDB",
    "Microservices",
    "Multi-Tenant Systems"
  ]
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Muhammad Ali — Software, AI & Web Development Services",
  "image": "https://amdak.in/apple-touch-icon.png",
  "url": "https://amdak.in",
  "priceRange": "$$",
  "email": "muhammadali.nitrkl@gmail.com",
  "telephone": "+91-9682184658",
  "areaServed": [
    { "@type": "City", "name": "Kargil" },
    { "@type": "City", "name": "Leh" },
    { "@type": "AdministrativeArea", "name": "Ladakh" },
    { "@type": "City", "name": "Bengaluru" },
  ],
  "serviceType": [
    "SaaS & MVP Development",
    "AI Integration & Automation",
    "Backend Architecture & API Development",
    "Frontend Engineering & Web Development",
  ],
  "provider": { "@id": "https://amdak.in/#person" },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
        />
        {children}
      </body>
    </html>
  );
}
