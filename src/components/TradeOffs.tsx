import { useState } from 'react'
import { motion } from 'framer-motion'
import { tradeOffs } from '@/data/developer'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { traceEase } from '@/lib/trace'
import { cn } from '@/lib/cn'

export function TradeOffs() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(0)

  return (
    <ul className="max-w-3xl space-y-16">
      {tradeOffs.map((item, index) => {
        const selected = open === index
        return (
          <li key={item.id}>
            <button
              type="button"
              className="w-full min-h-11 text-left"
              onClick={() => setOpen(index)}
              onFocus={() => setOpen(index)}
              aria-pressed={selected}
            >
              <div className="flex items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] uppercase">
                <span className={selected ? 'text-fg' : 'text-muted'}>{item.left}</span>
                <span className={selected ? 'text-fg' : 'text-meta'}>{item.right}</span>
              </div>
              <div className="relative mt-5 h-px bg-line">
                <motion.span
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-developer"
                  initial={false}
                  animate={{ left: `${item.position * 100}%`, x: '-50%', opacity: selected ? 1 : 0.35 }}
                  transition={{ duration: reduced ? 0 : 0.5, ease: traceEase }}
                  aria-hidden
                />
              </div>
            </button>
            <p className={cn('mt-6 max-w-2xl text-muted transition-opacity', selected ? 'opacity-100' : 'opacity-40')}>
              {item.body}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
