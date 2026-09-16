import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { developerFocus, founderFocus, site } from '@/data/site'
import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/hooks/useMediaQuery'

export default function Home() {
  const { enterProfile, setCursor } = useApp()
  const reduced = useReducedMotion()
  const [hover, setHover] = useState<'founder' | 'developer' | null>(null)

  return (
    <section className="relative flex min-h-svh flex-col overflow-x-clip">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[8%] left-[-18%] h-[55vw] w-[55vw] rounded-full"
        animate={{ opacity: hover === 'founder' ? 0.85 : 0 }}
        transition={{ duration: reduced ? 0 : 0.5 }}
        style={{ background: 'radial-gradient(circle, rgba(255,90,54,0.16) 0%, transparent 68%)' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-18%] bottom-[4%] h-[55vw] w-[55vw] rounded-full"
        animate={{ opacity: hover === 'developer' ? 0.85 : 0 }}
        transition={{ duration: reduced ? 0 : 0.5 }}
        style={{ background: 'radial-gradient(circle, rgba(99,245,194,0.12) 0%, transparent 68%)' }}
      />

      <p className="relative z-10 px-5 pt-page text-center font-mono text-[11px] tracking-[0.32em] text-muted uppercase md:px-8">
        {site.statement}
      </p>

      <div className="relative z-10 mt-6 grid flex-1 lg:mt-4 lg:grid-cols-[1fr_5.5rem_1fr]">
        <button
          type="button"
          className={cn(
            'flex min-h-[22rem] flex-col justify-between px-5 py-8 text-left md:min-h-[26rem] md:px-8 md:py-12 lg:pr-14',
            hover === 'founder' && 'text-fg',
          )}
          onMouseEnter={() => {
            setHover('founder')
            setCursor('explore')
          }}
          onMouseLeave={() => {
            setHover(null)
            setCursor('default')
          }}
          onFocus={() => setHover('founder')}
          onBlur={() => setHover(null)}
          onClick={() => enterProfile('founder')}
        >
          <div>
            <p
              className={cn(
                'font-mono text-[11px] tracking-[0.28em] uppercase transition-colors',
                hover === 'founder' ? 'text-founder' : 'text-meta',
              )}
            >
              01
            </p>
            <h2 className="display mt-5 text-[12vw] md:text-6xl lg:text-[5.6rem]">
              Founder
              <br />
              Perspective
            </h2>
            <p className="mt-6 max-w-sm text-base text-muted md:text-lg">
              Building products, businesses and real-world impact.
            </p>
          </div>
          <div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.22em] text-meta uppercase">
              {founderFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p
              className={cn(
                'group mt-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase',
                hover === 'founder' ? 'text-founder' : 'text-fg',
              )}
            >
              Explore founder profile
              <span className="btn-arrow">→</span>
            </p>
          </div>
        </button>

        <div className="relative hidden items-stretch justify-center lg:flex" aria-hidden>
          <div className="mx-auto h-full w-px bg-line" />
          <div className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg font-display text-lg tracking-[0.18em]">
            {site.monogram}
          </div>
        </div>

        <div className="flex items-center gap-4 px-5 lg:hidden" aria-hidden>
          <span className="h-px flex-1 bg-line" />
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-display text-sm">
            {site.monogram}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <button
          type="button"
          className="flex min-h-[22rem] flex-col justify-between px-5 py-8 text-left md:min-h-[26rem] md:px-8 md:py-12 lg:pl-14"
          onMouseEnter={() => {
            setHover('developer')
            setCursor('explore')
          }}
          onMouseLeave={() => {
            setHover(null)
            setCursor('default')
          }}
          onFocus={() => setHover('developer')}
          onBlur={() => setHover(null)}
          onClick={() => enterProfile('developer')}
        >
          <div>
            <p
              className={cn(
                'font-mono text-[11px] tracking-[0.28em] uppercase transition-colors',
                hover === 'developer' ? 'text-developer' : 'text-meta',
              )}
            >
              02
            </p>
            <h2 className="display mt-5 text-[12vw] md:text-6xl lg:text-[5.6rem]">
              Developer
              <br />
              Perspective
            </h2>
            <p className="mt-6 max-w-sm text-base text-muted md:text-lg">Turning ideas into working systems.</p>
          </div>
          <div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.22em] text-meta uppercase">
              {developerFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p
              className={cn(
                'group mt-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase',
                hover === 'developer' ? 'text-developer' : 'text-fg',
              )}
            >
              Explore developer profile
              <span className="btn-arrow">→</span>
            </p>
          </div>
        </button>
      </div>

      <p className="relative z-10 px-5 py-5 font-mono text-[10px] tracking-[0.22em] text-meta uppercase md:px-8">
        Same mind. Different lenses. Bigger possibilities.
      </p>
    </section>
  )
}
