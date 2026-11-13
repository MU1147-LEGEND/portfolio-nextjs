# Add Six Portfolio Projects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish six requested projects in the Work section, each with a current screenshot captured from its live site.

**Architecture:** Capture each reference site at desktop viewport with Playwright into `public/assets/projects/`. Add project records to the existing Drizzle seed path in an idempotent way so existing SQLite installations gain missing rows without replacing administrator data. Keep the CMS as the source for project ordering and publication.

**Tech Stack:** Next.js 15, TypeScript, Drizzle ORM/libSQL, Playwright MCP, existing Node test runner.

**Spec:** User request (2026-11-13); `docs/REDESIGN_PLAN.md`.

## Global Constraints

- Keep existing projects and admin-edited data unchanged.
- Preserve exact live URLs: `https://www.yucarrental.com/en`, `https://sanchayanbd.com/`, `https://basati.vercel.app/`, `https://text-to-speech-nextjs-fullstack.vercel.app/`, `https://my-id-card-nine.vercel.app/`, `https://sunnah-store.vercel.app/books`.
- SanchayanBD screenshot must show updated live site, not existing seed image.
- Mark YuCar Rental and Sunnah Store as team projects in project copy.
- Save screenshots under `public/assets/projects/`; use local image paths in `imageUrl`.
- Do not invent unverified tech stacks, job titles, outcomes, dates, or repository URLs; use only confirmed site evidence and existing repository metadata.
- New entries must be published and displayed through existing project queries; do not change project-card architecture.

## Review Focus

- Existing non-empty database: seed adds missing requested projects without reseeding or overwriting curated project rows; cover in seed integration test.
- Repeated seed execution: no duplicate slugs; cover in seed integration test.
- Screenshot capture blocked, inaccessible, or error page: do not silently publish a misleading screenshot; report the URL and use an explicitly labeled fallback only with user approval.
- Screenshot capture on very long pages: capture consistent initial desktop viewport, not a full-page image that becomes unreadable in cards; inspect all six captures before accepting.
- Existing CMS sort order/featured count: keep prior ordering and make the six new projects non-featured by default; test ordering and featured list remain unchanged.

---

### Task 1: Capture and inspect live project screenshots

**Files:**
- Create: `public/assets/projects/yucar-rental.png`
- Create: `public/assets/projects/sanchayanbd.png` (replace existing image only after inspecting the target)
- Create: `public/assets/projects/basati.png`
- Create: `public/assets/projects/text-to-speech.png`
- Create: `public/assets/projects/my-id-card.png`
- Create: `public/assets/projects/sunnah-store.png`

**Interfaces:**
- Produces: six optimized, readable project-card screenshots at stable local paths used by Task 2.

- [ ] Navigate Playwright to each exact URL at 1440×900; wait for page content and images to settle.
- [ ] Capture viewport screenshots (not full-page) at those paths.
- [ ] Inspect each capture for successful page load, correct project identity, and no browser error/interstitial; re-capture after dismissing obstructive banners if possible.
- [ ] Confirm each image is stored under `public/assets/projects/` and readable by Next.js.

### Task 2: Add projects idempotently to seed data

**Files:**
- Modify: `db/seed.ts`
- Modify: `tests/db-queries.test.ts`

**Interfaces:**
- Consumes: screenshot paths from Task 1; existing `projects` Drizzle table.
- Produces: six rows with slugs `yucar-rental`, `sanchayanbd`, `basati`, `text-to-speech`, `my-id-card`, `sunnah-store`.

- [ ] Add a regression test using `createDbClient(":memory:")`: seed once, verify six requested slugs and image paths; seed again, verify one row per slug and existing project fields unchanged.
- [ ] Run `pnpm test`; confirm the new test fails because current seeding only runs when the table is empty.
- [ ] Update `ensureSchemaAndSeed()` to insert only missing requested seed slugs, preserving existing rows. Leave the three current starter projects intact for fresh databases.
- [ ] Add project metadata from confirmed live-site content; set exact URLs above, category from the approved mapping (YuCar Rental/fullstack; SanchayanBD/fullstack; Basati/fullstack; Text-to-Speech/product; My ID Card/frontend; Sunnah Store/fullstack), `published: true`, `featured: false`, and sort orders after existing projects.
- [ ] Set `repoUrl` only when repository URL is verifiable; otherwise empty string. Set team roles/copy for YuCar Rental and Sunnah Store without implying individual ownership.
- [ ] Run `pnpm test`; all tests pass, including repeated-seed and preservation assertions.

### Task 3: Verify public Work pages and production build

**Files:**
- Modify only if needed: `db/seed.ts`, project records or screenshot assets.

**Interfaces:**
- Consumes: six screenshot paths and idempotent seed behavior.
- Produces: verified Work archive and homepage project count with six additions.

- [ ] Run `pnpm typecheck` and `pnpm test`.
- [ ] Run `pnpm build`; require successful Next.js production build.
- [ ] Start production server on an available port and open `/work` with Playwright.
- [ ] Verify all six project titles, destinations, and screenshot assets render; verify homepage work count reflects the database.
- [ ] Check 390×844 and 1440×900 viewports for image loading and horizontal overflow.
- [ ] Report any URL that failed to capture and leave its entry unpublished rather than substituting invented imagery.
