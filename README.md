# Hardik Jaiswal — Portfolio

A premium, immersive personal portfolio website built with Next.js 14 and Three.js. This project features a high-fidelity 3D iridescent crystal centerpiece, scroll-driven animations, and a custom-engineered WebGL interface.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **3D Engine:** Three.js
- **Animations:** GSAP (GreenSock) + ScrollTrigger
- **Smooth Scrolling:** Lenis
- **Styling:** Vanilla CSS Modules (Precision Control)
- **Build Tool:** Turbopack

---

## 🏗️ Architecture & Directory Structure

The project follows a standard Next.js App Router architecture with a specialized `src/components` directory for 3D elements and UI panels.

```text
/
├── public/                 # Static assets (fonts, images)
├── src/
│   ├── app/                # Next.js App Router (Layouts & Pages)
│   ├── components/
│   │   ├── Hero/           # Three.js Crystal H & Hero UI Panels
│   │   ├── Projects/       # Interactive Project Viewport Panels
│   │   ├── Shared/         # Grid Backgrounds & UI HUD Elements
│   │   └── ...             # Section-specific components
│   ├── hooks/              # Custom React hooks (Scroll, Quaternion Math)
│   ├── lib/
│   │   ├── three/          # Three.js Scene Setup & GLSL Shaders
│   │   └── content.ts      # Centralized Site Content Data
│   └── types/              # TypeScript Type Definitions
├── next.config.js          # Next.js Configuration
├── tsconfig.json           # TypeScript Configuration
└── package.json            # Project Dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS)
- npm or yarn

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
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👤 Owner Info

**Hardik Jaiswal**  
- **Email:** jshivangi86@gmail.com  
- **LinkedIn:** [linkedin.com/in/hardik-jaiswal](https://linkedin.com/in/hardik-jaiswal)  
- **GitHub:** [github.com/GoDxVictoryRR](https://github.com/GoDxVictoryRR)  
- **Phone:** +91-7525017529
