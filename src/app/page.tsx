'use client'
import { useState, useEffect } from 'react'
import Loader from '@/components/Loader/Loader'
import Nav from '@/components/Nav/Nav'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import Projects from '@/components/Projects/Projects'
import Experience from '@/components/Experience/Experience'
import Contact from '@/components/Contact/Contact'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoading) return

    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    // Skip all scroll-linked scale/clip-path transforms on mobile.
    // CSS transforms on ancestor elements break position:fixed children on Android
    // and cause the scroll compositor to lock up.
    if (isTouchDevice) return

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        const sections = gsap.utils.toArray<HTMLElement>('section[data-section]')

        sections.forEach((section) => {
          gsap.fromTo(section,
            {
              clipPath: 'inset(8% 2% 0% 2% round 24px)',
              scale: 0.96,
            },
            {
              clipPath: 'inset(0% 0% 0% 0% round 0px)',
              scale: 1,
              ease: 'power3.out',
              duration: 1,
              scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                end: 'top 20%',
                scrub: 0.8,
              }
            }
          )
        })
      })
    })
  }, [isLoading])

  return (
    <main>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <Nav />
      <Hero isReady={!isLoading} />
      <About />
      <Projects />
      <Experience />
      <Contact />
    </main>
  )
}
