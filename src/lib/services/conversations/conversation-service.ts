import { repository } from "@/lib/repositories";
import { conversationFilterSchema } from "@/lib/validation/conversation";
import { sanitizeText } from "@/lib/security/sanitize";
import { generateAssistantReply } from "@/lib/ai/service";
import { AIResponse } from "@/lib/ai/types";
import { AppError } from "@/lib/security/errors";

export type DemoResponseMode = "standard" | "strict" | "lowConfidence";

const applyDemoMode = (
  response: AIResponse,
  responseMode: DemoResponseMode
): AIResponse => {
  if (responseMode === "strict") {
    const confidence = Math.min(0.97, response.confidence + 0.08);
    const shouldEscalate = response.shouldEscalate || confidence < 0.8;
    const suggestedPrompts = Array.from(
      new Set([
        ...(response.suggestedPrompts ?? []),
        "Escalate to human review",
        "Show policy-safe summary"
      ])
    ).slice(0, 3);

    return {
      ...response,
      confidence,
      shouldEscalate,
      suggestedPrompts,
      text: `${response.text} Strict mode: response constrained to verified policy context and confidence checks.`
    };
  }

  if (responseMode === "lowConfidence") {
    const confidence = Math.max(0.24, response.confidence - 0.26);

    return {
      ...response,
      confidence,
      shouldEscalate: true,
      suggestedPrompts: ["Escalate to human support", "Request clarification"],
      text: `${response.text} Low confidence mode: this answer is intentionally cautious and should be reviewed before final action.`
    };
  }

  return response;
};

export const conversationService = {
  async list(params: unknown) {
    const parsed = conversationFilterSchema.safeParse(params);
    if (!parsed.success) {
      throw new AppError("Invalid conversation filters", 422);
    }

    return repository.listConversations(parsed.data);
  },

  async getById(id: string) {
    return repository.getConversationById(id);
  },

  async addFeedback(conversationId: string, rating: "HELPFUL" | "NOT_HELPFUL") {
    return repository.updateConversationFeedback(conversationId, rating);
  },

  async assign(conversationId: string, agentId: string) {
    return repository.assignConversation(conversationId, agentId);
  },

  async resolve(conversationId: string) {
    return repository.resolveConversation(conversationId);
  },

  async escalate(
    conversationId: string,
    reason: string,
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  ) {
    return repository.escalateConversation(conversationId, sanitizeText(reason), priority);
  },

  async addNote(conversationId: string, note: string) {
    return repository.addInternalNote(conversationId, sanitizeText(note));
  },

  async generateDemoReply(
    scenario: "SAAS" | "CONSTRUCTION" | "DENTAL" | "ECOMMERCE" | "CONSULTING",
    message: string,
    responseMode: DemoResponseMode = "standard"
  ) {
    const cleaned = sanitizeText(message);
    if (!cleaned) {
      throw new AppError("Message is required", 422);
    }

    const reply = await generateAssistantReply({
      workspaceId: "demo_workspace",
      scenario,
      message: cleaned
    });

    return applyDemoMode(reply, responseMode);
  }
};

