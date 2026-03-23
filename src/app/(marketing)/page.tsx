import { ReferenceLandingChatPreviewSection } from "@/components/marketing/reference-landing-chat-preview-section";
import { ReferenceLandingCtaSection } from "@/components/marketing/reference-landing-cta-section";
import { ReferenceLandingFeaturesSection } from "@/components/marketing/reference-landing-features-section";
import { ReferenceLandingHero } from "@/components/marketing/reference-landing-hero";
import { ReferenceLandingTrustMetricsSection } from "@/components/marketing/reference-landing-trust-metrics-section";
import { ReferenceLandingWorkflowSection } from "@/components/marketing/reference-landing-workflow-section";

export default function LandingPage() {
  return (
    <>
      <ReferenceLandingHero />
      <ReferenceLandingTrustMetricsSection />
      <ReferenceLandingChatPreviewSection />
      <ReferenceLandingFeaturesSection />
      <ReferenceLandingWorkflowSection />
      <ReferenceLandingCtaSection />
    </>
  );
}

