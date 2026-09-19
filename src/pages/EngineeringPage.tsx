import { ProductDeconstruct } from '@/components/ProductDeconstruct'
import { StackContext } from '@/components/StackContext'
import { SystemInspect } from '@/components/SystemInspect'
import { TradeOffs } from '@/components/TradeOffs'
import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'

export default function Engineering() {
  const { goTo, profile } = useApp()
  const developer = profile === 'developer'

  return (
    <article className="pt-page pb-[var(--space-4xl)]">
      <div className="container">
        <p className="type-meta">Engineering</p>
        <h1 className="type-xl mt-6 display-w">How it works.</h1>
        <p className="type-body mt-8 text-muted">
          A feature is rarely just a feature. It touches interfaces, logic, data, services and the people using it.
        </p>

        <section className="mt-20">
          <ProductDeconstruct />
        </section>

        <section className="mt-24">
          <h2 className="type-l display-w">A real product creates real engineering problems.</h2>
          <p className="type-body mt-6 text-muted">
            DriverSpot is the system that can be inspected. Select a component to see what it connects and what role it
            plays.
          </p>
          <div className="mt-14">
            <SystemInspect />
          </div>
        </section>

        <section className="mt-24">
          <h2 className="type-l display-w">Good engineering is mostly trade-offs.</h2>
          <p className="type-body mt-6 text-muted">
            Decisions from a live marketplace — not a preference for one side of a diagram.
          </p>
          <div className="mt-14">
            <TradeOffs />
          </div>
        </section>

        <section className="mt-24">
          <h2 className="type-l display-w">The tools I use to build.</h2>
          <p className="type-body mt-6 text-muted">Where each piece sits. Not a logo wall.</p>
          <div className="mt-14">
            <StackContext />
          </div>
        </section>

        {developer && (
          <div className="mt-16">
            <MagneticButton variant="ghost" cursor="case" onClick={() => goTo('/work/driverspot', '02', 'DriverSpot')}>
              Inspect DriverSpot →
            </MagneticButton>
          </div>
        )}
      </div>
    </article>
  )
}
