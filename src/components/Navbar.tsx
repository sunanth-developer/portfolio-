import { useEffect, useState } from 'react'
import { useApp } from '@/context/AppContext'
import { site } from '@/data/site'
import { ProfileSwitcher } from '@/components/ProfileSwitcher'
import { cn } from '@/lib/cn'
import { homePath, metaForPath } from '@/lib/routes'
import { useLocation } from 'react-router-dom'

export function Navbar() {
  const { menuOpen, setMenuOpen, goTo, setCursor, setCommandOpen, profile, nav } = useApp()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const isGate = location.pathname === '/'
  const desktopItems = nav.filter((item) => item.id !== 'home' && item.id !== 'contact')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goHome = () => {
    if (isGate) {
      window.scrollTo(0, 0)
      return
    }
    const href = homePath(profile)
    const meta = metaForPath(href)
    goTo(href, meta.number, meta.label)
  }

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 px-5 pt-[max(0.75rem,env(safe-area-inset-top))] transition-[padding,background-color,border-color] duration-300 md:px-8',
        scrolled && !isGate ? 'border-b border-line bg-bg/92 py-2.5' : 'py-4',
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          className="flex min-h-11 items-center font-display text-[11px] tracking-[0.28em] uppercase"
          aria-label={isGate ? site.name : 'Home'}
          onMouseEnter={() => setCursor('view')}
          onMouseLeave={() => setCursor('default')}
          onClick={goHome}
        >
          <span className="md:hidden">{site.monogram}</span>
          <span className="hidden md:inline">{site.name}</span>
        </button>

        {isGate ? (
          <p className="hidden font-mono text-[10px] tracking-[0.28em] text-muted uppercase lg:block">
            {site.title}
          </p>
        ) : (
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {desktopItems.map((item) => {
              const active =
                location.pathname === item.href ||
                (item.href !== '/work' && location.pathname.startsWith(`${item.href}/`)) ||
                (item.href === '/work' && location.pathname.startsWith('/work'))
              return (
                <button
                  key={item.href}
                  type="button"
                  data-active={active}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'nav-link font-mono text-[10px] tracking-[0.22em] uppercase transition-colors',
                    active ? 'text-accent' : 'text-muted hover:text-fg',
                  )}
                  onMouseEnter={() => setCursor('view')}
                  onMouseLeave={() => setCursor('default')}
                  onClick={() => goTo(item.href, item.index, item.label)}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>
        )}

        <div className="flex items-center gap-3 md:gap-5">
          {isGate ? (
            <p className="hidden font-mono text-[10px] tracking-[0.22em] text-meta uppercase sm:block">
              {site.locationShort}
            </p>
          ) : (
            <ProfileSwitcher className="hidden sm:inline-flex" />
          )}
          {!isGate && (
            <button
              type="button"
              className="flex min-h-11 min-w-11 items-center justify-center font-mono text-[10px] tracking-[0.2em] text-muted uppercase md:hidden"
              onClick={() => setCommandOpen(true)}
              aria-label="Open command"
            >
              {'>_'}
            </button>
          )}
          <button
            type="button"
            className="flex min-h-11 items-center font-mono text-[10px] tracking-[0.28em] uppercase"
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
