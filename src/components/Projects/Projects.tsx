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
  const [radius, setRadius] = useState(1800)

  // Handle responsive radius
  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 1000 : 1800)
    }
    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const cylinder = cylinderRef.current
      if (!cylinder) return

      const angleStep = 45
      const totalAngle = -(projects.length - 1) * angleStep

      // Pin THIS section itself for the carousel rotation
      // The outer parallax wrapper uses pinSpacing: false so it doesn't conflict
      gsap.to(cylinder, {
        rotateY: totalAngle,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%', // 200% of viewport height of scrub travel
          pin: true,
          anticipatePin: 1,
          pinSpacing: true, // needs its own spacing to push content below
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

      // Ghost text fades as carousel rotates
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

      // Progress bar entrance
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
  }, [])

  return (
    <section id="projects" ref={sectionRef} className={styles.carouselSection}>
      {/* 3D Perspective Viewport */}
      <div className={styles.viewport}>

        {/* Ghost watermark */}
        <span className={`${styles.ghostText} ghost-text-projects`}>
          PROJECTS
        </span>

        {/* Scroll Progress Bar */}
        <div ref={progressBarRef} className={styles.progressBar}>
          <div ref={progressLineRef} className={styles.progressLine} />
          <div className={styles.progressMeta}>
            <span className={styles.progressLabel}>PROJECTS</span>
            <span ref={counterRef} className={styles.progressCounter}>
              01 / {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Rotating 3D Cylinder */}
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

                    {/* Left: Image Panel */}
                    <div
                      className={styles.imagePanel}
                      style={{ background: project.imageGradient }}
                    >
                      <div className={styles.imagePanelBorder} />
                      <span className={styles.imagePanelWatermark}>
                        {project.title}
                      </span>
                    </div>

                    {/* Right: Details */}
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
