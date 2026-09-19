import { EditorialImage } from '@/components/EditorialImage'
import { LabFragments, LabPath } from '@/components/LabFragments'
import { experiments } from '@/data/experiments'
import { visuals } from '@/data/visuals'

export default function Lab() {
  return (
    <article className="pt-page pb-[var(--space-4xl)]">
      <div className="container">
        <p className="type-meta">Lab</p>
        <h1 className="type-l mt-6 display-w">Things I'm still figuring out.</h1>
        <div className="type-body mt-8 space-y-4 text-muted">
          <p>Not everything I build needs to become a product.</p>
          <p>Some ideas exist simply to understand what is possible.</p>
        </div>
        <LabPath />
        <EditorialImage
          src={visuals.labPrototype.src}
          alt={visuals.labPrototype.alt}
          width={visuals.labPrototype.width}
          height={visuals.labPrototype.height}
          className="mt-14 aspect-[16/10] max-w-xl"
          imgClassName="object-center"
        />
        <div className="mt-16">
          <LabFragments items={experiments} />
        </div>
      </div>
    </article>
  )
}
