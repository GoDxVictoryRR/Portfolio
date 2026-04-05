# ANIMATIONS

All animations use GSAP unless noted. Easing defaults: `power3.out` for enters, `power2.inOut` for transitions.

---

## 1. LOADING SEQUENCE (0ms → 2800ms)

```
Phase 1 (0ms → 0ms): Loading screen instantly visible. Black. Nothing.

Phase 2 (100ms → 600ms): Geometric shapes fade in
  - Triangle △: opacity 0 → 1, duration 0.5s, ease power2.out
  - Circle ○: opacity 0 → 1, duration 0.5s, delay 0.15s, ease power2.out
  - L-bracket ⌐: opacity 0 → 1, duration 0.5s, delay 0.25s, ease power2.out

Phase 3 (600ms → 1200ms): Diagonal grid lines draw in
  - Each line: stroke-dasharray/stroke-dashoffset animation, staggered 0.05s apart
  - Direction: lines draw from center outward

Phase 4 (1800ms → 2800ms): Site reveal
  - Loading screen: clips upward (clipPath: inset(0 0 100% 0)) over 0.8s, ease power3.inOut
  - OR: Loading screen opacity → 0 then display none, duration 0.6s
  - PREFERRED: Two-part wipe — top half slides up, bottom half slides down simultaneously
    gsap.to('.loader-top', { y: '-100%', duration: 0.7, ease: 'power3.inOut' })
    gsap.to('.loader-bottom', { y: '100%', duration: 0.7, ease: 'power3.inOut' })
  - Beneath: hero section is already rendered, fades in from opacity 0 → 1 over 0.5s
  
Phase 5 (2800ms → 3400ms): Hero elements stagger in
  - Nav: opacity 0 → 1, y: -20 → 0, duration 0.5s
  - Crystal H: scale 0.8 → 1, opacity 0 → 1, duration 0.8s
  - HARDIK/JAISWAL: each letter or line animates in — y: 60 → 0, opacity 0 → 1, stagger 0.08s
  - UI panels (quaternion, material): opacity 0 → 1, x offset → 0, delay after crystal
```

---

## 2. CRYSTAL H — CONTINUOUS ANIMATIONS

```
Auto-rotation (Three.js rAF loop):
  mesh.rotation.y += 0.003  // slow continuous Y rotation
  mesh.rotation.x += 0.0008 // very slow X wobble

Mouse parallax (mousemove listener):
  targetRotX = (mouseY / windowHeight - 0.5) * 0.3  // ±0.15 radians
  targetRotY = (mouseX / windowWidth - 0.5) * 0.3
  // Lerp current rotation toward target:
  currentRotX += (targetRotX - currentRotX) * 0.05
  currentRotY += (targetRotY - currentRotY) * 0.05

Arcball drag override:
  When user mousedowns on canvas, disable auto-rotate
  Track drag delta, apply to quaternion
  On mouseup, resume slow auto-rotate from current quaternion

Quaternion panel updates:
  Every frame: read mesh.quaternion.x/y/z/w
  Update DOM elements with formatted values (2 decimal places, ±sign)
  Use requestAnimationFrame for smooth updates
  
Iridescent material animation:
  In shader or via uniform:
  uTime += 0.01 per frame
  Color cycles through hue as function of normal + time + uNoiseScale
```

---

## 3. HERO TEXT ENTRANCE (triggered after loader exits)

```
gsap.timeline({ delay: 2.8 })
  .from('.hero-name-line-1', {
    y: 80,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  .from('.hero-name-line-2', {
    y: 80,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5')
  .from('.hero-role', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.3')
  .from('.quaternion-panel', {
    x: 40,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.4')
  .from('.material-panel', {
    x: -40,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.5')
```

---

## 4. SCROLL-TRIGGERED SECTION ANIMATIONS

**Setup (run once on mount):**
```ts
// Lenis → GSAP ScrollTrigger bridge
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

**Hero → About transition:**
```
ScrollTrigger: trigger: '#about', start: 'top 80%'
  - About left column: x: -60 → 0, opacity: 0 → 1, duration: 0.8s
  - About right column: x: 60 → 0, opacity: 0 → 1, duration: 0.8s, delay: 0.1s
  - Section indicator: opacity: 0 → 1, y: 20 → 0
  - Skill tags stagger in: each tag opacity: 0 → 1, y: 15 → 0, stagger: 0.03s
```

**About → Projects (Crystal H shrinks to corner):**
```
ScrollTrigger: trigger: '#projects', start: 'top 60%', scrub: true
  - Crystal H canvas: scale 1 → 0.3, x: 0 → corner position, opacity: 1 → 0.2
  - This is a scrub animation (tied to scroll position, not one-shot)
```

**Project cards entrance:**
```
For each project section:
ScrollTrigger: trigger: '.project-[id]', start: 'top 70%'
  - Image panel: x: -80 → 0, opacity: 0 → 1, rotateY: -15 → -3 (its resting tilt), duration: 0.9s
  - Details: x: 60 → 0, opacity: 0 → 1, duration: 0.8s, delay: 0.15s
  - Metrics: stagger in after details, each: y: 20 → 0, opacity: 0 → 1, stagger: 0.1s
  - Tags: stagger: y: 10 → 0, opacity: 0 → 1, stagger: 0.04s
```

**Experience cards entrance:** (same treatment as projects)
```
ScrollTrigger: trigger: '.experience-[id]', start: 'top 70%'
Same animation pattern as projects.
```

**Ghost watermark text parallax:**
```
For each section's ghost text (PROJECTS, EXPERIENCE):
ScrollTrigger: scrub: true
  gsap.fromTo('.ghost-text', 
    { y: '10%' }, 
    { y: '-10%', scrollTrigger: { scrub: 1 } }
  )
```

**Contact section entrance:**
```
ScrollTrigger: trigger: '#contact', start: 'top 60%'
  - Geometric shapes: fade in one by one, same as loader sequence (0.15s stagger)
  - GET IN TOUCH: each word: y: 100 → 0, opacity: 0 → 1, stagger: 0.1s
  - Links: opacity: 0 → 1, y: 20 → 0, stagger: 0.08s, delay: 0.4s
```

---

## 5. HOVER ANIMATIONS

**Nav links:**
```
Hover: color transition 0.2s, add underline that slides in from left
  ::after pseudo element: width 0 → 100%, transition 0.25s ease
```

**Project/Experience panels:**
```
Hover: 
  transform: translateY(-8px) perspective(1000px) rotateY(-2deg) rotateX(1deg)
  border-color: rgba(255,255,255,0.2)
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(123,94,167,0.1)
  transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

**Tags:**
```
Hover:
  border-color: rgba(255,255,255,0.3)
  color: rgba(255,255,255,0.9)
  transition: 0.2s
```

**Contact links:**
```
Hover:
  color: #ffffff
  Each link: add arrow that moves right → 
  transition: 0.2s
```

**"Contact / Hire" button:**
```
Hover:
  background: rgba(255,255,255,0.08)
  border-color: rgba(255,255,255,0.8)
  transition: 0.25s
```

---

## 6. CUSTOM CURSOR

```ts
// Two elements: .cursor-dot (8px) and .cursor-ring (32px)
// Both: position fixed, border-radius 50%, pointer-events none, z-index 9999

let mouseX = 0, mouseY = 0
let ringX = 0, ringY = 0

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

// rAF loop:
function animateCursor() {
  // Dot: instant follow
  dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
  
  // Ring: lerp follow (lag effect)
  ringX += (mouseX - ringX) * 0.12
  ringY += (mouseY - ringY) * 0.12
  ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`
  
  requestAnimationFrame(animateCursor)
}

// On hoverable elements:
document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '48px'
    ring.style.height = '48px'
    ring.style.borderColor = 'rgba(123,94,167,0.8)'  // purple
    ring.style.marginLeft = '-24px'
    ring.style.marginTop = '-24px'
  })
  el.addEventListener('mouseleave', () => {
    ring.style.width = '32px'
    ring.style.height = '32px'
    ring.style.borderColor = 'rgba(255,255,255,0.4)'
    ring.style.marginLeft = '-16px'
    ring.style.marginTop = '-16px'
  })
})
```

---

## 7. AUDIO BARS (Nav decoration)

```css
.audio-bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 20px;
}
.audio-bars span {
  width: 3px;
  background: rgba(255,255,255,0.6);
  border-radius: 1px;
  animation: audioBar 1.2s ease-in-out infinite alternate;
}
.audio-bars span:nth-child(1) { height: 10px; animation-delay: 0s; }
.audio-bars span:nth-child(2) { height: 18px; animation-delay: 0.2s; }
.audio-bars span:nth-child(3) { height: 6px;  animation-delay: 0.4s; }

@keyframes audioBar {
  from { transform: scaleY(1); }
  to   { transform: scaleY(0.3); }
}
```

---

## 8. ACHIEVEMENTS MARQUEE (if included between sections)

```css
.marquee-track {
  display: flex;
  animation: marquee 30s linear infinite;
  white-space: nowrap;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
/* Duplicate content for seamless loop */
/* Items: Space Mono 12px, separated by " · " or "  ◆  " */
/* Color: rgba(255,255,255,0.25) */
/* Hover on marquee container: animation-play-state: paused */
```
