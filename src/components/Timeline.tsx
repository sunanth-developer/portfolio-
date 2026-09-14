import { useState } from 'react'
import { motion } from 'framer-motion'
import { timeline } from '@/data/timeline'
import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/cn'

export function JourneyTimeline() {
  const [opened, setOpened] = useState<string[]>([])
  const { setCursor, unlock } = useApp()

  return (
    <div>
      {timeline.map((entry) => {
        const revealed = opened.includes(entry.id)
        return (
          <article key={entry.id} className="border-b border-line py-10">
            <p className="eyebrow text-accent">
              {entry.year ? `${entry.year} · ` : ''}
              {entry.stage}
            </p>
            <h3 className={cn('display mt-4 text-4xl md:text-6xl', revealed ? 'text-fg' : 'text-muted/50')}>
              {revealed ? entry.title : '██████████████'}
            </h3>
            {revealed ? (
              <motion.p className="mt-6 max-w-2xl text-muted" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                {entry.body}
              </motion.p>
            ) : (
              <button
                type="button"
                className="mt-8 text-xs tracking-[0.28em] uppercase"
                onClick={() => {
                  setOpened((current) => [...current, entry.id])
                  unlock('journey')
                }}
                onMouseEnter={() => setCursor('open')}
                onMouseLeave={() => setCursor('default')}
              >
                Reveal
              </button>
            )}
          </article>
        )
      })}
    </div>
  )
}

export function Timeline() {
  return <JourneyTimeline />
}
