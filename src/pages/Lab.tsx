import { useMemo, useState } from 'react'
import { experimentCategories, experiments } from '@/data/experiments'
import { ExperimentCard } from '@/components/ExperimentCard'
import { DisplayHeadline } from '@/components/DisplayHeadline'
import { EditorialImage } from '@/components/EditorialImage'
import { cn } from '@/lib/cn'
import { visuals } from '@/data/visuals'

export default function Lab() {
  const [filter, setFilter] = useState<string>('ALL')
  const visible = useMemo(
    () => (filter === 'ALL' ? experiments : experiments.filter((item) => item.category === filter)),
    [filter],
  )

  return (
    <article className="px-5 pt-page pb-24 md:px-8">
      <DisplayHeadline
        lines={['Experiments today.', 'Big things tomorrow.']}
        className="max-w-5xl text-[11vw] md:text-[5.2rem]"
      />
      <p className="mt-8 max-w-xl text-lg text-muted">
        Some ideas exist simply because I wanted to know if I could build them.
      </p>
      <EditorialImage
        src={visuals.labPrototype.src}
        alt={visuals.labPrototype.alt}
        width={visuals.labPrototype.width}
        height={visuals.labPrototype.height}
        className="mt-10 aspect-[16/10] md:max-w-xl"
        imgClassName="object-center"
      />
      <div className="mt-12 flex flex-wrap gap-2">
        {['ALL', ...experimentCategories].map((category) => (
          <button
            key={category}
            type="button"
            className={cn(
              'min-h-11 rounded-full border px-4 py-2 font-mono text-[10px] tracking-[0.16em] uppercase',
              filter === category ? 'border-accent text-accent' : 'border-line text-muted',
            )}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-px bg-line md:grid-cols-2 xl:grid-cols-3">
        {visible.map((experiment) => (
          <ExperimentCard key={experiment.id} experiment={experiment} />
        ))}
      </div>
    </article>
  )
}
