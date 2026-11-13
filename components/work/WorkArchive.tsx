"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import MediaFrame from "./MediaFrame";
import type { ProjectDTO } from "@/lib/queries";
import { cn } from "@/lib/utils";

interface WorkArchiveProps {
  projects: ProjectDTO[];
}

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "product", label: "Product" },
] as const;

export default function WorkArchive({ projects }: WorkArchiveProps) {
  const [category, setCategory] = useState<"all" | "fullstack" | "frontend" | "product">("all");

  const filtered =
    category === "all"
      ? projects
      : projects.filter((p) => p.category === category);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="mt-8 flex flex-wrap gap-2"
      >
        {CATEGORIES.map((cat) => {
          const count =
            cat.id === "all"
              ? projects.length
              : projects.filter((p) => p.category === cat.id).length;
          const active = category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              aria-pressed={active}
              className={cn(
                "pressable inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-[14px] font-medium cursor-pointer",
                active
                  ? "border-[var(--ink-primary)] bg-[var(--ink-primary)] text-[var(--bg-canvas)]"
                  : "border-[var(--hairline)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
              )}
            >
              <span>{cat.label}</span>
              <span className="font-mono text-[12px] tabular-nums opacity-70">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-10 text-center text-[var(--ink-secondary)]">
          No projects in this category yet.
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          {filtered.map((project, idx) => (
            <article
              key={project.id}
              className="flex flex-col justify-between rounded-3xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-5 sm:p-6 shadow-[var(--shadow-stage)]"
            >
              <div>
                <Link href={`/work/${project.slug}`} className="block">
                  <MediaFrame
                    src={project.imageUrl}
                    alt={`${project.title}{project.domain && <span className="ml-2 rounded-md bg-[var(--bg-subtle)] px-2 py-0.5 text-[11px] font-normal text-[var(--ink-secondary)]">{project.domain}</span>} screenshot`}
                    domainLabel={
                      project.liveUrl
                        ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                        : project.slug
                    }
                    priority={idx < 2}
                  />
                </Link>

                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--ink-primary)]">
                    <Link
                      href={`/work/${project.slug}`}
                      className="hover:text-[var(--accent)] transition-colors"
                    >
                      {project.title}{project.domain && <span className="ml-2 rounded-md bg-[var(--bg-subtle)] px-2 py-0.5 text-[11px] font-normal text-[var(--ink-secondary)]">{project.domain}</span>}
                    </Link>
                  </h2>
                  <span className="shrink-0 font-mono text-[13px] tabular-nums text-[var(--ink-secondary)]">
                    {project.year}
                  </span>
                </div>

                <p className="mt-1 text-[13px] font-medium text-[var(--ink-secondary)]">
                  {project.role}
                </p>

                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 space-y-4 border-t border-[var(--hairline)] pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-[var(--bg-subtle)] px-2.5 py-1 font-mono text-[12px] text-[var(--ink-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <Link
                    href={`/work/${project.slug}`}
                    className="pressable inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[var(--ink-primary)] px-4 text-[13px] font-medium text-[var(--bg-canvas)]"
                  >
                    <span>Case study</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pressable inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--hairline-strong)] px-4 text-[13px] font-medium text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)]"
                    >
                      <span>Live</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}

                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pressable inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--hairline)] px-4 text-[13px] font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                    >
                      <Github className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
