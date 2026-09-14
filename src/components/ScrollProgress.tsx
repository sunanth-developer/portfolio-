import { useEffect, useState } from 'react'
import { useApp } from '@/context/AppContext'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const { unlock, found, setCursor } = useApp()

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
    <div className="fixed top-0 right-0 left-0 z-50">
      <div className="h-[2px] bg-transparent" aria-hidden>
        <div
          className="h-full origin-left bg-accent transition-none"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <button
        type="button"
        className="absolute top-5 right-5 hidden items-center gap-2 font-display text-[10px] tracking-[0.28em] text-muted/70 md:flex"
        aria-label="Lock frequency signal"
        onMouseEnter={() => setCursor('open')}
        onMouseLeave={() => setCursor('default')}
        onClick={() => unlock('signal')}
      >
        <span
          className="h-1.5 w-1.5 rounded-full bg-accent"
          style={{ opacity: found.includes('signal') ? 1 : 0.45 }}
        />
        FREQ
      </button>
    </div>
  )
}
