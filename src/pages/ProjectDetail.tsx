import { useParams } from 'react-router-dom'
import { projectById } from '@/data/projects'
import { ProjectCaseStudy } from '@/components/ProjectCaseStudy'
import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'
import { PhoneStage } from '@/components/ProjectGallery'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { goTo } = useApp()
  const project = slug ? projectById(slug) : undefined

  if (!project) {
    return (
      <article className="px-5 pt-36 pb-24 md:px-8">
        <h1 className="display text-5xl">File not found</h1>
        <div className="mt-8">
          <MagneticButton variant="ghost" onClick={() => goTo('/work', '02', 'Work')}>
            Back to work
          </MagneticButton>
        </div>
      </article>
    )
  }

  return (
    <article className="px-5 pt-page pb-24 md:px-8">
      <p className="eyebrow text-accent">
        {project.index} / {project.category}
      </p>
      <h1 className="display mt-6 text-[12vw] md:text-[8rem]">{project.title}</h1>
      <p className="mt-4 text-xs tracking-[0.18em] text-muted uppercase">{project.role || project.status}</p>
      {project.description ? (
        <p className="mt-8 max-w-2xl text-lg text-muted">{project.description}</p>
      ) : (
        <p className="mt-8 max-w-2xl text-lg text-muted">
          This file is indexed. The full case study populates as verified detail is added to the data layer.
        </p>
      )}
      {project.featured && (
        <div className="mt-12 md:hidden">
          <PhoneStage index={0} />
        </div>
      )}
      {project.metrics && (
        <div className="mt-12 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="bg-bg px-4 py-6">
              <p className="display text-3xl">{metric.value}</p>
              <p className="mt-2 text-[10px] tracking-[0.16em] text-muted uppercase">{metric.label}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-16">
        <ProjectCaseStudy project={project} />
      </div>
      <div className="mt-16">
        <MagneticButton variant="text" onClick={() => goTo('/work', '02', 'Work')}>
          ← Work
        </MagneticButton>
      </div>
    </article>
  )
}
