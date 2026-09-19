import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { founderStages } from '@/data/founder'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

gsap.registerPlugin(ScrollTrigger)

type LineRole = 'title' | 'body' | 'accent' | 'point'

type ChapterLine = {
  text: string
  role: LineRole
}

type Chapter = {
  id: string
  lines: ChapterLine[]
}

const question = founderStages[1]
const problem = founderStages[2]
const understanding = founderStages[3]
const building = founderStages[4]
const learning = founderStages[5]
const perspective = founderStages[6]

const chapters: Chapter[] = [
  {
    id: 'solve',
    lines: [
      { text: question.headline, role: 'title' },
      ...question.body.map((text) => ({ text, role: 'body' as const })),
    ],
  },
  {
    id: 'asks',
    lines: question.questions.map((text) => ({ text, role: 'point' as const })),
  },
  {
    id: 'start',
    lines: [{ text: question.close, role: 'accent' }],
  },
  {
    id: 'understanding',
    lines: [
      { text: understanding.headline, role: 'title' },
      { text: 'Understanding what actually needs to be solved.', role: 'accent' },
    ],
  },
  {
    id: 'problem',
    lines: [
      { text: problem.headline, role: 'title' },
      { text: problem.body[0], role: 'body' },
      { text: problem.body[1], role: 'body' },
      { text: problem.close, role: 'accent' },
    ],
  },
  {
    id: 'driverspot',
    lines: [
      { text: building.headline, role: 'title' },
      { text: building.subhead ?? '', role: 'body' },
    ],
  },
  {
    id: 'system',
    lines: [
      { text: learning.headline, role: 'title' },
      { text: learning.close[0], role: 'body' },
      { text: learning.close[1], role: 'accent' },
    ],
  },
  {
    id: 'perspective',
    lines: [
      { text: perspective.headline, role: 'title' },
      { text: perspective.developer ?? '', role: 'body' },
      { text: perspective.founder ?? '', role: 'body' },
      { text: perspective.close ?? '', role: 'accent' },
    ],
  },
  {
    id: 'tools',
    lines: [
      { text: perspective.toolsHead ?? '', role: 'title' },
      { text: "But I don't start there anymore.", role: 'body' },
      { text: 'I start with the problem. Then I work backwards.', role: 'accent' },
    ],
  },
]

export function FounderPinnedChapters() {
  const pinRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const activeRef = useRef(setActive)

  useEffect(() => {
    activeRef.current = setActive
  }, [])

  useLayoutEffect(() => {
    const pin = pinRef.current
    if (!pin || reduced) return

    const trigger = ScrollTrigger.create({
      trigger: pin,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * chapters.length * 0.92)}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.4,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const next = Math.min(
          chapters.length - 1,
          Math.max(0, Math.floor(self.progress * chapters.length)),
        )
        activeRef.current(next)
      },
    })

    const refresh = () => ScrollTrigger.refresh()
    const raf = window.requestAnimationFrame(refresh)
    const later = window.setTimeout(refresh, 450)
    void document.fonts?.ready.then(refresh)
    window.addEventListener('resize', refresh)

    return () => {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(later)
      window.removeEventListener('resize', refresh)
      trigger.kill()
    }
  }, [reduced])

  const chapter = chapters[active]

  return (
    <section className="relative">
      <div
        ref={pinRef}
        className="relative flex h-svh items-center justify-center px-[var(--page-padding)]"
      >
        <div className="founder-story w-full">
          <ChapterType key={chapter.id} chapter={chapter} reduced={reduced} />
        </div>
        <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.22em] text-fg/45 uppercase">
          {String(active + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
        </p>
      </div>
    </section>
  )
}

function ChapterType({ chapter, reduced }: { chapter: Chapter; reduced: boolean }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [chars, setChars] = useState(reduced ? chapter.lines[0]?.text.length ?? 0 : 0)

  useEffect(() => {
    setLineIndex(0)
    setChars(reduced ? chapter.lines[0]?.text.length ?? 0 : 0)
  }, [chapter.id, reduced, chapter.lines])

  useEffect(() => {
    if (reduced) {
      setLineIndex(Math.max(0, chapter.lines.length - 1))
      setChars(chapter.lines.at(-1)?.text.length ?? 0)
      return
    }

    const line = chapter.lines[lineIndex]
    if (!line) return

    if (chars < line.text.length) {
      const step = line.role === 'title' ? 24 : 15
      const timer = window.setTimeout(() => setChars((count) => count + 1), step)
      return () => window.clearTimeout(timer)
    }

    if (lineIndex < chapter.lines.length - 1) {
      const timer = window.setTimeout(() => {
        setLineIndex((index) => index + 1)
        setChars(0)
      }, 160)
      return () => window.clearTimeout(timer)
    }
  }, [chapter, chars, lineIndex, reduced])

  return (
    <div aria-live="polite" aria-atomic="true" className="mx-auto flex min-h-[14rem] flex-col items-center justify-center">
      {chapter.lines.map((line, index) => {
        const visible =
          reduced || index < lineIndex
            ? line.text
            : index === lineIndex
              ? line.text.slice(0, chars)
              : ''
        const typing = !reduced && index === lineIndex && chars < line.text.length
        if (!visible && index > lineIndex) return null

        return (
          <p
            key={`${chapter.id}-${line.text}`}
            className={cn(
              'max-w-[95%] text-center',
              line.role === 'title' && 'type-l mt-0',
              line.role === 'body' && 'type-body mt-5 text-muted',
              line.role === 'point' && 'type-m mt-4',
              line.role === 'accent' && 'type-m mt-8 text-founder',
              index > 0 && line.role === 'title' && 'mt-5',
            )}
          >
            {visible}
            {typing && (
              <span className="ml-0.5 inline-block w-[0.08em] translate-y-[-0.08em] bg-founder align-middle" style={{ height: '0.85em' }} aria-hidden>
                {' '}
              </span>
            )}
          </p>
        )
      })}
    </div>
  )
}
