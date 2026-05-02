'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { hero } from '@/lib/content'
import QuaternionPanel from './QuaternionPanel'
import MaterialPanel from './MaterialPanel'
import GridBackground from '@/components/shared/GridBackground'
import PlusMarkers from '@/components/shared/PlusMarkers'
import styles from './Hero.module.css'
import type { CrystalHRef } from './CrystalH'

const CrystalH = dynamic(() => import('./CrystalH'), { ssr: false })

interface HeroProps {
  isReady?: boolean;
}

export default function Hero({ isReady = true }: HeroProps) {
  const crystalRef = useRef<CrystalHRef>(null)
  const [quaternion, setQuaternion] = useState({ x: 0, y: 0, z: 0, w: 1 })
  const glowRef = useRef<HTMLDivElement>(null)

  const handleQuaternionUpdate = useCallback((q: { x: number; y: number; z: number; w: number }) => {
    setQuaternion(q)
  }, [])

  const handleReset = useCallback(() => {
    crystalRef.current?.resetQuaternion()
  }, [])

  useEffect(() => {
    const handleCrystalColor = (e: Event) => {
      const { r, g, b } = (e as CustomEvent).detail
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle, rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},0.15) 0%, transparent 70%)`
      }
    }
    window.addEventListener('crystalColor', handleCrystalColor)
    return () => window.removeEventListener('crystalColor', handleCrystalColor)
  }, [])

  useEffect(() => {
    if (!isReady) return;

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        
        // Hero entrance animation - wait a tiny bit after loader completes
        setTimeout(() => {
          gsap.to('.hero-name-line-1', { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' })
          gsap.to('.hero-name-line-2', { y: 0, opacity: 1, duration: 0.9, delay: 0.15, ease: 'power3.out' })
          gsap.to('.hero-role', { opacity: 1, duration: 0.5, ease: 'power2.out' })
          gsap.to('.crystal-canvas-inner', { scale: 1, opacity: 1, duration: 1.0, ease: 'power3.out' })
          gsap.to('.quaternion-panel', { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' })
          gsap.to('.material-panel', { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' })
        }, 100)

        // Shrink crystal to corner on scroll to projects
        // We use window as trigger because projects might not be mounted on first run perfectly
        setTimeout(() => {
          const wrapper = document.getElementById('crystal-canvas-wrapper')
          if (wrapper) {
            ScrollTrigger.create({
              trigger: '#projects',
              start: 'top 60%',
              end: 'top top',
              scrub: true,
              animation: gsap.to(wrapper, {
                scale: 0.2,
                x: '40vw',
                y: '40vh',
                opacity: 0,
                transformOrigin: 'center center'
              })
            })
          }
        }, 500)
      })
    })
  }, [isReady])

  return (
    <section id="hero" className={styles.hero}>
      {/* Background */}
      <GridBackground>
        <PlusMarkers />
      </GridBackground>

      {/* Crystal glow halo */}
      <div 
        ref={glowRef}
        className="crystal-glow"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vh',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.12,
          background: 'radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 70%)'
        }}
      />

      {/* Three.js Crystal */}
      <div className={`${styles.canvasWrapper} crystal-canvas-inner`} id="crystal-canvas-wrapper">
        <CrystalH
          crystalRef={crystalRef}
          onQuaternionUpdate={handleQuaternionUpdate}
        />
      </div>

      {/* Name text — sits BEHIND canvas */}
      <div className={styles.nameWrapper}>
        <div className="hero-name-lines">
          <h1 className={`${styles.name} font-display hero-name-line-1`}>
            {hero.nameLine1}
          </h1>
          <h1 className={`${styles.name} font-display hero-name-line-2`}>
            {hero.nameLine2}
          </h1>
        </div>
        <p className={`${styles.role} font-mono hero-role`}>
          {hero.role}
        </p>
      </div>

      {/* Quaternion Panel — top right */}
      <div className={`${styles.panelTR} quaternion-panel`}>
        <QuaternionPanel quaternion={quaternion} onReset={handleReset} />
      </div>

      {/* Material Panel — bottom left */}
      <div className={`${styles.panelBL} material-panel`}>
        <MaterialPanel
          onRoughnessChange={v => crystalRef.current?.updateRoughness(v)}
          onNoiseScaleChange={v => crystalRef.current?.updateNoiseScale(v)}
          onColorChange={hex => crystalRef.current?.updateColor(hex)}
        />
      </div>
    </section>
  )
}
