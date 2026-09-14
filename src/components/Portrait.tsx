import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { site } from '@/data/site'

export function Portrait({
  className,
  caption = true,
  priority = false,
}: {
  className?: string
  caption?: boolean
  priority?: boolean
}) {
  const src = `${import.meta.env.BASE_URL}sunanth.jpg`

  return (
    <figure className={cn('relative aspect-[3/4] overflow-hidden border border-line bg-[#080808]', className)}>
      <motion.img
        src={src}
        alt={`${site.name}, founder and developer`}
        width={1086}
        height={1448}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        className="h-full w-full object-cover object-[center_12%]"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.5)_0%,transparent_45%)]" />
      {caption && (
        <figcaption className="absolute right-4 bottom-4 left-4">
          <p className="eyebrow text-accent">Subject</p>
          <p className="mt-1 font-display tracking-[0.12em] uppercase">{site.name}</p>
        </figcaption>
      )}
    </figure>
  )
}
