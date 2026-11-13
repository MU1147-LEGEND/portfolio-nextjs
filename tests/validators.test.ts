import test from "node:test";
import assert from "node:assert/strict";
import {
  slugify,
  buildWhatsAppUrl,
  WHATSAPP_DEFAULT_MESSAGE,
  projectInputSchema,
  siteSettingsSchema,
} from "../lib/validators.ts";

test("slugify normalizes titles cleanly", () => {
  assert.equal(slugify("Next.js Learning Platform!"), "nextjs-learning-platform");
  assert.equal(slugify("  Visionary   AI — v2  "), "visionary-ai-v2");
});

test("buildWhatsAppUrl strips non-digits and encodes optional message", () => {
  assert.equal(
    buildWhatsAppUrl("+880 1734-906838"),
    "https://wa.me/8801734906838"
  );
  assert.equal(
    buildWhatsAppUrl("8801734906838", "Hi Mohammad, let's work together"),
    "https://wa.me/8801734906838?text=Hi%20Mohammad%2C%20let's%20work%20together"
  );
});

test("WHATSAPP_DEFAULT_MESSAGE constant is exported and non-empty", () => {
  assert.ok(typeof WHATSAPP_DEFAULT_MESSAGE === "string" && WHATSAPP_DEFAULT_MESSAGE.length > 0);
});

test("projectInputSchema validates valid project and rejects empty title or bad URL", () => {
  const valid = projectInputSchema.safeParse({
    title: "SanchayanBD",
    slug: "sanchayanbd",
    tagline: "Community finance platform",
    role: "Full-Stack Engineer",
    year: "2025",
    category: "fullstack",
    description: "Responsive community platform built with Next.js.",
    stack: ["Next.js", "Tailwind CSS"],
    imageUrl: "/assets/projects/sanchayanbd.png",
    liveUrl: "https://sanchayanbd.com",
    repoUrl: "https://github.com/MU1147-LEGEND/sanchayan",
    featured: true,
    published: true,
    sortOrder: 1,
  });
  assert.equal(valid.success, true);

  const invalid = projectInputSchema.safeParse({
    title: "",
    tagline: "x",
    role: "dev",
    year: "2025",
    category: "invalid-cat",
    description: "desc",
    stack: [],
    imageUrl: "",
    liveUrl: "not-a-url",
  });
  assert.equal(invalid.success, false);
});

test("siteSettingsSchema validates required portfolio fields", () => {
  const parsed = siteSettingsSchema.safeParse({
    fullName: "Mohammad Ullah",
    roleTitle: "Full-Stack Engineer",
    heroHeadline: "Building fast, tactile web software.",
    heroSubheadline: "Full-Stack Engineer crafting resilient Next.js products.",
    bio: "Developer based in Bangladesh.",
    availabilityText: "Available for freelance & full-time roles",
    whatsappNumber: "8801734906838",
    email: "ullahmohammad314@gmail.com",
    location: "Brahmanbaria, Bangladesh",
    resumeUrl: "/assets/resume.pdf",
  });
  assert.equal(parsed.success, true);
});
