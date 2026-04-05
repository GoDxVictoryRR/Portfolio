'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { projects, experience } from '@/lib/content'

export default function BackgroundScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let w = window.innerWidth
    let h = window.innerHeight

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.5

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000)
    camera.position.z = 50 
    camera.position.y = 0

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x080808, 0.015)

    // Grid Floor
    const gridHelper = new THREE.GridHelper(300, 150, 0x333333, 0x111111)
    gridHelper.position.y = -20
    scene.add(gridHelper)

    // Floating Cubes / Room Tiles
    const cubesGroup = new THREE.Group()
    const cubeGeo = new THREE.BoxGeometry(4, 4, 4)
    const cubeMat = new THREE.MeshStandardMaterial({ 
      color: 0x111111, 
      roughness: 0.2, 
      metalness: 0.8,
      transparent: true, 
      opacity: 0.1,
      wireframe: true 
    })
    
    for (let i = 0; i < 100; i++) {
      const mesh = new THREE.Mesh(cubeGeo, cubeMat)
      mesh.position.set(
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 400 - 100
      )
      mesh.rotation.set(Math.random(), Math.random(), Math.random())
      cubesGroup.add(mesh)
    }
    scene.add(cubesGroup)

    // Stars / Particles
    const starGeo = new THREE.BufferGeometry()
    const starCount = 3000
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i++) {
      starPos[i] = (Math.random() - 0.5) * 600
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true, opacity: 0.4 })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // Project Curved Panels
    const panelsGroup = new THREE.Group()
    const panelGeo = new THREE.CylinderGeometry(25, 25, 18, 32, 1, true, -0.4, 0.8)
    panelGeo.center()

    // Atmospheric Lights
    const ambientLight = new THREE.AmbientLight(0x111111, 1)
    scene.add(ambientLight)

    const bleedLight = new THREE.PointLight(0x4316a5, 15, 150)
    bleedLight.position.set(0, 0, 10)
    scene.add(bleedLight)

    const topLight = new THREE.DirectionalLight(0xffffff, 2)
    topLight.position.set(0, 50, 0)
    scene.add(topLight)

    // Store panels to animate them individually
    const panelMeshes: THREE.Mesh[] = []

    projects.forEach((proj, i) => {
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(proj.accentColor),
        roughness: 0.3,
        metalness: 0.7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
        emissive: new THREE.Color(proj.accentColor),
        emissiveIntensity: 0.2,
      })
      const mesh = new THREE.Mesh(panelGeo, material)
      // Projects: -200 to -400 range
      const z = -200 - (i / Math.max(1, projects.length - 1)) * 180
      mesh.position.set(0, 0, z) 
      mesh.rotation.y = Math.PI
      panelsGroup.add(mesh)
      panelMeshes.push(mesh)
    })

    experience.forEach((exp, i) => {
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(exp.accentColor),
        roughness: 0.3,
        metalness: 0.7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
        emissive: new THREE.Color(exp.accentColor),
        emissiveIntensity: 0.2,
      })
      const mesh = new THREE.Mesh(panelGeo, material)
      // Experience: -400 to -600 range
      const z = -420 - (i / Math.max(1, experience.length - 1)) * 160
      mesh.position.set(0, 0, z)
      mesh.rotation.y = Math.PI
      panelsGroup.add(mesh)
      panelMeshes.push(mesh) 
    })
    scene.add(panelsGroup)

    let rafId: number
    function animate() {
      rafId = requestAnimationFrame(animate)
      const time = Date.now() * 0.001
      
      cubesGroup.rotation.y += 0.0005
      
      // Atmospheric Bleed
      const hue = (time * 0.05) % 1.0
      bleedLight.color.setHSL(hue, 0.4, 0.3)
      bleedLight.position.x = Math.sin(time * 0.5) * 10

      panelMeshes.forEach((p, i) => {
        p.rotation.y = Math.PI + Math.sin(time + i) * 0.05
      })

      renderer.render(scene, camera)
    }
    animate()

    function onProjectScroll(e: Event) {
      const { progress } = (e as CustomEvent).detail
      const projectIndex = progress * (projects.length - 1)
      
      panelsGroup.position.x = 0
      
      panelMeshes.forEach((mesh, i) => {
        if (i < projects.length) {
          const dist = Math.abs(i - projectIndex)
          const scale = Math.max(0.7, 1.2 - dist * 0.4)
          mesh.scale.set(scale, scale, scale)
          ;(mesh.material as THREE.MeshStandardMaterial).opacity = Math.max(0.1, 0.9 - dist * 0.7)
          
          // Wider Fan-out spread for 3-panel visibility
          const angle = (i - projectIndex) * 0.7
          mesh.position.x = Math.sin(angle) * 35 
          mesh.rotation.y = Math.PI + angle * 0.4
        }
      })
    }
    window.addEventListener('projectScroll', onProjectScroll)

    function onExperienceScroll(e: Event) {
      const { progress } = (e as CustomEvent).detail
      const expIndex = progress * (experience.length - 1)
      
      // Subtler shift to the left for content balance
      panelsGroup.position.x = -8 
      
      panelMeshes.forEach((mesh, i) => {
        if (i >= projects.length) {
          const localIdx = i - projects.length
          const dist = Math.abs(localIdx - expIndex)
          
          mesh.scale.set(1, 1, 1)
          ;(mesh.material as THREE.MeshStandardMaterial).opacity = Math.max(0.1, 0.7 - dist * 0.5)
          mesh.position.x = 0
        }
      })
    }
    window.addEventListener('experienceScroll', onExperienceScroll)

    function onScroll() {
      const sy = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const progress = sy / (maxScroll || 1)
      
      // Camera moves through the tunnel with calibrated range
      camera.position.z = 50 - progress * 650 
      camera.position.y = -progress * 5
      bleedLight.position.z = camera.position.z - 5
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    function onResize() {
      w = window.innerWidth
      h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('projectScroll', onProjectScroll)
      window.removeEventListener('experienceScroll', onExperienceScroll)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      cubeGeo.dispose()
      cubeMat.dispose()
      panelGeo.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
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
