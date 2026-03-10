import { aiProvider } from "@/lib/ai/provider";
import { AIRequest } from "@/lib/ai/types";
import { runGuardrails } from "@/lib/ai/guardrails";

export const generateAssistantReply = async (input: AIRequest) => {
  const guardrailResult = runGuardrails(input);

  if (!guardrailResult.allowed) {
    return {
      text: "I cannot assist with that request in this channel. I can escalate this conversation to a human support specialist.",
      confidence: 0.22,
      shouldEscalate: true,
      guardrailTriggered: guardrailResult.reason,
      suggestedPrompts: ["Escalate to human support"]
    };
  }

  return aiProvider.generateResponse(input);
};

