import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import LiveClock from "@/components/layout/LiveClock";
import Reveal from "@/components/motion/Reveal";
import { buildWhatsAppUrl } from "@/lib/validators";
import type { SiteSettingsRow } from "@/db/schema";

interface HeroProps {
  settings: SiteSettingsRow;
  projectCount: number;
}

export default function Hero({ settings, projectCount }: HeroProps) {
  const waUrl = buildWhatsAppUrl(
    settings.whatsappNumber,
    "Hi Mohammad, I'm reaching out from your portfolio."
  );

  return (
    <section className="px-4 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:px-10">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 space-y-7">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--hairline)] bg-[var(--bg-surface)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--ink-secondary)]">
                <span
                  className="h-2 w-2 rounded-full bg-[var(--status-live)]"
                  aria-hidden="true"
                />
                <span>{settings.availabilityText}</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="display-hero font-semibold text-[var(--ink-primary)] text-balance">
                {settings.heroHeadline}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-[58ch] text-[18px] leading-[1.6] text-[var(--ink-secondary)] sm:text-[19px]">
                {settings.heroSubheadline}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/work"
                  className="pressable inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[var(--ink-primary)] px-6 text-[15px] font-medium text-[var(--bg-canvas)] hover:opacity-90"
                >
                  <span>Explore work ({projectCount})</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-surface)] px-6 text-[15px] font-medium text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)]"
                >
                  <MessageCircle
                    className="h-4 w-4 text-[var(--status-live)]"
                    aria-hidden="true"
                  />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--hairline)] pt-5 text-[13px] text-[var(--ink-secondary)]">
                <span className="font-medium text-[var(--ink-primary)]">
                  {settings.roleTitle}
                </span>
                <span>
                  <LiveClock location={settings.location} />
                </span>
                <Link
                  href="/resume"
                  className="underline decoration-[var(--hairline-strong)] underline-offset-4 hover:text-[var(--ink-primary)] transition-colors"
                >
                  Read resume
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <figure className="mx-auto max-w-[420px] lg:ml-auto lg:mr-0">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--bg-surface)] shadow-[var(--shadow-stage)]">
                  <Image
                    src="/assets/profile.png"
                    alt={`${settings.fullName} portrait`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 420px"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="mt-3 flex items-center justify-between px-1 text-[13px] text-[var(--ink-secondary)]">
                  <span>{settings.fullName}</span>
                  <span className="font-mono text-[12px]">React · Next.js · TypeScript</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
