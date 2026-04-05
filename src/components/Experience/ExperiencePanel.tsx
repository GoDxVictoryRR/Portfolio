'use client'
import { useRef, useEffect } from 'react'
import CurvedCanvas from '@/components/shared/CurvedCanvas'
import styles from './Experience.module.css'

interface Exp {
  id: string
  date: string
  dateRange: string
  company: string
  companyLabel: string
  role: string
  location: string
  description: string
  details: string[]
  tags: string[]
  accentColor: string
  imageGradient: string
}

export default function ExperiencePanel({ exp }: { exp: Exp }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        const ctx = gsap.context(() => {
          gsap.from(cardRef.current, {
            x: -80, opacity: 0, rotateY: -12,
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: panelRef.current, start: 'top 70%' },
          })
          gsap.from(detailRef.current, {
            x: 60, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: panelRef.current, start: 'top 70%' },
          })
          gsap.fromTo(panelRef.current!.querySelector('.ghost-text'),
            { y: '50%' },
            { y: '-50%', scrollTrigger: { trigger: panelRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 } }
          )
        }, panelRef)
        return () => ctx.revert()
      })
    })
  }, [])

  return (
    <div ref={panelRef} className={`${styles.expSection} experience-${exp.id}`}>
      <span className="ghost-text">EXPERIENCE</span>
      <span className="section-label">— EXPERIENCE</span>

      <div className={styles.content}>
        {/* Left: card panel */}
        <div ref={cardRef} className={styles.card}>
          <CurvedCanvas title={exp.company} imageGradient={exp.imageGradient} />
          <span className={styles.cardWatermark}>{exp.company.toUpperCase()}</span>
          <div className={styles.cardInner}>
            <span className={`${styles.cardRole} font-display`}>{exp.role}</span>
            <span className={styles.cardDate}>{exp.dateRange}</span>
            <ul className={styles.cardBullets}>
              {exp.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
            <div className={styles.cardTags}>
              {exp.tags.map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: details */}
        <div ref={detailRef} className={styles.details}>
          <span className={`${styles.companyLabel} font-display`}>{exp.companyLabel}</span>
          <h2 className={`${styles.role} font-display`}>{exp.role}</h2>
          <p className={styles.dateRange}>{exp.dateRange}</p>
          <p className={styles.description}>{exp.description}</p>
          <ul className={styles.detailList}>
            {exp.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
          <div className={styles.tags}>
            {exp.tags.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
