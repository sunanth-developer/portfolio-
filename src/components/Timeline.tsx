import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { timeline } from '@/data/timeline'
import { useApp } from '@/context/AppContext'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { WaveBuild } from '@/components/WaveBuild'

export function JourneyTimeline({ limit }: { limit?: number }) {
  const { unlock } = useApp()
  const reduced = useReducedMotion()
  const entries = limit ? timeline.slice(0, limit) : timeline

  useEffect(() => {
    unlock('journey')
  }, [unlock])

  return (
    <ol className="relative pl-6 md:pl-10">
      <span className="absolute top-1 bottom-3 left-0 w-px bg-line md:left-0" aria-hidden />
      <motion.span
        className="absolute top-1 left-0 w-px origin-top bg-accent md:left-0"
        initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: reduced ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: 'calc(100% - 0.75rem)' }}
        aria-hidden
      />
      {entries.map((entry, index) => (
        <motion.li
          key={entry.id}
          className="relative pb-12 last:pb-0"
          initial={reduced ? false : { opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : index * 0.06 }}
        >
          <span
            className="absolute top-1.5 -left-[1.6rem] h-2.5 w-2.5 rounded-full bg-accent md:-left-[2.35rem]"
            aria-hidden
          />
          <p className="font-mono text-[11px] tracking-[0.24em] text-accent uppercase">
            {entry.year ? <span className="mr-3 text-2xl tracking-normal md:text-3xl">{entry.year}</span> : null}
            <span className="text-meta">{entry.stage}</span>
          </p>
          <h3 className="display mt-3 text-3xl md:text-5xl">
            <WaveBuild text={entry.title} mode="words" as="span" delay={index * 0.02} />
          </h3>
          <p className="mt-4 max-w-2xl text-muted">{entry.body}</p>
        </motion.li>
      ))}
    </ol>
  )
}

export function Timeline() {
  return <JourneyTimeline />
}
