import { useState } from 'react'
import { motion } from 'framer-motion'
import { technologyDetails } from '@/data/technologies'
import { asset, visuals } from '@/data/visuals'
import { useIsCompact, useReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

const nodes = [
  { id: 'rn', x: '16%', y: '22%', label: 'Mobile', sub: 'React Native' },
  { id: 'react', x: '48%', y: '14%', label: 'Web', sub: 'React' },
  { id: 'api', x: '78%', y: '42%', label: 'API', sub: 'Node.js + Express' },
  { id: 'mongo', x: '32%', y: '72%', label: 'Database', sub: 'MongoDB' },
  { id: 'realtime', x: '72%', y: '78%', label: 'Real-time', sub: 'Assignment / status' },
] as const

const links = [
  { from: 'rn', to: 'api' },
  { from: 'react', to: 'api' },
  { from: 'api', to: 'mongo' },
  { from: 'api', to: 'realtime' },
]

function nodePoint(id: string) {
  const node = nodes.find((item) => item.id === id)
  return node ? { x: node.x, y: node.y } : { x: '50%', y: '50%' }
}

export function ArchitectureGraph({ compact = false }: { compact?: boolean }) {
  const stacked = useIsCompact()
  const reduced = useReducedMotion()
  const [open, setOpen] = useState<string | null>('api')
  const selected = technologyDetails.find((item) => item.id === open)

  return (
    <div className={cn('border border-line bg-surface', compact ? 'p-4 md:p-5' : 'p-6 md:p-8')}>
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] tracking-[0.24em] text-accent uppercase">DriverSpot</p>
        <p className="font-mono text-[10px] tracking-[0.18em] text-meta uppercase">System map</p>
      </div>

      {stacked ? (
        <ul className="mt-4 space-y-2">
          {nodes.map((node) => (
            <li key={node.id}>
              <button
                type="button"
                className={cn(
                  'flex min-h-11 w-full items-center justify-between border px-3 py-3 text-left',
                  open === node.id ? 'border-accent bg-elevated' : 'border-line bg-bg',
                )}
                onClick={() => setOpen(open === node.id ? null : node.id)}
                aria-pressed={open === node.id}
              >
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase">{node.label}</span>
                <span className="font-display text-sm">{node.sub}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="relative mt-4 min-h-[18rem] overflow-hidden border border-line bg-bg">
          <img
            src={asset(visuals.engineeringNodes.src)}
            alt=""
            width={visuals.engineeringNodes.width}
            height={visuals.engineeringNodes.height}
            decoding="async"
            loading="lazy"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
          <div className="pointer-events-none absolute inset-0 bg-bg/50" />
          <svg className="absolute inset-0 h-full w-full text-fg" aria-hidden>
            {links.map((link) => {
              const from = nodePoint(link.from)
              const to = nodePoint(link.to)
              const active = open === link.from || open === link.to
              return (
                <motion.line
                  key={`${link.from}-${link.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="currentColor"
                  strokeWidth={active ? 1.25 : 1}
                  animate={{ strokeOpacity: reduced ? 0.2 : active ? 0.55 : 0.16 }}
                  transition={{ duration: 0.3 }}
                />
              )
            })}
          </svg>
          {nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              className={cn(
                'absolute min-h-11 w-[9.5rem] -translate-x-1/2 -translate-y-1/2 border px-3 py-2 text-left transition-colors',
                open === node.id ? 'border-accent bg-elevated text-fg' : 'border-line bg-surface text-muted hover:border-line-strong',
              )}
              style={{ left: node.x, top: node.y }}
              onClick={() => setOpen(open === node.id ? null : node.id)}
              aria-pressed={open === node.id}
            >
              <span className="block font-mono text-[9px] tracking-[0.18em] uppercase">{node.label}</span>
              <span className="mt-1 block font-display text-xs">{node.sub}</span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 min-h-[6.5rem] border-t border-line pt-4">
        {selected ? (
          <>
            <p className="font-display text-lg">{selected.name}</p>
            <p className="mt-2 text-sm text-muted">
              <span className="text-accent">What</span> — {selected.what}
            </p>
            <p className="mt-1 text-sm text-muted">
              <span className="text-accent">Why</span> — {selected.why}
            </p>
            <p className="mt-1 text-sm text-muted">
              <span className="text-accent">Where</span> — {selected.where}
            </p>
          </>
        ) : (
          <p className="text-sm text-muted">Select a node to see what it does, why it is used, and where it fits.</p>
        )}
      </div>
    </div>
  )
}
