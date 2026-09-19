import { motion } from 'framer-motion'
import { waveEase } from '@/lib/wave'
import type { HomeLens } from '@/components/home/types'

export function OriginTrace({ active, selected, phase, reduced }: HomeLens) {
  const ready = phase >= 1
  const collapse = Boolean(selected)
  const founderStroke = active === 'founder' ? '#6B1200' : '#E8330A'
  const developerStroke = active === 'developer' ? '#7EF0C0' : '#148A5C'

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox="0 0 1200 520"
      fill="none"
      aria-hidden
    >
      <motion.rect
        x="592"
        y="248"
        width="16"
        height="16"
        stroke="currentColor"
        strokeOpacity="0.28"
        initial={false}
        animate={{
          opacity: ready ? 1 : 0,
          scale: collapse ? 1.8 : 1,
          rotate: collapse ? 45 : 0,
        }}
        transition={{ duration: reduced ? 0 : 0.7, ease: waveEase }}
        style={{ transformOrigin: '600px 256px' }}
      />
      <motion.circle
        cx="600"
        cy="256"
        r="2.4"
        fill="currentColor"
        initial={false}
        animate={{ opacity: ready ? 0.85 : 0, scale: collapse ? 1.6 : 1 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: waveEase }}
      />

      <motion.path
        d="M 600 256 C 500 270, 360 210, 220 168"
        stroke={founderStroke}
        strokeWidth={active === 'developer' ? 0.8 : 1.4}
        strokeLinecap="round"
        initial={false}
        animate={{
          pathLength: ready ? 1 : 0,
          opacity: ready ? (active === 'developer' ? 0.1 : active === 'founder' ? 0.95 : 0.28) : 0,
        }}
        transition={{ duration: reduced ? 0 : 0.9, ease: waveEase }}
      />
      <motion.path
        d="M 220 168 C 190 154, 170 176, 148 162"
        stroke={founderStroke}
        strokeWidth="0.8"
        strokeLinecap="round"
        initial={false}
        animate={{
          pathLength: ready && active !== 'developer' ? 1 : 0,
          opacity: ready && active !== 'developer' ? (active === 'founder' ? 0.55 : 0.18) : 0,
        }}
        transition={{ duration: reduced ? 0 : 0.8, ease: waveEase }}
      />

      <motion.path
        d="M 600 256 L 690 276 L 860 276 L 1000 150"
        stroke={developerStroke}
        strokeWidth={active === 'founder' ? 0.8 : 1.4}
        strokeLinejoin="miter"
        strokeLinecap="square"
        initial={false}
        animate={{
          pathLength: ready ? 1 : 0,
          opacity: ready ? (active === 'founder' ? 0.1 : active === 'developer' ? 0.95 : 0.26) : 0,
        }}
        transition={{ duration: reduced ? 0 : 0.9, ease: waveEase }}
      />
      <motion.path
        d="M 860 276 L 860 330"
        stroke="#72B9FF"
        strokeWidth="0.8"
        initial={false}
        animate={{
          pathLength: ready && active !== 'founder' ? 1 : 0,
          opacity: ready && active !== 'founder' ? (active === 'developer' ? 0.5 : 0.16) : 0,
        }}
        transition={{ duration: reduced ? 0 : 0.7, ease: waveEase }}
      />

      <motion.circle
        cx="148"
        cy="162"
        r="3"
        fill={founderStroke}
        initial={false}
        animate={{ opacity: ready ? (active === 'developer' ? 0.12 : 0.9) : 0 }}
      />
      <motion.circle
        cx="1000"
        cy="150"
        r="3"
        fill={developerStroke}
        initial={false}
        animate={{ opacity: ready ? (active === 'founder' ? 0.12 : 0.9) : 0 }}
      />
    </svg>
  )
}
