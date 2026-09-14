import { Portrait } from '@/components/Portrait'
import { RevealText } from '@/components/RevealText'

export default function About() {
  return (
    <article className="px-5 pt-32 pb-24 md:px-8 md:pt-40">
      <p className="eyebrow mb-6">
        <span className="mr-4 text-accent">01</span>
        About
      </p>
      <RevealText
        as="h1"
        text="The person behind the products."
        className="display max-w-5xl text-[12vw] md:text-[5.4rem]"
      />
      <div className="mt-16 grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Portrait priority />
        <div className="space-y-8 text-lg text-muted md:text-2xl">
          <p>
            I'm Sunanth Samala, a founder and developer focused on turning real-world problems into
            technology-driven products.
          </p>
          <p>
            I like being involved across the entire journey — understanding the problem, shaping the product, writing
            the software, launching it and learning from what happens next.
          </p>
        </div>
      </div>
      <div className="mt-24 space-y-14">
        {[
          {
            title: 'As a founder',
            body: 'I think in problems, users, systems and outcomes.',
          },
          {
            title: 'As a developer',
            body: 'I think in architecture, interfaces, APIs, data and performance.',
          },
          {
            title: 'The combination',
            body: "The advantage is simple: I don't have to throw an idea over the wall to someone else before I can build it.",
          },
        ].map((item) => (
          <section key={item.title} className="border-t border-line pt-8">
            <h2 className="display text-4xl md:text-6xl">{item.title}</h2>
            <p className="mt-5 max-w-xl text-lg text-muted">{item.body}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
