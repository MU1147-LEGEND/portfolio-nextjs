import Reveal from "@/components/motion/Reveal";

const CAPABILITIES = [
  {
    title: "Interface Architecture",
    summary:
      "Design systems, optical typography, accessible state machines, and responsive layouts built from first principles.",
    specs: ["React 19", "Next.js App Router", "TypeScript", "Tailwind CSS v4"],
  },
  {
    title: "Full-Stack & Data",
    summary:
      "End-to-end product engineering with typed APIs, relational data modeling, authentication, and fast server rendering.",
    specs: ["Node.js", "SQLite / libSQL", "MongoDB", "Drizzle ORM"],
  },
  {
    title: "Motion & Polish",
    summary:
      "Interruptible physics, GPU-composited transitions, reduced-motion parity, and sub-second perceived performance.",
    specs: ["Motion Springs", "Lenis Smooth Scroll", "WCAG 2.1 AA", "Figma to Code"],
  },
];

export default function CapabilitiesGrid() {
  return (
    <section
      aria-labelledby="capabilities-heading"
      className="border-t border-[var(--hairline)] px-4 py-16 sm:px-6 sm:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-[1360px]">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="capabilities-heading"
              className="display-section font-semibold text-[var(--ink-primary)]"
            >
              Engineering & Craft
            </h2>
            <p className="max-w-md text-[15px] text-[var(--ink-secondary)]">
              Focused on durable architecture, tactile responsiveness, and clean
              delivery from schema to screen.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CAPABILITIES.map((cap, idx) => (
            <Reveal key={cap.title} delay={idx * 0.05}>
              <article className="flex h-full flex-col justify-between rounded-2xl border border-[var(--hairline)] bg-[var(--bg-surface)] p-6 sm:p-7">
                <div>
                  <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-[var(--ink-primary)]">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
                    {cap.summary}
                  </p>
                </div>

                <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-[var(--hairline)] pt-4">
                  {cap.specs.map((item) => (
                    <li
                      key={item}
                      className="rounded-md bg-[var(--bg-subtle)] px-2.5 py-1 font-mono text-[12px] text-[var(--ink-primary)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
