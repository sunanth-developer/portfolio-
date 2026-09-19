import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { driverspot } from '@/data/driverspot'
import { dsEase } from '@/lib/ds'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { DsCount, DsReveal } from '@/components/driverspot/DsUi'
import { RouteBridge, RouteLine, RouteNode } from '@/components/driverspot/RouteLine'

export function TractionSection() {
  return (
    <section className="bg-ds-section py-20 md:py-28">
      <div className="ds-shell">
        <DsReveal>
          <p className="ds-kicker">Traction</p>
          <h2 className="ds-display mt-5 max-w-4xl text-[2.3rem] md:text-6xl">{driverspot.traction.headline}</h2>
        </DsReveal>

        <div className="mt-14 grid grid-cols-1 gap-px border border-ds-border bg-ds-border sm:grid-cols-2">
          {driverspot.traction.metrics.map((metric) => (
            <article
              key={metric.label}
              className="group bg-ds-section px-6 py-10 transition-[background-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:z-10 hover:bg-ds-card-hover hover:shadow-[0_0_40px_rgba(255,193,7,0.12)] hover:ring-1 hover:ring-ds-yellow/30 md:px-10 md:py-14 motion-safe:hover:-translate-y-[1%]"
            >
              <p className="ds-display text-[3.4rem] text-ds-yellow md:text-[5.4rem]" aria-label={`${metric.value} ${metric.label}`}>
                <DsCount value={metric.value} />
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-ds-secondary uppercase">{metric.label}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 font-display text-xl text-ds-secondary md:text-2xl">{driverspot.traction.capital}</p>
      </div>
      <RouteBridge />
    </section>
  )
}

export function MarketSection() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-18% 0px' })
  const active = inView || reduced

  return (
    <section ref={ref} className="relative overflow-hidden bg-ds-bg py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 ds-grid opacity-50" aria-hidden />
      <div className="ds-shell relative grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
        <DsReveal>
          <p className="ds-kicker">Market</p>
          <h2 className="ds-display mt-5 text-[2.2rem] md:text-5xl">{driverspot.market.headline}</h2>
          <ul className="mt-10 space-y-8">
            {driverspot.market.layers.map((layer, index) => (
              <li key={layer.id}>
                <p className={index === 2 ? 'ds-kicker text-ds-yellow' : 'ds-kicker'}>{layer.kicker}</p>
                <p className={index === 2 ? 'mt-2 font-display text-4xl text-ds-yellow md:text-5xl' : 'mt-2 font-display text-4xl md:text-5xl'}>
                  {layer.value}
                </p>
                <p className="mt-1 text-ds-secondary">{layer.label}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-sm">
            <p>
              <span className="ds-kicker mr-3">Beachhead</span>
              <span className="text-ds-text">{driverspot.market.beachhead}</span>
            </p>
            <p>
              <span className="ds-kicker mr-3">Expansion</span>
              <span className="text-ds-secondary">{driverspot.market.expansion}</span>
            </p>
          </div>
        </DsReveal>

        <div className="relative mx-auto aspect-square w-full max-w-[28rem]">
          <MarketRings active={active} />
        </div>
      </div>
      <RouteBridge />
    </section>
  )
}

function MarketRings({ active }: { active: boolean }) {
  const reduced = useReducedMotion()

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible" aria-hidden>
      <motion.circle
        cx="200"
        cy="200"
        r="168"
        fill="none"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1"
        initial={false}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.86 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: dsEase }}
        style={{ transformOrigin: '200px 200px' }}
      />
      <motion.circle
        cx="200"
        cy="200"
        r="112"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1"
        initial={false}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.86 }}
        transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.18, ease: dsEase }}
        style={{ transformOrigin: '200px 200px' }}
      />
      <motion.circle
        cx="200"
        cy="200"
        r="58"
        fill="rgba(255,193,7,0.12)"
        stroke="#FFC107"
        strokeWidth="1.4"
        initial={false}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.8 }}
        transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.36, ease: dsEase }}
        style={{ transformOrigin: '200px 200px' }}
      />
      <RouteNode cx={200} cy={200} active={active} delay={0.5} r={4.2} />
      <text x="200" y="64" textAnchor="middle" fill="#A3A3A3" fontSize="11" letterSpacing="0.22em">
        TAM
      </text>
      <text x="200" y="118" textAnchor="middle" fill="#A3A3A3" fontSize="11" letterSpacing="0.22em">
        SAM
      </text>
      <motion.text
        x="200"
        y="196"
        textAnchor="middle"
        fill="#FFC107"
        fontSize="12"
        letterSpacing="0.18em"
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: reduced ? 0 : 0.55 }}
      >
        SOM
      </motion.text>
      <motion.text
        x="200"
        y="248"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="11"
        letterSpacing="0.24em"
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: reduced ? 0 : 0.7 }}
      >
        HYDERABAD
      </motion.text>
    </svg>
  )
}

export function BusinessSection() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const active = inView || reduced
  const flowPath = 'M 20 40 H 780'
  const branch = [
    'M 400 40 V 120 H 120',
    'M 400 40 V 120',
    'M 400 40 V 120 H 680',
  ]

  return (
    <section ref={ref} className="bg-ds-section py-20 md:py-28">
      <div className="ds-shell">
        <DsReveal>
          <p className="ds-kicker">Business model</p>
          <h2 className="ds-display mt-5 max-w-4xl text-[2.2rem] md:text-5xl">{driverspot.business.headline}</h2>
        </DsReveal>

        <div className="mt-12 hidden overflow-hidden lg:block">
          <svg viewBox="0 0 800 70" className="h-auto w-full overflow-visible" aria-hidden>
            <RouteLine d={flowPath} drawn={active} duration={0.9} />
            {driverspot.business.flow.map((step, index) => {
              const x = 20 + index * 152
              return <RouteNode key={step} cx={x} cy={40} active={active} delay={0.08 * index} />
            })}
            {active && <circle r="3" fill="#FFC107"><animateMotion dur="1.4s" fill="freeze" path={flowPath} /></circle>}
          </svg>
          <ol className="mt-3 grid grid-cols-6 gap-2">
            {driverspot.business.flow.map((step) => (
              <li key={step} className="font-mono text-[10px] tracking-[0.16em] text-ds-secondary uppercase">
                {step}
              </li>
            ))}
          </ol>
        </div>

        <ol className="mt-8 flex flex-wrap gap-x-3 gap-y-2 lg:hidden">
          {driverspot.business.flow.map((step, index) => (
            <li key={step} className="flex items-center gap-3 font-mono text-[10px] tracking-[0.16em] text-ds-secondary uppercase">
              <span className="text-ds-text">{step}</span>
              {index < driverspot.business.flow.length - 1 && <span className="text-ds-yellow">→</span>}
            </li>
          ))}
        </ol>

        <div className="mt-6 hidden lg:block" aria-hidden>
          <svg viewBox="0 0 800 140" className="h-auto w-full overflow-visible">
            {branch.map((d, index) => (
              <RouteLine key={d} d={d} drawn={active} delay={0.7 + index * 0.12} duration={0.55} />
            ))}
          </svg>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {driverspot.business.streams.map((stream, index) => (
            <motion.article
              key={stream.id}
              className="border-t border-ds-yellow/50 pt-5"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.85 + index * 0.1, ease: dsEase }}
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-ds-yellow uppercase">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-display text-2xl">{stream.title}</h3>
              <p className="mt-3 text-ds-secondary">{stream.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
      <RouteBridge />
    </section>
  )
}
