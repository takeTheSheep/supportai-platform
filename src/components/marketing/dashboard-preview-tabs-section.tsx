"use client";

import { useState } from "react";
import { SegmentedTabs } from "@/components/common/tabs";

const tabs = [
  { value: "dashboard", label: "Dashboard" },
  { value: "conversations", label: "Conversations" },
  { value: "knowledge", label: "Knowledge Base" },
  { value: "widget", label: "Widget" }
] as const;

type TabValue = (typeof tabs)[number]["value"];

const previewContent: Record<
  TabValue,
  {
    title: string;
    body: string;
    chips: string[];
    stats: Array<{ label: string; value: string }>;
  }
> = {
  dashboard: {
    title: "Operational KPI command center",
    body: "Track resolution rate, escalation load, confidence trend, and deflection impact in real time.",
    chips: ["Confidence 78%", "Escalations -6.4%", "Response 41s"],
    stats: [
      { label: "Conversations", value: "482" },
      { label: "Resolved", value: "83.7%" }
    ]
  },
  conversations: {
    title: "Conversation oversight and handoff controls",
    body: "Review transcripts, assign owners, flag low-confidence threads, and open escalation workflows.",
    chips: ["Flagged for review", "Confidence 54%", "Escalated"],
    stats: [
      { label: "Open queue", value: "38" },
      { label: "Assigned", value: "26" }
    ]
  },
  knowledge: {
    title: "Knowledge system for reliable answers",
    body: "Manage categories, version notes, source tags, and usage counts influencing assistant behavior.",
    chips: ["Published", "Usage +218", "Test answer"],
    stats: [
      { label: "Articles", value: "54" },
      { label: "Coverage", value: "91%" }
    ]
  },
  widget: {
    title: "Live website assistant configurator",
    body: "Customize greeting, theme, chips, escalation visibility, and launcher behavior with instant preview.",
    chips: ["Theme synced", "Launcher right", "Escalation enabled"],
    stats: [
      { label: "Open rate", value: "66%" },
      { label: "Engagement", value: "48%" }
    ]
  }
};

export const DashboardPreviewTabsSection = () => {
  const [tab, setTab] = useState<TabValue>("dashboard");

  return (
    <section className="section-shell section-block">
      <div className="surface-card overflow-hidden">
        <div className="border-b border-border bg-white/80 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Interactive product tour</p>
          <h2 className="mt-2 text-2xl font-semibold text-heading">Explore core AI support workspaces</h2>
          <p className="mt-1 text-sm text-muted">Switch views to inspect assistant operations, controls, and live outcomes.</p>
        </div>
        <div className="space-y-5 p-5">
          <SegmentedTabs
            value={tab}
            options={tabs.map((item) => ({ value: item.value, label: item.label }))}
            onChange={(value) => setTab(value as TabValue)}
          />
          <div
            key={tab}
            className="grid gap-4 rounded-2xl border border-border bg-surface/80 p-5 animate-fade-up md:grid-cols-[1fr_1.2fr]"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {tabs.find((item) => item.value === tab)?.label}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-heading">{previewContent[tab].title}</h3>
              <p className="mt-2 text-sm text-muted">{previewContent[tab].body}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {previewContent[tab].chips.map((chip) => (
                  <span key={chip} className="chip">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-panel p-4">
              <div className="grid grid-cols-2 gap-3">
                {previewContent[tab].stats.map((item) => (
                  <div key={item.label} className="rounded-xl border border-border bg-surface/80 p-3">
                    <p className="text-xs text-muted">{item.label}</p>
                    <p className="text-lg font-semibold text-heading">{item.value}</p>
                  </div>
                ))}
                <div className="rounded-xl border border-violet/20 bg-violetSoft p-3 text-sm text-violet">Assistant confidence indicators</div>
                <div className="rounded-xl border border-teal/20 bg-tealSoft p-3 text-sm text-teal">Escalation badges and timestamps</div>
              </div>
              <div className="mt-3 rounded-xl border border-border bg-panel p-3 text-xs text-muted">
                AI responses stay aligned with workspace knowledge and escalation controls.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
