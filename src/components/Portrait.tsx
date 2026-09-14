import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { site } from '@/data/site'

type PortraitVariant = 'editorial' | 'file' | 'compact'

type Props = {
  variant?: PortraitVariant
  className?: string
  caption?: boolean
  priority?: boolean
}

const frames: Record<PortraitVariant, string> = {
  editorial: 'aspect-[3/4] w-full',
  file: 'aspect-[4/5] w-full',
  compact: 'aspect-[3/4] w-full',
}

export function Portrait({ variant = 'editorial', className, caption = true, priority = false }: Props) {
  const src = `${import.meta.env.BASE_URL}sunanth.jpg`

  return (
    <figure className={cn('relative overflow-hidden border border-line bg-[#0a0a0a]', frames[variant], className)}>
      <motion.img
        src={src}
        alt={`${site.name}, founder and developer`}
        width={1086}
        height={1448}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        className="h-full w-full object-cover object-[center_12%]"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.55)_0%,rgba(5,5,5,0.08)_36%,transparent_62%)]"
      />
      {caption && (
        <figcaption className="absolute right-5 bottom-5 left-5">
          <p className="eyebrow text-accent">Subject</p>
          <p className="mt-2 font-display text-lg tracking-[0.12em] uppercase">{site.name}</p>
        </figcaption>
      )}
    </figure>
  )
}
