import type { Experiment } from '@/data/experiments'
import { useApp } from '@/context/AppContext'

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const { setExperimentId, setCursor } = useApp()

  return (
    <article className="flex h-full flex-col border border-line p-6 md:p-8">
      <p className="eyebrow text-accent">{experiment.code}</p>
      <p className="mt-2 text-[10px] tracking-[0.2em] text-muted uppercase">{experiment.category}</p>
      <h3 className="display mt-8 text-3xl">{experiment.title}</h3>
      <p className="mt-4 text-sm text-muted">{experiment.summary}</p>
      <p className="mt-6 text-[10px] tracking-[0.16em] uppercase">{experiment.status}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {experiment.stack.map((item) => (
          <span key={item} className="text-[10px] tracking-[0.14em] text-muted uppercase">
            {item}
          </span>
        ))}
      </div>
      <button
        type="button"
        className="mt-auto flex min-h-11 items-center pt-10 text-left text-xs tracking-[0.22em] uppercase"
        onClick={() => setExperimentId(experiment.id)}
        onMouseEnter={() => setCursor('open')}
        onMouseLeave={() => setCursor('default')}
      >
        Open experiment →
      </button>
    </article>
  )
}
