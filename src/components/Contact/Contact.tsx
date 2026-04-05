'use client'
import { useRef, useEffect } from 'react'
import { contact } from '@/lib/content'
import styles from './Contact.module.css'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        const ctx = gsap.context(() => {
          gsap.from(['.contact-geo-1','.contact-geo-2','.contact-geo-3'], {
            opacity: 0, stagger: 0.15, duration: 0.5, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
          })
          gsap.from('.contact-heading span', {
            y: 100, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
          })
          gsap.from('.contact-link', {
            y: 20, opacity: 0, stagger: 0.08, duration: 0.5, delay: 0.4, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
          })
        }, sectionRef)
        return () => ctx.revert()
      })
    })
  }, [])

  return (
    <section id="contact" ref={sectionRef} className={styles.contact}>
      {/* Diagonal lines */}
      <svg className={styles.diagLines} width="100%" height="100%" preserveAspectRatio="none">
        <line x1="10%"  y1="0%"   x2="40%"  y2="100%" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        <line x1="25%"  y1="0%"   x2="60%"  y2="100%" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <line x1="45%"  y1="0%"   x2="80%"  y2="100%" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        <line x1="65%"  y1="0%"   x2="100%" y2="75%"  stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <line x1="80%"  y1="0%"   x2="100%" y2="40%"  stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        <line x1="0%"   y1="30%"  x2="25%"  y2="100%" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <line x1="90%"  y1="0%"   x2="55%"  y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      </svg>

      {/* Geometric shapes — echo of loader */}
      <div className={`${styles.triangle} contact-geo-1`} />
      <div className={`${styles.circle} contact-geo-2`} />
      <div className={`${styles.bracket} contact-geo-3`} />

      {/* Main content */}
      <div className={styles.inner}>
        <h2 className={`${styles.heading} contact-heading font-display`}>
          {contact.heading.split('\n').map((line, i) => (
            <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'block' }}>{line}</span>
            </span>
          ))}
        </h2>

        <p className={styles.subheading}>{contact.subheading}</p>

        <div className={styles.links}>
          {contact.links.map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.type === 'link' ? '_blank' : undefined}
              rel={link.type === 'link' ? 'noopener noreferrer' : undefined}
              className={`${styles.contactLink} contact-link`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className={styles.footer}>{contact.footer}</p>
    </section>
  )
}
