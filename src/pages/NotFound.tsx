import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'

export default function NotFound() {
  const { goTo } = useApp()

  return (
    <article className="flex min-h-svh flex-col justify-center px-5 md:px-8">
      <p className="eyebrow text-accent">404</p>
      <h1 className="display mt-6 text-5xl md:text-8xl">This layer does not exist.</h1>
      <div className="mt-10">
          <MagneticButton variant="ghost" onClick={() => goTo('/', '00', 'Perspectives')}>
            Return to perspectives →
          </MagneticButton>
      </div>
    </article>
  )
}
