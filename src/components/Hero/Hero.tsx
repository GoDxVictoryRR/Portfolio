'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { hero } from '@/lib/content'
import SplitType from 'split-type'
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
        
        let splitLine1: SplitType | null = null;
        let splitLine2: SplitType | null = null;

        // Hero entrance animation - wait a tiny bit after loader completes
        const heroTimeout = setTimeout(() => {
          // Split the text into characters
          splitLine1 = new SplitType('.hero-name-line-1', { types: 'chars' })
          splitLine2 = new SplitType('.hero-name-line-2', { types: 'chars' })

          // Initial state for GSAP is important so characters are hidden before stagger
          if (splitLine1.chars && splitLine2.chars) {
            gsap.set([splitLine1.chars, splitLine2.chars], { y: 50, opacity: 0 })

            gsap.to(splitLine1.chars, { y: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.7)', stagger: 0.04 })
            gsap.to(splitLine2.chars, { y: 0, opacity: 1, duration: 0.9, delay: 0.3, ease: 'back.out(1.7)', stagger: 0.04 })
          }
          
          gsap.to('.hero-role', { opacity: 1, duration: 0.8, delay: 0.6, ease: 'power2.out' })
          gsap.to('.crystal-canvas-inner', { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' })
          gsap.to('.quaternion-panel', { x: 0, opacity: 1, duration: 0.7, delay: 0.8, ease: 'power2.out' })
          gsap.to('.material-panel', { x: 0, opacity: 1, duration: 0.7, delay: 0.8, ease: 'power2.out' })
        }, 100)

        let mm = gsap.matchMedia();

        // Shrink crystal to corner on scroll to projects — desktop only
        // On mobile, the scrub ScrollTrigger conflicts with native Android scroll
        const crystalTimeout = setTimeout(() => {
          const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
          if (isTouchDevice) return // Skip entirely on mobile

          const wrapper = document.getElementById('crystal-canvas-wrapper')
          if (wrapper) {
            mm.add({
              isDesktop: "(min-width: 769px)",
              isMobile: "(max-width: 768px)"
            }, (context) => {
              let { isDesktop } = context.conditions as any;
              
              ScrollTrigger.create({
                trigger: '#projects',
                start: 'top 60%',
                end: 'top top',
                scrub: true,
                animation: gsap.to(wrapper, {
                  scale: isDesktop ? 0.2 : 0,
                  x: isDesktop ? '40vw' : '0vw',
                  y: isDesktop ? '40vh' : '30vh',
                  opacity: 0,
                  transformOrigin: 'center center'
                })
              });
            });
          }
        }, 500)

        // Cleanup
        return () => {
          clearTimeout(heroTimeout);
          clearTimeout(crystalTimeout);
          if (splitLine1) splitLine1.revert();
          if (splitLine2) splitLine2.revert();
          mm.revert();
        }
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
