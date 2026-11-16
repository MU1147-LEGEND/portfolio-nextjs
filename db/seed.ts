import { sql, eq } from "drizzle-orm";
import { getDb, type AppDatabase } from "./index";
import { projects, siteSettings } from "./schema";

let initialized = false;

export const SEED_PROJECTS = [
  {
    slug: "yucar-rental",
    title: "YuCar Rental (Team Project)",
    tagline: "Team car rental comparison platform",
    role: "Full-Stack Engineer",
    year: "2025",
    category: "fullstack",
    description:
      "Team car rental comparison platform featuring vehicle inventory, booking system, and admin dashboard with advanced filtering and analytics.",
    problem:
      "Users lacked a centralized platform to compare team car rental options, pricing, and availability across multiple providers.",
    solution:
      "Built a comprehensive car rental comparison tool with real-time pricing, filterable vehicle listings, and a responsive admin dashboard.",
    outcome:
      "Delivered a scalable platform enabling team-based rental decisions with transparent pricing and availability tracking.",
    stack: JSON.stringify(["Next.js", "React", "Tailwind CSS", "TypeScript", "Node.js"]),
    imageUrl: "/assets/projects/yucar-rental.png",
    liveUrl: "https://www.yucarrental.com/en",
    repoUrl: "",
    domain: "travel / team",
    featured: true,
    published: true,
    sortOrder: 5,
  },
  {
    slug: "sanchayanbd",
    title: "SanchayanBD",
    tagline: "Community-based financial organization web platform",
    role: "Full-Stack Engineer",
    year: "2025",
    category: "fullstack",
    description:
      "SanchayanBD is a responsive web application built for a community-based financial organization, presenting membership tiers, member services, and transparent organizational values through an accessible interface.",
    problem:
      "Members and prospective applicants lacked a central, trustworthy place to review cooperative services, fee structures, and onboarding steps across mobile devices.",
    solution:
      "Designed a structured, high-legibility Next.js application with clear service pathways, fast asset delivery, and responsive layouts tailored for low-bandwidth mobile connections.",
    outcome:
      "Streamlined member onboarding inquiries and established a credible digital presence for community operations.",
    stack: JSON.stringify(["Next.js", "React", "Tailwind CSS", "Node.js"]),
    imageUrl: "/assets/projects/sanchayanbd.png",
    liveUrl: "https://sanchayanbd.com",
    repoUrl: "https://github.com/MU1147-LEGEND/sanchayan",
    featured: true,
    published: true,
    domain: "fintech",
    sortOrder: 1,
  },
  {
    slug: "nextipress",
    title: "NextiPress",
    tagline: "Modern multi-tenant ecommerce platform",
    role: "Full-Stack Engineer",
    year: "2025",
    category: "fullstack",
    description:
      "NextiPress is a modern multi-tenant ecommerce platform built with Next.js, featuring vendor onboarding, product catalog management, order processing, and a responsive admin dashboard. Supports multiple stores from a single deployment with isolated data and shared infrastructure.",
    problem:
      "Businesses needed a scalable ecommerce solution that could support multiple vendors and storefronts while maintaining isolated data, shared infrastructure, and consistent UX across tenants.",
    solution:
      "Built a Next.js multi-tenant architecture with tenant-aware routing, shared component library, tenant-specific theming, and a centralized admin panel for platform operations.",
    outcome:
      "Launched a production-ready multi-tenant ecommerce platform supporting multiple vendors with isolated data and shared infrastructure.",
    stack: JSON.stringify(["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"]),
    imageUrl: "/assets/projects/nextipress.png",
    liveUrl: "https://nextipress.shop",
    repoUrl: "",
    featured: true,
    published: true,
    domain: "saas",
    sortOrder: 2,
  },
  {
    slug: "focus-dock",
    title: "Focus Dock",
    tagline: "Pomodoro timer desktop app with system integration",
    role: "Desktop Engineer",
    year: "2025",
    category: "product",
    description:
      "Focus Dock is a native pomodoro timer desktop application built with Tauri (Rust + TypeScript), featuring system tray integration, native notifications, customizable work/break intervals, session statistics, and automatic break enforcement. Runs on Windows, macOS, and Linux.",
    problem:
      "Users needed a lightweight, cross-platform pomodoro timer that integrates deeply with the OS (system tray, native notifications, auto-start) without Electron bloat.",
    solution:
      "Built a Tauri app with Rust backend for native OS integration and TypeScript/React frontend. Features system tray with live timer, global hotkeys, focus mode blocking, and local SQLite persistence.",
    outcome:
      "Delivered a <5MB native desktop app with 60fps animations, zero Electron overhead, and full cross-platform system integration.",
    stack: JSON.stringify(["Tauri", "Rust", "TypeScript", "React", "Tailwind CSS", "SQLite"]),
    imageUrl: "/assets/projects/focus-dock.png",
    liveUrl: "",
    repoUrl: "https://github.com/MU1147-LEGEND/pomodoro-desktop-app",
    domain: "productivity",
    featured: true,
    published: true,
    sortOrder: 4,
  },
  {
    slug: "basati",
    title: "BASATI Institute",
    tagline: "Technical education institute & student portal",
    role: "Full-Stack Engineer",
    year: "2025",
    category: "fullstack",
    description:
      "BASATI is a comprehensive polytechnic institute website with department showcases, faculty profiles, admissions portal, campus facilities, and student dashboard. Built for Badiul Alam Science and Technology Institute in Kasba, Brahmanbaria.",
    problem:
      "Institute lacked a modern digital presence to showcase programs, faculty, and admissions process to prospective students in rural Bangladesh.",
    solution:
      "Developed a multilingual Next.js site with department curricula, faculty directory, admission workflow, and responsive campus facility galleries.",
    outcome:
      "Established BASATI as a leading technical education institute online with a functional student admission portal.",
    stack: JSON.stringify(["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"]),
    imageUrl: "/assets/projects/basati.png",
    liveUrl: "https://basati.vercel.app/",
    repoUrl: "",
    featured: true,
    published: true,
    domain: "edtech",
    sortOrder: 3,
  },
  {
    slug: "text-to-speech",
    title: "Text-to-Speech Fullstack",
    tagline: "AI-powered text-to-speech with Azure neural voices",
    role: "Product Engineer",
    year: "2025",
    category: "product",
    description:
      "A production-ready text-to-speech application leveraging Azure Cognitive Services neural voices with real-time preview, MP3 download, voice customization (rate, pitch), and multi-language support.",
    problem:
      "Existing TTS tools were either too technical for general users or lacked quality voice options and customization controls.",
    solution:
      "Built an accessible fullstack Next.js app with Azure Speech SDK integration, intuitive voice selector, audio playback controls, and downloadable MP3 export.",
    outcome:
      "Delivered a polished AI audio product deployed on Vercel with low-latency generation and clean UX.",
    stack: JSON.stringify(["Next.js", "React", "TypeScript", "Tailwind CSS", "Azure Speech SDK"]),
    imageUrl: "/assets/projects/text-to-speech.png",
    liveUrl: "https://text-to-speech-nextjs-fullstack.vercel.app/",
    repoUrl: "",
    featured: false,
    published: true,
    sortOrder: 6,
  },
  {
    slug: "my-id-card",
    title: "Student ID Card Generator",
    tagline: "Digital ID card designer for institutes",
    role: "Frontend Architect",
    year: "2025",
    category: "frontend",
    description:
      "A feature-rich ID card generator allowing institutes to create professional student ID cards with customizable templates, photo uploads, guardian info, blood group, and multiple design themes (Classic Blue, Modern Dark, Minimalist).",
    problem:
      "Institutes needed an easy, browser-based tool to generate printable student ID cards without specialized design software.",
    solution:
      "Built a React/Next.js frontend with canvas-based card rendering, live preview, drag-and-drop photo/logo uploads, and three professional themes with PDF/PNG export.",
    outcome:
      "Enabled institutes to generate branded ID cards in minutes with zero design expertise required.",
    stack: JSON.stringify(["Next.js", "React", "TypeScript", "Tailwind CSS", "Canvas API"]),
    imageUrl: "/assets/projects/my-id-card.png",
    liveUrl: "https://my-id-card-nine.vercel.app/",
    repoUrl: "",
    featured: false,
    published: true,
    sortOrder: 7,
  },
  {
    slug: "sunnah-store",
    title: "Sunnah Store",
    tagline: "Team Islamic e-commerce & multi-vendor book catalog",
    role: "Full-Stack Engineer",
    year: "2025",
    category: "fullstack",
    description:
      "Sunnah Store is a multi-vendor Islamic e-commerce platform featuring 3000+ SKUs across books, electronics, groceries, and clothing. Includes 20+ physical outlets, 10-year service history, 200k+ served customers, and ISO-certified operations.",
    problem:
      "Islamic retail chain lacked a unified digital commerce platform connecting their physical outlets, vendor catalog, and loyal customer base with modern checkout and delivery.",
    solution:
      "Built a comprehensive Next.js e-commerce app with multi-vendor support, category filtering, cart/wishlist, order tracking, bKash/Credit Card/PayPal payments, and location-based delivery costing.",
    outcome:
      "Launched a scalable Islamic commerce platform serving 25k+ sqft physical retail operations across Dhaka, Chattogram, and Jashore.",
    stack: JSON.stringify(["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Vercel"]),
    imageUrl: "/assets/projects/sunnah-store.png",
    liveUrl: "https://sunnah-store.vercel.app/books",
    repoUrl: "",
    featured: false,
    published: true,
    sortOrder: 8,
  },
  {
    slug: "lumiere-cosmetics",
    title: "LUMIÈRE Cosmetics",
    tagline: "Luxury cosmetics landing page & brand showcase",
    role: "Frontend Architect",
    year: "2025",
    category: "frontend",
    description:
      "LUMIÈRE is a premium cosmetics brand landing page featuring elegant hero with animated product reveals, curated collection grids, shade swatches, and editorial-style storytelling sections. Built with v0 for rapid iteration.",
    problem:
      "Cosmetics brand needed a high-end digital presence that conveyed luxury positioning while remaining performant and conversion-focused.",
    solution:
      "Designed a refined Next.js landing page with smooth scroll animations, responsive product galleries, interactive shade selectors, and optimized Core Web Vitals.",
    outcome:
      "Delivered a performant luxury brand site with sub-100ms LCP and editorial-grade visual quality.",
    stack: JSON.stringify(["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion", "v0"]),
    imageUrl: "/assets/projects/lumiere-cosmetics.png",
    liveUrl: "https://v0-cosmetics-landing-page-pink.vercel.app/",
    repoUrl: "",
    featured: false,
    published: true,
    sortOrder: 9,
  },
  {
    slug: "original-cosmetics",
    title: "Original Cosmetics",
    tagline: "Skincare bundles & beauty e-commerce (UAE)",
    role: "Full-Stack Engineer",
    year: "2025",
    category: "fullstack",
    description:
      "Original Cosmetics is a UAE-based skincare and cosmetics e-commerce platform featuring curated product bundles, subscription models, loyalty rewards, and multilingual support (EN/AR). Includes admin dashboard for inventory, orders, and customer management.",
    problem:
      "Beauty brand needed a localized e-commerce platform for the UAE market with Arabic RTL support, bundle-based pricing, and subscription recurring orders.",
    solution:
      "Built a fullstack Next.js commerce app with NextAuth authentication, Stripe subscriptions, RTL/EN locale switching, bundle builder, and Vercel Edge deployment for low-latency MENA delivery.",
    outcome:
      "Launched a UAE-compliant beauty commerce platform with subscription revenue and bilingual UX.",
    stack: JSON.stringify(["Next.js", "React", "TypeScript", "Tailwind CSS", "Stripe", "NextAuth", "Vercel Edge"]),
    imageUrl: "/assets/projects/original-cosmetics.png",
    liveUrl: "https://originalcosmetics.shop/",
    repoUrl: "",
    featured: false,
    published: true,
    sortOrder: 10,
  },
  {
    slug: "rdshop360",
    title: "RD SHOP 360",
    tagline: "Multi-category retail & wholesale marketplace",
    role: "Full-Stack Engineer",
    year: "2025",
    category: "fullstack",
    description:
      "RD SHOP 360 is a Bangladesh-based omnichannel retail platform combining B2C and B2B wholesale ordering. Features category megamenus, bulk pricing tiers, dealer registration, order management, and delivery zone-based logistics.",
    problem:
      "Traditional retailer lacked digital wholesale channel for dealers and efficient B2C storefront for end customers across multiple product categories.",
    solution:
      "Developed a unified Next.js marketplace with role-based pricing (retail vs wholesale), dealer onboarding flow, category-based inventory, and zone-wise delivery cost calculation.",
    outcome:
      "Enabled seamless B2B/B2C operations for 500+ SKUs across electronics, cosmetics, and household categories.",
    stack: JSON.stringify(["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"]),
    imageUrl: "/assets/projects/rdshop360.png",
    liveUrl: "https://rdshop360.com/",
    repoUrl: "",
    featured: false,
    published: true,
    sortOrder: 11,
  },
  {
    slug: "tamota",
    title: "Tamota Shop",
    tagline: "Premium cosmetics & skincare e-commerce (Bangladesh)",
    role: "Full-Stack Engineer",
    year: "2025",
    category: "fullstack",
    description:
      "Tamota is a premium Bangladeshi cosmetics and skincare e-commerce store featuring dermatologist-curated products, routine builders, ingredient education, skin-type filters, and loyalty points. Includes vendor dashboard for brand partners.",
    problem:
      "Local skincare market lacked a trusted curated platform with ingredient transparency, routine guidance, and authentic product sourcing.",
    solution:
      "Built a content-rich Next.js commerce app with skin-type routing, ingredient glossary, routine quiz, verified vendor badges, and bKash/Nagad/Card checkout integration.",
    outcome:
      "Established a credible beauty commerce destination with educational content driving higher conversion and repeat purchases.",
    stack: JSON.stringify(["Next.js", "React", "TypeScript", "Tailwind CSS", "bKash", "Nagad", "Vercel"]),
    imageUrl: "/assets/projects/tamota.png",
    liveUrl: "https://tamota.shop/",
    repoUrl: "",
    featured: false,
    published: true,
    sortOrder: 12,
  },
  {
    slug: "moi-beauty",
    title: "M.O.I Beauty",
    tagline: "Premium cosmetics brand experience & product catalog",
    role: "Frontend Architect",
    year: "2025",
    category: "frontend",
    description:
      "M.O.I Beauty is a premium cosmetics brand website with immersive product storytelling, shade-matched recommendations, editorial lookbooks, and a minimalist shop interface. Emphasizes bold beauty aesthetic with high-end visual design.",
    problem:
      "Cosmetics brand needed a bold, editorial-grade digital experience that matched their unapologetic brand voice while remaining shoppable and fast.",
    solution:
      "Designed a Next.js brand site with full-bleed editorial layouts, interactive shade exploration, lookbook galleries, and optimized image delivery via Next.js Image and Vercel Edge.",
    outcome:
      "Delivered a visually striking brand flagship with editorial depth and commercial functionality.",
    stack: JSON.stringify(["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion", "Vercel"]),
    imageUrl: "/assets/projects/moi-beauty.png",
    liveUrl: "https://moi-beauty-beta.vercel.app/",
    repoUrl: "",
    featured: false,
    published: true,
    sortOrder: 13,
  },
  {
    slug: "velvet-beauty",
    title: "Velvet Beauty",
    tagline: "Bold beauty cosmetics landing & collection showcase",
    role: "Frontend Architect",
    year: "2025",
    category: "frontend",
    description:
      "Velvet Beauty is a bold cosmetics landing page featuring dramatic hero animations, collection carousels, shade intensity visualizers, and a confident brand narrative. Built for rapid iteration with Netlify deployment.",
    problem:
      "New beauty brand needed an immediate high-impact web presence to support launch marketing and social campaigns with minimal development time.",
    solution:
      "Rapidly prototyped a Netlify-deployed Next.js landing page using component-driven architecture, Lottie/GSAP hero animations, and responsive collection grids optimized for mobile-first social traffic.",
    outcome:
      "Launched a campaign-ready beauty landing page in under a week with bold visual identity and lead capture.",
    stack: JSON.stringify(["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Netlify"]),
    imageUrl: "/assets/projects/velvet-beauty.png",
    liveUrl: "https://magnificent-duckanoo-3ec124.netlify.app/",
    repoUrl: "",
    featured: false,
    published: true,
    sortOrder: 14,
  },
  {
    slug: "one-little-web",
    title: "One Little Web",
    tagline: "Simple landing page",
    role: "Frontend Developer",
    year: "2025",
    category: "frontend",
    description: "A simple landing page prototype.",
    problem: "A concise online presence for a small project.",
    solution: "A focused single-page website.",
    outcome: "A live landing page for the project.",
    stack: JSON.stringify(["Web"]),
    imageUrl: "/assets/projects/one-little-web.png",
    liveUrl: "https://one-little-web-six.vercel.app/",
    repoUrl: "",
    featured: false,
    published: true,
    sortOrder: 15,
  },
  {
    slug: "nextjs-learning-platform",
    title: "Next.js Learning Platform",
    tagline: "Structured developer curriculum & interactive documentation hub",
    role: "Frontend Architect",
    year: "2025",
    category: "frontend",
    description: "A curated learning platform for mastering modern Next.js App Router architecture, server components, and practical project patterns with structured tutorials.",
    problem: "Beginners transitioning to App Router face fragmented documentation and struggle to connect routing concepts with real UI implementation.",
    solution: "Built a modular curriculum layout with code examples, responsive navigation, and reading-focused typography.",
    outcome: "Delivered a self-paced learning environment deployed on Vercel.",
    stack: JSON.stringify(["Next.js", "TypeScript", "Tailwind CSS", "Vercel"]),
    imageUrl: "/assets/projects/nextlearn.png",
    liveUrl: "https://learn-next-modern.vercel.app/",
    repoUrl: "https://github.com/MU1147-LEGEND/nextjs-learning-platform-using-v0",
    featured: false,
    published: true,
    sortOrder: 2,
  },
  {
    slug: "visionary-ai",
    title: "VisionaryAI",
    tagline: "AI-powered creative workflow & prompt workspace",
    role: "Product Engineer",
    year: "2024",
    category: "product",
    description: "An experimental interface exploring AI generation workflows with visual previews and responsive controls.",
    problem: "Creative AI tools can overwhelm users with dense parameter panels.",
    solution: "A focused workspace prioritizing visual previews, sensible defaults, and progressive disclosure.",
    outcome: "Validated prompt-to-preview interaction patterns.",
    stack: JSON.stringify(["React", "Next.js", "Tailwind CSS", "Motion"]),
    imageUrl: "/assets/projects/visionaryai.png",
    liveUrl: "",
    repoUrl: "https://github.com/MU1147-LEGEND",
    featured: false,
    published: true,
    sortOrder: 3,
  },
];

export const DEFAULT_SITE_SETTINGS = {
  id: 1,
  fullName: "Mohammad Ullah",
  roleTitle: "Full-Stack Engineer",
  heroHeadline: "Designing and engineering fast, tactile web software.",
  heroSubheadline:
    "I build Next.js systems, full-stack products, and refined interfaces where clarity and motion feel effortless.",
  bio: "I'm Mohammad Ullah, a Full-Stack Engineer from Bangladesh focused on building resilient web applications with React, Next.js, TypeScript, and modern databases. I care deeply about architecture that scales cleanly, typography that guides attention, and interactions that feel immediate under the fingertips — both in code and out on long biking rides.",
  availabilityText: "Available for freelance & product engineering roles",
  whatsappNumber: "8801734906838",
  email: "ullahmohammad314@gmail.com",
  location: "Brahmanbaria, Bangladesh",
  resumeUrl: "/assets/resume.pdf",
  githubUrl: "https://github.com/MU1147-LEGEND",
  linkedinUrl: "https://www.linkedin.com/in/mohammad-ullah32",
  instagramUrl: "https://www.instagram.com/mohammad_ullah11/",
  facebookUrl: "https://facebook.com/fb.mohammadullah",
  updatedAt: 1731500000,
};

export async function ensureSchemaAndSeed(targetDb: AppDatabase = getDb()): Promise<void> {
  await targetDb.run(sql`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      tagline TEXT NOT NULL,
      role TEXT NOT NULL,
      year TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'fullstack',
      domain TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL,
      problem TEXT NOT NULL DEFAULT '',
      solution TEXT NOT NULL DEFAULT '',
      outcome TEXT NOT NULL DEFAULT '',
      stack TEXT NOT NULL DEFAULT '[]',
      image_url TEXT NOT NULL,
      live_url TEXT NOT NULL DEFAULT '',
      repo_url TEXT NOT NULL DEFAULT '',
      featured INTEGER NOT NULL DEFAULT 0,
      published INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    )
  `);

  await targetDb.run(sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY,
      full_name TEXT NOT NULL,
      role_title TEXT NOT NULL,
      hero_headline TEXT NOT NULL,
      hero_subheadline TEXT NOT NULL,
      bio TEXT NOT NULL,
      availability_text TEXT NOT NULL,
      whatsapp_number TEXT NOT NULL,
      email TEXT NOT NULL,
      location TEXT NOT NULL,
      resume_url TEXT NOT NULL DEFAULT '/assets/resume.pdf',
      github_url TEXT NOT NULL DEFAULT '',
      linkedin_url TEXT NOT NULL DEFAULT '',
      instagram_url TEXT NOT NULL DEFAULT '',
      facebook_url TEXT NOT NULL DEFAULT '',
      updated_at INTEGER NOT NULL
    )
  `);

  try {
    await targetDb.run(sql`ALTER TABLE projects ADD COLUMN domain TEXT NOT NULL DEFAULT ''`);
  } catch {
    // Column already exists
  }

  const now = Math.floor(Date.now() / 1000);

  const existingSettings = await targetDb.select().from(siteSettings).limit(1);
  if (existingSettings.length === 0) {
    await targetDb.insert(siteSettings).values({
      ...DEFAULT_SITE_SETTINGS,
      updatedAt: now,
    });
  }

  // Idempotent: insert missing projects, and sync featured flags, sortOrder & domain
  for (const projectData of SEED_PROJECTS) {
    const exists = await targetDb
      .select({ slug: projects.slug })
      .from(projects)
      .where(eq(projects.slug, projectData.slug))
      .limit(1);
    if (exists.length === 0) {
      await targetDb.insert(projects).values({
        ...projectData,
        createdAt: now,
        updatedAt: now,
      });
    } else {
      await targetDb
        .update(projects)
        .set({
          featured: projectData.featured,
          sortOrder: projectData.sortOrder,
          domain: projectData.domain ?? "",
          imageUrl: projectData.imageUrl,
          title: projectData.title,
        })
        .where(eq(projects.slug, projectData.slug));
    }
  }
}

export async function ensureSeedOnce(targetDb?: AppDatabase): Promise<void> {
  if (targetDb) {
    await ensureSchemaAndSeed(targetDb);
    return;
  }
  if (!initialized) {
    await ensureSchemaAndSeed(getDb());
    initialized = true;
  }
}