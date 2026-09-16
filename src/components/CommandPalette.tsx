import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useApp } from '@/context/AppContext'
import { projects } from '@/data/projects'
import { technologyCategories } from '@/data/technologies'

type Line = { type: 'in' | 'out'; text: string }

export function CommandPalette() {
  const { commandOpen, setCommandOpen, unlock, goTo } = useApp()
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<Line[]>([{ type: 'out', text: 'type a command — help' }])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!commandOpen) return
    unlock('command')
    const t = window.setTimeout(() => inputRef.current?.focus(), 40)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCommandOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [commandOpen, setCommandOpen, unlock])

  const run = (raw: string) => {
    const command = raw.trim().toLowerCase()
    if (!command) return
    if (command === 'clear') {
      setLines([])
      setInput('')
      return
    }

    const map: Record<string, string[]> = {
      whoami: ['FOUNDER', 'DEVELOPER', 'BUILDER'],
      current: ['STATUS', 'BUILDING'],
      founder: ['OPENING FOUNDER PROFILE'],
      developer: ['OPENING DEVELOPER PROFILE'],
      work: ['01 DRIVERSPOT', ...projects.slice(1).map((p) => `${p.index} ${p.title.toUpperCase()}`)],
      stack: technologyCategories.flatMap((c) => [c.label.toUpperCase(), ...c.items]),
      lab: ['OPENING LAB'],
      journey: ['OPENING BUILD LOG'],
      help: ['whoami', 'founder', 'developer', 'work', 'stack', 'lab', 'journey', 'current', 'secret', 'clear'],
      secret: ['ACCESSING...', '████████████████████ 100%', 'YOU FOUND THE HIDDEN LAYER.'],
    }

    const response = map[command] ?? ['command not found']
    if (command === 'secret') unlock('command')
    setLines((current) => [
      ...current,
      { type: 'in', text: command },
      ...response.map((text) => ({ type: 'out' as const, text })),
    ])
    setInput('')
    if (command === 'lab') window.setTimeout(() => goTo('/lab', '04', 'Lab'), 400)
    if (command === 'journey') window.setTimeout(() => goTo('/journey', '03', 'Journey'), 400)
    if (command === 'work') window.setTimeout(() => goTo('/work', '02', 'Work'), 400)
    if (command === 'founder') window.setTimeout(() => goTo('/founder', '01', 'Founder'), 400)
    if (command === 'developer') window.setTimeout(() => goTo('/developer', '01', 'Developer'), 400)
  }

  return (
    <AnimatePresence>
      {commandOpen && (
        <motion.div
          className="fixed inset-0 z-[66] flex items-end justify-center bg-black/80 px-4 pt-24 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:items-start sm:pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Command overlay"
          onClick={() => setCommandOpen(false)}
        >
          <motion.div
            className="w-full max-w-xl border border-line bg-surface p-6"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="eyebrow">Command</p>
              <button
                type="button"
                className="flex min-h-11 items-center text-[10px] tracking-[0.24em] uppercase"
                onClick={() => setCommandOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="mb-5 max-h-40 space-y-2 overflow-y-auto font-display text-sm sm:max-h-56">
              {lines.map((line, index) => (
                <p key={`${line.text}-${index}`} className={line.type === 'in' ? 'text-accent' : 'text-fg'}>
                  {line.type === 'in' ? `> ${line.text}` : line.text}
                </p>
              ))}
            </div>
            <label className="flex items-center gap-3 border-t border-line pt-4">
              <span className="text-accent">{'>'}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') run(input)
                }}
                className="w-full bg-transparent font-display text-base outline-none md:text-sm"
                placeholder="type a command"
                aria-label="Command input"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </label>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
