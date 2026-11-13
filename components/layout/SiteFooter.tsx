"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import LiveClock from "./LiveClock";
import { buildWhatsAppUrl } from "@/lib/validators";
import type { SiteSettingsRow } from "@/db/schema";

interface SiteFooterProps {
  settings: SiteSettingsRow;
}

export default function SiteFooter({ settings }: SiteFooterProps) {
  const pathname = usePathname() ?? "";
  if (pathname?.startsWith("/dev-admin")) {
    return null;
  }

  const waUrl = buildWhatsAppUrl(settings.whatsappNumber);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[var(--hairline)] px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5 space-y-3">
            <p className="text-[16px] font-semibold tracking-[-0.02em] text-[var(--ink-primary)]">
              {settings.fullName}
            </p>
            <p className="max-w-sm text-[14px] leading-relaxed text-[var(--ink-secondary)]">
              {settings.roleTitle} building fast, reliable Next.js applications and
              clear, tactile user interfaces.
            </p>
            <p className="pt-2 text-[13px]">
              <LiveClock location={settings.location} />
            </p>
          </div>

          <div className="md:col-span-2 space-y-2.5">
            <p className="text-[13px] font-medium text-[var(--ink-primary)]">
              Pages
            </p>
            <ul className="space-y-2 text-[14px] text-[var(--ink-secondary)]">
              <li>
                <Link href="/" className="hover:text-[var(--ink-primary)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[var(--ink-primary)] transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--ink-primary)] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-[var(--ink-primary)] transition-colors">
                  Resume
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--ink-primary)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <p className="text-[13px] font-medium text-[var(--ink-primary)]">
              Direct Channels
            </p>
            <ul className="space-y-2 text-[14px] text-[var(--ink-secondary)]">
              <li>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[var(--ink-primary)] transition-colors"
                >
                  WhatsApp (+{settings.whatsappNumber})
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-[var(--ink-primary)] transition-colors"
                >
                  {settings.email}
                </a>
              </li>
              {settings.githubUrl && (
                <li>
                  <a
                    href={settings.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[var(--ink-primary)] transition-colors"
                  >
                    GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              )}
              {settings.linkedinUrl && (
                <li>
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[var(--ink-primary)] transition-colors"
                  >
                    LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-2.5">
            <p className="text-[13px] font-medium text-[var(--ink-primary)]">
              Document
            </p>
            <ul className="space-y-2 text-[14px] text-[var(--ink-secondary)]">
              <li>
                <a
                  href={settings.resumeUrl || "/assets/resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--ink-primary)] transition-colors"
                >
                  Resume PDF
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--hairline)] pt-6 text-[13px] text-[var(--ink-secondary)] sm:flex-row sm:items-center">
          <p className="tabular-nums">
            © {year} {settings.fullName}. All rights reserved.
          </p>
          <p>Built with Next.js, TypeScript, Motion & SQLite.</p>
        </div>
      </div>
    </footer>
  );
}
