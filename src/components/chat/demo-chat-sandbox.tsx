"use client";

import { FormEvent, KeyboardEvent, useMemo, useState } from "react";
import { AlertCircle, RotateCcw, Send } from "lucide-react";
import { scenarioPresets } from "@/data/scenarios";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { SegmentedTabs } from "@/components/common/tabs";
import { Textarea } from "@/components/common/textarea";
import { ChatMessageBubble } from "@/components/chat/chat-message-bubble";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { useDemoChatStore } from "@/store/demo-chat-store";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { cn } from "@/lib/utils/cn";

const responseModes = [
  {
    value: "standard",
    label: "Standard",
    tone: "blue",
    description: "Balanced response with normal confidence handling."
  },
  {
    value: "strict",
    label: "Strict",
    tone: "teal",
    description: "Policy-heavy output with tighter escalation behavior."
  },
  {
    value: "lowConfidence",
    label: "Low Confidence",
    tone: "amber",
    description: "Cautious output that prefers clarification and handoff."
  }
] as const;

type ResponseMode = (typeof responseModes)[number]["value"];

export const DemoChatSandbox = () => {
  const {
    scenario,
    messages,
    pending,
    escalationMarked,
    addMessage,
    markEscalated,
    resetConversation,
    setMessageFeedback,
    setPending,
    setScenario
  } = useDemoChatStore();

  const [input, setInput] = useState("");
  const [responseMode, setResponseMode] = useState<ResponseMode>("standard");
  const [notice, setNotice] = useState<string | null>(null);

  const activeScenario = useMemo(
    () => scenarioPresets.find((item) => item.id === scenario) ?? scenarioPresets[0],
    [scenario]
  );
  const activeMode = useMemo(
    () => responseModes.find((mode) => mode.value === responseMode) ?? responseModes[0],
    [responseMode]
  );

  const listRef = useAutoScroll<HTMLDivElement>([messages, pending]);

  const sendMessage = async (text: string) => {
    const message = text.trim();
    if (!message || pending) return;

    addMessage({
      id: `user_${Date.now()}`,
      sender: "user",
      text: message,
      timestamp: new Date().toISOString()
    });

    setInput("");
    setPending(true);
    setNotice(null);

    try {
      const payload = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario,
          message,
          responseMode
        })
      }).then((res) => res.json());

      const reply = payload.data;

      addMessage({
        id: `assistant_${Date.now()}`,
        sender: "assistant",
        text: reply?.text ?? "I can escalate this request to a human specialist.",
        timestamp: new Date().toISOString(),
        confidence: reply?.confidence,
        suggestedPrompts: reply?.suggestedPrompts
      });
    } catch {
      setNotice("Assistant response failed. Please retry.");
      addMessage({
        id: `error_${Date.now()}`,
        sender: "system",
        text: "Response failed. Please try again.",
        timestamp: new Date().toISOString()
      });
    } finally {
      setPending(false);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  };

  return (
    <section className="grid gap-5 lg:grid-cols-[330px_1fr]">
      <aside className="surface-card space-y-5 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Business scenario</p>
          <h2 className="mt-1 text-lg font-semibold text-heading">Demo presets</h2>
        </div>

        <div className="space-y-2">
          {scenarioPresets.map((item) => {
            const active = item.id === scenario;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setScenario(item.id)}
                className={cn(
                  "w-full rounded-xl border px-3 py-2.5 text-left transition duration-200",
                  active
                    ? "border-primary/40 bg-primarySoft text-primaryDeep shadow-soft"
                    : "border-border bg-panel text-body hover:border-primary/30 hover:bg-surface"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{item.name}</p>
                  {active ? <Badge tone="blue">Active</Badge> : null}
                </div>
                <p className="mt-1 text-xs leading-5">{item.summary}</p>
              </button>
            );
          })}
        </div>

        <div className="panel-tint p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Knowledge context</p>
          <ul className="mt-2 space-y-1.5 text-xs text-body">
            {activeScenario.knowledgeContext.map((line) => (
              <li key={line}>- {line}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-surface p-3 text-xs text-muted">
          Guardrails enforce topic restrictions, confidence fallback, and human escalation pathways.
        </div>
      </aside>

      <div className="surface-card flex min-h-[700px] flex-col overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/90 bg-panel px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-heading">Interactive AI Support Demo</p>
            <p className="text-xs text-muted">Current mode: {activeScenario.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <SegmentedTabs
              value={responseMode}
              options={responseModes.map((mode) => ({ value: mode.value, label: mode.label }))}
              onChange={(value) => setResponseMode(value as ResponseMode)}
              emphasis="strong"
              className="min-w-[360px]"
            />
            <Button variant="ghost" size="sm" className="gap-2" onClick={resetConversation}>
              <RotateCcw size={14} />
              Reset
            </Button>
          </div>
        </div>

        <div className="border-b border-border/90 bg-surface/70 px-4 py-3">
          <div className="mb-2 flex items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Response mode</p>
            <Badge tone={activeMode.tone as "blue" | "teal" | "amber"}>
              {activeMode.label} active
            </Badge>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {responseModes.map((mode) => {
              const active = mode.value === responseMode;
              return (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => setResponseMode(mode.value)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-left motion-surface",
                    active
                      ? "border-primary/35 bg-primarySoft shadow-soft"
                      : "border-border bg-panel hover:border-primary/25 hover:bg-white"
                  )}
                >
                  <p className="text-xs font-semibold text-heading">{mode.label}</p>
                  <p className="mt-1 text-[11px] leading-5 text-muted">{mode.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-b border-border/90 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Suggested prompts</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {activeScenario.prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => void sendMessage(prompt)}
                className="chip"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto scroll-smooth bg-surface p-4">
          {messages.map((message) => (
            <ChatMessageBubble
              key={message.id}
              message={message}
              onFeedback={setMessageFeedback}
              onEscalate={markEscalated}
            />
          ))}
          {pending ? <TypingIndicator /> : null}
        </div>

        <div className="border-t border-border/90 bg-panel p-3">
          {escalationMarked ? (
            <p className="mb-2 text-xs font-semibold text-amber">Conversation marked for human follow-up.</p>
          ) : null}
          {notice ? (
            <p className="mb-2 inline-flex items-center gap-1 text-xs font-semibold text-rose">
              <AlertCircle size={13} />
              {notice}
            </p>
          ) : null}
          <form onSubmit={onSubmit} className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type your message. Press Enter to send, Shift+Enter for newline"
              aria-label="Chat input"
              rows={2}
              className="min-h-[52px]"
            />
            <Button type="submit" className="gap-2" disabled={pending || input.trim().length === 0}>
              <Send size={15} />
              Send
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

