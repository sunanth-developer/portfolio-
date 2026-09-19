import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { waveEase } from '@/lib/wave'

export function ProfileTransition() {
  const { profileSwitch } = useApp()
  const reduced = useReducedMotion()
  const toDeveloper = profileSwitch.to === 'developer'
  const fromGate = profileSwitch.from === 'neutral'
  const accent = toDeveloper ? '#63F5C2' : '#FF5A36'
  const surface = toDeveloper ? '#080909' : '#F5F3ED'

  return (
    <AnimatePresence>
      {profileSwitch.active && (
        <motion.div
          className="fixed inset-0 z-[78] flex flex-col items-center justify-center"
          style={{ background: surface, color: toDeveloper ? '#F5F4EF' : '#111111' }}
          initial={
            reduced
              ? { opacity: 0 }
              : fromGate
                ? { clipPath: toDeveloper ? 'circle(0% at 78% 62%)' : 'circle(0% at 22% 62%)' }
                : { clipPath: toDeveloper ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }
          }
          animate={reduced ? { opacity: 1 } : { clipPath: fromGate ? 'circle(140% at 50% 50%)' : 'inset(0% 0 0% 0)' }}
          exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: reduced ? 0.08 : fromGate ? 1.05 : 0.5, ease: waveEase }}
          role="status"
          aria-live="polite"
          aria-label={`${fromGate ? 'Entering' : 'Switching'} profile to ${profileSwitch.to}`}
        >
          <p className="font-mono text-[10px] tracking-[0.42em] uppercase opacity-55">
            {fromGate ? 'Entering' : 'Switching profile'}
          </p>
          <motion.span
            className="mt-8 block h-px w-28 origin-center"
            style={{ background: accent }}
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduced ? 0 : 0.6, ease: waveEase }}
            aria-hidden
          />
          <p className="mt-8 font-display text-4xl tracking-[0.08em] uppercase md:text-6xl" style={{ color: accent }}>
            {profileSwitch.to}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
