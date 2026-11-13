"use client";

import { Check, Copy, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Reveal from "@/components/motion/Reveal";
import { buildWhatsAppUrl } from "@/lib/validators";

interface ContactBandProps {
  whatsappNumber: string;
  email: string;
}

export default function ContactBand({ whatsappNumber, email }: ContactBandProps) {
  const [copied, setCopied] = useState(false);

  const waUrl = buildWhatsAppUrl(
    whatsappNumber,
    "Hi Mohammad, I'm reaching out from your portfolio."
  );

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy email");
    }
  };

  return (
    <section className="px-4 pt-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1360px]">
        <Reveal>
          <div className="rounded-3xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-8 sm:p-12 lg:p-16 shadow-[var(--shadow-stage)]">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7 space-y-4">
                <h2 className="display-section font-semibold text-[var(--ink-primary)] text-balance">
                  Have a product or role in mind? Let&apos;s talk directly.
                </h2>
                <p className="max-w-[54ch] text-[16px] leading-relaxed text-[var(--ink-secondary)]">
                  Fastest way to reach me is WhatsApp. Send a quick note about
                  your timeline, stack, or idea and I&apos;ll reply promptly.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-wrap items-center gap-3 lg:justify-end">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable inline-flex min-h-[50px] items-center gap-2.5 rounded-full bg-[var(--ink-primary)] px-6 text-[15px] font-medium text-[var(--bg-canvas)] hover:opacity-90"
                >
                  <MessageCircle
                    className="h-4 w-4 text-[var(--status-live)]"
                    aria-hidden="true"
                  />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="pressable inline-flex min-h-[50px] items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-canvas)] px-5 text-[14px] font-medium text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)] cursor-pointer"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-[var(--status-live)]" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>{copied ? "Copied email" : email}</span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
