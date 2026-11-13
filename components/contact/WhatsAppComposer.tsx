"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { buildWhatsAppUrl } from "@/lib/validators";
import { cn } from "@/lib/utils";

interface WhatsAppComposerProps {
  whatsappNumber: string;
  email: string;
  location: string;
}

const TOPICS = [
  "Freelance / Product Build",
  "Full-Time Role",
  "UI / Frontend Consultation",
  "Quick Question",
];

export default function WhatsAppComposer({
  whatsappNumber,
  email,
  location,
}: WhatsAppComposerProps) {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  const composedMessage = note.trim()
    ? `Hi Mohammad, I came across your portfolio website. Regarding (${topic}): ${note.trim()}`
    : `Hi Mohammad, I came across your portfolio website regarding: ${topic}.`;

  const waUrl = buildWhatsAppUrl(whatsappNumber, composedMessage);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy email");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7 rounded-3xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-[var(--shadow-stage)]">
        <div className="flex items-center gap-2.5 text-[13px] font-medium text-[var(--ink-secondary)]">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--status-live)]" aria-hidden="true" />
          <span>Direct WhatsApp Channel</span>
        </div>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[var(--ink-primary)]">
          Start a conversation on WhatsApp
        </h2>
        <p className="mt-2 text-[15px] text-[var(--ink-secondary)]">
          Pick a topic and add a quick note — opens directly in WhatsApp with your
          message pre-filled.
        </p>

        <div className="mt-6">
          <p className="text-[13px] font-medium text-[var(--ink-primary)]">
            Topic
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {TOPICS.map((item) => {
              const active = topic === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTopic(item)}
                  aria-pressed={active}
                  className={cn(
                    "pressable min-h-[42px] rounded-full border px-4 text-[13px] font-medium cursor-pointer",
                    active
                      ? "border-[var(--ink-primary)] bg-[var(--ink-primary)] text-[var(--bg-canvas)]"
                      : "border-[var(--hairline)] bg-[var(--bg-canvas)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="wa-note"
            className="block text-[13px] font-medium text-[var(--ink-primary)]"
          >
            Short note (optional)
          </label>
          <textarea
            id="wa-note"
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Share timeline, project scope, or link..."
            className="mt-2 w-full rounded-2xl border border-[var(--hairline)] bg-[var(--bg-canvas)] p-3.5 text-[16px] text-[var(--ink-primary)] placeholder:text-[var(--ink-secondary)] focus:border-[var(--accent)] focus:outline-none"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable inline-flex min-h-[50px] items-center gap-2.5 rounded-full bg-[var(--ink-primary)] px-6 text-[15px] font-medium text-[var(--bg-canvas)]"
          >
            <MessageCircle className="h-4 w-4 text-[var(--status-live)]" aria-hidden="true" />
            <span>Open WhatsApp Chat</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <span className="font-mono text-[13px] tabular-nums text-[var(--ink-secondary)]">
            +{whatsappNumber}
          </span>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-between gap-6 rounded-3xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-6 sm:p-8">
        <div className="space-y-6">
          <div>
            <p className="text-[13px] font-medium text-[var(--ink-secondary)]">
              Email
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${email}`}
                className="text-[17px] font-medium text-[var(--ink-primary)] hover:text-[var(--accent)] transition-colors break-all"
              >
                {email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="pressable inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--bg-canvas)] text-[var(--ink-primary)] cursor-pointer"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-[var(--status-live)]" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="border-t border-[var(--hairline)] pt-5">
            <p className="text-[13px] font-medium text-[var(--ink-secondary)]">
              Phone / WhatsApp
            </p>
            <a
              href={`tel:+${whatsappNumber.replace(/\D/g, "")}`}
              className="mt-1 inline-block font-mono text-[16px] tabular-nums text-[var(--ink-primary)] hover:text-[var(--accent)]"
            >
              +{whatsappNumber.replace(/\D/g, "")}
            </a>
          </div>

          <div className="border-t border-[var(--hairline)] pt-5">
            <p className="text-[13px] font-medium text-[var(--ink-secondary)]">
              Location & Timezone
            </p>
            <p className="mt-1 text-[16px] text-[var(--ink-primary)]">
              {location} · UTC+6
            </p>
          </div>
        </div>

        <p className="border-t border-[var(--hairline)] pt-5 text-[13px] text-[var(--ink-secondary)]">
          Typically responds within a few hours during 09:00–22:00 BST.
        </p>
      </div>
    </div>
  );
}
