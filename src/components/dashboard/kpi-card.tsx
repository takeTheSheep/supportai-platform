"use client";

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { useAnimatedNumber } from "@/hooks/use-animated-number";
import { DashboardMetric } from "@/types/domain";

const extractNumeric = (value: string) => {
  const number = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(number) ? number : 0;
};

export const KpiCard = ({ metric }: { metric: DashboardMetric }) => {
  const animated = useAnimatedNumber(extractNumeric(metric.value));
  const suffix = metric.value.replace(/[0-9.]/g, "");

  return (
    <article className="interactive-card p-4">
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="text-xs uppercase tracking-wide text-muted">{metric.label}</p>
        <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] text-muted">Live</span>
      </div>
      <p className="text-2xl font-semibold text-heading">
        {animated}
        {suffix}
      </p>
      <div className="mt-2 flex items-center gap-1 text-xs">
        {metric.trendDirection === "UP" ? (
          <ArrowUpRight className="text-teal" size={13} />
        ) : metric.trendDirection === "DOWN" ? (
          <ArrowDownRight className="text-amber" size={13} />
        ) : (
          <Minus className="text-muted" size={13} />
        )}
        <span className="font-semibold text-heading">{metric.trend}</span>
        <span className="text-muted">{metric.comparison}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-surface">
        <div
          className="h-1.5 rounded-full bg-primary"
          style={{ width: `${Math.min(100, Math.max(18, extractNumeric(metric.value) / 5))}%` }}
        />
      </div>
    </article>
  );
};

