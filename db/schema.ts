import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  role: text("role").notNull(),
  year: text("year").notNull(),
  category: text("category").notNull().default("fullstack"),
  description: text("description").notNull(),
  problem: text("problem").notNull().default(""),
  solution: text("solution").notNull().default(""),
  outcome: text("outcome").notNull().default(""),
  stack: text("stack").notNull().default("[]"),
  imageUrl: text("image_url").notNull(),
  liveUrl: text("live_url").notNull().default(""),
  repoUrl: text("repo_url").notNull().default(""),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at").notNull(),
  updatedAt: integer("updated_at").notNull(),
});

export const siteSettings = sqliteTable("site_settings", {
  id: integer("id").primaryKey(),
  fullName: text("full_name").notNull(),
  roleTitle: text("role_title").notNull(),
  heroHeadline: text("hero_headline").notNull(),
  heroSubheadline: text("hero_subheadline").notNull(),
  bio: text("bio").notNull(),
  availabilityText: text("availability_text").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  email: text("email").notNull(),
  location: text("location").notNull(),
  resumeUrl: text("resume_url").notNull().default("/assets/resume.pdf"),
  githubUrl: text("github_url").notNull().default(""),
  linkedinUrl: text("linkedin_url").notNull().default(""),
  instagramUrl: text("instagram_url").notNull().default(""),
  facebookUrl: text("facebook_url").notNull().default(""),
  updatedAt: integer("updated_at").notNull(),
});

export type ProjectRow = typeof projects.$inferSelect;
export type SiteSettingsRow = typeof siteSettings.$inferSelect;
