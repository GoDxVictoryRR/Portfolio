'use client'
import Link from 'next/link'
import { navLinks, navCTA } from '@/lib/content'
import styles from './Nav.module.css'

export default function Nav() {
  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <Link href="/" className={styles.logo}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginRight: '8px' }}>
          <path d="M12 3L22 20H2L12 3Z" />
          <path d="M12 8L18 18H6L12 8Z" opacity="0.3" />
        </svg>
        HARDIK
      </Link>

      {/* Center links */}
      <ul className={styles.links}>
        {navLinks.map(link => (
          <li key={link.label}>
            <a href={link.href} className={styles.link}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right: CTA + audio bars */}
      <div className={styles.right}>
        <a href={navCTA.href} className={styles.cta}>
          {navCTA.label}
        </a>
        <div className="audio-bars" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}
