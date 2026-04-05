'use client'
import { achievements } from '@/lib/content'
import styles from './Marquee.module.css'

export default function Marquee() {
  // Duplicate for seamless loop
  const items = [...achievements, ...achievements]
  return (
    <div className={styles.marqueeOuter}>
      <div className={styles.marqueeTrack}>
        {items.map((a, i) => (
          <span key={i} className={styles.item}>
            {a}<span className={styles.sep}> ◆ </span>
          </span>
        ))}
      </div>
    </div>
  )
}
