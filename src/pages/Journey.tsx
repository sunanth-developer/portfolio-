import { DisplayHeadline } from '@/components/DisplayHeadline'
import { EditorialImage } from '@/components/EditorialImage'
import { JourneyTimeline } from '@/components/Timeline'
import { visuals } from '@/data/visuals'

export default function Journey() {
  return (
    <article className="px-5 pt-page pb-24 md:px-8">
      <DisplayHeadline
        lines={['A journey of building.']}
        className="text-[12vw] md:text-[7rem]"
      />
      <p className="mt-8 max-w-xl text-muted">
        Not a resume. A sequence of stages already in the work — years only where they are known.
      </p>
      <EditorialImage
        src={visuals.journeyDesk.src}
        alt={visuals.journeyDesk.alt}
        width={visuals.journeyDesk.width}
        height={visuals.journeyDesk.height}
        className="mt-10 aspect-[16/10]"
        imgClassName="object-[center_42%]"
        sizes="100vw"
      />
      <div className="mt-16">
        <JourneyTimeline />
      </div>
    </article>
  )
}
