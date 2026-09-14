import { about } from '@/data/site'
import { RevealText } from '@/components/RevealText'
import { Portrait } from '@/components/Portrait'

export default function About() {
  return (
    <article className="px-5 pt-36 pb-28 md:px-10 md:pt-44">
      <p className="eyebrow mb-6">
        <span className="mr-4 text-accent">01</span>
        About
      </p>
      <RevealText
        as="h1"
        text={about.heading}
        className="display-title max-w-5xl text-[12vw] md:text-[5.5rem]"
      />
      <div className="mt-16 grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <Portrait variant="editorial" priority />
        <div className="max-w-3xl space-y-8 text-lg leading-relaxed text-muted md:text-2xl lg:pt-4">
          {about.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="mt-28 space-y-16">
        {about.sections.map((section) => (
          <section key={section.title} className="border-t border-line pt-10">
            <h2 className="display-title text-4xl md:text-6xl">{section.title}</h2>
            <p className="mt-6 max-w-xl text-lg text-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
