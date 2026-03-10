import {
  AnalyticsSeriesPoint,
  AssistantBehaviorSettings,
  ConversationRecord,
  DashboardMetric,
  EscalationRecord,
  KnowledgeArticleRecord,
  TeamMemberStat,
  TopicUsagePoint,
  WidgetConfigRecord
} from "@/types/domain";

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Conversations Today",
    value: "482",
    trend: "+8.2%",
    trendDirection: "UP",
    comparison: "vs. yesterday"
  },
  {
    label: "Resolution Rate",
    value: "83.7%",
    trend: "+2.1%",
    trendDirection: "UP",
    comparison: "last 7 days"
  },
  {
    label: "Escalations",
    value: "38",
    trend: "-6.4%",
    trendDirection: "DOWN",
    comparison: "week over week"
  },
  {
    label: "Avg First Response",
    value: "41s",
    trend: "-12s",
    trendDirection: "DOWN",
    comparison: "improvement"
  },
  {
    label: "Deflection Rate",
    value: "67.9%",
    trend: "+4.0%",
    trendDirection: "UP",
    comparison: "month to date"
  },
  {
    label: "Satisfaction Proxy",
    value: "4.6 / 5",
    trend: "+0.2",
    trendDirection: "UP",
    comparison: "feedback trend"
  }
];

export const conversationSeries: AnalyticsSeriesPoint[] = [
  { date: "Mon", conversations: 310, resolved: 248, escalated: 34 },
  { date: "Tue", conversations: 352, resolved: 281, escalated: 29 },
  { date: "Wed", conversations: 338, resolved: 266, escalated: 33 },
  { date: "Thu", conversations: 401, resolved: 324, escalated: 36 },
  { date: "Fri", conversations: 428, resolved: 347, escalated: 39 },
  { date: "Sat", conversations: 289, resolved: 233, escalated: 22 },
  { date: "Sun", conversations: 274, resolved: 219, escalated: 19 }
];

export const topicUsage: TopicUsagePoint[] = [
  { topic: "Billing & Invoices", usage: 164 },
  { topic: "Onboarding", usage: 142 },
  { topic: "Integrations", usage: 101 },
  { topic: "Account Access", usage: 76 },
  { topic: "Contracting", usage: 52 }
];

export const knowledgeArticles: KnowledgeArticleRecord[] = [
  {
    id: "ka_1",
    title: "Support Coverage by Plan",
    summary: "Explains response windows and coverage tiers.",
    category: "Billing",
    content:
      "Starter customers receive business-hour support. Pro and Enterprise include weekend triage with priority queues.",
    tags: ["pricing", "support"],
    status: "PUBLISHED",
    sourceTag: "Playbook",
    owner: "Nora Patel",
    usageCount: 218,
    updatedAt: "2026-03-03T09:00:00.000Z",
    versionNote: "Aligned support table with new Pro add-on"
  },
  {
    id: "ka_2",
    title: "Implementation Timeline Checklist",
    summary: "Standard onboarding milestones and owners.",
    category: "Onboarding",
    content:
      "Typical onboarding includes kickoff, data mapping, widget styling, and acceptance review. Most teams complete setup in 7-14 business days.",
    tags: ["implementation", "onboarding"],
    status: "PUBLISHED",
    sourceTag: "Internal Docs",
    owner: "Marta Chen",
    usageCount: 189,
    updatedAt: "2026-03-05T13:35:00.000Z",
    versionNote: "Updated milestone names"
  },
  {
    id: "ka_3",
    title: "Escalation Workflow",
    summary: "How to route and triage low-confidence answers.",
    category: "Operations",
    content:
      "If model confidence is below threshold, assistant suggests escalation and logs a queue event for human review.",
    tags: ["escalation", "operations"],
    status: "DRAFT",
    sourceTag: "Runbook",
    owner: "Jade Morgan",
    usageCount: 74,
    updatedAt: "2026-03-07T11:15:00.000Z",
    versionNote: "Added low-confidence examples"
  },
  {
    id: "ka_4",
    title: "Refund and Return Policies",
    summary: "Customer-facing policy constraints for online orders.",
    category: "Commerce",
    content:
      "Returns are accepted within 30 days if items are unused and in original packaging. Refunds process within 5 business days.",
    tags: ["returns", "refund"],
    status: "PUBLISHED",
    sourceTag: "Policy",
    owner: "Leo Hayes",
    usageCount: 263,
    updatedAt: "2026-02-26T16:20:00.000Z",
    versionNote: "Clarified final sale rules"
  },
  {
    id: "ka_5",
    title: "Aftercare Instructions",
    summary: "Dental post-treatment instruction template.",
    category: "Care",
    content:
      "After treatment, avoid hard foods for 24 hours, follow rinsing instructions, and contact the clinic if swelling increases.",
    tags: ["aftercare", "clinic"],
    status: "ARCHIVED",
    sourceTag: "Legacy",
    owner: "Nora Patel",
    usageCount: 44,
    updatedAt: "2026-01-11T08:10:00.000Z",
    versionNote: "Superseded by version 3"
  }
];

export const conversationRecords: ConversationRecord[] = [
  {
    id: "conv_1001",
    workspaceId: "ws_1",
    customerLabel: "Acme Labs",
    topic: "Onboarding",
    channel: "WIDGET",
    status: "UNRESOLVED",
    escalationState: "ASSIGNED",
    assignedOwner: "agent_1",
    feedback: "NOT_HELPFUL",
    source: "Website Widget",
    confidence: 0.54,
    createdAt: "2026-03-09T09:14:00.000Z",
    updatedAt: "2026-03-09T10:01:00.000Z",
    flaggedForReview: true,
    scenario: "SAAS",
    internalNotes: ["Requested implementation deadline for executive review"],
    messages: [
      {
        id: "m1",
        sender: "USER",
        text: "How long does implementation usually take for 60 agents?",
        createdAt: "2026-03-09T09:14:00.000Z"
      },
      {
        id: "m2",
        sender: "ASSISTANT",
        text: "Most teams with your size complete implementation in 2 to 3 weeks. I can share a milestone plan if useful.",
        confidence: 0.63,
        suggestedPrompts: ["Show milestone plan", "Can we escalate this to onboarding"],
        createdAt: "2026-03-09T09:14:10.000Z"
      }
    ]
  },
  {
    id: "conv_1002",
    workspaceId: "ws_1",
    customerLabel: "Bright Dental",
    topic: "Insurance",
    channel: "WEB",
    status: "RESOLVED",
    escalationState: null,
    assignedOwner: null,
    feedback: "HELPFUL",
    source: "Help Center",
    confidence: 0.9,
    createdAt: "2026-03-09T07:42:00.000Z",
    updatedAt: "2026-03-09T07:46:00.000Z",
    flaggedForReview: false,
    scenario: "DENTAL",
    internalNotes: [],
    messages: [
      {
        id: "m3",
        sender: "USER",
        text: "Which insurance providers do you accept?",
        createdAt: "2026-03-09T07:42:00.000Z"
      },
      {
        id: "m4",
        sender: "ASSISTANT",
        text: "We accept most major PPO plans. If you share your provider name, I can verify network status.",
        confidence: 0.91,
        createdAt: "2026-03-09T07:42:07.000Z"
      }
    ]
  },
  {
    id: "conv_1003",
    workspaceId: "ws_1",
    customerLabel: "Northline Retail",
    topic: "Returns",
    channel: "WIDGET",
    status: "ESCALATED",
    escalationState: "NEW_ESCALATION",
    assignedOwner: null,
    feedback: "NOT_HELPFUL",
    source: "Website Widget",
    confidence: 0.41,
    createdAt: "2026-03-08T16:29:00.000Z",
    updatedAt: "2026-03-08T16:36:00.000Z",
    flaggedForReview: true,
    scenario: "ECOMMERCE",
    internalNotes: ["Potential chargeback risk"],
    messages: [
      {
        id: "m5",
        sender: "USER",
        text: "I need a refund for a final sale item. Can you force approval?",
        createdAt: "2026-03-08T16:29:00.000Z"
      },
      {
        id: "m6",
        sender: "ASSISTANT",
        text: "Final sale items are usually non-refundable. I can escalate this request for a manual review.",
        confidence: 0.44,
        suggestedPrompts: ["Escalate to specialist"],
        createdAt: "2026-03-08T16:29:09.000Z"
      }
    ]
  },
  {
    id: "conv_1004",
    workspaceId: "ws_1",
    customerLabel: "Ridge Construction",
    topic: "Project Scheduling",
    channel: "EMAIL",
    status: "UNRESOLVED",
    escalationState: "WAITING_ON_CUSTOMER",
    assignedOwner: "agent_2",
    feedback: "NONE",
    source: "Inbox",
    confidence: 0.57,
    createdAt: "2026-03-07T11:08:00.000Z",
    updatedAt: "2026-03-08T09:10:00.000Z",
    flaggedForReview: false,
    scenario: "CONSTRUCTION",
    internalNotes: ["Awaiting permit number"],
    messages: [
      {
        id: "m7",
        sender: "USER",
        text: "Can we move the site prep two weeks earlier?",
        createdAt: "2026-03-07T11:08:00.000Z"
      },
      {
        id: "m8",
        sender: "ASSISTANT",
        text: "I can check schedule capacity and confirm with your coordinator. Please share the current permit status.",
        confidence: 0.57,
        createdAt: "2026-03-07T11:08:12.000Z"
      }
    ]
  },
  {
    id: "conv_1005",
    workspaceId: "ws_1",
    customerLabel: "Zen Advisory",
    topic: "Proposal",
    channel: "WIDGET",
    status: "RESOLVED",
    escalationState: null,
    assignedOwner: null,
    feedback: "HELPFUL",
    source: "Website Widget",
    confidence: 0.88,
    createdAt: "2026-03-06T14:44:00.000Z",
    updatedAt: "2026-03-06T14:49:00.000Z",
    flaggedForReview: false,
    scenario: "CONSULTING",
    internalNotes: [],
    messages: [
      {
        id: "m9",
        sender: "USER",
        text: "How quickly can we get a custom proposal?",
        createdAt: "2026-03-06T14:44:00.000Z"
      },
      {
        id: "m10",
        sender: "ASSISTANT",
        text: "Custom proposals are usually delivered in 3 to 5 business days after discovery.",
        confidence: 0.9,
        createdAt: "2026-03-06T14:44:08.000Z"
      }
    ]
  },
  {
    id: "conv_1006",
    workspaceId: "ws_1",
    customerLabel: "Helio Logistics",
    topic: "API Throttling",
    channel: "WEB",
    status: "ESCALATED",
    escalationState: "ASSIGNED",
    assignedOwner: "agent_3",
    feedback: "NOT_HELPFUL",
    source: "Developer Portal",
    confidence: 0.46,
    createdAt: "2026-03-09T11:13:00.000Z",
    updatedAt: "2026-03-09T11:25:00.000Z",
    flaggedForReview: true,
    scenario: "SAAS",
    internalNotes: ["Needs rate-limit override approval"],
    messages: [
      {
        id: "m11",
        sender: "USER",
        text: "Your API is returning 429s during onboarding import jobs. Can this be adjusted?",
        createdAt: "2026-03-09T11:13:00.000Z"
      },
      {
        id: "m12",
        sender: "ASSISTANT",
        text: "I can share standard limit guidance, but this may need a specialist review for temporary exceptions.",
        confidence: 0.47,
        suggestedPrompts: ["Escalate to platform support"],
        createdAt: "2026-03-09T11:13:09.000Z"
      }
    ]
  },
  {
    id: "conv_1007",
    workspaceId: "ws_1",
    customerLabel: "Willow Dental Group",
    topic: "Appointment Rescheduling",
    channel: "WIDGET",
    status: "UNRESOLVED",
    escalationState: "WAITING_ON_CUSTOMER",
    assignedOwner: "agent_2",
    feedback: "HELPFUL",
    source: "Website Widget",
    confidence: 0.73,
    createdAt: "2026-03-09T10:11:00.000Z",
    updatedAt: "2026-03-09T10:23:00.000Z",
    flaggedForReview: false,
    scenario: "DENTAL",
    internalNotes: ["Waiting for patient to confirm preferred slot"],
    messages: [
      {
        id: "m13",
        sender: "USER",
        text: "Can I move tomorrow's appointment to Friday afternoon?",
        createdAt: "2026-03-09T10:11:00.000Z"
      },
      {
        id: "m14",
        sender: "ASSISTANT",
        text: "Yes. Please confirm if 14:30 or 16:00 works and I can route this to front desk scheduling.",
        confidence: 0.74,
        createdAt: "2026-03-09T10:11:08.000Z"
      }
    ]
  }
];

export const escalationQueue: EscalationRecord[] = [
  {
    id: "esc_4",
    conversationId: "conv_1006",
    customerLabel: "Helio Logistics",
    priority: "CRITICAL",
    status: "ASSIGNED",
    assignedAgent: "agent_3",
    reason: "API onboarding blocked by 429 errors",
    createdAt: "2026-03-09T11:19:00.000Z",
    dueAt: "2026-03-09T13:00:00.000Z"
  },
  {
    id: "esc_1",
    conversationId: "conv_1003",
    customerLabel: "Northline Retail",
    priority: "HIGH",
    status: "NEW_ESCALATION",
    assignedAgent: null,
    reason: "Policy exception request",
    createdAt: "2026-03-08T16:35:00.000Z",
    dueAt: "2026-03-09T12:00:00.000Z"
  },
  {
    id: "esc_2",
    conversationId: "conv_1001",
    customerLabel: "Acme Labs",
    priority: "MEDIUM",
    status: "ASSIGNED",
    assignedAgent: "agent_1",
    reason: "Implementation timeline alignment",
    createdAt: "2026-03-09T09:40:00.000Z",
    dueAt: "2026-03-09T18:00:00.000Z"
  },
  {
    id: "esc_3",
    conversationId: "conv_1004",
    customerLabel: "Ridge Construction",
    priority: "LOW",
    status: "WAITING_ON_CUSTOMER",
    assignedAgent: "agent_2",
    reason: "Missing permit details",
    createdAt: "2026-03-07T12:14:00.000Z",
    dueAt: "2026-03-10T09:00:00.000Z"
  }
];

export const widgetConfig: WidgetConfigRecord = {
  id: "widget_1",
  workspaceId: "ws_1",
  primaryColor: "#4D74FF",
  greetingMessage: "Welcome to Northline Support. How can I help?",
  widgetTitle: "Northline Assistant",
  launcherPosition: "RIGHT",
  borderRadius: "ROUNDED",
  avatarStyle: "ORBIT",
  promptChips: [
    "Track my request",
    "Talk to human support",
    "Implementation timeline"
  ],
  businessHoursMessage: "Our live team is online Mon-Fri 08:00-18:00 CET.",
  showEscalation: true
};

export const assistantSettings: AssistantBehaviorSettings = {
  responseStyle: "BALANCED",
  tonePreset: "ENTERPRISE",
  escalationThreshold: 55,
  confidenceThreshold: 62,
  restrictedTopics: ["legal liability", "medical diagnosis"],
  fallbackMessage:
    "I may not have complete confidence on this request. I can escalate it to a human support specialist."
};

export const teamMembers: TeamMemberStat[] = [
  {
    id: "agent_1",
    name: "Nora Patel",
    role: "SUPPORT_MANAGER",
    assignedEscalations: 7,
    resolvedCases: 113,
    avgResponseTime: "6m 12s",
    recentActivity: "Escalation updated for Acme Labs",
    availability: "ONLINE",
    sparkline: [12, 14, 11, 16, 17, 15, 18]
  },
  {
    id: "agent_2",
    name: "Marta Chen",
    role: "SUPPORT_AGENT",
    assignedEscalations: 5,
    resolvedCases: 96,
    avgResponseTime: "7m 01s",
    recentActivity: "Waiting on permit details for Ridge Construction",
    availability: "AWAY",
    sparkline: [10, 9, 12, 13, 12, 14, 15]
  },
  {
    id: "agent_3",
    name: "Leo Hayes",
    role: "ADMIN",
    assignedEscalations: 2,
    resolvedCases: 42,
    avgResponseTime: "8m 35s",
    recentActivity: "Updated assistant fallback policy",
    availability: "ONLINE",
    sparkline: [6, 7, 8, 7, 9, 10, 9]
  }
];

export const feedbackDistribution = [
  { name: "Helpful", value: 71, fill: "#35C3B0" },
  { name: "Not Helpful", value: 19, fill: "#FF6F8A" },
  { name: "No Rating", value: 10, fill: "#8A7BFF" }
];

export const unansweredTopics = [
  { topic: "Complex contract exceptions", count: 18 },
  { topic: "Legacy API migration", count: 14 },
  { topic: "Regional compliance edge cases", count: 9 }
];

export const widgetEngagement = [
  { name: "Open Rate", value: 66 },
  { name: "Interaction Rate", value: 48 },
  { name: "Completion Rate", value: 38 }
];

