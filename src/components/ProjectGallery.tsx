import { motion } from 'framer-motion'

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
    <div className="relative mx-auto h-[420px] w-[220px]">
      <motion.div
        className="absolute inset-0 border border-line bg-[#0a0a0a]"
        animate={{ y: index % 2 === 0 ? 0 : -12, rotate: index % 2 === 0 ? -3 : 3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute top-3 left-1/2 h-3 w-16 -translate-x-1/2 rounded-full bg-white/10" />
        <div className="absolute inset-x-3 top-10 bottom-3 overflow-hidden border border-line/80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(78,124,255,0.22),transparent_50%)]" />
          <p className="absolute top-4 left-4 text-[9px] tracking-[0.2em] text-accent uppercase">{screen?.kicker}</p>
          <p className="absolute top-12 left-4 font-display text-2xl">{screen?.title}</p>
          <p className="absolute bottom-4 left-4 text-[10px] tracking-[0.16em] text-muted uppercase">{screen?.meta}</p>
          <div className="absolute right-4 bottom-16 left-4 h-px bg-line" />
          <div className="absolute right-4 bottom-12 left-4 h-px bg-line" />
        </div>
      </motion.div>
    </div>
  )
}

export function ProjectGallery({ index = 0 }: { index?: number }) {
  return <PhoneStage index={index} />
}
