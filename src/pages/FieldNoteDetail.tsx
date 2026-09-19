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
      <article className="pt-page pb-[var(--space-4xl)]">
        <div className="container">
          <h1 className="type-l">Note not found</h1>
          <div className="mt-8">
            <MagneticButton variant="ghost" onClick={() => goTo('/notes', '06', 'Field Notes')}>
              Back to field notes
            </MagneticButton>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="pt-page pb-[var(--space-4xl)]">
      <div className="container">
        <p className="type-meta">{note.category}</p>
        {!note.published && (
          <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-gold uppercase">
            Draft — not a published article
          </p>
        )}
        <h1 className="type-l mt-6 display-w">{note.title}</h1>
        <div className="type-long mt-14 space-y-6 text-muted">
          {note.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-16">
          <MagneticButton variant="text" onClick={() => goTo('/notes', '06', 'Thinking')}>
            ← Thinking
          </MagneticButton>
        </div>
      </div>
    </article>
  )
}
