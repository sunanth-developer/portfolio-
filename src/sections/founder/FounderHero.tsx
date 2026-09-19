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
    <section ref={root} className="relative min-h-svh overflow-hidden">
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
          className="h-full w-full object-cover object-center"
          initial={false}
          animate={{
            filter: revealed ? 'blur(0px)' : 'blur(28px)',
            scale: revealed ? 1.02 : 1.08,
          }}
          transition={{ duration: reduced ? 0 : 1.45, ease: waveEase }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(255_248_240/0.42),rgb(255_248_240/0.12)_55%,rgb(255_248_240/0.22))]" />
      </motion.div>

      <div className="relative z-10 flex min-h-svh items-center justify-center px-[var(--page-padding)]">
        <div className="text-center" style={{ color: heroInk }}>
          <motion.h1
            className="font-display whitespace-nowrap tracking-[-0.05em] text-[clamp(1.7rem,5.4vw,4.8rem)] leading-none"
            initial={false}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 18 }}
            transition={{ duration: reduced ? 0 : 0.9, ease: waveSettle }}
          >
            I start with the problem.
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 whitespace-nowrap font-display tracking-[-0.03em] text-[clamp(1.5rem,3.1vw,2.5rem)] leading-snug"
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
            className="mx-auto mt-6 whitespace-nowrap font-display tracking-[-0.02em] text-[clamp(1.05rem,1.8vw,1.4rem)] leading-snug"
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
