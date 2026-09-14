import { pageMeta } from '@/data/site'

export function metaForPath(pathname: string) {
  if (pathname.startsWith('/notes/')) return pageMeta['/notes']
  if (pathname.startsWith('/work/')) return pageMeta['/work']
  return pageMeta[pathname] ?? { number: '00', label: 'Index' }
}
