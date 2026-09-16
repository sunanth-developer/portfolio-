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
          initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0 0% 0)' }}
          exit={reduced ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: reduced ? 0.12 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <motion.p
            className="font-mono text-[11px] tracking-[0.42em] text-muted uppercase"
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
