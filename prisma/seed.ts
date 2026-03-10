import {
  ArticleStatus,
  Channel,
  ConversationStatus,
  EscalationStatus,
  FeedbackRating,
  PrismaClient,
  Priority,
  Role,
  Sender
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("DemoPass123!", 10);

  const workspace = await prisma.workspace.upsert({
    where: { slug: "northline" },
    update: {
      name: "Northline Support",
      supportEmail: "support@northline.example",
      defaultLanguage: "en",
      timezone: "Europe/Budapest"
    },
    create: {
      name: "Northline Support",
      slug: "northline",
      supportEmail: "support@northline.example",
      defaultLanguage: "en",
      timezone: "Europe/Budapest"
    }
  });

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "admin@supportai.dev" },
      update: { name: "Leo Hayes", passwordHash },
      create: {
        name: "Leo Hayes",
        email: "admin@supportai.dev",
        passwordHash,
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Leo%20Hayes"
      }
    }),
    prisma.user.upsert({
      where: { email: "manager@supportai.dev" },
      update: { name: "Nora Patel", passwordHash },
      create: {
        name: "Nora Patel",
        email: "manager@supportai.dev",
        passwordHash,
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Nora%20Patel"
      }
    }),
    prisma.user.upsert({
      where: { email: "agent@supportai.dev" },
      update: { name: "Marta Chen", passwordHash },
      create: {
        name: "Marta Chen",
        email: "agent@supportai.dev",
        passwordHash,
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Marta%20Chen"
      }
    })
  ]);

  const [admin, manager, agent] = users;

  await prisma.membership.upsert({
    where: {
      workspaceId_userId: { workspaceId: workspace.id, userId: admin.id }
    },
    update: { role: Role.ADMIN },
    create: { workspaceId: workspace.id, userId: admin.id, role: Role.ADMIN }
  });

  await prisma.membership.upsert({
    where: {
      workspaceId_userId: { workspaceId: workspace.id, userId: manager.id }
    },
    update: { role: Role.SUPPORT_MANAGER },
    create: {
      workspaceId: workspace.id,
      userId: manager.id,
      role: Role.SUPPORT_MANAGER
    }
  });

  await prisma.membership.upsert({
    where: {
      workspaceId_userId: { workspaceId: workspace.id, userId: agent.id }
    },
    update: { role: Role.SUPPORT_AGENT },
    create: {
      workspaceId: workspace.id,
      userId: agent.id,
      role: Role.SUPPORT_AGENT
    }
  });

  const categoryMap = new Map<string, string>();
  for (const category of [
    { name: "Billing", description: "Plans, invoices, and contracts" },
    { name: "Onboarding", description: "Setup timelines and rollout details" },
    { name: "Operations", description: "Escalations and workflow policies" },
    { name: "Commerce", description: "Orders, shipping, refunds" },
    { name: "Care", description: "Appointment and aftercare support" }
  ]) {
    const row = await prisma.knowledgeCategory.upsert({
      where: { workspaceId_name: { workspaceId: workspace.id, name: category.name } },
      update: { description: category.description },
      create: {
        workspaceId: workspace.id,
        name: category.name,
        description: category.description
      }
    });
    categoryMap.set(category.name, row.id);
  }

  const articleSeed = [
    {
      title: "Support Coverage by Plan",
      summary: "Explains response windows and coverage tiers.",
      category: "Billing",
      content:
        "Starter customers receive business-hour support. Pro and Enterprise include weekend triage with priority queues.",
      tags: ["pricing", "support"],
      status: ArticleStatus.PUBLISHED,
      sourceTag: "Playbook",
      ownerId: manager.id,
      usageCount: 218,
      versionNote: "Aligned support table with new Pro add-on"
    },
    {
      title: "Implementation Timeline Checklist",
      summary: "Standard onboarding milestones and owners.",
      category: "Onboarding",
      content:
        "Typical onboarding includes kickoff, data mapping, widget styling, and acceptance review. Most teams complete setup in 7-14 business days.",
      tags: ["implementation", "onboarding"],
      status: ArticleStatus.PUBLISHED,
      sourceTag: "Internal Docs",
      ownerId: manager.id,
      usageCount: 189,
      versionNote: "Updated milestone names"
    },
    {
      title: "Escalation Workflow",
      summary: "How to route and triage low-confidence answers.",
      category: "Operations",
      content:
        "If model confidence is below threshold, assistant suggests escalation and logs a queue event for human review.",
      tags: ["escalation", "operations"],
      status: ArticleStatus.DRAFT,
      sourceTag: "Runbook",
      ownerId: admin.id,
      usageCount: 74,
      versionNote: "Added low-confidence examples"
    },
    {
      title: "Refund and Return Policies",
      summary: "Customer-facing policy constraints for online orders.",
      category: "Commerce",
      content:
        "Returns are accepted within 30 days if items are unused and in original packaging. Refunds process within 5 business days.",
      tags: ["returns", "refund"],
      status: ArticleStatus.PUBLISHED,
      sourceTag: "Policy",
      ownerId: agent.id,
      usageCount: 263,
      versionNote: "Clarified final sale rules"
    },
    {
      title: "Aftercare Instructions",
      summary: "Dental post-treatment instruction template.",
      category: "Care",
      content:
        "After treatment, avoid hard foods for 24 hours, follow rinsing instructions, and contact the clinic if swelling increases.",
      tags: ["aftercare", "clinic"],
      status: ArticleStatus.ARCHIVED,
      sourceTag: "Legacy",
      ownerId: manager.id,
      usageCount: 44,
      versionNote: "Superseded by version 3"
    }
  ];

  for (const article of articleSeed) {
    const categoryId = categoryMap.get(article.category);
    if (!categoryId) continue;

    await prisma.knowledgeArticle.upsert({
      where: {
        id: `${workspace.id}_${article.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`
      },
      update: {
        summary: article.summary,
        content: article.content,
        tags: article.tags,
        status: article.status,
        sourceTag: article.sourceTag,
        ownerId: article.ownerId,
        usageCount: article.usageCount,
        versionNote: article.versionNote,
        categoryId,
        workspaceId: workspace.id
      },
      create: {
        id: `${workspace.id}_${article.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`,
        workspaceId: workspace.id,
        categoryId,
        title: article.title,
        summary: article.summary,
        content: article.content,
        tags: article.tags,
        status: article.status,
        sourceTag: article.sourceTag,
        ownerId: article.ownerId,
        usageCount: article.usageCount,
        versionNote: article.versionNote
      }
    });
  }

  const conv1 = await prisma.conversation.upsert({
    where: { id: "conv_1001" },
    update: {
      workspaceId: workspace.id,
      customerLabel: "Acme Labs",
      topic: "Onboarding",
      status: ConversationStatus.UNRESOLVED,
      channel: Channel.WIDGET,
      source: "Website Widget",
      scenario: "SAAS",
      confidence: 0.54,
      flaggedForReview: true,
      assignedOwnerId: manager.id
    },
    create: {
      id: "conv_1001",
      workspaceId: workspace.id,
      customerLabel: "Acme Labs",
      topic: "Onboarding",
      status: ConversationStatus.UNRESOLVED,
      channel: Channel.WIDGET,
      source: "Website Widget",
      scenario: "SAAS",
      confidence: 0.54,
      flaggedForReview: true,
      assignedOwnerId: manager.id
    }
  });

  const conv2 = await prisma.conversation.upsert({
    where: { id: "conv_1002" },
    update: {
      workspaceId: workspace.id,
      customerLabel: "Bright Dental",
      topic: "Insurance",
      status: ConversationStatus.RESOLVED,
      channel: Channel.WEB,
      source: "Help Center",
      scenario: "DENTAL",
      confidence: 0.9,
      resolvedAt: new Date("2026-03-09T07:46:00.000Z")
    },
    create: {
      id: "conv_1002",
      workspaceId: workspace.id,
      customerLabel: "Bright Dental",
      topic: "Insurance",
      status: ConversationStatus.RESOLVED,
      channel: Channel.WEB,
      source: "Help Center",
      scenario: "DENTAL",
      confidence: 0.9,
      resolvedAt: new Date("2026-03-09T07:46:00.000Z")
    }
  });

  const conv3 = await prisma.conversation.upsert({
    where: { id: "conv_1003" },
    update: {
      workspaceId: workspace.id,
      customerLabel: "Northline Retail",
      topic: "Returns",
      status: ConversationStatus.ESCALATED,
      channel: Channel.WIDGET,
      source: "Website Widget",
      scenario: "ECOMMERCE",
      confidence: 0.41,
      flaggedForReview: true
    },
    create: {
      id: "conv_1003",
      workspaceId: workspace.id,
      customerLabel: "Northline Retail",
      topic: "Returns",
      status: ConversationStatus.ESCALATED,
      channel: Channel.WIDGET,
      source: "Website Widget",
      scenario: "ECOMMERCE",
      confidence: 0.41,
      flaggedForReview: true
    }
  });

  await prisma.message.deleteMany({
    where: { conversationId: { in: [conv1.id, conv2.id, conv3.id] } }
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: conv1.id,
        sender: Sender.USER,
        text: "How long does implementation usually take for 60 agents?",
        createdAt: new Date("2026-03-09T09:14:00.000Z")
      },
      {
        conversationId: conv1.id,
        sender: Sender.ASSISTANT,
        text: "Most teams with your size complete implementation in 2 to 3 weeks. I can share a milestone plan if useful.",
        confidence: 0.63,
        suggestedPrompts: ["Show milestone plan", "Can we escalate this to onboarding"],
        createdAt: new Date("2026-03-09T09:14:10.000Z")
      },
      {
        conversationId: conv2.id,
        sender: Sender.USER,
        text: "Which insurance providers do you accept?",
        createdAt: new Date("2026-03-09T07:42:00.000Z")
      },
      {
        conversationId: conv2.id,
        sender: Sender.ASSISTANT,
        text: "We accept most major PPO plans. If you share your provider name, I can verify network status.",
        confidence: 0.91,
        createdAt: new Date("2026-03-09T07:42:07.000Z")
      },
      {
        conversationId: conv3.id,
        sender: Sender.USER,
        text: "I need a refund for a final sale item. Can you force approval?",
        createdAt: new Date("2026-03-08T16:29:00.000Z")
      },
      {
        conversationId: conv3.id,
        sender: Sender.ASSISTANT,
        text: "Final sale items are usually non-refundable. I can escalate this request for a manual review.",
        confidence: 0.44,
        suggestedPrompts: ["Escalate to specialist"],
        createdAt: new Date("2026-03-08T16:29:09.000Z")
      }
    ]
  });

  await prisma.conversationFeedback.upsert({
    where: { conversationId: conv1.id },
    update: { rating: FeedbackRating.NOT_HELPFUL },
    create: { conversationId: conv1.id, rating: FeedbackRating.NOT_HELPFUL }
  });

  await prisma.conversationFeedback.upsert({
    where: { conversationId: conv2.id },
    update: { rating: FeedbackRating.HELPFUL },
    create: { conversationId: conv2.id, rating: FeedbackRating.HELPFUL }
  });

  await prisma.conversationFeedback.upsert({
    where: { conversationId: conv3.id },
    update: { rating: FeedbackRating.NOT_HELPFUL },
    create: { conversationId: conv3.id, rating: FeedbackRating.NOT_HELPFUL }
  });

  await prisma.escalation.upsert({
    where: { conversationId: conv3.id },
    update: {
      workspaceId: workspace.id,
      status: EscalationStatus.NEW_ESCALATION,
      priority: Priority.HIGH,
      reason: "Policy exception request",
      dueAt: new Date("2026-03-09T12:00:00.000Z")
    },
    create: {
      workspaceId: workspace.id,
      conversationId: conv3.id,
      status: EscalationStatus.NEW_ESCALATION,
      priority: Priority.HIGH,
      reason: "Policy exception request",
      dueAt: new Date("2026-03-09T12:00:00.000Z")
    }
  });

  await prisma.escalation.upsert({
    where: { conversationId: conv1.id },
    update: {
      workspaceId: workspace.id,
      status: EscalationStatus.ASSIGNED,
      priority: Priority.MEDIUM,
      assignedAgentId: manager.id,
      reason: "Implementation timeline alignment",
      dueAt: new Date("2026-03-09T18:00:00.000Z")
    },
    create: {
      workspaceId: workspace.id,
      conversationId: conv1.id,
      status: EscalationStatus.ASSIGNED,
      priority: Priority.MEDIUM,
      assignedAgentId: manager.id,
      reason: "Implementation timeline alignment",
      dueAt: new Date("2026-03-09T18:00:00.000Z")
    }
  });

  await prisma.widgetConfig.upsert({
    where: { workspaceId: workspace.id },
    update: {
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
      showEscalation: true,
      updatedById: admin.id
    },
    create: {
      workspaceId: workspace.id,
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
      showEscalation: true,
      updatedById: admin.id
    }
  });

  await prisma.assistantSettings.upsert({
    where: { workspaceId: workspace.id },
    update: {
      responseStyle: "BALANCED",
      tonePreset: "ENTERPRISE",
      escalationThreshold: 55,
      confidenceThreshold: 62,
      restrictedTopics: ["legal liability", "medical diagnosis"],
      fallbackMessage:
        "I may not have complete confidence on this request. I can escalate it to a human support specialist.",
      updatedById: admin.id
    },
    create: {
      workspaceId: workspace.id,
      responseStyle: "BALANCED",
      tonePreset: "ENTERPRISE",
      escalationThreshold: 55,
      confidenceThreshold: 62,
      restrictedTopics: ["legal liability", "medical diagnosis"],
      fallbackMessage:
        "I may not have complete confidence on this request. I can escalate it to a human support specialist.",
      updatedById: admin.id
    }
  });

  await prisma.teamNote.deleteMany({
    where: { workspaceId: workspace.id }
  });

  await prisma.teamNote.createMany({
    data: [
      {
        workspaceId: workspace.id,
        conversationId: conv1.id,
        authorId: manager.id,
        content: "Requested implementation milestone summary for leadership review."
      },
      {
        workspaceId: workspace.id,
        conversationId: conv3.id,
        authorId: agent.id,
        content: "Customer requested policy exception, monitor for churn risk."
      }
    ]
  });

  await prisma.promptPreset.deleteMany({ where: { workspaceId: workspace.id } });
  await prisma.promptPreset.createMany({
    data: [
      {
        workspaceId: workspace.id,
        scenario: "SAAS",
        name: "Pricing plans",
        prompt: "What are your pricing plans?"
      },
      {
        workspaceId: workspace.id,
        scenario: "SAAS",
        name: "Weekend support",
        prompt: "Do you offer support on weekends?"
      },
      {
        workspaceId: workspace.id,
        scenario: "CONSTRUCTION",
        name: "Project timeline",
        prompt: "How quickly can you start a project?"
      },
      {
        workspaceId: workspace.id,
        scenario: "DENTAL",
        name: "Insurance",
        prompt: "Which insurance providers do you accept?"
      },
      {
        workspaceId: workspace.id,
        scenario: "ECOMMERCE",
        name: "Return policy",
        prompt: "How does your return policy work?"
      }
    ]
  });

  await prisma.notification.deleteMany({ where: { workspaceId: workspace.id } });
  await prisma.notification.createMany({
    data: [
      {
        workspaceId: workspace.id,
        userId: manager.id,
        type: "ESCALATION",
        title: "New escalation queued",
        body: "Northline Retail requires manual policy exception review."
      },
      {
        workspaceId: workspace.id,
        userId: admin.id,
        type: "SECURITY",
        title: "Assistant behavior updated",
        body: "Escalation threshold was changed to 55%."
      }
    ]
  });

  await prisma.auditLog.createMany({
    data: [
      {
        workspaceId: workspace.id,
        actorId: admin.id,
        action: "ASSISTANT_SETTINGS_UPDATED",
        targetType: "AssistantSettings",
        targetId: workspace.id,
        metadata: { escalationThreshold: 55, confidenceThreshold: 62 }
      },
      {
        workspaceId: workspace.id,
        actorId: manager.id,
        action: "ESCALATION_ASSIGNED",
        targetType: "Escalation",
        targetId: conv1.id,
        metadata: { assignedTo: manager.id, reason: "Implementation timeline alignment" }
      }
    ]
  });

  console.log("Seed complete");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

