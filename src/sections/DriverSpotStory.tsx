import { memo, useCallback, useLayoutEffect, useRef, useState, type MutableRefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, type Project, type ProjectStory } from '@/data/projects'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'
import { PhoneStage } from '@/components/ProjectGallery'
import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'

gsap.registerPlugin(ScrollTrigger)

export function DriverSpotStory() {
  const venture = projects[0]
  const mobile = useIsMobile()
  const reduced = useReducedMotion()
  const story = venture?.story ?? []

  if (!venture || story.length === 0) return null

  return (
    <section className="border-t border-line">
      <Intro venture={venture} />
      {mobile || reduced ? (
        <StackedStory story={story} />
      ) : (
        <PinnedHost title={venture.title} story={story} />
      )}
    </section>
  )
}

function Intro({ venture }: { venture: Project }) {
  const { goTo } = useApp()

  return (
    <div className="px-5 pt-24 md:px-8 md:pt-32">
      <p className="eyebrow text-accent">01 / Venture</p>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <h2 className="display text-[16vw] md:text-[8rem]">{venture.title}</h2>
        <MagneticButton variant="ghost" cursor="explore" onClick={() => goTo('/work/driverspot', '02', 'Work')}>
          Full file →
        </MagneticButton>
      </div>
      <p className="mt-2 text-xs tracking-[0.18em] text-muted uppercase">{venture.role}</p>
      <p className="mt-6 max-w-2xl text-lg text-muted">{venture.description}</p>
      {venture.metrics && (
        <div className="mt-12 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {venture.metrics.map((metric) => (
            <div key={metric.label} className="bg-bg px-4 py-6">
              <p className="display text-3xl md:text-4xl">{metric.value}</p>
              <p className="mt-2 text-[10px] tracking-[0.16em] text-muted uppercase">{metric.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StackedStory({ story }: { story: ProjectStory[] }) {
  return (
    <div className="space-y-16 px-5 py-16 md:px-8">
      {story.map((item) => (
        <article key={item.id}>
          <p className="eyebrow text-accent">{item.label}</p>
          <h3 className="mt-4 font-display text-2xl md:text-4xl">{item.title}</h3>
          <p className="mt-6 text-muted md:text-lg">{item.body}</p>
          {item.points && (
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {item.points.map((point) => (
                <li key={point} className="border-b border-line py-2 text-sm text-muted">
                  {point}
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  )
}

const PinnedHost = memo(function PinnedHost({
  title,
  story,
}: {
  title: string
  story: ProjectStory[]
}) {
  const pinRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const setActiveRef = useRef<(index: number) => void>(() => {})

  const jumpTo = useCallback(
    (index: number) => {
      const trigger = triggerRef.current
      if (!trigger) {
        setActiveRef.current(index)
        return
      }
      const target = trigger.start + ((index + 0.08) / story.length) * (trigger.end - trigger.start)
      window.scrollTo({ top: target, behavior: 'smooth' })
    },
    [story.length],
  )

  useLayoutEffect(() => {
    const pin = pinRef.current
    if (!pin) return

    const trigger = ScrollTrigger.create({
      trigger: pin,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * story.length)}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.35,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const next = Math.min(
          story.length - 1,
          Math.max(0, Math.floor(self.progress * story.length)),
        )
        setActiveRef.current(next)
      },
    })

    triggerRef.current = trigger

    const refresh = () => ScrollTrigger.refresh()
    const raf = window.requestAnimationFrame(refresh)
    const later = window.setTimeout(refresh, 450)
    void document.fonts?.ready.then(refresh)
    window.addEventListener('resize', refresh)

    return () => {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(later)
      window.removeEventListener('resize', refresh)
      trigger.kill()
      triggerRef.current = null
    }
  }, [story.length])

  return (
    <div>
      <div ref={pinRef} className="relative h-svh px-5 pt-24 pb-8 md:px-8">
        <PinnedContent title={title} story={story} jumpTo={jumpTo} register={setActiveRef} />
      </div>
    </div>
  )
})

function PinnedContent({
  title,
  story,
  jumpTo,
  register,
}: {
  title: string
  story: ProjectStory[]
  jumpTo: (index: number) => void
  register: MutableRefObject<(index: number) => void>
}) {
  const [active, setActive] = useState(0)
  const chapter = story[active] ?? story[0]

  useLayoutEffect(() => {
    register.current = (index: number) => {
      setActive((current) => (current === index ? current : index))
    }
  }, [register])

  return (
    <div className="grid h-full items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div>
        <p className="display text-4xl xl:text-5xl">{title}</p>
        <ol className="mt-8 space-y-2">
          {story.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={cn(
                  'text-left text-sm tracking-[0.14em] uppercase transition-colors',
                  index === active ? 'text-accent' : 'text-muted',
                )}
                onClick={() => jumpTo(index)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-8 hidden xl:block">
          <PhoneStage index={active} />
        </div>
      </div>
      <div className="relative h-[min(70vh,36rem)]">
        <AnimatePresence mode="wait">
          {chapter && (
            <motion.article
              key={chapter.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 overflow-y-auto"
            >
              <p className="eyebrow text-accent">{chapter.label}</p>
              <h3 className="mt-5 font-display text-3xl md:text-5xl">{chapter.title}</h3>
              <p className="mt-6 max-w-xl text-muted md:text-lg">{chapter.body}</p>
              {chapter.points && (
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {chapter.points.map((point) => (
                    <li key={point} className="border-b border-line py-2 text-sm text-muted">
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DriverSpotStory
