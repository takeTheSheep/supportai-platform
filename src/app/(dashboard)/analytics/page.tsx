import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";
import { analyticsService } from "@/lib/services/analytics/analytics-service";

export default async function AnalyticsPage() {
  const data = await analyticsService.getAnalyticsPageData();

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Analytics</p>
        <h1 className="text-2xl font-semibold text-heading">Support intelligence and performance trends</h1>
        <p className="mt-1 text-sm text-muted">
          Track volume, deflection, escalation pressure, and answer quality across business scenarios.
        </p>
      </div>
      <AnalyticsDashboard data={data} />
    </div>
  );
}

