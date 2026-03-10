"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/common/badge";
import { SegmentedTabs } from "@/components/common/tabs";

const numberFormatter = new Intl.NumberFormat("en-US");

const billingModes = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual" }
] as const;

type BillingMode = (typeof billingModes)[number]["value"];

const planBase = {
  starter: 99,
  pro: 299,
  enterprise: 799
};

const recommendationRules = [
  { maxConversations: 800, plan: "starter", label: "Starter" },
  { maxConversations: 2800, plan: "pro", label: "Pro" },
  { maxConversations: Number.POSITIVE_INFINITY, plan: "enterprise", label: "Enterprise" }
] as const;

const tooltipStyle = {
  background: "#FFFFFF",
  border: "1px solid #DCE4F0",
  borderRadius: "12px",
  boxShadow: "0 10px 26px rgba(24,32,51,0.12)"
};

export const PricingInteractiveLab = () => {
  const [billing, setBilling] = useState<BillingMode>("monthly");
  const [volume, setVolume] = useState(1400);
  const onVolumeInput = (value: string) => {
    const next = Number(value);
    if (!Number.isNaN(next)) {
      setVolume(next);
    }
  };

  const discountMultiplier = billing === "annual" ? 0.84 : 1;

  const recommendation = useMemo(
    () =>
      recommendationRules.find((rule) => volume <= rule.maxConversations) ??
      recommendationRules[1],
    [volume]
  );

  const chartData = [
    {
      name: "Starter",
      monthly: Math.round(planBase.starter * discountMultiplier),
      savings: 16
    },
    {
      name: "Pro",
      monthly: Math.round(planBase.pro * discountMultiplier),
      savings: 22
    },
    {
      name: "Enterprise",
      monthly: Math.round(planBase.enterprise * discountMultiplier),
      savings: 29
    }
  ];

  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
      <div className="surface-card p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Pricing lab
            </p>
            <h2 className="mt-1 text-lg font-semibold text-heading">
              Estimate plan fit and savings
            </h2>
          </div>
          <Badge tone="teal">
            Suggested: {recommendation.label}
          </Badge>
        </div>

        <SegmentedTabs
          value={billing}
          options={billingModes.map((mode) => ({
            value: mode.value,
            label: mode.label
          }))}
          onChange={(value) => setBilling(value as BillingMode)}
        />

        <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Expected monthly conversations</span>
            <span>{numberFormatter.format(volume)}</span>
          </div>
          <input
            type="range"
            min={200}
            max={6000}
            step={100}
            value={volume}
            onInput={(event) =>
              onVolumeInput((event.target as HTMLInputElement).value)
            }
            onChange={(event) => onVolumeInput(event.target.value)}
            className="mt-2 h-2 w-full cursor-ew-resize accent-primary"
          />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {chartData.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-3 ${
                  recommendation.label === plan.name
                    ? "border-primary/40 bg-primarySoft"
                    : "border-border bg-panel"
                }`}
              >
                <p className="text-xs text-muted">{plan.name}</p>
                <p className="mt-1 text-lg font-semibold text-heading">
                  ${plan.monthly}
                </p>
                <p className="text-[11px] text-muted">
                  up to {plan.savings}% ops savings
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="surface-card p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-heading">
            Plan value comparison
          </p>
          <Badge tone="blue">
            {billing === "annual" ? "Annual discount active" : "Base pricing"}
          </Badge>
        </div>

        <div className="h-[290px] rounded-2xl border border-border bg-surface p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#7D8AA3" fontSize={12} />
              <YAxis stroke="#7D8AA3" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="monthly" fill="#5B7CFF" radius={[8, 8, 0, 0]} />
              <Bar dataKey="savings" fill="#4FD1C5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
