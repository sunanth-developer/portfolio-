import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { useIsFinePointer, useReducedMotion } from '@/hooks/useMediaQuery'

export function useMagnetic<T extends HTMLElement>(strength = 0.28): RefObject<T | null> {
  const ref = useRef<T | null>(null)
  const fine = useIsFinePointer()
  const reduced = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !fine || reduced) return

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      node.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }

    const onLeave = () => {
      node.style.transform = 'translate(0px, 0px)'
    }

    node.addEventListener('mousemove', onMove)
    node.addEventListener('mouseleave', onLeave)
    return () => {
      node.removeEventListener('mousemove', onMove)
      node.removeEventListener('mouseleave', onLeave)
    }
  }, [fine, reduced, strength])

  return ref
}
