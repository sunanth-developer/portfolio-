import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { projects } from '@/data/projects'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { traceEase } from '@/lib/trace'

export function PageTransition() {
  const { transition, profile } = useApp()
  const reduced = useReducedMotion()
  const project = projects.find((item) => item.title === transition.label)
  const projectOpen = Boolean(project) && profile === 'developer'

  return (
    <AnimatePresence>
      {transition.active && (
        <motion.div
          className="fixed inset-0 z-[75] flex flex-col items-center justify-center overflow-hidden bg-bg"
          initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0 0% 0)' }}
          exit={reduced ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: reduced ? 0.12 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          {projectOpen ? (
            <>
              <motion.p
                className="display text-[16vw] leading-none md:text-[8rem]"
                initial={reduced ? false : { opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduced ? 0 : 0.5, ease: traceEase }}
              >
                {transition.label}
              </motion.p>
              <motion.span
                className="mt-8 h-px w-32 origin-left bg-developer/70"
                initial={reduced ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduced ? 0 : 0.45 }}
              />
            </>
          ) : (
            <>
              <motion.p
                className="font-mono text-[11px] tracking-[0.42em] text-muted uppercase"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {transition.label}
              </motion.p>
              <motion.span
                className="mt-8 h-px w-24 origin-left bg-accent"
                initial={reduced ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduced ? 0 : 0.55 }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function GrainOverlay() {
  return <div className="grain" aria-hidden />
}
