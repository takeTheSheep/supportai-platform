"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { scenarioPresets } from "@/data/scenarios";

const sampleAnswers: Record<string, string[]> = {
  SAAS: [
    "Starter supports small teams, while Pro and Enterprise include broader automation controls.",
    "Implementation usually runs 7 to 14 business days with milestone check-ins."
  ],
  CONSTRUCTION: [
    "Permit assistance is available and can be routed to a coordinator for local requirements.",
    "Itemized estimates usually include labor, materials, and optional scope lines."
  ],
  DENTAL: [
    "We can verify PPO eligibility before your visit and clarify likely coverage outcomes.",
    "Appointment updates can be handled through scheduling support with confirmation reminders."
  ],
  ECOMMERCE: [
    "Tracking status is updated by carrier scans, and stalled shipments can be escalated.",
    "Returns are policy-based and can be initiated with guided steps in support workflow."
  ],
  CONSULTING: [
    "Discovery calls can be scheduled quickly to align scope and delivery priorities.",
    "Proposal timelines are typically a few business days after discovery inputs are complete."
  ]
};

export const SolutionsSimulator = () => {
  const [scenarioId, setScenarioId] = useState(scenarioPresets[0].id);
  const [activePromptIndex, setActivePromptIndex] = useState(0);

  const activeScenario =
    scenarioPresets.find((item) => item.id === scenarioId) ?? scenarioPresets[0];

  const response = useMemo(() => {
    const library = sampleAnswers[activeScenario.id] ?? sampleAnswers.SAAS;
    return library[activePromptIndex % library.length] ?? library[0];
  }, [activePromptIndex, activeScenario.id]);

  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[0.98fr_1.02fr]">
      <div className="surface-card p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Scenario studio
            </p>
            <h2 className="mt-1 text-lg font-semibold text-heading">
              Switch industry context instantly
            </h2>
          </div>
          <Badge tone="violet">Live preset</Badge>
        </div>

        <div className="space-y-2">
          {scenarioPresets.map((scenario) => {
            const active = scenario.id === activeScenario.id;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => {
                  setScenarioId(scenario.id);
                  setActivePromptIndex(0);
                }}
                className={`w-full rounded-xl border p-3 text-left motion-surface ${
                  active
                    ? "border-primary/40 bg-primarySoft shadow-soft"
                    : "border-border bg-panel hover:-translate-y-px hover:border-primary/25"
                }`}
              >
                <p className="text-sm font-semibold text-heading">{scenario.name}</p>
                <p className="mt-1 text-xs text-muted">{scenario.summary}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="surface-card p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-heading">Conversation preview</p>
            <Badge tone="teal">Context aware</Badge>
          </div>
          <div className="space-y-3 rounded-2xl border border-border bg-surface p-3">
            <div className="ml-auto max-w-[80%]">
              <div className="chat-bubble-user">
                {activeScenario.prompts[activePromptIndex % activeScenario.prompts.length]}
              </div>
            </div>
            <div className="max-w-[88%]">
              <div className="chat-bubble-assistant">{response}</div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {activeScenario.prompts.map((prompt, index) => (
              <button
                key={prompt}
                type="button"
                onClick={() => setActivePromptIndex(index)}
                className={`chip ${
                  index === activePromptIndex
                    ? "border-primary bg-primarySoft text-primaryDeep"
                    : ""
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-panel p-4">
            <p className="text-xs text-muted">Deflection rate</p>
            <p className="mt-1 text-2xl font-semibold text-heading">68%</p>
          </div>
          <div className="rounded-2xl border border-border bg-panel p-4">
            <p className="text-xs text-muted">Escalation latency</p>
            <p className="mt-1 text-2xl font-semibold text-heading">41s</p>
          </div>
          <div className="rounded-2xl border border-border bg-panel p-4">
            <p className="text-xs text-muted">Confidence median</p>
            <p className="mt-1 text-2xl font-semibold text-heading">0.78</p>
          </div>
        </div>

        <Button
          variant="secondary"
          className="w-full"
          onClick={() =>
            setActivePromptIndex((current) => (current + 1) % activeScenario.prompts.length)
          }
        >
          Next Prompt Simulation
        </Button>
      </div>
    </section>
  );
};
