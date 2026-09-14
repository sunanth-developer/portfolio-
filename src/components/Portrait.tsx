import { useState } from 'react'
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
  const [failed, setFailed] = useState(false)

  return (
    <figure className={cn('relative aspect-[3/4] overflow-hidden border border-line bg-surface', className)}>
      {failed ? (
        <div className="flex h-full flex-col justify-end p-5">
          <p className="eyebrow text-accent">Portrait file</p>
          <p className="mt-3 font-display text-2xl uppercase">{site.name}</p>
          <p className="mt-4 max-w-xs text-sm text-muted">
            Place a real photograph at <code className="text-accent">public/sunanth.jpg</code>. No stock image. No
            generated stand-in.
          </p>
        </div>
      ) : (
        <img
          src={src}
          alt={`${site.name}, founder and developer`}
          width={1086}
          height={1448}
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          className="h-full w-full object-cover object-[center_12%]"
          onError={() => setFailed(true)}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(11,11,10,0.45)_0%,transparent_45%)]" />
      {caption && !failed && (
        <figcaption className="absolute right-4 bottom-4 left-4">
          <p className="eyebrow text-accent">Subject</p>
          <p className="mt-1 font-display tracking-[0.12em] uppercase">{site.name}</p>
        </figcaption>
      )}
    </figure>
  )
}
