import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import MediaFrame from "@/components/work/MediaFrame";
import { getProjectBySlug, getPublishedProjects } from "@/lib/queries";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project || !project.published) {
    notFound();
  }

  const allPublished = await getPublishedProjects();
  const idx = allPublished.findIndex((p) => p.id === project.id);
  const nextProject =
    allPublished.length > 1
      ? allPublished[(idx + 1) % allPublished.length]
      : null;

  return (
    <article className="px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-[1120px]">
        <Link
          href="/work"
          className="pressable inline-flex min-h-[44px] items-center gap-2 text-[14px] font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to all work</span>
        </Link>

        <header className="mt-6 space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-[13px] font-mono text-[var(--ink-secondary)]">
            <span className="tabular-nums">{project.year}</span>
            <span aria-hidden="true">/</span>
            <span>{project.role}</span>
            <span aria-hidden="true">/</span>
            <span className="capitalize">{project.category}</span>
          </div>

          <h1 className="display-hero font-semibold text-[var(--ink-primary)]">
            {project.title}
          </h1>

          <p className="max-w-[60ch] font-serif text-xl sm:text-2xl leading-relaxed text-[var(--ink-secondary)]">
            {project.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[var(--ink-primary)] px-5 text-[14px] font-medium text-[var(--bg-canvas)]"
              >
                <span>Visit live site</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-surface)] px-5 text-[14px] font-medium text-[var(--ink-primary)]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>Source repository</span>
              </a>
            )}
          </div>
        </header>

        <div className="mt-10">
          <MediaFrame
            src={project.imageUrl}
            alt={`${project.title} showcase`}
            domainLabel={
              project.liveUrl
                ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                : project.slug
            }
            priority
          />
        </div>

        {/* Spec & Overview */}
        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-[var(--hairline)] pt-10 md:grid-cols-12">
          <div className="md:col-span-4 space-y-6">
            <div>
              <h2 className="text-[13px] font-medium text-[var(--ink-secondary)]">
                Stack
              </h2>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-[var(--bg-subtle)] px-2.5 py-1 font-mono text-[12px] text-[var(--ink-primary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-[13px] font-medium text-[var(--ink-secondary)]">
                Role
              </h2>
              <p className="mt-1 text-[15px] font-medium text-[var(--ink-primary)]">
                {project.role}
              </p>
            </div>
          </div>

          <div className="md:col-span-8 space-y-8">
            <section className="space-y-2.5">
              <h2 className="text-xl font-semibold text-[var(--ink-primary)]">
                Overview
              </h2>
              <p className="max-w-[65ch] text-[16px] leading-[1.7] text-[var(--ink-secondary)]">
                {project.description}
              </p>
            </section>

            {project.problem && (
              <section className="space-y-2.5 border-t border-[var(--hairline)] pt-6">
                <h2 className="text-xl font-semibold text-[var(--ink-primary)]">
                  The Challenge
                </h2>
                <p className="max-w-[65ch] text-[16px] leading-[1.7] text-[var(--ink-secondary)]">
                  {project.problem}
                </p>
              </section>
            )}

            {project.solution && (
              <section className="space-y-2.5 border-t border-[var(--hairline)] pt-6">
                <h2 className="text-xl font-semibold text-[var(--ink-primary)]">
                  Architecture & Execution
                </h2>
                <p className="max-w-[65ch] text-[16px] leading-[1.7] text-[var(--ink-secondary)]">
                  {project.solution}
                </p>
              </section>
            )}

            {project.outcome && (
              <section className="space-y-2.5 border-t border-[var(--hairline)] pt-6">
                <h2 className="text-xl font-semibold text-[var(--ink-primary)]">
                  Outcome
                </h2>
                <p className="max-w-[65ch] text-[16px] leading-[1.7] text-[var(--ink-secondary)]">
                  {project.outcome}
                </p>
              </section>
            )}
          </div>
        </div>

        {nextProject && nextProject.id !== project.id && (
          <div className="mt-16 border-t border-[var(--hairline)] pt-10 flex items-center justify-between gap-4">
            <div>
              <p className="text-[13px] text-[var(--ink-secondary)]">
                Next project
              </p>
              <Link
                href={`/work/${nextProject.slug}`}
                className="mt-1 inline-flex items-center gap-2 text-2xl font-semibold tracking-tight text-[var(--ink-primary)] hover:text-[var(--accent)] transition-colors"
              >
                <span>{nextProject.title}</span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
