import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { cn } from '@/lib/cn'
import { MetricCount } from '@/components/MetricCount'

const frames = [
  { id: 'customer-app', label: 'Customer app', file: 'customer-app.jpg' },
  { id: 'driver-app', label: 'Driver app', file: 'driver-app.jpg' },
  { id: 'booking', label: 'Booking', file: 'booking.jpg' },
  { id: 'matching', label: 'Matching', file: 'matching.jpg' },
  { id: 'tracking', label: 'Tracking', file: 'tracking.jpg' },
  { id: 'profile', label: 'Driver profile', file: 'profile.jpg' },
  { id: 'safety', label: 'Safety / SOS', file: 'safety.jpg' },
] as const

const screens = [
  { kicker: 'Book', title: 'Chauffeur', meta: 'In-city · Now' },
  { kicker: 'Match', title: 'Vehicle-aware', meta: 'Language · Safety' },
  { kicker: 'Schedule', title: 'Outstation', meta: 'Saved car' },
  { kicker: 'Live', title: 'On the way', meta: 'SOS armed' },
  { kicker: 'Ops', title: 'Marketplace', meta: 'Supply · Demand' },
  { kicker: 'Next', title: 'Iterate', meta: 'Trust loop' },
]

export function PhoneStage({ index }: { index: number }) {
  const screen = screens[index % screens.length] ?? screens[0]

  return (
    <div className="relative mx-auto h-[340px] w-[176px] md:h-[380px] md:w-[200px]">
      <motion.div
        className="absolute inset-0 border border-line bg-surface"
        animate={{ y: index % 2 === 0 ? 0 : -8, rotate: index % 2 === 0 ? -2 : 2 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute top-3 left-1/2 h-3 w-16 -translate-x-1/2 bg-fg/10" />
        <div className="absolute inset-x-3 top-10 bottom-3 overflow-hidden border border-line/80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,90,54,0.18),transparent_50%)]" />
          <p className="absolute top-4 left-4 text-[9px] tracking-[0.2em] text-accent uppercase">{screen?.kicker}</p>
          <p className="absolute top-12 left-4 font-display text-2xl">{screen?.title}</p>
          <p className="absolute bottom-4 left-4 text-[10px] tracking-[0.16em] text-meta uppercase">{screen?.meta}</p>
          <p className="absolute right-3 bottom-16 left-3 text-[9px] tracking-[0.14em] text-meta uppercase">
            Schematic — not a product screenshot
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export function ProductFrames({ active = 0 }: { active?: number }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {frames.slice(0, 4).map((frame, index) => (
        <div
          key={frame.id}
          className={cn(
            'border border-line bg-surface px-3 py-4',
            index === active % 4 && 'border-accent',
          )}
        >
          <p className="text-[9px] tracking-[0.18em] text-accent uppercase">
            {String(index + 1).padStart(2, '0')}
          </p>
          <p className="mt-2 font-display text-sm uppercase">{frame.label}</p>
          <p className="mt-2 text-[10px] text-meta">public/product/{frame.file}</p>
        </div>
      ))}
    </div>
  )
}

export function FragmentField({ collapsed }: { collapsed: boolean }) {
  const bits = ['Call a driver', 'WhatsApp group', 'Neighbour referral', 'Unknown number']
  return (
    <div className="relative h-40">
      {bits.map((bit, index) => (
        <motion.p
          key={bit}
          className="absolute border border-line bg-surface px-3 py-2 text-xs text-muted"
          animate={
            collapsed
              ? { x: 40, y: 48, opacity: 0.2 }
              : { x: (index % 2) * 110, y: Math.floor(index / 2) * 48, opacity: 1 }
          }
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {bit}
        </motion.p>
      ))}
      <motion.p
        className="absolute top-12 left-10 font-display text-xl text-accent"
        animate={{ opacity: collapsed ? 1 : 0 }}
      >
        One system.
      </motion.p>
    </div>
  )
}

export function ArchitectureStack() {
  const layers = ['Customer app', 'React Native', 'API', 'Node.js', 'Database', 'Real-time system']
  return (
    <ol>
      {layers.map((layer, index) => (
        <li key={layer} className="flex items-center gap-3 border-b border-line py-2">
          <span className="text-[10px] text-accent">{String(index + 1).padStart(2, '0')}</span>
          <span className="font-display text-lg">{layer}</span>
        </li>
      ))}
    </ol>
  )
}

export function MarketplaceLoop() {
  const steps = ['Users', 'Bookings', 'Drivers', 'Rides', 'Revenue', 'More users']
  return (
    <ol className="flex flex-wrap gap-2">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-2 text-sm uppercase">
          <span className="border border-line bg-surface px-3 py-2">{step}</span>
          {index < steps.length - 1 && <span className="text-accent">→</span>}
        </li>
      ))}
    </ol>
  )
}

export function TractionBlock() {
  const metrics = projects[0]?.metrics ?? []
  return (
    <div>
      <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCount
            key={metric.label}
            value={metric.value}
            label={metric.label}
            className="bg-bg px-4 py-6 md:py-8"
          />
        ))}
      </div>
      <div className="mt-6 space-y-1 font-display text-xl uppercase md:text-2xl">
        <p>A real product.</p>
        <p>A real marketplace.</p>
        <p className="text-accent">A real business.</p>
      </div>
    </div>
  )
}

export function ProjectGallery({ index = 0 }: { index?: number }) {
  return <PhoneStage index={index} />
}
