import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { scrambleTo } from '@/animations/scramble'
import { useReducedMotion } from '@/hooks/useMediaQuery'

const MESSAGES = [
  'Initializing...',
  'Loading identity...',
  'Loading projects...',
  'Loading experiments...',
  'Loading everything in between...',
]

const SESSION_KEY = 'sunanth-boot'

type LoaderProps = {
  onDone: () => void
}

export function Loader({ onDone }: LoaderProps) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [ready, setReady] = useState(false)
  const [readyText, setReadyText] = useState('SYSTEM READY')
  const [exit, setExit] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === '1' || reduced) {
      onDone()
      return
    }

    const timers: number[] = []
    MESSAGES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setIndex(i), i * 320))
    })
    timers.push(
      window.setTimeout(() => {
        setReady(true)
        scrambleTo('SYSTEM READY', setReadyText, 520)
      }, MESSAGES.length * 320 + 80),
    )
    timers.push(
      window.setTimeout(() => setExit(true), MESSAGES.length * 320 + 720),
    )
    timers.push(
      window.setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, '1')
        onDone()
      }, MESSAGES.length * 320 + 1180),
    )

    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [onDone, reduced])

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          <div className="w-[min(92vw,28rem)] px-6">
            <p className="eyebrow mb-8 text-accent">System</p>
            <div className="space-y-3 font-display text-lg text-muted md:text-xl">
              {MESSAGES.map((line, i) => (
                <p
                  key={line}
                  className="transition-colors duration-500"
                  style={{ color: i === index && !ready ? '#F5F5F5' : '#8A8A8A' }}
                >
                  {i <= index ? line : ''}
                </p>
              ))}
            </div>
            <p
              className="mt-12 font-display text-sm tracking-[0.32em] text-accent"
              style={{ opacity: ready ? 1 : 0 }}
            >
              {readyText}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
