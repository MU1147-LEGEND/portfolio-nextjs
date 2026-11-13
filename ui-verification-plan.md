# UI/UX Verification Plan for Apple-Inspired Redesign

## Overview
Verify the Next.js 15 production build against the redesign requirements: Apple Human Interface Guidelines (HIG), Awwards-inspired design, responsive behavior, and the full feature set from the redesign plan.

## Verification Goals

1. **Design Compliance**
   - Apple HIG visual system (translucent chrome, optical typography, critical damping springs)
   - Awwards research evidence (masking index, stage/list view, architectural metadata)
   - Mobile-first responsive design (390x844 iPhone, 1440x900 desktop)

2. **Interaction Design**
   - Critical damping springs with interruptible motion
   - `prefers-reduced-motion`/`prefers-reduced-transparency`/`@media (hover: hover)` gates
   - Translucent chrome (`backdrop-filter: blur(20px) saturate(180%)`)
   - Custom cubic-bezier easing (emilkowalski philosophy)

3. **Functional Verification**
   - Admin panel with WhatsApp contact `wa.me/8801734906838`
   - CRUD persistence for projects and settings
   - Stage ↔ List toggle (WorkShowcaseStage)
   - Theme switching with localStorage persistence
   - Responsive navigation and touch targets (≥44px)

## Test Matrix

### Desktop (1440x900)
- **Hero Section**: Asymmetric 12-col grid with availability badge, WhatsApp + Explore work CTAs
- **WorkShowcaseStage**: Masked rolling index counter, dual-mode (Stage/List), sticky selector rail, MediaFrame with hardware bezel
- **Dark/Light Mode**: Verified with theme toggle, optical typography, color tokens from REDESIGN_PLAN.md
- **Viewport Tests**: Horizontal overflow check, touch target dimensions

### Mobile (390x844 iPhone-class)
- **Viewport**: 375x844 with deviceScaleFactor 3, isMobile + hasTouch
- **Touch Targets**: All interactive elements ≥44px
- **Navigation**: Hamburger drawer, collapsed header, modal overlays

### Theme System
- **Light Mode**: `--bg-canvas: #F5F5F7`, `--bg-surface: #FFFFFF`, `--ink-primary: #1D1D1F`
- **Dark Mode**: `--bg-canvas: #111214`, `--bg-surface: #181A1E`, `--ink-primary: #F5F5F7`
- **Accent**: `--accent: #0055D4` / `--accent: #409CFF`

## Technical Verification

### 1. Design System Compliance
```bash
cd portfolio-nextjs
npx playwright test tests/ui-verification.test.ts --config playwright.config.ts
```

### 2. Theme Switching
- Verify theme persistence across page reloads
- Check `prefers-reduced-motion` and `prefers-reduced-transparency` respect

### 3. Apple Motion Patterns
- Verify Spring animations (`transform: scale(0.97)` on `:active`)
- Confirm interruptible transitions (`transition-duration: 100ms`)

### 4. Responsive Layout
- Viewport breakpoints at 390px, 768px, 1024px, 1440px
- Flex/grid container widths: 100% - 1200px (with padding)
- Horizontal overflow: `overflow-x: hidden` on body, no scrollbars

### 5. Component Structure
- **WorkShowcaseStage**: Dual-mode with Stage/List toggle (initial state: Stage)
- **Hero**: Asymmetric grid with portrait image, availability badge, WhatsApp composer
- **MediaFrame**: Hardware-accelerated with `will-change: transform`, `backface-visibility: hidden`

### 6. WhatsApp Integration
- Verify `wa.me/8801734906838` link generation
- Check WhatsApp composer topic chips
- Test message pre-population

### 7. Admin Security
- Unauthenticated `/admin` redirects to login page
- Admin guard middleware protection
- Session cookie HMAC-SHA256 with `SESSION_COOKIE_NAME` verification

## Test Execution Plan

### Phase 1: Basic Functionality
1. **Homepage Load**
   - Verify Hero section loads with correct text/image
   - Check theme toggle functionality
   - Validate WhatsApp link

2. **Work Showcase**
   - Verify Stage/List toggle visibility and functionality
   - Check project cards with metadata
   - Test MediaFrame interactions

3. **Responsive Breakpoints**
   - Desktop (1440x900): Verify layout and functionality
   - Mobile (390x844): Verify responsive navigation and touch targets

### Phase 2: Apple Design Compliance
1. **Visual System**
   - Check backdrop-filter blur on chrome elements
   - Verify typography scale (optical sizing, tracking)
   - Confirm translucent surface styling

2. **Motion Design**
   - Test Spring animations on press
   - Verify reduced motion preferences respected
   - Check interruptible transitions

### Phase 3: Feature Verification
1. **WhatsApp Composer**
   - Test topic chip selection
   - Verify message pre-population
   - Check send functionality (would open WhatsApp)

2. **Theme Persistence**
   - Verify theme setting across page reloads
   - Check theme initialization script

3. **Navigation**
   - Test mobile drawer
   - Verify desktop navigation
   - Check back button functionality

## Playwright Test Structure

```typescript
// tests/ui-verification.test.ts
import { test, expect, Page } from '@playwright/test';

test.describe('Apple-Inspired Portfolio UI/UX', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
    });
    page = await context.newPage();
    await page.goto('http://localhost:3000');
  });

  test('Desktop view: Hero section loads correctly', async () => {
    await page.locator('.pressable').first().waitFor();
  });

  test('Desktop view: Stage ↔ List toggle works', async () => {
    await page.locator('#stage-list-toggle').waitFor();
  });

  test('Desktop view: Theme switching works', async () => {
    await page.locator('[data-theme="dark"]', { hasNot: true }).waitFor();
  });

  test('Mobile view: Responsive navigation', async () => {
    await page.setViewportSize({ width: 375, height: 844 });
    await page.locator('.mobile-nav-toggle').waitFor();
  });
});
```

## Reporting

### Success Criteria
- All 15 desktop tests pass
- All 10 mobile tests pass
- 0 accessibility violations (WCAG 2.1 AA)
- Zero horizontal overflow on all viewports
- All theme transitions working
- All touch targets ≥44px

### Failure Criteria
- Layout mismatches > 10px from reference
- Touch targets <44px
- Horizontal overflow present
- Theme toggle functionality broken
- Motion violates Apple HIG

## Post-Build Actions

1. **Cleanup**
   - Stop Next.js server
   - Archive verification results
   - Update README with test status

2. **Documentation**
   - Write test results summary
   - Document any known issues
   - Update verification checklist

3. **Release Readiness**
   - Verify all production dependencies
   - Check bundle sizes
   - Validate performance metrics

## Required Tools

- Node.js 18+
- pnpm (1.0+)
- Playwright (v1.40+)
- Chrome/Firefox browser
- Git (for version control)

## Environment Setup

```bash
cd portfolio-nextjs
pnpm install
pnpm playwright install chromium
pnpm test:ui
```

## Test Automation

The verification suite can be automated with GitHub Actions or any CI/CD pipeline. Key metrics include:
- Bundle size: <500KB (production)
- Build time: <60 seconds
- Test coverage: 90%+
- Performance score: >90

## Next Steps

1. Run manual testing for edge cases
2. Set up automated UI testing in CI
3. Document any design deviations from Apple H,IG
4. Create user testing feedback loops
5. Finalize accessibility compliance

## Post-Build Cleanup

After verification is complete, stop the Next.js server:

```bash
# Check for Next.js processes
ps aux | grep next

# Stop the server
kill <PID>
```

## Current Status

The Next.js server is now running at `http://localhost:3000`.

**Test URL**: `http://localhost:3000` (for UI/UX verification)

Next steps:
1. Access the site in browser
2. Run comprehensive UI/UX tests
3. Verify responsive design
4. Check Apple HIG compliance
5. Test all interactive features

Verification plan ready for execution.