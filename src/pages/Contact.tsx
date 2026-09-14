import { contact, site } from '@/data/site'
import { MagneticButton } from '@/components/MagneticButton'
import { Portrait } from '@/components/Portrait'

export default function Contact() {
  const mail = `mailto:${site.email}?subject=${encodeURIComponent('Something worth building')}`

  return (
    <article className="px-5 pt-32 pb-28 md:px-10 md:pt-40">
      <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-16">
        <div>
          <p className="eyebrow mb-6">
            <span className="mr-4 text-accent">07</span>
            Contact
          </p>
          <h1 className="display-title max-w-5xl text-[12vw] md:text-[5.8rem]">{contact.heading}</h1>
          <p className="mt-8 max-w-2xl text-lg text-muted md:text-xl">{contact.supporting}</p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <MagneticButton cursor="open" onClick={() => {
              window.location.href = mail
            }}>
              Start a conversation →
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
          <a
            href={mail}
            className="mt-10 inline-block text-sm tracking-[0.08em] text-muted transition-colors hover:text-fg"
          >
            {site.email}
          </a>
        </div>
        <div className="w-full max-w-sm lg:justify-self-end lg:w-[min(100%,22rem)]">
          <Portrait variant="compact" caption={false} />
          <p className="mt-4 text-[11px] tracking-[0.2em] text-muted uppercase">
            {site.name} · {site.location}
          </p>
        </div>
      </div>
    </article>
  )
}
