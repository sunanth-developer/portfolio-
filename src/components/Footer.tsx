import { useState } from 'react'
import { site } from '@/data/site'
import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/cn'

export function Footer() {
  const { unlock, found, setCursor } = useApp()
  const [open, setOpen] = useState(false)
  const [statusHits, setStatusHits] = useState(0)

  return (
    <footer className="border-t border-line px-5 py-16 md:px-8 md:py-20">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl tracking-[0.16em] uppercase md:text-4xl">{site.name}</p>
          <p className="mt-4 text-xs tracking-[0.18em] text-muted uppercase">Founder · Developer · Builder</p>
        </div>
        <div className="text-xs tracking-[0.16em] text-muted uppercase">
          <p>{site.locationShort}</p>
          <div className="mt-4 flex flex-wrap gap-5">
            <a href={`mailto:${site.email}`} className="hover:text-fg" onMouseEnter={() => setCursor('open')} onMouseLeave={() => setCursor('default')}>
              Email
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-fg" onMouseEnter={() => setCursor('view')} onMouseLeave={() => setCursor('default')}>
              LinkedIn
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-fg" onMouseEnter={() => setCursor('view')} onMouseLeave={() => setCursor('default')}>
              GitHub
            </a>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-6">
            <button
              type="button"
              className={cn(found.includes('footer') && 'text-accent')}
              onClick={() => {
                setOpen(true)
                unlock('footer')
              }}
              aria-label="Open footer trace"
            >
              © {site.year}
              <span className="ml-2 text-accent/70">· · ·</span>
            </button>
            <button
              type="button"
              className="text-left"
              onClick={() => {
                const next = statusHits + 1
                setStatusHits(next)
                if (next >= 2) unlock('status')
              }}
              aria-label="Status building"
            >
              <span className="text-muted">Status</span>
              <span className="ml-2 text-accent">{site.status}</span>
            </button>
          </div>
        </div>
      </div>
      {open && <p className="mt-8 max-w-md text-sm text-muted">Still compiling. The floor of a system is never the end of it.</p>}
    </footer>
  )
}
