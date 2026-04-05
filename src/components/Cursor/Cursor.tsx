'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let rafId: number

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function animate() {
      // Dot follows instantly
      dot!.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`

      // Ring lerps with lag
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring!.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`

      rafId = requestAnimationFrame(animate)
    }
    animate()
    window.addEventListener('mousemove', onMouseMove)

    // Hover effects on interactive elements
    function addHover(el: Element) {
      el.addEventListener('mouseenter', () => ring!.classList.add('hover'))
      el.addEventListener('mouseleave', () => ring!.classList.remove('hover'))
    }

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor], input[type="range"], input[type="color"], label').forEach(addHover)
    })
    observer.observe(document.body, { childList: true, subtree: true })
    document.querySelectorAll('a, button, [data-cursor], input[type="range"], input[type="color"], label').forEach(addHover)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
