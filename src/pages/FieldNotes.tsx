import { useMemo, useState } from 'react'
import { notes, noteCategories } from '@/data/notes'
import { FieldNoteCard } from '@/components/FieldNoteCard'
import { WaveBuild } from '@/components/WaveBuild'
import { cn } from '@/lib/cn'

export default function FieldNotes() {
  const [filter, setFilter] = useState<string>('ALL')
  const visible = useMemo(
    () => (filter === 'ALL' ? notes : notes.filter((note) => note.category === filter)),
    [filter],
  )

  return (
    <article className="pt-page pb-[var(--space-4xl)]">
      <div className="container">
        <p className="type-meta">Thinking</p>
        <WaveBuild
          as="h1"
          text="Things I'm still figuring out."
          mode="words"
          play="mount"
          className="type-l mt-6 display-w"
        />
        <p className="type-body mt-6 text-muted">
          Drafts from the work. These are not published articles — they are sketches, marked clearly until they are
          finished.
        </p>
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2">
          {['ALL', ...noteCategories].map((category) => (
            <button
              key={category}
              type="button"
              className={cn(
                'min-h-11 font-mono text-[10px] tracking-[0.2em] uppercase',
                filter === category ? 'text-fg' : 'text-meta hover:text-fg',
              )}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-16">
          {visible.length === 0 ? (
            <p className="type-body text-muted">Nothing filed under this heading yet.</p>
          ) : (
            <ul>
              {visible.map((note, index) => (
                <li key={note.slug}>
                  <FieldNoteCard note={note} featured={index === 0} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  )
}
