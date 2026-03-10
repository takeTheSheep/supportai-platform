import Link from "next/link";
import { Button } from "@/components/common/button";
import { Card, CardContent, CardHeader } from "@/components/common/card";
import { PricingInteractiveLab } from "@/components/marketing/pricing-interactive-lab";

const plans = [
  {
    name: "Starter",
    price: "$99",
    note: "per workspace / month",
    items: ["1 workspace", "Basic analytics", "Weekday support"]
  },
  {
    name: "Pro",
    price: "$299",
    note: "per workspace / month",
    items: ["Advanced analytics", "Weekend support", "Escalation queue"]
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "contact sales",
    items: ["SSO and controls", "Custom integrations", "Priority onboarding"]
  }
];

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Pricing</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-heading">Flexible plans for growing support teams</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="interactive-card">
            <CardHeader>
              <h2 className="text-lg font-semibold text-heading">{plan.name}</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-3xl font-semibold text-heading">{plan.price}</p>
              <p className="text-xs text-muted">{plan.note}</p>
              <ul className="space-y-1 text-sm text-body">
                {plan.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
              <button type="button" className="chip">
                See included workflows
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      <PricingInteractiveLab />

      <Link href="/demo" className="mt-6 inline-block">
        <Button>Try Demo</Button>
      </Link>
    </div>
  );
}

