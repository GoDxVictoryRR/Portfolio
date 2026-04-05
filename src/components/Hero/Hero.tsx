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

export default function Hero() {
  const crystalRef = useRef<CrystalHRef>(null)
  const [quaternion, setQuaternion] = useState({ x: 0, y: 0, z: 0, w: 1 })

  const handleQuaternionUpdate = useCallback((q: { x: number; y: number; z: number; w: number }) => {
    setQuaternion(q)
  }, [])

  const handleReset = useCallback(() => {
    crystalRef.current?.resetQuaternion()
  }, [])

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        
        // Loader entrance timeline
        const tl = gsap.timeline({ delay: 3.0 }) // after loader
        tl.from('.hero-name-line-1', { y: 80, opacity: 0, duration: 0.8, ease: 'power3.out' })
          .from('.hero-name-line-2', { y: 80, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
          .from('.hero-role', { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
          .from('.quaternion-panel', { x: 40, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
          .from('.material-panel', { x: -40, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5')

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
                scale: 0.3,
                x: '35vw', // Move to bottom right corner approximately
                y: '35vh',
                opacity: 0.2,
                transformOrigin: 'center center'
              })
            })
          }
        }, 1000)
      })
    })
  }, [])

  return (
    <section id="hero" className={styles.hero}>
      {/* Background */}
      <GridBackground>
        <PlusMarkers />
      </GridBackground>

      {/* Three.js Crystal */}
      <div className={styles.canvasWrapper} id="crystal-canvas-wrapper">
        <CrystalH
          ref={crystalRef}
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
