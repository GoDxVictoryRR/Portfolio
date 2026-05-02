'use client'
import { useEffect, useRef, useImperativeHandle } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export interface CrystalHRef {
  updateRoughness: (val: number) => void
  updateNoiseScale: (val: number) => void
  updateColor: (hex: string) => void
  resetQuaternion: () => void
}

interface CrystalHProps {
  onQuaternionUpdate: (q: { x: number; y: number; z: number; w: number }) => void
  crystalRef?: React.Ref<CrystalHRef>
}

function createHGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  
  const lw = 0.8   // left pillar width
  const rw = 0.8   // right pillar width
  const cw = 1.2   // crossbar width
  const ch = 0.6   // crossbar height
  const h = 4.0    // total height
  const totalW = lw + cw + rw
  
  shape.moveTo(0, 0)
  shape.lineTo(lw, 0)
  shape.lineTo(lw, (h - ch) / 2)
  shape.lineTo(lw + cw, (h - ch) / 2)
  shape.lineTo(lw + cw, 0)
  shape.lineTo(totalW, 0)
  shape.lineTo(totalW, h)
  shape.lineTo(lw + cw, h)
  shape.lineTo(lw + cw, (h + ch) / 2)
  shape.lineTo(lw, (h + ch) / 2)
  shape.lineTo(lw, h)
  shape.lineTo(0, h)
  shape.lineTo(0, 0)
  
  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 1,
    depth: 1.2,
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.15,
    bevelSegments: 1, // Sharp bevels matching reference image
  }
  
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  geometry.center()
  return geometry
}

const CrystalH = ({ onQuaternionUpdate, crystalRef }: CrystalHProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const materialRef = useRef<THREE.MeshPhysicalMaterial | null>(null)
  const rafRef = useRef<number>(0)
  const meshRef = useRef<THREE.Mesh | null>(null)

  useImperativeHandle(crystalRef, () => ({
    updateRoughness: (val) => {
      if (materialRef.current) materialRef.current.roughness = val
    },
    updateNoiseScale: (val) => {
      // Noise scale no longer applies to pure physical glass, mapped to clearcoat roughness
      if (materialRef.current) materialRef.current.clearcoatRoughness = val * 0.1
    },
    updateColor: (hex) => {
      // Color tint for the glass
      if (materialRef.current) materialRef.current.color.set(hex)
    },
    resetQuaternion: () => {
      if (meshRef.current) {
        meshRef.current.quaternion.identity()
        meshRef.current.rotation.set(0, 0, 0)
      }
    },
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const container = canvas.parentElement!
    let width = container.clientWidth
    let height = container.clientHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.6 // Boosted for brighter crystal reflections

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 8

    // Scene
    const scene = new THREE.Scene()

    // Generate a bright RoomEnvironment for sharp reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    const roomEnv = pmremGenerator.fromScene(new RoomEnvironment()).texture
    scene.environment = roomEnv

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0xffffff, 5) // Much brighter
    keyLight.position.set(5, 5, 5)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(0xaa88ff, 3, 20) // Subtle purple fill light to blend with background
    fillLight.position.set(-5, -3, 3)
    scene.add(fillLight)

    // Ultra-Premium Glass Material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 1.0,       // Maximum reflectivity
      roughness: 0.0,       // Mirror-smooth
      opacity: 0.1,         // Ultra transparent faces so the DOM video pops
      transparent: true,
      envMapIntensity: 6.0, // Blindingly bright reflections on the bevels
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      iridescence: 1.0,     // Adds hyper-realistic chromatic/rainbow dispersion on edges!
      iridescenceIOR: 1.3,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    materialRef.current = material

    // Mesh
    const geometry = createHGeometry()
    const mesh = new THREE.Mesh(geometry, material)
    meshRef.current = mesh
    scene.add(mesh)

    // State
    let autoRotate = true
    let isDragging = false
    let prevMouse = { x: 0, y: 0 }
    let velocity = { x: 0, y: 0 }
    const mouseInfluence = { x: 0, y: 0 }
    const targetMouseInfluence = { x: 0, y: 0 }
    let resumeTimeout: ReturnType<typeof setTimeout>

    // Animation loop
    function animate(time: number) {
      rafRef.current = requestAnimationFrame(animate)

      if (isDragging) {
        // Dragging handled in mouse event
      } else if (autoRotate) {
        mesh.rotation.y += 0.003
        mesh.rotation.x += 0.0008
      } else {
        // Momentum decay
        mesh.rotation.y += velocity.x
        mesh.rotation.x += velocity.y
        velocity.x *= 0.94 // friction
        velocity.y *= 0.94
        
        if (Math.abs(velocity.x) < 0.0001 && Math.abs(velocity.y) < 0.0001) {
          velocity.x = 0; velocity.y = 0;
        }
      }

      mouseInfluence.x += (targetMouseInfluence.x - mouseInfluence.x) * 0.05
      mouseInfluence.y += (targetMouseInfluence.y - mouseInfluence.y) * 0.05

      if (autoRotate) {
        mesh.rotation.y += mouseInfluence.x * 0.008
        mesh.rotation.x += mouseInfluence.y * 0.008
      }

      const q = mesh.quaternion
      onQuaternionUpdate({ x: q.x, y: q.y, z: q.z, w: q.w })

      renderer.render(scene, camera)
    }
    animate(0)

    // Mouse parallax and drag
    function onMouseMove(e: MouseEvent) {
      targetMouseInfluence.x = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouseInfluence.y = (e.clientY / window.innerHeight - 0.5) * 2

      if (!isDragging) return
      
      const dx = (e.clientX - prevMouse.x) * 0.005
      const dy = (e.clientY - prevMouse.y) * 0.005
      
      mesh.rotation.y += dx
      mesh.rotation.x += dy
      
      velocity = { x: dx, y: dy }
      prevMouse = { x: e.clientX, y: e.clientY }
    }

    function onMouseDown(e: MouseEvent) {
      isDragging = true
      autoRotate = false
      velocity = { x: 0, y: 0 }
      clearTimeout(resumeTimeout)
      prevMouse = { x: e.clientX, y: e.clientY }
    }

    function onMouseUp() {
      if (isDragging) {
        isDragging = false
        // Delay resume to let momentum play out
        resumeTimeout = setTimeout(() => { autoRotate = true }, 3000)
      }
    }

    function onResize() {
      width = container.clientWidth
      height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    function onArcballDrag(e: Event) {
      const customEvent = e as CustomEvent
      const { dx, dy } = customEvent.detail
      if (mesh) {
        mesh.rotation.y += dx * 0.02
        mesh.rotation.x += dy * 0.02
        autoRotate = false
        clearTimeout(resumeTimeout)
        resumeTimeout = setTimeout(() => { autoRotate = true }, 4000)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('resize', onResize)
    window.addEventListener('arcballDrag', onArcballDrag)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(resumeTimeout)
      window.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('arcballDrag', onArcballDrag)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [onQuaternionUpdate])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
      }}
    />
  )
}

CrystalH.displayName = 'CrystalH'
export default CrystalH
