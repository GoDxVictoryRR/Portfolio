'use client'
import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

interface QuaternionValue {
  x: number
  y: number
  z: number
  w: number
}

interface QuaternionPanelProps {
  quaternion: QuaternionValue
  onReset: () => void
}

function fmt(n: number): string {
  const str = n.toFixed(2)
  const sign = n >= 0 ? ' ' : '-'
  const val = Math.abs(n).toFixed(2)
  const noZero = val.startsWith('0.') ? val.substring(1) : val
  return sign + noZero
}

export default function QuaternionPanel({ quaternion, onReset }: QuaternionPanelProps) {
  return (
    <div className={styles.quaternionPanel} suppressHydrationWarning>
      <div className={styles.panelHeader}>
        <span>MainLogo Quaternion</span>
        <span className={styles.pauseIcon}>❙❙</span>
      </div>
      <div className={styles.quaternionRow}>
        <span className={styles.toggleDot}></span>
        <span className={styles.quaternionValues}>
          <span>{fmt(quaternion.x)}</span>
          <span>{fmt(quaternion.y)}</span>
          <span>{fmt(quaternion.z)}</span>
          <span>{fmt(quaternion.w)}</span>
        </span>
      </div>
      <div className={styles.panelSep} />
      <div className={styles.quaternionLabels}>
        <span>X</span>
        <span>Y</span>
        <span>Z</span>
        <span>W</span>
      </div>
      {/* Arcball widget embedded below */}
      <ArcballWidget quaternion={quaternion} />
      <button className={styles.resetBtn} onClick={onReset} suppressHydrationWarning>
        Reset Quaternion
      </button>
    </div>
  )
}

function ArcballWidget({ quaternion }: { quaternion: QuaternionValue }) {
  const isDragging = useRef(false)
  const prevPos = useRef({ x: 0, y: 0 })

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true
    prevPos.current = { x: e.clientX, y: e.clientY }
  }

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!isDragging.current) return
      const dx = (e.clientX - prevPos.current.x) * 0.5
      const dy = (e.clientY - prevPos.current.y) * 0.5
      
      window.dispatchEvent(new CustomEvent('arcballDrag', { 
        detail: { dx, dy } 
      }))
      
      prevPos.current = { x: e.clientX, y: e.clientY }
    }

    function onMouseUp() {
      isDragging.current = false
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  // Extract euler-ish angles for visual rings
  const rx = Math.asin(2 * (quaternion.w * quaternion.x - quaternion.z * quaternion.y)) * (180 / Math.PI)
  const ry = Math.atan2(2 * (quaternion.w * quaternion.y + quaternion.x * quaternion.z), 1 - 2 * (quaternion.y * quaternion.y + quaternion.x * quaternion.x)) * (180 / Math.PI)
  const rz = Math.atan2(2 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y), 1 - 2 * (quaternion.z * quaternion.z + quaternion.x * quaternion.x)) * (180 / Math.PI)

  return (
    <div className={styles.arcball} onMouseDown={onMouseDown} style={{ cursor: 'grab' }}>
      <svg width="80" height="80" viewBox="0 0 80 80" style={{ pointerEvents: 'none' }}>
        {/* Outer circle */}
        <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        {/* Z axis ring (blue) */}
        <ellipse
          cx="40" cy="40" rx="36" ry="36"
          fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.7"
          transform={`rotate(${rz}, 40, 40)`}
          style={{ transformOrigin: '40px 40px' }}
        />
        {/* Y axis ring (green) */}
        <ellipse
          cx="40" cy="40" rx="36" ry="12"
          fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.7"
          transform={`rotate(${ry}, 40, 40)`}
          style={{ transformOrigin: '40px 40px' }}
        />
        {/* X axis ring (red) */}
        <ellipse
          cx="40" cy="40" rx="12" ry="36"
          fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.7"
          transform={`rotate(${rx}, 40, 40)`}
          style={{ transformOrigin: '40px 40px' }}
        />
        {/* Center dot */}
        <circle cx="40" cy="40" r="3" fill="white" />
      </svg>
    </div>
  )
}
