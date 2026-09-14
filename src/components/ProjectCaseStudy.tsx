import { useApp } from '@/context/AppContext'
import type { Project } from '@/data/projects'

export function ProjectCaseStudy({ project }: { project: Project }) {
  const { setCursor } = useApp()
  const blocks = [
    { label: 'Project', value: project.title },
    { label: 'Role', value: project.role },
    { label: 'Problem', value: project.problem },
    { label: 'Solution', value: project.solution },
    { label: 'Product', value: project.product },
    { label: 'What I built', value: project.built?.join(' · ') },
    { label: 'Lessons', value: project.lessons },
    { label: 'Status', value: project.status },
  ].filter((block) => Boolean(block.value))

  return (
    <div className="space-y-12">
      {blocks.map((block) => (
        <section key={block.label} className="border-t border-line pt-8">
          <p className="eyebrow text-accent">{block.label}</p>
          <p className="mt-4 max-w-3xl text-lg text-muted md:text-xl">{block.value}</p>
        </section>
      ))}
      {project.technology && project.technology.length > 0 && (
        <section className="border-t border-line pt-8">
          <p className="eyebrow text-accent">Technology</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technology.map((item) => (
              <span key={item} className="border border-line px-3 py-2 text-[10px] tracking-[0.16em] uppercase">
                {item}
              </span>
            ))}
          </div>
        </section>
      )}
      {project.links?.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-xs tracking-[0.2em] uppercase"
          onMouseEnter={() => setCursor('open')}
          onMouseLeave={() => setCursor('default')}
        >
          {link.label} →
        </a>
      ))}
    </div>
  )
}
