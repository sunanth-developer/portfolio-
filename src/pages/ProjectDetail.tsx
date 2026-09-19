import { useParams } from 'react-router-dom'
import { projectById } from '@/data/projects'
import { projectCovers } from '@/data/visuals'
import { EditorialImage } from '@/components/EditorialImage'
import { DeveloperCaseStudy } from '@/components/DeveloperCaseStudy'
import { ProjectCaseStudy } from '@/components/ProjectCaseStudy'
import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'
import { PhoneStage } from '@/components/ProjectGallery'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { goTo, profile } = useApp()
  const project = slug ? projectById(slug) : undefined
  const cover = project ? projectCovers[project.id] : undefined
  const developer = profile === 'developer'

  if (!project) {
    return (
      <article className="container pt-page pb-[var(--space-4xl)]">
        <h1 className="type-l">File not found</h1>
        <div className="mt-8">
          <MagneticButton variant="ghost" onClick={() => goTo('/work', '02', 'Work')}>
            Back to work
          </MagneticButton>
        </div>
      </article>
    )
  }

  return (
    <article className="pt-page pb-[var(--space-4xl)]">
      <div className="container">
      <p className="type-meta">
        {developer
          ? [project.status === 'Live' ? 'PRODUCTION' : project.status, project.line]
              .filter(Boolean)
              .join(' · ')
          : [project.role, project.status].filter(Boolean).join(' · ')}
      </p>
      <h1 className="type-xl mt-4">{project.title}</h1>
      {developer && project.id === 'driverspot' ? (
        <p className="type-body mt-8 text-muted">
          A real product creates real engineering problems. This is how the system was constructed.
        </p>
      ) : project.description ? (
        <p className="type-body mt-8 text-muted">{project.description}</p>
      ) : (
        <p className="type-body mt-8 text-muted">
          This file is indexed. The full case study populates as verified detail is added to the data layer.
        </p>
      )}
      {cover && (
        <EditorialImage
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          className="mt-10 aspect-[16/10] md:aspect-[2.1/1]"
          sizes="100vw"
        />
      )}
      {!developer && project.featured && (
        <div className="mt-12 md:hidden">
          <PhoneStage index={0} />
        </div>
      )}
      {!developer && project.metrics && (
        <div className="mt-12 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="bg-bg px-4 py-6">
              <p className="display text-3xl">{metric.value}</p>
              <p className="mt-2 text-[10px] tracking-[0.16em] text-muted uppercase">{metric.label}</p>
            </div>
          ))}
        </div>
      )}
      {developer ? <DeveloperCaseStudy project={project} /> : (
        <div className="mt-16">
          <ProjectCaseStudy project={project} />
        </div>
      )}
      {!developer && (
        <div className="mt-16">
          <MagneticButton variant="text" onClick={() => goTo('/work', '02', 'Work')}>
            ← Work
          </MagneticButton>
        </div>
      )}
      </div>
    </article>
  )
}
