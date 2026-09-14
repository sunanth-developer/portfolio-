import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ownership } from '@/data/site'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

gsap.registerPlugin(ScrollTrigger)

export function BuildPipeline() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [lit, setLit] = useState(reduced ? ownership.pipeline.length : 0)

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 75%',
      end: 'bottom 55%',
      scrub: 0.3,
      onUpdate: (self) => {
        const next = Math.min(
          ownership.pipeline.length,
          Math.floor(self.progress * (ownership.pipeline.length + 1)),
        )
        setLit((current) => (current === next ? current : next))
      },
    })
    return () => trigger.kill()
  }, [reduced])

  return (
    <section ref={rootRef} className="border-t border-line px-5 py-16 md:px-8 md:py-24">
      <p className="eyebrow mb-5">
        <span className="mr-4 text-accent">04</span>
        Ownership
      </p>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <h2 className="display max-w-[14ch] text-[12vw] md:text-[5.2rem]">
          From idea
          <br />
          to production.
        </h2>
        <p className="max-w-xs text-muted md:text-right">
          End-to-end ownership — not a handoff.
        </p>
      </div>

      <ol className="mt-12 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 xl:grid-cols-7">
        {ownership.pipeline.map((stage, index) => (
          <li
            key={stage}
            className="flex min-h-[7.5rem] flex-col justify-between bg-bg px-4 py-5"
          >
            <p className={cn('text-[10px] tracking-[0.2em]', index < lit ? 'text-accent' : 'text-meta')}>
              {String(index + 1).padStart(2, '0')}
              {index < ownership.pipeline.length - 1 ? ' →' : ''}
            </p>
            <p className={cn('display text-2xl', index < lit ? 'text-fg' : 'text-meta')}>{stage}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12">
        <p className="eyebrow text-accent">Layers I keep</p>
        <ul className="mt-5 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {ownership.layers.map((layer, index) => (
            <li key={layer} className="bg-bg px-4 py-6">
              <p className={cn('text-[10px] tracking-[0.18em]', index < lit ? 'text-accent' : 'text-meta')}>
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="mt-3 font-display text-xl md:text-2xl">{layer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default BuildPipeline
