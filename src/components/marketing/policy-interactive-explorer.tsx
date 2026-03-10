"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/common/badge";

type PolicyMode = "privacy" | "terms";

interface PolicySection {
  id: string;
  title: string;
  summary: string;
  detail: string;
}

const policySections: Record<PolicyMode, PolicySection[]> = {
  privacy: [
    {
      id: "data-boundary",
      title: "Workspace-scoped data boundaries",
      summary: "Customer conversations are modeled with tenant-aware access boundaries.",
      detail:
        "Records are partitioned by workspace context, with role-aware access checks for each sensitive route."
    },
    {
      id: "audit-trace",
      title: "Audit traceability",
      summary: "Operational changes can be attached to actor and timestamp context.",
      detail:
        "Audit artifacts should support incident reviews, retention policy checks, and security investigations."
    },
    {
      id: "retention-roadmap",
      title: "Retention and deletion controls",
      summary: "Retention workflows should be configurable before production launch.",
      detail:
        "Lifecycle controls should define storage windows, legal holds, deletion timing, and export handling."
    },
    {
      id: "encryption",
      title: "Encryption posture",
      summary: "Sensitive field protections are part of deployment hardening.",
      detail:
        "Production rollout should enforce encryption at rest, transport security, and key-management policy reviews."
    }
  ],
  terms: [
    {
      id: "demo-scope",
      title: "Demo-only scope",
      summary: "This repository is a portfolio demonstration, not a live regulated service.",
      detail:
        "Features and workflows are illustrative of production architecture patterns, not contractual commitments."
    },
    {
      id: "synthetic-data",
      title: "Synthetic data policy",
      summary: "Included data is synthetic and intended for demonstration use only.",
      detail:
        "No real customer personal data should be stored or processed in this sample environment."
    },
    {
      id: "deployment-review",
      title: "Pre-production obligations",
      summary: "Legal and compliance review are required before live deployment.",
      detail:
        "Real-world launch should include security testing, policy validation, and applicable regulatory controls."
    },
    {
      id: "liability",
      title: "Operational responsibility",
      summary: "Deployment responsibility belongs to the implementing organization.",
      detail:
        "Teams should define ownership for incident response, escalation management, and policy enforcement."
    }
  ]
};

const readinessChecksByMode: Record<
  PolicyMode,
  Array<{ id: string; label: string }>
> = {
  privacy: [
    { id: "retention", label: "Retention policy defined" },
    { id: "encryption", label: "Sensitive field encryption validated" },
    { id: "access", label: "Role audit completed" },
    { id: "dsr", label: "Data subject request process documented" }
  ],
  terms: [
    { id: "legal", label: "Legal terms reviewed" },
    { id: "compliance", label: "Compliance obligations mapped" },
    { id: "security", label: "Security hardening completed" },
    { id: "ownership", label: "Operational owners assigned" }
  ]
};

export const PolicyInteractiveExplorer = ({
  mode
}: {
  mode: PolicyMode;
}) => {
  const [openId, setOpenId] = useState(policySections[mode][0].id);
  const [checks, setChecks] = useState<Record<string, boolean>>(
    Object.fromEntries(readinessChecksByMode[mode].map((item) => [item.id, false]))
  );

  const readiness = useMemo(() => {
    const total = Object.keys(checks).length;
    const completed = Object.values(checks).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  }, [checks]);

  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
      <div className="surface-card p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-heading">
            {mode === "privacy" ? "Privacy controls explorer" : "Terms readiness explorer"}
          </h2>
          <Badge tone={readiness > 70 ? "teal" : readiness > 35 ? "amber" : "rose"}>
            {readiness}% ready
          </Badge>
        </div>

        <div className="space-y-2">
          {policySections[mode].map((section) => {
            const active = section.id === openId;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setOpenId(section.id)}
                className={`w-full rounded-xl border p-3 text-left motion-surface ${
                  active
                    ? "border-primary/35 bg-primarySoft shadow-soft"
                    : "border-border bg-panel hover:-translate-y-px hover:border-primary/25"
                }`}
              >
                <p className="text-sm font-semibold text-heading">{section.title}</p>
                <p className="mt-1 text-xs text-muted">{section.summary}</p>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="mt-2 text-sm text-body">{section.detail}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="surface-card p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Readiness checklist
        </p>
        <h3 className="mt-1 text-lg font-semibold text-heading">
          Click checks to track launch preparedness
        </h3>
        <div className="mt-4 space-y-2">
          {readinessChecksByMode[mode].map((check) => (
            <button
              key={check.id}
              type="button"
              onClick={() =>
                setChecks((prev) => ({ ...prev, [check.id]: !prev[check.id] }))
              }
              className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm motion-surface ${
                checks[check.id]
                  ? "border-teal/35 bg-tealSoft text-teal"
                  : "border-border bg-panel text-body hover:border-primary/25"
              }`}
            >
              {checks[check.id] ? "Done - " : "Pending - "}
              {check.label}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-border bg-surface p-3">
          <div className="mb-1 flex items-center justify-between text-xs text-muted">
            <span>Progress</span>
            <span>{readiness}%</span>
          </div>
          <div className="h-2 rounded-full bg-panel">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-primary via-violet to-teal transition-[width] duration-300"
              style={{ width: `${readiness}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
