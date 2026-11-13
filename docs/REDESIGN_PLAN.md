# Portfolio Full Redesign & Architecture Plan (Awwwards + Apple HIG + Design Engineering)

**Repository:** `portfolio-nextjs` (Next.js 15 App Router -> TypeScript)
**Owner:** Mohammad Ullah (`mohammadullah.me`)
**Direction:** Apple Hardware Clarity + Editorial Swiss Portfolio
**Tooling & Skills Applied:**
- **Design & Motion:** `awwwards-website`, `awwwards-inspiration`, `frontend-design`, `emilkowalski/skills` (`apple-design`, `emil-design-eng`, `animate`, `choreograph`, `animation-performance`, `mobile-native`, `break-ui`)
- **Verification:** Playwright MCP (`@playwright/mcp@latest`), TypeScript (`tsc --noEmit`), Next.js Production Build

---

## 1. Awwwards Research Synthesis (Grounded Evidence)

Researched 18+ Developer Award & Portfolio SOTD winners via `awwwards` MCP, synthesized with `create_design_brief`, and inspected motion frame-by-frame (`ffmpeg` 2fps video tiling) on shortlisted references:

| Reference | Score / Stack | What We Adopted (Without Copying) |
|---|---|---|
| **Grégory Lallé — '24** (`gregorylalle.com`) | SOTD `7.48` · Minimal, Transitions | **Focus Stage + Masked Odometer Index**: Studied `Works focus view` video frames — left rolling masked counter (`01`->`02`), anchored selector list, right 16:10 stage frame, and top-right live metadata + external link. Scales cleanly for any number of projects. |
| **RossMason®** (`iamrossmason.com`) | SOTD `7.71` · Minimal, Typography | **Dual View Switcher (`Stage` / `List`) + Live Local Clock**: Studied `Project Thumbnail Reveal` video frames — in List view, inactive items dim (`opacity: 0.35`) while active item stays crisp ink and swaps a single pinned preview card with zero layout shift. |
| **Gil Huybrecht** (`gilhuybrecht.com`) | SOTD `7.66` · Next.js, Microinteractions | **Architectural Spec Header & Editorial Profile**: Top 5-column metadata strip (`Name | Availability | Services | Stack | Contact`) and hanging-indent large display bio prose. |
| **Get Daff\*d** (`get-daffed.com`) | Nominee · Minimal, Typography | **Apple-Style Spec Metrics & Chronological Ledger**: Crisp numeric impact callouts + clean tabular credential rows (`Year` / `Title` / `Institution`) + live printable web `/resume`. |
| **AW Media & Marketing** (`awmedia.marketing`) | Nominee · Next.js, React, Motion | **Translucent Floating Chrome & Live WhatsApp Entry**: Proves Next.js + Motion handles Apple-like frosted pills + non-intrusive bottom WhatsApp quick-entry cleanly. |

### Key Takeaways From Motion Study (`apple-design` + `emil-design-eng`)
1. **No diagonal bounce entrances** (`x: -75, y: 75` deleted) and **no `scale(0)`**. Elements enter from `opacity: 0, translateY(12px)` or `scale(0.96)` with Apple deceleration or critically damped springs.
2. **Interruptibility & Speed:** All UI interactions stay `< 300ms` (`160ms` press, `200ms` transitions), buttons respond immediately on `:active { transform: scale(0.97) }`, popovers use `transform-origin` anchored to trigger.
3. **Motion v12 Hardware Acceleration Rule:** Because `package.json` uses `motion@12.23.12` (below v14.2), upgrade `motion` or animate explicit `transform: "translateY(...)"` / CSS animations off the main thread so scroll/route transitions never drop frames under load.
4. **Touch-Safe Hovers:** Every hover lift/dimming effect is gated behind `@media (hover: hover) and (pointer: fine)` — mobile never traps content behind hover overlays.

---

## 2. Current Codebase Audit (Delete & Replace Map)

| Current File / Package | Problem Found | Action |
|---|---|---|
| `app/globals.css` | Pure `#000` body + `#ffc401` conflicts with shadcn oklch tokens; global scrollbar hidden | **Rewrite** with Light-first (`#F5F5F7`) + Dark (`#111214`) token system |
| `app/layout.js` | References `--font-geist-sans` without loading `next/font`; no OpenGraph/JSON-LD | **Replace** with `app/layout.tsx` (`Instrument_Sans`, `Newsreader`, `JetBrains_Mono`, SEO + JSON-LD) |
| `app/components/Hero.jsx` | Dead "Hire Me" button; raw `<img>` with blurred duplicate circle | **Replace** with asymmetric 12-col Hero + live WhatsApp/Work CTAs + `next/image` |
| `app/components/AboutMe.jsx` | Fixed `h-[4rem]` clips wrapped list items; spinning white-box logo marquee; calls role "Frontend" vs Footer "Full Stack" | **Replace** with Spec Capabilities Matrix + Credential Ledger + unified role ("Full-Stack Engineer") |
| `app/components/ProjectCards.jsx` & `ProjectCard.jsx` | 3-col Embla carousel with 2 hardcoded projects leaves empty track; hover-only slide-up overlay unusable on mobile | **Replace** with SQLite-backed `WorkShowcaseStage` (`Stage` / `List` views) + `/work` + `/work/[slug]` |
| `app/components/Contact.jsx` | `<button type="button">` dead form; emoji icons (`📍📞📩🌐`) | **Replace** with WhatsApp-first CTA (`https://wa.me/8801734906838`) + copyable email & structured channels |
| `app/components/ScrollProgress.jsx` | `useState` scroll listener re-renders React on every pixel | **Delete / Replace** with GPU `scaleX` or remove |
| `app/components/motions/RevealBounce.jsx` & `Transition.jsx` | `once: false` repetitive bounce; ignores `prefers-reduced-motion` | **Replace** with `Reveal.tsx` (`once: true`, `prefers-reduced-motion` aware) |
| `app/components/motions/PathsMorph.jsx` | 100% commented-out dead file | **Delete** |
| `components/ui/{button,card,carousel}.jsx` | Unused / Embla boilerplate | **Delete** |
| `@deemlol/next-icons`, `embla-carousel-react` | Duplicate icon library + unused carousel | **Uninstall** |
| `public/assets/*.png` (13 skill stickers) | Template marquee clutter | **Remove** unused skill logo PNGs after migration (keep `profile.png`, `resume.pdf`, `projects/*`) |

---

## 3. Visual Design System

### 3.1 Color Palette (Never pure `#000000` or `#FFFFFF` on canvas)

| Token | Light Mode (Default) | Dark Mode (`[data-theme="dark"]`) | Role |
|---|---|---|---|
| `--bg-canvas` | `#F5F5F7` | `#111214` | Primary page canvas |
| `--bg-surface` | `#FFFFFF` | `#181A1E` | Hardware stage, case-study cards, admin panels |
| `--bg-chrome` | `rgba(245, 245, 247, 0.72)` | `rgba(17, 18, 20, 0.72)` | Translucent nav (`backdrop-filter: blur(20px) saturate(180%)`) |
| `--bg-subtle` | `#E8E8ED` | `#22252B` | Hover pills, segmented controls, spec tags |
| `--ink-primary` | `#1D1D1F` | `#F5F5F7` | Headlines, active list items |
| `--ink-secondary` | `#6E6E73` | `#98989D` | Metadata, dates, dimmed list items |
| `--hairline` | `rgba(29, 29, 31, 0.10)` | `rgba(245, 245, 247, 0.12)` | Subtle 1px structural dividers |
| `--accent` | `#0055D4` | `#409CFF` | Focus ring, active links, primary buttons |
| `--status-live` | `#15803D` | `#22C55E` | Availability dot & WhatsApp direct indicator |

### 3.2 Optical Typography (`next/font/google`)
- **Display & UI:** `Instrument Sans` (`400`, `500`, `600`) — size-specific tracking (`-0.035em` hero, `-0.025em` section headings, `0` body), `font-variant-numeric: tabular-nums` for counters and years.
- **Editorial Contrast (Bio Lead & Case Study Intro):** `Newsreader` (`400`, italic) — restrained editorial warmth.
- **Technical Metadata / Slugs:** `JetBrains Mono` (`400`) — stack chips, admin slugs, UTC clock.

**Scale:**
- `--text-hero`: `clamp(2.75rem, 6.8vw, 6rem)` · `line-height: 0.98` · `letter-spacing: -0.035em`
- `--text-display`: `clamp(1.85rem, 3.8vw, 3.25rem)` · `line-height: 1.08` · `letter-spacing: -0.025em`
- `--text-body`: `1.0625rem` (`17px`) · `line-height: 1.6` · `max-width: 65ch`
- `--text-meta`: `0.8125rem` (`13px`) · sentence case (no forced all-caps eyebrows)

### 3.3 Motion & Accessibility Tokens
- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`
- `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`
- `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`
- Apple critically damped spring default: `{ type: "spring", duration: 0.4, bounce: 0 }`
- Interactive press feedback: `:active { transform: scale(0.97); transition: transform 100ms ease-out; }`
- `@media (prefers-reduced-motion: reduce)`: disables Lenis smoothing & positional transforms; uses gentle `200ms` opacity cross-fades.
- `@media (prefers-reduced-transparency: reduce)`: makes translucent nav opaque (`var(--bg-canvas)`), drops `backdrop-filter`.

---

## 4. Database & Protected Admin CMS (SQLite + Drizzle)

### 4.1 Zero-Setup SQLite With Vercel Compatibility
Because git history (`8b50250`) indicates Vercel usage:
- Use **Drizzle ORM + `@libsql/client`**:
  - **Local / VPS / Docker:** `DATABASE_URL="file:./data/portfolio.db"` — creates and runs straight from a local SQLite file with zero external database setup.
  - **Vercel Serverless:** Swap `.env` to Turso (`TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN`) — identical Drizzle schema and SQLite SQL, persists across cold starts.

### 4.2 Schema (`db/schema.ts`)
1. **`projects`**
   - `id` (PK autoincrement), `slug` (unique), `title`, `tagline`, `role`, `year`, `category` (`fullstack` | `frontend` | `product`)
   - `description`, `problem`, `solution`, `outcome` (case study narrative)
   - `stack` (JSON string array), `imageUrl`, `liveUrl`, `repoUrl`
   - `featured` (boolean — controls Home Stage selection), `published` (boolean — draft vs live), `sortOrder` (integer — explicit ordering)
   - `createdAt`, `updatedAt`
2. **`site_settings`** (single-row config editable from `/admin`)
   - `id`, `fullName`, `roleTitle` (`"Full-Stack Engineer"`), `heroHeadline`, `heroSubheadline`, `bio`, `availabilityText`, `whatsappNumber` (`"8801734906838"`), `email` (`"ullahmohammad314@gmail.com"`), `location` (`"Brahmanbaria, Bangladesh"`), `resumeUrl`, `githubUrl`, `linkedinUrl`, `instagramUrl`, `facebookUrl`

### 4.3 Security & Admin Capabilities
- **Auth (`lib/auth.ts` + `middleware.ts`):** Password verified with `crypto.timingSafeEqual` against `process.env.ADMIN_PASSWORD`, issuing an HMAC-SHA256 signed `HttpOnly; SameSite=Lax; Path=/` cookie (`process.env.AUTH_SECRET`). Fails closed if env vars missing.
- **Admin UI (`/admin`):**
  - Clean Apple-inspired split manager + KPI summary strip (Published / Featured / Total)
  - Full project CRUD: Create, Edit, Delete (with confirmation), Publish/Draft toggle, Feature on Home toggle, Up/Down `sortOrder` controls
  - Image upload (`POST /api/upload` saving to `public/uploads/` locally, or external URL / preset asset picker)
  - Site Settings tab to update bio, availability, WhatsApp number, and links live
  - Automatic cache revalidation (`revalidatePath('/', 'layout')`, `/work`, `/work/[slug]`) on every change

---

## 5. Multi-Page Sitemap & Layout Blueprint

### `/` — Home
```text
+-----------------------------------------------------------------------+
| Mohammad Ullah          Work   About   Resume   Contact   [Theme] [WA]| <- Translucent Apple chrome + scroll-edge mask
+-----------------------------------------------------------------------+
|                                                                       |
|  Full-Stack Engineer building              +---------------------+    |
|  fast, tactile web software.               |                     |    |
|                                            |   4:5 Crisp Portrait|    |
|  Turning product ideas into resilient      |   (next/image)      |    |
|  Next.js systems & fluid interfaces.       |                     |    |
|                                            +---------------------+    |
|  [Explore selected work]  [Chat on WhatsApp]                          |
| --------------------------------------------------------------------- |
|  Brahmanbaria, BD · UTC+6 Live Clock   |   Available for new projects |
+-----------------------------------------------------------------------+
|  Selected Work                              [Stage | List]   All (N)  | <- Signature Dual-Mode Showcase (DB-driven)
|  +-------+  01  SanchayanBD  <--           +-----------------------+  |
|  | [01]  |      Next.js Learning           |                       |  |
|  | [02]  |      VisionaryAI                |  16:10 Hardware Frame |  |
|  |       |                                 |  Live Screenshot +    |  |
|  |       |  Role · Year · Stack            |  Case Study / Live ↗  |  |
|  +-------+  -----------------------------  +-----------------------+  |
+-----------------------------------------------------------------------+
|  Engineering Capabilities (3-Column Apple Spec Sheet)                 |
|  Frontend Systems         | Full-Stack & Data      | Motion & Craft   |
+-----------------------------------------------------------------------+
|  Background & Credentials (Clean Tabular Ledger — zero clipping)      |
|  2025   JavaScript Algorithms & Data Structures    freeCodeCamp ↗     |
|  2023   Diploma in Computer Science & Technology   2022–2023          |
|  2020   Alim (HSC)                                 Tamirul Millat     |
+-----------------------------------------------------------------------+
|  Have a project in mind?                                              |
|  Direct line on WhatsApp (wa.me/8801734906838) or copy email          |
+-----------------------------------------------------------------------+
```

### Additional Complete Pages
- **`/work`**: Filterable archive (`All`, `Full-Stack`, `Frontend`, `Product`) reading all `published = true` projects from SQLite. Every card exposes direct `Case Study` and `Live` links without hover traps.
- **`/work/[slug]`**: Editorial case study — hero metadata strip, 16:10 framed visual, Problem / Architecture / Outcome sections, stack breakdown, Next Project navigator.
- **`/about`**: Extended story (engineering craft + biking adventures), engineering philosophy, verified certifications, timeline.
- **`/resume`**: Clean web-typographic CV synced with profile data + print-ready CSS + PDF download (`/assets/resume.pdf`).
- **`/contact`**: WhatsApp-primary contact hub (`https://wa.me/8801734906838` with quick pre-filled topic chips: *Freelance Project*, *Full-Time Role*, *Quick Question*) + click-to-copy email (`ullahmohammad314@gmail.com`) + phone + social links.
- **`/admin` & `/admin/login`**: Protected management workspace.

---

## 6. Target File Structure

```text
portfolio-nextjs/
├── docs/REDESIGN_PLAN.md
├── db/
│   ├── index.ts                 # Drizzle + @libsql/client
│   ├── schema.ts                # projects + siteSettings
│   └── seed.ts                  # Idempotent initial seed (3 projects + Mohammad Ullah settings)
├── lib/
│   ├── auth.ts                  # HMAC session cookie + timingSafeEqual check
│   ├── queries.ts               # Typed cached queries for public & admin routes
│   └── utils.ts                 # cn(), slugify(), formatWhatsAppUrl()
├── middleware.ts                # Guard /admin (except /admin/login)
├── app/
│   ├── layout.tsx               # Fonts, ThemeProvider, Metadata, JSON-LD, Lenis
│   ├── globals.css              # Design tokens, Apple chrome, reduced-motion
│   ├── page.tsx                 # Home
│   ├── work/page.tsx            # Archive
│   ├── work/[slug]/page.tsx     # Case study
│   ├── about/page.tsx
│   ├── resume/page.tsx
│   ├── contact/page.tsx
│   ├── admin/login/page.tsx
│   ├── admin/page.tsx
│   ├── api/
│   │   ├── admin/login/route.ts
│   │   ├── admin/logout/route.ts
│   │   ├── projects/route.ts
│   │   ├── projects/[id]/route.ts
│   │   ├── settings/route.ts
│   │   └── upload/route.ts
│   ├── opengraph-image.tsx
│   ├── sitemap.ts
│   └── robots.ts
└── components/
    ├── layout/{SiteHeader,SiteFooter,ThemeToggle,SmoothScroll,LiveClock}.tsx
    ├── home/{Hero,WorkShowcaseStage,CapabilitiesGrid,CredentialLedger,ContactBand}.tsx
    ├── work/{WorkArchive,MediaFrame,ProjectCaseStudy}.tsx
    ├── admin/{AdminDashboard,ProjectEditorModal,SettingsEditor}.tsx
    └── motion/Reveal.tsx
```

---

## 7. Phased Build & Verification Plan

1. **Phase 1 — Cleanup & TypeScript + DB Setup**
   - Install: `drizzle-orm`, `@libsql/client`, `zod`, `sonner` (Emil Kowalski toast library for admin feedback), devDeps: `typescript`, `@types/react`, `@types/react-dom`, `@types/node`, `drizzle-kit`.
   - Uninstall: `@deemlol/next-icons`, `embla-carousel-react`.
   - Upgrade `motion` (or enforce explicit `transform` rules).
   - Remove dead JSX components, `PathsMorph.jsx`, unused UI files; add `tsconfig.json`, `.env.local` (`DATABASE_URL`, `ADMIN_PASSWORD`, `AUTH_SECRET`).
   - Create `db/schema.ts`, `db/index.ts`, `db/seed.ts`; push schema + seed initial 3 projects (`Sanchayanbd`, `Next.js Learning Platform`, `VisionaryAI` as draft/published) + profile settings.

2. **Phase 2 — Design System & Core Shell**
   - Implement `app/globals.css` tokens (Light + Dark + `prefers-reduced-motion` + `prefers-reduced-transparency` + `@media (hover: hover)`).
   - Implement `app/layout.tsx` (`Instrument_Sans`, `Newsreader`, `JetBrains_Mono`, `Toaster` from `sonner`, JSON-LD `Person` schema).
   - Build `SiteHeader` (Apple translucent pill/bar + accessible mobile drawer), `SiteFooter`, `ThemeToggle`, `LiveClock`, `SmoothScroll`, `Reveal`.

3. **Phase 3 — Public Portfolio Pages**
   - Build `Hero`, `WorkShowcaseStage` (`Stage` view with masked rolling `01` index + `List` view with dim-on-hover preview), `CapabilitiesGrid`, `CredentialLedger`, `ContactBand`.
   - Build `/work`, `/work/[slug]`, `/about`, `/resume`, `/contact` (WhatsApp topic selector -> `https://wa.me/8801734906838?text=...`), plus `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`.

4. **Phase 4 — Protected Admin CMS**
   - Build `lib/auth.ts`, `middleware.ts`, `/admin/login`, `/admin`, and validated API routes (`/api/projects`, `/api/projects/[id]`, `/api/settings`, `/api/upload`) with `revalidatePath` on mutations.

5. **Phase 5 — Verification Gate (Playwright MCP + Build)**
   - Run `npx tsc --noEmit` and `pnpm build` (0 errors).
   - Start app and inspect live via **Playwright MCP** across Desktop (`1440x900`) & Mobile (`375x844`):
     - Verify Light & Dark themes, zero horizontal overflow, >=44px tap targets.
     - Test Stage <-> List view toggle and project switching.
     - Verify unauthenticated `/admin` redirects to `/admin/login` and API returns `401`.
     - Log into `/admin`, create/toggle/reorder a project, verify public `/` and `/work` update immediately.
     - Verify WhatsApp link (`https://wa.me/8801734906838`) and `/assets/resume.pdf`.
