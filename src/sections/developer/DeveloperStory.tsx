import { motion } from 'framer-motion'
import { EditorialImage } from '@/components/EditorialImage'
import { EngineeringToolkit } from '@/components/EngineeringToolkit'
import { LabFragments, LabPath } from '@/components/LabFragments'
import { MagneticButton } from '@/components/MagneticButton'
import { MindsetTrace, ProblemSolverTrace } from '@/components/ProblemSolverTrace'
import { ProductDeconstruct } from '@/components/ProductDeconstruct'
import { ProjectIndex } from '@/components/ProjectIndex'
import { SystemInspect } from '@/components/SystemInspect'
import { TradeOffs } from '@/components/TradeOffs'
import { useApp } from '@/context/AppContext'
import { experiments } from '@/data/experiments'
import { visuals } from '@/data/visuals'
import { traceEase } from '@/lib/trace'
import { useReducedMotion } from '@/hooks/useMediaQuery'

export function DeveloperStory() {
  const { goTo } = useApp()
  const reduced = useReducedMotion()

  return (
    <>
      <section className="band">
        <div className="container">
          <p className="type-meta">Projects</p>
          <h2 className="type-l mt-5">Things I've built.</h2>
          <p className="type-body mt-6 text-muted">
            Real products, indexed without invented case studies. DriverSpot is the deepest file.
          </p>
          <div className="mt-14">
            <ProjectIndex />
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <p className="type-meta">Product</p>
          <h2 className="type-l mt-5 display-w">A real product creates real engineering problems.</h2>
          <div className="type-long mt-8 space-y-4 text-muted">
            <p>DriverSpot is a chauffeur marketplace that has to stay coherent after it leaves a laptop.</p>
            <p>
              Owner demand, driver supply, matching, scheduling and safety are one system. If the matching logic is
              wrong, the interface cannot save it.
            </p>
          </div>
          <p className="type-meta mt-8">REACT NATIVE · NODE.JS · MONGODB</p>
          <EditorialImage
            src={visuals.driverspotHandover.src}
            alt={visuals.driverspotHandover.alt}
            width={visuals.driverspotHandover.width}
            height={visuals.driverspotHandover.height}
            className="mt-12 aspect-[16/10] w-full"
            imgClassName="object-[center_42%]"
          />
          <div className="mt-16">
            <SystemInspect />
          </div>
          <div className="mt-10">
            <MagneticButton cursor="case" onClick={() => goTo('/work/driverspot', '02', 'DriverSpot')}>
              Inspect DriverSpot →
            </MagneticButton>
          </div>
        </div>
      </section>

      <EngineeringToolkit />

      <section className="band">
        <div className="container">
          <p className="type-meta">Architecture</p>
          <h2 className="type-l mt-5">How it works.</h2>
          <p className="type-body mt-6 text-muted">
            A feature is rarely just a feature. It touches interfaces, logic, data, services and the people using it.
          </p>
          <div className="mt-16">
            <ProductDeconstruct />
          </div>
          <div className="mt-12">
            <MagneticButton variant="ghost" cursor="trace" onClick={() => goTo('/engineering', '03', 'Engineering')}>
              Open engineering →
            </MagneticButton>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <p className="type-meta">Engineering</p>
          <h2 className="type-l mt-5 display-w">Good engineering is mostly trade-offs.</h2>
          <p className="type-body mt-6 text-muted">
            The point is not to declare a winner. The point is to decide, then live with the decision.
          </p>
          <div className="mt-14">
            <TradeOffs />
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <p className="type-meta">Lab</p>
          <h2 className="type-l mt-5">Things I'm still figuring out.</h2>
          <div className="type-body mt-8 space-y-4 text-muted">
            <p>Not everything I build needs to become a product.</p>
            <p>Some ideas exist simply to understand what is possible.</p>
          </div>
          <LabPath />
          <EditorialImage
            src={visuals.labPrototype.src}
            alt={visuals.labPrototype.alt}
            width={visuals.labPrototype.width}
            height={visuals.labPrototype.height}
            className="mt-12 aspect-[16/10] max-w-xl"
            imgClassName="object-center"
          />
          <div className="mt-14">
            <LabFragments items={experiments.slice(0, 4)} />
          </div>
          <div className="mt-10">
            <MagneticButton variant="ghost" cursor="inspect" onClick={() => goTo('/lab', '04', 'Lab')}>
              More experiments →
            </MagneticButton>
          </div>
        </div>
      </section>

      <section className="band pb-[var(--space-4xl)]">
        <div className="container">
          <h2 className="type-l display-w">I don't code to make things complicated.</h2>
          <p className="type-m mt-6 text-developer">I code to make ideas work.</p>
          <div className="type-long mt-10 space-y-4 text-muted">
            <p>The interesting part isn't the syntax.</p>
            <p>
              It's deciding what the system should do, how the pieces should interact, and what should happen when
              things go wrong.
            </p>
          </div>
          <MindsetTrace />
          <p className="type-body mt-10 text-muted">
            Matching is the example I keep returning to. Two kinds of trust. If that logic is wrong, a polished screen
            does not repair it.
          </p>
          <div className="mt-24">
            <ProblemSolverTrace />
          </div>
          <motion.div
            className="mt-20"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: reduced ? 0 : 0.75, ease: traceEase }}
          >
            <h2 className="type-xl">Build with purpose.</h2>
            <div className="type-body mt-8 space-y-1 text-muted">
              <p>Understand the problem.</p>
              <p>Design the system.</p>
              <p>Build the solution.</p>
            </div>
            <div className="mt-12 space-y-2">
              <p className="type-h">I start with the problem.</p>
              <p className="type-h">I understand the system.</p>
              <p className="type-h text-developer">I build the solution.</p>
            </div>
          </motion.div>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <MagneticButton cursor="open" onClick={() => goTo('/contact', '06', 'Contact')}>
              Start a conversation →
            </MagneticButton>
            <MagneticButton variant="ghost" cursor="view" onClick={() => goTo('/about', '05', 'About')}>
              About
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}
