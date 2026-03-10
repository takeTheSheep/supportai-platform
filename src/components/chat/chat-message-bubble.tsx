import { format } from "date-fns";
import { Avatar } from "@/components/common/avatar";
import { Button } from "@/components/common/button";
import { DemoChatMessage } from "@/store/demo-chat-store";

export const ChatMessageBubble = ({
  message,
  onFeedback,
  onEscalate
}: {
  message: DemoChatMessage;
  onFeedback?: (id: string, value: "HELPFUL" | "NOT_HELPFUL") => void;
  onEscalate?: () => void;
}) => {
  const isUser = message.sender === "user";
  const isAssistant = message.sender === "assistant";

  return (
    <div className={`flex gap-2.5 ${isUser ? "justify-end animate-slide-left" : "justify-start animate-slide-right"}`}>
      {!isUser ? <Avatar name={message.sender === "assistant" ? "SupportAI" : "System"} /> : null}
      <div className={`${isUser ? "max-w-[80%]" : "max-w-[86%]"}`}>
        <div
          className={
            isUser
              ? "chat-bubble-user"
              : "chat-bubble-assistant"
          }
        >
          <p className="whitespace-pre-wrap leading-6">{message.text}</p>

          {typeof message.confidence === "number" ? (
            <p className="mt-2 text-[11px] text-muted">Confidence {Math.round(message.confidence * 100)}%</p>
          ) : null}

          {message.suggestedPrompts?.length ? (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {message.suggestedPrompts.map((prompt) => (
                <button key={prompt} type="button" className="chip">
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <p className="mt-1.5 text-[11px] font-medium text-muted">{format(new Date(message.timestamp), "HH:mm")}</p>

        {isAssistant && onFeedback ? (
          <div className="mt-2.5 flex items-center gap-2">
            <button
              type="button"
              className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition duration-200 active:scale-[0.98] ${
                message.feedback === "HELPFUL"
                  ? "border-teal/30 bg-tealSoft text-teal"
                  : "border-border bg-surface text-muted hover:text-heading"
              }`}
              onClick={() => onFeedback(message.id, "HELPFUL")}
            >
              Helpful
            </button>
            <button
              type="button"
              className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition duration-200 active:scale-[0.98] ${
                message.feedback === "NOT_HELPFUL"
                  ? "border-rose/30 bg-roseSoft text-rose"
                  : "border-border bg-surface text-muted hover:text-heading"
              }`}
              onClick={() => onFeedback(message.id, "NOT_HELPFUL")}
            >
              Not Helpful
            </button>
            {message.feedback === "NOT_HELPFUL" && onEscalate ? (
              <Button size="sm" variant="secondary" onClick={onEscalate}>
                Escalate to human
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
      {isUser ? <Avatar name="You" /> : null}
    </div>
  );
};

