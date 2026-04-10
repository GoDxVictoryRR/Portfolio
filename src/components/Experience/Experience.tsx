'use client'
import { useRef, useEffect, useState } from 'react'
import { experience } from '@/lib/content'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './Experience.module.css'

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${experience.length * 100}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const index = Math.min(
            experience.length - 1,
            Math.floor(self.progress * experience.length)
          )
          setActiveIndex(index)
          window.dispatchEvent(new CustomEvent('experienceScroll', {
            detail: { progress: self.progress }
          }))
        }
      })

      gsap.to('.ghost-text-exp', {
        y: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })

      // Set initial hidden state
      gsap.set(`.${styles.card}`, { opacity: 0, x: -80 })
      gsap.set(`.${styles.details}`, { opacity: 0, x: 80 })
      gsap.set(`.${styles.tags} .tag`, { opacity: 0, y: 15 })

      // ScrollTrigger to reveal
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(`.${styles.card}`, { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' })
          gsap.to(`.${styles.details}`, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 })
          gsap.to(`.${styles.tags} .tag`, { opacity: 1, y: 0, stagger: 0.04, duration: 0.3, ease: 'power2.out' })
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const activeExp = experience[activeIndex] || experience[0]

  return (
    <section id="experience" ref={sectionRef} className={styles.carouselSection}>
      {/* Ghost text background */}
      <span className={`${styles.ghostText} ghost-text-exp`}>
        EXPERIENCE
      </span>

      {/* Main Content Split Area */}
      <div className={styles.content}>
        
        {/* Left Side: 55% Animated Card */}
        <div className={styles.card} style={{ background: activeExp.imageGradient }}>
          <span className={styles.cardWatermark}>
            {activeExp.company}
          </span>
          <div className={styles.cardInner}>
            <span className={styles.cardRole}>{activeExp.role}</span>
            <span className={styles.cardDate}>{activeExp.dateRange}</span>
            <ul className={styles.cardBullets}>
              {activeExp.details.slice(0, 2).map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: 45% Details */}
        <div className={styles.details}>
          <span className={`${styles.companyLabel} font-display`}>
            {activeExp.companyLabel}
          </span>
          
          <h2 className={`${styles.role} font-display`}>
            {activeExp.role}
          </h2>

          <p className={styles.dateRange}>
            {activeExp.dateRange}
          </p>

          <p className={styles.description}>
            {activeExp.description}
          </p>

          <ul className={styles.detailList}>
            {activeExp.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>

          <div className={styles.tags}>
            {activeExp.tags.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <span className={styles.stylizedLabel}>
        {activeExp.companyLabel.toUpperCase()}
      </span>

      <span className="section-label" style={{ top: '50%', left: '40px', transform: 'translateY(-50%)' }}>— EXPERIENCE</span>
    </section>
  )
}
