import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useApp } from '@/context/AppContext'
import { site } from '@/data/site'
import { ProfileSwitcher } from '@/components/ProfileSwitcher'

export function FullscreenMenu() {
  const { menuOpen, setMenuOpen, goTo, setCursor, setCommandOpen, unlock, nav, profile } = useApp()

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen, setMenuOpen])

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-bg px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))] md:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-display text-[11px] tracking-[0.32em] uppercase">{site.shortName}</p>
            <button
              type="button"
              className="flex min-h-11 min-w-11 items-center justify-end font-mono text-[10px] tracking-[0.28em] uppercase hover:text-accent"
              aria-label="Close menu"
              onMouseEnter={() => setCursor('close')}
              onMouseLeave={() => setCursor('default')}
              onClick={() => setMenuOpen(false)}
            >
              Close
            </button>
          </div>
          {profile !== 'neutral' && (
            <div className="mt-6 sm:hidden">
              <ProfileSwitcher />
            </div>
          )}
          <div className="flex flex-1 flex-col justify-center py-6 md:px-8">
            <motion.button
              type="button"
              className="flex min-h-14 flex-col border-b border-line py-3 text-left md:flex-row md:items-end md:justify-between md:py-5"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.04, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('default')}
              onClick={() => goTo('/', '00', 'Perspectives')}
            >
              <span className="flex items-baseline gap-4 md:gap-8">
                <span className="font-mono text-xs tracking-[0.2em] text-accent">00</span>
                <span className="display text-4xl uppercase md:text-6xl lg:text-7xl">Perspectives</span>
              </span>
              <span className="mt-1 max-w-sm text-sm text-muted md:mt-0 md:text-right">
                Choose how you want to explore.
              </span>
            </motion.button>
            {nav.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                className="flex min-h-14 flex-col border-b border-line py-3 text-left md:flex-row md:items-end md:justify-between md:py-5"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.08 + index * 0.05, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={() => setCursor('default')}
                onClick={() => goTo(item.href, item.index, item.label)}
              >
                <span className="flex items-baseline gap-4 md:gap-8">
                  <span className="font-mono text-xs tracking-[0.2em] text-accent">{item.index}</span>
                  <span className="display text-4xl uppercase md:text-6xl lg:text-7xl">{item.label}</span>
                </span>
                <span className="mt-1 max-w-sm text-sm text-muted md:mt-0 md:text-right">
                  {item.description}
                </span>
              </motion.button>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between text-[10px] tracking-[0.2em] text-muted uppercase">
            <p>{site.locationShort}</p>
            <button
              type="button"
              className="flex min-h-11 items-center font-mono"
              onClick={() => {
                setMenuOpen(false)
                setCommandOpen(true)
                unlock('command')
              }}
            >
              Press K
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
