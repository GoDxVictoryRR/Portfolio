'use client'
import { useEffect, useRef } from 'react'

export default function BackgroundRoom() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true

    let isAttempting = false
    const attemptPlay = () => {
      if (video.paused && !isAttempting) {
        isAttempting = true
        video.play()
          .then(() => { isAttempting = false })
          .catch(() => { isAttempting = false })
      }
    }

    // Initial attempt
    attemptPlay()

    // Resume playback if browser paused it (e.g. Battery Saver mode)
    window.addEventListener('click', attemptPlay)
    window.addEventListener('touchstart', attemptPlay, { passive: true })

    return () => {
      window.removeEventListener('click', attemptPlay)
      window.removeEventListener('touchstart', attemptPlay)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#000000', // fallback color
      }}
    >
      <video
        id="bg-video"
        ref={videoRef}
        src="/background_optimized.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        onEnded={(e) => {
          const v = e.currentTarget;
          v.currentTime = 0;
          v.play().catch(() => {});
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: 1000,
          opacity: 1, 
        }}
      />
    </div>
  )
}