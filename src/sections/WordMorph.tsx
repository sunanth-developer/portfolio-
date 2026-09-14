import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { morphWords } from '@/data/site'
import { useReducedMotion } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export function WordMorph() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = ref.current
    if (!root || reduced) return
    const words = root.querySelectorAll('[data-morph]')
    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.12 })
      gsap.to(words, {
        opacity: 1,
        stagger: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={ref} className="px-5 py-24 md:px-8">
      <div className="display flex flex-wrap gap-x-6 gap-y-2 text-[14vw] md:text-[7rem]">
        {morphWords.map((word, index) => (
          <span key={word} data-morph className="text-muted">
            {word}
            {index < morphWords.length - 1 ? <span className="text-accent"> →</span> : null}
          </span>
        ))}
      </div>
    </section>
  )
}

export default WordMorph
