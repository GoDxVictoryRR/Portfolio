'use client'
import { useRef, useEffect, useState } from 'react'
import { projects } from '@/lib/content'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './Projects.module.css'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const cylinderRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [radius, setRadius] = useState(1800)

  // Detect mobile
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setRadius(mobile ? 1000 : 1800)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Desktop-only: 3D cylinder scroll animation
  useEffect(() => {
    if (isMobile) return // Skip pin/3D on mobile entirely

    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const cylinder = cylinderRef.current
      if (!cylinder) return

      const angleStep = 45
      const totalAngle = -(projects.length - 1) * angleStep

      gsap.to(cylinder, {
        rotateY: totalAngle,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          scrub: 1.2,
          onUpdate: (self) => {
            if (progressLineRef.current) {
              gsap.set(progressLineRef.current, { scaleX: self.progress })
            }
            if (counterRef.current) {
              const index = Math.min(
                projects.length - 1,
                Math.floor(self.progress * projects.length)
              )
              counterRef.current.innerText = `${String(index + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`
            }
          }
        }
      })

      gsap.to('.ghost-text-projects', {
        x: '-8%',
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1
        }
      })

      gsap.fromTo(progressBarRef.current,
        { opacity: 0, y: -10 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [isMobile])

  // Mobile layout: plain vertical cards, no GSAP pin
  if (isMobile) {
    return (
      <section id="projects" ref={sectionRef} className={styles.mobileSection}>
        <div className={styles.mobileSectionHeader}>
          <span className={styles.mobileSectionLabel}>PROJECTS</span>
          <h2 className={styles.mobileSectionTitle}>Selected Work</h2>
        </div>
        {projects.map((project, i) => (
          <div key={i} className={styles.mobileCard}>
            <div
              className={styles.mobileCardImage}
              style={{ background: project.imageGradient }}
            >
              <span className={styles.mobileCardWatermark}>{project.title}</span>
            </div>
            <div className={styles.mobileCardBody}>
              <span className={styles.mobileCardTag}>{project.tag}</span>
              <h3 className={styles.mobileCardTitle}>{project.title}</h3>
              <p className={styles.mobileCardDesc}>{project.description}</p>
              <div className={styles.mobileMetrics}>
                {project.metrics?.map((m, idx) => (
                  <div key={idx} className={styles.mobileMetricBlock}>
                    <span className={`${styles.mobileMetricValue} font-display`}>{m.value}</span>
                    <span className={styles.mobileMetricLabel}>{m.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.mobileTags}>
                {project.tags.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.mobileGhLink}>
                View on GitHub ↗
              </a>
            </div>
          </div>
        ))}
      </section>
    )
  }

  // Desktop layout: 3D cylinder carousel
  return (
    <section id="projects" ref={sectionRef} className={styles.carouselSection}>
      <div className={styles.viewport}>
        <span className={`${styles.ghostText} ghost-text-projects`}>
          PROJECTS
        </span>

        <div ref={progressBarRef} className={styles.progressBar}>
          <div ref={progressLineRef} className={styles.progressLine} />
          <div className={styles.progressMeta}>
            <span className={styles.progressLabel}>PROJECTS</span>
            <span ref={counterRef} className={styles.progressCounter}>
              01 / {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className={styles.cylinderOrigin} style={{ transform: `translateZ(-${radius}px)` }}>
          <div ref={cylinderRef} className={styles.cylinder}>
            {projects.map((project, i) => {
              const angle = i * 45
              return (
                <div
                  key={i}
                  className={styles.projectPanelWrapper}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  }}
                >
                  <div className={`${styles.projectPanel} project-panel`}>
                    <div
                      className={styles.imagePanel}
                      style={{ background: project.imageGradient }}
                    >
                      <div className={styles.imagePanelBorder} />
                      <span className={styles.imagePanelWatermark}>
                        {project.title}
                      </span>
                    </div>

                    <div className={styles.details}>
                      <div className={styles.dateLine}>
                        <span className={styles.date}>{project.date}</span>
                        <span className={styles.dateSep}>/</span>
                        <span className={styles.subtitle}>{project.subtitle}</span>
                      </div>

                      <h2 className={`${styles.title} font-display`}>
                        {project.title}
                      </h2>

                      <p className={styles.description}>
                        {project.description}
                      </p>

                      <div className={styles.metrics}>
                        {project.metrics?.map((h: { value: string; label: string }, idx: number) => (
                          <div key={idx} className={styles.metricBlock}>
                            <span className={`${styles.metricValue} font-display`}>{h.value}</span>
                            <span className={styles.metricLabel}>{h.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className={styles.tags}>
                        {project.tags.map(t => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </div>

                      <div className={styles.links}>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.ghLink}>
                          View on GitHub ↗
                        </a>
                        <span className={styles.moreLink}>More Projects ↗</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
