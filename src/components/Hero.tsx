import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useEffect } from 'react'
import { hero } from '@/data/site'
import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'
import { useIsFinePointer, useReducedMotion } from '@/hooks/useMediaQuery'

export function Hero() {
  const { goTo, setAccessOpen, setCursor } = useApp()
  const reduced = useReducedMotion()
  const fine = useIsFinePointer()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 40, damping: 20 })
  const y = useSpring(my, { stiffness: 40, damping: 20 })

  useEffect(() => {
    if (!fine || reduced) return
    const onMove = (event: MouseEvent) => {
      mx.set((event.clientX / window.innerWidth - 0.5) * 40)
      my.set((event.clientY / window.innerHeight - 0.5) * 28)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [fine, mx, my, reduced])

  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-16 md:px-10 md:pb-20">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] left-[8%] h-[50vw] w-[50vw] rounded-full"
        style={{
          x,
          y,
          background:
            'radial-gradient(circle, rgba(122,140,255,0.18) 0%, rgba(122,140,255,0.04) 42%, transparent 70%)',
        }}
        animate={reduced ? undefined : { opacity: [0.45, 0.8, 0.45], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="pointer-events-none absolute top-28 right-6 hidden font-display text-[10px] tracking-[0.24em] text-muted uppercase md:block">
        <p>HYD 17.3850° N</p>
        <p className="mt-2">SYS · LIVE</p>
      </div>

      <div className="relative z-10 max-w-[92rem]">
        <p className="eyebrow mb-8 text-accent">{hero.secondary}</p>
        <h1 className="display-title text-[18vw] text-fg sm:text-[14vw] md:text-[10.5vw]">
          {hero.headline.map((line, index) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduced ? false : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.08 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {hero.supporting}
        </p>
        <p className="mt-4 text-sm tracking-[0.18em] text-muted uppercase">{hero.location}</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <MagneticButton
            onClick={() => {
              document.getElementById('ventures')?.scrollIntoView({ behavior: 'smooth' })
            }}
            cursor="explore"
          >
            {hero.primaryCta} →
          </MagneticButton>
          <MagneticButton variant="ghost" cursor="view" onClick={() => goTo('/lab', '05', 'Lab')}>
            {hero.secondaryCta}
          </MagneticButton>
        </div>
      </div>

      <div className="relative z-10 mt-16 flex items-end justify-between">
        <button
          type="button"
          className="border border-line px-4 py-3 text-left"
          onClick={() => setAccessOpen(true)}
          onMouseEnter={() => setCursor('open')}
          onMouseLeave={() => setCursor('default')}
        >
          <span className="eyebrow text-accent">Access 01</span>
          <span className="mt-1 block font-display text-sm">Open the layer</span>
        </button>
        <div className="flex flex-col items-center gap-3 text-[10px] tracking-[0.24em] text-muted uppercase">
          <span>Scroll</span>
          <ArrowDown size={14} aria-hidden />
        </div>
      </div>
    </section>
  )
}
