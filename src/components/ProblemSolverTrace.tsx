import { motion } from 'framer-motion'
import { TraceLine } from '@/components/TraceLine'
import { resolveTrace } from '@/data/developer'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { traceEase } from '@/lib/trace'

export function ProblemSolverTrace() {
  const reduced = useReducedMotion()

  return (
    <div className="relative">
      <div className="relative mx-auto h-48 max-w-xl md:h-56">
        <svg viewBox="0 0 320 180" className="h-full w-full overflow-visible" aria-hidden>
          <TraceLine d="M 40 28 L 160 150" drawn duration={1.1} delay={0.1} />
          <TraceLine d="M 280 28 L 160 150" drawn duration={1.1} delay={0.22} />
          <TraceLine
            d="M 160 150 L 160 176"
            drawn
            duration={0.45}
            delay={0.9}
            stroke="rgba(99,245,194,0.9)"
          />
        </svg>
        <motion.p
          className="absolute top-0 left-0 font-mono text-[10px] tracking-[0.22em] text-founder uppercase"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.5, ease: traceEase }}
        >
          {resolveTrace[0]}
        </motion.p>
        <motion.p
          className="absolute top-0 right-0 font-mono text-[10px] tracking-[0.22em] text-developer uppercase"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.12, ease: traceEase }}
        >
          {resolveTrace[1]}
        </motion.p>
      </div>
      <motion.h2
        className="type-xl"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.35, ease: traceEase }}
      >
        {resolveTrace[2]}
      </motion.h2>
    </div>
  )
}

export function MindsetTrace() {
  const reduced = useReducedMotion()
  const steps = ['IDEA', 'SYSTEM', 'EDGE CASE', 'SOLUTION'] as const

  return (
    <ol className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3">
      {steps.map((step, index) => (
        <motion.li
          key={step}
          className="flex items-center gap-4"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : index * 0.08, ease: traceEase }}
        >
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase">{step}</span>
          {index < steps.length - 1 && (
            <span className="h-px w-8 bg-developer/70 md:w-12" aria-hidden />
          )}
        </motion.li>
      ))}
    </ol>
  )
}
