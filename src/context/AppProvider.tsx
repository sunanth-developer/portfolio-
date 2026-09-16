import { useCallback, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '@/context/AppContext'
import type { CursorKind, Profile, ProfileId, ProfileSwitchState } from '@/context/AppContext'
import { discoveryIds, type DiscoveryId } from '@/data/discoveries'
import { developerNav, founderNav } from '@/data/site'

const STORAGE_KEY = 'sunanth-discoveries-v3'
const COMPLETE_KEY = 'sunanth-system-complete-v3'
const PROFILE_KEY = 'sunanth-profile-v4'

function readFound(): DiscoveryId[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is DiscoveryId =>
      discoveryIds.includes(item as DiscoveryId),
    )
  } catch {
    return []
  }
}

function readStoredProfile(): ProfileId | null {
  try {
    const value = localStorage.getItem(PROFILE_KEY)
    if (value === 'founder' || value === 'developer') return value
  } catch {
    return null
  }
  return null
}

function persistProfile(next: ProfileId) {
  try {
    localStorage.setItem(PROFILE_KEY, next)
  } catch {
    /* ignore quota */
  }
}

function applyDocumentProfile(profile: Profile) {
  document.documentElement.setAttribute(
    'data-profile',
    profile === 'developer' ? 'developer' : profile === 'founder' ? 'founder' : 'neutral',
  )
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function inferProfile(pathname: string, current: Profile): Profile {
  if (pathname === '/') return 'neutral'
  if (pathname === '/founder') return 'founder'
  if (pathname === '/developer') return 'developer'
  if (current === 'founder' || current === 'developer') return current
  return readStoredProfile() ?? 'founder'
}

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cursor, setCursor] = useState<CursorKind>('default')
  const [found, setFound] = useState<DiscoveryId[]>(readFound)
  const [completeOpen, setCompleteOpen] = useState(false)
  const [accessOpen, setAccessOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [experimentId, setExperimentId] = useState<string | null>(null)
  const [profile, setProfile] = useState<Profile>(() => inferProfile(location.pathname, 'neutral'))
  const [profileSwitch, setProfileSwitch] = useState<ProfileSwitchState>({
    active: false,
    from: 'founder',
    to: 'developer',
  })
  const [transition, setTransition] = useState({
    active: false,
    number: '00',
    label: 'Index',
  })

  const allFound = found.length >= discoveryIds.length
  const nav = profile === 'developer' ? developerNav : founderNav

  useLayoutEffect(() => {
    applyDocumentProfile(profile)
  }, [profile])

  useEffect(() => {
    if (profileSwitch.active) return
    const next = inferProfile(location.pathname, profile)
    setProfile((current) => (current === next ? current : next))
    if (next === 'founder' || next === 'developer') persistProfile(next)
  }, [location.pathname, profile, profileSwitch.active])

  const unlock = useCallback((id: DiscoveryId) => {
    setFound((current) => {
      if (current.includes(id)) return current
      const next = [...current, id]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      if (next.length >= discoveryIds.length) {
        const already = localStorage.getItem(COMPLETE_KEY)
        if (!already) {
          localStorage.setItem(COMPLETE_KEY, '1')
          window.setTimeout(() => setCompleteOpen(true), 500)
        }
      }
      return next
    })
  }, [])

  const goTo = useCallback(
    (href: string, number: string, label: string) => {
      setMenuOpen(false)
      setAccessOpen(false)
      setCommandOpen(false)
      setExperimentId(null)
      if (location.pathname === href) {
        window.scrollTo(0, 0)
        return
      }
      const reduced = prefersReducedMotion()
      setTransition({ active: true, number, label })
      window.setTimeout(() => {
        navigate(href)
        window.scrollTo(0, 0)
      }, reduced ? 0 : 420)
      window.setTimeout(() => {
        setTransition((current) => ({ ...current, active: false }))
      }, reduced ? 80 : 780)
    },
    [location.pathname, navigate],
  )

  const runProfileChange = useCallback(
    (next: ProfileId, forceHome: boolean) => {
      setMenuOpen(false)
      setAccessOpen(false)
      setCommandOpen(false)
      setExperimentId(null)
      const from: ProfileId = profile === 'developer' ? 'developer' : 'founder'
      if (!forceHome && from === next && location.pathname !== '/') {
        return
      }
      const reduced = prefersReducedMotion()
      setProfileSwitch({ active: true, from, to: next })
      const moveAt = reduced ? 0 : 380
      const hideAt = reduced ? 80 : 780
      window.setTimeout(() => {
        setProfile(next)
        persistProfile(next)
        applyDocumentProfile(next)
        const path = location.pathname
        const onHomes = path === '/' || path === '/founder' || path === '/developer'
        if (forceHome || onHomes) {
          navigate(`/${next}`)
        }
        window.scrollTo(0, 0)
      }, moveAt)
      window.setTimeout(() => {
        setProfileSwitch((current) => ({ ...current, active: false }))
      }, hideAt)
    },
    [location.pathname, navigate, profile],
  )

  const switchProfile = useCallback(
    (next: ProfileId) => {
      runProfileChange(next, false)
    },
    [runProfileChange],
  )

  const enterProfile = useCallback(
    (next: ProfileId) => {
      runProfileChange(next, true)
    },
    [runProfileChange],
  )

  const value = useMemo(
    () => ({
      menuOpen,
      setMenuOpen,
      cursor,
      setCursor,
      found,
      unlock,
      allFound,
      completeOpen,
      setCompleteOpen,
      accessOpen,
      setAccessOpen,
      commandOpen,
      setCommandOpen,
      experimentId,
      setExperimentId,
      transition,
      goTo,
      profile,
      nav,
      switchProfile,
      enterProfile,
      profileSwitch,
    }),
    [
      menuOpen,
      cursor,
      found,
      unlock,
      allFound,
      completeOpen,
      accessOpen,
      commandOpen,
      experimentId,
      transition,
      goTo,
      profile,
      nav,
      switchProfile,
      enterProfile,
      profileSwitch,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
