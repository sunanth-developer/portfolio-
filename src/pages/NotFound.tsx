import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'

export default function NotFound() {
  const { goTo } = useApp()

  return (
    <article className="flex min-h-svh flex-col justify-center">
      <div className="container">
        <p className="type-meta">404</p>
        <h1 className="type-xl mt-6">This layer does not exist.</h1>
        <div className="mt-10">
          <MagneticButton variant="ghost" onClick={() => goTo('/', '00', 'Perspectives')}>
            Return to perspectives →
          </MagneticButton>
        </div>
      </div>
    </article>
  )
}
