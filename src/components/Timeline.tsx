import { useState } from 'react'
import { motion } from 'framer-motion'
import { timeline } from '@/data/timeline'
import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/cn'

export function Timeline() {
  const [opened, setOpened] = useState<string[]>([])
  const { setCursor } = useApp()

  return (
    <div className="space-y-6">
      {timeline.map((entry, index) => {
        const revealed = opened.includes(entry.id)
        return (
          <motion.article
            key={entry.id}
            className="border-b border-line py-10"
            initial={{ opacity: 0.28, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow text-accent">
              {String(index + 1).padStart(2, '0')} · {entry.stage}
            </p>
            <h3
              className={cn(
                'display-title mt-4 text-4xl transition-all duration-500 md:text-6xl',
                revealed ? 'text-fg' : 'text-muted/70',
              )}
            >
              {entry.title}
            </h3>
            {revealed ? (
              <p className="mt-6 max-w-2xl text-muted">{entry.body}</p>
            ) : (
              <button
                type="button"
                className="mt-8 font-display text-xs tracking-[0.28em] uppercase"
                onClick={() => setOpened((current) => [...current, entry.id])}
                onMouseEnter={() => setCursor('open')}
                onMouseLeave={() => setCursor('default')}
              >
                Reveal →
              </button>
            )}
          </motion.article>
        )
      })}
    </div>
  )
}
