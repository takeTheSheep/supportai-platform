import Link from "next/link";
import { Button } from "@/components/common/button";
import { Card, CardContent } from "@/components/common/card";
import { ProductInteractiveShowcase } from "@/components/marketing/product-interactive-showcase";

const features = [
  {
    title: "AI Assistant",
    text: "Scenario-aware responses with confidence scoring and escalation paths."
  },
  {
    title: "Knowledge Base",
    text: "Draft, publish, archive, and track usage across assistant responses."
  },
  {
    title: "Conversation Review",
    text: "Searchable transcripts, feedback tracking, and internal notes."
  },
  {
    title: "Widget Control",
    text: "Live customization with behavior toggles and embed code delivery."
  },
  {
    title: "Escalation Inbox",
    text: "Priority-aware queue with assignment, SLA urgency, and resolution controls."
  },
  {
    title: "Analytics",
    text: "Deflection, confidence, unanswered topics, and engagement insights."
  }
];

export default function ProductPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Product</p>
        <h1 className="text-4xl font-semibold tracking-tight text-heading">Built for trustworthy AI support operations</h1>
        <p className="max-w-3xl text-sm text-muted sm:text-base">
          SupportAI combines assistant automation, knowledge governance, conversation oversight, and operational analytics in one production-minded platform.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="interactive-card">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold text-heading">{feature.title}</h2>
              <p className="mt-2 text-sm text-body">{feature.text}</p>
              <button type="button" className="mt-3 chip">
                Preview interaction
              </button>
            </CardContent>
          </Card>
        ))}
      </section>

      <ProductInteractiveShowcase />

      <section className="mt-10 rounded-3xl border border-border bg-panel p-8">
        <h2 className="text-2xl font-semibold text-heading">See the full workflow in action</h2>
        <p className="mt-2 text-sm text-muted">Start the interactive demo to test realistic business scenarios.</p>
        <Link href="/demo" className="mt-4 inline-block">
          <Button>Open Demo</Button>
        </Link>
      </section>
    </div>
  );
}

