import { useEffect, useRef, useState, type MutableRefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { driverspot } from '@/data/driverspot'
import { dsEase } from '@/lib/ds'
import { cn } from '@/lib/cn'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'
import { DsMark, DsReveal, PhoneFrame } from '@/components/driverspot/DsUi'
import { RouteBridge, RouteLine, RouteNode } from '@/components/driverspot/RouteLine'

const screens = [
  {
    kicker: 'Match',
    title: 'Vehicle-aware matching',
    meta: 'Type · Transmission · Language',
    path: 'M16 118 C 40 118, 48 46, 80 42 C 116 38, 124 118, 148 118',
  },
  {
    kicker: 'Network',
    title: 'Verified drivers',
    meta: 'Trained · Professional profiles',
    path: 'M18 40 H142 M18 70 H110 M18 100 H128',
  },
  {
    kicker: 'Book',
    title: 'Flexible journeys',
    meta: 'Hourly · In-city · After-party · Outstation',
    path: 'M20 30 V130 M20 30 H90 M20 63 H120 M20 96 H80 M20 130 H140',
  },
  {
    kicker: 'Safety',
    title: 'Live ride layer',
    meta: 'Tracking · Sharing · SOS',
    path: 'M16 120 C 48 120, 56 36, 92 40 C 128 44, 132 88, 148 88',
  },
  {
    kicker: 'Repeat',
    title: 'Preferred driver',
    meta: 'Rebook who you already trust',
    path: 'M24 90 A 52 52 0 1 1 136 90',
  },
  {
    kicker: 'Assist',
    title: 'Call-in booking',
    meta: 'Human support when needed',
    path: 'M28 80 H132 M80 28 V132',
  },
] as const

export function ProductSection() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const [active, setActive] = useState(0)
  const items = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (mobile) return
    const observers = items.current.map((el, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActive(index)
        },
        { rootMargin: '-42% 0px -42% 0px', threshold: 0.1 },
      )
      if (el) observer.observe(el)
      return observer
    })
    return () => observers.forEach((observer) => observer.disconnect())
  }, [mobile])

  return (
    <section className="relative bg-ds-bg">
      <div className="ds-shell pt-20 md:pt-28">
        <DsReveal>
          <p className="ds-kicker">The product</p>
          <h2 className="ds-display mt-5 text-[2.4rem] md:text-6xl">
            {driverspot.product.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </DsReveal>
        <DsReveal delay={0.08}>
          <p className="mt-6 max-w-2xl text-lg text-ds-secondary">{driverspot.product.support}</p>
        </DsReveal>
      </div>

      {mobile ? <MobileFeatures /> : <DesktopFeatures active={active} items={items} reduced={reduced} />}

      <div className="ds-shell pb-8">
        <p className="ds-kicker text-ds-yellow">{driverspot.live}</p>
      </div>
      <RouteBridge />
    </section>
  )
}

function DesktopFeatures({
  active,
  items,
  reduced,
}: {
  active: number
  items: MutableRefObject<(HTMLElement | null)[]>
  reduced: boolean
}) {
  const progress = (active + 1) / driverspot.product.features.length
  const screen = screens[active] ?? screens[0]

  return (
    <div className="ds-shell mt-10 grid items-start gap-16 pb-12 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        {driverspot.product.features.map((feature, index) => (
          <article
            key={feature.id}
            ref={(node) => {
              items.current[index] = node
            }}
            className="flex min-h-[58vh] items-center"
          >
            <div>
              <p className={cn('font-mono text-[11px] tracking-[0.22em] uppercase', index === active ? 'text-ds-yellow' : 'text-ds-muted')}>
                {feature.index}
              </p>
              <h3
                className={cn(
                  'mt-4 font-display text-4xl transition-colors duration-300 xl:text-5xl',
                  index === active ? 'text-ds-text' : 'text-ds-muted',
                )}
              >
                {feature.title}
              </h3>
              <p className={cn('mt-5 max-w-md text-lg transition-colors duration-300', index === active ? 'text-ds-secondary' : 'text-ds-muted')}>
                {feature.body}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {feature.points.map((point) => (
                  <li
                    key={point}
                    className={cn(
                      'border px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase',
                      index === active ? 'border-ds-yellow/40 text-ds-text' : 'border-ds-border text-ds-muted',
                    )}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="sticky top-28 hidden self-start lg:block">
        <div className="mb-6 h-px w-full bg-ds-border">
          <motion.div
            className="h-px bg-ds-yellow"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: reduced ? 0 : 0.45, ease: dsEase }}
          />
        </div>
        <PhoneFrame>
          <AnimatePresence mode="wait">
            {screen && (
              <motion.div
                key={screen.title}
                className="h-full px-4 pt-5"
                initial={reduced ? false : { opacity: 0, x: 18, scale: 0.985, clipPath: 'inset(0 14% 0 0)' }}
                animate={{ opacity: 1, x: 0, scale: 1, clipPath: 'inset(0 0% 0 0)' }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, x: -12, scale: 0.99 }}
                transition={{ duration: reduced ? 0.12 : 0.5, ease: dsEase }}
              >
                <DsMark className="mb-4 h-8" />
                <p className="ds-kicker text-ds-yellow">{screen.kicker}</p>
                <p className="mt-4 font-display text-2xl leading-tight">{screen.title}</p>
                <svg viewBox="0 0 164 160" className="mt-8 h-40 w-full" aria-hidden>
                  <RouteLine d={screen.path} drawn duration={0.55} />
                  <RouteNode cx={20} cy={40} active />
                  <RouteNode cx={82} cy={80} active delay={0.1} />
                  <RouteNode cx={144} cy={120} active delay={0.18} />
                </svg>
                <p className="absolute right-4 bottom-4 left-4 font-mono text-[9px] tracking-[0.16em] text-ds-muted uppercase">
                  {screen.meta}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </PhoneFrame>
      </div>
    </div>
  )
}

function MobileFeatures() {
  return (
    <div className="ds-shell mt-10 space-y-10 pb-12">
      {driverspot.product.features.map((feature, index) => {
        const screen = screens[index]
        return (
          <article key={feature.id} className="border-t border-ds-border pt-8">
            <p className="font-mono text-[11px] tracking-[0.22em] text-ds-yellow uppercase">{feature.index}</p>
            <h3 className="mt-3 font-display text-3xl">{feature.title}</h3>
            <p className="mt-4 text-ds-secondary">{feature.body}</p>
            {screen && (
              <svg viewBox="0 0 164 90" className="mt-6 h-16 w-full" aria-hidden>
                <RouteLine d={screen.path} drawn duration={0.4} />
              </svg>
            )}
          </article>
        )
      })}
    </div>
  )
}
