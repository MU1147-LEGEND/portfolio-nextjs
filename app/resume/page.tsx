import type { Metadata } from "next";
import { Download } from "lucide-react";
import { getPublishedProjects, getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resume",
  description: "Curriculum vitae and technical background of Mohammad Ullah.",
};

export default async function ResumePage() {
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getPublishedProjects(),
  ]);

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-[920px]">
        <div className="flex flex-col gap-4 border-b border-[var(--hairline)] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="display-section font-semibold text-[var(--ink-primary)]">
              {settings.fullName}
            </h1>
            <p className="mt-1 text-[17px] text-[var(--ink-secondary)]">
              {settings.roleTitle} · {settings.location}
            </p>
          </div>

          <a
            href={settings.resumeUrl || "/assets/resume.pdf"}
            download
            className="no-print pressable inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[var(--ink-primary)] px-5 text-[14px] font-medium text-[var(--bg-canvas)] self-start sm:self-auto"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            <span>Download PDF</span>
          </a>
        </div>

        <div className="mt-10 space-y-10">
          <section className="space-y-3">
            <h2 className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-secondary)]">
              Summary
            </h2>
            <p className="max-w-[70ch] text-[16px] leading-relaxed text-[var(--ink-primary)]">
              {settings.bio}
            </p>
          </section>

          <section className="space-y-4 border-t border-[var(--hairline)] pt-8">
            <h2 className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-secondary)]">
              Core Stack
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-[15px]">
              <div>
                <p className="font-medium text-[var(--ink-primary)]">Frontend</p>
                <p className="mt-1 text-[var(--ink-secondary)]">
                  React 19, Next.js, TypeScript, Tailwind CSS, Motion
                </p>
              </div>
              <div>
                <p className="font-medium text-[var(--ink-primary)]">Backend & Data</p>
                <p className="mt-1 text-[var(--ink-secondary)]">
                  Node.js, Drizzle ORM, SQLite / libSQL, MongoDB, REST APIs
                </p>
              </div>
              <div>
                <p className="font-medium text-[var(--ink-primary)]">Tools & Platform</p>
                <p className="mt-1 text-[var(--ink-secondary)]">
                  Git, Linux, Figma, WordPress, Vercel
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5 border-t border-[var(--hairline)] pt-8">
            <h2 className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-secondary)]">
              Selected Projects
            </h2>
            <div className="space-y-5">
              {projects.map((p) => (
                <div key={p.id} className="space-y-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[17px] font-semibold text-[var(--ink-primary)]">
                      {p.title}
                    </h3>
                    <span className="font-mono text-[13px] tabular-nums text-[var(--ink-secondary)]">
                      {p.year}
                    </span>
                  </div>
                  <p className="text-[13px] font-medium text-[var(--ink-secondary)]">
                    {p.role} · {p.stack.join(", ")}
                  </p>
                  <p className="text-[15px] leading-relaxed text-[var(--ink-secondary)]">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 border-t border-[var(--hairline)] pt-8">
            <h2 className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-secondary)]">
              Education & Certifications
            </h2>
            <ul className="space-y-3 text-[15px]">
              <li className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-medium text-[var(--ink-primary)]">
                  JavaScript Algorithms & Data Structures — freeCodeCamp
                </span>
                <span className="font-mono text-[13px] tabular-nums text-[var(--ink-secondary)]">
                  2025
                </span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-medium text-[var(--ink-primary)]">
                  Responsive Web Design — freeCodeCamp
                </span>
                <span className="font-mono text-[13px] tabular-nums text-[var(--ink-secondary)]">
                  2024
                </span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-medium text-[var(--ink-primary)]">
                  Diploma in Computer Science & Technology
                </span>
                <span className="font-mono text-[13px] tabular-nums text-[var(--ink-secondary)]">
                  2022–2023
                </span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-medium text-[var(--ink-primary)]">
                  Alim (HSC) — Tamirul Millat Kamil Madrasah
                </span>
                <span className="font-mono text-[13px] tabular-nums text-[var(--ink-secondary)]">
                  2020
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
