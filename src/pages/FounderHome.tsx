import { lazy, Suspense } from 'react'
import { MagneticButton } from '@/components/MagneticButton'
import { Portrait } from '@/components/Portrait'
import { TractionBlock } from '@/components/ProjectGallery'
import { DisplayHeadline } from '@/components/DisplayHeadline'
import { useApp } from '@/context/AppContext'
import { notes } from '@/data/notes'
import { site } from '@/data/site'
import { JourneyTimeline } from '@/components/Timeline'
import { EditorialImage } from '@/components/EditorialImage'
import { visuals } from '@/data/visuals'

const DriverSpotStory = lazy(() => import('@/sections/DriverSpotStory'))

function Slot() {
  return <div className="min-h-[16vh]" />
}

export default function FounderHome() {
  const { goTo, setCursor } = useApp()

  return (
    <>
      <section className="relative grid items-center gap-10 overflow-x-clip px-5 pt-page pb-16 md:min-h-svh md:px-8 lg:grid-cols-12 lg:gap-12 lg:pb-20">
        <div className="relative z-10 lg:col-span-7">
          <DisplayHeadline
            lines={['I build companies', 'around problems', 'worth solving.']}
            className="max-w-4xl text-[12vw] md:text-[clamp(3.5rem,7.4vw,6.8rem)]"
          />
          <p className="mt-8 max-w-lg text-lg text-muted">
            Founder and developer building products that create real-world value — from the first problem definition
            through architecture, launch and iteration.
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-meta uppercase">{site.locationShort}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <MagneticButton cursor="explore" onClick={() => goTo('/work/driverspot', '02', 'DriverSpot')}>
              Explore DriverSpot →
            </MagneticButton>
            <MagneticButton variant="ghost" cursor="view" onClick={() => goTo('/journey', '03', 'Journey')}>
              My story
            </MagneticButton>
          </div>
        </div>
        <div className="relative z-10 flex w-full justify-center lg:col-span-5 lg:justify-end">
          <Portrait priority className="w-full max-w-[19rem] sm:max-w-[22rem] lg:max-w-[26rem]" />
        </div>
      </section>

      <section className="border-t border-line px-5 py-16 md:px-8 md:py-20">
        <DisplayHeadline
          as="h2"
          lines={['Built.', 'Shipped.', 'Used.']}
          className="text-[12vw] md:text-6xl"
        />
        <p className="mt-6 max-w-xl text-muted">
          Verified DriverSpot contact with the city — users, drivers, completed rides and revenue. Nothing padded.
        </p>
        <div className="mt-10">
          <TractionBlock />
        </div>
      </section>

      <Suspense fallback={<Slot />}>
        <DriverSpotStory />
      </Suspense>

      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <DisplayHeadline
              as="h2"
              lines={['A journey of building.']}
              className="max-w-4xl text-[12vw] md:text-6xl"
            />
            <p className="mt-6 max-w-xl text-muted">
              A build log — not a resume. Stages that already exist in the work, without invented dates.
            </p>
          </div>
          <div className="mt-8 lg:col-span-5 lg:mt-0">
            <EditorialImage
              src={visuals.journeyDesk.src}
              alt={visuals.journeyDesk.alt}
              width={visuals.journeyDesk.width}
              height={visuals.journeyDesk.height}
              className="aspect-[16/10]"
              imgClassName="object-[center_42%]"
            />
          </div>
        </div>
        <div className="mt-12">
          <JourneyTimeline limit={4} />
        </div>
        <div className="mt-10">
          <MagneticButton variant="ghost" onClick={() => goTo('/journey', '03', 'Journey')}>
            Explore full journey →
          </MagneticButton>
        </div>
      </section>

      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <DisplayHeadline
              as="h2"
              lines={['Ideas,', 'observations', 'and lessons.']}
              className="text-[12vw] md:text-6xl"
            />
            <p className="mt-6 max-w-xl text-muted">
              Thoughts on products, business, technology and building in public. Drafts — not published articles.
            </p>
            <div className="mt-10">
              <MagneticButton variant="ghost" onClick={() => goTo('/notes', '04', 'Thinking')}>
                Explore thinking →
              </MagneticButton>
            </div>
          </div>
          <div className="mt-12 lg:col-span-7 lg:mt-0">
            {notes.map((note, index) => (
              <button
                key={note.slug}
                type="button"
                className="file-hover flex w-full items-start gap-4 border-b border-line py-5 text-left"
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={() => setCursor('default')}
                onClick={() => goTo(`/notes/${note.slug}`, '04', 'Thinking')}
              >
                <span className="font-mono text-[10px] tracking-[0.18em] text-meta uppercase">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-3">
                    <span className="display text-xl md:text-2xl">{note.title}</span>
                    {!note.published && (
                      <span className="font-mono text-[9px] tracking-[0.18em] text-gold uppercase">Draft</span>
                    )}
                  </span>
                  <span className="mt-2 block text-sm text-muted">{note.excerpt}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <DisplayHeadline
          as="h2"
          lines={['Have something', 'worth building?']}
          className="max-w-4xl text-[12vw] md:text-[5.2rem]"
        />
        <p className="mt-6 max-w-xl text-muted">
          I'm interested in ambitious ideas, interesting technical problems and people who want to build something
          meaningful.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <MagneticButton cursor="open" onClick={() => goTo('/contact', '06', 'Contact')}>
            Start a conversation →
          </MagneticButton>
          <MagneticButton variant="ghost" cursor="view" onClick={() => goTo('/about', '05', 'About')}>
            About
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
