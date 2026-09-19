import { motion } from 'framer-motion'
import { waveEase } from '@/lib/wave'
import { useReducedMotion } from '@/hooks/useMediaQuery'

export function FounderConvergence() {
  const reduced = useReducedMotion()

  return (
    <div className="relative mx-auto max-w-3xl">
      <svg viewBox="0 0 640 280" className="h-auto w-full overflow-visible" aria-hidden>
        <motion.path
          d="M 40 48 L 280 48 C 360 48, 320 140, 400 140 L 600 140"
          fill="none"
          stroke="#FF5A36"
          strokeWidth="1.15"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.9 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: reduced ? 0 : 1.15, ease: waveEase }}
        />
        <motion.path
          d="M 40 140 L 600 140"
          fill="none"
          stroke="#111111"
          strokeWidth="1.15"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.55 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: reduced ? 0 : 1.05, delay: reduced ? 0 : 0.12, ease: waveEase }}
        />
        <motion.path
          d="M 40 232 L 280 232 C 360 232, 320 140, 400 140"
          fill="none"
          stroke="#C99A4A"
          strokeWidth="1.15"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.85 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: reduced ? 0 : 1.15, delay: reduced ? 0 : 0.18, ease: waveEase }}
        />
        <motion.circle
          cx="600"
          cy="140"
          r="4"
          fill="#FF5A36"
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.9, ease: waveEase }}
        />
      </svg>
      <p className="absolute top-0 left-0 font-mono text-[10px] tracking-[0.22em] text-founder uppercase">Founder</p>
      <p className="absolute top-1/2 left-0 -translate-y-1/2 font-mono text-[10px] tracking-[0.22em] uppercase">
        Developer
      </p>
      <p className="absolute bottom-0 left-0 font-mono text-[10px] tracking-[0.22em] text-gold uppercase">
        Curiosity
      </p>
      <motion.p
        className="absolute top-1/2 right-0 hidden -translate-y-[170%] font-mono text-[10px] tracking-[0.2em] text-founder uppercase sm:block"
        initial={reduced ? false : { opacity: 0, x: 8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.85, ease: waveEase }}
      >
        Problem Solver
      </motion.p>
    </div>
  )
}
