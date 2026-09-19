import type { ProfileId } from '@/context/AppContext'

export type HomeLens = {
  hover: ProfileId | null
  selected: ProfileId | null
  active: ProfileId | null
  phase: number
  reduced: boolean
}
