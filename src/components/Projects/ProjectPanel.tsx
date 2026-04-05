'use client'
import { useRef, useEffect } from 'react'
import styles from './Projects.module.css'

interface Project {
  id: string
  date: string
  tag: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  github: string
  metrics: { value: string; label: string }[]
  accentColor: string
  imageGradient: string
}

export default function ProjectPanel({ project, isLast }: { project: Project; isLast?: boolean }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        const ctx = gsap.context(() => {
          gsap.from(imageRef.current, {
            x: -80, opacity: 0, rotateY: -12,
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: panelRef.current, start: 'top 70%' },
          })
          gsap.from(detailsRef.current, {
            x: 60, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: panelRef.current, start: 'top 70%' },
          })
          gsap.from(panelRef.current!.querySelectorAll('.metric-block'), {
            y: 20, opacity: 0, stagger: 0.1, duration: 0.5, delay: 0.35, ease: 'power2.out',
            scrollTrigger: { trigger: panelRef.current, start: 'top 70%' },
          })
        }, panelRef)
        return () => ctx.revert()
      })
    })
  }, [])

  return (
    <div ref={panelRef} className={`${styles.projectSection} project-${project.id}`}>
      {/* Ghost watermark */}
      <span className="ghost-text">PROJECTS</span>
      <span className="section-label">— PROJECTS</span>

      <div className={styles.content}>
        {/* Left: Image panel */}
        <div ref={imageRef} className={styles.imagePanel} style={{ background: project.imageGradient }}>
          <span className={styles.imagePanelWatermark}>{project.title.toUpperCase()}</span>
          <div className={styles.imagePanelBorder} />
        </div>

        {/* Right: Details */}
        <div ref={detailsRef} className={styles.details}>
          <div className={styles.dateLine}>
            <span>{project.date}</span>
            <span className={styles.dateSep}>—</span>
            <span>{project.tag}</span>
          </div>

          <h2 className={`${styles.title} font-display`}>{project.title}</h2>
          <p className={styles.subtitle}>{project.subtitle}</p>
          <p className={styles.description}>{project.description}</p>

          {/* Metrics */}
          <div className={styles.metrics}>
            {project.metrics.map((m, i) => (
              <div key={i} className={`${styles.metricBlock} metric-block`}>
                <span className={`${styles.metricValue} font-display`}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className={styles.tags}>
            {project.tags.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          {/* Links */}
          <div className={styles.links}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.ghLink}>
              View on GitHub ↗
            </a>
            {isLast && (
              <span className={styles.moreLink}>More Projects ↗</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
