import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { driverspot } from '@/data/driverspot'
import { dsEase } from '@/lib/ds'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { DsMark, DsReveal } from '@/components/driverspot/DsUi'
import { RouteBridge, RouteLine, RouteNode } from '@/components/driverspot/RouteLine'

const CHANNEL_PATHS = [
  'M 300 200 L 90 70',
  'M 300 200 L 510 70',
  'M 300 200 L 90 330',
  'M 300 200 L 510 330',
] as const

const CHANNEL_POS = [
  { x: 90, y: 70 },
  { x: 510, y: 70 },
  { x: 90, y: 330 },
  { x: 510, y: 330 },
] as const

export function GtmSection() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-18% 0px' })
  const active = inView || reduced

  return (
    <section ref={ref} className="bg-ds-bg py-20 md:py-28">
      <div className="ds-shell">
        <DsReveal>
          <p className="ds-kicker">Go-to-market</p>
          <h2 className="ds-display mt-5 max-w-4xl text-[2.2rem] md:text-5xl">{driverspot.gtm.headline}</h2>
        </DsReveal>

        <div className="relative mt-16 hidden lg:block">
          <svg viewBox="0 0 600 400" className="mx-auto h-auto w-full max-w-4xl overflow-visible" aria-hidden>
            {CHANNEL_PATHS.map((d, index) => (
              <RouteLine key={d} d={d} drawn={active} delay={0.12 * index} duration={0.65} />
            ))}
            <RouteNode cx={300} cy={200} active={active} r={5} />
            {CHANNEL_POS.map((pos, index) => (
              <RouteNode key={pos.x + pos.y} cx={pos.x} cy={pos.y} active={active} delay={0.14 + index * 0.12} />
            ))}
          </svg>
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <DsMark className="h-14" />
          </div>
          {driverspot.gtm.channels.map((channel, index) => {
            const corner =
              index === 0
                ? 'top-0 left-0 text-left'
                : index === 1
                  ? 'top-0 right-0 text-right'
                  : index === 2
                    ? 'bottom-0 left-0 text-left'
                    : 'bottom-0 right-0 text-right'
            return (
              <motion.article
                key={channel.id}
                className={`absolute max-w-[220px] ${corner}`}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.18 + index * 0.12, ease: dsEase }}
              >
                <p className="ds-kicker text-ds-yellow">{channel.title}</p>
                <p className="mt-2 text-sm text-ds-secondary">{channel.body}</p>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-12 flex justify-center lg:hidden">
          <DsMark className="h-12" />
        </div>
        <ol className="mt-8 space-y-8 lg:hidden">
          {driverspot.gtm.channels.map((channel, index) => (
            <li key={channel.id} className="border-t border-ds-border pt-6">
              <p className="font-mono text-[10px] tracking-[0.2em] text-ds-yellow uppercase">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 font-display text-2xl">{channel.title}</h3>
              <p className="mt-2 text-ds-secondary">{channel.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <RouteBridge />
    </section>
  )
}

export function EcosystemSection() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-18% 0px' })
  const active = inView || reduced
  const path = 'M 24 90 H 1100'

  return (
    <section ref={ref} className="overflow-hidden bg-ds-section py-20 md:py-28">
      <div className="ds-shell">
        <DsReveal>
          <p className="ds-kicker">Why DriverSpot</p>
          <h2 className="ds-display mt-5 max-w-4xl text-[2.2rem] md:text-5xl">{driverspot.why.headline}</h2>
          <p className="mt-6 max-w-2xl text-lg text-ds-secondary">{driverspot.why.support}</p>
        </DsReveal>

        <div className="relative mt-16">
          <svg viewBox="0 0 1120 160" className="hidden h-auto w-full overflow-visible md:block" aria-hidden>
            <RouteLine d={path} drawn={active} duration={1} />
            {driverspot.why.path.map((step, index) => (
              <RouteNode key={step} cx={24 + index * 269} cy={90} active={active} delay={0.12 * index} r={4} />
            ))}
          </svg>
          <ol className="grid gap-8 md:grid-cols-5">
            {driverspot.why.path.map((step, index) => (
              <motion.li
                key={step}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.1 + index * 0.12, ease: dsEase }}
              >
                <p className="font-mono text-[10px] tracking-[0.2em] text-ds-yellow uppercase">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-3 font-display text-xl md:text-2xl">{step}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <DsReveal delay={0.2} className="mt-16">
          <p className="ds-display max-w-4xl text-[2rem] md:text-5xl">{driverspot.why.close}</p>
          <p className="mt-5 max-w-2xl text-lg text-ds-secondary">{driverspot.why.closeSupport}</p>
        </DsReveal>
      </div>
      <RouteBridge />
    </section>
  )
}
