import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { scrambleTo } from '@/animations/scramble'
import { useReducedMotion } from '@/hooks/useMediaQuery'

const STEPS = ['IDENTITY', 'PRODUCTS', 'ENGINEERING', 'EXPERIMENTS'] as const
const SESSION_KEY = 'sunanth-boot-v2'

export function Loader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion()
  const [doneCount, setDoneCount] = useState(0)
  const [ready, setReady] = useState('')
  const [exit, setExit] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === '1' || reduced) {
      onDone()
      return
    }

    const timers: number[] = []
    STEPS.forEach((_, i) => {
      timers.push(window.setTimeout(() => setDoneCount(i + 1), 280 + i * 320))
    })
    timers.push(
      window.setTimeout(() => {
        scrambleTo('SYSTEM READY', setReady, 420)
      }, 280 + STEPS.length * 320),
    )
    timers.push(
      window.setTimeout(() => setExit(true), 280 + STEPS.length * 320 + 520),
    )
    timers.push(
      window.setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, '1')
        onDone()
      }, 280 + STEPS.length * 320 + 820),
    )
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [onDone, reduced])

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="status"
          aria-label="Loading"
        >
          <div className="w-[min(92vw,22rem)]">
            <p className="eyebrow mb-10 text-accent">Initializing...</p>
            <ul className="space-y-4 font-display text-sm tracking-[0.22em]">
              {STEPS.map((step, i) => (
                <li key={step} className="flex items-center justify-between">
                  <span className={i < doneCount ? 'text-fg' : 'text-muted/40'}>{step}</span>
                  <span className="text-accent">{i < doneCount ? '✓' : ''}</span>
                </li>
              ))}
            </ul>
            <p className="mt-12 text-xs tracking-[0.32em] text-accent">{ready}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
