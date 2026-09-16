import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useLenis } from '@/hooks/useLenis'
import { useApp } from '@/context/AppContext'
import { Navbar } from '@/components/Navbar'
import { FullscreenMenu } from '@/components/FullscreenMenu'
import { PageTransition, GrainOverlay } from '@/components/PageTransition'
import { CustomCursor } from '@/components/CustomCursor'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Footer } from '@/components/Footer'
import { ProfileTransition } from '@/components/ProfileTransition'
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
    profileSwitch,
  } = useApp()
  const [booted, setBooted] = useState(() => {
    try {
      if (sessionStorage.getItem('sunanth-boot-v3') === '1') return true
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        sessionStorage.setItem('sunanth-boot-v3', '1')
        return true
      }
    } catch {
      return false
    }
    return false
  })
  const location = useLocation()
  const paused =
    !booted ||
    menuOpen ||
    accessOpen ||
    commandOpen ||
    Boolean(experimentId) ||
    completeOpen ||
    profileSwitch.active

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
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setCommandOpen])

  useEffect(() => {
    if (location.pathname.startsWith('/notes/')) {
      document.title = `Thinking — ${site.name}`
      return
    }
    if (location.pathname.startsWith('/work/')) {
      document.title = `Work — ${site.name}`
      return
    }
    const meta = pageMeta[location.pathname]
    document.title =
      location.pathname === '/'
        ? `${site.name} — Founder × Developer × Builder`
        : `${meta?.label ?? 'Index'} — ${site.name}`
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
      <ProfileTransition />
      <AccessOverlay />
      <CommandPalette />
      <ExperimentOverlay />
      <DiscoveryToasts />
      <SystemComplete />
      <div
        id="main"
        className={booted ? undefined : 'invisible'}
        inert={
          menuOpen ||
          accessOpen ||
          commandOpen ||
          Boolean(experimentId) ||
          completeOpen ||
          profileSwitch.active
            ? true
            : undefined
        }
      >
        <Outlet />
        {location.pathname !== '/' && <Footer />}
      </div>
    </>
  )
}
