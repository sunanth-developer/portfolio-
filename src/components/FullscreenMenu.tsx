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
          className="fixed inset-0 z-[60] flex flex-col bg-bg px-6 py-24 md:px-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-1 flex-col justify-center">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                className="flex flex-col border-b border-line py-4 text-left md:flex-row md:items-end md:justify-between md:py-5"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.06 + index * 0.05, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={() => setCursor('default')}
                onClick={() => goTo(item.href, item.index, item.label)}
              >
                <span className="flex items-baseline gap-4 md:gap-8">
                  <span className="text-xs tracking-[0.2em] text-accent">{item.index}</span>
                  <span className="display text-[11vw] uppercase md:text-6xl lg:text-7xl">{item.label}</span>
                </span>
                <span className="mt-2 max-w-sm text-sm text-muted md:mt-0 md:text-right">
                  {item.description}
                </span>
              </motion.button>
            ))}
          </div>
          <div className="mt-8 flex justify-between text-[10px] tracking-[0.2em] text-muted uppercase">
            <p>{site.locationShort}</p>
            <button
              type="button"
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
