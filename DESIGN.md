# DESIGN SYSTEM

## Color Palette

```css
:root {
  /* Backgrounds */
  --color-bg:           #080808;   /* near-black, site background */
  --color-bg-panel:     #0f0f0f;   /* slightly lighter for panels/cards */
  --color-grid:         #1a1a1a;   /* grid lines */
  --color-grid-plus:    #2a2a2a;   /* + markers on grid */

  /* Text */
  --color-text-primary:   #ffffff;  /* headings, names */
  --color-text-secondary: #888888;  /* dimmed labels, secondary copy */
  --color-text-tertiary:  #444444;  /* very dim, ghost text */
  --color-text-mono:      #aaaaaa;  /* monospace UI readouts */

  /* Accent */
  --color-accent:       #7b5ea7;   /* purple — crystal H glow, hover states */
  --color-accent-teal:  #2dd4bf;   /* teal — crystal refraction highlight */
  --color-accent-gold:  #f59e0b;   /* gold — prism light dispersion */

  /* UI Elements */
  --color-border:       rgba(255,255,255,0.08);
  --color-border-hover: rgba(255,255,255,0.2);
  --color-tag-bg:       rgba(255,255,255,0.06);
  --color-tag-border:   rgba(255,255,255,0.15);

  /* Crystal / 3D */
  --crystal-color-1:    #6d28d9;   /* deep violet */
  --crystal-color-2:    #0ea5e9;   /* sky blue */
  --crystal-color-3:    #f97316;   /* orange refraction */
  --crystal-color-4:    #10b981;   /* emerald teal */
}
```

## Typography

```css
/* Display — HARDIK / JAISWAL hero text */
font-family: 'Bebas Neue', 'Antonio', sans-serif;
/* Weight: 400 (Bebas is single weight, naturally bold) */
/* Size: clamp(120px, 18vw, 280px) */
/* Letter-spacing: -0.02em */
/* Color: #ffffff */
/* Mix-blend-mode: normal — text sits ON TOP of crystal */

/* UI Monospace — quaternion values, material labels, section indicators, tags */
font-family: 'Space Mono', 'IBM Plex Mono', monospace;
/* Weight: 400 */
/* Size: 11px for readouts, 13px for labels */
/* Color: var(--color-text-mono) */
/* Letter-spacing: 0.05em */

/* Body / Description */
font-family: 'DM Mono', 'IBM Plex Mono', monospace;
/* Weight: 400 */
/* Size: 15-16px */
/* Color: var(--color-text-secondary) */
/* Line-height: 1.7 */

/* Section Headings (Works, Experience, etc.) */
font-family: 'Bebas Neue', sans-serif;
/* Size: clamp(60px, 10vw, 140px) */
/* Color: rgba(255,255,255,0.06) — ghost text, background watermark style */

/* Project Title */
font-family: 'Bebas Neue', sans-serif;
/* Size: clamp(40px, 6vw, 90px) */
/* Color: #ffffff */

/* Nav Links */
font-family: 'Space Mono', monospace;
/* Size: 14px */
/* Weight: 400 */
/* Color: #ffffff */
/* Letter-spacing: 0.08em */
```

## Grid System

```css
/* The background grid — CSS approach */
.grid-bg {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 80px 80px;
  background-position: center center;
}

/* + markers: absolutely positioned spans scattered across sections */
/* Approximately 8-12 per section, random positions */
/* Content: '+', font-size: 14px, color: rgba(255,255,255,0.15) */

/* Diagonal grid lines — used in loader/contact */
/* SVG lines, 1px, rgba(255,255,255,0.08), diagonal at 45deg and -45deg */
```

## Spacing Scale
```css
--space-xs:   8px;
--space-sm:   16px;
--space-md:   24px;
--space-lg:   48px;
--space-xl:   80px;
--space-2xl:  120px;
--space-3xl:  200px;
```

## Border Radius
- Panels/Cards: `4px` (very slight — not rounded, almost sharp)
- Tags: `2px`
- Buttons (nav CTA): `100px` (pill)
- Everything else: `0`

## Navigation Bar
```
Height: 64px
Position: fixed, top: 0, width: 100%
Background: transparent (no blur — grid shows through)
Border-bottom: 1px solid var(--color-border)
Backdrop-filter: blur(0) — none
Padding: 0 40px
Z-index: 100

Left: Logo "▲ HARDIK" — the △ symbol + name in Space Mono, bold
Center: Links — Projects | About | Experience | Contact
Right: "Contact / Hire" pill button + audio bars icon (decorative, animated)
```

## Audio Bars Icon (top-right nav decoration)
```
Three vertical bars, different heights
Animate up/down with CSS keyframes — gives the feel of a live audio meter
Width per bar: 3px, gap: 3px
Heights: 12px, 20px, 8px cycling
Color: white
```

## Cursor
```css
/* Hide default cursor */
* { cursor: none; }

/* Custom cursor: small 8px white dot + 32px ring that follows with lag */
/* Implemented as two fixed divs updated via mousemove */
/* Ring expands/changes color on hoverable elements */
```

## Scrollbar
```css
::-webkit-scrollbar { width: 0; }  /* hidden */
```
