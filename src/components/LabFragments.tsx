import { motion } from 'framer-motion'
import type { Experiment } from '@/data/experiments'
import { experiments } from '@/data/experiments'
import { useApp } from '@/context/AppContext'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { traceEase } from '@/lib/trace'

export function LabFragments({ items = experiments }: { items?: Experiment[] }) {
  const { setExperimentId, setCursor } = useApp()
  const reduced = useReducedMotion()

  return (
    <ul className="max-w-3xl">
      {items.map((experiment, index) => (
        <motion.li
          key={experiment.id}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : index * 0.05, ease: traceEase }}
        >
          <button
            type="button"
            className="group flex w-full min-h-11 flex-col items-start py-7 text-left"
            onClick={() => setExperimentId(experiment.id)}
            onMouseEnter={() => setCursor('inspect')}
            onMouseLeave={() => setCursor('default')}
          >
            <p className="font-mono text-[10px] tracking-[0.2em] text-meta uppercase">
              {experiment.category} · {experiment.status}
            </p>
            <h3 className="display mt-3 text-2xl md:text-4xl">{experiment.title}</h3>
            <p className="mt-3 max-w-xl text-muted">{experiment.summary}</p>
            <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-developer uppercase">
              Still exploring →
            </p>
          </button>
        </motion.li>
      ))}
    </ul>
  )
}

export function LabPath() {
  const reduced = useReducedMotion()
  const stages = [
    { label: 'QUESTION', note: 'A trace begins.' },
    { label: 'EXPERIMENT', note: 'The line branches.' },
    { label: 'STILL EXPLORING', note: 'Curiosity, not a launch.' },
  ] as const

  return (
    <ol className="mt-12 flex max-w-3xl flex-col gap-8 md:flex-row md:gap-10">
      {stages.map((stage, index) => (
        <motion.li
          key={stage.label}
          className="flex-1"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : index * 0.1, ease: traceEase }}
        >
          <p className="font-mono text-[10px] tracking-[0.22em] text-developer uppercase">{stage.label}</p>
          <p className="mt-3 text-sm text-muted">{stage.note}</p>
        </motion.li>
      ))}
    </ol>
  )
}
