# VISUALS — Reference Frames & Site Analysis

## CRITICAL: Visit the Live Site First

**Before writing a single line of code, visit the live reference site and study it:**

```
https://alche.studio
```

Open it in a browser and do the following:
1. Watch the full loading sequence — note how shapes appear, how the site reveals
2. Observe the hero: the crystal rotation speed, iridescence color shifts, how the quaternion numbers update
3. Drag the crystal with your mouse — feel the interaction
4. Move the material sliders — watch how roughness and noiseScale change the crystal surface
5. Drag the arcball gimbal widget — see how it controls the crystal
6. Scroll slowly through the entire site — note every transition
7. Hover over nav links, project panels, tags — observe all hover states
8. Right-click → Inspect → look at the CSS and Three.js setup for reference
9. Note the exact font sizes, spacing, and opacity values you see

This is your ground truth. The frames below supplement it but the live site is the primary reference.

---

## Reference Frames

All frames are extracted from a screen recording of alche.studio. Use them alongside the live site.

---

### Frame 01 — `visuals/01_hero_purple_crystal.jpg`
**Section:** Hero  
**What to study:**
- The crystal prism is a **triangular shape** (the alche △ logo), centered in viewport
- Crystal material: dominant **deep violet/purple** with white hot-spots on edges
- The crystal appears to have an **internal black void** — the material is partially opaque
- Behind/around the crystal: the word "ALCHE" in massive white Bebas Neue, full width
- The letter spacing on "ALCHE" is very tight — letters almost touching
- **Top-right panel:** "MainLogo Quaternion ❙❙" label, grey toggle circle, then `-.03  -.02  -.00  1.0` in white monospace
- **Top-right below:** Arcball widget — outer grey ring, three colored axis rings (Y=green top, Z=blue, X=red right), white center dot
- **Bottom-left panel:** "MainLogo Material ❙❙" header, then three rows: `roughness — 0.10`, `noiseScale ——— 9.0`, `color [■] {r: 255, g: 255, b:`
- Slider tracks: very subtle white lines, short dashes for the roughness (low value), longer for noiseScale
- **Background:** Dark square grid (#080808 base), `+` markers scattered, faint repeating triangle watermarks
- **News panel right:** `NEWS` label, then 3 dated items — THIS IS WHERE YOUR ABOUT/SKILLS PANEL GOES

---

### Frame 02 — `visuals/02_hero_crystal_closeup.jpg`
**Section:** Hero — slightly later rotation  
**What to study:**
- Crystal has rotated slightly — now showing more of a **white glowing face**
- The iridescence: white glow at the tip, purple body, dark absorption in mid-section
- Notice the **prismatic light streak** — a thin rainbow line (blue→yellow) cutting diagonally through the crystal face. This is the key iridescent detail — a light dispersion streak, not just color tinting.
- The "ALCHE" text behind: the crystal overlaps the "L" — text goes BEHIND the crystal geometry
- Quaternion values have changed slightly: `-.03  -.02  -.00  1.0` (W is still near 1 — small rotation so far)
- Bottom-left sliders: same values, roughness dash is at left (0.10 = very smooth)

---

### Frame 03 — `visuals/03_hero_teal_shift.jpg`
**Section:** Hero — crystal rotated further  
**What to study:**
- Crystal material has shifted to **teal/cyan** dominant — this is the iridescence cycling
- The shift is dramatic — not subtle. The entire crystal face changes color based on viewing angle
- Background teal bleed: the crystal light spills onto the dark background as a colored glow
- Top-right corner teal/green haze behind the arcball widget — environmental color bleeding
- Notice the crystal is slightly larger in frame — it fills more vertical height
- The "ALCHE" text is still fully visible, white, behind the crystal

---

### Frame 04 — `visuals/04_hero_green_refraction.jpg`
**Section:** Hero — further rotation, green phase  
**What to study:**
- Crystal now showing **green/olive** tones — the iridescence has cycled past teal to green
- The crystal shape: you can clearly see it's a **3D triangular prism** — the side face is now visible, showing the depth
- The side face has a **diagonal/geometric faceted quality** — not smooth, but has angular facets catching light differently
- Background has shifted to a dark olive/green wash — the crystal's light bleeds to fill the full background
- Quaternion panel: `-.00  .01  -.00  1.0` — X and Y near zero, small rotation
- Note: the background color wash is NOT a CSS background-color change — it is the Three.js scene light colors reacting to the crystal material

---

### Frame 05 — `visuals/05_hero_gold_shift.jpg`
**Section:** Hero — gold/amber phase  
**What to study:**
- Crystal has shifted to **amber/gold** — warm tones, very different from the cool purple/teal phases
- The prismatic streak is now orange→gold
- This confirms the full iridescence cycle: purple → teal → green → gold → back to purple
- The background warm glow is prominent
- Crystal appears to be at roughly 45° rotation from original position

---

### Frame 06 — `visuals/06_hero_bw_crystal.jpg`
**Section:** Hero — near-white/silver phase  
**What to study:**
- Crystal at a viewing angle where it appears **near-silver/white** — this happens when the face is pointing almost directly toward camera
- The inside of the prism shows the **grid-like internal reflection** — you can see the grid pattern of the background being reflected/refracted through the crystal
- This internal grid refraction is a key visual — the crystal is somewhat transparent and refracts the scene
- The "ALCHE" text is still bright white, unchanged regardless of crystal color
- Background appears darker/more neutral here — less color bleed at this angle

---

### Frame 07 — `visuals/07_scroll_transition_crystal_shrinks.jpg`
**Section:** Transition — user has started scrolling, entering Works section  
**What to study:**
- The crystal is now **centered and larger** — filling more of the viewport vertically
- The surrounding UI text ("ALCHE") has faded/scrolled away
- Left edge: `— TOP` section indicator appears — this is the first appearance of the left-edge vertical text label
- The crystal environment is now showing the **project backdrop imagery** bleeding in behind it — you can see dark diagonal shapes/shadows
- Quaternion panel still visible top-right, values changing
- This frame shows the crystal persisting BETWEEN sections — it's a `position: fixed` element that stays throughout

---

### Frame 08 — `visuals/08_works_ghost_text.jpg`
**Section:** Works section — ghost text visible  
**What to study:**
- The massive ghost text "WORKS" fills the **entire viewport width** as a watermark
- Ghost text color: approximately `rgba(255,255,255,0.06)` — barely visible, just a slight contrast against background
- Font: same Bebas Neue, enormous — likely `font-size: 30vw` or larger
- The crystal is still centered, now smaller relative to the ghost text
- Background: the project backdrop is beginning to show — 3D cube/tile environment
- Left edge: `— TOP` indicator still showing
- The crystal now shows **multiple facets** — it's been rotating significantly

---

### Frame 09 — `visuals/09_works_ghost_text_crystal.jpg`
**Section:** Works — deeper into scroll  
**What to study:**
- Ghost "WORKS" text now fully prominent behind crystal
- Crystal continues rotating — now at a complex quaternion angle
- The 3D environment background (cube tiles/room) is now clearly visible
- The background environment feels like a **3D cube room** — dark tiles with grid lines, giving depth
- This 3D room IS the background of the Works section — it's not flat
- Left edge: `— TOP` with vertical line above it indicating scroll position

---

### Frame 10 — `visuals/10_project_card_full.jpg`
**Section:** Works — first project card visible  
**What to study:**
- Crystal has moved to the **left/center** and is now smaller — making room for project info
- The project card is a **tall curved panel** — the image is displayed on a slightly curved/angled surface in 3D space
- Panel curvature: the panel bends slightly away at the edges — a gentle curve, not flat
- Panel takes up roughly **60% of viewport width**, centered-left
- Below the panel: `2026 01.17` date (monospace, small, grey), then project title in large white Bebas Neue
- Subtitle below title (smaller, same font)
- Tags below subtitle: monospace chips with border, `In-Game-Concert`, `fortnite`, `metaverse`
- Bottom-right: `More Works ↗` in small monospace
- Left edge: `— WORKS` section indicator (replaced `— TOP`)
- Vertical scroll indicator on left: small dots/lines showing position within Works section

---

### Frame 11 — `visuals/11_project_card_detail.jpg`
**Section:** Works — project card fully in view  
**What to study:**
- This is the **fully loaded state** of a project card — clearest example
- The curved panel takes up center-left, image fills it completely
- The panel has a **thin white border** — `1px solid rgba(255,255,255,0.15)` approximately
- Panel border-radius: very slight, maybe 4-6px
- The image inside shows a video game/entertainment screenshot — colorful, fills the panel
- Date format: `2026 01.17` — year first, then month.day — all in Space Mono, `rgba(255,255,255,0.5)`
- Title: `KizunaAI "Hello, Fortnite"` — Bebas Neue, ~60px, white
- Subtitle: same text repeated smaller — acts as the project category/client name
- Tags: same style as the chips in the About section
- Bottom-right `More Works ↗` — Space Mono, ~13px, `rgba(255,255,255,0.4)`
- **Right side of screen**: partially visible NEXT project panel — curved, peeking in from right edge
- This shows the carousel-like behavior — adjacent cards are partially visible

---

### Frame 12 — `visuals/12_project_card_carousel.jpg`
**Section:** Works — between two project cards  
**What to study:**
- **Center panel** (active): the WEAR GO LAND project image — large curved panel
- **Left panel** (previous): partially visible, rotated/angled away, about 15% visible on left edge
- **Right panel** (next): partially visible, about 10% visible on right edge
- All three panels have the same curve treatment — they exist in 3D space
- The inactive panels are slightly smaller/darker — depth effect
- This carousel is navigated by **vertical scroll**, not horizontal swipe
- Bottom-left info updates for the center/active panel
- The crystal is now a **small ambient element** in the center/top — still rotating, still iridescent, but small

---

## Key Details to Implement (extracted from all frames)

### Crystal Material Specifics
1. The crystal has a **white hot-spot** at the tip/peak — ambient occlusion inverse (brightest at extremity)
2. There is always a **thin prismatic streak** (rainbow line) cutting across one face — this is a specular highlight rendered through a prism shader
3. The crystal absorbs light at internal angles — creating dark voids inside
4. Color cycling order: purple → white → teal → green → gold → amber → purple
5. The background bleeds the crystal's light color — this is achieved via Three.js scene background color lerping to match the dominant crystal color each frame

### UI Panel Details
1. The quaternion panel uses a **monospace fixed-width font** — all numbers align in columns
2. Values show sign: `.00` not `0.00`, `-.03` not `-0.030` — truncated to 2 decimal places
3. The toggle circle (grey ●) next to "MainLogo Quaternion" appears to pause the rotation
4. The `❙❙` icon next to panel titles is a pause/play indicator
5. Material slider tracks: `roughness` shows a short dash `—` (low value, near left), `noiseScale` shows a longer fill `———` 

### Project Card Details
1. The curved panels are **not CSS transforms** — they appear to be actual Three.js planes with curve displacement
2. Each panel has **slight vignette** at edges — darker border fading into the panel image
3. The info block (date, title, tags) is **below the panel**, not inside it
4. `More Works ↗` is bottom-right, aligned to the panel's right edge
5. The left section indicator changes per section: `— TOP` on hero, `— WORKS` on projects

### Typography Observations
1. Title text ("ALCHE") has letters that are **slightly different widths** — it's a display font, not condensed
2. The monospace readout values use **tabular figures** — numbers are all the same width for alignment
3. Nav links have very slight letter-spacing — not condensed, comfortable reading size
4. Tags/chips use **underscore_separated** format for multi-word tags (e.g., `unreal_engine`)

---

## What the Reference Site Does That This Portfolio Adapts

| alche.studio | hardik-jaiswal portfolio |
|---|---|
| △ crystal (triangle) | H crystal (letter H shape) |
| "ALCHE" massive text | "HARDIK / JAISWAL" two lines |
| News section (right) | Skills section (right) |
| MainLogo Material label | Same — "MainLogo Material" |
| Works section with project panels | Projects section with project panels |
| Project cards (horizontal carousel) | Project cards (vertical scroll) |
| Experience-style vision section | Experience section (internships) |
| Contact / Recruit CTA | Contact / Hire CTA |
| Geometric loader (△ ○) | Same loader, echoed in contact section |
