import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/cn'
import { asset } from '@/data/visuals'

export function EditorialImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  imgClassName,
  sizes = '(min-width: 1024px) 50vw, 100vw',
}: {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  imgClassName?: string
  sizes?: string
}) {
  const { profile } = useApp()
  const founder = profile === 'founder'

  return (
    <figure
      className={cn(
        'media-zoom relative block w-full overflow-hidden bg-surface',
        className,
      )}
    >
      <img
        src={asset(src)}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        className={cn(
          'absolute inset-0 h-full w-full object-cover',
          founder && 'saturate-[0.82] contrast-[1.04]',
          imgClassName,
        )}
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          founder
            ? 'bg-[linear-gradient(to_top,rgba(246,245,240,0.2)_0%,transparent_42%)]'
            : 'bg-[linear-gradient(to_top,rgba(8,9,9,0.28)_0%,transparent_42%)]',
        )}
      />
    </figure>
  )
}
