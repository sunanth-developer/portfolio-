import { lazy, Suspense } from 'react'
import { MagneticButton } from '@/components/MagneticButton'
import { ArchitectureGraph } from '@/components/ArchitectureGraph'
import { CodePanel } from '@/components/CodePanel'
import { DisplayHeadline } from '@/components/DisplayHeadline'
import { ProjectFiles } from '@/components/ProjectFiles'
import { useApp } from '@/context/AppContext'
import { experiments } from '@/data/experiments'
import { technologyDetails } from '@/data/technologies'
import { site } from '@/data/site'
import { visuals } from '@/data/visuals'
import { EditorialImage } from '@/components/EditorialImage'

const TechnologyGraph = lazy(() => import('@/components/TechnologyGraph'))

function Slot() {
  return <div className="min-h-[16vh]" />
}

export default function DeveloperHome() {
  const { goTo, setExperimentId, setCursor } = useApp()

  return (
    <>
      <section className="relative grid items-center gap-10 overflow-x-clip px-5 pt-page pb-16 md:min-h-svh md:px-8 lg:grid-cols-12 lg:gap-12 lg:pb-20">
        <div className="relative z-10 lg:col-span-7">
          <DisplayHeadline
            lines={['I turn ideas', 'into working', 'systems.']}
            className="max-w-4xl text-[12vw] md:text-[clamp(3.5rem,7.4vw,6.8rem)]"
          />
          <p className="mt-8 max-w-lg text-lg text-muted">
            Full-stack developer focused on building scalable, real-world systems — React and React Native on the
            surface, Node.js, Express and MongoDB underneath.
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-meta uppercase">{site.locationShort}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <MagneticButton cursor="explore" onClick={() => goTo('/work', '02', 'Projects')}>
              View projects →
            </MagneticButton>
            <MagneticButton variant="ghost" cursor="view" onClick={() => goTo('/engineering', '03', 'Engineering')}>
              My stack
            </MagneticButton>
          </div>
        </div>
        <div className="relative z-10 w-full lg:col-span-5">
          <EditorialImage
            src={visuals.developerWorkspace.src}
            alt={visuals.developerWorkspace.alt}
            width={visuals.developerWorkspace.width}
            height={visuals.developerWorkspace.height}
            priority
            className="aspect-[16/10]"
            imgClassName="object-[center_40%]"
          />
          <div className="-mt-px">
            <CodePanel />
          </div>
        </div>
      </section>

      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <DisplayHeadline as="h2" lines={["Things I've built."]} className="text-[12vw] md:text-6xl" />
        <p className="mt-6 max-w-xl text-muted">
          A collection of real projects, products and systems. Indexed files stay thin until verified detail exists.
        </p>
        <div className="mt-12">
          <ProjectFiles />
        </div>
      </section>

      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <DisplayHeadline as="h2" lines={['Under the hood.']} className="text-[12vw] md:text-6xl" />
        <p className="mt-6 max-w-xl text-muted">The technology behind the products — relationships, not percentage bars.</p>
        <div className="mt-12">
          <ArchitectureGraph />
        </div>
        <div className="mt-12">
          <Suspense fallback={<Slot />}>
            <TechnologyGraph />
          </Suspense>
        </div>
        <ul className="mt-16 grid gap-px bg-line md:grid-cols-2">
          {technologyDetails
            .filter((item) => item.id !== 'ai')
            .map((item) => (
              <li key={item.id} className="bg-bg p-5">
                <p className="font-mono text-[10px] tracking-[0.2em] text-developer uppercase">{item.layer}</p>
                <h3 className="display mt-3 text-2xl">{item.name}</h3>
                <p className="mt-3 text-muted">{item.what}</p>
              </li>
            ))}
        </ul>
        <div className="mt-10">
          <MagneticButton variant="ghost" onClick={() => goTo('/engineering', '03', 'Engineering')}>
            Open engineering →
          </MagneticButton>
        </div>
      </section>

      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <DisplayHeadline
              as="h2"
              lines={['Experiments today.', 'Big things tomorrow.']}
              className="max-w-4xl text-[12vw] md:text-6xl"
            />
            <p className="mt-6 max-w-xl text-muted">
              A collection of side projects, experiments and ideas. Some may never become companies.
            </p>
          </div>
          <div className="mt-8 lg:col-span-5 lg:mt-0">
            <EditorialImage
              src={visuals.labPrototype.src}
              alt={visuals.labPrototype.alt}
              width={visuals.labPrototype.width}
              height={visuals.labPrototype.height}
              className="aspect-[16/10]"
              imgClassName="object-center"
            />
          </div>
        </div>
        <div className="mt-12 grid gap-px bg-line md:grid-cols-2">
          {experiments.map((experiment) => (
            <button
              key={experiment.id}
              type="button"
              className="file-hover bg-bg p-6 text-left"
              onMouseEnter={() => setCursor('explore')}
              onMouseLeave={() => setCursor('default')}
              onClick={() => setExperimentId(experiment.id)}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] tracking-[0.2em] text-developer uppercase">
                  {experiment.category}
                </p>
                <p className="font-mono text-[10px] tracking-[0.16em] text-meta uppercase">{experiment.status}</p>
              </div>
              <h3 className="display mt-5 text-2xl">{experiment.title}</h3>
              <p className="mt-3 text-sm text-muted">{experiment.summary}</p>
            </button>
          ))}
        </div>
        <div className="mt-10">
          <MagneticButton variant="ghost" onClick={() => goTo('/lab', '04', 'Lab')}>
            More experiments →
          </MagneticButton>
        </div>
      </section>

      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <DisplayHeadline
          as="h2"
          lines={["Let's build", 'something great.']}
          className="max-w-4xl text-[12vw] md:text-[5.2rem]"
        />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <MagneticButton cursor="open" onClick={() => goTo('/contact', '06', 'Contact')}>
            Start a conversation →
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => goTo('/about', '05', 'About')}>
            About
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
