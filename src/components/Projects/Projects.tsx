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
          // Calculate which project is active based on scroll progress
          const index = Math.min(
            projects.length - 1,
            Math.floor(self.progress * projects.length)
          )
          setActiveIndex(index)
          
          // Smooth parallax for Ghost Text
          gsap.to('.ghost-text-projects', {
            y: -self.progress * 200, // Move up as we scroll
            duration: 0.5,
            overwrite: 'auto'
          })

          // Dispatch custom event to notify BackgroundScene to rotate carousel
          window.dispatchEvent(new CustomEvent('projectScroll', { 
            detail: { progress: self.progress } 
          }))
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
