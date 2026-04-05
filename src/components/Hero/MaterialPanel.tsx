'use client'
import { useState } from 'react'
import styles from './Hero.module.css'

interface MaterialPanelProps {
  onRoughnessChange: (val: number) => void
  onNoiseScaleChange: (val: number) => void
  onColorChange: (hex: string) => void
}

export default function MaterialPanel({ onRoughnessChange, onNoiseScaleChange, onColorChange }: MaterialPanelProps) {
  const [roughness, setRoughness] = useState(0.10)
  const [noiseScale, setNoiseScale] = useState(9.0)
  const [color, setColor] = useState('#ffffff')

  function rgbStr(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `{r: ${r}, g: ${g}, b: ${b}}`
  }

  return (
    <div className={styles.materialPanel}>
      <div className={styles.panelHeader}>
        <span>MainLogo Material</span>
        <span className={styles.pauseIcon}>❙❙</span>
      </div>

      {/* Roughness */}
      <div className={styles.sliderRow}>
        <span className={styles.sliderLabel}>roughness</span>
        <input
          type="range"
          min={0} max={1} step={0.01}
          value={roughness}
          className={styles.slider}
          onChange={e => {
            const v = parseFloat(e.target.value)
            setRoughness(v)
            onRoughnessChange(v)
          }}
        />
        <span className={styles.sliderValue}>{roughness.toFixed(2)}</span>
      </div>

      {/* NoiseScale */}
      <div className={styles.sliderRow}>
        <span className={styles.sliderLabel}>noiseScale</span>
        <input
          type="range"
          min={1} max={20} step={0.1}
          value={noiseScale}
          className={styles.slider}
          onChange={e => {
            const v = parseFloat(e.target.value)
            setNoiseScale(v)
            onNoiseScaleChange(v)
          }}
        />
        <span className={styles.sliderValue}>{noiseScale.toFixed(1)}</span>
      </div>

      {/* Color */}
      <div className={styles.sliderRow}>
        <span className={styles.sliderLabel}>color</span>
        <label className={styles.colorSwatch} style={{ background: color }}>
          <input
            type="color"
            value={color}
            style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
            onChange={e => {
              setColor(e.target.value)
              onColorChange(e.target.value)
            }}
          />
        </label>
        <span className={styles.sliderValue} style={{ fontSize: '9px' }}>{rgbStr(color)}</span>
      </div>
    </div>
  )
}
