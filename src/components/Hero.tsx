import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'
import { identitySignals, site } from '@/data/site'
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
      mx.set((event.clientX / window.innerWidth - 0.5) * 36)
      my.set((event.clientY / window.innerHeight - 0.5) * 24)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [fine, mx, my, reduced])

  const lines = [
    { text: 'I BUILD', delay: 0.28 },
    { text: 'THINGS', delay: 0.52 },
    { text: 'THAT MOVE.', delay: 0.78, signal: true },
  ]

  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-x-clip px-5 pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-8 md:pb-12">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[-18%] left-[8%] h-[52vw] w-[52vw] rounded-full"
        style={{
          x,
          y,
          background: 'radial-gradient(circle, rgba(255,90,54,0.12) 0%, transparent 68%)',
        }}
      />
      <div className="absolute top-28 right-8 hidden text-right text-[10px] tracking-[0.22em] text-meta uppercase md:block">
        <p>SYS {clock}</p>
        <p className="mt-2">HYD 17.3850° N</p>
      </div>

      <div className="relative z-10">
        <motion.p
          className="eyebrow mb-5 text-accent"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Founder × Developer
        </motion.p>
        <h1 className="display flex flex-col gap-[0.12em] text-[11vw] leading-none sm:text-[13vw] md:text-[10.5vw] md:gap-0 md:leading-[0.86]">
          {lines.map((line) => (
            <span key={line.text} className="clip-text block">
              <motion.span
                className="relative block"
                initial={reduced ? false : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : line.delay, ease: [0.16, 1, 0.3, 1] }}
              >
                {line.signal ? (
                  <>
                    THAT{' '}
                    <span className="relative inline-block">
                      MOVE
                      <motion.span
                        aria-hidden
                        className="absolute right-0 -bottom-1 left-0 h-px bg-accent"
                        initial={reduced ? false : { scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: reduced ? 0 : 1.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </span>
                    .
                  </>
                ) : (
                  line.text
                )}
              </motion.span>
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-lg text-base text-muted md:text-lg">
          I take products from the first problem definition through architecture, code, deployment and iteration —
          combining product thinking, engineering and entrepreneurship.
        </p>
        <p className="mt-3 text-xs tracking-[0.2em] text-meta uppercase">{site.locationShort}</p>
        <div className="mt-8 grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
          {identitySignals.map((signal, index) => (
            <motion.div
              key={signal.kicker}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 1.05 + index * 0.12, duration: 0.45 }}
            >
              <p className="text-[10px] tracking-[0.2em] text-accent uppercase">{signal.kicker}</p>
              <p className="mt-2 font-display text-sm tracking-[0.04em] uppercase md:text-base">{signal.line}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <MagneticButton cursor="explore" onClick={() => goTo('/work', '02', 'Work')}>
            Explore the work →
          </MagneticButton>
          <MagneticButton variant="ghost" cursor="view" onClick={() => goTo('/lab', '05', 'Lab')}>
            Enter the lab
          </MagneticButton>
        </div>
      </div>

      <div className="relative z-10 mt-10 flex items-end justify-between">
        <button
          type="button"
          className="min-h-11 border border-line bg-surface px-4 py-3 text-left"
          onClick={() => setAccessOpen(true)}
          onMouseEnter={() => setCursor('open')}
          onMouseLeave={() => setCursor('default')}
        >
          <span className="eyebrow text-accent">Access 01</span>
          <span className="mt-1 block text-sm">Open the layer</span>
        </button>
        <div className="flex flex-col items-center gap-2 text-[10px] tracking-[0.22em] text-meta uppercase">
          <span>Scroll</span>
          <ArrowDown size={14} aria-hidden />
        </div>
      </div>
    </section>
  )
}
