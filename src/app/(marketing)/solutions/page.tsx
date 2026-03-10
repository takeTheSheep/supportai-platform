import { Card, CardContent } from "@/components/common/card";
import { SolutionsSimulator } from "@/components/marketing/solutions-simulator";

const solutions = [
  {
    industry: "SaaS Platforms",
    details: "Reduce repetitive queue load and improve onboarding response quality."
  },
  {
    industry: "Construction Services",
    details: "Guide quote, permitting, and scheduling inquiries with structured escalation."
  },
  {
    industry: "Dental Clinics",
    details: "Handle appointment and insurance questions with safe fallback behavior."
  },
  {
    industry: "E-commerce",
    details: "Automate return and shipping support with policy-aware controls."
  },
  {
    industry: "Consulting Firms",
    details: "Route proposal and discovery requests with account-level follow-up."
  }
];

export default function SolutionsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Solutions</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-heading">Scenario-ready support automation</h1>
      <p className="mt-3 max-w-3xl text-sm text-muted sm:text-base">
        SupportAI ships with industry-oriented scenario presets so teams can test realistic flows before production rollout.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {solutions.map((solution) => (
          <Card key={solution.industry} className="interactive-card">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold text-heading">{solution.industry}</h2>
              <p className="mt-2 text-sm text-body">{solution.details}</p>
              <button type="button" className="mt-3 chip">
                Run scenario
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      <SolutionsSimulator />
    </div>
  );
}

