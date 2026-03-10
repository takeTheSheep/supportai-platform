export type Role = "ADMIN" | "SUPPORT_MANAGER" | "SUPPORT_AGENT";

export type ConversationStatus = "RESOLVED" | "UNRESOLVED" | "ESCALATED";

export type EscalationStatus =
  | "NEW_ESCALATION"
  | "ASSIGNED"
  | "WAITING_ON_CUSTOMER"
  | "RESOLVED";

export type FeedbackRating = "HELPFUL" | "NOT_HELPFUL" | "NONE";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface ConversationMessage {
  id: string;
  sender: "USER" | "ASSISTANT" | "SYSTEM";
  text: string;
  createdAt: string;
  confidence?: number;
  suggestedPrompts?: string[];
}

export interface ConversationRecord {
  id: string;
  workspaceId: string;
  customerLabel: string;
  topic: string;
  channel: "WIDGET" | "EMAIL" | "WEB";
  status: ConversationStatus;
  escalationState: EscalationStatus | null;
  assignedOwner: string | null;
  feedback: FeedbackRating;
  source: string;
  confidence: number;
  createdAt: string;
  updatedAt: string;
  messages: ConversationMessage[];
  internalNotes: string[];
  flaggedForReview: boolean;
  scenario: ScenarioMode;
}

export interface EscalationRecord {
  id: string;
  conversationId: string;
  customerLabel: string;
  priority: Priority;
  status: EscalationStatus;
  assignedAgent: string | null;
  reason: string;
  createdAt: string;
  dueAt: string;
}

export interface KnowledgeArticleRecord {
  id: string;
  title: string;
  summary: string;
  category: string;
  content: string;
  tags: string[];
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  sourceTag: string;
  owner: string;
  usageCount: number;
  updatedAt: string;
  versionNote: string;
}

export interface WidgetConfigRecord {
  id: string;
  workspaceId: string;
  primaryColor: string;
  greetingMessage: string;
  widgetTitle: string;
  launcherPosition: "LEFT" | "RIGHT";
  borderRadius: "SOFT" | "ROUNDED" | "SQUARE";
  avatarStyle: "ORBIT" | "CIRCLE" | "INITIALS";
  promptChips: string[];
  businessHoursMessage: string;
  showEscalation: boolean;
}

export interface AssistantBehaviorSettings {
  responseStyle: "CONCISE" | "BALANCED" | "DETAILED";
  tonePreset: "PROFESSIONAL" | "FRIENDLY" | "ENTERPRISE";
  escalationThreshold: number;
  confidenceThreshold: number;
  restrictedTopics: string[];
  fallbackMessage: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  trend: string;
  trendDirection: "UP" | "DOWN" | "NEUTRAL";
  comparison: string;
}

export interface AnalyticsSeriesPoint {
  date: string;
  conversations: number;
  resolved: number;
  escalated: number;
}

export interface TopicUsagePoint {
  topic: string;
  usage: number;
}

export type ScenarioMode =
  | "SAAS"
  | "CONSTRUCTION"
  | "DENTAL"
  | "ECOMMERCE"
  | "CONSULTING";

export interface ScenarioPreset {
  id: ScenarioMode;
  name: string;
  summary: string;
  prompts: string[];
  knowledgeContext: string[];
}

export interface TeamMemberStat {
  id: string;
  name: string;
  role: Role;
  assignedEscalations: number;
  resolvedCases: number;
  avgResponseTime: string;
  recentActivity: string;
  availability: "ONLINE" | "AWAY" | "OFFLINE";
  sparkline: number[];
}

