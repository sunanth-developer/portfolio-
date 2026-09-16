import { projects } from '@/data/projects'
import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/cn'

export function ProjectFiles() {
  const { goTo, setCursor } = useApp()

  return (
    <div className="grid gap-px bg-line lg:grid-cols-2">
      {projects.map((project) => (
        <button
          key={project.id}
          type="button"
          className="file-hover bg-bg p-6 text-left md:p-8"
          onMouseEnter={() => setCursor('explore')}
          onMouseLeave={() => setCursor('default')}
          onClick={() => goTo(`/work/${project.id}`, '02', 'Projects')}
        >
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
              FILE {project.index}
            </p>
            <p className="font-mono text-[10px] tracking-[0.16em] text-meta uppercase">{project.status}</p>
          </div>
          <h3 className="display mt-5 text-3xl md:text-4xl">{project.title}</h3>
          <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
            {project.role || project.category}
          </p>
          <p className={cn('mt-5 text-muted', !project.description && 'italic')}>
            {project.description ||
              'Indexed. The file expands when verified detail is added to the data layer — nothing invented here.'}
          </p>
          {project.technology && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.technology.map((item) => (
                <li
                  key={item}
                  className="border border-line px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-meta uppercase"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
          <p className="group mt-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
            View project <span className="btn-arrow">→</span>
          </p>
        </button>
      ))}
    </div>
  )
}
