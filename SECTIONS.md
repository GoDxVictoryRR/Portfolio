# SECTIONS SPEC

Every section is described pixel-level. Build each exactly as described.

---

## 1. LOADING SCREEN

**Trigger:** Shows on initial page load. Disappears after ~2.5s with reveal animation.

**Layout:**
```
Full viewport, position: fixed, z-index: 9999
Background: #080808
```

**Elements:**
1. **Diagonal grid lines** — 8–10 thin SVG lines (`stroke: rgba(255,255,255,0.07)`, `stroke-width: 1`) crossing the screen at ~45° angles, not the square grid, actual diagonal slashes like construction scaffolding.
2. **White triangle △** — bottom-left area, roughly 160px wide, solid white `#ffffff`. CSS clip-path triangle or SVG. Position: `left: 8vw, bottom: 25vh`.
3. **Dashed circle ○** — center-left area, roughly 160px diameter, `border: 1.5px dashed rgba(255,255,255,0.4)`, no fill. Position: `left: 38vw, top: 40vh`.
4. **Small rectangle ⌐** — top-right area, just two lines forming an L-shape, `border-top: 1px solid rgba(255,255,255,0.3), border-right: 1px solid rgba(255,255,255,0.3)`, ~80px × 50px. Position: `right: 20vw, top: 40vh`.

**Reveal Animation:** See `ANIMATIONS.md` → Loading Sequence.

---

## 2. NAVIGATION BAR

**Layout:**
```
position: fixed
top: 0
width: 100%
height: 64px
z-index: 100
display: flex, align-items: center, justify-content: space-between
padding: 0 40px
border-bottom: 1px solid rgba(255,255,255,0.06)
background: transparent
```

**Left — Logo:**
```
"▲ HARDIK" 
Font: Space Mono, 14px, weight 700
Color: #ffffff
The ▲ is the same triangle symbol used in alche.studio logo
```

**Center — Links:**
```
Links: Projects | About | Experience | Contact
Font: Space Mono, 13px
Color: rgba(255,255,255,0.7)
Hover: color #ffffff, transition 0.2s
Gap: 48px between links
```

**Right:**
```
1. "Contact / Hire" pill button
   - border: 1px solid rgba(255,255,255,0.4)
   - border-radius: 100px
   - padding: 8px 20px
   - font: Space Mono, 13px
   - color: #ffffff
   - background: transparent
   - hover: background rgba(255,255,255,0.08), border-color white

2. Audio bars icon (3 animated vertical bars)
   - margin-left: 20px
   - bars animate height continuously via CSS keyframes
   - color: white, opacity 0.7
```

---

## 3. HERO SECTION

**Layout:**
```
height: 100vh
width: 100%
position: relative
overflow: hidden
background: var(--color-bg)
```

**Background:**
- Dark square grid (CSS background-image, 80px cells, rgba(255,255,255,0.03) lines)
- `+` markers: ~10 positioned absolutely, `font: Space Mono 13px`, `color: rgba(255,255,255,0.12)`, random positions avoiding center
- Background repeats watermark-style triangles in very low opacity (`opacity: 0.03`, tiled ▲ shapes)

**THREE.JS CRYSTAL H — Center of hero:**
```
Canvas: position absolute, width: 100%, height: 100%, z-index: 2
The "H" shape is constructed from THREE.js geometry:
  - Use ExtrudeGeometry from a 2D H-shape path (two rectangles + crossbar)
  - Or: Use multiple BoxGeometry pieces combined (left pillar, right pillar, crossbar)
  - Depth (Z extrusion): 60-80 units
  - Size: fills roughly 40-50% of viewport height

Material: Custom ShaderMaterial (iridescent)
  - Base: translucent dark crystal/glass look
  - Iridescent effect: normal-based color shift cycling through purple → teal → gold → purple
  - Roughness: controlled by the material panel slider (default 0.10)
  - NoiseScale: affects surface distortion (default 9.0)
  - Add subtle internal glow: purple/violet dominant, like the original
  - Use MeshPhysicalMaterial as fallback if custom shader is complex:
      roughness: 0.1, metalness: 0.9, color: 0x6d28d9,
      envMapIntensity: 1.5, iridescence: 1, iridescenceIOR: 1.5,
      transmission: 0.3, thickness: 0.5

Lights:
  - AmbientLight: 0x111111, intensity 0.5
  - DirectionalLight: 0x7b5ea7 (purple), intensity 2, position (5, 5, 5)
  - PointLight: 0x2dd4bf (teal), intensity 3, position (-5, 3, 2)
  - PointLight: 0xf59e0b (gold), intensity 2, position (3, -3, 4)
  - RectAreaLight or SpotLight for the dramatic face illumination

Rotation:
  - Auto-rotate slowly: rotationY += 0.003, rotationX += 0.001 per frame
  - Can be overridden by arcball drag
  - Mouse parallax: subtle tilt based on cursor position (±5 degrees)
```

**Name Text — HARDIK / JAISWAL:**
```
Position: center of viewport, z-index: 3 (above canvas, below UI panels)
Display: flex, flex-direction: column, align-items: center

Line 1: "HARDIK"
Line 2: "JAISWAL"
Font: Bebas Neue, clamp(100px, 16vw, 240px)
Color: #ffffff
Letter-spacing: -0.02em
Line-height: 0.9
mix-blend-mode: normal (text appears on top of crystal, partially masked by it)
Text-shadow: none — the crystal provides the glow
```

**Role Label:**
```
Below name, centered
Text: "SOFTWARE ENGINEER / AI SYSTEMS"
Font: Space Mono, 12px
Color: rgba(255,255,255,0.4)
Letter-spacing: 0.15em
margin-top: 16px
```

**QUATERNION PANEL — Top right:**
```
Position: absolute, top: 80px, right: 40px
z-index: 10

Line 1: "MainLogo Quaternion" + small pause icon ❙❙
  Font: Space Mono, 11px, color: rgba(255,255,255,0.4)
  
Line 2: Toggle button (small circle, grey) + 4 values: X Y Z W
  Values display like: "-.03  -.02  -.00  1.0"
  Font: Space Mono, 13px, color: rgba(255,255,255,0.7)
  Values update in real-time as H rotates
  
Separator: 1px line, rgba(255,255,255,0.1)
```

**ARCBALL WIDGET — Below quaternion panel:**
```
Position: absolute, top: 160px, right: 40px  (below quaternion panel)
Size: 80px × 80px sphere widget
z-index: 10

Rendered as SVG or Canvas:
  - Outer circle: stroke white 0.3 opacity
  - Three axis rings:
    - X axis ring: red (#ef4444)
    - Y axis ring: green (#22c55e)  
    - Z axis ring: blue (#3b82f6)
  - Center dot: white
  - Rings tilt/rotate as the H model rotates (they reflect current orientation)

Below widget: "Reset Quaternion" text link
  Font: Space Mono, 11px
  Color: rgba(255,255,255,0.4)
  Hover: white
  Click: resets H rotation to identity quaternion
```

**MATERIAL PANEL — Bottom left:**
```
Position: absolute, bottom: 80px, left: 40px
z-index: 10
width: 220px

Header: "MainLogo Material" + small ❙❙ icon
  Font: Space Mono, 11px, color: rgba(255,255,255,0.3)

Row 1: roughness
  Label: "roughness" (Space Mono 11px, white 0.5 opacity)
  Value: "0.10" right-aligned
  Slider: custom styled range input, track rgba(255,255,255,0.2), thumb white
  Width: 120px, between label and value

Row 2: noiseScale  
  Label: "noiseScale"
  Value: "9.0"
  Slider: same style, longer fill (default 9/20 = 45%)

Row 3: color
  Label: "color"
  Value: "{r: 255, g: 255, b: 255}" — updates as color changes
  Color swatch: 16×16px white square, click opens browser color picker

All slider changes affect the Three.js material in real-time via refs.
```

---

## 4. ABOUT SECTION

**Layout:**
```
height: 100vh (or min-height: 100vh)
width: 100%
display: grid
grid-template-columns: 1fr 1fr
background: var(--color-bg)
Same dark grid background as hero
padding: 120px 80px 80px 80px
position: relative
```

**Left column — Bio:**
```
Align: top, padding-right: 60px

Section indicator (left edge): "— ABOUT"
  Position: absolute, left: 40px, top: 50%
  Font: Space Mono, 11px
  Color: rgba(255,255,255,0.3)
  Writing-mode: vertical-rl, transform: rotate(180deg)

Small label above bio: "ABOUT"  
  Font: Space Mono, 11px
  Color: rgba(255,255,255,0.3)
  Letter-spacing: 0.2em
  margin-bottom: 32px

Bio text (from CONTENT.md about.bio):
  Font: DM Mono, 16px
  Color: rgba(255,255,255,0.6)
  Line-height: 1.9
  max-width: 480px

Stats row below bio:
  Four small stat blocks in a row:
  [ 500+ LeetCode ] [ 8.0 CGPA ] [ Top 19% ] [ 365 Day Streak ]
  Each: value (Bebas Neue 32px white) + label (Space Mono 10px grey)
  Separated by thin 1px vertical dividers
  margin-top: 48px
```

**Right column — Skills:**
```
Align: top, padding-left: 60px
border-left: 1px solid rgba(255,255,255,0.06)

Small label: "SKILLS"
  Same style as ABOUT label

For each skill group (Languages, Frameworks, Cloud & Tools, Concepts):
  Group label: Space Mono, 11px, rgba(255,255,255,0.3), letter-spacing 0.15em
  margin-bottom: 12px, margin-top: 28px
  
  Tags: displayed as inline-flex chips
    padding: 5px 12px
    border: 1px solid rgba(255,255,255,0.12)
    border-radius: 2px
    font: Space Mono, 11px
    color: rgba(255,255,255,0.6)
    background: rgba(255,255,255,0.03)
    gap: 8px, flex-wrap: wrap
    hover: border-color rgba(255,255,255,0.3), color white
    transition: 0.2s
```

---

## 5. PROJECTS SECTION

**Layout:**
```
Each project = 1 full viewport section (height: 100vh)
position: relative
background: var(--color-bg)  
Same dark grid
overflow: hidden
```

**Background:**
- Ghost text watermark: "PROJECTS" in massive Bebas Neue (color: rgba(255,255,255,0.04)) centered behind content
- Section indicator: `— PROJECTS` on left edge (vertical text)

**Per Project — Content layout:**
```
display: flex
align-items: center
padding: 0 80px
gap: 60px
```

**Left — Project Image Panel (~55% width):**
```
Large panel with:
  - Perspective transform: slight 3D tilt (CSS perspective + rotateY 3-5deg)
  - Background: project's imageGradient (from content)
  - border: 1px solid rgba(255,255,255,0.08)
  - Border-radius: 4px
  - height: 60vh
  - Subtle inner content: project title rendered large inside at low opacity
  - On hover: panel lifts (translateY: -8px), border brightens
  
The panel should feel like the curved/angled panels from alche.studio — 
use CSS transform: perspective(1000px) rotateY(-3deg) rotateX(2deg)
```

**Right — Project Details (~45% width):**
```
Top label: date "2025 01" + separator + category tag
  Font: Space Mono, 12px, color: rgba(255,255,255,0.4)
  
Title: project name (from content.title)
  Font: Bebas Neue, clamp(48px, 6vw, 80px)
  Color: #ffffff
  Line-height: 0.95
  margin: 12px 0 8px

Subtitle: smaller title
  Font: Space Mono, 13px
  Color: rgba(255,255,255,0.4)
  margin-bottom: 24px

Description:
  Font: DM Mono, 14px
  Color: rgba(255,255,255,0.5)
  Line-height: 1.8
  max-width: 420px
  margin-bottom: 32px

Metrics row: 3 metrics side by side
  Each: value (Bebas Neue 28px white) + label (Space Mono 10px grey)
  Separated by thin dividers
  margin-bottom: 32px

Tags: same chip style as About skills
  Use tag values from content (underscored, monospace style)

Bottom row:
  Left: "View on GitHub ↗" link
    Font: Space Mono, 13px
    Color: rgba(255,255,255,0.5)
    Hover: white, underline
  Right: "More Projects ↗" (only on last project)
    Font: Space Mono, 13px
    Color: rgba(255,255,255,0.4)
```

---

## 6. EXPERIENCE SECTION

**Layout:** Same as projects — each internship = 1 full viewport section.

**Background:** Ghost text "EXPERIENCE" watermark. Section indicator `— EXPERIENCE`.

**Left — Experience Card Panel (~55% width):**
```
Panel similar to project panel (same 3D tilt treatment):
  - Background: experience's imageGradient
  - Inside the panel:
      - Company name large (Bebas Neue, 80px, opacity 0.15) as watermark
      - Role title (Bebas Neue, 32px, white)
      - Date range (Space Mono, 12px, grey)
      - 3 bullet points (DM Mono, 13px, grey, line-height 1.7)
      - Tags at bottom (same chip style)
  - height: 60vh
  - Same hover lift effect
```

**Right — Experience Details (~45% width):**
```
Top-right style label (like "CREATED IN FORTNITE" in alche.studio):
  Company label from content (e.g., "SKILLS4FUTURE" or "MICROSOFT AICTE INTERNSHIP")
  Font: Bebas Neue, 28-36px
  Color: rgba(255,255,255,0.9)
  Letter-spacing: 0.05em
  
Role title (large):
  Font: Bebas Neue, clamp(48px, 6vw, 80px)
  Color: #ffffff
  
Date range:
  Font: Space Mono, 12px
  Color: rgba(255,255,255,0.4)
  margin-bottom: 24px

Description paragraph:
  Font: DM Mono, 14px
  Color: rgba(255,255,255,0.5)
  Line-height: 1.8

Secondary details (smaller, dimmer — like alche's secondary Japanese text):
  The 3 bullet points from content.details
  Font: DM Mono, 12px
  Color: rgba(255,255,255,0.25)
  margin-top: 24px
  Line-height: 1.7

Tags row at bottom:
  Same chip style
```

---

## 7. CONTACT SECTION

**Layout:**
```
height: 100vh
width: 100%
position: relative
background: #080808
display: flex
flex-direction: column
align-items: center
justify-content: center
overflow: hidden
```

**Background:**
- Diagonal grid lines (same as loader — SVG lines at ~45°)
- The `△` triangle (bottom-left, same position as loader, but slightly transparent)
- The `○` dashed circle (center area, same as loader)
- The `⌐` L-bracket (top-right area)
- These are the same geometric shapes as the loading screen — this creates a visual echo/bookend

**Content:**
```
"GET IN" on line 1
"TOUCH" on line 2
Font: Bebas Neue, clamp(80px, 14vw, 200px)
Color: #ffffff
Letter-spacing: -0.02em
Line-height: 0.85
text-align: center
margin-bottom: 48px

Subheading:
"Open to full-time roles, internships, and interesting projects."
Font: DM Mono, 15px
Color: rgba(255,255,255,0.35)
margin-bottom: 64px

Links (stacked or inline):
  jshivangi86@gmail.com
  LinkedIn ↗
  GitHub ↗
  
  Font: Space Mono, 18px
  Color: rgba(255,255,255,0.6)
  Hover: color white
  Each on its own line or separated by  |
  display: flex, gap: 48px
  margin-bottom: 80px

Footer:
"HARDIK JAISWAL © 2026"
  Position: absolute, bottom: 32px
  Font: Space Mono, 11px
  Color: rgba(255,255,255,0.2)
  letter-spacing: 0.15em
  width: 100%, text-align: center
```

---

## PERSISTENT ELEMENTS (across all sections)

**Crystal H in background:**
After hero, the crystal H doesn't disappear. It shrinks and moves to a corner — `position: fixed`, smaller size, `opacity: 0.15-0.25`, continues rotating. This is a subtle ambient presence throughout the site.

**Custom cursor:**
- Tiny dot (8px): follows mouse exactly
- Ring (32px): follows mouse with ~100ms lag
- Both `position: fixed`, `pointer-events: none`, `z-index: 9999`
- On hover over links/buttons: ring expands to 48px, changes to purple tint

**Section progress indicator:**
- Right edge of viewport, vertical thin line
- Small label showing current section name
- Font: Space Mono, 10px, vertical text
