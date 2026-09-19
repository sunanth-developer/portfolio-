import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { useIsFinePointer, useReducedMotion } from '@/hooks/useMediaQuery'

const labels: Record<string, string> = {
  default: '',
  view: '',
  explore: 'EXPLORE →',
  open: 'OPEN →',
  close: 'CLOSE',
  case: 'VIEW CASE',
  trace: 'TRACE',
  inspect: 'INSPECT',
  founder: 'EXPLORE FOUNDER',
  developer: 'EXPLORE DEVELOPER',
}

export function CustomCursor() {
  const { cursor } = useApp()
  const fine = useIsFinePointer()
  const reduced = useReducedMotion()
  const [pos, setPos] = useState({ x: -40, y: -40 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!fine || reduced) {
      document.documentElement.classList.remove('has-custom-cursor')
      return
    }
    document.documentElement.classList.add('has-custom-cursor')
    const onMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY })
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [fine, reduced])

  if (!fine || reduced) return null

  const labeled = Boolean(labels[cursor])
  const hover = cursor === 'view' || labeled
  const founder = cursor === 'founder'
  const developer = cursor === 'developer'
  const fill = founder ? '#FF5A36' : developer ? '#63F5C2' : 'var(--cursor-dot)'

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70]"
      animate={{ x: pos.x, y: pos.y, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 36, mass: 0.22 }}
    >
      <div
        className="flex items-center gap-2 whitespace-nowrap"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <span
          className="block rounded-full"
          style={{
            width: hover && !founder && !developer ? 28 : 8,
            height: hover && !founder && !developer ? 28 : 8,
            background: founder || developer || !hover ? fill : 'transparent',
            border: hover && !founder && !developer ? '1px solid var(--color-accent)' : '0',
            transition: 'width 0.22s ease, height 0.22s ease, background-color 0.22s ease',
          }}
        />
        {labeled ? (
          <span className="font-mono text-[9px] tracking-[0.16em] text-fg uppercase">
            {labels[cursor]}
          </span>
        ) : null}
      </div>
    </motion.div>
  )
}
