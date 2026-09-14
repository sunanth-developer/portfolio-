import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { thinkingLoop } from '@/data/site'
import { useReducedMotion } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export function FounderThinking() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = ref.current
    if (!root || reduced) return
    const ctx = gsap.context(() => {
      gsap.from('[data-think]', {
        opacity: 0.12,
        x: -24,
        stagger: 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top 70%',
          end: 'center 40%',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={ref} className="border-t border-line px-5 py-28 md:px-8 md:py-36">
      <h2 className="display text-[14vw] md:text-[7rem]">
        I don’t start
        <br />
        with code.
      </h2>
      <div className="mt-20 font-display text-5xl tracking-[-0.05em] md:text-7xl">
        {thinkingLoop.map((stage, index) => (
          <div key={stage} data-think>
            <p>{stage}</p>
            {index < thinkingLoop.length - 1 && (
              <p className="my-3 text-2xl text-accent" aria-hidden>
                ↓
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FounderThinking
