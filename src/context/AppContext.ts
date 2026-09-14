import { createContext, useContext } from 'react'
import type { DiscoveryId } from '@/data/discoveries'

export type CursorKind = 'default' | 'view' | 'explore' | 'open' | 'close'

export type AppContextValue = {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  cursor: CursorKind
  setCursor: (cursor: CursorKind) => void
  overlayLocked: boolean
  setOverlayLocked: (locked: boolean) => void
  found: DiscoveryId[]
  unlock: (id: DiscoveryId) => void
  allFound: boolean
  completeOpen: boolean
  setCompleteOpen: (open: boolean) => void
  accessOpen: boolean
  setAccessOpen: (open: boolean) => void
  commandOpen: boolean
  setCommandOpen: (open: boolean) => void
  hiddenProjectVisible: boolean
  revealHiddenProject: () => void
  experimentId: string | null
  setExperimentId: (id: string | null) => void
  transition: { active: boolean; number: string; label: string }
  goTo: (href: string, number: string, label: string) => void
}

export const AppContext = createContext<AppContextValue | null>(null)

export function useApp() {
  const value = useContext(AppContext)
  if (!value) throw new Error('useApp must be used within AppProvider')
  return value
}
