import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { founder } from '@/data/site'
import { useReducedMotion } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export function Founder() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const stages = root.querySelectorAll('[data-stage]')
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(stages, {
        opacity: 0.15,
        y: 24,
        stagger: 0.18,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          end: 'center 40%',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="px-5 py-28 md:px-10 md:py-36" ref={ref}>
      <p className="eyebrow mb-6">
        <span className="mr-4 text-accent">03</span>
        Founder
      </p>
      <h2 className="display-title max-w-5xl text-[12vw] md:text-[5.5rem]">
        {founder.heading}
      </h2>
      <p className="mt-8 max-w-2xl text-lg text-muted md:text-2xl">{founder.supporting}</p>
      <div className="mt-20 font-display text-5xl tracking-[-0.05em] md:text-7xl">
        {founder.stages.map((stage, index) => (
          <div key={stage} data-stage>
            <p>{stage}</p>
            {index < founder.stages.length - 1 && (
              <p className="my-3 text-2xl text-accent md:my-4 md:text-3xl" aria-hidden>
                ↓
              </p>
            )}
          </div>
        ))}
      </div>
      <p className="mt-16 max-w-xl text-lg text-muted">{founder.closing}</p>
    </section>
  )
}
