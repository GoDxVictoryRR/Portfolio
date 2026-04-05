'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface CurvedCanvasProps {
  imageGradient: string
  title: string
}

export default function CurvedCanvas({ title, imageGradient }: CurvedCanvasProps) {
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
    camera.position.z = 5

    const scene = new THREE.Scene()

    // Curved surface: CylinderGeometry
    const radius = 6
    const geometry = new THREE.CylinderGeometry(radius, radius, 4, 32, 1, true, -0.4, 0.8)
    geometry.center()

    // Approximate gradient visually as base color since canvas gradient is hard in raw shader without texture
    // For now, simple mesh basic material with a flat color that matches accent
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x1f1f2e, // generic dark fallback
      side: THREE.FrontSide,
      wireframe: false
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.y = Math.PI // Face outward
    scene.add(mesh)

    let rafId: number
    function animate() {
      rafId = requestAnimationFrame(animate)
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
  }, [imageGradient])

  return (
    <canvas 
      ref={canvasRef} 
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} 
    />
  )
}
