import { useMemo, useState } from 'react'
import { notes, noteCategories } from '@/data/notes'
import { FieldNoteCard } from '@/components/FieldNoteCard'
import { cn } from '@/lib/cn'

export default function FieldNotes() {
  const [filter, setFilter] = useState<string>('ALL')
  const visible = useMemo(
    () => (filter === 'ALL' ? notes : notes.filter((note) => note.category === filter)),
    [filter],
  )

  return (
    <article className="px-5 pt-32 pb-24 md:px-8 md:pt-40">
      <p className="eyebrow mb-6">
        <span className="mr-4 text-accent">06</span>
        Field notes
      </p>
      <h1 className="display text-[14vw] md:text-[7rem]">Field notes</h1>
      <p className="mt-8 max-w-xl text-muted">
        Working titles for thinking in public. These are not published articles — they are sketches from the work.
      </p>
      <div className="mt-12 flex flex-wrap gap-2">
        {['ALL', ...noteCategories].map((category) => (
          <button
            key={category}
            type="button"
            className={cn(
              'border px-3 py-2 text-[10px] tracking-[0.16em] uppercase',
              filter === category ? 'border-accent text-accent' : 'border-line text-muted',
            )}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-4">
        {visible.length === 0 ? (
          <p className="border border-line p-10 text-muted">Nothing filed under this heading yet.</p>
        ) : (
          <>
            {visible[0] && <FieldNoteCard note={visible[0]} featured />}
            <div className="grid gap-4 md:grid-cols-2">
              {visible.slice(1).map((note) => (
                <FieldNoteCard key={note.slug} note={note} />
              ))}
            </div>
          </>
        )}
      </div>
    </article>
  )
}
