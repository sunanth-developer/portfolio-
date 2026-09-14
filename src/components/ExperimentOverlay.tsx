import { AnimatePresence, motion } from 'framer-motion'
import { experiments } from '@/data/experiments'
import { useApp } from '@/context/AppContext'
import { useEffect } from 'react'

export function ExperimentOverlay() {
  const { experimentId, setExperimentId, setCursor } = useApp()
  const experiment = experiments.find((item) => item.id === experimentId) ?? null

  useEffect(() => {
    if (!experiment) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExperimentId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [experiment, setExperimentId])

  return (
    <AnimatePresence>
      {experiment && (
        <motion.div
          className="fixed inset-0 z-[65] overflow-y-auto bg-bg px-6 py-24 md:px-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={experiment.title}
        >
          <button
            type="button"
            className="absolute top-8 right-8 font-display text-[11px] tracking-[0.24em] uppercase"
            onClick={() => setExperimentId(null)}
            onMouseEnter={() => setCursor('close')}
            onMouseLeave={() => setCursor('default')}
          >
            Close
          </button>
          <p className="eyebrow text-accent">{experiment.code}</p>
          <p className="mt-3 text-xs tracking-[0.2em] text-muted uppercase">{experiment.category}</p>
          <h2 className="display-title mt-10 max-w-4xl text-5xl md:text-8xl">{experiment.title}</h2>
          <p className="mt-8 text-xs tracking-[0.2em] text-accent uppercase">{experiment.status}</p>
          <p className="mt-10 max-w-2xl text-lg text-muted">{experiment.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            {experiment.stack.map((item) => (
              <span key={item} className="border border-line px-3 py-2 text-xs tracking-[0.16em] uppercase">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
