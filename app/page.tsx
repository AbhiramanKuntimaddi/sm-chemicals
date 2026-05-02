import HeroSection from "../components/homepage-components/hero-section"
import { IndustriesSection } from "@/components/homepage-components/industries-section"
import { FeaturesSection } from "@/components/homepage-components/features-section"
import { CtaSection } from "@/components/homepage-components/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IndustriesSection />
      <FeaturesSection />
      <CtaSection />
    </>
  )
}
