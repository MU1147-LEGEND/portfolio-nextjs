import { asc, eq, and } from "drizzle-orm";
import { getDb, type AppDatabase } from "@/db";
import { projects, siteSettings, type ProjectRow, type SiteSettingsRow } from "@/db/schema";
import { ensureSeedOnce, SEED_PROJECTS, DEFAULT_SITE_SETTINGS } from "@/db/seed";
import { slugify, type ProjectInput, type ProjectPatch, type SiteSettingsInput } from "./validators";

export interface ProjectDTO {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  role: string;
  year: string;
  category: "fullstack" | "frontend" | "product";
  domain: string;
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  stack: string[];
  imageUrl: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: number;
  updatedAt: number;
}

function toProjectDTO(row: ProjectRow): ProjectDTO {
  let stack: string[] = [];
  try {
    const parsed = JSON.parse(row.stack);
    if (Array.isArray(parsed)) stack = parsed.map(String);
  } catch {
    stack = [];
  }
  const cat =
    row.category === "frontend" || row.category === "product"
      ? row.category
      : "fullstack";

  return {
    ...row,
    category: cat,
    domain: row.domain ?? "",
    stack,
  };
}

function seedItemToProjectDTO(item: (typeof SEED_PROJECTS)[number], index: number): ProjectDTO {
  let stack: string[] = [];
  try {
    const parsed = JSON.parse(item.stack);
    if (Array.isArray(parsed)) stack = parsed.map(String);
  } catch {
    stack = [];
  }
  const cat =
    item.category === "frontend" || item.category === "product"
      ? item.category
      : "fullstack";

  return {
    id: index + 1,
    slug: item.slug,
    title: item.title,
    tagline: item.tagline,
    role: item.role,
    year: item.year,
    category: cat,
    domain: item.domain ?? "",
    description: item.description,
    problem: item.problem ?? "",
    solution: item.solution ?? "",
    outcome: item.outcome ?? "",
    stack,
    imageUrl: item.imageUrl,
    liveUrl: item.liveUrl ?? "",
    repoUrl: item.repoUrl ?? "",
    featured: item.featured,
    published: item.published,
    sortOrder: item.sortOrder,
    createdAt: 1731500000,
    updatedAt: 1731500000,
  };
}

export function getSeedProjectsFallback(): ProjectDTO[] {
  return SEED_PROJECTS.map((item, idx) => seedItemToProjectDTO(item, idx));
}

export async function getAllProjects(targetDb?: AppDatabase): Promise<ProjectDTO[]> {
  try {
    const db = targetDb ?? getDb();
    await ensureSeedOnce(targetDb);
    const rows = await db
      .select()
      .from(projects)
      .orderBy(asc(projects.sortOrder), asc(projects.id));
    if (rows.length > 0) return rows.map(toProjectDTO);
  } catch (error) {
    console.warn("getAllProjects database error, falling back to static seed:", error);
  }
  return getSeedProjectsFallback();
}

export async function getPublishedProjects(targetDb?: AppDatabase): Promise<ProjectDTO[]> {
  try {
    const db = targetDb ?? getDb();
    await ensureSeedOnce(targetDb);
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.published, true))
      .orderBy(asc(projects.sortOrder), asc(projects.id));
    if (rows.length > 0) return rows.map(toProjectDTO);
  } catch (error) {
    console.warn("getPublishedProjects database error, falling back to static seed:", error);
  }
  return getSeedProjectsFallback().filter((p) => p.published);
}

export async function getFeaturedProjects(targetDb?: AppDatabase): Promise<ProjectDTO[]> {
  try {
    const db = targetDb ?? getDb();
    await ensureSeedOnce(targetDb);
    const rows = await db
      .select()
      .from(projects)
      .where(and(eq(projects.published, true), eq(projects.featured, true)))
      .orderBy(asc(projects.sortOrder), asc(projects.id));
    if (rows.length > 0) return rows.map(toProjectDTO);
  } catch (error) {
    console.warn("getFeaturedProjects database error, falling back to static seed:", error);
  }
  return getSeedProjectsFallback()
    .filter((p) => p.published && p.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProjectBySlug(
  slug: string,
  targetDb?: AppDatabase
): Promise<ProjectDTO | null> {
  try {
    const db = targetDb ?? getDb();
    await ensureSeedOnce(targetDb);
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
      .limit(1);
    if (rows[0]) return toProjectDTO(rows[0]);
  } catch (error) {
    console.warn("getProjectBySlug database error, falling back to static seed:", error);
  }
  return getSeedProjectsFallback().find((p) => p.slug === slug) ?? null;
}

export async function getProjectById(
  id: number,
  targetDb?: AppDatabase
): Promise<ProjectDTO | null> {
  const db = targetDb ?? getDb();
  await ensureSeedOnce(targetDb);
  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return rows[0] ? toProjectDTO(rows[0]) : null;
}

export async function createProject(
  input: ProjectInput,
  targetDb?: AppDatabase
): Promise<ProjectDTO> {
  const db = targetDb ?? getDb();
  await ensureSeedOnce(targetDb);
  const now = Math.floor(Date.now() / 1000);
  const baseSlug = slugify(input.slug || input.title) || `project-${now}`;

  // Ensure unique slug if duplicate exists
  let candidate = baseSlug;
  let suffix = 2;
  while (await getProjectBySlug(candidate, targetDb)) {
    candidate = `${baseSlug}-${suffix++}`;
  }

  const all = await db.select({ sortOrder: projects.sortOrder }).from(projects);
  const maxOrder = all.reduce((m, r) => Math.max(m, r.sortOrder), 0);

  const inserted = await db
    .insert(projects)
    .values({
      slug: candidate,
      title: input.title,
      tagline: input.tagline,
      role: input.role,
      year: input.year,
      category: input.category,
      domain: input.domain ?? "",
      description: input.description,
      problem: input.problem ?? "",
      solution: input.solution ?? "",
      outcome: input.outcome ?? "",
      stack: JSON.stringify(input.stack),
      imageUrl: input.imageUrl,
      liveUrl: input.liveUrl ?? "",
      repoUrl: input.repoUrl ?? "",
      featured: Boolean(input.featured),
      published: input.published ?? true,
      sortOrder: input.sortOrder ?? maxOrder + 1,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return toProjectDTO(inserted[0]);
}

export async function updateProject(
  id: number,
  patch: ProjectPatch,
  targetDb?: AppDatabase
): Promise<ProjectDTO> {
  const db = targetDb ?? getDb();
  await ensureSeedOnce(targetDb);
  const existing = await getProjectById(id, targetDb);
  if (!existing) {
    throw new Error(`Project ${id} not found`);
  }
  const now = Math.floor(Date.now() / 1000);
  const nextSlug =
    patch.slug !== undefined ? slugify(patch.slug) || existing.slug : existing.slug;

  const updated = await db
    .update(projects)
    .set({
      slug: nextSlug,
      title: patch.title ?? existing.title,
      tagline: patch.tagline ?? existing.tagline,
      role: patch.role ?? existing.role,
      year: patch.year ?? existing.year,
      category: patch.category ?? existing.category,
      domain: patch.domain ?? existing.domain,
      description: patch.description ?? existing.description,
      problem: patch.problem ?? existing.problem,
      solution: patch.solution ?? existing.solution,
      outcome: patch.outcome ?? existing.outcome,
      stack: patch.stack ? JSON.stringify(patch.stack) : JSON.stringify(existing.stack),
      imageUrl: patch.imageUrl ?? existing.imageUrl,
      liveUrl: patch.liveUrl ?? existing.liveUrl,
      repoUrl: patch.repoUrl ?? existing.repoUrl,
      featured: patch.featured ?? existing.featured,
      published: patch.published ?? existing.published,
      sortOrder: patch.sortOrder ?? existing.sortOrder,
      updatedAt: now,
    })
    .where(eq(projects.id, id))
    .returning();

  return toProjectDTO(updated[0]);
}

export async function deleteProject(id: number, targetDb?: AppDatabase): Promise<void> {
  const db = targetDb ?? getDb();
  await ensureSeedOnce(targetDb);
  await db.delete(projects).where(eq(projects.id, id));
}

export async function getSiteSettings(targetDb?: AppDatabase): Promise<SiteSettingsRow> {
  try {
    const db = targetDb ?? getDb();
    await ensureSeedOnce(targetDb);
    const rows = await db.select().from(siteSettings).where(eq(siteSettings.id, 1)).limit(1);
    if (rows[0]) return rows[0];
  } catch (error) {
    console.warn("getSiteSettings database error, falling back to default:", error);
  }
  return DEFAULT_SITE_SETTINGS as SiteSettingsRow;
}

export async function updateSiteSettings(
  patch: Partial<SiteSettingsInput>,
  targetDb?: AppDatabase
): Promise<SiteSettingsRow> {
  const db = targetDb ?? getDb();
  await ensureSeedOnce(targetDb);
  const current = await getSiteSettings(targetDb);
  const now = Math.floor(Date.now() / 1000);
  const updated = await db
    .update(siteSettings)
    .set({
      fullName: patch.fullName ?? current.fullName,
      roleTitle: patch.roleTitle ?? current.roleTitle,
      heroHeadline: patch.heroHeadline ?? current.heroHeadline,
      heroSubheadline: patch.heroSubheadline ?? current.heroSubheadline,
      bio: patch.bio ?? current.bio,
      availabilityText: patch.availabilityText ?? current.availabilityText,
      whatsappNumber: patch.whatsappNumber ?? current.whatsappNumber,
      email: patch.email ?? current.email,
      location: patch.location ?? current.location,
      resumeUrl: patch.resumeUrl ?? current.resumeUrl,
      githubUrl: patch.githubUrl ?? current.githubUrl,
      linkedinUrl: patch.linkedinUrl ?? current.linkedinUrl,
      instagramUrl: patch.instagramUrl ?? current.instagramUrl,
      facebookUrl: patch.facebookUrl ?? current.facebookUrl,
      updatedAt: now,
    })
    .where(eq(siteSettings.id, 1))
    .returning();
  return updated[0];
}
