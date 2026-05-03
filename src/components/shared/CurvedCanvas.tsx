'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface CurvedCanvasProps {
  accentColor: string
}

export default function CurvedCanvas({ accentColor }: CurvedCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const container = canvas.parentElement!
    let w = container.clientWidth
    let h = container.clientHeight

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.z = 5.5

    const scene = new THREE.Scene()

    // Curved surface: CylinderGeometry
    const radius = 6
    const geometry = new THREE.CylinderGeometry(radius, radius, 4.5, 64, 1, true, -0.35, 0.7)
    geometry.center()

    // Parse accent color or fallback to metallic tone
    const color = new THREE.Color(accentColor || 0x2a1b10)

    const material = new THREE.MeshPhysicalMaterial({ 
      color: color,
      metalness: 0.9,
      roughness: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.2,
      side: THREE.FrontSide,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.y = Math.PI // Face outward
    scene.add(mesh)

    // Lighting to make the metallic material shine
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const spotLight = new THREE.SpotLight(0xffffff, 5)
    spotLight.position.set(-2, 3, 4)
    spotLight.angle = Math.PI / 4
    spotLight.penumbra = 0.5
    scene.add(spotLight)

    const spotLight2 = new THREE.SpotLight(color, 3)
    spotLight2.position.set(2, -3, 4)
    spotLight2.angle = Math.PI / 3
    spotLight2.penumbra = 0.5
    scene.add(spotLight2)

    let rafId: number
    const clock = new THREE.Clock()

    function animate() {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      
      // Gentle floating animation
      mesh.position.y = Math.sin(t * 0.5) * 0.05
      mesh.rotation.x = Math.sin(t * 0.3) * 0.02
      
      // Animate lights for dynamic metallic sheen
      spotLight.position.x = Math.sin(t * 0.8) * 3
      spotLight2.position.x = Math.cos(t * 0.5) * 3

      renderer.render(scene, camera)
    }
    animate()

    function onResize() {
      w = container.clientWidth
      h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [accentColor])

  return (
    <canvas 
      ref={canvasRef} 
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} 
    />
  )
}
