import { useEffect, useState } from 'react'
import { useApp } from '@/context/AppContext'
import { desktopNav, site } from '@/data/site'
import { cn } from '@/lib/cn'
import { metaForPath } from '@/lib/routes'
import { useLocation } from 'react-router-dom'

export function Navbar() {
  const { menuOpen, setMenuOpen, goTo, setCursor, setCommandOpen } = useApp()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 px-5 py-5 transition-colors duration-300 md:px-8',
        scrolled && 'border-b border-line bg-bg/85',
      )}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="font-display text-[11px] tracking-[0.32em] uppercase"
          aria-label="Home"
          onMouseEnter={() => setCursor('view')}
          onMouseLeave={() => setCursor('default')}
          onClick={() => goTo('/', '00', 'Index')}
        >
          <span className="md:hidden">{site.monogram}</span>
          <span className="hidden md:inline">{site.shortName}</span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {desktopNav.map((item) => (
            <button
              key={item.href}
              type="button"
              className={cn(
                'text-[10px] tracking-[0.22em] uppercase transition-colors',
                location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
                  ? 'text-fg'
                  : 'text-muted hover:text-fg',
              )}
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('default')}
              onClick={() => {
                const meta = metaForPath(item.href)
                goTo(item.href, meta.number, meta.label)
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button
            type="button"
            className="font-display text-[10px] tracking-[0.2em] text-muted uppercase md:hidden"
            onClick={() => setCommandOpen(true)}
            aria-label="Open command"
          >
            {'>_'}
          </button>
          <button
            type="button"
            className="font-display text-[10px] tracking-[0.28em] uppercase"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onMouseEnter={() => setCursor(menuOpen ? 'close' : 'open')}
            onMouseLeave={() => setCursor('default')}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  )
}
