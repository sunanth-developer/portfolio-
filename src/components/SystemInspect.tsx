import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TraceDot, TraceLine } from '@/components/TraceLine'
import { driverSpotSystem, systemLinks } from '@/data/developer'
import type { SystemNode } from '@/data/developer'
import { useApp } from '@/context/AppContext'
import { useIsCompact, useReducedMotion } from '@/hooks/useMediaQuery'
import { traceEase } from '@/lib/trace'
import { cn } from '@/lib/cn'

const layout: Record<string, { x: number; y: number }> = {
  customer: { x: 48, y: 48 },
  mobile: { x: 200, y: 48 },
  api: { x: 200, y: 148 },
  database: { x: 352, y: 148 },
  driver: { x: 352, y: 48 },
  services: { x: 200, y: 248 },
}

const drawOrder = ['customer', 'mobile', 'api', 'database', 'driver', 'services'] as const

function nodeIndex(id: string) {
  return drawOrder.findIndex((item) => item === id)
}

export function SystemInspect({ compact = false }: { compact?: boolean }) {
  const { setCursor } = useApp()
  const mobile = useIsCompact()
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(reduced)
  const [step, setStep] = useState(reduced ? drawOrder.length : 0)
  const [open, setOpen] = useState<string | null>(null)
  const revealed = reduced ? drawOrder.length : step
  const selected = driverSpotSystem.find((item) => item.id === open) ?? null
  const related = new Set<string>()
  if (open) {
    related.add(open)
    systemLinks.forEach((link) => {
      if (link.from === open || link.to === open) {
        related.add(link.from)
        related.add(link.to)
      }
    })
  }

  useEffect(() => {
    if (reduced || started) return
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced, started])

  useEffect(() => {
    if (!started || reduced) return
    const timers = drawOrder.map((_, index) =>
      window.setTimeout(() => setStep(index + 1), 180 + index * 420),
    )
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [started, reduced])

  const reveal = () => {
    if (!started) {
      setStarted(true)
      setStep(drawOrder.length)
    }
  }

  const visible = (id: string) => {
    const index = nodeIndex(id)
    return index >= 0 && revealed > index
  }
  const linkDrawn = (from: string, to: string) => visible(from) && visible(to)

  const selectNode = (id: string, active: boolean) => {
    reveal()
    setOpen(active ? null : id)
  }

  return (
    <div ref={rootRef} className="bg-bg">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="font-mono text-[10px] tracking-[0.22em] text-meta uppercase">driverspot.system</p>
        <p className="font-mono text-[10px] tracking-[0.18em] text-developer uppercase">PRODUCTION</p>
      </div>

      {mobile ? (
        <ol className="mt-8">
          {driverSpotSystem.map((node, index) => {
            const shown = revealed > index
            const active = open === node.id
            return (
              <li key={node.id} className="relative pl-6">
                {index < driverSpotSystem.length - 1 && (
                  <span
                    className="absolute top-7 left-[7px] h-[calc(100%-0.5rem)] w-px bg-line"
                    aria-hidden
                  />
                )}
                <motion.button
                  type="button"
                  className={cn(
                    'relative mb-3 w-full py-3 text-left',
                    active ? 'text-developer' : 'text-fg',
                  )}
                  initial={false}
                  animate={{ opacity: shown ? 1 : 0.2 }}
                  onClick={() => selectNode(node.id, active)}
                  onFocus={() => setOpen(node.id)}
                  aria-pressed={active}
                  aria-expanded={active}
                  aria-label={`Inspect ${node.label}`}
                >
                  <span
                    className={cn(
                      'absolute top-5 left-[-21px] h-2 w-2 rounded-full',
                      active ? 'bg-developer' : 'bg-line-strong',
                    )}
                    aria-hidden
                  />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase">{node.label}</span>
                  {node.tech && (
                    <span className="mt-1 block font-mono text-[10px] tracking-[0.16em] text-meta uppercase">
                      {node.tech}
                    </span>
                  )}
                </motion.button>
              </li>
            )
          })}
        </ol>
      ) : (
        <div className={cn('relative mt-6 overflow-x-clip pt-8', compact ? 'min-h-[16rem]' : 'min-h-[18rem]')}>
          <svg viewBox="0 0 420 280" className="h-auto w-full overflow-visible" aria-hidden>
            {systemLinks.map((link) => {
              const from = layout[link.from]
              const to = layout[link.to]
              if (!from || !to) return null
              const active = open === link.from || open === link.to
              return (
                <TraceLine
                  key={`${link.from}-${link.to}`}
                  d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                  drawn={linkDrawn(link.from, link.to)}
                  duration={0.55}
                  stroke={
                    open
                      ? active
                        ? 'rgba(99,245,194,0.95)'
                        : 'rgba(99,245,194,0.12)'
                      : 'rgba(99,245,194,0.45)'
                  }
                  width={active ? 1.4 : 1}
                />
              )
            })}
            {driverSpotSystem.map((node) => {
              const point = layout[node.id]
              if (!point) return null
              return <TraceDot key={node.id} cx={point.x} cy={point.y} active={visible(node.id)} />
            })}
          </svg>
          {driverSpotSystem.map((node) => {
            const point = layout[node.id]
            if (!point) return null
            const shown = visible(node.id)
            const active = open === node.id
            const dim = Boolean(open) && !related.has(node.id)
              return (
                <motion.button
                  key={node.id}
                  type="button"
                  className="absolute min-h-11 -translate-x-1/2 -translate-y-[2.6rem] px-1 text-left"
                  style={{ left: `${(point.x / 420) * 100}%`, top: `${(point.y / 280) * 100}%` }}
                  initial={false}
                  animate={{ opacity: shown ? (dim ? 0.22 : 1) : 0, y: shown ? 0 : 8 }}
                  transition={{ duration: reduced ? 0 : 0.35, ease: traceEase }}
                onMouseEnter={() => setCursor('inspect')}
                onMouseLeave={() => setCursor('default')}
                onClick={() => selectNode(node.id, active)}
                aria-pressed={active}
                aria-expanded={active}
                aria-label={`Inspect ${node.label}`}
              >
                <span
                  className={cn(
                    'block font-mono text-[10px] tracking-[0.2em] uppercase',
                    active ? 'text-developer' : shown && open ? 'text-meta' : 'text-fg',
                  )}
                >
                  {node.label}
                </span>
                {node.tech && (
                  <span className="mt-1 block font-mono text-[9px] tracking-[0.16em] text-meta uppercase">
                    {node.tech}
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>
      )}

      <InspectPanel node={selected} />
    </div>
  )
}

function InspectPanel({ node }: { node: SystemNode | null }) {
  return (
    <div className="mt-8 min-h-[7.5rem] border-t border-line pt-6" aria-live="polite">
      {node ? (
        <>
          <p className="font-mono text-[10px] tracking-[0.22em] text-developer uppercase">Inspect</p>
          <h3 className="display mt-3 text-2xl md:text-3xl">{node.label}</h3>
          <p className="mt-3 max-w-2xl text-muted">{node.role}</p>
          <p className="mt-2 max-w-2xl text-sm text-muted">{node.detail}</p>
          <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-meta uppercase">
            Connects · {node.connects}
            {node.tech ? ` · ${node.tech}` : ''}
          </p>
        </>
      ) : (
        <p className="max-w-xl text-sm text-muted">
          Select a component to inspect what it connects, what role it plays, and where it sits in the system.
        </p>
      )}
    </div>
  )
}
