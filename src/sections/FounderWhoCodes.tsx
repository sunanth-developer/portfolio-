import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

const LINES = ['I\'M A', 'FOUNDER', 'WHO CODES.']

export function FounderWhoCodes() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = ref.current
    if (!root || reduced) return
    const ctx = gsap.context(() => {
      gsap.from('[data-line]', {
        yPercent: 110,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          end: 'top 35%',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={ref} className="px-5 py-28 md:px-8 md:py-40">
      <div className="display text-[16vw] md:text-[9vw]">
        {LINES.map((line) => (
          <div key={line} className="overflow-hidden">
            <div data-line>{line}</div>
          </div>
        ))}
      </div>
      <p className="mt-12 max-w-xl text-lg leading-relaxed text-muted md:text-2xl">
        I like being involved across the entire journey — understanding the problem, shaping the product, writing the
        software, launching it and learning from what happens next.
      </p>
    </section>
  )
}

export default FounderWhoCodes
