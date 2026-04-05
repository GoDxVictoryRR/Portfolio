'use client'

const MARKERS = [
  { top: '12%',  left: '8%'  },
  { top: '28%',  left: '22%' },
  { top: '55%',  left: '6%'  },
  { top: '75%',  left: '18%' },
  { top: '15%',  left: '78%' },
  { top: '35%',  left: '88%' },
  { top: '62%',  left: '82%' },
  { top: '82%',  left: '72%' },
  { top: '45%',  left: '48%' },
  { top: '90%',  left: '40%' },
  { top: '8%',   left: '55%' },
  { top: '70%',  left: '95%' },
]

export default function PlusMarkers() {
  return (
    <>
      {MARKERS.map((pos, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: pos.top,
            left: pos.left,
            fontFamily: "'Space Mono', monospace",
            fontSize: '13px',
            color: 'rgba(255,255,255,0.12)',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 1,
            lineHeight: 1,
          }}
        >
          +
        </span>
      ))}
    </>
  )
}
