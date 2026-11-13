import Link from "next/link";

export default function NotFound() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[760px] space-y-6">
        <p className="font-mono text-[13px] text-[var(--ink-secondary)]">404</p>
        <h1 className="display-section font-semibold text-[var(--ink-primary)]">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-[17px] text-[var(--ink-secondary)]">
          The link may have moved or been unpublished.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/"
            className="pressable inline-flex min-h-[46px] items-center rounded-full bg-[var(--ink-primary)] px-5 text-[14px] font-medium text-[var(--bg-canvas)]"
          >
            Go home
          </Link>
          <Link
            href="/work"
            className="pressable inline-flex min-h-[46px] items-center rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-surface)] px-5 text-[14px] font-medium text-[var(--ink-primary)]"
          >
            Browse work
          </Link>
        </div>
      </div>
    </section>
  );
}
