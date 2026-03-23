"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, ThumbsDown, ThumbsUp, User } from "lucide-react";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const samplePrompts = [
  "What are your pricing plans?",
  "Do you offer weekend support?",
  "How long does setup take?",
  "Can I talk to a human?"
];

const aiResponses: Record<string, string> = {
  "What are your pricing plans?":
    "We offer Starter, Professional, and Enterprise plans. Each includes unlimited conversations, knowledge syncing, and escalation workflows.",
  "Do you offer weekend support?":
    "Yes. The AI assistant is available 24/7. Human escalations can be routed with weekend coverage rules and priority-based handoff windows.",
  "How long does setup take?":
    "Most teams are live in about 15 minutes. Add the widget script, upload your knowledge base, and tune guardrails from the dashboard.",
  "Can I talk to a human?":
    "Absolutely. I can escalate this conversation to a support specialist with the full chat context attached so nothing gets repeated."
};

const fallbackResponse =
  "I can help with that. If you want, I can answer from the knowledge base or hand this off to your team with full context.";

export const ReferenceLandingChatPreviewSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hi! I am your AI support assistant. How can I help today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [feedbackMap, setFeedbackMap] = useState<Record<number, "up" | "down">>({});
  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const timer = window.setTimeout(() => {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }, 50);

    return () => window.clearTimeout(timer);
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMessage: Message = { id: nextId.current++, role: "user", text: trimmed };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      const response = aiResponses[trimmed] ?? fallbackResponse;
      const assistantMessage: Message = {
        id: nextId.current++,
        role: "assistant",
        text: response
      };

      setMessages((current) => [...current, assistantMessage]);
      setTyping(false);
    }, 1100);
  };

  return (
    <section id="demo" className="section-block">
      <div className="section-shell">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-heading md:text-4xl">
            See it in <span className="text-gradient-blue">action</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-body">
            Click a sample question or type your own to preview how the assistant responds,
            escalates, and collects feedback.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="card-elevated overflow-hidden rounded-[1.75rem] border border-border/70">
            <div className="flex items-center gap-3 border-b border-border/80 px-5 py-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-cta text-white shadow-soft">
                <Bot size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-heading">SupportAI Assistant</p>
                <p className="flex items-center gap-1 text-xs text-muted">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal" />
                  Online now
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="h-[360px] space-y-4 overflow-y-auto px-5 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "assistant" ? (
                    <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-primarySoft text-primary">
                      <Bot size={15} />
                    </span>
                  ) : null}

                  <div className="max-w-[82%]">
                    <div
                      className={
                        message.role === "assistant" ? "chat-bubble-assistant" : "chat-bubble-user"
                      }
                    >
                      {message.text}
                    </div>

                    {message.role === "assistant" && message.id > 0 ? (
                      <div className="ml-1 mt-1.5 flex gap-1">
                        <button
                          type="button"
                          onClick={() => setFeedbackMap((current) => ({ ...current, [message.id]: "up" }))}
                          className={`rounded-lg p-1 transition duration-200 ${
                            feedbackMap[message.id] === "up"
                              ? "bg-tealSoft text-teal"
                              : "text-muted hover:bg-surface hover:text-heading"
                          }`}
                          aria-label="Helpful response"
                        >
                          <ThumbsUp size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setFeedbackMap((current) => ({ ...current, [message.id]: "down" }))}
                          className={`rounded-lg p-1 transition duration-200 ${
                            feedbackMap[message.id] === "down"
                              ? "bg-roseSoft text-rose"
                              : "text-muted hover:bg-surface hover:text-heading"
                          }`}
                          aria-label="Unhelpful response"
                        >
                          <ThumbsDown size={12} />
                        </button>
                      </div>
                    ) : null}
                  </div>

                  {message.role === "user" ? (
                    <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-violetSoft text-violet">
                      <User size={15} />
                    </span>
                  ) : null}
                </div>
              ))}

              {typing ? (
                <div className="flex gap-3">
                  <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-primarySoft text-primary">
                    <Bot size={15} />
                  </span>
                  <div className="typing-surface">
                    <span className="typing-dot" />
                    <span className="typing-dot typing-dot-delay-1" />
                    <span className="typing-dot typing-dot-delay-2" />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-border/80 px-5 py-3">
              {samplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="chip whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-border/80 px-4 py-3">
              <input
                id="landing-chat-message"
                name="landing-chat-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendMessage(input);
                  }
                }}
                placeholder="Type a message..."
                className="input-surface focus-ring h-12 flex-1 px-4 text-sm text-heading placeholder:text-muted"
              />
              <button
                type="button"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || typing}
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primaryDeep text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-lift disabled:pointer-events-none disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
