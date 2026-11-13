"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { buildWhatsAppUrl } from "@/lib/validators";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  fullName: string;
  whatsappNumber: string;
}

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader({ fullName, whatsappNumber }: SiteHeaderProps) {
  const pathname = usePathname() ?? "";
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  if (pathname?.startsWith("/dev-admin")) {
    return null;
  }

  const waUrl = buildWhatsAppUrl(
    whatsappNumber,
    "Hi Mohammad, I'm reaching out from your portfolio header."
  );

  return (
    <>
      <header className="sticky top-0 z-40 px-4 pt-3 sm:px-6 lg:px-10">
        <div className="apple-chrome mx-auto flex h-14 max-w-[1360px] items-center justify-between rounded-full px-3 sm:px-5 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.12)]">
          <Link
            href="/"
            className="pressable inline-flex min-h-[44px] items-center gap-2.5 rounded-full px-2.5 text-[15px] font-semibold tracking-[-0.02em] text-[var(--ink-primary)]"
          >
            <span
              className="inline-block h-2 w-2 rounded-full bg-[var(--status-live)]"
              aria-hidden="true"
            />
            <span>{fullName}</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const active =
                item.href === "/work"
                  ? pathname === "/work" || pathname.startsWith("/work/")
                  : pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "pressable inline-flex min-h-[40px] items-center rounded-full px-4 text-[14px] font-medium",
                    active
                      ? "bg-[var(--ink-primary)] text-[var(--bg-canvas)]"
                      : "text-[var(--ink-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--ink-primary)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable hidden sm:inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--ink-primary)] px-4 text-[13px] font-medium text-[var(--bg-canvas)] hover:opacity-90"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setDrawerOpen((v) => !v)}
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
              className="pressable inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--bg-surface)] text-[var(--ink-primary)] md:hidden cursor-pointer"
            >
              {drawerOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] md:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={cn(
          "fixed inset-x-4 top-20 z-50 rounded-3xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-4 shadow-[var(--shadow-stage)] md:hidden transition-all duration-300",
          drawerOpen
            ? "pointer-events-auto translate-y-0 opacity-100 scale-100"
            : "pointer-events-none -translate-y-3 opacity-0 scale-[0.97]"
        )}
        style={{ transitionTimingFunction: "var(--ease-drawer)" }}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={cn(
              "pressable flex min-h-[48px] items-center justify-between rounded-2xl px-4 text-[16px] font-medium",
              pathname === "/"
                ? "bg-[var(--bg-subtle)] text-[var(--ink-primary)]"
                : "text-[var(--ink-secondary)]"
            )}
          >
            <span>Home</span>
          </Link>
          {NAV_LINKS.map((item) => {
            const active =
              item.href === "/work"
                ? pathname === "/work" || pathname?.startsWith("/work/")
                : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "pressable flex min-h-[48px] items-center justify-between rounded-2xl px-4 text-[16px] font-medium",
                  active
                    ? "bg-[var(--bg-subtle)] text-[var(--ink-primary)]"
                    : "text-[var(--ink-secondary)]"
                )}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable mt-2 flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[var(--ink-primary)] px-4 text-[15px] font-medium text-[var(--bg-canvas)]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Message on WhatsApp</span>
          </a>
        </nav>
      </div>
    </>
  );
}
