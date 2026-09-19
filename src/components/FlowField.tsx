import { motion } from 'framer-motion'
import { useReducedMotion, useIsMobile } from '@/hooks/useMediaQuery'

export function FlowField() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  if (mobile || reduced) return null

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-fg"
      viewBox="0 0 1200 800"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      {[
        'M80 220 C 280 140, 520 280, 780 180 S 1120 240, 1180 160',
        'M40 460 C 260 380, 480 540, 760 420 S 1080 500, 1200 440',
        'M120 640 C 340 560, 560 700, 840 600 S 1100 680, 1180 620',
      ].map((d, index) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity={0.14}
          initial={reduced ? false : { pathLength: 0.2, opacity: 0.28 }}
          animate={reduced ? undefined : { pathLength: [0.25, 0.95, 0.35], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 18 + index * 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
}
