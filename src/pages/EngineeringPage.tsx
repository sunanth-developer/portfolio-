import { TechnologyGraph } from '@/components/TechnologyGraph'
import { technologyCategories } from '@/data/technologies'

export default function Engineering() {
  return (
    <article className="px-5 pt-32 pb-24 md:px-8 md:pt-40">
      <p className="eyebrow mb-6">
        <span className="mr-4 text-accent">03</span>
        Engineering
      </p>
      <h1 className="display text-[18vw] md:text-[9rem]">
        Under
        <br />
        the hood.
      </h1>
      <p className="mt-8 max-w-xl text-lg text-muted">I build the technology behind the products.</p>
      <div className="mt-16">
        <TechnologyGraph />
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
