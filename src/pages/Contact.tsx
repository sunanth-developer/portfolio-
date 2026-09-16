import { site } from '@/data/site'
import { MagneticButton } from '@/components/MagneticButton'
import { DisplayHeadline } from '@/components/DisplayHeadline'
import { Portrait } from '@/components/Portrait'
import { SectionMeta } from '@/components/SectionMeta'

export default function Contact() {
  const mail = `mailto:${site.email}?subject=${encodeURIComponent('Something worth building')}`

  return (
    <article className="px-5 pt-page pb-24 md:px-8">
      <div className="grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionMeta index="06" label="Contact" />
          <DisplayHeadline
            lines={["Let's build", 'something great.']}
            className="mt-6 text-[12vw] md:text-[6.4rem]"
          />
          <p className="mt-8 max-w-xl text-lg text-muted">
            I'm interested in ambitious ideas, interesting technical problems and people who want to build something
            meaningful.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <MagneticButton
              cursor="open"
              onClick={() => {
                window.location.href = mail
              }}
            >
              Email →
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              cursor="view"
              onClick={() => window.open(site.linkedin, '_blank', 'noreferrer')}
            >
              LinkedIn →
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              cursor="view"
              onClick={() => window.open(site.github, '_blank', 'noreferrer')}
            >
              GitHub →
            </MagneticButton>
          </div>
          <a href={mail} className="mt-8 inline-block font-mono text-sm text-muted hover:text-fg">
            {site.email}
          </a>
        </div>
        <div className="w-full max-w-sm lg:col-span-4 lg:max-w-none lg:justify-self-end">
          <Portrait caption={false} />
        </div>
      </div>
    </article>
  )
}
