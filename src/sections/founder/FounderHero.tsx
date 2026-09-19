import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import founderHero from '@/assets/founderhero.png'
import { waveEase, waveSettle } from '@/lib/wave'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'

const founderOrange = '#FF5A36'
const heroInk = '#111111'

export function FounderHero() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const root = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState(reduced ? 5 : 0)
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduced || mobile ? 0 : 64])
  const revealed = reduced || phase >= 1

  useEffect(() => {
    if (reduced) return
    const timers = [180, 480, 820, 1180, 1520].map((ms, index) =>
      window.setTimeout(() => setPhase(index + 1), ms),
    )
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [reduced])

  return (
    <section ref={root} className="founder-hero relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
        initial={false}
        animate={{
          clipPath: revealed ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
        }}
        transition={{ duration: reduced ? 0 : 1.45, ease: waveEase }}
      >
        <motion.img
          src={founderHero}
          alt="Editorial sunrise desk looking over a city: notebook, laptop and notes on ideas, products and impact."
          width={1600}
          height={900}
          decoding="async"
          fetchPriority="high"
          className="founder-hero-image"
          initial={false}
          animate={{
            filter: revealed ? 'blur(0px)' : 'blur(28px)',
            scale: revealed ? 1.02 : 1.08,
          }}
          transition={{ duration: reduced ? 0 : 1.45, ease: waveEase }}
        />
        <div className="founder-hero-wash" />
      </motion.div>

      <div className="founder-hero-copy" style={{ color: heroInk }}>
        <div>
          <motion.h1
            className="founder-hero-title"
            initial={false}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 18 }}
            transition={{ duration: reduced ? 0 : 0.9, ease: waveSettle }}
          >
            I start with the problem.
          </motion.h1>
          <motion.p
            className="founder-hero-sub mt-6"
            initial={false}
            animate={{ opacity: phase >= 5 ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.55, ease: waveEase }}
          >
            Then I work backwards.
          </motion.p>
          <motion.span
            className="mx-auto mt-10 block h-px w-20"
            style={{ background: founderOrange, transformOrigin: 'center' }}
            initial={false}
            animate={{ scaleX: phase >= 4 ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.7, ease: waveEase }}
            aria-hidden
          />
          <motion.p
            className="founder-hero-tag mt-6"
            initial={false}
            animate={{ opacity: phase >= 5 ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: waveEase }}
          >
            Two perspectives. One problem-solving mindset.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
