"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, LayoutGrid, List } from "lucide-react";
import MediaFrame from "@/components/work/MediaFrame";
import type { ProjectDTO } from "@/lib/queries";
import { cn } from "@/lib/utils";

interface WorkShowcaseStageProps {
  projects: ProjectDTO[];
  totalPublishedCount: number;
}

export default function WorkShowcaseStage({
  projects,
  totalPublishedCount,
}: WorkShowcaseStageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"stage" | "list">("stage");
  const reduceMotion = useReducedMotion();

  if (projects.length === 0) {
    return (
      <section className="border-t border-[var(--hairline)] px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1360px]">
          <h2 className="display-section font-semibold text-[var(--ink-primary)]">
            Selected Work
          </h2>
          <p className="mt-4 text-[var(--ink-secondary)]">
            No featured projects published yet. Manage projects from the{" "}
            <Link href="/dev-admin" className="underline text-[var(--accent)]">
              Admin Panel
            </Link>
            .
          </p>
        </div>
      </section>
    );
  }

  const safeIndex = Math.min(activeIndex, projects.length - 1);
  const active = projects[safeIndex];
  const formattedIndex = String(safeIndex + 1).padStart(2, "0");

  return (
    <section
      id="work"
      aria-labelledby="selected-work-heading"
      className="border-t border-[var(--hairline)] px-4 py-16 sm:px-6 sm:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Section Header + Mode Switcher */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="selected-work-heading"
              className="display-section font-semibold text-[var(--ink-primary)]"
            >
              Selected Work
            </h2>
            <p className="mt-2 text-[15px] text-[var(--ink-secondary)]">
              Case studies & production software — dynamically managed.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Work display mode"
              className="inline-flex rounded-full border border-[var(--hairline)] bg-[var(--bg-surface)] p-1"
            >
              <button
                type="button"
                onClick={() => setViewMode("stage")}
                aria-pressed={viewMode === "stage"}
                className={cn(
                  "pressable inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium cursor-pointer",
                  viewMode === "stage"
                    ? "bg-[var(--ink-primary)] text-[var(--bg-canvas)]"
                    : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Stage</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-pressed={viewMode === "list"}
                className={cn(
                  "pressable inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium cursor-pointer",
                  viewMode === "list"
                    ? "bg-[var(--ink-primary)] text-[var(--bg-canvas)]"
                    : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                )}
              >
                <List className="h-3.5 w-3.5" aria-hidden="true" />
                <span>List</span>
              </button>
            </div>

            <Link
              href="/work"
              className="pressable inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--hairline)] bg-[var(--bg-surface)] px-4 text-[13px] font-medium text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)]"
            >
              <span className="tabular-nums">All projects ({totalPublishedCount})</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* STAGE VIEW (Grégory Lallé index focus + Apple hardware stage) */}
        {viewMode === "stage" ? (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
            {/* Left Index + Selector Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="flex items-baseline justify-between border-b border-[var(--hairline)] pb-4">
                <div className="overflow-hidden h-12 flex items-center">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={formattedIndex}
                      initial={
                        reduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, transform: "translateY(100%)" }
                      }
                      animate={{ opacity: 1, transform: "translateY(0%)" }}
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, transform: "translateY(-100%)" }
                      }
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="inline-block font-mono text-4xl font-medium tracking-tight tabular-nums text-[var(--ink-primary)]"
                    >
                      {formattedIndex}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="font-mono text-[12px] text-[var(--ink-secondary)] tabular-nums">
                  {active.year} · {active.role}
                </span>
              </div>

              {/* Project Selector Rail */}
              <ul className="space-y-1" role="listbox" aria-label="Featured projects">
                {projects.map((project, index) => {
                  const selected = index === safeIndex;
                  return (
                    <li key={project.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => setActiveIndex(index)}
                        onMouseEnter={() => {
                          if (window.matchMedia("(hover: hover)").matches) {
                            setActiveIndex(index);
                          }
                        }}
                        className={cn(
                          "pressable flex w-full min-h-[48px] items-center justify-between rounded-xl px-3.5 py-2.5 text-left cursor-pointer",
                          selected
                            ? "bg-[var(--bg-surface)] text-[var(--ink-primary)] shadow-xs border border-[var(--hairline)]"
                            : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] border border-transparent"
                        )}
                      >
                        <span className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-[12px] tabular-nums opacity-60">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="truncate text-[16px] font-medium">
                            {project.title}
                            {project.domain && (
                              <span className="ml-2 rounded-md bg-[var(--bg-subtle)] px-2 py-0.5 text-[11px] font-normal text-[var(--ink-secondary)]">
                                {project.domain}
                              </span>
                            )}
                          </span>
                        </span>
                        <span className="ml-3 shrink-0 font-mono text-[12px] opacity-70 tabular-nums">
                          {project.year}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Active Project Summary & Actions */}
              <div className="space-y-4 rounded-2xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-5">
                <p className="text-[15px] leading-relaxed text-[var(--ink-secondary)]">
                  {active.tagline} — {active.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {active.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-[var(--bg-subtle)] px-2.5 py-1 font-mono text-[12px] text-[var(--ink-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    href={`/work/${active.slug}`}
                    className="pressable inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[var(--accent)] px-5 text-[14px] font-medium text-[var(--accent-ink)]"
                  >
                    <span>Read case study</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>

                  {active.liveUrl && (
                    <a
                      href={active.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pressable inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--hairline-strong)] px-4 text-[14px] font-medium text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)]"
                    >
                      <span>Live site</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Interactive Hardware Frame */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.slug}
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, transform: "scale(0.975)" }
                  }
                  animate={{ opacity: 1, transform: "scale(1)" }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, transform: "scale(0.985)" }
                  }
                  transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link
                    href={`/work/${active.slug}`}
                    className="block group focus-visible:outline-none"
                  >
                    <MediaFrame
                      src={active.imageUrl}
                      alt={`${active.title} preview`}
                      domainLabel={
                        active.liveUrl
                          ? active.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                          : active.slug
                      }
                      priority
                      className="hover-lift"
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* LIST VIEW (RossMason editorial hover-reveal list + touch-safe mobile layout) */
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 hidden lg:block sticky top-24">
              <MediaFrame
                src={active.imageUrl}
                alt={`${active.title} preview`}
                domainLabel={active.role}
              />
            </div>

            <div className="lg:col-span-7 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
              {projects.map((project, index) => {
                const isActive = index === safeIndex;
                return (
                  <div
                    key={project.id}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      "py-5 transition-opacity duration-200",
                      isActive ? "opacity-100" : "lg:opacity-55 lg:hover:opacity-100"
                    )}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-[12px] tabular-nums text-[var(--ink-secondary)]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <Link
                            href={`/work/${project.slug}`}
                            className="text-xl font-semibold tracking-tight text-[var(--ink-primary)] hover:text-[var(--accent)] transition-colors"
                          >
                            {project.title}
                          </Link>
                        </div>
                        <p className="mt-1 pl-7 text-[14px] text-[var(--ink-secondary)]">
                          {project.tagline}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pl-7 sm:pl-0 shrink-0">
                        <Link
                          href={`/work/${project.slug}`}
                          className="pressable inline-flex min-h-[40px] items-center gap-1 rounded-full border border-[var(--hairline)] bg-[var(--bg-surface)] px-3.5 text-[13px] font-medium text-[var(--ink-primary)]"
                        >
                          Case study
                        </Link>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.title} live site`}
                            className="pressable inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--bg-surface)] text-[var(--ink-primary)]"
                          >
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
