"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { SegmentedTabs } from "@/components/common/tabs";
import { Badge } from "@/components/common/badge";

const views = [
  { value: "assistant", label: "Assistant" },
  { value: "knowledge", label: "Knowledge" },
  { value: "operations", label: "Operations" },
  { value: "widget", label: "Widget" }
] as const;

type View = (typeof views)[number]["value"];

const viewContent: Record<
  View,
  {
    title: string;
    description: string;
    bullets: string[];
    signal: string;
  }
> = {
  assistant: {
    title: "Scenario-aware AI response layer",
    description:
      "Assistant answers blend knowledge context, confidence scoring, and fallback logic for safe support automation.",
    bullets: [
      "Prompt guardrails with escalation branches",
      "Suggested follow-up prompts after each answer",
      "Confidence-aware fallback to human support"
    ],
    signal: "Response quality 82%"
  },
  knowledge: {
    title: "Knowledge governance workspace",
    description:
      "Teams can iterate policy-safe content with status controls, ownership tags, and usage coverage monitoring.",
    bullets: [
      "Draft, publish, and archive lifecycle",
      "Category and source tagging for reliability",
      "Coverage feedback loop for unanswered topics"
    ],
    signal: "Coverage 91%"
  },
  operations: {
    title: "Operations and escalation cockpit",
    description:
      "Support leads can monitor queue health, triage low-confidence conversations, and enforce SLA response behavior.",
    bullets: [
      "Urgency flags and assignment controls",
      "Conversation transcript and internal notes",
      "Escalation age and ownership tracking"
    ],
    signal: "First response 41s"
  },
  widget: {
    title: "Live website widget configurator",
    description:
      "Customize greeting, chip behavior, launcher position, and escalation visibility with immediate preview feedback.",
    bullets: [
      "Brand-safe theme and radius controls",
      "Prompt chip tuning for entry points",
      "Embed code generation with launch test"
    ],
    signal: "Engagement 48%"
  }
};

const adoptionData = [
  { week: "W1", automated: 44, reviewed: 29 },
  { week: "W2", automated: 52, reviewed: 33 },
  { week: "W3", automated: 61, reviewed: 35 },
  { week: "W4", automated: 67, reviewed: 38 },
  { week: "W5", automated: 72, reviewed: 40 },
  { week: "W6", automated: 79, reviewed: 43 }
];

const tooltipStyle = {
  background: "#FFFFFF",
  border: "1px solid #DCE4F0",
  borderRadius: "12px",
  boxShadow: "0 10px 26px rgba(24,32,51,0.12)"
};

export const ProductInteractiveShowcase = () => {
  const [view, setView] = useState<View>("assistant");
  const active = viewContent[view];

  const trendDelta = useMemo(() => {
    const first = adoptionData[0].automated;
    const last = adoptionData[adoptionData.length - 1].automated;
    return `${Math.round(((last - first) / first) * 100)}%`;
  }, []);

  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="surface-card p-5">
        <SegmentedTabs
          value={view}
          options={views.map((item) => ({
            value: item.value,
            label: item.label
          }))}
          onChange={(value) => setView(value as View)}
        />

        <div key={view} className="mt-4 space-y-3 animate-fade-up">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-heading">{active.title}</h2>
            <Badge tone="blue">{active.signal}</Badge>
          </div>
          <p className="text-sm text-muted">{active.description}</p>
          <ul className="space-y-2">
            {active.bullets.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-border bg-surface px-3 py-2 text-sm text-body"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="surface-card p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-heading">
              Automation adoption trend
            </p>
            <p className="text-xs text-muted">
              Weekly growth in AI-assisted resolution volume
            </p>
          </div>
          <Badge tone="teal">+{trendDelta}</Badge>
        </div>
        <div className="h-[260px] rounded-2xl border border-border bg-surface p-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={adoptionData}>
              <defs>
                <linearGradient id="automatedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5B7CFF" stopOpacity={0.42} />
                  <stop offset="100%" stopColor="#5B7CFF" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#DCE4F0" />
              <XAxis dataKey="week" stroke="#7D8AA3" fontSize={12} />
              <YAxis stroke="#7D8AA3" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="automated"
                stroke="#5B7CFF"
                strokeWidth={2.5}
                fill="url(#automatedGradient)"
                animationDuration={500}
              />
              <Area
                type="monotone"
                dataKey="reviewed"
                stroke="#4FD1C5"
                strokeWidth={2}
                fillOpacity={0}
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
