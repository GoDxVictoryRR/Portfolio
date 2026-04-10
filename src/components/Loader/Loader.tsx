'use client'
import { useEffect, useRef } from 'react'
import styles from './Loader.module.css'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const triangleRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const bracketRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline()

      tl.to(triangleRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.1)
        .to(circleRef.current,   { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.25)
        .to(bracketRef.current,  { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.4)

      tl.to(topRef.current,    { y: '-100%', duration: 0.7, ease: 'power3.inOut' }, '+=1.8')
        .to(bottomRef.current, { y: '100%',  duration: 0.7, ease: 'power3.inOut' }, '-=0.7')
        .to([triangleRef.current, circleRef.current, bracketRef.current], {
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in'
        }, '-=0.6')
        .call(() => onComplete(), [], '+=0.1')
    })
  }, [onComplete])

  return (
    <div className={styles.loader}>
      {/* Top half */}
      <div ref={topRef} className={styles.loaderTop}>
        <svg ref={linesRef} className={styles.lines} width="100%" height="100%" preserveAspectRatio="none">
          <line x1="10%"  y1="0%"   x2="40%"  y2="100%" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
          <line x1="20%"  y1="0%"   x2="55%"  y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          <line x1="35%"  y1="0%"   x2="70%"  y2="100%" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
          <line x1="50%"  y1="0%"   x2="85%"  y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          <line x1="65%"  y1="0%"   x2="100%" y2="80%"  stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
          <line x1="80%"  y1="0%"   x2="100%" y2="50%"  stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          <line x1="0%"   y1="20%"  x2="30%"  y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          <line x1="90%"  y1="0%"   x2="60%"  y2="100%" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
          <line x1="100%" y1="30%"  x2="70%"  y2="100%" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        </svg>

        {/* Triangle — bottom-left */}
        <div ref={triangleRef} className={styles.triangle} />

        {/* Dashed circle — center */}
        <div ref={circleRef} className={styles.circle} />

        {/* L-bracket — top-right */}
        <div ref={bracketRef} className={styles.bracket} />
      </div>

      {/* Bottom half */}
      <div ref={bottomRef} className={styles.loaderBottom} />
    </div>
  )
}
