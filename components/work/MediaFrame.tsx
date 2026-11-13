import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaFrameProps {
  src: string;
  alt: string;
  domainLabel?: string;
  priority?: boolean;
  className?: string;
}

export default function MediaFrame({
  src,
  alt,
  domainLabel,
  priority = false,
  className,
}: MediaFrameProps) {
  const isRemote = /^https?:\/\//i.test(src);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--bg-surface)] shadow-[var(--shadow-stage)]",
        className
      )}
    >
      <div className="flex h-9 items-center justify-between border-b border-[var(--hairline)] bg-[var(--bg-canvas)]/70 px-3.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--hairline-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--hairline-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--hairline-strong)]" />
        </div>
        {domainLabel && (
          <span className="truncate font-mono text-[11px] text-[var(--ink-secondary)] max-w-[60%]">
            {domainLabel}
          </span>
        )}
        <span className="w-8" aria-hidden="true" />
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bg-subtle)]">
        {isRemote ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 760px"
            className="object-cover object-top"
          />
        )}
      </div>
    </div>
  );
}
