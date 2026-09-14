import { motion } from 'framer-motion'
import { ownership } from '@/data/site'

export function BuildPipeline() {
  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <p className="eyebrow mb-6">
        <span className="mr-4 text-accent">04</span>
        Ownership
      </p>

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
        <h2 className="display max-w-[14ch] text-[12vw] md:text-[5.6rem]">
          From idea
          <br />
          to production.
        </h2>
        <p className="max-w-xs text-muted md:mb-1 md:text-right md:text-lg">
          End-to-end ownership —
          <br className="hidden md:block" />
          not a handoff.
        </p>
      </div>

      <ol className="mt-16 xl:hidden">
        {ownership.pipeline.map((stage, index) => (
          <li key={stage} className="grid grid-cols-[2.75rem_minmax(0,1fr)]">
            <p className="pt-1 text-[10px] tracking-[0.2em] text-accent">
              {String(index + 1).padStart(2, '0')}
            </p>
            <div
              className={
                index < ownership.pipeline.length - 1
                  ? 'border-l border-line pb-10 pl-6'
                  : 'border-l border-line pl-6'
              }
            >
              <p className="display text-3xl">{stage}</p>
            </div>
          </li>
        ))}
      </ol>

      <ol className="mt-20 hidden gap-px bg-line xl:grid xl:grid-cols-7">
        {ownership.pipeline.map((stage, index) => (
          <motion.li
            key={stage}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ delay: index * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[14rem] flex-col justify-between bg-bg px-4 py-6 xl:px-5"
          >
            <p className="text-[10px] tracking-[0.2em] text-accent">
              {String(index + 1).padStart(2, '0')}
              {index < ownership.pipeline.length - 1 && (
                <span className="ml-2 text-muted" aria-hidden>
                  →
                </span>
              )}
            </p>
            <p className="display text-[1.65rem] leading-[0.95] xl:text-3xl">{stage}</p>
          </motion.li>
        ))}
      </ol>

      <div className="mt-20">
        <p className="eyebrow text-accent">Layers I keep</p>
        <ul className="mt-6 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {ownership.layers.map((layer, index) => (
            <li key={layer} className="bg-bg px-4 py-7 md:px-5">
              <p className="text-[10px] tracking-[0.18em] text-muted">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="mt-3 font-display text-xl md:text-2xl">{layer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default BuildPipeline
