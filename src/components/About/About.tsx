'use client'
import { useEffect, useRef } from 'react'
import { about, hero } from '@/lib/content'
import SplitType from 'split-type'
import GridBackground from '@/components/shared/GridBackground'
import PlusMarkers from '@/components/shared/PlusMarkers'
import styles from './About.module.css'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        let splitBio: SplitType | null = null;
        const ctx = gsap.context(() => {

          // --- BIO: Kinetic Typography Reveal ---
          splitBio = new SplitType('.about-bio-text', { types: 'words,chars' })

          if (splitBio.chars) {
            gsap.set(splitBio.chars, {
              y: 20,
              opacity: 0,
            })
            ScrollTrigger.create({
              trigger: '.about-bio-wrapper',
              start: 'top 85%',
              onEnter: () => {
                gsap.to(splitBio?.chars || [], {
                  y: 0,
                  opacity: 1,
                  stagger: 0.015,
                  duration: 0.5,
                  ease: 'back.out(2)'
                })
              }
            })
          }

          // --- STATS: Count up from 0 ---
          const statEls = gsap.utils.toArray<HTMLElement>('.stat-count-up')
          statEls.forEach(el => {
            const target = el.dataset.target || '0'
            const isPlus = target.includes('+')
            const num = parseInt(target.replace(/\D/g, ''), 10)
            const obj = { val: 0 }
            ScrollTrigger.create({
              trigger: el,
              start: 'top 90%',
              onEnter: () => {
                gsap.to(obj, {
                  val: num,
                  duration: 1.8,
                  ease: 'power2.out',
                  snap: { val: 1 },
                  onUpdate: () => {
                    el.textContent = Math.round(obj.val) + (isPlus ? '+' : '')
                  }
                })
              }
            })
          })

          // --- SKILL TAGS: Stagger from center outward ---
          gsap.set('.skill-tag', { opacity: 0, scale: 0.8, y: 12 })
          ScrollTrigger.create({
            trigger: '.about-skills-wrapper',
            start: 'top 85%',
            onEnter: () => {
              gsap.to('.skill-tag', {
                opacity: 1,
                scale: 1,
                y: 0,
                stagger: {
                  each: 0.04,
                  from: 'center'
                },
                duration: 0.5,
                ease: 'back.out(1.4)'
              })
            }
          })

          // --- RIGHT COLUMN: Slide in from right ---
          gsap.set('.about-right-col', { x: 60, opacity: 0 })
          ScrollTrigger.create({
            trigger: '.about-skills-wrapper',
            start: 'top 85%',
            onEnter: () => {
              gsap.to('.about-right-col', {
                x: 0,
                opacity: 1,
                duration: 1.0,
                ease: 'power3.out',
              })
            }
          })

        }, sectionRef)
        return () => {
          ctx.revert()
          if (splitBio) splitBio.revert()
        }
      })
    })
  }, [])

  return (
    <section id="about" data-section ref={sectionRef} className={styles.about}>
      <GridBackground>
        <PlusMarkers />
      </GridBackground>

      <span className="section-label">— ABOUT</span>

      <div className={styles.grid}>
        {/* Left: Bio */}
        <div className={styles.left}>
          <span className={styles.colLabel}>ABOUT</span>

          {/* Bio with kinetic typography reveal */}
          <div className={`${styles.bioWrapper} about-bio-wrapper`}>
            <p className={`${styles.bioLine} about-bio-text`}>
              {about.bio}
            </p>
          </div>

          {/* Stats with count-up */}
          <div className={styles.stats}>
            {hero.stats.map((stat, i) => (
              <div key={i} className={`${styles.statBlock} stat-block-anim`}>
                <span
                  className={`${styles.statValue} font-display stat-count-up`}
                  data-target={stat.value}
                >
                  {stat.value}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Skills */}
        <div className={`${styles.right} about-right-col`}>
          <span className={styles.colLabel}>SKILLS</span>
          <div className="about-skills-wrapper">
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
      </div>
    </section>
  )
}
