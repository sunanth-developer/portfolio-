import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { useReducedMotion } from '@/hooks/useMediaQuery'

export function ProfileTransition() {
  const { profileSwitch } = useApp()
  const reduced = useReducedMotion()
  const toLabel = profileSwitch.to === 'founder' ? 'founder experience' : 'developer experience'

  return (
    <AnimatePresence>
      {profileSwitch.active && (
        <motion.div
          className="fixed inset-0 z-[78] flex flex-col items-center justify-center bg-bg"
          initial={reduced ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
          animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)' }}
          exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: reduced ? 0.08 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
          aria-label={`Switching profile to ${profileSwitch.to}`}
        >
          <p className="font-mono text-[10px] tracking-[0.42em] text-meta uppercase">Switching profile</p>
          <div className="mt-8 flex items-center gap-5 font-display text-3xl tracking-[0.08em] uppercase md:text-5xl">
            <span className={profileSwitch.from === 'founder' ? 'text-founder' : 'text-developer'}>
              {profileSwitch.from}
            </span>
            <motion.span
              className="text-muted"
              aria-hidden
              initial={reduced ? false : { x: -8, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.35 }}
            >
              →
            </motion.span>
            <span className={profileSwitch.to === 'founder' ? 'text-founder' : 'text-developer'}>
              {profileSwitch.to}
            </span>
          </div>
          <p className="mt-8 font-mono text-[10px] tracking-[0.24em] text-meta uppercase">Loading {toLabel}</p>
          <div className="mt-4 h-px w-40 overflow-hidden bg-line">
            <motion.span
              className="block h-full origin-left"
              style={{
                background:
                  profileSwitch.to === 'developer' ? 'var(--color-developer)' : 'var(--color-founder)',
              }}
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduced ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
