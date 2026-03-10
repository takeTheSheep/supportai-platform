"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";
import { SegmentedTabs } from "@/components/common/tabs";
import { Badge } from "@/components/common/badge";

interface SecurityControlItem {
  id: string;
  title: string;
  summary: string;
  impact: number;
}

const controls: SecurityControlItem[] = [
  {
    id: "schema-validation",
    title: "Server-side validation and typed mutation schemas",
    summary: "Every incoming action is validated before processing and rejected when payload shape is unsafe.",
    impact: 92
  },
  {
    id: "authorization",
    title: "Role-based authorization and workspace scoping",
    summary: "Routes and mutations enforce role checks and workspace boundaries to prevent horizontal data access.",
    impact: 90
  },
  {
    id: "guardrails",
    title: "Prompt guardrails and low-confidence escalation routing",
    summary: "Unsafe or uncertain assistant responses are downgraded and routed into human escalation workflows.",
    impact: 87
  },
  {
    id: "rate-limit",
    title: "Rate limiting architecture for auth and chat submissions",
    summary: "Abuse thresholds are applied at request edge and sensitive endpoints to contain automated attack patterns.",
    impact: 84
  },
  {
    id: "audit",
    title: "Audit logging boundaries for sensitive configuration changes",
    summary: "Configuration updates are logged with actor context to improve forensic review and compliance visibility.",
    impact: 82
  },
  {
    id: "sanitization",
    title: "Safe rendering with sanitized text input pathways",
    summary: "User content is normalized and sanitized before render so script injection vectors are blocked by default.",
    impact: 86
  }
];

const profiles = [
  { value: "balanced", label: "Balanced" },
  { value: "strict", label: "Strict" },
  { value: "enterprise", label: "Enterprise" }
] as const;

type Profile = (typeof profiles)[number]["value"];

const profileChartData: Record<
  Profile,
  Array<{ metric: string; score: number }>
> = {
  balanced: [
    { metric: "Prevention", score: 76 },
    { metric: "Detection", score: 69 },
    { metric: "Containment", score: 71 },
    { metric: "Auditability", score: 73 }
  ],
  strict: [
    { metric: "Prevention", score: 84 },
    { metric: "Detection", score: 79 },
    { metric: "Containment", score: 81 },
    { metric: "Auditability", score: 85 }
  ],
  enterprise: [
    { metric: "Prevention", score: 91 },
    { metric: "Detection", score: 88 },
    { metric: "Containment", score: 90 },
    { metric: "Auditability", score: 94 }
  ]
};

const tooltipStyle = {
  background: "#FFFFFF",
  border: "1px solid #DCE4F0",
  borderRadius: "12px",
  boxShadow: "0 10px 26px rgba(24,32,51,0.12)"
};

export const SecurityInteractivePanel = () => {
  const [profile, setProfile] = useState<Profile>("balanced");
  const [load, setLoad] = useState(45);
  const [openControlId, setOpenControlId] = useState(controls[0].id);
  const onLoadInput = (value: string) => {
    const next = Number(value);
    if (!Number.isNaN(next)) {
      setLoad(next);
    }
  };

  const chartData = profileChartData[profile];

  const computedRisk = useMemo(() => {
    const base = profile === "enterprise" ? 24 : profile === "strict" ? 36 : 49;
    const loadPenalty = Math.round(load * 0.28);
    return Math.min(96, base + loadPenalty);
  }, [load, profile]);

  const riskTone =
    computedRisk < 45 ? "teal" : computedRisk < 65 ? "amber" : "rose";

  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="surface-card space-y-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Security Control Lab
            </p>
            <h2 className="mt-1 text-lg font-semibold text-heading">
              Tune controls and inspect posture impact
            </h2>
          </div>
          <Badge tone={riskTone}>
            {riskTone === "teal"
              ? "Low risk"
              : riskTone === "amber"
              ? "Moderate risk"
              : "Elevated risk"}
          </Badge>
        </div>

        <SegmentedTabs
          value={profile}
          options={profiles.map((item) => ({
            value: item.value,
            label: item.label
          }))}
          onChange={(value) => setProfile(value as Profile)}
        />

        <div className="rounded-2xl border border-border bg-surface p-4">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Incoming threat load</span>
            <span>{load}%</span>
          </div>
          <input
            className="mt-2 h-2 w-full cursor-pointer accent-primary"
            type="range"
            min={10}
            max={100}
            value={load}
            onInput={(event) =>
              onLoadInput((event.target as HTMLInputElement).value)
            }
            onChange={(event) => onLoadInput(event.target.value)}
          />
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-xl border border-border bg-panel p-2.5">
              <p className="text-muted">Risk score</p>
              <p className="mt-1 text-lg font-semibold text-heading">
                {computedRisk}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-panel p-2.5">
              <p className="text-muted">Blocked attempts</p>
              <p className="mt-1 text-lg font-semibold text-heading">
                {Math.round(computedRisk * 1.8)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-panel p-2.5">
              <p className="text-muted">Escalations</p>
              <p className="mt-1 text-lg font-semibold text-heading">
                {Math.round((100 - computedRisk) * 0.5)}
              </p>
            </div>
          </div>
        </div>

        <div className="h-[230px] rounded-2xl border border-border bg-panel p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#DCE4F0" />
              <XAxis dataKey="metric" stroke="#7D8AA3" fontSize={12} />
              <YAxis stroke="#7D8AA3" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar
                dataKey="score"
                fill="#5B7CFF"
                radius={[8, 8, 0, 0]}
                animationDuration={450}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-3">
        {controls.map((control) => {
          const active = control.id === openControlId;
          return (
            <button
              key={control.id}
              type="button"
              onClick={() => setOpenControlId(control.id)}
              className={`w-full rounded-2xl border bg-panel p-4 text-left motion-surface ${
                active
                  ? "border-primary/40 shadow-soft"
                  : "border-border hover:-translate-y-px hover:border-primary/25"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-heading">
                  {control.title}
                </p>
                <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] font-semibold text-muted">
                  {control.impact}
                </span>
              </div>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ${
                  active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="mt-3 text-sm text-muted">{control.summary}</p>
                  <p className="mt-2 text-xs text-body">
                    Status:{" "}
                    <span className="font-semibold">
                      {control.impact > 88
                        ? "hardened"
                        : control.impact > 83
                        ? "stable"
                        : "monitoring"}
                    </span>
                  </p>
                </div>
              </div>
            </button>
          );
        })}

        <div className="rounded-2xl border border-border bg-surface p-4 text-xs text-muted">
          <p className="inline-flex items-center gap-1">
            {riskTone === "teal" ? (
              <ShieldCheck size={13} className="text-teal" />
            ) : riskTone === "amber" ? (
              <ShieldQuestion size={13} className="text-amber" />
            ) : (
              <ShieldAlert size={13} className="text-rose" />
            )}
            Future roadmap includes anomaly detection, provider-side moderation,
            retention policy controls, and encrypted sensitive fields.
          </p>
        </div>
      </div>
    </section>
  );
};
