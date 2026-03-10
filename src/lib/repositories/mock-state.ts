import {
  assistantSettings,
  conversationRecords,
  escalationQueue,
  knowledgeArticles,
  teamMembers,
  widgetConfig
} from "@/data/mock-data";
import { AssistantBehaviorSettings, ConversationRecord, EscalationRecord, KnowledgeArticleRecord, TeamMemberStat, WidgetConfigRecord } from "@/types/domain";

const clone = <T>(value: T): T => structuredClone(value);

export const mockState: {
  conversations: ConversationRecord[];
  escalations: EscalationRecord[];
  articles: KnowledgeArticleRecord[];
  widget: WidgetConfigRecord;
  assistant: AssistantBehaviorSettings;
  team: TeamMemberStat[];
} = {
  conversations: clone(conversationRecords),
  escalations: clone(escalationQueue),
  articles: clone(knowledgeArticles),
  widget: clone(widgetConfig),
  assistant: clone(assistantSettings),
  team: clone(teamMembers)
};

export const generateId = (prefix: string) =>
  `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

