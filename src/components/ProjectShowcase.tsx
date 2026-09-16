import { useState } from 'react'
import { projects } from '@/data/projects'
import { asset, projectCovers } from '@/data/visuals'
import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/cn'

export function ProjectShowcase() {
  const { goTo, setCursor } = useApp()
  const [active, setActive] = useState(0)
  const project = projects[active] ?? projects[0]

  return (
    <section className="border-t border-line py-16">
      <div className="px-5 md:px-8">
        <h2 className="display text-[12vw] md:text-6xl">Other builds</h2>
      </div>
      <div className="mt-8 flex gap-0 overflow-x-auto overscroll-x-contain border-y border-line [-webkit-overflow-scrolling:touch]">
        {projects.map((item, index) => {
          const cover = projectCovers[item.id]
          return (
            <button
              key={item.id}
              type="button"
              className={cn(
                'min-w-[85vw] snap-start border-r border-line text-left sm:min-w-[70vw] md:min-w-[38vw]',
                index === active && 'bg-surface',
              )}
              onMouseEnter={() => {
                setCursor('explore')
                setActive(index)
              }}
              onMouseLeave={() => setCursor('default')}
              onFocus={() => setActive(index)}
              onClick={() => goTo(`/work/${item.id}`, '02', 'Work')}
            >
              {cover && (
                <img
                  src={asset(cover.src)}
                  alt=""
                  width={cover.width}
                  height={cover.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] h-auto w-full object-cover"
                />
              )}
              <div className="px-5 py-12 md:px-10 md:py-14">
                <p className={cn('text-xs tracking-[0.2em]', index === active ? 'text-accent' : 'text-meta')}>
                  {item.index}
                </p>
                <h3 className="display mt-5 text-4xl md:text-6xl">{item.title}</h3>
                <p className="mt-3 text-xs tracking-[0.16em] text-meta uppercase">
                  {item.role || item.status}
                </p>
                <p className="mt-5 max-w-md text-muted">
                  {item.description ||
                    'Indexed. The file expands when verified detail is added to the data layer — nothing invented here.'}
                </p>
                <p className={cn('group mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase', index === active && 'text-accent')}>
                  Explore <span className="btn-arrow">→</span>
                </p>
              </div>
            </button>
          )
        })}
      </div>
      {project && (
        <p className="px-5 pt-4 text-[10px] tracking-[0.18em] text-meta uppercase md:px-8">
          Active · {project.index} {project.title}
        </p>
      )}
    </section>
  )
}

export default ProjectShowcase
