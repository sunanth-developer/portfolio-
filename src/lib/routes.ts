import { pageMeta } from '@/data/site'
import type { Profile } from '@/context/AppContext'

export function metaForPath(pathname: string) {
  if (pathname.startsWith('/notes/')) return pageMeta['/notes']
  if (pathname === '/work/driverspot') return { number: '02', label: 'DriverSpot' }
  if (pathname.startsWith('/work/')) return pageMeta['/work']
  return pageMeta[pathname] ?? { number: '00', label: 'Index' }
}

export function homePath(profile: Profile) {
  if (profile === 'developer') return '/developer'
  if (profile === 'founder') return '/founder'
  return '/'
}
