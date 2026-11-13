import type { Metadata } from "next";
import WorkArchive from "@/components/work/WorkArchive";
import { getPublishedProjects } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected full-stack and frontend engineering case studies by Mohammad Ullah.",
};

export default async function WorkPage() {
  const projects = await getPublishedProjects();

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-[1360px]">
        <h1 className="display-hero font-semibold text-[var(--ink-primary)]">
          Selected Work
        </h1>
        <p className="mt-4 max-w-[60ch] text-[18px] leading-relaxed text-[var(--ink-secondary)]">
          Production web applications, interface systems, and product experiments
          engineered with Next.js, TypeScript, and modern databases.
        </p>
        <WorkArchive projects={projects} />
      </div>
    </section>
  );
}
