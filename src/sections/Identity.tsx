import { Portrait } from '@/components/Portrait'
import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'
import { site } from '@/data/site'

export function Identity() {
  const { goTo } = useApp()

  return (
    <section className="px-5 py-20 md:px-10 md:py-28" aria-label="Identity">
      <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-20">
        <Portrait variant="file" />
        <div>
          <p className="eyebrow mb-6">
            <span className="mr-4 text-accent">00</span>
            File
          </p>
          <h2 className="display-title text-5xl md:text-7xl">{site.name}</h2>
          <p className="mt-6 text-sm tracking-[0.2em] text-muted uppercase">{site.title}</p>
          <p className="mt-8 max-w-md text-muted">
            The person behind the products — building from Hyderabad, across product, engineering and the
            system underneath.
          </p>
          <div className="mt-10">
            <MagneticButton variant="ghost" cursor="view" onClick={() => goTo('/about', '01', 'About')}>
              Open the file →
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
