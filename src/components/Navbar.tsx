import { useApp } from '@/context/AppContext'
import { desktopNav, site } from '@/data/site'
import { cn } from '@/lib/cn'
import { metaForPath } from '@/lib/routes'
import { useLocation } from 'react-router-dom'

export function Navbar() {
  const { menuOpen, setMenuOpen, goTo, setCursor } = useApp()
  const location = useLocation()

  return (
    <header className="fixed top-0 right-0 left-0 z-40 px-5 pt-7 md:px-10">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="font-display text-sm tracking-[0.28em] uppercase"
          aria-label="Sunanth home"
          onMouseEnter={() => setCursor('view')}
          onMouseLeave={() => setCursor('default')}
          onClick={() => goTo('/', '00', 'Index')}
        >
          <span className="md:hidden">{site.monogram}</span>
          <span className="hidden md:inline">{site.shortName}</span>
        </button>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {desktopNav.map((item) => (
            <button
              key={item.href}
              type="button"
              className={cn(
                'font-display text-[11px] tracking-[0.22em] uppercase transition-colors',
                location.pathname === item.href ? 'text-fg' : 'text-muted hover:text-fg',
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

        <button
          type="button"
          className="font-display text-[11px] tracking-[0.28em] uppercase"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onMouseEnter={() => setCursor(menuOpen ? 'close' : 'open')}
          onMouseLeave={() => setCursor('default')}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  )
}
