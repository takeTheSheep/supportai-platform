import { AssistantPreviewSection } from "@/components/marketing/assistant-preview-section";
import { CapabilitiesGridSection } from "@/components/marketing/capabilities-grid-section";
import { DashboardPreviewTabsSection } from "@/components/marketing/dashboard-preview-tabs-section";
import { FinalCTASection } from "@/components/marketing/final-cta-section";
import { GuardrailsStrip } from "@/components/marketing/guardrails-strip";
import { HeroSection } from "@/components/marketing/hero-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { TrustOutcomesSection } from "@/components/marketing/trust-outcomes-section";
import { WorkflowSection } from "@/components/marketing/workflow-section";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <TrustOutcomesSection />
      <AssistantPreviewSection />
      <CapabilitiesGridSection />
      <WorkflowSection />
      <GuardrailsStrip />
      <DashboardPreviewTabsSection />
      <TestimonialsSection />
      <FinalCTASection />
    </>
  );
}

