'use client'
import { useEffect } from 'react'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any

    const initLenis = async () => {
      const Lenis = (await import('lenis')).default

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      })

      // We DO NOT use native requestAnimationFrame here.
      // We rely entirely on GSAP's ticker to drive lenis.raf so they are perfectly synced.

      // Bridge Lenis with GSAP ScrollTrigger
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ScrollTrigger.config({ ignoreMobileResize: true })

      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)
    }

    initLenis()

    return () => {
      if (lenis) {
        lenis.destroy()
      }
      import('gsap').then(({ gsap }) => {
        gsap.ticker.remove((time) => {
          if(lenis) lenis.raf(time * 1000)
        })
      })
    }
  }, [])

  return <>{children}</>
}
