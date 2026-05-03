# Hardik Jaiswal — Software Engineer / AI Systems Portfolio

[![Next.js 14](https://img.shields.io/badge/Next.js-14-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-white?logo=three.js&style=flat-square)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/Animation-GSAP-green?style=flat-square)](https://greensock.com/gsap/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-id/deploy-status)](https://www.netlify.com/)
[![Netlify](https://img.shields.io/badge/Deployment-Netlify-00ADBB?logo=netlify&style=flat-square)](https://www.netlify.com/)

An Awwwards-tier, high-performance portfolio engineered with a "WebGL-first" philosophy. This project isn't just a showcase of work; it's a demonstration of production-grade frontend engineering, mathematical 3D mapping, and cinematic user interaction.

> [!NOTE]
> **Engineering Philosophy:** Build systems, not just websites. This portfolio prioritizes 60fps animation performance, clean architecture, and immersive sensory feedback.

---

## 🚀 Engineering Highlights

### 💎 Interactive WebGL Hero (Three.js)
- **Real-time Material Physics**: Features a custom-modeled "H" crystal with real-time controls for roughness, color, and noise-mapped clearcoat.
- **Arcball Logic**: Implemented manual rotation with momentum decay and auto-rotation resume.
- **Dynamic FOV Scaling**: Mathematical camera scaling ensures the 3D scene remains perfectly framed on any device, from iPhone portrait to Ultrawide monitors.

### 🎡 3D Cylinder Project Carousel
- **Mathematical Mapping**: Projects are mapped onto a virtual 3D cylinder using `rotateY` and `translateZ` calculations.
- **Scroll-Synchronized Physics**: Driven by GSAP ScrollTrigger, the carousel feels physically weighted and responds to momentum scrolling via Lenis.
- **Responsive Radius**: The cylinder's radius dynamically recalculates based on viewport width to prevent visual clipping on mobile.

### ✍️ Kinetic Typography & Layout
- **Character-Level Splitting**: Utilizes `split-type` to shatter text into individual characters for staggered "cascade" reveals.
- **Smooth Scroll Integration**: Decoupled native scroll logic from hardware via Lenis, perfectly bridged with the GSAP ticker for jitter-free 60fps animations.
- **Clip-Path Transitions**: Sections transition via cinematic clip-path "wipe" reveals, mimicking high-end portal effects seen on premium agency sites.

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router), React 18 |
| **Language** | TypeScript (Strict Mode) |
| **3D / WebGL** | Three.js, WebGL |
| **Animation** | GSAP 3, ScrollTrigger, SplitType |
| **Smoothing** | Lenis (Smooth Scroll) |
| **Styling** | Vanilla CSS Modules, Glassmorphism Aesthetics |

---

## 🏗 Architectural Decisions

1. **Performance-First Animation**: By bridging Lenis directly with the GSAP ticker, we eliminate "double RAF" jitter. This ensures that even with complex 3D scenes running, the UI remains responsive and fluid.
2. **State-Driven Content**: All content is managed in a centralized `src/lib/content.ts` layer. This allows for rapid content iteration without touching the structural components.
3. **Memory Management**: Explicitly implemented Three.js `dispose()` patterns in component cleanups to prevent GPU memory leaks during section transitions.
4. **React StrictMode Resilience**: Engineered custom cleanup logic for `split-type` and GSAP matchMedia to handle React 18's double-mount behavior in development environments.

---

## 💻 Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/GoDxVictoryRR/portfolio.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the result.

---

## 📬 Contact & Links

- **LinkedIn**: [linkedin.com/in/hardik-jaiswal](https://linkedin.com/in/hardik-jaiswal)
- **GitHub**: [github.com/GoDxVictoryRR](https://github.com/GoDxVictoryRR)
- **Email**: [jshivangi86@gmail.com](mailto:jshivangi86@gmail.com)

Designed and Developed by **Hardik Jaiswal** © 2026
