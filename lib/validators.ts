import { z } from "zod";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildWhatsAppUrl(phone: string, text?: string): string {
  const digits = phone.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  if (!text?.trim()) return base;
  return `${base}?text=${encodeURIComponent(text.trim())}`;
}

export const WHATSAPP_DEFAULT_MESSAGE = "Hi, I came from your portfolio website.";

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (v) => v === "" || v.startsWith("/") || /^https?:\/\//i.test(v),
    "Must be a valid http(s) URL or local asset path"
  )
  .optional()
  .default("");

export const projectInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  slug: z.string().trim().max(140).optional(),
  tagline: z.string().trim().min(1, "Tagline is required").max(200),
  role: z.string().trim().min(1, "Role is required").max(100),
  year: z.string().trim().min(2).max(20),
  category: z.enum(["fullstack", "frontend", "product"]),
  description: z.string().trim().min(1, "Description is required").max(3000),
  problem: z.string().trim().max(3000).optional().default(""),
  solution: z.string().trim().max(3000).optional().default(""),
  outcome: z.string().trim().max(1500).optional().default(""),
  stack: z.array(z.string().trim().min(1)).min(1, "At least one tech tag"),
  imageUrl: z
    .string()
    .trim()
    .min(1, "Image URL is required")
    .refine(
      (v) => v.startsWith("/") || /^https?:\/\//i.test(v),
      "Image must be a local path or http(s) URL"
    ),
  liveUrl: optionalUrl,
  repoUrl: optionalUrl,
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
  sortOrder: z.number().int().min(0).optional().default(0),
});

export const projectPatchSchema = projectInputSchema.partial();

export const siteSettingsSchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  roleTitle: z.string().trim().min(1).max(120),
  heroHeadline: z.string().trim().min(1).max(200),
  heroSubheadline: z.string().trim().min(1).max(320),
  bio: z.string().trim().min(1).max(2500),
  availabilityText: z.string().trim().min(1).max(160),
  whatsappNumber: z.string().trim().min(6).max(30),
  email: z.string().trim().email(),
  location: z.string().trim().min(1).max(120),
  resumeUrl: optionalUrl,
  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  instagramUrl: optionalUrl,
  facebookUrl: optionalUrl,
});

export type ProjectInput = z.infer<typeof projectInputSchema>;
export type ProjectPatch = z.infer<typeof projectPatchSchema>;
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
