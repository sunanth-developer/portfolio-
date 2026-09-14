import { useMemo, useState } from 'react'
import { experimentCategories, experiments } from '@/data/experiments'
import { ExperimentCard } from '@/components/ExperimentCard'
import { cn } from '@/lib/cn'

export default function Lab() {
  const [filter, setFilter] = useState<string>('ALL')
  const visible = useMemo(
    () => (filter === 'ALL' ? experiments : experiments.filter((item) => item.category === filter)),
    [filter],
  )

  return (
    <article className="px-5 pt-page pb-24 md:px-8">
      <p className="eyebrow mb-6">
        <span className="mr-4 text-accent">05</span>
        Lab
      </p>
      <h1 className="display max-w-5xl text-[11vw] md:text-[5.2rem]">
        Not everything I build becomes a company.
      </h1>
      <p className="mt-8 max-w-xl text-lg text-muted">
        Some ideas exist simply because I wanted to know if I could build them.
      </p>
      <div className="mt-12 flex flex-wrap gap-2">
        {['ALL', ...experimentCategories].map((category) => (
          <button
            key={category}
            type="button"
            className={cn(
              'min-h-11 border px-4 py-2 text-[10px] tracking-[0.16em] uppercase',
              filter === category ? 'border-accent text-accent' : 'border-line text-muted',
            )}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((experiment) => (
          <ExperimentCard key={experiment.id} experiment={experiment} />
        ))}
      </div>
    </article>
  )
}
