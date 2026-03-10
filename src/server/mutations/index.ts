import { conversationService } from "@/lib/services/conversations/conversation-service";
import { knowledgeService } from "@/lib/services/knowledge/knowledge-service";
import { settingsService } from "@/lib/services/settings/settings-service";
import { widgetService } from "@/lib/services/widget/widget-service";

export const mutations = {
  updateFeedback: (conversationId: string, rating: "HELPFUL" | "NOT_HELPFUL") =>
    conversationService.addFeedback(conversationId, rating),
  assignConversation: (conversationId: string, agentId: string) =>
    conversationService.assign(conversationId, agentId),
  resolveConversation: (conversationId: string) =>
    conversationService.resolve(conversationId),
  escalateConversation: (
    conversationId: string,
    reason: string,
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  ) => conversationService.escalate(conversationId, reason, priority),
  addConversationNote: (conversationId: string, note: string) =>
    conversationService.addNote(conversationId, note),
  updateWidgetConfig: (payload: unknown) => widgetService.updateConfig(payload),
  createArticle: (payload: unknown) => knowledgeService.create(payload),
  updateArticle: (id: string, payload: unknown) => knowledgeService.update(id, payload),
  updateAssistantSettings: (payload: unknown) =>
    settingsService.updateAssistantSettings(payload)
};

