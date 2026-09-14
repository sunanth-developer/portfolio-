import { useMemo, useState } from 'react'
import { experiments, experimentCategories } from '@/data/experiments'
import { labIntro } from '@/data/site'
import { ExperimentCard } from '@/components/ExperimentCard'
import { cn } from '@/lib/cn'

export default function Lab() {
  const [filter, setFilter] = useState<string>('ALL')
  const visible = useMemo(
    () => (filter === 'ALL' ? experiments : experiments.filter((item) => item.category === filter)),
    [filter],
  )

  return (
    <article className="px-5 pt-36 pb-28 md:px-10 md:pt-44">
      <p className="eyebrow mb-6">
        <span className="mr-4 text-accent">05</span>
        Lab
      </p>
      <h1 className="display-title max-w-5xl text-[11vw] md:text-[5.2rem]">{labIntro.heading}</h1>
      <p className="mt-8 max-w-xl text-lg text-muted">{labIntro.supporting}</p>
      <div className="mt-12 flex flex-wrap gap-2">
        {['ALL', ...experimentCategories].map((category) => (
          <button
            key={category}
            type="button"
            className={cn(
              'border px-3 py-2 text-[10px] tracking-[0.16em] uppercase',
              filter === category ? 'border-accent text-accent' : 'border-line text-muted',
            )}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.length === 0 ? (
          <p className="border border-line p-10 text-muted md:col-span-2">No experiments in this drawer yet.</p>
        ) : (
          visible.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} />
          ))
        )}
      </div>
    </article>
  )
}
