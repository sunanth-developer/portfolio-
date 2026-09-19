import { useState } from 'react'
import { motion } from 'framer-motion'
import { developerTools } from '@/data/developer'
import { useApp } from '@/context/AppContext'
import { useIsFinePointer, useReducedMotion } from '@/hooks/useMediaQuery'
import { traceEase } from '@/lib/trace'
import { cn } from '@/lib/cn'

export function StackContext() {
  const { setCursor } = useApp()
  const fine = useIsFinePointer()
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(developerTools[0]?.id ?? 'react')
  const selected = developerTools.find((item) => item.id === open) ?? developerTools[0]

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-16">
      <ul className="lg:col-span-6">
        {developerTools.map((tool) => {
          const active = open === tool.id
          const quiet = fine && open !== tool.id
          return (
            <li key={tool.id} className="border-b border-line">
              <button
                type="button"
                className="flex min-h-14 w-full items-baseline justify-between gap-4 py-4 text-left"
                onMouseEnter={() => {
                  if (fine) setOpen(tool.id)
                  setCursor('inspect')
                }}
                onMouseLeave={() => setCursor('default')}
                onFocus={() => setOpen(tool.id)}
                onClick={() => setOpen(tool.id)}
                aria-pressed={active}
              >
                <span
                  className={cn(
                    'display text-3xl transition-opacity md:text-5xl',
                    quiet ? 'opacity-30' : 'opacity-100',
                    active ? 'text-fg' : 'text-muted',
                  )}
                >
                  {tool.name}
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-meta uppercase">{tool.layer}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {selected && (
        <motion.div
          key={selected.id}
          className="mt-10 lg:col-span-6 lg:mt-4"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: traceEase }}
        >
          <p className="font-mono text-[10px] tracking-[0.22em] text-developer uppercase">{selected.name}</p>
          <ol className="mt-8 space-y-3">
            {selected.context.map((step, index) => (
              <li key={step}>
                <p className="display text-3xl md:text-4xl">{step}</p>
                {index < selected.context.length - 1 && (
                  <p className="mt-2 font-mono text-developer/70" aria-hidden>
                    ↓
                  </p>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-md text-muted">{selected.note}</p>
        </motion.div>
      )}
    </div>
  )
}
