"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Bot, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { DemoLaunchButton } from "@/components/common/demo-launch-button";
import { cn } from "@/lib/utils/cn";

const promptChips = [
  "What are your pricing plans?",
  "Do you offer installation support?",
  "Can I talk to a human?"
];

const promptResponses: Record<string, string> = {
  "What are your pricing plans?":
    "We offer Starter, Pro, and Enterprise plans. Pro and Enterprise include priority triage and weekend support.",
  "Do you offer installation support?":
    "Yes. Implementation support is included during onboarding and usually completes within 7 to 14 business days.",
  "Can I talk to a human?":
    "Absolutely. I can escalate this conversation to a support manager and mark it for follow-up."
};

export const HeroSection = () => {
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "assistant"; text: string }>>([
    {
      sender: "assistant",
      text: "Welcome to SupportAI command center. I can answer policy-safe support requests and escalate when confidence drops."
    }
  ]);

  const triggerPrompt = (prompt: string) => {
    if (typing) return;

    setActivePrompt(prompt);
    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: promptResponses[prompt] ?? "I can route this to a specialist if needed."
        }
      ]);
    }, 760);
  };

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 landing-grid opacity-35" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,_rgba(91,124,255,0.18),_transparent_42%),radial-gradient(circle_at_85%_12%,_rgba(124,108,255,0.14),_transparent_38%),radial-gradient(circle_at_70%_90%,_rgba(79,209,197,0.13),_transparent_36%)]" />

      <div className="section-shell relative py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div className="space-y-6">
          <Badge tone="blue" className="text-xs">
            AI Support Command Platform
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            A business AI assistant with control panels, guardrails, and live escalation logic.
          </h1>
          <p className="max-w-xl text-base text-muted sm:text-lg">
            SupportAI blends assistant conversations with operator controls so teams can automate fast without losing oversight.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <DemoLaunchButton size="lg" label="Get Demo" />
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="gap-2">
                View Platform
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="glass-panel p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Try live prompts</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {promptChips.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className={cn("chip", activePrompt === prompt && "border-primary bg-primarySoft text-primaryDeep")}
                  onClick={() => triggerPrompt(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

          <div className="space-y-4">
            <div className="glass-panel relative overflow-hidden p-5">
              <div className="absolute right-5 top-4 inline-flex items-center gap-1 rounded-full border border-border bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-muted">
                <Sparkles size={12} className="text-violet" />
                AI active
              </div>
              <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-heading">SupportAI Assistant</p>
                  <p className="text-xs text-muted">Real-time conversation stream</p>
                </div>
                <Bot className="text-primary" size={18} />
              </div>

                <div className="space-y-3 rounded-2xl border border-border bg-surface/80 p-3">
                {messages.slice(-3).map((message, index) => (
                  <div
                    key={`${message.sender}_${index}_${message.text.slice(0, 10)}`}
                    className={
                      message.sender === "user"
                        ? "ml-auto max-w-[82%] animate-slide-left"
                        : "max-w-[88%] animate-slide-right"
                    }
                  >
                    <div className={message.sender === "user" ? "chat-bubble-user" : "chat-bubble-assistant"}>
                      {message.text}
                    </div>
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
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="glass-panel p-3 text-xs">
                <p className="font-semibold text-primaryDeep">Confidence</p>
                <p className="mt-1 text-muted">78% average answer accuracy</p>
              </div>
              <div className="glass-panel p-3 text-xs">
                <p className="font-semibold text-teal">Escalation</p>
                <p className="mt-1 text-muted">Auto-routed to manager in 41s</p>
              </div>
              <div className="glass-panel p-3 text-xs">
                <p className="font-semibold text-violet">Knowledge</p>
                <p className="mt-1 text-muted">91% response coverage from docs</p>
              </div>
            </div>
            <div className="glass-panel flex flex-wrap items-center justify-between gap-3 p-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck size={12} className="text-teal" />
                Guardrails active
              </span>
              <span className="rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold">
                +26% faster first response
              </span>
              <span className="rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold">
                Escalation policy synced
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
