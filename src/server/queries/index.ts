import { analyticsService } from "@/lib/services/analytics/analytics-service";
import { conversationService } from "@/lib/services/conversations/conversation-service";
import { escalationService } from "@/lib/services/escalations/escalation-service";
import { knowledgeService } from "@/lib/services/knowledge/knowledge-service";
import { settingsService } from "@/lib/services/settings/settings-service";
import { widgetService } from "@/lib/services/widget/widget-service";

export const queries = {
  dashboard: () => analyticsService.getDashboardOverview(),
  analytics: () => analyticsService.getAnalyticsPageData(),
  conversations: (params?: Record<string, unknown>) => conversationService.list(params ?? {}),
  conversationById: (id: string) => conversationService.getById(id),
  escalations: () => escalationService.listQueue(),
  knowledge: (query?: string, category?: string) => knowledgeService.list(query, category),
  widgetConfig: () => widgetService.getConfig(),
  workspaceSettings: () => settingsService.getWorkspaceSettings(),
  assistantSettings: () => settingsService.getAssistantSettings()
};

