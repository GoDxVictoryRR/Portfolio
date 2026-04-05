'use client'

export default function GridBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="grid-bg" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {children}
    </div>
  )
}
