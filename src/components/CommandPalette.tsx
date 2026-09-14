import { AnimatePresence, motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { commandResponses } from '@/data/discoveries'
import { useApp } from '@/context/AppContext'

type Line = { type: 'in' | 'out'; text: string }

export function CommandPalette() {
  const { commandOpen, setCommandOpen, unlock } = useApp()
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<Line[]>([
    { type: 'out', text: 'session ready. try whoami' },
  ])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!commandOpen) return
    unlock('command')
    const t = window.setTimeout(() => inputRef.current?.focus(), 50)
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
    const response = commandResponses[command] ?? ['command not found']
    setLines((current) => [
      ...current,
      { type: 'in', text: command },
      ...response.map((text) => ({ type: 'out' as const, text })),
    ])
    setInput('')
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
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
          >
            <p className="eyebrow mb-6 inline-flex items-center gap-2">
              <Terminal size={12} aria-hidden />
              Terminal
            </p>
            <div className="mb-6 max-h-64 space-y-2 overflow-y-auto font-display text-sm">
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
                placeholder="whoami"
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
