"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Eye,
  EyeOff,
  LogOut,
  Pencil,
  Plus,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";
import ThemeToggle from "@/components/layout/ThemeToggle";
import type { SiteSettingsRow } from "@/db/schema";
import type { ProjectDTO } from "@/lib/queries";
import { slugify } from "@/lib/validators";
import { cn } from "@/lib/utils";

interface AdminDashboardProps {
  initialProjects: ProjectDTO[];
  initialSettings: SiteSettingsRow;
}

interface ProjectFormState {
  id?: number;
  title: string;
  slug: string;
  tagline: string;
  role: string;
  year: string;
  category: "fullstack" | "frontend" | "product";
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  stackText: string;
  imageUrl: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
}

const EMPTY_FORM = (nextOrder: number): ProjectFormState => ({
  title: "",
  slug: "",
  tagline: "",
  role: "Full-Stack Engineer",
  year: String(new Date().getFullYear()),
  category: "fullstack",
  description: "",
  problem: "",
  solution: "",
  outcome: "",
  stackText: "Next.js, TypeScript, Tailwind CSS",
  imageUrl: "/assets/projects/sanchayanbd.png",
  liveUrl: "",
  repoUrl: "",
  featured: true,
  published: true,
  sortOrder: nextOrder,
});

const PRESET_IMAGES = [
  "/assets/projects/sanchayanbd.png",
  "/assets/projects/nextlearn.png",
  "/assets/projects/visionaryai.png",
];

export default function AdminDashboard({
  initialProjects,
  initialSettings,
}: AdminDashboardProps) {
  const router = useRouter();
  const [tab, setTab] = useState<"projects" | "settings">("projects");
  const [projects, setProjects] = useState<ProjectDTO[]>(initialProjects);
  const [settings, setSettings] = useState<SiteSettingsRow>(initialSettings);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<ProjectFormState>(
    EMPTY_FORM(initialProjects.length + 1)
  );
  const [slugLocked, setSlugLocked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const refreshProjects = async () => {
    const res = await fetch("/api/projects");
    if (res.ok) {
      const data = await res.json();
      setProjects(data.projects);
    }
    router.refresh();
  };

  const openCreate = () => {
    setForm(EMPTY_FORM(projects.length + 1));
    setSlugLocked(false);
    setModalOpen(true);
  };

  const openEdit = (p: ProjectDTO) => {
    setForm({
      id: p.id,
      title: p.title,
      slug: p.slug,
      tagline: p.tagline,
      role: p.role,
      year: p.year,
      category: p.category,
      description: p.description,
      problem: p.problem,
      solution: p.solution,
      outcome: p.outcome,
      stackText: p.stack.join(", "),
      imageUrl: p.imageUrl,
      liveUrl: p.liveUrl,
      repoUrl: p.repoUrl,
      featured: p.featured,
      published: p.published,
      sortOrder: p.sortOrder,
    });
    setSlugLocked(true);
    setModalOpen(true);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Upload failed");
        return;
      }
      setForm((prev) => ({ ...prev, imageUrl: data.url }));
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProject = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const stack = form.stackText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        title: form.title,
        slug: form.slug || slugify(form.title),
        tagline: form.tagline,
        role: form.role,
        year: form.year,
        category: form.category,
        description: form.description,
        problem: form.problem,
        solution: form.solution,
        outcome: form.outcome,
        stack,
        imageUrl: form.imageUrl,
        liveUrl: form.liveUrl,
        repoUrl: form.repoUrl,
        featured: form.featured,
        published: form.published,
        sortOrder: Number(form.sortOrder) || 0,
      };

      const isEdit = Boolean(form.id);
      const res = await fetch(
        isEdit ? `/api/projects/${form.id}` : "/api/projects",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to save project");
        return;
      }
      toast.success(isEdit ? "Project updated" : "Project created");
      setModalOpen(false);
      await refreshProjects();
    } catch {
      toast.error("Network error saving project");
    } finally {
      setSaving(false);
    }
  };

  const quickToggle = async (
    p: ProjectDTO,
    field: "published" | "featured"
  ) => {
    const nextVal = !p[field];
    setProjects((prev) =>
      prev.map((item) =>
        item.id === p.id ? { ...item, [field]: nextVal } : item
      )
    );
    const res = await fetch(`/api/projects/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: nextVal }),
    });
    if (!res.ok) {
      toast.error("Update failed");
      await refreshProjects();
      return;
    }
    toast.success(
      field === "published"
        ? nextVal
          ? "Published"
          : "Moved to draft"
        : nextVal
          ? "Pinned to home stage"
          : "Removed from home stage"
    );
    router.refresh();
  };

  const moveOrder = async (index: number, direction: -1 | 1) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= projects.length) return;

    const current = projects[index];
    const swapWith = projects[targetIdx];

    const reordered = [...projects];
    reordered[index] = { ...swapWith, sortOrder: index + 1 };
    reordered[targetIdx] = { ...current, sortOrder: targetIdx + 1 };
    setProjects(reordered);

    await Promise.all([
      fetch(`/api/projects/${current.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: targetIdx + 1 }),
      }),
      fetch(`/api/projects/${swapWith.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: index + 1 }),
      }),
    ]);
    toast.success("Order updated");
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Delete failed");
      return;
    }
    setConfirmDeleteId(null);
    toast.success("Project deleted");
    await refreshProjects();
  };

  const handleSaveSettings = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: settings.fullName,
          roleTitle: settings.roleTitle,
          heroHeadline: settings.heroHeadline,
          heroSubheadline: settings.heroSubheadline,
          bio: settings.bio,
          availabilityText: settings.availabilityText,
          whatsappNumber: settings.whatsappNumber,
          email: settings.email,
          location: settings.location,
          resumeUrl: settings.resumeUrl,
          githubUrl: settings.githubUrl,
          linkedinUrl: settings.linkedinUrl,
          instagramUrl: settings.instagramUrl,
          facebookUrl: settings.facebookUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to save settings");
        return;
      }
      setSettings(data.settings);
      toast.success("Site settings updated");
      router.refresh();
    } catch {
      toast.error("Network error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const publishedCount = projects.filter((p) => p.published).length;
  const featuredCount = projects.filter((p) => p.published && p.featured).length;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1280px] space-y-8">
        {/* Top Chrome */}
        <header className="apple-chrome flex flex-wrap items-center justify-between gap-4 rounded-3xl px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--status-live)]" />
            <h1 className="text-[16px] font-semibold tracking-tight text-[var(--ink-primary)]">
              Portfolio CMS
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="pressable inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[var(--hairline)] bg-[var(--bg-surface)] px-4 text-[13px] font-medium text-[var(--ink-primary)]"
            >
              <span>View site</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <ThemeToggle />
            <button
              type="button"
              onClick={handleSignOut}
              className="pressable inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[var(--hairline)] bg-[var(--bg-surface)] px-4 text-[13px] font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </header>

        {/* KPI Bar */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-5">
            <p className="text-[13px] text-[var(--ink-secondary)]">Total Projects</p>
            <p className="mt-1 font-mono text-3xl font-semibold tabular-nums text-[var(--ink-primary)]">
              {projects.length}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-5">
            <p className="text-[13px] text-[var(--ink-secondary)]">Published Live</p>
            <p className="mt-1 font-mono text-3xl font-semibold tabular-nums text-[var(--ink-primary)]">
              {publishedCount}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-5">
            <p className="text-[13px] text-[var(--ink-secondary)]">Featured on Home</p>
            <p className="mt-1 font-mono text-3xl font-semibold tabular-nums text-[var(--ink-primary)]">
              {featuredCount}
            </p>
          </div>
        </div>

        {/* Tab Bar + Action */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-full border border-[var(--hairline)] bg-[var(--bg-surface)] p-1">
            <button
              type="button"
              onClick={() => setTab("projects")}
              className={cn(
                "pressable min-h-[40px] rounded-full px-5 text-[14px] font-medium cursor-pointer",
                tab === "projects"
                  ? "bg-[var(--ink-primary)] text-[var(--bg-canvas)]"
                  : "text-[var(--ink-secondary)]"
              )}
            >
              Projects ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => setTab("settings")}
              className={cn(
                "pressable min-h-[40px] rounded-full px-5 text-[14px] font-medium cursor-pointer",
                tab === "settings"
                  ? "bg-[var(--ink-primary)] text-[var(--bg-canvas)]"
                  : "text-[var(--ink-secondary)]"
              )}
            >
              Site Settings
            </button>
          </div>

          {tab === "projects" && (
            <button
              type="button"
              onClick={openCreate}
              className="pressable inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[var(--accent)] px-5 text-[14px] font-medium text-[var(--accent-ink)] cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Project</span>
            </button>
          )}
        </div>

        {/* PROJECTS TAB */}
        {tab === "projects" ? (
          <div className="space-y-3">
            {projects.length === 0 ? (
              <div className="rounded-3xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-12 text-center space-y-4">
                <p className="text-[16px] text-[var(--ink-secondary)]">
                  No projects yet. Create your first project to populate the portfolio.
                </p>
                <button
                  type="button"
                  onClick={openCreate}
                  className="pressable inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--ink-primary)] px-5 text-[14px] font-medium text-[var(--bg-canvas)] cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create project</span>
                </button>
              </div>
            ) : (
              projects.map((p, idx) => (
                <div
                  key={p.id}
                  className="flex flex-col gap-4 rounded-2xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="h-16 w-24 shrink-0 rounded-xl border border-[var(--hairline)] object-cover bg-[var(--bg-subtle)]"
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate text-[16px] font-semibold text-[var(--ink-primary)]">
                          {p.title}
                        </h2>
                        <span className="rounded-md bg-[var(--bg-subtle)] px-2 py-0.5 font-mono text-[11px] text-[var(--ink-secondary)] capitalize">
                          {p.category}
                        </span>
                        <span className="font-mono text-[12px] tabular-nums text-[var(--ink-secondary)]">
                          {p.year}
                        </span>
                      </div>
                      <p className="truncate text-[13px] text-[var(--ink-secondary)] mt-0.5">
                        {p.tagline}
                      </p>
                      <p className="truncate font-mono text-[11px] text-[var(--ink-secondary)] mt-1">
                        /work/{p.slug}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {/* Reorder */}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveOrder(idx, -1)}
                      aria-label={`Move ${p.title} up`}
                      className="pressable inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--hairline)] disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === projects.length - 1}
                      onClick={() => moveOrder(idx, 1)}
                      aria-label={`Move ${p.title} down`}
                      className="pressable inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--hairline)] disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>

                    {/* Featured Toggle */}
                    <button
                      type="button"
                      onClick={() => quickToggle(p, "featured")}
                      aria-pressed={p.featured}
                      className={cn(
                        "pressable inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-3 text-[12px] font-medium cursor-pointer",
                        p.featured
                          ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "border-[var(--hairline)] text-[var(--ink-secondary)]"
                      )}
                    >
                      <Star className="h-3.5 w-3.5" />
                      <span>{p.featured ? "Featured" : "Standard"}</span>
                    </button>

                    {/* Published Toggle */}
                    <button
                      type="button"
                      onClick={() => quickToggle(p, "published")}
                      aria-pressed={p.published}
                      className={cn(
                        "pressable inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-3 text-[12px] font-medium cursor-pointer",
                        p.published
                          ? "border-[var(--status-live)]/40 bg-[var(--status-live)]/10 text-[var(--status-live)]"
                          : "border-[var(--hairline)] text-[var(--ink-secondary)]"
                      )}
                    >
                      {p.published ? (
                        <Eye className="h-3.5 w-3.5" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5" />
                      )}
                      <span>{p.published ? "Live" : "Draft"}</span>
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => openEdit(p)}
                      aria-label={`Edit ${p.title}`}
                      className="pressable inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[var(--hairline)] px-3.5 text-[13px] font-medium text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)] cursor-pointer"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* Delete with confirmation */}
                    {confirmDeleteId === p.id ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          className="pressable min-h-[40px] rounded-full bg-red-600 px-3 text-[12px] font-medium text-white cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="pressable min-h-[40px] rounded-full border border-[var(--hairline)] px-3 text-[12px] font-medium cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(p.id)}
                        aria-label={`Delete ${p.title}`}
                        className="pressable inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--hairline)] text-red-600 dark:text-red-400 hover:bg-red-500/10 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* SETTINGS TAB */
          <form
            onSubmit={handleSaveSettings}
            className="rounded-3xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-6"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-[13px] font-medium text-[var(--ink-primary)]">
                  Full Name
                </label>
                <input
                  required
                  value={settings.fullName}
                  onChange={(e) =>
                    setSettings({ ...settings, fullName: e.target.value })
                  }
                  className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 text-[15px]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[var(--ink-primary)]">
                  Role Title
                </label>
                <input
                  required
                  value={settings.roleTitle}
                  onChange={(e) =>
                    setSettings({ ...settings, roleTitle: e.target.value })
                  }
                  className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 text-[15px]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[13px] font-medium text-[var(--ink-primary)]">
                  Hero Headline
                </label>
                <input
                  required
                  value={settings.heroHeadline}
                  onChange={(e) =>
                    setSettings({ ...settings, heroHeadline: e.target.value })
                  }
                  className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 text-[15px]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[13px] font-medium text-[var(--ink-primary)]">
                  Hero Subheadline
                </label>
                <textarea
                  rows={2}
                  required
                  value={settings.heroSubheadline}
                  onChange={(e) =>
                    setSettings({ ...settings, heroSubheadline: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] p-3.5 text-[15px]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[13px] font-medium text-[var(--ink-primary)]">
                  Bio (About & Resume)
                </label>
                <textarea
                  rows={4}
                  required
                  value={settings.bio}
                  onChange={(e) =>
                    setSettings({ ...settings, bio: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] p-3.5 text-[15px]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[var(--ink-primary)]">
                  Availability Status
                </label>
                <input
                  required
                  value={settings.availabilityText}
                  onChange={(e) =>
                    setSettings({ ...settings, availabilityText: e.target.value })
                  }
                  className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 text-[15px]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[var(--ink-primary)]">
                  WhatsApp Number (digits w/ country code)
                </label>
                <input
                  required
                  value={settings.whatsappNumber}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsappNumber: e.target.value })
                  }
                  className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 font-mono text-[14px]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[var(--ink-primary)]">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({ ...settings, email: e.target.value })
                  }
                  className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 text-[15px]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[var(--ink-primary)]">
                  Location
                </label>
                <input
                  required
                  value={settings.location}
                  onChange={(e) =>
                    setSettings({ ...settings, location: e.target.value })
                  }
                  className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 text-[15px]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[var(--ink-primary)]">
                  GitHub URL
                </label>
                <input
                  value={settings.githubUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, githubUrl: e.target.value })
                  }
                  className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 text-[15px]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[var(--ink-primary)]">
                  LinkedIn URL
                </label>
                <input
                  value={settings.linkedinUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, linkedinUrl: e.target.value })
                  }
                  className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 text-[15px]"
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-[var(--hairline)] pt-5">
              <button
                type="submit"
                disabled={saving}
                className="pressable min-h-[48px] rounded-full bg-[var(--ink-primary)] px-7 text-[14px] font-medium text-[var(--bg-canvas)] disabled:opacity-50 cursor-pointer"
              >
                {saving ? "Saving..." : "Save Site Settings"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={form.id ? "Edit project" : "Create project"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[3px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-3xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-[var(--shadow-stage)]">
            <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-4">
              <h2 className="text-xl font-semibold text-[var(--ink-primary)]">
                {form.id ? `Edit: ${form.title}` : "New Project"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
                className="pressable inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--hairline)] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[13px] font-medium">Title *</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        title,
                        slug: slugLocked ? prev.slug : slugify(title),
                      }));
                    }}
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 text-[15px]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium">Slug *</label>
                  <input
                    required
                    value={form.slug}
                    onChange={(e) => {
                      setSlugLocked(true);
                      setForm({ ...form, slug: e.target.value });
                    }}
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 font-mono text-[14px]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[13px] font-medium">Tagline *</label>
                  <input
                    required
                    value={form.tagline}
                    onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 text-[15px]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium">Role *</label>
                  <input
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 text-[15px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[13px] font-medium">Year *</label>
                    <input
                      required
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 font-mono text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          category: e.target.value as ProjectFormState["category"],
                        })
                      }
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3 text-[14px]"
                    >
                      <option value="fullstack">Full-Stack</option>
                      <option value="frontend">Frontend</option>
                      <option value="product">Product</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[13px] font-medium">
                    Stack (comma separated) *
                  </label>
                  <input
                    required
                    value={form.stackText}
                    onChange={(e) => setForm({ ...form, stackText: e.target.value })}
                    placeholder="Next.js, TypeScript, Tailwind CSS"
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 font-mono text-[14px]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-[13px] font-medium">
                    Preview Image URL or Upload *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <input
                      required
                      value={form.imageUrl}
                      onChange={(e) =>
                        setForm({ ...form, imageUrl: e.target.value })
                      }
                      placeholder="/assets/projects/... or https://..."
                      className="flex-1 min-w-[200px] min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 font-mono text-[13px]"
                    />
                    <label className="pressable inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[var(--hairline-strong)] bg-[var(--bg-canvas)] px-4 text-[13px] font-medium cursor-pointer">
                      <Upload className="h-4 w-4" />
                      <span>{uploading ? "Uploading..." : "Upload"}</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/avif"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpload(file);
                        }}
                      />
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setForm({ ...form, imageUrl: img })}
                        className="rounded-lg border border-[var(--hairline)] px-2.5 py-1 font-mono text-[11px] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] cursor-pointer"
                      >
                        {img.split("/").pop()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium">Live URL</label>
                  <input
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium">GitHub URL</label>
                  <input
                    value={form.repoUrl}
                    onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 text-[14px]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[13px] font-medium">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] p-3.5 text-[15px]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[13px] font-medium">
                    The Challenge (optional)
                  </label>
                  <textarea
                    rows={2}
                    value={form.problem}
                    onChange={(e) => setForm({ ...form, problem: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] p-3.5 text-[14px]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium">
                    Architecture & Solution
                  </label>
                  <textarea
                    rows={2}
                    value={form.solution}
                    onChange={(e) => setForm({ ...form, solution: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] p-3.5 text-[14px]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium">Outcome</label>
                  <textarea
                    rows={2}
                    value={form.outcome}
                    onChange={(e) => setForm({ ...form, outcome: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] p-3.5 text-[14px]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-1">
                <label className="inline-flex items-center gap-2 text-[14px] font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) =>
                      setForm({ ...form, published: e.target.checked })
                    }
                    className="h-4 w-4 accent-[var(--accent)]"
                  />
                  <span>Published</span>
                </label>
                <label className="inline-flex items-center gap-2 text-[14px] font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({ ...form, featured: e.target.checked })
                    }
                    className="h-4 w-4 accent-[var(--accent)]"
                  />
                  <span>Featured on Home Stage</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 border-t border-[var(--hairline)] pt-5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="pressable min-h-[44px] rounded-full border border-[var(--hairline)] px-5 text-[14px] font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="pressable min-h-[44px] rounded-full bg-[var(--ink-primary)] px-6 text-[14px] font-medium text-[var(--bg-canvas)] disabled:opacity-50 cursor-pointer"
                >
                  {saving ? "Saving..." : form.id ? "Save changes" : "Create project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
