import { TechnologyGraph } from '@/components/TechnologyGraph'
import { ArchitectureGraph } from '@/components/ArchitectureGraph'
import { DisplayHeadline } from '@/components/DisplayHeadline'
import { technologyCategories, technologyDetails } from '@/data/technologies'

export default function Engineering() {
  return (
    <article className="px-5 pt-page pb-24 md:px-8">
      <DisplayHeadline
        lines={['Under', 'the hood.']}
        className="text-[14vw] md:text-[8rem]"
      />
      <p className="mt-8 max-w-xl text-lg text-muted">
        I build the technology behind the products. Click a layer to see what it does, why it is used, and where it
        fits.
      </p>
      <div className="mt-12">
        <ArchitectureGraph />
      </div>
      <div className="mt-16">
        <TechnologyGraph />
      </div>
      <div className="mt-20">
        <h2 className="display text-4xl md:text-5xl">Technology</h2>
        <p className="mt-4 max-w-xl text-muted">What each piece is for — not a score.</p>
        <ul className="mt-10 grid gap-px bg-line md:grid-cols-2">
          {technologyDetails.map((item) => (
            <li key={item.id} className="bg-bg p-5">
              <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">{item.layer}</p>
              <h3 className="display mt-3 text-2xl">{item.name}</h3>
              <p className="mt-3 text-muted">{item.what}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-20 grid gap-12 md:grid-cols-2">
        {technologyCategories.map((category) => (
          <section key={category.id} className="border-t border-line pt-6">
            <h2 className="eyebrow text-accent">{category.label}</h2>
            <ul className="mt-5">
              {category.items.map((item) => (
                <li key={item} className="border-b border-line py-3 font-display text-2xl">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  )
}
