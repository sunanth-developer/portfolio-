import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { driverspot } from '@/data/driverspot'
import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { DsReveal } from '@/components/driverspot/DsUi'
import { RouteBridge, RouteLine, RouteNode } from '@/components/driverspot/RouteLine'

const INDIA =
  'M168 22 C 178 12, 192 18, 190 36 C 204 40, 214 54, 210 72 C 228 78, 246 96, 236 122 C 258 128, 274 150, 262 176 C 286 186, 298 214, 282 242 C 300 262, 296 298, 274 328 C 260 356, 238 380, 214 392 C 196 402, 182 390, 180 368 C 168 346, 156 318, 160 292 C 140 278, 108 262, 92 236 C 68 224, 48 200, 62 176 C 40 160, 32 132, 54 118 C 38 96, 62 70, 92 74 C 108 50, 140 30, 168 22 Z'

const CITIES = [
  { name: 'Hyderabad', x: 176, y: 236, origin: true },
  { name: 'Bengaluru', x: 164, y: 302, origin: false },
  { name: 'Mumbai', x: 98, y: 210, origin: false },
  { name: 'Delhi', x: 168, y: 92, origin: false },
  { name: 'Pune', x: 118, y: 232, origin: false },
  { name: 'Chennai', x: 198, y: 318, origin: false },
] as const

const ROUTES = [
  'M176 236 C 172 268, 168 286, 164 302',
  'M176 236 C 140 228, 116 218, 98 210',
  'M176 236 C 174 180, 170 130, 168 92',
  'M176 236 C 150 236, 132 234, 118 232',
  'M176 236 C 184 268, 192 296, 198 318',
] as const

export function TeamSection() {
  return (
    <section className="bg-ds-bg py-20 md:py-28">
      <div className="ds-shell">
        <DsReveal>
          <p className="ds-kicker">Team</p>
          <h2 className="ds-display mt-5 text-[2.4rem] md:text-6xl">{driverspot.team.headline}</h2>
        </DsReveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {driverspot.team.founders.map((person) => (
            <article key={person.id} className="group">
              <div className="relative aspect-[4/5] max-h-[32rem] overflow-hidden border border-ds-border bg-ds-card md:max-h-none">
                <span className="absolute top-0 left-0 z-10 h-full w-px origin-top scale-y-0 bg-ds-yellow transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                {person.photo ? (
                  <img
                    src={`${import.meta.env.BASE_URL}${person.photo}`}
                    alt={person.name}
                    width={1086}
                    height={1448}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-[center_12%] opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  />
                ) : (
                  <div className="flex h-full items-end bg-[radial-gradient(circle_at_30%_20%,rgba(255,193,7,0.08),transparent_46%)] p-8">
                    <p className="font-display text-7xl text-ds-yellow/80">RR</p>
                  </div>
                )}
              </div>
              <div className="mt-6 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                <h3 className="font-display text-3xl">{person.name}</h3>
                <p className="mt-2 text-ds-yellow">{person.role}</p>
                <p className="mt-1 text-ds-secondary opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                  {person.focus}
                </p>
                <p className="mt-1 text-sm text-ds-muted opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                  {person.line}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <RouteBridge />
    </section>
  )
}

export function ExpansionSection() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-18% 0px' })
  const active = inView || reduced

  return (
    <section ref={ref} className="bg-ds-section py-20 md:py-28">
      <div className="ds-shell grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <DsReveal>
          <p className="ds-kicker">Next milestone</p>
          <h2 className="ds-display mt-5 text-[2.2rem] md:text-5xl">{driverspot.milestone.headline}</h2>
          <div className="mt-10 grid grid-cols-2 gap-8">
            {driverspot.milestone.primary.map((item) => (
              <div key={item.label}>
                <p className="ds-display text-4xl text-ds-yellow md:text-5xl">{item.value}</p>
                <p className="mt-2 font-mono text-[11px] tracking-[0.18em] text-ds-secondary uppercase">{item.label}</p>
              </div>
            ))}
          </div>
          <ol className="mt-10 flex flex-wrap gap-x-3 gap-y-2">
            {driverspot.milestone.cities.map((city, index) => (
              <li key={city} className="flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-ds-secondary uppercase">
                <span className={cn(index === 0 ? 'text-ds-text' : undefined)}>{city}</span>
                {index < driverspot.milestone.cities.length - 1 && <span className="text-ds-yellow">→</span>}
              </li>
            ))}
          </ol>
        </DsReveal>

        <div className="relative mx-auto w-full max-w-md">
          <svg viewBox="0 0 320 430" className="h-auto w-full overflow-visible" role="img" aria-label="India expansion map from Hyderabad">
            <motion.path
              d={INDIA}
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="1"
              initial={false}
              animate={{ opacity: active ? 1 : 0.25 }}
              transition={{ duration: reduced ? 0 : 0.6 }}
            />
            {ROUTES.map((d, index) => (
              <RouteLine key={d} d={d} drawn={active} delay={0.2 + index * 0.12} duration={0.6} muted={index > 0} />
            ))}
            {CITIES.map((city, index) => (
              <g key={city.name}>
                <RouteNode cx={city.x} cy={city.y} active={active} delay={index * 0.1} r={city.origin ? 4.4 : 3} />
                <motion.text
                  x={city.x + 10}
                  y={city.y + 4}
                  fill={city.origin ? '#FFC107' : '#A3A3A3'}
                  fontSize="11"
                  letterSpacing="0.12em"
                  initial={false}
                  animate={{ opacity: active ? 1 : 0 }}
                  transition={{ delay: reduced ? 0 : 0.18 + index * 0.1 }}
                >
                  {city.name.toUpperCase()}
                </motion.text>
              </g>
            ))}
          </svg>
        </div>
      </div>
      <RouteBridge />
    </section>
  )
}
