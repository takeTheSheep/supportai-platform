import { DashboardMetric } from "@/types/domain";
import { KpiCard } from "@/components/dashboard/kpi-card";

export const DashboardKpiGrid = ({ metrics }: { metrics: DashboardMetric[] }) => {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => (
        <KpiCard key={metric.label} metric={metric} />
      ))}
    </section>
  );
};

