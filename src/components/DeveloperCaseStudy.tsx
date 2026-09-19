import { MagneticButton } from '@/components/MagneticButton'
import { SystemInspect } from '@/components/SystemInspect'
import { TradeOffs } from '@/components/TradeOffs'
import { useApp } from '@/context/AppContext'
import type { Project } from '@/data/projects'

export function DeveloperCaseStudy({ project }: { project: Project }) {
  const { goTo, setCursor } = useApp()
  const deep = project.id === 'driverspot'

  if (!deep) {
    return (
      <div className="mt-16 max-w-2xl">
        <p className="font-mono text-[10px] tracking-[0.22em] text-meta uppercase">Indexed</p>
        <p className="mt-6 text-lg text-muted">
          {project.line
            ? `${project.line}. The file stays thin until verified engineering detail is in the data layer.`
            : 'This file is indexed. Nothing here is invented to fill the layout.'}
        </p>
        <div className="mt-10">
          <MagneticButton variant="text" onClick={() => goTo('/work', '02', 'Projects')}>
            ← Things I've built
          </MagneticButton>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-16 space-y-20">
      <section>
        <h2 className="display text-3xl md:text-5xl">What I built</h2>
        {project.built ? (
          <ul className="mt-8 max-w-2xl space-y-3 text-lg text-muted">
            {project.built.map((item) => (
              <li key={item} className="border-l border-developer/70 pl-4">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 max-w-2xl text-lg text-muted">{project.product}</p>
        )}
      </section>

      <section>
        <h2 className="display text-3xl md:text-5xl">The system</h2>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Customer, mobile app, API, database, driver, services. The product is the path between them.
        </p>
        <div className="mt-12">
          <SystemInspect />
        </div>
      </section>

      <section>
        <h2 className="display text-3xl md:text-5xl">The engineering</h2>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          React and React Native on the surface. Node.js and Express for the API. MongoDB for operational data.
          Authentication, scheduling and safety flows underneath a chauffeur network that has to work in the city, not
          only in a diagram.
        </p>
        {project.technology && (
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.18em] text-meta uppercase">
            {project.technology.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="display text-3xl md:text-5xl">The decisions</h2>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Matching is not a generic listing. Shared mobile product logic is not two native apps. REST is a visible
          contract, not a hiding place.
        </p>
        <div className="mt-12">
          <TradeOffs />
        </div>
      </section>

      <section>
        <h2 className="display text-3xl md:text-5xl">What I learned</h2>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          {project.lessons ??
            'A two-sided product is one matching problem with two kinds of trust.'}
        </p>
      </section>

      {project.links?.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center font-mono text-[11px] tracking-[0.2em] uppercase"
          onMouseEnter={() => setCursor('open')}
          onMouseLeave={() => setCursor('default')}
        >
          {link.label} →
        </a>
      ))}

      <MagneticButton variant="text" onClick={() => goTo('/work', '02', 'Projects')}>
        ← Things I've built
      </MagneticButton>
    </div>
  )
}
