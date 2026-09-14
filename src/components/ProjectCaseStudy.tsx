import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Venture } from '@/data/projects'
import { useApp } from '@/context/AppContext'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  venture: Venture
}

export function ProjectVisual({ venture }: Props) {
  if (venture.images.length > 0) {
    return (
      <div className="grid gap-3">
        {venture.images.map((src) => (
          <div key={src} className="overflow-hidden border border-line">
            <motion.img
              src={src}
              alt={`${venture.name} product frame`}
              className="h-full w-full object-cover"
              loading="lazy"
              initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.08 }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative aspect-[4/5] overflow-hidden border border-line bg-[#080808] md:aspect-[16/11]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(122,140,255,0.16),transparent_42%)]" />
      <div className="absolute inset-6 border border-line/80" />
      <div className="absolute top-10 left-10 right-10 h-px bg-line" />
      <div className="absolute top-16 left-10">
        <p className="eyebrow text-accent">{venture.name}</p>
        <p className="mt-3 font-display text-3xl md:text-5xl">Product frame</p>
      </div>
      <div className="absolute right-10 bottom-10 left-10">
        <p className="max-w-sm text-xs tracking-[0.16em] text-muted uppercase">{venture.visualNote}</p>
      </div>
    </div>
  )
}

function AccordionStudy({ venture }: Props) {
  const [active, setActive] = useState(venture.chapters[0]?.id ?? '')
  const chapter = venture.chapters.find((item) => item.id === active) ?? venture.chapters[0]
  const { setCursor } = useApp()

  return (
    <div>
      <p className="eyebrow text-accent">Case study</p>
      <ol className="mt-8 space-y-2">
        {venture.chapters.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={cn(
                'w-full border-b border-line py-4 text-left transition-colors',
                active === item.id ? 'text-fg' : 'text-muted',
              )}
              onClick={() => setActive(item.id)}
              onMouseEnter={() => setCursor('open')}
              onMouseLeave={() => setCursor('default')}
              aria-expanded={active === item.id}
            >
              <span className="font-display text-xl tracking-[0.08em] uppercase md:text-2xl">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <AnimatePresence mode="wait">
        {chapter && (
          <motion.p
            key={chapter.id}
            className="mt-8 text-base leading-relaxed text-muted md:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {chapter.body}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function StickyStudy({ venture }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = ref.current
    if (!root || reduced) return
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('[data-chapter]')
      panels.forEach((panel, index) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        })
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={ref} className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="lg:sticky lg:top-28 lg:h-fit">
        <p className="eyebrow text-accent">Case study</p>
        <p className="display-title mt-6 text-5xl">
          {venture.chapters[active]?.label}
        </p>
      </div>
      <div className="space-y-28">
        {venture.chapters.map((item) => (
          <section key={item.id} data-chapter>
            <h3 className="font-display text-sm tracking-[0.22em] text-muted uppercase">
              {item.label}
            </h3>
            <p className="mt-6 text-xl leading-relaxed text-fg md:text-2xl">{item.body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}

export function ProjectCaseStudy({ venture }: Props) {
  const mobile = useIsMobile()

  return (
    <div className="grid gap-16">
      <ProjectVisual venture={venture} />
      {mobile ? <AccordionStudy venture={venture} /> : <StickyStudy venture={venture} />}
    </div>
  )
}
