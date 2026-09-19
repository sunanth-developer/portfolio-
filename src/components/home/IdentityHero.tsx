import { motion } from 'framer-motion'
import { site } from '@/data/site'
import { waveEase } from '@/lib/wave'
import type { HomeLens } from '@/components/home/types'

export function IdentityHero({ phase, reduced }: HomeLens) {
  return (
    <div className="home-identity">
      <motion.p
        className="font-display text-[clamp(0.88rem,3.4vw,1.2rem)] tracking-[0.18em] uppercase sm:tracking-[0.34em]"
        initial={false}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: waveEase }}
      >
        {site.name}
      </motion.p>
      <motion.p
        className="mt-2 font-mono text-[10px] tracking-[0.22em] text-[var(--home-muted)] uppercase"
        initial={false}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.4, ease: waveEase }}
      >
        Founder × Developer
      </motion.p>

      <div className="mt-3 flex flex-col gap-3 lg:mt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-4">
        <motion.h1
          className="home-statement"
          initial={false}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 12 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: waveEase }}
        >
          One person.
          <br />
          Two perspectives.
        </motion.h1>
        <motion.p
          className="max-w-[16rem] text-[0.9rem] leading-6 text-[var(--home-muted)] max-[430px]:hidden lg:mb-1 lg:text-right"
          initial={false}
          animate={{ opacity: phase >= 3 ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: waveEase }}
        >
          Explore the same person through two different lenses.
        </motion.p>
      </div>
    </div>
  )
}
