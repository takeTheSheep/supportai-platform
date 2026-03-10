"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Check, Copy, Sparkles } from "lucide-react";
import { WidgetConfigRecord } from "@/types/domain";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { Card, CardContent, CardHeader } from "@/components/common/card";
import { Input } from "@/components/common/input";
import { Select } from "@/components/common/select";
import { Textarea } from "@/components/common/textarea";
import { cn } from "@/lib/utils/cn";

type WidgetForm = Omit<WidgetConfigRecord, "id" | "workspaceId">;

const colorSwatches = ["#4D74FF", "#3457E8", "#35C3B0", "#8A7BFF", "#FF6F8A", "#F5B14C"];

export const WidgetCustomizer = ({ config }: { config: WidgetConfigRecord }) => {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "success" | "error">("idle");

  const { register, handleSubmit, watch, setValue, formState } = useForm<WidgetForm>({
    defaultValues: {
      primaryColor: config.primaryColor,
      greetingMessage: config.greetingMessage,
      widgetTitle: config.widgetTitle,
      launcherPosition: config.launcherPosition,
      borderRadius: config.borderRadius,
      avatarStyle: config.avatarStyle,
      promptChips: config.promptChips,
      businessHoursMessage: config.businessHoursMessage,
      showEscalation: config.showEscalation
    }
  });

  const values = watch();

  const embedCode = useMemo(
    () => `<script src="https://cdn.supportai.example/widget.js" data-workspace="northline" data-theme-color="${values.primaryColor}" data-position="${values.launcherPosition.toLowerCase()}"></script>`,
    [values.primaryColor, values.launcherPosition]
  );

  const onSubmit = async (data: WidgetForm) => {
    setSaving(true);
    setSaveState("idle");

    try {
      const response = await fetch("/api/widget", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        setSaveState("error");
        return;
      }

      setSaveState("success");
      setTimeout(() => setSaveState("idle"), 1300);
    } finally {
      setSaving(false);
    }
  };

  const promptChipsAsText = values.promptChips.join(", ");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 xl:grid-cols-[1.22fr_1fr]">
      <Card>
        <CardHeader className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-semibold text-heading">Widget customization</h1>
            <p className="text-xs text-muted">Tune visual identity, defaults, and escalation behavior in real time.</p>
          </div>
          {formState.isDirty ? <Badge tone="violet">Unsaved changes</Badge> : <Badge tone="teal">Synchronized</Badge>}
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1 text-sm md:col-span-2">
            <span className="text-muted">Theme color</span>
            <div className="flex flex-wrap items-center gap-2">
              <Input type="color" {...register("primaryColor")} className="h-11 w-16 p-1" />
              {colorSwatches.map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  aria-label={`Apply color ${swatch}`}
                  onClick={() => setValue("primaryColor", swatch, { shouldDirty: true })}
                  className={cn(
                    "h-8 w-8 rounded-full border border-border transition duration-200 hover:scale-105",
                    values.primaryColor === swatch && "ring-2 ring-primary/35"
                  )}
                  style={{ backgroundColor: swatch }}
                />
              ))}
            </div>
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-muted">Widget title</span>
            <Input {...register("widgetTitle")} />
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-muted">Launcher position</span>
            <Select {...register("launcherPosition")}>
              <option value="LEFT">Left</option>
              <option value="RIGHT">Right</option>
            </Select>
          </label>
          <label className="space-y-1 text-sm md:col-span-2">
            <span className="text-muted">Greeting message</span>
            <Input {...register("greetingMessage")} />
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-muted">Border radius</span>
            <Select {...register("borderRadius")}>
              <option value="SOFT">Soft</option>
              <option value="ROUNDED">Rounded</option>
              <option value="SQUARE">Square</option>
            </Select>
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-muted">Avatar style</span>
            <Select {...register("avatarStyle")}>
              <option value="ORBIT">Orbit</option>
              <option value="CIRCLE">Circle</option>
              <option value="INITIALS">Initials</option>
            </Select>
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-muted">Escalation button</span>
            <Select
              value={values.showEscalation ? "SHOW" : "HIDE"}
              onChange={(event) =>
                setValue("showEscalation", event.target.value === "SHOW", { shouldDirty: true })
              }
            >
              <option value="SHOW">Show</option>
              <option value="HIDE">Hide</option>
            </Select>
          </label>
          <label className="space-y-1 text-sm md:col-span-2">
            <span className="text-muted">Suggested prompt chips</span>
            <Input
              value={promptChipsAsText}
              onChange={(event) =>
                setValue(
                  "promptChips",
                  event.target.value
                    .split(",")
                    .map((chip) => chip.trim())
                    .filter(Boolean),
                  { shouldDirty: true }
                )
              }
            />
          </label>
          <label className="space-y-1 text-sm md:col-span-2">
            <span className="text-muted">Business hours message</span>
            <Textarea rows={3} {...register("businessHoursMessage")} />
          </label>
          <div className="flex items-center gap-2 md:col-span-2">
            <Button type="submit" loading={saving}>
              Save widget settings
            </Button>
            {saveState === "success" ? <Badge tone="teal">Saved</Badge> : null}
            {saveState === "error" ? <Badge tone="rose">Save failed</Badge> : null}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-heading">Live widget preview</h2>
            <Button type="button" variant="secondary" size="sm" onClick={() => setOpen((state) => !state)}>
              {open ? "Close" : "Open"}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative h-[370px] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-primarySoft/20 p-4">
              <div className={`absolute bottom-4 ${values.launcherPosition === "LEFT" ? "left-4" : "right-4"}`}>
                <div
                  className={cn(
                    "origin-bottom transition duration-300",
                    open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
                  )}
                >
                  <div
                    className={cn(
                      "mb-3 w-[288px] border border-border bg-panel shadow-float",
                      formState.isDirty && "ring-2 ring-primary/20"
                    )}
                    style={{
                      borderRadius:
                        values.borderRadius === "SOFT"
                          ? "14px"
                          : values.borderRadius === "ROUNDED"
                            ? "20px"
                            : "4px"
                    }}
                  >
                    <div
                      className="rounded-t-[inherit] px-3 py-2 text-sm font-semibold text-white"
                      style={{ backgroundColor: values.primaryColor }}
                    >
                      {values.widgetTitle}
                    </div>
                    <div className="space-y-3 p-3">
                      <p className="rounded-xl border border-border bg-surface p-2.5 text-xs text-body">
                        {values.greetingMessage}
                      </p>
                      <div className="ml-auto max-w-[76%] rounded-2xl rounded-br-md border border-primaryDeep/30 bg-gradient-to-b from-primary to-primaryDeep px-3 py-2 text-[11px] text-white">
                        Can I talk to a human?
                      </div>
                      <div className="max-w-[86%] rounded-2xl rounded-bl-md border border-border bg-panel px-3 py-2 text-[11px] text-body shadow-soft">
                        I can escalate this now and mark your conversation for priority follow-up.
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {values.promptChips.slice(0, 3).map((chip) => (
                          <span key={chip} className="chip text-[11px]">
                            {chip}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-muted">{values.businessHoursMessage}</p>
                      {values.showEscalation ? (
                        <button
                          type="button"
                          className="w-full rounded-lg px-2 py-1.5 text-xs font-semibold text-white transition duration-200 hover:brightness-95"
                          style={{ backgroundColor: values.primaryColor }}
                        >
                          Escalate to human
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-soft transition hover:-translate-y-0.5"
                  style={{ backgroundColor: values.primaryColor }}
                >
                  <Sparkles size={16} />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold text-heading">Embed code</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            <pre className="overflow-x-auto rounded-xl border border-border bg-surface p-3 text-xs text-body">{embedCode}</pre>
            <Button
              type="button"
              variant="secondary"
              className="gap-2"
              onClick={async () => {
                await navigator.clipboard.writeText(embedCode);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied to clipboard" : "Copy embed code"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

