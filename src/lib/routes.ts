import { pageMeta } from '@/data/site'

export function metaForPath(pathname: string) {
  if (pathname.startsWith('/notes/')) return pageMeta['/notes']
  return pageMeta[pathname] ?? { number: '00', label: 'Index' }
}
