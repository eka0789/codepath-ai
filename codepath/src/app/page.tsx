import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero";
import { ProductShowcase } from "@/components/landing/product-showcase";
import { ProblemSolutionSection } from "@/components/landing/problem-solution";
import { FeaturesSection } from "@/components/landing/features";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { PersonasSection } from "@/components/landing/personas";
import { PricingSection } from "@/components/landing/pricing";
import { FAQSection } from "@/components/landing/faq";
import { CTASection } from "@/components/landing/cta";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/30 selection:text-white">
      {/* Sticky Global Navigation */}
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Realistic Product Showcase & DNA Radar Simulation */}
        <ProductShowcase />

        {/* 3. Problem vs Solution Comparison */}
        <ProblemSolutionSection />

        {/* 4. Core Features (Benefit-Oriented) */}
        <FeaturesSection />

        {/* 5. How It Works (4-step progressive timeline) */}
        <HowItWorksSection />

        {/* 6. Tailored Developer Personas */}
        <PersonasSection />

        {/* 7. Transparent Pricing Tiers */}
        <PricingSection />

        {/* 8. Accessible FAQ Accordion */}
        <FAQSection />

        {/* 9. High-Conversion Final CTA */}
        <CTASection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
