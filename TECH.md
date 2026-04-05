# TECH STACK & PROJECT SETUP

## Framework & Build Tool
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Build:** Turbopack (Next.js built-in)
- **Package Manager:** npm

## Core Dependencies
```json
{
  "three": "^0.165.0",
  "@types/three": "^0.165.0",
  "gsap": "^3.12.5",
  "@gsap/react": "^2.1.1",
  "lenis": "^1.1.9",
  "next": "14.2.x",
  "react": "^18",
  "react-dom": "^18",
  "typescript": "^5"
}
```

## Font Loading (next/font or @next/font)
```ts
// Use next/font/local or Google Fonts
// Display font: "Space Mono" (monospace, for UI labels, quaternion readout, tags)
// Heading font: Custom heavy sans — use "Bebas Neue" or "Antonio" for HARDIK/JAISWAL
// Body font: "DM Mono" or "IBM Plex Mono" for descriptions
import { Space_Mono, Bebas_Neue, DM_Mono } from 'next/font/google'
```

## Folder Structure
```
/
├── .agents/                    ← agent instruction files (this folder)
├── public/
│   ├── fonts/                  ← if self-hosting fonts
│   └── images/
│       ├── projects/           ← project screenshots (placeholder gradients if no real images)
│       └── experience/         ← company logos or placeholder
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← root layout, font injection, Lenis init
│   │   ├── page.tsx            ← main page, assembles all sections
│   │   └── globals.css         ← CSS variables, resets, global styles
│   ├── components/
│   │   ├── Loader/
│   │   │   ├── Loader.tsx      ← loading screen with △ ○ and grid lines
│   │   │   └── Loader.module.css
│   │   ├── Nav/
│   │   │   ├── Nav.tsx         ← top navigation bar
│   │   │   └── Nav.module.css
│   │   ├── Hero/
│   │   │   ├── Hero.tsx        ← hero section orchestrator
│   │   │   ├── CrystalH.tsx    ← Three.js canvas: rotating iridescent H prism
│   │   │   ├── QuaternionPanel.tsx  ← top-right quaternion readout
│   │   │   ├── ArcballWidget.tsx    ← top-right gimbal/arcball controller
│   │   │   ├── MaterialPanel.tsx    ← bottom-left material sliders
│   │   │   └── Hero.module.css
│   │   ├── About/
│   │   │   ├── About.tsx       ← two-column about section
│   │   │   └── About.module.css
│   │   ├── Projects/
│   │   │   ├── Projects.tsx    ← projects section orchestrator
│   │   │   ├── ProjectPanel.tsx ← individual full-viewport project panel
│   │   │   └── Projects.module.css
│   │   ├── Experience/
│   │   │   ├── Experience.tsx  ← experience section orchestrator
│   │   │   ├── ExperiencePanel.tsx ← individual experience panel
│   │   │   └── Experience.module.css
│   │   ├── Contact/
│   │   │   ├── Contact.tsx     ← contact section
│   │   │   └── Contact.module.css
│   │   └── shared/
│   │       ├── GridBackground.tsx  ← reusable dark grid background
│   │       ├── SectionIndicator.tsx ← left-edge "— SECTION" label
│   │       └── PlusMarkers.tsx     ← scattered + markers on grid
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   ├── useLenis.ts
│   │   └── useQuaternion.ts    ← quaternion math for arcball drag
│   ├── lib/
│   │   ├── three/
│   │   │   ├── crystalH.ts     ← Three.js scene setup for crystal H
│   │   │   ├── iridescent.glsl ← GLSL shader for iridescent material
│   │   │   └── arcball.ts      ← arcball rotation math
│   │   └── content.ts          ← all site content as typed constants
│   └── types/
│       └── index.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = nextConfig
```

## Key Implementation Notes

### Three.js in Next.js
- Always use dynamic import for Three.js components with `ssr: false`
- ```tsx
  const CrystalH = dynamic(() => import('@/components/Hero/CrystalH'), { ssr: false })
  ```
- The canvas must be `position: fixed` or `absolute` and sit behind text layers via z-index

### Lenis Smooth Scroll
- Init Lenis in `layout.tsx` inside a client component wrapper
- Pass lenis instance to GSAP ScrollTrigger: `ScrollTrigger.scrollerProxy`
- All scroll-triggered animations use GSAP ScrollTrigger

### GSAP ScrollTrigger Setup
```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

### CSS Modules
- Use CSS Modules for component-scoped styles
- Global variables in `globals.css`
- No Tailwind — hand-written CSS only for precision control

### Performance
- Use `useRef` for Three.js canvas, never re-render on every frame
- requestAnimationFrame loop inside Three.js component, cleaned up on unmount
- GSAP contexts for cleanup
