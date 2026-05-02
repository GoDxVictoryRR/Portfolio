'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './Loader.module.css'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const loaderRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    let ctx = { current: 0 }

    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline()

      // 1. Trace the SVG line and cycle stroke colors
      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 3.5,
        ease: 'power2.inOut',
      }, 0)

      tl.to(pathRef.current, {
        keyframes: {
          stroke: ['#3b82f6', '#ffffff', '#ec4899', '#a855f7', '#6d28d9', '#ffffff'],
          easeEach: 'power1.inOut'
        },
        duration: 3.5,
        ease: 'none',
      }, 0)

      // 2. Rotate the entire SVG container in 3D space as it draws
      tl.to(containerRef.current, {
        rotateY: 360,
        rotateX: 10,
        duration: 3.5,
        ease: 'power1.inOut'
      }, 0)

      // 3. Counter Animation
      tl.to(ctx, {
        current: 100,
        duration: 3.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          setProgress(Math.round(ctx.current))
        }
      }, 0)

      // 4. Holographic Pulse & Fly-Through
      // Pulse the width and rapidly cycle the stroke color through the requested sequence
      tl.to(pathRef.current, {
        strokeWidth: 8,
        keyframes: {
          stroke: ['#3b82f6', '#ffffff', '#ec4899', '#a855f7', '#6d28d9', '#ffffff'],
          easeEach: 'power1.inOut'
        },
        duration: 0.8,
        ease: 'power2.inOut'
      }, 3.5)

      tl.to(containerRef.current, {
        scale: 15,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.in'
      }, 3.6)

      // 5. Smoothly fade out the black background to reveal the site
      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 3.7)

      tl.call(() => onComplete(), [], '+=0.1')
    })
  }, [onComplete])

  return (
    <div className={styles.loader} ref={loaderRef}>
      
      {/* Subtle geometric background */}
      <div className={styles.bgGrid} />

      {/* 3D Rotating Container */}
      <div className={styles.hologramContainer} ref={containerRef}>
        
        {/* Massive custom "H" SVG */}
        <svg 
          viewBox="0 0 100 120" 
          className={styles.hologramSvg}
          preserveAspectRatio="xMidYMid meet"
        >
          <path 
            ref={pathRef}
            className={styles.hologramPath}
            d="M 0 0 L 30 0 L 30 45 L 70 45 L 70 0 L 100 0 L 100 120 L 70 120 L 70 75 L 30 75 L 30 120 L 0 120 Z"
          />
        </svg>

        {/* Minimal Progress Counter */}
        <div className={styles.counterContainer}>
          <div className={styles.counter}>{progress.toString().padStart(3, '0')}</div>
          <div className={styles.counterLabel}>SYNC</div>
        </div>

      </div>

    </div>
  )
}
