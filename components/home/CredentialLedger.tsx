import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const CREDENTIALS = [
  {
    year: "2025",
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp (Verified)",
    href: "https://www.freecodecamp.org/certification/mu1147_legend/javascript-algorithms-and-data-structures-v8",
  },
  {
    year: "2025",
    title: "Reactive Accelerator — Batch 3",
    issuer: "Learn With Sumit (LWS)",
    href: "",
  },
  {
    year: "2024",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    href: "",
  },
  {
    year: "2022–2023",
    title: "Diploma in Computer Science & Technology",
    issuer: "Technical Education",
    href: "",
  },
  {
    year: "2020",
    title: "Alim (HSC)",
    issuer: "Tamirul Millat Kamil Madrasah",
    href: "",
  },
];

export default function CredentialLedger() {
  return (
    <section
      aria-labelledby="credentials-heading"
      className="border-t border-[var(--hairline)] px-4 py-16 sm:px-6 sm:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-[1360px]">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="credentials-heading"
              className="display-section font-semibold text-[var(--ink-primary)]"
            >
              Education & Credentials
            </h2>
            <Link
              href="/about"
              className="text-[14px] font-medium text-[var(--accent)] hover:underline underline-offset-4"
            >
              Read full background
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          {CREDENTIALS.map((row) => (
            <div
              key={row.title}
              className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:items-center sm:gap-6"
            >
              <div className="sm:col-span-3 font-mono text-[13px] tabular-nums text-[var(--ink-secondary)]">
                {row.year}
              </div>
              <div className="sm:col-span-5 text-[16px] font-medium text-[var(--ink-primary)]">
                {row.title}
              </div>
              <div className="sm:col-span-4 flex items-center justify-between gap-3 text-[14px] text-[var(--ink-secondary)]">
                <span>{row.issuer}</span>
                {row.href && (
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[var(--accent)] hover:underline shrink-0"
                  >
                    <span>Verify</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
