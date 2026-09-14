import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export function useLenis(paused: boolean) {
  const lenisRef = useRef<Lenis | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.1,
    })

    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    requestAnimationFrame(() => ScrollTrigger.refresh())
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      window.removeEventListener('load', onLoad)
      gsap.ticker.remove(update)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (paused) {
      lenis.stop()
      return
    }
    lenis.start()
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [paused])

  return lenisRef
}
