import { DsShell } from '@/components/driverspot/DsUi'
import { DriverSpotHero } from '@/sections/driverspot/Hero'
import { OpportunitySection, ProblemSection } from '@/sections/driverspot/Opportunity'
import { ProductSection } from '@/sections/driverspot/Product'
import { BusinessSection, MarketSection, TractionSection } from '@/sections/driverspot/Proof'
import { EcosystemSection, GtmSection } from '@/sections/driverspot/Growth'
import { ExpansionSection, TeamSection } from '@/sections/driverspot/Vision'
import { DriverSpotFooter, FinalCtaSection } from '@/sections/driverspot/Close'

export default function DriverSpot() {
  return (
    <DsShell>
      <DriverSpotHero />
      <OpportunitySection />
      <ProblemSection />
      <ProductSection />
      <TractionSection />
      <MarketSection />
      <BusinessSection />
      <GtmSection />
      <EcosystemSection />
      <TeamSection />
      <ExpansionSection />
      <FinalCtaSection />
      <DriverSpotFooter />
    </DsShell>
  )
}
