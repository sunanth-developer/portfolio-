import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useApp } from '@/context/AppContext'
import { discoveries, discoveryIds, type DiscoveryId } from '@/data/discoveries'

export function DiscoveryToasts() {
  const { found } = useApp()
  const [toast, setToast] = useState<DiscoveryId | null>(null)
  const prev = useRef(found.length)

  useEffect(() => {
    if (found.length <= prev.current) {
      prev.current = found.length
      return
    }
    const latest = found[found.length - 1]
    prev.current = found.length
    if (!latest || found.length >= discoveryIds.length) return
    setToast(latest)
    const timer = window.setTimeout(() => setToast(null), 2600)
    return () => window.clearTimeout(timer)
  }, [found])

  const meta = toast ? discoveries[toast] : null

  return (
    <AnimatePresence>
      {meta && (
        <motion.div
          className="pointer-events-none fixed right-4 bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-4 z-[70] max-w-sm border border-line bg-bg px-4 py-3 sm:right-auto sm:left-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <p className="eyebrow text-accent">Discovery {meta.index} / 05</p>
          <p className="mt-1 font-display text-sm">{meta.unlock}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function SystemComplete() {
  const { completeOpen, setCompleteOpen, setCursor } = useApp()

  return (
    <AnimatePresence>
      {completeOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-bg px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="System complete"
        >
          <div className="max-w-lg text-center">
            <p className="eyebrow mb-8 text-accent">System complete</p>
            <h2 className="display text-4xl md:text-6xl">You found what most visitors miss.</h2>
            <p className="mt-8 tracking-[0.2em] text-muted uppercase">Keep building.</p>
            <button
              type="button"
              className="mt-12 flex min-h-11 items-center justify-center text-xs tracking-[0.28em] uppercase"
              onClick={() => setCompleteOpen(false)}
              onMouseEnter={() => setCursor('close')}
              onMouseLeave={() => setCursor('default')}
            >
              Continue
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
