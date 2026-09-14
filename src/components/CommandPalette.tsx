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
      work: ['01 DRIVERSPOT', ...projects.slice(1).map((p) => `${p.index} ${p.title.toUpperCase()}`)],
      stack: technologyCategories.flatMap((c) => [c.label.toUpperCase(), ...c.items]),
      lab: ['OPENING LAB'],
      journey: ['OPENING BUILD LOG'],
      help: ['whoami', 'work', 'stack', 'lab', 'journey', 'current', 'secret', 'clear'],
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
    if (command === 'lab') window.setTimeout(() => goTo('/lab', '05', 'Lab'), 400)
    if (command === 'journey') window.setTimeout(() => goTo('/journey', '04', 'Journey'), 400)
    if (command === 'work') window.setTimeout(() => goTo('/work', '02', 'Work'), 400)
  }

  return (
    <AnimatePresence>
      {commandOpen && (
        <motion.div
          className="fixed inset-0 z-[66] flex items-start justify-center bg-black/80 px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Command overlay"
          onClick={() => setCommandOpen(false)}
        >
          <motion.div
            className="w-full max-w-xl border border-line bg-bg p-6"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={(event) => event.stopPropagation()}
          >
            <p className="eyebrow mb-5">Command</p>
            <div className="mb-5 max-h-56 space-y-2 overflow-y-auto font-display text-sm">
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
                className="w-full bg-transparent font-display text-sm outline-none"
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
