# GOAL & BUILD ORDER

## What We Are Building
A premium personal portfolio website for Hardik Jaiswal. The visual language, interactions, and technical implementation are directly inspired by [alche.studio](https://alche.studio). This is NOT a copy — it is a personal portfolio adapted in the same aesthetic with Hardik's own content.

## Primary Goal
Build a site that:
1. Looks like it belongs on Awwwards
2. Has a rotating iridescent 3D crystal "H" as the centerpiece (Three.js)
3. Has interactive material controls (roughness, noiseScale, color) that affect the crystal in real-time
4. Has a quaternion readout panel and arcball gimbal widget
5. Showcases Hardik's 2 projects, 2 internships, and skills
6. Has a loading screen with geometric shapes that echoes in the contact section
7. Feels immersive and premium — NOT generic

## Reference Site
https://alche.studio — study the layout, typography system, UI overlay elements (quaternion panel, material sliders, arcball widget), the dark grid aesthetic, the project panel display, and the overall tone.

## Secondary Goals
- Smooth scroll (Lenis)
- Scroll-triggered animations (GSAP ScrollTrigger)
- Custom cursor
- All content from CONTENT.md
- Passes all checks in TESTING.md

---

## Build Order (Do This In Sequence)

### Phase 1: Foundation
1. `npx create-next-app@latest hardik-portfolio --typescript --app --no-tailwind`
2. Install dependencies (see TECH.md)
3. Set up `globals.css` with CSS variables from DESIGN.md
4. Set up fonts (Bebas Neue, Space Mono, DM Mono via next/font/google)
5. Create `src/lib/content.ts` with all data from CONTENT.md
6. Create `GridBackground.tsx` component (reusable across all sections)
7. Create `PlusMarkers.tsx` (scattered + signs)
8. Set up Lenis in layout.tsx
9. Register GSAP ScrollTrigger

### Phase 2: Loading Screen
1. Build `Loader.tsx` with diagonal lines, △, ○, ⌐ shapes
2. Implement loading sequence animation (see ANIMATIONS.md → Loading Sequence)
3. Test: loader shows, waits, then wipes away

### Phase 3: Navigation
1. Build `Nav.tsx` — fixed, transparent, logo + links + CTA + audio bars
2. Implement audio bars CSS animation
3. Test: nav visible over all sections

### Phase 4: Hero + Crystal H (MOST COMPLEX — allocate most time here)
1. Build `CrystalH.tsx`:
   - Three.js scene, renderer, camera, lights
   - H geometry via ExtrudeGeometry
   - Iridescent ShaderMaterial (see THREEJS.md)
   - Auto-rotation loop
   - Mouse parallax
   - Drag to rotate
   - Expose quaternion values via callback
   - Expose material update functions via ref/callback
2. Build `QuaternionPanel.tsx` — receives quaternion values, displays them
3. Build `ArcballWidget.tsx` — SVG gimbal that reflects current rotation
4. Build `MaterialPanel.tsx` — roughness/noiseScale/color sliders, calls update functions
5. Build `Hero.tsx` — assembles all the above with name text
6. Test: crystal renders, rotates, responds to mouse, sliders work, quaternion updates

### Phase 5: About Section
1. Build `About.tsx` — two columns, bio + skills tags
2. Add scroll-triggered entrance animation
3. Test: section enters correctly on scroll

### Phase 6: Projects Section
1. Build `ProjectPanel.tsx` — perspective-tilted panel, details right
2. Build `Projects.tsx` — loops through projects from content
3. Add scroll-triggered entrance per panel
4. Test: both projects scroll in correctly

### Phase 7: Experience Section
1. Build `ExperiencePanel.tsx` — same layout as project panel adapted for internship data
2. Build `Experience.tsx` — loops through experiences from content
3. Add scroll-triggered entrance
4. Test: both experiences scroll in correctly

### Phase 8: Contact Section
1. Build `Contact.tsx` — diagonal grid, geometric shapes, big links
2. Add scroll-triggered entrance
3. Test: shapes appear, links work

### Phase 9: Custom Cursor
1. Build cursor dot + ring in layout.tsx or a `Cursor.tsx` client component
2. Add hover expand/color effects for all interactive elements
3. Test: cursor works on all elements

### Phase 10: Crystal H Ambient Mode
1. After scroll past hero, crystal shrinks and repositions to corner
2. Implement via ScrollTrigger scrub
3. Test: transition is smooth

### Phase 11: Polish & QA
1. Run through every item in TESTING.md
2. Fix any console errors
3. Check all content against CONTENT.md for accuracy
4. Performance check: no memory leaks
5. Build: `npm run build` — must compile cleanly

---

## File Read Order for Agent
Start by reading files in this order to understand the full project before writing any code:
1. README.md (this project overview)
2. CONTENT.md (all data — read this first so you know what content you're displaying)
3. DESIGN.md (visual system — know this before writing any CSS)
4. TECH.md (stack and folder structure — set this up first)
5. SECTIONS.md (each section in detail — your primary build guide)
6. ANIMATIONS.md (all animations — implement after structure is in place)
7. THREEJS.md (Three.js implementation — use when building CrystalH.tsx)
8. TESTING.md (QA — run through this at the end)

## Important Rules for the Agent
- NEVER use Tailwind CSS — hand-written CSS only
- NEVER use generic fonts (Inter, Roboto, Arial)
- NEVER use template-style layouts
- Three.js components MUST use `dynamic(() => import(...), { ssr: false })`
- All content MUST match CONTENT.md exactly (names, dates, links)
- Do not invent or fabricate content — use only what's in CONTENT.md
- The crystal must be 3D — not a flat SVG or CSS shape
- Iridescent shader is required — plain colored material is not acceptable
- The site must pass ALL items in TESTING.md before considering it done
