import {
  AssistantBehaviorSettings,
  ConversationRecord,
  EscalationRecord,
  KnowledgeArticleRecord,
  TeamMemberStat,
  WidgetConfigRecord
} from "@/types/domain";
import { ConversationFilterInput } from "@/lib/validation/conversation";

export interface PaginatedConversations {
  rows: ConversationRecord[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AppRepository {
  listConversations(filters: ConversationFilterInput): Promise<PaginatedConversations>;
  getConversationById(id: string): Promise<ConversationRecord | null>;
  updateConversationFeedback(
    conversationId: string,
    rating: "HELPFUL" | "NOT_HELPFUL"
  ): Promise<ConversationRecord | null>;
  assignConversation(conversationId: string, agentId: string): Promise<ConversationRecord | null>;
  resolveConversation(conversationId: string): Promise<ConversationRecord | null>;
  escalateConversation(
    conversationId: string,
    reason: string,
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  ): Promise<EscalationRecord | null>;
  addInternalNote(conversationId: string, note: string): Promise<ConversationRecord | null>;
  listEscalations(): Promise<EscalationRecord[]>;
  listKnowledgeArticles(query?: string, category?: string): Promise<KnowledgeArticleRecord[]>;
  getKnowledgeArticleById(id: string): Promise<KnowledgeArticleRecord | null>;
  createKnowledgeArticle(
    article: Omit<KnowledgeArticleRecord, "id" | "updatedAt" | "usageCount">
  ): Promise<KnowledgeArticleRecord>;
  updateKnowledgeArticle(
    id: string,
    input: Partial<KnowledgeArticleRecord>
  ): Promise<KnowledgeArticleRecord | null>;
  duplicateKnowledgeArticle(id: string): Promise<KnowledgeArticleRecord | null>;
  archiveKnowledgeArticle(id: string): Promise<KnowledgeArticleRecord | null>;
  getWidgetConfig(): Promise<WidgetConfigRecord>;
  updateWidgetConfig(input: WidgetConfigRecord): Promise<WidgetConfigRecord>;
  getAssistantSettings(): Promise<AssistantBehaviorSettings>;
  updateAssistantSettings(
    input: AssistantBehaviorSettings
  ): Promise<AssistantBehaviorSettings>;
  listTeamStats(): Promise<TeamMemberStat[]>;
}

