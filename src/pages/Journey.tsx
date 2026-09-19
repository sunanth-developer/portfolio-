import { EditorialImage } from '@/components/EditorialImage'
import { WaveBuild } from '@/components/WaveBuild'
import { JourneyTimeline } from '@/components/Timeline'
import { visuals } from '@/data/visuals'

export default function Journey() {
  return (
    <article className="pt-page pb-[var(--space-4xl)]">
      <div className="container">
        <p className="type-meta">Journey</p>
        <WaveBuild
          as="h1"
          text="A journey of building."
          mode="words"
          play="mount"
          className="type-xl mt-6 display-w"
        />
        <p className="type-body mt-8 text-muted">
          Not a resume. A sequence of stages already in the work — years only where they are known.
        </p>
      </div>
      <EditorialImage
        src={visuals.journeyDesk.src}
        alt={visuals.journeyDesk.alt}
        width={visuals.journeyDesk.width}
        height={visuals.journeyDesk.height}
        priority
        className="mt-16 aspect-[16/10] w-full lg:aspect-[2.2/1]"
        imgClassName="object-[center_42%]"
        sizes="100vw"
      />
      <div className="container mt-20">
        <JourneyTimeline />
      </div>
    </article>
  )
}
