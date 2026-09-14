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

  const labeled = cursor === 'explore' || cursor === 'open' || cursor === 'close'
  const hover = cursor === 'view' || labeled

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70]"
      animate={{ x: pos.x, y: pos.y, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 520, damping: 38, mass: 0.25 }}
    >
      <div
        className="flex items-center justify-center rounded-full text-[9px] tracking-[0.16em] text-fg"
        style={{
          width: labeled ? 88 : hover ? 22 : 8,
          height: labeled ? 88 : hover ? 22 : 8,
          transform: 'translate(-50%, -50%)',
          background: labeled || hover ? 'transparent' : '#F2EFE7',
          border: hover ? '1px solid #FF5A36' : '0',
        }}
      >
        {labeled ? labels[cursor] : null}
      </div>
    </motion.div>
  )
}
