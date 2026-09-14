import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '@/context/AppContext'
import type { CursorKind } from '@/context/AppContext'
import { discoveryIds, type DiscoveryId } from '@/data/discoveries'

const STORAGE_KEY = 'sunanth-discoveries-v2'
const COMPLETE_KEY = 'sunanth-system-complete-v2'

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

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cursor, setCursor] = useState<CursorKind>('default')
  const [found, setFound] = useState<DiscoveryId[]>(readFound)
  const [completeOpen, setCompleteOpen] = useState(false)
  const [accessOpen, setAccessOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [experimentId, setExperimentId] = useState<string | null>(null)
  const [transition, setTransition] = useState({
    active: false,
    number: '00',
    label: 'Index',
  })

  const allFound = found.length >= discoveryIds.length

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
      setTransition({ active: true, number, label })
      window.setTimeout(() => {
        navigate(href)
        window.scrollTo(0, 0)
      }, 420)
      window.setTimeout(() => {
        setTransition((current) => ({ ...current, active: false }))
      }, 780)
    },
    [navigate],
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
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
