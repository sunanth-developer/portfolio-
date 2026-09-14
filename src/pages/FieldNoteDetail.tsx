import { useParams } from 'react-router-dom'
import { notes } from '@/data/notes'
import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'

export default function FieldNoteDetail() {
  const { slug } = useParams()
  const { goTo } = useApp()
  const note = notes.find((item) => item.slug === slug)

  if (!note) {
    return (
      <article className="px-5 pt-36 pb-24 md:px-8">
        <h1 className="display text-5xl">Note not found</h1>
        <div className="mt-8">
          <MagneticButton variant="ghost" onClick={() => goTo('/notes', '06', 'Field Notes')}>
            Back to field notes
          </MagneticButton>
        </div>
      </article>
    )
  }

  return (
    <article className="px-5 pt-32 pb-24 md:px-8 md:pt-40">
      <p className="eyebrow text-accent">{note.category}</p>
      {!note.published && (
        <p className="mt-4 text-[10px] tracking-[0.18em] text-muted uppercase">Working title — not a published article</p>
      )}
      <h1 className="display mt-6 max-w-5xl text-[11vw] md:text-7xl">{note.title}</h1>
      <div className="mt-14 max-w-2xl space-y-6 text-lg text-muted">
        {note.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-16">
        <MagneticButton variant="text" onClick={() => goTo('/notes', '06', 'Field Notes')}>
          ← Field notes
        </MagneticButton>
      </div>
    </article>
  )
}
