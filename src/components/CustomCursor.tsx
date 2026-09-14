import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { useIsFinePointer } from '@/hooks/useMediaQuery'

const labels: Record<string, string> = {
  default: '',
  view: '',
  explore: 'EXPLORE',
  open: 'OPEN →',
  close: 'CLOSE',
}

export function CustomCursor() {
  const { cursor } = useApp()
  const fine = useIsFinePointer()
  const [pos, setPos] = useState({ x: -40, y: -40 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!fine) {
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
  }, [fine])

  if (!fine) return null

  const expanded = cursor === 'explore' || cursor === 'open' || cursor === 'close'
  const navExpand = cursor === 'view'

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70] mix-blend-difference"
      animate={{ x: pos.x, y: pos.y, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 520, damping: 38, mass: 0.25 }}
    >
      <div
        className="flex items-center justify-center rounded-full bg-white text-[9px] tracking-[0.16em] text-black transition-[width,height] duration-300"
        style={{
          width: expanded ? 84 : navExpand ? 22 : 8,
          height: expanded ? 84 : navExpand ? 22 : 8,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {expanded ? labels[cursor] : null}
      </div>
    </motion.div>
  )
}
