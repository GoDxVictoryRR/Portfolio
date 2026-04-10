'use client'
import { useRef, useEffect, useState } from 'react'
import { projects } from '@/lib/content'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './Projects.module.css'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Pin the section for the duration of its height
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${projects.length * 100}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const index = Math.min(
            projects.length - 1,
            Math.floor(self.progress * projects.length)
          )
          setActiveIndex(index)

          window.dispatchEvent(new CustomEvent('projectScroll', {
            detail: { progress: self.progress }
          }))
        }
      })

      // Ghost text parallax
      gsap.to('.ghost-text-projects', {
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
      gsap.set(`.${styles.imagePanel}`, { opacity: 0, x: -80 })
      gsap.set(`.${styles.details}`, { opacity: 0, x: 80 })
      gsap.set(`.${styles.metrics} > *`, { opacity: 0, y: 20 })
      gsap.set(`.${styles.tags} .tag`, { opacity: 0, y: 15 })

      // ScrollTrigger to reveal
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(`.${styles.imagePanel}`, { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' })
          gsap.to(`.${styles.details}`, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 })
          gsap.to(`.${styles.metrics} > *`, { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out' })
          gsap.to(`.${styles.tags} .tag`, { opacity: 1, y: 0, stagger: 0.04, duration: 0.3, ease: 'power2.out' })
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const activeProject = projects[activeIndex] || projects[0]

  return (
    <section id="projects" ref={sectionRef} className={styles.carouselSection}>
      {/* Ghost text background */}
      <span className={`${styles.ghostText} ghost-text-projects`}>
        PROJECTS
      </span>

      {/* Main Content Split Area */}
      <div className={styles.content}>
        
        {/* Left Side: 55% Animated Panel */}
        <div className={styles.imagePanel} style={{ background: activeProject.imageGradient }}>
          <div className={styles.imagePanelBorder} />
          <span className={styles.imagePanelWatermark}>
            {activeProject.title}
          </span>
        </div>

        {/* Right Side: 45% Project Details */}
        <div className={styles.details}>
          <div className={styles.dateLine}>
            <span className={styles.date}>{activeProject.date}</span>
            <span className={styles.dateSep}>/</span>
            <span className={styles.subtitle}>{activeProject.subtitle}</span>
          </div>

          <h2 className={`${styles.title} font-display`}>
            {activeProject.title}
          </h2>

          <p className={styles.description}>
            {activeProject.description}
          </p>

          {/* Metrics Row */}
          <div className={styles.metrics}>
            {activeProject.metrics?.map((h: { value: string; label: string }, i: number) => (
              <div key={i} className={styles.metricBlock}>
                <span className={`${styles.metricValue} font-display`}>{h.value}</span>
                <span className={styles.metricLabel}>{h.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.tags}>
            {activeProject.tags.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <div className={styles.links}>
            <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className={styles.ghLink}>
              View on GitHub ↗
            </a>
            <span className={styles.moreLink}>More Projects ↗</span>
          </div>
        </div>
      </div>

      <span className="section-label" style={{ top: '50%', left: '40px', transform: 'translateY(-50%)' }}>— PROJECTS</span>
    </section>
  )
}
