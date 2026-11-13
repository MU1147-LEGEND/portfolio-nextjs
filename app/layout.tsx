import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono, Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { getSiteSettings } from "@/lib/queries";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohammadullah.me"),
  title: {
    default: "Mohammad Ullah — Software Engineer & Full-Stack Web Developer",
    template: "%s — Mohammad Ullah",
  },
  description:
    "Mohammad Ullah is a full-stack software engineer and web developer specializing in Next.js, React, TypeScript, and high-performance digital products.",
  keywords: [
    "Mohammad Ullah",
    "developer Mohammad Ullah",
    "software engineer Mohammad Ullah",
    "Mohammad Ullah web developer",
    "Mohammad Ullah portfolio",
    "web development",
    "web developer",
    "full stack developer",
    "software engineer",
    "Next.js developer",
    "React developer",
    "TypeScript engineer",
    "frontend engineer",
    "backend engineer",
    "software engineer Bangladesh",
    "Next.js App Router",
    "React 19",
    "Tailwind CSS",
    "Drizzle ORM",
    "SaaS development",
    "fintech web developer",
    "ecommerce developer",
    "Tauri desktop developer",
    "responsive web design",
  ],
  authors: [{ name: "Mohammad Ullah", url: "https://mohammadullah.me" }],
  creator: "Mohammad Ullah",
  publisher: "Mohammad Ullah",
  category: "technology",
  alternates: {
    canonical: "https://mohammadullah.me",
  },
  icons: {
    icon: "/favicon-v2.ico",
    shortcut: "/favicon-v2.ico",
    apple: "/favicon-v2.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohammadullah.me",
    siteName: "Mohammad Ullah — Software Engineer",
    title: "Mohammad Ullah — Software Engineer & Full-Stack Web Developer",
    description:
      "Full-stack software engineer crafting resilient Next.js systems, tactile interfaces, and scalable web software.",
    images: [
      {
        url: "https://mohammadullah.me/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mohammad Ullah — Software Engineer & Full-Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Ullah — Software Engineer & Full-Stack Web Developer",
    description:
      "Full-stack software engineer crafting resilient Next.js systems, tactile interfaces, and scalable web software.",
    creator: "@mu1147_legend",
    images: ["https://mohammadullah.me/opengraph-image"],
  },
};

const THEME_INIT_SCRIPT = `
(function() {
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) {}
})();
`;

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://mohammadullah.me/#person",
        name: settings.fullName,
        alternateName: [
          "Developer Mohammad Ullah",
          "Software Engineer Mohammad Ullah",
          "Mohammad Ullah Developer",
          "mu1147-legend",
        ],
        url: "https://mohammadullah.me",
        image: "https://mohammadullah.me/assets/profile_square.jpg",
        jobTitle: "Software Engineer & Full-Stack Web Developer",
        description: settings.bio,
        email: `mailto:${settings.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Brahmanbaria",
          addressCountry: "Bangladesh",
        },
        knowsAbout: [
          "Web Development",
          "Software Engineering",
          "Next.js",
          "React 19",
          "TypeScript",
          "Node.js",
          "Tailwind CSS",
          "Drizzle ORM",
          "SQLite",
          "Full-Stack Web Development",
          "SaaS Architecture",
          "REST APIs",
          "Tauri Desktop Development",
          "Front-End Engineering",
        ],
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Learn With Sumit (LWS)",
          },
          {
            "@type": "EducationalOrganization",
            name: "freeCodeCamp",
          },
        ],
        sameAs: [
          settings.githubUrl,
          settings.linkedinUrl,
          settings.instagramUrl,
          settings.facebookUrl,
        ].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": "https://mohammadullah.me/#website",
        url: "https://mohammadullah.me",
        name: "Mohammad Ullah — Software Engineer Portfolio",
        description: "Portfolio of Software Engineer and Full-Stack Web Developer Mohammad Ullah",
        publisher: { "@id": "https://mohammadullah.me/#person" },
        inLanguage: "en",
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased selection:bg-[var(--accent)] selection:text-white">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader
          fullName={settings.fullName}
          whatsappNumber={settings.whatsappNumber}
        />
        <main id="main">{children}</main>
        <SiteFooter settings={settings} />
        <SmoothScroll />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
