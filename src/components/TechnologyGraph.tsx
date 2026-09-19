import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { architectureStages, graphNodes, technologyCategories, technologyDetails } from '@/data/technologies'
import { useIsCompact, useReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

gsap.registerPlugin(ScrollTrigger)

export function TechnologyGraph() {
  const mobile = useIsCompact()
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState(reduced || mobile ? 5 : 0)
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || mobile || reduced) return
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 70%',
      end: 'bottom 40%',
      scrub: 0.35,
      onUpdate: (self) => {
        const next = Math.min(5, Math.floor(self.progress * 6))
        setStage((current) => (current === next ? current : next))
      },
    })
    return () => trigger.kill()
  }, [mobile, reduced])

  const visible = useMemo(
    () => graphNodes.filter((node) => node.stage <= stage),
    [stage],
  )
  const selected = graphNodes.find((node) => node.id === open)
  const detail = technologyDetails.find((item) => item.id === open)

  if (mobile) {
    return (
      <div className="space-y-8">
        {architectureStages.map((item) => (
          <div key={item.id} className="border-t border-line pt-4">
            <p className="eyebrow text-accent">{item.label}</p>
            <p className="mt-3 text-muted">{item.detail}</p>
          </div>
        ))}
        {technologyCategories.map((category) => (
          <div key={category.id}>
            <p className="eyebrow mb-3 text-accent">{category.label}</p>
            <ul>
              {category.items.map((item) => (
                <li key={item} className="border-b border-line py-3 font-display text-xl">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={rootRef} className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="min-h-[28rem] border border-line bg-surface p-8">
        <p className="display text-4xl text-accent">PRODUCT</p>
        <ol className="mt-8 space-y-3">
          {architectureStages.map((item, index) => (
            <li
              key={item.id}
              className={cn(
                'flex items-baseline gap-4 transition-opacity duration-300',
                index <= stage ? 'opacity-100' : 'opacity-20',
              )}
            >
              <span className="text-accent">↓</span>
              <span className="font-display text-2xl uppercase">{item.label}</span>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-2">
          {visible.map((node) => (
            <button
              key={node.id}
              type="button"
              className={cn(
                'border px-3 py-2 text-[11px] tracking-[0.14em] uppercase',
                open === node.id ? 'border-accent text-accent' : 'border-line text-muted',
              )}
              onClick={() => setOpen(open === node.id ? null : node.id)}
            >
              {node.label}
            </button>
          ))}
        </div>
      </div>
      <aside className="border border-line bg-bg p-6">
        {selected ? (
          <>
            <p className="eyebrow text-accent">{selected.label}</p>
            {detail ? (
              <div className="mt-6 space-y-4 text-muted">
                <p>
                  <span className="text-accent">What</span> — {detail.what}
                </p>
                <p>
                  <span className="text-accent">Why</span> — {detail.why}
                </p>
                <p>
                  <span className="text-accent">Where</span> — {detail.where}
                </p>
              </div>
            ) : (
              <ul className="mt-6 space-y-3">
                {selected.panel.map((line) => (
                  <li key={line} className="border-b border-line pb-3 font-display text-xl">
                    {line}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <>
            <p className="eyebrow text-accent">Select a node</p>
            <p className="mt-6 text-muted">
              Click a technology to see where it sits in the system — not a list, a map of responsibility.
            </p>
            <p className="mt-8 text-sm text-meta">
              {architectureStages[Math.min(stage, architectureStages.length - 1)]?.detail}
            </p>
          </>
        )}
      </aside>
    </div>
  )
}

export default TechnologyGraph
