import { formatISO } from "date-fns";
import { ConversationFilterInput } from "@/lib/validation/conversation";
import { AppRepository, PaginatedConversations } from "@/lib/repositories/types";
import { generateId, mockState } from "@/lib/repositories/mock-state";
import { EscalationRecord, KnowledgeArticleRecord, WidgetConfigRecord } from "@/types/domain";

const sortByDateDesc = <T extends { updatedAt?: string; createdAt?: string }>(rows: T[]) =>
  [...rows].sort((a, b) => {
    const aDate = new Date(a.updatedAt ?? a.createdAt ?? 0).getTime();
    const bDate = new Date(b.updatedAt ?? b.createdAt ?? 0).getTime();
    return bDate - aDate;
  });

class MockRepository implements AppRepository {
  async listConversations(filters: ConversationFilterInput): Promise<PaginatedConversations> {
    const page = filters.page ?? 1;
    const pageSize = filters.pageSize ?? 10;

    const query = (filters.query ?? "").trim().toLowerCase();

    const rows = sortByDateDesc(mockState.conversations).filter((conversation) => {
      if (query) {
        const haystack = `${conversation.customerLabel} ${conversation.topic} ${conversation.id}`.toLowerCase();
        if (!haystack.includes(query)) {
          return false;
        }
      }

      if (filters.status && conversation.status !== filters.status) return false;
      if (filters.feedback && conversation.feedback !== filters.feedback) return false;
      if (filters.topic && conversation.topic !== filters.topic) return false;
      if (filters.assignedOwner && conversation.assignedOwner !== filters.assignedOwner)
        return false;
      if (filters.scenario && conversation.scenario !== filters.scenario) return false;

      if (filters.escalated === true && conversation.escalationState === null) return false;

      return true;
    });

    const offset = (page - 1) * pageSize;

    return {
      rows: rows.slice(offset, offset + pageSize),
      total: rows.length,
      page,
      pageSize
    };
  }

  async getConversationById(id: string) {
    return mockState.conversations.find((conversation) => conversation.id === id) ?? null;
  }

  async updateConversationFeedback(conversationId: string, rating: "HELPFUL" | "NOT_HELPFUL") {
    const found = mockState.conversations.find((conversation) => conversation.id === conversationId);
    if (!found) return null;

    found.feedback = rating;
    found.updatedAt = new Date().toISOString();

    return found;
  }

  async assignConversation(conversationId: string, agentId: string) {
    const found = mockState.conversations.find((conversation) => conversation.id === conversationId);
    if (!found) return null;

    found.assignedOwner = agentId;
    found.escalationState = found.escalationState ?? "ASSIGNED";
    found.updatedAt = new Date().toISOString();

    const escalation = mockState.escalations.find((item) => item.conversationId === conversationId);
    if (escalation) {
      escalation.assignedAgent = agentId;
      escalation.status = "ASSIGNED";
    }

    return found;
  }

  async resolveConversation(conversationId: string) {
    const found = mockState.conversations.find((conversation) => conversation.id === conversationId);
    if (!found) return null;

    found.status = "RESOLVED";
    found.escalationState = found.escalationState ? "RESOLVED" : null;
    found.updatedAt = new Date().toISOString();

    const escalation = mockState.escalations.find((item) => item.conversationId === conversationId);
    if (escalation) {
      escalation.status = "RESOLVED";
    }

    return found;
  }

  async escalateConversation(
    conversationId: string,
    reason: string,
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  ) {
    const found = mockState.conversations.find((conversation) => conversation.id === conversationId);
    if (!found) return null;

    found.status = "ESCALATED";
    found.escalationState = "NEW_ESCALATION";
    found.updatedAt = new Date().toISOString();

    let escalation = mockState.escalations.find((item) => item.conversationId === conversationId);

    if (!escalation) {
      escalation = {
        id: generateId("esc"),
        conversationId,
        customerLabel: found.customerLabel,
        priority,
        status: "NEW_ESCALATION",
        assignedAgent: null,
        reason,
        createdAt: new Date().toISOString(),
        dueAt: formatISO(new Date(Date.now() + 8 * 60 * 60 * 1000))
      };
      mockState.escalations.unshift(escalation);
    } else {
      escalation.priority = priority;
      escalation.reason = reason;
      escalation.status = "NEW_ESCALATION";
      escalation.assignedAgent = null;
    }

    return escalation;
  }

  async addInternalNote(conversationId: string, note: string) {
    const found = mockState.conversations.find((conversation) => conversation.id === conversationId);
    if (!found) return null;

    found.internalNotes.unshift(note);
    found.updatedAt = new Date().toISOString();

    return found;
  }

  async listEscalations() {
    return sortByDateDesc(mockState.escalations);
  }

  async listKnowledgeArticles(query?: string, category?: string) {
    const search = (query ?? "").trim().toLowerCase();

    return sortByDateDesc(mockState.articles).filter((article) => {
      if (category && article.category !== category) return false;
      if (!search) return true;

      const haystack = `${article.title} ${article.summary} ${article.content} ${article.tags.join(" ")}`.toLowerCase();
      return haystack.includes(search);
    });
  }

  async getKnowledgeArticleById(id: string) {
    return mockState.articles.find((article) => article.id === id) ?? null;
  }

  async createKnowledgeArticle(article: Omit<KnowledgeArticleRecord, "id" | "updatedAt" | "usageCount">) {
    const created: KnowledgeArticleRecord = {
      ...article,
      id: generateId("ka"),
      updatedAt: new Date().toISOString(),
      usageCount: 0
    };

    mockState.articles.unshift(created);
    return created;
  }

  async updateKnowledgeArticle(id: string, input: Partial<KnowledgeArticleRecord>) {
    const found = mockState.articles.find((article) => article.id === id);
    if (!found) return null;

    Object.assign(found, input, { updatedAt: new Date().toISOString() });
    return found;
  }

  async duplicateKnowledgeArticle(id: string) {
    const found = mockState.articles.find((article) => article.id === id);
    if (!found) return null;

    const duplicate: KnowledgeArticleRecord = {
      ...found,
      id: generateId("ka"),
      title: `${found.title} (Copy)`,
      status: "DRAFT",
      updatedAt: new Date().toISOString(),
      versionNote: "Duplicated draft"
    };

    mockState.articles.unshift(duplicate);

    return duplicate;
  }

  async archiveKnowledgeArticle(id: string) {
    return this.updateKnowledgeArticle(id, { status: "ARCHIVED" });
  }

  async getWidgetConfig() {
    return mockState.widget;
  }

  async updateWidgetConfig(input: WidgetConfigRecord) {
    mockState.widget = {
      ...input,
      id: mockState.widget.id,
      workspaceId: mockState.widget.workspaceId
    };

    return mockState.widget;
  }

  async getAssistantSettings() {
    return mockState.assistant;
  }

  async updateAssistantSettings(input: typeof mockState.assistant) {
    mockState.assistant = { ...input };
    return mockState.assistant;
  }

  async listTeamStats() {
    return mockState.team;
  }
}

export const mockRepository = new MockRepository();

