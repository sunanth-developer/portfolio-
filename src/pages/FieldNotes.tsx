import { useMemo, useState } from 'react'
import { notes, noteCategories } from '@/data/notes'
import { FieldNoteCard } from '@/components/FieldNoteCard'
import { DisplayHeadline } from '@/components/DisplayHeadline'
import { SectionMeta } from '@/components/SectionMeta'
import { cn } from '@/lib/cn'

export default function FieldNotes() {
  const [filter, setFilter] = useState<string>('ALL')
  const visible = useMemo(
    () => (filter === 'ALL' ? notes : notes.filter((note) => note.category === filter)),
    [filter],
  )

  return (
    <article className="px-5 pt-page pb-24 md:px-8">
      <SectionMeta index="04" label="Thinking" />
      <DisplayHeadline
        lines={['Ideas.', 'Observations.', 'Lessons.']}
        className="mt-6 text-[12vw] md:text-[6.2rem]"
      />
      <p className="mt-6 max-w-xl text-muted">
        Drafts from the work. These are not published articles — they are sketches, marked clearly until they are
        finished.
      </p>
      <div className="mt-12 flex flex-wrap gap-2">
        {['ALL', ...noteCategories].map((category) => (
          <button
            key={category}
            type="button"
            className={cn(
              'min-h-11 rounded-full border px-4 py-2 font-mono text-[10px] tracking-[0.16em] uppercase',
              filter === category ? 'border-accent text-accent' : 'border-line text-muted',
            )}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-px bg-line">
        {visible.length === 0 ? (
          <p className="bg-bg p-10 text-muted">Nothing filed under this heading yet.</p>
        ) : (
          <>
            {visible[0] && <FieldNoteCard note={visible[0]} featured />}
            <div className="grid gap-px bg-line md:grid-cols-2">
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
