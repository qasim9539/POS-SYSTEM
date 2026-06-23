import { HeroSection } from '@/components/hero/HeroSection'
import { FeaturesSection } from '@/components/features/FeaturesSection'
import { HowItWorksSection } from '@/components/how-it-works/HowItWorksSection'
import { CTASection } from '@/components/cta/CTASection'

export function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </>
  )
}
