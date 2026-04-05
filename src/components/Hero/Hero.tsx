'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { hero } from '@/lib/content'
import QuaternionPanel from './QuaternionPanel'
import MaterialPanel from './MaterialPanel'
import GridBackground from '@/components/shared/GridBackground'
import PlusMarkers from '@/components/shared/PlusMarkers'
import styles from './Hero.module.css'
import type { CrystalHRef } from './CrystalH'

const CrystalH = dynamic(() => import('./CrystalH'), { ssr: false })

export default function Hero() {
  const crystalRef = useRef<CrystalHRef>(null)
  const [quaternion, setQuaternion] = useState({ x: 0, y: 0, z: 0, w: 1 })

  const handleQuaternionUpdate = useCallback((q: { x: number; y: number; z: number; w: number }) => {
    setQuaternion(q)
  }, [])

  const handleReset = useCallback(() => {
    crystalRef.current?.resetQuaternion()
  }, [])

  return (
    <section id="hero" className={styles.hero}>
      {/* Background */}
      <GridBackground>
        <PlusMarkers />
      </GridBackground>

      {/* Three.js Crystal */}
      <div className={styles.canvasWrapper} id="crystal-canvas-wrapper">
        <CrystalH
          ref={crystalRef}
          onQuaternionUpdate={handleQuaternionUpdate}
        />
      </div>

      {/* Name text — sits above canvas */}
      <div className={styles.nameWrapper}>
        <h1 className={`${styles.name} font-display hero-name-line-1`}>
          {hero.nameLine1}
        </h1>
        <div className={`${styles.name} font-display hero-name-line-2`}>
          {hero.nameLine2}
        </div>
        <p className={`${styles.role} font-mono hero-role`}>
          {hero.role}
        </p>
      </div>

      {/* Quaternion Panel — top right */}
      <div className={`${styles.panelTR} quaternion-panel`}>
        <QuaternionPanel quaternion={quaternion} onReset={handleReset} />
      </div>

      {/* Material Panel — bottom left */}
      <div className={`${styles.panelBL} material-panel`}>
        <MaterialPanel
          onRoughnessChange={v => crystalRef.current?.updateRoughness(v)}
          onNoiseScaleChange={v => crystalRef.current?.updateNoiseScale(v)}
          onColorChange={hex => crystalRef.current?.updateColor(hex)}
        />
      </div>
    </section>
  )
}
