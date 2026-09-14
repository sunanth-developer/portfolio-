import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useLenis } from '@/hooks/useLenis'
import { useApp } from '@/context/AppContext'
import { Navbar } from '@/components/Navbar'
import { FullscreenMenu } from '@/components/FullscreenMenu'
import { PageTransition } from '@/components/PageTransition'
import { CustomCursor } from '@/components/CustomCursor'
import { ScrollProgress } from '@/components/ScrollProgress'
import { GrainOverlay } from '@/components/GrainOverlay'
import { Footer } from '@/components/Footer'
import { AccessOverlay } from '@/components/AccessOverlay'
import { CommandPalette } from '@/components/CommandPalette'
import { DiscoveryToasts, SystemComplete } from '@/components/DiscoverySystem'
import { ExperimentOverlay } from '@/components/ExperimentOverlay'
import { Loader } from '@/components/Loader'
import { pageMeta, site } from '@/data/site'

export function Layout() {
  const {
    menuOpen,
    accessOpen,
    commandOpen,
    experimentId,
    completeOpen,
    setCommandOpen,
    unlock,
  } = useApp()
  const [booted, setBooted] = useState(() => {
    try {
      if (sessionStorage.getItem('sunanth-boot') === '1') return true
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        sessionStorage.setItem('sunanth-boot', '1')
        return true
      }
    } catch {
      return false
    }
    return false
  })
  const location = useLocation()
  const paused =
    !booted || menuOpen || accessOpen || commandOpen || Boolean(experimentId) || completeOpen

  useLenis(paused)
  const finishBoot = useCallback(() => setBooted(true), [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        Boolean(target?.isContentEditable)
      if (typing) return
      if (event.key === 'k' || event.key === 'K') {
        event.preventDefault()
        setCommandOpen(true)
        unlock('command')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setCommandOpen, unlock])

  useEffect(() => {
    if (location.pathname.startsWith('/notes/')) {
      document.title = `Field Notes — ${site.name}`
      return
    }
    const meta = pageMeta[location.pathname]
    document.title = meta
      ? `${meta.label} — ${site.name}`
      : `${site.name} — Founder × Developer`
    if (location.pathname === '/') {
      document.title = `${site.name} — Founder × Developer`
    }
  }, [location.pathname])

  return (
    <>
      {!booted && <Loader onDone={finishBoot} />}
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <GrainOverlay />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <FullscreenMenu />
      <PageTransition />
      <AccessOverlay />
      <CommandPalette />
      <ExperimentOverlay />
      <DiscoveryToasts />
      <SystemComplete />
      <div
        className={booted ? 'opacity-100' : 'opacity-0'}
        id="main"
        inert={
          menuOpen || accessOpen || commandOpen || Boolean(experimentId) || completeOpen
            ? true
            : undefined
        }
      >
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
