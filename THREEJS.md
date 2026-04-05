# THREE.JS IMPLEMENTATION

Detailed guide for the Crystal H and all Three.js work.

---

## CrystalH.tsx — Full Implementation Guide

```tsx
'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface CrystalHProps {
  roughness: number       // from material panel slider
  noiseScale: number      // from material panel slider
  color: string           // from color picker
  onQuaternionUpdate: (q: {x:number,y:number,z:number,w:number}) => void
  externalQuaternion?: THREE.Quaternion  // set by arcball drag
}
```

### Step 1: Create the H Geometry

```ts
function createHGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  
  // H shape using path:
  // Left pillar
  const lw = 0.8   // left pillar width
  const rw = 0.8   // right pillar width
  const cw = 1.2   // crossbar width (horizontal gap between pillars)  
  const ch = 0.6   // crossbar height
  const h = 4.0    // total height
  const totalW = lw + cw + rw  // total width = 2.8
  
  // Draw H clockwise starting bottom-left:
  shape.moveTo(0, 0)
  shape.lineTo(lw, 0)
  shape.lineTo(lw, (h - ch) / 2)        // up to crossbar bottom-left inner
  shape.lineTo(lw + cw, (h - ch) / 2)   // across to crossbar bottom-right inner
  shape.lineTo(lw + cw, 0)               // down right pillar
  shape.lineTo(totalW, 0)                // right pillar bottom
  shape.lineTo(totalW, h)                // up right side
  shape.lineTo(lw + cw, h)              // across top
  shape.lineTo(lw + cw, (h + ch) / 2)   // down to crossbar top-right inner
  shape.lineTo(lw, (h + ch) / 2)        // across crossbar top
  shape.lineTo(lw, h)                    // up left pillar
  shape.lineTo(0, h)                     // across top-left
  shape.lineTo(0, 0)                     // close
  
  const extrudeSettings = {
    steps: 1,
    depth: 1.2,         // Z depth of extrusion
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.06,
    bevelSegments: 4,
  }
  
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  geometry.center()  // center at origin
  return geometry
}
```

### Step 2: Iridescent Shader Material

```ts
const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewDir;
  uniform float uTime;
  uniform float uNoiseScale;

  // Simple noise function
  float noise(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewDir;
  uniform float uTime;
  uniform float uRoughness;
  uniform float uNoiseScale;
  uniform vec3 uColor;

  vec3 iridescence(float cosTheta, float time) {
    // Fresnel-based iridescence: angle-dependent color shift
    float fresnel = pow(1.0 - cosTheta, 3.0);
    
    // Color cycling through hue
    float hue = fresnel * 2.5 + time * 0.15;
    
    // HSL to RGB conversion approximation
    vec3 col1 = vec3(0.43, 0.16, 0.65);  // purple
    vec3 col2 = vec3(0.08, 0.64, 0.75);  // teal  
    vec3 col3 = vec3(0.97, 0.62, 0.04);  // gold
    vec3 col4 = vec3(0.06, 0.73, 0.51);  // green
    
    float t = fract(hue);
    float idx = floor(hue);
    
    vec3 color;
    if (mod(idx, 4.0) < 1.0)      color = mix(col1, col2, t);
    else if (mod(idx, 4.0) < 2.0) color = mix(col2, col3, t);
    else if (mod(idx, 4.0) < 3.0) color = mix(col3, col4, t);
    else                            color = mix(col4, col1, t);
    
    return color;
  }

  void main() {
    vec3 normal = normalize(vNormal);
    float cosTheta = dot(normal, vViewDir);
    
    // Base dark glass color
    vec3 baseColor = vec3(0.05, 0.04, 0.08) * uColor;
    
    // Iridescence layer
    vec3 iridColor = iridescence(abs(cosTheta), uTime);
    
    // Fresnel blend: edges get iridescent, center stays dark
    float fresnel = pow(1.0 - abs(cosTheta), 2.0 + uRoughness * 3.0);
    
    // Surface noise for roughness variation
    float n = fract(sin(dot(vPosition * uNoiseScale, vec3(12.9898, 78.233, 45.543))) * 43758.5453);
    float roughMask = mix(1.0, n, uRoughness * 0.5);
    
    vec3 finalColor = mix(baseColor, iridColor, fresnel * roughMask * 1.5);
    
    // Add bright highlight streaks
    float streak = pow(max(0.0, dot(reflect(-vViewDir, normal), vec3(0.5, 0.8, 0.3))), 30.0);
    finalColor += streak * 0.8 * iridColor;
    
    // Transmission/glass feel: slight transparency on facing surfaces
    float alpha = mix(0.85, 0.97, fresnel);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`

// Create material:
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime:       { value: 0 },
    uRoughness:  { value: 0.10 },
    uNoiseScale: { value: 9.0 },
    uColor:      { value: new THREE.Color(1, 1, 1) },
  },
  transparent: true,
  side: THREE.DoubleSide,
})
```

### Step 3: Scene Setup

```ts
// Renderer
const renderer = new THREE.WebGLRenderer({ 
  canvas, 
  antialias: true, 
  alpha: true,  // transparent background — grid shows through
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(width, height)
renderer.setClearColor(0x000000, 0)  // transparent
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.2

// Camera
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
camera.position.z = 8

// Scene
const scene = new THREE.Scene()

// Lights
const ambient = new THREE.AmbientLight(0x111111, 0.8)
scene.add(ambient)

const purpleLight = new THREE.DirectionalLight(0x7b5ea7, 3)
purpleLight.position.set(5, 5, 5)
scene.add(purpleLight)

const tealLight = new THREE.PointLight(0x2dd4bf, 5, 20)
tealLight.position.set(-5, 3, 3)
scene.add(tealLight)

const goldLight = new THREE.PointLight(0xf59e0b, 3, 20)
goldLight.position.set(4, -3, 4)
scene.add(goldLight)

// Animate lights slightly for dynamic feel
// In rAF: tealLight.position.x = Math.sin(time * 0.5) * 5

// Mesh
const geometry = createHGeometry()
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
```

### Step 4: Animation Loop

```ts
let autoRotate = true
const autoRotateSpeed = { y: 0.003, x: 0.0008 }
let mouseInfluence = { x: 0, y: 0 }
let targetMouseInfluence = { x: 0, y: 0 }

function animate(time: number) {
  requestAnimationFrame(animate)
  
  // Update shader time
  material.uniforms.uTime.value = time * 0.001
  
  // Auto rotation
  if (autoRotate) {
    mesh.rotation.y += autoRotateSpeed.y
    mesh.rotation.x += autoRotateSpeed.x
  }
  
  // Mouse parallax lerp
  mouseInfluence.x += (targetMouseInfluence.x - mouseInfluence.x) * 0.05
  mouseInfluence.y += (targetMouseInfluence.y - mouseInfluence.y) * 0.05
  
  if (autoRotate) {
    mesh.rotation.y += mouseInfluence.x * 0.01
    mesh.rotation.x += mouseInfluence.y * 0.01
  }
  
  // Animate lights
  tealLight.position.x = Math.sin(time * 0.0003) * 6
  goldLight.position.y = Math.cos(time * 0.0004) * 4
  
  // Update quaternion readout
  const q = mesh.quaternion
  onQuaternionUpdate({ x: q.x, y: q.y, z: q.z, w: q.w })
  
  renderer.render(scene, camera)
}
animate(0)
```

### Step 5: Mouse Interactions

```ts
// Mousemove for parallax
window.addEventListener('mousemove', (e) => {
  targetMouseInfluence.x = (e.clientX / window.innerWidth - 0.5) * 2
  targetMouseInfluence.y = (e.clientY / window.innerHeight - 0.5) * 2
})

// Drag for manual rotation
let isDragging = false
let prevMouse = { x: 0, y: 0 }

canvas.addEventListener('mousedown', (e) => {
  isDragging = true
  autoRotate = false
  prevMouse = { x: e.clientX, y: e.clientY }
})

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return
  const dx = (e.clientX - prevMouse.x) * 0.01
  const dy = (e.clientY - prevMouse.y) * 0.01
  mesh.rotation.y += dx
  mesh.rotation.x += dy
  prevMouse = { x: e.clientX, y: e.clientY }
})

window.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false
    // Resume auto-rotate after 2s of no interaction
    setTimeout(() => { autoRotate = true }, 2000)
  }
})
```

### Step 6: Material Slider Updates

```ts
// Called when roughness slider changes:
function updateRoughness(val: number) {
  material.uniforms.uRoughness.value = val
}

// Called when noiseScale slider changes:
function updateNoiseScale(val: number) {
  material.uniforms.uNoiseScale.value = val
}

// Called when color picker changes:
function updateColor(hex: string) {
  material.uniforms.uColor.value.set(hex)
}
```

### Step 7: Resize Handler

```ts
function onResize() {
  const w = container.clientWidth
  const h = container.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}
window.addEventListener('resize', onResize)
```

---

## ArcballWidget.tsx — Gimbal SVG

```tsx
// The gimbal shows current rotation state
// Three ellipses representing X, Y, Z axes
// They rotate/tilt based on current mesh quaternion

// Use SVG with three <ellipse> elements
// Apply CSS transforms based on euler angles extracted from quaternion
// Each ellipse is colored: X=red, Y=green, Z=blue (matches Three.js convention)

// Center dot: white circle 6px
// Outer ring: grey circle, stroke only

// On drag: this widget controls the mesh rotation too
// Track pointer events on the SVG, compute rotation delta
```

---

## Canvas Positioning

```css
.crystal-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  /* Canvas background is transparent — dark grid shows through */
}

/* After leaving hero, canvas becomes fixed in corner */
.crystal-canvas.ambient {
  position: fixed;
  width: 300px;
  height: 300px;
  bottom: -50px;
  right: -50px;
  z-index: 0;
  opacity: 0.15;
  pointer-events: none;
}
```
