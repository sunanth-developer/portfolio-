import { projects } from '@/data/projects'
import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/cn'

export function ProjectShowcase() {
  const { goTo, setCursor } = useApp()

  return (
    <section className="border-t border-line py-20">
      <div className="px-5 md:px-8">
        <p className="eyebrow mb-4 text-accent">Index</p>
        <h2 className="display text-[12vw] md:text-7xl">Other builds</h2>
      </div>
      <div className="mt-10 flex snap-x gap-0 overflow-x-auto border-y border-line">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={cn(
              'min-w-[78vw] snap-start border-r border-line px-6 py-16 text-left md:min-w-[42vw] md:px-10',
            )}
            onMouseEnter={() => setCursor('explore')}
            onMouseLeave={() => setCursor('default')}
            onClick={() => goTo(`/work/${project.id}`, '02', 'Work')}
          >
            <p className="text-xs tracking-[0.2em] text-accent">{project.index}</p>
            <h3 className="display mt-6 text-5xl md:text-7xl">{project.title}</h3>
            <p className="mt-4 text-xs tracking-[0.16em] text-muted uppercase">{project.role || project.status}</p>
            <p className="mt-6 max-w-md text-muted">
              {project.description || 'A build in the archive. The file expands when there is more to tell.'}
            </p>
            <p className="mt-10 text-[11px] tracking-[0.22em] uppercase">Explore →</p>
          </button>
        ))}
      </div>
    </section>
  )
}

export default ProjectShowcase
