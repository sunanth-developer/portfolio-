import { motion } from 'framer-motion'
import { ownership } from '@/data/site'

export function BuildPipeline() {
  return (
    <div>
      <div className="font-display text-4xl tracking-[-0.04em] md:text-6xl">
        {ownership.pipeline.map((stage, index) => (
          <motion.div
            key={stage}
            className="flex items-center gap-4"
            initial={{ opacity: 0.2, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
          >
            <span>{stage}</span>
            {index < ownership.pipeline.length - 1 && (
              <span className="text-accent">↓</span>
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-16 flex gap-3 overflow-x-auto pb-4 md:flex-wrap md:overflow-visible">
        {ownership.layers.map((layer) => (
          <span
            key={layer}
            className="shrink-0 border border-line px-4 py-3 font-display text-xs tracking-[0.2em] uppercase"
          >
            {layer}
          </span>
        ))}
      </div>
    </div>
  )
}
