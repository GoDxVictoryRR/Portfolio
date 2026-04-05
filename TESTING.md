# TESTING & QA CHECKLIST

## Acceptance Criteria — The site passes QA when ALL items below are checked.

---

## VISUAL QUALITY

### Loading Screen
- [ ] Pure black background on load
- [ ] White triangle △ appears at bottom-left with fade-in
- [ ] Dashed circle ○ appears center-left with fade-in (slight delay)
- [ ] L-bracket ⌐ appears top-right with fade-in (slight delay)
- [ ] Diagonal grid lines are visible (not the square grid)
- [ ] After ~1.8s, loader wipes away (two-panel split — top up, bottom down)
- [ ] No flash of unstyled content before loader

### Navigation
- [ ] Logo "▲ HARDIK" visible top-left in Space Mono
- [ ] Nav links centered: Projects | About | Experience | Contact
- [ ] "Contact / Hire" pill button top-right
- [ ] Audio bars animating continuously (3 bars)
- [ ] Nav stays visible on all sections (fixed positioning)
- [ ] Nav links scroll to correct sections
- [ ] Hover states on all nav elements work

### Hero Section
- [ ] Dark background with square grid (faint)
- [ ] "+" markers scattered on grid (at least 8)
- [ ] Crystal H is visible and 3D (not flat)
- [ ] Crystal H has iridescent/holographic material (purple/teal/gold shifting)
- [ ] Crystal H rotates continuously on Y axis (slow)
- [ ] "HARDIK" on line 1, "JAISWAL" on line 2 — massive white Bebas Neue
- [ ] Name text is centered and appears over/behind crystal
- [ ] Role label "SOFTWARE ENGINEER / AI SYSTEMS" below name
- [ ] "MainLogo Quaternion" panel visible top-right with live X Y Z W values
- [ ] Values update as crystal rotates (decimal numbers, ± signs)
- [ ] Arcball gimbal widget visible below quaternion panel
- [ ] Gimbal has 3 colored axis rings (red/green/blue)
- [ ] "Reset Quaternion" text link below gimbal
- [ ] "MainLogo Material" panel visible bottom-left
- [ ] roughness slider with value 0.10
- [ ] noiseScale slider with value 9.0
- [ ] color swatch with hex value display
- [ ] Moving sliders visibly changes the crystal material
- [ ] Dragging crystal with mouse rotates it
- [ ] Crystal auto-resumes rotation after drag
- [ ] Mouse parallax: moving cursor subtly tilts crystal
- [ ] Reset Quaternion resets rotation to default

### About Section
- [ ] Section indicator "— ABOUT" on left edge (vertical)
- [ ] Two columns: bio left, skills right
- [ ] "ABOUT" label top of left column
- [ ] Bio text present and readable (DM Mono)
- [ ] 4 stats below bio (500+ LeetCode, 8.0 CGPA, Top 19%, 365 Day Streak)
- [ ] Stats have large value + small label
- [ ] "SKILLS" label top of right column
- [ ] Right column has border-left separator
- [ ] 4 skill groups present: Languages, Frameworks, Cloud & Tools, Concepts
- [ ] Each group has its label in all-caps small mono
- [ ] Skills render as chips/tags (not bullet lists)
- [ ] Tag hover state works

### Projects Section
- [ ] Ghost text "PROJECTS" watermark in background
- [ ] Section indicator "— PROJECTS" left edge
- [ ] Project 1: Sentiment Liquidity Engine — full viewport
- [ ] Project 2: FactAnchor — full viewport
- [ ] Each project: image panel left (angled/perspective), details right
- [ ] Image panel has 3D perspective tilt
- [ ] Image panel hover lifts with shadow
- [ ] Project date, title, subtitle, description all present
- [ ] 3 metrics per project displayed
- [ ] Tech stack tags present
- [ ] GitHub link present and correct
- [ ] Scroll reveals each project section

### Experience Section
- [ ] Ghost text "EXPERIENCE" watermark in background
- [ ] Section indicator "— EXPERIENCE" left edge
- [ ] Experience 1: Shell AICTE — full viewport
- [ ] Experience 2: Microsoft AICTE — full viewport
- [ ] Each: card panel left with details inside, company label right
- [ ] Company label styled like "CREATED IN FORTNITE" reference
- [ ] Role title large, date range, description all present
- [ ] Bullet detail points present (dimmer text)
- [ ] Tech tags present
- [ ] Scroll reveals each experience section

### Contact Section
- [ ] Diagonal grid lines visible (same as loader)
- [ ] Triangle △ and circle ○ geometric shapes present (visual echo of loader)
- [ ] "GET IN" line 1, "TOUCH" line 2 — massive Bebas Neue
- [ ] Subheading present
- [ ] Email link clickable (mailto:)
- [ ] LinkedIn link opens correct URL in new tab
- [ ] GitHub link opens correct URL in new tab
- [ ] Footer "HARDIK JAISWAL © 2026" present at bottom

---

## INTERACTIONS & ANIMATIONS

- [ ] Custom cursor visible (dot + ring)
- [ ] Ring expands on hoverable elements
- [ ] Ring color shifts to purple on hover
- [ ] Loader exit animation is smooth (no jank)
- [ ] Hero elements animate in after loader exits (staggered)
- [ ] About section animates in on scroll (not pre-visible)
- [ ] Project panels animate in on scroll
- [ ] Experience panels animate in on scroll
- [ ] Contact elements animate in on scroll
- [ ] Ghost watermark text has parallax on scroll
- [ ] Crystal H shrinks and moves to ambient position on scroll past hero
- [ ] Smooth scrolling (Lenis) — no native jumpy scroll
- [ ] All GSAP ScrollTriggers fire at correct scroll positions

---

## CONTENT ACCURACY

- [ ] Name: HARDIK JAISWAL (correct spelling)
- [ ] Email: jshivangi86@gmail.com
- [ ] LinkedIn: linkedin.com/in/hardik-jaiswal
- [ ] GitHub: github.com/GoDxVictoryRR
- [ ] Project 1: Sentiment Liquidity Engine (Jan 2025 - Present)
- [ ] Project 2: FactAnchor (Feb 2025 - Present)
- [ ] Experience 1: Shell | Edunet Foundation (July-August 2025)
- [ ] Experience 2: Microsoft AICTE (May-June 2025)
- [ ] LeetCode: 500+, Rating 1633, Top 19%, 365-day streak
- [ ] CGPA: 8.018 / 10
- [ ] University: GGSIPU, B.Tech IIoT, 2023-2027
- [ ] All tech tags match resume data

---

## PERFORMANCE

- [ ] No console errors on load
- [ ] Three.js canvas cleans up on unmount (no memory leaks)
- [ ] GSAP contexts cleaned up on unmount
- [ ] Lenis destroyed on unmount
- [ ] requestAnimationFrame cancelled on unmount
- [ ] Fonts loaded before first paint (no FOUT)
- [ ] Page loads in under 5 seconds on average connection

---

## BROWSER COMPATIBILITY

- [ ] Chrome 120+ ✓
- [ ] Firefox 121+ ✓
- [ ] Safari 17+ ✓ (test WebGL, check Three.js shader)
- [ ] Edge 120+ ✓

---

## KNOWN ACCEPTABLE LIMITATIONS

- Mobile layout may not be perfect (desktop-first project)
- The crystal H shader is approximate — not a 1:1 match to alche.studio's custom shader
- No real project images — gradient placeholders are acceptable for MVP
- No backend/form on contact — mailto: links are sufficient

---

## HOW TO RUN

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## How to Build

```bash
npm run build
npm start
# Check for TypeScript errors and build warnings
```

## Deploy

Recommended: Vercel (zero-config Next.js deployment)
```bash
npx vercel
```
