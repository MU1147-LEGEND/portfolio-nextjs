import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CredentialLedger from "@/components/home/CredentialLedger";
import ContactBand from "@/components/home/ContactBand";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "Background, engineering principles, and credentials of Mohammad Ullah.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <div className="relative aspect-[4/5] max-w-[360px] overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--bg-surface)] shadow-[var(--shadow-stage)]">
                <Image
                  src="/assets/profile.png"
                  alt={settings.fullName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 360px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <h1 className="display-section font-semibold text-[var(--ink-primary)]">
                About {settings.fullName}
              </h1>

              <p className="text-2xl sm:text-3xl leading-[1.32] tracking-[-0.02em] text-[var(--ink-primary)]">
                {settings.bio}
              </p>

              <div className="grid grid-cols-1 gap-6 border-t border-[var(--hairline)] pt-8 sm:grid-cols-2">
                <div>
                  <h2 className="text-[16px] font-semibold text-[var(--ink-primary)]">
                    Engineering Approach
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
                    Start with clear data modeling, ship minimal server-rendered
                    pages that feel fast on real mobile connections, and refine
                    every interactive detail until nothing feels sluggish or
                    accidental.
                  </p>
                </div>
                <div>
                  <h2 className="text-[16px] font-semibold text-[var(--ink-primary)]">
                    Outside the Editor
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
                    Away from TypeScript and UI engineering, I spend time on
                    long biking adventures across Bangladesh, exploring new
                    routes and sharpening problem-solving focus.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/work"
                  className="pressable inline-flex min-h-[46px] items-center rounded-full bg-[var(--ink-primary)] px-5 text-[14px] font-medium text-[var(--bg-canvas)]"
                >
                  Explore projects
                </Link>
                <Link
                  href="/resume"
                  className="pressable inline-flex min-h-[46px] items-center rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-surface)] px-5 text-[14px] font-medium text-[var(--ink-primary)]"
                >
                  View resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CredentialLedger />
      <ContactBand
        whatsappNumber={settings.whatsappNumber}
        email={settings.email}
      />
    </div>
  );
}
