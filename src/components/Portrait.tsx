import { useEffect, useState } from 'react'
import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/cn'
import { site } from '@/data/site'
import { asset, editorial, visuals } from '@/data/visuals'

export function Portrait({
  className,
  caption = true,
  priority = false,
}: {
  className?: string
  caption?: boolean
  priority?: boolean
}) {
  const { profile } = useApp()
  const founder = profile === 'founder'
  const photoSrc = `${import.meta.env.BASE_URL}sunanth.jpg`
  const [photo, setPhoto] = useState(false)
  const fallback = visuals.founderWorkspace

  useEffect(() => {
    const image = new Image()
    image.onload = () => setPhoto(true)
    image.src = photoSrc
  }, [photoSrc])

  return (
    <figure
      className={cn(
        'media-zoom relative aspect-[4/5] w-full overflow-hidden bg-surface',
        className,
      )}
    >
      {photo ? (
        <img
          src={photoSrc}
          alt={`${site.name}, founder and developer`}
          width={1086}
          height={1448}
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          className="absolute inset-0 h-full w-full object-cover object-[center_12%]"
        />
      ) : (
        <img
          src={founder ? editorial.founder.src : asset(fallback.src)}
          alt={founder ? editorial.founder.alt : fallback.alt}
          width={fallback.width}
          height={fallback.height}
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          className="absolute inset-0 h-full w-full object-cover object-[18%_center]"
        />
      )}
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          founder
            ? 'bg-[linear-gradient(to_top,rgba(246,245,240,0.35)_0%,transparent_48%)]'
            : 'bg-[linear-gradient(to_top,rgba(8,9,9,0.55)_0%,transparent_45%)]',
        )}
      />
      {caption && (
        <figcaption className="absolute right-4 bottom-4 left-4">
          <p className="eyebrow text-accent">{photo ? 'Subject' : 'Workspace'}</p>
          <p className="mt-1 font-display tracking-[0.12em] uppercase">{site.name}</p>
        </figcaption>
      )}
    </figure>
  )
}
