import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { driverspot } from '@/data/driverspot'
import { visuals, asset } from '@/data/visuals'
import { dsEase, intro } from '@/lib/ds'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { DsButton, DsGhostButton, DsLockup, DsMark, PhoneFrame } from '@/components/driverspot/DsUi'
import { RouteLabel, RouteLine, RouteNode } from '@/components/driverspot/RouteLine'

const HERO_PATH = 'M 28 168 C 90 168, 110 96, 180 88 C 250 80, 270 168, 332 168'
const NODES = [
  { x: 28, y: 168, label: 'Customer' },
  { x: 180, y: 88, label: 'DriverSpot' },
  { x: 332, y: 168, label: 'Driver' },
] as const

export function DriverSpotHero() {
  const reduced = useReducedMotion()
  const [t, setT] = useState(reduced ? intro.done : 0)

  useEffect(() => {
    if (reduced) return
    const marks = [intro.logo, intro.route, intro.headline, intro.support, intro.settle, intro.done]
    const timers = marks.map((mark) => window.setTimeout(() => setT(mark), mark * 1000))
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [reduced])

  const showLogo = t >= intro.logo
  const showRoute = t >= intro.route
  const showHead = t >= intro.headline
  const showSupport = t >= intro.support
  const showSettle = t >= intro.settle

  return (
    <section id="top" className="relative overflow-hidden bg-ds-bg lg:min-h-svh">
      <div className="pointer-events-none absolute inset-0 ds-grid opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block">
        <img
          src={asset(visuals.driverspotHandover.src)}
          alt=""
          width={visuals.driverspotHandover.width}
          height={visuals.driverspotHandover.height}
          className="h-full w-full object-cover object-[center_42%] opacity-55"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B0B0B_0%,rgba(11,11,11,0.28)_38%,rgba(11,11,11,0.55)_100%)]" />
      </div>

      <div className="ds-shell relative grid items-center gap-10 pt-24 pb-14 lg:min-h-svh lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-20 lg:pb-10">
        <div>
          <motion.div
            className="mb-8 w-[min(100%,11rem)]"
            initial={false}
            animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : 10 }}
            transition={{ duration: reduced ? 0 : 0.3, ease: dsEase }}
          >
            <DsLockup className="w-full" />
          </motion.div>

          <h1 className="ds-display text-[13vw] sm:text-[4.4rem] lg:text-[5.2rem]">
            {driverspot.hero.lines.map((line, index) => (
              <motion.span
                key={line}
                className="block overflow-hidden"
                initial={false}
                animate={{ y: showHead ? 0 : 36, opacity: showHead ? 1 : 0 }}
                transition={{ duration: reduced ? 0 : 0.32, delay: reduced ? 0 : index * 0.05, ease: dsEase }}
              >
                {index === 2 ? <span className="text-ds-yellow">{line}</span> : line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-md text-base text-ds-secondary md:text-lg"
            initial={false}
            animate={{ opacity: showSupport ? 1 : 0, y: showSupport ? 0 : 16 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: dsEase }}
          >
            {driverspot.hero.support}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={false}
            animate={{ opacity: showSettle ? 1 : 0, y: showSettle ? 0 : 12 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: dsEase }}
          >
            <DsButton href="#download" mark>
              Download DriverSpot
            </DsButton>
            <DsGhostButton href={driverspot.contact.mailHref}>Talk to the Founders</DsGhostButton>
          </motion.div>

          <motion.p
            className="ds-kicker mt-8 text-ds-yellow"
            initial={false}
            animate={{ opacity: showSettle ? 1 : 0 }}
          >
            {driverspot.live}
          </motion.p>
        </div>

        <motion.div
          className="relative"
          initial={false}
          animate={{ opacity: showSettle || showRoute ? 1 : 0, y: showSettle ? 0 : 18 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: dsEase }}
        >
          <HeroRoute drawn={showRoute} />
          <div className="relative mx-auto mt-4 w-fit lg:mt-0">
            <PhoneFrame>
              <HeroPhoneScreen active={showSettle} />
            </PhoneFrame>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function HeroRoute({ drawn }: { drawn: boolean }) {
  const reduced = useReducedMotion()
  const visible = drawn || reduced

  return (
    <div className="relative mb-3 hidden h-28 lg:block">
      <svg viewBox="0 0 360 200" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <RouteLine d={HERO_PATH} drawn={visible} duration={0.3} width={1.35} />
        {NODES.map((node, index) => (
          <RouteNode key={node.label} cx={node.x} cy={node.y} active={visible} delay={index * 0.08} />
        ))}
      </svg>
      <RouteLabel active={visible} className="absolute bottom-1 left-0">
        Customer
      </RouteLabel>
      <RouteLabel active={visible} className="absolute top-0 left-1/2 -translate-x-1/2">
        DriverSpot
      </RouteLabel>
      <RouteLabel active={visible} className="absolute right-0 bottom-1">
        Driver
      </RouteLabel>
    </div>
  )
}

function HeroPhoneScreen({ active }: { active: boolean }) {
  return (
    <div className="relative h-full px-4 pt-5">
      <DsMark className="h-10" />
      <p className="mt-5 font-display text-2xl leading-tight">
        Your car.
        <br />
        Your trip.
        <br />
        <span className="text-ds-yellow">Your driver.</span>
      </p>
      <svg viewBox="0 0 160 90" className="mt-8 w-full" aria-hidden>
        <RouteLine d="M12 70 C 40 70, 52 28, 80 26 C 112 24, 122 70, 148 70" drawn={active} duration={0.55} />
        <RouteNode cx={12} cy={70} active={active} />
        <RouteNode cx={80} cy={26} active={active} delay={0.12} />
        <RouteNode cx={148} cy={70} active={active} delay={0.22} />
      </svg>
      <div className="absolute right-4 bottom-4 left-4">
        <p className="font-mono text-[9px] tracking-[0.18em] text-ds-muted uppercase">Customer → DriverSpot → Driver</p>
      </div>
    </div>
  )
}
