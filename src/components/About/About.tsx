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
          gsap.from(leftRef.current, {
            x: -60, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          })
          gsap.from(rightRef.current, {
            x: 60, opacity: 0, duration: 0.8, delay: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          })
          // Tags stagger
          gsap.from('.skill-tag', {
            y: 15, opacity: 0, stagger: 0.03, duration: 0.4, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
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
              <div key={i} className={styles.statBlock}>
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
