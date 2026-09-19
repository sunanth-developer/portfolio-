import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { driverspot } from '@/data/driverspot'
import { dsEase } from '@/lib/ds'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { DsButton, DsGhostButton, DsLockup } from '@/components/driverspot/DsUi'
import { RouteLine, RouteNode } from '@/components/driverspot/RouteLine'

export function FinalCtaSection() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const active = inView || reduced
  const path = 'M 20 28 H 520'

  return (
    <section id="download" ref={ref} className="relative scroll-mt-24 overflow-hidden bg-ds-bg py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 ds-grid opacity-40" aria-hidden />
      <div className="ds-shell relative">
        <DsLockup className="mb-8 w-40 md:w-52" />
        <p className="ds-kicker">The journey</p>
        <h2 className="ds-display mt-6 text-[13vw] sm:text-[5.5rem]">
          {driverspot.hero.lines.map((line, index) => (
            <span key={line} className="block">
              {index === 2 ? <span className="text-ds-yellow">{line}</span> : line}
            </span>
          ))}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-ds-secondary">{driverspot.cta.support}</p>

        <svg viewBox="0 0 540 48" className="mt-10 hidden h-10 w-full max-w-xl overflow-visible sm:block" aria-hidden>
          <RouteLine d={path} drawn={active} duration={0.8} />
          <RouteNode cx={20} cy={28} active={active} />
          <RouteNode cx={180} cy={28} active={active} delay={0.12} />
          <RouteNode cx={340} cy={28} active={active} delay={0.22} />
          <RouteNode cx={520} cy={28} active={active} delay={0.32} />
        </svg>
        <p className="ds-kicker mt-3">Customer → DriverSpot → Driver → Journey</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <DsButton href={driverspot.stores.android.href} mark>
            Download DriverSpot
          </DsButton>
          <DsGhostButton href={driverspot.contact.mailHref}>Talk to the Founders</DsGhostButton>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ds-secondary">
          <a href={driverspot.stores.android.href} className="hover:text-ds-yellow">
            {driverspot.stores.android.label}
          </a>
          <a href={driverspot.stores.ios.href} className="hover:text-ds-yellow">
            {driverspot.stores.ios.label}
          </a>
        </div>

        <motion.address
          className="mt-14 not-italic"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.2, ease: dsEase }}
        >
          <p className="font-display text-2xl">{driverspot.contact.name}</p>
          <p className="mt-1 text-ds-secondary">{driverspot.contact.role}</p>
          <p className="mt-4">
            <a href={driverspot.contact.mailHref} className="text-ds-text hover:text-ds-yellow">
              {driverspot.contact.email}
            </a>
          </p>
          <p className="mt-1">
            <a href={driverspot.contact.phoneHref} className="text-ds-secondary hover:text-ds-yellow">
              {driverspot.contact.phone}
            </a>
          </p>
          <p className="mt-1">
            <a href={driverspot.website} className="text-ds-secondary hover:text-ds-yellow">
              {driverspot.websiteLabel}
            </a>
          </p>
        </motion.address>
      </div>
    </section>
  )
}

export function DriverSpotFooter() {
  return (
    <footer className="border-t border-ds-border bg-ds-bg py-10">
      <div className="ds-shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <DsLockup className="w-44 md:w-52" />
          <p className="mt-3 max-w-sm text-sm text-ds-secondary">{driverspot.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.16em] text-ds-secondary uppercase" aria-label="DriverSpot links">
          <a href={driverspot.website} className="hover:text-ds-yellow">
            Website
          </a>
          <a href={driverspot.stores.android.href} className="hover:text-ds-yellow">
            Android
          </a>
          <a href={driverspot.stores.ios.href} className="hover:text-ds-yellow">
            iOS
          </a>
          <a href={driverspot.contact.mailHref} className="hover:text-ds-yellow">
            Contact
          </a>
        </nav>
      </div>
      <div className="ds-shell mt-8 flex flex-col gap-1 font-mono text-[10px] tracking-[0.16em] text-ds-muted uppercase md:flex-row md:justify-between">
        <p>{driverspot.company}</p>
        <p>{driverspot.location}</p>
      </div>
    </footer>
  )
}
