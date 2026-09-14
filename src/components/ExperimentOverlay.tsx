import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { experiments } from '@/data/experiments'
import { useApp } from '@/context/AppContext'

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
          className="fixed inset-0 z-[65] overflow-y-auto overscroll-contain bg-bg px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] md:px-16 md:py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={experiment.title}
        >
          <button
            type="button"
            className="sticky top-0 z-10 ml-auto flex min-h-11 items-center bg-bg text-[11px] tracking-[0.24em] uppercase"
            onClick={() => setExperimentId(null)}
            onMouseEnter={() => setCursor('close')}
            onMouseLeave={() => setCursor('default')}
          >
            Close
          </button>
          <p className="eyebrow text-accent">{experiment.code}</p>
          <h2 className="display mt-8 max-w-4xl text-4xl md:text-8xl">{experiment.title}</h2>
          <p className="mt-6 text-xs tracking-[0.2em] text-accent uppercase">{experiment.status}</p>
          <p className="mt-10 max-w-2xl text-lg text-muted">{experiment.body}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
