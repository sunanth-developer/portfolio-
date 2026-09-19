import { useState } from 'react'
import { site } from '@/data/site'
import { useApp } from '@/context/AppContext'
import { ProfileSwitcher } from '@/components/ProfileSwitcher'
import { cn } from '@/lib/cn'

export function Footer() {
  const { unlock, found, setCursor } = useApp()
  const [open, setOpen] = useState(false)
  const [statusHits, setStatusHits] = useState(0)

  return (
    <footer className="border-t border-line py-16 pb-[max(4rem,env(safe-area-inset-bottom))] md:py-20">
      <div className="container flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl tracking-[0.16em] uppercase md:text-4xl">{site.name}</p>
          <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
            {site.title}
          </p>
          <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-meta uppercase">
            Two perspectives. One problem-solving mindset.
          </p>
        </div>
        <div className="text-xs tracking-[0.16em] text-muted uppercase">
          <p>{site.locationShort}</p>
          <div className="mt-5">
            <ProfileSwitcher layout="footer" />
          </div>
          <div className="mt-4 flex flex-wrap gap-5">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center hover:text-fg"
              onMouseEnter={() => setCursor('open')}
              onMouseLeave={() => setCursor('default')}
            >
              Email
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center hover:text-fg"
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('default')}
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center hover:text-fg"
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('default')}
            >
              GitHub
            </a>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-6">
            <button
              type="button"
              className={cn('inline-flex min-h-11 items-center', found.includes('footer') && 'text-accent')}
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
              className="min-h-11 text-left"
              onClick={() => {
                const next = statusHits + 1
                setStatusHits(next)
                if (next >= 2) unlock('status')
              }}
              aria-label="Status building"
            >
              <span className="text-muted">Status</span>
              <span className="ml-2 text-accent">● {site.status}</span>
            </button>
          </div>
        </div>
      </div>
      {open && (
        <p className="mt-8 max-w-md text-sm text-muted">
          Still compiling. The floor of a system is never the end of it.
        </p>
      )}
    </footer>
  )
}
