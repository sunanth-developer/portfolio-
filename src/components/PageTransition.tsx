import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { useReducedMotion } from '@/hooks/useMediaQuery'

export function PageTransition() {
  const { transition } = useApp()
  const reduced = useReducedMotion()

  return (
    <AnimatePresence>
      {transition.active && (
        <motion.div
          className="fixed inset-0 z-[75] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.12 : 0.45 }}
          aria-hidden
        >
          <motion.p
            className="font-display text-sm tracking-[0.42em] text-muted uppercase"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {transition.number} / {transition.label}
          </motion.p>
          <motion.span
            className="mt-8 h-px w-24 origin-left bg-accent"
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduced ? 0 : 0.55 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function GrainOverlay() {
  return <div className="grain" aria-hidden />
}
