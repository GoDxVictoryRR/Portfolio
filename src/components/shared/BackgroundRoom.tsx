'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function BackgroundRoom() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    
    const mount = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 8
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)
    
    const texCanvas = document.createElement('canvas')
    texCanvas.width = 128
    texCanvas.height = 128
    const ctx = texCanvas.getContext('2d')!
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, 128, 128)
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, 128, 128)
    const texture = new THREE.CanvasTexture(texCanvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(12, 4)
    
    scene.fog = new THREE.FogExp2(0x000000, 0.008)
    
    const roomGeo = new THREE.BoxGeometry(120, 50, 500)
    const roomMat = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.BackSide,
      color: 0x0d0d0d,
    })
    const room = new THREE.Mesh(roomGeo, roomMat)
    scene.add(room)
    
    const ambientLight = new THREE.AmbientLight(0x111111, 1)
    scene.add(ambientLight)
    
    const light1 = new THREE.PointLight(0x6d28d9, 8, 150)
    light1.position.set(0, 10, 0)
    scene.add(light1)
    
    const light2 = new THREE.PointLight(0x0ea5e9, 6, 120)
    light2.position.set(-20, -5, -20)
    scene.add(light2)
    
    const light3 = new THREE.PointLight(0x10b981, 6, 120)
    light3.position.set(20, 5, -40)
    scene.add(light3)

    const light4 = new THREE.PointLight(0x6d28d9, 4, 150)
    light4.position.set(0, 0, -100)
    scene.add(light4)
    
    const colors = [
      new THREE.Color(0x6d28d9),
      new THREE.Color(0x0ea5e9),
      new THREE.Color(0x10b981),
      new THREE.Color(0xf59e0b),
    ]
    let colorIndex = 0
    let colorT = 0
    
    let scrollProgress = 0
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    const handleCrystalColor = (e: any) => {
      const { r, g, b } = e.detail
      light1.color.setRGB(r, g, b)
    }
    window.addEventListener('crystalColor', handleCrystalColor)
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    
    let frameId: number
    let time = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      time += 0.005
      
      colorT += 0.002
      if (colorT >= 1) { colorT = 0; colorIndex = (colorIndex + 1) % colors.length }
      const nextIndex = (colorIndex + 1) % colors.length
      light2.color.lerpColors(colors[colorIndex], colors[nextIndex], colorT)
      
      const targetZ = 8 - scrollProgress * 5
      const targetRotY = scrollProgress * 0.12
      camera.position.z += (targetZ - camera.position.z) * 0.05
      camera.rotation.y += (targetRotY - camera.rotation.y) * 0.05
      
      room.rotation.y = Math.sin(time * 0.1) * 0.01
      
      renderer.render(scene, camera)
    }
    animate()
    
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('crystalColor', handleCrystalColor)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}