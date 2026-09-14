import { memo, useLayoutEffect, useRef, useState, type MutableRefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { thinkingLoop } from '@/data/site'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export function FounderThinking() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  return (
    <section className="border-t border-line">
      <div className="px-5 pt-16 md:px-8 md:pt-20">
        <p className="eyebrow text-accent">How I think</p>
        <h2 className="display mt-4 text-[12vw] md:text-[6.4rem]">
          I don’t start
          <br />
          with code.
        </h2>
      </div>

      {mobile || reduced ? (
        <ol className="px-5 py-12 md:px-8">
          {thinkingLoop.map((item, index) => (
            <li key={item} className="flex gap-5 border-b border-line py-5">
              <span className="text-[10px] tracking-[0.2em] text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="display text-3xl">{item}</p>
            </li>
          ))}
        </ol>
      ) : (
        <PinnedLoop />
      )}
    </section>
  )
}

const PinnedLoop = memo(function PinnedLoop() {
  const pinRef = useRef<HTMLDivElement>(null)
  const setActiveRef = useRef<(index: number) => void>(() => {})

  useLayoutEffect(() => {
    const pin = pinRef.current
    if (!pin) return
    const trigger = ScrollTrigger.create({
      trigger: pin,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * thinkingLoop.length * 0.7)}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.35,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const next = Math.min(
          thinkingLoop.length - 1,
          Math.max(0, Math.floor(self.progress * thinkingLoop.length)),
        )
        setActiveRef.current(next)
      },
    })
    const raf = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      window.cancelAnimationFrame(raf)
      trigger.kill()
    }
  }, [])

  return (
    <div>
      <div ref={pinRef} className="flex h-svh flex-col justify-center px-8">
        <LoopCopy register={setActiveRef} />
      </div>
    </div>
  )
})

function LoopCopy({ register }: { register: MutableRefObject<(index: number) => void> }) {
  const [active, setActive] = useState(0)
  const stage = thinkingLoop[active] ?? thinkingLoop[0]

  useLayoutEffect(() => {
    register.current = (index: number) => {
      setActive((current) => (current === index ? current : index))
    }
  }, [register])

  return (
    <>
      <p className="eyebrow text-meta">
        {String(active + 1).padStart(2, '0')} / {String(thinkingLoop.length).padStart(2, '0')}
      </p>
      <p className="display mt-6 text-[12vw]">{stage}</p>
      <p className="mt-8 max-w-md text-muted">
        Problem → user → insight → product → code → launch → learn. The loop is the work. Code is one station inside
        it.
      </p>
      <ol className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[10px] tracking-[0.18em] uppercase">
        {thinkingLoop.map((item, index) => (
          <li key={item} className={index === active ? 'text-accent' : 'text-meta'}>
            {item}
          </li>
        ))}
      </ol>
    </>
  )
}

export default FounderThinking
