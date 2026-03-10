"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { Card, CardContent, CardHeader } from "@/components/common/card";
import { Input } from "@/components/common/input";
import { SegmentedTabs } from "@/components/common/tabs";
import { Textarea } from "@/components/common/textarea";

const tabOptions = [
  { value: "workspace", label: "Workspace" },
  { value: "assistant", label: "Assistant Behavior" },
  { value: "notifications", label: "Notifications" },
  { value: "security", label: "Security" },
  { value: "permissions", label: "Team Permissions" },
  { value: "integrations", label: "Integrations" }
] as const;

type TabValue = (typeof tabOptions)[number]["value"];

interface SettingsCenterProps {
  workspace: {
    companyName: string;
    supportEmail: string;
    defaultLanguage: string;
    timezone: string;
  };
  assistant: {
    responseStyle: "CONCISE" | "BALANCED" | "DETAILED";
    tonePreset: "PROFESSIONAL" | "FRIENDLY" | "ENTERPRISE";
    escalationThreshold: number;
    confidenceThreshold: number;
    restrictedTopics: string[];
    fallbackMessage: string;
  };
}

export const SettingsCenter = ({ workspace, assistant }: SettingsCenterProps) => {
  const [tab, setTab] = useState<TabValue>("workspace");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const workspaceForm = useForm({
    defaultValues: workspace
  });

  const assistantForm = useForm({
    defaultValues: {
      ...assistant,
      restrictedTopicsText: assistant.restrictedTopics.join(", ")
    }
  });

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [escalationAlerts, setEscalationAlerts] = useState(true);
  const [digest, setDigest] = useState("DAILY");

  const save = async () => {
    setSaving(true);

    try {
      if (tab === "workspace") {
        await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            section: "workspace",
            data: workspaceForm.getValues()
          })
        });
      }

      if (tab === "assistant") {
        const values = assistantForm.getValues();
        await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            section: "assistant",
            data: {
              responseStyle: values.responseStyle,
              tonePreset: values.tonePreset,
              escalationThreshold: Number(values.escalationThreshold),
              confidenceThreshold: Number(values.confidenceThreshold),
              restrictedTopics: values.restrictedTopicsText
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
              fallbackMessage: values.fallbackMessage
            }
          })
        });
      }

      if (tab === "notifications") {
        await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            section: "notifications",
            data: {
              emailNotifications,
              escalationAlerts,
              digestFrequency: digest
            }
          })
        });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 1200);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <SegmentedTabs
        value={tab}
        options={tabOptions.map((item) => ({ value: item.value, label: item.label }))}
        onChange={(value) => setTab(value as TabValue)}
        className="w-full max-w-full flex-wrap"
      />

      <Card>
        <CardHeader className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-semibold text-heading">Settings</h1>
          <div className="flex items-center gap-2">
            {saved ? <Badge tone="teal">Saved</Badge> : null}
            <Button onClick={save} loading={saving}>
              Save changes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {tab === "workspace" ? (
            <div className="grid gap-3 md:grid-cols-2">
              <Input placeholder="Company name" {...workspaceForm.register("companyName")} />
              <Input placeholder="Support email" {...workspaceForm.register("supportEmail")} />
              <Input placeholder="Default language" {...workspaceForm.register("defaultLanguage")} />
              <Input placeholder="Timezone" {...workspaceForm.register("timezone")} />
            </div>
          ) : null}

          {tab === "assistant" ? (
            <div className="grid gap-3 md:grid-cols-2">
              <select className="focus-ring h-11 rounded-xl border border-border px-3 text-sm" {...assistantForm.register("responseStyle")}>
                <option value="CONCISE">Concise</option>
                <option value="BALANCED">Balanced</option>
                <option value="DETAILED">Detailed</option>
              </select>
              <select className="focus-ring h-11 rounded-xl border border-border px-3 text-sm" {...assistantForm.register("tonePreset")}>
                <option value="PROFESSIONAL">Professional</option>
                <option value="FRIENDLY">Friendly</option>
                <option value="ENTERPRISE">Enterprise</option>
              </select>
              <Input
                type="number"
                min={20}
                max={100}
                placeholder="Escalation threshold"
                {...assistantForm.register("escalationThreshold", { valueAsNumber: true })}
              />
              <Input
                type="number"
                min={20}
                max={100}
                placeholder="Confidence threshold"
                {...assistantForm.register("confidenceThreshold", { valueAsNumber: true })}
              />
              <Input className="md:col-span-2" placeholder="Restricted topics" {...assistantForm.register("restrictedTopicsText")} />
              <Textarea className="md:col-span-2" rows={4} placeholder="Fallback message" {...assistantForm.register("fallbackMessage")} />
            </div>
          ) : null}

          {tab === "notifications" ? (
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-surface p-3">
                <span>Email notifications</span>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(event) => setEmailNotifications(event.target.checked)}
                />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface p-3">
                <span>Escalation alerts</span>
                <input
                  type="checkbox"
                  checked={escalationAlerts}
                  onChange={(event) => setEscalationAlerts(event.target.checked)}
                />
              </div>
              <div className="rounded-xl bg-surface p-3">
                <p className="mb-2">Digest preferences</p>
                <select
                  className="focus-ring h-10 rounded-lg border border-border px-3 text-sm"
                  value={digest}
                  onChange={(event) => setDigest(event.target.value)}
                >
                  <option value="OFF">Off</option>
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                </select>
              </div>
            </div>
          ) : null}

          {tab === "security" ? (
            <div className="space-y-3 text-sm">
              <div className="rounded-xl bg-surface p-3">
                <p className="font-semibold text-heading">Active sessions</p>
                <p className="text-muted">Current session in Budapest, Hungary.</p>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <p className="font-semibold text-heading">Login event history</p>
                <p className="text-muted">Placeholder: SSO and event audit stream integration.</p>
              </div>
              <div className="rounded-xl bg-amberSoft p-3 text-amber">
                Suspicious activity alerts are planned for provider-backed monitoring.
              </div>
              <div className="rounded-xl bg-surface p-3">
                <p className="font-semibold text-heading">API key architecture</p>
                <p className="text-muted">Reserved for future integration and webhook verification flow.</p>
              </div>
            </div>
          ) : null}

          {tab === "permissions" ? (
            <div className="space-y-3 text-sm">
              <div className="rounded-xl bg-surface p-3">
                <p className="font-semibold text-heading">Admin</p>
                <p className="text-muted">Full control across settings, analytics, team, and widget configuration.</p>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <p className="font-semibold text-heading">Support Manager</p>
                <p className="text-muted">Conversation oversight, escalations, analytics, and assistant behavior updates.</p>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <p className="font-semibold text-heading">Support Agent</p>
                <p className="text-muted">Assigned escalations, notes, and resolution status management.</p>
              </div>
            </div>
          ) : null}

          {tab === "integrations" ? (
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl bg-surface p-3 text-sm">
                <p className="font-semibold text-heading">Website embed</p>
                <p className="text-muted">Widget installation and versioning controls.</p>
              </div>
              <div className="rounded-xl bg-surface p-3 text-sm">
                <p className="font-semibold text-heading">CRM integration</p>
                <p className="text-muted">Placeholder for Salesforce and HubSpot mapping.</p>
              </div>
              <div className="rounded-xl bg-surface p-3 text-sm">
                <p className="font-semibold text-heading">Webhook endpoint</p>
                <p className="text-muted">Reserved with signature verification architecture.</p>
              </div>
              <div className="rounded-xl bg-surface p-3 text-sm">
                <p className="font-semibold text-heading">Helpdesk export</p>
                <p className="text-muted">Queue export placeholder for Zendesk and Jira Service Management.</p>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

