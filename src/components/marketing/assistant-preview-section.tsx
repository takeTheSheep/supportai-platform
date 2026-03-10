"use client";

import { useState } from "react";
import { Button } from "@/components/common/button";

const samplePrompts = [
  "What are your pricing plans?",
  "Do you offer support on weekends?",
  "Can I talk to a human?"
];

const responses: Record<string, string> = {
  "What are your pricing plans?":
    "We offer Starter, Pro, and Enterprise. Pro and Enterprise include weekend support and priority routing.",
  "Do you offer support on weekends?":
    "Yes, weekend support is available on Pro and Enterprise with triage escalation.",
  "Can I talk to a human?":
    "Absolutely. I can route this conversation to a support manager and mark it for priority follow-up."
};

export const AssistantPreviewSection = () => {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "assistant"; text: string }>>([
    {
      sender: "assistant",
      text: "I can help with pricing, implementation, and escalation workflow questions."
    }
  ]);
  const [typing, setTyping] = useState(false);

  const handlePrompt = (prompt: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: responses[prompt] ?? "I can share details or escalate this for human follow-up."
        }
      ]);
    }, 800);
  };

  return (
    <section className="section-shell section-block">
      <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="glass-panel space-y-4 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Interactive Preview</p>
          <h2 className="text-2xl font-semibold text-heading sm:text-3xl">
            Preview scenario-aware assistant behavior
          </h2>
          <p className="text-sm text-muted sm:text-base">
            Click a prompt to simulate realistic business support answers with guardrail-aware response quality.
          </p>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((prompt) => (
              <Button key={prompt} variant="secondary" size="sm" onClick={() => handlePrompt(prompt)}>
                {prompt}
              </Button>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-surface p-3 text-xs text-muted">
            Conversation policy: answer within knowledge scope, show confidence, escalate edge cases.
          </div>
        </div>

        <div className="surface-card flex h-[400px] flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-white/80 px-4 py-3 text-sm font-semibold text-heading">
            Assistant Preview
            <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] text-muted">Live simulation</span>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-surface/80 p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.text}-${index}`}
                className={
                  message.sender === "user"
                    ? "ml-auto max-w-[80%] animate-slide-left"
                    : "max-w-[85%] animate-slide-right"
                }
              >
                <div className={message.sender === "user" ? "chat-bubble-user" : "chat-bubble-assistant"}>
                  {message.text}
                </div>
                <p className="mt-1 text-[11px] text-muted">Just now</p>
              </div>
            ))}
            {typing ? (
              <div className="typing-surface">
                <span className="typing-dot" />
                <span className="typing-dot typing-dot-delay-1" />
                <span className="typing-dot typing-dot-delay-2" />
                <span>Assistant is typing</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
