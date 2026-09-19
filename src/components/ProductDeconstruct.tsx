import { motion } from 'framer-motion'
import { deconstructLayers } from '@/data/developer'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { traceEase } from '@/lib/trace'
import { cn } from '@/lib/cn'

const layers = [
  {
    id: 'product',
    label: 'PRODUCT',
    body: 'DriverSpot is a chauffeur marketplace that has to stay coherent after it leaves a laptop.',
  },
  ...deconstructLayers,
] as const

export function ProductDeconstruct() {
  const reduced = useReducedMotion()

  return (
    <ol className="max-w-2xl">
      {layers.map((layer, index) => (
        <motion.li
          key={layer.id}
          className="relative py-7"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{
            duration: reduced ? 0 : 0.6,
            delay: reduced ? 0 : index * 0.08,
            ease: traceEase,
          }}
        >
          <p className={cn('font-mono text-[10px] tracking-[0.22em] uppercase', index === 0 ? 'text-developer' : 'text-meta')}>
            {layer.label}
          </p>
          <p className="mt-3 max-w-xl text-lg text-muted">{layer.body}</p>
          {index < layers.length - 1 && <span className="absolute bottom-0 left-0 h-px w-10 bg-developer/50" aria-hidden />}
        </motion.li>
      ))}
    </ol>
  )
}
