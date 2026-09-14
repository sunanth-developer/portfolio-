import { useState } from 'react'
import { site } from '@/data/site'
import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/cn'

export function Footer() {
  const { unlock, found, setCursor } = useApp()
  const [open, setOpen] = useState(false)
  const unlocked = found.includes('footer')
  const signal = found.includes('signal')

  return (
    <footer className="relative border-t border-line px-5 py-16 md:px-10 md:py-20">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl tracking-[0.18em] uppercase md:text-4xl">
            {site.name}
          </p>
          <p className="mt-4 text-sm tracking-[0.18em] text-muted uppercase">
            Founder · Developer · Builder
          </p>
        </div>
        <div className="text-sm tracking-[0.16em] text-muted uppercase">
          <p>{site.locationShort}</p>
          <div className="mt-4 flex flex-wrap gap-5">
            <a
              href={`mailto:${site.email}`}
              className="hover:text-fg"
              onMouseEnter={() => setCursor('open')}
              onMouseLeave={() => setCursor('default')}
            >
              Email
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-fg"
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('default')}
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-fg"
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('default')}
            >
              GitHub
            </a>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className={cn('text-left', unlocked && 'text-accent')}
              onMouseEnter={() => setCursor('open')}
              onMouseLeave={() => setCursor('default')}
              onClick={() => {
                setOpen(true)
                unlock('footer')
              }}
              aria-label="Open hidden footer trace"
            >
              © {site.year}
              <span className="ml-3 text-accent/70">· · ·</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 md:hidden"
              onClick={() => unlock('signal')}
              aria-label="Lock frequency signal"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent"
                style={{ opacity: signal ? 1 : 0.45 }}
              />
              FREQ
            </button>
          </div>
        </div>
      </div>
      {open && (
        <p className="mt-10 max-w-md font-display text-sm tracking-[0.08em] text-muted">
          Still compiling. The floor of a system is never the end of it.
        </p>
      )}
    </footer>
  )
}
