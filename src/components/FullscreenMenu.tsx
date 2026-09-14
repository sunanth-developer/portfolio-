import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useApp } from '@/context/AppContext'
import { navItems, site } from '@/data/site'

export function FullscreenMenu() {
  const { menuOpen, setMenuOpen, goTo, setCursor, setCommandOpen, unlock } = useApp()

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, setMenuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col bg-bg px-6 py-24 md:px-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex flex-1 flex-col justify-center">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                className="group flex items-baseline gap-5 overflow-hidden border-b border-line py-4 text-left md:gap-10 md:py-5"
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.08 + index * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={() => setCursor('default')}
                onClick={() => goTo(item.href, item.index, item.label)}
              >
                <span className="font-display text-xs tracking-[0.24em] text-accent md:text-sm">
                  {item.index}
                </span>
                <span className="display-title text-[12vw] uppercase md:text-7xl lg:text-8xl">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-[11px] tracking-[0.2em] text-muted uppercase">
            <p>{site.locationShort}</p>
            <button
              type="button"
              className="hover:text-fg"
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
