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

          // --- HEADING: Per-character lift from below (Locomotive/agency standard) ---
          gsap.set('.contact-char', { y: '115%' })
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 75%',
            onEnter: () => {
              gsap.to('.contact-char', {
                y: '0%',
                duration: 0.9,
                stagger: 0.04,
                ease: 'power4.out'
              })
            }
          })

          // --- HEADING PARALLAX EXIT: drifts gently upward as you scroll past ---
          gsap.to('.contact-heading-wrap', {
            y: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 2
            }
          })

          // --- SUBHEADING fade up ---
          gsap.set('.contact-subheading', { opacity: 0, y: 18 })
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 70%',
            onEnter: () => {
              gsap.to('.contact-subheading', {
                opacity: 1, y: 0,
                duration: 0.9, delay: 0.55, ease: 'power3.out'
              })
            }
          })

          // --- LINKS: stagger rise ---
          gsap.set('.contact-link', { opacity: 0, y: 20 })
          ScrollTrigger.create({
            trigger: '.contact-links-wrapper',
            start: 'top 88%',
            onEnter: () => {
              gsap.to('.contact-link', {
                opacity: 1, y: 0,
                stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.7
              })
            }
          })

          // --- GEOMETRIC SHAPES ---
          gsap.set(['.contact-geo-1', '.contact-geo-2', '.contact-geo-3'], {
            opacity: 0, scale: 0.7, rotate: -15
          })
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 85%',
            onEnter: () => {
              gsap.to(['.contact-geo-1', '.contact-geo-2', '.contact-geo-3'], {
                opacity: 1, scale: 1, rotate: 0,
                stagger: 0.18, duration: 1.0, ease: 'power3.out'
              })
            }
          })

        }, sectionRef)
        return () => ctx.revert()
      })
    })
  }, [])

  // Split "GET IN TOUCH" into individual character spans
  const chars = 'GET IN TOUCH'.split('')

  return (
    <section id="contact" ref={sectionRef} className={styles.contact}>
      {/* Diagonal lines */}
      <svg className={styles.diagLines} width="100%" height="100%" preserveAspectRatio="none">
        <line x1="10%"  y1="0%"   x2="40%"  y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        <line x1="25%"  y1="0%"   x2="60%"  y2="100%" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
        <line x1="45%"  y1="0%"   x2="80%"  y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        <line x1="65%"  y1="0%"   x2="100%" y2="75%"  stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
        <line x1="80%"  y1="0%"   x2="100%" y2="40%"  stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <line x1="0%"   y1="30%"  x2="25%"  y2="100%" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
        <line x1="90%"  y1="0%"   x2="55%"  y2="100%" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      </svg>

      {/* Geometric shapes */}
      <div className={`${styles.triangle} contact-geo-1`} />
      <div className={`${styles.circle}   contact-geo-2`} />
      <div className={`${styles.bracket}  contact-geo-3`} />

      {/* Main content */}
      <div className={styles.inner}>

        {/* Heading — parallax wrapper */}
        <div className={`${styles.headingWrap} contact-heading-wrap`}>
          <h2 className={`${styles.heading} font-display`}>
            {chars.map((char, i) => (
              <span key={i} className={styles.charOuter}>
                <span className={`${styles.charInner} contact-char`}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <p className={`${styles.subheading} contact-subheading`}>{contact.subheading}</p>

        <div className={`${styles.links} contact-links-wrapper`}>
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
