'use client'
import { useEffect, useRef } from 'react'
import { about, hero } from '@/lib/content'
import GridBackground from '@/components/shared/GridBackground'
import PlusMarkers from '@/components/shared/PlusMarkers'
import styles from './About.module.css'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        const ctx = gsap.context(() => {
          // Set initial hidden state
          gsap.set(leftRef.current, { opacity: 0, x: -60 })
          gsap.set(rightRef.current, { opacity: 0, x: 60 })
          gsap.set('.skill-tag', { opacity: 0, y: 15 })
          gsap.set('.stat-block-anim', { opacity: 0, y: 20 })

          // ScrollTrigger to reveal
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 85%',
            onEnter: () => {
              gsap.to(leftRef.current, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' })
              gsap.to(rightRef.current, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.15 })
              gsap.to('.skill-tag', { opacity: 1, y: 0, stagger: 0.03, duration: 0.4, ease: 'power2.out' })
              gsap.to('.stat-block-anim', { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: 'power2.out' })
            }
          })
        }, sectionRef)
        return () => ctx.revert()
      })
    })
  }, [])

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <GridBackground>
        <PlusMarkers />
      </GridBackground>

      <span className="section-label">— ABOUT</span>

      <div className={styles.grid}>
        {/* Left: Bio */}
        <div ref={leftRef} className={styles.left}>
          <span className={styles.colLabel}>ABOUT</span>
          <p className={styles.bio}>{about.bio}</p>

          {/* Stats */}
          <div className={styles.stats}>
            {hero.stats.map((stat, i) => (
              <div key={i} className={`${styles.statBlock} stat-block-anim`}>
                <span className={`${styles.statValue} font-display`}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Skills */}
        <div ref={rightRef} className={styles.right}>
          <span className={styles.colLabel}>SKILLS</span>
          {Object.entries(about.skills).map(([group, items]) => (
            <div key={group} className={styles.skillGroup}>
              <span className={styles.groupLabel}>{group}</span>
              <div className={styles.tags}>
                {items.map(skill => (
                  <span key={skill} className={`tag skill-tag`}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
