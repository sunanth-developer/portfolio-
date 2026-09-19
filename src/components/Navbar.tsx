import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { homePath, metaForPath } from '@/lib/routes'

const founderLinks = [
  { label: 'Story', href: '/founder' },
  { label: 'DriverSpot', href: '/work/driverspot' },
  { label: 'Thinking', href: '/notes' },
  { label: 'Contact', href: '/contact' },
] as const

const developerLinks = [
  { label: 'Projects', href: '/work' },
  { label: 'Engineering', href: '/engineering' },
  { label: 'Lab', href: '/lab' },
  { label: 'Contact', href: '/contact' },
] as const

export function Navbar() {
  const { menuOpen, setMenuOpen, goTo, setCursor, profile, switchProfile } = useApp()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const isGate = location.pathname === '/'
  const links = profile === 'developer' ? developerLinks : founderLinks

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
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
        'fixed top-0 right-0 left-0 z-50 pt-[max(0.7rem,env(safe-area-inset-top))] text-fg transition-[padding,background,box-shadow,border-color] duration-500',
        scrolled ? 'nav-glass py-2.5' : 'py-4',
      )}
    >
      <div className="container relative z-10 flex items-center justify-between gap-3 sm:gap-6">
        <div className="flex min-w-0 items-center gap-5">
          <button
            type="button"
            className="flex min-h-11 items-center font-display text-[13px] font-medium tracking-[0.22em] uppercase"
            aria-label={isGate ? site.name : 'Home'}
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={() => setCursor('default')}
            onClick={goHome}
          >
            <span className="md:hidden">{site.monogram}</span>
            <span className="hidden md:inline">{site.name}</span>
          </button>
          {!isGate && (
            <p className="hidden font-mono text-[11px] tracking-[0.2em] text-fg/70 uppercase lg:block">
              {profile === 'developer' ? 'Developer' : 'Founder'}
            </p>
          )}
        </div>

        {isGate ? (
          <p className="hidden font-mono text-[11px] tracking-[0.2em] text-fg/75 uppercase md:block">
            One person · Two perspectives
          </p>
        ) : (
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.map((item) => {
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
                    'nav-link min-h-11 font-mono text-[12px] font-medium tracking-[0.18em] uppercase',
                    active ? 'text-fg' : 'text-fg/70 hover:text-fg',
                  )}
                  onMouseEnter={() => setCursor('view')}
                  onMouseLeave={() => setCursor('default')}
                  onClick={() => goTo(item.href, '00', item.label)}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>
        )}

        <div className="flex items-center gap-5">
          {!isGate && (
            <button
              type="button"
              className="hidden min-h-11 items-center font-mono text-[12px] font-medium tracking-[0.18em] text-fg uppercase sm:inline-flex"
              onMouseEnter={() => setCursor(profile === 'developer' ? 'founder' : 'developer')}
              onMouseLeave={() => setCursor('default')}
              onClick={() => switchProfile(profile === 'developer' ? 'founder' : 'developer')}
            >
              {profile === 'developer' ? 'Founder ↗' : 'Developer ↗'}
            </button>
          )}
          <button
            type="button"
            className="flex min-h-11 items-center font-mono text-[12px] font-medium tracking-[0.2em] text-fg uppercase"
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
