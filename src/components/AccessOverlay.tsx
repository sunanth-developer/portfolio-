import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { accessLayer } from '@/data/site'
import { useApp } from '@/context/AppContext'

export function AccessOverlay() {
  const { accessOpen, setAccessOpen, unlock, setCursor } = useApp()
  const [step, setStep] = useState(0)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!accessOpen) {
      setStep(0)
      setActive(null)
      return
    }
    unlock('access')
    const t1 = window.setTimeout(() => setStep(1), 650)
    const t2 = window.setTimeout(() => setStep(2), 1400)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [accessOpen, unlock])

  useEffect(() => {
    if (!accessOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAccessOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [accessOpen, setAccessOpen])

  return (
    <AnimatePresence>
      {accessOpen && (
        <motion.div
          className="fixed inset-0 z-[65] overflow-y-auto overscroll-contain bg-bg px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] md:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Access layer"
        >
          <div className="mx-auto flex min-h-[100svh] max-w-3xl flex-col md:justify-center">
          <button
            type="button"
            className="ml-auto flex min-h-11 items-center text-[11px] tracking-[0.28em] uppercase"
            onClick={() => setAccessOpen(false)}
            onMouseEnter={() => setCursor('close')}
            onMouseLeave={() => setCursor('default')}
          >
            Close
          </button>
          <div className="w-full max-w-3xl">
            <p className="mb-10 font-mono text-[10px] tracking-[0.28em] text-meta uppercase">Access</p>
            <p className="display mb-5 text-3xl md:text-5xl">{step >= 0 ? accessLayer.lines[0] : ''}</p>
            <p className="mb-16 text-xl text-muted md:text-3xl">{step >= 1 ? accessLayer.lines[1] : ''}</p>
            {step >= 2 && (
              <ul>
                {accessLayer.identities.map((item) => (
                  <li key={item.id} className="border-b border-line">
                    <button
                      type="button"
                      className="w-full py-4 text-left"
                      onClick={() => setActive(active === item.id ? null : item.id)}
                      onMouseEnter={() => setCursor('open')}
                      onMouseLeave={() => setCursor('default')}
                    >
                      <span className="font-display text-2xl uppercase md:text-4xl">{item.label}</span>
                      {active === item.id && (
                        <p className="mt-3 max-w-xl text-sm text-muted md:text-base">{item.description}</p>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
