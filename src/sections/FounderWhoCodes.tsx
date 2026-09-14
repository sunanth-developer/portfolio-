import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

const LINES = ["I'M A", 'FOUNDER', 'WHO CODES.']

export function FounderWhoCodes() {
  const ref = useRef<HTMLElement>(null)
  const splitRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    const root = ref.current
    if (!root || reduced) return
    const ctx = gsap.context(() => {
      gsap.from('[data-line]', {
        yPercent: 110,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          end: 'top 42%',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    const split = splitRef.current
    if (!split || reduced || mobile) return
    const founder = split.querySelector('[data-founder]')
    const developer = split.querySelector('[data-developer]')
    const builder = split.querySelector('[data-builder]')
    const mark = split.querySelector('[data-mark]')
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: split,
          start: 'top 70%',
          end: 'bottom 50%',
          scrub: 0.4,
        },
      })
      tl.fromTo(founder, { xPercent: -18, opacity: 0.35 }, { xPercent: 0, opacity: 1 }, 0)
        .fromTo(developer, { xPercent: 18, opacity: 0.35 }, { xPercent: 0, opacity: 1 }, 0)
        .fromTo(mark, { opacity: 0.2, scale: 0.7 }, { opacity: 1, scale: 1 }, 0)
        .fromTo(builder, { y: 40, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1.08 }, 0.35)
    }, split)
    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <section ref={ref} className="border-t border-line px-5 py-16 md:px-8 md:py-24">
      <div className="display text-[13vw] md:text-[8.5vw]">
        {LINES.map((line) => (
          <div key={line} className="overflow-hidden">
            <div data-line>{line}</div>
          </div>
        ))}
      </div>
      <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-xl">
        I like being involved across the entire journey — understanding the problem, shaping the product, writing the
        software, launching it and learning from what happens next.
      </p>

      <div
        ref={splitRef}
        className="mt-14 grid items-center gap-4 font-display tracking-[-0.05em] md:mt-20 md:grid-cols-[1fr_auto_1fr]"
      >
        <p data-founder className="text-4xl md:text-right md:text-6xl">
          FOUNDER
        </p>
        <p data-mark className="text-2xl text-accent md:text-4xl">
          ×
        </p>
        <p data-developer className="text-4xl md:text-6xl">
          DEVELOPER
        </p>
        <p
          data-builder
          className="display col-span-full mt-4 text-center text-5xl text-accent md:mt-8 md:text-8xl"
        >
          BUILDER
        </p>
      </div>
    </section>
  )
}

export default FounderWhoCodes
