"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Sign in failed");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px] space-y-6">
        <Link
          href="/"
          className="pressable inline-flex min-h-[44px] items-center gap-2 text-[14px] font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to portfolio</span>
        </Link>

        <div className="rounded-3xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-7 sm:p-8 shadow-[var(--shadow-stage)]">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--bg-subtle)] text-[var(--ink-primary)]">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-[var(--ink-primary)]">
            Portfolio Admin
          </h1>
          <p className="mt-1.5 text-[14px] text-[var(--ink-secondary)]">
            Sign in to manage projects, ordering, and site settings.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-[13px] font-medium text-[var(--ink-primary)]"
              >
                Admin password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="mt-2 w-full min-h-[46px] rounded-xl border border-[var(--hairline)] bg-[var(--bg-canvas)] px-3.5 text-[16px] text-[var(--ink-primary)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>

            {error && (
              <p
                role="alert"
                aria-live="polite"
                className="rounded-xl bg-red-500/10 px-3.5 py-2.5 text-[13px] font-medium text-red-600 dark:text-red-400"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="pressable w-full min-h-[48px] rounded-full bg-[var(--ink-primary)] text-[15px] font-medium text-[var(--bg-canvas)] disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
