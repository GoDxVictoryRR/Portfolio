'use client'
import { useEffect, useRef } from 'react'
import { achievements } from '@/lib/content'
import styles from './Marquee.module.css'

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  // Duplicate 3x for seamless loop at high speed
  const items = [...achievements, ...achievements, ...achievements]

  useEffect(() => {
    let xPos = 0
    let speed = 0.4          // base px per frame
    let currentSpeed = 0.4
    let rafId: number
    let lastScrollY = 0
    let velocityDecay = 0

    const animate = () => {
      // Lerp toward target speed for smooth acceleration/deceleration
      currentSpeed += (speed - currentSpeed) * 0.06

      xPos -= currentSpeed
      const trackEl = trackRef.current
      if (trackEl) {
        // Reset position when we've scrolled one third (one copy)
        const oneThird = trackEl.scrollWidth / 3
        if (Math.abs(xPos) >= oneThird) {
          xPos = 0
        }
        trackEl.style.transform = `translateX(${xPos}px)`
      }
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    // Lenis scroll velocity hookup
    const handleScroll = () => {
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollY
      lastScrollY = scrollY
      // Boost speed proportionally to scroll velocity
      const boost = Math.abs(delta) * 0.15
      speed = 0.4 + boost
      clearTimeout(velocityDecay as unknown as ReturnType<typeof setTimeout>)
      // After 200ms without scrolling, decay back to base speed
      velocityDecay = setTimeout(() => {
        speed = 0.4
      }, 200) as unknown as number
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={styles.marqueeOuter}>
      <div ref={trackRef} className={styles.marqueeTrack}>
        {items.map((a, i) => (
          <span key={i} className={styles.item}>
            {a}<span className={styles.sep}> ◆ </span>
          </span>
        ))}
      </div>
    </div>
  )
}
