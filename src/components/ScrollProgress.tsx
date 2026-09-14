import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? window.scrollY / height : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 md:flex"
      aria-hidden
    >
      <div className="flex flex-col items-center gap-2 text-[9px] tracking-[0.2em] text-muted">
        <span>01</span>
        <div className="relative h-24 w-px bg-line">
          <div
            className="absolute top-0 left-0 w-full origin-top bg-accent"
            style={{ height: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <span>07</span>
      </div>
    </div>
  )
}
