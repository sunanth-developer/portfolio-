import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'
import { site } from '@/data/site'
import { useIsFinePointer, useReducedMotion } from '@/hooks/useMediaQuery'

export function Hero() {
  const { goTo, setAccessOpen, setCursor } = useApp()
  const reduced = useReducedMotion()
  const fine = useIsFinePointer()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 36, damping: 22 })
  const y = useSpring(my, { stiffness: 36, damping: 22 })
  const [clock, setClock] = useState('00:00:00')

  useEffect(() => {
    const tick = () => setClock(new Date().toISOString().slice(11, 19))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!fine || reduced) return
    const onMove = (event: MouseEvent) => {
      mx.set((event.clientX / window.innerWidth - 0.5) * 48)
      my.set((event.clientY / window.innerHeight - 0.5) * 32)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [fine, mx, my, reduced])

  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-10 md:px-8 md:pb-14">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[-12%] left-[12%] h-[48vw] w-[48vw] rounded-full"
        style={{
          x,
          y,
          background: 'radial-gradient(circle, rgba(78,124,255,0.16) 0%, transparent 68%)',
        }}
      />
      <div className="absolute top-28 left-5 hidden text-[10px] tracking-[0.22em] text-muted uppercase md:block">
        <p>SYS {clock}</p>
        <p className="mt-2">HYD 17.3850° N</p>
      </div>

      <div className="relative z-10">
        <p className="eyebrow mb-6 text-accent">Founder × Developer</p>
        <h1 className="display text-[19vw] md:text-[11.5vw]">
          {['I BUILD', 'THINGS', 'THAT MOVE.'].map((line, index) => (
            <span key={line} className="clip-text block">
              <motion.span
                className="block"
                initial={reduced ? false : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: reduced ? 0 : 1, delay: 0.05 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <p className="mt-8 max-w-lg text-base text-muted md:text-lg">
          I build products from idea to production — combining product thinking, engineering and entrepreneurship.
        </p>
        <p className="mt-4 text-xs tracking-[0.2em] text-muted uppercase">{site.locationShort}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <MagneticButton cursor="explore" onClick={() => goTo('/work', '02', 'Work')}>
            Explore the work →
          </MagneticButton>
          <MagneticButton variant="ghost" cursor="view" onClick={() => goTo('/lab', '05', 'Lab')}>
            Enter the lab
          </MagneticButton>
        </div>
      </div>

      <div className="relative z-10 mt-14 flex items-end justify-between">
        <button
          type="button"
          className="border border-line px-4 py-3 text-left"
          onClick={() => setAccessOpen(true)}
          onMouseEnter={() => setCursor('open')}
          onMouseLeave={() => setCursor('default')}
        >
          <span className="eyebrow text-accent">Access 01</span>
          <span className="mt-1 block text-sm">Open the layer</span>
        </button>
        <div className="flex flex-col items-center gap-2 text-[10px] tracking-[0.22em] text-muted uppercase">
          <span>Scroll</span>
          <ArrowDown size={14} aria-hidden />
        </div>
      </div>
    </section>
  )
}
