import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { driverspot } from '@/data/driverspot'
import { dsEase } from '@/lib/ds'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { DsLockup, DsReveal } from '@/components/driverspot/DsUi'
import { RouteBridge, RouteLine, RouteNode } from '@/components/driverspot/RouteLine'

const VERTICAL = 'M 24 8 V 312'
const CASE_Y = [24, 88, 152, 216, 280] as const

export function OpportunitySection() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-18% 0px' })
  const active = inView || reduced

  return (
    <section ref={ref} className="relative bg-ds-bg py-20 md:py-28">
      <div className="ds-shell">
        <DsReveal>
          <p className="ds-kicker">The opportunity</p>
          <h2 className="ds-display mt-5 max-w-4xl text-[2.35rem] md:text-6xl">
            {driverspot.opportunity.headline[0]}
            <span className="mt-2 block text-ds-secondary">{driverspot.opportunity.headline[1]}</span>
          </h2>
        </DsReveal>
        <DsReveal delay={0.08}>
          <p className="mt-6 max-w-2xl text-lg text-ds-secondary">{driverspot.opportunity.support}</p>
        </DsReveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.42fr_1fr]">
          <div className="relative hidden min-h-[320px] lg:block" aria-hidden>
            <svg viewBox="0 0 48 320" className="h-[320px] w-12 overflow-visible">
              <RouteLine d={VERTICAL} drawn={active} duration={0.9} />
              {CASE_Y.map((y, index) => (
                <RouteNode key={y} cx={24} cy={y} active={active} delay={0.1 + index * 0.1} />
              ))}
            </svg>
          </div>

          <ol className="space-y-0">
            {driverspot.opportunity.cases.map((item, index) => (
              <motion.li
                key={item.id}
                className="border-t border-ds-border py-5"
                initial={reduced ? false : { opacity: 0, y: 22 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.08 + index * 0.1, ease: dsEase }}
              >
                <p className="font-mono text-[10px] tracking-[0.2em] text-ds-yellow uppercase">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-2 font-display text-2xl md:text-3xl">{item.label}</p>
                <p className="mt-1 text-ds-secondary">{item.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.p
          className="mt-12 max-w-3xl text-lg text-ds-secondary"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.55, ease: dsEase }}
        >
          {driverspot.opportunity.problem}
        </motion.p>
      </div>
      <RouteBridge />
    </section>
  )
}

export function ProblemSection() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const connected = inView || reduced

  const spots = [
    { x: 8, y: 18 },
    { x: 72, y: 8 },
    { x: 6, y: 68 },
    { x: 78, y: 72 },
  ]

  return (
    <section ref={ref} className="bg-ds-section py-20 md:py-28">
      <div className="ds-shell grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <DsReveal>
          <p className="ds-kicker">The problem</p>
          <h2 className="ds-display mt-5 text-[2.2rem] md:text-5xl">
            Fragmented discovery.
            <span className="mt-2 block text-ds-secondary">Inconsistent trust, availability and quality.</span>
          </h2>
          <p className="mt-6 max-w-xl text-ds-secondary">{driverspot.opportunity.problem}</p>
        </DsReveal>

        <div className="relative min-h-[320px] md:min-h-[380px]">
          {driverspot.fragments.map((item, index) => {
            const spot = spots[index] ?? spots[0]
            return (
              <motion.p
                key={item.id}
                className="absolute border border-ds-border bg-ds-card px-4 py-3 font-mono text-[11px] tracking-[0.14em] text-ds-secondary uppercase"
                initial={false}
                animate={
                  connected
                    ? { left: '50%', top: '46%', x: '-50%', y: '-50%', opacity: 0.18, scale: 0.92 }
                    : { left: `${spot.x}%`, top: `${spot.y}%`, x: 0, y: 0, opacity: 1, scale: 1 }
                }
                transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.12 + index * 0.08, ease: dsEase }}
              >
                {item.label}
              </motion.p>
            )
          })}

          <motion.div
            className="absolute top-1/2 left-1/2 w-[min(100%,22rem)] -translate-x-1/2 -translate-y-1/2 text-center"
            initial={false}
            animate={{ opacity: connected ? 1 : 0, y: connected ? 0 : 16 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.55, ease: dsEase }}
          >
            <p className="ds-kicker text-ds-yellow">One connected marketplace</p>
            <DsLockup className="mx-auto mt-4 w-44" />
            <svg viewBox="0 0 220 48" className="mx-auto mt-5 w-48" aria-hidden>
              <RouteLine d="M10 24 H210" drawn={connected} duration={0.5} delay={0.6} />
              <RouteNode cx={10} cy={24} active={connected} />
              <RouteNode cx={110} cy={24} active={connected} delay={0.15} />
              <RouteNode cx={210} cy={24} active={connected} delay={0.28} />
            </svg>
          </motion.div>
        </div>
      </div>

      <div className="ds-shell mt-16">
        <DsReveal>
          <p className="ds-display max-w-4xl text-[2rem] md:text-5xl">{driverspot.opportunity.close}</p>
        </DsReveal>
      </div>
      <RouteBridge />
    </section>
  )
}
